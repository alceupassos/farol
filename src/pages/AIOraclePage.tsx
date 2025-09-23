import React, { useMemo, useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Brain, Sparkles, BarChart3, Activity, ShieldCheck, AlertTriangle, ArrowRight } from 'lucide-react';
import { getLatestPiracicabaHealthNews } from '@/data/piracicabaHealthNews2025';
import { piracicabaNeighborhoods } from '@/data/piracicabaNeighborhoods';

interface OracleKPI {
  label: string;
  value: string;
  variation?: string;
  trend?: 'up' | 'down' | 'stable';
}

interface OracleResult {
  answer: string;
  actions: string[];
  kpis: OracleKPI[];
  confidence: number;
  sources: string[];
  spotlight: { title: string; description: string; impact: string }[];
}

interface OracleHistoryEntry {
  question: string;
  result: OracleResult;
  timestamp: string;
}

const AIOraclePage: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'municipal' | 'hospital' | 'integrated'>('municipal');
  const [question, setQuestion] = useState('');
  const [result, setResult] = useState<OracleResult | null>(null);
  const [history, setHistory] = useState<OracleHistoryEntry[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const latestNews = useMemo(() => getLatestPiracicabaHealthNews(), []);
  const neighborhoods = useMemo(() => piracicabaNeighborhoods, []);

  const municipalMetrics = useMemo(
    () => ({
      apsCoverage: 0.91,
      vaccination: 0.935,
      childMortality: 9.8,
      fnsTransfers: 52.4,
      arbovirosesHighRisk: 4,
      telehealthAccess: 0.41,
      predictiveRisk: 174,
      outbreakProbability: 0.22,
    }),
    []
  );

  const hospitalMetrics = useMemo(
    () => ({
      occupancy: 0.882,
      monthlyRevenue: 3.4,
      averageStay: 4.1,
      susProduction: 2364,
      tissBilling: 1.8,
      infectionRate: 0.021,
      readmissionRate: 0.081,
      emergencyWait: 36,
    }),
    []
  );

  const integratedMetrics = useMemo(
    () => ({
      supplyRisk: 0.24,
      regulationQueue: 207,
      averageLeadTime: 14,
      primaryCareFollowUp: 0.79,
      chronicCoverage: 0.72,
      bedRotation: 5.7,
      predictiveRisk: 63,
    }),
    []
  );

  const highRiskAreas = useMemo(
    () => neighborhoods.filter((n) => ['CRÍTICO', 'EMERGÊNCIA'].includes(n.riskLevel)).slice(0, 3),
    [neighborhoods]
  );

  const newsSentiment = useMemo(() => {
    const positive = latestNews.filter((news) => news.sentiment === 'positive').length;
    const negative = latestNews.filter((news) => news.sentiment === 'negative').length;
    const neutral = latestNews.filter((news) => news.sentiment === 'neutral').length;
    return { positive, negative, neutral };
  }, [latestNews]);

  const knowledgeBase = useMemo(
    () => [
      {
        id: 'vaccination',
        keywords: ['vacina', 'imuniza', 'cobertura', 'sarampo', 'dengue'],
        categories: ['municipal', 'integrated'],
        handler: (): OracleResult => ({
          answer: t('pages.aiOracle.responses.vaccination', {
            coverage: (municipalMetrics.vaccination * 100).toFixed(1),
            aps: (municipalMetrics.apsCoverage * 100).toFixed(0),
            outbreak: Math.round(municipalMetrics.outbreakProbability * 100),
          }),
          actions: [
            t('pages.aiOracle.actions.vaccination.0'),
            t('pages.aiOracle.actions.vaccination.1'),
            t('pages.aiOracle.actions.vaccination.2'),
          ],
          kpis: [
            {
              label: t('pages.aiOracle.kpis.vaccination'),
              value: `${(municipalMetrics.vaccination * 100).toFixed(1)}%`,
              variation: '+2.3 p.p.',
              trend: 'up',
            },
            {
              label: t('pages.aiOracle.kpis.apsCoverage'),
              value: `${(municipalMetrics.apsCoverage * 100).toFixed(0)}%`,
              variation: '+3.0 p.p.',
              trend: 'up',
            },
            {
              label: t('pages.aiOracle.kpis.outbreakRisk'),
              value: `${Math.round(municipalMetrics.outbreakProbability * 100)}%`,
              variation: '-4 p.p.',
              trend: 'down',
            },
          ],
          confidence: 0.92,
          sources: ['kpi_immunization_coverage', 'openDatasus.immunization', 'analytics.predictive_alerts'],
          spotlight: [
            {
              title: t('pages.aiOracle.spotlight.campaignAlignment.title'),
              description: t('pages.aiOracle.spotlight.campaignAlignment.description'),
              impact: t('pages.aiOracle.spotlight.campaignAlignment.impact'),
            },
            {
              title: t('pages.aiOracle.spotlight.priorityAreas.title'),
              description: t('pages.aiOracle.spotlight.priorityAreas.description'),
              impact: t('pages.aiOracle.spotlight.priorityAreas.impact'),
            },
          ],
        }),
      },
      {
        id: 'budget',
        keywords: ['orçamento', 'gasto', 'fns', 'financeiro', 'repasses'],
        categories: ['municipal'],
        handler: (): OracleResult => ({
          answer: t('pages.aiOracle.responses.budget', {
            transfers: municipalMetrics.fnsTransfers.toFixed(1),
            aps: (municipalMetrics.apsCoverage * 100).toFixed(0),
          }),
          actions: [
            t('pages.aiOracle.actions.budget.0'),
            t('pages.aiOracle.actions.budget.1'),
            t('pages.aiOracle.actions.budget.2'),
          ],
          kpis: [
            {
              label: t('pages.aiOracle.kpis.fnsTransfers'),
              value: `R$ ${municipalMetrics.fnsTransfers.toFixed(1)}M`,
              variation: '+12%',
              trend: 'up',
            },
            {
              label: t('pages.aiOracle.kpis.telehealthUsage'),
              value: `${Math.round(municipalMetrics.telehealthAccess * 100)}%`,
              variation: '+6 p.p.',
              trend: 'up',
            },
            {
              label: t('pages.aiOracle.kpis.predictiveRisk'),
              value: `${municipalMetrics.predictiveRisk}`,
              variation: '-11 casos',
              trend: 'down',
            },
          ],
          confidence: 0.88,
          sources: ['finance.fns_transfers', 'aps.coverage_view', 'ai.risk_scores'],
          spotlight: [
            {
              title: t('pages.aiOracle.spotlight.financialBalance.title'),
              description: t('pages.aiOracle.spotlight.financialBalance.description'),
              impact: t('pages.aiOracle.spotlight.financialBalance.impact'),
            },
            {
              title: t('pages.aiOracle.spotlight.telehealthScaling.title'),
              description: t('pages.aiOracle.spotlight.telehealthScaling.description'),
              impact: t('pages.aiOracle.spotlight.telehealthScaling.impact'),
            },
          ],
        }),
      },
      {
        id: 'occupancy',
        keywords: ['ocupação', 'leito', 'lotação', 'permanência', 'fila'],
        categories: ['hospital', 'integrated'],
        handler: (): OracleResult => ({
          answer: t('pages.aiOracle.responses.occupancy', {
            occupancy: (hospitalMetrics.occupancy * 100).toFixed(1),
            stay: hospitalMetrics.averageStay.toFixed(1),
            queue: integratedMetrics.regulationQueue,
          }),
          actions: [
            t('pages.aiOracle.actions.occupancy.0'),
            t('pages.aiOracle.actions.occupancy.1'),
            t('pages.aiOracle.actions.occupancy.2'),
          ],
          kpis: [
            {
              label: t('pages.aiOracle.kpis.occupancy'),
              value: `${(hospitalMetrics.occupancy * 100).toFixed(1)}%`,
              variation: '+5.2 p.p.',
              trend: 'up',
            },
            {
              label: t('pages.aiOracle.kpis.averageStay'),
              value: `${hospitalMetrics.averageStay.toFixed(1)} dias`,
              variation: '-0.8 dia',
              trend: 'down',
            },
            {
              label: t('pages.aiOracle.kpis.regulationQueue'),
              value: `${integratedMetrics.regulationQueue} casos`,
              variation: '+18 casos',
              trend: 'up',
            },
          ],
          confidence: 0.9,
          sources: ['hospital.occupancy_dashboard', 'regulation.active_queue', 'ai.capacity_forecast'],
          spotlight: [
            {
              title: t('pages.aiOracle.spotlight.bedCoordination.title'),
              description: t('pages.aiOracle.spotlight.bedCoordination.description'),
              impact: t('pages.aiOracle.spotlight.bedCoordination.impact'),
            },
            {
              title: t('pages.aiOracle.spotlight.regulationFlow.title'),
              description: t('pages.aiOracle.spotlight.regulationFlow.description'),
              impact: t('pages.aiOracle.spotlight.regulationFlow.impact'),
            },
          ],
        }),
      },
      {
        id: 'telemedicine',
        keywords: ['telemedicina', 'telemonitor', 'digital', 'remoto'],
        categories: ['municipal', 'hospital', 'integrated'],
        handler: (): OracleResult => ({
          answer: t('pages.aiOracle.responses.telemedicine', {
            coverage: Math.round(municipalMetrics.telehealthAccess * 100),
            daily: '11.8',
            reduction: '18',
          }),
          actions: [
            t('pages.aiOracle.actions.telemedicine.0'),
            t('pages.aiOracle.actions.telemedicine.1'),
            t('pages.aiOracle.actions.telemedicine.2'),
          ],
          kpis: [
            {
              label: t('pages.aiOracle.kpis.telehealthUsage'),
              value: `${Math.round(municipalMetrics.telehealthAccess * 100)}%`,
              variation: '+5 p.p.',
              trend: 'up',
            },
            {
              label: t('pages.aiOracle.kpis.predictiveAdmissions'),
              value: `${integratedMetrics.predictiveRisk} pacientes`,
              variation: '-14 casos',
              trend: 'down',
            },
            {
              label: t('pages.aiOracle.kpis.queueReduction'),
              value: '18% redução',
              variation: '+6 p.p.',
              trend: 'up',
            },
          ],
          confidence: 0.9,
          sources: ['telemedicine.usage_dashboard', 'ai.readmission_model', 'upa.inflow_history'],
          spotlight: [
            {
              title: t('pages.aiOracle.spotlight.telehealthScaling.title'),
              description: t('pages.aiOracle.spotlight.telehealthScaling.description'),
              impact: t('pages.aiOracle.spotlight.telehealthScaling.impact'),
            },
            {
              title: t('pages.aiOracle.spotlight.quickWins.title'),
              description: t('pages.aiOracle.spotlight.quickWins.description'),
              impact: t('pages.aiOracle.spotlight.quickWins.impact'),
            },
          ],
        }),
      },
      {
        id: 'supply',
        keywords: ['estoque', 'farmácia', 'ruptura', 'medicamento'],
        categories: ['municipal', 'integrated'],
        handler: (): OracleResult => ({
          answer: t('pages.aiOracle.responses.supply', {
            risk: integratedMetrics.supplyRisk * 100,
            medication: 'insulina NPH',
          }),
          actions: [
            t('pages.aiOracle.actions.supply.0'),
            t('pages.aiOracle.actions.supply.1'),
            t('pages.aiOracle.actions.supply.2'),
          ],
          kpis: [
            {
              label: t('pages.aiOracle.kpis.supplyRisk'),
              value: `${Math.round(integratedMetrics.supplyRisk * 100)}%`,
              variation: '-4 p.p.',
              trend: 'down',
            },
            {
              label: t('pages.aiOracle.kpis.medicationCoverage'),
              value: '96% cobertura',
              variation: '+3 p.p.',
              trend: 'up',
            },
            {
              label: t('pages.aiOracle.kpis.telehealthUsage'),
              value: `${Math.round(municipalMetrics.telehealthAccess * 100)}%`,
              variation: '+5 p.p.',
              trend: 'up',
            },
          ],
          confidence: 0.87,
          sources: ['pharmacy.inventory_forecast', 'ai.supply_chain_model', 'telemed.adherence'],
          spotlight: [
            {
              title: t('pages.aiOracle.spotlight.pharmacyCoordination.title'),
              description: t('pages.aiOracle.spotlight.pharmacyCoordination.description'),
              impact: t('pages.aiOracle.spotlight.pharmacyCoordination.impact'),
            },
            {
              title: t('pages.aiOracle.spotlight.integration.title'),
              description: t('pages.aiOracle.spotlight.integration.description'),
              impact: t('pages.aiOracle.spotlight.integration.impact'),
            },
          ],
        }),
      },
      {
        id: 'surveillance',
        keywords: ['surto', 'arbovirose', 'dengue', 'risco', 'alerta'],
        categories: ['municipal', 'integrated'],
        handler: (): OracleResult => ({
          answer: t('pages.aiOracle.responses.surveillance', {
            riskAreas: municipalMetrics.arbovirosesHighRisk,
            outbreak: Math.round(municipalMetrics.outbreakProbability * 100),
          }),
          actions: [
            t('pages.aiOracle.actions.surveillance.0'),
            t('pages.aiOracle.actions.surveillance.1'),
            t('pages.aiOracle.actions.surveillance.2'),
          ],
          kpis: [
            {
              label: t('pages.aiOracle.kpis.highRiskAreas'),
              value: `${municipalMetrics.arbovirosesHighRisk}`,
              variation: '+1 área',
              trend: 'up',
            },
            {
              label: t('pages.aiOracle.kpis.outbreakRisk'),
              value: `${Math.round(municipalMetrics.outbreakProbability * 100)}%`,
              variation: '+3 p.p.',
              trend: 'up',
            },
            {
              label: t('pages.aiOracle.kpis.primaryCareFollowUp'),
              value: `${Math.round(integratedMetrics.primaryCareFollowUp * 100)}%`,
              variation: '+5 p.p.',
              trend: 'up',
            },
          ],
          confidence: 0.86,
          sources: ['vigilance.outbreak_forecast', 'aps.follow_up', 'geo.incidence_heatmap'],
          spotlight: [
            {
              title: t('pages.aiOracle.spotlight.fieldTeams.title'),
              description: t('pages.aiOracle.spotlight.fieldTeams.description'),
              impact: t('pages.aiOracle.spotlight.fieldTeams.impact'),
            },
            {
              title: t('pages.aiOracle.spotlight.communityEngagement.title'),
              description: t('pages.aiOracle.spotlight.communityEngagement.description'),
              impact: t('pages.aiOracle.spotlight.communityEngagement.impact'),
            },
          ],
        }),
      },
      {
        id: 'news',
        keywords: ['notícia', 'materia', 'imprensa', 'jornal', 'release'],
        categories: ['municipal', 'integrated', 'hospital'],
        handler: (): OracleResult => {
          const headliners = latestNews.slice(0, 3);
          return {
            answer: t('pages.aiOracle.responses.news', {
              first: headliners[0]?.title ?? '',
              firstSource: headliners[0]?.source ?? '',
              second: headliners[1]?.title ?? '',
              secondSource: headliners[1]?.source ?? '',
            }),
            actions: [
              t('pages.aiOracle.actions.news.0'),
              t('pages.aiOracle.actions.news.1'),
              t('pages.aiOracle.actions.news.2'),
            ],
            kpis: [
              {
                label: t('pages.aiOracle.kpis.newsSentiment'),
                value: `${newsSentiment.positive} positivas · ${newsSentiment.negative} negativas · ${newsSentiment.neutral} neutras`,
                variation: newsSentiment.positive >= 1 ? '+1 narrativa favorável' : 'Estável',
                trend: 'up',
              },
              {
                label: t('pages.aiOracle.kpis.mediaReach'),
                value: `${headliners.length} portais monitorados`,
                variation: '+2 semana',
                trend: 'up',
              },
              {
                label: t('pages.aiOracle.kpis.regulationQueue'),
                value: `${integratedMetrics.regulationQueue} casos`,
                variation: '+12 casos',
                trend: 'up',
              },
            ],
            confidence: 0.84,
            sources: headliners.map((item) => item.source),
            spotlight: [
              {
                title: t('pages.aiOracle.spotlight.mediaPulse.title'),
                description: t('pages.aiOracle.spotlight.mediaPulse.description'),
                impact: t('pages.aiOracle.spotlight.mediaPulse.impact'),
              },
              {
                title: t('pages.aiOracle.spotlight.quickWins.title'),
                description: t('pages.aiOracle.spotlight.quickWins.description'),
                impact: t('pages.aiOracle.spotlight.quickWins.impact'),
              },
            ],
          };
        },
      },
    ],
    [t, municipalMetrics, hospitalMetrics, integratedMetrics]
  );

  const fallbackHandler = useMemo(
    () =>
      (): OracleResult => ({
        answer: t('pages.aiOracle.responses.default', {
          aps: (municipalMetrics.apsCoverage * 100).toFixed(0),
          occupancy: (hospitalMetrics.occupancy * 100).toFixed(1),
          supplyRisk: Math.round(integratedMetrics.supplyRisk * 100),
        }),
        actions: [
          t('pages.aiOracle.actions.default.0'),
          t('pages.aiOracle.actions.default.1'),
          t('pages.aiOracle.actions.default.2'),
        ],
        kpis: [
          {
            label: t('pages.aiOracle.kpis.apsCoverage'),
            value: `${(municipalMetrics.apsCoverage * 100).toFixed(0)}%`,
            variation: '+3 p.p.',
            trend: 'up',
          },
          {
            label: t('pages.aiOracle.kpis.occupancy'),
            value: `${(hospitalMetrics.occupancy * 100).toFixed(1)}%`,
            variation: '+5.2 p.p.',
            trend: 'up',
          },
          {
            label: t('pages.aiOracle.kpis.supplyRisk'),
            value: `${Math.round(integratedMetrics.supplyRisk * 100)}%`,
            variation: '-6 p.p.',
            trend: 'down',
          },
        ],
        confidence: 0.78,
        sources: ['municipal.datahub', 'hospital.adt_monitor', 'logistics.pharmacy_forecast'],
        spotlight: [
          {
            title: t('pages.aiOracle.spotlight.integration.title'),
            description: t('pages.aiOracle.spotlight.integration.description'),
            impact: t('pages.aiOracle.spotlight.integration.impact'),
          },
          {
            title: t('pages.aiOracle.spotlight.quickWins.title'),
            description: t('pages.aiOracle.spotlight.quickWins.description'),
            impact: t('pages.aiOracle.spotlight.quickWins.impact'),
          },
        ],
      }),
    [
      t,
      municipalMetrics.apsCoverage,
      hospitalMetrics.occupancy,
      integratedMetrics.supplyRisk,
    ]
  );

  const suggestions = useMemo(
    () => [
      {
        label: t('pages.aiOracle.suggestions.vaccination'),
        prompt: t('pages.aiOracle.prompts.vaccination'),
        tab: 'municipal' as const,
      },
      {
        label: t('pages.aiOracle.suggestions.bedManagement'),
        prompt: t('pages.aiOracle.prompts.bedManagement'),
        tab: 'hospital' as const,
      },
      {
        label: t('pages.aiOracle.suggestions.financial'),
        prompt: t('pages.aiOracle.prompts.financial'),
        tab: 'municipal' as const,
      },
      {
        label: t('pages.aiOracle.suggestions.outbreak'),
        prompt: t('pages.aiOracle.prompts.outbreak'),
        tab: 'integrated' as const,
      },
      {
        label: t('pages.aiOracle.suggestions.telemedicine'),
        prompt: t('pages.aiOracle.prompts.telemedicine'),
        tab: 'municipal' as const,
      },
      {
        label: t('pages.aiOracle.suggestions.news'),
        prompt: t('pages.aiOracle.prompts.news'),
        tab: 'municipal' as const,
      },
    ],
    [t]
  );

  const askOracle = () => {
    if (!question.trim()) {
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const normalized = question.toLowerCase();
      const match = knowledgeBase.find(
        (entry) =>
          entry.categories.includes(activeTab) &&
          entry.keywords.some((keyword) => normalized.includes(keyword))
      );

      const evaluation = match ? match.handler() : fallbackHandler();

      setResult(evaluation);
      setHistory((prev) => [
        ...prev.slice(-4),
        {
          question,
          result: evaluation,
          timestamp: new Date().toISOString(),
        },
      ]);
      setIsProcessing(false);
    }, 400);
  };

  const handleSuggestion = (prompt: string, tab: 'municipal' | 'hospital' | 'integrated') => {
    setActiveTab(tab);
    setQuestion(prompt);
    setTimeout(askOracle, 50);
  };

  const clearQuestion = () => {
    setQuestion('');
    setResult(null);
  };

  const renderKPI = (kpi: OracleKPI) => (
    <div key={kpi.label} className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-emerald-200">{kpi.label}</span>
        {kpi.variation && (
          <span
            className={`text-xs font-semibold ${
              kpi.trend === 'down'
                ? 'text-red-300'
                : kpi.trend === 'up'
                ? 'text-emerald-300'
                : 'text-slate-300'
            }`}
          >
            {kpi.variation}
          </span>
        )}
      </div>
      <p className="mt-2 text-2xl font-semibold text-white">{kpi.value}</p>
    </div>
  );

  const renderSpotlight = (spot: OracleResult['spotlight'][number]) => (
    <div key={spot.title} className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-4">
      <h4 className="text-sm font-semibold text-blue-100">{spot.title}</h4>
      <p className="mt-2 text-sm text-blue-200/90">{spot.description}</p>
      <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-blue-300">
        {spot.impact}
      </p>
    </div>
  );

  const formatTimestamp = (timestamp: string) =>
    new Date(timestamp).toLocaleString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
    });

  return (
    <MainLayout>
      <div className="min-h-screen bg-slate-950">
        <div className="mx-auto max-w-7xl space-y-8 px-6 py-10">
          <header className="space-y-3 border-b border-white/10 pb-6">
            <div className="flex items-center gap-3 text-emerald-200">
              <Brain className="h-6 w-6" />
              <Badge variant="outline" className="border-emerald-500/40 text-emerald-300">
                FAROL Angra Oráculo de IA
              </Badge>
            </div>
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <h1 className="text-4xl font-bold text-white">
                  {t('pages.aiOracle.title')}
                </h1>
                <p className="mt-2 max-w-3xl text-base text-slate-300">
                  {t('pages.aiOracle.description')}
                </p>
              </div>
              <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100 shadow-lg">
                <p className="font-semibold">{t('pages.aiOracle.snapshot.title')}</p>
                <p>{t('pages.aiOracle.snapshot.subtitle')}</p>
              </div>
            </div>
          </header>

          <section className="grid gap-6 lg:grid-cols-3">
            <Card className="border-emerald-500/20 bg-slate-900/80 shadow-xl shadow-emerald-500/10 lg:col-span-2">
              <CardHeader className="space-y-2">
                <CardTitle className="flex items-center gap-2 text-white">
                  <Sparkles className="h-5 w-5 text-emerald-400" />
                  {t('pages.aiOracle.input.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as typeof activeTab)}>
                  <TabsList className="grid w-full grid-cols-3 bg-slate-800/90">
                    <TabsTrigger value="municipal">{t('pages.aiOracle.tabs.municipal')}</TabsTrigger>
                    <TabsTrigger value="hospital">{t('pages.aiOracle.tabs.hospital')}</TabsTrigger>
                    <TabsTrigger value="integrated">{t('pages.aiOracle.tabs.integrated')}</TabsTrigger>
                  </TabsList>
                </Tabs>

                <div className="space-y-3">
                  <label className="text-sm font-semibold text-slate-200">
                    {t('pages.aiOracle.input.label')}
                  </label>
                  <Textarea
                    value={question}
                    onChange={(event) => setQuestion(event.target.value)}
                    placeholder={t('pages.aiOracle.input.placeholder')}
                    className="min-h-[140px] resize-none border-emerald-500/30 bg-slate-950/80 text-white"
                  />
                  <div className="flex flex-wrap items-center gap-3">
                    <Button disabled={isProcessing} onClick={askOracle} className="bg-emerald-500 text-emerald-950 hover:bg-emerald-400">
                      {isProcessing ? t('pages.aiOracle.input.processing') : t('pages.aiOracle.input.cta')}
                    </Button>
                    <Button variant="outline" onClick={clearQuestion} className="border-slate-700 text-slate-200 hover:bg-slate-800">
                      {t('pages.aiOracle.input.clear')}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-800 bg-slate-900/60">
              <CardHeader>
                <CardTitle className="text-white">{t('pages.aiOracle.suggestionTitle')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {suggestions.map((item) => (
                  <Button
                    key={item.label}
                    variant="outline"
                    onClick={() => handleSuggestion(item.prompt, item.tab)}
                    className="flex w-full items-center justify-between border-slate-700 text-left text-sm text-slate-200 hover:border-emerald-300 hover:bg-emerald-500/10"
                  >
                    <span>{item.label}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                ))}
              </CardContent>
            </Card>
          </section>

          <section className="grid gap-6 lg:grid-cols-3">
            <Card className="border-emerald-500/20 bg-slate-900/90 lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <BarChart3 className="h-5 w-5 text-emerald-400" />
                  {t('pages.aiOracle.context.title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as typeof activeTab)}>
                  <TabsList className="mb-4 bg-slate-800/80">
                    <TabsTrigger value="municipal">{t('pages.aiOracle.tabs.municipal')}</TabsTrigger>
                    <TabsTrigger value="hospital">{t('pages.aiOracle.tabs.hospital')}</TabsTrigger>
                    <TabsTrigger value="integrated">{t('pages.aiOracle.tabs.integrated')}</TabsTrigger>
                  </TabsList>

                  <TabsContent value="municipal" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-3">
                      <Card className="border-slate-800 bg-slate-950/60">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium text-slate-300">
                            {t('pages.aiOracle.panels.municipal.coverage.title')}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-slate-200">
                          <div className="text-2xl font-semibold text-emerald-300">
                            {(municipalMetrics.apsCoverage * 100).toFixed(0)}%
                          </div>
                          <p className="text-xs text-slate-400">
                            {t('pages.aiOracle.panels.municipal.coverage.subtitle')}
                          </p>
                        </CardContent>
                      </Card>
                      <Card className="border-slate-800 bg-slate-950/60">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium text-slate-300">
                            {t('pages.aiOracle.panels.municipal.vaccination.title')}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-slate-200">
                          <div className="text-2xl font-semibold text-emerald-300">
                            {(municipalMetrics.vaccination * 100).toFixed(1)}%
                          </div>
                          <p className="text-xs text-slate-400">
                            {t('pages.aiOracle.panels.municipal.vaccination.subtitle')}
                          </p>
                        </CardContent>
                      </Card>
                      <Card className="border-slate-800 bg-slate-950/60">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium text-slate-300">
                            {t('pages.aiOracle.panels.municipal.risk.title')}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-slate-200">
                          <div className="text-2xl font-semibold text-emerald-300">
                            {municipalMetrics.predictiveRisk}
                          </div>
                          <p className="text-xs text-slate-400">
                            {t('pages.aiOracle.panels.municipal.risk.subtitle')}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="hospital" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-3">
                      <Card className="border-slate-800 bg-slate-950/60">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium text-slate-300">
                            {t('pages.aiOracle.panels.hospital.occupancy.title')}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-slate-200">
                          <div className="text-2xl font-semibold text-emerald-300">
                            {(hospitalMetrics.occupancy * 100).toFixed(1)}%
                          </div>
                          <p className="text-xs text-slate-400">
                            {t('pages.aiOracle.panels.hospital.occupancy.subtitle')}
                          </p>
                        </CardContent>
                      </Card>
                      <Card className="border-slate-800 bg-slate-950/60">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium text-slate-300">
                            {t('pages.aiOracle.panels.hospital.revenue.title')}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-slate-200">
                          <div className="text-2xl font-semibold text-emerald-300">
                            R$ {hospitalMetrics.monthlyRevenue.toFixed(1)}M
                          </div>
                          <p className="text-xs text-slate-400">
                            {t('pages.aiOracle.panels.hospital.revenue.subtitle')}
                          </p>
                        </CardContent>
                      </Card>
                      <Card className="border-slate-800 bg-slate-950/60">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium text-slate-300">
                            {t('pages.aiOracle.panels.hospital.infection.title')}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-slate-200">
                          <div className="text-2xl font-semibold text-emerald-300">
                            {(hospitalMetrics.infectionRate * 100).toFixed(1)}%
                          </div>
                          <p className="text-xs text-slate-400">
                            {t('pages.aiOracle.panels.hospital.infection.subtitle')}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="integrated" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-3">
                      <Card className="border-slate-800 bg-slate-950/60">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium text-slate-300">
                            {t('pages.aiOracle.panels.integrated.queue.title')}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-slate-200">
                          <div className="text-2xl font-semibold text-emerald-300">
                            {integratedMetrics.regulationQueue}
                          </div>
                          <p className="text-xs text-slate-400">
                            {t('pages.aiOracle.panels.integrated.queue.subtitle')}
                          </p>
                        </CardContent>
                      </Card>
                      <Card className="border-slate-800 bg-slate-950/60">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium text-slate-300">
                            {t('pages.aiOracle.panels.integrated.followUp.title')}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-slate-200">
                          <div className="text-2xl font-semibold text-emerald-300">
                            {(integratedMetrics.primaryCareFollowUp * 100).toFixed(0)}%
                          </div>
                          <p className="text-xs text-slate-400">
                            {t('pages.aiOracle.panels.integrated.followUp.subtitle')}
                          </p>
                        </CardContent>
                      </Card>
                      <Card className="border-slate-800 bg-slate-950/60">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium text-slate-300">
                            {t('pages.aiOracle.panels.integrated.supply.title')}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-slate-200">
                          <div className="text-2xl font-semibold text-emerald-300">
                            {(integratedMetrics.supplyRisk * 100).toFixed(0)}%
                          </div>
                          <p className="text-xs text-slate-400">
                            {t('pages.aiOracle.panels.integrated.supply.subtitle')}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <Card className="border-slate-800 bg-slate-900/60">
              <CardHeader>
                <CardTitle className="text-white">{t('pages.aiOracle.history.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-72 pr-4">
                  <div className="space-y-4">
                    {history.length === 0 && (
                      <p className="text-sm text-slate-400">{t('pages.aiOracle.history.empty')}</p>
                    )}
                    {history
                      .slice()
                      .reverse()
                      .map((entry) => (
                        <div key={entry.timestamp} className="rounded-lg border border-slate-800 bg-slate-950/60 p-3">
                          <p className="text-xs text-slate-500">{formatTimestamp(entry.timestamp)}</p>
                          <p className="mt-2 text-sm font-medium text-slate-200">{entry.question}</p>
                          <p className="mt-2 text-xs text-emerald-300">
                            {entry.result.kpis.map((kpi) => kpi.label).join(' • ')}
                          </p>
                        </div>
                      ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </section>

          {result && (
            <section className="grid gap-6 lg:grid-cols-3">
              <Card className="border-emerald-500/30 bg-slate-900/90 lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Activity className="h-5 w-5 text-emerald-400" />
                    {t('pages.aiOracle.response.title')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <p className="text-base leading-relaxed text-slate-200">{result.answer}</p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-3">
                      <h3 className="text-sm font-semibold uppercase tracking-wide text-emerald-200">
                        {t('pages.aiOracle.response.actionsTitle')}
                      </h3>
                      <ul className="space-y-2 text-sm text-slate-200">
                        {result.actions.map((action) => (
                          <li key={action} className="flex items-start gap-2">
                            <ShieldCheck className="mt-0.5 h-4 w-4 text-emerald-300" />
                            <span>{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-sm font-semibold uppercase tracking-wide text-emerald-200">
                        {t('pages.aiOracle.response.sourcesTitle')}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {result.sources.map((source) => (
                          <Badge key={source} variant="outline" className="border-emerald-500/40 text-emerald-200">
                            {source}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    {result.kpis.map((kpi) => renderKPI(kpi))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-500/20 bg-slate-900/80">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <AlertTriangle className="h-5 w-5 text-blue-300" />
                    {t('pages.aiOracle.response.focusTitle')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {result.spotlight.map((spot) => renderSpotlight(spot))}
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold uppercase tracking-wide text-blue-200">
                      {t('pages.aiOracle.response.confidenceTitle')}
                    </h4>
                    <Progress value={Math.round(result.confidence * 100)} className="h-2 bg-slate-800" />
                    <p className="text-xs text-blue-200">
                      {t('pages.aiOracle.response.confidenceValue', {
                        value: Math.round(result.confidence * 100),
                      })}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default AIOraclePage;
