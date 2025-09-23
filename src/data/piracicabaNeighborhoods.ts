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

export const piracicabaNeighborhoods: NeighborhoodData[] = [
  {
    id: 'centro',
    name: 'Centro',
    coordinates: [-47.6487, -22.7254],
    population: 23500,
    area: 2.4,
    density: 9791,
    riskLevel: 'ALTO',
    activeCases: 62,
    casesPerThousand: 2.6,
    lastUpdate: '2024-09-15',
    demographics: {
      averageAge: 44,
      incomeLevel: 'ALTA',
      sanitationCoverage: 99,
      healthcareCoverage: 93
    },
    healthFactors: {
      waterAccess: 99,
      sewerAccess: 97,
      basicHealthUnit: true,
      hospital: true,
      vulnerabilityIndex: 3.4
    },
    epidemiologicalData: {
      dengue: { cases: 28, trend: 'up' },
      covid: { cases: 18, trend: 'stable' },
      influenza: { cases: 10, trend: 'down' },
      other: { cases: 6, trend: 'stable' }
    }
  },
  {
    id: 'paulista',
    name: 'Paulista',
    coordinates: [-47.6519, -22.7142],
    population: 38200,
    area: 5.1,
    density: 7490,
    riskLevel: 'MODERADO',
    activeCases: 48,
    casesPerThousand: 1.4,
    lastUpdate: '2024-09-15',
    demographics: {
      averageAge: 38,
      incomeLevel: 'MÉDIA',
      sanitationCoverage: 94,
      healthcareCoverage: 86
    },
    healthFactors: {
      waterAccess: 97,
      sewerAccess: 94,
      basicHealthUnit: true,
      hospital: false,
      vulnerabilityIndex: 4.7
    },
    epidemiologicalData: {
      dengue: { cases: 19, trend: 'stable' },
      covid: { cases: 11, trend: 'down' },
      influenza: { cases: 7, trend: 'stable' },
      other: { cases: 3, trend: 'stable' }
    }
  },
  {
    id: 'piracicamirim',
    name: 'Piracicamirim',
    coordinates: [-47.6209, -22.7053],
    population: 45600,
    area: 6.3,
    density: 7246,
    riskLevel: 'CRÍTICO',
    activeCases: 118,
    casesPerThousand: 2.6,
    lastUpdate: '2024-09-15',
    demographics: {
      averageAge: 33,
      incomeLevel: 'MÉDIA',
      sanitationCoverage: 88,
      healthcareCoverage: 81
    },
    healthFactors: {
      waterAccess: 94,
      sewerAccess: 88,
      basicHealthUnit: true,
      hospital: false,
      vulnerabilityIndex: 6.9
    },
    epidemiologicalData: {
      dengue: { cases: 72, trend: 'up' },
      covid: { cases: 26, trend: 'up' },
      influenza: { cases: 14, trend: 'stable' },
      other: { cases: 6, trend: 'stable' }
    }
  },
  {
    id: 'vila-rezende',
    name: 'Vila Rezende',
    coordinates: [-47.6548, -22.7088],
    population: 41600,
    area: 5.7,
    density: 7298,
    riskLevel: 'ALTO',
    activeCases: 95,
    casesPerThousand: 2.3,
    lastUpdate: '2024-09-15',
    demographics: {
      averageAge: 36,
      incomeLevel: 'MÉDIA',
      sanitationCoverage: 93,
      healthcareCoverage: 85
    },
    healthFactors: {
      waterAccess: 96,
      sewerAccess: 93,
      basicHealthUnit: true,
      hospital: false,
      vulnerabilityIndex: 6.1
    },
    epidemiologicalData: {
      dengue: { cases: 44, trend: 'up' },
      covid: { cases: 26, trend: 'stable' },
      influenza: { cases: 15, trend: 'stable' },
      other: { cases: 10, trend: 'stable' }
    }
  },
  {
    id: 'santa-teresinha',
    name: 'Santa Teresinha',
    coordinates: [-47.6324, -22.7125],
    population: 28800,
    area: 4.1,
    density: 7024,
    riskLevel: 'MODERADO',
    activeCases: 40,
    casesPerThousand: 1.4,
    lastUpdate: '2024-09-15',
    demographics: {
      averageAge: 37,
      incomeLevel: 'MÉDIA',
      sanitationCoverage: 91,
      healthcareCoverage: 83
    },
    healthFactors: {
      waterAccess: 95,
      sewerAccess: 91,
      basicHealthUnit: true,
      hospital: false,
      vulnerabilityIndex: 4.8
    },
    epidemiologicalData: {
      dengue: { cases: 16, trend: 'stable' },
      covid: { cases: 12, trend: 'down' },
      influenza: { cases: 8, trend: 'stable' },
      other: { cases: 4, trend: 'stable' }
    }
  },
  {
    id: 'algodoal',
    name: 'Algodoal',
    coordinates: [-47.6405, -22.7321],
    population: 21400,
    area: 3.2,
    density: 6687,
    riskLevel: 'CRÍTICO',
    activeCases: 88,
    casesPerThousand: 4.1,
    lastUpdate: '2024-09-15',
    demographics: {
      averageAge: 32,
      incomeLevel: 'BAIXA',
      sanitationCoverage: 78,
      healthcareCoverage: 70
    },
    healthFactors: {
      waterAccess: 89,
      sewerAccess: 78,
      basicHealthUnit: true,
      hospital: false,
      vulnerabilityIndex: 7.4
    },
    epidemiologicalData: {
      dengue: { cases: 54, trend: 'up' },
      covid: { cases: 22, trend: 'up' },
      influenza: { cases: 8, trend: 'stable' },
      other: { cases: 4, trend: 'stable' }
    }
  },
  {
    id: 'nova-america',
    name: 'Nova América',
    coordinates: [-47.6480, -22.7398],
    population: 17600,
    area: 2.9,
    density: 6068,
    riskLevel: 'MODERADO',
    activeCases: 33,
    casesPerThousand: 1.9,
    lastUpdate: '2024-09-15',
    demographics: {
      averageAge: 35,
      incomeLevel: 'MÉDIA',
      sanitationCoverage: 85,
      healthcareCoverage: 78
    },
    healthFactors: {
      waterAccess: 91,
      sewerAccess: 85,
      basicHealthUnit: true,
      hospital: false,
      vulnerabilityIndex: 5.6
    },
    epidemiologicalData: {
      dengue: { cases: 14, trend: 'stable' },
      covid: { cases: 9, trend: 'down' },
      influenza: { cases: 6, trend: 'stable' },
      other: { cases: 4, trend: 'stable' }
    }
  },
  {
    id: 'vila-fatima',
    name: 'Vila Fátima',
    coordinates: [-47.6622, -22.7441],
    population: 19800,
    area: 3.4,
    density: 5823,
    riskLevel: 'ALTO',
    activeCases: 58,
    casesPerThousand: 2.9,
    lastUpdate: '2024-09-15',
    demographics: {
      averageAge: 34,
      incomeLevel: 'BAIXA',
      sanitationCoverage: 80,
      healthcareCoverage: 72
    },
    healthFactors: {
      waterAccess: 88,
      sewerAccess: 80,
      basicHealthUnit: true,
      hospital: false,
      vulnerabilityIndex: 6.7
    },
    epidemiologicalData: {
      dengue: { cases: 32, trend: 'up' },
      covid: { cases: 16, trend: 'stable' },
      influenza: { cases: 7, trend: 'stable' },
      other: { cases: 3, trend: 'stable' }
    }
  },
  {
    id: 'monte-libano',
    name: 'Monte Líbano',
    coordinates: [-47.6671, -22.7198],
    population: 16200,
    area: 2.6,
    density: 6231,
    riskLevel: 'EMERGÊNCIA',
    activeCases: 132,
    casesPerThousand: 8.1,
    lastUpdate: '2024-09-15',
    demographics: {
      averageAge: 31,
      incomeLevel: 'BAIXA',
      sanitationCoverage: 72,
      healthcareCoverage: 65
    },
    healthFactors: {
      waterAccess: 86,
      sewerAccess: 72,
      basicHealthUnit: true,
      hospital: false,
      vulnerabilityIndex: 8.7
    },
    epidemiologicalData: {
      dengue: { cases: 92, trend: 'up' },
      covid: { cases: 28, trend: 'up' },
      influenza: { cases: 9, trend: 'stable' },
      other: { cases: 3, trend: 'stable' }
    }
  },
  {
    id: 'jardim-sao-paulo',
    name: 'Jardim São Paulo',
    coordinates: [-47.6164, -22.7285],
    population: 20500,
    area: 3.6,
    density: 5694,
    riskLevel: 'BAIXO',
    activeCases: 18,
    casesPerThousand: 0.9,
    lastUpdate: '2024-09-15',
    demographics: {
      averageAge: 39,
      incomeLevel: 'MÉDIA',
      sanitationCoverage: 93,
      healthcareCoverage: 87
    },
    healthFactors: {
      waterAccess: 95,
      sewerAccess: 93,
      basicHealthUnit: true,
      hospital: false,
      vulnerabilityIndex: 4.1
    },
    epidemiologicalData: {
      dengue: { cases: 8, trend: 'stable' },
      covid: { cases: 6, trend: 'down' },
      influenza: { cases: 4, trend: 'stable' },
      other: { cases: 0, trend: 'stable' }
    }
  }
];

export const getRiskColor = (riskLevel: string): string => {
  switch (riskLevel) {
    case 'BAIXO':
      return '#22c55e';
    case 'MODERADO':
      return '#eab308';
    case 'ALTO':
      return '#f97316';
    case 'CRÍTICO':
      return '#ef4444';
    case 'EMERGÊNCIA':
      return '#8b5cf6';
    default:
      return '#6b7280';
  }
};

export const getRiskIntensity = (riskLevel: string): number => {
  switch (riskLevel) {
    case 'BAIXO':
      return 0.3;
    case 'MODERADO':
      return 0.5;
    case 'ALTO':
      return 0.7;
    case 'CRÍTICO':
      return 0.85;
    case 'EMERGÊNCIA':
      return 1.0;
    default:
      return 0.1;
  }
};

export const getRiskRadius = (riskLevel: string): number => {
  switch (riskLevel) {
    case 'BAIXO':
      return 8;
    case 'MODERADO':
      return 12;
    case 'ALTO':
      return 16;
    case 'CRÍTICO':
      return 20;
    case 'EMERGÊNCIA':
      return 25;
    default:
      return 6;
  }
};

// Backward compatibility aliases
export const pindamonhangabaNeighborhoods = piracicabaNeighborhoods;
