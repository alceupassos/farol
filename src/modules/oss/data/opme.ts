import {
  AntVSpecCard,
  GovernanceRequirement,
  MermaidDiagramCard,
  OPMEAIInsight,
  OPMEAPIEndpoint,
  OPMEChecklist,
  OPMEConvenioStatus,
  OPMEDataModel,
  OPMEErrorPlaybook,
  OPMEExecutiveMetric,
  OPMEFlow,
  OPMEGlosaPoint,
  HeroAction,
  HeroKpi,
  OPMEImplementationPhase,
  OPMEIntegrationStatus,
  OPMEKanbanColumn,
  OPMEKpiSnapshot,
  OPMEMetricFormula,
  OPMEOnboardingStep,
  OPMEOverview,
  PrioritizedList,
  OPMEPlaybookCard,
  OPMERaciEntry,
  OPMERoadmapMilestone,
  OPMEReportDefinition,
  OPMESeriesPoint,
  OPMETestPlanEntry,
  OPMEWebhook,
  QuickChartInsight,
  StrategicPrinciple,
} from '../types/opme';

export const opmeOverview: OPMEOverview = {
  objetivo:
    'Reduzir glosa, aumentar receita e margem em OPME com padronização, automação assistida, IA explicável e governança fim a fim.',
  publicoAlvo: [
    'C-Level / Diretoria',
    'Controladoria e Faturamento',
    'Auditoria Assistencial e Jurídica',
    'Suprimentos e cadeia de OPME',
    'TI, dados e integrações',
  ],
  principios: [
    'TISS/TUSS/TNUMM-first: aderência total às normas e versões vigentes',
    'Rastreabilidade ponta a ponta com UDI, lote, série e ANVISA',
    'Dados únicos e confiáveis – sem dado, sem envio',
    'IA explicável, com recomendações acionáveis e memória de cálculo',
    'Automação assistida: portais/RPA com validação humana nos pontos críticos',
  ],
  resultadosEsperados: [
    { indicador: 'Índice de glosa técnica + administrativa', meta: 'reduzir 30–50% em 12 meses' },
    { indicador: 'Taxa de autorização na 1ª submissão (eletivo)', meta: 'atingir >85%' },
    { indicador: 'DSO/PMR por convênio', meta: 'reduzir 15–25%' },
    { indicador: 'Margem por DRG/procedimento', meta: 'crescer continuamente via custo real OPME' },
  ],
};

export const kpiSnapshots: OPMEKpiSnapshot[] = [
  {
    id: 'roi',
    label: 'ROI Contratual',
    value: 'R$ 18,4 mi',
    variation: 12.5,
    target: 'Meta R$ 16,0 mi',
    status: 'positive',
    icon: 'roi',
  },
  {
    id: 'glosa',
    label: 'Índice de Glosa',
    value: '2,8%',
    variation: -0.6,
    target: 'Meta ≤ 4,5%',
    status: 'positive',
    icon: 'glosa',
  },
  {
    id: 'sla',
    label: 'SLA Autorização',
    value: '91% / 18h',
    variation: 6.2,
    target: 'Meta 85% / 24h',
    status: 'positive',
    icon: 'tempestividade',
  },
  {
    id: 'compliance',
    label: 'Compliance & Auditorias',
    value: '100%',
    variation: 0.0,
    target: '0 não conformidades',
    status: 'neutral',
    icon: 'compliance',
  },
  {
    id: 'aging',
    label: 'Aging Recebimento',
    value: '38 dias',
    variation: -4.0,
    target: 'Meta 45 dias',
    status: 'positive',
    icon: 'aging',
  },
];

export const receitaSeries: OPMESeriesPoint[] = [
  { mes: 'Jan', meta: 14.2, realizado: 13.8 },
  { mes: 'Fev', meta: 14.4, realizado: 14.1 },
  { mes: 'Mar', meta: 14.6, realizado: 15.2 },
  { mes: 'Abr', meta: 14.8, realizado: 15.7 },
  { mes: 'Mai', meta: 15.0, realizado: 16.1 },
  { mes: 'Jun', meta: 15.2, realizado: 16.6 },
];

export const glosaSeries: OPMEGlosaPoint[] = [
  { mes: 'Jan', percentual: 4.6, objetivo: 4.2 },
  { mes: 'Fev', percentual: 4.1, objetivo: 4.1 },
  { mes: 'Mar', percentual: 3.7, objetivo: 4.0 },
  { mes: 'Abr', percentual: 3.4, objetivo: 3.9 },
  { mes: 'Mai', percentual: 3.1, objetivo: 3.8 },
  { mes: 'Jun', percentual: 2.8, objetivo: 3.7 },
];

export const metricInsightCharts: QuickChartInsight[] = [
  {
    title: 'Glosa vs Recuperação',
    subtitle: 'Percentual mensal',
    commentary: 'Recuperação acima da meta a partir de abril com redução contínua de glosas.',
    config: {
      type: 'line',
      data: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
        datasets: [
          {
            label: 'Glosa (%)',
            data: [4.6, 4.1, 3.7, 3.4, 3.1, 2.8],
            borderColor: '#f97316',
            backgroundColor: 'rgba(249, 115, 22, 0.15)',
            tension: 0.35,
          },
          {
            label: 'Recuperação (%)',
            data: [58, 61, 64, 68, 72, 76],
            borderColor: '#22c55e',
            backgroundColor: 'rgba(34, 197, 94, 0.15)',
            tension: 0.35,
          },
        ],
      },
      options: {
        plugins: { legend: { position: 'bottom', labels: { color: '#e2e8f0' } } },
        scales: {
          x: {
            ticks: { color: '#cbd5f5' },
            grid: { color: 'rgba(148, 163, 184, 0.1)' },
          },
          y: {
            ticks: { color: '#cbd5f5' },
            grid: { color: 'rgba(148, 163, 184, 0.1)' },
          },
        },
        backgroundColor: '#0f172a',
      },
    },
  },
  {
    title: 'Margem por Convênio',
    subtitle: 'Rentabilidade líquida',
    commentary: 'Convênios prioritários mantêm margem acima de 15% após renegociação Q2.',
    config: {
      type: 'bar',
      data: {
        labels: ['Amil', 'Intermédica', 'SulAmérica', 'Care Plus', 'Bradesco'],
        datasets: [
          {
            label: 'Margem %',
            data: [22, 19, 18, 17, 14],
            backgroundColor: ['#38bdf8', '#34d399', '#a855f7', '#f97316', '#facc15'],
          },
        ],
      },
      options: {
        plugins: { legend: { display: false } },
        scales: {
          x: { ticks: { color: '#e2e8f0' }, grid: { display: false } },
          y: { ticks: { color: '#e2e8f0', callback: (value: number) => `${value}%` }, grid: { color: 'rgba(148,163,184,0.1)' } },
        },
        backgroundColor: '#0f172a',
      },
    },
  },
  {
    title: 'DSO por Convênio',
    subtitle: 'Dias para receber',
    commentary: 'Projeto de automação financeiro reduz DSO médio para < 40 dias.',
    config: {
      type: 'radar',
      data: {
        labels: ['Amil', 'Intermédica', 'SulAmérica', 'Prevent Senior', 'Unimed'],
        datasets: [
          {
            label: 'DSO Atual',
            data: [35, 38, 32, 44, 41],
            backgroundColor: 'rgba(129, 140, 248, 0.25)',
            borderColor: '#818cf8',
          },
          {
            label: 'Meta',
            data: [38, 40, 35, 47, 45],
            backgroundColor: 'rgba(51, 65, 85, 0.3)',
            borderColor: '#94a3b8',
          },
        ],
      },
      options: {
        plugins: { legend: { position: 'bottom', labels: { color: '#e2e8f0' } } },
        scales: {
          r: {
            angleLines: { color: 'rgba(148,163,184,0.15)' },
            grid: { color: 'rgba(148,163,184,0.15)' },
            pointLabels: { color: '#e2e8f0' },
            ticks: { backdropColor: 'transparent', color: '#cbd5f5' },
          },
        },
        backgroundColor: '#0f172a',
      },
    },
  },
];

export const faturamentoConvenioRanking = [
  { operador: 'Amil / Mediservice', valor: 4.2, meta: 4.0 },
  { operador: 'NotreDame Intermédica / Hapvida', valor: 3.9, meta: 3.6 },
  { operador: 'SulAmérica Saúde', valor: 3.6, meta: 3.4 },
  { operador: 'Bradesco Saúde', valor: 3.1, meta: 3.4 },
  { operador: 'Porto Seguro Saúde', valor: 2.8, meta: 3.0 },
  { operador: 'Allianz Saúde', valor: 1.9, meta: 1.8 },
];

export const tempoAutorizacaoSeries = [
  { mes: 'Jan', eletivo: 28, urgencia: 8, meta: 24 },
  { mes: 'Fev', eletivo: 25, urgencia: 7, meta: 24 },
  { mes: 'Mar', eletivo: 23, urgencia: 6, meta: 23 },
  { mes: 'Abr', eletivo: 21, urgencia: 6, meta: 22 },
  { mes: 'Mai', eletivo: 20, urgencia: 5, meta: 21 },
  { mes: 'Jun', eletivo: 18, urgencia: 5, meta: 21 },
];

export const causasGlosaDistribuicao = [
  { causa: 'Documentação incompleta', impacto: 32, tendencia: -6 },
  { causa: 'Divergência de pacote', impacto: 24, tendencia: 3 },
  { causa: 'Procedimento fora do rol', impacto: 18, tendencia: -2 },
  { causa: 'Autorização expirada', impacto: 14, tendencia: 1 },
  { causa: 'Material não contratado', impacto: 12, tendencia: -4 },
];

export const margemLinhaCuidado = [
  { linha: 'Ortopedia', margem: 22 },
  { linha: 'Cardíaca', margem: 18 },
  { linha: 'Neurologia', margem: 15 },
  { linha: 'Oncologia', margem: 12 },
  { linha: 'Outras', margem: 9 },
];

