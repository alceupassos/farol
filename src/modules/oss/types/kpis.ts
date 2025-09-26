// Tipos para KPIs do Cockpit C-Level OSS

export interface KPICard {
  id: string;
  titulo: string;
  valor: number | string;
  meta?: number;
  unidade: string;
  variacao?: number;
  status: 'verde' | 'amarelo' | 'vermelho';
  tendencia: 'subindo' | 'estavel' | 'descendo';
  notaIA?: string;
  ultimaAtualizacao: Date;
}

export interface CockpitKPIs {
  metasContratuais: {
    percentualOnTrack: number;
    rankingDesvios: Array<{contrato: string; desvio: number}>;
  };
  indiceGlosa: {
    valorGlosado: number;
    percentualGlosa: number;
    percentualRecuperacao: number;
  };
  rejeicaoAIH: {
    taxa: number;
    topMotivos: Array<{motivo: string; quantidade: number}>;
  };
  tempestividadeAudesp: {
    competenciasPrazo: number;
    errosSchema: number;
  };
  agingRepasses: {
    diasAtraso: number;
    impactoCaixa60: number;
    impactoCaixa90: number;
  };
  conciliacaoContratos: {
    percentualConciliado: number;
    excecoesEvidencia: number;
  };
  transparenciaAtiva: {
    percentualPublicado: number;
    documentosPendentes: number;
  };
  lgpdCompliance: {
    incidentes: number;
    gravidade: 'baixa' | 'media' | 'alta' | 'critica';
    mttr: number;
    percentualRevisaoAcessos: number;
  };
  npsGovernamental: {
    score: number;
    porContratante: Array<{nome: string; nps: number}>;
  };
  probabilidadeRenovacao: {
    porContrato: Array<{contrato: string; probabilidade: number}>;
  };
  completudeBPA: {
    percentualCompleto: number;
    reprocessos: number;
  };
  indicadoresClinicos: {
    taxaInfeccao: number;
    reinternacao: number;
    eventosAdversos: number;
  };
  heatmapRisco: {
    riscos: Array<{
      categoria: string;
      probabilidade: 1 | 2 | 3 | 4 | 5;
      impacto: 1 | 2 | 3 | 4 | 5;
    }>;
  };
  pipelineContratos: {
    novos: number;
    emExpansao: number;
    valorTotal: number;
    margemMedia: number;
  };
}
