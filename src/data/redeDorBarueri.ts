/**
 * Configurações e dados do Hospital Rede D'Or São Luiz - Barueri
 * Indicadores realistas para acesso do Diretor Geral
 */

export const hospitalConfig = {
  nome: 'Hospital Rede D\'Or São Luiz',
  unidade: 'Barueri',
  endereco: 'Alameda Rio Negro, 585 - Alphaville Industrial, Barueri - SP',
  cep: '06454-000',
  cnpj: '33.041.062/0001-14',
  cnes: '2082667',
  tipo: 'Hospital Geral Privado',
  acreditacao: 'ONA Nível 3 + JCI',
  leitos: {
    total: 287,
    uti: 68,
    enfermaria: 156,
    apartamento: 63,
    ocupacao: 82.4, // %
  },
  especialidades: [
    'Cardiologia',
    'Oncologia',
    'Ortopedia',
    'Neurologia',
    'Cirurgia Geral',
    'UTI Adulto',
    'UTI Neonatal',
    'Pronto Socorro',
    'Centro Cirúrgico',
    'Hemodinâmica',
    'Radioterapia',
    'Quimioterapia'
  ]
};

export const indicadoresDiretorGeral = {
  // Indicadores Financeiros Detalhados
  financeiro: {
    // Receitas
    faturamentoMensal: 28500000, // R$ 28,5 milhões
    receitaOperacional: 26800000,
    receitaBruta: 31200000,
    receitaLiquida: 26800000,
    receitaInternacoes: 18900000, // 66.3%
    receitaAmbulatorial: 5700000, // 20%
    receitaPS: 2850000, // 10%
    receitaExames: 1050000, // 3.7%
    
    // Custos e Despesas
    custoOperacional: 19200000,
    custoAssistencial: 12800000, // 44.9%
    custoAdministrativo: 4200000, // 14.7%
    custoPessoal: 11400000, // 40%
    custoMateriais: 5700000, // 20%
    custoOPME: 4200000, // 14.7%
    custoMedicamentos: 2850000, // 10%
    custoInfraestrutura: 2250000, // 7.9%
    
    // Margens e Rentabilidade
    margemBruta: 24.4, // %
    margemOperacional: 28.4, // %
    margemEbitda: 28.4, // %
    margemLiquida: 21.8, // %
    roe: 18.5, // % Return on Equity
    roic: 16.2, // % Return on Invested Capital
    
    // Indicadores de Eficiência
    ticketMedio: 12450, // R$
    ticketMedioInternacao: 22100,
    ticketMedioAmbulatorio: 3850,
    ticketMedioPS: 1240,
    custoLeitoDia: 890, // R$
    receitaLeitoDia: 1450, // R$
    
    // Glosas e Perdas
    glosaTotal: 8.3, // %
    glosasOPME: 8.3, // %
    glosasConvenios: 7.8, // %
    glosasAdministrativas: 4.2, // %
    glosasTecnicas: 4.1, // %
    perdasFinanceiras: 2340000, // R$ 2,34 milhões/mês
    
    // Recebimentos e Inadimplência
    inadimplencia: 3.2, // %
    prazoMedioRecebimento: 45, // dias
    recebimentoVista: 12.5, // %
    recebimento30dias: 58.3, // %
    recebimento60dias: 24.7, // %
    recebimentoAcima60: 4.5, // %
    
    // Receita por Convênio
    receitaConvenios: {
      unimed: 35.2, // %
      bradesco: 22.8,
      sulamerica: 18.5,
      gndi: 12.3,
      hapvida: 8.7,
      outros: 2.5
    },
    
    // Análise de Rentabilidade por Convênio
    rentabilidadeConvenios: {
      unimed: { margem: 32.5, ticketMedio: 13200, glosa: 6.2 },
      bradesco: { margem: 18.4, ticketMedio: 11800, glosa: 12.5 },
      sulamerica: { margem: 38.2, ticketMedio: 14500, glosa: 4.8 },
      gndi: { margem: 24.1, ticketMedio: 10900, glosa: 9.1 },
      hapvida: { margem: 22.8, ticketMedio: 9850, glosa: 7.4 }
    },
    
    // Fluxo de Caixa
    fluxoCaixaOperacional: 7600000, // R$ 7,6 milhões/mês
    fluxoCaixaLivre: 5200000, // R$ 5,2 milhões/mês
    capitalGiro: 12400000, // R$ 12,4 milhões
    endividamento: 42.5, // %
    liquidezCorrente: 1.85,
    
    // Investimentos
    investimentosMes: 1850000, // R$ 1,85 milhões
    investimentoEquipamentos: 980000,
    investimentoTI: 420000,
    investimentoInfraestrutura: 450000,
    
    // Projeções e Metas
    crescimentoMensal: 3.2, // %
    metaFaturamentoAnual: 360000000, // R$ 360 milhões
    metaMargemEbitda: 32.0, // %
    breakEvenOcupacao: 68.5, // %
  },

  // Indicadores Assistenciais
  assistencial: {
    atendimentosMes: 2287,
    internacoesMes: 856,
    cirurgiasMes: 342,
    taxaOcupacao: 82.4, // %
    tempoMedioPermanencia: 4.8, // dias
    taxaReinternacao: 6.2, // %
    mortalidadeGeral: 2.1, // %
    mortalidadeUTI: 12.4, // %
    satisfacaoPaciente: 8.7, // NPS
    tempoEsperaPS: 28, // minutos
  },

  // Indicadores de Qualidade
  qualidade: {
    infeccaoHospitalar: 2.8, // %
    quedas: 0.4, // por 1000 pacientes-dia
    lesaoPressao: 1.2, // %
    errosMedicacao: 0.8, // por 1000 doses
    cirurgiaSitioErrado: 0, // zero tolerância
    conformidadeProtocolos: 94.2, // %
    acreditacaoONA: 'Nível 3',
    certificacaoJCI: 'Vigente',
    auditoriasInternas: 12, // por ano
  },

  // Indicadores Operacionais
  operacional: {
    taxaOcupacaoCC: 78.5, // % Centro Cirúrgico
    taxaCancelamentoCirurgia: 4.2, // %
    tempoLimpezaCC: 32, // minutos
    disponibilidadeEquipamentos: 96.8, // %
    estoqueRupturas: 1.4, // %
    consumoEnergiaKwh: 485000, // mês
    consumoAguaM3: 12400, // mês
    residuosKg: 8900, // mês
  },

  // Indicadores de Pessoas
  pessoas: {
    totalColaboradores: 1847,
    medicos: 342,
    enfermeiros: 456,
    tecnicos: 687,
    administrativos: 362,
    turnover: 12.8, // % ano
    absenteismo: 3.4, // %
    horasTreinamento: 24, // por colaborador/ano
    satisfacaoColaboradores: 7.8, // escala 0-10
    acidentesTrabalho: 2.1, // por 100 colaboradores/ano
  },

  // Indicadores OPME
  opme: {
    faturamentoMensal: 4200000, // R$ 4,2 milhões
    taxaGlosa: 8.3, // %
    complianceTISS: 87, // %
    slaRN259: 94, // %
    rastreabilidadeUDI: 45, // %
    registroAnvisaOK: 91, // %
    tempoMedioAutorizacao: 6.2, // dias
    retrabalho: 14, // %
    procedimentosMes: 287,
    valorMedioOPME: 14634, // R$
  }
};

