import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  Users,
  Clock,
  DollarSign,
  Activity,
  Shield,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  PieChart as PieChartIcon,
  Target,
  Zap,
} from 'lucide-react';

// Dados mockados para demonstração
const kpiData = {
  ocupacaoHospitalar: {
    valor: 92.5,
    meta: 95,
    tendencia: 'up',
    descricao: 'Taxa de Ocupação Hospitalar'
  },
  tempoPermanencia: {
    valor: 4.2,
    meta: 4.0,
    tendencia: 'down',
    descricao: 'Tempo Médio de Permanência (dias)'
  },
  reinternacao: {
    valor: 8.5,
    meta: 8.0,
    tendencia: 'down',
    descricao: 'Taxa de Reinternação (%)'
  },
  satisfacao: {
    valor: 4.2,
    meta: 4.5,
    tendencia: 'up',
    descricao: 'Índice de Satisfação dos Pacientes'
  }
};

const rankingUnidades = [
  { nome: 'UTI Geral', desempenho: 94.2, tendencia: 'up', categoria: 'Excelente' },
  { nome: 'Centro Cirúrgico', desempenho: 91.8, tendencia: 'up', categoria: 'Muito Bom' },
  { nome: 'Clínica Médica', desempenho: 88.5, tendencia: 'stable', categoria: 'Bom' },
  { nome: 'Emergência', desempenho: 85.3, tendencia: 'down', categoria: 'Atenção' },
  { nome: 'Pediatria', desempenho: 82.1, tendencia: 'down', categoria: 'Atenção' },
];

const custosPorEspecialidade = [
  { especialidade: 'Cirurgia Geral', custo: 2450, pacientes: 45 },
  { especialidade: 'Cardiologia', custo: 3200, pacientes: 32 },
  { especialidade: 'Neurologia', custo: 2850, pacientes: 28 },
  { especialidade: 'Ortopedia', custo: 2100, pacientes: 38 },
  { especialidade: 'Ginecologia', custo: 1950, pacientes: 42 },
];

const indicadoresQualidade = [
  { indicador: 'Taxa de Infecção Hospitalar', valor: 1.2, meta: 2.0, status: 'bom' },
  { indicador: 'Taxa de Mortalidade', valor: 2.8, meta: 3.0, status: 'excelente' },
  { indicador: 'Tempo Médio de Atendimento', valor: 25, meta: 30, status: 'bom' },
  { indicador: 'Taxa de Cancelamento de Cirurgias', valor: 3.2, meta: 5.0, status: 'excelente' },
];

