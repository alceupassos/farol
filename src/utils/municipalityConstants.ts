// Constantes genéricas adaptáveis para qualquer município brasileiro
// Sistema configurável que pode ser personalizado por município

export interface MunicipalityConfig {
  name: string;
  state: string;
  population: number;
  area: number; // km²
  density: number; // hab/km²
  coordinates: {
    center: [number, number]; // lng, lat
    lat: number;
    lng: number;
  };
  zipCodePattern: string;
  healthInfrastructure: {
    healthUnits: number;
    hospitals: number;
    doctors: number;
    nurses: number;
  };
}

// Configuração padrão/demonstrativa genérica
export const DEFAULT_MUNICIPALITY_CONFIG: MunicipalityConfig = {
  name: 'Seu Município',
  state: 'SP',
  population: 164000,
  area: 730,
  density: 225,
  coordinates: {
    center: [-45.4612, -22.9242],
    lat: -22.9242,
    lng: -45.4612
  },
  zipCodePattern: '124',
  healthInfrastructure: {
    healthUnits: 23,
    hospitals: 4,
    doctors: 342,
    nurses: 891
  }
};

// Constantes para demos e exemplos
export const DEMO_CONSTANTS = {
  MONITORING_PERIOD: '24h',
  RESPONSE_TIME: '< 2min',
  INTEGRATED_PILLARS: 5,
  PREVENTIVE_APPROACH: true,
  REAL_TIME_UPDATES: true,
  DATA_ACCURACY: '99.7%'
} as const;

// Métricas demonstrativas padrão
export const DEMO_METRICS = {
  RESPONSE_TIME_IMPROVEMENT: 75,
  PREVENTION_EFFECTIVENESS: 68,
  OPERATIONAL_COST_REDUCTION: 45,
  CITIZEN_SATISFACTION: 92,
  CASE_REDUCTION: 62,
  EFFICIENCY_INCREASE: 84,
  ALERT_ACCURACY: 95
} as const;

// Helper function para gerar CEPs genéricos
export function generateGenericCEP(pattern: string = '124'): string {
  const suffix = String(Math.floor(Math.random() * 99)).padStart(2, '0');
  const code = String(Math.floor(Math.random() * 999)).padStart(3, '0');
  return `${pattern}${suffix}-${code}`;
}

// Helper function para formatar população
export function formatPopulation(population: number): string {
  if (population >= 1000000) {
    return `${(population / 1000000).toFixed(1)}M`;
  }
  if (population >= 1000) {
    return `${(population / 1000).toFixed(0)}k`;
  }
  return population.toString();
}

// Helper function para calcular densidade populacional
export function calculateDensity(population: number, area: number): number {
  return Math.round(population / area * 100) / 100;
}