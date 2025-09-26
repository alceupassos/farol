// Oráculo IA com Google Gemini - OSS BHCL

import { GoogleGenerativeAI } from '@google/generative-ai';
import { supabase } from '@/integrations/supabase/client';

export class OracleAI {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor() {
    const apiKey = process.env.VITE_GEMINI_API_KEY || '';
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ 
      model: 'gemini-1.5-flash',
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
      }
    });
  }

  // ==================== ANÁLISES PREDITIVAS ====================
  
  async preverRenovacaoContrato(contractId: string): Promise<{
    probabilidade: number;
    fatores: Array<{fator: string; impacto: string; peso: number}>;
    recomendacoes: string[];
    confianca: number;
  }> {
    try {
      // Buscar dados históricos do contrato
      const { data: contrato } = await supabase
        .from('oss_contracts')
        .select('*')
        .eq('id', contractId)
        .single();

      const { data: metas } = await supabase
        .from('oss_contract_metas')
        .select('*')
        .eq('contract_id', contractId);

      const { data: glosas } = await supabase
        .from('oss_glosas')
        .select('*')
        .eq('contract_id', contractId);

      const prompt = `
        Analise os dados do contrato de gestão OSS e preveja a probabilidade de renovação:
        
        Contrato: ${JSON.stringify(contrato)}
        Metas Atingidas: ${metas?.filter(m => m.status === 'atingida').length}/${metas?.length}
        Taxa de Glosa Média: ${this.calcularTaxaGlosa(glosas)}%
        
        Retorne uma análise estruturada com:
        1. Probabilidade de renovação (0-100%)
        2. Principais fatores que influenciam (positivos e negativos)
        3. Recomendações específicas para aumentar a probabilidade
        4. Nível de confiança na previsão
        
        Formato JSON esperado:
        {
          "probabilidade": número,
          "fatores": [{"fator": string, "impacto": "positivo/negativo", "peso": número}],
          "recomendacoes": [string],
          "confianca": número
        }
      `;

      const result = await this.model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      
      return JSON.parse(text);
    } catch (error) {
      console.error('Erro ao prever renovação:', error);
      throw error;
    }
  }

  async analisarRiscoGlosa(procedimentos: any[]): Promise<{
    risco: 'baixo' | 'medio' | 'alto';
    probabilidade: number;
    motivosPotenciais: string[];
    valorEstimado: number;
    acoesPrevencao: string[];
  }> {
    try {
      const prompt = `
        Analise o risco de glosa para os seguintes procedimentos SUS:
        ${JSON.stringify(procedimentos)}
        
        Considere:
        - Códigos TUSS/SIGTAP
        - Documentação necessária
        - Prazos de envio
        - Histórico de glosas similares
        
        Retorne análise com risco, probabilidade, motivos potenciais e ações de prevenção.
      `;

      const result = await this.model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      
      return JSON.parse(text);
    } catch (error) {
      console.error('Erro ao analisar risco de glosa:', error);
      throw error;
    }
  }

  // ==================== SIMULADORES WHAT-IF ====================

  async simularImpactoGlosa(cenarios: {
    taxaGlosaAtual: number;
    reducaoEsperada: number;
    custoImplementacao: number;
    tempoImplementacao: number;
  }): Promise<{
    roi: number;
    payback: number;
    economiaAnual: number;
    breakeven: string;
    viabilidade: 'alta' | 'media' | 'baixa';
    explicacao: string;
  }> {
    try {
      const prompt = `
        Simule o impacto financeiro da redução de glosas:
        
        Taxa de Glosa Atual: ${cenarios.taxaGlosaAtual}%
        Redução Esperada: ${cenarios.reducaoEsperada}%
        Custo de Implementação: R$ ${cenarios.custoImplementacao}
        Tempo de Implementação: ${cenarios.tempoImplementacao} dias
        
        Calcule ROI, payback, economia anual e viabilidade do projeto.
        Considere faturamento médio mensal de R$ 2.5M.
      `;

      const result = await this.model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      
      return JSON.parse(text);
    } catch (error) {
      console.error('Erro ao simular impacto:', error);
      throw error;
    }
  }

  async simularRealocacaoMetas(metas: any[], restricoes: any): Promise<{
    alocacaoOtima: Array<{unidade: string; meta: number; recursos: number}>;
    melhoriaEsperada: number;
    riscos: string[];
    planoImplementacao: string[];
  }> {
    try {
      const prompt = `
        Otimize a alocação de metas entre unidades para maximizar o atingimento:
        
        Metas Atuais: ${JSON.stringify(metas)}
        Restrições: ${JSON.stringify(restricoes)}
        
        Use algoritmos de otimização para sugerir a melhor distribuição de recursos e metas.
        Considere capacidade instalada, histórico de desempenho e recursos disponíveis.
      `;

      const result = await this.model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      
      return JSON.parse(text);
    } catch (error) {
      console.error('Erro ao simular realocação:', error);
      throw error;
    }
  }

  // ==================== PERGUNTAS EM LINGUAGEM NATURAL ====================

  async responderPergunta(pergunta: string, contexto?: any): Promise<{
    resposta: string;
    evidencias: Array<{fonte: string; trecho: string; confianca: number}>;
    acoesSugeridas: string[];
    graficos?: any[];
  }> {
    try {
      // Buscar contexto relevante
      const contextoDados = await this.buscarContextoRelevante(pergunta);
      
      const prompt = `
        Você é um especialista em gestão de OSS (Organização Social de Saúde).
        
        Pergunta: ${pergunta}
        
        Contexto disponível:
        ${JSON.stringify(contextoDados)}
        ${contexto ? JSON.stringify(contexto) : ''}
        
        Responda de forma clara e estruturada, incluindo:
        1. Resposta direta à pergunta
        2. Evidências que suportam a resposta
        3. Ações sugeridas
        4. Sugestões de visualizações (se aplicável)
        
        Use dados reais quando disponíveis e seja específico nas recomendações.
      `;

      const result = await this.model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      
      // Parse e estrutura a resposta
      return this.estruturarResposta(text);
    } catch (error) {
      console.error('Erro ao responder pergunta:', error);
      throw error;
    }
  }

  // ==================== ANÁLISES ESPECÍFICAS ====================

  async analisarTempestividadeAudesp(historico: any[]): Promise<{
    tendencia: 'melhorando' | 'estavel' | 'piorando';
    proximoPrazo: Date;
    riscoAtraso: number;
    camposCriticos: string[];
    automacoesSugeridas: string[];
  }> {
    try {
      const prompt = `
        Analise o histórico de envios Audesp e identifique:
        1. Tendência de tempestividade
        2. Risco de atraso no próximo envio
        3. Campos que frequentemente geram erros
        4. Sugestões de automação
        
        Histórico: ${JSON.stringify(historico)}
      `;

      const result = await this.model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      
      return JSON.parse(text);
    } catch (error) {
      console.error('Erro ao analisar Audesp:', error);
      throw error;
    }
  }

  async otimizarRecuperacaoGlosas(glosas: any[]): Promise<{
    prioridades: Array<{id: string; motivo: string; valor: number; probabilidadeRecuperacao: number}>;
    estrategia: string;
    recursosNecessarios: string[];
    cronograma: Array<{fase: string; prazo: string; acao: string}>;
  }> {
    try {
      const prompt = `
        Analise as glosas e crie um plano otimizado de recuperação:
        
        Glosas: ${JSON.stringify(glosas)}
        
        Priorize por:
        1. Probabilidade de recuperação
        2. Valor financeiro
        3. Prazo para recurso
        4. Complexidade do processo
        
        Sugira estratégia, recursos e cronograma.
      `;

      const result = await this.model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      
      return JSON.parse(text);
    } catch (error) {
      console.error('Erro ao otimizar recuperação:', error);
      throw error;
    }
  }

  // ==================== HELPERS PRIVADOS ====================

  private calcularTaxaGlosa(glosas: any[]): number {
    if (!glosas || glosas.length === 0) return 0;
    
    const totalApresentado = glosas.reduce((sum, g) => sum + g.valor_apresentado, 0);
    const totalGlosado = glosas.reduce((sum, g) => sum + g.valor_glosado, 0);
    
    return totalApresentado > 0 ? (totalGlosado / totalApresentado * 100) : 0;
  }

  private async buscarContextoRelevante(pergunta: string): Promise<any> {
    // Implementar busca semântica no banco de dados
    // Por enquanto, retorna dados mockados
    return {
      metasContratuais: { atingidas: 10, total: 12 },
      taxaGlosa: 3.2,
      tempestividadeAudesp: 98,
      npsGovernamental: 8.2
    };
  }

  private estruturarResposta(textoIA: string): any {
    try {
      // Tenta fazer parse se for JSON
      return JSON.parse(textoIA);
    } catch {
      // Se não for JSON, estrutura a resposta
      return {
        resposta: textoIA,
        evidencias: [],
        acoesSugeridas: [],
        graficos: []
      };
    }
  }

  // ==================== GOVERNANÇA E LOGS ====================

  async registrarConsulta(pergunta: string, resposta: any): Promise<void> {
    try {
      await supabase.from('oss_ai_logs').insert({
        tipo: 'consulta',
        pergunta,
        resposta: JSON.stringify(resposta),
        modelo: 'gemini-1.5-flash',
        timestamp: new Date().toISOString(),
        usuario: (await supabase.auth.getUser()).data.user?.id
      });
    } catch (error) {
      console.error('Erro ao registrar consulta:', error);
    }
  }
}

// Exportar instância única
export const oracleAI = new OracleAI();
