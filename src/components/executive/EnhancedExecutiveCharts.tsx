import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  ScatterChart,
  Scatter
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Activity, 
  MapPin, 
  Heart,
  AlertTriangle,
  Calendar,
  Building,
  Stethoscope
} from 'lucide-react';

// Dados para os gráficos expandidos
const specialtyRiskData = [
  { specialty: 'Cardiologia', pacientes: 1247, riscoCritico: 156, riscoAlto: 298, riscoModerado: 487, riscoBaixo: 306 },
  { specialty: 'Oncologia', pacientes: 892, riscoCritico: 89, riscoAlto: 178, riscoModerado: 356, riscoBaixo: 269 },
  { specialty: 'Nefrologia', pacientes: 634, riscoCritico: 63, riscoAlto: 127, riscoModerado: 253, riscoBaixo: 191 },
  { specialty: 'Pneumologia', pacientes: 756, riscoCritico: 45, riscoAlto: 113, riscoModerado: 302, riscoBaixo: 296 },
  { specialty: 'Neurologia', pacientes: 543, riscoCritico: 32, riscoAlto: 87, riscoModerado: 217, riscoBaixo: 207 }
];

const neighborhoodHealthData = [
  { bairro: 'Centro', populacao: 12500, ubs: 3, risco: 35, satisfacao: 78, cobertura: 92 },
  { bairro: 'Jardim América', populacao: 8900, ubs: 2, risco: 42, satisfacao: 72, cobertura: 88 },
  { bairro: 'Vila Esperança', populacao: 15200, ubs: 4, risco: 58, satisfacao: 68, cobertura: 85 },
  { bairro: 'São Benedito', populacao: 6700, ubs: 2, risco: 28, satisfacao: 82, cobertura: 95 },
  { bairro: 'Mombaça', populacao: 11800, ubs: 3, risco: 45, satisfacao: 74, cobertura: 90 }
];

const budgetROIData = [
  { mes: 'Jan', investimento: 2.1, economia: 1.8, roi: 85.7 },
  { mes: 'Fev', investimento: 2.3, economia: 2.1, roi: 91.3 },
  { mes: 'Mar', investimento: 2.5, economia: 2.4, roi: 96.0 },
  { mes: 'Abr', investimento: 2.2, economia: 2.3, roi: 104.5 },
  { mes: 'Mai', investimento: 2.4, economia: 2.7, roi: 112.5 },
  { mes: 'Jun', investimento: 2.6, economia: 3.1, roi: 119.2 }
];

const populationTrendData = [
  { ano: '2020', populacao: 142000, nascimentos: 1876, obitos: 1234, idosos: 18500 },
  { ano: '2021', populacao: 143500, nascimentos: 1923, obitos: 1456, idosos: 19200 },
  { ano: '2022', populacao: 144800, nascimentos: 1867, obitos: 1389, idosos: 19800 },
  { ano: '2023', populacao: 145900, nascimentos: 1912, obitos: 1267, idosos: 20400 },
  { ano: '2024', populacao: 147200, nascimentos: 1945, obitos: 1198, idosos: 21100 }
];

const resourceAllocationData = [
  { recurso: 'Profissionais', atual: 234, necessario: 280, percentual: 83.6 },
  { recurso: 'Equipamentos', atual: 156, necessario: 180, percentual: 86.7 },
  { recurso: 'Medicamentos', atual: 892, necessario: 920, percentual: 97.0 },
  { recurso: 'Leitos UTI', atual: 24, necessario: 32, percentual: 75.0 },
  { recurso: 'Ambulâncias', atual: 8, necessario: 12, percentual: 66.7 }
];

const qualityOfLifeData = [
  { indicador: 'Mobilidade', score: 78, meta: 85 },
  { indicador: 'Cuidados Pessoais', score: 82, meta: 80 },
  { indicador: 'Atividades Habituais', score: 74, meta: 80 },
  { indicador: 'Dor/Desconforto', score: 69, meta: 75 },
  { indicador: 'Ansiedade/Depressão', score: 71, meta: 78 }
];

const epidemiologyData = [
  { doenca: 'Dengue', casos: 145, tendencia: 'alta', gravidade: 'moderada' },
  { doenca: 'COVID-19', casos: 23, tendencia: 'estavel', gravidade: 'baixa' },
  { doenca: 'Influenza', casos: 67, tendencia: 'baixa', gravidade: 'baixa' },
  { doenca: 'Zika', casos: 8, tendencia: 'estavel', gravidade: 'baixa' },
  { doenca: 'Chikungunya', casos: 12, tendencia: 'estavel', gravidade: 'baixa' }
];

