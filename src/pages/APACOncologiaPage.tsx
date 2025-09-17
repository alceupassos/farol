import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Activity, Users, Calendar, TrendingUp, AlertTriangle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const KpiCard = ({ title, value, change, trend, icon, color = 'blue' }: { 
  title: string, value: string, change?: string, trend?: 'up' | 'down', icon: React.ReactNode, color?: string 
}) => (
  <div className="bg-gray-900/80 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm">
    <div className="flex items-center justify-between mb-3">
      <p className="text-sm font-medium text-gray-200">{title}</p>
      <div className={`text-${color}-400`}>{icon}</div>
    </div>
    <p className="text-3xl font-bold text-white">{value}</p>
    {change && (
      <p className={`text-xs mt-2 ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
        {change} vs mês anterior
      </p>
    )}
  </div>
);

const tratamentosData = [
  { mes: 'Jan', quimioterapia: 145, radioterapia: 89, cirurgia: 67, imunoterapia: 23 },
  { mes: 'Fev', quimioterapia: 152, radioterapia: 94, cirurgia: 71, imunoterapia: 28 },
  { mes: 'Mar', quimioterapia: 168, radioterapia: 102, cirurgia: 78, imunoterapia: 34 },
  { mes: 'Abr', quimioterapia: 174, radioterapia: 98, cirurgia: 82, imunoterapia: 31 },
  { mes: 'Mai', quimioterapia: 189, radioterapia: 106, cirurgia: 85, imunoterapia: 38 },
  { mes: 'Jun', quimioterapia: 195, radioterapia: 112, cirurgia: 89, imunoterapia: 42 }
];

const tiposCancerData = [
  { name: 'Mama', value: 28, pacientes: 156 },
  { name: 'Próstata', value: 22, pacientes: 122 },
  { name: 'Pulmão', value: 18, pacientes: 100 },
  { name: 'Cólon', value: 15, pacientes: 83 },
  { name: 'Outros', value: 17, pacientes: 94 }
];

const resultadosData = [
  { tratamento: 'Quimioterapia', remissao: 78, estavel: 15, progressao: 7 },
  { tratamento: 'Radioterapia', remissao: 82, estavel: 12, progressao: 6 },
  { tratamento: 'Cirurgia', remissao: 89, estavel: 8, progressao: 3 },
  { tratamento: 'Imunoterapia', remissao: 71, estavel: 18, progressao: 11 }
];

const COLORS = ['#FF6B9D', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'];

const APACOncologiaPage = () => {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center">
            <Heart className="h-10 w-10 mr-4 text-pink-400" />
            APAC Oncologia
          </h1>
          <p className="text-gray-400 text-lg mb-4">
            Gestão de procedimentos oncológicos de alta complexidade - Quimioterapia, Radioterapia e Imunoterapia
          </p>
          <div className="bg-pink-900/20 border border-pink-800 rounded-lg p-4">
            <p className="text-pink-200 text-sm leading-relaxed">
              <strong>Para o Gestor:</strong> Centro de excelência no tratamento oncológico e gestão de APAC (Autorização de Procedimentos de Alta Complexidade). 
              Monitore quimioterapia, radioterapia, imunoterapia, cirurgias oncológicas e protocolos clínicos. Acompanhe indicadores de qualidade como 
              taxa de remissão, sobrevida, adesão ao tratamento e satisfação do paciente. Essencial para hospitais habilitados em oncologia, 
              garantindo conformidade com diretrizes do INCA e maximizando recursos destinados ao tratamento do câncer.
            </p>
          </div>
        </div>

        {/* KPIs Principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KpiCard 
            title="Pacientes em Tratamento" 
            value="555" 
            change="+12%" 
            trend="up" 
            icon={<Users size={24} />} 
            color="pink" 
          />
          <KpiCard 
            title="Procedimentos (Mês)" 
            value="438" 
            change="+8%" 
            trend="up" 
            icon={<Activity size={24} />} 
            color="blue" 
          />
          <KpiCard 
            title="Taxa de Remissão" 
            value="80.2%" 
            change="+2.1%" 
            trend="up" 
            icon={<TrendingUp size={24} />} 
            color="green" 
          />
          <KpiCard 
            title="Tempo Médio Tratamento" 
            value="6.8 meses" 
            change="-0.3m" 
            trend="down" 
            icon={<Calendar size={24} />} 
            color="purple" 
          />
        </div>

        {/* Gráficos Principais */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Evolução dos Tratamentos Oncológicos</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={tratamentosData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="quimioterapia" stroke="#FF6B9D" name="Quimioterapia" strokeWidth={2} />
                  <Line type="monotone" dataKey="radioterapia" stroke="#4ECDC4" name="Radioterapia" strokeWidth={2} />
                  <Line type="monotone" dataKey="cirurgia" stroke="#45B7D1" name="Cirurgia Oncológica" strokeWidth={2} />
                  <Line type="monotone" dataKey="imunoterapia" stroke="#96CEB4" name="Imunoterapia" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Distribuição por Tipo de Câncer</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={tiposCancerData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value, pacientes }) => `${name}: ${value}% (${pacientes})`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {tiposCancerData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Análise de Resultados */}
        <Card className="bg-gray-800/50 border border-gray-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white">Resultados por Tipo de Tratamento</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={resultadosData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="tratamento" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value}%`, '']} />
                <Legend />
                <Bar dataKey="remissao" stackId="a" fill="#00C49F" name="Remissão (%)" />
                <Bar dataKey="estavel" stackId="a" fill="#FFBB28" name="Estável (%)" />
                <Bar dataKey="progressao" stackId="a" fill="#FF8042" name="Progressão (%)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Dashboards Operacionais */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Protocolos Ativos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-pink-900/30 rounded-lg">
                  <div>
                    <span className="text-gray-300 font-medium">Protocolo Mama</span>
                    <p className="text-pink-400 text-sm">156 pacientes</p>
                  </div>
                  <span className="text-pink-400 text-sm">28%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-900/30 rounded-lg">
                  <div>
                    <span className="text-gray-300 font-medium">Protocolo Próstata</span>
                    <p className="text-blue-400 text-sm">122 pacientes</p>
                  </div>
                  <span className="text-blue-400 text-sm">22%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-teal-900/30 rounded-lg">
                  <div>
                    <span className="text-gray-300 font-medium">Protocolo Pulmão</span>
                    <p className="text-teal-400 text-sm">100 pacientes</p>
                  </div>
                  <span className="text-teal-400 text-sm">18%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-900/30 rounded-lg">
                  <div>
                    <span className="text-gray-300 font-medium">Protocolo Cólon</span>
                    <p className="text-green-400 text-sm">83 pacientes</p>
                  </div>
                  <span className="text-green-400 text-sm">15%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Indicadores de Qualidade</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">Taxa de Remissão</span>
                    <span className="text-green-400">80.2%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-green-400 h-2 rounded-full" style={{ width: '80.2%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">Adesão ao Tratamento</span>
                    <span className="text-blue-400">92.5%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-400 h-2 rounded-full" style={{ width: '92.5%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">Qualidade de Vida</span>
                    <span className="text-purple-400">78.8%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-purple-400 h-2 rounded-full" style={{ width: '78.8%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">Sobrevida 5 anos</span>
                    <span className="text-yellow-400">68.3%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '68.3%' }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Alertas Clínicos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-red-900/20 border border-red-800 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5" />
                  <div>
                    <p className="text-red-300 text-sm font-medium">Efeitos Adversos</p>
                    <p className="text-red-400 text-xs">12 pacientes com grau 3+</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-yellow-900/20 border border-yellow-800 rounded-lg">
                  <Calendar className="h-5 w-5 text-yellow-400 mt-0.5" />
                  <div>
                    <p className="text-yellow-300 text-sm font-medium">Consultas Pendentes</p>
                    <p className="text-yellow-400 text-xs">28 retornos agendados</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-green-900/20 border border-green-800 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-green-400 mt-0.5" />
                  <div>
                    <p className="text-green-300 text-sm font-medium">Resposta Completa</p>
                    <p className="text-green-400 text-xs">34 pacientes este mês</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-blue-900/20 border border-blue-800 rounded-lg">
                  <Activity className="h-5 w-5 text-blue-400 mt-0.5" />
                  <div>
                    <p className="text-blue-300 text-sm font-medium">Novos Casos</p>
                    <p className="text-blue-400 text-xs">18 diagnósticos confirmados</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default APACOncologiaPage;
