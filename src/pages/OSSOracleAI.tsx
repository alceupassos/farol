import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, 
  Send,
  Sparkles,
  TrendingUp,
  Calculator,
  Target,
  AlertTriangle,
  Lightbulb,
  BarChart3,
  MessageSquare,
  History,
  Download,
  RefreshCw,
  Zap
} from 'lucide-react';

const OSSOracleAI = () => {
  const [pergunta, setPergunta] = useState('');
  const [respostaIA, setRespostaIA] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [historico, setHistorico] = useState([
    {
      pergunta: 'Onde ganho mais dinheiro em recuperação de glosa nos próximos 30 dias?',
      resposta: 'Foque em glosas de código TUSS inválido (R$ 89k potencial) com 85% de chance de recuperação.',
      timestamp: '25/01/2025 14:30'
    },
    {
      pergunta: 'Qual o risco de perder a tempestividade Audesp?',
      resposta: 'Risco baixo (5%). Todos os campos obrigatórios estão preenchidos. Prazo: 15 dias.',
      timestamp: '25/01/2025 10:15'
    }
  ]);

  const perguntasSugeridas = [
    'Onde ganho R$ em recuperação de glosa nos próximos 30 dias?',
    'Quais campos explicam 80% das rejeições AIH/APAC?',
    'Qual o risco de perder a tempestividade Audesp?',
    'Qual o ROI de reprocessar top 3 causas de glosa?',
    'Como realocar metas para maximizar atingimento?',
    'Qual a probabilidade de renovação dos contratos ativos?'
  ];

  const simularResposta = () => {
    setCarregando(true);
    setTimeout(() => {
      setRespostaIA({
        resposta: `Com base na análise dos dados, identifiquei as seguintes oportunidades:

1. **Recuperação de Glosas (R$ 86k potencial)**
   - Foque nos códigos TUSS inválidos: 85% de chance de recuperação
   - Documentação incompleta: 72% de chance com checklist automatizado
   - Total recuperável em 30 dias: R$ 61.920

2. **Ações Prioritárias:**
   - Implementar validação automática de TUSS (ROI: 340%)
   - Criar checklist digital de documentação
   - Configurar alertas de prazo 5 dias antes do vencimento`,
        evidencias: [
          { fonte: 'Histórico de Glosas Jan/2025', confianca: 92 },
          { fonte: 'Taxa de Recuperação Q4/2024', confianca: 88 },
          { fonte: 'Benchmark OSS Similar', confianca: 75 }
        ],
        acoes: [
          'Implementar validador TUSS automático',
          'Treinar equipe em documentação',
          'Configurar alertas de prazo'
        ],
        metricas: {
          confianca: 87,
          impactoFinanceiro: 61920,
          tempoImplementacao: 15,
          complexidade: 'média'
        }
      });
      setCarregando(false);
      
      // Adicionar ao histórico
      setHistorico(prev => [{
        pergunta: pergunta,
        resposta: 'Análise completa disponível',
        timestamp: new Date().toLocaleString('pt-BR')
      }, ...prev]);
    }, 2000);
  };

  const handlePergunta = () => {
    if (pergunta.trim()) {
      simularResposta();
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
              <Brain className="h-8 w-8 mr-3 text-purple-500" />
              Oráculo IA - Google Gemini
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Análises preditivas e recomendações inteligentes para gestão OSS
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <History className="h-4 w-4 mr-2" />
              Histórico
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>

        {/* Interface de Pergunta */}
        <Card className="border-purple-200 dark:border-purple-800">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="h-5 w-5 mr-2" />
              Faça sua pergunta em linguagem natural
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={pergunta}
                  onChange={(e) => setPergunta(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handlePergunta()}
                  placeholder="Ex: Onde posso economizar mais nos próximos 30 dias?"
                  className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <Button 
                  onClick={handlePergunta}
                  disabled={carregando}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  {carregando ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>

              {/* Perguntas Sugeridas */}
              <div className="flex flex-wrap gap-2">
                {perguntasSugeridas.map((p, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => setPergunta(p)}
                    className="text-xs"
                  >
                    <Sparkles className="h-3 w-3 mr-1" />
                    {p}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resposta da IA */}
        {respostaIA && (
          <Card className="border-green-200 dark:border-green-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <Lightbulb className="h-5 w-5 mr-2 text-green-500" />
                  Análise e Recomendações
                </CardTitle>
                <Badge className="bg-green-100 text-green-800">
                  Confiança: {respostaIA.metricas.confianca}%
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Resposta Principal */}
                <div className="prose dark:prose-invert max-w-none">
                  <div className="whitespace-pre-wrap">{respostaIA.resposta}</div>
                </div>

                {/* Métricas */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded">
                    <p className="text-sm text-gray-500">Impacto Financeiro</p>
                    <p className="text-xl font-bold text-purple-600">
                      R$ {(respostaIA.metricas.impactoFinanceiro / 1000).toFixed(1)}k
                    </p>
                  </div>
                  <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                    <p className="text-sm text-gray-500">Tempo Implementação</p>
                    <p className="text-xl font-bold text-blue-600">
                      {respostaIA.metricas.tempoImplementacao} dias
                    </p>
                  </div>
                  <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded">
                    <p className="text-sm text-gray-500">Confiança</p>
                    <p className="text-xl font-bold text-green-600">
                      {respostaIA.metricas.confianca}%
                    </p>
                  </div>
                  <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded">
                    <p className="text-sm text-gray-500">Complexidade</p>
                    <p className="text-xl font-bold text-orange-600 capitalize">
                      {respostaIA.metricas.complexidade}
                    </p>
                  </div>
                </div>

                {/* Evidências */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Evidências e Fontes
                  </h4>
                  <div className="space-y-2">
                    {respostaIA.evidencias.map((ev, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                        <span className="text-sm">{ev.fonte}</span>
                        <div className="flex items-center">
                          <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full"
                              style={{ width: `${ev.confianca}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-500">{ev.confianca}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ações Recomendadas */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center">
                    <Target className="h-4 w-4 mr-2" />
                    Plano de Ação Recomendado
                  </h4>
                  <div className="space-y-2">
                    {respostaIA.acoes.map((acao, index) => (
                      <div key={index} className="flex items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                        <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                          {index + 1}
                        </div>
                        <span className="flex-1">{acao}</span>
                        <Button size="sm" variant="outline">
                          Implementar
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="simulador" className="space-y-4">
          <TabsList>
            <TabsTrigger value="simulador">Simulador What-If</TabsTrigger>
            <TabsTrigger value="preditivo">Análise Preditiva</TabsTrigger>
            <TabsTrigger value="otimizacao">Otimização</TabsTrigger>
            <TabsTrigger value="historico">Histórico</TabsTrigger>
          </TabsList>

          {/* Simulador What-If */}
          <TabsContent value="simulador">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calculator className="h-5 w-5 mr-2" />
                  Simulador de Cenários
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Parâmetros de Simulação</h4>
                    
                    <div>
                      <label className="text-sm font-medium">Redução de Taxa de Glosa (%)</label>
                      <input type="range" min="0" max="5" step="0.1" className="w-full mt-1" />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>0%</span>
                        <span>2.5%</span>
                        <span>5%</span>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium">Aumento de Produtividade (%)</label>
                      <input type="range" min="0" max="30" step="1" className="w-full mt-1" />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>0%</span>
                        <span>15%</span>
                        <span>30%</span>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium">Investimento (R$)</label>
                      <input type="number" placeholder="50000" className="w-full mt-1 px-3 py-2 border rounded" />
                    </div>

                    <Button className="w-full">
                      <Zap className="h-4 w-4 mr-2" />
                      Simular Cenário
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold">Resultado da Simulação</h4>
                    
                    <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded">
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">ROI Esperado:</span>
                          <span className="font-bold text-green-600">342%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Payback:</span>
                          <span className="font-bold">4.2 meses</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Economia Anual:</span>
                          <span className="font-bold">R$ 171k</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Break-even:</span>
                          <span className="font-bold">Mês 5</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded">
                      <p className="text-sm flex items-start">
                        <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2 mt-0.5" />
                        <span>
                          <strong>Riscos:</strong> Resistência da equipe, curva de aprendizado inicial, 
                          necessidade de ajustes no processo.
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Análise Preditiva */}
          <TabsContent value="preditivo">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Previsões e Tendências
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Renovação de Contratos</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-500">78%</div>
                      <p className="text-xs text-gray-500 mt-1">Probabilidade média</p>
                      <div className="mt-3 space-y-1">
                        <div className="text-xs">
                          <span className="text-gray-500">Contrato A:</span>
                          <span className="font-bold ml-1">92%</span>
                        </div>
                        <div className="text-xs">
                          <span className="text-gray-500">Contrato B:</span>
                          <span className="font-bold ml-1">71%</span>
                        </div>
                        <div className="text-xs">
                          <span className="text-gray-500">Contrato C:</span>
                          <span className="font-bold ml-1">69%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Risco de Glosa (30 dias)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-yellow-500">Médio</div>
                      <p className="text-xs text-gray-500 mt-1">R$ 156k em risco</p>
                      <div className="mt-3 space-y-1">
                        <div className="text-xs">
                          <span className="text-gray-500">TUSS:</span>
                          <span className="font-bold ml-1 text-red-500">Alto</span>
                        </div>
                        <div className="text-xs">
                          <span className="text-gray-500">Documentação:</span>
                          <span className="font-bold ml-1 text-yellow-500">Médio</span>
                        </div>
                        <div className="text-xs">
                          <span className="text-gray-500">Prazo:</span>
                          <span className="font-bold ml-1 text-green-500">Baixo</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Tempestividade Audesp</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-500">95%</div>
                      <p className="text-xs text-gray-500 mt-1">Chance de cumprir prazo</p>
                      <div className="mt-3 space-y-1">
                        <div className="text-xs">
                          <span className="text-gray-500">Próximo envio:</span>
                          <span className="font-bold ml-1">10/02</span>
                        </div>
                        <div className="text-xs">
                          <span className="text-gray-500">Campos OK:</span>
                          <span className="font-bold ml-1">38/40</span>
                        </div>
                        <div className="text-xs">
                          <span className="text-gray-500">Tempo médio:</span>
                          <span className="font-bold ml-1">3 dias</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Otimização */}
          <TabsContent value="otimizacao">
            <Card>
              <CardHeader>
                <CardTitle>Otimização de Recursos e Metas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded">
                    <h4 className="font-semibold mb-2">Realocação Sugerida de Metas</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      Baseado no desempenho histórico e capacidade instalada
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Unidade A: Cirurgias</span>
                        <div className="flex items-center">
                          <span className="text-sm text-gray-500 mr-2">150 → </span>
                          <span className="text-sm font-bold text-green-600">165</span>
                          <Badge className="ml-2 bg-green-100 text-green-800">+10%</Badge>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Unidade B: Consultas</span>
                        <div className="flex items-center">
                          <span className="text-sm text-gray-500 mr-2">3000 → </span>
                          <span className="text-sm font-bold text-blue-600">2850</span>
                          <Badge className="ml-2 bg-blue-100 text-blue-800">-5%</Badge>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Unidade C: Exames</span>
                        <div className="flex items-center">
                          <span className="text-sm text-gray-500 mr-2">5000 → </span>
                          <span className="text-sm font-bold text-green-600">5250</span>
                          <Badge className="ml-2 bg-green-100 text-green-800">+5%</Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 text-center bg-green-50 dark:bg-green-900/20 rounded">
                      <p className="text-sm text-gray-500">Melhoria Esperada</p>
                      <p className="text-2xl font-bold text-green-600">+8.5%</p>
                      <p className="text-xs text-gray-500">no atingimento geral</p>
                    </div>
                    <div className="p-3 text-center bg-blue-50 dark:bg-blue-900/20 rounded">
                      <p className="text-sm text-gray-500">Economia Projetada</p>
                      <p className="text-2xl font-bold text-blue-600">R$ 45k</p>
                      <p className="text-xs text-gray-500">por mês</p>
                    </div>
                  </div>

                  <Button className="w-full">
                    Aplicar Otimização Sugerida
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Histórico */}
          <TabsContent value="historico">
            <Card>
              <CardHeader>
                <CardTitle>Histórico de Consultas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {historico.map((item, index) => (
                    <div key={index} className="p-3 border rounded hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-medium text-sm">{item.pergunta}</p>
                          <p className="text-xs text-gray-500 mt-1">{item.resposta}</p>
                        </div>
                        <span className="text-xs text-gray-400 ml-4">{item.timestamp}</span>
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

export default OSSOracleAI;
