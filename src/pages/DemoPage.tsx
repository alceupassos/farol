import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  MapPin, 
  Users, 
  Activity, 
  TrendingUp, 
  AlertTriangle, 
  Heart,
  Calendar,
  FileText,
  Search,
  Filter
} from 'lucide-react';
import { pindamonhangabaData } from '@/data/pindamonhangabaData';

const DemoPage = () => {
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const { demographics, healthIndicators, facilities, emergencyData } = pindamonhangabaData;

  const filteredFacilities = facilities.filter(facility => 
    facility.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedRegion === 'all' || facility.region === selectedRegion)
  );

  const regions = [...new Set(facilities.map(f => f.region))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/10 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <MapPin className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold text-foreground">Demonstração - Pindamonhangaba/SP</h1>
              <p className="text-muted-foreground">Sistema de Gestão de Saúde Pública</p>
            </div>
          </div>
          <Badge className="bg-primary/10 text-primary border-primary/20">
            Dados Reais • Atualizado em tempo real
          </Badge>
        </div>

        {/* KPIs Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-l-4 border-l-primary">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center">
                <Users className="h-4 w-4 mr-2 text-primary" />
                População Total
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{demographics.totalPopulation.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+2.1% em relação ao ano anterior</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-secondary">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center">
                <Heart className="h-4 w-4 mr-2 text-secondary" />
                Unidades de Saúde
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{facilities.length}</div>
              <p className="text-xs text-muted-foreground">Cobertura de 100% do território</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-accent">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center">
                <Activity className="h-4 w-4 mr-2 text-accent" />
                Atendimentos/Mês
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12.847</div>
              <p className="text-xs text-muted-foreground">+8.3% vs mês anterior</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-destructive">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center">
                <AlertTriangle className="h-4 w-4 mr-2 text-destructive" />
                Alertas Ativos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{emergencyData.activeAlerts}</div>
              <p className="text-xs text-muted-foreground">3 críticos, 2 moderados</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="facilities">Unidades</TabsTrigger>
            <TabsTrigger value="indicators">Indicadores</TabsTrigger>
            <TabsTrigger value="emergency">Emergências</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Distribuição Populacional</CardTitle>
                  <CardDescription>Por faixa etária e gênero</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {demographics.ageGroups.map((group, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-sm">{group.range}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 bg-muted rounded-full h-2">
                            <div 
                              className="h-2 bg-primary rounded-full" 
                              style={{ width: `${(group.count / demographics.totalPopulation) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{group.count.toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Mapa de Calor - Demanda</CardTitle>
                  <CardDescription>Concentração de atendimentos por região</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-2 h-32">
                    {[...Array(9)].map((_, i) => (
                      <div
                        key={i}
                        className={`rounded ${
                          i % 3 === 0 ? 'bg-primary/20' :
                          i % 3 === 1 ? 'bg-secondary/20' : 'bg-accent/20'
                        } flex items-center justify-center text-xs font-medium`}
                      >
                        Região {i + 1}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="facilities" className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar unidades de saúde..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger className="w-48">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filtrar por região" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as regiões</SelectItem>
                  {regions.map(region => (
                    <SelectItem key={region} value={region}>{region}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFacilities.map((facility) => (
                <Card key={facility.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{facility.name}</CardTitle>
                      <Badge variant={facility.type === 'UBS' ? 'default' : 'secondary'}>
                        {facility.type}
                      </Badge>
                    </div>
                    <CardDescription className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {facility.address}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Capacidade:</span>
                        <span className="font-medium">{facility.capacity} pessoas/dia</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Ocupação atual:</span>
                        <span className={`font-medium ${
                          facility.currentOccupancy > 90 ? 'text-destructive' : 
                          facility.currentOccupancy > 70 ? 'text-secondary' : 'text-primary'
                        }`}>
                          {facility.currentOccupancy}%
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            facility.currentOccupancy > 90 ? 'bg-destructive' : 
                            facility.currentOccupancy > 70 ? 'bg-secondary' : 'bg-primary'
                          }`}
                          style={{ width: `${facility.currentOccupancy}%` }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="indicators" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {healthIndicators.map((indicator, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {indicator.name}
                      <TrendingUp className={`h-5 w-5 ${
                        indicator.trend === 'up' ? 'text-primary' : 
                        indicator.trend === 'down' ? 'text-destructive' : 'text-muted-foreground'
                      }`} />
                    </CardTitle>
                    <CardDescription>{indicator.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold mb-2">{indicator.value}</div>
                    <p className="text-sm text-muted-foreground">{indicator.comparison}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="emergency" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-destructive" />
                  Central de Emergências
                </CardTitle>
                <CardDescription>Monitoramento em tempo real</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-destructive/10 rounded-lg">
                    <div className="text-2xl font-bold text-destructive">{emergencyData.activeAlerts}</div>
                    <p className="text-sm text-muted-foreground">Alertas Ativos</p>
                  </div>
                  <div className="text-center p-4 bg-secondary/10 rounded-lg">
                    <div className="text-2xl font-bold text-secondary">{emergencyData.responseTime}</div>
                    <p className="text-sm text-muted-foreground">Tempo Médio de Resposta</p>
                  </div>
                  <div className="text-center p-4 bg-primary/10 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{emergencyData.availableUnits}</div>
                    <p className="text-sm text-muted-foreground">Unidades Disponíveis</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DemoPage;