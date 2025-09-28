import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart3, TrendingUp, Coins, LineChart as LineChartIcon } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, AreaChart, Area } from 'recharts';

const margemMensal = [
  { mes: 'Jan', margem: 18.4, margemMeta: 18 },
  { mes: 'Fev', margem: 19.1, margemMeta: 18.5 },
  { mes: 'Mar', margem: 20.2, margemMeta: 19 },
  { mes: 'Abr', margem: 21.3, margemMeta: 19.5 },
  { mes: 'Mai', margem: 22.5, margemMeta: 20 },
  { mes: 'Jun', margem: 23.1, margemMeta: 20.5 }
];

const paybackProjetos = [
  { nome: 'Automação Glosa', roi: 320, payback: 4 },
  { nome: 'Checklist Digital', roi: 210, payback: 6 },
  { nome: 'BI OPME', roi: 185, payback: 8 },
  { nome: 'Central APS', roi: 140, payback: 10 }
];

const OSSROIRentabilidade = () => {
  return (
    <div className="min-h-screen space-y-8 bg-gradient-to-br from-slate-950 via-slate-900 to-black p-6 text-slate-100">
      <header className="space-y-2">
        <Badge className="bg-emerald-500/20 text-emerald-200">Financeiro</Badge>
        <h1 className="text-3xl font-bold text-white">ROI & Rentabilidade</h1>
        <p className="max-w-3xl text-sm text-slate-300">
          Indicadores de retorno sobre investimento e margem operacional da OSS, com foco em projetos estratégicos e eficiência contratual.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[{
          titulo: 'Margem EBITDA (jun/25)',
          valor: '23,1%',
          detalhe: '+4,7 p.p. vs jun/24'
        }, {
          titulo: 'ROI médio dos projetos',
          valor: '214%',
          detalhe: 'Top 5 iniciativas OSS'
        }, {
          titulo: 'Economia anual prevista',
          valor: 'R$ 4,1M',
          detalhe: 'Automação + renegociação'
        }, {
          titulo: 'Payback médio',
          valor: '6,2 meses',
          detalhe: 'Iniciativas 2024/2025'
        }].map((card) => (
          <Card key={card.titulo} className="border border-white/10 bg-slate-900/80 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-sm text-slate-300">{card.titulo}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-2xl font-semibold text-white">{card.valor}</p>
              <span className="text-xs text-slate-400">{card.detalhe}</span>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.5fr,1fr]">
        <Card className="border border-white/10 bg-slate-900/80 backdrop-blur">
          <CardHeader className="flex flex-col gap-1">
            <CardTitle className="flex items-center gap-2 text-white">
              <LineChartIcon className="h-5 w-5 text-emerald-300" /> Evolução da margem contratual
            </CardTitle>
            <p className="text-xs text-slate-400">Comparativo entre margem real e meta por mês</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={margemMensal}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis dataKey="mes" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" tickFormatter={(value) => `${value}%`} />
                <Tooltip
                  contentStyle={{
                    background: '#0f172a',
                    border: '1px solid rgba(148,163,184,0.2)',
                    borderRadius: '0.75rem',
                    color: '#e2e8f0'
                  }}
                  formatter={(value: number, name: string) => [`${value}%`, name === 'margem' ? 'Margem Real' : 'Meta']}
                />
                <Legend wrapperStyle={{ color: '#cbd5f5', paddingTop: '12px' }} />
                <Line type="monotone" dataKey="margem" name="Margem real" stroke="#34d399" strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="margemMeta" name="Meta" stroke="#60a5fa" strokeDasharray="6 6" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border border-white/10 bg-slate-900/80 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Coins className="h-5 w-5 text-amber-300" />Payback por iniciativa
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-300">
            {paybackProjetos.map((projeto) => (
              <div key={projeto.nome} className="rounded-2xl bg-white/5 px-4 py-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-white">{projeto.nome}</span>
                  <span className="text-emerald-300">ROI {projeto.roi}%</span>
                </div>
                <p className="text-xs text-slate-400">Payback estimado em {projeto.payback} meses</p>
              </div>
            ))}
            <p className="text-xs text-slate-400">
              Projetos priorizados via análise de dados e simulação de cenários. Próxima revisão em 30 dias.
            </p>
          </CardContent>
        </Card>
      </section>

      <Card className="border border-white/10 bg-slate-900/80 backdrop-blur">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <BarChart3 className="h-5 w-5 text-sky-300" />Healthy Score da rentabilidade
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={margemMensal}>
              <defs>
                <linearGradient id="roiGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="4 4" stroke="#1f2937" />
              <XAxis dataKey="mes" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" tickFormatter={(value) => `${value}%`} />
              <Tooltip
                contentStyle={{
                  background: '#0f172a',
                  border: '1px solid rgba(148,163,184,0.2)',
                  borderRadius: '0.75rem',
                  color: '#e2e8f0'
                }}
              />
              <Area type="monotone" dataKey="margem" stroke="#38bdf8" strokeWidth={3} fill="url(#roiGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default OSSROIRentabilidade;
