import React from 'react';
import MainLayout from "@/components/layout/MainLayout";
import { IntegrationsOverview } from "@/components/integrations/IntegrationsOverview";
import { ExternalSystemsManager } from "@/components/integrations/ExternalSystemsManager";
import { APIManagement } from "@/components/integrations/APIManagement";
import { WebhookManager } from "@/components/integrations/WebhookManager";
import { DataSyncMonitor } from "@/components/integrations/DataSyncMonitor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, Cloud, Database, Webhook, RefreshCw, Settings } from "lucide-react";

const IntegrationsDashboard = () => {
  return (
    <MainLayout>
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <Link className="w-8 h-8 text-blue-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard de Integrações</h1>
            <p className="text-muted-foreground">Gestão de APIs, sistemas externos e sincronização de dados</p>
          </div>
        </div>

        {/* Overview */}
        <IntegrationsOverview />

        {/* Main Tabs */}
        <Tabs defaultValue="systems" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-[800px]">
            <TabsTrigger value="systems" className="flex items-center gap-2">
              <Cloud className="w-4 h-4" />
              Sistemas
            </TabsTrigger>
            <TabsTrigger value="apis" className="flex items-center gap-2">
              <Database className="w-4 h-4" />
              APIs
            </TabsTrigger>
            <TabsTrigger value="webhooks" className="flex items-center gap-2">
              <Webhook className="w-4 h-4" />
              Webhooks
            </TabsTrigger>
            <TabsTrigger value="sync" className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4" />
              Sincronização
            </TabsTrigger>
            <TabsTrigger value="config" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Configurações
            </TabsTrigger>
          </TabsList>

          <TabsContent value="systems" className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Cloud className="w-5 h-5 text-blue-500" />
              Sistemas Externos
            </h3>
            <ExternalSystemsManager />
          </TabsContent>

          <TabsContent value="apis" className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Database className="w-5 h-5 text-blue-500" />
              Gerenciamento de APIs
            </h3>
            <APIManagement />
          </TabsContent>

          <TabsContent value="webhooks" className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Webhook className="w-5 h-5 text-blue-500" />
              Webhooks e Notificações
            </h3>
            <WebhookManager />
          </TabsContent>

          <TabsContent value="sync" className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-blue-500" />
              Monitor de Sincronização
            </h3>
            <DataSyncMonitor />
          </TabsContent>

          <TabsContent value="config" className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Settings className="w-5 h-5 text-blue-500" />
              Configurações de Integração
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <APIManagement compact={true} />
              <WebhookManager compact={true} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default IntegrationsDashboard;