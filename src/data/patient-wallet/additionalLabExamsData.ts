import { LabExam } from '@/components/labexams/types';

export const additionalLabExams: LabExam[] = [
  {
    id: 'exam006',
    name: 'Perfil Lipídico Completo',
    date: '2024-05-10',
    provider: 'Laboratório Vida Saudável',
    doctor: 'Dr. Cardoso',
    category: 'Bioquímica',
    status: 'warning',
    summary: 'Colesterol total e LDL elevados.',
    reportUrl: '/path/to/report6.pdf',
    scanned: true,
    verified: true,
    groups: [
      {
        name: 'Colesterol Total',
        parameters: [
          { name: 'Colesterol Total', value: '245', unit: 'mg/dL', referenceRange: '<200', status: 'warning' },
        ],
      },
      {
        name: 'Lipoproteínas',
        parameters: [
          { name: 'HDL Colesterol', value: '40', unit: 'mg/dL', referenceRange: '>40', status: 'normal' },
          { name: 'LDL Colesterol', value: '165', unit: 'mg/dL', referenceRange: '<100', status: 'critical' },
          { name: 'VLDL Colesterol', value: '40', unit: 'mg/dL', referenceRange: '<30', status: 'warning' },
        ],
      },
      {
        name: 'Triglicerídeos',
        parameters: [
          { name: 'Triglicerídeos', value: '180', unit: 'mg/dL', referenceRange: '<150', status: 'warning' },
        ],
      },
    ],
  },
  {
    id: 'exam007',
    name: 'Função Renal (Ureia e Creatinina)',
    date: '2024-04-22',
    provider: 'Clínica CheckUp',
    doctor: 'Dr. Silva',
    category: 'Bioquímica',
    status: 'normal',
    summary: 'Função renal aparentemente normal.',
    reportUrl: '/path/to/report7.pdf',
    scanned: true,
    verified: true,
    groups: [
      {
        name: 'Indicadores de Função Renal',
        parameters: [
          { name: 'Ureia', value: '35', unit: 'mg/dL', referenceRange: '15-40', status: 'normal' },
          { name: 'Creatinina', value: '0.9', unit: 'mg/dL', referenceRange: '0.6-1.2', status: 'normal' },
          { name: 'Taxa de Filtração Glomerular (TFG estimada)', value: '95', unit: 'mL/min/1.73m²', referenceRange: '>90', status: 'normal' },
        ],
      },
    ],
  },
  {
    id: 'exam008',
    name: 'Função Hepática (Enzimas)',
    date: '2024-03-15',
    provider: 'Hospital Central',
    doctor: 'Dr. Santos',
    category: 'Bioquímica',
    status: 'normal',
    summary: 'Enzimas hepáticas dentro dos limites.',
    reportUrl: '/path/to/report8.pdf',
    scanned: true,
    verified: true,
    groups: [
      {
        name: 'Transaminases',
        parameters: [
          { name: 'AST (TGO)', value: '25', unit: 'U/L', referenceRange: '5-40', status: 'normal' },
          { name: 'ALT (TGP)', value: '30', unit: 'U/L', referenceRange: '7-56', status: 'normal' },
        ],
      },
      {
        name: 'Outros Marcadores Hepáticos',
        parameters: [
          { name: 'Gama GT', value: '40', unit: 'U/L', referenceRange: '5-60', status: 'normal' },
          { name: 'Fosfatase Alcalina', value: '80', unit: 'U/L', referenceRange: '40-129', status: 'normal' },
          { name: 'Bilirrubina Total', value: '0.8', unit: 'mg/dL', referenceRange: '0.2-1.2', status: 'normal' },
        ],
      },
    ],
  },
  {
    id: 'exam009',
    name: 'Hormônios Tireoidianos',
    date: '2024-02-01',
    provider: 'Laboratório Diagnóstico Avançado',
    doctor: 'Dr. Oliveira',
    category: 'Hormônios',
    status: 'warning',
    summary: 'TSH levemente elevado, sugere hipotireoidismo subclínico.',
    reportUrl: '/path/to/report9.pdf',
    scanned: true,
    verified: true,
    groups: [
      {
        name: 'Função Tireoidiana',
        parameters: [
          { name: 'TSH (Hormônio Tireoestimulante)', value: '5.5', unit: 'µUI/mL', referenceRange: '0.4-4.5', status: 'warning' },
          { name: 'T4 Livre', value: '1.2', unit: 'ng/dL', referenceRange: '0.8-1.8', status: 'normal' },
          { name: 'T3 Total', value: '110', unit: 'ng/dL', referenceRange: '80-200', status: 'normal' },
        ],
      },
    ],
  },
  {
    id: 'exam010',
    name: 'Vitamina D (25-hidroxivitamina D)',
    date: '2024-01-10',
    provider: 'Clínica Sol & Saúde',
    doctor: 'Dr. Costa',
    category: 'Vitaminas',
    status: 'critical',
    summary: 'Deficiência severa de Vitamina D.',
    reportUrl: '/path/to/report10.pdf',
    scanned: true,
    verified: true,
    groups: [
      {
        name: 'Níveis de Vitamina D',
        parameters: [
          { name: '25-hidroxivitamina D', value: '10', unit: 'ng/mL', referenceRange: '30-100', status: 'critical' },
        ],
      },
    ],
  },
  {
    id: 'exam011',
    name: 'Exame de Urina Tipo I (EAS)',
    date: '2024-05-20',
    provider: 'Posto de Saúde Comunitário',
    doctor: 'Dr. Lima',
    category: 'Urinálise',
    status: 'normal',
    summary: 'Exame de urina sem alterações significativas.',
    reportUrl: '/path/to/report11.pdf',
    scanned: true,
    verified: true,
    groups: [
      {
        name: 'Características Físicas',
        parameters: [
          { name: 'Cor', value: 'Amarelo Citrino', unit: '', referenceRange: 'Amarelo Claro a Âmbar', status: 'normal' },
          { name: 'Aspecto', value: 'Límpido', unit: '', referenceRange: 'Límpido', status: 'normal' },
          { name: 'Densidade', value: '1.015', unit: '', referenceRange: '1.005-1.030', status: 'normal' },
        ],
      },
      {
        name: 'Exame Químico',
        parameters: [
          { name: 'pH', value: '6.0', unit: '', referenceRange: '4.5-8.0', status: 'normal' },
          { name: 'Proteínas', value: 'Ausente', unit: '', referenceRange: 'Ausente', status: 'normal' },
          { name: 'Glicose', value: 'Ausente', unit: '', referenceRange: 'Ausente', status: 'normal' },
          { name: 'Cetonas', value: 'Ausente', unit: '', referenceRange: 'Ausente', status: 'normal' },
          { name: 'Bilirrubina', value: 'Ausente', unit: '', referenceRange: 'Ausente', status: 'normal' },
          { name: 'Urobilinogênio', value: 'Normal', unit: '', referenceRange: 'Normal', status: 'normal' },
          { name: 'Sangue (Hemoglobina)', value: 'Ausente', unit: '', referenceRange: 'Ausente', status: 'normal' },
          { name: 'Nitrito', value: 'Negativo', unit: '', referenceRange: 'Negativo', status: 'normal' },
          { name: 'Leucócitos Esterase', value: 'Negativo', unit: '', referenceRange: 'Negativo', status: 'normal' },
        ],
      },
      {
        name: 'Sedimentoscopia',
        parameters: [
          { name: 'Células Epiteliais', value: 'Raras', unit: '/campo', referenceRange: 'Raras a Algumas', status: 'normal' },
          { name: 'Leucócitos', value: '0-2', unit: '/campo', referenceRange: '0-5', status: 'normal' },
          { name: 'Hemácias', value: '0-1', unit: '/campo', referenceRange: '0-3', status: 'normal' },
          { name: 'Cilindros', value: 'Ausentes', unit: '/campo', referenceRange: 'Ausentes', status: 'normal' },
          { name: 'Cristais', value: 'Ausentes', unit: '', referenceRange: 'Ausentes ou Raros', status: 'normal' },
          { name: 'Muco', value: 'Escasso', unit: '', referenceRange: 'Escasso', status: 'normal' },
        ],
      },
    ],
  },
];