import React, { useEffect, useMemo, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Badge } from '@/components/ui/badge';
import { AphAmbulance, AphMapConfig } from '@/modules/aph/types';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN ?? '';

interface AphRealtimeMapProps {
  mapConfig: AphMapConfig;
  ambulances: AphAmbulance[];
  onSelect?: (ambulance: AphAmbulance | null) => void;
}

const severityColor: Record<AphAmbulance['status'], string> = {
  livre: 'bg-emerald-500/80 shadow-emerald-500/40',
  deslocamento: 'bg-sky-500/80 shadow-sky-500/40',
  em_atendimento: 'bg-rose-500/80 shadow-rose-500/40',
  indisponivel: 'bg-slate-500/80 shadow-slate-500/40'
};

export const AphRealtimeMap: React.FC<AphRealtimeMapProps> = ({ mapConfig, ambulances, onSelect }) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<Record<string, mapboxgl.Marker>>({});
  const [tokenMissing] = useState(() => !mapboxgl.accessToken);

  useEffect(() => {
    if (!mapContainer.current || mapRef.current || tokenMissing) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: mapConfig.center,
      zoom: mapConfig.zoom,
      cooperativeGestures: true
    });

    mapRef.current.addControl(new mapboxgl.FullscreenControl());
    mapRef.current.addControl(new mapboxgl.NavigationControl({ visualizePitch: true }));

    return () => {
      Object.values(markersRef.current).forEach((marker) => marker.remove());
      mapRef.current?.remove();
      mapRef.current = null;
      markersRef.current = {};
    };
  }, [mapConfig.center, mapConfig.zoom, tokenMissing]);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = mapRef.current;

    map.on('load', () => {
      mapConfig.layers.forEach((layer) => {
        if (layer.type === 'heatmap') {
          const id = `layer-${layer.id}`;
          if (!map.getSource(id)) {
            map.addSource(id, {
              type: 'geojson',
              data: {
                type: 'FeatureCollection',
                features: ambulances.map((ambulance) => ({
                  type: 'Feature',
                  geometry: {
                    type: 'Point',
                    coordinates: ambulance.coordinates
                  },
                  properties: {}
                }))
              }
            });
            map.addLayer({
              id,
              type: 'heatmap',
              source: id,
              paint: {
                'heatmap-color': [
                  'interpolate',
                  ['linear'],
                  ['heatmap-density'],
                  0,
                  'rgba(59,130,246,0)',
                  0.5,
                  layer.color,
                  1,
                  'rgba(239,68,68,0.8)'
                ],
                'heatmap-radius': 40,
                'heatmap-intensity': 0.8
              }
            });
          }
        }
      });
    });
  }, [ambulances, mapConfig.layers]);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = mapRef.current;

    ambulances.forEach((ambulance) => {
      const existingMarker = markersRef.current[ambulance.id];
      if (existingMarker) {
        existingMarker.setLngLat(ambulance.coordinates);
        return;
      }

      const el = document.createElement('div');
      el.className = `flex h-8 w-8 items-center justify-center rounded-full border border-white/40 text-[10px] font-semibold text-white shadow-lg ${severityColor[ambulance.status]}`;
      el.textContent = ambulance.id.split('-')[0];
      el.style.cursor = 'pointer';

      el.addEventListener('click', () => {
        onSelect?.(ambulance);
      });

      const marker = new mapboxgl.Marker(el)
        .setLngLat(ambulance.coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 12 }).setHTML(
            `<div class="text-xs">
              <p class="font-semibold">${ambulance.name}</p>
              <p>Status: ${ambulance.status.replace('_', ' ')}</p>
              ${ambulance.destination ? `<p>Destino: ${ambulance.destination}</p>` : ''}
              <p>Atualizado ${ambulance.lastUpdate}</p>
            </div>`
          )
        )
        .addTo(map);

      markersRef.current[ambulance.id] = marker;
    });

    Object.keys(markersRef.current).forEach((id) => {
      if (!ambulances.find((amb) => amb.id === id)) {
        markersRef.current[id].remove();
        delete markersRef.current[id];
      }
    });
  }, [ambulances, onSelect]);

  const layerBadges = useMemo(() => (
    <div className="flex flex-wrap gap-2">
      {mapConfig.layers.map((layer) => (
        <Badge key={layer.id} variant="secondary" className="bg-slate-800/70 text-slate-200">
          {layer.description}
        </Badge>
      ))}
    </div>
  ), [mapConfig.layers]);

  if (tokenMissing) {
    return (
      <div className="rounded-xl border border-rose-500/40 bg-rose-500/10 p-6 text-sm text-rose-100">
        <p className="font-semibold">Token Mapbox não configurado</p>
        <p className="mt-2 text-xs text-rose-200">
          Defina a variável <code class="font-mono">VITE_MAPBOX_TOKEN</code> para visualizar o mapa em tempo real.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {layerBadges}
      <div ref={mapContainer} className="h-[420px] w-full overflow-hidden rounded-xl border border-slate-800" />
    </div>
  );
};

export default AphRealtimeMap;
