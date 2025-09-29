// Tipos para o módulo Controle de OPME
// Mantemos as estruturas coesas para organizar dados estáticos da página e apoiar futuras integrações

export interface OPMEOverview {
  objetivo: string;
  publicoAlvo: string[];
  principios: string[];
  resultadosEsperados: Array<{ indicador: string; meta: string }>;
}

export type OPMEKpiStatus = 'positive' | 'neutral' | 'negative';

export type OPMEKpiIcon = 'roi' | 'glosa' | 'tempestividade' | 'compliance' | 'aging';

export interface OPMEKpiSnapshot {
  id: string;
  label: string;
  value: string;
  variation: number;
  target: string;
  status: OPMEKpiStatus;
  icon: OPMEKpiIcon;
}

export interface OPMESeriesPoint {
  mes: string;
  meta: number;
  realizado: number;
}

export interface OPMEGlosaPoint {
  mes: string;
  percentual: number;
  objetivo: number;
}

export type OPMEConvenioHealth = 'onTrack' | 'attention' | 'critical';

export interface OPMEConvenioStatus {
  operador: string;
  health: OPMEConvenioHealth;
  faturamento: number;
  faturamentoMeta: number;
  glosaPercentual: number;
  tendencia: number;
  slaAutorizacao: string;
  comentario: string;
}

export interface OPMEDataField {
  id: string;
  label: string;
  hint?: string;
}

export type TrendDirection = 'up' | 'down' | 'flat';

export interface HeroKpi {
  id: string;
  label: string;
  value: string;
  targetLabel: string;
  progress: number;
  status: OPMEKpiStatus;
  trendDirection: TrendDirection;
  trendLabel: string;
  description: string;
  actionLabel: string;
  actionHint: string;
  relatedEndpoint: string;
  payloadExample?: Record<string, unknown>;
}

export interface HeroAction {
  id: string;
  title: string;
  description: string;
  impactValue: string;
  timeframe: string;
  owner: string;
  buttonLabel: string;
  endpoint: string;
  payload: Record<string, unknown>;
}

export interface PrioritizedItem {
  id: string;
  title: string;
  impactValue: string;
  prazo: string;
  owner: string;
  status: 'pending' | 'inProgress' | 'completed';
  actionLabel: string;
  endpoint: string;
  payload: Record<string, unknown>;
}

export interface PrioritizedList {
  id: string;
  title: string;
  description: string;
  items: PrioritizedItem[];
}

export interface OPMEExecutiveMetric {
  titulo: string;
  descricao: string;
  breakdowns: string[];
  sinalizacoes?: string[];
  notasExtras?: string[];
}

export interface QuickChartInsight {
  title: string;
  subtitle: string;
  commentary: string;
  config: Record<string, unknown>;
}

export interface MermaidDiagramCard {
  title: string;
  description: string;
  diagram: string;
}

export interface AntVSpecCard {
  title: string;
  description: string;
  spec: Record<string, unknown>;
  height?: number;
}

export interface OPMEFlowStep {
  ordem: number;
  titulo: string;
  detalhe: string;
  complemento?: string;
}

export interface OPMEFlow {
  id: string;
  titulo: string;
  subtitulo?: string;
  steps: OPMEFlowStep[];
  observacoes?: string[];
}

export interface OPMETimelineItem {
  titulo: string;
  detalhes: string[];
}

export interface OPMEAIInsight {
  tipo: 'preditivo' | 'prescritivo' | 'anomalia' | 'what-if';
  titulo: string;
  descricao: string;
  entregaveis?: string[];
}

export interface OPMEIntegrationStatus {
  categoria: 'nacionaisPrivados' | 'sistemaUnimed' | 'autogestoesEstatais' | 'outrasOperadoras';
  operador: string;
  integracao: string;
  artefatos: string[];
  statusMonitores: string[];
  observacoes?: string;
}

export interface OPMEDataModel {
  entidade: string;
  descricao: string;
  camposChave: OPMEDataField[];
  ddl?: string;
}

export interface OPMEMetricFormula {
  nome: string;
  formula: string;
  observacoes?: string[];
}

export interface GovernanceRequirement {
  tema: string;
  itens: string[];
}

export interface OPMEErrorPlaybook {
  categoria: string;
  motivo: string;
  definicao: string;
  causaRaiz: string;
  prevencao: string[];
  recurso: string[];
  owner: string;
  sla: string;
}

export interface OPMEPlaybookCard {
  convenio: string;
  checklist: string[];
  slaPadrao: string;
  pontosAtencao: string[];
  canalRecurso: string;
  referencias: string[];
}

export interface OPMEKanbanColumn {
  id: string;
  titulo: string;
  descricao: string;
  camposChave: string[];
}

export interface OPMEReportDefinition {
  titulo: string;
  objetivo: string;
  cortes: string[];
  periodicidade: string;
}

export interface OPMEOnboardingStep {
  titulo: string;
  descricao: string;
  entregaveis: string[];
}

export interface OPMEAPIEndpoint {
  metodo: string;
  rota: string;
  finalidade: string;
  observacoes?: string[];
}

export interface OPMEWebhook {
  evento: string;
  descricao: string;
  uso: string;
}

export interface OPMEChecklist {
  contexto: string;
  itens: string[];
}

export interface OPMERaciEntry {
  atividade: string;
  responsavel: string;
  accountable: string;
  consultados: string[];
  informados: string[];
  sla?: string;
}

export interface OPMEImplementationPhase {
  fase: string;
  duracao: string;
  objetivos: string[];
  entregaveis: string[];
}

export interface OPMETestPlanEntry {
  pilar: string;
  foco: string;
  criterios: string[];
}

export interface OPMERoadmapMilestone {
  horizonte: '90d' | '180d' | '365d';
  objetivos: string[];
}

export interface StrategicPrinciple {
  titulo: string;
  insight: string;
}
