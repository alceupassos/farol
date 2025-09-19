import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, Gauge, Globe2, ShieldCheck, Zap } from 'lucide-react';

const highlightCards = [
  {
    title: 'Conformidade RNDS',
    metric: '97,8%',
    delta: '+0,4% nos últimos 7 dias',
    icon: ShieldCheck,
    badge: 'Bundles aceitos'
  },
  {
    title: 'SLA STAT (hemato)',
    metric: '94%',
    delta: '+6 pontos vs meta',
    icon: Zap,
    badge: 'Painéis críticos'
  },
  {
    title: 'Latência média APIs',
    metric: '820ms',
    delta: '-180ms semana anterior',
    icon: Gauge,
    badge: 'Fleury · Pardini · Dasa'
  },
  {
    title: 'Uptime integrações',
    metric: '99,6%',
    delta: 'SLO cumprido (>= 99,5%)',
    icon: Globe2,
    badge: 'RNDS + parceiros'
  },
  {
    title: 'Rejeições pré-analíticas',
    metric: '1,2%',
    delta: '-0,3% vs mês anterior',
    icon: Activity,
    badge: 'Hematologia · Imuno'
  }
];

const LabKpiHighlights = () => (
  <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
    {highlightCards.map((item) => {
      const Icon = item.icon;
      return (
        <Card key={item.title} className="border border-white/10 bg-slate-900/70">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm text-slate-200">{item.title}</CardTitle>
              <Badge className="bg-white/10 text-slate-100 border border-white/20">{item.badge}</Badge>
            </div>
            <div className="flex items-end gap-2">
              <p className="text-2xl font-semibold text-white">{item.metric}</p>
              <Icon className="w-4 h-4 text-emerald-300" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-slate-400">{item.delta}</p>
          </CardContent>
        </Card>
      );
    })}
  </section>
);

export default LabKpiHighlights;