export const heroKpis: HeroKpi[] = [
  {
    id: 'budget-adherence',
    label: 'Custo OPME • Mês',
    value: 'R$ 6,8 mi',
    targetLabel: 'Orçado R$ 7,1 mi',
    progress: 0.96,
    status: 'positive',
    trendDirection: 'down',
    trendLabel: '-4,2% MoM',
    description: 'Economia garantida com renegociação e pré-auditoria ativa.',
    actionLabel: 'Abrir treemap por fabricante',
    actionHint: 'Identifique variações vs referência e negocie lotes prioritários.',
    relatedEndpoint: '/mcp/opme/analisar-custos',
    payloadExample: { periodo: '2025-06', agrupamento: 'fabricante' },
  },
  {
    id: 'glosa-risk',
    label: 'Glosa Prevista (IA)',
    value: '2,3%',
    targetLabel: 'Meta ≤ 3%',
    progress: 0.77,
    status: 'positive',
    trendDirection: 'down',
    trendLabel: '-0,6 pts',
    description: 'Score consolidado de pré-auditoria automática.',
    actionLabel: 'Pré-auditar 11 casos críticos',
    actionHint: 'R$ 184k em risco – priorize convênios com histórico recente de glosa.',
    relatedEndpoint: '/mcp/opme/rodar-pre-auditoria-ia',
    payloadExample: { limiteCasos: 11, ordenarPor: 'impacto' },
  },
  {
    id: 'authorization-lead',
    label: 'Lead Time Autorização p90',
    value: '19h',
    targetLabel: 'Meta ≤ 24h',
    progress: 0.79,
    status: 'positive',
    trendDirection: 'down',
    trendLabel: '-3h vs semana',
    description: 'Monitoramento contínuo por convênio e hospital.',
    actionLabel: 'Repriorizar filas',
    actionHint: 'Reordene convênios com SLA estourado e escale via canal direto.',
    relatedEndpoint: '/mcp/opme/repriorizar-autorizacoes',
    payloadExample: { convenios: ['Bradesco Saúde', 'Sompo Saúde'], alvoHoras: 18 },
  },
  {
    id: 'audit-savings',
    label: 'Economia por Auditoria',
    value: 'R$ 920k',
    targetLabel: '+12% vs mês anterior',
    progress: 0.88,
    status: 'positive',
    trendDirection: 'up',
    trendLabel: '+11% MoM',
    description: 'Resultado direto das tratativas e recursos vencedores.',
    actionLabel: 'Gerar plano para novos recursos',
    actionHint: 'Direcione analistas para os casos com maior potencial de recuperação.',
    relatedEndpoint: '/mcp/opme/gerar-plano-acao',
    payloadExample: { tipo: 'recurso_glosa', limiteAcoes: 3 },
  },
  {
    id: 'fraud-score',
    label: 'Risco de Fraude',
    value: 'Score 28/100',
    targetLabel: 'Meta ≤ 20',
    progress: 0.35,
    status: 'attention',
    trendDirection: 'up',
    trendLabel: '+4 pts semana',
    description: 'Alertas por hospital/equipe com anomalias na cadeia.',
    actionLabel: 'Abrir checklist antifraude',
    actionHint: 'Habilite bloqueio preventivo para procedimentos high-risk.',
    relatedEndpoint: '/mcp/opme/bloquear-procedimento-risco',
    payloadExample: { hospitalId: 'HSP-014', motivo: 'score_fraude_alto' },
  },
];

export const heroActions: HeroAction[] = [
  {
    id: 'negociar-lote',
    title: 'Renegociar lote consórcio ortopédico',
    description: 'Fabricante Z com variação +12% vs referência. Lotear 40 unidades reduz custo em R$ 96k.',
    impactValue: 'R$ 96k potencial',
    timeframe: 'Prazo crítico: 48h',
    owner: 'Suprimentos / Compras',
    buttonLabel: 'Abrir negociação',
    endpoint: '/mcp/opme/abrir-negociacao-fornecedor',
    payload: {
      fabricante: 'Fabricante Z',
      itens: ['OPME-4321'],
      volume: 40,
      precoAlvo: 0.92,
    },
  },
  {
    id: 'repriorizar-autorizacoes',
    title: 'Repriorizar convênios com SLA crítico',
    description: 'Convênio Sompo acima de 30h no p90. Reordenar fila e ativar canal direto.',
    impactValue: 'R$ 210k economia evitada',
    timeframe: 'Prazo crítico: hoje',
    owner: 'Central de Autorizações',
    buttonLabel: 'Repriorizar filas',
    endpoint: '/mcp/opme/repriorizar-autorizacoes',
    payload: {
      convenios: ['Sompo Saúde'],
      metaHoras: 20,
    },
  },
  {
    id: 'rodar-pre-auditoria',
    title: 'Pré-auditar lotes com alto score de glosa',
    description: 'Seleção IA de 11 casos com risco >70%. Gerar checklist e redlines automáticos.',
    impactValue: 'R$ 184k em risco',
    timeframe: 'Prazo crítico: 24h',
    owner: 'Equipe Auditoria',
    buttonLabel: 'Rodar IA de pré-auditoria',
    endpoint: '/mcp/opme/rodar-pre-auditoria-ia',
    payload: {
      limiteCasos: 11,
      ordenarPor: 'impacto_financeiro',
    },
  },
];

export const prioritizedLists: PrioritizedList[] = [
  {
    id: 'pre-auditoria',
    title: 'Fila de Pré-auditoria',
    description: 'Casos priorizados pela IA considerando risco, valor e SLA.',
    items: [
      {
        id: 'pre-001',
        title: 'Guia 98231 • SulAmérica • R$ 48k',
        impactValue: 'R$ 48k em risco',
        prazo: '6h',
        owner: 'Auditoria Clínica',
        status: 'pending',
        actionLabel: 'Abrir checklist',
        endpoint: '/mcp/opme/gerar-checklist-pre-auditoria',
        payload: { guiaId: '98231', convenio: 'SulAmérica Saúde' },
      },
      {
        id: 'pre-002',
        title: 'Guia 77445 • Amil • R$ 32k',
        impactValue: 'Score 78/100',
        prazo: '8h',
        owner: 'Auditoria Técnica',
        status: 'inProgress',
        actionLabel: 'Pré-auditar agora',
        endpoint: '/mcp/opme/rodar-pre-auditoria-ia',
        payload: { guiaId: '77445' },
      },
      {
        id: 'pre-003',
        title: 'Guia 66109 • NotreDame • R$ 26k',
        impactValue: 'Score 75/100',
        prazo: '12h',
        owner: 'Auditoria Financeira',
        status: 'pending',
        actionLabel: 'Enviar para checklist',
        endpoint: '/mcp/opme/gerar-checklist-pre-auditoria',
        payload: { guiaId: '66109' },
      },
    ],
  },
  {
    id: 'outliers',
    title: 'Casos Outliers de Lead Time',
    description: 'Anomalias detectadas no controle estatístico de processo.',
    items: [
      {
        id: 'outlier-001',
        title: 'Sompo • Hospital A • 42h (p90 19h)',
        impactValue: '+23h vs meta',
        prazo: 'Imediato',
        owner: 'Coordenação Autorização',
        status: 'pending',
        actionLabel: 'Escalar convênio',
        endpoint: '/mcp/opme/abrir-canal-direto',
        payload: { convenio: 'Sompo Saúde', hospitalId: 'HSP-022' },
      },
      {
        id: 'outlier-002',
        title: 'Bradesco • Hospital B • 36h (p90 18h)',
        impactValue: 'R$ 22k atrasados',
        prazo: 'Hoje',
        owner: 'Central Autorização',
        status: 'inProgress',
        actionLabel: 'Repriorizar fila',
        endpoint: '/mcp/opme/repriorizar-autorizacoes',
        payload: { convenio: 'Bradesco Saúde' },
      },
    ],
  },
  {
    id: 'docs',
    title: 'Pendências Documentais',
    description: 'Solicitações aguardando anexos obrigatórios.',
    items: [
      {
        id: 'doc-001',
        title: 'Guia 55210 • Amil • Falta laudo anestésico',
        impactValue: 'R$ 19k bloqueados',
        prazo: '4h',
        owner: 'Hospital Nova Vida',
        status: 'pending',
        actionLabel: 'Solicitar docs',
        endpoint: '/mcp/opme/solicitar-documentos',
        payload: { guiaId: '55210', checklist: ['laudo_anestesico', 'termo_responsabilidade'] },
      },
      {
        id: 'doc-002',
        title: 'Guia 59340 • Porto • Falta fotos implante',
        impactValue: 'R$ 11k bloqueados',
        prazo: '8h',
        owner: 'Hospital São Lucas',
        status: 'pending',
        actionLabel: 'Requisitar evidências',
        endpoint: '/mcp/opme/solicitar-documentos',
        payload: { guiaId: '59340', checklist: ['fotos_implante', 'etiquetas'] },
      },
    ],
  },
  {
    id: 'negociacoes',
    title: 'Negociações em andamento',
    description: 'Acompanhamento das tratativas com fornecedores.',
    items: [
      {
        id: 'neg-001',
        title: 'Fabricante X • Ortopedia • Lote 120 un.',
        impactValue: 'R$ 140k economia proj.',
        prazo: 'D+2',
        owner: 'Compras',
        status: 'inProgress',
        actionLabel: 'Atualizar contrapartidas',
        endpoint: '/mcp/opme/registrar-contrapartida',
        payload: { fabricante: 'Fabricante X', lote: 120 },
      },
    ],
  },
  {
    id: 'estoque',
    title: 'Itens em risco de ruptura',
    description: 'Dias de cobertura abaixo da meta por item crítico.',
    items: [
      {
        id: 'estoque-001',
        title: 'Stent XYZ • Cobertura 3 dias',
        impactValue: 'Meta ≥ 7 dias',
        prazo: '24h',
        owner: 'Suprimentos',
        status: 'pending',
        actionLabel: 'Negociar consignado',
        endpoint: '/mcp/opme/abrir-negociacao-fornecedor',
        payload: { item: 'Stent XYZ', coberturaAtual: 3 },
      },
    ],
  },
];

