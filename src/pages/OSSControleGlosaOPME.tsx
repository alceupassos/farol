import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, BarChart, Bar } from 'recharts';
import { Activity, Layers, FileSpreadsheet } from 'lucide-react';

const seriesConvênios = [
  { mes: 'Jan', sus: 3.2, unimed: 1.1, bradesco: 0.9, opme: 0.45 },
  { mes: 'Fev', sus: 3.3, unimed: 1.2, bradesco: 0.92, opme: 0.43 },
  { mes: 'Mar', sus: 3.4, unimed: 1.25, bradesco: 0.94, opme: 0.41 },
  { mes: 'Abr', sus: 3.5, unimed: 1.28, bradesco: 0.96, opme: 0.38 },
  { mes: 'Mai', sus: 3.55, unimed: 1.32, bradesco: 0.98, opme: 0.36 },
  { mes: 'Jun', sus: 3.6, unimed: 1.35, bradesco: 1.0, opme: 0.34 },
  { mes: 'Jul', sus: 3.7, unimed: 1.38, bradesco: 1.02, opme: 0.33 },
  { mes: 'Ago', sus: 3.82, unimed: 1.41, bradesco: 1.05, opme: 0.32 },
  { mes: 'Set', sus: 3.9, unimed: 1.45, bradesco: 1.08, opme: 0.31 }
];

const percentualGlosa = [
  { mes: 'Jan', tecnica: 3.4, administrativa: 2.1 },
  { mes: 'Fev', tecnica: 3.2, administrativa: 2.0 },
  { mes: 'Mar', tecnica: 3.0, administrativa: 1.9 },
  { mes: 'Abr', tecnica: 2.8, administrativa: 1.8 },
  { mes: 'Mai', tecnica: 2.6, administrativa: 1.7 },
  { mes: 'Jun', tecnica: 2.5, administrativa: 1.6 },
  { mes: 'Jul', tecnica: 2.4, administrativa: 1.6 },
  { mes: 'Ago', tecnica: 2.3, administrativa: 1.5 },
  { mes: 'Set', tecnica: 2.2, administrativa: 1.4 }
];

const OSSControleGlosaOPME = () => (
  <MainLayout>
    <div className="min-h-screen space-y-8 bg-gradient-to-br from-slate-950 via-slate-900 to-black p-6 text-slate-100">
      <header className="space-y-2">
        <Badge className="bg-rose-500/20 text-rose-200">Financeiro & OPME</Badge>
        <h1 className="text-3xl font-bold text-white">Controle de Glosa & Avanço OPME</h1>
        <p className="max-w-3xl text-sm text-slate-300">
          Indicadores por convênio (jan–set 2025) com acompanhamento de glosa técnica/administrativa e gasto em OPME.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[{
          titulo: 'Glosa consolidada (set)',
          valor: 'R$ 680k',
          detalhe: '-18% vs jan'
        }, {
          titulo: 'OPME • custo médio',
          valor: 'R$ 310k',
          detalhe: '-13% com rastreabilidade'
        }, {
          titulo: 'Convênio com maior incidência',
          valor: 'SUS — 3,9%',
          detalhe: 'Plano de ação ativo'
        }, {
          titulo: 'Recuperação média',
          valor: '74%',
          detalhe: '+5 p.p. no trimestre'
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
          <CardHeader className="flex flex-col gap-2">
            <CardTitle className="flex items-center gap-2 text-white">
              <Activity className="h-5 w-5 text-emerald-300" />Receita líquida por convênio (R$ mi)
            </CardTitle>
            <p className="text-xs text-slate-400">Inclui linha de gasto OPME consolidada no gráfico.</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={seriesConvênios}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis dataKey="mes" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    background: '#0f172a',
                    border: '1px solid rgba(148,163,184,0.2)',
                    borderRadius: '0.75rem',
                    color: '#e2e8f0'
                  }}
                  formatter={(value: number, name: string) => [`R$ ${value.toFixed(2)}M`, name.toUpperCase()]}
                />
                <Legend wrapperStyle={{ color: '#cbd5f5', paddingTop: '12px' }} />
                <Line type="monotone" dataKey="sus" stroke="#38bdf8" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="unimed" stroke="#34d399" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="bradesco" stroke="#f97316" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="opme" stroke="#a855f7" strokeWidth={3} dot />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border border-white/10 bg-slate-900/80 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Layers className="h-5 w-5 text-amber-300" />Glosa técnica x administrativa (%)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={percentualGlosa}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis dataKey="mes" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" domain={[1, 4]} tickFormatter={(value) => `${value}%`} />
                <Tooltip
                  contentStyle={{
                    background: '#0f172a',
                    border: '1px solid rgba(148,163,184,0.2)',
                    borderRadius: '0.75rem',
                    color: '#e2e8f0'
                  }}
                />
                <Legend wrapperStyle={{ color: '#cbd5f5', paddingTop: '12px' }} />
                <Bar dataKey="tecnica" name="Técnica" fill="#f97316" radius={[10, 10, 0, 0]} />
                <Bar dataKey="administrativa" name="Administrativa" fill="#38bdf8" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </section>

      <Card className="border border-white/10 bg-slate-900/80 backdrop-blur">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <FileSpreadsheet className="h-5 w-5 text-slate-300" />Recomendações para o CFO
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 text-sm text-slate-300">
          <div className="rounded-2xl bg-white/5 p-3">
            <p className="font-semibold text-white">Auditoria de OPME em tempo real</p>
            <p className="text-xs text-slate-400">Implantar fluxo de aprovação digital com valores teto por convênio e rastreabilidade de implantes.</p>
          </div>
          <div className="rounded-2xl bg-white/5 p-3">
            <p className="font-semibold text-white">Cross-check com produção clínica</p>
            <p className="text-xs text-slate-400">Automatizar conciliação entre prontuário e faturamento para reduzir glosa administrativa.</p>
          </div>
          <div className="rounded-2xl bg-white/5 p-3">
            <p className="font-semibold text-white">Negociação de contratos</p>
            <p className="text-xs text-slate-400">Usar a série histórica de glosa para ajustar metas e cláusulas de performance.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  </MainLayout>
);

export default OSSControleGlosaOPME;
