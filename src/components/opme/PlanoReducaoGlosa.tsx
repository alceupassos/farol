/**
 * Plano de Redução de Glosa por Convênio
 * Botões de ação direta e objetiva para cada operadora
 */

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Target, CheckCircle2, AlertTriangle, TrendingDown, 
  DollarSign, Clock, ArrowRight, Zap 
} from 'lucide-react';
import { conveniosAtivos } from '@/data/redeDorBarueri';

interface PlanoAcao {
  titulo: string;
  descricao: string;
  impacto: string;
  prazo: string;
  passos: string[];
}

export const PlanoReducaoGlosa = () => {
  const [convenioSelecionado, setConvenioSelecionado] = useState<string | null>(null);

  const planosAcao: Record<string, PlanoAcao> = {
    bradesco: {
      titulo: 'Plano de Ação Bradesco - Redução 12.5% → 5.0%',
      descricao: 'Implementação de validações obrigatórias e automação do Passo 3',
      impacto: 'Economia de R$ 487.000/mês (-7.5 pontos percentuais)',
      prazo: '60 dias',
      passos: [
        '✓ SEMANA 1-2: Implementar validação obrigatória do campo "Previsão de Uso OPME" - bloquear envio sem marcação',
        '✓ SEMANA 3-4: Criar wizard automático para Passo 3 OPME - forçar preenchimento completo com TUSS',
        '✓ SEMANA 5-6: Desenvolver checklist pré-envio com 5 perguntas obrigatórias antes de submeter',
        '✓ SEMANA 7-8: Treinar equipe no novo fluxo e monitorar primeiros resultados',
        '→ RESULTADO: Redução de 45% das glosas (campo não marcado) + 28% (Passo 3 incompleto)'
      ]
    },
    gndi: {
      titulo: 'Plano de Ação GNDI - Redução 9.1% → 4.5%',
      descricao: 'Integração obrigatória com autorizador e dashboard de senhas',
      impacto: 'Economia de R$ 161.000/mês (-4.6 pontos percentuais)',
      prazo: '45 dias',
      passos: [
        '✓ SEMANA 1-2: Forçar rota via autorizador Orizon/Tempro - bloquear bypass manual no sistema',
        '✓ SEMANA 3-4: Criar dashboard em tempo real de procedimentos agendados sem senha',
        '✓ SEMANA 5-5: Implementar alertas automáticos 24h antes do procedimento se senha ausente',
        '✓ SEMANA 6: Validação automática de anexos clínicos (laudo + exames) antes de fechar guia',
        '→ RESULTADO: Elimina 52% das glosas (senha não obtida) + 31% (transação fora do autorizador)'
      ]
    },
    hapvida: {
      titulo: 'Plano de Ação Hapvida - Redução 7.4% → 4.2%',
      descricao: 'Padronização de canal único e sincronização TUSS',
      impacto: 'Economia de R$ 79.000/mês (-3.2 pontos percentuais)',
      prazo: '30 dias',
      passos: [
        '✓ SEMANA 1: Definir TISSNET como canal único obrigatório - desativar envio via Web',
        '✓ SEMANA 2: Treinar toda equipe no padrão TISSNET com manual atualizado',
        '✓ SEMANA 3: Implementar sincronização automática semanal da Tabela TUSS 19',
        '✓ SEMANA 4: Criar bot para detectar e enviar automaticamente autorizações de média complexidade',
        '→ RESULTADO: Elimina 38% das glosas (inconsistências) + 29% (TUSS divergente)'
      ]
    },
    unimed: {
      titulo: 'Plano de Ação Unimed - Redução 6.2% → 3.5%',
      descricao: 'Biblioteca automática de 3 marcas e templates de laudo',
      impacto: 'Economia de R$ 270.000/mês (-2.7 pontos percentuais)',
      prazo: '45 dias',
      passos: [
        '✓ SEMANA 1-2: Criar biblioteca digital com 3 marcas equivalentes para cada código TUSS',
        '✓ SEMANA 3-4: Sistema sugere automaticamente 3 marcas ao selecionar material OPME',
        '✓ SEMANA 5: Desenvolver template estruturado de laudo com campos obrigatórios para marca única',
        '✓ SEMANA 6: Configurar regras específicas por cooperativa singular no cadastro',
        '→ RESULTADO: Elimina 44% das glosas (ausência 3 marcas) + 31% (laudo sem justificativa)'
      ]
    },
    sulamerica: {
      titulo: 'Plano de Ação SulAmérica - Redução 4.8% → 3.0%',
      descricao: 'Validação de preços e reconciliação automática',
      impacto: 'Economia de R$ 95.000/mês (-1.8 pontos percentuais)',
      prazo: '30 dias',
      passos: [
        '✓ SEMANA 1-2: Integrar tabela de referência de preços para alertar valores fora da curva',
        '✓ SEMANA 3: Criar bot de reconciliação que compara solicitado vs autorizado',
        '✓ SEMANA 4: Implementar alertas automáticos de divergências antes do faturamento',
        '✓ MANUTENÇÃO: Continuar rigor no registro Anvisa + marca/modelo/fabricante',
        '→ RESULTADO: Elimina 78% das glosas restantes (inconsistências preço/quantidade)'
      ]
    }
  };

  const handleGerarPlano = (convenioId: string) => {
    setConvenioSelecionado(convenioId);
    // Scroll suave para o plano
    setTimeout(() => {
      document.getElementById('plano-acao')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critico': return 'bg-red-600 hover:bg-red-700';
      case 'atencao': return 'bg-yellow-600 hover:bg-yellow-700';
      case 'otimo': return 'bg-green-600 hover:bg-green-700';
      default: return 'bg-gray-600 hover:bg-gray-700';
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
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-orange-600">
        <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950">
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-orange-600" />
            Plano de Redução de Glosa - Ação Rápida por Convênio
          </CardTitle>
          <CardDescription>
            Clique no convênio para ver o plano de ação detalhado e objetivo
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Botões de Convênios */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {conveniosAtivos.map((convenio) => (
          <Card 
            key={convenio.id} 
            className={`cursor-pointer transition-all hover:shadow-lg ${
              convenioSelecionado === convenio.id ? 'ring-2 ring-orange-600' : ''
            }`}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">{getStatusIcon(convenio.status)}</span>
                    <h3 className="font-bold text-lg">{convenio.nome}</h3>
                  </div>
                  <Badge className={getStatusColor(convenio.status)}>
                    {convenio.status.toUpperCase()}
                  </Badge>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Glosa Atual:</span>
                  <span className="text-2xl font-bold text-red-600">{convenio.taxaGlosa}%</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Meta:</span>
                  <span className="text-xl font-bold text-green-600">
                    {(convenio.taxaGlosa - convenio.melhoriaEsperada).toFixed(1)}%
                  </span>
                </div>

                <div className="pt-3 border-t">
                  <div className="flex items-center gap-2 text-sm mb-2">
                    <TrendingDown className="h-4 w-4 text-blue-600" />
                    <span className="font-semibold">Redução: -{convenio.melhoriaEsperada}%</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm mb-2">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <span className="font-semibold">{formatCurrency(convenio.economiaProjetada)}/mês</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-purple-600" />
                    <span className="text-muted-foreground">{convenio.prioridade}</span>
                  </div>
                </div>

                <Button
                  onClick={() => handleGerarPlano(convenio.id)}
                  className={`w-full mt-4 ${getStatusColor(convenio.status)}`}
                >
                  <Target className="h-4 w-4 mr-2" />
                  Ver Plano de Ação
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Plano de Ação Detalhado */}
      {convenioSelecionado && planosAcao[convenioSelecionado] && (
        <div id="plano-acao">
          <Card className="border-orange-600 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-6 w-6 text-orange-600" />
                  {planosAcao[convenioSelecionado].titulo}
                </CardTitle>
                <Badge className="bg-orange-600 text-lg px-4 py-2">
                  {planosAcao[convenioSelecionado].prazo}
                </Badge>
              </div>
              <CardDescription className="text-base mt-2">
                {planosAcao[convenioSelecionado].descricao}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              {/* Impacto Financeiro */}
              <Alert className="mb-6 bg-green-50 dark:bg-green-950 border-green-600">
                <DollarSign className="h-5 w-5 text-green-600" />
                <AlertDescription className="text-base font-semibold text-green-900 dark:text-green-100">
                  💰 {planosAcao[convenioSelecionado].impacto}
                </AlertDescription>
              </Alert>

              {/* Passos de Implementação */}
              <div className="space-y-4">
                <h4 className="font-bold text-lg flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-blue-600" />
                  Plano de Implementação Detalhado:
                </h4>
                
                <div className="space-y-3">
                  {planosAcao[convenioSelecionado].passos.map((passo, idx) => {
                    const isResultado = passo.startsWith('→');
                    const isCheckpoint = passo.startsWith('✓');
                    
                    return (
                      <div
                        key={idx}
                        className={`p-4 rounded-lg border-l-4 ${
                          isResultado 
                            ? 'bg-green-50 dark:bg-green-950 border-green-600' 
                            : isCheckpoint
                            ? 'bg-blue-50 dark:bg-blue-950 border-blue-600'
                            : 'bg-muted border-gray-400'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {isResultado ? (
                            <TrendingDown className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                          ) : isCheckpoint ? (
                            <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                          ) : (
                            <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                          )}
                          <p className={`text-sm ${
                            isResultado 
                              ? 'font-bold text-green-900 dark:text-green-100' 
                              : 'text-gray-900 dark:text-gray-100'
                          }`}>
                            {passo}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Botão de Ação */}
              <div className="mt-6 flex gap-3">
                <Button className="flex-1 bg-orange-600 hover:bg-orange-700 text-lg py-6">
                  <Zap className="h-5 w-5 mr-2" />
                  Iniciar Implementação Agora
                </Button>
                <Button 
                  variant="outline" 
                  className="px-6"
                  onClick={() => setConvenioSelecionado(null)}
                >
                  Voltar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Resumo Total */}
      <Card className="border-green-600">
        <CardHeader className="bg-green-50 dark:bg-green-950">
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-green-600" />
            Potencial Total de Economia
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-100 dark:bg-green-900 rounded-lg">
              <div className="text-4xl font-bold text-green-600">
                {formatCurrency(conveniosAtivos.reduce((acc, c) => acc + c.economiaProjetada, 0))}
              </div>
              <div className="text-sm text-muted-foreground mt-1">Economia Total/Mês</div>
            </div>
            <div className="text-center p-4 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <div className="text-4xl font-bold text-blue-600">
                {conveniosAtivos.reduce((acc, c) => acc + c.melhoriaEsperada, 0).toFixed(1)}%
              </div>
              <div className="text-sm text-muted-foreground mt-1">Redução Total de Glosa</div>
            </div>
            <div className="text-center p-4 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <div className="text-4xl font-bold text-purple-600">6 meses</div>
              <div className="text-sm text-muted-foreground mt-1">Prazo Implementação Completa</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlanoReducaoGlosa;