const tendenciaMensal = [
  { mes: 'Jan', ocupacao: 88, custos: 2100, satisfacao: 4.1 },
  { mes: 'Fev', ocupacao: 91, custos: 2250, satisfacao: 4.2 },
  { mes: 'Mar', ocupacao: 89, custos: 2180, satisfacao: 4.0 },
  { mes: 'Abr', ocupacao: 93, custos: 2350, satisfacao: 4.3 },
  { mes: 'Mai', ocupacao: 95, custos: 2420, satisfacao: 4.2 },
  { mes: 'Jun', ocupacao: 92, custos: 2380, satisfacao: 4.4 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const OSSMedidasDesempenhoPage: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('6meses');

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Medidas de Desempenho Hospitalar</h1>
          <p className="text-muted-foreground">
            Indicadores críticos para gestão hospitalar e tomada de decisões
          </p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="cursor-pointer">
            Últimos 6 meses
          </Badge>
          <Badge variant="outline" className="cursor-pointer">
            Dados em tempo real
          </Badge>
        </div>
      </div>

      {/* KPIs Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(kpiData).map(([key, kpi]) => (
          <Card key={key} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {kpi.descricao}
              </CardTitle>
              {kpi.tendencia === 'up' ? (
                <TrendingUp className="h-4 w-4 text-green-600" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-600" />
              )}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {typeof kpi.valor === 'number' && kpi.valor % 1 === 0
                  ? kpi.valor
                  : kpi.valor.toFixed(1)
                }
                {kpi.descricao.includes('%') ? '%' : kpi.descricao.includes('dias') ? ' dias' : ''}
              </div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <span>Meta: {kpi.meta}</span>
                <Badge variant={kpi.valor >= kpi.meta ? "default" : "secondary"} className="text-xs">
                  {kpi.valor >= kpi.meta ? 'Atingida' : 'Abaixo da meta'}
                </Badge>
              </div>
              <Progress
                value={(kpi.valor / kpi.meta) * 100}
                className="mt-3"
              />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Rankings de Desempenho */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Rankings de Desempenho por Unidade
            </CardTitle>
            <CardDescription>
              Top 5 unidades com melhor e pior performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Unidade</TableHead>
                  <TableHead>Desempenho</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rankingUnidades.map((unidade, index) => (
                  <TableRow key={unidade.nome}>
                    <TableCell className="font-medium">{unidade.nome}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-bold">{unidade.desempenho}%</span>
                        {unidade.tendencia === 'up' ? (
                          <TrendingUp className="h-4 w-4 text-green-600" />
                        ) : unidade.tendencia === 'down' ? (
                          <TrendingDown className="h-4 w-4 text-red-600" />
                        ) : (
                          <Activity className="h-4 w-4 text-gray-600" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          unidade.categoria === 'Excelente' ? 'default' :
                          unidade.categoria === 'Muito Bom' ? 'secondary' :
                          unidade.categoria === 'Bom' ? 'outline' : 'destructive'
                        }
                      >
                        {unidade.categoria}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Análise de Custos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Análise de Custos por Especialidade
            </CardTitle>
            <CardDescription>
              Custo médio por paciente e distribuição por especialidade
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Custo Médio Geral</span>
                <span className="text-2xl font-bold text-green-600">R$ 2.450</span>
              </div>
              <div className="space-y-2">
                {custosPorEspecialidade.map((especialidade, index) => (
                  <div key={especialidade.especialidade} className="flex items-center justify-between">
                    <span className="text-sm">{especialidade.especialidade}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        {especialidade.pacientes} pacientes
                      </span>
                      <span className="font-medium">R$ {especialidade.custo}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Indicadores de Qualidade */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Indicadores de Qualidade Hospitalar
          </CardTitle>
          <CardDescription>
            Principais métricas de qualidade assistencial
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {indicadoresQualidade.map((indicador, index) => (
              <div key={indicador.indicador} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium">{indicador.indicador}</h4>
                  {indicador.status === 'excelente' ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : indicador.status === 'bom' ? (
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  )}
                </div>
                <div className="text-2xl font-bold mb-1">
                  {typeof indicador.valor === 'number' && indicador.valor % 1 === 0
                    ? indicador.valor
                    : indicador.valor.toFixed(1)
                  }
                  {indicador.indicador.includes('%') ? '%' : indicador.indicador.includes('minutos') ? ' min' : ''}
                </div>
                <div className="text-xs text-muted-foreground">
                  Meta: {indicador.meta}
                  {indicador.indicador.includes('%') ? '%' : indicador.indicador.includes('minutos') ? ' min' : ''}
                </div>
                <Progress
                  value={indicador.status === 'excelente' ? 95 :
                         indicador.status === 'bom' ? 85 : 75}
                  className="mt-2"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Gráficos de Tendência */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Tendência Mensal - Ocupação vs Custos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={tendenciaMensal}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="ocupacao"
                  stroke="#8884d8"
                  strokeWidth={2}
                  name="Ocupação (%)"
                />
                <Line
                  type="monotone"
                  dataKey="custos"
                  stroke="#82ca9d"
                  strokeWidth={2}
                  name="Custos (R$)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChartIcon className="h-5 w-5" />
              Distribuição de Custos por Especialidade
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={custosPorEspecialidade}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ especialidade, percent }) => `${especialidade} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="custo"
                >
                  {custosPorEspecialidade.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `R$ ${value}`} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Alertas e Recomendações */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Alertas e Recomendações Automáticas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-yellow-800">Atenção: Unidade de Emergência</h4>
                <p className="text-sm text-yellow-700 mt-1">
                  A unidade de Emergência apresenta desempenho abaixo da média (85.3%).
                  Considere revisar processos de triagem e otimizar fluxo de pacientes.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-800">Destaque: UTI Geral</h4>
                <p className="text-sm text-blue-700 mt-1">
                  A UTI Geral mantém excelente desempenho (94.2%) e pode servir como
                  modelo para outras unidades.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
              <TrendingUp className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-green-800">Oportunidade: Redução de Custos</h4>
                <p className="text-sm text-green-700 mt-1">
                  Especialidades de Ortopedia e Ginecologia apresentam custos abaixo da média,
                  indicando oportunidades de otimização em outras áreas.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OSSMedidasDesempenhoPage;