export const flowMermaidDiagrams: MermaidDiagramCard[] = [
  {
    title: 'Autorização Digital Assistida',
    description: 'Fluxo sem papel com validação automática e aprovação médica.',
    diagram: `graph LR
      A[Pré-checagem IA] --> B[Checklist convênio]
      B --> C[Envio portal/RPA]
      C --> D{Retorno?}
      D -- Aprovado --> E[SLA monitorado 24/7]
      D -- Pendência --> F[Playbook tratativa]
      F --> B
      E --> G[Atualiza painel & notifica equipes]
    `,
  },
  {
    title: 'Faturamento & Recurso de Glosa',
    description: 'Pipeline de faturamento com tratativa automática de glosa técnica e administrativa.',
    diagram: `graph TD
      Lote[Lote OPME] --> Validar[Validador TISS/TUSS]
      Validar --> Protocolo[Protocolo + anexos]
      Protocolo --> Pagamento{Retorno convênio}
      Pagamento -- Pago --> Conciliacao[Conciliação bancária]
      Pagamento -- Glosa --> Analise[Classificação automática]
      Analise --> Recursos[Templates jurídicos/assistenciais]
      Recursos --> Reenvio[Reenvio portal]
      Reenvio --> Pagamento
    `,
  },
];

export const integrationNetworkSpecs: AntVSpecCard[] = [
  {
    title: 'Saúde das integrações RPA/TISS',
    description: 'Status em tempo real dos conectores e portais monitorados.',
    height: 280,
    spec: {
      type: 'interval',
      data: [
        { categoria: 'Portais', status: 'Online', valor: 14 },
        { categoria: 'Portais', status: 'Com alerta', valor: 3 },
        { categoria: 'Portais', status: 'Em manutenção', valor: 1 },
        { categoria: 'APIs', status: 'Online', valor: 9 },
        { categoria: 'APIs', status: 'Com alerta', valor: 2 },
      ],
      transform: [{ type: 'stackY' }],
      encode: {
        x: 'categoria',
        y: 'valor',
        color: 'status',
      },
      scale: {
        color: {
          range: ['#34d399', '#f59e0b', '#f87171'],
        },
      },
      axis: {
        x: { label: { style: { fill: '#e2e8f0' } }, grid: null },
        y: { label: { style: { fill: '#e2e8f0' } }, grid: { line: { style: { stroke: 'rgba(148,163,184,0.15)' } } } },
      },
      legend: {
        label: { style: { fill: '#e2e8f0' } },
      },
      theme: { backgroundColor: '#0f172a' },
    },
  },
];

export const kanbanQuickCharts: QuickChartInsight[] = [
  {
    title: 'Fluxo Kanban OPME',
    subtitle: 'Quantidade por estágio',
    commentary: 'Backlog controlado com maior concentração em “Recurso de glosa”.',
    config: {
      type: 'doughnut',
      data: {
        labels: ['Solicitação', 'Autorização', 'Implante', 'Faturamento', 'Recurso de glosa'],
        datasets: [
          {
            data: [32, 27, 19, 22, 14],
            backgroundColor: ['#38bdf8', '#34d399', '#fbbf24', '#a855f7', '#f97316'],
          },
        ],
      },
      options: {
        plugins: {
          legend: { position: 'right', labels: { color: '#e2e8f0' } },
        },
        backgroundColor: '#0f172a',
      },
    },
  },
];

export const playbookFlowDiagrams: MermaidDiagramCard[] = [
  {
    title: 'Playbook – Materiais consignados',
    description: 'Fluxo resumido para o convênio com maior giro de consignado.',
    diagram: `graph LR
      Solicitacao -->|Checklist convênio| Auditoria
      Auditoria -->|OK| ProgramacaoCirurgica
      ProgramacaoCirurgica --> Consignacao[Consignação]
      Consignacao -->|Confirmação estoque| CentroCirurgico
      CentroCirurgico --> UploadEvidencias
      UploadEvidencias --> Faturamento
      Faturamento --> Recurso{Glosa?}
      Recurso -- Sim --> Tratativa
      Recurso -- Não --> Pagamento`
  },
];

export const aiAntVSpecs: AntVSpecCard[] = [
  {
    title: 'Probabilidade de Glosa por convênio',
    description: 'Score IA com quartis de risco para priorização de auditoria preventiva.',
    height: 280,
    spec: {
      type: 'box',
      data: [
        { conv: 'Amil', tipo: 'Score', valor: 0.38 },
        { conv: 'Amil', tipo: 'Score', valor: 0.42 },
        { conv: 'Amil', tipo: 'Score', valor: 0.29 },
        { conv: 'Amil', tipo: 'Score', valor: 0.47 },
        { conv: 'SulAmérica', tipo: 'Score', valor: 0.31 },
        { conv: 'SulAmérica', tipo: 'Score', valor: 0.36 },
        { conv: 'SulAmérica', tipo: 'Score', valor: 0.28 },
        { conv: 'Bradesco', tipo: 'Score', valor: 0.52 },
        { conv: 'Bradesco', tipo: 'Score', valor: 0.58 },
        { conv: 'Bradesco', tipo: 'Score', valor: 0.45 },
      ],
      encode: {
        x: 'conv',
        y: 'valor',
        color: 'conv',
      },
      theme: { backgroundColor: '#0f172a', view: { viewFill: '#0f172a' } },
      axis: {
        x: { label: { style: { fill: '#e2e8f0' } }, grid: null },
        y: { label: { style: { fill: '#e2e8f0' }, formatter: (val: number) => `${Math.round(val * 100)}%` }, grid: { line: { style: { stroke: 'rgba(148,163,184,0.15)' } } } },
      },
      legend: { label: { style: { fill: '#e2e8f0' } } },
    },
  },
];

export const governanceDiagrams: MermaidDiagramCard[] = [
  {
    title: 'Governança de dados OPME',
    description: 'Papéis e responsabilidades para LGPD e versionamento.',
    diagram: `graph TD
      DPO[Encarregado LGPD] --> Comitê
      Comitê --> AuditoriaClinica
      Comitê --> TIIntegracoes
      Comitê --> Financeiro
      AuditoriaClinica --> RevisaoProtocolos
      TIIntegracoes --> MonitoramentoAPIs
      Financeiro --> RelatoriosConselho
      RelatoriosConselho --> Diretoria
    `,
  },
  {
    title: 'Segurança & contingência',
    description: 'Fluxo de resposta a incidentes envolvendo dados sensíveis.',
    diagram: `graph LR
      Detectar --> Classificar
      Classificar -->|Grau alto| AtivarResposta
      AtivarResposta --> ComunicarAutoridades
      AtivarResposta --> SquadForense
      SquadForense --> Contencao
      Contencao --> Recuperacao
      Recuperacao --> Lessons[Lessons learned]
      Lessons --> Detectar
    `,
  },
];

export const errorQuickCharts: QuickChartInsight[] = [
  {
    title: 'Impacto financeiro por glosa',
    subtitle: 'Semana atual',
    commentary: 'Documentação e divergência de pacote concentram 56% do valor glosado.',
    config: {
      type: 'horizontalBar',
      data: {
        labels: ['Documentação', 'Pacote', 'Autorização expirada', 'Material não contratado', 'Outros'],
        datasets: [
          {
            data: [520, 420, 180, 160, 110],
            backgroundColor: ['#f97316', '#facc15', '#38bdf8', '#a855f7', '#94a3b8'],
          },
        ],
      },
      options: {
        plugins: { legend: { display: false } },
        indexAxis: 'y',
        scales: {
          x: { ticks: { color: '#e2e8f0' }, grid: { color: 'rgba(148,163,184,0.1)' } },
          y: { ticks: { color: '#e2e8f0' }, grid: { display: false } },
        },
        backgroundColor: '#0f172a',
      },
    },
  },
];

export const reportQuickCharts: QuickChartInsight[] = [
  {
    title: 'Cadência de relatórios',
    subtitle: 'Volumes entregues por semana',
    commentary: 'Entrega média de 58 relatórios executivos por semana com automação.',
    config: {
      type: 'bar',
      data: {
        labels: ['Sem 23', 'Sem 24', 'Sem 25', 'Sem 26', 'Sem 27'],
        datasets: [
          {
            label: 'Executivo',
            data: [18, 22, 24, 25, 27],
            backgroundColor: '#34d399',
          },
          {
            label: 'Financeiro',
            data: [14, 13, 15, 17, 16],
            backgroundColor: '#38bdf8',
          },
          {
            label: 'Operacional',
            data: [12, 10, 11, 12, 13],
            backgroundColor: '#a855f7',
          },
        ],
      },
      options: {
        plugins: { legend: { position: 'bottom', labels: { color: '#e2e8f0' } } },
        scales: {
          x: { ticks: { color: '#e2e8f0' }, grid: { display: false } },
          y: { ticks: { color: '#e2e8f0' }, grid: { color: 'rgba(148,163,184,0.1)' } },
        },
        backgroundColor: '#0f172a',
      },
    },
  },
];

export const onboardingDiagrams: MermaidDiagramCard[] = [
  {
    title: 'Timeline de implantação',
    description: 'Gantt simplificado com as fases de onboarding.',
    diagram: `gantt
      title Onboarding OPME
      dateFormat  YYYY-MM-DD
      section Preparação
      Descoberta & Kickoff        :done,    des1, 2025-05-01, 7d
      Catálogo & integrações      :active,  des2, 2025-05-08, 10d
      section Implantação
      Treinamento squads          :        des3, 2025-05-18, 7d
      Automação faturamento       :        des4, 2025-05-25, 10d
      section Go-live
      Monitoramento assistido     :        des5, 2025-06-04, 14d
    `,
  },
];

export const apiQuickCharts: QuickChartInsight[] = [
  {
    title: 'Latência média API / Webhook',
    subtitle: 'Últimas 24 horas',
    commentary: 'Latência abaixo de 500ms para principais integrações.',
    config: {
      type: 'line',
      data: {
        labels: ['00h', '04h', '08h', '12h', '16h', '20h'],
        datasets: [
          {
            label: 'POST /opme/solicitacoes',
            data: [420, 380, 350, 360, 370, 390],
            borderColor: '#34d399',
            fill: false,
          },
          {
            label: 'Webhook /autorizacoes',
            data: [280, 260, 240, 250, 255, 260],
            borderColor: '#38bdf8',
            fill: false,
          },
        ],
      },
      options: {
        plugins: { legend: { position: 'bottom', labels: { color: '#e2e8f0' } } },
        scales: {
          x: { ticks: { color: '#e2e8f0' }, grid: { color: 'rgba(148,163,184,0.1)' } },
          y: { ticks: { color: '#e2e8f0', callback: (value: number) => `${value}ms` }, grid: { color: 'rgba(148,163,184,0.1)' } },
        },
        backgroundColor: '#0f172a',
      },
    },
  },
];

