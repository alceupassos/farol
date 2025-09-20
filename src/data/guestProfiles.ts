export const guestProfiles = {
  gestor: {
    name: "Dr. Carlos Mendes",
    role: "Secretário de Saúde",
    roleKey: "data.guestProfiles.gestor.role",
    municipality: "Pindamonhangaba - SP",
    email: "demo@sistema.local",
    avatar: "👨‍💼",
    descriptionKey: "data.guestProfiles.gestor.description"
  },
  medico: {
    name: "Dra. Ana Silva",
    role: "Médica Cardiologista",
    roleKey: "data.guestProfiles.medico.role",
    crm: "CRM/SP 123.456",
    specialty: "Cardiologia",
    email: "demo@sistema.local",
    avatar: "👩‍⚕️",
    descriptionKey: "data.guestProfiles.medico.description"
  },
  hospital: {
    name: "Santa Casa de Misericórdia",
    role: "Administrador Hospitalar",
    roleKey: "data.guestProfiles.hospital.role",
    institution: "Hospital Filantrópico",
    cnpj: "12.345.678/0001-90",
    email: "demo@sistema.local",
    avatar: "🏥",
    descriptionKey: "data.guestProfiles.hospital.description"
  },
  laboratorio: {
    name: "Dra. Marina Torres",
    role: "Gestora de Operações Laboratoriais",
    roleKey: "data.guestProfiles.laboratorio.role",
    institution: "Hub Integrado AngraLab",
    cnpj: "98.765.432/0001-10",
    email: "demo@sistema.local",
    avatar: "🧪",
    descriptionKey: "data.guestProfiles.laboratorio.description"
  },
  paciente: {
    name: "João Silva",
    role: "Paciente",
    roleKey: "data.guestProfiles.paciente.role",
    age: "43 anos",
    gender: "Masculino",
    bloodType: "O+",
    email: "demo@sistema.local",
    avatar: "👨",
    descriptionKey: "data.guestProfiles.paciente.description"
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
  name: "Pindamonhangaba",
  population: 164138,
  healthBudget: "R$ 45 milhões",
  healthUnits: 23,
  doctors: 342,
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