const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', '#8884d8', '#82ca9d'];

const EnhancedExecutiveCharts: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Row 1: Distribuição de Riscos e Mapa de Calor */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              Distribuição de Riscos por Especialidade
            </CardTitle>
            <CardDescription>Pacientes categorizados por nível de risco</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={specialtyRiskData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="specialty" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="riscoCritico" stackId="a" fill="#ef4444" name="Crítico" />
                  <Bar dataKey="riscoAlto" stackId="a" fill="#f97316" name="Alto" />
                  <Bar dataKey="riscoModerado" stackId="a" fill="#eab308" name="Moderado" />
                  <Bar dataKey="riscoBaixo" stackId="a" fill="#22c55e" name="Baixo" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Indicadores de Saúde por Bairro
            </CardTitle>
            <CardDescription>Cobertura, risco e satisfação</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart data={neighborhoodHealthData}>
                  <CartesianGrid />
                  <XAxis dataKey="cobertura" name="Cobertura" unit="%" />
                  <YAxis dataKey="satisfacao" name="Satisfação" unit="%" />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                  <Scatter dataKey="risco" fill="hsl(var(--primary))" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Row 2: Tendências Populacionais e ROI */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Tendências Populacionais
            </CardTitle>
            <CardDescription>Demografia e indicadores vitais</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={populationTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="ano" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="populacao" 
                    stackId="1" 
                    stroke="hsl(var(--primary))" 
                    fill="hsl(var(--primary))" 
                    fillOpacity={0.6}
                    name="População Total"
                  />
                  <Legend />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              ROI dos Investimentos em Saúde
            </CardTitle>
            <CardDescription>Retorno sobre investimento mensal</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={budgetROIData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="roi" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2 }}
                    name="ROI (%)"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="investimento" 
                    stroke="hsl(var(--secondary))" 
                    strokeWidth={2}
                    name="Investimento (M)"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="economia" 
                    stroke="hsl(var(--accent))" 
                    strokeWidth={2}
                    name="Economia (M)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Row 3: Recursos e Qualidade de Vida */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5 text-primary" />
              Alocação de Recursos
            </CardTitle>
            <CardDescription>Recursos atuais vs necessários</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={resourceAllocationData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis dataKey="recurso" type="category" width={100} />
                  <Tooltip />
                  <Bar dataKey="percentual" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Qualidade de Vida (EQ-5D)
            </CardTitle>
            <CardDescription>Indicadores de qualidade de vida populacional</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={qualityOfLifeData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="indicador" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar 
                    name="Score Atual" 
                    dataKey="score" 
                    stroke="hsl(var(--primary))" 
                    fill="hsl(var(--primary))" 
                    fillOpacity={0.3} 
                  />
                  <Radar 
                    name="Meta" 
                    dataKey="meta" 
                    stroke="hsl(var(--secondary))" 
                    fill="hsl(var(--secondary))" 
                    fillOpacity={0.1} 
                  />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Row 4: Epidemiologia e Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-primary" />
              Vigilância Epidemiológica
            </CardTitle>
            <CardDescription>Doenças em monitoramento</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {epidemiologyData.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div>
                    <div className="font-medium">{item.doenca}</div>
                    <div className="text-sm text-muted-foreground">{item.casos} casos</div>
                  </div>
                  <div className="flex gap-2">
                    <Badge 
                      variant={item.tendencia === 'alta' ? 'destructive' : 
                               item.tendencia === 'baixa' ? 'default' : 'secondary'}
                    >
                      {item.tendencia}
                    </Badge>
                    <Badge variant="outline">
                      {item.gravidade}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Demografia por Bairro
            </CardTitle>
            <CardDescription>Distribuição populacional</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={neighborhoodHealthData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ bairro, percent }) => `${bairro} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={60}
                    fill="#8884d8"
                    dataKey="populacao"
                  >
                    {neighborhoodHealthData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Stethoscope className="h-5 w-5 text-primary" />
              Indicadores de Performance
            </CardTitle>
            <CardDescription>Métricas operacionais</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Taxa de Resolução</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{width: '87%'}}></div>
                  </div>
                  <span className="text-sm font-semibold">87%</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Tempo Médio Atendimento</span>
                <Badge variant="secondary">18 min</Badge>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Satisfação Pacientes</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-muted rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{width: '92%'}}></div>
                  </div>
                  <span className="text-sm font-semibold">92%</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Absenteísmo</span>
                <Badge variant="outline">12%</Badge>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Eficiência Energética</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{width: '78%'}}></div>
                  </div>
                  <span className="text-sm font-semibold">78%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EnhancedExecutiveCharts;