export const raciDiagrams: MermaidDiagramCard[] = [
  {
    title: 'RACI – Processo de faturamento OPME',
    description: 'Visão do responsável, accountable, consultados e informados.',
    diagram: `graph TD
      Submeter[Submeter solicitação] -->|R| Auditoria
      Submeter -->|C| MédicoSolicitante
      Auditoria -->|A| CoordenadorOPME
      Auditoria -->|C| Jurídico
      Faturar[Faturar lote] -->|R| Financeiro
      Faturar -->|C| Auditoria
      Recurso[Recurso de glosa] -->|R| Jurídico
      Recurso -->|A| DiretorFinanceiro
      Painel[Atualizar painel C-level] -->|I| Diretoria
      Painel -->|C| PMO
    `,
  },
];

export const roadmapQuickCharts: QuickChartInsight[] = [
  {
    title: 'Roadmap – entregáveis',
    subtitle: 'Progresso acumulado',
    commentary: 'Execução dentro do previsto: 62% concluído até o horizonte de 180 dias.',
    config: {
      type: 'polarArea',
      data: {
        labels: ['90 dias', '180 dias', '365 dias'],
        datasets: [
          {
            data: [85, 62, 24],
            backgroundColor: ['rgba(59,130,246,0.6)', 'rgba(34,197,94,0.6)', 'rgba(250,204,21,0.6)'],
          },
        ],
      },
      options: {
        plugins: { legend: { position: 'bottom', labels: { color: '#e2e8f0' } } },
        backgroundColor: '#0f172a',
      },
    },
  },
];

export const principlesQuickCharts: QuickChartInsight[] = [
  {
    title: 'Aderência aos princípios estratégicos',
    subtitle: 'Indicadores de maturidade',
    commentary: 'Compliance de dados e automação já acima de 80% — foco em IA explicável.',
    config: {
      type: 'radar',
      data: {
        labels: ['Governança de dados', 'Automação assistida', 'IA explicável', 'Rastreabilidade', 'Compliance'],
        datasets: [
          {
            label: 'Maturidade atual',
            data: [88, 84, 72, 90, 94],
            borderColor: '#38bdf8',
            backgroundColor: 'rgba(56, 189, 248, 0.25)',
          },
          {
            label: 'Meta 12 meses',
            data: [95, 92, 90, 95, 98],
            borderColor: '#22c55e',
            backgroundColor: 'rgba(34, 197, 94, 0.15)',
          },
        ],
      },
      options: {
        plugins: { legend: { position: 'bottom', labels: { color: '#e2e8f0' } } },
        scales: {
          r: {
            angleLines: { color: 'rgba(148,163,184,0.15)' },
            grid: { color: 'rgba(148,163,184,0.15)' },
            pointLabels: { color: '#e2e8f0' },
            ticks: { backdropColor: 'transparent', color: '#cbd5f5' },
          },
        },
        backgroundColor: '#0f172a',
      },
    },
  },
];

export const sistemaQuickCharts: QuickChartInsight[] = [
  {
    title: 'Disponibilidade plataforma OPME',
    subtitle: 'Uptime últimos 30 dias',
    commentary: 'Módulo estável com 99,82% de disponibilidade, sem incidentes críticos.',
    config: {
      type: 'line',
      data: {
        labels: Array.from({ length: 30 }, (_, i) => `D${i + 1}`),
        datasets: [
          {
            label: 'Uptime diário (%)',
            data: [99.6, 99.7, 99.9, 99.8, 99.9, 99.7, 99.8, 99.9, 99.8, 99.6, 99.7, 99.9, 99.9, 99.8, 99.8, 99.9, 99.7, 99.8, 99.9, 99.9, 99.8, 99.8, 99.9, 99.9, 99.7, 99.8, 99.9, 99.8, 99.9, 99.9],
            borderColor: '#22c55e',
            fill: false,
            tension: 0.3,
          },
        ],
      },
      options: {
        plugins: { legend: { position: 'bottom', labels: { color: '#e2e8f0' } } },
        scales: {
          x: { ticks: { color: '#e2e8f0' }, grid: { color: 'rgba(148,163,184,0.1)' } },
          y: { ticks: { color: '#e2e8f0' }, grid: { color: 'rgba(148,163,184,0.1)' }, suggestedMin: 99.4, suggestedMax: 100 },
        },
        backgroundColor: '#0f172a',
      },
    },
  },
];

export const convenioStatus: OPMEConvenioStatus[] = [
  {
    operador: 'Amil / Mediservice',
    health: 'onTrack',
    faturamento: 4.2,
    faturamentoMeta: 4.0,
    glosaPercentual: 2.4,
    tendencia: -0.8,
    slaAutorizacao: '12h',
    comentario: 'Portal e TISS sincronizados, renegociação de pacote concluída.',
  },
  {
    operador: 'Bradesco Saúde',
    health: 'attention',
    faturamento: 3.1,
    faturamentoMeta: 3.4,
    glosaPercentual: 4.9,
    tendencia: 0.6,
    slaAutorizacao: '26h',
    comentario: 'Aguardando ajuste de anexos OPME; task force jurídica em curso.',
  },
  {
    operador: 'SulAmérica Saúde',
    health: 'onTrack',
    faturamento: 3.6,
    faturamentoMeta: 3.5,
    glosaPercentual: 3.1,
    tendencia: -0.4,
    slaAutorizacao: '18h',
    comentario: 'Validador TUSS estabilizado; conciliação financeira semanal.',
  },
  {
    operador: 'Porto Seguro Saúde',
    health: 'attention',
    faturamento: 2.8,
    faturamentoMeta: 3.0,
    glosaPercentual: 5.2,
    tendencia: 0.9,
    slaAutorizacao: '32h',
    comentario: 'Recurso de glosa aguardando retorno do convênio (D-8).',
  },
  {
    operador: 'Allianz Saúde',
    health: 'onTrack',
    faturamento: 1.9,
    faturamentoMeta: 1.8,
    glosaPercentual: 2.2,
    tendencia: -0.5,
    slaAutorizacao: '15h',
    comentario: 'Integração portal + RPA ativa; foco em auditoria de lote.',
  },
  {
    operador: 'Golden Cross',
    health: 'attention',
    faturamento: 1.5,
    faturamentoMeta: 1.7,
    glosaPercentual: 4.4,
    tendencia: 0.3,
    slaAutorizacao: '28h',
    comentario: 'Dependente de upload manual; migração para API em homologação.',
  },
  {
    operador: 'Care Plus',
    health: 'onTrack',
    faturamento: 1.2,
    faturamentoMeta: 1.1,
    glosaPercentual: 2.7,
    tendencia: -0.2,
    slaAutorizacao: '14h',
    comentario: 'Fluxo premium com concierge médico ativo.',
  },
  {
    operador: 'Sompo Saúde',
    health: 'critical',
    faturamento: 0.9,
    faturamentoMeta: 1.4,
    glosaPercentual: 6.8,
    tendencia: 1.6,
    slaAutorizacao: '36h',
    comentario: 'Backlog de recursos acumulado — war room semanal instituído.',
  },
  {
    operador: 'Prevent Senior',
    health: 'attention',
    faturamento: 1.6,
    faturamentoMeta: 1.7,
    glosaPercentual: 3.9,
    tendencia: 0.4,
    slaAutorizacao: '22h',
    comentario: 'Nova matriz de riscos em implantação (horizonte 30 dias).',
  },
  {
    operador: 'NotreDame Intermédica / Hapvida',
    health: 'onTrack',
    faturamento: 3.9,
    faturamentoMeta: 3.8,
    glosaPercentual: 3.3,
    tendencia: -0.6,
    slaAutorizacao: '20h',
    comentario: 'Integração concluída com consolidação automática de guias.',
  },
  {
    operador: 'Unimed Nacional (CNU)',
    health: 'attention',
    faturamento: 2.4,
    faturamentoMeta: 2.6,
    glosaPercentual: 4.5,
    tendencia: 0.7,
    slaAutorizacao: '30h',
    comentario: 'Dependência de anexos físicos — digitalização em rollout.',
  },
  {
    operador: 'Unimed do Brasil / Federações',
    health: 'onTrack',
    faturamento: 2.1,
    faturamentoMeta: 2.0,
    glosaPercentual: 3.0,
    tendencia: -0.3,
    slaAutorizacao: '21h',
    comentario: 'Hub Unimed com painel de SLA compartilhado.',
  },
  {
    operador: 'Unimed BH / Curitiba / Federações Estaduais',
    health: 'attention',
    faturamento: 1.7,
    faturamentoMeta: 1.9,
    glosaPercentual: 4.2,
    tendencia: 0.5,
    slaAutorizacao: '27h',
    comentario: 'Monitoramento de lotes consignados em curso.',
  },
  {
    operador: 'Unimeds singulares',
    health: 'critical',
    faturamento: 1.1,
    faturamentoMeta: 1.6,
    glosaPercentual: 7.1,
    tendencia: 1.9,
    slaAutorizacao: '40h',
    comentario: 'Necessário reforçar catálogo unificado e checklist clínico.',
  },
  {
    operador: 'Autogestões & Estatais',
    health: 'attention',
    faturamento: 2.9,
    faturamentoMeta: 3.2,
    glosaPercentual: 4.7,
    tendencia: 0.8,
    slaAutorizacao: '34h',
    comentario: 'Processo híbrido com exigência de dossiês físicos.',
  },
  {
    operador: 'São Cristóvão Saúde',
    health: 'onTrack',
    faturamento: 1.3,
    faturamentoMeta: 1.2,
    glosaPercentual: 2.5,
    tendencia: -0.4,
    slaAutorizacao: '16h',
    comentario: 'Integração completa com workflow de evidências fotográficas.',
  },
  {
    operador: 'Planos estaduais/municipais',
    health: 'attention',
    faturamento: 2.2,
    faturamentoMeta: 2.5,
    glosaPercentual: 5.5,
    tendencia: 1.2,
    slaAutorizacao: '42h',
    comentario: 'Necessário reforçar agenda de negociação e portal unificado.',
  },
];

