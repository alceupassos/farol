export interface PiracicabaHealthNewsItem {
  id: string;
  title: string;
  source: string;
  url: string;
  publishedAt: string; // ISO string
  summary: string[]; // lines for multi-line summary
  sentiment: 'positive' | 'negative' | 'neutral';
}

export const piracicabaHealthNews2025: PiracicabaHealthNewsItem[] = [
  {
    id: '2025-08-14-telemedicina',
    title: 'Piracicaba amplia telemedicina para monitorar pacientes crônicos',
    source: 'Jornal de Piracicaba',
    url: 'https://www.jornaldepiracicaba.com.br/saude/telemedicina-ampliada-piracicaba/',
    publishedAt: '2025-08-14T09:00:00-03:00',
    summary: [
      'Prefeitura integra 18 UBS à central de telemonitoramento, priorizando hipertensos e diabéticos.',
      'Programa prevê 12 mil atendimentos digitais por mês e redução de 18% nas internações evitáveis.'
    ],
    sentiment: 'positive'
  },
  {
    id: '2025-07-29-dengue',
    title: 'Mutirão contra a dengue remove 60 toneladas de focos em 48 horas',
    source: 'G1 Piracicaba e Região',
    url: 'https://g1.globo.com/sp/piracicaba-regiao/noticia/2025/07/29/mutirao-dengue-piracicaba.ghtml',
    publishedAt: '2025-07-29T06:45:00-03:00',
    summary: [
      'Ação conjunta da Vigilância em Saúde com Defesa Civil passou por 11 bairros, priorizando Monte Líbano e Algodoal.',
      'Foram distribuídos kits educativos e instaladas armadilhas inteligentes para monitoramento semanal.'
    ],
    sentiment: 'positive'
  },
  {
    id: '2025-06-21-ubs',
    title: 'UBS Pauliceia passa a oferecer pronto atendimento 24h',
    source: 'Prefeitura de Piracicaba',
    url: 'https://www.piracicaba.sp.gov.br/noticias/ubs-pauliceia-24h',
    publishedAt: '2025-06-21T15:30:00-03:00',
    summary: [
      'Unidade remodelada amplia capacidade para 450 consultas/dia com equipe multiprofissional e sala de teleorientação.',
      'Investimento de R$ 5,8 milhões contempla laboratório express e integração plena ao prontuário municipal.'
    ],
    sentiment: 'positive'
  },
  {
    id: '2025-05-12-vacina',
    title: 'Cobertura da vacinação infantil atinge 94% em Piracicaba',
    source: 'Diário de Piracicaba',
    url: 'https://www.diariodepiracicaba.com.br/saude/cobertura-vacinal-94-por-cento',
    publishedAt: '2025-05-12T08:15:00-03:00',
    summary: [
      'Campanha “Protege Piracicaba” utilizou vans itinerantes e parceria com escolas municipais para ampliar adesão.',
      'Secretaria de Saúde projeta atingir 96% até setembro com foco em bairros da região norte.'
    ],
    sentiment: 'positive'
  },
  {
    id: '2025-04-10-filas',
    title: 'Relatório do TCE aponta aumento da espera por consultas especializadas',
    source: 'Tribunal de Contas do Estado de SP',
    url: 'https://www.tce.sp.gov.br/piracicaba/relatorio-abril-2025',
    publishedAt: '2025-04-10T07:30:00-03:00',
    summary: [
      'Auditoria identificou fila média de 78 dias para ortopedia e cardiologia, crescimento de 12% em relação a 2024.',
      'Prefeitura informou plano emergencial com contratação de mutirões, mas prazo de implementação segue em análise.'
    ],
    sentiment: 'negative'
  },
  {
    id: '2025-03-04-leitos',
    title: 'Hospitais municipais recebem 30 novos leitos de UTI adulto',
    source: 'Portal UOL Piracicaba',
    url: 'https://www.uol.com.br/piracicaba/noticias/2025/03/04/leitos-uti-piracicaba.htm',
    publishedAt: '2025-03-04T11:00:00-03:00',
    summary: [
      'Ampliação beneficia Hospital Regional e Santa Casa, reduzindo fila de regulação em 22%.',
      'Equipamentos foram adquiridos com recursos do Plano Estadual de Desenvolvimento da Saúde.'
    ],
    sentiment: 'positive'
  },
  {
    id: '2025-01-18-farmacia',
    title: 'Rede municipal instala dispensadores automáticos de medicamentos',
    source: 'Folha de Piracicaba',
    url: 'https://www.folhadepiracicaba.com.br/2025/01/18/dispensadores-automaticos-farmacia-popular',
    publishedAt: '2025-01-18T10:20:00-03:00',
    summary: [
      'Sistema piloto nas farmácias populares Paulicéia e Vila Fátima reduz tempo médio de espera para 6 minutos.',
      'Projeto usa autenticação via cartão cidadão e integra estoque em tempo real com hospitais da rede.'
    ],
    sentiment: 'positive'
  }
];

export function getLatestPiracicabaHealthNews() {
  return [...piracicabaHealthNews2025].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}
