import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Heart, 
  Brain, 
  Droplets, 
  Wind, 
  Microscope,
  TrendingUp, 
  AlertTriangle,
  Info,
  BarChart3,
  Target,
  Activity
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, Area, AreaChart } from 'recharts';

export interface SpecialtyRisk {
  specialty: string;
  riskLevel: 'CRÍTICO' | 'ALTO' | 'MODERADO' | 'BAIXO';
  score: number;
  methodology: string;
  justification: string;
  recommendations: string[];
  ylls: number; // Years of Life Lost
  dalys: number; // Disability-Adjusted Life Years
  icon: React.ReactNode;
  patientRisk: number; // Risco específico do paciente (0-100)
}

const specialtyRisks: SpecialtyRisk[] = [
  {
    specialty: "Cardiologia",
    riskLevel: "CRÍTICO",
    score: 95,
    methodology: "Years of Life Lost (YLL)",
    justification: "Principal causa de morte mundial (OMS). Conceito de carga de doença de Murray & Lopez no Global Burden of Disease demonstra o impacto cardiovascular.",
    recommendations: [
      "Monitoramento cardiovascular regular",
      "Controle rigoroso da pressão arterial",
      "Dieta cardioprotetora",
      "Exercícios aeróbicos supervisionados"
    ],
    ylls: 15.2,
    dalys: 68.5,
    icon: <Heart className="h-5 w-5" />,
    patientRisk: 78
  },
  {
    specialty: "Oncologia",
    riskLevel: "ALTO",
    score: 88,
    methodology: "Disability-Adjusted Life Years (DALY)",
    justification: "Segunda principal causa de morte global. Hanahan & Weinberg (2011) descrevem as características do câncer que explicam sua gravidade sistêmica.",
    recommendations: [
      "Rastreamento oncológico periódico",
      "Evitar fatores de risco conhecidos",
      "Dieta antioxidante",
      "Check-ups preventivos regulares"
    ],
    ylls: 12.8,
    dalys: 58.2,
    icon: <Microscope className="h-5 w-5" />,
    patientRisk: 35
  },
  {
    specialty: "Nefrologia",
    riskLevel: "ALTO",
    score: 82,
    methodology: "Análise de comorbidades",
    justification: "Doença renal crônica afeta múltiplos sistemas. Levey et al. estabeleceram que a disfunção renal acelera complicações cardiovasculares.",
    recommendations: [
      "Controle da função renal",
      "Hidratação adequada",
      "Controle da pressão arterial",
      "Redução do sódio na dieta"
    ],
    ylls: 9.5,
    dalys: 42.1,
    icon: <Droplets className="h-5 w-5" />,
    patientRisk: 45
  },
  {
    specialty: "Pneumologia",
    riskLevel: "MODERADO",
    score: 75,
    methodology: "Índice de Severidade Hospitalar",
    justification: "DPOC, pneumonias e outras doenças respiratórias têm alta morbimortalidade. Vestbo et al. (GOLD Guidelines) demonstram o impacto sistêmico.",
    recommendations: [
      "Evitar exposição a poluentes",
      "Vacinação contra influenza",
      "Exercícios respiratórios",
      "Controle de alergias"
    ],
    ylls: 7.2,
    dalys: 34.8,
    icon: <Wind className="h-5 w-5" />,
    patientRisk: 28
  },
  {
    specialty: "Neurologia",
    riskLevel: "MODERADO",
    score: 70,
    methodology: "Modified Rankin Scale",
    justification: "AVC é terceira causa de morte. Sacco et al. mostram que doenças cerebrovasculares têm alto impacto funcional.",
    recommendations: [
      "Controle da pressão arterial",
      "Exercícios cognitivos",
      "Dieta neuroprotetora",
      "Controle do colesterol"
    ],
    ylls: 6.8,
    dalys: 31.5,
    icon: <Brain className="h-5 w-5" />,
    patientRisk: 52
  }
];

// Dados para o gráfico radar do paciente
const patientRadarData = specialtyRisks.map(specialty => ({
  specialty: specialty.specialty.replace('logia', ''),
  risco: specialty.patientRisk,
  media: 40 // Média populacional
}));

// Dados para gráfico de barras de gravidade geral
const generalSeverityData = specialtyRisks.map(specialty => ({
  specialty: specialty.specialty.replace('logia', ''),
  score: specialty.score,
  ylls: specialty.ylls,
  dalys: specialty.dalys
}));

