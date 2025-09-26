import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart3, DollarSign, AlertTriangle, CheckCircle, Download, TrendingDown, TrendingUp } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const glosasMensais = [
  { mes: 'Jan', glosa: 320, recuperado: 180 },
  { mes: 'Fev', glosa: 295, recuperado: 192 },
  { mes: 'Mar', glosa: 280, recuperado: 210 },
  { mes: 'Abr', glosa: 260, recuperado: 198 },
  { mes: 'Mai', glosa: 240, recuperado: 190 },
  { mes: 'Jun', glosa: 225, recuperado: 185 }
];

const motivosGlosa = [
  { motivo: 'TUSS inválido', percentual: 35 },
  { motivo: 'Documentação', percentual: 28 },
  { motivo: 'Prazo expirado', percentual: 15 },
  { motivo: 'Cobrança duplicada', percentual: 9 },
  { motivo: 'Outros', percentual: 13 }
];

const OSSGlosasDashboard = () => {
  return (
    <MainLayout>
      <div className="min-h-screen space-y-8 bg-gradient-to-br from-slate-950 via-slate-900 to-black p-6 text-slate-100">
        <header className="space-y-2">
          <Badge className="bg-rose-500/20 text-rose-200">Gestão Financeira</Badge>
          <h1 className="text-3xl font-bold text-white">Painel de Glosas</h1>
          <p className="max-w-3xl text-sm text-slate-300">
            Monitoramento completo das glosas SUS/convênios, com indicadores de recuperação, causas prioritárias e plano de ação recomendado.
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[{
            titulo: 'Glosa acumulada (12m)',
            valor: 'R$ 2,9M',
            delta: '-14% vs 12m',
            positivo: true
          }, {
            titulo: 'Recuperação média',
            valor: '72%',
            delta: '+6 p.p.',
            positivo: true
          }, {
            titulo: 'Tempo de resposta',
            valor: '9 dias',
            delta: '-3 dias',
            positivo: true
          }, {
            titulo: 'Alertas críticos',
            valor: '2 ativos',
            delta: 'Plano de resposta em execução',
            positivo: false
          }].map((kpi) => (
            <Card key={kpi.titulo} className="border border-white/10 bg-slate-900/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-sm text-slate-300">{kpi.titulo}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-2xl font-semibold text-white">{kpi.valor}</p>
                <span className={`text-xs ${kpi.positivo ? 'text-emerald-300' : 'text-amber-300'}`}>{kpi.delta}</span>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.4fr,1fr]">
          <Card className="border border-white/10 bg-slate-900/80 backdrop-blur">
            <CardHeader className="flex flex-col gap-1">
              <CardTitle className="flex items-center gap-2 text-white">
                <BarChart3 className="h-5 w-5 text-rose-300" /> Glosas × Recuperação (R$ mil)
              </CardTitle>
              <p className="text-xs text-slate-400">Dados consolidados jan–jun 2025</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={glosasMensais}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                  <XAxis dataKey="mes" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" tickFormatter={(value) => `R$ ${value}k`} />
                  <Tooltip
                    contentStyle={{
                      background: '#0f172a',
                      border: '1px solid rgba(148,163,184,0.2)',
                      borderRadius: '0.75rem',
                      color: '#e2e8f0'
                    }}
                    formatter={(value: number, name: string) => [`R$ ${value}k`, name === 'glosa' ? 'Glosa' : 'Recuperado']}
                  />
                  <Legend wrapperStyle={{ color: '#cbd5f5', paddingTop: '12px' }} />
                  <Bar dataKey="glosa" name="Glosa" fill="#f87171" radius={[10, 10, 0, 0]} />
                  <Bar dataKey="recuperado" name="Recuperado" fill="#34d399" radius={[10, 10, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border border-white/10 bg-slate-900/80 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-white">Top motivos de glosa</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-300">
              {motivosGlosa.map((motivo) => (
                <div key={motivo.motivo} className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
                  <span>{motivo.motivo}</span>
                  <span className="text-emerald-300">{motivo.percentual}%</span>
                </div>
              ))}
              <p className="text-xs text-slate-400">
                63% dos casos concentram-se em validação TUSS e falha documental — plano de resposta sugerido pela IA.
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </MainLayout>
  );
};

export default OSSGlosasDashboard;
