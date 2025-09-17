import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BrainCircuit, TrendingUp, User, Bed, Calendar, AlertTriangle, Brain, Target, DollarSign, Activity, Users, Heart } from 'lucide-react';
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
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center">
            <BrainCircuit className="h-10 w-10 mr-4 text-purple-400" />
            Insights de IA Avançados
          </h1>
          <p className="text-gray-400 text-lg mb-4">
            Inteligência Artificial e Machine Learning para Gestão Estratégica Hospitalar
          </p>
          <div className="bg-purple-900/20 border border-purple-800 rounded-lg p-4">
            <p className="text-purple-200 text-sm leading-relaxed">
              <strong>Para o Gestor da Santa Casa:</strong> Sistema de IA avançado com 25+ algoritmos preditivos para otimização hospitalar. 
              Previsão de demanda, detecção precoce de complicações, otimização de recursos, análise de risco, 
              recomendações de tratamento e insights financeiros. Tecnologia de ponta para decisões data-driven.
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <KpiCard title="Previsão de Ocupação (Próx. 24h)" value={kpiData.previsaoLeitos.valor} trend={kpiData.previsaoLeitos.tendencia} status={kpiData.previsaoLeitos.status} icon={<Bed className="h-4 w-4 text-muted-foreground" />} />
          <KpiCard title="Pacientes com Alto Risco de Readmissão" value={kpiData.riscoReadmissao.valor} trend={kpiData.riscoReadmissao.tendencia} status={kpiData.riscoReadmissao.status} icon={<User className="h-4 w-4 text-muted-foreground" />} />
          <KpiCard title="Otimização da Agenda Cirúrgica" value={kpiData.otimizacaoAgenda.valor} trend={kpiData.otimizacaoAgenda.tendencia} status={kpiData.otimizacaoAgenda.status} icon={<Calendar className="h-4 w-4 text-muted-foreground" />} />
          <KpiCard title="Alerta de Pacientes Críticos" value={kpiData.pacientesCriticos.valor} trend={kpiData.pacientesCriticos.tendencia} status={kpiData.pacientesCriticos.status} icon={<AlertTriangle className="h-4 w-4 text-muted-foreground" />} />
        </div>

        {/* Modelos de IA Expandidos */}
        <Card className="bg-gray-800/50 border border-gray-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white">25 Modelos de IA Especializados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { nome: 'Previsão Demanda UTI', acuracia: 97.2, status: 'Ativo', categoria: 'Operacional' },
                { nome: 'Detecção Sepse Precoce', acuracia: 95.8, status: 'Ativo', categoria: 'Clínico' },
                { nome: 'Risco Readmissão 30d', acuracia: 94.1, status: 'Ativo', categoria: 'Qualidade' },
                { nome: 'Otimização Escala Médica', acuracia: 92.5, status: 'Ativo', categoria: 'RH' },
                { nome: 'Previsão Faturamento', acuracia: 96.7, status: 'Ativo', categoria: 'Financeiro' },
                { nome: 'Risco Queda Paciente', acuracia: 89.3, status: 'Ativo', categoria: 'Segurança' },
                { nome: 'Gestão Estoque Medicamentos', acuracia: 93.8, status: 'Ativo', categoria: 'Logística' },
                { nome: 'Previsão Complicações Cirúrgicas', acuracia: 91.2, status: 'Ativo', categoria: 'Cirúrgico' },
                { nome: 'Análise Satisfação Paciente', acuracia: 88.7, status: 'Ativo', categoria: 'Qualidade' },
                { nome: 'Detecção Fraude Faturamento', acuracia: 98.1, status: 'Ativo', categoria: 'Auditoria' },
                { nome: 'Otimização Centro Cirúrgico', acuracia: 94.6, status: 'Ativo', categoria: 'Operacional' },
                { nome: 'Previsão Mortalidade', acuracia: 92.8, status: 'Ativo', categoria: 'Clínico' }
              ].map((modelo, index) => (
                <div key={index} className="bg-gray-900/50 border border-gray-700 rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-white text-sm font-medium">{modelo.nome}</h3>
                    <span className="text-xs bg-green-600 px-2 py-1 rounded">{modelo.status}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>{modelo.categoria}</span>
                    <span className="text-green-400">{modelo.acuracia}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-1">
                    <div className="bg-green-400 h-1 rounded-full" style={{ width: `${modelo.acuracia}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Dashboards de Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Insights Clínicos IA</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="bg-red-900/20 border border-red-800 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-1">
                    <AlertTriangle className="h-4 w-4 text-red-400" />
                    <span className="text-red-300 text-sm font-medium">Alto Risco Sepse</span>
                  </div>
                  <p className="text-red-400 text-xs">Paciente UTI Leito 12 - Intervenção recomendada</p>
                </div>
                <div className="bg-yellow-900/20 border border-yellow-800 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-1">
                    <TrendingUp className="h-4 w-4 text-yellow-400" />
                    <span className="text-yellow-300 text-sm font-medium">Pico Demanda UTI</span>
                  </div>
                  <p className="text-yellow-400 text-xs">Previsto para 18h - Preparar leitos extras</p>
                </div>
                <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-1">
                    <Brain className="h-4 w-4 text-blue-400" />
                    <span className="text-blue-300 text-sm font-medium">Otimização Recursos</span>
                  </div>
                  <p className="text-blue-400 text-xs">Realocação sugerida: 3 enfermeiros</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Insights Financeiros IA</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="bg-green-900/20 border border-green-800 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-1">
                    <DollarSign className="h-4 w-4 text-green-400" />
                    <span className="text-green-300 text-sm font-medium">Oportunidade Receita</span>
                  </div>
                  <p className="text-green-400 text-xs">+R$ 450k identificados em glosas evitáveis</p>
                </div>
                <div className="bg-purple-900/20 border border-purple-800 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-1">
                    <TrendingUp className="h-4 w-4 text-purple-400" />
                    <span className="text-purple-300 text-sm font-medium">Previsão Faturamento</span>
                  </div>
                  <p className="text-purple-400 text-xs">Julho: R$ 5.2M (+8% vs junho)</p>
                </div>
                <div className="bg-teal-900/20 border border-teal-800 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-1">
                    <Target className="h-4 w-4 text-teal-400" />
                    <span className="text-teal-300 text-sm font-medium">Otimização Custos</span>
                  </div>
                  <p className="text-teal-400 text-xs">Economia potencial: R$ 280k/mês</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Insights Operacionais IA</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="bg-orange-900/20 border border-orange-800 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-1">
                    <Users className="h-4 w-4 text-orange-400" />
                    <span className="text-orange-300 text-sm font-medium">Gestão de Pessoal</span>
                  </div>
                  <p className="text-orange-400 text-xs">Sugestão: +2 enfermeiros turno noite</p>
                </div>
                <div className="bg-cyan-900/20 border border-cyan-800 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-1">
                    <Activity className="h-4 w-4 text-cyan-400" />
                    <span className="text-cyan-300 text-sm font-medium">Fluxo Pacientes</span>
                  </div>
                  <p className="text-cyan-400 text-xs">Gargalo identificado: Raio-X (45min)</p>
                </div>
                <div className="bg-pink-900/20 border border-pink-800 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-1">
                    <Heart className="h-4 w-4 text-pink-400" />
                    <span className="text-pink-300 text-sm font-medium">Qualidade Assistencial</span>
                  </div>
                  <p className="text-pink-400 text-xs">Score satisfação previsto: 92.5%</p>
                </div>
              </div>
            </CardContent>
          </Card>
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
