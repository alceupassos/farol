
export interface ProfileField {
  id: string;
  label: string;
  value: string | string[];
  isArray?: boolean;
}

export interface ProfileSection {
  id: string;
  title: string;
  fields: ProfileField[];
}

export interface MedicalRecord {
  id: string;
  date: string;
  type: string;
  doctor: string;
  specialty?: string;
  institution?: string;
  diagnosis?: string;
  notes: string;
  blockchainVerified?: boolean;
  attachments?: Array<{
    id: string;
    name: string;
    type: string;
    url: string;
  }>;
  lastModified?: string;
  accessHistory?: Array<{
    user: string;
    date: string;
    action: string;
  }>;
}

export interface Medication {
  id: string;
  name: string;
  dose: string;
  frequency: string;
  startDate: string;
  endDate: string;
  stock?: number;
  totalDoses?: number;
  nextDose?: string;
  status: "Ativo" | "Finalizado" | "Conforme necessário" | "Suspenso";
  adherence?: number;
  instructions?: string;
  category?: string;
  sideEffects?: Array<{
    id: string;
    date: string;
    description: string;
    severity: "Leve" | "Moderado" | "Grave";
  }>;
  interactions?: Array<{
    medicationId: string;
    medicationName: string;
    severity: "Baixa" | "Média" | "Alta";
    description: string;
  }>;
  prescriptionInfo?: {
    doctorName: string;
    prescriptionDate: string;
    expiryDate: string;
    renewable: boolean;
  };
}

export interface Appointment {
  id: string;
  date: string;
  time: string;
  doctor: string;
  specialty: string;
  location: string;
  type?: "Presencial" | "Telemedicina";
  status?: "Agendada" | "Realizada" | "Cancelada" | "Reagendada";
  notes?: string;
  relatedRecordId?: string;
  preparationInstructions?: string[];
  followUpActions?: string[];
  questions?: string[];
  recordingConsent?: boolean;
  recordingUrl?: string;
  transcription?: string;
}

export interface HealthMetric {
  id?: string;
  name: string;
  value: string;
  date: string;
  time?: string;
  status: "Normal" | "Alerta" | "Crítico";
  unit?: string;
  referenceRange?: {
    min: number;
    max: number;
  };
  previousValue?: string;
  changePercentage?: number;
  trend?: "up" | "down" | "stable";
  notes?: string;
  deviceSource?: string;
  goalValue?: string;
  goalDate?: string;
  category?: "Cardiovascular" | "Metabólico" | "Respiratório" | "Físico" | "Outro";
}

export interface HealthGoal {
  id: string;
  metricName: string;
  currentValue: string;
  targetValue: string;
  startDate: string;
  targetDate: string;
  progress: number;
  status: "Em andamento" | "Concluído" | "Atrasado";
  notes?: string;
}

export interface MetricReport {
  id: string;
  title: string;
  generatedDate: string;
  period: string;
  metrics: HealthMetric[];
  insights: string[];
  recommendations: string[];
  sharedWith?: string[];
}

export interface AccessLog {
  id: string;
  date: string;
  time: string;
  user: string;
  action: string;
  status?: string;
}

export interface AccessPermission {
  id: string;
  grantedTo: {
    id: string;
    name: string;
    role: string;
    institution?: string;
  };
  status: "Pendente" | "Ativa" | "Expirada" | "Revogada";
  startDate: string;
  endDate?: string;
  dataCategories: Array<{
    category: "Prontuários" | "Medicamentos" | "Consultas" | "Métricas" | "Todos";
    specificItems?: string[];
  }>;
  accessHistory?: AccessLog[];
  lastAccessed?: string;
  grantedBy?: string;
  blockchainVerified?: boolean;
}

export interface EmergencyQR {
  id: string;
  createdAt: string;
  expiresAt?: string;
  accessCode: string;
  isActive: boolean;
  sharedData: Array<{
    category: "Identificação" | "Contatos" | "Alergias" | "Condições" | "Medicamentos" | "Tipo Sanguíneo";
    isShared: boolean;
  }>;
  accessLogs?: Array<{
    date: string;
    time: string;
    location?: string;
    accessedBy?: string;
    deviceInfo?: string;
  }>;
  notifyContacts: boolean;
}
