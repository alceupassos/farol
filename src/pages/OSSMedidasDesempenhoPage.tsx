import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import HospitalKPISection from '@/components/metrics/HospitalKPISection';
import PerformanceRanking from '@/components/metrics/PerformanceRanking';
import CostAnalysis from '@/components/metrics/CostAnalysis';
import QualityIndicators from '@/components/metrics/QualityIndicators';
import { getHospitalPerformanceSnapshot } from '@/modules/oss/services/hospitalPerformance';
import { SeverityLevel } from '@/modules/oss/types/kpis';
import { getIconFromKey } from '@/components/metrics/iconMap';
import {
  ResponsiveContainer,
  ComposedChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  AreaChart,
  Area,
  Line,
  Bar,
} from 'recharts';
import { Activity, Flame, Presentation } from 'lucide-react';

const severityPalette: Record<SeverityLevel, { label: string; bg: string; text: string }> = {
  critico: { label: 'Crítico', bg: 'bg-rose-500/70', text: 'text-rose-50' },
  grave: { label: 'Grave', bg: 'bg-amber-500/70', text: 'text-amber-50' },
  atencao: { label: 'Atenção', bg: 'bg-yellow-400/70', text: 'text-yellow-900' },
  estavel: { label: 'Estável', bg: 'bg-emerald-500/70', text: 'text-emerald-100' },
};

