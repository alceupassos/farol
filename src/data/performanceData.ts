// Dados de exemplo para os gráficos
export const performanceData = [
  { 
    month: 'Jan', 
    meta: 95, 
    realizado: 92,
    glosas: 3,
    eficiencia: 89,
    satisfacao: 4.2
  },
  { 
    month: 'Fev', 
    meta: 96, 
    realizado: 94,
    glosas: 2,
    eficiencia: 91,
    satisfacao: 4.3
  },
  { 
    month: 'Mar', 
    meta: 97, 
    realizado: 95,
    glosas: 2,
    eficiencia: 93,
    satisfacao: 4.4
  },
  { 
    month: 'Abr', 
    meta: 97, 
    realizado: 96,
    glosas: 1,
    eficiencia: 95,
    satisfacao: 4.5
  },
  { 
    month: 'Mai', 
    meta: 97, 
    realizado: 95,
    glosas: 2,
    eficiencia: 94,
    satisfacao: 4.6
  },
  { 
    month: 'Jun', 
    meta: 98, 
    realizado: 97,
    glosas: 1,
    eficiencia: 96,
    satisfacao: 4.7
  },
];

// Dados de metas por indicador
export const metasIndicadores = [
  {
    id: 1,
    nome: 'Taxa de Glosas',
    meta: '≤ 2%',
    atual: '1.2%',
    tendencia: 'melhorando',
    progresso: 80,
    status: 'bom'
  },
  {
    id: 2,
    nome: 'Tempo Médio de Resposta',
    meta: '≤ 24h',
    atual: '18h',
    tendencia: 'estável',
    progresso: 75,
    status: 'alerta'
  },
  {
    id: 3,
    nome: 'Satisfação do Cliente',
    meta: '≥ 4.5',
    atual: '4.7',
    tendencia: 'melhorando',
    progresso: 95,
    status: 'excelente'
  },
  {
    id: 4,
    nome: 'Eficiência Operacional',
    meta: '≥ 95%',
    atual: '96%',
    tendencia: 'melhorando',
    progresso: 98,
    status: 'excelente'
  },
  {
    id: 5,
    nome: 'Cumprimento de Prazos',
    meta: '≥ 98%',
    atual: '97%',
    tendencia: 'estável',
    progresso: 90,
    status: 'bom'
  },
];
