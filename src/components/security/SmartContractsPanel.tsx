import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileCheck, Code, Play, Pause, Settings, AlertTriangle } from "lucide-react";

export const SmartContractsPanel = () => {
  const contracts = [
    {
      id: "0xa1b2c3d4",
      name: "Health Data Sharing",
      description: "Controla compartilhamento de dados médicos entre instituições",
      status: "active",
      deployedAt: "2024-01-10",
      gasUsed: "2.4M",
      interactions: 1547,
      version: "v2.1.0"
    },
    {
      id: "0xe5f6g7h8",
      name: "Consent Management",
      description: "Gerencia consentimentos de pacientes para uso de dados",
      status: "active", 
      deployedAt: "2024-01-08",
      gasUsed: "1.8M",
      interactions: 892,
      version: "v1.3.2"
    },
    {
      id: "0xi9j0k1l2",
      name: "Access Control",
      description: "Sistema de controle de acesso baseado em roles",
      status: "paused",
      deployedAt: "2024-01-05",
      gasUsed: "3.1M",
      interactions: 2103,
      version: "v1.8.1"
    },
    {
      id: "0xm3n4o5p6",
      name: "Audit Trail",
      description: "Trilha de auditoria imutável para todas as operações",
      status: "deploying",
      deployedAt: "2024-01-15",
      gasUsed: "0",
      interactions: 0,
      version: "v1.0.0"
    }
  ];

  const contractTemplates = [
    {
      name: "Patient Consent",
      description: "Template para contratos de consentimento",
      category: "Consent",
      complexity: "Medium"
    },
    {
      name: "Data Sharing Agreement",
      description: "Acordo de compartilhamento entre hospitais",
      category: "Sharing",
      complexity: "High"
    },
    {
      name: "Emergency Access",
      description: "Acesso de emergência com quebra de vidro",
      category: "Emergency",
      complexity: "Low"
    },
    {
      name: "Research Authorization",
      description: "Autorização para uso em pesquisas",
      category: "Research",
      complexity: "Medium"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "default";
      case "paused": return "secondary";
      case "deploying": return "outline";
      case "failed": return "destructive";
      default: return "secondary";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return <Play className="w-4 h-4" />;
      case "paused": return <Pause className="w-4 h-4" />;
      case "deploying": return <Settings className="w-4 h-4 animate-spin" />;
      case "failed": return <AlertTriangle className="w-4 h-4" />;
      default: return <FileCheck className="w-4 h-4" />;
    }
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "Low": return "secondary";
      case "Medium": return "default";
      case "High": return "destructive";
      default: return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      {/* Contracts Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Contratos Ativos</p>
                <p className="text-2xl font-bold">3</p>
              </div>
              <FileCheck className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Interações</p>
                <p className="text-2xl font-bold">4,542</p>
              </div>
              <Code className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Gas Consumido</p>
                <p className="text-2xl font-bold">7.3M</p>
              </div>
              <Settings className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Uptime</p>
                <p className="text-2xl font-bold">99.9%</p>
              </div>
              <Play className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Deployed Contracts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-green-500" />
              Contratos Implantados
            </CardTitle>
            <CardDescription>
              Smart contracts ativos na blockchain
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {contracts.map((contract) => (
                <div key={contract.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-green-500/10 border border-green-500/20">
                        <FileCheck className="w-4 h-4 text-green-500" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{contract.name}</h4>
                        <p className="text-sm text-muted-foreground">{contract.version}</p>
                      </div>
                    </div>
                    <Badge variant={getStatusColor(contract.status)}>
                      {getStatusIcon(contract.status)}
                      {contract.status}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">{contract.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div>
                      <p className="font-medium">Contract ID</p>
                      <p className="text-muted-foreground font-mono">{contract.id}</p>
                    </div>
                    <div>
                      <p className="font-medium">Deployed</p>
                      <p className="text-muted-foreground">{contract.deployedAt}</p>
                    </div>
                    <div>
                      <p className="font-medium">Gas Used</p>
                      <p className="text-muted-foreground">{contract.gasUsed}</p>
                    </div>
                    <div>
                      <p className="font-medium">Interactions</p>
                      <p className="text-muted-foreground">{contract.interactions.toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      View Code
                    </Button>
                    <Button size="sm" variant="outline">
                      Interactions
                    </Button>
                    <Button size="sm" variant="outline">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contract Templates */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="w-5 h-5 text-green-500" />
              Templates de Contratos
            </CardTitle>
            <CardDescription>
              Templates pré-configurados para implantação rápida
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {contractTemplates.map((template, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-semibold">{template.name}</h4>
                      <p className="text-sm text-muted-foreground">{template.category}</p>
                    </div>
                    <Badge variant={getComplexityColor(template.complexity)}>
                      {template.complexity}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      Preview
                    </Button>
                    <Button size="sm">
                      Deploy
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contract Analytics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-green-500" />
            Analytics de Contratos
          </CardTitle>
          <CardDescription>
            Métricas de performance e uso dos smart contracts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <p className="font-medium">Execuções Hoje</p>
              <p className="text-3xl font-bold text-green-500">247</p>
              <p className="text-sm text-muted-foreground">+12% vs ontem</p>
            </div>
            <div className="space-y-2">
              <p className="font-medium">Gas Médio</p>
              <p className="text-3xl font-bold text-blue-500">0.0045</p>
              <p className="text-sm text-muted-foreground">ETH por transação</p>
            </div>
            <div className="space-y-2">
              <p className="font-medium">Tempo de Execução</p>
              <p className="text-3xl font-bold text-purple-500">2.1s</p>
              <p className="text-sm text-muted-foreground">tempo médio</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};