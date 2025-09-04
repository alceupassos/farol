export interface NeighborhoodData {
  id: string;
  name: string;
  coordinates: [number, number]; // [longitude, latitude]
  population: number;
  area: number; // km²
  density: number; // hab/km²
  riskLevel: 'BAIXO' | 'MODERADO' | 'ALTO' | 'CRÍTICO' | 'EMERGÊNCIA';
  activeCases: number;
  casesPerThousand: number;
  lastUpdate: string;
  demographics: {
    averageAge: number;
    incomeLevel: 'BAIXA' | 'MÉDIA' | 'ALTA';
    sanitationCoverage: number; // %
    healthcareCoverage: number; // %
  };
  healthFactors: {
    waterAccess: number; // %
    sewerAccess: number; // %
    basicHealthUnit: boolean;
    hospital: boolean;
    vulnerabilityIndex: number; // 0-10
  };
  epidemiologicalData: {
    dengue: { cases: number; trend: 'up' | 'down' | 'stable' };
    covid: { cases: number; trend: 'up' | 'down' | 'stable' };
    influenza: { cases: number; trend: 'up' | 'down' | 'stable' };
    other: { cases: number; trend: 'up' | 'down' | 'stable' };
  };
}

export const pindamonhangabaNeighborhoods: NeighborhoodData[] = [
  {
    id: 'centro',
    name: 'Centro',
    coordinates: [-45.4612, -22.9236],
    population: 8500,
    area: 2.1,
    density: 4048,
    riskLevel: 'ALTO',
    activeCases: 45,
    casesPerThousand: 5.3,
    lastUpdate: '2024-01-15',
    demographics: {
      averageAge: 42,
      incomeLevel: 'ALTA',
      sanitationCoverage: 95,
      healthcareCoverage: 88
    },
    healthFactors: {
      waterAccess: 98,
      sewerAccess: 95,
      basicHealthUnit: true,
      hospital: true,
      vulnerabilityIndex: 3.2
    },
    epidemiologicalData: {
      dengue: { cases: 25, trend: 'up' },
      covid: { cases: 12, trend: 'stable' },
      influenza: { cases: 6, trend: 'down' },
      other: { cases: 2, trend: 'stable' }
    }
  },
  {
    id: 'cidade-nova',
    name: 'Cidade Nova',
    coordinates: [-45.4701, -22.9189],
    population: 12800,
    area: 3.5,
    density: 3657,
    riskLevel: 'MODERADO',
    activeCases: 12,
    casesPerThousand: 0.9,
    lastUpdate: '2024-01-15',
    demographics: {
      averageAge: 35,
      incomeLevel: 'MÉDIA',
      sanitationCoverage: 78,
      healthcareCoverage: 72
    },
    healthFactors: {
      waterAccess: 92,
      sewerAccess: 78,
      basicHealthUnit: true,
      hospital: false,
      vulnerabilityIndex: 5.1
    },
    epidemiologicalData: {
      dengue: { cases: 8, trend: 'stable' },
      covid: { cases: 3, trend: 'down' },
      influenza: { cases: 1, trend: 'stable' },
      other: { cases: 0, trend: 'stable' }
    }
  },
  {
    id: 'jardim-regina',
    name: 'Jardim Regina',
    coordinates: [-45.4543, -22.9347],
    population: 15200,
    area: 4.2,
    density: 3619,
    riskLevel: 'CRÍTICO',
    activeCases: 78,
    casesPerThousand: 5.1,
    lastUpdate: '2024-01-15',
    demographics: {
      averageAge: 31,
      incomeLevel: 'BAIXA',
      sanitationCoverage: 65,
      healthcareCoverage: 58
    },
    healthFactors: {
      waterAccess: 85,
      sewerAccess: 65,
      basicHealthUnit: true,
      hospital: false,
      vulnerabilityIndex: 7.8
    },
    epidemiologicalData: {
      dengue: { cases: 52, trend: 'up' },
      covid: { cases: 18, trend: 'up' },
      influenza: { cases: 6, trend: 'stable' },
      other: { cases: 2, trend: 'stable' }
    }
  },
  {
    id: 'vila-sao-paulo',
    name: 'Vila São Paulo',
    coordinates: [-45.4789, -22.9298],
    population: 6400,
    area: 1.8,
    density: 3556,
    riskLevel: 'BAIXO',
    activeCases: 5,
    casesPerThousand: 0.8,
    lastUpdate: '2024-01-15',
    demographics: {
      averageAge: 38,
      incomeLevel: 'MÉDIA',
      sanitationCoverage: 85,
      healthcareCoverage: 80
    },
    healthFactors: {
      waterAccess: 94,
      sewerAccess: 85,
      basicHealthUnit: false,
      hospital: false,
      vulnerabilityIndex: 4.2
    },
    epidemiologicalData: {
      dengue: { cases: 3, trend: 'stable' },
      covid: { cases: 1, trend: 'down' },
      influenza: { cases: 1, trend: 'stable' },
      other: { cases: 0, trend: 'stable' }
    }
  },
  {
    id: 'bosque-da-princesa',
    name: 'Bosque da Princesa',
    coordinates: [-45.4445, -22.9156],
    population: 9800,
    area: 2.8,
    density: 3500,
    riskLevel: 'EMERGÊNCIA',
    activeCases: 125,
    casesPerThousand: 12.8,
    lastUpdate: '2024-01-15',
    demographics: {
      averageAge: 29,
      incomeLevel: 'BAIXA',
      sanitationCoverage: 52,
      healthcareCoverage: 45
    },
    healthFactors: {
      waterAccess: 78,
      sewerAccess: 52,
      basicHealthUnit: true,
      hospital: false,
      vulnerabilityIndex: 9.1
    },
    epidemiologicalData: {
      dengue: { cases: 89, trend: 'up' },
      covid: { cases: 24, trend: 'up' },
      influenza: { cases: 8, trend: 'up' },
      other: { cases: 4, trend: 'stable' }
    }
  },
  {
    id: 'vale-do-paraiba',
    name: 'Vale do Paraíba',
    coordinates: [-45.4567, -22.9423],
    population: 11600,
    area: 3.9,
    density: 2974,
    riskLevel: 'MODERADO',
    activeCases: 18,
    casesPerThousand: 1.6,
    lastUpdate: '2024-01-15',
    demographics: {
      averageAge: 36,
      incomeLevel: 'MÉDIA',
      sanitationCoverage: 72,
      healthcareCoverage: 68
    },
    healthFactors: {
      waterAccess: 89,
      sewerAccess: 72,
      basicHealthUnit: true,
      hospital: false,
      vulnerabilityIndex: 5.4
    },
    epidemiologicalData: {
      dengue: { cases: 12, trend: 'stable' },
      covid: { cases: 4, trend: 'down' },
      influenza: { cases: 2, trend: 'stable' },
      other: { cases: 0, trend: 'stable' }
    }
  },
  {
    id: 'bom-sucesso',
    name: 'Bom Sucesso',
    coordinates: [-45.4723, -22.9067],
    population: 7200,
    area: 2.4,
    density: 3000,
    riskLevel: 'ALTO',
    activeCases: 35,
    casesPerThousand: 4.9,
    lastUpdate: '2024-01-15',
    demographics: {
      averageAge: 33,
      incomeLevel: 'BAIXA',
      sanitationCoverage: 68,
      healthcareCoverage: 62
    },
    healthFactors: {
      waterAccess: 88,
      sewerAccess: 68,
      basicHealthUnit: false,
      hospital: false,
      vulnerabilityIndex: 6.8
    },
    epidemiologicalData: {
      dengue: { cases: 23, trend: 'up' },
      covid: { cases: 8, trend: 'stable' },
      influenza: { cases: 3, trend: 'down' },
      other: { cases: 1, trend: 'stable' }
    }
  },
  {
    id: 'vila-operaria',
    name: 'Vila Operária',
    coordinates: [-45.4634, -22.9378],
    population: 13400,
    area: 4.1,
    density: 3268,
    riskLevel: 'CRÍTICO',
    activeCases: 82,
    casesPerThousand: 6.1,
    lastUpdate: '2024-01-15',
    demographics: {
      averageAge: 32,
      incomeLevel: 'BAIXA',
      sanitationCoverage: 58,
      healthcareCoverage: 54
    },
    healthFactors: {
      waterAccess: 82,
      sewerAccess: 58,
      basicHealthUnit: true,
      hospital: false,
      vulnerabilityIndex: 8.2
    },
    epidemiologicalData: {
      dengue: { cases: 56, trend: 'up' },
      covid: { cases: 19, trend: 'up' },
      influenza: { cases: 5, trend: 'stable' },
      other: { cases: 2, trend: 'stable' }
    }
  },
  {
    id: 'residencial-campos-eliseos',
    name: 'Residencial Campos Elíseos',
    coordinates: [-45.4812, -22.9145],
    population: 5800,
    area: 1.9,
    density: 3053,
    riskLevel: 'BAIXO',
    activeCases: 7,
    casesPerThousand: 1.2,
    lastUpdate: '2024-01-15',
    demographics: {
      averageAge: 40,
      incomeLevel: 'ALTA',
      sanitationCoverage: 92,
      healthcareCoverage: 85
    },
    healthFactors: {
      waterAccess: 96,
      sewerAccess: 92,
      basicHealthUnit: false,
      hospital: false,
      vulnerabilityIndex: 3.8
    },
    epidemiologicalData: {
      dengue: { cases: 4, trend: 'stable' },
      covid: { cases: 2, trend: 'down' },
      influenza: { cases: 1, trend: 'stable' },
      other: { cases: 0, trend: 'stable' }
    }
  },
  {
    id: 'parque-industrial',
    name: 'Parque Industrial',
    coordinates: [-45.4523, -22.9089],
    population: 9200,
    area: 3.2,
    density: 2875,
    riskLevel: 'MODERADO',
    activeCases: 22,
    casesPerThousand: 2.4,
    lastUpdate: '2024-01-15',
    demographics: {
      averageAge: 37,
      incomeLevel: 'MÉDIA',
      sanitationCoverage: 75,
      healthcareCoverage: 70
    },
    healthFactors: {
      waterAccess: 91,
      sewerAccess: 75,
      basicHealthUnit: true,
      hospital: false,
      vulnerabilityIndex: 5.6
    },
    epidemiologicalData: {
      dengue: { cases: 14, trend: 'stable' },
      covid: { cases: 5, trend: 'down' },
      influenza: { cases: 2, trend: 'stable' },
      other: { cases: 1, trend: 'stable' }
    }
  }
];

export const getRiskColor = (riskLevel: string): string => {
  switch (riskLevel) {
    case 'BAIXO': return '#22c55e'; // Green
    case 'MODERADO': return '#eab308'; // Yellow  
    case 'ALTO': return '#f97316'; // Orange
    case 'CRÍTICO': return '#ef4444'; // Red
    case 'EMERGÊNCIA': return '#8b5cf6'; // Purple
    default: return '#6b7280'; // Gray
  }
};

export const getRiskIntensity = (riskLevel: string): number => {
  switch (riskLevel) {
    case 'BAIXO': return 0.3;
    case 'MODERADO': return 0.5;
    case 'ALTO': return 0.7;
    case 'CRÍTICO': return 0.85;
    case 'EMERGÊNCIA': return 1.0;
    default: return 0.1;
  }
};

export const getRiskRadius = (riskLevel: string): number => {
  switch (riskLevel) {
    case 'BAIXO': return 8;
    case 'MODERADO': return 12;
    case 'ALTO': return 16;
    case 'CRÍTICO': return 20;
    case 'EMERGÊNCIA': return 25;
    default: return 6;
  }
};