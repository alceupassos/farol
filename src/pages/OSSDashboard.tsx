import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Target,
  DollarSign,
  AlertTriangle,
  FileCheck,
  Clock,
  TrendingUp,
  TrendingDown,
  Shield,
  RefreshCw,
  FileText,
  Activity,
  Users,
  BarChart3,
  Brain,
  Zap,
  Layers,
  Globe,
  Link,
  Sparkle,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart as RechartsChart,
  Pie,
  Cell,
  ComposedChart,
  FunnelChart,
  Funnel,
  LabelList
} from 'recharts';

const overviewMetrics = [
  {
    title: 'Cumprimento das Metas',
    value: '92%',
    change: '+5,2%',
    caption: 'Metas pactuadas com a OSS',
    trend: 'up' as const,
    icon: Target,
    iconColor: 'text-emerald-300',
    gradient: 'from-emerald-500/10 via-emerald-500/0 to-transparent'
  },
  {
    title: 'Índice de Glosa',
    value: '2,9%',
    change: '-0,7%',
    caption: 'R$ 210k glosados • 74% recuperados',
    trend: 'down' as const,
    icon: DollarSign,
    iconColor: 'text-rose-300',
    gradient: 'from-rose-500/10 via-rose-500/0 to-transparent'
  },
  {
    title: 'Tempestividade Audesp',
    value: '98%',
    change: '+2,1%',
    caption: '2 alertas críticos resolvidos',
    trend: 'up' as const,
    icon: Clock,
    iconColor: 'text-sky-300',
    gradient: 'from-sky-500/10 via-sky-500/0 to-transparent'
  },
  {
    title: 'NPS Governamental',
    value: '8,4',
    change: '+0,3',
    caption: 'Prefeituras satisfeitas com a gestão',
    trend: 'up' as const,
    icon: Users,
    iconColor: 'text-amber-300',
    gradient: 'from-amber-500/10 via-amber-500/0 to-transparent'
  }
];

const performanceExecutiva = [
  { mes: 'Jan', meta: 88, realizado: 86, glosa: 4.3 },
  { mes: 'Fev', meta: 89, realizado: 87, glosa: 4.1 },
  { mes: 'Mar', meta: 90, realizado: 89, glosa: 3.6 },
  { mes: 'Abr', meta: 91, realizado: 90, glosa: 3.4 },
  { mes: 'Mai', meta: 92, realizado: 91, glosa: 3.1 },
  { mes: 'Jun', meta: 93, realizado: 92, glosa: 2.9 }
];

const operacionalSeries = [
  { mes: 'Jan', audesp: 96, conciliacao: 92, tempestividade: 94 },
  { mes: 'Fev', audesp: 97, conciliacao: 93, tempestividade: 95 },
  { mes: 'Mar', audesp: 97, conciliacao: 95, tempestividade: 96 },
  { mes: 'Abr', audesp: 98, conciliacao: 95, tempestividade: 97 },
  { mes: 'Mai', audesp: 99, conciliacao: 96, tempestividade: 98 },
  { mes: 'Jun', audesp: 99, conciliacao: 97, tempestividade: 99 }
];

const financeiroSeries = [
  { mes: 'Jan', repasse: 3.8, incentivo: 0.6, glosa: 0.25 },
  { mes: 'Fev', repasse: 3.9, incentivo: 0.62, glosa: 0.23 },
  { mes: 'Mar', repasse: 4.1, incentivo: 0.64, glosa: 0.21 },
  { mes: 'Abr', repasse: 4.0, incentivo: 0.7, glosa: 0.2 },
  { mes: 'Mai', repasse: 4.2, incentivo: 0.72, glosa: 0.19 },
  { mes: 'Jun', repasse: 4.4, incentivo: 0.75, glosa: 0.18 }
];

const agingDistribuicao = [
  { faixa: '0-30 dias', valor: 62 },
  { faixa: '31-60 dias', valor: 24 },
  { faixa: '61-90 dias', valor: 9 },
  { faixa: '90+ dias', valor: 5 }
];

const distribuicaoReceita = [
  { name: 'Repasse SUS', value: 63 },
  { name: 'Incentivos', value: 21 },
  { name: 'Complementar', value: 11 },
  { name: 'Retroativo', value: 5 }
];

const funilFaturamento = [
  { etapa: 'Produção registrada', valor: 4.6 },
  { etapa: 'Faturamento gerado', valor: 4.2 },
  { etapa: 'Análise OSS', valor: 4.0 },
  { etapa: 'Envio Audesp', valor: 3.9 },
  { etapa: 'Liquidação', valor: 3.7 }
];