export const executiveMetrics: OPMEExecutiveMetric[] = [
  {
    titulo: 'Receita OPME vs Meta (R$)',
    descricao:
      'Comparativo meta vs realizado com desvio percentual e tendência móvel 3/6/12 meses.',
    breakdowns: ['Períodos: dia, semana, mês, trimestre, ano', 'Drill-down: convênio, contrato, unidade, médico, procedimento'],
    sinalizacoes: ['Semáforo OKR', 'Alertas push automáticos'],
  },
  {
    titulo: 'Índice de Glosa OPME',
    descricao:
      'Valor e percentual de glosa separados por técnica x administrativa, recuperável x não recuperável.',
    breakdowns: ['Convênio', 'Procedimento', 'Item OPME'],
    sinalizacoes: ['Heatmap de risco por convênio/processo/fornecedor'],
  },
  {
    titulo: 'Taxa de autorização OPME',
    descricao: 'Percentual autorizado na 1ª submissão e tempo médio de autorização em horas.',
    breakdowns: ['Tipo (eletivo x urgência)', 'Convênio', 'Médico solicitante'],
  },
  {
    titulo: 'Faturamento perdido x Total apresentado',
    descricao: 'Monitoramento de receita perdida por glosa ou atraso vs total faturado.',
    breakdowns: ['Convênio', 'Motivo de perda', 'Status de recurso'],
  },
  {
    titulo: 'Tempo de ciclo OPME',
    descricao: 'SLA do ciclo pedido → uso → cobrança → pagamento.',
    breakdowns: ['Convênio', 'Tipo de procedimento', 'Unidade executante'],
  },
  {
    titulo: 'DSO/PMR e inadimplência',
    descricao: 'Tempo médio de recebimento e inadimplência em valor e percentual.',
    breakdowns: ['Convênio', 'Faixa de atraso'],
  },
  {
    titulo: 'Custo médio OPME por DRG/Procedimento',
    descricao: 'Custo real dos materiais aplicado ao DRG e margem por convênio.',
    breakdowns: ['DRG', 'Convênio', 'Fornecedor'],
  },
  {
    titulo: 'Top 10 motivos de glosa e itens críticos',
    descricao: 'Pareto financeiro e de frequência para causas e materiais de maior risco.',
    breakdowns: ['Motivo', 'Convênio', 'Fornecedor'],
  },
  {
    titulo: 'Heatmap de risco',
    descricao: 'Probabilidade x impacto por processo, convênio e fornecedor.',
    breakdowns: ['Processo', 'Convênio', 'Fornecedor'],
    sinalizacoes: ['Alertas push', 'Metas por OKR'],
  },
];

export const criticalFlows: OPMEFlow[] = [
  {
    id: 'solicitacao-autorizacao',
    titulo: 'Solicitação e Autorização OPME',
    subtitulo: 'Fluxo ponta a ponta com pré-checagem, anexos e monitoramento de SLA.',
    steps: [
      { ordem: 1, titulo: 'Pré-cheque IA', detalhe: 'Validação clínica e documental com regras por convênio.' },
      { ordem: 2, titulo: 'Anexo OPME', detalhe: 'Geração automática do anexo quando exigido, com templates por convênio.' },
      { ordem: 3, titulo: 'Envio eletrônico', detalhe: 'Transmissão por TISS, portal ou API, com captura de protocolo.' },
      { ordem: 4, titulo: 'Monitor de SLA', detalhe: 'Relógio por prioridade (eletivo ≤ 24h; urgência ≤ 2h).' },
      { ordem: 5, titulo: 'De-para exigências', detalhe: 'Checklist dinâmico de documentos, materiais e regras por convênio.' },
      { ordem: 6, titulo: 'Pendências & reenvios', detalhe: 'Tratativa guiada, checklist, reenvio automatizado e registro de lições.' },
    ],
  },
  {
    id: 'rastreabilidade-uso',
    titulo: 'Rastreabilidade e Uso',
    steps: [
      { ordem: 1, titulo: 'Identificação completa', detalhe: 'UDI, lote, série e ANVISA vinculados ao paciente/procedimento.' },
      { ordem: 2, titulo: 'Evidências anexas', detalhe: 'Fotos, etiquetas e cadeia fria com timestamp quando aplicável.' },
      { ordem: 3, titulo: 'Conciliação', detalhe: 'Uso x pedido x nota fiscal com alarmes de divergência.' },
    ],
  },
  {
    id: 'faturamento-glosa',
    titulo: 'Faturamento e Glosa',
    steps: [
      { ordem: 1, titulo: 'Validador TISS/TUSS', detalhe: 'Validação de schema e regras de negócio antes da transmissão.' },
      { ordem: 2, titulo: 'Gestão de protocolo', detalhe: 'Recebimento de demonstrativo, glosa e evidências em repositório único.' },
      { ordem: 3, titulo: 'Automação de recursos', detalhe: 'Templates jurídicos/assistenciais conforme motivo e convênio.' },
      { ordem: 4, titulo: 'Conciliação financeira', detalhe: 'Esteira bancária, NF, estoque e custo real conciliados por lote.' },
    ],
  },
];

export const aiInsights: OPMEAIInsight[] = [
  {
    tipo: 'preditivo',
    titulo: 'Probabilidade de glosa',
    descricao: 'Score 0–1 por guia/item apontando motivos prováveis e correções recomendadas antes do envio.',
    entregaveis: ['Lista priorizada de guias críticas', 'Explicações por regra violada'],
  },
  {
    tipo: 'preditivo',
    titulo: 'Ruptura de estoque OPME',
    descricao: 'Projeção de consumo e lead-time para antecipar compra ou consignação.',
  },
  {
    tipo: 'anomalia',
    titulo: 'Detecção de anomalias de glosa',
    descricao: 'Identifica saltos atípicos por material/convênio após atualização de manual ou negociação.',
  },
  {
    tipo: 'what-if',
    titulo: 'Simulações what-if',
    descricao: 'Correlaciona tempo de autorização vs cancelamento cirúrgico e custo OPME vs margem por DRG.',
  },
  {
    tipo: 'prescritivo',
    titulo: 'Oráculo de ROI',
    descricao: 'Sugere ações com maior retorno (treinar equipe, renegociar cláusula, trocar fornecedor).',
    entregaveis: ['Botão “Gerar Plano” com tarefas, responsáveis e prazos', 'Checklist de mitigação automática'],
  },
];

export const integrationStatuses: OPMEIntegrationStatus[] = [
  {
    categoria: 'nacionaisPrivados',
    operador: 'Amil / Mediservice',
    integracao: 'TISS + Portal (anexos OPME)',
    artefatos: ['Anexo OPME', 'Laudos clínicos', 'Etiquetas com UDI/ANVISA'],
    statusMonitores: ['API/TISS', 'Portal', 'SLA autorização', 'Versão manual vigente'],
  },
  {
    categoria: 'nacionaisPrivados',
    operador: 'Bradesco Saúde',
    integracao: 'TISS + Portal com checklists específicos',
    artefatos: ['Parecer auditoria interna', 'Notas e etiquetas'],
    statusMonitores: ['TISS', 'Portal', 'Fila de pendências', 'Glosa técnica x administrativa'],
  },
  {
    categoria: 'nacionaisPrivados',
    operador: 'SulAmérica Saúde',
    integracao: 'TISS + Portal com validações TUSS rígidas',
    artefatos: ['Laudos de imagem', 'Consentimento informado'],
    statusMonitores: ['TISS', 'Portal', 'Validador TUSS', 'SLA'],
  },
  {
    categoria: 'nacionaisPrivados',
    operador: 'Porto Seguro Saúde',
    integracao: 'TISS + Portal com regras de pacotes',
    artefatos: ['Protocolo prévio', 'Documentação de pacote/OPME'],
    statusMonitores: ['TISS', 'Portal', 'Regras de pacote', 'Pareto de glosa'],
  },
  {
    categoria: 'nacionaisPrivados',
    operador: 'Allianz Saúde',
    integracao: 'TISS; portal para anexos adicionais',
    artefatos: ['Laudo', 'Parecer médico'],
    statusMonitores: ['TISS', 'Portal', 'Latência', 'Retornos inconsistentes'],
  },
  {
    categoria: 'nacionaisPrivados',
    operador: 'Golden Cross',
    integracao: 'TISS; recursos via portal',
    artefatos: ['Etiquetas OPME com foto'],
    statusMonitores: ['TISS', 'Portal', '1ª autorização', 'Motivos top de glosa'],
  },
  {
    categoria: 'nacionaisPrivados',
    operador: 'Care Plus',
    integracao: 'TISS com alto controle documental',
    artefatos: ['Prontuário resumido', 'UDI'],
    statusMonitores: ['TISS', 'Portal', 'Checagem documental'],
  },
  {
    categoria: 'nacionaisPrivados',
    operador: 'Sompo Saúde',
    integracao: 'TISS / Portal',
    artefatos: ['Compatibilidade clínica detalhada'],
    statusMonitores: ['TISS', 'Portal', 'Erros XML', 'SLA'],
  },
  {
    categoria: 'nacionaisPrivados',
    operador: 'Prevent Senior',
    integracao: 'TISS com protocolos específicos',
    artefatos: ['Laudos seriados', 'Histórico do paciente'],
    statusMonitores: ['TISS', 'Portal', 'Auditoria pré-uso'],
  },
  {
    categoria: 'nacionaisPrivados',
    operador: 'NotreDame Intermédica / Hapvida',
    integracao: 'TISS + Portais regionais',
    artefatos: ['Anexos OPME', 'Regras de pacote', 'Diretrizes rede própria'],
    statusMonitores: ['TISS', 'Portais regionais', 'Divergências regionais'],
  },
  {
    categoria: 'sistemaUnimed',
    operador: 'Unimed Nacional (CNU)',
    integracao: 'TISS + TNUMM para materiais/medicamentos',
    artefatos: ['Anexo OPME quando aplicável', 'De-para TNUMM ↔ TUSS'],
    statusMonitores: ['TISS', 'TNUMM vigente', 'Compatibilidade de tabelas'],
  },
  {
    categoria: 'sistemaUnimed',
    operador: 'Unimed do Brasil / Federações',
    integracao: 'TISS; políticas de rastreabilidade e TNUMM',
    artefatos: ['Etiqueta, lote e UDI atrelados ao atendimento'],
    statusMonitores: ['TISS', 'TNUMM', 'Auditoria rastreável 100%'],
  },
  {
    categoria: 'sistemaUnimed',
    operador: 'Unimed BH / Curitiba / Federações Estaduais',
    integracao: 'TISS + portais locais para anexos OPME',
    artefatos: ['Anexo de Solicitação de OPME por portal'],
    statusMonitores: ['TISS', 'Portal', 'Versões regionais', 'SLA específico'],
  },
  {
    categoria: 'sistemaUnimed',
    operador: 'Unimeds singulares',
    integracao: 'TISS + Anexo de Solicitação via portal',
    artefatos: ['Formulários próprios', 'Laudos', 'Fotos de etiquetas'],
    statusMonitores: ['TISS', 'Portal', 'Catálogo por singular', 'De-para TNUMM'],
  },
  {
    categoria: 'autogestoesEstatais',
    operador: 'CASSI, Postal Saúde, Saúde Caixa, GEAP, Saúde Petrobras (AMS/APS), CABESP, Economus, Fundação Assefaz, Vivest, FUNCEF/SAÚDE',
    integracao: 'TISS (quando disponível) + portais específicos',
    artefatos: ['UDI/lote/ANVISA rastreáveis', 'Evidências de auditoria robustas'],
    statusMonitores: ['TISS', 'Portal', 'SLA autorização', 'Recurso formal', 'Normas internas'],
  },
  {
    categoria: 'outrasOperadoras',
    operador: 'São Cristóvão Saúde',
    integracao: 'TISS + Portal com checagem de pacotes',
    artefatos: ['Planilha de composição OPME quando solicitada'],
    statusMonitores: ['TISS', 'Portal', 'Regras de pacote', 'Pareto de glosa'],
  },
  {
    categoria: 'outrasOperadoras',
    operador: 'Planos estaduais/municipais (IAMSPE, IPSEMG, IPASGO, SASSEPE, PAS etc.)',
    integracao: 'TISS/Portais com rotinas de autorização publicadas',
    artefatos: ['Anexos conforme edital/rotina local'],
    statusMonitores: ['TISS', 'Portal', 'Biblioteca de rotinas', 'Divergências regionais'],
  },
];

