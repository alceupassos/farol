/**
 * Serviço de integração com OpenAI
 * Para Oráculo Financeiro do Hospital Rede D'Or
 */

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY || '';
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

export interface OracleMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface OracleResponse {
  success: boolean;
  message?: string;
  error?: string;
}

/**
 * Contexto do Hospital Rede D'Or para o Oráculo
 */
const HOSPITAL_CONTEXT = `
Você é o Oráculo Financeiro do Hospital Rede D'Or São Luiz - Barueri.
Você é um assistente especializado em análise financeira hospitalar com foco em:

DADOS ATUAIS DO HOSPITAL (Dezembro 2024):
- Nome: Hospital Rede D'Or São Luiz - Barueri
- Leitos: 287 (68 UTI, 156 enfermaria, 63 apartamento)
- Ocupação: 82.4% (Meta: 85%)
- Acreditação: ONA Nível 3 + JCI
- Faturamento Mensal: R$ 28,5 milhões
- Margem EBITDA: 28.4% (Meta: 30%)
- Taxa de Glosa Geral: 8.3% (Meta: <6%)
- Inadimplência: 3.2% (Meta: <2.5%)
- Ticket Médio: R$ 4.850
- Tempo Médio de Permanência: 3.2 dias

PRINCIPAIS CONVÊNIOS E INDICADORES:
1. Unimed (35.2%) - Glosa 6.2% - Receita: R$ 10,0M - Status: ✅ DENTRO DA META
2. Bradesco (22.8%) - Glosa 12.5% - Receita: R$ 6,5M - Status: 🔴 CRÍTICO (Meta: <8%)
3. SulAmérica (18.5%) - Glosa 4.8% - Receita: R$ 5,3M - Status: ✅ EXCELENTE
4. GNDI (12.3%) - Glosa 9.1% - Receita: R$ 3,5M - Status: ⚠️ ATENÇÃO (Meta: <7%)
5. Hapvida (8.7%) - Glosa 7.4% - Receita: R$ 2,5M - Status: ⚠️ ATENÇÃO

INDICADORES CRÍTICOS A MONITORAR:
📊 FINANCEIROS:
- ROI: 18.2% (Meta: >20%)
- Margem Líquida: 12.8%
- Giro do Ativo: 1.4x
- Prazo Médio de Recebimento: 45 dias (Meta: <35 dias)

🏥 OPERACIONAIS:
- Taxa de Ocupação UTI: 89.5%
- Taxa de Ocupação Enfermaria: 78.2%
- Índice de Satisfação: 4.2/5.0
- Tempo Médio de Faturamento: 8 dias (Meta: <5 dias)

💰 GLOSAS POR CATEGORIA:
- Documentação Incompleta: 35%
- Procedimentos Não Autorizados: 28%
- Divergências de Valores: 22%
- OPME Não Aprovados: 15%

INSTRUÇÕES ESPECIAIS PARA RESPOSTAS:
1. SEMPRE inclua indicadores atuais relevantes à pergunta
2. SEMPRE mencione metas e status (✅🔴⚠️)
3. SEMPRE forneça dados comparativos (mês anterior, ano anterior)
4. SEMPRE sugira KPIs específicos para monitoramento
5. SEMPRE calcule impacto financeiro estimado das recomendações
6. Use emojis para destacar status e prioridades
7. Inclua prazos realistas para implementação
8. Mencione riscos e oportunidades

FORMATO DE RESPOSTA OBRIGATÓRIO:
📊 **INDICADORES ATUAIS:**
[Dados relevantes à pergunta com status atual]

🔴 **SITUAÇÃO CRÍTICA:**
[Destaque os problemas mais urgentes com valores específicos]

🎯 **ANÁLISE E RECOMENDAÇÕES:**
[Sua análise detalhada com ações prioritárias]

💰 **POTENCIAL DE MELHORIA:**
[Quanto pode ser economizado/ganho com números específicos]

📈 **IMPACTO ESTIMADO:**
[Projeções financeiras detalhadas - mensal, trimestral, anual]

⏰ **CRONOGRAMA DE IMPLEMENTAÇÃO:**
[Prazos realistas para cada ação]

🔍 **KPIs PARA MONITORAR:**
[Indicadores específicos com metas numéricas]

🚨 **ALERTAS E RISCOS:**
[O que pode dar errado se não agir]

Responda sempre em português do Brasil, com foco em decisões estratégicas para o Diretor Geral.
`;

/**
 * Envia pergunta ao Oráculo Financeiro
 */
export async function consultarOraculoFinanceiro(
  pergunta: string,
  historicoConversa: OracleMessage[] = []
): Promise<OracleResponse> {
  try {
    if (!OPENAI_API_KEY) {
      throw new Error('VITE_OPENAI_API_KEY não configurada. Configure no arquivo .env');
    }

    const messages: OracleMessage[] = [
      { role: 'system', content: HOSPITAL_CONTEXT },
      ...historicoConversa,
      { role: 'user', content: pergunta }
    ];

    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: messages,
        temperature: 0.7,
        max_tokens: 1000,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('OpenAI API Error:', errorData);
      throw new Error(`API Error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    
    if (!data.choices || data.choices.length === 0) {
      throw new Error('Resposta vazia da API');
    }

    const message = data.choices[0].message.content;

    return {
      success: true,
      message: message
    };

  } catch (error) {
    console.error('Erro ao consultar Oráculo:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido ao consultar o Oráculo'
    };
  }
}

/**
 * Perguntas sugeridas para o Diretor Geral
 */
export const perguntasSugeridas = [
  "Como posso reduzir a taxa de glosa do Bradesco de 12.5% para 5%?",
  "Qual convênio tem melhor rentabilidade e por quê?",
  "Como melhorar meu fluxo de caixa em 30 dias?",
  "Qual o impacto de aumentar a ocupação para 85%?",
  "Quais são as 3 ações prioritárias para aumentar a margem EBITDA?",
  "Como reduzir custos operacionais sem afetar a qualidade?",
  "Qual a melhor estratégia para reduzir inadimplência?",
  "Devo investir mais em OPME ou em tecnologia?",
  "Como otimizar o mix de convênios para aumentar rentabilidade?",
  "Qual o potencial de economia com gestão de glosas?"
];
