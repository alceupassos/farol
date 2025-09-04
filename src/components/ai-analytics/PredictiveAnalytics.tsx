import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from "recharts";
import { TrendingUp, TrendingDown, AlertTriangle, Target } from "lucide-react";

export const PredictiveAnalytics = () => {
  const riskTrendData = [
    { month: "Jan", cardiovascular: 15, diabetes: 8, mental: 12 },
    { month: "Fev", cardiovascular: 18, diabetes: 10, mental: 14 },
    { month: "Mar", cardiovascular: 22, diabetes: 12, mental: 16 },
    { month: "Abr", cardiovascular: 25, diabetes: 15, mental: 18 },
    { month: "Mai", cardiovascular: 28, diabetes: 18, mental: 20 },
    { month: "Jun", cardiovascular: 32, diabetes: 22, mental: 25 }
  ];

  const predictionAccuracy = [
    { model: "Cardiovascular", accuracy: 94, predictions: 1250 },
    { model: "Diabetes", accuracy: 89, predictions: 980 },
    { model: "Mental", accuracy: 82, predictions: 760 },
    { model: "Câncer", accuracy: 91, predictions: 540 },
    { model: "Respiratório", accuracy: 87, predictions: 430 }
  ];

  const futureRisks = [
    { period: "1 mês", low: 15, medium: 25, high: 8 },
    { period: "3 meses", low: 20, medium: 35, high: 15 },
    { period: "6 meses", low: 25, medium: 45, high: 22 },
    { period: "1 ano", low: 30, medium: 55, high: 30 }
  ];

  return (
    <div className="space-y-6">
      {/* Analytics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Predições Hoje</p>
                <p className="text-2xl font-bold">247</p>
              </div>
              <Target className="w-8 h-8 text-blue-500" />
            </div>
            <div className="flex items-center mt-2 text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-500">+12%</span>
              <span className="text-muted-foreground ml-1">vs ontem</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Precisão Média</p>
                <p className="text-2xl font-bold">88.6%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
            <div className="flex items-center mt-2 text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-500">+2.1%</span>
              <span className="text-muted-foreground ml-1">este mês</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Alertas Críticos</p>
                <p className="text-2xl font-bold">23</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
            <div className="flex items-center mt-2 text-sm">
              <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
              <span className="text-red-500">-5</span>
              <span className="text-muted-foreground ml-1">vs semana passada</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pacientes Monitorados</p>
                <p className="text-2xl font-bold">1,847</p>
              </div>
              <Target className="w-8 h-8 text-purple-500" />
            </div>
            <div className="flex items-center mt-2 text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-500">+89</span>
              <span className="text-muted-foreground ml-1">novos esta semana</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Risk Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Tendências de Risco por Categoria</CardTitle>
          <CardDescription>
            Evolução dos riscos de saúde ao longo do tempo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={riskTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="cardiovascular" stroke="#ef4444" strokeWidth={2} name="Cardiovascular" />
              <Line type="monotone" dataKey="diabetes" stroke="#f59e0b" strokeWidth={2} name="Diabetes" />
              <Line type="monotone" dataKey="mental" stroke="#8b5cf6" strokeWidth={2} name="Saúde Mental" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Model Accuracy */}
        <Card>
          <CardHeader>
            <CardTitle>Precisão dos Modelos Preditivos</CardTitle>
            <CardDescription>
              Performance dos diferentes modelos de IA
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={predictionAccuracy}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="model" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="accuracy" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Future Risk Projections */}
        <Card>
          <CardHeader>
            <CardTitle>Projeções de Risco Futuro</CardTitle>
            <CardDescription>
              Previsões de distribuição de riscos por período
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={futureRisks}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="low" stackId="1" stroke="#10b981" fill="#10b981" name="Baixo Risco" />
                <Area type="monotone" dataKey="medium" stackId="1" stroke="#f59e0b" fill="#f59e0b" name="Médio Risco" />
                <Area type="monotone" dataKey="high" stackId="1" stroke="#ef4444" fill="#ef4444" name="Alto Risco" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};