export const dataModels: OPMEDataModel[] = [
  {
    entidade: 'Catálogo de Itens OPME',
    descricao: 'Rastreabilidade ponta a ponta com UDI, lote, fornecedor e composição de custo.',
    camposChave: [
      { id: 'id', label: 'Identificador do item' },
      { id: 'cd_tuss', label: 'Código TUSS', hint: 'Padronização ANS' },
      { id: 'descricao', label: 'Descrição comercial' },
      { id: 'udi', label: 'UDI / ANVISA', hint: 'Obrigatório para implantes' },
      { id: 'fornecedor_id', label: 'Fornecedor homologado' },
      { id: 'custo', label: 'Custo unitário real' },
    ],
    ddl: `CREATE TABLE opme_item (
  id SERIAL PRIMARY KEY,
  cd_tuss VARCHAR(20) NOT NULL,
  descricao TEXT NOT NULL,
  anvisa VARCHAR(50),
  udi VARCHAR(100),
  lote VARCHAR(50),
  serie VARCHAR(50),
  fornecedor_id INTEGER,
  custo NUMERIC(14,2),
  validade DATE,
  created_at TIMESTAMP DEFAULT now()
);`,
  },
  {
    entidade: 'Solicitação OPME',
    descricao: 'Guia completa com anexos clínicos, convênio e SLA monitorado.',
    camposChave: [
      { id: 'id', label: 'Número da solicitação' },
      { id: 'paciente_id', label: 'Paciente / prontuário' },
      { id: 'guia_id', label: 'Guia do convênio' },
      { id: 'procedimento_tuss', label: 'Procedimento TUSS' },
      { id: 'status', label: 'Status operacional' },
      { id: 'protocolo', label: 'Protocolo portal/RPA' },
    ],
    ddl: `CREATE TABLE solicitacao_opme (
  id SERIAL PRIMARY KEY,
  paciente_id INTEGER NOT NULL,
  guia_id VARCHAR(50) NOT NULL,
  convenio_id INTEGER NOT NULL,
  procedimento_tuss VARCHAR(20) NOT NULL,
  medico VARCHAR(120),
  anexos JSONB DEFAULT '[]',
  laudos JSONB DEFAULT '[]',
  status VARCHAR(30) NOT NULL,
  protocolo VARCHAR(60),
  sla_limite TIMESTAMP,
  created_at TIMESTAMP DEFAULT now()
);`,
  },
  {
    entidade: 'Autorização',
    descricao: 'Linha do tempo da autorização, prazos e exigências retornadas.',
    camposChave: [
      { id: 'id', label: 'Identificador da autorização' },
      { id: 'solicitacao_id', label: 'Solicitação vinculada' },
      { id: 'status', label: 'Status final / parcial' },
      { id: 'dt_envio', label: 'Data de envio' },
      { id: 'dt_resposta', label: 'Data de resposta' },
    ],
    ddl: `CREATE TABLE autorizacao (
  id SERIAL PRIMARY KEY,
  solicitacao_id INTEGER REFERENCES solicitacao_opme(id),
  status VARCHAR(30) NOT NULL,
  dt_envio TIMESTAMP,
  dt_resposta TIMESTAMP,
  exigencias JSONB DEFAULT '[]',
  protocolo VARCHAR(60)
);`,
  },
  {
    entidade: 'Uso OPME',
    descricao: 'Registro assistencial com fotos, cadeia fria e conferência de implante.',
    camposChave: [
      { id: 'id', label: 'Registro de uso' },
      { id: 'solicitacao_id', label: 'Solicitação' },
      { id: 'itens', label: 'Itens implantados', hint: 'UDI + lote + lote estoque' },
      { id: 'dt_implante', label: 'Data/Hora do implante' },
    ],
    ddl: `CREATE TABLE uso_opme (
  id SERIAL PRIMARY KEY,
  solicitacao_id INTEGER REFERENCES solicitacao_opme(id),
  itens JSONB NOT NULL,
  dt_implante TIMESTAMP
);`,
  },
  {
    entidade: 'Faturamento OPME',
    descricao: 'Controle financeiro dos lotes enviados, valores aprovados e aging.',
    camposChave: [
      { id: 'id', label: 'Lote faturado' },
      { id: 'lote_id', label: 'Identificador interno' },
      { id: 'valor_apresentado', label: 'Valor apresentado' },
      { id: 'valor_pago', label: 'Valor pago' },
      { id: 'dso', label: 'DSO / PMR', hint: 'Dias para receber' },
    ],
    ddl: `CREATE TABLE faturamento (
  id SERIAL PRIMARY KEY,
  lote_id VARCHAR(60),
  valor_apresentado NUMERIC(14,2) NOT NULL,
  valor_pago NUMERIC(14,2),
  dt_envio TIMESTAMP,
  dt_pgto TIMESTAMP,
  dso INTEGER
);`,
  },
  {
    entidade: 'Gestão de Glosas',
    descricao: 'Motivos, valores e tratativas de glosa com plano de recuperação.',
    camposChave: [
      { id: 'id', label: 'Registro de glosa' },
      { id: 'faturamento_id', label: 'Lote referente' },
      { id: 'motivo_codigo', label: 'Motivo / categoria' },
      { id: 'valor', label: 'Impacto financeiro' },
      { id: 'tipo', label: 'Tipo (técnica/administrativa)' },
      { id: 'recuperavel', label: 'Recuperável?', hint: 'Sim/não' },
    ],
    ddl: `CREATE TABLE glosa (
  id SERIAL PRIMARY KEY,
  faturamento_id INTEGER REFERENCES faturamento(id),
  item_id INTEGER REFERENCES opme_item(id),
  motivo_codigo VARCHAR(20),
  motivo_texto TEXT,
  valor NUMERIC(14,2) NOT NULL,
  tipo VARCHAR(12) CHECK (tipo IN ('tecnica','administrativa')),
  recuperavel BOOLEAN DEFAULT TRUE,
  dt_recurso TIMESTAMP,
  status_recurso VARCHAR(30),
  valor_recuperado NUMERIC(14,2) DEFAULT 0
);`,
  },
  {
    entidade: 'Monitor de Integrações',
    descricao: 'Saúde dos conectores RPA/TISS com latência e erros de transmissão.',
    camposChave: [
      { id: 'id', label: 'Evento de integração' },
      { id: 'sistema', label: 'Sistema origem/destino' },
      { id: 'status', label: 'Status' },
      { id: 'latencia_ms', label: 'Latência (ms)' },
      { id: 'erro_codigo', label: 'Erro retornado' },
    ],
    ddl: `CREATE TABLE integracao_log (
  id SERIAL PRIMARY KEY,
  sistema VARCHAR(80),
  tipo VARCHAR(40),
  status VARCHAR(20),
  latencia_ms INTEGER,
  erro_codigo VARCHAR(40),
  timestamp TIMESTAMP DEFAULT now()
);`,
  },
  {
    entidade: 'Trilha de Auditoria LGPD',
    descricao: 'Registro de quem acessou dados sensíveis, com IP e recurso utilizado.',
    camposChave: [
      { id: 'id', label: 'Evento' },
      { id: 'usuario', label: 'Usuário' },
      { id: 'acao', label: 'Ação executada' },
      { id: 'recurso', label: 'Recurso acessado' },
      { id: 'ip', label: 'IP de origem' },
      { id: 'timestamp', label: 'Data e hora' },
    ],
    ddl: `CREATE TABLE auditoria (
  id SERIAL PRIMARY KEY,
  usuario VARCHAR(120),
  acao VARCHAR(80),
  recurso VARCHAR(120),
  ip VARCHAR(45),
  timestamp TIMESTAMP DEFAULT now()
);`,
  },
];

