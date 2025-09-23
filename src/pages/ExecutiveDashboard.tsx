import React, { useMemo } from 'react';
import MainLayout from "@/components/layout/MainLayout";
import { Badge } from '@/components/ui/badge';
import { ExecutiveKPIs } from "@/components/executive/ExecutiveKPIs";
import { MunicipalHeatMap } from "@/components/executive/MunicipalHeatMap";
import { PopulationAnalytics } from "@/components/executive/PopulationAnalytics";
import { BudgetROIDashboard } from "@/components/executive/BudgetROIDashboard";
import NeighborhoodComparisonDashboard from "@/components/executive/NeighborhoodComparisonDashboard";
import NeighborhoodAlertSystem from "@/components/executive/NeighborhoodAlertSystem";
import RealTimeNeighborhoodCenter from "@/components/executive/RealTimeNeighborhoodCenter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Crown, MapPin, Users, DollarSign, TrendingUp, Activity, AlertTriangle } from "lucide-react";
import { piracicabaNeighborhoods } from '@/data/piracicabaNeighborhoods';
import { getLatestPiracicabaHealthNews } from '@/data/piracicabaHealthNews2025';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  Line
} from 'recharts';

const ExecutiveDashboard = () => {
  const highRiskAreas = useMemo(
    () => piracicabaNeighborhoods.filter((n) => ['CRÍTICO', 'EMERGÊNCIA'].includes(n.riskLevel)),
    []
  );

  const regulationTrend = [
    { month: 'Abr', fila: 198, tele: 28 },
    { month: 'Mai', fila: 192, tele: 31 },
    { month: 'Jun', fila: 184, tele: 35 },
    { month: 'Jul', fila: 176, tele: 38 },
    { month: 'Ago', fila: 168, tele: 41 },
  ];

  const budgetVsOutcome = [
    { area: 'Atenção Básica', previsto: 12.6, executado: 11.3 },
    { area: 'Hospitalar', previsto: 18.4, executado: 17.8 },
    { area: 'Vigilância', previsto: 6.2, executado: 5.9 },
    { area: 'Telemedicina', previsto: 4.1, executado: 4.6 },
  ];

  const latestNews = useMemo(() => getLatestPiracicabaHealthNews().slice(0, 3), []);

  return (
    <MainLayout>
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
            <Crown className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard Executivo</h1>
            <p className="text-muted-foreground">Painel de controle do prefeito e equipe de saúde de Piracicaba</p>
          </div>
        </div>

        {/* KPIs Overview */}
        <ExecutiveKPIs />

        {/* Main Dashboard Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 lg:w-[800px]">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Visão Geral
            </TabsTrigger>
            <TabsTrigger value="neighborhoods" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Bairros
            </TabsTrigger>
            <TabsTrigger value="alerts" className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Alertas
            </TabsTrigger>
            <TabsTrigger value="realtime" className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Tempo Real
            </TabsTrigger>
            <TabsTrigger value="population" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              População
            </TabsTrigger>
            <TabsTrigger value="budget" className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Orçamento
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary" />
                  Resumo Executivo
                </h3>
                <PopulationAnalytics compact={true} />
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-primary" />
                  Indicadores Financeiros
                </h3>
                <BudgetROIDashboard compact={true} />
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <div className="bg-card border border-border/60 rounded-xl p-4 space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Fila de regulação x adesão digital
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={regulationTrend}>
                      <defs>
                        <linearGradient id="execFila" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                      <XAxis dataKey="month" stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" />
                      <Tooltip contentStyle={{ background: '#0f172a', borderColor: '#334155' }} />
                      <Legend />
                      <Area type="monotone" dataKey="fila" name="Fila de regulação" stroke="#ef4444" fill="url(#execFila)" />
                      <Line type="monotone" dataKey="tele" name="Adesão tele (%)" stroke="#22d3ee" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-card border border-border/60 rounded-xl p-4 space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-primary" />
                  Execução orçamentária por eixo
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={budgetVsOutcome}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                      <XAxis dataKey="area" stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" />
                      <Tooltip contentStyle={{ background: '#0f172a', borderColor: '#334155' }} formatter={(value: number) => `${value.toFixed(1)} M`} />
                      <Legend />
                      <Bar dataKey="previsto" name="Previsto" fill="#6366f1" radius={[6, 6, 0, 0]} />
                      <Bar dataKey="executado" name="Executado" fill="#22d3ee" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2 bg-card border border-border/60 rounded-xl p-4 space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Bairros em atenção prioritária</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-muted-foreground">
                  {highRiskAreas.map((item) => (
                    <div key={item.id} className="rounded-lg border border-border/60 bg-background/70 p-3">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-foreground">{item.name}</span>
                        <Badge variant="outline" className="border-red-500/30 text-red-500">
                          {item.riskLevel}
                        </Badge>
                      </div>
                      <p className="text-xs mt-1">{item.activeCases} casos ativos · vulnerabilidade {item.healthFactors.vulnerabilityIndex}</p>
                      <p className="text-xs">Cobertura APS {item.demographics.healthcareCoverage}% · Água {item.healthFactors.waterAccess}%</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-card border border-border/60 rounded-xl p-4 space-y-3">
                <h3 className="text-lg font-semibold text-foreground">Clipping rápido</h3>
                <p className="text-xs text-muted-foreground">Principais manchetes acompanhadas pela inteligência de IA</p>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {latestNews.map((news) => (
                    <li key={news.id} className="border border-border/60 rounded-lg p-3">
                      <p className="font-semibold text-foreground">{news.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{new Date(news.publishedAt).toLocaleDateString('pt-BR')} · {news.source}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="neighborhoods" className="space-y-4">
            <NeighborhoodComparisonDashboard />
          </TabsContent>

          <TabsContent value="alerts" className="space-y-4">
            <NeighborhoodAlertSystem />
          </TabsContent>

          <TabsContent value="realtime" className="space-y-4">
            <RealTimeNeighborhoodCenter />
          </TabsContent>

          <TabsContent value="population" className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Analytics Populacionais
            </h3>
            <PopulationAnalytics />
          </TabsContent>

          <TabsContent value="budget" className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-primary" />
              Análise de Orçamento e ROI
            </h3>
            <BudgetROIDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default ExecutiveDashboard;
