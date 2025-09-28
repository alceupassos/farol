import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area, Legend, PieChart, Pie, Cell } from 'recharts';
import {
  Activity,
  BedDouble,
  DollarSign,
  HeartPulse,
  LayoutDashboard,
  ShieldAlert,
  Stethoscope,
  TrendingUp,
  BrainCircuit,
  ClipboardList
} from 'lucide-react';

const occupancyTrend = [
  { month: 'Jan', geral: 82, uti: 89, prontoSocorro: 76 },
  { month: 'Fev', geral: 84, uti: 91, prontoSocorro: 79 },
  { month: 'Mar', geral: 86, uti: 93, prontoSocorro: 81 },
  { month: 'Abr', geral: 88, uti: 94, prontoSocorro: 82 },
  { month: 'Mai', geral: 87, uti: 95, prontoSocorro: 83 },
  { month: 'Jun', geral: 89, uti: 96, prontoSocorro: 85 },
];

const surgicalUtilization = [
  { bloco: 'Cardíaco', utilizacao: 92, meta: 88 },
  { bloco: 'Ortopedia', utilizacao: 87, meta: 85 },
  { bloco: 'Oncologia', utilizacao: 81, meta: 82 },
  { bloco: 'Geral', utilizacao: 78, meta: 80 },
  { bloco: 'Emergencial', utilizacao: 95, meta: 90 },
];

const serviceMix = [
  { name: 'Internações SUS', value: 58 },
  { name: 'Convênios', value: 27 },
  { name: 'Particular', value: 9 },
  { name: 'Alta Complexidade', value: 6 },
];

const COLORS = ['#ef4444', '#f97316', '#facc15', '#22c55e'];

const StatCard = ({
  title,
  value,
  subValue,
  icon,
  trendLabel,
  trendValue
}: {
  title: string;
  value: string;
  subValue: string;
  icon: React.ReactNode;
  trendLabel: string;
  trendValue: string;
}) => (
  <Card className="bg-slate-900/80 border-slate-700">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-slate-200">{title}</CardTitle>
      <div className="text-slate-400">{icon}</div>
    </CardHeader>
    <CardContent>
      <div className="text-3xl font-semibold text-white mb-1">{value}</div>
      <CardDescription className="text-slate-400">{subValue}</CardDescription>
      <p className="mt-3 text-xs text-emerald-400">{trendLabel} {trendValue}</p>
    </CardContent>
  </Card>
);

