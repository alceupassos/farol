import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { HospitalKPI, SeverityLevel } from '@/modules/oss/types/kpis';
import { getIconFromKey } from './iconMap';

const severityConfig: Record<SeverityLevel, { badge: string; gradient: string; text: string; border: string }> = {
  critico: {
    badge: 'Crítico',
    gradient: 'from-rose-600/80 via-rose-500/60 to-rose-400/40',
    text: 'text-rose-50',
    border: 'border-rose-500/40',
  },
  grave: {
    badge: 'Grave',
    gradient: 'from-amber-600/70 via-amber-500/55 to-amber-400/40',
    text: 'text-amber-50',
    border: 'border-amber-500/40',
  },
  atencao: {
    badge: 'Atenção',
    gradient: 'from-yellow-500/70 via-yellow-400/55 to-yellow-300/40',
    text: 'text-yellow-900',
    border: 'border-yellow-400/40',
  },
  estavel: {
    badge: 'Estável',
    gradient: 'from-emerald-500/70 via-emerald-400/55 to-emerald-300/40',
    text: 'text-emerald-100',
    border: 'border-emerald-400/40',
  },
};

interface HospitalKPISectionProps {
  title?: string;
  subtitle?: string;
  kpis: HospitalKPI[];
}

const HospitalKPISection: React.FC<HospitalKPISectionProps> = ({ title, subtitle, kpis }) => {
  return (
    <section className="space-y-4">
      {(title || subtitle) && (
        <header className="space-y-1">
          {title && <h2 className="text-xl font-semibold text-white">{title}</h2>}
          {subtitle && <p className="text-sm text-slate-300">{subtitle}</p>}
        </header>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {kpis.map((kpi) => {
          const severity = severityConfig[kpi.severidade];
          const Icon = getIconFromKey(kpi.icon);

          return (
            <Card
              key={kpi.id}
              className={`relative overflow-hidden border ${severity.border} bg-slate-950/80 backdrop-blur-md`}
            >
              <div className={`absolute inset-0 -z-10 bg-gradient-to-br ${severity.gradient}`} />
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
                <div>
                  <CardTitle className={`text-sm font-medium ${severity.text}`}>{kpi.titulo}</CardTitle>
                  <CardDescription className="text-xs text-slate-100/70 max-w-[200px]">
                    {kpi.descricao}
                  </CardDescription>
                </div>
                <Badge className="bg-black/40 text-[10px] uppercase tracking-wide text-white">
                  {severity.badge}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-3xl font-bold leading-tight ${severity.text}`}>{kpi.valor}</p>
                    {kpi.meta && (
                      <p className="text-xs text-white/80">Meta: {kpi.meta}</p>
                    )}
                  </div>
                  <div className="rounded-full bg-black/40 p-2 text-white/80">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
                <p className="text-xs text-white/80">{kpi.variacao}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

export default HospitalKPISection;
