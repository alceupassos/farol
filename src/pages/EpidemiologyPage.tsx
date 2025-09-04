import React, { useState } from 'react';
import { MapPin, TrendingUp, AlertTriangle, Activity, Calendar, Target } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Disease {
  id: string;
  name: string;
  cases: number;
  trend: 'up' | 'down' | 'stable';
  severity: 'low' | 'medium' | 'high' | 'critical';
  lastUpdate: string;
  affectedAreas: string[];
  ageGroups: { range: string; cases: number }[];
}

interface Outbreak {
  id: string;
  disease: string;
  area: string;
  cases: number;
  startDate: string;
  status: 'active' | 'contained' | 'resolved';
  riskLevel: 'low' | 'medium' | 'high';
}

const mockDiseases: Disease[] = [
  {
    id: '1',
    name: 'Dengue',
    cases: 342,
    trend: 'up',
    severity: 'high',
    lastUpdate: '2024-01-20',
    affectedAreas: ['Zona Norte', 'Centro'],
    ageGroups: [
      { range: '0-14 anos', cases: 45 },
      { range: '15-64 anos', cases: 267 },
      { range: '65+ anos', cases: 30 }
    ]
  },
  {
    id: '2',
    name: 'COVID-19',
    cases: 89,
    trend: 'down',
    severity: 'medium',
    lastUpdate: '2024-01-20',
    affectedAreas: ['Zona Sul', 'Zona Leste'],
    ageGroups: [
      { range: '0-14 anos', cases: 8 },
      { range: '15-64 anos', cases: 56 },
      { range: '65+ anos', cases: 25 }
    ]
  },
  {
    id: '3',
    name: 'Gripe H1N1',
    cases: 156,
    trend: 'stable',
    severity: 'medium',
    lastUpdate: '2024-01-19',
    affectedAreas: ['Centro', 'Zona Oeste'],
    ageGroups: [
      { range: '0-14 anos', cases: 34 },
      { range: '15-64 anos', cases: 98 },
      { range: '65+ anos', cases: 24 }
    ]
  },
  {
    id: '4',
    name: 'Chikungunya',
    cases: 67,
    trend: 'up',
    severity: 'medium',
    lastUpdate: '2024-01-18',
    affectedAreas: ['Zona Norte'],
    ageGroups: [
      { range: '0-14 anos', cases: 12 },
      { range: '15-64 anos', cases: 45 },
      { range: '65+ anos', cases: 10 }
    ]
  }
];

const mockOutbreaks: Outbreak[] = [
  {
    id: '1',
    disease: 'Dengue',
    area: 'Zona Norte',
    cases: 234,
    startDate: '2024-01-10',
    status: 'active',
    riskLevel: 'high'
  },
  {
    id: '2',
    disease: 'Gastroenterite',
    area: 'Centro',
    cases: 45,
    startDate: '2024-01-15',
    status: 'contained',
    riskLevel: 'medium'
  },
  {
    id: '3',
    disease: 'Conjuntivite',
    area: 'Zona Sul',
    cases: 78,
    startDate: '2024-01-05',
    status: 'resolved',
    riskLevel: 'low'
  }
];

const EpidemiologyPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30');
  const [selectedArea, setSelectedArea] = useState('all');

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'contained': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'resolved': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-red-500" />;
      case 'down': return <TrendingUp className="h-4 w-4 text-green-500 rotate-180" />;
      case 'stable': return <Activity className="h-4 w-4 text-yellow-500" />;
      default: return null;
    }
  };

  const totalCases = mockDiseases.reduce((sum, disease) => sum + disease.cases, 0);
  const activeDiseases = mockDiseases.filter(d => d.cases > 0).length;
  const activeOutbreaks = mockOutbreaks.filter(o => o.status === 'active').length;

  return (
    <MainLayout>
      <div className="pt-8 pb-10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-display font-semibold mb-2">
              Mapa Epidemiológico
            </h1>
            <p className="text-muted-foreground">
              Monitoramento de doenças e surtos na população municipal
            </p>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger className="w-full md:w-[200px]">
                    <SelectValue placeholder="Período" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">Últimos 7 dias</SelectItem>
                    <SelectItem value="30">Últimos 30 dias</SelectItem>
                    <SelectItem value="90">Últimos 3 meses</SelectItem>
                    <SelectItem value="365">Último ano</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedArea} onValueChange={setSelectedArea}>
                  <SelectTrigger className="w-full md:w-[200px]">
                    <SelectValue placeholder="Área" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as áreas</SelectItem>
                    <SelectItem value="norte">Zona Norte</SelectItem>
                    <SelectItem value="sul">Zona Sul</SelectItem>
                    <SelectItem value="leste">Zona Leste</SelectItem>
                    <SelectItem value="oeste">Zona Oeste</SelectItem>
                    <SelectItem value="centro">Centro</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Gerar Relatório
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Casos</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalCases}</div>
                <p className="text-xs text-muted-foreground">nos últimos 30 dias</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Doenças Ativas</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activeDiseases}</div>
                <p className="text-xs text-muted-foreground">com casos reportados</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Surtos Ativos</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{activeOutbreaks}</div>
                <p className="text-xs text-muted-foreground">requerem atenção</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Áreas Afetadas</CardTitle>
                <MapPin className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">regiões da cidade</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="diseases" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="diseases">Monitoramento de Doenças</TabsTrigger>
              <TabsTrigger value="outbreaks">Surtos Ativos</TabsTrigger>
            </TabsList>
            
            <TabsContent value="diseases" className="mt-6">
              <div className="space-y-4">
                {mockDiseases.map((disease) => (
                  <Card key={disease.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div>
                            <CardTitle className="text-lg">{disease.name}</CardTitle>
                            <CardDescription>
                              Última atualização: {new Date(disease.lastUpdate).toLocaleDateString('pt-BR')}
                            </CardDescription>
                          </div>
                          {getTrendIcon(disease.trend)}
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getSeverityColor(disease.severity)}>
                            {disease.severity === 'high' ? 'Alto Risco' :
                             disease.severity === 'medium' ? 'Risco Médio' :
                             disease.severity === 'low' ? 'Baixo Risco' : 'Crítico'}
                          </Badge>
                          <div className="text-right">
                            <div className="text-2xl font-bold">{disease.cases}</div>
                            <div className="text-sm text-muted-foreground">casos</div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium mb-2">Áreas Afetadas</h4>
                          <div className="flex flex-wrap gap-1">
                            {disease.affectedAreas.map((area) => (
                              <Badge key={area} variant="outline">{area}</Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium mb-2">Distribuição por Idade</h4>
                          <div className="space-y-1">
                            {disease.ageGroups.map((group) => (
                              <div key={group.range} className="flex justify-between text-sm">
                                <span>{group.range}</span>
                                <span>{group.cases} casos</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="outbreaks" className="mt-6">
              <div className="space-y-4">
                {mockOutbreaks.map((outbreak) => (
                  <Card key={outbreak.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">{outbreak.disease}</CardTitle>
                          <CardDescription className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            {outbreak.area} • Início: {new Date(outbreak.startDate).toLocaleDateString('pt-BR')}
                          </CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(outbreak.status)}>
                            {outbreak.status === 'active' ? 'Ativo' :
                             outbreak.status === 'contained' ? 'Contido' : 'Resolvido'}
                          </Badge>
                          <div className="text-right">
                            <div className="text-2xl font-bold">{outbreak.cases}</div>
                            <div className="text-sm text-muted-foreground">casos</div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">Nível de Risco:</span>
                          <Badge variant="outline" className={
                            outbreak.riskLevel === 'high' ? 'border-red-500 text-red-500' :
                            outbreak.riskLevel === 'medium' ? 'border-yellow-500 text-yellow-500' :
                            'border-green-500 text-green-500'
                          }>
                            {outbreak.riskLevel === 'high' ? 'Alto' :
                             outbreak.riskLevel === 'medium' ? 'Médio' : 'Baixo'}
                          </Badge>
                        </div>
                        {outbreak.status === 'active' && (
                          <Button size="sm">
                            <AlertTriangle className="h-4 w-4 mr-2" />
                            Ações de Controle
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

export default EpidemiologyPage;