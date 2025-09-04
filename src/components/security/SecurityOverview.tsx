import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Shield, Lock, AlertTriangle, CheckCircle, Activity, Zap } from "lucide-react";

export const SecurityOverview = () => {
  const securityMetrics = [
    {
      title: "Security Score",
      value: 98,
      status: "excellent",
      icon: Shield,
      description: "Pontuação geral de segurança"
    },
    {
      title: "Dados Criptografados",
      value: 100,
      status: "excellent",
      icon: Lock,
      description: "Percentual de dados protegidos"
    },
    {
      title: "Blockchain Sync",
      value: 97,
      status: "good",
      icon: Zap,
      description: "Sincronização blockchain"
    },
    {
      title: "Auditoria Ativa",
      value: 95,
      status: "good",
      icon: Activity,
      description: "Cobertura de auditoria"
    }
  ];

  const threats = [
    {
      type: "low",
      count: 2,
      label: "Baixo Risco",
      color: "text-green-500"
    },
    {
      type: "medium",
      count: 0,
      label: "Médio Risco",
      color: "text-yellow-500"
    },
    {
      type: "high",
      count: 0,
      label: "Alto Risco",
      color: "text-red-500"
    }
  ];

  const recentActivity = [
    {
      action: "Blockchain verification",
      target: "Patient Record #1847",
      timestamp: "2 min ago",
      status: "success",
      user: "Dr. Silva"
    },
    {
      action: "Data encryption",
      target: "Lab Results Batch",
      timestamp: "5 min ago",
      status: "success",
      user: "System"
    },
    {
      action: "Access audit",
      target: "Emergency Data Access",
      timestamp: "12 min ago",
      status: "warning",
      user: "Emergency Team"
    },
    {
      action: "Smart contract execution",
      target: "Data Sharing Agreement",
      timestamp: "18 min ago",
      status: "success",
      user: "Hospital Network"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent": return "text-green-500";
      case "good": return "text-blue-500";
      case "warning": return "text-yellow-500";
      case "danger": return "text-red-500";
      default: return "text-gray-500";
    }
  };

  const getActivityStatusColor = (status: string) => {
    switch (status) {
      case "success": return "bg-green-500/10 text-green-500 border-green-500/20";
      case "warning": return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "error": return "bg-red-500/10 text-red-500 border-red-500/20";
      default: return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Security Metrics */}
      <div className="lg:col-span-2 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-500" />
              Métricas de Segurança
            </CardTitle>
            <CardDescription>
              Indicadores principais de segurança do sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6">
              {securityMetrics.map((metric) => {
                const IconComponent = metric.icon;
                return (
                  <div key={metric.title} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <IconComponent className={`w-5 h-5 ${getStatusColor(metric.status)}`} />
                        <span className="font-medium">{metric.title}</span>
                      </div>
                      <span className={`text-2xl font-bold ${getStatusColor(metric.status)}`}>
                        {metric.value}%
                      </span>
                    </div>
                    <Progress value={metric.value} className="h-2" />
                    <p className="text-sm text-muted-foreground">{metric.description}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recent Security Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-green-500" />
              Atividade de Segurança
            </CardTitle>
            <CardDescription>
              Eventos de segurança recentes do sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`px-2 py-1 rounded text-xs border ${getActivityStatusColor(activity.status)}`}>
                      {activity.status === "success" && <CheckCircle className="w-3 h-3 inline mr-1" />}
                      {activity.status === "warning" && <AlertTriangle className="w-3 h-3 inline mr-1" />}
                      {activity.status}
                    </div>
                    <div>
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">{activity.target}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{activity.user}</p>
                    <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security Status */}
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-green-500" />
              Status de Ameaças
            </CardTitle>
            <CardDescription>
              Detecção de ameaças em tempo real
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {threats.map((threat) => (
              <div key={threat.type} className="flex items-center justify-between">
                <span className="text-sm font-medium">{threat.label}</span>
                <div className="flex items-center gap-2">
                  <span className={`text-2xl font-bold ${threat.color}`}>
                    {threat.count}
                  </span>
                  {threat.count === 0 && <CheckCircle className="w-4 h-4 text-green-500" />}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-green-500" />
              Blockchain Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">2,847</p>
                <p className="text-xs text-muted-foreground">Blocos verificados</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">99.8%</p>
                <p className="text-xs text-muted-foreground">Integridade</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">0.3s</p>
                <p className="text-xs text-muted-foreground">Tempo de verificação</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-green-500" />
              Criptografia
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">AES-256</span>
                <Badge variant="default">Ativo</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">RSA-4096</span>
                <Badge variant="default">Ativo</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">End-to-End</span>
                <Badge variant="default">Ativo</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">HMAC</span>
                <Badge variant="default">Ativo</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};