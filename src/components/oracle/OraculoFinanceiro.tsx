/**
 * Oráculo Financeiro - Assistente IA com OpenAI
 * Especializado em análise financeira hospitalar
 */

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Brain, Send, Loader2, Sparkles, TrendingUp, DollarSign, AlertCircle } from 'lucide-react';
import { consultarOraculoFinanceiro, perguntasSugeridas, OracleMessage } from '@/services/openai';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export const OraculoFinanceiro = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll para última mensagem
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Mensagem de boas-vindas
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        id: 'welcome',
        role: 'assistant',
        content: `👋 Olá! Sou o **Oráculo Financeiro** do Hospital Rede D'Or São Luiz - Barueri.

Estou aqui para ajudar você com:
- 📊 Análise de indicadores financeiros
- 💰 Estratégias de redução de glosas
- 📈 Otimização de rentabilidade
- 💸 Gestão de fluxo de caixa
- 🎯 Recomendações estratégicas

Como posso ajudá-lo hoje?`,
        timestamp: new Date()
      }]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setError(null);

    try {
      // Preparar histórico para OpenAI
      const historico: OracleMessage[] = messages
        .filter(m => m.id !== 'welcome')
        .map(m => ({
          role: m.role,
          content: m.content
        }));

      // Consultar OpenAI
      const response = await consultarOraculoFinanceiro(inputValue, historico);

      if (response.success && response.message) {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: response.message,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        setError(response.error || 'Erro ao obter resposta');
      }
    } catch (err) {
      console.error('Erro ao enviar mensagem:', err);
      setError('Erro ao comunicar com o Oráculo. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-full flex flex-col">
      <Card className="flex-1 flex flex-col border-purple-600">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950 dark:to-blue-950">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-600 rounded-full">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="flex items-center gap-2">
                Oráculo Financeiro
                <Badge className="bg-purple-600">
                  <Sparkles className="h-3 w-3 mr-1" />
                  IA Powered
                </Badge>
              </CardTitle>
              <CardDescription>
                Assistente inteligente especializado em análise financeira hospitalar
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          {/* Área de Mensagens */}
          <ScrollArea className="flex-1 p-6" ref={scrollRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-4 ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-muted'
                    }`}
                  >
                    {message.role === 'assistant' && (
                      <div className="flex items-center gap-2 mb-2">
                        <Brain className="h-4 w-4 text-purple-600" />
                        <span className="text-xs font-semibold text-purple-600">Oráculo</span>
                      </div>
                    )}
                    <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                    <div className={`text-xs mt-2 ${message.role === 'user' ? 'text-blue-100' : 'text-muted-foreground'}`}>
                      {message.timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-lg p-4 bg-muted">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin text-purple-600" />
                      <span className="text-sm text-muted-foreground">Oráculo está pensando...</span>
                    </div>
                  </div>
                </div>
              )}

              {error && (
                <div className="flex justify-center">
                  <div className="max-w-[80%] rounded-lg p-4 bg-red-50 dark:bg-red-950 border border-red-600">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-red-600" />
                      <span className="text-sm text-red-600">{error}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Perguntas Sugeridas */}
          {messages.length <= 1 && (
            <div className="p-4 border-t bg-muted/50">
              <div className="text-sm font-semibold mb-3 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-purple-600" />
                Perguntas Sugeridas:
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {perguntasSugeridas.slice(0, 6).map((suggestion, idx) => (
                  <Button
                    key={idx}
                    variant="outline"
                    size="sm"
                    className="justify-start text-left h-auto py-2 px-3"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <span className="text-xs line-clamp-2">{suggestion}</span>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input de Mensagem */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Digite sua pergunta sobre finanças..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
            <div className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              Powered by OpenAI GPT-5, CLAUDE 4.5 e GROK 5
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cards de Contexto */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        <Card className="border-green-600">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="h-4 w-4 text-green-600" />
              <span className="text-sm font-semibold">Faturamento</span>
            </div>
            <div className="text-2xl font-bold text-green-600">R$ 28,5M</div>
            <div className="text-xs text-muted-foreground">Mensal</div>
          </CardContent>
        </Card>

        <Card className="border-blue-600">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-semibold">EBITDA</span>
            </div>
            <div className="text-2xl font-bold text-blue-600">28.4%</div>
            <div className="text-xs text-muted-foreground">Margem</div>
          </CardContent>
        </Card>

        <Card className="border-red-600">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <span className="text-sm font-semibold">Glosas</span>
            </div>
            <div className="text-2xl font-bold text-red-600">8.3%</div>
            <div className="text-xs text-muted-foreground">Taxa</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OraculoFinanceiro;
