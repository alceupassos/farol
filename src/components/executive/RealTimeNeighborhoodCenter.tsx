import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Activity, 
  MapPin, 
  Users, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle,
  RefreshCw,
  Monitor,
  Zap,
  Clock,
  Heart
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { piracicabaNeighborhoods } from '@/data/piracicabaNeighborhoods';

interface RealTimeData {
  timestamp: string;
  activeCases: number;
  newCases: number;
  recoveredCases: number;
}

interface NeighborhoodRealTimeData {
  id: string;
  name: string;
  currentCases: number;
  trend: 'up' | 'down' | 'stable';
  changePercent: number;
  lastHourData: RealTimeData[];
  activeCitizens: number;
  engagementScore: number;
  alertLevel: 'green' | 'yellow' | 'orange' | 'red' | 'purple';
}

const RealTimeNeighborhoodCenter = () => {
  const [realTimeData, setRealTimeData] = useState<NeighborhoodRealTimeData[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Gerar dados em tempo real para cada bairro
  const generateRealTimeData = (): NeighborhoodRealTimeData[] => {
    return piracicabaNeighborhoods.map(neighborhood => {
      // Gerar dados da última hora (12 pontos, 5 min cada)
      const lastHourData: RealTimeData[] = [];
      const baseValue = neighborhood.activeCases;
      
      for (let i = 11; i >= 0; i--) {
        const timestamp = new Date(Date.now() - i * 5 * 60 * 1000); // 5 minutos atrás
        const variation = Math.random() * 4 - 2; // -2 a +2
        const activeCases = Math.max(0, baseValue + Math.round(variation));
        
        lastHourData.push({
          timestamp: timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
          activeCases,
          newCases: Math.max(0, Math.round(Math.random() * 3)),
          recoveredCases: Math.round(Math.random() * 2)
        });
      }

      // Calcular tendência e mudança
      const firstValue = lastHourData[0].activeCases;
      const lastValue = lastHourData[lastHourData.length - 1].activeCases;
      const changePercent = firstValue > 0 ? ((lastValue - firstValue) / firstValue) * 100 : 0;
      
      let trend: 'up' | 'down' | 'stable' = 'stable';
      if (Math.abs(changePercent) > 5) {
        trend = changePercent > 0 ? 'up' : 'down';
      }

      // Definir nível de alerta baseado no risco do bairro
      let alertLevel: 'green' | 'yellow' | 'orange' | 'red' | 'purple' = 'green';
      switch (neighborhood.riskLevel) {
        case 'BAIXO': alertLevel = 'green'; break;
        case 'MODERADO': alertLevel = 'yellow'; break;
        case 'ALTO': alertLevel = 'orange'; break;
        case 'CRÍTICO': alertLevel = 'red'; break;
        case 'EMERGÊNCIA': alertLevel = 'purple'; break;
      }

      return {
        id: neighborhood.id,
        name: neighborhood.name,
        currentCases: lastValue,
        trend,
        changePercent: Math.abs(changePercent),
        lastHourData,
        activeCitizens: Math.round(neighborhood.population * (0.1 + Math.random() * 0.2)), // 10-30% da população
        engagementScore: Math.round(70 + Math.random() * 25), // 70-95%
        alertLevel
      };
    });
  };

  useEffect(() => {
    setRealTimeData(generateRealTimeData());
    
    let interval: NodeJS.Timeout;
    if (isMonitoring) {
      interval = setInterval(() => {
        setRealTimeData(generateRealTimeData());
        setLastUpdate(new Date());
      }, 30000); // Atualiza a cada 30 segundos
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isMonitoring]);

  const getAlertColor = (level: string) => {
    switch (level) {
      case 'green': return 'text-green-600 bg-green-500/10 border-green-500/20';
      case 'yellow': return 'text-yellow-600 bg-yellow-500/10 border-yellow-500/20';
      case 'orange': return 'text-orange-600 bg-orange-500/10 border-orange-500/20';
      case 'red': return 'text-red-600 bg-red-500/10 border-red-500/20';
      case 'purple': return 'text-purple-600 bg-purple-500/10 border-purple-500/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getTrendIcon = (trend: string, changePercent: number) => {
    if (trend === 'up') return <TrendingUp className="w-4 h-4 text-red-500" />;
    if (trend === 'down') return <TrendingDown className="w-4 h-4 text-green-500" />;
    return <Activity className="w-4 h-4 text-yellow-500" />;
  };

  const totalActiveCases = realTimeData.reduce((sum, data) => sum + data.currentCases, 0);
  const totalActiveCitizens = realTimeData.reduce((sum, data) => sum + data.activeCitizens, 0);
  const avgEngagement = realTimeData.length > 0 ? realTimeData.reduce((sum, data) => sum + data.engagementScore, 0) / realTimeData.length : 0;
  const criticalNeighborhoods = realTimeData.filter(data => data.alertLevel === 'red' || data.alertLevel === 'purple').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center gap-3">
                <Monitor className="w-6 h-6 text-primary" />
                Central de Monitoramento em Tempo Real
              </CardTitle>
              <CardDescription>
                Acompanhamento simultâneo dos 10 bairros monitorados de Piracicaba
              </CardDescription>
            </div>
            <div className="flex items-center gap-4">
              <Button
                onClick={() => setIsMonitoring(!isMonitoring)}
                variant={isMonitoring ? "default" : "outline"}
                size="sm"
              >
                {isMonitoring ? (
                  <>
                    <Activity className="w-4 h-4 mr-2 animate-pulse" />
                    Monitorando
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Pausado
                  </>
                )}
              </Button>
              <div className="text-xs text-muted-foreground">
                <Clock className="w-3 h-3 inline mr-1" />
                {lastUpdate.toLocaleTimeString()}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Métricas Globais */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 border border-border rounded-lg">
              <div className="text-2xl font-bold text-primary">{totalActiveCases}</div>
              <div className="text-sm text-muted-foreground">Casos Ativos Total</div>
            </div>
            <div className="text-center p-4 border border-border rounded-lg">
              <div className="text-2xl font-bold text-secondary">{totalActiveCitizens.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Cidadãos Ativos</div>
            </div>
            <div className="text-center p-4 border border-border rounded-lg">
              <div className="text-2xl font-bold text-accent">{avgEngagement.toFixed(1)}%</div>
              <div className="text-sm text-muted-foreground">Engajamento Médio</div>
            </div>
            <div className="text-center p-4 border border-border rounded-lg">
              <div className="text-2xl font-bold text-destructive">{criticalNeighborhoods}</div>
              <div className="text-sm text-muted-foreground">Bairros Críticos</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Grid de Bairros */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {realTimeData.map((neighborhood) => (
          <Card key={neighborhood.id} className={`border-2 transition-all duration-300 ${getAlertColor(neighborhood.alertLevel).replace('text-', 'border-').replace('bg-', '').replace('/10', '/20')}`}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {neighborhood.name}
                </CardTitle>
                <Badge className={`text-xs px-2 py-1 ${getAlertColor(neighborhood.alertLevel)}`}>
                  {neighborhood.alertLevel.toUpperCase()}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Casos Atuais */}
              <div className="text-center">
                <div className="text-2xl font-bold flex items-center justify-center gap-2">
                  {neighborhood.currentCases}
                  {getTrendIcon(neighborhood.trend, neighborhood.changePercent)}
                </div>
                <div className="text-xs text-muted-foreground">
                  Casos Ativos {neighborhood.trend !== 'stable' && `(${neighborhood.trend === 'up' ? '+' : '-'}${neighborhood.changePercent.toFixed(1)}%)`}
                </div>
              </div>

              {/* Mini Gráfico */}
              <div className="h-16">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={neighborhood.lastHourData.slice(-6)}>
                    <defs>
                      <linearGradient id={`gradient-${neighborhood.id}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      dataKey="activeCases"
                      stroke="hsl(var(--primary))"
                      fillOpacity={1}
                      fill={`url(#gradient-${neighborhood.id})`}
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Métricas Adicionais */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3 text-muted-foreground" />
                    <span>Cidadãos Ativos</span>
                  </div>
                  <span className="font-medium">{neighborhood.activeCitizens.toLocaleString()}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Heart className="w-3 h-3 text-muted-foreground" />
                    <span>Engajamento</span>
                  </div>
                  <span className="font-medium">{neighborhood.engagementScore}%</span>
                </div>
              </div>

              {/* Indicador de Status */}
              <div className="flex items-center justify-center gap-2 text-xs">
                <div className={`w-2 h-2 rounded-full ${isMonitoring ? 'animate-pulse bg-green-500' : 'bg-gray-400'}`} />
                <span className="text-muted-foreground">
                  {isMonitoring ? 'Monitorando' : 'Pausado'}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Alertas Rápidos */}
      {criticalNeighborhoods > 0 && (
        <Card className="border-destructive/20 bg-destructive/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="w-5 h-5" />
              Situações Críticas Detectadas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {realTimeData
                .filter(data => data.alertLevel === 'red' || data.alertLevel === 'purple')
                .map(neighborhood => (
                  <div key={neighborhood.id} className="p-3 border border-destructive/20 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{neighborhood.name}</span>
                      <Badge className={getAlertColor(neighborhood.alertLevel)}>
                        {neighborhood.alertLevel === 'purple' ? 'EMERGÊNCIA' : 'CRÍTICO'}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {neighborhood.currentCases} casos ativos • {neighborhood.trend === 'up' ? 'Crescendo' : neighborhood.trend === 'down' ? 'Diminuindo' : 'Estável'}
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RealTimeNeighborhoodCenter;
