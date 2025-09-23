import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DollarSign, TrendingUp, TrendingDown, Target, Calculator, Download, AlertCircle } from "lucide-react";

interface BudgetData {
  totalBudget: number;
  spent: number;
  saved: number;
  roi: number;
  costPerResident: number;
  monthlyExpenses: Array<{ month: string; planned: number; actual: number; savings: number }>;
  categoryBreakdown: Array<{ category: string; amount: number; percentage: number }>;
  roiMetrics: Array<{ metric: string; value: number; change: number }>;
}

interface BudgetROIDashboardProps {
  compact?: boolean;
}

export const BudgetROIDashboard: React.FC<BudgetROIDashboardProps> = ({ compact = false }) => {
  const [budgetData, setBudgetData] = useState<BudgetData | null>(null);
  const [loading, setLoading] = useState(true);

  // Dados de orçamento de Piracicaba (407.252 habitantes)
  const mockData: BudgetData = {
    totalBudget: 62500000,
    spent: 44800000,
    saved: 17700000,
    roi: 3.6,
    costPerResident: 308.45,
    monthlyExpenses: [
      { month: 'Jan', planned: 5200000, actual: 4800000, savings: 400000 },
      { month: 'Fev', planned: 5100000, actual: 4920000, savings: 180000 },
      { month: 'Mar', planned: 5400000, actual: 5180000, savings: 220000 },
      { month: 'Abr', planned: 5300000, actual: 4860000, savings: 440000 },
      { month: 'Mai', planned: 5600000, actual: 5450000, savings: 150000 },
      { month: 'Jun', planned: 5800000, actual: 5120000, savings: 680000 }
    ],
    categoryBreakdown: [
      { category: 'Tecnologia e Dados', amount: 19200000, percentage: 42 },
      { category: 'Pessoal', amount: 13800000, percentage: 31 },
      { category: 'Infraestrutura', amount: 6200000, percentage: 14 },
      { category: 'Telemedicina', amount: 4300000, percentage: 9 },
      { category: 'Outros', amount: 3000000, percentage: 4 }
    ],
    roiMetrics: [
      { metric: 'Redução de Custos Operacionais', value: 12600000, change: 18.9 },
      { metric: 'Economia em Papel/Arquivo', value: 2100000, change: 26.4 },
      { metric: 'Eficiência de Processos', value: 5200000, change: 21.1 },
      { metric: 'Programas Preventivos', value: 8400000, change: 15.7 }
    ]
  };

  useEffect(() => {
    setTimeout(() => {
      setBudgetData(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', 'hsl(var(--muted))', 'hsl(var(--destructive))'];

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
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
              <DollarSign className="w-5 h-5" />
              Orçamento Atual
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Gasto</span>
                <span className="font-semibold">{formatCurrency(budgetData?.spent || 0)}</span>
              </div>
              <Progress value={(budgetData?.spent || 0) / (budgetData?.totalBudget || 1) * 100} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Utilizado: 75%</span>
                <span>Restante: {formatCurrency((budgetData?.totalBudget || 0) - (budgetData?.spent || 0))}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="w-5 h-5" />
              ROI Sistema
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-green-500">{budgetData?.roi}x</div>
              <p className="text-sm text-muted-foreground">Retorno sobre investimento</p>
              <Badge className="bg-green-500/20 text-green-500">
                +{((budgetData?.roi || 0) - 1) * 100}% economia
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <DollarSign className="w-6 h-6" />
            Análise de Orçamento e ROI
          </h2>
          <p className="text-muted-foreground">Controle financeiro e retorno sobre investimento do sistema</p>
        </div>
        <Button variant="outline" size="sm">
          <Download className="w-4 h-4 mr-2" />
          Relatório Financeiro
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-xs text-muted-foreground">Orçamento Total</p>
                <p className="text-2xl font-bold">{formatCurrency(budgetData?.totalBudget || 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <TrendingDown className="w-5 h-5 text-red-500" />
              <div>
                <p className="text-xs text-muted-foreground">Valor Gasto</p>
                <p className="text-2xl font-bold">{formatCurrency(budgetData?.spent || 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-xs text-muted-foreground">Economia Gerada</p>
                <p className="text-2xl font-bold">{formatCurrency(budgetData?.saved || 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-purple-500" />
              <div>
                <p className="text-xs text-muted-foreground">ROI Geral</p>
                <p className="text-2xl font-bold">{budgetData?.roi}x</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="expenses">Despesas</TabsTrigger>
          <TabsTrigger value="roi">ROI Detalhado</TabsTrigger>
          <TabsTrigger value="projections">Projeções</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Execução Orçamentária</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={budgetData?.monthlyExpenses}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Legend />
                    <Area type="monotone" dataKey="planned" stackId="1" stroke="hsl(var(--muted))" fill="hsl(var(--muted))" name="Planejado" />
                    <Area type="monotone" dataKey="actual" stackId="2" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" name="Executado" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Distribuição de Gastos</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={budgetData?.categoryBreakdown}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="amount"
                      label={({ category, percentage }) => `${category}: ${percentage}%`}
                    >
                      {budgetData?.categoryBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="expenses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Despesas Mensais vs Planejado</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={budgetData?.monthlyExpenses}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Legend />
                  <Bar dataKey="planned" fill="hsl(var(--muted))" name="Planejado" />
                  <Bar dataKey="actual" fill="hsl(var(--primary))" name="Executado" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Economia Mensal</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={budgetData?.monthlyExpenses}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Line type="monotone" dataKey="savings" stroke="hsl(var(--success))" strokeWidth={3} name="Economia" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roi" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {budgetData?.roiMetrics.map((metric, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{metric.metric}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-3xl font-bold text-green-500">
                      {formatCurrency(metric.value)}
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-green-500">+{metric.change}%</span>
                      <span className="text-sm text-muted-foreground">vs período anterior</span>
                    </div>
                    <Progress value={metric.change * 5} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Cálculo de ROI
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div className="p-4 border border-border rounded-lg">
                    <div className="text-2xl font-bold text-green-500">{formatCurrency(1990000)}</div>
                    <div className="text-sm text-muted-foreground">Economia Total Gerada</div>
                  </div>
                  <div className="p-4 border border-border rounded-lg">
                    <div className="text-2xl font-bold text-blue-500">{formatCurrency(625000)}</div>
                    <div className="text-sm text-muted-foreground">Investimento Total</div>
                  </div>
                  <div className="p-4 border border-border rounded-lg">
                    <div className="text-2xl font-bold text-purple-500">3.2x</div>
                    <div className="text-sm text-muted-foreground">ROI Final</div>
                  </div>
                </div>
                <div className="text-center text-sm text-muted-foreground">
                  ROI = (Economia Gerada - Investimento) / Investimento
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projections" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-yellow-500" />
                Projeções para Próximos 12 Meses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4 border border-border rounded-lg">
                  <div className="text-2xl font-bold">{formatCurrency(3200000)}</div>
                  <div className="text-sm text-muted-foreground">Orçamento Projetado</div>
                </div>
                <div className="text-center p-4 border border-border rounded-lg">
                  <div className="text-2xl font-bold">{formatCurrency(2850000)}</div>
                  <div className="text-sm text-muted-foreground">Economia Esperada</div>
                </div>
                <div className="text-center p-4 border border-border rounded-lg">
                  <div className="text-2xl font-bold">4.1x</div>
                  <div className="text-sm text-muted-foreground">ROI Projetado</div>
                </div>
                <div className="text-center p-4 border border-border rounded-lg">
                  <div className="text-2xl font-bold">28%</div>
                  <div className="text-sm text-muted-foreground">Crescimento ROI</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
