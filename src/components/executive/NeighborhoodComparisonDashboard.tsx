import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  MapPin, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Users, 
  Activity,
  RefreshCw,
  BarChart3,
  Zap
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';
import { piracicabaNeighborhoods } from '@/data/piracicabaNeighborhoods';

interface NeighborhoodComparisonDashboardProps {
  compact?: boolean;
}

const NeighborhoodComparisonDashboard: React.FC<NeighborhoodComparisonDashboardProps> = ({ compact = false }) => {
  const [selectedMetric, setSelectedMetric] = useState('activeCases');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const metrics = [
    { value: 'activeCases', label: 'Casos Ativos', color: '#ef4444' },
    { value: 'casesPerThousand', label: 'Casos por Mil Hab.', color: '#f97316' },
    { value: 'vulnerabilityIndex', label: 'Índice de Vulnerabilidade', color: '#8b5cf6' },
    { value: 'population', label: 'População', color: '#3b82f6' }
  ];

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'BAIXO': return 'hsl(var(--success))';
      case 'MODERADO': return 'hsl(var(--warning))';
      case 'ALTO': return 'hsl(var(--destructive))';
      case 'CRÍTICO': return 'hsl(var(--destructive-dark))';
      case 'EMERGÊNCIA': return 'hsl(var(--destructive-darker))';
      default: return 'hsl(var(--muted-foreground))';
    }
  };

  const getRiskBadgeVariant = (riskLevel: string) => {
    switch (riskLevel) {
      case 'BAIXO': return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'MODERADO': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'ALTO': return 'bg-orange-500/10 text-orange-600 border-orange-500/20';
      case 'CRÍTICO': return 'bg-red-500/10 text-red-600 border-red-500/20';
      case 'EMERGÊNCIA': return 'bg-purple-500/10 text-purple-600 border-purple-500/20';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-red-500" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-green-500" />;
      case 'stable': return <Activity className="w-4 h-4 text-yellow-500" />;
    }
  };

  // Preparar dados para gráficos
  const chartData = piracicabaNeighborhoods
    .map(neighborhood => ({
      name: neighborhood.name.length > 10 ? neighborhood.name.substring(0, 10) + '...' : neighborhood.name,
      fullName: neighborhood.name,
      activeCases: neighborhood.activeCases,
      casesPerThousand: neighborhood.casesPerThousand,
      vulnerabilityIndex: neighborhood.healthFactors.vulnerabilityIndex,
      population: Math.round(neighborhood.population / 1000), // Em milhares
      riskLevel: neighborhood.riskLevel,
      riskColor: getRiskColor(neighborhood.riskLevel)
    }))
    .sort((a, b) => {
      const aValue = a[selectedMetric as keyof typeof a] as number;
      const bValue = b[selectedMetric as keyof typeof b] as number;
      return sortOrder === 'desc' ? bValue - aValue : aValue - bValue;
    });

  // Rankings
  const riskRanking = piracicabaNeighborhoods
    .sort((a, b) => {
      const riskOrder = { 'EMERGÊNCIA': 5, 'CRÍTICO': 4, 'ALTO': 3, 'MODERADO': 2, 'BAIXO': 1 };
      return riskOrder[b.riskLevel as keyof typeof riskOrder] - riskOrder[a.riskLevel as keyof typeof riskOrder];
    })
    .slice(0, compact ? 5 : 10);

  const handleRefresh = () => {
    setLastUpdate(new Date());
    // Aqui seria feita a atualização dos dados via API
  };

  if (compact) {
    return (
      <Card className="h-full">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            Comparativo por Bairros
          </CardTitle>
          <CardDescription>Ranking de risco atual</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {riskRanking.slice(0, 5).map((neighborhood, index) => (
              <div key={neighborhood.id} className="flex items-center justify-between p-2 rounded-lg border border-border hover:bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className="text-sm font-medium text-muted-foreground">#{index + 1}</div>
                  <div>
                    <div className="font-medium text-sm">{neighborhood.name}</div>
                    <div className="text-xs text-muted-foreground">{neighborhood.activeCases} casos</div>
                  </div>
                </div>
                <Badge className={`text-xs px-2 py-1 ${getRiskBadgeVariant(neighborhood.riskLevel)}`}>
                  {neighborhood.riskLevel}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header com Controles */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center gap-3">
                <BarChart3 className="w-6 h-6 text-primary" />
                Dashboard Comparativo por Bairros
              </CardTitle>
              <CardDescription>
                Análise detalhada e comparativa dos 10 principais bairros de Piracicaba
              </CardDescription>
            </div>
            <Button onClick={handleRefresh} variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Atualizar
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Métrica:</label>
              <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {metrics.map(metric => (
                    <SelectItem key={metric.value} value={metric.value}>
                      {metric.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Ordem:</label>
              <Select value={sortOrder} onValueChange={(value: 'asc' | 'desc') => setSortOrder(value)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="desc">Maior → Menor</SelectItem>
                  <SelectItem value="asc">Menor → Maior</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="text-xs text-muted-foreground ml-auto">
              Última atualização: {lastUpdate.toLocaleTimeString()}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Gráfico Principal */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            {metrics.find(m => m.value === selectedMetric)?.label} por Bairro
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="name" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip 
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
                          <p className="font-medium">{data.fullName}</p>
                          <p className="text-sm text-muted-foreground">
                            {metrics.find(m => m.value === selectedMetric)?.label}: {payload[0].value}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Risco: {data.riskLevel}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar 
                  dataKey={selectedMetric} 
                  fill={metrics.find(m => m.value === selectedMetric)?.color}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Ranking Detalhado e Alertas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ranking por Risco */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              Ranking por Nível de Risco
            </CardTitle>
            <CardDescription>Bairros ordenados por prioridade de atenção</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {riskRanking.map((neighborhood, index) => (
                <div key={neighborhood.id} className="flex items-center justify-between p-3 rounded-lg border border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium">{neighborhood.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {neighborhood.activeCases} casos • {neighborhood.population.toLocaleString()} hab.
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={`mb-1 ${getRiskBadgeVariant(neighborhood.riskLevel)}`}>
                      {neighborhood.riskLevel}
                    </Badge>
                    <div className="text-xs text-muted-foreground">
                      {neighborhood.casesPerThousand}/1000 hab.
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alertas Ativos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-warning" />
              Alertas Ativos por Bairro
            </CardTitle>
            <CardDescription>Situações que requerem atenção imediata</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {piracicabaNeighborhoods
                .filter(n => n.riskLevel === 'CRÍTICO' || n.riskLevel === 'EMERGÊNCIA')
                .map((neighborhood) => (
                <div key={neighborhood.id} className="p-3 border border-destructive/20 bg-destructive/5 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium text-destructive">{neighborhood.name}</div>
                    <Badge className={getRiskBadgeVariant(neighborhood.riskLevel)}>
                      {neighborhood.riskLevel}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div>• {neighborhood.activeCases} casos ativos ({neighborhood.casesPerThousand}/1000 hab.)</div>
                    <div>• Dengue: {neighborhood.epidemiologicalData.dengue.cases} casos {getTrendIcon(neighborhood.epidemiologicalData.dengue.trend)}</div>
                    <div>• Vulnerabilidade: {neighborhood.healthFactors.vulnerabilityIndex}/10</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NeighborhoodComparisonDashboard;
