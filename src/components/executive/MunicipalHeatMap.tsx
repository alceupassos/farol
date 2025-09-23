import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MapPin, Layers, Filter, Download, RefreshCw } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";

interface HeatMapData {
  neighborhood: string;
  coordinates: [number, number];
  healthScore: number;
  totalResidences: number;
  riskLevel: 'low' | 'medium' | 'high';
  alertCount: number;
}

export const MunicipalHeatMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  const [mapboxToken, setMapboxToken] = useState('');
  const [heatMapData, setHeatMapData] = useState<HeatMapData[]>([]);
  const [selectedLayer, setSelectedLayer] = useState('health-score');
  const [loading, setLoading] = useState(true);

  const fetchMapboxToken = async () => {
    try {
      console.log('Iniciando busca do token Mapbox...');
      const { data, error } = await supabase.functions.invoke('mapbox-token');
      
      console.log('Resposta da edge function:', { data, error });
      
      if (error) {
        console.error('Erro ao buscar token do Mapbox:', error);
        return;
      }

      if (data?.token) {
        console.log('Token recebido com sucesso');
        setMapboxToken(data.token);
      } else {
        console.error('Token não encontrado na resposta:', data);
      }
    } catch (error) {
      console.error('Erro ao conectar com o serviço de mapas:', error);
    } finally {
      setLoading(false);
    }
  };

  // Dados de Piracicaba com coordenadas principais de bairros
  const mockHeatMapData: HeatMapData[] = [
    {
      neighborhood: "Centro",
      coordinates: [-47.6487, -22.7254],
      healthScore: 84,
      totalResidences: 18420,
      riskLevel: 'medium',
      alertCount: 6
    },
    {
      neighborhood: "Paulista",
      coordinates: [-47.6519, -22.7142],
      healthScore: 78,
      totalResidences: 21250,
      riskLevel: 'medium',
      alertCount: 5
    },
    {
      neighborhood: "Piracicamirim",
      coordinates: [-47.6209, -22.7053],
      healthScore: 62,
      totalResidences: 26840,
      riskLevel: 'high',
      alertCount: 18
    },
    {
      neighborhood: "Vila Rezende",
      coordinates: [-47.6548, -22.7088],
      healthScore: 74,
      totalResidences: 24110,
      riskLevel: 'medium',
      alertCount: 9
    },
    {
      neighborhood: "Santa Teresinha",
      coordinates: [-47.6324, -22.7125],
      healthScore: 81,
      totalResidences: 19870,
      riskLevel: 'low',
      alertCount: 3
    },
    {
      neighborhood: "Algodoal",
      coordinates: [-47.6405, -22.7321],
      healthScore: 58,
      totalResidences: 14680,
      riskLevel: 'high',
      alertCount: 16
    },
    {
      neighborhood: "Nova América",
      coordinates: [-47.6480, -22.7398],
      healthScore: 77,
      totalResidences: 12430,
      riskLevel: 'medium',
      alertCount: 7
    },
    {
      neighborhood: "Vila Fátima",
      coordinates: [-47.6622, -22.7441],
      healthScore: 63,
      totalResidences: 13870,
      riskLevel: 'high',
      alertCount: 12
    },
    {
      neighborhood: "Monte Líbano",
      coordinates: [-47.6671, -22.7198],
      healthScore: 49,
      totalResidences: 11240,
      riskLevel: 'high',
      alertCount: 21
    },
    {
      neighborhood: "Jardim São Paulo",
      coordinates: [-47.6164, -22.7285],
      healthScore: 88,
      totalResidences: 15420,
      riskLevel: 'low',
      alertCount: 2
    }
  ];

  useEffect(() => {
    setHeatMapData(mockHeatMapData);
    fetchMapboxToken();
  }, []);

  useEffect(() => {
    if (mapboxToken) {
      initializeMap();
    }
  }, [mapboxToken]);

  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-47.6487, -22.7254], // Centro de Piracicaba
      zoom: 12.2,
      pitch: 0,
      bearing: 0
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add markers and heat map data
    map.current.on('load', () => {
      addHeatMapLayers();
      addMarkers();
    });
  };

  const addHeatMapLayers = () => {
    if (!map.current) return;

    // Create GeoJSON data from heat map data
    const geojsonData = {
      type: 'FeatureCollection' as const,
      features: heatMapData.map(point => ({
        type: 'Feature' as const,
        geometry: {
          type: 'Point' as const,
          coordinates: point.coordinates
        },
        properties: {
          healthScore: point.healthScore,
          riskLevel: point.riskLevel,
          alertCount: point.alertCount,
          neighborhood: point.neighborhood,
          totalResidences: point.totalResidences
        }
      }))
    };

    // Add source
    map.current.addSource('municipal-data', {
      type: 'geojson',
      data: geojsonData
    });

    // Add heat map layer
    map.current.addLayer({
      id: 'heat-map-layer',
      type: 'heatmap',
      source: 'municipal-data',
      maxzoom: 15,
      paint: {
        'heatmap-weight': [
          'interpolate',
          ['linear'],
          ['get', 'alertCount'],
          0, 0,
          20, 1
        ],
        'heatmap-intensity': [
          'interpolate',
          ['linear'],
          ['zoom'],
          0, 1,
          15, 3
        ],
        'heatmap-color': [
          'interpolate',
          ['linear'],
          ['heatmap-density'],
          0, 'rgba(33,102,172,0)',
          0.2, 'rgb(103,169,207)',
          0.4, 'rgb(209,229,240)',
          0.6, 'rgb(253,219,199)',
          0.8, 'rgb(239,138,98)',
          1, 'rgb(178,24,43)'
        ],
        'heatmap-radius': [
          'interpolate',
          ['linear'],
          ['zoom'],
          0, 2,
          15, 20
        ]
      }
    });

    // Add circle layer for high zoom levels
    map.current.addLayer({
      id: 'municipal-points',
      type: 'circle',
      source: 'municipal-data',
      minzoom: 14,
      paint: {
        'circle-radius': [
          'interpolate',
          ['linear'],
          ['get', 'totalResidences'],
          0, 5,
          3000, 20
        ],
        'circle-color': [
          'case',
          ['==', ['get', 'riskLevel'], 'high'], '#ef4444',
          ['==', ['get', 'riskLevel'], 'medium'], '#f59e0b',
          '#10b981'
        ],
        'circle-opacity': 0.7,
        'circle-stroke-width': 2,
        'circle-stroke-color': '#ffffff'
      }
    });
  };

  const clearMapData = () => {
    if (!map.current) return;
    
    // Remove todos os marcadores
    markers.current.forEach(marker => marker.remove());
    markers.current = [];
    
    // Remove camadas se existirem
    if (map.current.getLayer('heat-map-layer')) {
      map.current.removeLayer('heat-map-layer');
    }
    if (map.current.getLayer('municipal-points')) {
      map.current.removeLayer('municipal-points');
    }
    
    // Remove fonte de dados se existir
    if (map.current.getSource('municipal-data')) {
      map.current.removeSource('municipal-data');
    }
  };

  const addMarkers = () => {
    if (!map.current) return;

    heatMapData.forEach(point => {
      // Create popup
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <div class="p-3 bg-white text-gray-900">
          <h3 class="font-bold text-lg mb-2 text-gray-900">${point.neighborhood}</h3>
          <div class="space-y-1 text-sm">
            <div class="text-gray-700">Score de Saúde: <span class="font-semibold text-gray-900">${point.healthScore}/100</span></div>
            <div class="text-gray-700">Residências: <span class="font-semibold text-gray-900">${point.totalResidences}</span></div>
            <div class="text-gray-700">Alertas: <span class="font-semibold ${point.alertCount > 10 ? 'text-red-600' : 'text-green-600'}">${point.alertCount}</span></div>
            <div class="text-gray-700">Nível de Risco: <span class="font-semibold capitalize ${point.riskLevel === 'high' ? 'text-red-600' : point.riskLevel === 'medium' ? 'text-yellow-600' : 'text-green-600'}">${point.riskLevel}</span></div>
          </div>
        </div>
      `);

      // Create marker
      const marker = new mapboxgl.Marker({
        color: point.riskLevel === 'high' ? '#ef4444' : point.riskLevel === 'medium' ? '#f59e0b' : '#10b981'
      })
        .setLngLat(point.coordinates)
        .setPopup(popup)
        .addTo(map.current!);
        
      markers.current.push(marker);
    });
  };

  const refreshData = async () => {
    setLoading(true);
    try {
      // Limpar dados existentes do mapa
      clearMapData();
      
      const { data, error } = await supabase.functions.invoke('municipal-analytics', {
        body: { 
          type: 'heat-map-data',
          municipality: 'Piracicaba',
          layer: selectedLayer
        }
      });

      if (!error && data) {
        setHeatMapData(data.heatMapData);
        // Reagendar atualização do mapa para depois que os dados forem definidos
        setTimeout(() => {
          if (map.current) {
            addHeatMapLayers();
            addMarkers();
          }
        }, 100);
      } else {
        // Se falhar a API, usar dados mockados e atualizar o mapa
        setHeatMapData(mockHeatMapData);
        setTimeout(() => {
          if (map.current) {
            addHeatMapLayers();
            addMarkers();
          }
        }, 100);
      }
    } catch (error) {
      console.error('Error refreshing heat map data:', error);
      // Em caso de erro, usar dados mockados
      setHeatMapData(mockHeatMapData);
      setTimeout(() => {
        if (map.current) {
          addHeatMapLayers();
          addMarkers();
        }
      }, 100);
    } finally {
      setLoading(false);
    }
  };

  const getRiskBadgeColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'high': return 'bg-red-500/20 text-red-500 border-red-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30';
      default: return 'bg-green-500/20 text-green-500 border-green-500/30';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Map */}
      <div className="lg:col-span-3">
        <Card className="h-[600px]">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Mapa de Calor Municipal
              </CardTitle>
              <div className="flex items-center gap-2">
                <Select value={selectedLayer} onValueChange={setSelectedLayer}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="health-score">Score de Saúde</SelectItem>
                    <SelectItem value="risk-level">Nível de Risco</SelectItem>
                    <SelectItem value="alert-count">Alertas</SelectItem>
                  </SelectContent>
                </Select>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={refreshData}
                  disabled={loading}
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                </Button>
              </div>
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
                      Configurando visualização do mapa
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

      {/* Sidebar with data */}
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Layers className="w-5 h-5" />
              Bairros Monitorados
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {heatMapData.map((neighborhood, index) => (
              <div key={index} className="space-y-2 p-3 border border-border rounded-lg">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">{neighborhood.neighborhood}</h4>
                  <Badge className={getRiskBadgeColor(neighborhood.riskLevel)}>
                    {neighborhood.riskLevel}
                  </Badge>
                </div>
                <div className="text-sm space-y-1 text-muted-foreground">
                  <div>Score: {neighborhood.healthScore}/100</div>
                  <div>Residências: {neighborhood.totalResidences}</div>
                  <div>Alertas: {neighborhood.alertCount}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Filter className="w-5 h-5" />
              Controles
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Download className="w-4 h-4 mr-2" />
              Exportar Dados
            </Button>
            <Separator />
            <div className="text-xs text-muted-foreground">
              Última atualização: {new Date().toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
