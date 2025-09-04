// Constantes unificadas para dados de Pindamonhangaba
// Use sempre essas constantes para garantir consistência

export const PINDAMONHANGABA_COORDINATES = {
  center: [-45.4612, -22.9242],
  lat: -22.9242,
  lng: -45.4612
} as const;

export const PINDAMONHANGABA_INFO = {
  name: 'Pindamonhangaba',
  state: 'SP',
  population: 164138,
  area: 729.9, // km²
  density: 224.9, // hab/km²
  zipCodePattern: '124',
  healthUnits: 23,
  hospitals: 4,
  doctors: 342,
  nurses: 891
} as const;

// Bairros reais de Pindamonhangaba com coordenadas corretas
export const PINDAMONHANGABA_NEIGHBORHOODS = [
  { name: 'Centro', lat: -22.9242, lng: -45.4612, population: 8500 },
  { name: 'Cidade Nova', lat: -22.9180, lng: -45.4580, population: 12000 },
  { name: 'Vila Santa Clara', lat: -22.9300, lng: -45.4700, population: 9800 },
  { name: 'Jardim Regina', lat: -22.9400, lng: -45.4550, population: 7200 },
  { name: 'Vila Operária', lat: -22.9150, lng: -45.4650, population: 6800 },
  { name: 'Mombaça', lat: -22.9500, lng: -45.4400, population: 15000 },
  { name: 'Bosque da Saúde', lat: -22.9350, lng: -45.4580, population: 5600 },
  { name: 'Alto do Cardoso', lat: -22.9100, lng: -45.4750, population: 8900 },
  { name: 'Araretama', lat: -22.9600, lng: -45.4200, population: 11200 },
  { name: 'Crispim', lat: -22.9050, lng: -45.4500, population: 4800 }
] as const;

// Helper function para gerar coordenadas próximas aos bairros
export function getNeighborhoodCoordinates(neighborhoodName: string): [number, number] {
  const neighborhood = PINDAMONHANGABA_NEIGHBORHOODS.find(n => n.name === neighborhoodName);
  if (neighborhood) {
    return [neighborhood.lng, neighborhood.lat];
  }
  // Fallback para centro da cidade
  return [PINDAMONHANGABA_COORDINATES.lng, PINDAMONHANGABA_COORDINATES.lat];
}

// Helper function para gerar CEPs de Pindamonhangaba
export function generatePindamonhangabaCEP(): string {
  const prefix = '124';
  const suffix = String(Math.floor(Math.random() * 99)).padStart(2, '0');
  const code = String(Math.floor(Math.random() * 999)).padStart(3, '0');
  return `${prefix}${suffix}-${code}`;
}