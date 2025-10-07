/**
 * Dashboard Financeiro Detalhado - Hospital Rede D'Or São Luiz Barueri
 * Visão completa para Diretor Geral com foco em indicadores financeiros
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, TrendingDown, DollarSign, AlertTriangle, 
  PieChart, BarChart3, Target, Clock, Percent, ArrowUpRight, ArrowDownRight
} from 'lucide-react';
import { indicadoresDiretorGeral } from '@/data/redeDorBarueri';

const RedeDOrFinanceiroDashboard = () => {
  const { financeiro } = indicadoresDiretorGeral;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatPercent = (value: number) => `${value.toFixed(1)}%`;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <DollarSign className="h-8 w-8 text-green-600" />
          Dashboard Financeiro - Diretor Geral
        </h1>
        <p className="text-muted-foreground mt-1">
          Hospital Rede D'Or São Luiz - Barueri | Análise Financeira Completa
        </p>
      </div>

      {/* KPIs Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-green-600">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Faturamento Mensal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{formatCurrency(financeiro.faturamentoMensal)}</div>
            <div className="flex items-center gap-2 mt-2">
              <ArrowUpRight className="h-4 w-4 text-green-600" />
              <span className="text-sm text-green-600">+{formatPercent(financeiro.crescimentoMensal)} vs mês anterior</span>
            </div>
            <Progress value={94.7} className="h-2 mt-3" />
            <div className="text-xs text-muted-foreground mt-1">
              Meta Anual: {formatCurrency(financeiro.metaFaturamentoAnual)}
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-600">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Margem EBITDA</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{formatPercent(financeiro.margemEbitda)}</div>
            <div className="flex items-center gap-2 mt-2">
              <Target className="h-4 w-4 text-blue-600" />
              <span className="text-sm">Meta: {formatPercent(financeiro.metaMargemEbitda)}</span>
            </div>
            <Progress value={(financeiro.margemEbitda / financeiro.metaMargemEbitda) * 100} className="h-2 mt-3" />
            <div className="text-xs text-muted-foreground mt-1">
              EBITDA: {formatCurrency(financeiro.faturamentoMensal * (financeiro.margemEbitda / 100))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-red-600">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Perdas com Glosas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">{formatCurrency(financeiro.perdasFinanceiras)}</div>
            <div className="flex items-center gap-2 mt-2">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <span className="text-sm text-red-600">{formatPercent(financeiro.glosaTotal)} do faturamento</span>
            </div>
            <Progress value={financeiro.glosaTotal * 10} className="h-2 mt-3 bg-red-100" />
            <div className="text-xs text-muted-foreground mt-1">
              Potencial economia: R$ 1,2M/mês
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-600">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Fluxo de Caixa Livre</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">{formatCurrency(financeiro.fluxoCaixaLivre)}</div>
            <div className="flex items-center gap-2 mt-2">
              <TrendingUp className="h-4 w-4 text-purple-600" />
              <span className="text-sm">Liquidez: {financeiro.liquidezCorrente.toFixed(2)}x</span>
            </div>
            <Progress value={68} className="h-2 mt-3" />
            <div className="text-xs text-muted-foreground mt-1">
              Capital de Giro: {formatCurrency(financeiro.capitalGiro)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs de Análise */}
      <Tabs defaultValue="receitas" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="receitas">Receitas</TabsTrigger>
          <TabsTrigger value="custos">Custos</TabsTrigger>
          <TabsTrigger value="margens">Margens</TabsTrigger>
          <TabsTrigger value="convenios">Convênios</TabsTrigger>
          <TabsTrigger value="fluxo">Fluxo de Caixa</TabsTrigger>
        </TabsList>

        {/* Tab Receitas */}
        <TabsContent value="receitas" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Composição de Receitas</CardTitle>
              <CardDescription>Análise detalhada das fontes de receita</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Receita por Tipo de Atendimento</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Internações</span>
                        <span className="font-semibold">{formatCurrency(financeiro.receitaInternacoes)} (66.3%)</span>
                      </div>
                      <Progress value={66.3} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Ambulatorial</span>
                        <span className="font-semibold">{formatCurrency(financeiro.receitaAmbulatorial)} (20%)</span>
                      </div>
                      <Progress value={20} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Pronto Socorro</span>
                        <span className="font-semibold">{formatCurrency(financeiro.receitaPS)} (10%)</span>
                      </div>
                      <Progress value={10} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Exames</span>
                        <span className="font-semibold">{formatCurrency(financeiro.receitaExames)} (3.7%)</span>
                      </div>
                      <Progress value={3.7} className="h-2" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Ticket Médio por Tipo</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                      <div className="text-sm text-muted-foreground">Internação</div>
                      <div className="text-2xl font-bold text-green-600">{formatCurrency(financeiro.ticketMedioInternacao)}</div>
                    </div>
                    <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                      <div className="text-sm text-muted-foreground">Ambulatorial</div>
                      <div className="text-2xl font-bold text-blue-600">{formatCurrency(financeiro.ticketMedioAmbulatorio)}</div>
                    </div>
                    <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                      <div className="text-sm text-muted-foreground">Pronto Socorro</div>
                      <div className="text-2xl font-bold text-purple-600">{formatCurrency(financeiro.ticketMedioPS)}</div>
                    </div>
                    <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
                      <div className="text-sm text-muted-foreground">Média Geral</div>
                      <div className="text-2xl font-bold text-orange-600">{formatCurrency(financeiro.ticketMedio)}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-600">
                <div className="flex items-start gap-3">
                  <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <div className="font-semibold text-blue-900 dark:text-blue-100">Insight Financeiro</div>
                    <p className="text-sm text-blue-800 dark:text-blue-200 mt-1">
                      Internações representam 66.3% da receita com ticket médio de R$ 22.100. 
                      Foco em aumentar taxa de ocupação pode gerar R$ 2,8M adicionais/mês.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab Custos */}
        <TabsContent value="custos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Estrutura de Custos</CardTitle>
              <CardDescription>Análise detalhada dos custos operacionais</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Custos por Categoria</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Pessoal</span>
                        <span className="font-semibold">{formatCurrency(financeiro.custoPessoal)} (40%)</span>
                      </div>
                      <Progress value={40} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Materiais</span>
                        <span className="font-semibold">{formatCurrency(financeiro.custoMateriais)} (20%)</span>
                      </div>
                      <Progress value={20} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>OPME</span>
                        <span className="font-semibold">{formatCurrency(financeiro.custoOPME)} (14.7%)</span>
                      </div>
                      <Progress value={14.7} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Medicamentos</span>
                        <span className="font-semibold">{formatCurrency(financeiro.custoMedicamentos)} (10%)</span>
                      </div>
                      <Progress value={10} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Infraestrutura</span>
                        <span className="font-semibold">{formatCurrency(financeiro.custoInfraestrutura)} (7.9%)</span>
                      </div>
                      <Progress value={7.9} className="h-2" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Eficiência Operacional</h4>
                  <div className="space-y-3">
                    <div className="p-4 border rounded-lg">
                      <div className="text-sm text-muted-foreground">Custo por Leito/Dia</div>
                      <div className="text-2xl font-bold">{formatCurrency(financeiro.custoLeitoDia)}</div>
                      <div className="text-xs text-green-600 mt-1">12% abaixo do benchmark</div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="text-sm text-muted-foreground">Receita por Leito/Dia</div>
                      <div className="text-2xl font-bold">{formatCurrency(financeiro.receitaLeitoDia)}</div>
                      <div className="text-xs text-green-600 mt-1">Margem: {formatPercent(((financeiro.receitaLeitoDia - financeiro.custoLeitoDia) / financeiro.receitaLeitoDia) * 100)}</div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="text-sm text-muted-foreground">Custo Assistencial</div>
                      <div className="text-2xl font-bold">{formatCurrency(financeiro.custoAssistencial)}</div>
                      <div className="text-xs text-muted-foreground mt-1">44.9% do faturamento</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-orange-50 dark:bg-orange-950 rounded-lg border border-orange-600">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
                  <div>
                    <div className="font-semibold text-orange-900 dark:text-orange-100">Oportunidade de Redução</div>
                    <p className="text-sm text-orange-800 dark:text-orange-200 mt-1">
                      Custos com OPME (R$ 4,2M) podem ser reduzidos em 15% através de melhor gestão de glosas e negociação com fornecedores. 
                      Economia potencial: R$ 630k/mês.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab Margens */}
        <TabsContent value="margens" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Análise de Margens e Rentabilidade</CardTitle>
              <CardDescription>Indicadores de performance financeira</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 rounded-lg">
                  <div className="text-sm text-muted-foreground mb-2">Margem Bruta</div>
                  <div className="text-4xl font-bold text-green-600">{formatPercent(financeiro.margemBruta)}</div>
                  <Progress value={financeiro.margemBruta * 3} className="h-2 mt-3" />
                  <div className="text-xs text-muted-foreground mt-2">
                    Lucro Bruto: {formatCurrency(financeiro.receitaLiquida * (financeiro.margemBruta / 100))}
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 rounded-lg">
                  <div className="text-sm text-muted-foreground mb-2">Margem Operacional</div>
                  <div className="text-4xl font-bold text-blue-600">{formatPercent(financeiro.margemOperacional)}</div>
                  <Progress value={financeiro.margemOperacional * 3} className="h-2 mt-3" />
                  <div className="text-xs text-muted-foreground mt-2">
                    Lucro Operacional: {formatCurrency(financeiro.receitaLiquida * (financeiro.margemOperacional / 100))}
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 rounded-lg">
                  <div className="text-sm text-muted-foreground mb-2">Margem Líquida</div>
                  <div className="text-4xl font-bold text-purple-600">{formatPercent(financeiro.margemLiquida)}</div>
                  <Progress value={financeiro.margemLiquida * 3} className="h-2 mt-3" />
                  <div className="text-xs text-muted-foreground mt-2">
                    Lucro Líquido: {formatCurrency(financeiro.receitaLiquida * (financeiro.margemLiquida / 100))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium">ROE (Return on Equity)</span>
                    <Badge className="bg-green-600">{formatPercent(financeiro.roe)}</Badge>
                  </div>
                  <Progress value={financeiro.roe * 5} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-2">
                    Retorno sobre o patrimônio líquido - Excelente performance
                  </p>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium">ROIC (Return on Invested Capital)</span>
                    <Badge className="bg-blue-600">{formatPercent(financeiro.roic)}</Badge>
                  </div>
                  <Progress value={financeiro.roic * 5} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-2">
                    Retorno sobre o capital investido - Acima do custo de capital
                  </p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-600">
                <div className="flex items-start gap-3">
                  <TrendingUp className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <div className="font-semibold text-green-900 dark:text-green-100">Performance Excepcional</div>
                    <p className="text-sm text-green-800 dark:text-green-200 mt-1">
                      Margem EBITDA de 28.4% está acima da média do setor (22-25%). 
                      ROE de 18.5% demonstra excelente retorno aos acionistas.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab Convênios */}
        <TabsContent value="convenios" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Análise de Rentabilidade por Convênio</CardTitle>
              <CardDescription>Performance financeira detalhada por operadora</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(financeiro.rentabilidadeConvenios).map(([convenio, dados]) => {
                  const participacao = financeiro.receitaConvenios[convenio as keyof typeof financeiro.receitaConvenios];
                  const receita = financeiro.faturamentoMensal * (participacao / 100);
                  
                  return (
                    <div key={convenio} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-semibold capitalize">{convenio}</h4>
                          <p className="text-sm text-muted-foreground">
                            {formatPercent(participacao)} da receita total
                          </p>
                        </div>
                        <Badge className={
                          dados.margem > 30 ? 'bg-green-600' :
                          dados.margem > 20 ? 'bg-blue-600' :
                          'bg-yellow-600'
                        }>
                          Margem: {formatPercent(dados.margem)}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-4 gap-4 mt-3">
                        <div>
                          <div className="text-xs text-muted-foreground">Receita Mensal</div>
                          <div className="text-lg font-semibold">{formatCurrency(receita)}</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">Ticket Médio</div>
                          <div className="text-lg font-semibold">{formatCurrency(dados.ticketMedio)}</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">Taxa de Glosa</div>
                          <div className={`text-lg font-semibold ${
                            dados.glosa < 6 ? 'text-green-600' :
                            dados.glosa < 9 ? 'text-yellow-600' :
                            'text-red-600'
                          }`}>
                            {formatPercent(dados.glosa)}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">Lucro Estimado</div>
                          <div className="text-lg font-semibold text-green-600">
                            {formatCurrency(receita * (dados.margem / 100))}
                          </div>
                        </div>
                      </div>

                      <Progress value={dados.margem * 2} className="h-2 mt-3" />
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-950 rounded-lg border border-purple-600">
                <div className="flex items-start gap-3">
                  <PieChart className="h-5 w-5 text-purple-600 mt-0.5" />
                  <div>
                    <div className="font-semibold text-purple-900 dark:text-purple-100">Estratégia de Mix</div>
                    <p className="text-sm text-purple-800 dark:text-purple-200 mt-1">
                      SulAmérica apresenta melhor margem (38.2%) e menor glosa (4.8%). 
                      Bradesco tem maior glosa (12.5%) e menor margem (18.4%) - priorizar melhorias.
                      Unimed representa 35.2% da receita com margem saudável de 32.5%.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab Fluxo de Caixa */}
        <TabsContent value="fluxo" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gestão de Fluxo de Caixa</CardTitle>
              <CardDescription>Análise de liquidez e capital de giro</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="p-6 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <div className="text-sm text-muted-foreground mb-2">Fluxo de Caixa Operacional</div>
                  <div className="text-3xl font-bold text-blue-600">{formatCurrency(financeiro.fluxoCaixaOperacional)}</div>
                  <div className="text-xs text-muted-foreground mt-2">
                    {formatPercent((financeiro.fluxoCaixaOperacional / financeiro.faturamentoMensal) * 100)} do faturamento
                  </div>
                </div>

                <div className="p-6 bg-green-50 dark:bg-green-950 rounded-lg">
                  <div className="text-sm text-muted-foreground mb-2">Fluxo de Caixa Livre</div>
                  <div className="text-3xl font-bold text-green-600">{formatCurrency(financeiro.fluxoCaixaLivre)}</div>
                  <div className="text-xs text-muted-foreground mt-2">
                    Após investimentos de {formatCurrency(financeiro.investimentosMes)}
                  </div>
                </div>

                <div className="p-6 bg-purple-50 dark:bg-purple-950 rounded-lg">
                  <div className="text-sm text-muted-foreground mb-2">Capital de Giro</div>
                  <div className="text-3xl font-bold text-purple-600">{formatCurrency(financeiro.capitalGiro)}</div>
                  <div className="text-xs text-muted-foreground mt-2">
                    Liquidez Corrente: {financeiro.liquidezCorrente.toFixed(2)}x
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Ciclo de Recebimento</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="p-4 border rounded-lg">
                    <div className="text-sm text-muted-foreground">À Vista</div>
                    <div className="text-2xl font-bold">{formatPercent(financeiro.recebimentoVista)}</div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="text-sm text-muted-foreground">30 dias</div>
                    <div className="text-2xl font-bold">{formatPercent(financeiro.recebimento30dias)}</div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="text-sm text-muted-foreground">60 dias</div>
                    <div className="text-2xl font-bold">{formatPercent(financeiro.recebimento60dias)}</div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="text-sm text-muted-foreground">&gt;60 dias</div>
                    <div className="text-2xl font-bold text-red-600">{formatPercent(financeiro.recebimentoAcima60)}</div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Prazo Médio de Recebimento</span>
                    <Badge className="bg-blue-600">{financeiro.prazoMedioRecebimento} dias</Badge>
                  </div>
                  <Progress value={(60 - financeiro.prazoMedioRecebimento) / 60 * 100} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-2">
                    Meta: 40 dias | Atual: {financeiro.prazoMedioRecebimento} dias
                  </p>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Taxa de Inadimplência</span>
                    <Badge className="bg-yellow-600">{formatPercent(financeiro.inadimplencia)}</Badge>
                  </div>
                  <Progress value={financeiro.inadimplencia * 20} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-2">
                    Valor em atraso: {formatCurrency(financeiro.faturamentoMensal * (financeiro.inadimplencia / 100))}
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <h4 className="font-semibold">Investimentos Mensais</h4>
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="text-sm text-muted-foreground">Equipamentos</div>
                    <div className="text-xl font-bold">{formatCurrency(financeiro.investimentoEquipamentos)}</div>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="text-sm text-muted-foreground">Tecnologia</div>
                    <div className="text-xl font-bold">{formatCurrency(financeiro.investimentoTI)}</div>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="text-sm text-muted-foreground">Infraestrutura</div>
                    <div className="text-xl font-bold">{formatCurrency(financeiro.investimentoInfraestrutura)}</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-600">
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <div className="font-semibold text-blue-900 dark:text-blue-100">Gestão de Caixa Saudável</div>
                    <p className="text-sm text-blue-800 dark:text-blue-200 mt-1">
                      Liquidez corrente de 1.85x indica boa capacidade de pagamento. 
                      Prazo médio de recebimento de 45 dias está 5 dias acima da meta - 
                      negociar melhores condições com convênios pode liberar R$ 3,2M em caixa.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Resumo Executivo */}
      <Card className="border-green-600">
        <CardHeader className="bg-green-50 dark:bg-green-950">
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-green-600" />
            Resumo Executivo - Ações Prioritárias
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border-l-4 border-red-600 bg-red-50 dark:bg-red-950">
              <h4 className="font-semibold text-red-900 dark:text-red-100 mb-2">🔴 Urgente</h4>
              <p className="text-sm text-red-800 dark:text-red-200">
                Reduzir glosas de 8.3% para 5% = Economia de R$ 1,2M/mês
              </p>
            </div>
            <div className="p-4 border-l-4 border-yellow-600 bg-yellow-50 dark:bg-yellow-950">
              <h4 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">🟡 Importante</h4>
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                Melhorar prazo de recebimento de 45 para 40 dias = Libera R$ 3,2M em caixa
              </p>
            </div>
            <div className="p-4 border-l-4 border-green-600 bg-green-50 dark:bg-green-950">
              <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">🟢 Oportunidade</h4>
              <p className="text-sm text-green-800 dark:text-green-200">
                Aumentar ocupação para 85% = Receita adicional de R$ 2,8M/mês
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RedeDOrFinanceiroDashboard;
