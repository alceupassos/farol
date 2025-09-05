export interface RiskFactor {
  id: string;
  name: string;
  category: 'lab' | 'demographic' | 'medical';
  weight: number; // 0-100
  normalRange?: string;
}

export interface PatientRiskData {
  // Exames Laboratoriais
  glucose?: number; // mg/dL
  hemoglobin?: number; // g/dL
  ldlCholesterol?: number; // mg/dL
  systolicBP?: number; // mmHg
  diastolicBP?: number; // mmHg
  
  // Dados Demográficos
  age?: number;
  gender?: 'M' | 'F';
  
  // Histórico Médico
  hasDiabetes?: boolean;
  hasHypertension?: boolean;
  hasDyslipidemia?: boolean;
  hasHeartDisease?: boolean;
  hasKidneyDisease?: boolean;
}

export interface RiskScore {
  total: number;
  level: 'BAIXO' | 'MODERADO' | 'ALTO' | 'CRÍTICO';
  color: string;
  description: string;
  factors: {
    lab: number;
    demographic: number;
    medical: number;
  };
  recommendations: string[];
  criticalFactors: string[];
}

export const riskFactors: RiskFactor[] = [
  // Exames Laboratoriais (40% do peso total)
  { id: 'glucose', name: 'Glicemia em Jejum', category: 'lab', weight: 25, normalRange: '70-99 mg/dL' },
  { id: 'hemoglobin', name: 'Hemoglobina', category: 'lab', weight: 15, normalRange: '12-16 g/dL' },
  { id: 'ldl', name: 'Colesterol LDL', category: 'lab', weight: 20, normalRange: '<100 mg/dL' },
  { id: 'blood_pressure', name: 'Pressão Arterial', category: 'lab', weight: 30, normalRange: '<120/80 mmHg' },
  
  // Dados Demográficos (25% do peso total)
  { id: 'age', name: 'Idade', category: 'demographic', weight: 20, normalRange: '<65 anos' },
  { id: 'gender', name: 'Sexo Masculino', category: 'demographic', weight: 10 },
  
  // Histórico Médico (35% do peso total)
  { id: 'diabetes', name: 'Diabetes Mellitus', category: 'medical', weight: 35 },
  { id: 'hypertension', name: 'Hipertensão Arterial', category: 'medical', weight: 30 },
  { id: 'dyslipidemia', name: 'Dislipidemia', category: 'medical', weight: 25 },
  { id: 'heart_disease', name: 'Doença Cardiovascular', category: 'medical', weight: 40 },
  { id: 'kidney_disease', name: 'Doença Renal', category: 'medical', weight: 25 },
];

