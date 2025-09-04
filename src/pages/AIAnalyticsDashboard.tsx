import React from 'react';
import MainLayout from "@/components/layout/MainLayout";
import { AIInsightsDashboard } from "@/components/ai-analytics/AIInsightsDashboard";
import { ModelManagement } from "@/components/ai-analytics/ModelManagement";
import { PredictiveAnalytics } from "@/components/ai-analytics/PredictiveAnalytics";
import { AIModelTraining } from "@/components/ai-analytics/AIModelTraining";
import { HealthPredictions } from "@/components/ai-analytics/HealthPredictions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, LineChart, Settings, Target, TrendingUp, Zap } from "lucide-react";

const AIAnalyticsDashboard = () => {
  return (
    <MainLayout>
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20">
            <Brain className="w-8 h-8 text-purple-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">AI & Analytics Avançado</h1>
            <p className="text-muted-foreground">Inteligência artificial aplicada à saúde e análises preditivas</p>
          </div>
        </div>

        {/* Overview */}
        <AIInsightsDashboard />

        {/* Main Tabs */}
        <Tabs defaultValue="insights" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-[800px]">
            <TabsTrigger value="insights" className="flex items-center gap-2">
              <Brain className="w-4 h-4" />
              Insights
            </TabsTrigger>
            <TabsTrigger value="predictions" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Predições
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <LineChart className="w-4 h-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="models" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Modelos
            </TabsTrigger>
            <TabsTrigger value="training" className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Treinamento
            </TabsTrigger>
          </TabsList>

          <TabsContent value="insights" className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-500" />
              Insights de IA
            </h3>
            <AIInsightsDashboard />
          </TabsContent>

          <TabsContent value="predictions" className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Target className="w-5 h-5 text-purple-500" />
              Predições de Saúde
            </h3>
            <HealthPredictions />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <LineChart className="w-5 h-5 text-purple-500" />
              Analytics Preditiva
            </h3>
            <PredictiveAnalytics />
          </TabsContent>

          <TabsContent value="models" className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Settings className="w-5 h-5 text-purple-500" />
              Gerenciamento de Modelos
            </h3>
            <ModelManagement />
          </TabsContent>

          <TabsContent value="training" className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Zap className="w-5 h-5 text-purple-500" />
              Treinamento de Modelos
            </h3>
            <AIModelTraining />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default AIAnalyticsDashboard;