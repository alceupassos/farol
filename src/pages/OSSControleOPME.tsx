import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  kpiSnapshots,
  receitaSeries,
  glosaSeries,
  convenioStatus,
  faturamentoConvenioRanking,
  tempoAutorizacaoSeries,
  causasGlosaDistribuicao,
  margemLinhaCuidado,
  metricInsightCharts,
  integrationNetworkSpecs,
  flowMermaidDiagrams,
  kanbanQuickCharts,
  playbookFlowDiagrams,
  aiAntVSpecs,
  governanceDiagrams,
  errorQuickCharts,
  reportQuickCharts,
  onboardingDiagrams,
  apiQuickCharts,
  raciDiagrams,
  roadmapQuickCharts,
  principlesQuickCharts,
  sistemaQuickCharts,
  executiveMetrics,
  criticalFlows,
  aiInsights,
  governanceRequirements,
  playbooks,
  kanbanColumns,
  errorPlaybooks,
  reportDefinitions,
  onboardingSteps,
  apiEndpoints,
  webhooks,
  checklists,
  raciMatrix,
  implementationPhases,
  testPlan,
  roadmap,
  strategicPrinciples,
  dataModels,
  heroKpis,
  heroActions,
  prioritizedLists,
} from '@/modules/oss/data/opme';
import type {
  AntVSpecCard,
  HeroAction,
  HeroKpi,
  MermaidDiagramCard,
  OPMEConvenioStatus,
  OPMEFlow,
  OPMEKpiSnapshot,
  PrioritizedList,
  QuickChartInsight,
  TrendDirection,
} from '@/modules/oss/types/opme';
import type { LucideIcon } from 'lucide-react';
import {
  TrendingUp,
  AlertTriangle,
  Clock,
  ShieldCheck,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  LayoutDashboard,
  Activity,
  Brain,
  Workflow,
  Network,
  SquareStack,
  BookOpen,
  FileText,
  ClipboardCheck,
  Settings,
  Users,
  CheckCircle2,
  Rocket,
  ShieldAlert,
  CheckCircle,
  Zap,
  Target,
  TimerReset,
  ClipboardList,
  ShieldQuestion,
  Waypoints,
  Handshake,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  LineChart,
  Line,
  BarChart,
  Bar,
  Legend,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainerProps,
} from 'recharts';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const SectionHeader: React.FC<{ icon: React.ReactNode; title: string; description?: string }> = ({ icon, title, description }) => (
  <header className="mb-6 flex flex-col gap-2 text-white">
    <div className="flex items-center gap-2 text-lg font-semibold">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-slate-200">
        {icon}
      </span>
      <span>{title}</span>
    </div>
    {description && <p className="text-sm text-slate-400">{description}</p>}
  </header>
);

const kpiIconMap: Record<OPMEKpiSnapshot['icon'], LucideIcon> = {
  roi: TrendingUp,
  glosa: AlertTriangle,
  tempestividade: Clock,
  compliance: ShieldCheck,
  aging: Clock,
};

const variationClasses: Record<OPMEKpiSnapshot['status'], string> = {
  positive: 'bg-emerald-500/10 text-emerald-200 border border-emerald-500/30',
  neutral: 'bg-slate-500/10 text-slate-200 border border-slate-500/20',
  negative: 'bg-rose-500/10 text-rose-200 border border-rose-500/30',
};

const statusTokens: Record<OPMEConvenioStatus['health'], { label: string; className: string }> = {
  onTrack: {
    label: 'ON TRACK',
    className: 'bg-emerald-500/15 text-emerald-200 border border-emerald-500/30',
  },
  attention: {
    label: 'ATENÇÃO',
    className: 'bg-amber-500/15 text-amber-200 border border-amber-500/30',
  },
  critical: {
    label: 'CRÍTICO',
    className: 'bg-rose-500/15 text-rose-200 border border-rose-500/40',
  },
};

const radialPalette = ['#34d399', '#0ea5e9', '#a855f7', '#f97316', '#facc15'];

const formatCurrency = (value: number) => `R$ ${value.toFixed(1)} mi`;
const formatPercentage = (value: number) => `${value.toFixed(1)}%`;