export const calculateRiskScore = (data: PatientRiskData): RiskScore => {
  let labScore = 0;
  let demographicScore = 0;
  let medicalScore = 0;
  const criticalFactors: string[] = [];
  
  // Calcular score dos exames laboratoriais (40% do peso)
  if (data.glucose && data.glucose > 126) {
    labScore += 25;
    criticalFactors.push('Glicemia elevada');
  }
  
  if (data.hemoglobin && data.hemoglobin < 12) {
    labScore += 15;
    criticalFactors.push('Anemia');
  }
  
  if (data.ldlCholesterol && data.ldlCholesterol > 130) {
    labScore += 20;
    criticalFactors.push('Colesterol LDL elevado');
  }
  
  if (data.systolicBP && data.diastolicBP) {
    if (data.systolicBP > 140 || data.diastolicBP > 90) {
      labScore += 30;
      criticalFactors.push('Pressão arterial elevada');
    }
  }
  
  // Calcular score demográfico (25% do peso)
  if (data.age && data.age > 65) {
    demographicScore += 20;
    criticalFactors.push('Idade avançada');
  }
  
  if (data.gender === 'M') {
    demographicScore += 10;
  }
  
  // Calcular score do histórico médico (35% do peso)
  let medicalConditions = 0;
  
  if (data.hasDiabetes) {
    medicalScore += 35;
    medicalConditions++;
    criticalFactors.push('Diabetes');
  }
  
  if (data.hasHypertension) {
    medicalScore += 30;
    medicalConditions++;
    criticalFactors.push('Hipertensão');
  }
  
  if (data.hasDyslipidemia) {
    medicalScore += 25;
    medicalConditions++;
    criticalFactors.push('Dislipidemia');
  }
  
  if (data.hasHeartDisease) {
    medicalScore += 40;
    medicalConditions++;
    criticalFactors.push('Doença cardiovascular');
  }
  
  if (data.hasKidneyDisease) {
    medicalScore += 25;
    medicalConditions++;
    criticalFactors.push('Doença renal');
  }
  
  // Penalidade por múltiplas condições
  if (medicalConditions > 2) {
    medicalScore += 15;
  }
  
  const totalScore = labScore + demographicScore + medicalScore;
  
  // Determinar nível de risco
  let level: 'BAIXO' | 'MODERADO' | 'ALTO' | 'CRÍTICO';
  let color: string;
  let description: string;
  
  if (totalScore <= 30) {
    level = 'BAIXO';
    color = 'text-green-600';
    description = 'Risco cardiovascular baixo';
  } else if (totalScore <= 60) {
    level = 'MODERADO';
    color = 'text-yellow-600';
    description = 'Requer acompanhamento médico';
  } else if (totalScore <= 100) {
    level = 'ALTO';
    color = 'text-orange-600';
    description = 'Necessita intervenção urgente';
  } else {
    level = 'CRÍTICO';
    color = 'text-red-600';
    description = 'Risco cardiovascular muito alto';
  }
  
  // Gerar recomendações
  const recommendations = generateRecommendations(level, criticalFactors);
  
  return {
    total: totalScore,
    level,
    color,
    description,
    factors: {
      lab: labScore,
      demographic: demographicScore,
      medical: medicalScore
    },
    recommendations,
    criticalFactors
  };
};

const generateRecommendations = (level: string, factors: string[]): string[] => {
  const recommendations: string[] = [];
  
  switch (level) {
    case 'BAIXO':
      recommendations.push('Manter estilo de vida saudável');
      recommendations.push('Exames de rotina anuais');
      recommendations.push('Atividade física regular');
      break;
      
    case 'MODERADO':
      recommendations.push('Consulta médica em 6 meses');
      recommendations.push('Monitoramento dos fatores de risco');
      recommendations.push('Mudanças no estilo de vida');
      break;
      
    case 'ALTO':
      recommendations.push('Consulta médica urgente');
      recommendations.push('Início de tratamento específico');
      recommendations.push('Monitoramento intensivo');
      break;
      
    case 'CRÍTICO':
      recommendations.push('Avaliação médica imediata');
      recommendations.push('Internação se necessário');
      recommendations.push('Tratamento intensivo multidisciplinar');
      break;
  }
  
  // Recomendações específicas por fator
  if (factors.includes('Diabetes')) {
    recommendations.push('Controle rigoroso da glicemia');
  }
  if (factors.includes('Hipertensão')) {
    recommendations.push('Monitoramento da pressão arterial');
  }
  if (factors.includes('Colesterol LDL elevado')) {
    recommendations.push('Dieta com baixo teor de gordura');
  }
  
  return recommendations;
};

// Dados mock para demonstração
export const mockPatientData: { [key: string]: PatientRiskData } = {
  'joao-silva': {
    glucose: 145,
    hemoglobin: 13.5,
    ldlCholesterol: 145,
    systolicBP: 150,
    diastolicBP: 95,
    age: 58,
    gender: 'M',
    hasDiabetes: true,
    hasHypertension: true,
    hasDyslipidemia: false,
    hasHeartDisease: false,
    hasKidneyDisease: false
  },
  'maria-santos': {
    glucose: 98,
    hemoglobin: 12.8,
    ldlCholesterol: 125,
    systolicBP: 135,
    diastolicBP: 85,
    age: 45,
    gender: 'F',
    hasDiabetes: false,
    hasHypertension: true,
    hasDyslipidemia: false,
    hasHeartDisease: false,
    hasKidneyDisease: false
  },
  'ana-costa': {
    glucose: 180,
    hemoglobin: 11.2,
    ldlCholesterol: 160,
    systolicBP: 165,
    diastolicBP: 100,
    age: 72,
    gender: 'F',
    hasDiabetes: true,
    hasHypertension: true,
    hasDyslipidemia: true,
    hasHeartDisease: false,
    hasKidneyDisease: true
  }
};