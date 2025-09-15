import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BudgetROIDashboard } from '@/components/executive/BudgetROIDashboard';
import { 
  DollarSign, 
  TrendingUp, 
  Target, 
  AlertTriangle,
  PieChart,
  BarChart3,
  Calendar,
  Download,
  FileText,
  Calculator
} from 'lucide-react';

const GestaoOrcamentariaPage = () => {
  // Mock data para demonstração
  const orcamentoAtual = {
    total: 245000000,
    executado: 183750000,
    percentualExecucao: 75,
    economia: 12300000
  };

  const categorias = [
    { nome: 'Atenção Básica', orcado: 98000000, executado: 73500000, economia: 5200000 },
    { nome: 'Média Complexidade', orcado: 89000000, executado: 71200000, economia: 4100000 },
    { nome: 'Alta Complexidade', orcado: 32000000, executado: 24000000, economia: 1800000 },
    { nome: 'Vigilância em Saúde', orcado: 15000000, executado: 11250000, economia: 750000 },
    { nome: 'Assistência Farmacêutica', orcado: 11000000, executado: 3800000, economia: 450000 }
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { 
      style: 'currency', 
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Gestão Orçamentária</h1>
            <p className="text-muted-foreground mt-2">
              Monitoramento e controle da execução orçamentária da saúde municipal
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Exportar Relatório
            </Button>
            <Button size="sm">
              <Calculator className="w-4 h-4 mr-2" />
              Simulador IED
            </Button>
          </div>
        </div>

        {/* Cards de Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Orçamento Total</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(orcamentoAtual.total)}</div>
              <p className="text-xs text-muted-foreground">Ano fiscal 2024</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Executado</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(orcamentoAtual.executado)}</div>
              <p className="text-xs text-muted-foreground">
                {orcamentoAtual.percentualExecucao}% do orçamento
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Economia Gerada</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{formatCurrency(orcamentoAtual.economia)}</div>
              <p className="text-xs text-muted-foreground">5% do orçamento total</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Status Execução</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">Normal</div>
              <p className="text-xs text-muted-foreground">Dentro do planejado</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="execucao" className="space-y-4">
          <TabsList>
            <TabsTrigger value="execucao">Execução por Categoria</TabsTrigger>
            <TabsTrigger value="roi">Análise de ROI</TabsTrigger>
            <TabsTrigger value="projecoes">Projeções</TabsTrigger>
            <TabsTrigger value="historico">Histórico</TabsTrigger>
          </TabsList>

          <TabsContent value="execucao" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Execução Orçamentária por Categoria</CardTitle>
                <CardDescription>
                  Detalhamento da execução orçamentária por área de saúde
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categorias.map((categoria, index) => {
                    const percentualExecucao = (categoria.executado / categoria.orcado) * 100;
                    const getStatusColor = (percentual: number) => {
                      if (percentual >= 70) return 'bg-green-500';
                      if (percentual >= 50) return 'bg-yellow-500';
                      return 'bg-red-500';
                    };

                    return (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-medium">{categoria.nome}</h3>
                          <Badge variant={percentualExecucao >= 70 ? "default" : percentualExecucao >= 50 ? "secondary" : "destructive"}>
                            {percentualExecucao.toFixed(1)}%
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Orçado</p>
                            <p className="font-medium">{formatCurrency(categoria.orcado)}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Executado</p>
                            <p className="font-medium">{formatCurrency(categoria.executado)}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Economia</p>
                            <p className="font-medium text-green-600">{formatCurrency(categoria.economia)}</p>
                          </div>
                        </div>
                        <div className="mt-3">
                          <div className="w-full bg-muted rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${getStatusColor(percentualExecucao)}`}
                              style={{ width: `${Math.min(percentualExecucao, 100)}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="roi">
            <BudgetROIDashboard />
          </TabsContent>

          <TabsContent value="projecoes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Projeções Orçamentárias</CardTitle>
                <CardDescription>
                  Projeções baseadas na execução atual e tendências históricas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Projeção para Final do Ano</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Execução Estimada</span>
                        <span className="font-medium">{formatCurrency(245000000)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Economia Projetada</span>
                        <span className="font-medium text-green-600">{formatCurrency(16400000)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Percentual de Execução</span>
                        <span className="font-medium">100%</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-medium">Recomendações</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                        <span>Acelerar execução na Assistência Farmacêutica</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0" />
                        <span>Monitorar gastos em Alta Complexidade</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                        <span>Manter ritmo atual na Atenção Básica</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="historico" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Histórico de Execução</CardTitle>
                <CardDescription>
                  Comparação da execução orçamentária nos últimos 3 anos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[2024, 2023, 2022].map((ano) => (
                    <div key={ano} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-medium">Ano {ano}</h3>
                        <Badge variant={ano === 2024 ? "default" : "secondary"}>
                          {ano === 2024 ? "Atual" : "Finalizado"}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Orçamento</p>
                          <p className="font-medium">{formatCurrency(ano === 2024 ? 245000000 : ano === 2023 ? 230000000 : 215000000)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Executado</p>
                          <p className="font-medium">{formatCurrency(ano === 2024 ? 183750000 : ano === 2023 ? 227000000 : 212000000)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">% Execução</p>
                          <p className="font-medium">{ano === 2024 ? "75%" : ano === 2023 ? "98.7%" : "98.6%"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Economia</p>
                          <p className="font-medium text-green-600">{formatCurrency(ano === 2024 ? 12300000 : ano === 2023 ? 3000000 : 3000000)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default GestaoOrcamentariaPage;