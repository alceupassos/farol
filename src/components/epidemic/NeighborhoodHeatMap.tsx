import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { piracicabaNeighborhoods, getRiskColor, getRiskIntensity, getRiskRadius } from '@/data/piracicabaNeighborhoods';
import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';

interface NeighborhoodHeatMapProps {
  onNeighborhoodSelect?: (neighborhoodId: string) => void;
  selectedDisease?: string;
}

export const NeighborhoodHeatMap: React.FC<NeighborhoodHeatMapProps> = ({
  onNeighborhoodSelect,
  selectedDisease = 'all'
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  const [mapboxToken, setMapboxToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch Mapbox token
  useEffect(() => {
    const fetchMapboxToken = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase.functions.invoke('mapbox-token');
        
        if (error) {
          console.error('Error fetching Mapbox token:', error);
          toast.error('Erro ao carregar token do Mapbox');
          return;
        }

        if (data?.token) {
          setMapboxToken(data.token);
          mapboxgl.accessToken = data.token;
        }
      } catch (error) {
        console.error('Error fetching Mapbox token:', error);
        toast.error('Erro ao conectar com o serviço de mapas');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMapboxToken();
  }, []);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [-47.6487, -22.7254], // Centro de Piracicaba
      zoom: 12,
      pitch: 0,
      bearing: 0
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Wait for map to load before adding data
    map.current.on('load', () => {
      addHeatMapData();
      addNeighborhoodMarkers();
    });

    return () => {
      map.current?.remove();
    };
  }, [mapboxToken]);

  // Update markers when disease filter changes
  useEffect(() => {
    if (map.current && map.current.isStyleLoaded()) {
      clearMarkers();
      addNeighborhoodMarkers();
    }
  }, [selectedDisease]);

  const addHeatMapData = () => {
    if (!map.current) return;

    // Create GeoJSON data for heat map
    const heatMapData = {
      type: 'FeatureCollection' as const,
      features: piracicabaNeighborhoods.map(neighborhood => ({
        type: 'Feature' as const,
        geometry: {
          type: 'Point' as const,
          coordinates: neighborhood.coordinates
        },
        properties: {
          id: neighborhood.id,
          name: neighborhood.name,
          cases: neighborhood.activeCases,
          riskLevel: neighborhood.riskLevel,
          intensity: getRiskIntensity(neighborhood.riskLevel)
        }
      }))
    };

    // Add heat map source
    map.current.addSource('epidemic-heatmap', {
      type: 'geojson',
      data: heatMapData
    });

    // Add heat map layer with dramatic visual effects
    map.current.addLayer({
      id: 'epidemic-heatmap-layer',
      type: 'heatmap',
      source: 'epidemic-heatmap',
      maxzoom: 15,
      paint: {
        'heatmap-weight': [
          'interpolate',
          ['linear'],
          ['get', 'intensity'],
          0, 0,
          1, 1
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
          0, 'rgba(33, 102, 172, 0)',
          0.2, 'rgb(103, 169, 207)',
          0.4, 'rgb(209, 229, 240)',
          0.6, 'rgb(253, 219, 199)',
          0.8, 'rgb(239, 138, 98)',
          1, 'rgb(178, 24, 43)'
        ],
        'heatmap-radius': [
          'interpolate',
          ['linear'],
          ['zoom'],
          0, 20,
          15, 40
        ],
        'heatmap-opacity': [
          'interpolate',
          ['linear'],
          ['zoom'],
          7, 0.8,
          15, 0.6
        ]
      }
    });
  };

  const clearMarkers = () => {
    markers.current.forEach(marker => marker.remove());
    markers.current = [];
  };

  const addNeighborhoodMarkers = () => {
    if (!map.current) return;

    clearMarkers();

    piracicabaNeighborhoods.forEach(neighborhood => {
      const el = document.createElement('div');
      el.className = 'epidemic-marker';
      
      // Get cases based on selected disease
      let cases = neighborhood.activeCases;
      if (selectedDisease !== 'all') {
        cases = neighborhood.epidemiologicalData[selectedDisease as keyof typeof neighborhood.epidemiologicalData]?.cases || 0;
      }

      const riskColor = getRiskColor(neighborhood.riskLevel);
      const radius = getRiskRadius(neighborhood.riskLevel);
      
      // Create pulsing marker for critical areas
      const shouldPulse = neighborhood.riskLevel === 'CRÍTICO' || neighborhood.riskLevel === 'EMERGÊNCIA';
      
      el.style.cssText = `
        width: ${radius}px;
        height: ${radius}px;
        background: ${riskColor};
        border: 3px solid rgba(255, 255, 255, 0.8);
        border-radius: 50%;
        cursor: pointer;
        box-shadow: 0 0 20px rgba(${riskColor.slice(1).match(/.{2}/g)?.map(hex => parseInt(hex, 16)).join(', ')}, 0.6);
        ${shouldPulse ? 'animation: pulse-epidemic 2s infinite;' : ''}
        position: relative;
        transform: translate(-50%, -50%);
      `;

      // Add CSS animation for pulsing effect
      if (!document.getElementById('epidemic-pulse-styles')) {
        const style = document.createElement('style');
        style.id = 'epidemic-pulse-styles';
        style.textContent = `
          @keyframes pulse-epidemic {
            0% { transform: translate(-50%, -50%) scale(1); }
            50% { transform: translate(-50%, -50%) scale(1.3); box-shadow: 0 0 30px rgba(239, 68, 68, 0.8); }
            100% { transform: translate(-50%, -50%) scale(1); }
          }
        `;
        document.head.appendChild(style);
      }

      // Create popup content
      const popupContent = `
        <div class="p-4 bg-card text-card-foreground rounded-lg max-w-sm">
          <div class="flex items-center justify-between mb-3">
            <h3 class="font-bold text-lg">${neighborhood.name}</h3>
            <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium" 
                  style="background-color: ${riskColor}20; color: ${riskColor}; border: 1px solid ${riskColor};">
              ${neighborhood.riskLevel}
            </span>
          </div>
          
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="text-muted-foreground">Casos Ativos:</span>
              <span class="font-semibold">${cases}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-muted-foreground">População:</span>
              <span class="font-semibold">${neighborhood.population.toLocaleString()}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-muted-foreground">Casos/1000 hab:</span>
              <span class="font-semibold">${neighborhood.casesPerThousand}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-muted-foreground">Última atualização:</span>
              <span class="font-semibold">${new Date(neighborhood.lastUpdate).toLocaleDateString('pt-BR')}</span>
            </div>
          </div>

          ${selectedDisease === 'all' ? `
            <div class="mt-3 pt-3 border-t border-border">
              <h4 class="font-medium mb-2">Breakdown por Doença:</h4>
              <div class="grid grid-cols-2 gap-2 text-xs">
                <div class="flex justify-between">
                  <span>Dengue:</span>
                  <span class="font-semibold">${neighborhood.epidemiologicalData.dengue.cases}</span>
                </div>
                <div class="flex justify-between">
                  <span>COVID:</span>
                  <span class="font-semibold">${neighborhood.epidemiologicalData.covid.cases}</span>
                </div>
                <div class="flex justify-between">
                  <span>Influenza:</span>
                  <span class="font-semibold">${neighborhood.epidemiologicalData.influenza.cases}</span>
                </div>
                <div class="flex justify-between">
                  <span>Outras:</span>
                  <span class="font-semibold">${neighborhood.epidemiologicalData.other.cases}</span>
                </div>
              </div>
            </div>
          ` : ''}

          <button onclick="window.selectNeighborhood('${neighborhood.id}')" 
                  class="mt-3 w-full px-3 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
            Ver Detalhes Completos
          </button>
        </div>
      `;

      const popup = new mapboxgl.Popup({ 
        offset: 25,
        closeButton: true,
        closeOnClick: false,
        maxWidth: '300px'
      }).setHTML(popupContent);

      const marker = new mapboxgl.Marker(el)
        .setLngLat(neighborhood.coordinates)
        .setPopup(popup)
        .addTo(map.current);

      // Handle marker click
      el.addEventListener('click', () => {
        onNeighborhoodSelect?.(neighborhood.id);
      });

      markers.current.push(marker);
    });

    // Add global function for popup button
    (window as any).selectNeighborhood = (id: string) => {
      onNeighborhoodSelect?.(id);
    };
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="flex items-center gap-3">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Carregando mapa epidemiológico...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="w-full h-full rounded-lg" />
      
      {/* Floating legend */}
      <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg">
        <h4 className="font-medium text-sm mb-2">Legenda do Mapa</h4>
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>Baixo Risco</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span>Moderado</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <span>Alto Risco</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
            <span>Crítico</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-500 animate-pulse"></div>
            <span>Emergência</span>
          </div>
        </div>
      </div>
    </div>
  );
};