export const metasDiretorGeral = {
  financeiro: {
    faturamentoMensal: 30000000,
    margemEbitda: 32.0,
    glosaTotal: 5.0,
    inadimplencia: 2.5,
  },
  assistencial: {
    taxaOcupacao: 85.0,
    satisfacaoPaciente: 9.0,
    mortalidadeGeral: 1.8,
    tempoEsperaPS: 20,
  },
  qualidade: {
    infeccaoHospitalar: 2.0,
    conformidadeProtocolos: 98.0,
    errosMedicacao: 0.5,
  },
  opme: {
    taxaGlosa: 5.0,
    complianceTISS: 100,
    rastreabilidadeUDI: 100,
    tempoMedioAutorizacao: 5.0,
  }
};

export const alertasCriticos = [
  {
    id: 1,
    tipo: 'financeiro',
    severidade: 'alta',
    titulo: 'Glosa OPME acima da meta',
    descricao: 'Taxa de glosa OPME em 8,3% (meta: 5%)',
    impacto: 'R$ 348.600/mês em perdas',
    acao: 'Implementar validações automáticas TISS'
  },
  {
    id: 2,
    tipo: 'operacional',
    severidade: 'media',
    titulo: 'Rastreabilidade UDI baixa',
    descricao: 'Apenas 45% dos implantes com UDI capturado',
    impacto: 'Risco regulatório Anvisa',
    acao: 'Treinar equipe e implementar leitura automática'
  },
  {
    id: 3,
    tipo: 'qualidade',
    severidade: 'media',
    titulo: 'Tempo autorização OPME elevado',
    descricao: 'Média de 6,2 dias (meta: 5 dias)',
    impacto: 'Atrasos cirúrgicos e insatisfação',
    acao: 'Otimizar processo com convênios'
  },
  {
    id: 4,
    tipo: 'assistencial',
    severidade: 'baixa',
    titulo: 'Taxa de reinternação acima da meta',
    descricao: '6,2% vs meta de 5,5%',
    impacto: 'Custos adicionais e qualidade',
    acao: 'Revisar protocolos de alta'
  }
];

