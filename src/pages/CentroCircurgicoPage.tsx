import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Scissors, Clock, Users, CheckCircle, AlertTriangle, Calendar, Heart } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

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

const cirurgiasData = [
  { mes: 'Jan', eletivas: 245, urgencias: 89, canceladas: 12 },
  { mes: 'Fev', eletivas: 267, urgencias: 92, canceladas: 8 },
  { mes: 'Mar', eletivas: 289, urgencias: 78, canceladas: 15 },
  { mes: 'Abr', eletivas: 298, urgencias: 85, canceladas: 9 },
  { mes: 'Mai', eletivas: 312, urgencias: 91, canceladas: 11 },
  { mes: 'Jun', eletivas: 334, urgencias: 87, canceladas: 7 }
];

const salasData = [
  { sala: 'Sala 1', ocupacao: 92, cirurgias: 28 },
  { sala: 'Sala 2', ocupacao: 88, cirurgias: 25 },
  { sala: 'Sala 3', ocupacao: 95, cirurgias: 31 },
  { sala: 'Sala 4', ocupacao: 85, cirurgias: 23 },
  { sala: 'Sala 5', ocupacao: 90, cirurgias: 27 }
];

const CentroCircurgicoPage = () => {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center">
            <Scissors className="h-10 w-10 mr-4 text-red-400" />
            Centro Cirúrgico
          </h1>
          <p className="text-gray-400 text-lg mb-4">
            Gestão Completa do Bloco Operatório - Salas, Agendas e Performance Cirúrgica
          </p>
          <div className="bg-red-900/20 border border-red-800 rounded-lg p-4">
            <p className="text-red-200 text-sm leading-relaxed">
              <strong>Para o Gestor Municipal:</strong> Central de controle do centro cirúrgico com gestão completa de salas operatórias, 
              agendamento cirúrgico, equipes multidisciplinares, instrumentais e indicadores de performance. Monitore ocupação de salas, 
              tempo cirúrgico, cancelamentos, infecção de sítio cirúrgico, produtividade e custos operacionais. 
              Essencial para otimização do bloco operatório e aumento da eficiência cirúrgica.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
          <KpiCard title="Cirurgias Realizadas (Mês)" value="421" change="+7.2%" trend="up" icon={<Scissors size={24} />} color="red" />
          <KpiCard title="Taxa de Ocupação Salas" value="90.2%" change="+2.1%" trend="up" icon={<Clock size={24} />} color="blue" />
          <KpiCard title="Cancelamentos" value="7" change="-36%" trend="down" icon={<AlertTriangle size={24} />} color="yellow" />
          <KpiCard title="Tempo Médio Cirurgia" value="2.4h" change="-0.2h" trend="down" icon={<CheckCircle size={24} />} color="green" />
          <KpiCard title="Infecção Sítio Cirúrgico" value="1.2%" change="-0.3%" trend="down" icon={<Heart size={24} />} color="purple" />
          <KpiCard title="Mortalidade Cirúrgica" value="0.8%" change="-0.1%" trend="down" icon={<Users size={24} />} color="cyan" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader><CardTitle className="text-white">Evolução das Cirurgias</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={cirurgiasData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="eletivas" stroke="#4ECDC4" name="Eletivas" strokeWidth={2} />
                  <Line type="monotone" dataKey="urgencias" stroke="#FF6B6B" name="Urgências" strokeWidth={2} />
                  <Line type="monotone" dataKey="canceladas" stroke="#FFE66D" name="Canceladas" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader><CardTitle className="text-white">Ocupação por Sala</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salasData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="sala" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="ocupacao" fill="#8884d8" name="Ocupação %" />
                  <Bar dataKey="cirurgias" fill="#82ca9d" name="Cirurgias" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader><CardTitle className="text-white">Agenda Cirúrgica</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-blue-900/30 rounded-lg">
                  <div>
                    <span className="text-gray-300 font-medium">Hoje</span>
                    <p className="text-blue-400 text-sm">12 cirurgias agendadas</p>
                  </div>
                  <Calendar className="h-5 w-5 text-blue-400" />
                </div>
                <div className="flex items-center justify-between p-3 bg-green-900/30 rounded-lg">
                  <div>
                    <span className="text-gray-300 font-medium">Amanhã</span>
                    <p className="text-green-400 text-sm">15 cirurgias agendadas</p>
                  </div>
                  <Calendar className="h-5 w-5 text-green-400" />
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-900/30 rounded-lg">
                  <div>
                    <span className="text-gray-300 font-medium">Esta Semana</span>
                    <p className="text-purple-400 text-sm">78 cirurgias agendadas</p>
                  </div>
                  <Calendar className="h-5 w-5 text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader><CardTitle className="text-white">Equipes Cirúrgicas</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">Cirurgiões Disponíveis</span>
                    <span className="text-green-400">18/20</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-green-400 h-2 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">Anestesistas</span>
                    <span className="text-blue-400">8/10</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-400 h-2 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">Instrumentadores</span>
                    <span className="text-purple-400">12/15</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-purple-400 h-2 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader><CardTitle className="text-white">Alertas Operacionais</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-yellow-900/20 border border-yellow-800 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-yellow-400 mt-0.5" />
                  <div>
                    <p className="text-yellow-300 text-sm font-medium">Atraso Cirúrgico</p>
                    <p className="text-yellow-400 text-xs">Sala 3 - 45min de atraso</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-red-900/20 border border-red-800 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5" />
                  <div>
                    <p className="text-red-300 text-sm font-medium">Equipamento</p>
                    <p className="text-red-400 text-xs">Microscópio Sala 2 - Manutenção</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-green-900/20 border border-green-800 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                  <div>
                    <p className="text-green-300 text-sm font-medium">Meta Atingida</p>
                    <p className="text-green-400 text-xs">90% ocupação das salas</p>
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

export default CentroCircurgicoPage;