const HospitalDashboardDetalhadoPage = () => {
  return (
    <div className="min-h-screen space-y-8 bg-slate-950 px-6 py-8 text-slate-100">
      <header className="space-y-3">
        <div className="flex items-center gap-3">
          <LayoutDashboard className="h-10 w-10 text-rose-400" />
          <div>
            <h1 className="text-3xl font-bold">Dashboard Hospitalar Detalhado</h1>
            <p className="text-sm text-slate-400">
              Painel executivo com visão 360º para Alta Direção hospitalar. Monitoramento integral da operação, performance assistencial e saúde financeira.
            </p>
          </div>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-xl border border-rose-500/40 bg-rose-500/10 p-4">
            <p className="text-xs uppercase text-rose-300">Risco Crítico</p>
            <p className="mt-2 text-sm text-rose-200">UTI adulto em alerta máximo de ocupação nos próximos 48h</p>
          </div>
          <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 p-4">
            <p className="text-xs uppercase text-amber-300">Atenção</p>
            <p className="mt-2 text-sm text-amber-200">Fila cirúrgica oncológica com tendência de crescimento de 6%</p>
          </div>
          <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-4">
            <p className="text-xs uppercase text-emerald-300">Estável</p>
            <p className="mt-2 text-sm text-emerald-200">Margem operacional consolidada acima da meta pelo 3º mês</p>
          </div>
        </div>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Taxa de Ocupação Total"
          value="89%"
          subValue="Meta 86% • 512 leitos monitorados"
          trendLabel="Variação vs mês anterior:"
          trendValue="+2.4%"
          icon={<BedDouble className="h-5 w-5" />}
        />
        <StatCard
          title="Margem Operacional"
          value="18,6%"
          subValue="Receita líquida R$ 42,8M"
          trendLabel="Tendência trimestre:"
          trendValue="+1.8pp"
          icon={<DollarSign className="h-5 w-5" />}
        />
        <StatCard
          title="Satisfação Paciente"
          value="92,1%"
          subValue="NPS clínico consolidado"
          trendLabel="Alertas críticos abertos:"
          trendValue="3 unidades"
          icon={<HeartPulse className="h-5 w-5" />}
        />
        <StatCard
          title="Produtividade Médica"
          value="86%"
          subValue="Consultas + procedimentos vs capacidade"
          trendLabel="Diferença vs benchmark estadual:"
          trendValue="+4,2pp"
          icon={<Stethoscope className="h-5 w-5" />}
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 border-slate-800 bg-slate-900/70">
          <CardHeader>
            <CardTitle className="text-lg text-white">Tendência de Ocupação por Setor</CardTitle>
            <CardDescription className="text-slate-400">
              Monitoramento contínuo de ocupação assistencial e pronto atendimento com previsão para 30 dias.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={occupancyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" domain={[70, 100]} tickFormatter={(value) => `${value}%`} />
                <Tooltip cursor={{ stroke: '#94a3b8', strokeDasharray: '3 3' }} />
                <Legend wrapperStyle={{ color: '#cbd5f5' }} />
                <Line type="monotone" dataKey="geral" stroke="#ef4444" strokeWidth={2} dot={false} name="Geral" />
                <Line type="monotone" dataKey="uti" stroke="#facc15" strokeWidth={2} dot={false} name="UTI" />
                <Line type="monotone" dataKey="prontoSocorro" stroke="#22c55e" strokeWidth={2} dot={false} name="Pronto Atendimento" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-slate-800 bg-slate-900/70">
          <CardHeader>
            <CardTitle className="text-lg text-white">Mix Assistencial</CardTitle>
            <CardDescription className="text-slate-400">
              Distribuição de receita operacional por linha de serviço no trimestre.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex h-full items-center justify-center">
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie dataKey="value" nameKey="name" data={serviceMix} innerRadius={60} outerRadius={100} paddingAngle={3}>
                  {serviceMix.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card className="border-slate-800 bg-slate-900/70">
          <CardHeader>
            <CardTitle className="text-lg text-white">Eficiência do Centro Cirúrgico</CardTitle>
            <CardDescription className="text-slate-400">
              Utilização real vs meta por bloco cirúrgico (últimos 30 dias).
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={310}>
              <BarChart data={surgicalUtilization}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="bloco" stroke="#64748b" />
                <YAxis stroke="#64748b" domain={[60, 100]} tickFormatter={(value) => `${value}%`} />
                <Tooltip />
                <Legend />
                <Bar dataKey="utilizacao" name="Utilização" fill="#ef4444" radius={[6, 6, 0, 0]} />
                <Bar dataKey="meta" name="Meta" fill="#22c55e" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-slate-800 bg-slate-900/70">
          <CardHeader>
            <CardTitle className="text-lg text-white">Mapa de Riscos Operacionais</CardTitle>
            <CardDescription className="text-slate-400">
              Riscos priorizados com planos mitigatórios e status.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                area: 'UTI Adulto',
                criticidade: 'Crítico',
                descricao: 'Capacidade no limite com previsão de pico viral',
                responsavel: 'Diretor Clínico',
                status: 'Plano de expansão temporária em execução',
              },
              {
                area: 'Oncologia',
                criticidade: 'Grave',
                descricao: 'Fila cirúrgica acima de 15 dias',
                responsavel: 'Diretoria Assistencial',
                status: 'Mutirão em parceria com rede privada',
              },
              {
                area: 'Faturamento SUS',
                criticidade: 'Atenção',
                descricao: 'Glosas recorrentes em APACs',
                responsavel: 'Controlleria',
                status: 'Auditoria conjunta com TI e faturamento',
              },
            ].map((risk) => (
              <div key={risk.area} className="rounded-lg border border-rose-500/30 bg-rose-500/10 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="h-5 w-5 text-rose-400" />
                    <span className="text-sm font-semibold text-rose-200">{risk.area}</span>
                  </div>
                  <span className="text-xs uppercase tracking-wide text-rose-300">{risk.criticidade}</span>
                </div>
                <p className="mt-2 text-sm text-rose-100/90">{risk.descricao}</p>
                <p className="mt-3 text-xs text-amber-200">Responsável: {risk.responsavel}</p>
                <p className="text-xs text-emerald-200">Status: {risk.status}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <Card className="border-slate-800 bg-slate-900/70">
          <CardHeader>
            <CardTitle className="text-lg text-white">Fluxo Assistencial</CardTitle>
            <CardDescription className="text-slate-400">Tempo médio em cada etapa de jornada do paciente alto risco.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={[
                { etapa: 'Classificação', tempo: 18 },
                { etapa: 'Espera', tempo: 42 },
                { etapa: 'Atendimento', tempo: 55 },
                { etapa: 'Diagnóstico', tempo: 35 },
                { etapa: 'Internação', tempo: 90 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="etapa" stroke="#64748b" />
                <YAxis stroke="#64748b" tickFormatter={(value) => `${value} min`} />
                <Tooltip />
                <Area type="monotone" dataKey="tempo" stroke="#f97316" fill="#f97316" fillOpacity={0.25} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-slate-800 bg-slate-900/70">
          <CardHeader>
            <CardTitle className="text-lg text-white">Indicadores de Segurança</CardTitle>
            <CardDescription className="text-slate-400">Monitoramento crítico para CIPA hospitalar.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[ 
              { label: 'Eventos Adversos Graves', valor: '4 casos', variacao: '+1', classe: 'text-rose-400' },
              { label: 'Infecções Relacionadas à Assistência', valor: '2,1%', variacao: '-0,4pp', classe: 'text-emerald-400' },
              { label: 'Reclamações Pacientes', valor: '38 registros', variacao: '-12', classe: 'text-emerald-400' },
              { label: 'Indicador Queda Paciente', valor: '0,9%', variacao: 'Estável', classe: 'text-amber-300' },
            ].map((metric) => (
              <div key={metric.label} className="flex items-center justify-between rounded-lg border border-slate-700/60 bg-slate-900/80 px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-slate-200">{metric.label}</p>
                  <p className={`text-xs ${metric.classe}`}>Variação: {metric.variacao}</p>
                </div>
                <span className="text-base font-semibold text-white">{metric.valor}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-slate-800 bg-slate-900/70">
          <CardHeader>
            <CardTitle className="text-lg text-white">Planos Estratégicos em Curso</CardTitle>
            <CardDescription className="text-slate-400">Iniciativas críticas monitoradas pela alta gestão.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[ 
              {
                titulo: 'Modernização HIS/HMIS',
                progresso: 68,
                patrocinador: 'Diretoria de TI',
                impacto: 'Integração completa com RNDS e plataforma municipal'
              },
              {
                titulo: 'Programa Cirurgia 360',
                progresso: 42,
                patrocinador: 'Diretoria Clínica',
                impacto: 'Redução de 18% no tempo anestésico médio'
              },
              {
                titulo: 'Analytics Financeiro Integrado',
                progresso: 75,
                patrocinador: 'CFO Hospitalar',
                impacto: 'Visibilidade em margem por linha de serviço'
              },
            ].map((initiative) => (
              <div key={initiative.titulo} className="space-y-2 rounded-lg border border-slate-700/60 bg-slate-900/80 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-100">{initiative.titulo}</p>
                  <span className="text-xs text-slate-400">{initiative.progresso}%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-800">
                  <div className="h-2 rounded-full bg-rose-500" style={{ width: `${initiative.progresso}%` }} />
                </div>
                <p className="text-xs text-amber-200">Patrocinador: {initiative.patrocinador}</p>
                <p className="text-xs text-slate-300">{initiative.impacto}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <Card className="border-slate-800 bg-slate-900/70">
        <CardHeader className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <CardTitle className="text-lg text-white">Alertas de Inteligência Clínica</CardTitle>
            <CardDescription className="text-slate-400">
              Insights gerados pelo módulo de IA hospitalar para decisão imediata.
            </CardDescription>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <div className="flex items-center gap-1 text-rose-300"><Activity className="h-4 w-4" /> Alta prioridade</div>
            <div className="flex items-center gap-1 text-amber-300"><TrendingUp className="h-4 w-4" /> Tendência</div>
            <div className="flex items-center gap-1 text-emerald-300"><BrainCircuit className="h-4 w-4" /> IA Confirma</div>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {[ 
            {
              titulo: 'Pacientes alto risco readmissão',
              impacto: '23 pacientes',
              acao: 'Equipe multiprofissional acionar protocolo pós-alta',
              tipo: 'critico'
            },
            {
              titulo: 'Tendência de superlotação PS',
              impacto: '+18% em 12h',
              acao: 'Acionar plano de contingência e reforço clínico',
              tipo: 'grave'
            },
            {
              titulo: 'Glosas APAC Oncologia',
              impacto: 'R$ 420 mil em risco',
              acao: 'Auditoria conjunta faturamento + oncologia',
              tipo: 'alerta'
            },
            {
              titulo: 'Desvio protocolo sepse',
              impacto: '4 unidades',
              acao: 'Reforçar treinamento e monitoramento em tempo real',
              tipo: 'critico'
            },
            {
              titulo: 'Capacidade farmacêutica',
              impacto: 'Cobertura 11 dias',
              acao: 'Reforçar compras estratégicas para alto custo',
              tipo: 'grave'
            },
            {
              titulo: 'Equipe centro cirúrgico',
              impacto: '+6 casos aguardando equipe específica',
              acao: 'Rever escala e negociar horas extras direcionadas',
              tipo: 'alerta'
            },
          ].map((alerta) => {
            const palette = {
              critico: 'border-rose-500/40 bg-rose-500/15 text-rose-100',
              grave: 'border-amber-500/40 bg-amber-500/15 text-amber-100',
              alerta: 'border-emerald-500/40 bg-emerald-500/15 text-emerald-100',
            } as const;

            return (
              <div key={alerta.titulo} className={`rounded-xl border p-4 ${palette[alerta.tipo]}`}>
                <div className="flex items-center gap-2">
                  <ClipboardList className="h-4 w-4" />
                  <h3 className="text-sm font-semibold">{alerta.titulo}</h3>
                </div>
                <p className="mt-2 text-xs uppercase tracking-wide">Impacto: {alerta.impacto}</p>
                <p className="mt-2 text-sm font-medium text-white">{alerta.acao}</p>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};

export default HospitalDashboardDetalhadoPage;
