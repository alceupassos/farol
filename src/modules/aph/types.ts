export type AphSeverity = 'critico' | 'grave' | 'atencao' | 'estavel';

export type AphPageKey =
  | 'dashboard'
  | 'mapaAmbulancias'
  | 'insightsIa'
  | 'oraculo'
  | 'catalogo'
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
  alerts?: AphAlert[];
  catalog?: AphCatalog;
  oraculoScenarios?: AphOraculoScenario[];
  map?: AphMapConfig;
  cameraWall?: AphCameraFeed[];
  ambulances?: AphAmbulance[];
}

export type AphPagesConfig = Record<AphPageKey, AphPageConfig>;

export interface AphAlert {
  id: string;
  title: string;
  description: string;
  metric?: string;
  action?: string;
  severity: AphSeverity;
}

export interface AphCatalogEntry {
  name: string;
  description: string;
  sla: string;
  kpis: string[];
}

export interface AphCatalogSection {
  title: string;
  description?: string;
  entries: AphCatalogEntry[];
}

export interface AphCityCoverage {
  name: string;
  population: string;
  demandProfile: string;
  contractedServices: string[];
  slaFocus: string;
}

export interface AphCatalog {
  sections: AphCatalogSection[];
  cities: AphCityCoverage[];
}

export interface AphOraculoPlan {
  objective: string;
  deliverables: string[];
  responsible: string;
  deadline: string;
  successMetric: string;
  residualRisk: string;
}

export interface AphOraculoScenario {
  id: string;
  title: string;
  question: string;
  diagnosis: string;
  impact: string;
  evidences: string[];
  risk: string;
  recommendations: string[];
  plan: AphOraculoPlan;
  nextSteps: string[];
  severity: AphSeverity;
}

export interface AphCameraFeed {
  id: string;
  title: string;
  unit: string;
  thumbnail: string;
  status: 'ok' | 'alerta' | 'offline';
  latency: string;
  updatedAt: string;
  description?: string;
}

export interface AphAmbulanceTelemetry {
  speed: number;
  rpm: number;
  fuel: number;
  temperature: number;
  odometer: number;
  lastMaintenanceKm: number;
  crew: string[];
  incidentCount: number;
}

export interface AphAmbulance {
  id: string;
  name: string;
  type: 'UTI' | 'USB' | 'Resgate' | 'Suporte';
  status: 'livre' | 'deslocamento' | 'em_atendimento' | 'indisponivel';
  coordinates: [number, number];
  address: string;
  destination?: string;
  eta?: string;
  lastUpdate: string;
  telemetry: AphAmbulanceTelemetry;
  image?: string;
  interiorImage?: string;
}

export interface AphMapLayer {
  id: string;
  type: 'heatmap' | 'geofence' | 'event';
  color: string;
  description: string;
}

export interface AphMapConfig {
  accessToken?: string;
  center: [number, number];
  zoom: number;
  layers: AphMapLayer[];
}
