import React from 'react';
import MainLayout from "@/components/layout/MainLayout";
import { ExecutiveKPIs } from "@/components/executive/ExecutiveKPIs";
import { MunicipalHeatMap } from "@/components/executive/MunicipalHeatMap";
import { PopulationAnalytics } from "@/components/executive/PopulationAnalytics";
import { BudgetROIDashboard } from "@/components/executive/BudgetROIDashboard";
import NeighborhoodComparisonDashboard from "@/components/executive/NeighborhoodComparisonDashboard";
import NeighborhoodAlertSystem from "@/components/executive/NeighborhoodAlertSystem";
import RealTimeNeighborhoodCenter from "@/components/executive/RealTimeNeighborhoodCenter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Crown, MapPin, Users, DollarSign, TrendingUp, Activity, AlertTriangle } from "lucide-react";

const ExecutiveDashboard = () => {
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
            <p className="text-muted-foreground">Painel de Controle Municipal - Prefeito</p>
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