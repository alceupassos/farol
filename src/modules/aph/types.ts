export type AphSeverity = 'critico' | 'grave' | 'atencao' | 'estavel';

export type AphPageKey =
  | 'dashboard'
  | 'insightsIa'
  | 'oraculo'
  | 'despachoRegulacao'
  | 'heatmapCobertura'
  | 'playbooksOperacionais'
  | 'frotaTelemetria'
  | 'manutencaoPreditiva'
  | 'monitoramentoCameras'
  | 'clinicaQualidade'
  | 'protocolos'
  | 'educacaoContinuada'
  | 'financeiro'
  | 'antiglosas'
  | 'preAuditoria'
  | 'portalContratante'
  | 'storytelling'
  | 'relatorios'
  | 'governancaLgpd'
  | 'integracoes'
  | 'compliance';

export type AphIconId =
  | 'activity'
  | 'brain'
  | 'zap'
  | 'target'
  | 'map'
  | 'clipboard'
  | 'ambulance'
  | 'refresh'
  | 'video'
  | 'stethoscope'
  | 'check-circle'
  | 'graduation-cap'
  | 'dollar-sign'
  | 'shield'
  | 'file-text'
  | 'users'
  | 'newspaper'
  | 'bar-chart'
  | 'shield-alert'
  | 'globe'
  | 'scale'
  | 'gauge'
  | 'clock';

export interface AphMetricCard {
  id: string;
  title: string;
  value: string;
  variation: string;
  trend: 'up' | 'down' | 'neutral';
  description?: string;
  icon: AphIconId;
  severity: AphSeverity;
}

export interface AphInsight {
  id: string;
  title: string;
  description: string;
  severity: AphSeverity;
}

export interface AphChartLine {
  dataKey: string;
  name: string;
  color: string;
  type?: 'monotone' | 'basis' | 'natural' | 'linear';
  yAxisId?: 'left' | 'right';
}

export interface AphChartArea extends AphChartLine {
  fillOpacity?: number;
}

export interface AphChartBar {
  dataKey: string;
  name: string;
  color: string;
  radius?: [number, number, number, number];
  yAxisId?: 'left' | 'right';
}

export interface AphChartConfig {
  id: string;
  title: string;
  subtitle?: string;
  type: 'area' | 'line' | 'bar' | 'composed';
  data: Array<Record<string, any>>;
  xKey: string;
  lines?: AphChartLine[];
  areas?: AphChartArea[];
  bars?: AphChartBar[];
  unit?: string;
  yAxisLeftLabel?: string;
  yAxisRightLabel?: string;
}

export interface AphHeatmapRow {
  label: string;
  cells: Array<{
    period: string;
    value: number;
    severity: AphSeverity;
  }>;
}

export interface AphHeatmapSection {
  title: string;
  description?: string;
  periods: string[];
  rows: AphHeatmapRow[];
}

export interface AphPlaybook {
  id: string;
  title: string;
  impact: string;
  actions: string[];
  owner: string;
  status: 'planejado' | 'executando' | 'concluido';
  severity: AphSeverity;
}

export interface AphIntegrationItem {
  id: string;
  name: string;
  provider: string;
  status: 'ativo' | 'instavel' | 'offline';
  latency: string;
  lastSync: string;
  notes?: string;
}

export interface AphTableSection {
  title: string;
  description?: string;
  headers: string[];
  rows: string[][];
}

export interface AphTimelineEvent {
  id: string;
  timestamp: string;
  label: string;
  detail: string;
  severity: AphSeverity;
}

export interface AphPageConfig {
  key: AphPageKey;
  title: string;
  subtitle: string;
  heroTagline?: string;
  gradient: { from: string; to: string };
  tags?: string[];
  metrics: AphMetricCard[];
  insights?: AphInsight[];
  charts?: AphChartConfig[];
  heatmap?: AphHeatmapSection;
  playbooks?: AphPlaybook[];
  integrations?: AphIntegrationItem[];
  table?: AphTableSection;
  timeline?: AphTimelineEvent[];
  notes?: string[];
}

export type AphPagesConfig = Record<AphPageKey, AphPageConfig>;