export const conveniosAtivos = [
  {
    id: 'unimed',
    nome: 'Unimed',
    participacao: 35.2,
    faturamentoMes: 10032000,
    taxaGlosa: 6.2,
    tempoAutorizacao: 5.8,
    status: 'atencao',
    prioridade: 'Validar 3 marcas obrigatórias',
    historicoGlosas: [
      { mes: 'Jan', glosa: 8.1 },
      { mes: 'Fev', glosa: 7.8 },
      { mes: 'Mar', glosa: 7.2 },
      { mes: 'Abr', glosa: 6.9 },
      { mes: 'Mai', glosa: 6.5 },
      { mes: 'Jun', glosa: 6.2 }
    ],
    projecaoComMelhorias: [
      { mes: 'Jul', glosa: 5.8 },
      { mes: 'Ago', glosa: 5.2 },
      { mes: 'Set', glosa: 4.5 },
      { mes: 'Out', glosa: 4.0 },
      { mes: 'Nov', glosa: 3.8 },
      { mes: 'Dez', glosa: 3.5 }
    ],
    melhoriaEsperada: 2.7, // pontos percentuais
    economiaProjetada: 270000 // R$ por mês
  },
  {
    id: 'bradesco',
    nome: 'Bradesco Saúde',
    participacao: 22.8,
    faturamentoMes: 6498000,
    taxaGlosa: 12.5,
    tempoAutorizacao: 7.1,
    status: 'critico',
    prioridade: 'Implementar Passo 3 OPME automático',
    historicoGlosas: [
      { mes: 'Jan', glosa: 14.2 },
      { mes: 'Fev', glosa: 13.8 },
      { mes: 'Mar', glosa: 13.5 },
      { mes: 'Abr', glosa: 13.1 },
      { mes: 'Mai', glosa: 12.8 },
      { mes: 'Jun', glosa: 12.5 }
    ],
    projecaoComMelhorias: [
      { mes: 'Jul', glosa: 11.2 },
      { mes: 'Ago', glosa: 9.5 },
      { mes: 'Set', glosa: 7.8 },
      { mes: 'Out', glosa: 6.2 },
      { mes: 'Nov', glosa: 5.5 },
      { mes: 'Dez', glosa: 5.0 }
    ],
    melhoriaEsperada: 7.5, // pontos percentuais
    economiaProjetada: 487000 // R$ por mês
  },
  {
    id: 'sulamerica',
    nome: 'SulAmérica',
    participacao: 18.5,
    faturamentoMes: 5272500,
    taxaGlosa: 4.8,
    tempoAutorizacao: 4.2,
    status: 'otimo',
    prioridade: 'Manter processo VPP',
    historicoGlosas: [
      { mes: 'Jan', glosa: 5.8 },
      { mes: 'Fev', glosa: 5.5 },
      { mes: 'Mar', glosa: 5.2 },
      { mes: 'Abr', glosa: 5.0 },
      { mes: 'Mai', glosa: 4.9 },
      { mes: 'Jun', glosa: 4.8 }
    ],
    projecaoComMelhorias: [
      { mes: 'Jul', glosa: 4.5 },
      { mes: 'Ago', glosa: 4.2 },
      { mes: 'Set', glosa: 3.8 },
      { mes: 'Out', glosa: 3.5 },
      { mes: 'Nov', glosa: 3.2 },
      { mes: 'Dez', glosa: 3.0 }
    ],
    melhoriaEsperada: 1.8, // pontos percentuais
    economiaProjetada: 95000 // R$ por mês
  },
  {
    id: 'gndi',
    nome: 'GNDI (NotreDame Intermédica)',
    participacao: 12.3,
    faturamentoMes: 3505500,
    taxaGlosa: 9.1,
    tempoAutorizacao: 6.5,
    status: 'atencao',
    prioridade: 'Melhorar transação no ato',
    historicoGlosas: [
      { mes: 'Jan', glosa: 11.2 },
      { mes: 'Fev', glosa: 10.8 },
      { mes: 'Mar', glosa: 10.2 },
      { mes: 'Abr', glosa: 9.8 },
      { mes: 'Mai', glosa: 9.5 },
      { mes: 'Jun', glosa: 9.1 }
    ],
    projecaoComMelhorias: [
      { mes: 'Jul', glosa: 8.2 },
      { mes: 'Ago', glosa: 7.1 },
      { mes: 'Set', glosa: 6.2 },
      { mes: 'Out', glosa: 5.5 },
      { mes: 'Nov', glosa: 5.0 },
      { mes: 'Dez', glosa: 4.5 }
    ],
    melhoriaEsperada: 4.6, // pontos percentuais
    economiaProjetada: 161000 // R$ por mês
  },
  {
    id: 'hapvida',
    nome: 'Hapvida',
    participacao: 8.7,
    faturamentoMes: 2479500,
    taxaGlosa: 7.4,
    tempoAutorizacao: 5.9,
    status: 'atencao',
    prioridade: 'Padronizar emissão TISSNET',
    historicoGlosas: [
      { mes: 'Jan', glosa: 9.2 },
      { mes: 'Fev', glosa: 8.8 },
      { mes: 'Mar', glosa: 8.4 },
      { mes: 'Abr', glosa: 8.0 },
      { mes: 'Mai', glosa: 7.7 },
      { mes: 'Jun', glosa: 7.4 }
    ],
    projecaoComMelhorias: [
      { mes: 'Jul', glosa: 6.8 },
      { mes: 'Ago', glosa: 6.0 },
      { mes: 'Set', glosa: 5.2 },
      { mes: 'Out', glosa: 4.8 },
      { mes: 'Nov', glosa: 4.5 },
      { mes: 'Dez', glosa: 4.2 }
    ],
    melhoriaEsperada: 3.2, // pontos percentuais
    economiaProjetada: 79000 // R$ por mês
  }
];

export const topProcedimentosOPME = [
  {
    codigo: '31101014',
    descricao: 'Prótese Total de Quadril',
    quantidade: 28,
    valorMedio: 45800,
    taxaGlosa: 6.8,
    convenio: 'Unimed'
  },
  {
    codigo: '31101022',
    descricao: 'Prótese Total de Joelho',
    quantidade: 24,
    valorMedio: 42300,
    taxaGlosa: 8.2,
    convenio: 'Bradesco'
  },
  {
    codigo: '41101014',
    descricao: 'Stent Coronariano',
    quantidade: 42,
    valorMedio: 18900,
    taxaGlosa: 5.4,
    convenio: 'SulAmérica'
  },
  {
    codigo: '31301010',
    descricao: 'Placa e Parafusos Ortopédicos',
    quantidade: 67,
    valorMedio: 8750,
    taxaGlosa: 9.8,
    convenio: 'GNDI'
  },
  {
    codigo: '41201012',
    descricao: 'Marca-passo Cardíaco',
    quantidade: 18,
    valorMedio: 32400,
    taxaGlosa: 7.1,
    convenio: 'Unimed'
  }
];