const integracoes = [
  {
    titulo: 'Audesp 4.0',
    descricao: 'Envio automatizado da prestação de contas e retorno de conformidade',
    status: 'Operacional',
    sla: 'Atualizado há 12 min',
    uptime: '99,8%',
    icon: FileText
  },
  {
    titulo: 'SIH/SIA',
    descricao: 'Processamento de AIH/APAC com conformidade TISS e auditoria de glosas',
    status: 'Atenção',
    sla: 'Fila em 6 minutos',
    uptime: '97,4%',
    icon: Layers
  },
  {
    titulo: 'Portal da Transparência',
    descricao: 'Publicação automática de relatórios financeiros e contratos',
    status: 'Operacional',
    sla: 'Batch concluído às 03:00',
    uptime: '99,2%',
    icon: Globe
  },
  {
    titulo: 'Orquestrador LGPD',
    descricao: 'Monitoramento de acessos e trilhas de auditoria com anonimização',
    status: 'Instável',
    sla: 'Revisão em andamento',
    uptime: '94,6%',
    icon: Shield
  }
];

const getStatusClasses = (status: string) => {
  switch (status) {
    case 'Operacional':
      return 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30';
    case 'Atenção':
      return 'bg-amber-500/10 text-amber-300 border border-amber-500/30';
    default:
      return 'bg-rose-500/10 text-rose-300 border border-rose-500/30';
  }
};

const COLORS = ['#34d399', '#38bdf8', '#facc15', '#fb7185'];
const cardBaseClass = 'border border-white/10 bg-slate-900/80 text-slate-100 shadow-xl backdrop-blur-sm';
const surfacePanelClass = 'rounded-xl border border-white/10 bg-slate-900/70 text-slate-200 backdrop-blur-sm';
const chipClass = 'flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/70 px-4 py-2 text-sm text-slate-200';

