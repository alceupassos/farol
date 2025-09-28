import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Brain, Send, Sparkles, X } from 'lucide-react';
import { cn } from '@/lib/utils';

// Base de conhecimento fictícia para diferentes módulos
const oracleKnowledge = {
  oss: {
    greetings: [
      'Olá! Sou o Oráculo IA especializado em Gestão Contratual OSS. Como posso ajudar com suas dúvidas sobre contratos, compliance e gestão estratégica?',
      'Bem-vindo ao módulo OSS! Estou aqui para auxiliar com análises preditivas, gestão de glosas e otimização contratual.'
    ],
    responses: {
      'contrato': 'Os contratos OSS seguem a Lei 9.637/98 e regulamentações específicas. Recomendo revisar os indicadores de desempenho e metas pactuadas trimestralmente.',
      'glosa': 'As glosas podem ser reduzidas em até 30% com automação de processos e auditoria prévia. Nossa IA identifica padrões de glosa com 94% de precisão.',
      'compliance': 'O compliance OSS requer monitoramento de 22 indicadores obrigatórios. Mantenha documentação atualizada e realize auditorias mensais.',
      'predicao': 'Baseado nos dados históricos, a demanda assistencial deve crescer 12% no próximo trimestre. Recomendo reforçar a equipe de enfermagem.',
      'financeiro': 'O ROI médio dos projetos OSS é de 214%. Os melhores resultados vêm de automação de glosas e otimização de processos.'
    }
  },
  hospital: {
    greetings: [
      'Olá! Sou o Oráculo Hospitalar. Especialista em gestão hospitalar, posso ajudar com indicadores de qualidade, gestão de leitos e otimização de processos.',
      'Bem-vindo ao módulo Hospitalar! Auxilio com dashboards operacionais, gestão financeira e compliance hospitalar.'
    ],
    responses: {
      'leitos': 'A taxa de ocupação ideal é de 85%. Acima disso, considere expansão ou otimização de processos. Nossa IA pode prever ocupação com 96% de acurácia.',
      'qualidade': 'Indicadores de qualidade: tempo de permanência médio deve ser < 4 dias, taxa de infecção < 2%. Monitore diariamente.',
      'financeiro': 'Faturamento SUS representa 68% da receita. Foque em redução de glosas e otimização de OPME para melhorar margens.',
      'processos': 'Implemente protocolos padronizados para reduzir variabilidade. Nossa IA identifica gargalos com 87% de precisão.'
    }
  },
  gestor: {
    greetings: [
      'Olá! Sou o Oráculo Gestor Público. Especialista em gestão municipal, posso ajudar com indicadores de saúde pública e tomada de decisões estratégicas.',
      'Bem-vindo ao módulo Gestor! Auxilio com dashboards executivos, análise de população e gestão de recursos públicos.'
    ],
    responses: {
      'epidemiologia': 'Baseado nos dados, há aumento de 15% em casos de dengue. Recomendo intensificar ações de prevenção e vigilância.',
      'recursos': 'O orçamento de saúde representa 22% do total municipal. Priorize APS e atenção especializada para melhor custo-benefício.',
      'indicadores': 'Meta de cobertura vacinal > 95%. Regiões com cobertura < 90% precisam de intervenção imediata.',
      'planejamento': 'Para 2025, projete crescimento populacional de 2.1%. Considere expansão de UBS em regiões de maior crescimento.'
    }
  }
};

interface FakeOracleProps {
  module: 'oss' | 'hospital' | 'gestor' | 'laboratorio' | 'medico' | 'paciente';
  context?: string;
  className?: string;
}

export const FakeOracle: React.FC<FakeOracleProps> = ({
  module,
  context = 'geral',
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{type: 'user' | 'oracle', content: string, timestamp: Date}>>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const knowledge = oracleKnowledge[module] || oracleKnowledge.oss;
  const greeting = knowledge.greetings[Math.floor(Math.random() * knowledge.greetings.length)];

  // Adicionar greeting inicial quando abrir
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        setMessages([{
          type: 'oracle',
          content: greeting,
          timestamp: new Date()
        }]);
      }, 500);
    }
  }, [isOpen, greeting, messages.length]);

  // Scroll automático para o final das mensagens
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // Buscar resposta específica
    for (const [key, response] of Object.entries(knowledge.responses)) {
      if (lowerMessage.includes(key)) {
        return response;
      }
    }

    // Respostas genéricas baseadas no contexto
    const genericResponses = [
      'Excelente pergunta! Baseado nos dados disponíveis, posso sugerir que você monitore os indicadores de desempenho regularmente.',
      'Essa é uma área crítica. Recomendo revisar os protocolos estabelecidos e considerar uma auditoria dos processos.',
      'Para otimizar resultados, foque nos indicadores de maior impacto. Nossa IA pode ajudar a identificar as prioridades.',
      'Essa informação é estratégica. Considere agendar uma reunião com a equipe técnica para discutir os próximos passos.',
      'Baseado nas melhores práticas, sugiro implementar as recomendações da nossa análise preditiva.'
    ];

    return genericResponses[Math.floor(Math.random() * genericResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;

    const userMessage = currentMessage;
    setCurrentMessage('');
    setIsTyping(true);

    // Adicionar mensagem do usuário
    setMessages(prev => [...prev, {
      type: 'user',
      content: userMessage,
      timestamp: new Date()
    }]);

    // Simular delay de resposta
    setTimeout(() => {
      const response = generateResponse(userMessage);
      setMessages(prev => [...prev, {
        type: 'oracle',
        content: response,
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Botão flutuante */}
      <Button
        onClick={() => setIsOpen(true)}
        className={cn(
          'fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50',
          'bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700',
          className
        )}
        title="Consultar Oráculo IA"
      >
        <Brain className="h-6 w-6" />
      </Button>

      {/* Modal do chat */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <Card className="w-full max-w-2xl max-h-[80vh] flex flex-col bg-slate-900 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b border-slate-700">
              <CardTitle className="flex items-center gap-2 text-white">
                <Brain className="h-5 w-5 text-purple-400" />
                Oráculo IA - {module.toUpperCase()}
                <Badge className="bg-purple-500/20 text-purple-200">Online</Badge>
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col p-0">
              {/* Área de mensagens */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={cn(
                      'flex',
                      message.type === 'user' ? 'justify-end' : 'justify-start'
                    )}
                  >
                    <div
                      className={cn(
                        'max-w-[80%] rounded-2xl px-4 py-2',
                        message.type === 'user'
                          ? 'bg-purple-600 text-white'
                          : 'bg-slate-800 text-slate-200 border border-slate-700'
                      )}
                    >
                      <p className="text-sm">{message.content}</p>
                      <span className="text-xs opacity-70 mt-1 block">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-slate-800 text-slate-200 border border-slate-700 rounded-2xl px-4 py-2">
                      <div className="flex items-center gap-1">
                        <Sparkles className="h-3 w-3 animate-pulse" />
                        <span className="text-sm">Oráculo está pensando...</span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input de mensagem */}
              <div className="p-4 border-t border-slate-700">
                <div className="flex gap-2">
                  <Input
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Digite sua pergunta sobre o módulo..."
                    className="flex-1 bg-slate-800 border-slate-600 text-white placeholder:text-slate-400"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!currentMessage.trim() || isTyping}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>

                {/* Sugestões rápidas */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {['Indicadores', 'Otimização', 'Previsões', 'Relatórios'].map((suggestion) => (
                    <Button
                      key={suggestion}
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentMessage(suggestion)}
                      className="text-xs border-slate-600 text-slate-300 hover:bg-slate-800"
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};
