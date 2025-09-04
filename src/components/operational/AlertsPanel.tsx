import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, CheckCircle, Clock, X, Bell, Filter, Archive } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  timestamp: Date;
  source: string;
  status: 'active' | 'acknowledged' | 'resolved';
  priority: 'high' | 'medium' | 'low';
  assignedTo?: string;
}

interface AlertsPanelProps {
  compact?: boolean;
}

export const AlertsPanel: React.FC<AlertsPanelProps> = ({ compact = false }) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [filteredAlerts, setFilteredAlerts] = useState<Alert[]>([]);
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('active');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    generateSampleAlerts();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(generateSampleAlerts, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    applyFilters();
  }, [alerts, filterType, filterStatus]);

  const generateSampleAlerts = () => {
    const sampleAlerts: Alert[] = [
      {
        id: '1',
        type: 'critical',
        title: 'Sistema de Processamento com Alta Latência',
        description: 'O tempo de processamento de documentos está acima de 30 segundos',
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        source: 'Sistema OCR',
        status: 'active',
        priority: 'high',
        assignedTo: 'Equipe Técnica'
      },
      {
        id: '2',
        type: 'warning',
        title: 'Alto Volume de Documentos Pendentes',
        description: '50+ documentos aguardando processamento na fila',
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
        source: 'Fila de Processamento',
        status: 'acknowledged',
        priority: 'medium',
        assignedTo: 'João Silva'
      },
      {
        id: '3',
        type: 'critical',
        title: 'Spike de Alertas de Saúde - Bairro Centro',
        description: '15 novos casos suspeitos de dengue reportados nas últimas 2 horas',
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        source: 'Análise Epidemiológica',
        status: 'active',
        priority: 'high',
        assignedTo: 'Dr. Maria Santos'
      },
      {
        id: '4',
        type: 'warning',
        title: 'Uso de Memória Elevado',
        description: 'Servidor principal com 85% de utilização de memória',
        timestamp: new Date(Date.now() - 45 * 60 * 1000),
        source: 'Monitoramento',
        status: 'active',
        priority: 'medium'
      },
      {
        id: '5',
        type: 'info',
        title: 'Backup Diário Concluído',
        description: 'Backup automático realizado com sucesso às 02:00',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        source: 'Sistema de Backup',
        status: 'resolved',
        priority: 'low'
      }
    ];
    
    setAlerts(sampleAlerts);
    setLoading(false);
  };

  const applyFilters = () => {
    let filtered = alerts;
    
    if (filterType !== 'all') {
      filtered = filtered.filter(alert => alert.type === filterType);
    }
    
    if (filterStatus !== 'all') {
      filtered = filtered.filter(alert => alert.status === filterStatus);
    }
    
    // Sort by timestamp (newest first)
    filtered.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    
    setFilteredAlerts(filtered);
  };

  const acknowledgeAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId 
        ? { ...alert, status: 'acknowledged' as const }
        : alert
    ));
  };

  const resolveAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId 
        ? { ...alert, status: 'resolved' as const }
        : alert
    ));
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'warning': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'info': return <Bell className="w-4 h-4 text-blue-500" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical': return 'bg-red-500/20 text-red-500 border-red-500/30';
      case 'warning': return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30';
      case 'info': return 'bg-blue-500/20 text-blue-500 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-500 border-gray-500/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-red-500/20 text-red-500 border-red-500/30';
      case 'acknowledged': return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30';
      case 'resolved': return 'bg-green-500/20 text-green-500 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-500 border-gray-500/30';
    }
  };

  if (compact) {
    const activeAlerts = alerts.filter(alert => alert.status === 'active');
    const criticalAlerts = activeAlerts.filter(alert => alert.type === 'critical');
    
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Alertas Ativos
            {criticalAlerts.length > 0 && (
              <Badge className="bg-red-500/20 text-red-500">
                {criticalAlerts.length} críticos
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {activeAlerts.slice(0, 3).map((alert) => (
              <div key={alert.id} className="flex items-start gap-3 p-3 border border-border rounded-lg">
                {getAlertIcon(alert.type)}
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm">{alert.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    {alert.timestamp.toLocaleTimeString()}
                  </p>
                </div>
                <Badge className={getAlertColor(alert.type)}>
                  {alert.type}
                </Badge>
              </div>
            ))}
            {activeAlerts.length > 3 && (
              <div className="text-center pt-2">
                <Button variant="outline" size="sm">
                  Ver todos ({activeAlerts.length - 3}+ alertas)
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <AlertTriangle className="w-6 h-6 mx-auto mb-2 text-red-500" />
            <div className="text-2xl font-bold">{alerts.filter(a => a.status === 'active').length}</div>
            <div className="text-xs text-muted-foreground">Alertas Ativos</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="w-6 h-6 mx-auto mb-2 text-yellow-500" />
            <div className="text-2xl font-bold">{alerts.filter(a => a.status === 'acknowledged').length}</div>
            <div className="text-xs text-muted-foreground">Reconhecidos</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <CheckCircle className="w-6 h-6 mx-auto mb-2 text-green-500" />
            <div className="text-2xl font-bold">{alerts.filter(a => a.status === 'resolved').length}</div>
            <div className="text-xs text-muted-foreground">Resolvidos</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Bell className="w-6 h-6 mx-auto mb-2 text-blue-500" />
            <div className="text-2xl font-bold">{alerts.filter(a => a.type === 'critical').length}</div>
            <div className="text-xs text-muted-foreground">Críticos</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4" />
          <span className="text-sm font-medium">Filtros:</span>
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-[150px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os Tipos</SelectItem>
            <SelectItem value="critical">Críticos</SelectItem>
            <SelectItem value="warning">Avisos</SelectItem>
            <SelectItem value="info">Informativos</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[150px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos Status</SelectItem>
            <SelectItem value="active">Ativos</SelectItem>
            <SelectItem value="acknowledged">Reconhecidos</SelectItem>
            <SelectItem value="resolved">Resolvidos</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Alerts List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Alertas ({filteredAlerts.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredAlerts.map((alert) => (
              <div key={alert.id} className="flex items-start gap-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="mt-1">
                  {getAlertIcon(alert.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-foreground">{alert.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{alert.description}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span>Fonte: {alert.source}</span>
                        <span>{alert.timestamp.toLocaleString()}</span>
                        {alert.assignedTo && <span>Responsável: {alert.assignedTo}</span>}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge className={getAlertColor(alert.type)}>
                        {alert.type}
                      </Badge>
                      <Badge className={getStatusColor(alert.status)}>
                        {alert.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {alert.status === 'active' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => acknowledgeAlert(alert.id)}
                      className="text-xs"
                    >
                      Reconhecer
                    </Button>
                  )}
                  {alert.status !== 'resolved' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => resolveAlert(alert.id)}
                      className="text-xs"
                    >
                      Resolver
                    </Button>
                  )}
                </div>
              </div>
            ))}
            
            {filteredAlerts.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Bell className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Nenhum alerta encontrado com os filtros aplicados.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};