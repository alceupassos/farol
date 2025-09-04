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

  // Dados de Pindamonhangaba com coordenadas corretas
  const mockHeatMapData: HeatMapData[] = [
    {
      neighborhood: "Centro",
      coordinates: [-45.4612, -22.9242],
      healthScore: 85,
      totalResidences: 1250,
      riskLevel: 'low',
      alertCount: 2
    },
    {
      neighborhood: "Cidade Nova",
      coordinates: [-45.4580, -22.9180],
      healthScore: 72,
      totalResidences: 890,
      riskLevel: 'medium',
      alertCount: 8
    },
    {
      neighborhood: "Vila Santa Clara",
      coordinates: [-45.4700, -22.9300],
      healthScore: 68,
      totalResidences: 980,
      riskLevel: 'high',
      alertCount: 15
    },
    {
      neighborhood: "Jardim Regina",
      coordinates: [-45.4550, -22.9400],
      healthScore: 79,
      totalResidences: 720,
      riskLevel: 'low',
      alertCount: 4
    },
    {
      neighborhood: "Mombaça",
      coordinates: [-45.4400, -22.9500],
      healthScore: 91,
      totalResidences: 1500,
      riskLevel: 'low',
      alertCount: 1
    },
    {
      neighborhood: "Vila Operária",
      coordinates: [-45.4650, -22.9150],
      healthScore: 74,
      totalResidences: 680,
      riskLevel: 'medium',
      alertCount: 6
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
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [-45.4612, -22.9242], // Pindamonhangaba coordinates
      zoom: 11,
      pitch: 45,
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
    });
  };

  const refreshData = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('municipal-analytics', {
        body: { 
          type: 'heat-map-data',
          municipality: 'default',
          layer: selectedLayer
        }
      });

      if (!error && data) {
        setHeatMapData(data.heatMapData);
      }
    } catch (error) {
      console.error('Error refreshing heat map data:', error);
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