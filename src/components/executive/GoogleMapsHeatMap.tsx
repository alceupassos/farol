import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Layers, Filter, Download, RefreshCw } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";
import { neighborhoods, epidemiologicalData, PINDAMONHANGABA_CENTER } from '@/data/pindamonhangabaData';

interface HeatMapData {
  neighborhood: string;
  coordinates: [number, number];
  healthScore: number;
  totalResidences: number;
  riskLevel: 'low' | 'medium' | 'high';
  alertCount: number;
}

export const GoogleMapsHeatMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<google.maps.Map | null>(null);
  const [heatMapData, setHeatMapData] = useState<HeatMapData[]>([]);
  const [selectedLayer, setSelectedLayer] = useState('health-score');
  const [loading, setLoading] = useState(true);
  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);

  // Converter dados de Pindamonhangaba para o formato do heatmap
  const pindamonhangabaHeatMapData: HeatMapData[] = neighborhoods.map(neighborhood => {
    const epidData = epidemiologicalData.find(ed => ed.neighborhood === neighborhood.name);
    const totalCases = epidData ? Object.values(epidData.cases).reduce((a, b) => a + b, 0) : 0;
    
    return {
      neighborhood: neighborhood.name,
      coordinates: [neighborhood.lng, neighborhood.lat] as [number, number],
      healthScore: Math.max(40, 100 - (totalCases * 2)), // Score baseado nos casos
      totalResidences: Math.floor(neighborhood.population / 3), // Estimativa de residências
      riskLevel: (epidData?.riskLevel || 'low') as 'low' | 'medium' | 'high',
      alertCount: totalCases
    };
  });

  const fetchGoogleMapsApiKey = async () => {
    try {
      console.log('Buscando chave da API do Google Maps...');
      const { data, error } = await supabase.functions.invoke('google-maps-api');
      
      if (error) {
        console.error('Erro ao buscar chave da API:', error);
        return null;
      }

      if (data?.apiKey) {
        console.log('Chave da API recebida com sucesso');
        return data.apiKey;
      }
      
      return null;
    } catch (error) {
      console.error('Erro ao conectar com o serviço de mapas:', error);
      return null;
    }
  };

  const loadGoogleMaps = async () => {
    try {
      const apiKey = await fetchGoogleMapsApiKey();
      if (!apiKey) return;

      const loader = new Loader({
        apiKey: apiKey,
        version: 'weekly',
        libraries: ['visualization', 'marker', 'geometry']
      });

      await loader.load();
      setGoogleMapsLoaded(true);
      console.log('Google Maps carregado com sucesso');
    } catch (error) {
      console.error('Erro ao carregar Google Maps:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setHeatMapData(pindamonhangabaHeatMapData);
    loadGoogleMaps();
  }, []);

  useEffect(() => {
    if (googleMapsLoaded) {
      initializeMap();
    }
  }, [googleMapsLoaded]);

  const initializeMap = () => {
    if (!mapContainer.current || !googleMapsLoaded) return;

    console.log('Inicializando mapa para Pindamonhangaba...');
    
    const pindamonhangabaCenter = {
      lat: PINDAMONHANGABA_CENTER.latitude,
      lng: PINDAMONHANGABA_CENTER.longitude
    };

    map.current = new google.maps.Map(mapContainer.current, {
      center: pindamonhangabaCenter,
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }]
        }
      ]
    });

    addHeatMapLayers();
    addMarkers();
  };

  const addHeatMapLayers = () => {
    if (!map.current) return;

    // Adicionar pontos de calor baseados nos dados
    const heatmapData = heatMapData.map(point => 
      new google.maps.LatLng(point.coordinates[1], point.coordinates[0])
    );

    if (window.google && window.google.maps.visualization) {
      const heatmap = new google.maps.visualization.HeatmapLayer({
        data: heatmapData,
        map: map.current
      });

      heatmap.set('gradient', [
        'rgba(0, 255, 255, 0)',
        'rgba(0, 255, 255, 1)',
        'rgba(0, 191, 255, 1)',
        'rgba(0, 127, 255, 1)',
        'rgba(0, 63, 255, 1)',
        'rgba(0, 0, 255, 1)',
        'rgba(0, 0, 223, 1)',
        'rgba(0, 0, 191, 1)',
        'rgba(0, 0, 159, 1)',
        'rgba(0, 0, 127, 1)',
        'rgba(63, 0, 91, 1)',
        'rgba(127, 0, 63, 1)',
        'rgba(191, 0, 31, 1)',
        'rgba(255, 0, 0, 1)'
      ]);
    }
  };

  const addMarkers = () => {
    if (!map.current) return;

    heatMapData.forEach(point => {
      const marker = new google.maps.Marker({
        position: {
          lat: point.coordinates[1],
          lng: point.coordinates[0]
        },
        map: map.current!,
        title: point.neighborhood,
        icon: {
          url: `data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${getRiskColor(point.riskLevel)}"%3E%3Cpath d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/%3E%3C/svg%3E`,
          scaledSize: new google.maps.Size(30, 30)
        }
      });

      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div style="padding: 10px; font-family: Arial, sans-serif; min-width: 200px;">
            <h3 style="margin: 0 0 10px 0; color: #1f2937;">${point.neighborhood}</h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 10px;">
              <div>
                <span style="font-weight: 600; color: #374151;">Score de Saúde:</span>
                <div style="font-size: 18px; font-weight: bold; color: ${point.healthScore >= 80 ? '#059669' : point.healthScore >= 60 ? '#d97706' : '#dc2626'};">
                  ${point.healthScore}/100
                </div>
              </div>
              <div>
                <span style="font-weight: 600; color: #374151;">Residências:</span>
                <div style="font-size: 16px; font-weight: 600; color: #1f2937;">
                  ${point.totalResidences.toLocaleString()}
                </div>
              </div>
            </div>
            <div style="margin-bottom: 8px;">
              <span style="display: inline-block; padding: 4px 8px; border-radius: 12px; font-size: 12px; font-weight: 500; ${getRiskBadgeColor(point.riskLevel)}">
                ${getRiskLabel(point.riskLevel)}
              </span>
            </div>
            <div style="font-size: 12px; color: #6b7280;">
              Alertas ativos: ${point.alertCount}
            </div>
          </div>
        `
      });

      marker.addListener('click', () => {
        infoWindow.open(map.current!, marker);
      });
    });
  };

  const getRiskColor = (riskLevel: string): string => {
    switch (riskLevel) {
      case 'high': return '#ef4444';
      case 'medium': return '#f97316';
      case 'low': return '#22c55e';
      default: return '#6b7280';
    }
  };

  const getRiskBadgeColor = (riskLevel: string): string => {
    switch (riskLevel) {
      case 'high': return 'background-color: #fef2f2; color: #991b1b;';
      case 'medium': return 'background-color: #fffbeb; color: #92400e;';
      case 'low': return 'background-color: #f0fdf4; color: #166534;';
      default: return 'background-color: #f9fafb; color: #374151;';
    }
  };

  const getRiskLabel = (riskLevel: string): string => {
    switch (riskLevel) {
      case 'high': return 'Alto Risco';
      case 'medium': return 'Médio Risco';
      case 'low': return 'Baixo Risco';
      default: return 'Sem Dados';
    }
  };

  const refreshData = async () => {
    setLoading(true);
    // Simular atualização de dados
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-6">
      {/* Mapa Principal */}
      <div className="lg:col-span-3">
        <Card className="h-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Mapa de Calor Municipal - Pindamonhangaba/SP
            </CardTitle>
            <div className="flex items-center gap-2">
              <Select value={selectedLayer} onValueChange={setSelectedLayer}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="health-score">Score de Saúde</SelectItem>
                  <SelectItem value="risk-level">Nível de Risco</SelectItem>
                  <SelectItem value="alerts">Alertas</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" onClick={refreshData} disabled={loading}>
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="h-[500px] p-0">
            {loading ? (
              <div className="h-full flex items-center justify-center bg-muted rounded-lg mx-6 mb-6">
                <div className="text-center space-y-4">
                  <RefreshCw className="w-12 h-12 text-muted-foreground mx-auto animate-spin" />
                  <div className="space-y-2">
                    <h3 className="font-semibold">Carregando mapa...</h3>
                    <p className="text-sm text-muted-foreground">
                      Configurando visualização do mapa de Pindamonhangaba
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div ref={mapContainer} className="h-full w-full rounded-lg mx-6 mb-6 overflow-hidden" />
            )}
          </CardContent>
        </Card>
      </div>

      {/* Sidebar com Dados */}
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layers className="h-4 w-4" />
              Bairros Monitorados
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {heatMapData.map((neighborhood, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-sm">{neighborhood.neighborhood}</h4>
                  <Badge variant={neighborhood.riskLevel === 'high' ? 'destructive' : neighborhood.riskLevel === 'medium' ? 'default' : 'secondary'}>
                    {getRiskLabel(neighborhood.riskLevel)}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                  <div>Score: {neighborhood.healthScore}/100</div>
                  <div>Residências: {neighborhood.totalResidences}</div>
                  <div>Alertas: {neighborhood.alertCount}</div>
                </div>
                {index < heatMapData.length - 1 && <Separator />}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Ações Rápidas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              <Download className="w-4 h-4 mr-2" />
              Exportar Dados
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GoogleMapsHeatMap;