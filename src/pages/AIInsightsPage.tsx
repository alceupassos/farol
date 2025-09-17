import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BrainCircuit, TrendingUp, User, Bed, Calendar, AlertTriangle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

const kpiData = {
  previsaoLeitos: { valor: '95%', tendencia: '+3%', status: 'alta' },
  riscoReadmissao: { valor: '12%', tendencia: '-1%', status: 'moderado' },
  otimizacaoAgenda: { valor: '18%', tendencia: '+4%', status: 'bom' },
  pacientesCriticos: { valor: '8', tendencia: '+2', status: 'alerta' },
};

const dadosPrevisaoDemanda = [
  { name: 'Seg', demanda: 280, capacidade: 320 },
  { name: 'Ter', demanda: 310, capacidade: 320 },
  { name: 'Qua', demanda: 330, capacidade: 320 },
  { name: 'Qui', demanda: 300, capacidade: 320 },
  { name: 'Sex', demanda: 290, capacidade: 320 },
  { name: 'Sáb', demanda: 250, capacidade: 320 },
  { name: 'Dom', demanda: 240, capacidade: 320 },
];

const dadosRiscoReadmissao = [
  { name: 'Cardiologia', risco: 18 },
  { name: 'Oncologia', risco: 25 },
  { name: 'Neurologia', risco: 15 },
  { name: 'Ortopedia', risco: 10 },
  { name: 'Outros', risco: 5 },
];

const KpiCard = ({ title, value, trend, status, icon }: { title: string, value: string, trend: string, status: string, icon: React.ReactNode }) => {
  const statusColor = {
    alta: 'text-red-500',
    moderado: 'text-yellow-500',
    bom: 'text-green-500',
    alerta: 'text-red-500',
  }[status] || 'text-gray-500';

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className={`text-xs ${statusColor}`}>{trend}</p>
      </CardContent>
    </Card>
  );
};

const AIInsightsPage = () => {
  return (
    <MainLayout>
      <div className="p-6 space-y-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center">
            <BrainCircuit className="h-10 w-10 mr-4 text-primary" />
            IA Insights - Inteligência Artificial na Gestão
          </h1>
          <p className="text-gray-500 text-lg">
            Análises preditivas e insights para otimização de recursos e melhoria da qualidade assistencial.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <KpiCard title="Previsão de Ocupação (Próx. 24h)" value={kpiData.previsaoLeitos.valor} trend={kpiData.previsaoLeitos.tendencia} status={kpiData.previsaoLeitos.status} icon={<Bed className="h-4 w-4 text-muted-foreground" />} />
          <KpiCard title="Pacientes com Alto Risco de Readmissão" value={kpiData.riscoReadmissao.valor} trend={kpiData.riscoReadmissao.tendencia} status={kpiData.riscoReadmissao.status} icon={<User className="h-4 w-4 text-muted-foreground" />} />
          <KpiCard title="Otimização da Agenda Cirúrgica" value={kpiData.otimizacaoAgenda.valor} trend={kpiData.otimizacaoAgenda.tendencia} status={kpiData.otimizacaoAgenda.status} icon={<Calendar className="h-4 w-4 text-muted-foreground" />} />
          <KpiCard title="Alerta de Pacientes Críticos" value={kpiData.pacientesCriticos.valor} trend={kpiData.pacientesCriticos.tendencia} status={kpiData.pacientesCriticos.status} icon={<AlertTriangle className="h-4 w-4 text-muted-foreground" />} />
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Previsão de Demanda de Leitos (Próxima Semana)</CardTitle>
              <CardDescription>Linha vermelha indica a capacidade máxima do hospital.</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dadosPrevisaoDemanda}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="demanda" stroke="#8884d8" name="Demanda Prevista" />
                  <Line type="monotone" dataKey="capacidade" stroke="#e53e3e" name="Capacidade" strokeDasharray="5 5" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Risco de Readmissão por Especialidade</CardTitle>
              <CardDescription>Identificação de áreas com maior índice de readmissão em 30 dias.</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dadosRiscoReadmissao}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="risco" fill="#82ca9d" name="Índice de Risco (%)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default AIInsightsPage;