const getRiskColor = (level: string) => {
  switch (level) {
    case 'CRÍTICO': return 'bg-red-100 text-red-800 border-red-200';
    case 'ALTO': return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'MODERADO': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'BAIXO': return 'bg-green-100 text-green-800 border-green-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getPatientRiskColor = (risk: number) => {
  if (risk >= 70) return 'bg-red-500';
  if (risk >= 50) return 'bg-orange-500';
  if (risk >= 30) return 'bg-yellow-500';
  return 'bg-green-500';
};

interface SpecialtyRiskRankingProps {
  className?: string;
}

const SpecialtyRiskRanking: React.FC<SpecialtyRiskRankingProps> = ({ className }) => {
  return (
    <Card className={`glass-card ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          Ranking de Risco por Especialidade
        </CardTitle>
        <CardDescription>
          Análise baseada em metodologias científicas (YLL, DALY, Modified Rankin Scale)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="patient">Meu Perfil</TabsTrigger>
            <TabsTrigger value="severity">Gravidade</TabsTrigger>
            <TabsTrigger value="recommendations">Recomendações</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4">
              {specialtyRisks.map((specialty, index) => (
                <Card key={specialty.specialty} className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        {specialty.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold">{specialty.specialty}</h4>
                        <p className="text-sm text-muted-foreground">
                          {specialty.methodology}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getRiskColor(specialty.riskLevel)}>
                        {specialty.riskLevel}
                      </Badge>
                      <span className="text-lg font-bold">{specialty.score}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Seu Risco:</span>
                      <span className="font-semibold">{specialty.patientRisk}%</span>
                    </div>
                    <Progress 
                      value={specialty.patientRisk} 
                      className="h-2"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>YLL: {specialty.ylls}</span>
                      <span>DALY: {specialty.dalys}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="patient" className="space-y-4">
            <Card className="p-4">
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                <Target className="h-4 w-4" />
                Perfil de Risco Personalizado
              </h4>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={patientRadarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="specialty" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar 
                      name="Seu Risco" 
                      dataKey="risco" 
                      stroke="hsl(var(--primary))" 
                      fill="hsl(var(--primary))" 
                      fillOpacity={0.3} 
                    />
                    <Radar 
                      name="Média Populacional" 
                      dataKey="media" 
                      stroke="hsl(var(--muted-foreground))" 
                      fill="hsl(var(--muted-foreground))" 
                      fillOpacity={0.1} 
                    />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <div className="grid gap-3">
              <h5 className="font-semibold">Riscos Prioritários:</h5>
              {specialtyRisks
                .filter(s => s.patientRisk >= 50)
                .map(specialty => (
                  <Card key={specialty.specialty} className="p-3 border-l-4" style={{borderLeftColor: specialty.patientRisk >= 70 ? '#ef4444' : '#f97316'}}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {specialty.icon}
                        <span className="font-medium">{specialty.specialty}</span>
                      </div>
                      <Badge variant="outline" className={getPatientRiskColor(specialty.patientRisk)}>
                        {specialty.patientRisk}%
                      </Badge>
                    </div>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="severity" className="space-y-4">
            <Card className="p-4">
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Ranking Geral de Gravidade
              </h4>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={generalSeverityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="specialty" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="score" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-4">
                <h5 className="font-semibold mb-2">Years of Life Lost (YLL)</h5>
                <div className="space-y-2">
                  {specialtyRisks.map(specialty => (
                    <div key={specialty.specialty} className="flex justify-between">
                      <span className="text-sm">{specialty.specialty}</span>
                      <span className="text-sm font-medium">{specialty.ylls}</span>
                    </div>
                  ))}
                </div>
              </Card>
              
              <Card className="p-4">
                <h5 className="font-semibold mb-2">Disability-Adjusted Life Years (DALY)</h5>
                <div className="space-y-2">
                  {specialtyRisks.map(specialty => (
                    <div key={specialty.specialty} className="flex justify-between">
                      <span className="text-sm">{specialty.specialty}</span>
                      <span className="text-sm font-medium">{specialty.dalys}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-4">
            {specialtyRisks
              .filter(s => s.patientRisk >= 40)
              .map(specialty => (
                <Card key={specialty.specialty} className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      {specialty.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold">{specialty.specialty}</h4>
                      <p className="text-sm text-muted-foreground">
                        Risco: {specialty.patientRisk}%
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h5 className="font-medium text-sm">Recomendações Personalizadas:</h5>
                    <ul className="space-y-1">
                      {specialty.recommendations.map((rec, index) => (
                        <li key={index} className="text-sm flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mt-3 p-3 bg-muted/30 rounded-lg">
                    <p className="text-xs text-muted-foreground">
                      <strong>Base científica:</strong> {specialty.justification}
                    </p>
                  </div>
                </Card>
              ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SpecialtyRiskRanking;