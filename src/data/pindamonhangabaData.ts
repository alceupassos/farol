// Dados demográficos completos de Pindamonhangaba/SP
// População: ~164.000 habitantes

export interface Address {
  street: string;
  number: string;
  neighborhood: string;
  zipCode: string;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
}

export interface Person {
  id: string;
  name: string;
  cpf: string;
  rg: string;
  birthDate: string;
  age: number;
  gender: 'M' | 'F';
  phone: string;
  email: string;
  bloodType: string;
  allergies: string[];
  chronicConditions: string[];
  medications: string[];
  lastExam: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  healthInsurance?: string;
  profession: string;
  address: Address;
  familyId: string;
}

export interface Family {
  id: string;
  head: string;
  members: string[];
  address: Address;
  socialClass: 'A' | 'B' | 'C' | 'D' | 'E';
  monthlyIncome: number;
}

export interface HealthUnit {
  id: string;
  name: string;
  type: 'UBS' | 'UPA' | 'Hospital' | 'Clínica';
  address: Address;
  services: string[];
  doctors: number;
  capacity: number;
}

// Coordenadas de Pindamonhangaba: -22.9242, -45.4612
export const PINDAMONHANGABA_CENTER = {
  latitude: -22.9242,
  longitude: -45.4612
};

// Dados municipais
export const municipalData = {
  population: 164138,
  area: 729.9, // km²
  density: 224.9, // hab/km²
  gdpPerCapita: 28450,
  hdi: 0.773,
  lifeExpectancy: 76.2,
  infantMortality: 12.5, // por 1000 nascidos vivos
  literacyRate: 94.8,
  basicSanitation: 87.3,
  waterAccess: 96.7,
  electricityAccess: 99.1,
  healthUnits: 23,
  hospitals: 4,
  doctors: 342,
  nurses: 891,
  vaccinationRate: 89.4,
  prenatalCoverage: 94.2,
  totalFamilies: 52684,
  averageFamilySize: 3.1
};

// Bairros de Pindamonhangaba com coordenadas
export const neighborhoods = [
  { name: 'Centro', lat: -22.9242, lng: -45.4612, population: 8500 },
  { name: 'Cidade Nova', lat: -22.9180, lng: -45.4580, population: 12000 },
  { name: 'Vila Santa Clara', lat: -22.9300, lng: -45.4700, population: 9800 },
  { name: 'Jardim Regina', lat: -22.9400, lng: -45.4550, population: 7200 },
  { name: 'Vila Operária', lat: -22.9150, lng: -45.4650, population: 6800 },
  { name: 'Mombaça', lat: -22.9500, lng: -45.4400, population: 15000 },
  { name: 'Bosque da Saúde', lat: -22.9350, lng: -45.4580, population: 5600 },
  { name: 'Alto do Cardoso', lat: -22.9100, lng: -45.4750, population: 8900 },
  { name: 'Araretama', lat: -22.9600, lng: -45.4200, population: 11200 },
  { name: 'Crispim', lat: -22.9050, lng: -45.4500, population: 4800 },
  { name: 'Conjunto Residencial Pindamonhangaba', lat: -22.9280, lng: -45.4480, population: 9500 },
  { name: 'Jardim Esperança', lat: -22.9380, lng: -45.4620, population: 6200 },
  { name: 'Ville Chamonix', lat: -22.9200, lng: -45.4520, population: 3800 },
  { name: 'Pasin', lat: -22.9450, lng: -45.4350, population: 7800 },
  { name: 'Jardim São Luiz', lat: -22.9320, lng: -45.4680, population: 5400 },
];

// Unidades de saúde
export const healthUnits: HealthUnit[] = [
  {
    id: 'ubs-001',
    name: 'UBS Centro',
    type: 'UBS',
    address: {
      street: 'Rua Marechal Deodoro',
      number: '150',
      neighborhood: 'Centro',
      zipCode: '12401-010',
      city: 'Pindamonhangaba',
      state: 'SP',
      latitude: -22.9235,
      longitude: -45.4605
    },
    services: ['Clínica Geral', 'Pediatria', 'Ginecologia', 'Odontologia', 'Vacinação'],
    doctors: 8,
    capacity: 300
  },
  {
    id: 'ubs-002',
    name: 'UBS Cidade Nova',
    type: 'UBS',
    address: {
      street: 'Av. Nossa Senhora do Bom Sucesso',
      number: '890',
      neighborhood: 'Cidade Nova',
      zipCode: '12412-580',
      city: 'Pindamonhangaba',
      state: 'SP',
      latitude: -22.9175,
      longitude: -45.4575
    },
    services: ['Clínica Geral', 'Pediatria', 'Enfermagem', 'Farmácia Básica'],
    doctors: 6,
    capacity: 250
  },
  {
    id: 'hospital-001',
    name: 'Hospital Beneficência Portuguesa',
    type: 'Hospital',
    address: {
      street: 'Rua Alcides Ramos Nogueira',
      number: '280',
      neighborhood: 'Centro',
      zipCode: '12401-230',
      city: 'Pindamonhangaba',
      state: 'SP',
      latitude: -22.9220,
      longitude: -45.4590
    },
    services: ['Emergência', 'UTI', 'Cirurgia', 'Maternidade', 'Cardiologia'],
    doctors: 45,
    capacity: 120
  }
];

// 50 famílias com dados completos
export const families: Family[] = Array.from({ length: 50 }, (_, i) => {
  const neighborhood = neighborhoods[i % neighborhoods.length];
  const familyId = `fam-${String(i + 1).padStart(3, '0')}`;
  const headId = `per-${String(i * 4 + 1).padStart(3, '0')}`;
  
  return {
    id: familyId,
    head: headId,
    members: [
      headId,
      `per-${String(i * 4 + 2).padStart(3, '0')}`,
      `per-${String(i * 4 + 3).padStart(3, '0')}`,
      `per-${String(i * 4 + 4).padStart(3, '0')}`
    ].slice(0, Math.floor(Math.random() * 3) + 2), // 2 a 4 membros
    address: {
      street: getRandomStreet(neighborhood.name),
      number: String(Math.floor(Math.random() * 999) + 1),
      neighborhood: neighborhood.name,
      zipCode: `124${String(Math.floor(Math.random() * 99)).padStart(2, '0')}-${String(Math.floor(Math.random() * 999)).padStart(3, '0')}`,
      city: 'Pindamonhangaba',
      state: 'SP',
      latitude: neighborhood.lat + (Math.random() - 0.5) * 0.01,
      longitude: neighborhood.lng + (Math.random() - 0.5) * 0.01
    },
    socialClass: ['A', 'B', 'C', 'D', 'E'][Math.floor(Math.random() * 5)] as 'A' | 'B' | 'C' | 'D' | 'E',
    monthlyIncome: Math.floor(Math.random() * 8000) + 1500
  };
});

function getRandomStreet(neighborhood: string): string {
  const streets = {
    'Centro': ['Rua XV de Novembro', 'Rua Marechal Deodoro', 'Av. Presidente Vargas', 'Rua Dr. João Ferraz'],
    'Cidade Nova': ['Av. Nossa Senhora do Bom Sucesso', 'Rua Benedito Santos', 'Rua João Pessoa'],
    'Vila Santa Clara': ['Rua Santa Clara', 'Rua São José', 'Av. Santa Maria'],
    'Jardim Regina': ['Rua das Flores', 'Rua Regina', 'Av. dos Jardins'],
    'Vila Operária': ['Rua do Trabalho', 'Rua Operária', 'Av. Industrial'],
    'Mombaça': ['Rua Mombaça', 'Av. Central', 'Rua Principal'],
    'default': ['Rua Principal', 'Av. Central', 'Rua das Palmeiras']
  };
  
  const neighborhoodStreets = streets[neighborhood as keyof typeof streets] || streets.default;
  return neighborhoodStreets[Math.floor(Math.random() * neighborhoodStreets.length)];
}

// Pessoas com dados médicos completos - 200 pessoas de 50 famílias
export const people: Person[] = [];

// Gerar pessoas para cada família
families.forEach((family, familyIndex) => {
  family.members.forEach((memberId, memberIndex) => {
    const isHead = memberIndex === 0;
    const age = isHead ? Math.floor(Math.random() * 40) + 25 : 
                memberIndex === 1 ? Math.floor(Math.random() * 40) + 22 :
                Math.floor(Math.random() * 15) + 5;
    
    const firstName = getRandomFirstName(memberIndex % 2 === 0 ? 'M' : 'F');
    const lastName = `${getRandomLastName()} ${getRandomLastName()}`;
    
    people.push({
      id: memberId,
      name: `${firstName} ${lastName}`,
      cpf: generateCPF(),
      rg: generateRG(),
      birthDate: generateBirthDate(age),
      age,
      gender: memberIndex % 2 === 0 ? 'M' : 'F',
      phone: memberIndex < 2 ? `(12) ${Math.floor(Math.random() * 90000) + 90000}-${Math.floor(Math.random() * 9000) + 1000}` : '',
      email: memberIndex < 2 ? `${firstName.toLowerCase()}.${lastName.split(' ')[0].toLowerCase()}@email.com` : '',
      bloodType: getRandomBloodType(),
      allergies: getRandomAllergies(),
      chronicConditions: age > 40 ? getRandomChronicConditions() : [],
      medications: age > 30 ? getRandomMedications() : [],
      lastExam: generateRandomDate(30),
      emergencyContact: {
        name: isHead ? family.members[1] ? people.find(p => p.id === family.members[1])?.name || 'Contato de Emergência' : 'Contato de Emergência' : 
              people.find(p => p.id === family.head)?.name || 'Responsável',
        phone: `(12) ${Math.floor(Math.random() * 90000) + 90000}-${Math.floor(Math.random() * 9000) + 1000}`,
        relationship: isHead ? 'Cônjuge' : 'Responsável'
      },
      healthInsurance: Math.random() > 0.3 ? getRandomHealthInsurance() : undefined,
      profession: age >= 16 ? getRandomProfession() : 'Estudante',
      address: family.address,
      familyId: family.id
    });
  });
});

function getRandomFirstName(gender: 'M' | 'F'): string {
  const maleNames = ['João', 'José', 'Antonio', 'Francisco', 'Carlos', 'Paulo', 'Pedro', 'Lucas', 'Luiz', 'Marcos', 'Daniel', 'Rafael', 'Gabriel', 'Bruno', 'Eduardo', 'Thiago', 'André', 'Gustavo', 'Fernando', 'Ricardo'];
  const femaleNames = ['Maria', 'Ana', 'Francisca', 'Antonia', 'Adriana', 'Juliana', 'Márcia', 'Fernanda', 'Patricia', 'Aline', 'Sandra', 'Cristiane', 'Paula', 'Vanessa', 'Carla', 'Simone', 'Luciana', 'Denise', 'Viviane', 'Rose'];
  return gender === 'M' ? maleNames[Math.floor(Math.random() * maleNames.length)] : femaleNames[Math.floor(Math.random() * femaleNames.length)];
}

function getRandomLastName(): string {
  const lastNames = ['Silva', 'Santos', 'Oliveira', 'Souza', 'Rodrigues', 'Ferreira', 'Alves', 'Pereira', 'Lima', 'Gomes', 'Costa', 'Ribeiro', 'Martins', 'Carvalho', 'Almeida', 'Lopes', 'Soares', 'Fernandes', 'Vieira', 'Barbosa'];
  return lastNames[Math.floor(Math.random() * lastNames.length)];
}

function generateCPF(): string {
  const nums = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10));
  return `${nums.slice(0, 3).join('')}.${nums.slice(3, 6).join('')}.${nums.slice(6).join('')}-${Math.floor(Math.random() * 90) + 10}`;
}

function generateRG(): string {
  const nums = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10));
  return `${nums.slice(0, 2).join('')}.${nums.slice(2, 5).join('')}.${nums.slice(5).join('')}-${Math.floor(Math.random() * 10)}`;
}

