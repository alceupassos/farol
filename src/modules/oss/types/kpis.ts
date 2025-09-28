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

export type SeverityLevel = 'critico' | 'grave' | 'atencao' | 'estavel';

export type IconKey =
  | 'activity'
  | 'alert-triangle'
  | 'bar-chart'
  | 'bed-double'
  | 'brain-circuit'
  | 'dollar-sign'
  | 'heart-pulse'
  | 'hospital'
  | 'line-chart'
  | 'pie-chart'
  | 'shield-alert'
  | 'stethoscope'
  | 'target'
  | 'timer'
  | 'users';

export interface HospitalKPI {
  id: string;
  titulo: string;
  valor: string;
  meta?: string;
  variacao: string;
  descricao: string;
  severidade: SeverityLevel;
  icon: IconKey;
}

export interface PerformanceRankingItem {
  unidade: string;
  score: number;
  variacao: number;
  severidade: SeverityLevel;
}

export interface MonthlyComparisonPoint {
  mes: string;
  melhores: number;
  atencao: number;
  mediaRede: number;
}

export interface PerformanceRankingData {
  topPerformers: PerformanceRankingItem[];
  needsAttention: PerformanceRankingItem[];
  monthlyComparison: MonthlyComparisonPoint[];
}

export interface CostBySpecialty {
  especialidade: string;
  custoMedio: number;
  contribuicao: number;
}

export interface CostTrendPoint {
  mes: string;
  custoReal: number;
  custoOrcado: number;
}

export interface CostAnalysisData {
  averageCostPerPatient: number;
  averageCostVariation: string;
  specialtyBreakdown: CostBySpecialty[];
  monthlyTrend: CostTrendPoint[];
}

export interface QualityIndicator {
  indicador: string;
  valor: number;
  unidade: string;
  meta: number;
  severidade: SeverityLevel;
  descricao: string;
}

export interface QualityTimelinePoint {
  mes: string;
  infeccao: number;
  mortalidade: number;
  cancelamento: number;
}

export interface QualityAnalysisData {
  indicators: QualityIndicator[];
  timeline: QualityTimelinePoint[];
}

export interface TrendDataPoint {
  mes: string;
  ocupacao: number;
  mortalidade: number;
  satisfacao: number;
  severidade: SeverityLevel;
}

export interface HeatmapCell {
  ala: string;
  periodo: string;
  ocupacao: number;
  severidade: SeverityLevel;
}

export interface ParetoIssue {
  causa: string;
  impactoFinanceiro: number;
  cumulativo: number;
  severidade: SeverityLevel;
}

export interface RealtimeIndicator {
  id: string;
  titulo: string;
  valor: string;
  variacao: string;
  severidade: SeverityLevel;
  icon: IconKey;
  descricao: string;
}

export interface HospitalPerformanceSnapshot {
  updatedAt: string;
  criticalKPIs: HospitalKPI[];
  ranking: PerformanceRankingData;
  cost: CostAnalysisData;
  quality: QualityAnalysisData;
  charts: {
    trend: TrendDataPoint[];
    heatmap: HeatmapCell[];
    pareto: ParetoIssue[];
    realtime: RealtimeIndicator[];
  };
}
