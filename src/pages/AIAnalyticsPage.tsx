import React, { useMemo } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Brain,
  TrendingUp,
  Users,
  Activity,
  AlertTriangle,
  Shield,
  HeartPulse,
  Syringe,
  LineChart as LineChartIcon,
  BarChart3
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { piracicabaNeighborhoods } from '@/data/piracicabaNeighborhoods';
import { getLatestPiracicabaHealthNews } from '@/data/piracicabaHealthNews2025';

const KpiCard = ({ title, value, helper, icon }: { title: string; value: string; helper: string; icon: React.ReactNode }) => (
  <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-6 shadow-lg shadow-purple-500/5">
    <div className="flex items-center justify-between mb-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-purple-200/80">{title}</p>
        <p className="text-3xl font-bold text-white mt-1">{value}</p>
      </div>
      <div className="text-purple-400">{icon}</div>
    </div>
    <p className="text-xs text-slate-300/80 leading-relaxed">{helper}</p>
  </div>
);

const InsightCard = ({ title, description, actions }: { title: string; description: string; actions: string[] }) => (
  <Card className="bg-slate-900/80 border border-slate-800">
    <CardHeader className="pb-3">
      <CardTitle className="text-base font-semibold text-white flex items-center gap-2">
        <AlertTriangle className="h-4 w-4 text-amber-400" />
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-3 text-sm text-slate-300">
      <p>{description}</p>
      <ul className="space-y-1 text-xs text-slate-200/80">
        {actions.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <span className="text-emerald-400">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
);

const AIAnalyticsPage = () => {
  const neighborhoods = piracicabaNeighborhoods;
  const latestNews = useMemo(() => getLatestPiracicabaHealthNews().slice(0, 4), []);

  const highRiskAreas = neighborhoods.filter((n) => ['CRÍTICO', 'EMERGÊNCIA'].includes(n.riskLevel));
  const telemedCoverage = 41; // % estimado – sincronizado com dashboard gestor

  const kpis = [
    {
      title: 'Modelos em Produção',
      value: '28',
      helper: 'Modelos ativos para previsão de demanda, surtos e abastecimento rodando no cluster municipal.',
      icon: <Brain className="h-6 w-6" />,
    },
    {
      title: 'Precisão Médias',
      value: '94,6%',
      helper: 'Média ponderada dos modelos de ocupação hospitalar, dengue e abandono de tratamento (últimos 30 dias).',
      icon: <TrendingUp className="h-6 w-6" />,
    },
    {
      title: 'Cidadãos monitorados',
      value: `${(telemedCoverage * 407252 / 100).toLocaleString('pt-BR', { maximumFractionDigits: 0 })}`,
      helper: 'População acompanhada por telemedicina e telemonitoramento inteligente em toda a rede.',
      icon: <Users className="h-6 w-6" />,
    },
    {
      title: 'Execuções diárias',
      value: '2.940',
      helper: 'Inferências realizadas por dia, considerando alertas de regulação, farmácia e vigilância epidemiológica.',
      icon: <Activity className="h-6 w-6" />,
    },
  ];

  const riskSeries = neighborhoods.map((n) => ({
    name: n.name,
    Vulnerabilidade: n.healthFactors.vulnerabilityIndex,
    Casos: n.activeCases,
  }));

  const occupancyTrend = [
    { month: 'Abr', ocupacao: 83.4, leitos: 402 },
    { month: 'Mai', ocupacao: 84.1, leitos: 410 },
    { month: 'Jun', ocupacao: 85.7, leitos: 427 },
    { month: 'Jul', ocupacao: 86.9, leitos: 439 },
    { month: 'Ago', ocupacao: 88.2, leitos: 458 },
  ];

  const telemedTimeline = [
    { month: 'Abr', atendimentos: 6800, adesao: 28 },
    { month: 'Mai', atendimentos: 7920, adesao: 31 },
    { month: 'Jun', atendimentos: 9210, adesao: 35 },
    { month: 'Jul', atendimentos: 10320, adesao: 38 },
    { month: 'Ago', atendimentos: 11840, adesao: 41 },
  ];

  const insights = [
    {
      title: 'Foco imediato em Monte Líbano e Piracicamirim',
      description: 'Modelos de surtos indicam probabilidade > 70% de novos focos de dengue nos próximos 7 dias nestes bairros.',
      actions: [
        'Priorizar mutirão de limpeza com drones e armadilhas inteligentes.',
        'Alocar equipe de telemonitoramento respiratório para pacientes crônicos locais.',
        'Aumentar estoque de larvicidas em 25% nas UBS do cluster norte.',
      ],
    },
    {
      title: 'Telemedicina reduz procura nas UPAs',
      description: 'Correlação inversa entre adesão ao telemonitoramento e portas de urgência sugere potencial de -18% nos atendimentos presenciais.',
      actions: [
        'Expandir slots de teleorientação noturna para hipertensos e diabéticos.',
        'Incluir push notifications proativas via Minha Saúde Angra.',
        'Compartilhar protocolos com Santa Casa para contrarreferência remota.',
      ],
    },
    {
      title: 'Farmácia inteligente previne ruptura',
      description: 'Modelo de estoque projeta risco de ruptura moderada para insulina NPH em 14 dias se o consumo continuar +11% ao mês.',
      actions: [
        'Acionar compras centralizadas com antecedência de 10 dias.',
        'Redistribuir excedente da unidade Paulicéia para Vila Fátima.',
        'Ativar campanhas de adesão terapêutica para reduzir desperdício.',
      ],
    },
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 space-y-8">
        <header className="space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <Brain className="h-10 w-10 text-purple-400" />
            <div>
              <h1 className="text-4xl font-bold text-white">AI Analytics · Piracicaba</h1>
              <p className="text-slate-300">Inteligência preditiva aplicada à gestão municipal de saúde</p>
            </div>
            <Badge variant="outline" className="border-purple-500/40 text-purple-200">
              Atualização automática a cada 30 minutos
            </Badge>
          </div>
        </header>

        <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {kpis.map((item) => (
            <KpiCard key={item.title} {...item} />
          ))}
        </section>

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <Card className="xl:col-span-2 bg-slate-900/80 border border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <LineChartIcon className="h-5 w-5 text-emerald-300" />
                Ocupação hospitalar prevista (próximas 5 semanas)
              </CardTitle>
            </CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={occupancyTrend}>
                  <defs>
                    <linearGradient id="colorOcc" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#34d399" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                  <XAxis dataKey="month" stroke="#9ca3af" />
                  <YAxis yAxisId="left" stroke="#9ca3af" domain={[80, 92]} />
                  <YAxis yAxisId="right" orientation="right" stroke="#9ca3af" />
                  <Tooltip contentStyle={{ background: '#0f172a', borderColor: '#334155' }} />
                  <Legend />
                  <Area type="monotone" dataKey="ocupacao" stroke="#34d399" fillOpacity={1} fill="url(#colorOcc)" yAxisId="left" name="Ocupação %" />
                  <Line type="monotone" dataKey="leitos" stroke="#60a5fa" yAxisId="right" name="Leitos disponíveis" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/80 border border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <BarChart3 className="h-5 w-5 text-sky-300" />
                Telemedicina vs. Adesão (últimos 5 meses)
              </CardTitle>
            </CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={telemedTimeline}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                  <XAxis dataKey="month" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip contentStyle={{ background: '#0f172a', borderColor: '#334155' }} />
                  <Legend />
                  <Bar dataKey="atendimentos" fill="#6366f1" name="Atendimentos" radius={[6, 6, 0, 0]} />
                  <Line type="monotone" dataKey="adesao" stroke="#fbbf24" name="Adesão (%)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </section>

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2 space-y-4">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <Shield className="h-5 w-5 text-emerald-300" />
              Principais insights operacionais
            </h2>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              {insights.map((insight) => (
                <InsightCard key={insight.title} {...insight} />
              ))}
            </div>
          </div>

          <Card className="bg-slate-900/80 border border-slate-800">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-white">
                <HeartPulse className="h-5 w-5 text-rose-300" />
                Ranking de risco por bairro
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-300">
              {highRiskAreas.map((item) => (
                <div key={item.id} className="rounded-lg border border-slate-800 p-3 bg-slate-900/60">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white">{item.name}</span>
                    <Badge variant="outline" className="border-red-500/30 text-red-300">
                      {item.riskLevel}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    {item.activeCases} casos ativos · Índice de vulnerabilidade {item.healthFactors.vulnerabilityIndex}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card className="bg-slate-900/80 border border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Syringe className="h-5 w-5 text-sky-300" />
                Cobertura vacinal vs. procura por urgência
              </CardTitle>
            </CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={riskSeries}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                  <XAxis dataKey="name" stroke="#9ca3af" tick={{ fontSize: 12 }} interval={0} angle={-25} dy={10} />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip contentStyle={{ background: '#0f172a', borderColor: '#334155' }} />
                  <Legend />
                  <Line type="monotone" dataKey="Vulnerabilidade" stroke="#f97316" name="Índice de vulnerabilidade" />
                  <Line type="monotone" dataKey="Casos" stroke="#22d3ee" name="Casos ativos" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/80 border border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <HeartPulse className="h-5 w-5 text-rose-300" />
                Notícias & ações recomendadas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-slate-300">
              {latestNews.map((news) => (
                <div key={news.id} className="border border-slate-800 rounded-lg p-3 bg-slate-900/60">
                  <p className="font-semibold text-white">{news.title}</p>
                  <p className="text-xs text-slate-400">{new Date(news.publishedAt).toLocaleDateString('pt-BR')} · {news.source}</p>
                  <p className="text-xs text-slate-300 mt-2">{news.summary[0]}</p>
                  <p className="text-xs text-slate-300">{news.summary[1]}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>
      </div>
    </MainLayout>
  );
};

export default AIAnalyticsPage;
