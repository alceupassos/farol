import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { QualityAnalysisData, SeverityLevel } from '@/modules/oss/types/kpis';
import {
  AreaChart,
  Area,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const severityColor: Record<SeverityLevel, { bar: string; text: string }> = {
  critico: { bar: 'bg-rose-500', text: 'text-rose-200' },
  grave: { bar: 'bg-amber-500', text: 'text-amber-200' },
  atencao: { bar: 'bg-yellow-500', text: 'text-yellow-900' },
  estavel: { bar: 'bg-emerald-500', text: 'text-emerald-200' },
};

interface QualityIndicatorsProps {
  data: QualityAnalysisData;
}

const QualityIndicators: React.FC<QualityIndicatorsProps> = ({ data }) => {
  return (
    <section className="space-y-4">
      <header>
        <h2 className="text-xl font-semibold text-white">Indicadores de Qualidade Assistencial</h2>
        <p className="text-sm text-slate-300">
          Métricas clínicas críticas acompanhadas pela diretoria assistencial.
        </p>
      </header>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="border-slate-800 bg-slate-950/80">
          <CardHeader>
            <CardTitle className="text-white">Indicadores Prioritários</CardTitle>
            <CardDescription className="text-slate-400">
              Monitoramento contínuo por gravidade e meta estabelecida.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.indicators.map((item) => {
              const colors = severityColor[item.severidade];
              const progressValue = Math.min((item.valor / item.meta) * 100, 120);

              return (
                <div key={item.indicador} className="space-y-2 rounded-lg border border-slate-800/60 bg-slate-900/70 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-white">{item.indicador}</p>
                      <p className="text-xs text-slate-300">Meta: {item.meta} {item.unidade}</p>
                    </div>
                    <p className={`text-sm font-semibold ${colors.text}`}>
                      {item.valor} {item.unidade}
                    </p>
                  </div>
                  <Progress
                    value={Math.min(progressValue, 100)}
                    className="h-2 bg-slate-800"
                    indicatorClassName={`${colors.bar}`}
                  />
                  <div className="text-xs text-slate-300">
                    {item.descricao}
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card className="border-slate-800 bg-slate-950/80">
          <CardHeader>
            <CardTitle className="text-white">Tendência Clínica 6M</CardTitle>
            <CardDescription className="text-slate-400">
              Evolução de infecção hospitalar, mortalidade e cancelamento cirúrgico.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.timeline}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="mes" stroke="#64748b" />
                <YAxis stroke="#64748b" tickFormatter={(value) => `${value}%`} />
                <Tooltip formatter={(value: number) => `${value.toFixed(1)}%`} />
                <Legend />
                <Area type="monotone" dataKey="infeccao" name="Infecção" stroke="#ef4444" fill="#ef4444" fillOpacity={0.25} />
                <Area type="monotone" dataKey="mortalidade" name="Mortalidade" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.2} />
                <Area type="monotone" dataKey="cancelamento" name="Cancelamento" stroke="#22d3ee" fill="#22d3ee" fillOpacity={0.2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default QualityIndicators;