export const metricFormulas: OPMEMetricFormula[] = [
  { nome: 'Índice de Glosa (%)', formula: '(Σ valor_glosado / Σ valor_apresentado) × 100' },
  { nome: 'Taxa de recuperação (%)', formula: '(Σ valor_recuperado / Σ valor_glosado_recorrido) × 100' },
  { nome: 'Tempo médio de autorização (h)', formula: 'média(dt_autorização − dt_envio)' },
  {
    nome: 'Margem por convênio (%)',
    formula: '((receita − custo_opme − custo_operacional) / receita) × 100',
  },
  {
    nome: 'Qualidade por convênio (score 0–100)',
    formula: 'w1*(1−glosa%) + w2*(autorização_1ª%) + w3*(SLA_ok%) + w4*(DSO_normalizado)',
    observacoes: ['Registrar pesos no catálogo de dados', 'Memória de cálculo exibida na interface'],
  },
  {
    nome: 'Tempo de ciclo OPME (dias)',
    formula: 'dt_pgto − dt_solicitação',
  },
  {
    nome: 'Autorização 1ª submissão (%)',
    formula: 'guias_autorizadas_1a / guias_enviadas',
  },
  {
    nome: 'Faturamento perdido (R$)',
    formula: 'Σ glosas não recuperadas',
  },
  {
    nome: 'DSO/PMR (dias)',
    formula: 'média(dt_pgto − dt_envio_fatura)',
  },
];

export const governanceRequirements: GovernanceRequirement[] = [
  {
    tema: 'LGPD by design',
    itens: [
      'Minimização e pseudonimização de dados sensíveis',
      'Base legal documentada e gestão de consentimento',
      'Direitos do titular contemplados nos fluxos',
    ],
  },
  {
    tema: 'Perfis de acesso e segurança',
    itens: [
      'RBAC/ABAC com MFA',
      'Segregação de ambientes e gestão de segredos',
      'Trilhas de auditoria para acesso/exportação',
    ],
  },
  {
    tema: 'Versionamento e compliance',
    itens: [
      'Versionamento de TISS/TUSS/TNUMM e manuais por convênio',
      'Backups com RPO/RTO definidos',
      'Criptografia em repouso e trânsito',
    ],
  },
];

export const errorPlaybooks: OPMEErrorPlaybook[] = [
  {
    categoria: 'Documental',
    motivo: 'Anexo faltante ou etiqueta ilegível',
    definicao: 'Documentação obrigatória ausente ou sem padrão exigido pelo convênio.',
    causaRaiz: 'Checklist incompleto, anexos despadronizados ou baixa qualidade da captura.',
    prevencao: [
      'Checklist pré-envio com validação IA',
      'Treinamento da equipe assistencial para captura de imagens',
      'Obrigatoriedade de formato e resolução mínima',
    ],
    recurso: [
      'Template de recurso com anexos mínimos (laudo, etiqueta, NF)',
      'Registro fotográfico padronizado',
    ],
    owner: 'Faturamento OPME',
    sla: 'Correção em até 24h',
  },
  {
    categoria: 'Técnica',
    motivo: 'TUSS incorreto ou item fora do pacote',
    definicao: 'Inconsistência de codificação TUSS ou regras de pacote descumpridas.',
    causaRaiz: 'Manuais desatualizados ou parametrização divergente.',
    prevencao: ['De-para TUSS/TNUMM atualizado', 'Validador de pacote por convênio', 'Auditoria IA antes do envio'],
    recurso: ['Template citando diretriz clínica', 'Evidências de compatibilidade'],
    owner: 'Auditoria Assistencial',
    sla: 'Revisão imediata (≤ 8h)',
  },
  {
    categoria: 'Conformidade',
    motivo: 'Rastreabilidade incompleta (UDI/lote/ANVISA)',
    definicao: 'Falta de vínculo entre item e paciente com evidência de rastreabilidade.',
    causaRaiz: 'Processo manual sem conferência cruzada.',
    prevencao: ['Obrigatoriedade de UDI/lote/ANVISA', 'Registro via app ou coletor', 'Auditoria automática pós-implante'],
    recurso: ['Evidências fotográficas', 'Etiqueta, NF e relatório assistencial'],
    owner: 'Centro Cirúrgico / Suprimentos',
    sla: 'Correção em até 12h',
  },
  {
    categoria: 'Contrato',
    motivo: 'Alçada, carência ou política de preço infringida',
    definicao: 'Condições contratuais não cumpridas.',
    causaRaiz: 'Negociações não refletidas no sistema ou falta de alerta.',
    prevencao: ['Regras contratuais parametrizadas', 'Integração com módulo jurídico', 'Alçadas automatizadas'],
    recurso: ['Template jurídico citando cláusula contratual', 'Histórico de negociações'],
    owner: 'Jurídico & Controladoria',
    sla: 'Resposta até 48h',
  },
  {
    categoria: 'Timing',
    motivo: 'Prazos de envio ou recurso estourados',
    definicao: 'Envio fora da janela contratual ou recurso tardio.',
    causaRaiz: 'Falta de monitoramento de SLA e alertas por canal.',
    prevencao: ['Alertas por convênio e status', 'Kanban com SLA restante', 'Escalonamento automático'],
    recurso: ['Template com justificativa formal', 'Protocolo detalhado'],
    owner: 'Operações de Faturamento',
    sla: 'Acompanhamento diário',
  },
];

export const playbooks: OPMEPlaybookCard[] = [
  {
    convenio: 'Amil',
    checklist: ['Anexo OPME completo', 'Laudo clínico atualizado', 'Etiqueta com UDI e ANVISA'],
    slaPadrao: 'Eletivo: 24h | Urgência: 2h',
    pontosAtencao: ['Validação de pacote', 'Evidência de compatibilidade clínica'],
    canalRecurso: 'Portal Amil – recurso formal com anexos PDF',
    referencias: ['Manual OPME Amil vigente', 'TISS 4.0.1'],
  },
  {
    convenio: 'Bradesco Saúde',
    checklist: ['Checklist específico por material', 'Parecer auditoria interna'],
    slaPadrao: 'Eletivo: 48h | Urgência: 4h',
    pontosAtencao: ['Documentar parecer jurídico quando aplicável', 'Monitorar fila de pendências'],
    canalRecurso: 'Portal Bradesco – recurso assistencial + jurídico',
    referencias: ['Manual de Materiais e Órteses', 'Tabela TUSS atualizada'],
  },
  {
    convenio: 'SulAmérica',
    checklist: ['Validação TUSS rígida', 'Laudos de imagem', 'Consentimento informado'],
    slaPadrao: 'Eletivo: 36h | Urgência: 3h',
    pontosAtencao: ['Campos livres do portal', 'Atualização automática de versões de manual'],
    canalRecurso: 'Portal SulAmérica com anexação obrigatória',
    referencias: ['Manual OPME SulAmérica', 'Pareceres de auditoria assistencial'],
  },
];

export const kanbanColumns: OPMEKanbanColumn[] = [
  { id: 'a-solicitar', titulo: 'A Solicitar', descricao: 'Guias em pré-cheque aguardando documentação.', camposChave: ['Convênio', 'Procedimento', 'Score IA', 'Responsável'] },
  { id: 'enviado', titulo: 'Enviado', descricao: 'Solicitação enviada aguardando retorno.', camposChave: ['Protocolo', 'SLA restante', 'Canal de envio'] },
  { id: 'pendente', titulo: 'Pendente/Exigência', descricao: 'Convênio solicitou complementos.', camposChave: ['Pendência', 'Checklist', 'Data limite'] },
  { id: 'autorizado', titulo: 'Autorizado', descricao: 'Autorização recebida.', camposChave: ['Validade', 'Condicionantes'] },
  { id: 'usado', titulo: 'Usado', descricao: 'OPME implantado com rastreabilidade.', camposChave: ['Etiquetas OK/NOK', 'Fotos anexas'] },
  { id: 'faturado', titulo: 'Faturado', descricao: 'Lote enviado ao faturamento.', camposChave: ['Valor apresentado', 'Validador TISS'] },
  { id: 'em-analise', titulo: 'Em análise', descricao: 'Convênio em análise de pagamento.', camposChave: ['Previsão pagamento', 'Alertas de risco'] },
  { id: 'glosado', titulo: 'Glosado', descricao: 'Glosa recebida aguardando recurso.', camposChave: ['Motivo', 'Valor glosado'] },
  { id: 'recurso', titulo: 'Recurso', descricao: 'Recurso aberto com evidências anexas.', camposChave: ['Template aplicado', 'Documentos anexos'] },
  { id: 'pago', titulo: 'Pago', descricao: 'Valor pago com conciliação concluída.', camposChave: ['Valor pago', 'DSO', 'Diferença vs apresentado'] },
];

export const reportDefinitions: OPMEReportDefinition[] = [
  {
    titulo: 'Glosa por convênio e motivo',
    objetivo: 'Identificar causas financeiras por convênio em 3/6/12 meses.',
    cortes: ['Convênio', 'Motivo', 'Equipe'],
    periodicidade: 'Semanal',
  },
  {
    titulo: 'Autorização 1ª submissão',
    objetivo: 'Mensurar eficiência da equipe por convênio, médico e equipe.',
    cortes: ['Convênio', 'Médico', 'Equipe'],
    periodicidade: 'Mensal',
  },
  {
    titulo: 'DSO/PMR por convênio',
    objetivo: 'Acompanhar recebimentos e alocar esforços de negociação.',
    cortes: ['Convênio', 'Faixa de atraso'],
    periodicidade: 'Mensal',
  },
  {
    titulo: 'Margem por DRG/procedimento',
    objetivo: 'Entender rentabilidade real considerando custo OPME.',
    cortes: ['DRG', 'Convênio'],
    periodicidade: 'Mensal',
  },
  {
    titulo: 'Conformidade de rastreabilidade',
    objetivo: 'Garantir rastreabilidade 100% com UDI/lote/ANVISA.',
    cortes: ['Unidade', 'Equipe', 'Fornecedor'],
    periodicidade: 'Semanal',
  },
  {
    titulo: 'Performance por fornecedor',
    objetivo: 'Monitorar preço, lead-time, defeitos e devoluções.',
    cortes: ['Fornecedor', 'Material'],
    periodicidade: 'Mensal',
  },
];

