import React from 'react';
import { Users, TrendingUp, MapPin, Activity, Baby, Heart, Shield, AlertTriangle } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const PopulationPage = () => {
  const populationData = {
    total: 407252,
    ageGroups: [
      { range: '0-14 anos', count: 75680, percentage: 18.6 },
      { range: '15-64 anos', count: 262870, percentage: 64.5 },
      { range: '65+ anos', count: 68702, percentage: 16.9 }
    ],
    genderDistribution: {
      male: 196400,
      female: 210852
    },
    healthIndicators: {
      vaccinationRate: 93.5,
      prenatalCoverage: 92.8,
      chronicDiseasePrevalence: 26.4,
      infantMortality: 9.8
    },
    socioeconomic: {
      lowIncome: 38.1,
      middleIncome: 46.7,
      highIncome: 15.2
    },
    riskAreas: [
      { area: 'Monte Líbano', population: 16200, riskLevel: 'Alto', issues: ['Dengue', 'Saneamento'] },
      { area: 'Piracicamirim', population: 45600, riskLevel: 'Crítico', issues: ['COVID-19', 'Dengue'] },
      { area: 'Centro', population: 23500, riskLevel: 'Médio', issues: ['Mobilidade Urbana'] },
      { area: 'Algodoal', population: 21400, riskLevel: 'Alto', issues: ['Acesso à Saúde', 'Risco Social'] }
    ]
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'Crítico': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'Alto': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'Médio': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Baixo': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <MainLayout>
      <div className="pt-8 pb-10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-display font-semibold mb-2">
              Análise Populacional — Piracicaba
            </h1>
            <p className="text-muted-foreground">
              Dados demográficos e indicadores de saúde da população piracicabana
            </p>
          </div>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">População Total</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{populationData.total.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">habitantes</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Taxa de Vacinação</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{populationData.healthIndicators.vaccinationRate}%</div>
                <p className="text-xs text-muted-foreground">Meta: 90%</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Cobertura Pré-natal</CardTitle>
                <Baby className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{populationData.healthIndicators.prenatalCoverage}%</div>
                <p className="text-xs text-muted-foreground">Gestantes acompanhadas</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Mortalidade Infantil</CardTitle>
                <Heart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{populationData.healthIndicators.infantMortality}‰</div>
                <p className="text-xs text-muted-foreground">Por mil nascidos vivos</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Age Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Distribuição Etária</CardTitle>
                <CardDescription>População por faixa etária</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {populationData.ageGroups.map((group) => (
                  <div key={group.range} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{group.range}</span>
                      <span>{group.count.toLocaleString()} ({group.percentage}%)</span>
                    </div>
                    <Progress value={group.percentage} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Gender Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Distribuição por Gênero</CardTitle>
                <CardDescription>População por sexo</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Masculino</span>
                    <span>{populationData.genderDistribution.male.toLocaleString()} (48.7%)</span>
                  </div>
                  <Progress value={48.7} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Feminino</span>
                    <span>{populationData.genderDistribution.female.toLocaleString()} (51.3%)</span>
                  </div>
                  <Progress value={51.3} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Socioeconomic Data */}
            <Card>
              <CardHeader>
                <CardTitle>Distribuição Socioeconômica</CardTitle>
                <CardDescription>População por faixa de renda</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Baixa Renda</span>
                    <span>{populationData.socioeconomic.lowIncome}%</span>
                  </div>
                  <Progress value={populationData.socioeconomic.lowIncome} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Renda Média</span>
                    <span>{populationData.socioeconomic.middleIncome}%</span>
                  </div>
                  <Progress value={populationData.socioeconomic.middleIncome} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Alta Renda</span>
                    <span>{populationData.socioeconomic.highIncome}%</span>
                  </div>
                  <Progress value={populationData.socioeconomic.highIncome} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Health Indicators */}
            <Card>
              <CardHeader>
                <CardTitle>Indicadores de Saúde</CardTitle>
                <CardDescription>Principais métricas de saúde populacional</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Taxa de Vacinação</span>
                  <div className="flex items-center gap-2">
                    <Progress value={populationData.healthIndicators.vaccinationRate} className="w-20 h-2" />
                    <span className="text-sm font-medium">{populationData.healthIndicators.vaccinationRate}%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Cobertura Pré-natal</span>
                  <div className="flex items-center gap-2">
                    <Progress value={populationData.healthIndicators.prenatalCoverage} className="w-20 h-2" />
                    <span className="text-sm font-medium">{populationData.healthIndicators.prenatalCoverage}%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Doenças Crônicas</span>
                  <div className="flex items-center gap-2">
                    <Progress value={populationData.healthIndicators.chronicDiseasePrevalence} className="w-20 h-2" />
                    <span className="text-sm font-medium">{populationData.healthIndicators.chronicDiseasePrevalence}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Risk Areas */}
          <Card>
            <CardHeader>
              <CardTitle>Áreas de Risco</CardTitle>
              <CardDescription>Análise de riscos por região</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {populationData.riskAreas.map((area) => (
                  <div key={area.area} className="border border-border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <h4 className="font-medium">{area.area}</h4>
                          <p className="text-sm text-muted-foreground">
                            {area.population.toLocaleString()} habitantes
                          </p>
                        </div>
                      </div>
                      <Badge className={getRiskColor(area.riskLevel)}>
                        Risco {area.riskLevel}
                      </Badge>
                    </div>
                    {area.issues.length > 0 && (
                      <div className="flex items-center gap-2 mt-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm text-muted-foreground">
                          Problemas identificados: {area.issues.join(', ')}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default PopulationPage;
