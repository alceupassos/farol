// Dados demonstrativos genéricos para bairros brasileiros
// Use sempre esses dados para demonstrações na homepage

export interface GenericNeighborhoodData {
  name: string;
  population: number;
  riskLevel: 'baixo' | 'medio' | 'alto';
  activeCases: number;
  coordinates: [number, number]; // lng, lat
  demographics: {
    averageAge: number;
    elderlyPercentage: number;
    childrenPercentage: number;
    economicLevel: 'baixo' | 'medio' | 'alto';
  };
  healthFactors: {
    chronicDiseases: number;
    vaccinationRate: number;
    hospitalizations: number;
    preventiveConsultations: number;
  };
}

// Bairros genéricos para demonstração (coordenadas fictícias)
export const GENERIC_DEMO_NEIGHBORHOODS: GenericNeighborhoodData[] = [
  {
    name: 'Centro',
    population: 8500,
    riskLevel: 'baixo',
    activeCases: 12,
    coordinates: [-45.4612, -22.9242],
    demographics: {
      averageAge: 42,
      elderlyPercentage: 18,
      childrenPercentage: 22,
      economicLevel: 'alto'
    },
    healthFactors: {
      chronicDiseases: 145,
      vaccinationRate: 89,
      hospitalizations: 8,
      preventiveConsultations: 340
    }
  },
  {
    name: 'Zona Norte',
    population: 12000,
    riskLevel: 'medio',
    activeCases: 28,
    coordinates: [-45.4580, -22.9180],
    demographics: {
      averageAge: 35,
      elderlyPercentage: 12,
      childrenPercentage: 28,
      economicLevel: 'medio'
    },
    healthFactors: {
      chronicDiseases: 230,
      vaccinationRate: 76,
      hospitalizations: 15,
      preventiveConsultations: 420
    }
  },
  {
    name: 'Vila Industrial',
    population: 9800,
    riskLevel: 'alto',
    activeCases: 45,
    coordinates: [-45.4700, -22.9300],
    demographics: {
      averageAge: 38,
      elderlyPercentage: 15,
      childrenPercentage: 25,
      economicLevel: 'baixo'
    },
    healthFactors: {
      chronicDiseases: 312,
      vaccinationRate: 68,
      hospitalizations: 22,
      preventiveConsultations: 280
    }
  },
  {
    name: 'Jardim Popular',
    population: 7200,
    riskLevel: 'baixo',
    activeCases: 8,
    coordinates: [-45.4550, -22.9400],
    demographics: {
      averageAge: 40,
      elderlyPercentage: 16,
      childrenPercentage: 24,
      economicLevel: 'medio'
    },
    healthFactors: {
      chronicDiseases: 165,
      vaccinationRate: 84,
      hospitalizations: 6,
      preventiveConsultations: 290
    }
  },
  {
    name: 'Zona Rural',
    population: 6800,
    riskLevel: 'medio',
    activeCases: 18,
    coordinates: [-45.4650, -22.9150],
    demographics: {
      averageAge: 45,
      elderlyPercentage: 22,
      childrenPercentage: 20,
      economicLevel: 'baixo'
    },
    healthFactors: {
      chronicDiseases: 198,
      vaccinationRate: 72,
      hospitalizations: 11,
      preventiveConsultations: 180
    }
  },
  {
    name: 'Vila Operária',
    population: 15000,
    riskLevel: 'alto',
    activeCases: 52,
    coordinates: [-45.4400, -22.9500],
    demographics: {
      averageAge: 33,
      elderlyPercentage: 10,
      childrenPercentage: 32,
      economicLevel: 'baixo'
    },
    healthFactors: {
      chronicDiseases: 420,
      vaccinationRate: 65,
      hospitalizations: 28,
      preventiveConsultations: 380
    }
  },
  {
    name: 'Bairro Novo',
    population: 5600,
    riskLevel: 'baixo',
    activeCases: 6,
    coordinates: [-45.4580, -22.9350],
    demographics: {
      averageAge: 36,
      elderlyPercentage: 8,
      childrenPercentage: 30,
      economicLevel: 'alto'
    },
    healthFactors: {
      chronicDiseases: 98,
      vaccinationRate: 92,
      hospitalizations: 3,
      preventiveConsultations: 220
    }
  },
  {
    name: 'Alto da Serra',
    population: 8900,
    riskLevel: 'medio',
    activeCases: 24,
    coordinates: [-45.4750, -22.9100],
    demographics: {
      averageAge: 41,
      elderlyPercentage: 17,
      childrenPercentage: 23,
      economicLevel: 'medio'
    },
    healthFactors: {
      chronicDiseases: 203,
      vaccinationRate: 78,
      hospitalizations: 13,
      preventiveConsultations: 310
    }
  },
  {
    name: 'Vila Central',
    population: 11200,
    riskLevel: 'baixo',
    activeCases: 14,
    coordinates: [-45.4200, -22.9600],
    demographics: {
      averageAge: 39,
      elderlyPercentage: 14,
      childrenPercentage: 26,
      economicLevel: 'alto'
    },
    healthFactors: {
      chronicDiseases: 178,
      vaccinationRate: 87,
      hospitalizations: 9,
      preventiveConsultations: 380
    }
  },
  {
    name: 'Parque Municipal',
    population: 4800,
    riskLevel: 'baixo',
    activeCases: 4,
    coordinates: [-45.4500, -22.9050],
    demographics: {
      averageAge: 44,
      elderlyPercentage: 20,
      childrenPercentage: 18,
      economicLevel: 'alto'
    },
    healthFactors: {
      chronicDiseases: 89,
      vaccinationRate: 94,
      hospitalizations: 2,
      preventiveConsultations: 180
    }
  }
];

// Helper functions para os dados demonstrativos
export function getRiskColor(riskLevel: string): string {
  switch (riskLevel) {
    case 'baixo': return 'hsl(var(--success))';
    case 'medio': return 'hsl(var(--warning))';
    case 'alto': return 'hsl(var(--destructive))';
    default: return 'hsl(var(--muted))';
  }
}

export function getTotalDemoPopulation(): number {
  return GENERIC_DEMO_NEIGHBORHOODS.reduce((total, neighborhood) => total + neighborhood.population, 0);
}

export function getTotalDemoActiveCases(): number {
  return GENERIC_DEMO_NEIGHBORHOODS.reduce((total, neighborhood) => total + neighborhood.activeCases, 0);
}

export function getAverageVaccinationRate(): number {
  const total = GENERIC_DEMO_NEIGHBORHOODS.reduce((sum, neighborhood) => sum + neighborhood.healthFactors.vaccinationRate, 0);
  return Math.round(total / GENERIC_DEMO_NEIGHBORHOODS.length);
}