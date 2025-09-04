import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, MapPin } from 'lucide-react';
import { neighborhoods, epidemiologicalData, healthUnits, PINDAMONHANGABA_CENTER } from '@/data/pindamonhangabaData';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface GoogleMapsPindamonhangabaProps {
  showEpidemiological?: boolean;
  showHealthUnits?: boolean;
  showResidences?: boolean;
  height?: string;
}

const GoogleMapsPindamonhangaba: React.FC<GoogleMapsPindamonhangabaProps> = ({
  showEpidemiological = true,
  showHealthUnits = true,
  showResidences = false,
  height = '500px'
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<google.maps.Map | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);
  const { toast } = useToast();

  const fetchGoogleMapsApiKey = async () => {
    try {
      console.log('Buscando chave da API do Google Maps...');
      const { data, error } = await supabase.functions.invoke('google-maps-api');
      
      if (error) {
        console.error('Erro ao buscar chave da API:', error);
        toast({
          title: "Erro de configuração",
          description: "Não foi possível carregar a configuração do mapa.",
          variant: "destructive"
        });
        return null;
      }

      if (data?.apiKey) {
        console.log('Chave da API recebida com sucesso');
        return data.apiKey;
      }
      
      return null;
    } catch (error) {
      console.error('Erro ao conectar com o serviço de mapas:', error);
      toast({
        title: "Erro de conexão",
        description: "Não foi possível conectar com o serviço de mapas.",
        variant: "destructive"
      });
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
        libraries: ['marker', 'geometry']
      });

      await loader.load();
      setGoogleMapsLoaded(true);
      console.log('Google Maps carregado com sucesso');
    } catch (error) {
      console.error('Erro ao carregar Google Maps:', error);
      toast({
        title: "Erro no mapa",
        description: "Não foi possível carregar o Google Maps.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const initializeMap = () => {
    if (!mapContainer.current || !googleMapsLoaded) return;

    console.log('Inicializando mapa para Pindamonhangaba...');
    
    // Coordenadas corretas de Pindamonhangaba
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

    addMarkers();
    addHeatMapData();
  };

  const addMarkers = () => {
    if (!map.current) return;

    // Unidades de saúde
    if (showHealthUnits) {
      healthUnits.forEach(unit => {
        const marker = new google.maps.Marker({
          position: {
            lat: unit.address.latitude,
            lng: unit.address.longitude
          },
          map: map.current!,
          title: unit.name,
          icon: {
            url: unit.type === 'Hospital' ? 
              'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23ef4444"%3E%3Cpath d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/%3E%3C/svg%3E' :
              'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%233b82f6"%3E%3Cpath d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/%3E%3C/svg%3E',
            scaledSize: new google.maps.Size(30, 30)
          }
        });

        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div style="padding: 10px; font-family: Arial, sans-serif;">
              <h3 style="margin: 0 0 10px 0; color: #1f2937;">${unit.name}</h3>
              <p style="margin: 5px 0; color: #6b7280;"><strong>Tipo:</strong> ${unit.type}</p>
              <p style="margin: 5px 0; color: #6b7280;"><strong>Endereço:</strong> ${unit.address.street}, ${unit.address.number}</p>
              <p style="margin: 5px 0; color: #6b7280;"><strong>Bairro:</strong> ${unit.address.neighborhood}</p>
              <p style="margin: 5px 0; color: #6b7280;"><strong>Médicos:</strong> ${unit.doctors}</p>
              <p style="margin: 5px 0; color: #6b7280;"><strong>Capacidade:</strong> ${unit.capacity} pacientes</p>
            </div>
          `
        });

        marker.addListener('click', () => {
          infoWindow.open(map.current!, marker);
        });
      });
    }

    // Marcadores de bairros com dados epidemiológicos
    neighborhoods.forEach(neighborhood => {
      const epidData = epidemiologicalData.find(ed => ed.neighborhood === neighborhood.name);
      const totalCases = epidData ? Object.values(epidData.cases).reduce((a, b) => a + b, 0) : 0;
      const riskLevel = epidData?.riskLevel || 'low';

      const marker = new google.maps.Marker({
        position: {
          lat: neighborhood.lat,
          lng: neighborhood.lng
        },
        map: map.current!,
        title: neighborhood.name,
        icon: {
          url: `data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${getRiskColor(riskLevel)}"%3E%3Cpath d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/%3E%3C/svg%3E`,
          scaledSize: new google.maps.Size(40, 40)
        }
      });

      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div style="padding: 10px; font-family: Arial, sans-serif;">
            <h3 style="margin: 0 0 10px 0; color: #1f2937;">${neighborhood.name}</h3>
            <p style="margin: 5px 0; color: #6b7280;"><strong>População:</strong> ${neighborhood.population.toLocaleString()}</p>
            <p style="margin: 5px 0; color: #6b7280;"><strong>Total de casos:</strong> ${totalCases}</p>
            <div style="margin: 10px 0;">
              <span style="display: inline-block; padding: 4px 8px; border-radius: 12px; font-size: 12px; font-weight: 500; ${getRiskBadgeStyle(riskLevel)}">
                ${getRiskLabel(riskLevel)}
              </span>
            </div>
            ${epidData ? `
              <div style="margin-top: 10px; font-size: 12px;">
                <p style="margin: 2px 0;"><strong>Dengue:</strong> ${epidData.cases.dengue}</p>
                <p style="margin: 2px 0;"><strong>COVID-19:</strong> ${epidData.cases.covid}</p>
                <p style="margin: 2px 0;"><strong>Influenza:</strong> ${epidData.cases.influenza}</p>
                <p style="margin: 2px 0;"><strong>Hepatite:</strong> ${epidData.cases.hepatite}</p>
              </div>
            ` : ''}
          </div>
        `
      });

      marker.addListener('click', () => {
        infoWindow.open(map.current!, marker);
      });
    });
  };

  const addHeatMapData = () => {
    if (!map.current || !showEpidemiological) return;

    // Adicionar círculos para representar intensidade de casos
    neighborhoods.forEach(neighborhood => {
      const epidData = epidemiologicalData.find(ed => ed.neighborhood === neighborhood.name);
      const totalCases = epidData ? Object.values(epidData.cases).reduce((a, b) => a + b, 0) : 0;
      
      if (totalCases > 0) {
        const circle = new google.maps.Circle({
          strokeColor: getRiskColor(epidData?.riskLevel || 'low'),
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: getRiskColor(epidData?.riskLevel || 'low'),
          fillOpacity: 0.35,
          map: map.current!,
          center: {
            lat: neighborhood.lat,
            lng: neighborhood.lng
          },
          radius: Math.max(200, totalCases * 50) // Raio baseado no número de casos
        });
      }
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

  const getRiskBadgeStyle = (riskLevel: string): string => {
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

  const getRiskBadgeClass = (riskLevel: string): string => {
    switch (riskLevel) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  useEffect(() => {
    loadGoogleMaps();
  }, []);

  useEffect(() => {
    if (googleMapsLoaded) {
      initializeMap();
    }
  }, [googleMapsLoaded]);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Mapa Epidemiológico - Pindamonhangaba/SP
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64">
          <div className="flex items-center gap-2">
            <RefreshCw className="w-5 h-5 animate-spin" />
            <span>Carregando mapa de Pindamonhangaba...</span>
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

export default GoogleMapsPindamonhangaba;