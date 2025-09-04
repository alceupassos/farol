export const guestProfiles = {
  gestor: {
    name: "Dr. Carlos Mendes",
    role: "Secretário de Saúde",
    municipality: "São Paulo - SP",
    email: "guest@saudepublica.ai",
    avatar: "👨‍💼",
    description: "Gestor público com 15 anos de experiência em administração de saúde municipal"
  },
  medico: {
    name: "Dra. Ana Silva",
    role: "Médica Cardiologista", 
    crm: "CRM/SP 123.456",
    specialty: "Cardiologia",
    email: "guest@saudepublica.ai",
    avatar: "👩‍⚕️",
    description: "Cardiologista com 10 anos de experiência, especialista em medicina preventiva"
  },
  paciente: {
    name: "João Silva",
    role: "Paciente",
    age: "43 anos",
    gender: "Masculino",
    bloodType: "O+",
    email: "guest@saudepublica.ai",
    avatar: "👨",
    description: "Paciente com histórico de diabetes tipo 2 e hipertensão arterial"
  }
};

export const samplePatients = [
  {
    id: "pat1",
    name: "Maria Santos",
    age: 65,
    gender: "Feminino",
    condition: "Hipertensão Arterial",
    lastVisit: "2024-01-15",
    status: "Estável",
    bloodType: "A+",
    avatar: "👵"
  },
  {
    id: "pat2", 
    name: "Carlos Junior",
    age: 12,
    gender: "Masculino",
    condition: "Asma Bronquica",
    lastVisit: "2024-01-10",
    status: "Controlado",
    bloodType: "B+",
    avatar: "👦"
  },
  {
    id: "pat3",
    name: "Ana Costa",
    age: 78,
    gender: "Feminino", 
    condition: "Diabetes Tipo 2",
    lastVisit: "2024-01-08",
    status: "Necessita Acompanhamento",
    bloodType: "O-",
    avatar: "👵"
  },
  {
    id: "pat4",
    name: "Pedro Oliveira",
    age: 45,
    gender: "Masculino",
    condition: "Dislipidemia",
    lastVisit: "2024-01-12",
    status: "Estável",
    bloodType: "AB+",
    avatar: "👨"
  }
];

export const municipalityData = {
  name: "São Paulo",
  population: 12325000,
  healthBudget: "R$ 8.2 bilhões",
  healthUnits: 468,
  doctors: 3245,
  nurses: 8921,
  beds: 15678,
  vaccinationRate: 87.5,
  infantMortality: 11.2,
  lifeExpectancy: 76.3
};

export const appointments = [
  {
    id: "app1",
    patient: "Maria Santos",
    time: "09:00",
    date: "2024-01-20",
    type: "Consulta Cardiologia",
    status: "Agendado"
  },
  {
    id: "app2",
    patient: "Carlos Junior", 
    time: "10:30",
    date: "2024-01-20",
    type: "Consulta Pediatria",
    status: "Agendado"
  },
  {
    id: "app3",
    patient: "Ana Costa",
    time: "14:00", 
    date: "2024-01-20",
    type: "Consulta Endocrinologia",
    status: "Agendado"
  }
];