function generateBirthDate(age: number): string {
  const currentYear = new Date().getFullYear();
  const birthYear = currentYear - age;
  const month = Math.floor(Math.random() * 12) + 1;
  const day = Math.floor(Math.random() * 28) + 1;
  return `${birthYear}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function getRandomBloodType(): string {
  const types = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  return types[Math.floor(Math.random() * types.length)];
}

function getRandomAllergies(): string[] {
  const allergies = ['Penicilina', 'Dipirona', 'AAS', 'Lactose', 'Glúten', 'Amendoim', 'Camarão', 'Pólen'];
  const count = Math.random() > 0.7 ? Math.floor(Math.random() * 3) + 1 : 0;
  return count > 0 ? allergies.sort(() => 0.5 - Math.random()).slice(0, count) : [];
}

function getRandomChronicConditions(): string[] {
  const conditions = ['Hipertensão', 'Diabetes', 'Colesterol Alto', 'Artrite', 'Asma', 'Fibromialgia', 'Depressão', 'Ansiedade'];
  const count = Math.random() > 0.6 ? Math.floor(Math.random() * 2) + 1 : 0;
  return count > 0 ? conditions.sort(() => 0.5 - Math.random()).slice(0, count) : [];
}

function getRandomMedications(): string[] {
  const medications = ['Losartana 50mg', 'Hidroclorotiazida 25mg', 'Metformina 850mg', 'Sinvastatina 20mg', 'Omeprazol 20mg', 'Paracetamol 500mg', 'Ibuprofeno 400mg'];
  const count = Math.random() > 0.5 ? Math.floor(Math.random() * 3) + 1 : 0;
  return count > 0 ? medications.sort(() => 0.5 - Math.random()).slice(0, count) : [];
}

function getRandomHealthInsurance(): string {
  const insurances = ['Unimed', 'Bradesco Saúde', 'Amil', 'SulAmérica', 'NotreDame Intermédica', 'Hapvida'];
  return insurances[Math.floor(Math.random() * insurances.length)];
}

function getRandomProfession(): string {
  const professions = ['Auxiliar Administrativo', 'Professor', 'Enfermeiro', 'Técnico', 'Comerciante', 'Autônomo', 'Aposentado', 'Motorista', 'Vendedor', 'Operador', 'Cozinheiro', 'Segurança', 'Doméstica', 'Agricultor'];
  return professions[Math.floor(Math.random() * professions.length)];
}

function generateRandomDate(daysAgo: number): string {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * daysAgo));
  return date.toISOString().split('T')[0];
}

// Dados epidemiológicos por bairro
export const epidemiologicalData = [
  {
    neighborhood: 'Centro',
    cases: {
      dengue: 12,
      covid: 45,
      influenza: 23,
      hepatite: 3,
      tuberculose: 1
    },
    riskLevel: 'medium',
    lastUpdate: '2024-01-15'
  },
  {
    neighborhood: 'Cidade Nova',
    cases: {
      dengue: 8,
      covid: 67,
      influenza: 34,
      hepatite: 5,
      tuberculose: 2
    },
    riskLevel: 'high',
    lastUpdate: '2024-01-15'
  },
  {
    neighborhood: 'Vila Santa Clara',
    cases: {
      dengue: 15,
      covid: 23,
      influenza: 18,
      hepatite: 2,
      tuberculose: 0
    },
    riskLevel: 'high',
    lastUpdate: '2024-01-15'
  }
];

// Dados para dashboards
export const dashboardData = {
  gestor: {
    totalPopulation: municipalData.population,
    healthUnits: municipalData.healthUnits,
    doctors: municipalData.doctors,
    nurses: municipalData.nurses,
    vaccinationRate: municipalData.vaccinationRate,
    budget: 45000000, // R$ 45 milhões
    budgetExecuted: 32000000, // R$ 32 milhões
    pendingExams: 1247,
    scheduledAppointments: 3456,
    emergencyAlerts: 8,
    epidemiologicalAlerts: [
      { type: 'Dengue', neighborhood: 'Vila Santa Clara', cases: 15 },
      { type: 'COVID-19', neighborhood: 'Cidade Nova', cases: 67 }
    ]
  },
  medico: {
    todayPatients: 18,
    appointmentsWeek: 89,
    pendingExams: 23,
    emergencyCalls: 3,
    prescriptionsMonth: 156,
    patients: people.slice(0, 20) // Primeiros 20 pacientes
  },
  paciente: {
    nextAppointment: '2024-01-25 14:30',
    pendingExams: 2,
    medications: 3,
    lastExam: '2024-01-15',
    vaccinations: 'Em dia',
    healthScore: 85
  }
};