const VariationChip: React.FC<{ value: number; status: OPMEKpiSnapshot['status'] }> = ({ value, status }) => {
  if (Number.isNaN(value)) {
    return null;
  }

  const Icon = value === 0 ? Minus : value > 0 ? ArrowUpRight : ArrowDownRight;
  const formatted = `${value > 0 ? '+' : ''}${value.toFixed(1)} pts`;
  const classes = variationClasses[status];

  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs ${classes}`}>
      <Icon className="h-3.5 w-3.5" />
      {formatted}
    </span>
  );
};

const quickChartBaseUrl = import.meta.env.VITE_MCP_QUICKCHART_URL ?? 'https://quickchart.io/chart';
const mermaidBaseUrl = import.meta.env.VITE_MCP_MERMAID_URL ?? 'https://mermaid.ink/svg';
const antvBaseUrl = import.meta.env.VITE_MCP_ANTV_URL ?? '';

const buildQuickChartUrl = (config: Record<string, unknown>) =>
  `${quickChartBaseUrl}?c=${encodeURIComponent(JSON.stringify(config))}&backgroundColor=%230f172a&width=720&height=360&format=png`;

const buildMermaidUrl = (diagram: string) => {
  if (!mermaidBaseUrl) return '';
  const encoded = encodeURIComponent(diagram);
  if (mermaidBaseUrl.includes('?')) {
    return `${mermaidBaseUrl}&graph=${encoded}`;
  }
  if (mermaidBaseUrl.endsWith('/svg') || mermaidBaseUrl.endsWith('/png')) {
    return `${mermaidBaseUrl}?graph=${encoded}`;
  }
  const sanitizedBase = mermaidBaseUrl.endsWith('/') ? mermaidBaseUrl.slice(0, -1) : mermaidBaseUrl;
  return `${sanitizedBase}/${encoded}`;
};

const buildAntVUrl = (spec: Record<string, unknown>) => {
  if (!antvBaseUrl) return '';
  const base = antvBaseUrl.includes('?') ? `${antvBaseUrl}&spec=` : `${antvBaseUrl}?spec=`;
  return `${base}${encodeURIComponent(JSON.stringify(spec))}`;
};

const QuickChartCard: React.FC<{ insight: QuickChartInsight }> = ({ insight }) => {
  const url = buildQuickChartUrl(insight.config);
  const [loadError, setLoadError] = useState(false);
  return (
    <Card className="border border-white/10 bg-slate-900/60 backdrop-blur">
      <CardHeader className="space-y-2">
        <CardTitle className="text-sm text-white">{insight.title}</CardTitle>
        <p className="text-xs text-slate-400">{insight.subtitle}</p>
      </CardHeader>
      <CardContent className="space-y-3 text-xs text-slate-300">
        <div className="rounded-lg bg-black/40 p-2">
          {url && !loadError ? (
            <img
              src={url}
              alt={insight.title}
              className="h-48 w-full rounded-md object-contain"
              loading="lazy"
              onError={() => setLoadError(true)}
            />
          ) : (
            <div className="space-y-2 p-2 text-slate-300">
              <FallbackLineChart />
              <p className="text-xs text-slate-400">
                {url
                  ? 'Gráfico QuickChart indisponível — exibindo curva resumida para referência. Configure o MCP para visual completo.'
                  : 'Configure VITE_MCP_QUICKCHART_URL para renderizar este infográfico dinâmico.'}
              </p>
            </div>
          )}
        </div>
        <p>{insight.commentary}</p>
      </CardContent>
    </Card>
  );
};

const MermaidCard: React.FC<{ diagram: MermaidDiagramCard }> = ({ diagram }) => {
  const url = buildMermaidUrl(diagram.diagram);
  const [loadError, setLoadError] = useState(false);
  return (
    <Card className="border border-white/10 bg-slate-900/60 backdrop-blur">
      <CardHeader className="space-y-2">
        <CardTitle className="text-sm text-white">{diagram.title}</CardTitle>
        <p className="text-xs text-slate-400">{diagram.description}</p>
      </CardHeader>
      <CardContent className="rounded-lg bg-black/40 p-3">
        {url && !loadError ? (
          <img
            src={url}
            alt={diagram.title}
            className="w-full rounded-md bg-white object-contain"
            loading="lazy"
            onError={() => setLoadError(true)}
          />
        ) : (
          <div className="space-y-2 text-xs text-slate-300">
            <FallbackTreemap />
            <p className="text-center text-slate-400">
              {url
                ? 'Fluxograma Mermaid indisponível — exibindo visão simplificada. Configure o MCP para visual completo.'
                : 'Configure VITE_MCP_MERMAID_URL para renderizar o fluxograma.'}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const AntVCard: React.FC<{ card: AntVSpecCard }> = ({ card }) => {
  const url = buildAntVUrl(card.spec);
  return (
    <Card className="border border-white/10 bg-slate-900/60 backdrop-blur">
      <CardHeader className="space-y-2">
        <CardTitle className="text-sm text-white">{card.title}</CardTitle>
        <p className="text-xs text-slate-400">{card.description}</p>
      </CardHeader>
      <CardContent>
        {url ? (
          <iframe
            src={url}
            title={card.title}
            className="w-full rounded-md border border-white/10"
            style={{ height: card.height ?? 260, backgroundColor: '#0f172a' }}
            loading="lazy"
          />
        ) : (
          <div className="space-y-2">
            <FallbackLineChart />
            <p className="text-center text-xs text-slate-400">Configure VITE_MCP_ANTV_URL para renderizar este gráfico AntV.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const TrendBadge: React.FC<{ direction: TrendDirection; label: string; status: OPMEKpiStatus }> = ({ direction, label, status }) => {
  const Icon = direction === 'up' ? ArrowUpRight : direction === 'down' ? ArrowDownRight : Minus;
  const classes = variationClasses[status];
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs ${classes}`}>
      <Icon className="h-3.5 w-3.5" />
      {label}
    </span>
  );
};

const heroStatusAccent: Record<OPMEKpiStatus, string> = {
  positive: 'text-emerald-300',
  neutral: 'text-slate-200',
  negative: 'text-rose-300',
};

const HeroKpiCard: React.FC<{ kpi: HeroKpi }> = ({ kpi }) => (
  <Card className="relative overflow-hidden border border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-black">
    <div className="absolute inset-x-0 top-0 h-1 bg-white/10" />
    <CardHeader className="space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-wide text-slate-400">{kpi.label}</p>
          <p className={`text-3xl font-semibold ${heroStatusAccent[kpi.status]}`}>{kpi.value}</p>
          <p className="text-xs text-slate-500">{kpi.targetLabel}</p>
        </div>
        <TrendBadge direction={kpi.trendDirection} label={kpi.trendLabel} status={kpi.status} />
      </div>
      <div className="space-y-2">
        <Progress value={Math.min(Math.max(kpi.progress * 100, 0), 100)} className="h-2" />
        <p className="text-xs text-slate-300">{kpi.description}</p>
      </div>
    </CardHeader>
    <CardContent className="flex items-center justify-between text-xs text-slate-300">
      <span>{kpi.actionHint}</span>
      <Button variant="outline" size="sm" className="border-white/20 text-slate-100" disabled>
        {kpi.actionLabel}
      </Button>
    </CardContent>
  </Card>
);

const OracleActionCard: React.FC<{ action: HeroAction }> = ({ action }) => (
  <Card className="border border-primary/20 bg-primary/5">
    <CardHeader className="space-y-2">
      <CardTitle className="text-sm text-white">{action.title}</CardTitle>
      <p className="text-xs text-slate-300">{action.description}</p>
    </CardHeader>
    <CardContent className="space-y-3 text-xs text-slate-200">
      <div className="flex items-center justify-between">
        <span className="font-semibold">Impacto</span>
        <span>{action.impactValue}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="font-semibold">Prazo</span>
        <span>{action.timeframe}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="font-semibold">Dono sugerido</span>
        <span>{action.owner}</span>
      </div>
      <Button variant="default" size="sm" className="w-full" disabled>
        {action.buttonLabel}
      </Button>
    </CardContent>
  </Card>
);

