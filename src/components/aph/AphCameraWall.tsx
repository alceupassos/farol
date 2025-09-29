import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AphCameraFeed } from '@/modules/aph/types';

interface AphCameraWallProps {
  feeds: AphCameraFeed[];
}

const statusBadge: Record<AphCameraFeed['status'], string> = {
  ok: 'bg-emerald-500/20 text-emerald-200 border border-emerald-500/40',
  alerta: 'bg-amber-500/20 text-amber-200 border border-amber-500/40',
  offline: 'bg-rose-500/20 text-rose-200 border border-rose-500/40'
};

const AphCameraWall: React.FC<AphCameraWallProps> = ({ feeds }) => {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-white">Monitoramento de câmeras</h2>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {feeds.map((feed) => (
          <Card key={feed.id} className="border-slate-800 bg-slate-900/70">
            <CardHeader className="space-y-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm text-white">{feed.title}</CardTitle>
                <Badge className={statusBadge[feed.status]}>
                  {feed.status === 'ok' && 'ONLINE'}
                  {feed.status === 'alerta' && 'ALERTA'}
                  {feed.status === 'offline' && 'OFFLINE'}
                </Badge>
              </div>
              <CardDescription className="text-xs text-slate-400">
                Unidade {feed.unit} • Latência {feed.latency} • Atualizado {feed.updatedAt}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="overflow-hidden rounded-lg border border-slate-800">
                <img
                  src={feed.thumbnail}
                  alt={`Câmera ${feed.title}`}
                  className="h-40 w-full object-cover transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                />
              </div>
              {feed.description && (
                <p className="text-xs text-slate-300 leading-relaxed">{feed.description}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default AphCameraWall;
