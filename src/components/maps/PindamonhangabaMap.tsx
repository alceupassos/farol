import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, MapPin, AlertTriangle } from 'lucide-react';
import { neighborhoods, epidemiologicalData, healthUnits, PINDAMONHANGABA_CENTER } from '@/data/pindamonhangabaData';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface PindamonhangabaMapProps {
  showEpidemiological?: boolean;
  showHealthUnits?: boolean;
  showResidences?: boolean;
  height?: string;
}

const PindamonhangabaMap: React.FC<PindamonhangabaMapProps> = ({
  showEpidemiological = true,
  showHealthUnits = true,
  showResidences = false,
  height = '500px'
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchMapboxToken = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('mapbox-token');
      
      if (error) {
        console.error('Erro ao buscar token do Mapbox:', error);
        toast({
          title: "Erro de configuração",
          description: "Não foi possível carregar a configuração do mapa.",
          variant: "destructive"
        });
        return;
      }

      if (data?.token) {
        setMapboxToken(data.token);
      }
    } catch (error) {
      console.error('Erro ao conectar com o serviço de mapas:', error);
      toast({
        title: "Erro de conexão",
        description: "Não foi possível conectar com o serviço de mapas.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const initializeMap = async () => {
    if (!mapContainer.current || !mapboxToken) return;

    try {
      mapboxgl.accessToken = mapboxToken;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [PINDAMONHANGABA_CENTER.longitude, PINDAMONHANGABA_CENTER.latitude],
        zoom: 12
      });

      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      map.current.on('load', () => {
        addDataLayers();
        addMarkers();
      });

    } catch (error) {
      console.error('Erro ao inicializar mapa:', error);
      toast({
        title: "Erro no mapa",
        description: "Não foi possível carregar o mapa.",
        variant: "destructive"
      });
    }
  };

  const addDataLayers = () => {
    if (!map.current) return;

    if (showEpidemiological) {
      // Criar heatmap epidemiológico
      const heatmapData = neighborhoods.map(neighborhood => {
        const epidData = epidemiologicalData.find(ed => ed.neighborhood === neighborhood.name);
        const totalCases = epidData ? Object.values(epidData.cases).reduce((a, b) => a + b, 0) : 0;
        
        return {
          type: 'Feature' as const,
          geometry: {
            type: 'Point' as const,
            coordinates: [neighborhood.lng, neighborhood.lat]
          },
          properties: {
            cases: totalCases,
            neighborhood: neighborhood.name,
            population: neighborhood.population
          }
        };
      });

      map.current.addSource('epidemiological-data', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: heatmapData
        }
      });

      // Círculos proporcionais aos casos
      map.current.addLayer({
        id: 'epidemiological-circles',
        type: 'circle',
        source: 'epidemiological-data',
        paint: {
          'circle-radius': [
            'interpolate',
            ['linear'],
            ['get', 'cases'],
            0, 5,
            50, 15,
            100, 25
          ],
          'circle-color': [
            'interpolate',
            ['linear'],
            ['get', 'cases'],
            0, '#22c55e',
            25, '#eab308',
            50, '#f97316',
            75, '#ef4444'
          ],
          'circle-opacity': 0.6,
          'circle-stroke-color': '#ffffff',
          'circle-stroke-width': 2
        }
      });
    }
  };

  const addMarkers = () => {
    if (!map.current) return;

    // Unidades de saúde
    if (showHealthUnits) {
      healthUnits.forEach(unit => {
        const marker = new mapboxgl.Marker({
          color: unit.type === 'Hospital' ? '#ef4444' : '#3b82f6'
        })
          .setLngLat([unit.address.longitude, unit.address.latitude])
          .setPopup(new mapboxgl.Popup().setHTML(`
            <div class="p-2">
              <h3 class="font-bold">${unit.name}</h3>
              <p class="text-sm text-gray-600">${unit.type}</p>
              <p class="text-sm">${unit.address.street}, ${unit.address.number}</p>
              <p class="text-sm">${unit.address.neighborhood}</p>
              <p class="text-sm font-medium">Médicos: ${unit.doctors}</p>
              <p class="text-sm font-medium">Capacidade: ${unit.capacity} pacientes</p>
            </div>
          `))
          .addTo(map.current!);
      });
    }

    // Marcadores de bairros
    neighborhoods.forEach(neighborhood => {
      const epidData = epidemiologicalData.find(ed => ed.neighborhood === neighborhood.name);
      const totalCases = epidData ? Object.values(epidData.cases).reduce((a, b) => a + b, 0) : 0;
      const riskLevel = epidData?.riskLevel || 'low';

      const marker = new mapboxgl.Marker({
        color: getRiskColor(riskLevel),
        scale: 0.7
      })
        .setLngLat([neighborhood.lng, neighborhood.lat])
        .setPopup(new mapboxgl.Popup().setHTML(`
          <div class="p-3">
            <h3 class="font-bold text-lg">${neighborhood.name}</h3>
            <p class="text-sm">População: ${neighborhood.population.toLocaleString()}</p>
            <p class="text-sm">Total de casos: ${totalCases}</p>
            <div class="mt-2">
              <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRiskBadgeClass(riskLevel)}">
                ${getRiskLabel(riskLevel)}
              </span>
            </div>
            ${epidData ? `
              <div class="mt-2 text-xs">
                <p>Dengue: ${epidData.cases.dengue}</p>
                <p>COVID-19: ${epidData.cases.covid}</p>
                <p>Influenza: ${epidData.cases.influenza}</p>
              </div>
            ` : ''}
          </div>
        `))
        .addTo(map.current!);
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

  const getRiskBadgeClass = (riskLevel: string): string => {
    switch (riskLevel) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
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

  useEffect(() => {
    fetchMapboxToken();

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  useEffect(() => {
    if (mapboxToken) {
      initializeMap();
    }
  }, [mapboxToken]);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Mapa de Pindamonhangaba
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64">
          <div className="flex items-center gap-2">
            <RefreshCw className="w-5 h-5 animate-spin" />
            <span>Carregando mapa...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Mapa Epidemiológico - Pindamonhangaba/SP
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.location.reload()}
              disabled={isLoading}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Atualizar
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div 
            ref={mapContainer} 
            className="w-full rounded-lg border"
            style={{ height }}
          />
          
          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span>Baixo Risco</span>
              <div className="w-3 h-3 rounded-full bg-yellow-500 ml-4"></div>
              <span>Médio Risco</span>
              <div className="w-3 h-3 rounded-full bg-red-500 ml-4"></div>
              <span>Alto Risco</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span>UBS</span>
              <div className="w-3 h-3 rounded-full bg-red-600 ml-4"></div>
              <span>Hospital</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dados epidemiológicos em cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {epidemiologicalData.map((data) => (
          <Card key={data.neighborhood}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center justify-between">
                {data.neighborhood}
                <Badge variant={data.riskLevel === 'high' ? 'destructive' : data.riskLevel === 'medium' ? 'default' : 'secondary'}>
                  {getRiskLabel(data.riskLevel)}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>Dengue: {data.cases.dengue}</div>
                <div>COVID-19: {data.cases.covid}</div>
                <div>Influenza: {data.cases.influenza}</div>
                <div>Hepatite: {data.cases.hepatite}</div>
              </div>
              <p className="text-xs text-muted-foreground">
                Atualizado em {new Date(data.lastUpdate).toLocaleDateString('pt-BR')}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PindamonhangabaMap;