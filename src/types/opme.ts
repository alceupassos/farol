/**
 * Tipos para o Sistema de Gestão de OPME
 * Baseado em RN 259/2011, RN 424/2017, RN 465/2021, RDC 751/2022
 */

export interface ConvenioOPME {
  id: string;
  nome: string;
  participacao: number; // %
  faturamentoMes: number;
  taxaGlosa: number; // %
  tempoAutorizacao: number; // dias
  status: 'otimo' | 'atencao' | 'critico';
  prioridade: string;
  compliance: number; // %
}

export interface IndicadorOPME {
  taxaGlosaGeral: number;
  complianceTISS: number;
  slaRN259: number;
  rastreabilidadeUDI: number;
  registroAnvisa: number;
  tempoMedioAutorizacao: number;
  retrabalho: number;
}

export interface CausaGlosa {
  causa: string;
  percentual: number;
  status: 'critico' | 'atencao' | 'ok';
}

export interface ProcedimentoOPME {
  codigo: string;
  descricao: string;
  quantidade: number;
  valorMedio: number;
  taxaGlosa: number;
  convenio: string;
  registroAnvisa?: string;
  fabricante?: string;
  marca?: string;
}

export interface ValidacaoTISS {
  campo: string;
  obrigatorio: boolean;
  validacao: string;
  status: 'ok' | 'alerta' | 'bloqueio';
}

export interface IntegracaoConvenio {
  convenio: string;
  tipo: 'API REST' | 'SOAP' | 'Scraping' | 'Manual' | 'HL7';
  status: 'integrado' | 'parcial' | 'nao_integrado';
  uptime: number; // %
  latencia: number; // ms
  webhook: boolean;
}

export interface ComplianceNormativo {
  norma: string;
  descricao: string;
  compliance: number; // %
  status: 'ok' | 'atencao' | 'critico';
  acoes: string[];
}

export interface OracleInsight {
  convenio: string;
  diagnostico: string;
  prescricao: string[];
  impactoEsperado: string;
  roi: string;
  prazo: string;
}
