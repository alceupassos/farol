import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  AlertTriangle,
  FileText,
  Download,
  RefreshCw,
  Filter,
  ChevronRight,
  Brain,
  Calculator
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar,
  FunnelChart,
  Funnel,
  LabelList,
  PieChart,
  Pie,
  Cell,
  ComposedChart,
  Area
} from 'recharts';

const OSSReceitasGlosas = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('mensal');
  const [selectedContract, setSelectedContract] = useState('todos');

  // Dados do Funil de Faturamento
  const funnelData = [
    { name: 'Produção', value: 2500000, fill: '#3b82f6' },
    { name: 'Enviado', value: 2450000, fill: '#6366f1' },
    { name: 'Em Análise', value: 2400000, fill: '#8b5cf6' },
    { name: 'Aprovado', value: 2280000, fill: '#10b981' },
    { name: 'Glosado', value: 120000, fill: '#ef4444' },
    { name: 'Recursado', value: 100000, fill: '#f59e0b' },
    { name: 'Recuperado', value: 86000, fill: '#22c55e' },
  ];

  // Análise Pareto de Motivos de Glosa
  const paretoData = [
    { motivo: 'Código TUSS inválido', quantidade: 245, valor: 89000, percentual: 35 },
    { motivo: 'Documentação incompleta', quantidade: 189, valor: 56000, percentual: 22 },
    { motivo: 'Prazo expirado', quantidade: 156, valor: 42000, percentual: 17 },
    { motivo: 'Duplicidade', quantidade: 98, valor: 28000, percentual: 11 },
    { motivo: 'Sem autorização', quantidade: 67, valor: 19000, percentual: 8 },
    { motivo: 'Outros', quantidade: 45, valor: 11000, percentual: 7 },
  ];

  // Gráfico XmR (Controle Estatístico)
  const xmrData = [
    { mes: 'Jan', glosa: 3.2, lcl: 2.5, ucl: 4.5, media: 3.5 },
    { mes: 'Fev', glosa: 3.8, lcl: 2.5, ucl: 4.5, media: 3.5 },
    { mes: 'Mar', glosa: 2.9, lcl: 2.5, ucl: 4.5, media: 3.5 },
    { mes: 'Abr', glosa: 4.1, lcl: 2.5, ucl: 4.5, media: 3.5 },
    { mes: 'Mai', glosa: 3.5, lcl: 2.5, ucl: 4.5, media: 3.5 },
    { mes: 'Jun', glosa: 3.2, lcl: 2.5, ucl: 4.5, media: 3.5 },
  ];

  // Simulador de ROI
  const [simuladorData, setSimuladorData] = useState({
    custoRecurso: 5000,
    taxaRecuperacao: 72,
    valorPotencial: 120000,
    tempoMedio: 15,
  });

  const calcularROI = () => {
    const valorRecuperado = (simuladorData.valorPotencial * simuladorData.taxaRecuperacao) / 100;
    const roi = ((valorRecuperado - simuladorData.custoRecurso) / simuladorData.custoRecurso) * 100;
    return {
      valorRecuperado,
      roi: roi.toFixed(1),
      payback: (simuladorData.custoRecurso / (valorRecuperado / simuladorData.tempoMedio)).toFixed(1)
    };
  };

  const roiCalculado = calcularROI();

  return (
    <MainLayout>
      <div className="space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Receitas e Glosas
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Análise detalhada de faturamento SUS e recuperação de glosas
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
            <Button variant="default" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Atualizar
            </Button>
          </div>
        </div>

        {/* KPIs Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Faturamento Total</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ 2.28M</div>
              <p className="text-xs text-green-500 mt-1">
                <TrendingUp className="h-3 w-3 inline mr-1" />
                +12% vs mês anterior
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Taxa de Glosa</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.2%</div>
              <p className="text-xs text-green-500 mt-1">
                <TrendingDown className="h-3 w-3 inline mr-1" />
                -0.5pp vs meta
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Recuperação</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">72%</div>
              <p className="text-xs text-gray-500 mt-1">
                R$ 86k recuperados
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Em Recurso</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ 34k</div>
              <p className="text-xs text-gray-500 mt-1">
                28 processos ativos
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="funil" className="space-y-4">
          <TabsList>
            <TabsTrigger value="funil">Funil de Faturamento</TabsTrigger>
            <TabsTrigger value="pareto">Análise Pareto</TabsTrigger>
            <TabsTrigger value="controle">Controle Estatístico</TabsTrigger>
            <TabsTrigger value="simulador">Simulador ROI</TabsTrigger>
          </TabsList>

          {/* Funil de Faturamento */}
          <TabsContent value="funil">
            <Card>
              <CardHeader>
                <CardTitle>Funil de Faturamento SUS</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={funnelData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip formatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`} />
                    <Bar dataKey="value" fill="#8884d8">
                      {funnelData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>

                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Taxa de Aprovação</p>
                    <p className="text-2xl font-bold text-green-500">91.2%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Taxa de Glosa</p>
                    <p className="text-2xl font-bold text-red-500">4.8%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Taxa de Recuperação</p>
                    <p className="text-2xl font-bold text-blue-500">71.7%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Análise Pareto */}
          <TabsContent value="pareto">
            <Card>
              <CardHeader>
                <CardTitle>Análise Pareto - Motivos de Glosa</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <ComposedChart data={paretoData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="motivo" angle={-45} textAnchor="end" height={100} />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Bar yAxisId="left" dataKey="valor" fill="#3b82f6" />
                    <Line yAxisId="right" type="monotone" dataKey="percentual" stroke="#ef4444" strokeWidth={2} />
                  </ComposedChart>
                </ResponsiveContainer>

                <div className="mt-6">
                  <h4 className="font-semibold mb-3">Top 3 Ações Recomendadas:</h4>
                  <div className="space-y-2">
                    <div className="flex items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                      <Brain className="h-5 w-5 text-blue-500 mr-3" />
                      <div className="flex-1">
                        <p className="font-medium">Automatizar validação TUSS</p>
                        <p className="text-sm text-gray-500">Potencial de redução: R$ 31k/mês</p>
                      </div>
                    </div>
                    <div className="flex items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                      <Brain className="h-5 w-5 text-blue-500 mr-3" />
                      <div className="flex-1">
                        <p className="font-medium">Checklist de documentação</p>
                        <p className="text-sm text-gray-500">Potencial de redução: R$ 20k/mês</p>
                      </div>
                    </div>
                    <div className="flex items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                      <Brain className="h-5 w-5 text-blue-500 mr-3" />
                      <div className="flex-1">
                        <p className="font-medium">Alertas de prazo automáticos</p>
                        <p className="text-sm text-gray-500">Potencial de redução: R$ 15k/mês</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Controle Estatístico XmR */}
          <TabsContent value="controle">
            <Card>
              <CardHeader>
                <CardTitle>Gráfico de Controle XmR - Taxa de Glosa</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={xmrData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mes" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="ucl" stroke="#ef4444" strokeDasharray="5 5" name="Limite Superior" />
                    <Line type="monotone" dataKey="media" stroke="#6b7280" strokeDasharray="3 3" name="Média" />
                    <Line type="monotone" dataKey="lcl" stroke="#ef4444" strokeDasharray="5 5" name="Limite Inferior" />
                    <Line type="monotone" dataKey="glosa" stroke="#3b82f6" strokeWidth={2} name="Taxa de Glosa" />
                  </LineChart>
                </ResponsiveContainer>

                <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded">
                  <h4 className="font-semibold flex items-center mb-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
                    Análise Estatística
                  </h4>
                  <p className="text-sm">
                    O processo está sob controle estatístico. Todos os pontos estão dentro dos limites de controle.
                    Variação atual é devido a causas comuns, não requer ação especial.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Simulador de ROI */}
          <TabsContent value="simulador">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calculator className="h-5 w-5 mr-2" />
                  Simulador de ROI - Recuperação de Glosas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Valor Total Glosado (R$)</label>
                      <input
                        type="number"
                        value={simuladorData.valorPotencial}
                        onChange={(e) => setSimuladorData({...simuladorData, valorPotencial: Number(e.target.value)})}
                        className="w-full mt-1 px-3 py-2 border rounded-md"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Taxa de Recuperação Esperada (%)</label>
                      <input
                        type="number"
                        value={simuladorData.taxaRecuperacao}
                        onChange={(e) => setSimuladorData({...simuladorData, taxaRecuperacao: Number(e.target.value)})}
                        className="w-full mt-1 px-3 py-2 border rounded-md"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Custo do Recurso (R$)</label>
                      <input
                        type="number"
                        value={simuladorData.custoRecurso}
                        onChange={(e) => setSimuladorData({...simuladorData, custoRecurso: Number(e.target.value)})}
                        className="w-full mt-1 px-3 py-2 border rounded-md"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Tempo Médio de Recuperação (dias)</label>
                      <input
                        type="number"
                        value={simuladorData.tempoMedio}
                        onChange={(e) => setSimuladorData({...simuladorData, tempoMedio: Number(e.target.value)})}
                        className="w-full mt-1 px-3 py-2 border rounded-md"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
                      <h4 className="font-semibold mb-4">Resultado da Simulação</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Valor a Recuperar:</span>
                          <span className="font-bold">R$ {roiCalculado.valorRecuperado.toLocaleString('pt-BR')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">ROI:</span>
                          <span className="font-bold text-green-500">{roiCalculado.roi}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Payback:</span>
                          <span className="font-bold">{roiCalculado.payback} dias</span>
                        </div>
                      </div>
                    </div>

                    <Button className="w-full" variant="default">
                      <Brain className="h-4 w-4 mr-2" />
                      Gerar Plano de Ação com IA
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default OSSReceitasGlosas;