export const onboardingSteps: OPMEOnboardingStep[] = [
  {
    titulo: 'Fase 0 — Preparação (2–3 semanas)',
    descricao: 'Organização do catálogo OPME e credenciais.',
    entregaveis: [
      'Catálogo OPME unificado e de-para TUSS/TNUMM',
      'Credenciais TISS/portais',
      'Mapeamento de manuais e normas',
    ],
  },
  {
    titulo: 'Fase 1 — Fundacional (4–6 semanas)',
    descricao: 'Entrega das integrações principais e cockpit mínimo.',
    entregaveis: [
      'Integrações ERP/PEP/TISS habilitadas',
      'Validador de envio com checklist',
      'Cockpit executivo e Kanban operacional',
    ],
  },
  {
    titulo: 'Fase 2 — Glosa & Oráculo (4–6 semanas)',
    descricao: 'Implementação da inteligência e playbooks.',
    entregaveis: [
      'Pareto de glosa acionável',
      'Templates de recurso e IA preditiva explicável',
      'Playbooks por convênio e automações críticas',
    ],
  },
  {
    titulo: 'Fase 3 — Otimização (contínua)',
    descricao: 'Ciclo de melhoria contínua e negociações orientadas a dados.',
    entregaveis: [
      'Simulador de ROI e planos de ação contínuos',
      'Benchmarking interno/externo',
      'Ajustes contratuais baseados em evidência',
    ],
  },
];

export const apiEndpoints: OPMEAPIEndpoint[] = [
  { metodo: 'POST', rota: '/api/opme/solicitacoes', finalidade: 'Criar nova solicitação de OPME com anexos e SLA.' },
  { metodo: 'GET', rota: '/api/opme/solicitacoes/{id}', finalidade: 'Consultar detalhes e status da solicitação.' },
  { metodo: 'POST', rota: '/api/opme/solicitacoes/{id}/enviar-autorizacao', finalidade: 'Disparar transmissão e registrar protocolo.' },
  { metodo: 'GET', rota: '/api/opme/autorizacoes/{id}', finalidade: 'Buscar atualização de autorização.' },
  { metodo: 'POST', rota: '/api/opme/faturamento/enviar-lote', finalidade: 'Transmitir lote faturado e validar TISS.', observacoes: ['Idempotência por chave de lote'] },
  { metodo: 'GET', rota: '/api/opme/faturamento/demonstrativos?lote={id}', finalidade: 'Retornar demonstrativos, glosas e pagamentos.' },
  { metodo: 'POST', rota: '/api/opme/glosas/{id}/recurso', finalidade: 'Registrar recurso com evidências anexas.' },
  { metodo: 'GET', rota: '/api/integracoes/status', finalidade: 'Monitorar saúde das integrações OPME.' },
  { metodo: 'GET', rota: '/api/kpis?periodo=YYYY-MM&convenio=...', finalidade: 'Retornar KPIs do cockpit executivo.' },
];

export const webhooks: OPMEWebhook[] = [
  { evento: 'opme.autorizacao.atualizada', descricao: 'Convênio retornou atualização de autorização.', uso: 'Atualizar Kanban e alertar equipe assistencial.' },
  { evento: 'opme.faturamento.demonstrativo', descricao: 'Novo demonstrativo recebido.', uso: 'Iniciar conciliação automática e avisar controladoria.' },
  { evento: 'opme.glosa.registrada', descricao: 'Glosa recebida na fatura.', uso: 'Abrir cartão na coluna “Glosado” e disparar checklist de recurso.' },
  { evento: 'integracao.status.alterada', descricao: 'Integração mudou de status (Online/Latente/Offline).', uso: 'Acionar time de TI com próximo passo sugerido.' },
];

export const checklists: OPMEChecklist[] = [
  {
    contexto: 'Pré-envio',
    itens: [
      'Procedimento TUSS correto e compatível',
      'Anexo OPME exigido pelo convênio anexado',
      'Laudos clínicos e consentimento assinados',
      'UDI/lote/ANVISA + foto etiqueta',
      'Regras de pacote validadas',
      'Validador TISS aprovado',
    ],
  },
  {
    contexto: 'Pós-retorno',
    itens: [
      'Protocolo armazenado com versionamento',
      'Pendências tratadas com responsável e prazo',
      'Demonstrativo conciliado com NF e estoque',
      'Recurso de glosa aberto com evidências quando aplicável',
    ],
  },
];

export const raciMatrix: OPMERaciEntry[] = [
  {
    atividade: 'Solicitação de OPME',
    responsavel: 'Coordenação cirúrgica',
    accountable: 'Auditoria assistencial',
    consultados: ['Médico solicitante'],
    informados: ['Faturamento'],
    sla: 'Envio em até 24h após indicação',
  },
  {
    atividade: 'Autorização junto ao convênio',
    responsavel: 'Faturamento',
    accountable: 'Auditoria assistencial',
    consultados: ['Suprimentos'],
    informados: ['Coordenação cirúrgica'],
    sla: 'Monitoramento contínuo (SLA convênio)',
  },
  {
    atividade: 'Uso e rastreabilidade',
    responsavel: 'Centro cirúrgico',
    accountable: 'Auditoria',
    consultados: ['Suprimentos'],
    informados: ['Faturamento'],
  },
  {
    atividade: 'Faturamento e recurso',
    responsavel: 'Faturamento',
    accountable: 'Diretoria financeira',
    consultados: ['Jurídico', 'Auditoria assistencial'],
    informados: ['TI'],
    sla: 'Recurso aberto ≤ 5 dias do demonstrativo',
  },
  {
    atividade: 'Integrações e monitoramento',
    responsavel: 'TI Integrações',
    accountable: 'CTO / CIO',
    consultados: ['Faturamento', 'Suprimentos'],
    informados: ['Diretoria'],
    sla: 'Indisponibilidade ≤ 0,5% mensal',
  },
];

export const implementationPhases: OPMEImplementationPhase[] = [
  {
    fase: 'Fase 0 — Preparação',
    duracao: '2–3 semanas',
    objetivos: ['Catalogar materiais e políticas', 'Organizar credenciais e acessos'],
    entregaveis: ['Catálogo OPME', 'Mapeamento de manuais', 'Plano de comunicação'],
  },
  {
    fase: 'Fase 1 — Fundacional',
    duracao: '4–6 semanas',
    objetivos: ['Integrar dados críticos', 'Lançar cockpit mínimo e Kanban'],
    entregaveis: ['Integrações ERP/PEP/TISS', 'Dashboard e Kanban operacionais'],
  },
  {
    fase: 'Fase 2 — Glosa & Oráculo',
    duracao: '4–6 semanas',
    objetivos: ['Implantar IA preditiva', 'Formalizar playbooks e templates'],
    entregaveis: ['Pareto de glosa com ações', 'Templates de recurso', 'Modelo de IA com explicabilidade'],
  },
  {
    fase: 'Fase 3 — Otimização',
    duracao: 'Contínua',
    objetivos: ['Melhoria contínua', 'Negociação orientada a dados'],
    entregaveis: ['Simulador de ROI', 'Benchmarks e planos trimestrais'],
  },
];

export const testPlan: OPMETestPlanEntry[] = [
  {
    pilar: 'QA funcional',
    foco: 'Fluxos ponta a ponta (solicitação → autorização → faturamento)',
    criterios: ['Casos padrão e de urgência', 'Tratamento de pendências e reenvio automatizado'],
  },
  {
    pilar: 'Qualidade de dados',
    foco: 'Reconciliação 100% entre demonstrativo, estoque e financeiro',
    criterios: ['Validação de cadastros OPME', 'Jobs de higienização com alertas'],
  },
  {
    pilar: 'Segurança',
    foco: 'Acesso, logs e DLP',
    criterios: ['Testes de RBAC/ABAC', 'Monitoramento de exportações', 'Planos de backup/DR'],
  },
  {
    pilar: 'Adoção e UX',
    foco: 'Uso do Oráculo, correções pré-envio e engajamento dos times',
    criterios: ['Usuários ativos/mês', 'Taxa de correção sugerida pela IA', 'Feedback mensal'],
  },
];

export const roadmap: OPMERoadmapMilestone[] = [
  {
    horizonte: '90d',
    objetivos: [
      'Cockpit executivo e Kanban operando com dados reais',
      'Pareto de glosa e painéis por convênio publicados',
      'Validador TISS integrado e templates de recurso disponíveis',
    ],
  },
  {
    horizonte: '180d',
    objetivos: [
      'Modelos de IA preditiva e prescritiva com explicabilidade',
      'Automações de portais críticos com supervisão humana',
      'Simulador de ROI para negociações',
    ],
  },
  {
    horizonte: '365d',
    objetivos: [
      'Contratos dinâmicos com revisões orientadas a dados',
      'Benchmarking externo e renegociação baseada em evidências',
      'Automação completa da matriz de integração e status page',
    ],
  },
];

export const strategicPrinciples: StrategicPrinciple[] = [
  { titulo: 'Padrão primeiro, exceção depois', insight: 'Aderência a TISS/TUSS/TNUMM e rastreabilidade derruba glosa mais que ações pontuais.' },
  { titulo: 'Automação assistida', insight: 'RPA com validação humana em anexos e campos críticos gera ROI sustentável.' },
  { titulo: 'IA pragmática', insight: 'Modelos que explicam o erro e oferecem passo a passo são adotados; caixas-pretas não.' },
  { titulo: 'Playbooks vivos', insight: 'Atualizações mensais curtas mantêm curva de aprendizado e reduzem reincidência.' },
  { titulo: 'Negociação orientada a dados', insight: 'Levar DSO, % glosa e margem por DRG à mesa financia reajustes contratuais.' },
];
