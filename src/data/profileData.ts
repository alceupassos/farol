// Profile data for medical profile sections
export const profileSections = [
  {
    id: 'personal',
    title: 'Informações Pessoais',
    fields: [
      { id: 'name', label: 'Nome Completo', value: 'João Silva' },
      { id: 'dob', label: 'Data de Nascimento', value: '15 de Janeiro de 1980' },
      { id: 'gender', label: 'Gênero', value: 'Masculino' },
      { id: 'bloodType', label: 'Tipo Sanguíneo', value: 'O+' },
      { id: 'height', label: 'Altura', value: '1,78 m' },
      { id: 'weight', label: 'Peso', value: '75 kg' }
    ]
  },
  {
    id: 'contact',
    title: 'Informações de Contato',
    fields: [
      { id: 'email', label: 'E-mail', value: 'joao.silva@exemplo.com' },
      { id: 'phone', label: 'Telefone', value: '+55 (12) 98765-4321' },
      { id: 'address', label: 'Endereço', value: 'Rua XV de Novembro, 123, Pindamonhangaba, SP' },
      { id: 'emergency', label: 'Contato de Emergência', value: 'Maria Silva (Esposa) - +55 (12) 91234-5678' }
    ]
  },
  {
    id: 'conditions',
    title: 'Condições Médicas',
    fields: [
      { 
        id: 'chronic', 
        label: 'Condições Crônicas', 
        value: ['Hipertensão (diagnosticada em 2015)', 'Diabetes Tipo 2 (diagnosticada em 2018)'],
        isArray: true
      },
      { 
        id: 'allergies', 
        label: 'Alergias', 
        value: ['Penicilina - Grave', 'Amendoim - Moderada', 'Poeira - Leve'],
        isArray: true
      },
      { 
        id: 'surgeries', 
        label: 'Cirurgias Anteriores', 
        value: ['Apendicectomia (2010)', 'Artroscopia no Joelho (2019)'],
        isArray: true
      }
    ]
  },
  {
    id: 'medications',
    title: 'Medicamentos Atuais',
    fields: [
      { 
        id: 'prescriptions', 
        label: 'Prescrições', 
        value: [
          'Lisinopril 10mg - Uma vez ao dia', 
          'Metformina 500mg - Duas vezes ao dia', 
          'Atorvastatina 20mg - Uma vez ao dia antes de dormir'
        ],
        isArray: true
      },
      { 
        id: 'supplements', 
        label: 'Suplementos', 
        value: ['Multivitamínico - Uma vez ao dia', 'Vitamina D3 2000 UI - Uma vez ao dia'],
        isArray: true
      }
    ]
  },
  {
    id: 'family',
    title: 'Histórico Familiar',
    fields: [
      { 
        id: 'familyConditions', 
        label: 'Condições Médicas Familiares', 
        value: [
          'Pai: Hipertensão, Doença Arterial Coronariana', 
          'Mãe: Diabetes Tipo 2', 
          'Irmã: Nenhuma'
        ],
        isArray: true
      }
    ]
  }
];

// Dados para prontuários médicos
export const medicalRecords = [
  { id: "rec1", date: "10/05/2023", type: "Consulta Geral", doctor: "Dr. Antônio Ferreira", notes: "Exame de rotina, sem problemas identificados." },
  { id: "rec2", date: "22/07/2023", type: "Exame de Sangue", doctor: "Dra. Mariana Santos", notes: "Níveis de colesterol ligeiramente elevados." },
  { id: "rec3", date: "15/09/2023", type: "Consulta Cardiologista", doctor: "Dr. Ricardo Mendes", notes: "Eletrocardiograma normal. Recomendação para atividade física." },
];

// Dados para medicamentos - updated to include the required 'status' property with correct type
export const medications = [
  { id: "med1", name: "Lisinopril", dose: "10mg", frequency: "Uma vez ao dia", startDate: "15/01/2022", endDate: "Contínuo", status: "Ativo" as "Ativo" },
  { id: "med2", name: "Metformina", dose: "500mg", frequency: "Duas vezes ao dia", startDate: "10/03/2022", endDate: "Contínuo", status: "Ativo" as "Ativo" },
  { id: "med3", name: "Atorvastatina", dose: "20mg", frequency: "Uma vez ao dia antes de dormir", startDate: "05/08/2023", endDate: "Contínuo", status: "Ativo" as "Ativo" },
];

// Dados para consultas
export const appointments = [
  { id: "apt1", date: "15/12/2023", time: "14:30", doctor: "Dra. Carla Oliveira", specialty: "Endocrinologia", location: "Clínica Saúde Total" },
  { id: "apt2", date: "27/12/2023", time: "09:00", doctor: "Dr. Paulo Gomes", specialty: "Cardiologia", location: "Hospital Santa Cruz" },
  { id: "apt3", date: "10/01/2024", time: "11:15", doctor: "Dr. Antônio Ferreira", specialty: "Clínica Geral", location: "Clínica Saúde Total" },
];

// Dados para métricas de saúde
export const healthMetrics = [
  { name: "Pressão Arterial", value: "130/85", date: "10/11/2023", status: "Alerta" as "Normal" | "Alerta" | "Crítico" },
  { name: "Glicose", value: "110 mg/dL", date: "10/11/2023", status: "Normal" as "Normal" | "Alerta" | "Crítico" },
  { name: "IMC", value: "24.7", date: "10/11/2023", status: "Normal" as "Normal" | "Alerta" | "Crítico" },
  { name: "Colesterol Total", value: "195 mg/dL", date: "22/09/2023", status: "Normal" as "Normal" | "Alerta" | "Crítico" },
];

// Dados para registros de acesso
export const accessLogs = [
  { id: "log1", date: "05/12/2023", time: "09:45", user: "Dr. Antônio Ferreira", action: "Visualização de prontuário" },
  { id: "log2", date: "10/11/2023", time: "14:30", user: "Dra. Mariana Santos", action: "Atualização de medicamentos" },
  { id: "log3", date: "22/10/2023", time: "11:20", user: "Sistema", action: "Backup automático de dados" },
];