const OraclePanel: React.FC<{ actions: HeroAction[] }> = ({ actions }) => (
  <Card className="border border-white/10 bg-slate-900/80 backdrop-blur">
    <CardHeader className="space-y-2">
      <CardTitle className="text-base text-white">Oráculo OPME</CardTitle>
      <p className="text-xs text-slate-400">
        IA destaca as três ações com maior impacto imediato. Execute via MCP e acompanhe o log em tempo real.
      </p>
    </CardHeader>
    <CardContent className="space-y-3">
      {actions.map((action) => (
        <OracleActionCard key={action.id} action={action} />
      ))}
    </CardContent>
  </Card>
);

const listIconMap: Record<string, React.ReactNode> = {
  'pre-auditoria': <ClipboardCheck className="h-4 w-4" />,
  outliers: <AlertTriangle className="h-4 w-4" />,
  docs: <FileText className="h-4 w-4" />,
  negociacoes: <Handshake className="h-4 w-4" />,
  estoque: <SquareStack className="h-4 w-4" />,
};

const onboardingIcons = [Rocket, Settings, Zap, Waypoints];
const checklistIcons = [ShieldCheck, ClipboardCheck, ShieldAlert, Target];

const PrioritizedListCard: React.FC<{ list: PrioritizedList }> = ({ list }) => (
  <Card className="border border-white/10 bg-slate-900/60 backdrop-blur">
    <CardHeader className="space-y-2">
      <CardTitle className="flex items-center gap-2 text-sm text-white">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-slate-200">
          {listIconMap[list.id] ?? <ClipboardList className="h-4 w-4" />}
        </span>
        {list.title}
      </CardTitle>
      <p className="text-xs text-slate-400">{list.description}</p>
    </CardHeader>
    <CardContent className="space-y-3 text-xs text-slate-300">
      {list.items.map((item) => (
        <div key={item.id} className="rounded-lg border border-white/10 bg-white/5 p-3">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-semibold text-slate-100">{item.title}</p>
              <p className="text-slate-400">{item.impactValue}</p>
            </div>
            <Badge className="bg-white/10 text-slate-200">{item.prazo}</Badge>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span>Dono: {item.owner}</span>
            <Button variant="outline" size="xs" className="border-white/20 text-slate-100" disabled>
              {item.actionLabel}
            </Button>
          </div>
        </div>
      ))}
    </CardContent>
  </Card>
);

const ConvenioCard: React.FC<{ item: OPMEConvenioStatus }> = ({ item }) => {
  const statusStyle = statusTokens[item.health];
  const glosaWidth = Math.min(100, item.glosaPercentual * 12);
  const tendenciaPositive = item.tendencia <= 0 ? 'positive' : 'negative';

  return (
    <Card className="border border-white/10 bg-slate-900/60 backdrop-blur">
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <CardTitle className="text-base text-white">{item.operador}</CardTitle>
            <p className="text-xs text-slate-400">{item.comentario}</p>
          </div>
          <Badge className={`${statusStyle.className} font-semibold`}>{statusStyle.label}</Badge>
        </div>
        <div className="grid grid-cols-2 gap-3 text-xs text-slate-300">
          <div className="space-y-1">
            <span className="text-slate-400">Faturamento (Mês)</span>
            <div className="text-sm font-semibold text-white">{formatCurrency(item.faturamento)}</div>
            <span className="text-slate-500">Meta {formatCurrency(item.faturamentoMeta)}</span>
          </div>
          <div className="space-y-1">
            <span className="text-slate-400">Glosa consolidada</span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-white">{formatPercentage(item.glosaPercentual)}</span>
              <VariationChip value={item.tendencia} status={tendenciaPositive} />
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className={`h-full rounded-full ${item.health === 'critical' ? 'bg-rose-500' : item.health === 'attention' ? 'bg-amber-400' : 'bg-emerald-400'}`}
                style={{ width: `${glosaWidth}%` }}
              />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex items-center justify-between border-t border-white/5 pt-4 text-xs text-slate-300">
        <div>
          <p className="font-semibold text-white">SLA Autorização</p>
          <p>{item.slaAutorizacao}</p>
        </div>
        <div className="text-right">
          <p className="font-semibold text-white">Trend OPME</p>
          <p>{item.tendencia > 0 ? '+' : ''}{item.tendencia.toFixed(1)} pts mês</p>
        </div>
      </CardContent>
    </Card>
  );
};

const fallbackLineData = [
  { label: 'Jan', value: 40 },
  { label: 'Fev', value: 38 },
  { label: 'Mar', value: 36 },
  { label: 'Abr', value: 33 },
  { label: 'Mai', value: 31 },
  { label: 'Jun', value: 29 },
];

const FallbackLineChart = () => (
  <ResponsiveContainer width="100%" height={180}>
    <LineChart data={fallbackLineData}>
      <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15)" />
      <XAxis dataKey="label" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
      <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} width={40} />
      <Tooltip contentStyle={{ background: '#0f172a', borderRadius: 8, border: '1px solid rgba(148,163,184,0.2)' }} labelStyle={{ color: '#e2e8f0' }} />
      <Line type="monotone" dataKey="value" stroke="#38bdf8" strokeWidth={2} dot={{ r: 3 }} />
    </LineChart>
  </ResponsiveContainer>
);

const fallbackTreemapData = [
  { name: 'Fornecedor A', size: 12 },
  { name: 'Fornecedor B', size: 9 },
  { name: 'Fornecedor C', size: 7 },
  { name: 'Fornecedor D', size: 5 },
];

const FallbackTreemap = () => (
  <div className="grid grid-cols-2 gap-2">
    {fallbackTreemapData.map((item) => (
      <div key={item.name} className="rounded-lg bg-white/10 p-3 text-xs text-slate-200">
        <p className="font-semibold">{item.name}</p>
        <p>{item.size}% do custo</p>
      </div>
    ))}
  </div>
);