const OSSDashboard = () => {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-10 text-white">
          {/* Visão Geral */}
          <section className="grid gap-6 lg:grid-cols-[3fr,2fr]">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-blue-600/20 via-blue-500/5 to-slate-950 p-8 shadow-2xl">
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
              <div className="absolute -bottom-32 -left-16 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
              <div className="relative space-y-6">
                <Badge className="w-fit bg-white/10 text-xs uppercase tracking-widest text-slate-200">
                  Visão Geral
                </Badge>
                <div className="flex flex-wrap items-center gap-3">
                  <Sparkle className="h-8 w-8 text-blue-300" />
                  <h1 className="text-4xl font-bold tracking-tight text-white lg:text-5xl">
                    Gestão Contratual/OSS
                  </h1>
                </div>
                <p className="max-w-2xl text-base leading-relaxed text-slate-300">
                  Monitoramento inteligente da parceria com a Beneficência Hospitalar de Cesário Lange
                  (BHCL). Acompanhe indicadores contratuais, operacionais e financeiros em tempo real,
                  com análises preditivas e gatilhos automáticos para mitigação de riscos.
                </p>
                <div className="flex flex-wrap gap-4 text-sm text-slate-200">
                  <span className={chipClass}>
                    <FileText className="h-4 w-4 text-blue-300" />
                    CNPJ: 50.351.626/0001-10
                  </span>
                  <span className={chipClass}>
                    <Activity className="h-4 w-4 text-emerald-300" />
                    CNES: 2082780
                  </span>
                  <span className={chipClass}>
                    <Shield className="h-4 w-4 text-amber-300" />
                    CEBAS vigente
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-slate-100">
                  <Button size="sm" variant="outline" className="border-white/20 bg-white/10 text-slate-100 hover:bg-white/20">
                    <FileText className="mr-2 h-4 w-4" />
                    Prestação Audesp
                  </Button>
                  <Button size="sm" variant="outline" className="border-white/20 bg-white/10 text-slate-100 hover:bg-white/20">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Reprocessar AIH/APAC
                  </Button>
                  <Button size="sm" className="bg-blue-500 text-white hover:bg-blue-400">
                    <Brain className="mr-2 h-4 w-4" />
                    Consultar Oráculo IA
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid gap-4 rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-2xl backdrop-blur">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Forecast IA</p>
                  <p className="mt-2 text-3xl font-semibold text-white">Renovação contratual</p>
                </div>
                <div className="rounded-full bg-emerald-500/10 p-3">
                  <Target className="h-6 w-6 text-emerald-300" />
                </div>
              </div>
              <p className="text-sm text-slate-200">
                A probabilidade média de renovação projetada para os próximos 12 meses é de{' '}
                <span className="font-semibold text-emerald-300">78%</span>. O modelo considera desempenho
                operacional, tempestividade financeira, NPS contratante e histórico de glosas.
              </p>
              <ResponsiveContainer width="100%" height={170}>
                <AreaChart data={performanceExecutiva}>
                  <defs>
                    <linearGradient id="colorMeta" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorReal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#34d399" stopOpacity={0.5} />
                      <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                  <XAxis dataKey="mes" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" domain={[80, 100]} tickFormatter={(value) => `${value}%`} />
                  <Tooltip
                    contentStyle={{
                      background: '#020617',
                      border: '1px solid rgba(148,163,184,0.3)',
                      borderRadius: '0.75rem',
                      color: '#e2e8f0'
                    }}
                    formatter={(value: number, name: string) => [`${value.toFixed(1)}%`, name === 'meta' ? 'Meta' : 'Realizado']}
                  />
                  <Area type="monotone" dataKey="meta" stroke="#38bdf8" strokeWidth={2} fill="url(#colorMeta)" name="Meta" />
                  <Area type="monotone" dataKey="realizado" stroke="#34d399" strokeWidth={2} fill="url(#colorReal)" name="Realizado" />
                </AreaChart>
              </ResponsiveContainer>
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Glosa residual média: 2,9%</span>
                <span className="flex items-center gap-1 text-emerald-300">
                  <ArrowUpRight className="h-3 w-3" /> Tendência positiva
                </span>
              </div>
            </div>
          </section>

          <section className="space-y-4 text-slate-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Badge className="bg-white/10 text-xs uppercase tracking-[0.3em] text-slate-200">Visão Geral</Badge>
                <h2 className="text-xl font-semibold text-white">Cockpit Estratégico</h2>
              </div>
              <span className="text-xs text-slate-400">Atualizado em 24 de setembro de 2025 às 08h12</span>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {overviewMetrics.map((metric) => {
                const Icon = metric.icon;
                const isPositive = metric.trend === 'up';
                return (
                  <Card key={metric.title} className={`relative overflow-hidden ${cardBaseClass} transition-all hover:-translate-y-1 hover:border-white/20`}>
                    <div className={`absolute inset-0 bg-gradient-to-br ${metric.gradient}`} />
                    <CardHeader className="relative flex flex-row items-center justify-between pb-2">
                      <span className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">{metric.title}</span>
                      <div className={`rounded-full bg-white/5 p-2 ${metric.iconColor}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                    </CardHeader>
                    <CardContent className="relative space-y-3">
                      <div className="text-3xl font-semibold text-white">{metric.value}</div>
                      <div className="flex items-center gap-2 text-sm">
                        {isPositive ? (
                          <span className="flex items-center gap-1 text-emerald-300">
                            <ArrowUpRight className="h-4 w-4" />
                            {metric.change}
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-rose-300">
                            <ArrowDownRight className="h-4 w-4" />
                            {metric.change}
                          </span>
                        )}
                        <span className="text-xs text-slate-400">vs último trimestre</span>
                      </div>
                      <p className="text-sm text-slate-400">{metric.caption}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Dashboard Executiva */}
          <section className="grid gap-6 lg:grid-cols-[2fr,1fr] text-slate-100">
            <Card className={cardBaseClass}>
              <CardHeader className="flex flex-col gap-2">
                <Badge className="w-fit bg-blue-500/20 text-blue-200">Dashboard Executiva</Badge>
                <CardTitle className="flex items-center gap-2 text-white">
                  <BarChart3 className="h-5 w-5 text-blue-300" />
                  Performance Contratual vs Metas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={320}>
                  <LineChart data={performanceExecutiva}>
                    <CartesianGrid strokeDasharray="4 4" stroke="#1f2937" />
                    <XAxis dataKey="mes" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" domain={[80, 100]} tickFormatter={(value) => `${value}%`} />
                    <Tooltip
                      contentStyle={{
                        background: '#020617',
                        border: '1px solid rgba(148,163,184,0.3)',
                        borderRadius: '0.75rem',
                        color: '#e2e8f0'
                      }}
                      formatter={(value: number, name: string) => {
                        if (name === 'glosa') {
                          return [`${value.toFixed(1)}%`, 'Glosa'];
                        }
                        return [`${value.toFixed(1)}%`, name === 'meta' ? 'Meta' : 'Realizado'];
                      }}
                    />
                    <Legend verticalAlign="top" align="left" wrapperStyle={{ color: '#cbd5f5', paddingBottom: '16px' }} />
                    <Line type="monotone" dataKey="meta" stroke="#38bdf8" strokeWidth={3} dot={false} name="Meta" />
                    <Line type="monotone" dataKey="realizado" stroke="#34d399" strokeWidth={3} dot={false} name="Realizado" />
                    <Line type="monotone" dataKey="glosa" stroke="#f97316" strokeDasharray="5 5" strokeWidth={2} name="Glosa" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid gap-4">
              <Card className={`${cardBaseClass} bg-gradient-to-br from-slate-900 via-slate-900/60 to-slate-950`}>
                <CardHeader className="pb-2">
                  <Badge className="w-fit bg-emerald-500/20 text-emerald-200">Pipeline Inteligente</Badge>
                  <CardTitle className="flex items-center justify-between text-white">
                    Receita projetada 2025
                    <span className="flex items-center gap-2 text-sm font-normal text-emerald-300">
                      <TrendingUp className="h-4 w-4" /> +8,4%
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm text-slate-300">
                  <div className="space-y-2 rounded-xl bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Novos contratos</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-semibold text-white">3</span>
                      <Badge className="bg-emerald-500/15 text-emerald-200">R$ 2,6M</Badge>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between rounded-xl bg-white/5 p-3">
                      <span>Projetos de expansão</span>
                      <span className="font-semibold text-white">2</span>
                    </div>
                    <div className="flex items-center justify-between rounded-xl bg-white/5 p-3">
                      <span>Base contratual</span>
                      <span className="font-semibold text-white">R$ 5,2M</span>
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <Button className="w-full rounded-2xl bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 text-white shadow-[0_12px_30px_rgba(56,189,248,0.25)] hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(79,70,229,0.28)]">
                      <Zap className="mr-2 h-4 w-4" /> Simular ROI com IA
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className={cardBaseClass}>
                <CardHeader className="pb-2">
                  <Badge className="w-fit bg-purple-500/20 text-purple-200">Alertas Estratégicos</Badge>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="rounded-xl bg-purple-500/10 p-3 text-purple-100">
                    <p className="font-medium">Renovação 2025</p>
                    <p className="text-xs text-purple-200/80">Checklist concluído • minuta enviada</p>
                  </div>
                  <div className="rounded-xl bg-amber-500/10 p-3 text-amber-100">
                    <p className="font-medium">Revisão de metas Q4</p>
                    <p className="text-xs text-amber-200/80">Prazo em 7 dias • Auditor responsável: Carla Duarte</p>
                  </div>
                  <div className="rounded-xl bg-emerald-500/10 p-3 text-emerald-100">
                    <p className="font-medium">Plano de performance</p>
                    <p className="text-xs text-emerald-200/80">5 ações concluídas • economia R$ 480k</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Dashboard Operacional */}
          <section className="grid gap-6 lg:grid-cols-[7fr,5fr] text-slate-100">
            <Card className={cardBaseClass}>
              <CardHeader className="flex flex-col gap-2">
                <Badge className="w-fit bg-emerald-500/20 text-emerald-200">Dashboard Operacional</Badge>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Layers className="h-5 w-5 text-emerald-300" />
                  Processos regulatórios monitorados
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart data={operacionalSeries}>
                    <CartesianGrid strokeDasharray="4 4" stroke="#1f2937" />
                    <XAxis dataKey="mes" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" domain={[88, 100]} tickFormatter={(value) => `${value}%`} />
                    <Tooltip
                      contentStyle={{
                        background: '#020617',
                        border: '1px solid rgba(148,163,184,0.3)',
                        borderRadius: '0.75rem',
                        color: '#e2e8f0'
                      }}
                    />
                    <Legend verticalAlign="top" align="left" wrapperStyle={{ color: '#cbd5f5', paddingBottom: '12px' }} />
                    <Line type="monotone" dataKey="audesp" stroke="#34d399" strokeWidth={3} dot={false} name="Conformidade Audesp" />
                    <Line type="monotone" dataKey="conciliacao" stroke="#60a5fa" strokeWidth={3} dot={false} name="Conciliação financeira" />
                    <Line type="monotone" dataKey="tempestividade" stroke="#fbbf24" strokeWidth={3} dot={false} name="Tempestividade" />
                  </LineChart>
                </ResponsiveContainer>
                <div className="mt-4 grid gap-3 lg:grid-cols-3">
                  <div className="rounded-xl bg-emerald-500/10 p-4 text-sm text-emerald-200">
                    <p className="text-xs uppercase tracking-[0.2em] text-emerald-300">Conciliação</p>
                    <p className="mt-2 text-2xl font-semibold text-white">96%</p>
                    <p className="text-emerald-200/80">3 exceções abertas</p>
                  </div>
                  <div className="rounded-xl bg-sky-500/10 p-4 text-sm text-sky-200">
                    <p className="text-xs uppercase tracking-[0.2em] text-sky-300">Audesp</p>
                    <p className="mt-2 text-2xl font-semibold text-white">98%</p>
                    <p className="text-sky-200/80">2 schemas ajustados</p>
                  </div>
                  <div className="rounded-xl bg-amber-500/10 p-4 text-sm text-amber-200">
                    <p className="text-xs uppercase tracking-[0.2em] text-amber-300">Repasses</p>
                    <p className="mt-2 text-2xl font-semibold text-white">15 dias</p>
                    <p className="text-amber-200/80">Impacto R$ 450k em 60d</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className={cardBaseClass}>
              <CardHeader className="flex flex-col gap-2">
                <Badge className="w-fit bg-rose-500/20 text-rose-200">Mapa de Risco</Badge>
                <CardTitle className="flex items-center gap-2 text-white">
                  <AlertTriangle className="h-5 w-5 text-rose-300" />
                  Matriz 5x5 e incidentes monitorados
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-5 gap-1 text-slate-100">
                  {[...Array(25)].map((_, i) => {
                    const row = Math.floor(i / 5);
                    const col = i % 5;
                    const risk = (5 - row) * (col + 1);
                    let color = 'bg-emerald-500/10 text-emerald-200';
                    if (risk > 15) color = 'bg-rose-500/40 text-rose-50';
                    else if (risk > 10) color = 'bg-amber-500/30 text-amber-900';
                    else if (risk > 5) color = 'bg-yellow-500/30 text-yellow-900';
                    return (
                      <div key={i} className={`flex h-12 items-center justify-center rounded text-xs font-semibold ${color}`}>
                        {risk}
                      </div>
                    );
                  })}
                </div>
                <div className="space-y-3 text-sm text-slate-200">
                  <div className="flex items-center justify-between rounded-xl bg-white/5 p-3">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-rose-500/20 text-rose-200">Crítico</Badge>
                      <span>Audesp • SLA de homologação</span>
                    </div>
                    <span className="text-xs text-rose-200">Playbook acionado</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-white/5 p-3">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-amber-500/20 text-amber-200">Alto</Badge>
                      <span>SIH/SIA • Glosas repetidas</span>
                    </div>
                    <span className="text-xs text-amber-200">Auditoria em curso</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-white/5 p-3">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-emerald-500/20 text-emerald-200">Médio</Badge>
                      <span>LGPD • Anonimização</span>
                    </div>
                    <span className="text-xs text-emerald-200">Processo automatizado</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Dashboard Financeira */}
          <section className="grid gap-6 xl:grid-cols-[5fr,7fr]">
            <Card className={cardBaseClass}>
              <CardHeader className="flex flex-col gap-2">
                <Badge className="w-fit bg-amber-500/20 text-amber-200">Dashboard Financeira</Badge>
                <CardTitle className="flex items-center gap-2 text-white">
                  <DollarSign className="h-5 w-5 text-amber-300" />
                  Funil de faturamento (R$ mi)
                </CardTitle>
                <p className="text-xs text-slate-400">Fluxo mensal jan–jun 2025, da produção registrada até a liquidação financeira.</p>
              </CardHeader>
              <CardContent className="grid gap-6 lg:grid-cols-2">
                <div className="relative">
                  <ResponsiveContainer width="100%" height={260}>
                    <FunnelChart>
                      <Tooltip
                        cursor={{ fill: 'rgba(30,64,175,0.15)' }}
                        contentStyle={{
                          background: '#0f172a',
                          border: '1px solid rgba(148,163,184,0.25)',
                          borderRadius: '0.75rem',
                          color: '#e2e8f0'
                        }}
                        formatter={(value: number, name: string) => [`R$ ${value.toFixed(1)}M`, name]}
                      />
                      <Funnel
                        dataKey="valor"
                        data={funilFaturamento}
                        isAnimationActive
                        fill="#38bdf8"
                        stroke="#0ea5e9"
                      >
                        <LabelList position="right" fill="#e2e8f0" stroke="none" dataKey="etapa" formatter={(val: string) => ` ${val}`} />
                        <LabelList position="left" fill="#38bdf8" stroke="none" dataKey="valor" formatter={(val: number) => `R$ ${val.toFixed(1)}M`} />
                      </Funnel>
                    </FunnelChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-4 text-sm text-slate-300">
                  <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                    <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Conversão média</p>
                    <p className="text-3xl font-semibold text-white">81%</p>
                    <p className="text-xs text-slate-400">Liquidação sobre produção validada.</p>
                  </div>
                  <div className="grid gap-3">
                    <div className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
                      <span>Glosa técnica evitada</span>
                      <span className="text-emerald-300">R$ 320k</span>
                    </div>
                    <div className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
                      <span>Prazos dentro do SLA</span>
                      <span className="text-blue-300">93%</span>
                    </div>
                    <div className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
                      <span>Tempo médio de liquidação</span>
                      <span className="text-amber-300">18 dias</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400">
                    A principal perda está na etapa de conferência OSS (-R$ 0,2M), relacionada a documentação incompleta e ajustes TUSS.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className={cardBaseClass}>
              <CardHeader className="flex flex-col gap-2">
                <Badge className="w-fit bg-blue-500/20 text-blue-200">Fluxo Financeiro</Badge>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Link className="h-5 w-5 text-blue-300" />
                  Repasses vs Incentivos (R$ milhões)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={financeiroSeries}>
                    <CartesianGrid strokeDasharray="4 4" stroke="#1f2937" />
                    <XAxis dataKey="mes" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip
                      contentStyle={{
                        background: '#020617',
                        border: '1px solid rgba(148,163,184,0.3)',
                        borderRadius: '0.75rem',
                        color: '#e2e8f0'
                      }}
                      formatter={(value: number, name: string) => {
                        if (name === 'repasse') return [`R$ ${value.toFixed(2)}M`, 'Repasse'];
                        if (name === 'incentivo') return [`R$ ${value.toFixed(2)}M`, 'Incentivos'];
                        return [`R$ ${value.toFixed(2)}M`, 'Glosas'];
                      }}
                    />
                    <Legend wrapperStyle={{ color: '#cbd5f5', paddingTop: '8px' }} />
                    <Bar dataKey="repasse" fill="#38bdf8" radius={[8, 8, 0, 0]} name="Repasse" />
                    <Bar dataKey="incentivo" fill="#34d399" radius={[8, 8, 0, 0]} name="Incentivos" />
                    <Bar dataKey="glosa" fill="#f97316" radius={[8, 8, 0, 0]} name="Glosas" />
                  </BarChart>
                </ResponsiveContainer>
                <div className="mt-6 grid gap-3 md:grid-cols-2">
                  {agingDistribuicao.map((item) => (
                    <div key={item.faixa} className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3 text-sm text-slate-300">
                      <span>{item.faixa}</span>
                      <span className="font-semibold text-white">{item.valor}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Integrações */}
          <section className="space-y-4 text-slate-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Badge className="bg-white/10 text-xs uppercase tracking-[0.3em] text-slate-200">Integrações</Badge>
                <h2 className="text-xl font-semibold text-white">Orquestração e interoperabilidade</h2>
              </div>
              <Button variant="outline" className="border-white/20 bg-white/10 text-white">
                <Globe className="mr-2 h-4 w-4" /> Ver documentação
              </Button>
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              {integracoes.map((item) => {
                const Icon = item.icon;
                return (
                  <Card key={item.titulo} className={cardBaseClass}>
                    <CardHeader className="flex flex-row items-start justify-between space-y-0">
                      <div className="flex items-center gap-3">
                        <div className="rounded-xl bg-white/10 p-2">
                          <Icon className="h-5 w-5 text-blue-300" />
                        </div>
                        <div>
                          <CardTitle className="text-white">{item.titulo}</CardTitle>
                          <p className="text-xs text-slate-400">{item.descricao}</p>
                        </div>
                      </div>
                      <span className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusClasses(item.status)}`}>
                        {item.status}
                      </span>
                    </CardHeader>
                    <CardContent className="flex items-center justify-between text-xs text-slate-200">
                      <span>SLAs: {item.sla}</span>
                      <span>Uptime 12 meses: {item.uptime}</span>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Visão Executiva */}
          <section className="grid gap-6 rounded-3xl border border-white/10 bg-slate-950/70 p-6 text-slate-100 shadow-2xl">
            <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-2">
                <Badge className="w-fit bg-indigo-500/20 text-xs uppercase tracking-[0.35em] text-indigo-200">
                  Visão Executiva
                </Badge>
                <h2 className="text-2xl font-bold text-white">Painel de Performance Estratégica</h2>
                <p className="max-w-3xl text-sm text-slate-300">
                  Integração financeira, operacional e clínica para a diretoria acompanhar metas contratuais, eficiência e riscos.
                  Destaques do último trimestre mostram aceleração de receita contratual, queda sustentada de glosas e evolução de qualidade assistencial.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 text-center text-xs text-slate-300">
                <div className="flex flex-col rounded-2xl border border-emerald-500/30 bg-slate-900/70 p-3">
                  <span>Receita OSS (trim.)</span>
                  <strong className="text-lg text-emerald-300">R$ 12,4M</strong>
                  <span className="text-emerald-400/80">+6,3% vs T1</span>
                </div>
                <div className="flex flex-col rounded-2xl border border-blue-500/30 bg-slate-900/70 p-3">
                  <span>Metas alcançadas</span>
                  <strong className="text-lg text-blue-300">88%</strong>
                  <span className="text-blue-400/80">+4 p.p.</span>
                </div>
                <div className="flex flex-col rounded-2xl border border-amber-500/30 bg-slate-900/70 p-3">
                  <span>Glosa evitada</span>
                  <strong className="text-lg text-amber-300">R$ 520k</strong>
                  <span className="text-amber-400/80">-17% incidência</span>
                </div>
                <div className="flex flex-col rounded-2xl border border-rose-500/30 bg-slate-900/70 p-3">
                  <span>Risco crítico</span>
                  <strong className="text-lg text-rose-300">2 eventos</strong>
                  <span className="text-rose-400/80">ambos mitigados</span>
                </div>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.6fr,1fr]">
              <Card className={cardBaseClass}>
                <CardHeader className="flex flex-col gap-2">
                  <CardTitle className="flex items-center gap-2 text-white">
                    <TrendingUp className="h-5 w-5 text-emerald-300" />
                    Receita, Glosa e Margem trimestral
                  </CardTitle>
                  <p className="text-xs text-slate-400">Agregado jan–set 2025 • valores em milhões • margem consolidada OSS</p>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={280}>
                    <ComposedChart data={[
                      { periodo: 'Jan', receita: 3.6, glosa: 0.32, margem: 18 },
                      { periodo: 'Fev', receita: 3.8, glosa: 0.29, margem: 19 },
                      { periodo: 'Mar', receita: 4.0, glosa: 0.27, margem: 20 },
                      { periodo: 'Abr', receita: 4.1, glosa: 0.25, margem: 21 },
                      { periodo: 'Mai', receita: 4.3, glosa: 0.23, margem: 22 },
                      { periodo: 'Jun', receita: 4.5, glosa: 0.21, margem: 23 }
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                      <XAxis dataKey="periodo" stroke="#94a3b8" />
                      <YAxis yAxisId="left" stroke="#94a3b8" tickFormatter={(value) => `R$ ${value.toFixed(1)}M`} />
                      <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" tickFormatter={(value) => `${value}%`} />
                      <Tooltip
                        contentStyle={{
                          background: '#0f172a',
                          border: '1px solid rgba(148,163,184,0.2)',
                          borderRadius: '0.75rem',
                          color: '#e2e8f0'
                        }}
                        formatter={(value: number, name: string) =>
                          name === 'margem'
                            ? [`${value}%`, 'Margem EBITDA']
                            : [`R$ ${value.toFixed(2)}M`, name === 'receita' ? 'Receita' : 'Glosa']
                        }
                      />
                      <Legend verticalAlign="top" align="left" wrapperStyle={{ color: '#cbd5f5', paddingBottom: '12px' }} />
                      <Bar yAxisId="left" dataKey="receita" name="Receita" fill="#38bdf8" radius={[10, 10, 0, 0]} />
                      <Bar yAxisId="left" dataKey="glosa" name="Glosa" fill="#f97316" radius={[10, 10, 0, 0]} />
                      <Line yAxisId="right" type="monotone" dataKey="margem" name="Margem" stroke="#a855f7" strokeWidth={3} dot={false} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <div className="grid gap-4">
                <Card className={cardBaseClass}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-white">Alertas estratégicos</CardTitle>
                    <p className="text-xs text-slate-400">Monitoramento de riscos, oportunidades e compliance</p>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm text-slate-200">
                    <div className="flex items-start gap-3 rounded-2xl bg-emerald-500/10 p-3">
                      <Badge className="bg-emerald-500/20 text-emerald-200">OKR</Badge>
                      <div>
                        <p className="font-semibold text-emerald-200">Metas OSS batidas em 88%</p>
                        <span className="text-xs text-slate-400">Margem EBITDA consolidada em 21% (+3 p.p.).</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 rounded-2xl bg-amber-500/10 p-3">
                      <Badge className="bg-amber-500/20 text-amber-200">Risco</Badge>
                      <div>
                        <p className="font-semibold text-amber-200">Audesp exige schema revisado</p>
                        <span className="text-xs text-slate-400">Deadline 10 dias • responsável: Equipe TI/Financeiro.</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 rounded-2xl bg-blue-500/10 p-3">
                      <Badge className="bg-blue-500/20 text-blue-200">Oportunidade</Badge>
                      <div>
                        <p className="font-semibold text-blue-200">Contrato Piracicaba em renegociação</p>
                        <span className="text-xs text-slate-400">Gap de produção de 6%, previsão de +R$ 1,2M/ano.</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className={cardBaseClass}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-white">Fluxo decisório executivo</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-xs text-slate-300">
                    <div className="rounded-2xl bg-white/5 p-3">
                      <span className="font-semibold text-white">1. Reunião OSS + Secretaria</span>
                      <p>Apresentar resultados, consolidar plano de ação Q4, validar cronograma Audesp.</p>
                    </div>
                    <div className="rounded-2xl bg-white/5 p-3">
                      <span className="font-semibold text-white">2. Alocação de recursos</span>
                      <p>R$ 450k destinados à automação de glosa e treinamento de documentação clínica.</p>
                    </div>
                    <div className="rounded-2xl bg-white/5 p-3">
                      <span className="font-semibold text-white">3. Monitoramento contínuo</span>
                      <p>Dashboard semanal com 
                        <Badge className="ml-1 bg-emerald-500/15 text-emerald-200">24 KPIs</Badge> críticos.</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Pareto e ações rápidas */}
          <section className="grid gap-6 lg:grid-cols-[1.2fr,1fr] text-slate-100">
            <Card className={cardBaseClass}>
              <CardHeader className="flex flex-col gap-2">
                <Badge className="w-fit bg-purple-500/20 text-purple-200">Análise de Pareto</Badge>
                <CardTitle className="flex items-center gap-2 text-white">
                  <BarChart3 className="h-5 w-5 text-purple-300" />
                  Top 3 causas de glosa — último trimestre
                </CardTitle>
                <p className="text-xs text-slate-400">Monitoramento contínuo das principais causas e plano de ação recomendado.</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    titulo: 'Código TUSS inválido',
                    impacto: '35% das glosas',
                    plano: 'Implementar validador automático + checklist integrador',
                    status: 'Em andamento'
                  },
                  {
                    titulo: 'Documentação incompleta',
                    impacto: '28% das glosas',
                    plano: 'Treinar equipe, checklist digital obrigatório, auditoria amostral',
                    status: 'Planejado'
                  },
                  {
                    titulo: 'Envio fora do prazo',
                    impacto: '15% das glosas',
                    plano: 'Alertas em D-5, automação de agenda Audesp',
                    status: 'Concluído'
                  }
                ].map((item, index) => (
                  <div key={item.titulo} className="flex items-start gap-3 rounded-2xl bg-slate-900/70 p-4 shadow-sm">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-lg font-semibold text-white">
                      {index + 1}
                    </span>
                    <div className="flex-1 space-y-1 text-sm">
                      <p className="font-semibold text-white">{item.titulo}</p>
                      <p className="text-xs text-slate-400">{item.impacto} • {item.plano}</p>
                    </div>
                    <Badge className="bg-white/10 text-xs text-slate-200">{item.status}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className={cardBaseClass}>
              <CardHeader className="flex flex-col gap-2">
                <CardTitle className="flex items-center gap-2 text-white">
                  <Sparkle className="h-5 w-5 text-fuchsia-300" />
                  Ações rápidas sugeridas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-slate-200">
                <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-3">
                  <p className="font-medium text-white">Habilitar IA de glosa</p>
                  <span className="text-xs text-slate-400">Implementa motor preditivo para priorizar recursos — ganho médio R$ 180k/trim.</span>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-3">
                  <p className="font-medium text-white">Checklist digital obrigatório</p>
                  <span className="text-xs text-slate-400">Integração clínica + faturamento reduz reenvios em 42%.</span>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-3">
                  <p className="font-medium text-white">Agenda Audesp automatizada</p>
                  <span className="text-xs text-slate-400">Alertas em D-7/D-3 com rota de aprovação e responsável nomeado.</span>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Insights de IA */}
          <section className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 text-slate-100 shadow-2xl">
            <div className="flex flex-col gap-2">
              <Badge className="w-fit bg-fuchsia-500/20 text-xs uppercase tracking-[0.3em] text-fuchsia-200">
                Insights de IA
              </Badge>
              <h2 className="text-2xl font-bold text-white">Recomendações inteligentes para a OSS</h2>
              <p className="text-sm text-slate-300">
                A IA monitora continuamente produção, faturamento e riscos para sugerir ações priorizadas por impacto e esforço.
              </p>
            </div>
            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              {[
                {
                  titulo: 'Recuperar glosas repetidas',
                  impacto: 'R$ 420k em 45 dias',
                  descricao: 'Automatize validação de TUSS e valide documentação crítica antes do envio. 72% das ocorrências estão concentradas em 5 procedimentos.'
                },
                {
                  titulo: 'Renovação contratual Piracicaba',
                  impacto: 'Prob. 87%',
                  descricao: 'Reforce indicadores de atenção primária e reduza backlog APS em 6%. IA sugere oferta de teleconsulta e prontuário integrado.'
                },
                {
                  titulo: 'Margem operacional HPP',
                  impacto: '+3,2 p.p.',
                  descricao: 'Reoriente escala de plantões, ajuste mix de procedimentos eletivos e implante BI de OPME para reduzir custo direto.'
                }
              ].map((insight) => (
                <Card key={insight.titulo} className={cardBaseClass}>
                  <CardHeader className="space-y-1">
                    <CardTitle className="text-lg text-white">{insight.titulo}</CardTitle>
                    <Badge className="w-fit bg-emerald-500/20 text-emerald-200">Impacto: {insight.impacto}</Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-300">{insight.descricao}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </div>
    </MainLayout>
  );
};

export default OSSDashboard;
