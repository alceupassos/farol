export type IntegrationCategory = 'public' | 'hospital' | 'private';

export interface IntegrationAction {
  id: string;
  label: string;
  description: string;
  requiresPayload?: boolean;
}

export type IntegrationFieldType = 'text' | 'textarea' | 'select' | 'password' | 'number';

export interface IntegrationFormField {
  id: string;
  label: string;
  type: IntegrationFieldType;
  placeholder?: string;
  helperText?: string;
  options?: string[];
  required?: boolean;
}

export interface IntegrationFormSection {
  id: string;
  title: string;
  description: string;
  fields: IntegrationFormField[];
}

export interface LaboratoryIntegration {
  id: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  category: IntegrationCategory;
  highlightColor: string;
  statusBadges: string[];
  endpoints?: string[];
  kpis: string[];
  actions: IntegrationAction[];
  formSections: IntegrationFormSection[];
  resources?: {
    label: string;
    href: string;
  }[];
}

export const laboratoryIntegrations: Record<string, LaboratoryIntegration> = {
  rnds: {
    id: 'rnds',
    name: 'RNDS (FHIR/REST)',
    shortDescription: 'Camada nacional HL7 FHIR R4 com envio de bundles, conciliação e auditoria completa.',
    longDescription:
      'Configure certificados ICP-Brasil, credenciais DATASUS e endpoints por UF para enviar/consultar bundles Observation, DiagnosticReport, ImagingStudy, VCF e consentimentos.',
    category: 'public',
    highlightColor: 'from-emerald-500/20 via-emerald-600/10 to-transparent',
    statusBadges: ['Conectado', 'Produção'],
    endpoints: ['https://api-rnds.saude.gov.br/fhir', 'https://hml-rnds.saude.gov.br/fhir'],
    kpis: [
      'Taxa de aceitação ≥ 98%',
      'Latência p95 < 3s',
      'Erros por perfil < 0,5%/dia'
    ],
    actions: [
      { id: 'connect', label: 'Conectar RNDS', description: 'Registra credenciais e endpoints para a instância ativa.' },
      { id: 'validate-bundle', label: 'Validar Bundle', description: 'Executa validação contra perfis nacionais antes do envio.', requiresPayload: true },
      { id: 'monitor-errors', label: 'Monitorar Erros', description: 'Consulta fila de rejeições, gera plano de ação.' },
      { id: 'export-logs', label: 'Exportar Logs', description: 'Gera evidências (AuditEvent) para auditoria e acreditações.' }
    ],
    formSections: [
      {
        id: 'credentials',
        title: 'Credenciais RNDS',
        description: 'Informe os dados institucionais e certificado ICP-Brasil.',
        fields: [
          { id: 'cnpj', label: 'CNPJ (Instituição)', type: 'text', placeholder: '00.000.000/0001-00', required: true },
          { id: 'cnes', label: 'CNES', type: 'text', placeholder: '1234567', required: true },
          { id: 'uf', label: 'UF', type: 'select', options: ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'], required: true },
          { id: 'certificateAlias', label: 'Alias Certificado ICP-Brasil', type: 'text', placeholder: 'cert-rnds-prod' },
          { id: 'clientId', label: 'Client ID', type: 'text', placeholder: 'app-rnds-prod' },
          { id: 'clientSecret', label: 'Client Secret', type: 'password', placeholder: '••••••••', required: true }
        ]
      },
      {
        id: 'bundle-config',
        title: 'Configuração de Bundle',
        description: 'Defina o tipo de recurso e o escopo de envio.',
        fields: [
          {
            id: 'bundleType',
            label: 'Tipo de bundle',
            type: 'select',
            options: ['DiagnosticReport + Observation', 'ImagingStudy', 'GenomicReport (VCF)', 'Consentimento'],
            required: true
          },
          { id: 'environment', label: 'Ambiente', type: 'select', options: ['Homologação', 'Produção'], required: true },
          { id: 'callbackUrl', label: 'Callback URL', type: 'text', placeholder: 'https://seusistema.gov.br/rnds/callback' },
          { id: 'notes', label: 'Observações', type: 'textarea', placeholder: 'Protocolos específicos, perfis adicionais...' }
        ]
      }
    ],
    resources: [
      { label: 'Guia RNDS Oficial', href: 'https://www.gov.br/saude/pt-br/assuntos/rnds' },
      { label: 'Perfis FHIR Brasil', href: 'https://interop.saude.gov.br/perfis' }
    ]
  },
  'gal-lacen': {
    id: 'gal-lacen',
    name: 'GAL / LACEN',
    shortDescription: 'Integração com sistemas estaduais para laboratórios públicos (GAL/LACEN).',
    longDescription:
      'Automatize ingestões e reconciliações em instâncias estaduais do GAL/LACEN. Gere trilhas de auditoria e relatórios de evidência.',
    category: 'public',
    highlightColor: 'from-teal-500/20 via-emerald-500/10 to-transparent',
    statusBadges: ['Parcial', 'Homologação'],
    kpis: ['Tempo de lançamento', 'Pendências por instância', 'Reconciliação mensal'],
    actions: [
      { id: 'configure-access', label: 'Configurar Acesso', description: 'Registra credenciais por instância estadual.' },
      { id: 'import-file', label: 'Importar Planilha', description: 'Processa arquivos exportados do GAL para conciliação.', requiresPayload: true },
      { id: 'register-evidence', label: 'Registrar Evidências', description: 'Captura documentação de auditoria e CAPA.' }
    ],
    formSections: [
      {
        id: 'state-config',
        title: 'Instância Estadual',
        description: 'Informe as credenciais fornecidas pelo GAL/LACEN local.',
        fields: [
          { id: 'state', label: 'Estado', type: 'select', options: ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'], required: true },
          { id: 'username', label: 'Usuário GAL', type: 'text', placeholder: 'usuario.instituicao', required: true },
          { id: 'password', label: 'Senha', type: 'password', required: true },
          { id: 'loginUrl', label: 'URL da instância', type: 'text', placeholder: 'https://gal.saude.gov.br/...', required: true },
          { id: 'schedule', label: 'Agendamento de importação', type: 'select', options: ['Manual', 'Diário', 'Semanal'] }
        ]
      },
      {
        id: 'reconciliation',
        title: 'Regras de reconciliação',
        description: 'Defina os critérios de match entre registros GAL e LIS local.',
        fields: [
          { id: 'matchFields', label: 'Campos de match', type: 'textarea', placeholder: 'Ex: paciente.cpf, requisicao.numero' },
          { id: 'rejectionPolicy', label: 'Política de rejeição', type: 'textarea', placeholder: 'Ações ao detectar divergências...' }
        ]
      }
    ]
  },
  hospitais: {
    id: 'hospitais',
    name: 'Hospitais & Redes de Referência',
    shortDescription: 'Integração com portais e apps hospitalares (Einstein, Sírio, Rede D’Or, BP, HCor, Moinhos, HCFMUSP).',
    longDescription:
      'Sincronize laudos, agendas e notificações entre seu laboratório/serviço e os portais hospitalares. Configure contas institucionais, tokens e webhooks.',
    category: 'hospital',
    highlightColor: 'from-sky-500/20 via-blue-600/10 to-transparent',
    statusBadges: ['Parcial'],
    kpis: ['Tempo de publicação', 'Visualizações por médico/unidade', 'Falhas de sincronização'],
    actions: [
      { id: 'request-partnership', label: 'Solicitar Parceria', description: 'Envia requerimento oficial para onboarding hospitalar.' },
      { id: 'configure-accounts', label: 'Configurar Contas', description: 'Registra contas institucionais/API keys para pull/push.' },
      { id: 'publish-test', label: 'Teste de Publicação', description: 'Realiza envio de laudo de teste para validação.' },
      { id: 'audit-access', label: 'Auditar Acessos', description: 'Gera relatório de acessos por médico/unidade.' }
    ],
    formSections: [
      {
        id: 'partnership',
        title: 'Dados da parceria',
        description: 'Informe dados para compor o NDA e SLA com a instituição.',
        fields: [
          { id: 'institution', label: 'Instituição', type: 'text', placeholder: 'Ex: Hospital Israelita Albert Einstein', required: true },
          { id: 'contactName', label: 'Contato principal', type: 'text', required: true },
          { id: 'contactEmail', label: 'E-mail', type: 'text', required: true },
          { id: 'ndaStatus', label: 'Status do NDA', type: 'select', options: ['Pendente', 'Em andamento', 'Assinado'] },
          { id: 'slaTarget', label: 'SLA desejado (horas)', type: 'number', placeholder: '2' }
        ]
      },
      {
        id: 'tech-setup',
        title: 'Configuração técnica',
        description: 'Cadastre credenciais, webhooks e preferências de publicação.',
        fields: [
          { id: 'apiBaseUrl', label: 'Endpoint API/Portal', type: 'text', placeholder: 'https://api.parceiro.com/v1', required: true },
          { id: 'token', label: 'Token / API Key', type: 'password', required: true },
          { id: 'webhookUrl', label: 'Webhook de retornos', type: 'text', placeholder: 'https://seusistema.gov.br/hospitais/webhook' },
          { id: 'deliveryMode', label: 'Modo de entrega', type: 'select', options: ['Push (upload automático)', 'Pull (portal consulta)', 'Híbrido'] }
        ]
      }
    ]
  },
  fleury: {
    id: 'fleury',
    name: 'Grupo Fleury (Portal Dev)',
    shortDescription: 'Integração com portal de desenvolvedores do Grupo Fleury.',
    longDescription:
      'Cadastre aplicações, obtenha credenciais OAuth e monitore chamadas para troca de laudos e dados clínicos.',
    category: 'private',
    highlightColor: 'from-amber-500/20 via-orange-500/10 to-transparent',
    statusBadges: ['Conectado'],
    kpis: ['Disponibilidade API', 'Latência média', 'Taxa de sucesso'],
    actions: [
      { id: 'connect-portal-dev', label: 'Conectar via Portal Dev', description: 'Registra client_id e secrets da aplicação.' },
      { id: 'sandbox-test', label: 'Teste Sandbox', description: 'Executa bateria de testes no ambiente de homologação.' },
      { id: 'monitor-errors', label: 'Monitor de Erros', description: 'Consulta logs e métricas de falhas.' }
    ],
    formSections: [
      {
        id: 'oauth',
        title: 'Credenciais OAuth',
        description: 'Obtenha as chaves no portal do Grupo Fleury.',
        fields: [
          { id: 'clientId', label: 'Client ID', type: 'text', required: true },
          { id: 'clientSecret', label: 'Client Secret', type: 'password', required: true },
          { id: 'redirectUri', label: 'Redirect URI', type: 'text', placeholder: 'https://seusistema.gov.br/fleury/callback' },
          { id: 'scope', label: 'Escopos', type: 'textarea', placeholder: 'exames.read, laudos.write...' }
        ]
      },
      {
        id: 'monitoring',
        title: 'Monitoramento',
        description: 'Defina metas para acompanhar a saúde da integração.',
        fields: [
          { id: 'latencyTarget', label: 'Latência alvo (ms)', type: 'number', placeholder: '800' },
          { id: 'errorBudget', label: 'Erro máximo (%)', type: 'number', placeholder: '0.5' }
        ]
      }
    ]
  },
  'hermes-pardini': {
    id: 'hermes-pardini',
    name: 'Hermes Pardini (Apoio)',
    shortDescription: 'Integração B2B de apoio laboratorial Hermes Pardini.',
    longDescription:
      'Configure consultas por período, ingestão de resultados e reconciliação automática com lotes de apoio.',
    category: 'private',
    highlightColor: 'from-lime-500/20 via-emerald-500/10 to-transparent',
    statusBadges: ['Conectado'],
    kpis: ['Tempo de retorno', 'Taxa de lotes conciliados'],
    actions: [
      { id: 'configure-support', label: 'Configurar Apoio', description: 'Define credenciais e escopo de apoio.' },
      { id: 'sync-periods', label: 'Sincronizar Períodos', description: 'Agenda sincronizações periódicas.', requiresPayload: true },
      { id: 'export-reports', label: 'Exportar Relatórios', description: 'Gera relatórios operacionais para auditoria.' }
    ],
    formSections: [
      {
        id: 'credentials',
        title: 'Credenciais de apoio',
        description: 'Informe dados fornecidos pela equipe Hermes Pardini.',
        fields: [
          { id: 'supportCode', label: 'Código de apoio', type: 'text', required: true },
          { id: 'authToken', label: 'Token de autenticação', type: 'password', required: true },
          { id: 'baseUrl', label: 'Endpoint API', type: 'text', placeholder: 'https://api.pardini.com.br/support' }
        ]
      },
      {
        id: 'sync',
        title: 'Sincronização',
        description: 'Defina janelas para consulta de resultados.',
        fields: [
          { id: 'initialDate', label: 'Data inicial', type: 'text', placeholder: '2024-01-01' },
          { id: 'frequency', label: 'Frequência', type: 'select', options: ['2h', '6h', '12h', 'Diária'] }
        ]
      }
    ]
  },
  'dasa-nav': {
    id: 'dasa-nav',
    name: 'Dasa (Nav / Nav Pro)',
    shortDescription: 'Apps e portais Dasa com histórico consolidado e notificações inteligentes.',
    longDescription:
      'Vincule contas, configure automações de publicação/consulta e monitore engajamento em Nav/Nav Pro.',
    category: 'private',
    highlightColor: 'from-purple-500/20 via-indigo-500/10 to-transparent',
    statusBadges: ['Parcial'],
    kpis: ['Engajamento', 'Tempo de espelhamento', 'Cobertura por linha de exame'],
    actions: [
      { id: 'link-accounts', label: 'Vincular Contas', description: 'Associa CPFs/CIPs e contas profissionais.' },
      { id: 'automation', label: 'Automação de Publicação', description: 'Define regras de espelhamento automático.' },
      { id: 'request-partnership', label: 'Solicitar Parceria Técnica', description: 'Inicia negociação para integração profunda.' }
    ],
    formSections: [
      {
        id: 'accounts',
        title: 'Vinculação de contas',
        description: 'Informe quem terá acesso ao Nav/Nav Pro.',
        fields: [
          { id: 'cpf', label: 'CPF/CIP profissional', type: 'text', placeholder: '000.000.000-00', required: true },
          { id: 'email', label: 'E-mail associado', type: 'text', placeholder: 'profissional@nav.com' },
          { id: 'role', label: 'Perfil de acesso', type: 'select', options: ['Médico', 'Parceiro', 'TI'] }
        ]
      },
      {
        id: 'automation-rules',
        title: 'Regras de publicação',
        description: 'Configure critérios para espelhar laudos automaticamente.',
        fields: [
          { id: 'examLines', label: 'Linhas de exame', type: 'textarea', placeholder: 'Hematologia, Imagem, Genômica...' },
          { id: 'notifyPatients', label: 'Notificar pacientes automaticamente', type: 'select', options: ['Sim', 'Não'] }
        ]
      }
    ]
  },
  sabin: {
    id: 'sabin',
    name: 'Sabin (Portal / LIS)',
    shortDescription: 'Portal web e apps Sabin com ingestão de PDFs/links e reconciliação.',
    longDescription:
      'Automatize coleta de laudos PDF/links nos portais Sabin, garantindo integridade, deduplicação e reconciliação com o LIS local.',
    category: 'private',
    highlightColor: 'from-amber-400/20 via-amber-500/10 to-transparent',
    statusBadges: ['Pendente'],
    kpis: ['Sucesso de download', 'Integridade de laudos', 'Taxa de reconciliação'],
    actions: [
      { id: 'connect-portal', label: 'Conectar Portal', description: 'Registra credenciais do portal Sabin.' },
      { id: 'schedule-collection', label: 'Agendar Coleta de Laudos', description: 'Define periodicidade de coleta automatizada.' },
      { id: 'monitor-integrity', label: 'Monitorar Integridade', description: 'Executa verificação de hashes e duplicidade.' }
    ],
    formSections: [
      {
        id: 'portal-access',
        title: 'Acesso ao portal',
        description: 'Informe as credenciais autorizadas pelo Sabin.',
        fields: [
          { id: 'username', label: 'Usuário', type: 'text', required: true },
          { id: 'password', label: 'Senha', type: 'password', required: true },
          { id: 'mfa', label: 'Token MFA (opcional)', type: 'text', placeholder: 'Código temporário' }
        ]
      },
      {
        id: 'collection',
        title: 'Coleta automatizada',
        description: 'Configure horários e destinos para armazenar os laudos coletados.',
        fields: [
          { id: 'frequency', label: 'Frequência', type: 'select', options: ['2h', '4h', '8h', 'Diário'] },
          { id: 'storagePath', label: 'Destino dos laudos', type: 'text', placeholder: 's3://bucket/laudos/' },
          { id: 'integrityCheck', label: 'Verificação de integridade?', type: 'select', options: ['Sim', 'Não'] }
        ]
      }
    ]
  },
  'imagem-cdpi-alta': {
    id: 'imagem-cdpi-alta',
    name: 'Imagem (CDPI / Alta)',
    shortDescription: 'Portais CDPI/Alta com deep links DICOM/PDF e publicação controlada.',
    longDescription:
      'Configure deep links DICOM com TTL, vincule protocolos/unidades e audite acessos médicos para jornadas de imagem.',
    category: 'private',
    highlightColor: 'from-purple-400/20 via-purple-500/10 to-transparent',
    statusBadges: ['Parcial'],
    kpis: ['Visualizações por estudo', 'Sucesso de deep link', 'Tempo de liberação'],
    actions: [
      { id: 'link-unit', label: 'Vincular Unidade/Protocolo', description: 'Associa protocolos e IDs de unidade CDPI/Alta.' },
      { id: 'test-deep-links', label: 'Teste de Deep Links', description: 'Gera links DICOM com TTL reduzido para validação.' },
      { id: 'audit-medical-access', label: 'Auditar Acessos Médicos', description: 'Gera relatório de acessos por profissional.' }
    ],
    formSections: [
      {
        id: 'linking',
        title: 'Vinculação de protocolos',
        description: 'Mapeie a estrutura organizacional e protocolos de exame.',
        fields: [
          { id: 'unitId', label: 'ID da unidade', type: 'text', required: true },
          { id: 'protocol', label: 'Protocolo', type: 'text', placeholder: 'Ex: TC ABDOMEN CONTRASTADO' },
          { id: 'dicomServer', label: 'Servidor DICOMweb', type: 'text', placeholder: 'https://dicom.seusistema.com/wado' }
        ]
      },
      {
        id: 'link-controls',
        title: 'Controle de deep links',
        description: 'Defina políticas para gerar e expirar links compartilhados.',
        fields: [
          { id: 'ttlMinutes', label: 'Tempo de vida (min)', type: 'number', placeholder: '120' },
          { id: 'watermark', label: 'Aplicar marca d’água?', type: 'select', options: ['Sim', 'Não'] },
          { id: 'notifyAccess', label: 'Notificar acessos críticos?', type: 'select', options: ['Sim', 'Não'] }
        ]
      }
    ]
  },
  genomica: {
    id: 'genomica',
    name: 'Genômica (Dasa Genômica, Fleury Genômica, Mendelics, GeneOne)',
    shortDescription: 'Portais e ambientes dedicados para NGS/CGP com ingestão de VCF e controle de consentimentos.',
    longDescription:
      'Gerencie ingestão de relatórios estruturados, metadados de variantes e consentimentos com rastreabilidade ACMG.',
    category: 'private',
    highlightColor: 'from-indigo-500/20 via-indigo-600/10 to-transparent',
    statusBadges: ['Planejado'],
    kpis: ['TAT genômico', 'Integridade de metadados', 'Concordância ACMG'],
    actions: [
      { id: 'request-nda', label: 'Solicitar NDA/Parceria', description: 'Inicia processo de NDA com parceiros genômicos.' },
      { id: 'configure-portal', label: 'Configurar Portais', description: 'Registra URLs, tokens e usuários para acesso seguro.' },
      { id: 'validate-metadata', label: 'Validar Metadados Genômicos', description: 'Executa checagem de painéis, genes e variantes.' }
    ],
    formSections: [
      {
        id: 'partnership',
        title: 'Parcerias e NDA',
        description: 'Registre status das tratativas com cada laboratório genômico.',
        fields: [
          { id: 'partner', label: 'Parceiro', type: 'select', options: ['Dasa Genômica', 'Fleury Genômica', 'Mendelics', 'GeneOne', 'Outro'], required: true },
          { id: 'ndaStatus', label: 'Status do NDA', type: 'select', options: ['Não iniciado', 'Em negociação', 'Assinado'], required: true },
          { id: 'ndaExpiration', label: 'Vigência do NDA', type: 'text', placeholder: '2025-12-31' }
        ]
      },
      {
        id: 'metadata',
        title: 'Metadados e consentimentos',
        description: 'Defina campos obrigatórios para VCFs, relatórios e consentimentos.',
        fields: [
          { id: 'panelName', label: 'Painel/Exame', type: 'text', placeholder: 'Ex: Oncogenes 500' },
          { id: 'requiredGenes', label: 'Genes obrigatórios', type: 'textarea', placeholder: 'BRCA1, BRCA2, MLH1...' },
          { id: 'consentPolicy', label: 'Política de consentimento', type: 'textarea', placeholder: 'Consentimento clínico, compartilhamento com pesquisa...' }
        ]
      }
    ]
  }
};

export const getLaboratoryIntegration = (id: string): LaboratoryIntegration | undefined =>
  laboratoryIntegrations[id as keyof typeof laboratoryIntegrations];

export const listIntegrationsByCategory = (category: IntegrationCategory) =>
  Object.values(laboratoryIntegrations).filter((integration) => integration.category === category);
