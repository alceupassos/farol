import React from 'react';
import MainLayout from "@/components/layout/MainLayout";
import { SecurityOverview } from "@/components/security/SecurityOverview";
import { BlockchainVerificationPanel } from "@/components/security/BlockchainVerificationPanel";
import { AccessAuditLog } from "@/components/security/AccessAuditLog";
import { EncryptionManager } from "@/components/security/EncryptionManager";
import { SmartContractsPanel } from "@/components/security/SmartContractsPanel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Lock, FileCheck, Key, Zap, AlertTriangle } from "lucide-react";

const SecurityDashboard = () => {
  return (
    <MainLayout>
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <div className="p-3 rounded-lg bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20">
            <Shield className="w-8 h-8 text-green-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Security & Blockchain</h1>
            <p className="text-muted-foreground">Segurança avançada, blockchain e criptografia</p>
          </div>
        </div>

        {/* Overview */}
        <SecurityOverview />

        {/* Main Tabs */}
        <Tabs defaultValue="blockchain" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-[800px]">
            <TabsTrigger value="blockchain" className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Blockchain
            </TabsTrigger>
            <TabsTrigger value="encryption" className="flex items-center gap-2">
              <Lock className="w-4 h-4" />
              Criptografia
            </TabsTrigger>
            <TabsTrigger value="contracts" className="flex items-center gap-2">
              <FileCheck className="w-4 h-4" />
              Contratos
            </TabsTrigger>
            <TabsTrigger value="audit" className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Auditoria
            </TabsTrigger>
            <TabsTrigger value="access" className="flex items-center gap-2">
              <Key className="w-4 h-4" />
              Permissões
            </TabsTrigger>
          </TabsList>

          <TabsContent value="blockchain" className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Zap className="w-5 h-5 text-green-500" />
              Verificação Blockchain
            </h3>
            <BlockchainVerificationPanel />
          </TabsContent>

          <TabsContent value="encryption" className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Lock className="w-5 h-5 text-green-500" />
              Gerenciamento de Criptografia
            </h3>
            <EncryptionManager />
          </TabsContent>

          <TabsContent value="contracts" className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-green-500" />
              Smart Contracts
            </h3>
            <SmartContractsPanel />
          </TabsContent>

          <TabsContent value="audit" className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-green-500" />
              Log de Auditoria
            </h3>
            <AccessAuditLog />
          </TabsContent>

          <TabsContent value="access" className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Key className="w-5 h-5 text-green-500" />
              Controle de Acesso
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <EncryptionManager compact={true} />
              <AccessAuditLog compact={true} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default SecurityDashboard;