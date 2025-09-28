import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PerformanceRankingData, SeverityLevel } from '@/modules/oss/types/kpis';
import { TrendingDown, TrendingUp } from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from 'recharts';

const severityColors: Record<SeverityLevel, string> = {
  critico: 'bg-rose-500/20 text-rose-200 border border-rose-500/40',
  grave: 'bg-amber-500/20 text-amber-200 border border-amber-500/40',
  atencao: 'bg-yellow-500/20 text-yellow-900 border border-yellow-500/40',
  estavel: 'bg-emerald-500/20 text-emerald-900 border border-emerald-400/40',
};

interface PerformanceRankingProps {
  data: PerformanceRankingData;
}

const PerformanceRanking: React.FC<PerformanceRankingProps> = ({ data }) => {
  return (
    <section className="space-y-4">
      <header>
        <h2 className="text-xl font-semibold text-white">Rankings de Desempenho</h2>
        <p className="text-sm text-slate-300">
          Unidades com performance destacada e áreas que exigem intervenção imediata.
        </p>
      </header>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="border-slate-800 bg-slate-950/80">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <TrendingUp className="h-4 w-4 text-emerald-300" /> Top 5 Melhores Unidades
            </CardTitle>
            <CardDescription className="text-slate-400">
              Performance acima da média com variação positiva no período.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.topPerformers.map((item) => (
              <div
                key={item.unidade}
                className="flex items-center justify-between rounded-lg border border-slate-800/60 bg-slate-900/70 px-4 py-3"
              >
                <div>
                  <p className="text-sm font-semibold text-white">{item.unidade}</p>
                  <p className="text-xs text-slate-300">Score C-Level: {item.score.toFixed(1)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={`text-[10px] uppercase ${severityColors[item.severidade]}`}>
                    {item.severidade}
                  </Badge>
                  <span className="text-xs text-emerald-300">+{item.variacao.toFixed(1)} pts</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-slate-800 bg-slate-950/80">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <TrendingDown className="h-4 w-4 text-rose-300" /> Top 5 Unidades em Atenção
            </CardTitle>
            <CardDescription className="text-slate-400">
              Indicadores críticos com ação imediata necessária pela diretoria.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.needsAttention.map((item) => (
              <div
                key={item.unidade}
                className="flex items-center justify-between rounded-lg border border-rose-500/30 bg-rose-500/10 px-4 py-3"
              >
                <div>
                  <p className="text-sm font-semibold text-white">{item.unidade}</p>
                  <p className="text-xs text-rose-100">Score: {item.score.toFixed(1)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={`text-[10px] uppercase ${severityColors[item.severidade]}`}>
                    {item.severidade}
                  </Badge>
                  <span className="text-xs text-rose-200">{item.variacao.toFixed(1)} pts</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-slate-800 bg-slate-950/80">
          <CardHeader>
            <CardTitle className="text-white">Comparativo Mensal de Score</CardTitle>
            <CardDescription className="text-slate-400">
              Evolução entre melhores unidades, áreas críticas e média integrada.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.monthlyComparison}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="mes" stroke="#64748b" />
                <YAxis stroke="#64748b" domain={[70, 100]} tick={{ fontSize: 12 }} />
                <Tooltip cursor={{ stroke: '#475569', strokeDasharray: '3 3' }} />
                <Legend />
                <Line type="monotone" dataKey="melhores" name="Melhores" stroke="#22c55e" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="atencao" name="Unidades em Atenção" stroke="#f97316" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="mediaRede" name="Média Rede" stroke="#3b82f6" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default PerformanceRanking;
