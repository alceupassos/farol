import React from 'react';
import MainLayout from "@/components/layout/MainLayout";
import { OperationalKPIs } from "@/components/operational/OperationalKPIs";
import { RealTimeMonitoring } from "@/components/operational/RealTimeMonitoring";
import { TeamManagement } from "@/components/operational/TeamManagement";
import { AlertsPanel } from "@/components/operational/AlertsPanel";
import { ResourceAllocation } from "@/components/operational/ResourceAllocation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Monitor, Users, AlertTriangle, Layers, Activity } from "lucide-react";

const OperationalDashboard = () => {
  return (
    <MainLayout>
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <div className="p-3 rounded-lg bg-accent/10 border border-accent/20">
            <Settings className="w-8 h-8 text-accent" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard Operacional</h1>
            <p className="text-muted-foreground">Gestão operacional e monitoramento em tempo real</p>
          </div>
        </div>

        {/* KPIs Overview */}
        <OperationalKPIs />

        {/* Main Dashboard Tabs */}
        <Tabs defaultValue="monitoring" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-[800px]">
            <TabsTrigger value="monitoring" className="flex items-center gap-2">
              <Monitor className="w-4 h-4" />
              Monitoramento
            </TabsTrigger>
            <TabsTrigger value="alerts" className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Alertas
            </TabsTrigger>
            <TabsTrigger value="teams" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Equipes
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center gap-2">
              <Layers className="w-4 h-4" />
              Recursos
            </TabsTrigger>
            <TabsTrigger value="activity" className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Atividades
            </TabsTrigger>
          </TabsList>

          <TabsContent value="monitoring" className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Monitor className="w-5 h-5 text-accent" />
              Monitoramento em Tempo Real
            </h3>
            <RealTimeMonitoring />
          </TabsContent>

          <TabsContent value="alerts" className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-accent" />
              Central de Alertas
            </h3>
            <AlertsPanel />
          </TabsContent>

          <TabsContent value="teams" className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Users className="w-5 h-5 text-accent" />
              Gestão de Equipes
            </h3>
            <TeamManagement />
          </TabsContent>

          <TabsContent value="resources" className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Layers className="w-5 h-5 text-accent" />
              Alocação de Recursos
            </h3>
            <ResourceAllocation />
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Activity className="w-5 h-5 text-accent" />
              Registro de Atividades
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RealTimeMonitoring compact={true} />
              <AlertsPanel compact={true} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default OperationalDashboard;