/**
 * Glosas & Conformidade - Visão Hospital
 * Visão gerencial/financeira com impacto da IA e projeções
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  DollarSign, TrendingDown, TrendingUp, AlertTriangle, CheckCircle,
  FileText, Brain, Target, Calendar, PieChart, BarChart3
} from 'lucide-react';

const GlosasConformidadePage = () => {
  // Dados simulados
  const kpis = {
    taxaGlosaAtual: 8.3,
    taxaGlosaBaseline: 12.8,
    economiaMensal: 1245000,
    projecao12Meses: 14940000,
    reducaoPercentual: 35.2,
  };

  const porConvenio = [
    { nome: 'Unimed', taxaAtual: 6.2, baseline: 9.8, economia: 452000, reducao: 36.7 },
    { nome: 'Bradesco', taxaAtual: 10.5, baseline: 15.2, economia: 298000, reducao: 30.9 },
    { nome: 'SulAmérica', taxaAtual: 4.8, baseline: 7.5, economia: 185000, reducao: 36.0 },
    { nome: 'GNDI', taxaAtual: 9.1, baseline: 13.4, economia: 178000, reducao: 32.1 },
    { nome: 'Hapvida', taxaAtual: 7.4, baseline: 11.2, economia: 132000, reducao: 33.9 },
  ];

  const motivosGlosa = [
    { motivo: 'Ausência de Justificativa Clínica', valor: 385000, percentual: 30.9, reducaoIA: 68 },
    { motivo: 'Divergência CID ↔ TUSS', valor: 298000, percentual: 23.9, reducaoIA: 72 },
    { motivo: 'Tempo/Assinatura', valor: 245000, percentual: 19.7, reducaoIA: 45 },
    { motivo: 'Materiais/OPME', valor: 189000, percentual: 15.2, reducaoIA: 38 },
    { motivo: 'Ausência de Consentimento', valor: 128000, percentual: 10.3, reducaoIA: 55 },
  ];

  const evolucaoMensal = [
    { mes: 'Jan', glosa: 12.8, ia: 0 },
    { mes: 'Fev', glosa: 12.5, ia: 15 },
    { mes: 'Mar', glosa: 11.8, ia: 32 },
    { mes: 'Abr', glosa: 10.9, ia: 48 },
    { mes: 'Mai', glosa: 9.7, ia: 61 },
    { mes: 'Jun', glosa: 8.3, ia: 72 },
  ];

  const casosExemplo = [
    {
      id: 1,
      tipo: 'Enfermaria',
      convenio: 'Unimed',
      antes: 'Glosa por ausência de justificativa clínica para antibiótico de amplo espectro',
      depois: 'IA transcreveu: "Paciente com quadro séptico, culturas pendentes, optado por Meropenem empiricamente"',
      economia: 'R$ 2.850',
    },
    {
      id: 2,
      tipo: 'Centro Cirúrgico',
      convenio: 'Bradesco',
      antes: 'Glosa de OPME por falta de correlação CID-10 ↔ material',
      depois: 'IA preencheu CID-10 (M17.1) e vinculou prótese de joelho automaticamente',
      economia: 'R$ 18.500',
    },
    {
      id: 3,
      tipo: 'Exames',
      convenio: 'SulAmérica',
      antes: 'Glosa de RM por indicação clínica vaga',
      depois: 'IA estruturou: "Suspeita de hérnia discal L4-L5, dor ciática refratária há 3 meses"',
      economia: 'R$ 1.200',
    },
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
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <DollarSign className="h-8 w-8 text-primary" />
          Glosas & Conformidade
        </h1>
        <p className="text-muted-foreground mt-1">
          Visão executiva de impacto financeiro e redução de glosas
        </p>
      </div>

      {/* KPIs Principais */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-2">Taxa de Glosa Atual</div>
              <div className="text-4xl font-bold text-primary">{kpis.taxaGlosaAtual}%</div>
              <div className="text-xs text-muted-foreground mt-2">
                Baseline: {kpis.taxaGlosaBaseline}%
              </div>
              <Badge className="mt-2 bg-green-600">
                <TrendingDown className="h-3 w-3 mr-1" />
                -{kpis.reducaoPercentual}%
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-2">Economia Mensal</div>
              <div className="text-3xl font-bold text-green-600">
                {formatCurrency(kpis.economiaMensal)}
              </div>
              <div className="text-xs text-green-600 mt-2 flex items-center justify-center gap-1">
                <TrendingUp className="h-3 w-3" />
                vs Baseline
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-2">Projeção 12 Meses</div>
              <div className="text-3xl font-bold text-blue-600">
                {formatCurrency(kpis.projecao12Meses)}
              </div>
              <div className="text-xs text-muted-foreground mt-2">
                Economia estimada
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-2">Redução vs Baseline</div>
              <div className="text-4xl font-bold text-green-600">-{kpis.reducaoPercentual}%</div>
              <div className="text-xs text-muted-foreground mt-2">
                Glosas evitadas
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="convenio" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="convenio">Por Convênio</TabsTrigger>
          <TabsTrigger value="motivos">Motivos de Glosa</TabsTrigger>
          <TabsTrigger value="evolucao">Evolução</TabsTrigger>
          <TabsTrigger value="casos">Casos-Exemplo</TabsTrigger>
        </TabsList>

        {/* Por Convênio */}
        <TabsContent value="convenio">
          <Card>
            <CardHeader>
              <CardTitle>Análise por Convênio</CardTitle>
              <CardDescription>
                Taxa de glosa, economia e impacto da IA
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {porConvenio.map((convenio, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="font-semibold text-lg">{convenio.nome}</div>
                        <div className="text-sm text-muted-foreground">
                          Baseline: {convenio.baseline}% → Atual: {convenio.taxaAtual}%
                        </div>
                      </div>
                      <Badge className="bg-green-600 text-lg px-3 py-1">
                        {formatCurrency(convenio.economia)}/mês
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Taxa Atual</div>
                        <div className="text-2xl font-bold">{convenio.taxaAtual}%</div>
                        <Progress value={convenio.taxaAtual} className="mt-2 h-2" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Redução</div>
                        <div className="text-2xl font-bold text-green-600">-{convenio.reducao}%</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Economia Mensal</div>
                        <div className="text-xl font-bold text-green-600">
                          {formatCurrency(convenio.economia)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Motivos de Glosa */}
        <TabsContent value="motivos">
          <Card>
            <CardHeader>
              <CardTitle>Top 5 Motivos de Glosa</CardTitle>
              <CardDescription>
                Valor, percentual e redução com IA
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {motivosGlosa.map((motivo, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="text-lg">{index + 1}º</Badge>
                        <div>
                          <div className="font-semibold">{motivo.motivo}</div>
                          <div className="text-sm text-muted-foreground">
                            {formatCurrency(motivo.valor)} • {motivo.percentual}% do total
                          </div>
                        </div>
                      </div>
                      <Badge className="bg-blue-600">
                        <Brain className="h-3 w-3 mr-1" />
                        IA reduziu {motivo.reducaoIA}%
                      </Badge>
                    </div>
                    <Progress value={motivo.percentual} className="h-2" />
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-600">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <div className="font-semibold text-green-900 dark:text-green-100">
                      Impacto Total da IA
                    </div>
                    <p className="text-sm text-green-800 dark:text-green-200 mt-1">
                      A transcrição automática reduziu <strong>R$ 1.245.000</strong> em glosas mensais, 
                      com maior impacto em "Ausência de Justificativa Clínica" (68% de redução) e 
                      "Divergência CID ↔ TUSS" (72% de redução).
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Evolução Mensal */}
        <TabsContent value="evolucao">
          <Card>
            <CardHeader>
              <CardTitle>Evolução Mensal</CardTitle>
              <CardDescription>
                Taxa de glosa e % de preenchimento por IA
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {evolucaoMensal.map((mes, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-semibold">{mes.mes}/2025</div>
                      <div className="flex items-center gap-4">
                        <Badge variant="outline">Glosa: {mes.glosa}%</Badge>
                        <Badge className="bg-blue-600">IA: {mes.ia}%</Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Taxa de Glosa</div>
                        <Progress value={(mes.glosa / 15) * 100} className="h-2" />
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Preenchimento IA</div>
                        <Progress value={mes.ia} className="h-2" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-600">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <div className="font-semibold text-blue-900 dark:text-blue-100">
                      Tendência e Projeção
                    </div>
                    <p className="text-sm text-blue-800 dark:text-blue-200 mt-1">
                      Com a curva atual, projetamos atingir <strong>5% de glosa</strong> em 6 meses, 
                      gerando economia adicional de <strong>R$ 8.5M</strong> no ano.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Casos-Exemplo */}
        <TabsContent value="casos">
          <Card>
            <CardHeader>
              <CardTitle>Casos-Exemplo: Antes vs Depois</CardTitle>
              <CardDescription>
                Como a IA fechou lacunas e evitou glosas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {casosExemplo.map((caso) => (
                  <div key={caso.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{caso.tipo}</Badge>
                        <Badge>{caso.convenio}</Badge>
                      </div>
                      <Badge className="bg-green-600 text-lg px-3 py-1">
                        {caso.economia}
                      </Badge>
                    </div>
                    <div className="space-y-3">
                      <div className="p-3 bg-red-50 dark:bg-red-950 rounded border-l-4 border-red-600">
                        <div className="text-xs font-semibold text-red-900 dark:text-red-100 mb-1">
                          ❌ ANTES (Glosado)
                        </div>
                        <div className="text-sm text-red-800 dark:text-red-200">
                          {caso.antes}
                        </div>
                      </div>
                      <div className="p-3 bg-green-50 dark:bg-green-950 rounded border-l-4 border-green-600">
                        <div className="text-xs font-semibold text-green-900 dark:text-green-100 mb-1">
                          ✅ DEPOIS (Pago)
                        </div>
                        <div className="text-sm text-green-800 dark:text-green-200">
                          {caso.depois}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Resumo Executivo */}
      <Card className="border-purple-600">
        <CardHeader className="bg-purple-50 dark:bg-purple-950">
          <CardTitle className="flex items-center gap-2 text-purple-900 dark:text-purple-100">
            <Target className="h-5 w-5" />
            Resumo Executivo - Ganhos Mensuráveis
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border-l-4 border-green-600 bg-green-50 dark:bg-green-950">
              <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">
                💰 Economia Mensal
              </h4>
              <div className="text-2xl font-bold text-green-600 mb-1">
                {formatCurrency(kpis.economiaMensal)}
              </div>
              <p className="text-sm text-green-800 dark:text-green-200">
                Redução de {kpis.reducaoPercentual}% vs baseline
              </p>
            </div>
            <div className="p-4 border-l-4 border-blue-600 bg-blue-50 dark:bg-blue-950">
              <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                📈 Projeção Anual
              </h4>
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {formatCurrency(kpis.projecao12Meses)}
              </div>
              <p className="text-sm text-blue-800 dark:text-blue-200">
                Economia conservadora em 12 meses
              </p>
            </div>
            <div className="p-4 border-l-4 border-purple-600 bg-purple-50 dark:bg-purple-950">
              <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">
                🎯 Meta Alcançada
              </h4>
              <div className="text-2xl font-bold text-purple-600 mb-1">
                {kpis.taxaGlosaAtual}%
              </div>
              <p className="text-sm text-purple-800 dark:text-purple-200">
                Taxa de glosa atual (meta: &lt;5%)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GlosasConformidadePage;
