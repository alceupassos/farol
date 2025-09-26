// Serviços de Integração Real - OSS BHCL

import { supabase } from '@/integrations/supabase/client';

// ==================== DATASUS/SUS ====================
export class DatasusService {
  private baseUrl = process.env.VITE_DATASUS_API_URL || 'https://api.datasus.gov.br';
  private apiKey = process.env.VITE_DATASUS_API_KEY;

  // Buscar dados de AIH
  async buscarAIH(competencia: string, cnes: string) {
    try {
      const response = await fetch(`${this.baseUrl}/sih/aih`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          competencia,
          cnes,
          tipo: 'RD' // Remessa de Dados
        })
      });

      if (!response.ok) throw new Error('Erro ao buscar AIH');
      return await response.json();
    } catch (error) {
      console.error('Erro DatasusService.buscarAIH:', error);
      throw error;
    }
  }

  // Processar BPA
  async processarBPA(arquivo: File) {
    const formData = new FormData();
    formData.append('arquivo', arquivo);
    formData.append('tipo', 'BPA-I'); // BPA Individualizado

    try {
      const response = await fetch(`${this.baseUrl}/sia/bpa/processar`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: formData
      });

      if (!response.ok) throw new Error('Erro ao processar BPA');
      return await response.json();
    } catch (error) {
      console.error('Erro DatasusService.processarBPA:', error);
      throw error;
    }
  }

  // Validar APAC
  async validarAPAC(dados: any) {
    try {
      const response = await fetch(`${this.baseUrl}/sia/apac/validar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify(dados)
      });

      if (!response.ok) throw new Error('Erro ao validar APAC');
      return await response.json();
    } catch (error) {
      console.error('Erro DatasusService.validarAPAC:', error);
      throw error;
    }
  }

  // Consultar CNES
  async consultarCNES(cnes: string) {
    try {
      const response = await fetch(`${this.baseUrl}/cnes/estabelecimento/${cnes}`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        }
      });

      if (!response.ok) throw new Error('Erro ao consultar CNES');
      return await response.json();
    } catch (error) {
      console.error('Erro DatasusService.consultarCNES:', error);
      throw error;
    }
  }

  // Consultar SIGTAP
  async consultarSIGTAP(codigo: string) {
    try {
      const response = await fetch(`${this.baseUrl}/sigtap/procedimento/${codigo}`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        }
      });

      if (!response.ok) throw new Error('Erro ao consultar SIGTAP');
      return await response.json();
    } catch (error) {
      console.error('Erro DatasusService.consultarSIGTAP:', error);
      throw error;
    }
  }
}

// ==================== AUDESP ====================
export class AudespService {
  private baseUrl = process.env.VITE_AUDESP_API_URL || 'https://audesp.tce.sp.gov.br/api';
  private token = process.env.VITE_AUDESP_TOKEN;

  // Validar Schema JSON
  async validarSchema(json: any) {
    try {
      const response = await fetch(`${this.baseUrl}/validar-schema`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`
        },
        body: JSON.stringify(json)
      });

      if (!response.ok) throw new Error('Erro ao validar schema Audesp');
      return await response.json();
    } catch (error) {
      console.error('Erro AudespService.validarSchema:', error);
      throw error;
    }
  }

  // Gerar JSON de Prestação de Contas
  async gerarPrestacaoContas(contractId: string, competencia: string) {
    try {
      // Buscar dados do contrato no Supabase
      const { data: contrato, error } = await supabase
        .from('oss_contracts')
        .select('*')
        .eq('id', contractId)
        .single();

      if (error) throw error;

      // Estrutura JSON conforme schema Audesp
      const audespJson = {
        versao: '2.0',
        entidade: {
          cnpj: '50.351.626/0001-10',
          nome: 'BENEFICENCIA HOSPITALAR DE CESARIO LANGE',
          tipo: 'OSS'
        },
        contrato: {
          numero: contrato.numero,
          valor: contrato.valor_total,
          dataAssinatura: contrato.data_inicio,
          objeto: contrato.objeto
        },
        competencia,
        receitas: await this.buscarReceitas(contractId, competencia),
        despesas: await this.buscarDespesas(contractId, competencia),
        indicadores: await this.buscarIndicadores(contractId, competencia)
      };

      return audespJson;
    } catch (error) {
      console.error('Erro AudespService.gerarPrestacaoContas:', error);
      throw error;
    }
  }

  // Enviar para Audesp
  async enviarPrestacao(json: any) {
    try {
      const response = await fetch(`${this.baseUrl}/enviar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`
        },
        body: JSON.stringify(json)
      });

      if (!response.ok) throw new Error('Erro ao enviar para Audesp');
      return await response.json();
    } catch (error) {
      console.error('Erro AudespService.enviarPrestacao:', error);
      throw error;
    }
  }

  private async buscarReceitas(contractId: string, competencia: string) {
    const { data, error } = await supabase
      .from('oss_receitas')
      .select('*')
      .eq('contract_id', contractId)
      .eq('competencia', competencia);

    if (error) throw error;
    return data;
  }

  private async buscarDespesas(contractId: string, competencia: string) {
    const { data, error } = await supabase
      .from('oss_despesas')
      .select('*')
      .eq('contract_id', contractId)
      .eq('competencia', competencia);

    if (error) throw error;
    return data;
  }

  private async buscarIndicadores(contractId: string, competencia: string) {
    const { data, error } = await supabase
      .from('oss_indicadores')
      .select('*')
      .eq('contract_id', contractId)
      .eq('competencia', competencia);

    if (error) throw error;
    return data;
  }
}

// ==================== TISS/TUSS ====================
export class TissService {
  private versaoAtual = '3.05.00';

  // Validar Guia TISS
  async validarGuia(xmlGuia: string) {
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlGuia, 'text/xml');
      
      // Validações básicas
      const errors = [];
      
      // Verificar versão TISS
      const versao = xmlDoc.querySelector('versaoPadrao')?.textContent;
      if (versao !== this.versaoAtual) {
        errors.push({
          campo: 'versaoPadrao',
          erro: `Versão ${versao} desatualizada. Use ${this.versaoAtual}`
        });
      }

      // Validar códigos TUSS
      const procedimentos = xmlDoc.querySelectorAll('procedimento');
      for (const proc of procedimentos) {
        const codigo = proc.querySelector('codigo')?.textContent;
        if (codigo && !await this.validarCodigoTUSS(codigo)) {
          errors.push({
            campo: 'procedimento.codigo',
            erro: `Código TUSS ${codigo} inválido ou desatualizado`
          });
        }
      }

      return {
        valido: errors.length === 0,
        errors
      };
    } catch (error) {
      console.error('Erro TissService.validarGuia:', error);
      throw error;
    }
  }

  // Validar Código TUSS
  async validarCodigoTUSS(codigo: string) {
    try {
      const { data, error } = await supabase
        .from('tuss_procedimentos')
        .select('*')
        .eq('codigo', codigo)
        .eq('ativo', true)
        .single();

      return !error && data !== null;
    } catch (error) {
      console.error('Erro TissService.validarCodigoTUSS:', error);
      return false;
    }
  }

  // Gerar Lote TISS
  async gerarLote(guias: any[]) {
    try {
      const lote = {
        numeroLote: this.gerarNumeroLote(),
        dataGeracao: new Date().toISOString(),
        versaoTISS: this.versaoAtual,
        registroANS: '123456', // Substituir pelo registro real
        cnpjPrestador: '50.351.626/0001-10',
        guias: guias.map(g => this.formatarGuia(g))
      };

      return lote;
    } catch (error) {
      console.error('Erro TissService.gerarLote:', error);
      throw error;
    }
  }

  private gerarNumeroLote() {
    return `${Date.now()}${Math.random().toString(36).substr(2, 9)}`;
  }

  private formatarGuia(guia: any) {
    // Formatar guia conforme padrão TISS
    return {
      ...guia,
      versaoPadrao: this.versaoAtual,
      dataEmissao: new Date().toISOString()
    };
  }
}

// ==================== INTEGRAÇÃO BANCÁRIA ====================
export class BancoService {
  // Importar OFX
  async importarOFX(arquivo: File) {
    try {
      const texto = await arquivo.text();
      const transacoes = this.parseOFX(texto);
      
      // Salvar no Supabase
      const { data, error } = await supabase
        .from('oss_transacoes_bancarias')
        .insert(transacoes);

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erro BancoService.importarOFX:', error);
      throw error;
    }
  }

  // Parse OFX
  private parseOFX(ofxContent: string) {
    const transacoes = [];
    const lines = ofxContent.split('\n');
    
    let transacao: any = {};
    for (const line of lines) {
      if (line.includes('<STMTTRN>')) {
        transacao = {};
      } else if (line.includes('<DTPOSTED>')) {
        transacao.data = this.parseOFXDate(line);
      } else if (line.includes('<TRNAMT>')) {
        transacao.valor = parseFloat(line.match(/>(.+)</)?.[1] || '0');
      } else if (line.includes('<MEMO>')) {
        transacao.descricao = line.match(/>(.+)</)?.[1] || '';
      } else if (line.includes('</STMTTRN>')) {
        if (transacao.data) {
          transacoes.push(transacao);
        }
      }
    }
    
    return transacoes;
  }

  private parseOFXDate(line: string) {
    const dateStr = line.match(/>(\d{8})/)?.[1];
    if (!dateStr) return null;
    
    const year = dateStr.substr(0, 4);
    const month = dateStr.substr(4, 2);
    const day = dateStr.substr(6, 2);
    
    return `${year}-${month}-${day}`;
  }

  // Conciliar Transações
  async conciliarTransacoes(contractId: string, mes: string) {
    try {
      // Buscar transações bancárias
      const { data: transacoes, error: errorTrans } = await supabase
        .from('oss_transacoes_bancarias')
        .select('*')
        .eq('contract_id', contractId)
        .like('data', `${mes}%`);

      if (errorTrans) throw errorTrans;

      // Buscar lançamentos contábeis
      const { data: lancamentos, error: errorLanc } = await supabase
        .from('oss_lancamentos_contabeis')
        .select('*')
        .eq('contract_id', contractId)
        .like('data', `${mes}%`);

      if (errorLanc) throw errorLanc;

      // Algoritmo de conciliação
      const conciliados = [];
      const pendentes = [];

      for (const trans of transacoes || []) {
        const match = lancamentos?.find(l => 
          Math.abs(l.valor - trans.valor) < 0.01 &&
          l.data === trans.data
        );

        if (match) {
          conciliados.push({
            transacao_id: trans.id,
            lancamento_id: match.id,
            status: 'conciliado'
          });
        } else {
          pendentes.push(trans);
        }
      }

      return {
        total: transacoes?.length || 0,
        conciliados: conciliados.length,
        pendentes: pendentes.length,
        percentual: ((conciliados.length / (transacoes?.length || 1)) * 100).toFixed(1)
      };
    } catch (error) {
      console.error('Erro BancoService.conciliarTransacoes:', error);
      throw error;
    }
  }
}

// ==================== EXPORTAR SERVIÇOS ====================
export const datasusService = new DatasusService();
export const audespService = new AudespService();
export const tissService = new TissService();
export const bancoService = new BancoService();
