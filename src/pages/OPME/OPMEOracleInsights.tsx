/**
 * Oráculo de Insights OPME - Como Reduzir Glosas
 * Análise preditiva por convênio com prescrições específicas + IA
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Brain, TrendingDown, DollarSign, Clock, AlertTriangle, Sparkles } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import OraculoOPME from '@/components/oracle/OraculoOPME';

const OPMEOracleInsights = () => {
  const insights = [
    {
      convenio: 'BRADESCO SAÚDE',
      glosa: 12.5,
      status: 'critico',
      diagnostico: {
        principais: [
          '45% das glosas: Campo "Previsão de Uso OPME" não marcado na guia',
          '28% das glosas: Passo 3 incompleto ou TUSS ausente',
          '18% das glosas: Anexo OPME não enviado quando exigido'
        ]
      },
      prescricao: [
        'IMPLEMENTAR VALIDAÇÃO OBRIGATÓRIA: Bloquear envio de guia de internação sem "Previsão de Uso OPME" marcado',
        'AUTOMATIZAR PASSO 3: Criar wizard que força preenchimento de todos os itens OPME com TUSS antes de prosseguir',
        'CHECKLIST PRÉ-ENVIO: Pop-up com 5 perguntas obrigatórias antes de submeter ao portal Bradesco'
      ],
      impacto: 'Redução de 7-9 pontos percentuais em 60 dias',
      roi: 'R$ 180.000/mês em glosas evitadas',
      prazo: '60 dias'
    },
    {
      convenio: 'GNDI (NotreDame Intermédica)',
      glosa: 9.1,
      status: 'atencao',
      diagnostico: {
        principais: [
          '52% das glosas: Senha não obtida antes do procedimento',
          '31% das glosas: Transação fora do autorizador Orizon/Tempro',
          '11% das glosas: Anexos clínicos ausentes'
        ]
      },
      prescricao: [
        'INTEGRAÇÃO OBRIGATÓRIA: Forçar rota via autorizador - bloquear bypass manual',
        'ALERTA DE SENHA: Dashboard em tempo real mostrando procedimentos agendados sem senha',
        'CHECKLIST ANEXOS: Validação automática de laudo + exames antes de fechar guia'
      ],
      impacto: 'Redução de 4-6 pontos percentuais em 45 dias',
      roi: 'R$ 95.000/mês em glosas evitadas',
      prazo: '45 dias'
    },
    {
      convenio: 'HAPVIDA',
      glosa: 7.4,
      status: 'atencao',
      diagnostico: {
        principais: [
          '38% das glosas: Inconsistências no padrão TISSNET vs Web',
          '29% das glosas: TUSS divergente entre canais',
          '22% das glosas: Autorização média complexidade não feita online'
        ]
      },
      prescricao: [
        'PADRONIZAR CANAL: Definir TISSNET como canal único e treinar equipe',
        'SINCRONIZAR TUSS: Atualização automática semanal da Tabela 19',
        'AUTOMATIZAR MÉDIA COMPLEXIDADE: Bot que detecta e envia automaticamente via site/app'
      ],
      impacto: 'Redução de 3-4 pontos percentuais em 30 dias',
      roi: 'R$ 62.000/mês em glosas evitadas',
      prazo: '30 dias'
    },
    {
      convenio: 'UNIMED',
      glosa: 6.2,
      status: 'atencao',
      diagnostico: {
        principais: [
          '44% das glosas: Ausência de 3 marcas quando não há restrição clínica',
          '31% das glosas: Laudo sem justificativa detalhada para marca única',
          '15% das glosas: Manual regional não seguido (varia por singular)'
        ]
      },
      prescricao: [
        'BIBLIOTECA DE MARCAS: Sistema sugere automaticamente 3 marcas equivalentes por TUSS',
        'TEMPLATE DE LAUDO: Formulário estruturado com campos obrigatórios para justificar marca única',
        'REGRAS POR SINGULAR: Configurar validações específicas por cooperativa no cadastro'
      ],
      impacto: 'Redução de 2-3 pontos percentuais em 45 dias',
      roi: 'R$ 78.000/mês em glosas evitadas',
      prazo: '45 dias'
    },
    {
      convenio: 'SULAMERICA',
      glosa: 4.8,
      status: 'otimo',
      diagnostico: {
        principais: [
          'Processo VPP bem estabelecido e seguido',
          '63% das autorizações são automáticas',
          'Principais glosas (78% do restante): Pequenas inconsistências de preço/quantidade'
        ]
      },
      prescricao: [
        'VALIDAÇÃO DE PREÇOS: Integrar tabela de referência para alertar sobre valores fora da curva',
        'RECONCILIAÇÃO AUTOMÁTICA: Bot que compara solicitado vs autorizado e alerta divergências',
        'DOCUMENTAÇÃO: Continuar rigor no registro Anvisa + marca/modelo/fabricante'
      ],
      impacto: 'Redução adicional de 1-2 pontos percentuais',
      roi: 'R$ 45.000/mês (manutenção do padrão de excelência)',
      prazo: '30 dias'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critico': return 'bg-red-600';
      case 'atencao': return 'bg-yellow-600';
      case 'otimo': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'critico': return '🔴';
      case 'atencao': return '🟡';
      case 'otimo': return '🟢';
      default: return '⚪';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Brain className="h-8 w-8 text-purple-600" />
        <div>
          <h1 className="text-3xl font-bold">Oráculo de Insights - Como Reduzir Glosas</h1>
          <p className="text-muted-foreground">Análise preditiva por convênio + Assistente IA especializado</p>
        </div>
      </div>

      {/* Tabs: Análise Estática vs IA Interativa */}
      <Tabs defaultValue="ia" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="ia" className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            Oráculo IA Interativo
          </TabsTrigger>
          <TabsTrigger value="analise">
            <Brain className="h-4 w-4 mr-2" />
            Análise Detalhada
          </TabsTrigger>
        </TabsList>

        {/* Tab IA Interativa */}
        <TabsContent value="ia" className="mt-6">
          <div className="h-[calc(100vh-300px)]">
            <OraculoOPME />
          </div>
        </TabsContent>

        {/* Tab Análise Detalhada */}
        <TabsContent value="analise" className="mt-6 space-y-6">

      {/* Resumo Executivo */}
      <Card className="border-purple-600">
        <CardHeader className="bg-purple-50 dark:bg-purple-950">
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Resumo Executivo - Potencial de Economia
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 dark:bg-green-950 rounded-lg">
              <DollarSign className="h-8 w-8 mx-auto text-green-600 mb-2" />
              <div className="text-3xl font-bold text-green-600">R$ 460k</div>
              <div className="text-sm text-muted-foreground">Economia Mensal Potencial</div>
            </div>
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <TrendingDown className="h-8 w-8 mx-auto text-blue-600 mb-2" />
              <div className="text-3xl font-bold text-blue-600">-3.8%</div>
              <div className="text-sm text-muted-foreground">Redução Taxa Glosa (8.3% → 4.5%)</div>
            </div>
            <div className="text-center p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
              <Clock className="h-8 w-8 mx-auto text-orange-600 mb-2" />
              <div className="text-3xl font-bold text-orange-600">90 dias</div>
              <div className="text-sm text-muted-foreground">Prazo Médio Implementação</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Insights por Convênio */}
      {insights.map((insight, idx) => (
        <Card key={idx} className="border-l-4" style={{ borderLeftColor: insight.status === 'critico' ? '#dc2626' : insight.status === 'atencao' ? '#ca8a04' : '#16a34a' }}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <span>{getStatusIcon(insight.status)}</span>
                {insight.convenio}
              </CardTitle>
              <Badge className={getStatusColor(insight.status)}>
                Glosa {insight.glosa}% - {insight.status.toUpperCase()}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Diagnóstico */}
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Diagnóstico:
              </h4>
              <ul className="space-y-1 ml-6">
                {insight.diagnostico.principais.map((item, i) => (
                  <li key={i} className="text-sm text-muted-foreground list-disc">{item}</li>
                ))}
              </ul>
            </div>

            {/* Prescrição */}
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Brain className="h-4 w-4 text-purple-600" />
                Prescrição:
              </h4>
              <div className="space-y-2">
                {insight.prescricao.map((item, i) => (
                  <Alert key={i} className="bg-blue-50 dark:bg-blue-950 border-blue-600">
                    <AlertDescription className="text-sm">
                      <span className="font-semibold">{i + 1}.</span> {item}
                    </AlertDescription>
                  </Alert>
                ))}
              </div>
            </div>

            {/* Impacto e ROI */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
              <div>
                <div className="text-sm text-muted-foreground">Impacto Esperado</div>
                <div className="font-semibold text-green-600">{insight.impacto}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">ROI</div>
                <div className="font-semibold text-blue-600">{insight.roi}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Prazo</div>
                <div className="font-semibold text-orange-600">{insight.prazo}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Matriz de Priorização */}
      <Card>
        <CardHeader>
          <CardTitle>Matriz de Priorização - Esforço vs Impacto</CardTitle>
          <CardDescription>Recomendação: Alto Impacto + Baixo Esforço primeiro</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-red-50 dark:bg-red-950 rounded-lg border-2 border-red-600">
              <h4 className="font-semibold text-red-900 dark:text-red-100 mb-2">🔴 PRIORIDADE MÁXIMA (Alto Impacto + Baixo Esforço)</h4>
              <ul className="space-y-1 ml-4">
                <li className="text-sm">• Validação de Vínculos (elimina 24% glosas)</li>
                <li className="text-sm">• Validação TUSS (elimina 19% glosas)</li>
                <li className="text-sm">• Validação Anvisa (elimina 17% glosas)</li>
              </ul>
            </div>

            <div className="p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg border-2 border-yellow-600">
              <h4 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">🟡 PRIORIDADE ALTA (Alto Impacto + Médio Esforço)</h4>
              <ul className="space-y-1 ml-4">
                <li className="text-sm">• Integração Bradesco Passo 3</li>
                <li className="text-sm">• Biblioteca 3 Marcas Unimed</li>
                <li className="text-sm">• Padronização TISSNET Hapvida</li>
              </ul>
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg border-2 border-green-600">
              <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">🟢 PRIORIDADE MÉDIA (Médio Impacto + Baixo Esforço)</h4>
              <ul className="space-y-1 ml-4">
                <li className="text-sm">• Alerta de Senha GNDI</li>
                <li className="text-sm">• Validação de Preços SulAmérica</li>
                <li className="text-sm">• Templates de Laudo</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OPMEOracleInsights;
