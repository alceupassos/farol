/**
 * Oráculo OPME - Assistente IA especializado em Redução de Glosas
 * Analisa dados de OPME e sugere melhorias específicas
 */

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Brain, Send, Loader2, Sparkles, Target, AlertTriangle, TrendingDown } from 'lucide-react';
import { conveniosAtivos } from '@/data/redeDorBarueri';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY || '';
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

// Contexto especializado em OPME
const OPME_CONTEXT = `
Você é o Oráculo OPME do Hospital Rede D'Or São Luiz - Barueri.
Você é um especialista em gestão de OPME (Órteses, Próteses e Materiais Especiais) com foco em REDUÇÃO DE GLOSAS.

DADOS ATUAIS DE GLOSAS OPME:
- Taxa de Glosa Geral OPME: 8.3% (META: <5%)
- Perdas Mensais: R$ 348.600
- Compliance TISS: 87% (META: 100%)
- Rastreabilidade UDI: 45% (META: 100%)
- Registro Anvisa OK: 91% (META: 100%)
- Tempo Médio Autorização: 6.2 dias (META: 5 dias)

GLOSAS POR CONVÊNIO:
1. BRADESCO (12.5%) - CRÍTICO
   - 45% glosas: Campo "Previsão de Uso OPME" não marcado
   - 28% glosas: Passo 3 incompleto ou TUSS ausente
   - 18% glosas: Anexo OPME não enviado
   - Economia potencial: R$ 487.000/mês

2. GNDI (9.1%) - ATENÇÃO
   - 52% glosas: Senha não obtida antes do procedimento
   - 31% glosas: Transação fora do autorizador
   - 11% glosas: Anexos clínicos ausentes
   - Economia potencial: R$ 161.000/mês

3. UNIMED (6.2%) - CONTROLADO
   - 38% glosas: Documentação incompleta
   - 29% glosas: Prazo de envio excedido
   - Economia potencial: R$ 98.000/mês

PRINCIPAIS CAUSAS DE GLOSAS:
1. Documentação incompleta (42%)
2. Falta de autorização prévia (28%)
3. Código TUSS incorreto (15%)
4. Rastreabilidade UDI ausente (10%)
5. Registro Anvisa vencido (5%)

ESTILO DE RESPOSTA:
- Seja EXTREMAMENTE específico e acionável
- Cite SEMPRE os dados reais do hospital
- Priorize IMPACTO FINANCEIRO (ROI)
- Forneça PLANOS DE AÇÃO detalhados
- Use NÚMEROS e PERCENTUAIS
- Seja DIRETO e OBJETIVO

FOCO: Reduzir glosas de 8.3% para 5% em 90 dias, economizando R$ 138.600/mês.
`;

const OraculoOPME = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `🎯 **Oráculo OPME Ativado**

Olá! Sou seu assistente especializado em **redução de glosas OPME**.

📊 **Status Atual:**
- Taxa de Glosa: **8.3%** (Meta: <5%)
- Perdas Mensais: **R$ 348.600**
- Economia Potencial: **R$ 746.000/mês**

🔴 **Convênios Críticos:**
1. **Bradesco** (12.5%) - Economia: R$ 487k/mês
2. **GNDI** (9.1%) - Economia: R$ 161k/mês

💡 **Como posso ajudar?**
- Analisar causas de glosas por convênio
- Sugerir planos de ação específicos
- Calcular ROI de melhorias
- Priorizar ações de maior impacto

**Pergunte algo como:**
"Como reduzir glosas do Bradesco?"
"Qual o plano para atingir 5% em 90 dias?"
"Quais as 3 ações prioritárias?"`,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    if (!OPENAI_API_KEY) {
      const errorMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: '⚠️ **Configuração Necessária**\n\nPara usar o Oráculo OPME com IA real, configure a variável de ambiente `VITE_OPENAI_API_KEY` no arquivo `.env`.\n\nEnquanto isso, posso fornecer respostas baseadas nos dados do hospital. Como posso ajudar?',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(OPENAI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: OPME_CONTEXT },
            ...messages.map(m => ({
              role: m.role === 'user' ? 'user' : 'assistant',
              content: m.content
            })),
            { role: 'user', content: input }
          ],
          temperature: 0.7,
          max_tokens: 1500
        })
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.choices[0].message.content,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Erro ao consultar OpenAI:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '❌ Erro ao processar sua pergunta. Por favor, tente novamente.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const perguntasSugeridas = [
    "Como reduzir glosas do Bradesco de 12.5% para 5%?",
    "Qual o plano de ação para atingir 5% em 90 dias?",
    "Quais as 3 ações prioritárias de maior ROI?",
    "Como melhorar compliance TISS de 87% para 100%?",
    "Qual o impacto de implementar rastreabilidade UDI?"
  ];

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Brain className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <CardTitle className="flex items-center gap-2">
                Oráculo OPME
                <Badge variant="outline" className="gap-1">
                  <Sparkles className="h-3 w-3" />
                  IA Especializada
                </Badge>
              </CardTitle>
              <CardDescription>
                Assistente especializado em redução de glosas OPME
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="destructive" className="gap-1">
              <TrendingDown className="h-3 w-3" />
              8.3% Glosa
            </Badge>
            <Badge variant="outline" className="gap-1">
              <Target className="h-3 w-3" />
              Meta: 5%
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 p-4" ref={scrollRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-4 ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    {message.content.split('\n').map((line, i) => (
                      <p key={i} className="mb-2 last:mb-0">
                        {line}
                      </p>
                    ))}
                  </div>
                  <div className="text-xs opacity-70 mt-2">
                    {message.timestamp.toLocaleTimeString('pt-BR', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg p-4">
                  <Loader2 className="h-5 w-5 animate-spin" />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="border-t p-4 space-y-3">
          <div className="flex flex-wrap gap-2">
            {perguntasSugeridas.map((pergunta, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => setInput(pergunta)}
                className="text-xs"
              >
                {pergunta}
              </Button>
            ))}
          </div>

          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Pergunte sobre glosas OPME..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button onClick={handleSend} disabled={isLoading || !input.trim()}>
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OraculoOPME;
