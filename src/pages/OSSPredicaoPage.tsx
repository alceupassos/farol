import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BrainCircuit, Activity, Users, Calendar } from 'lucide-react';
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, AreaChart, Area } from 'recharts';

const demandaPredictiva = [
  { mes: 'Jan', internação: 124, prontoAtendimento: 860 },
  { mes: 'Fev', internação: 134, prontoAtendimento: 905 },
  { mes: 'Mar', internação: 140, prontoAtendimento: 930 },
  { mes: 'Abr', internação: 150, prontoAtendimento: 950 },
  { mes: 'Mai', internação: 158, prontoAtendimento: 975 },
  { mes: 'Jun', internação: 165, prontoAtendimento: 1010 }
];

const absenteismoSerie = [
  { semana: 'S1', previsto: 12, real: 13 },
  { semana: 'S2', previsto: 11, real: 10 },
  { semana: 'S3', previsto: 10, real: 9 },
  { semana: 'S4', previsto: 9, real: 8 },
  { semana: 'S5', previsto: 9, real: 9 }
];

const OSSPredicaoPage = () => (
  <div className="min-h-screen space-y-8 bg-gradient-to-br from-slate-950 via-slate-900 to-black p-6 text-slate-100">
    <header className="space-y-2">
      <Badge className="bg-fuchsia-500/20 text-fuchsia-200">IA & Forecast</Badge>
      <h1 className="text-3xl font-bold text-white">Predição Operacional OSS</h1>
      <p className="max-w-3xl text-sm text-slate-300">
        Modelos preditivos aplicados à demanda assistencial, ocupação de leitos e absenteísmo, com recomendações de especialistas.
      </p>
    </header>

    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {[{
        titulo: 'Ocupação projetada (90 dias)',
        valor: '82% → 86%',
        detalhe: 'Reforçar retaguarda cirúrgica'
      }, {
        titulo: 'Demanda APS prevista',
        valor: '+12%',
        detalhe: 'Campanha sazonal influenza'
      }, {
        titulo: 'Absenteísmo estimado',
        valor: '8,9%',
        detalhe: '-2,1 p.p. com telelembrança'
      }, {
        titulo: 'Equipe crítica',
        valor: 'Enfermagem UTI',
        detalhe: 'Adicionar 6 plantões flexíveis'
      }].map((kpi) => (
        <Card key={kpi.titulo} className="border border-white/10 bg-slate-900/80 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-sm text-slate-300">{kpi.titulo}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-2xl font-semibold text-white">{kpi.valor}</p>
            <span className="text-xs text-slate-400">{kpi.detalhe}</span>
          </CardContent>
        </Card>
      ))}
    </section>

    <section className="grid gap-6 lg:grid-cols-[1.6fr,1fr]">
      <Card className="border border-white/10 bg-slate-900/80 backdrop-blur">
        <CardHeader className="flex flex-col gap-2">
          <CardTitle className="flex items-center gap-2 text-white">
            <Activity className="h-5 w-5 text-emerald-300" />Demanda assistencial prevista
          </CardTitle>
          <p className="text-xs text-slate-400">Internações e pronto atendimento — modelo Prophet + sazonalidade</p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={demandaPredictiva}>
              <defs>
                <linearGradient id="areaInternacao" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#34d399" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="areaPA" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
                </linearGradient>
              </defs>
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
                formatter={(value: number, name: string) => [`${value} casos`, name === 'internação' ? 'Internação' : 'Pronto atendimento']}
              />
              <Legend wrapperStyle={{ color: '#cbd5f5', paddingTop: '12px' }} />
              <Area type="monotone" dataKey="internação" fill="url(#areaInternacao)" stroke="#34d399" strokeWidth={3} />
              <Area type="monotone" dataKey="prontoAtendimento" fill="url(#areaPA)" stroke="#38bdf8" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="border border-white/10 bg-slate-900/80 backdrop-blur">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Calendar className="h-5 w-5 text-amber-300" />Absenteísmo semanal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={absenteismoSerie}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="semana" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" domain={[7, 14]} tickFormatter={(value) => `${value}%`} />
              <Tooltip
                contentStyle={{
                  background: '#0f172a',
                  border: '1px solid rgba(148,163,184,0.2)',
                  borderRadius: '0.75rem',
                  color: '#e2e8f0'
                }}
              />
              <Legend wrapperStyle={{ color: '#cbd5f5', paddingTop: '12px' }} />
              <Line type="monotone" dataKey="previsto" name="Previsto" stroke="#60a5fa" strokeWidth={3} dot />
              <Line type="monotone" dataKey="real" name="Real" stroke="#f97316" strokeWidth={3} dot />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </section>

    <Card className="border border-white/10 bg-slate-900/80 backdrop-blur">
      <CardHeader className="flex flex-col gap-2">
        <CardTitle className="flex items-center gap-2 text-white">
          <Users className="h-5 w-5 text-sky-300" />Recomendações dos especialistas
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-3 text-sm text-slate-300">
        <div className="rounded-2xl bg-white/5 p-4">
          <p className="font-semibold text-white">Gestão de escalas</p>
          <p className="text-xs text-slate-400">Antecipe contratação temporária para UTI e moduladores de produção conforme curva de sazonalidade.</p>
        </div>
        <div className="rounded-2xl bg-white/5 p-4">
          <p className="font-semibold text-white">Campanhas preventivas</p>
          <p className="text-xs text-slate-400">Refaça busca ativa em territórios com maior previsão de pronto atendimento para reduzir picos.</p>
        </div>
        <div className="rounded-2xl bg-white/5 p-4">
          <p className="font-semibold text-white">Gestão de ativos críticos</p>
          <p className="text-xs text-slate-400">Priorize manutenção preventiva de respiradores e estoque de medicamentos correlatos.</p>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default OSSPredicaoPage;
