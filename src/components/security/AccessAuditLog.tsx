import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, AlertTriangle, CheckCircle, Clock, User, FileText } from "lucide-react";

interface AccessAuditLogProps {
  compact?: boolean;
}

export const AccessAuditLog = ({ compact = false }: AccessAuditLogProps) => {
  const auditEntries = [
    {
      id: "audit-001",
      timestamp: "2024-01-15 14:32:15",
      user: "Dr. Maria Silva",
      action: "VIEW_PATIENT_RECORD",
      resource: "Patient #1847 - Medical History",
      ipAddress: "192.168.1.45",
      location: "Hospital São João - Sala 204",
      status: "success",
      riskLevel: "low",
      duration: "2m 35s"
    },
    {
      id: "audit-002",
      timestamp: "2024-01-15 14:28:42",
      user: "Nurse João Santos",
      action: "UPDATE_MEDICATION",
      resource: "Patient #1523 - Prescription",
      ipAddress: "192.168.1.67",
      location: "Hospital São João - UTI",
      status: "success",
      riskLevel: "medium",
      duration: "45s"
    },
    {
      id: "audit-003",
      timestamp: "2024-01-15 14:25:18",
      user: "Dr. Carlos Lima",
      action: "EMERGENCY_ACCESS",
      resource: "Patient #1892 - Emergency Data",
      ipAddress: "192.168.1.23",
      location: "Hospital São João - Emergência",
      status: "flagged",
      riskLevel: "high",
      duration: "8m 12s"
    },
    {
      id: "audit-004",
      timestamp: "2024-01-15 14:22:33",
      user: "System Background",
      action: "BACKUP_CREATION",
      resource: "Daily Encrypted Backup",
      ipAddress: "10.0.0.1",
      location: "Data Center - Primary",
      status: "success",
      riskLevel: "low",
      duration: "15m 23s"
    },
    {
      id: "audit-005",
      timestamp: "2024-01-15 14:18:07",
      user: "Admin Tech Support",
      action: "SYSTEM_MAINTENANCE",
      resource: "Database Index Rebuild",
      ipAddress: "192.168.1.100",
      location: "IT Department",
      status: "warning",
      riskLevel: "medium",
      duration: "45m 18s"
    }
  ];

  const auditStats = [
    { label: "Eventos Hoje", value: "1,247", trend: "+5%" },
    { label: "Alertas Ativos", value: "3", trend: "-2" },
    { label: "Compliance", value: "99.8%", trend: "+0.1%" },
    { label: "Anomalias", value: "2", trend: "0" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success": return "default";
      case "warning": return "secondary";
      case "flagged": return "destructive";
      case "failed": return "destructive";
      default: return "secondary";
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case "low": return "text-green-500";
      case "medium": return "text-yellow-500";
      case "high": return "text-red-500";
      default: return "text-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success": return <CheckCircle className="w-4 h-4" />;
      case "warning": return <AlertTriangle className="w-4 h-4" />;
      case "flagged": return <AlertTriangle className="w-4 h-4" />;
      case "failed": return <AlertTriangle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  if (compact) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-green-500" />
            Auditoria Resumida
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {auditStats.map((stat, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm font-medium">{stat.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold">{stat.value}</span>
                  <span className="text-xs text-muted-foreground">{stat.trend}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Audit Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {auditStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <Eye className="w-8 h-8 text-green-500" />
              </div>
              <div className="flex items-center mt-2 text-sm">
                <span className="text-green-500">{stat.trend}</span>
                <span className="text-muted-foreground ml-1">última hora</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Audit Log */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-green-500" />
            Log de Auditoria
          </CardTitle>
          <CardDescription>
            Registro completo de todas as atividades do sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {auditEntries.map((entry) => (
              <div key={entry.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-green-500/10 border border-green-500/20">
                      <User className="w-4 h-4 text-green-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{entry.user}</h4>
                      <p className="text-sm text-muted-foreground">{entry.action}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={getStatusColor(entry.status)}>
                      {getStatusIcon(entry.status)}
                      {entry.status}
                    </Badge>
                    <span className={`text-sm font-medium ${getRiskColor(entry.riskLevel)}`}>
                      {entry.riskLevel} risk
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                  <div>
                    <p className="text-sm font-medium">Recurso Acessado</p>
                    <p className="text-sm text-muted-foreground">{entry.resource}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Localização</p>
                    <p className="text-sm text-muted-foreground">{entry.location}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">IP Address</p>
                    <p className="text-sm text-muted-foreground font-mono">{entry.ipAddress}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Duração</p>
                    <p className="text-sm text-muted-foreground">{entry.duration}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{entry.timestamp}</span>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4 mr-1" />
                      Detalhes
                    </Button>
                    {entry.status === "flagged" && (
                      <Button size="sm" variant="outline">
                        <AlertTriangle className="w-4 h-4 mr-1" />
                        Investigar
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Security Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-green-500" />
            Alertas de Segurança
          </CardTitle>
          <CardDescription>
            Eventos que requerem atenção especial
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg border-yellow-500/20 bg-yellow-500/5">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-500" />
                <div>
                  <p className="font-medium">Acesso Fora do Horário</p>
                  <p className="text-sm text-muted-foreground">Dr. Carlos Lima - 14:25 (Emergência)</p>
                </div>
              </div>
              <Button size="sm" variant="outline">
                Revisar
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg border-blue-500/20 bg-blue-500/5">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="font-medium">Backup Concluído</p>
                  <p className="text-sm text-muted-foreground">Backup diário - 15:00</p>
                </div>
              </div>
              <Button size="sm" variant="outline">
                Ver Log
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg border-green-500/20 bg-green-500/5">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <div>
                  <p className="font-medium">Sistema em Conformidade</p>
                  <p className="text-sm text-muted-foreground">Todos os checks de segurança passaram</p>
                </div>
              </div>
              <Badge variant="default">OK</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};