const FlowCard: React.FC<{ flow: OPMEFlow }> = ({ flow }) => (
  <Card className="border border-white/10 bg-slate-900/60 backdrop-blur">
    <CardHeader>
      <CardTitle className="text-white">{flow.titulo}</CardTitle>
      {flow.subtitulo && <p className="text-xs text-slate-400">{flow.subtitulo}</p>}
    </CardHeader>
    <CardContent className="space-y-4 text-xs text-slate-300">
      <ol className="space-y-3">
        {flow.steps.slice(0, 4).map((step) => (
          <li key={step.ordem} className="relative pl-6">
            <span className="absolute left-0 top-1 h-4 w-4 rounded-full border border-white/30 text-center text-[10px] leading-4 text-slate-200">
              {step.ordem}
            </span>
            <p className="font-semibold text-slate-100">{step.titulo}</p>
            <p>{step.detalhe}</p>
            {step.complemento && <p className="text-slate-400">{step.complemento}</p>}
          </li>
        ))}
      </ol>
      {flow.observacoes && (
        <div className="rounded-lg bg-white/5 p-3 text-slate-300">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Observações</p>
          <ul className="mt-2 space-y-1">
            {flow.observacoes.map((obs) => (
              <li key={obs}>• {obs}</li>
            ))}
          </ul>
        </div>
      )}
    </CardContent>
  </Card>
);

