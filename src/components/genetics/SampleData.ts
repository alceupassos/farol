
// Manhattan Plot sample data
export const manhattanPlotData = [
  // Chromosome 1
  { position: 1000000, logp: 2.1, chromosome: 1 },
  { position: 2500000, logp: 1.7, chromosome: 1 },
  { position: 5000000, logp: 3.2, chromosome: 1 },
  { position: 7500000, logp: 1.2, chromosome: 1 },
  { position: 10000000, logp: 4.5, chromosome: 1, gene: "BRCA1", disease: "Câncer de Mama" },
  { position: 15000000, logp: 6.2, chromosome: 1 },
  { position: 20000000, logp: 8.1, chromosome: 1, gene: "TP53", disease: "Múltiplos Cânceres", significant: true },
  { position: 25000000, logp: 2.8, chromosome: 1 },
  { position: 30000000, logp: 1.9, chromosome: 1 },
  
  // Chromosome 2
  { position: 40000000, logp: 3.1, chromosome: 2 },
  { position: 45000000, logp: 2.3, chromosome: 2 },
  { position: 50000000, logp: 5.6, chromosome: 2, gene: "APOB", disease: "Doença Cardiovascular" },
  { position: 55000000, logp: 1.8, chromosome: 2 },
  { position: 60000000, logp: 7.5, chromosome: 2, gene: "IL1B", disease: "Doenças Inflamatórias", significant: true },
  { position: 65000000, logp: 2.9, chromosome: 2 },
  { position: 70000000, logp: 1.5, chromosome: 2 },
  
  // Chromosome 3
  { position: 80000000, logp: 2.2, chromosome: 3 },
  { position: 85000000, logp: 4.7, chromosome: 3 },
  { position: 90000000, logp: 7.8, chromosome: 3, gene: "APOE", disease: "Alzheimer", significant: true },
  { position: 95000000, logp: 3.3, chromosome: 3 },
  { position: 100000000, logp: 2.1, chromosome: 3 },
  
  // Chromosome 4
  { position: 110000000, logp: 3.5, chromosome: 4 },
  { position: 115000000, logp: 2.8, chromosome: 4 },
  { position: 120000000, logp: 8.3, chromosome: 4, gene: "TCF7L2", disease: "Diabetes Tipo 2", significant: true },
  { position: 125000000, logp: 2.5, chromosome: 4 },
  { position: 130000000, logp: 1.7, chromosome: 4 },
  
  // Chromosome 5
  { position: 140000000, logp: 2.9, chromosome: 5 },
  { position: 145000000, logp: 3.4, chromosome: 5 },
  { position: 150000000, logp: 4.6, chromosome: 5 },
  { position: 155000000, logp: 7.9, chromosome: 5, gene: "PCSK9", disease: "Hipercolesterolemia", significant: true },
  { position: 160000000, logp: 2.3, chromosome: 5 }
];

// Genetic Infographic sample data
export const alleleFrequencyData = [
  { name: "Alelo A (rs708272)", value: 65, info: "Frequência do alelo A do SNP rs708272 na população geral", color: "#4285F4" },
  { name: "Alelo B (rs708272)", value: 35, info: "Frequência do alelo B do SNP rs708272 na população geral", color: "#EA4335" }
];

export const riskScoreData = [
  { name: "População Geral", value: 1.0, info: "Risco basal para o desenvolvimento da doença", color: "#4ecdc4" },
  { name: "Com Variante 1", value: 1.3, info: "Aumento do risco em 30% na presença da variante 1", color: "#ffbf69" },
  { name: "Com Variante 2", value: 1.8, info: "Aumento do risco em 80% na presença da variante 2", color: "#ff9f1c" },
  { name: "Com Ambas Variantes", value: 2.5, info: "Aumento do risco em 150% na presença de ambas variantes", color: "#ff6b6b" }
];

export const genotypeData = [
  { 
    name: "Genótipo", 
    value: 1, 
    info: "O conjunto completo de genes em um organismo", 
    color: "text-blue-500" 
  },
  { 
    name: "Fenótipo", 
    value: 1, 
    info: "Características observáveis resultantes da expressão do genótipo", 
    color: "text-green-500" 
  }
];

// Conceptual Map sample data
export const conceptualMapNodes = [
  { id: "brca1", label: "BRCA1", category: "gene", description: "Gene supressor de tumores" },
  { id: "brca2", label: "BRCA2", category: "gene", description: "Parceiro do BRCA1" },
  { id: "tp53", label: "TP53", category: "gene", description: "\"Guardião do genoma\"" },
  { id: "cancer_mama", label: "Câncer de Mama", category: "disease", description: "Tipo de câncer comum" },
  { id: "cancer_ovario", label: "Câncer de Ovário", category: "disease", description: "Tipo de câncer ginecológico" },
  { id: "dna_repair", label: "Reparo de DNA", category: "pathway", description: "Processo celular essencial" },
  { id: "cell_cycle", label: "Ciclo Celular", category: "pathway", description: "Controle de divisão celular" },
  { id: "apoptosis", label: "Apoptose", category: "pathway", description: "Morte celular programada" },
  { id: "tumor_suppression", label: "Supressão Tumoral", category: "protein", description: "Função de proteínas" }
];

export const conceptualMapEdges = [
  { source: "brca1", target: "dna_repair", label: "regula", type: "solid" as const },
  { source: "brca2", target: "dna_repair", label: "participa", type: "solid" as const },
  { source: "brca1", target: "cancer_mama", label: "mutação aumenta risco", type: "dashed" as const },
  { source: "brca1", target: "cancer_ovario", label: "mutação aumenta risco", type: "dashed" as const },
  { source: "tp53", target: "apoptosis", label: "induz", type: "solid" as const },
  { source: "tp53", target: "cell_cycle", label: "regula", type: "solid" as const },
  { source: "dna_repair", target: "tumor_suppression", label: "contribui", type: "solid" as const },
  { source: "apoptosis", target: "tumor_suppression", label: "contribui", type: "solid" as const },
  { source: "tp53", target: "cancer_mama", label: "mutação relacionada", type: "dashed" as const },
  { source: "brca2", target: "brca1", label: "interage", type: "solid" as const }
];