const OSSMedidasDesempenhoPage: React.FC = () => {
  const snapshot = getHospitalPerformanceSnapshot();
  const { criticalKPIs, ranking, cost, quality, charts } = snapshot;

  const heatmapPeriods = Array.from(
    new Set(charts.heatmap.map((cell) => cell.periodo))
  );
  const heatmapByWing = charts.heatmap.reduce<Record<string, typeof charts.heatmap>>( 
    (acc, cell) => {
      acc[cell.ala] = acc[cell.ala] ? [...acc[cell.ala], cell] : [cell];
      return acc;
    },
    {}
  );

  return (
    <div className="min-h-screen space-y-8 bg-slate-950 px-6 py-8 text-slate-100">
      <header className="space-y-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Medidas de Desempenho Hospitalar</h1>
            <p className="max-w-3xl text-sm text-slate-300">
              Painel estratégico para Alta Direção, Dono e C-Level com indicadores críticos, riscos e
              insights acionáveis sobre operação, finanças e qualidade assistencial.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-rose-500/20 text-rose-200">Última atualização: {new Date(snapshot.updatedAt).toLocaleString('pt-BR')}</Badge>
            <Badge className="bg-emerald-500/20 text-emerald-200">Dados mock consolidados</Badge>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-rose-500/40 bg-rose-500/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-rose-100">
                <Flame className="h-4 w-4" /> Prioridades C-Level
              </CardTitle>
              <CardDescription className="text-rose-200">
                Ocupação crítica em UTI e filas cirúrgicas oncológicas requerem comitê diário.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-amber-500/40 bg-amber-500/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-100">
                <Activity className="h-4 w-4" /> Alertas Em Curso
              </CardTitle>
              <CardDescription className="text-amber-200">
                Readmissões 30 dias e tempo médio de atendimento na emergência estão acima da meta.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-emerald-500/40 bg-emerald-500/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-emerald-100">
                <Presentation className="h-4 w-4" /> Indicadores Consolidados
              </CardTitle>
              <CardDescription className="text-emerald-200">
                Margem operacional e satisfação paciente evoluem de forma sustentada há 3 meses.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </header>

      <HospitalKPISection
        title="Indicadores Críticos do Executivo Hospitalar"
        subtitle="Ordenados por gravidade para decisões imediatas da Alta Direção."
        kpis={criticalKPIs}
      />

      <PerformanceRanking data={ranking} />

      <CostAnalysis data={cost} />

      <QualityIndicators data={quality} />

      <section className="grid gap-4 xl:grid-cols-3">
        <Card className="border-slate-800 bg-slate-950/80 xl:col-span-2">
          <CardHeader>
            <CardTitle className="text-white">Gráfico de Tendência Mensal</CardTitle>
            <CardDescription className="text-slate-400">
              Integra ocupação hospitalar, mortalidade ajustada e satisfação dos pacientes.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={charts.trend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="mes" stroke="#64748b" />
                <YAxis stroke="#64748b" tickFormatter={(value) => `${value}%`} />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="ocupacao" name="Ocupação" stroke="#ef4444" fill="#ef4444" fillOpacity={0.25} />
                <Area type="monotone" dataKey="mortalidade" name="Mortalidade" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.2} />
                <Area type="monotone" dataKey="satisfacao" name="Satisfação" stroke="#22c55e" fill="#22c55e" fillOpacity={0.2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-slate-800 bg-slate-950/80">
          <CardHeader>
            <CardTitle className="text-white">Pareto dos Principais Problemas</CardTitle>
            <CardDescription className="text-slate-400">
              Impacto financeiro mensal (R$ mil) e curva cumulativa das causas críticas.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={charts.pareto}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="causa" stroke="#64748b" tick={{ fontSize: 12 }} />
                <YAxis yAxisId="left" stroke="#64748b" orientation="left" />
                <YAxis yAxisId="right" stroke="#64748b" orientation="right" domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Bar
                  yAxisId="left"
                  dataKey="impactoFinanceiro"
                  name="Impacto (R$ mil)"
                  fill="#f97316"
                  radius={[6, 6, 0, 0]}
                />
                <Line
                  yAxisId="right"
                  dataKey="cumulativo"
                  name="% Cumulativo"
                  stroke="#38bdf8"
                  strokeWidth={2}
                  dot
                />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        <Card className="border-slate-800 bg-slate-950/80 xl:col-span-2">
          <CardHeader>
            <CardTitle className="text-white">Heatmap de Ocupação por Ala</CardTitle>
            <CardDescription className="text-slate-400">
              Visualiza turnos críticos para alocação imediata de recursos assistenciais.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-[160px_repeat(3,minmax(0,1fr))] gap-2 text-xs font-semibold uppercase tracking-wide text-slate-300">
              <div>Ala</div>
              {heatmapPeriods.map((period) => (
                <div key={period} className="text-center">{period}</div>
              ))}
            </div>
            <div className="space-y-2">
              {Object.entries(heatmapByWing).map(([ala, registros]) => (
                <div key={ala} className="grid grid-cols-[160px_repeat(3,minmax(0,1fr))] gap-2">
                  <div className="flex items-center text-sm font-medium text-white">{ala}</div>
                  {heatmapPeriods.map((periodo) => {
                    const cell = registros.find((item) => item.periodo === periodo);
                    if (!cell) {
                      return <div key={periodo} className="rounded-lg border border-slate-800/60 bg-slate-900/60 p-3 text-center text-xs text-slate-500">—</div>;
                    }
                    const palette = severityPalette[cell.severidade];
                    return (
                      <div
                        key={`${ala}-${periodo}`}
                        className={`rounded-lg border border-white/10 p-3 text-center text-sm font-semibold ${palette.bg} ${palette.text}`}
                      >
                        {cell.ocupacao}%
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-800 bg-slate-950/80">
          <CardHeader>
            <CardTitle className="text-white">Dashboard de Indicadores em Tempo Real</CardTitle>
            <CardDescription className="text-slate-400">
              Itens priorizados pelo War Room hospitalar com atualização contínua.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {charts.realtime.map((item) => {
              const Icon = getIconFromKey(item.icon);
              const palette = severityPalette[item.severidade];

              return (
                <div
                  key={item.id}
                  className={`flex items-start justify-between rounded-lg border border-white/10 p-4 ${palette.bg} ${palette.text}`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      <p className="text-sm font-semibold">{item.titulo}</p>
                    </div>
                    <p className="mt-1 text-xs text-white/90">{item.descricao}</p>
                  </div>
                  <div className="text-right text-sm font-semibold">
                    <p>{item.valor}</p>
                    <p className="text-xs text-white/80">{item.variacao}</p>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default OSSMedidasDesempenhoPage;
