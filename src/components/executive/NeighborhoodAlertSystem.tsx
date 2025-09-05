import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  AlertTriangle, 
  Zap, 
  MapPin, 
  Clock, 
  Users, 
  TrendingUp,
  CheckCircle,
  X,
  Bell,
  Activity,
  Shield
} from 'lucide-react';
import { pindamonhangabaNeighborhoods } from '@/data/pindamonhangabaNeighborhoods';

interface AlertData {
  id: string;
  neighborhood: string;
  type: 'outbreak' | 'prediction' | 'resource' | 'emergency';
  priority: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  timestamp: Date;
  acknowledged: boolean;
  estimatedAction: string;
  affectedPopulation: number;
}

const NeighborhoodAlertSystem = () => {
  const [alerts, setAlerts] = useState<AlertData[]>([]);
  const [filterType, setFilterType] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');

  // Gerar alertas baseados nos dados dos bairros
  useEffect(() => {
    const generateAlerts = (): AlertData[] => {
      const generatedAlerts: AlertData[] = [];

      pindamonhangabaNeighborhoods.forEach(neighborhood => {
        // Alerta para bairros de emergência
        if (neighborhood.riskLevel === 'EMERGÊNCIA') {
          generatedAlerts.push({
            id: `emergency-${neighborhood.id}`,
            neighborhood: neighborhood.name,
            type: 'emergency',
            priority: 'critical',
            title: 'Situação de Emergência Detectada',
            description: `${neighborhood.activeCases} casos ativos identificados. Taxa de ${neighborhood.casesPerThousand} casos por 1000 habitantes excede limite crítico.`,
            timestamp: new Date(Date.now() - Math.random() * 3600000), // Última hora
            acknowledged: false,
            estimatedAction: 'Intervenção imediata requerida',
            affectedPopulation: neighborhood.population
          });
        }

        // Alerta para bairros críticos
        if (neighborhood.riskLevel === 'CRÍTICO') {
          generatedAlerts.push({
            id: `critical-${neighborhood.id}`,
            neighborhood: neighborhood.name,
            type: 'outbreak',
            priority: 'high',
            title: 'Surto em Evolução Detectado',
            description: `Crescimento acelerado de casos de dengue (${neighborhood.epidemiologicalData.dengue.cases} casos). Tendência ${neighborhood.epidemiologicalData.dengue.trend}.`,
            timestamp: new Date(Date.now() - Math.random() * 7200000), // Últimas 2 horas
            acknowledged: Math.random() > 0.7,
            estimatedAction: 'Bloqueio sanitário em 24h',
            affectedPopulation: Math.round(neighborhood.population * 0.3)
          });
        }

        // Alertas preditivos para bairros com vulnerabilidade alta
        if (neighborhood.healthFactors.vulnerabilityIndex > 7) {
          generatedAlerts.push({
            id: `prediction-${neighborhood.id}`,
            neighborhood: neighborhood.name,
            type: 'prediction',
            priority: 'medium',
            title: 'Risco Elevado Detectado pela IA',
            description: `Modelo preditivo indica 73% de probabilidade de surto nos próximos 7 dias. Índice de vulnerabilidade: ${neighborhood.healthFactors.vulnerabilityIndex}/10.`,
            timestamp: new Date(Date.now() - Math.random() * 14400000), // Últimas 4 horas
            acknowledged: Math.random() > 0.5,
            estimatedAction: 'Reforço preventivo recomendado',
            affectedPopulation: Math.round(neighborhood.population * 0.15)
          });
        }

        // Alertas de recursos para bairros sem unidade básica
        if (!neighborhood.healthFactors.basicHealthUnit && neighborhood.activeCases > 20) {
          generatedAlerts.push({
            id: `resource-${neighborhood.id}`,
            neighborhood: neighborhood.name,
            type: 'resource',
            priority: 'medium',
            title: 'Sobrecarga de Recursos Detectada',
            description: `${neighborhood.activeCases} casos ativos sem unidade básica de saúde local. População depende de outras regiões.`,
            timestamp: new Date(Date.now() - Math.random() * 10800000), // Últimas 3 horas
            acknowledged: Math.random() > 0.8,
            estimatedAction: 'Unidade móvel recomendada',
            affectedPopulation: neighborhood.population
          });
        }
      });

      return generatedAlerts.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    };

    setAlerts(generateAlerts());
  }, []);

  const getAlertTypeConfig = (type: string) => {
    switch (type) {
      case 'emergency':
        return { icon: <AlertTriangle className="w-5 h-5" />, color: 'text-red-600', bg: 'bg-red-500/10', border: 'border-red-500/20' };
      case 'outbreak':
        return { icon: <Zap className="w-5 h-5" />, color: 'text-orange-600', bg: 'bg-orange-500/10', border: 'border-orange-500/20' };
      case 'prediction':
        return { icon: <TrendingUp className="w-5 h-5" />, color: 'text-blue-600', bg: 'bg-blue-500/10', border: 'border-blue-500/20' };
      case 'resource':
        return { icon: <Users className="w-5 h-5" />, color: 'text-purple-600', bg: 'bg-purple-500/10', border: 'border-purple-500/20' };
      default:
        return { icon: <Bell className="w-5 h-5" />, color: 'text-muted-foreground', bg: 'bg-muted', border: 'border-border' };
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-500/10 text-red-600 border-red-500/20';
      case 'high':
        return 'bg-orange-500/10 text-orange-600 border-orange-500/20';
      case 'medium':
        return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'low':
        return 'bg-green-500/10 text-green-600 border-green-500/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    const typeMatch = filterType === 'all' || alert.type === filterType;
    const priorityMatch = filterPriority === 'all' || alert.priority === filterPriority;
    return typeMatch && priorityMatch;
  });

  const unacknowledgedCount = alerts.filter(alert => !alert.acknowledged).length;

  const handleAcknowledge = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, acknowledged: true } : alert
    ));
  };

  const handleDismiss = (alertId: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center gap-3">
                <Bell className="w-6 h-6 text-primary" />
                Sistema de Alertas por Bairros
              </CardTitle>
              <CardDescription>
                Monitoramento inteligente e alertas geo-específicos em tempo real
              </CardDescription>
            </div>
            <div className="flex items-center gap-4">
              {unacknowledgedCount > 0 && (
                <Badge className="bg-red-500/10 text-red-600 border-red-500/20 px-3 py-1">
                  {unacknowledgedCount} pendentes
                </Badge>
              )}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Activity className="w-4 h-4" />
                Tempo real
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Tipo:</label>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os tipos</SelectItem>
                  <SelectItem value="emergency">Emergências</SelectItem>
                  <SelectItem value="outbreak">Surtos</SelectItem>
                  <SelectItem value="prediction">Predições</SelectItem>
                  <SelectItem value="resource">Recursos</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Prioridade:</label>
              <Select value={filterPriority} onValueChange={setFilterPriority}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="critical">Crítica</SelectItem>
                  <SelectItem value="high">Alta</SelectItem>
                  <SelectItem value="medium">Média</SelectItem>
                  <SelectItem value="low">Baixa</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resumo de Alertas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-red-500/20 bg-red-500/5">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">
              {alerts.filter(a => a.priority === 'critical').length}
            </div>
            <div className="text-sm text-muted-foreground">Críticos</div>
          </CardContent>
        </Card>
        
        <Card className="border-orange-500/20 bg-orange-500/5">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {alerts.filter(a => a.priority === 'high').length}
            </div>
            <div className="text-sm text-muted-foreground">Alta Prioridade</div>
          </CardContent>
        </Card>
        
        <Card className="border-yellow-500/20 bg-yellow-500/5">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {alerts.filter(a => a.priority === 'medium').length}
            </div>
            <div className="text-sm text-muted-foreground">Média Prioridade</div>
          </CardContent>
        </Card>
        
        <Card className="border-green-500/20 bg-green-500/5">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {alerts.filter(a => a.acknowledged).length}
            </div>
            <div className="text-sm text-muted-foreground">Reconhecidos</div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Alertas */}
      <div className="space-y-4">
        {filteredAlerts.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Shield className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Nenhum alerta ativo</h3>
              <p className="text-muted-foreground">Todos os bairros estão operando dentro dos parâmetros normais.</p>
            </CardContent>
          </Card>
        ) : (
          filteredAlerts.map((alert) => {
            const typeConfig = getAlertTypeConfig(alert.type);
            
            return (
              <Alert key={alert.id} className={`${typeConfig.bg} ${typeConfig.border} ${alert.acknowledged ? 'opacity-75' : ''}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className={typeConfig.color}>
                      {typeConfig.icon}
                    </div>
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3 flex-wrap">
                        <AlertTitle className="text-base">{alert.title}</AlertTitle>
                        <Badge className={`text-xs px-2 py-1 ${getPriorityBadge(alert.priority)}`}>
                          {alert.priority.toUpperCase()}
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          {alert.neighborhood}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {alert.timestamp.toLocaleString()}
                        </div>
                      </div>
                      
                      <AlertDescription className="text-sm">
                        {alert.description}
                      </AlertDescription>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-muted-foreground">
                        <div>
                          <span className="font-medium">Ação estimada:</span> {alert.estimatedAction}
                        </div>
                        <div>
                          <span className="font-medium">População afetada:</span> {alert.affectedPopulation.toLocaleString()} pessoas
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {!alert.acknowledged && (
                      <Button
                        onClick={() => handleAcknowledge(alert.id)}
                        variant="outline"
                        size="sm"
                        className="text-xs"
                      >
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Reconhecer
                      </Button>
                    )}
                    <Button
                      onClick={() => handleDismiss(alert.id)}
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Alert>
            );
          })
        )}
      </div>
    </div>
  );
};

export default NeighborhoodAlertSystem;