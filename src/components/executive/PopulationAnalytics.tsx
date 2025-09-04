import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Users, TrendingUp, Activity, AlertTriangle, Download, RefreshCw } from "lucide-react";

interface PopulationData {
  ageGroups: Array<{ name: string; value: number; percentage: number }>;
  healthConditions: Array<{ condition: string; count: number; percentage: number }>;
  monthlyTrends: Array<{ month: string; registrations: number; documents: number; alerts: number }>;
  demographics: Array<{ category: string; male: number; female: number; total: number }>;
}

interface PopulationAnalyticsProps {
  compact?: boolean;
}

export const PopulationAnalytics: React.FC<PopulationAnalyticsProps> = ({ compact = false }) => {
  const [populationData, setPopulationData] = useState<PopulationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('12m');

  // Dados de Pindamonhangaba (164.138 habitantes)
  const mockData: PopulationData = {
    ageGroups: [
      { name: '0-17 anos', value: 42200, percentage: 25.7 },
      { name: '18-39 anos', value: 64150, percentage: 39.1 },
      { name: '40-59 anos', value: 38080, percentage: 23.2 },
      { name: '60+ anos', value: 19708, percentage: 12.0 }
    ],
    healthConditions: [
      { condition: 'Hipertensão', count: 30400, percentage: 18.5 },
      { condition: 'Diabetes', count: 19200, percentage: 11.7 },
      { condition: 'Obesidade', count: 14600, percentage: 8.9 },
      { condition: 'Depressão', count: 11650, percentage: 7.1 },
      { condition: 'Asma', count: 9850, percentage: 6.0 }
    ],
    monthlyTrends: [
      { month: 'Jan', registrations: 1850, documents: 5100, alerts: 18 },
      { month: 'Fev', registrations: 2040, documents: 5800, alerts: 15 },
      { month: 'Mar', registrations: 2250, documents: 6200, alerts: 21 },
      { month: 'Abr', registrations: 2100, documents: 5850, alerts: 17 },
      { month: 'Mai', registrations: 2480, documents: 6780, alerts: 19 },
      { month: 'Jun', registrations: 2590, documents: 6980, alerts: 14 }
    ],
    demographics: [
      { category: 'Crianças (0-17)', male: 21640, female: 20560, total: 42200 },
      { category: 'Jovens (18-39)', male: 32420, female: 31730, total: 64150 },
      { category: 'Adultos (40-59)', male: 19040, female: 19040, total: 38080 },
      { category: 'Idosos (60+)', male: 9120, female: 10588, total: 19708 }
    ]
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setPopulationData(mockData);
      setLoading(false);
    }, 1000);
  }, [selectedPeriod]);

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', 'hsl(var(--muted))'];

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-64">
            <RefreshCw className="w-8 h-8 animate-spin text-primary" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (compact) {
    return (
      <div className="space-y-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="w-5 h-5" />
              Demografia por Idade
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={populationData?.ageGroups}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percentage }) => `${name}: ${percentage}%`}
                >
                  {populationData?.ageGroups.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Principais Condições
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {populationData?.healthConditions.slice(0, 3).map((condition, index) => (
                <div key={index} className="flex items-center justify-between p-2 border border-border rounded">
                  <span className="text-sm">{condition.condition}</span>
                  <Badge variant="secondary">{condition.count.toLocaleString()}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Users className="w-6 h-6" />
            Analytics Populacionais
          </h2>
          <p className="text-muted-foreground">Análise demográfica e de saúde da população municipal</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3m">3 meses</SelectItem>
              <SelectItem value="6m">6 meses</SelectItem>
              <SelectItem value="12m">12 meses</SelectItem>
              <SelectItem value="24m">24 meses</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      <Tabs defaultValue="demographics" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="demographics">Demografia</TabsTrigger>
          <TabsTrigger value="health">Condições de Saúde</TabsTrigger>
          <TabsTrigger value="trends">Tendências</TabsTrigger>
          <TabsTrigger value="analysis">Análise</TabsTrigger>
        </TabsList>

        <TabsContent value="demographics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Distribuição por Idade</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={populationData?.ageGroups}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percentage }) => `${percentage}%`}
                    >
                      {populationData?.ageGroups.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => value.toLocaleString()} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Distribuição por Gênero</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={populationData?.demographics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="male" stackId="a" fill="hsl(var(--primary))" name="Masculino" />
                    <Bar dataKey="female" stackId="a" fill="hsl(var(--accent))" name="Feminino" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="health" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Principais Condições de Saúde</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={populationData?.healthConditions}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="condition" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Prevalência (%)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {populationData?.healthConditions.map((condition, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{condition.condition}</span>
                        <span className="text-sm text-muted-foreground">{condition.percentage}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${condition.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tendências Mensais</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={populationData?.monthlyTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="registrations" stroke="hsl(var(--primary))" name="Registros" />
                  <Line type="monotone" dataKey="documents" stroke="hsl(var(--accent))" name="Documentos" />
                  <Line type="monotone" dataKey="alerts" stroke="hsl(var(--destructive))" name="Alertas" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  Insights Positivos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Aumento de 15% nos registros mensais</li>
                  <li>• Redução de 8% nos alertas de saúde</li>
                  <li>• 78% de cobertura populacional atingida</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-500" />
                  Áreas de Atenção
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Alta prevalência de hipertensão (18.5%)</li>
                  <li>• Crescimento de casos de diabetes</li>
                  <li>• Baixa adesão em idosos (60+)</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-blue-500" />
                  Recomendações
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Intensificar campanhas para idosos</li>
                  <li>• Programas preventivos para diabetes</li>
                  <li>• Expandir cobertura em áreas rurais</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};