const OSSControleOPME: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const section = params.get('section');

    if (!section) return;

    let timeoutId: number | undefined;
    let targetElement: HTMLElement | null = null;

    const rafId = window.requestAnimationFrame(() => {
      targetElement = document.getElementById(section);

      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        targetElement.classList.add('ring-2', 'ring-emerald-400/40');

        timeoutId = window.setTimeout(() => {
          targetElement?.classList.remove('ring-2', 'ring-emerald-400/40');
        }, 1500);
      }
    });

    return () => {
      window.cancelAnimationFrame(rafId);
      if (timeoutId) window.clearTimeout(timeoutId);
      targetElement?.classList.remove('ring-2', 'ring-emerald-400/40');
    };
  }, [location.search]);

  return (
    <div className="min-h-screen space-y-12 bg-gradient-to-br from-slate-950 via-slate-900 to-black p-6 text-slate-100">
      <header className="space-y-3">
        <Badge className="bg-purple-500/20 text-purple-200">Controle de OPME</Badge>
        <h1 className="text-3xl font-bold text-white">Cockpit Estratégico de OPME</h1>
        <p className="max-w-4xl text-sm text-slate-300">
          Diagnóstico executivo, status por convênio e guias operacionais para garantir performance financeira, compliance e
          governança das órteses, próteses e materiais especiais em toda a rede.
        </p>
      </header>

      <div className="grid gap-4 xl:grid-cols-[3fr,1fr]">
        <div className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-5">
          {heroKpis.map((kpi) => (
            <HeroKpiCard key={kpi.id} kpi={kpi} />
          ))}
        </div>
        <OraclePanel actions={heroActions} />
      </div>

      <section id="overview" className="scroll-mt-24">
        <SectionHeader
          icon={<LayoutDashboard className="h-5 w-5" />}
          title="Panorama executivo"
          description="KPIs críticos acompanhados pela diretoria com leitura rápida e comparação direta com as metas contratuais."
        />
        <div className="grid gap-4 xl:grid-cols-5 md:grid-cols-3">
          {kpiSnapshots.map((snapshot) => {
            const Icon = kpiIconMap[snapshot.icon];
            return (
              <Card key={snapshot.id} className="relative overflow-hidden border border-white/10 bg-white/5 backdrop-blur">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent" />
                <CardHeader className="relative z-10 flex items-start justify-between pb-2">
                  <div className="space-y-1">
                    <CardTitle className="text-sm text-slate-200">{snapshot.label}</CardTitle>
                    <span className="text-2xl font-semibold text-white">{snapshot.value}</span>
                  </div>
                  <span className="rounded-full bg-black/30 p-2 text-slate-100">
                    <Icon className="h-5 w-5" />
                  </span>
                </CardHeader>
                <CardContent className="relative z-10 flex items-end justify-between text-xs text-slate-300">
                  <VariationChip value={snapshot.variation} status={snapshot.status} />
                  <span>{snapshot.target}</span>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section id="prioridades" className="scroll-mt-24">
        <SectionHeader
          icon={<ClipboardCheck className="h-5 w-5" />}
          title="Prioridades do dia"
          description="Listas ordenadas por impacto financeiro, prazo e risco para direcionar squads operacionais."
        />
        <div className="grid gap-4 lg:grid-cols-3">
          {prioritizedLists.slice(0, 3).map((list) => (
            <PrioritizedListCard key={list.id} list={list} />
          ))}
        </div>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {prioritizedLists.slice(3).map((list) => (
            <PrioritizedListCard key={list.id} list={list} />
          ))}
        </div>
      </section>

      <section id="cockpit" className="scroll-mt-24">
        <SectionHeader
          icon={<Activity className="h-5 w-5" />}
          title="Receita e glosa – visão 6 meses"
          description="Curvas de evolução da receita reconhecida vs meta e da taxa de glosa com objetivo de redução contínua."
        />
        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="border border-white/10 bg-slate-900/60 backdrop-blur">
            <CardHeader className="flex flex-col gap-2">
              <CardTitle className="text-base text-white">Receita OPME vs meta (R$ mi)</CardTitle>
              <p className="text-xs text-slate-400">Fonte: conciliação faturamento x recebimento – atualização diária</p>
            </CardHeader>
            <CardContent className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={receitaSeries}>
                  <defs>
                    <linearGradient id="colorRealizado" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="5%" stopColor="#34d399" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.2)" />
                  <XAxis dataKey="mes" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} width={40} />
                  <Tooltip
                    contentStyle={{ background: '#0f172a', borderRadius: 8, border: '1px solid rgba(148,163,184,0.2)' }}
                    labelStyle={{ color: '#e2e8f0' }}
                    formatter={(value: number) => [formatCurrency(value), '']} />
                  <Area type="monotone" dataKey="meta" stroke="#818cf8" strokeWidth={2} fill="transparent" name="Meta" />
                  <Area type="monotone" dataKey="realizado" stroke="#34d399" strokeWidth={2} fill="url(#colorRealizado)" name="Realizado" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border border-white/10 bg-slate-900/60 backdrop-blur">
            <CardHeader className="flex flex-col gap-2">
              <CardTitle className="text-base text-white">Índice de glosa acumulado (%)</CardTitle>
              <p className="text-xs text-slate-400">Comparativo mensal com objetivo de redução e banda de meta contratual</p>
            </CardHeader>
            <CardContent className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={glosaSeries}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.2)" />
                  <XAxis dataKey="mes" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} width={40} />
                  <Tooltip
                    contentStyle={{ background: '#0f172a', borderRadius: 8, border: '1px solid rgba(148,163,184,0.2)' }}
                    labelStyle={{ color: '#e2e8f0' }}
                    formatter={(value: number) => [formatPercentage(value), '']} />
                  <Line type="monotone" dataKey="objetivo" stroke="#818cf8" strokeWidth={2} dot={false} name="Meta" />
                  <Line type="monotone" dataKey="percentual" stroke="#f472b6" strokeWidth={2} dot={{ r: 3 }} name="Realizado" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 xl:grid-cols-2">
          <Card className="border border-white/10 bg-slate-900/60 backdrop-blur">
            <CardHeader className="flex flex-col gap-2">
              <CardTitle className="text-base text-white">Faturamento realizado x meta (top 6 convênios)</CardTitle>
              <p className="text-xs text-slate-400">Valores consolidados do mês corrente (R$ milhões)</p>
            </CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={faturamentoConvenioRanking}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.25)" />
                  <XAxis
                    dataKey="operador"
                    stroke="#94a3b8"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                    interval={0}
                    height={70}
                    angle={-12}
                    textAnchor="end"
                  />
                  <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} width={36} />
                  <Tooltip
                    contentStyle={{ background: '#0f172a', borderRadius: 8, border: '1px solid rgba(148,163,184,0.2)' }}
                    labelStyle={{ color: '#e2e8f0' }}
                    formatter={(value: number, name) => [formatCurrency(value), name === 'valor' ? 'Realizado' : 'Meta']} />
                  <Legend wrapperStyle={{ color: '#94a3b8' }} />
                  <Bar dataKey="meta" name="Meta" fill="#818cf8" radius={[4, 4, 0, 0]} maxBarSize={28} />
                  <Bar dataKey="valor" name="Realizado" fill="#34d399" radius={[4, 4, 0, 0]} maxBarSize={28} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border border-white/10 bg-slate-900/60 backdrop-blur">
            <CardHeader className="flex flex-col gap-2">
              <CardTitle className="text-base text-white">Tempo médio de autorização (horas)</CardTitle>
              <p className="text-xs text-slate-400">Comparativo entre eletivo e urgência com meta corporativa</p>
            </CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={tempoAutorizacaoSeries}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.2)" />
                  <XAxis dataKey="mes" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} width={40} />
                  <Tooltip
                    contentStyle={{ background: '#0f172a', borderRadius: 8, border: '1px solid rgba(148,163,184,0.2)' }}
                    labelStyle={{ color: '#e2e8f0' }}
                    formatter={(value: number, name) => [`${value} h`, name === 'meta' ? 'Meta' : name === 'eletivo' ? 'Eletivo' : 'Urgência']} />
                  <Legend wrapperStyle={{ color: '#94a3b8' }} />
                  <Line type="monotone" dataKey="meta" stroke="#818cf8" strokeDasharray="6 4" strokeWidth={2} name="Meta" />
                  <Line type="monotone" dataKey="eletivo" stroke="#38bdf8" strokeWidth={2} dot={{ r: 3 }} name="Eletivo" />
                  <Line type="monotone" dataKey="urgencia" stroke="#f97316" strokeWidth={2} dot={{ r: 3 }} name="Urgência" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 xl:grid-cols-2">
          <Card className="border border-white/10 bg-slate-900/60 backdrop-blur">
            <CardHeader className="flex flex-col gap-2">
              <CardTitle className="text-base text-white">Glosa por causa principal (%)</CardTitle>
              <p className="text-xs text-slate-400">Impacto percentual no mês e tendência vs. mês anterior</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart layout="vertical" data={causasGlosaDistribuicao}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.2)" horizontal={false} />
                    <XAxis type="number" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} domain={[0, 40]} />
                    <YAxis type="category" dataKey="causa" stroke="#94a3b8" fontSize={12} width={160} tickLine={false} axisLine={false} />
                    <Tooltip
                      contentStyle={{ background: '#0f172a', borderRadius: 8, border: '1px solid rgba(148,163,184,0.2)' }}
                      labelStyle={{ color: '#e2e8f0' }}
                      formatter={(value: number) => [`${value.toFixed(1)}%`, 'Impacto']} />
                    <Bar dataKey="impacto" fill="#f472b6" radius={[0, 4, 4, 0]} barSize={14} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 text-xs text-slate-300">
                {causasGlosaDistribuicao.map((item) => (
                  <div key={item.causa} className="flex items-center justify-between gap-3">
                    <span>{item.causa}</span>
                    <VariationChip value={item.tendencia} status={item.tendencia <= 0 ? 'positive' : 'negative'} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border border-white/10 bg-slate-900/60 backdrop-blur">
            <CardHeader className="flex flex-col gap-2">
              <CardTitle className="text-base text-white">Margem por linha de cuidado (%)</CardTitle>
              <p className="text-xs text-slate-400">Visão consolidada de margem líquida considerando custo OPME</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart
                    data={margemLinhaCuidado.map((item, index) => ({
                      ...item,
                      fill: radialPalette[index % radialPalette.length],
                    }))}
                    innerRadius="30%"
                    outerRadius="100%"
                    startAngle={90}
                    endAngle={-270}
                  >
                    <PolarAngleAxis type="number" domain={[0, 30]} tick={false} />
                    <RadialBar dataKey="margem" background clockWise cornerRadius={10} />
                  </RadialBarChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                {margemLinhaCuidado.map((item, index) => (
                  <div key={item.linha} className="flex items-center gap-2">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: radialPalette[index % radialPalette.length] }}
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-white">{item.linha}</p>
                      <p>{item.margem}% margem</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="integracoes" className="scroll-mt-24">
        <SectionHeader
          icon={<Network className="h-5 w-5" />}
          title="Status OPME por convênio"
          description="Saúde da operação, tendências de glosa e SLAs de autorização consolidados por operadora."
        />
        <div className="grid gap-4 lg:grid-cols-2">
          {convenioStatus.map((item) => (
            <ConvenioCard key={item.operador} item={item} />
          ))}
        </div>
        <div className="mt-6 grid gap-4">
          {integrationNetworkSpecs.map((card) => (
            <AntVCard key={card.title} card={card} />
          ))}
        </div>
      </section>

      <section id="metricas" className="scroll-mt-24">
        <SectionHeader
          icon={<Activity className="h-5 w-5" />}
          title="Métricas chave & formas de leitura"
          description="Resumo das métricas acompanhadas no cockpit, com foco em triangulação entre finanças, operação e compliance."
        />
        <div className="grid gap-4 md:grid-cols-2">
          {executiveMetrics.slice(0, 6).map((metric) => (
            <Card key={metric.titulo} className="border border-white/10 bg-slate-900/60 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-sm text-white">{metric.titulo}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-xs text-slate-300">
                <p>{metric.descricao}</p>
                <div className="space-y-1">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Drill-down</p>
                  <div className="flex flex-wrap gap-2">
                    {metric.breakdowns.map((item) => (
                      <Badge key={item} className="bg-white/5 text-slate-200">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
                {metric.sinalizacoes && (
                  <div className="space-y-1">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Alertas</p>
                    <ul className="space-y-1">
                      {metric.sinalizacoes.map((alert) => (
                        <li key={alert}>• {alert}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-6 grid gap-4 xl:grid-cols-3">
          {metricInsightCharts.map((insight) => (
            <QuickChartCard key={insight.title} insight={insight} />
          ))}
        </div>
      </section>

      <section id="dados" className="scroll-mt-24">
        <SectionHeader
          icon={<ShieldCheck className="h-5 w-5" />}
          title="Modelo de dados simplificado"
          description="Entidades essenciais para garantir rastreabilidade ponta a ponta e aderência a LGPD e às normas TISS/TUSS."
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {dataModels.slice(0, 6).map((model) => (
            <Card key={model.entidade} className="border border-white/10 bg-slate-900/60 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-sm text-white">{model.entidade}</CardTitle>
                <p className="text-xs text-slate-400">{model.descricao}</p>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {model.camposChave.map((campo) => (
                    <div key={campo.id} className="flex flex-col gap-1">
                      <Badge className="bg-white/5 text-slate-200">
                        {campo.label}
                      </Badge>
                      {campo.hint && (
                        <span className="text-[10px] uppercase tracking-wide text-slate-500">
                          {campo.hint}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="fluxos" className="scroll-mt-24">
        <SectionHeader
          icon={<Workflow className="h-5 w-5" />}
          title="Fluxos críticos — ponta a ponta"
          description="Sequência operacional recomendada para autorização, rastreabilidade e faturamento sem fricção."
        />
        <div className="grid gap-4 lg:grid-cols-3">
          {criticalFlows.slice(0, 3).map((flow) => (
            <FlowCard key={flow.id} flow={flow} />
          ))}
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {flowMermaidDiagrams.map((diagram) => (
            <MermaidCard key={diagram.title} diagram={diagram} />
          ))}
        </div>
      </section>

      <section id="playbooks" className="scroll-mt-24">
        <SectionHeader
          icon={<BookOpen className="h-5 w-5" />}
          title="Playbooks por convênio"
          description="Checklist operacional, pontos de atenção e canais oficiais de recurso para os principais parceiros."
        />
        <div className="grid gap-4 lg:grid-cols-3">
          {playbooks.slice(0, 6).map((card) => (
            <Card key={card.convenio} className="border border-white/10 bg-slate-900/60 backdrop-blur">
              <CardHeader className="space-y-3">
                <CardTitle className="text-sm text-white">{card.convenio}</CardTitle>
                <Badge className="bg-emerald-500/20 text-emerald-200">SLA {card.slaPadrao}</Badge>
              </CardHeader>
              <CardContent className="space-y-3 text-xs text-slate-300">
                <div>
                  <p className="font-semibold text-slate-200">Checklist essencial</p>
                  <ul className="mt-1 space-y-1">
                    {card.checklist.slice(0, 3).map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                    {card.checklist.length > 3 && <li className="text-slate-500">+{card.checklist.length - 3} itens</li>}
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-slate-200">Pontos de atenção</p>
                  <ul className="mt-1 space-y-1">
                    {card.pontosAtencao.slice(0, 2).map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
                <p>
                  <span className="font-semibold text-slate-200">Recurso:</span> {card.canalRecurso}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-6 grid gap-4">
          {playbookFlowDiagrams.map((diagram) => (
            <MermaidCard key={diagram.title} diagram={diagram} />
          ))}
        </div>
      </section>

      <section id="kanban" className="scroll-mt-24">
        <SectionHeader
          icon={<SquareStack className="h-5 w-5" />}
          title="Kanban operacional — visão tática"
          description="Colunas e campos obrigatórios para monitorar cada guia desde a solicitação até a compensação financeira."
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {kanbanColumns.map((coluna) => (
            <Card key={coluna.id} className="border border-white/10 bg-slate-900/60 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-sm text-white">{coluna.titulo}</CardTitle>
                <p className="text-xs text-slate-400">{coluna.descricao}</p>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2 text-xs text-slate-300">
                {coluna.camposChave.map((campo) => (
                  <Badge key={campo} className="bg-white/5 text-slate-200">
                    {campo}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-6 grid gap-4">
          {kanbanQuickCharts.map((insight) => (
            <QuickChartCard key={insight.title} insight={insight} />
          ))}
        </div>
      </section>

      <section id="ia" className="scroll-mt-24">
        <SectionHeader
          icon={<Brain className="h-5 w-5" />}
          title="IA aplicada & capacidades preditivas"
          description="Modelos de previsão, detecção e prescrição com entregáveis acionáveis para as equipes financeira, clínica e de compras."
        />
        <div className="grid gap-4 md:grid-cols-2">
          {aiInsights.map((insight) => (
            <Card key={insight.titulo} className="border border-white/10 bg-slate-900/60 backdrop-blur">
              <CardHeader className="flex items-center justify-between">
                <CardTitle className="text-sm text-white">{insight.titulo}</CardTitle>
                <Badge className="bg-white/5 text-slate-200 capitalize">{insight.tipo}</Badge>
              </CardHeader>
              <CardContent className="space-y-2 text-xs text-slate-300">
                <p>{insight.descricao}</p>
                {insight.entregaveis && (
                  <ul className="space-y-1">
                    {insight.entregaveis.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-6 grid gap-4">
          {aiAntVSpecs.map((card) => (
            <AntVCard key={card.title} card={card} />
          ))}
        </div>
      </section>

      <section id="governanca" className="scroll-mt-24">
        <SectionHeader
          icon={<ShieldCheck className="h-5 w-5" />}
          title="Governança, compliance e segurança"
          description="Requisitos mínimos para manter aderência regulatória e reduzir riscos operacionais e jurídicos."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {governanceRequirements.slice(0, 6).map((item) => (
            <Card key={item.tema} className="border border-white/10 bg-slate-900/60 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-sm text-white">{item.tema}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-xs text-slate-300">
                  {item.itens.slice(0, 4).map((acao) => (
                    <li key={acao}>• {acao}</li>
                  ))}
                  {item.itens.length > 4 && <li className="text-slate-500">+{item.itens.length - 4} itens</li>}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {governanceDiagrams.map((diagram) => (
            <MermaidCard key={diagram.title} diagram={diagram} />
          ))}
        </div>
      </section>

      <section id="erros" className="scroll-mt-24">
        <SectionHeader
          icon={<AlertTriangle className="h-5 w-5" />}
          title="Erros críticos que geram glosa"
          description="Radar de categorias com plano de prevenção e de recurso para priorização semanal."
        />
        <div className="grid gap-4 md:grid-cols-2">
          {errorPlaybooks.slice(0, 6).map((entry) => (
            <Card key={entry.motivo} className="border border-white/10 bg-slate-900/60 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-sm text-white">{entry.categoria} · {entry.motivo}</CardTitle>
                <p className="text-xs text-slate-400">{entry.definicao}</p>
              </CardHeader>
              <CardContent className="space-y-2 text-xs text-slate-300">
                <div>
                  <p className="font-semibold text-slate-200">Por que acontece</p>
                  <p>{entry.causaRaiz}</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-200">Prevenção</p>
                  <ul className="space-y-1">
                    {entry.prevencao.slice(0, 3).map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="bg-white/5 text-slate-200">Owner: {entry.owner}</Badge>
                  <Badge className="bg-amber-500/20 text-amber-200">SLA {entry.sla}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-6 grid gap-4">
          {errorQuickCharts.map((insight) => (
            <QuickChartCard key={insight.title} insight={insight} />
          ))}
        </div>
      </section>

      <section id="relatorios" className="scroll-mt-24">
        <SectionHeader
          icon={<FileText className="h-5 w-5" />}
          title="Relatórios essenciais & cadência"
          description="Exports consolidados para diretoria, conselho e negociações com operadoras."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {reportDefinitions.slice(0, 6).map((report) => (
            <Card key={report.titulo} className="border border-white/10 bg-slate-900/60 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-sm text-white">{report.titulo}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-xs text-slate-300">
                <p>{report.objetivo}</p>
                <div>
                  <p className="font-semibold text-slate-200">Cortes</p>
                  <ul className="mt-1 space-y-1">
                    {report.cortes.slice(0, 3).map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
                <Badge className="bg-white/5 text-slate-200">Periodicidade: {report.periodicidade}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-6 grid gap-4">
          {reportQuickCharts.map((insight) => (
            <QuickChartCard key={insight.title} insight={insight} />
          ))}
        </div>
      </section>

      <section id="onboarding" className="scroll-mt-24">
        <SectionHeader
          icon={<ClipboardCheck className="h-5 w-5" />}
          title="Onboarding & qualidade de dados"
          description="Fases de implantação e entregáveis para ativar o módulo com governança e dados consistentes."
        />
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="border border-white/10 bg-slate-900/60 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-sm text-white">Fases de implantação</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs text-slate-300">
              {implementationPhases.map((fase) => (
                <div key={fase.fase} className="rounded-lg border border-white/5 bg-white/5 p-3">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-slate-200">{fase.fase}</p>
                    <Badge className="bg-white/5 text-slate-200">{fase.duracao}</Badge>
                  </div>
                  <p className="mt-1 text-slate-300">Objetivos: {fase.objetivos.join('; ')}</p>
                  <p className="mt-1 text-slate-400">Entregáveis: {fase.entregaveis.join('; ')}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border border-white/10 bg-slate-900/60 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-sm text-white">Checklist de qualidade</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs text-slate-300">
              {onboardingSteps.slice(0, 6).map((step) => (
                <div key={step.titulo} className="rounded-lg border border-white/5 bg-white/5 p-3">
                  <p className="font-semibold text-slate-200">{step.titulo}</p>
                  <p className="text-slate-400">{step.descricao}</p>
                  <ul className="mt-2 space-y-1">
                    {step.entregaveis.slice(0, 3).map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        <div className="mt-6 grid gap-4">
          {onboardingDiagrams.map((diagram) => (
            <MermaidCard key={diagram.title} diagram={diagram} />
          ))}
        </div>
      </section>

      <section id="apis" className="scroll-mt-24">
        <SectionHeader
          icon={<Settings className="h-5 w-5" />}
          title="APIs, webhooks e rotinas automáticas"
          description="Instrumentos técnicos para manter a operação viva e integrada com ERPs, portais e RPA."
        />
        <div className="grid gap-4 lg:grid-cols-3">
          <Card className="border border-white/10 bg-slate-900/60 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-sm text-white">Endpoints REST prioritários</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs text-slate-300">
              {apiEndpoints.slice(0, 6).map((endpoint) => (
                <div key={endpoint.rota} className="rounded-lg bg-white/5 p-3">
                  <p className="font-semibold text-slate-200">{endpoint.metodo} <span className="font-mono text-emerald-200">{endpoint.rota}</span></p>
                  <p>{endpoint.finalidade}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border border-white/10 bg-slate-900/60 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-sm text-white">Webhooks & eventos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs text-slate-300">
              {webhooks.slice(0, 6).map((hook) => (
                <div key={hook.evento} className="rounded-lg bg-white/5 p-3">
                  <p className="font-semibold text-slate-200">{hook.evento}</p>
                  <p>{hook.descricao}</p>
                  <p className="text-slate-400">Uso: {hook.uso}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border border-white/10 bg-slate-900/60 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-sm text-white">Checklists operacionais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs text-slate-300">
              {checklists.slice(0, 6).map((check) => (
                <div key={check.contexto} className="rounded-lg bg-white/5 p-3">
                  <p className="font-semibold text-slate-200">{check.contexto}</p>
                  <ul className="mt-1 space-y-1">
                    {check.itens.slice(0, 3).map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        <div className="mt-6 grid gap-4">
          {apiQuickCharts.map((insight) => (
            <QuickChartCard key={insight.title} insight={insight} />
          ))}
        </div>
      </section>

      <section id="raci" className="scroll-mt-24">
        <SectionHeader
          icon={<Users className="h-5 w-5" />}
          title="RACI & plano de testes"
          description="Responsabilidades claras por atividade e critérios de aceite para liberar novas versões."
        />
        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="border border-white/10 bg-slate-900/60 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-sm text-white">Matriz RACI</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs text-slate-300">
              {raciMatrix.slice(0, 6).map((entry) => (
                <div key={entry.atividade} className="rounded-lg bg-white/5 p-3">
                  <p className="font-semibold text-slate-200">{entry.atividade}</p>
                  <p>Responsável: {entry.responsavel}</p>
                  <p>Accountable: {entry.accountable}</p>
                  <p>Consultados: {entry.consultados.join(', ') || '—'}</p>
                  <p>Informados: {entry.informados.join(', ') || '—'}</p>
                  {entry.sla && <p className="text-emerald-200">SLA {entry.sla}</p>}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border border-white/10 bg-slate-900/60 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-sm text-white">Plano de testes & KPIs de adoção</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs text-slate-300">
              {testPlan.slice(0, 6).map((teste) => (
                <div key={teste.pilar} className="rounded-lg bg-white/5 p-3">
                  <p className="font-semibold text-slate-200">{teste.pilar} — {teste.foco}</p>
                  <p>Critérios: {teste.criterios.join('; ')}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        <div className="mt-6 grid gap-4">
          {raciDiagrams.map((diagram) => (
            <MermaidCard key={diagram.title} diagram={diagram} />
          ))}
        </div>
      </section>

      <section id="roadmap" className="scroll-mt-24">
        <SectionHeader
          icon={<Clock className="h-5 w-5" />}
          title="Roadmap — próximos 90, 180 e 365 dias"
          description="Marcos estratégicos com entregáveis e visão de evolução contínua do módulo."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {roadmap.map((milestone) => (
            <Card key={milestone.horizonte} className="border border-white/10 bg-slate-900/60 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-base text-white">Horizonte {milestone.horizonte.toUpperCase()}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-xs text-slate-300">
                  {milestone.objetivos.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-6 grid gap-4">
          {roadmapQuickCharts.map((insight) => (
            <QuickChartCard key={insight.title} insight={insight} />
          ))}
        </div>
      </section>

      <section id="principios" className="scroll-mt-24">
        <SectionHeader
          icon={<CheckCircle2 className="h-5 w-5" />}
          title="Princípios estratégicos"
          description="Diretrizes para manter o ROI sustentável e engajar diretoria, corpo clínico e cadeia de fornecedores."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {strategicPrinciples.slice(0, 6).map((principle) => (
            <Card key={principle.titulo} className="border border-white/10 bg-slate-900/60 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-base text-white">{principle.titulo}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-slate-300">
                <p>{principle.insight}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-6 grid gap-4">
          {principlesQuickCharts.map((insight) => (
            <QuickChartCard key={insight.title} insight={insight} />
          ))}
        </div>
      </section>

      <section id="sistema" className="scroll-mt-24">
        <SectionHeader
          icon={<ShieldCheck className="h-5 w-5" />}
          title="Sistema & Telemetria"
          description="Disponibilidade da plataforma, monitoramento proativo e visão de SLA de suporte."
        />
        <div className="grid gap-4 lg:grid-cols-2">
          {sistemaQuickCharts.map((insight) => (
            <QuickChartCard key={insight.title} insight={insight} />
          ))}
          <Card className="border border-white/10 bg-slate-900/60 backdrop-blur">
            <CardHeader className="space-y-2">
              <CardTitle className="text-sm text-white">SLA de suporte & releases</CardTitle>
              <p className="text-xs text-slate-400">Backlog de evolução da squad OPME e compromissos com a diretoria.</p>
            </CardHeader>
            <CardContent className="space-y-3 text-xs text-slate-300">
              <ul className="space-y-2">
                <li>• Chamados críticos resolvidos em <span className="font-semibold text-white">3h em média</span>.</li>
                <li>• Janela de release semanal às <span className="font-semibold text-white">terças 22h</span> com rollback automático.</li>
                <li>• Monitoramento 24/7 integrado ao NOC com alertas no Teams e PagerDuty.</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator className="border-white/10" />

      <footer className="space-y-2 text-xs text-slate-400">
        <p>Última atualização automática: {new Date().toLocaleString('pt-BR')}</p>
        <p>Fonte dos dados: conciliação financeira, TISS/TUSS, portais proprietários, PEP e RPA OPME.</p>
      </footer>
    </div>
  );
};

export default OSSControleOPME;
