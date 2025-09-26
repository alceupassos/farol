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
  const [investimento, setInvestimento] = useState(50000);

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

  const rangeClass =
    'w-full mt-1 h-2 rounded-full bg-gradient-to-r from-blue-900/40 via-slate-800 to-blue-900/40 accent-blue-400 outline-none transition focus:ring-2 focus:ring-blue-400';
  const inputClass =
    'w-full mt-1 rounded-2xl border border-blue-500/40 bg-slate-950/70 px-4 py-3 text-slate-100 shadow-[0_0_18px_rgba(37,99,235,0.25)] placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400';
  const cardDarkSurface = 'bg-slate-950/80 border border-white/10 text-slate-100 backdrop-blur-md';
  const panelDarkSurface = 'bg-slate-900/70 border border-white/10 text-slate-200';
  const formatCurrency = (valor: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(valor);
  const resultadoSimulacao = {
    roiPercent: 342,
    paybackMeses: 4.2,
    economiaAnual: 171000,
    breakeven: 'Mês 5'
  };

  return (
    <MainLayout>
      <div className="space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="flex items-center text-3xl font-bold text-white">
              <Brain className="mr-3 h-8 w-8 text-purple-400" />
              Oráculo IA - Google Gemini
            </h1>
            <p className="mt-1 text-slate-400">
              Análises preditivas e recomendações inteligentes para gestão OSS
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="border-white/20 bg-slate-900/70 text-slate-100">
              <History className="mr-2 h-4 w-4" />
              Histórico
            </Button>
            <Button variant="outline" size="sm" className="border-white/20 bg-slate-900/70 text-slate-100">
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
          </div>
        </div>

        {/* Interface de Pergunta */}
        <Card className={cardDarkSurface}>
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <MessageSquare className="mr-2 h-5 w-5 text-fuchsia-300" />
              Faça sua pergunta em linguagem natural
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col gap-3 lg:flex-row">
                <input
                  type="text"
                  value={pergunta}
                  onChange={(e) => setPergunta(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handlePergunta()}
                  placeholder="Pergunte sobre glosas, metas, ROI ou riscos..."
                  className={inputClass}
                />
                <Button
                  onClick={handlePergunta}
                  disabled={carregando}
                  className="rounded-2xl bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 px-6 py-3 text-white shadow-[0_10px_30px_rgba(37,99,235,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_15px_35px_rgba(37,99,235,0.4)] disabled:opacity-60"
                >
                  {carregando ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    <div className="flex items-center gap-2 text-sm font-semibold">
                      <Send className="h-4 w-4" />
                      Consultar IA
                    </div>
                  )}
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {perguntasSugeridas.map((p, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => setPergunta(p)}
                    className="rounded-full border border-white/10 bg-slate-900/70 text-xs text-slate-100 transition hover:border-blue-400/60 hover:bg-slate-900/90"
                  >
                    <Sparkles className="mr-1 h-3 w-3 text-fuchsia-300" />
                    {p}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resposta da IA */}
        {respostaIA && (
          <Card className="border border-emerald-500/30 bg-slate-950/80 text-slate-100">
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
                <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                  <div className="rounded-2xl border border-purple-500/30 bg-slate-900/70 p-4 shadow-[0_12px_30px_rgba(147,51,234,0.18)]">
                    <p className="text-sm text-purple-200">Impacto Financeiro</p>
                    <p className="text-2xl font-semibold text-purple-300">
                      {formatCurrency(respostaIA.metricas.impactoFinanceiro)}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-blue-500/30 bg-slate-900/70 p-4 shadow-[0_12px_30px_rgba(59,130,246,0.18)]">
                    <p className="text-sm text-blue-200">Tempo Implementação</p>
                    <p className="text-2xl font-semibold text-blue-300">
                      {respostaIA.metricas.tempoImplementacao} dias
                    </p>
                  </div>
                  <div className="rounded-2xl border border-emerald-500/30 bg-slate-900/70 p-4 shadow-[0_12px_30px_rgba(16,185,129,0.18)]">
                    <p className="text-sm text-emerald-200">Confiança</p>
                    <p className="text-2xl font-semibold text-emerald-300">
                      {respostaIA.metricas.confianca}%
                    </p>
                  </div>
                  <div className="rounded-2xl border border-amber-500/30 bg-slate-900/70 p-4 shadow-[0_12px_30px_rgba(245,158,11,0.18)]">
                    <p className="text-sm text-amber-200">Complexidade</p>
                    <p className="text-2xl font-semibold text-amber-300 capitalize">
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
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/70 p-3 shadow-sm"
                      >
                        <span className="text-sm text-slate-200">{ev.fonte}</span>
                        <div className="flex items-center">
                          <div className="mr-2 h-2 w-28 rounded-full bg-slate-800">
                            <div
                              className="h-2 rounded-full bg-gradient-to-r from-blue-400 to-sky-400"
                              style={{ width: `${ev.confianca}%` }}
                            />
                          </div>
                          <span className="text-xs text-slate-400">{ev.confianca}%</span>
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
                      <div
                        key={index}
                        className="flex items-center rounded-2xl border border-white/10 bg-slate-900/70 p-3 shadow-sm"
                      >
                        <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 text-sm font-bold text-white">
                          {index + 1}
                        </div>
                        <span className="flex-1 text-slate-200">{acao}</span>
                        <Button size="sm" variant="outline" className="rounded-full border-white/20 bg-slate-900/70 text-slate-100">
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
          <TabsList className="bg-slate-900/70 text-slate-200 border border-white/10">
            <TabsTrigger value="simulador">Simulador What-If</TabsTrigger>
            <TabsTrigger value="preditivo">Análise Preditiva</TabsTrigger>
            <TabsTrigger value="otimizacao">Otimização</TabsTrigger>
            <TabsTrigger value="historico">Histórico</TabsTrigger>
          </TabsList>

          {/* Simulador What-If */}
          <TabsContent value="simulador">
            <Card className={cardDarkSurface}>
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <Calculator className="h-5 w-5 mr-2" />
                  Simulador de Cenários
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-5">
                    <h4 className="text-lg font-semibold text-white">Parâmetros de Simulação</h4>

                    <div>
                      <label className="text-sm font-medium text-slate-200">
                        Redução de Taxa de Glosa (%)
                      </label>
                      <input type="range" min="0" max="5" step="0.1" className={`${rangeClass} slider-range`} />
                      <div className="flex justify-between text-xs text-slate-400">
                        <span>0%</span>
                        <span>2.5%</span>
                        <span>5%</span>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-slate-200">
                        Aumento de Produtividade (%)
                      </label>
                      <input type="range" min="0" max="30" step="1" className={`${rangeClass} slider-range`} />
                      <div className="flex justify-between text-xs text-slate-400">
                        <span>0%</span>
                        <span>15%</span>
                        <span>30%</span>
                      </div>
                    </div>

                    <div className="space-y-1 text-slate-200">
                      <label className="text-sm font-medium text-slate-200">
                        Investimento (R$)
                      </label>
                      <input
                        type="number"
                        min={0}
                        value={investimento}
                        onChange={(e) => setInvestimento(Number(e.target.value) || 0)}
                        className={inputClass}
                      />
                      <p className="text-xs text-slate-500">
                        Valor planejado em automações, capacitação e revisão de processos.
                      </p>
                    </div>

                    <Button className="w-full rounded-2xl bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 text-white shadow-[0_14px_30px_rgba(56,189,248,0.25)] hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(79,70,229,0.3)]">
                      <Zap className="mr-2 h-4 w-4" />
                      Simular Cenário
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-white">Resultado da Simulação</h4>

                    <div className="rounded-3xl border border-emerald-500/40 bg-slate-900/80 p-6 shadow-[0_20px_45px_rgba(16,185,129,0.15)] ring-1 ring-emerald-500/20">
                      <div className="space-y-4 text-slate-100">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-400">ROI Esperado</span>
                          <span className="text-2xl font-bold text-emerald-300">{resultadoSimulacao.roiPercent}%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-400">Payback estimado</span>
                          <span className="text-lg font-semibold text-slate-100">{resultadoSimulacao.paybackMeses} meses</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-400">Economia Anual</span>
                          <span className="text-lg font-semibold text-slate-100">{formatCurrency(resultadoSimulacao.economiaAnual)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-400">Ponto de equilíbrio</span>
                          <span className="text-lg font-semibold text-slate-100">{resultadoSimulacao.breakeven}</span>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-3xl border border-amber-400/40 bg-slate-900/80 p-4 text-slate-100 shadow-[0_20px_40px_rgba(250,204,21,0.15)]">
                      <p className="flex items-start gap-3 text-sm text-slate-200">
                        <AlertTriangle className="h-5 w-5 text-amber-300" />
                        <span>
                          <strong>Riscos monitorados:</strong> Resistência inicial das equipes, curva de aprendizagem de novos fluxos,
                          necessidade de ajustes finos no checklist digital e validações em tempo real.
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
            <Card className={cardDarkSurface}>
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <TrendingUp className="h-5 w-5 mr-2 text-blue-300" />
                  Previsões e Tendências
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <Card className="rounded-2xl border border-emerald-500/30 bg-slate-900/70 text-slate-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm text-white">Renovação de Contratos</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-emerald-300">78%</div>
                      <p className="mt-1 text-xs text-slate-400">Probabilidade média</p>
                      <div className="mt-3 space-y-1 text-xs">
                        <div>
                          <span className="text-slate-400">Contrato A:</span>
                          <span className="ml-1 font-bold text-white">92%</span>
                        </div>
                        <div>
                          <span className="text-slate-400">Contrato B:</span>
                          <span className="ml-1 font-bold text-white">71%</span>
                        </div>
                        <div>
                          <span className="text-slate-400">Contrato C:</span>
                          <span className="ml-1 font-bold text-white">69%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="rounded-2xl border border-amber-500/30 bg-slate-900/70 text-slate-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm text-white">Risco de Glosa (30 dias)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-amber-300">Médio</div>
                      <p className="mt-1 text-xs text-slate-400">R$ 156k em risco</p>
                      <div className="mt-3 space-y-1 text-xs">
                        <div>
                          <span className="text-slate-400">TUSS:</span>
                          <span className="ml-1 font-bold text-rose-300">Alto</span>
                        </div>
                        <div>
                          <span className="text-slate-400">Documentação:</span>
                          <span className="ml-1 font-bold text-amber-300">Médio</span>
                        </div>
                        <div>
                          <span className="text-slate-400">Prazo:</span>
                          <span className="ml-1 font-bold text-emerald-300">Baixo</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="rounded-2xl border border-blue-500/30 bg-slate-900/70 text-slate-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm text-white">Tempestividade Audesp</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-emerald-300">95%</div>
                      <p className="mt-1 text-xs text-slate-400">Chance de cumprir prazo</p>
                      <div className="mt-3 space-y-1 text-xs">
                        <div>
                          <span className="text-slate-400">Próximo envio:</span>
                          <span className="ml-1 font-bold text-white">10/02</span>
                        </div>
                        <div>
                          <span className="text-slate-400">Campos OK:</span>
                          <span className="ml-1 font-bold text-white">38/40</span>
                        </div>
                        <div>
                          <span className="text-slate-400">Tempo médio:</span>
                          <span className="ml-1 font-bold text-white">3 dias</span>
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
            <Card className={cardDarkSurface}>
              <CardHeader>
                <CardTitle className="text-white">Otimização de Recursos e Metas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-slate-200">
                  <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                    <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold">
                      <Sparkles className="h-4 w-4 text-fuchsia-300" />Top 3 Ações Recomendadas
                    </h4>
                    <div className="space-y-2 text-sm">
                      {[
                        {
                          titulo: 'Automatizar validação TUSS',
                          impacto: 'Reduz 55% das glosas técnicas',
                          roi: 'ROI estimado 340%'
                        },
                        {
                          titulo: 'Checklist digital de documentação',
                          impacto: 'Diminui reenvio em 42%',
                          roi: 'Economia R$ 280k'
                        },
                        {
                          titulo: 'Alertas de prazo proativo',
                          impacto: 'Evita multa e atrasos Audesp',
                          roi: 'Payback em 3 meses'
                        }
                      ].map((acao, index) => (
                        <div
                          key={acao.titulo}
                          className="flex items-start gap-3 rounded-2xl bg-slate-950/80 p-3 shadow-sm"
                        >
                          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-sm font-semibold text-white">
                            {index + 1}
                          </span>
                          <div className="flex-1">
                            <p className="font-medium text-white">{acao.titulo}</p>
                            <p className="text-xs text-slate-400">{acao.impacto} • {acao.roi}</p>
                          </div>
                          <Badge className="bg-white/10 text-slate-100">Alta</Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                    <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold">
                      <BarChart3 className="h-4 w-4 text-sky-300" />Principais causas (Pareto)
                    </h4>
                    <div className="grid gap-2 text-xs text-slate-300">
                      <div className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-2">
                        <span>Código TUSS incorreto</span>
                        <span className="text-emerald-300">35%</span>
                      </div>
                      <div className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-2">
                        <span>Documentação incompleta</span>
                        <span className="text-emerald-300">28%</span>
                      </div>
                      <div className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-2">
                        <span>Prazos expirados</span>
                        <span className="text-emerald-300">15%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Histórico */}
          <TabsContent value="historico">
            <Card className={cardDarkSurface}>
              <CardHeader>
                <CardTitle className="text-white">Histórico de Consultas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-slate-200">
                  {historico.map((log, idx) => (
                    <div key={idx} className="rounded-xl border border-white/10 bg-slate-900/80 p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-medium text-sm">{log.pergunta}</p>
                          <p className="text-xs text-slate-400">{log.resposta}</p>
                        </div>
                        <span className="text-xs text-slate-400 ml-4">{log.timestamp}</span>
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
