import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Scale, TrendingUp, DollarSign, AlertTriangle, FileText, Calculator } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';

const ControleJudicializacaoPage = () => {
  // Mock data baseado nos dados reais de judicialização
  const gastosJudicializacao = {
    totalEstadual: 3200000000, // R$ 3,2 bi União em 2024
    percentualEstadual: 32.9, // 32,9% do gasto estadual
    novosCasos2024: 162046, // 162.046 novos casos em 2024
    crescimento2020: 110.9 // 110,9% acima de 2020
  };

  const medicamentosMaisJudicializados = [
    { nome: 'Adalimumabe', casos: 1250, valor: 450000, tendencia: 'up' },
    { nome: 'Rituximabe', casos: 890, valor: 320000, tendencia: 'up' },
    { nome: 'Trastuzumabe', casos: 670, valor: 280000, tendencia: 'stable' },
    { nome: 'Bevacizumabe', casos: 540, valor: 210000, tendencia: 'down' },
    { nome: 'Infliximabe', casos: 430, valor: 190000, tendencia: 'up' }
  ];

  const projecaoOrcamentaria = [
    { mes: 'Jan', previsto: 2500000, gasto: 2100000, judicializacao: 650000 },
    { mes: 'Fev', previsto: 2500000, gasto: 2800000, judicializacao: 920000 },
    { mes: 'Mar', previsto: 2500000, gasto: 3200000, judicializacao: 1050000 },
    { mes: 'Abr', previsto: 2500000, gasto: 2900000, judicializacao: 950000 },
    { mes: 'Mai', previsto: 2500000, gasto: 3100000, judicializacao: 1020000 }
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('pt-BR').format(value);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Controle de Judicialização</h1>
          <p className="text-muted-foreground">
            Monitoramento e gestão de demandas judiciais em saúde
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Gasto Anual
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {formatCurrency(gastosJudicializacao.totalEstadual)}
              </div>
              <p className="text-xs text-muted-foreground">União - 2024</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">% do Orçamento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {gastosJudicializacao.percentualEstadual}%
              </div>
              <p className="text-xs text-muted-foreground">Gasto estadual medicamentos</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Novos Casos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {formatNumber(gastosJudicializacao.novosCasos2024)}
              </div>
              <p className="text-xs text-muted-foreground">1ª instância - 2024</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Crescimento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                +{gastosJudicializacao.crescimento2020}%
              </div>
              <p className="text-xs text-muted-foreground">Em relação a 2020</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Scale className="h-5 w-5" />
              Medicamentos Mais Judicializados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {medicamentosMaisJudicializados.map((medicamento, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{medicamento.nome}</h4>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-sm text-muted-foreground">
                        {formatNumber(medicamento.casos)} casos
                      </span>
                      <span className="text-sm font-medium text-red-600">
                        {formatCurrency(medicamento.valor)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={medicamento.tendencia === 'up' ? 'destructive' : 
                                  medicamento.tendencia === 'down' ? 'secondary' : 'outline'}>
                      {medicamento.tendencia === 'up' ? '↑ Alta' : 
                       medicamento.tendencia === 'down' ? '↓ Baixa' : '→ Estável'}
                    </Badge>
                    <Button size="sm" variant="outline">Detalhes</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Impacto Orçamentário Mensal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projecaoOrcamentaria.map((mes, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{mes.mes}</span>
                      <span className={mes.gasto > mes.previsto ? 'text-red-600' : 'text-green-600'}>
                        {formatCurrency(mes.gasto)}
                      </span>
                    </div>
                    <Progress 
                      value={(mes.gasto / mes.previsto) * 100} 
                      className="h-2"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Orçado: {formatCurrency(mes.previsto)}</span>
                      <span>Judicial: {formatCurrency(mes.judicializacao)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Ações Prioritárias
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <h4 className="font-medium text-red-800 mb-2">Urgente</h4>
                <ul className="text-sm text-red-700 space-y-1">
                  <li>• Revisar protocolos de acesso a medicamentos</li>
                  <li>• Criar estoque estratégico para casos recorrentes</li>
                  <li>• Estabelecer diálogo com Judiciário local</li>
                </ul>
              </div>
              
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h4 className="font-medium text-yellow-800 mb-2">Médio Prazo</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Capacitar equipes em diretrizes nacionais</li>
                  <li>• Implementar sistema de monitoramento</li>
                  <li>• Articular com CONASEMS/COSEMS</li>
                </ul>
              </div>
              
              <div className="flex gap-2">
                <Button>Gerar Relatório</Button>
                <Button variant="outline">Ver Histórico</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Estratégias de Mitigação</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="diagnostico" className="w-full">
              <TabsList>
                <TabsTrigger value="diagnostico">Diagnóstico</TabsTrigger>
                <TabsTrigger value="protocolos">Protocolos</TabsTrigger>
                <TabsTrigger value="articulacao">Articulação</TabsTrigger>
              </TabsList>
              
              <TabsContent value="diagnostico" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Mapeamento de Impacto</h4>
                    <p className="text-sm text-muted-foreground">
                      Identificar medicamentos de maior recorrência e impacto financeiro
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Análise de Tendências</h4>
                    <p className="text-sm text-muted-foreground">
                      Projeção de crescimento baseada em dados históricos
                    </p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="protocolos" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Protocolos de Acesso</h4>
                    <p className="text-sm text-muted-foreground">
                      Implementar diretrizes baseadas em evidências científicas
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Estoque Estratégico</h4>
                    <p className="text-sm text-muted-foreground">
                      Manter reserva para casos críticos recorrentes
                    </p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="articulacao" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Diálogo Institucional</h4>
                    <p className="text-sm text-muted-foreground">
                      Estabelecer comunicação com Judiciário e Ministério Público
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Articulação Federativa</h4>
                    <p className="text-sm text-muted-foreground">
                      Defender recomposição da assistência farmacêutica
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ControleJudicializacaoPage;