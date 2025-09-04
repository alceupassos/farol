import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import MainLayout from '@/components/layout/MainLayout';
import { NeighborhoodHeatMap } from '@/components/epidemic/NeighborhoodHeatMap';
import { RiskLevelIndicator } from '@/components/epidemic/RiskLevelIndicator';
import { NeighborhoodMetrics } from '@/components/epidemic/NeighborhoodMetrics';
import { EpidemicAlertPanel } from '@/components/epidemic/EpidemicAlertPanel';
import { pindamonhangabaNeighborhoods } from '@/data/pindamonhangabaNeighborhoods';
import { 
  AlertTriangle, 
  MapPin, 
  TrendingUp, 
  Users, 
  Activity,
  Shield,
  Zap,
  Bell
} from 'lucide-react';

const EpidemicAlerts = () => {
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string | null>(null);
  const [activeDisease, setActiveDisease] = useState<string>('all');

  // Calcular estatísticas gerais
  const totalCases = pindamonhangabaNeighborhoods.reduce((sum, n) => sum + n.activeCases, 0);
  const emergencyAreas = pindamonhangabaNeighborhoods.filter(n => n.riskLevel === 'EMERGÊNCIA').length;
  const criticalAreas = pindamonhangabaNeighborhoods.filter(n => n.riskLevel === 'CRÍTICO').length;
  const averageRisk = pindamonhangabaNeighborhoods.reduce((sum, n) => {
    const riskValue = { 'BAIXO': 1, 'MODERADO': 2, 'ALTO': 3, 'CRÍTICO': 4, 'EMERGÊNCIA': 5 }[n.riskLevel];
    return sum + riskValue;
  }, 0) / pindamonhangabaNeighborhoods.length;

  const riskLevels = [
    { level: 'BAIXO', color: 'bg-green-500', description: '0-10 casos/1000 hab', count: pindamonhangabaNeighborhoods.filter(n => n.riskLevel === 'BAIXO').length },
    { level: 'MODERADO', color: 'bg-yellow-500', description: '11-30 casos/1000 hab', count: pindamonhangabaNeighborhoods.filter(n => n.riskLevel === 'MODERADO').length },
    { level: 'ALTO', color: 'bg-orange-500', description: '31-60 casos/1000 hab', count: pindamonhangabaNeighborhoods.filter(n => n.riskLevel === 'ALTO').length },
    { level: 'CRÍTICO', color: 'bg-red-500', description: '61-100 casos/1000 hab', count: pindamonhangabaNeighborhoods.filter(n => n.riskLevel === 'CRÍTICO').length },
    { level: 'EMERGÊNCIA', color: 'bg-purple-500', description: '100+ casos/1000 hab', count: pindamonhangabaNeighborhoods.filter(n => n.riskLevel === 'EMERGÊNCIA').length }
  ];

  return (
    <MainLayout>
      <div className="container mx-auto p-6 space-y-6">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <Shield className="h-8 w-8 text-primary" />
              Alertas Epidemiológicos
            </h1>
            <p className="text-muted-foreground mt-2">
              Monitoramento em tempo real dos níveis de risco por bairro em Pindamonhangaba
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Configurar Alertas
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Atualizar Dados
            </Button>
          </div>
        </div>

        {/* Emergency Alert */}
        {emergencyAreas > 0 && (
          <Alert className="border-red-500 bg-red-50 dark:bg-red-950">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <AlertDescription className="text-red-800 dark:text-red-200 font-medium">
              ⚠️ ATENÇÃO: {emergencyAreas} área(s) em estado de EMERGÊNCIA epidemiológica! 
              Ação imediata necessária.
            </AlertDescription>
          </Alert>
        )}

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Casos Ativos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{totalCases}</div>
              <p className="text-xs text-muted-foreground">
                Última atualização: hoje
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Áreas Críticas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{criticalAreas + emergencyAreas}</div>
              <p className="text-xs text-muted-foreground">
                {emergencyAreas} emergência, {criticalAreas} críticas
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Risco Médio
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{averageRisk.toFixed(1)}/5</div>
              <p className="text-xs text-muted-foreground">
                Escala de risco epidemiológico
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Users className="h-4 w-4" />
                População Monitorada
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">108.9k</div>
              <p className="text-xs text-muted-foreground">
                {pindamonhangabaNeighborhoods.length} bairros monitorados
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="map" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="map" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Mapa de Calor
            </TabsTrigger>
            <TabsTrigger value="alerts" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Alertas Ativos
            </TabsTrigger>
            <TabsTrigger value="metrics" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Métricas Detalhadas
            </TabsTrigger>
          </TabsList>

          <TabsContent value="map" className="space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
              {/* Map */}
              <Card className="xl:col-span-3 glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Mapa de Calor - Níveis de Risco por Bairro</span>
                    <div className="flex gap-2">
                      <Button 
                        variant={activeDisease === 'all' ? 'default' : 'outline'} 
                        size="sm"
                        onClick={() => setActiveDisease('all')}
                      >
                        Todas
                      </Button>
                      <Button 
                        variant={activeDisease === 'dengue' ? 'default' : 'outline'} 
                        size="sm"
                        onClick={() => setActiveDisease('dengue')}
                      >
                        Dengue
                      </Button>
                      <Button 
                        variant={activeDisease === 'covid' ? 'default' : 'outline'} 
                        size="sm"
                        onClick={() => setActiveDisease('covid')}
                      >
                        COVID-19
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-[600px]">
                  <NeighborhoodHeatMap 
                    onNeighborhoodSelect={setSelectedNeighborhood}
                    selectedDisease={activeDisease}
                  />
                </CardContent>
              </Card>

              {/* Legend and Risk Levels */}
              <div className="space-y-4">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="text-lg">Níveis de Risco</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {riskLevels.map((risk) => (
                      <div key={risk.level} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full ${risk.color}`} />
                          <div>
                            <div className="font-medium text-sm">{risk.level}</div>
                            <div className="text-xs text-muted-foreground">{risk.description}</div>
                          </div>
                        </div>
                        <Badge variant="secondary">{risk.count}</Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <RiskLevelIndicator />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="alerts">
            <EpidemicAlertPanel />
          </TabsContent>

          <TabsContent value="metrics">
            <NeighborhoodMetrics selectedNeighborhood={selectedNeighborhood} />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default EpidemicAlerts;