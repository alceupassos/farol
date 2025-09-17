import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, DollarSign, FileCheck, AlertCircle, Clock, TrendingUp } from 'lucide-react';
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

const faturamentoOperadorasData = [
  { mes: 'Jan', unimed: 450000, bradesco: 320000, sulamerica: 280000, outros: 150000 },
  { mes: 'Fev', unimed: 480000, bradesco: 340000, sulamerica: 290000, outros: 160000 },
  { mes: 'Mar', unimed: 520000, bradesco: 360000, sulamerica: 310000, outros: 170000 },
  { mes: 'Abr', unimed: 510000, bradesco: 350000, sulamerica: 300000, outros: 165000 },
  { mes: 'Mai', unimed: 550000, bradesco: 380000, sulamerica: 320000, outros: 180000 },
  { mes: 'Jun', unimed: 580000, bradesco: 400000, sulamerica: 340000, outros: 190000 }
];

const statusGuiasData = [
  { name: 'Autorizadas', value: 68, count: 2456 },
  { name: 'Pendentes', value: 18, count: 650 },
  { name: 'Negadas', value: 10, count: 361 },
  { name: 'Em Análise', value: 4, count: 144 }
];

const procedimentosTISSData = [
  { procedimento: 'Consultas', quantidade: 1250, valor: 187500 },
  { procedimento: 'Exames', quantidade: 890, valor: 267000 },
  { procedimento: 'Cirurgias', quantidade: 145, valor: 435000 },
  { procedimento: 'Internações', quantidade: 78, valor: 624000 },
  { procedimento: 'Urgência', quantidade: 320, valor: 128000 }
];

const COLORS = ['#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const TISSTUSSPage = () => {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center">
            <Shield className="h-10 w-10 mr-4 text-green-400" />
            TISS/TUSS - Saúde Suplementar
          </h1>
          <p className="text-gray-400 text-lg mb-4">
            Gestão de convênios, operadoras e padrão TISS para saúde suplementar
          </p>
          <div className="bg-green-900/20 border border-green-800 rounded-lg p-4">
            <p className="text-green-200 text-sm leading-relaxed">
              <strong>Para o Gestor:</strong> Gestão estratégica da saúde suplementar e relacionamento com operadoras de planos de saúde. 
              Monitore o padrão TISS (Troca de Informações na Saúde Suplementar), TUSS (Terminologia Unificada da Saúde Suplementar), 
              autorizações de guias, negociação de tabelas e análise de rentabilidade por convênio. Fundamental para diversificar receitas, 
              reduzir dependência do SUS e maximizar o faturamento com Unimed, Bradesco Saúde, SulAmérica e outras operadoras.
            </p>
          </div>
        </div>

        {/* KPIs Principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KpiCard 
            title="Faturamento Convênios (Mês)" 
            value="R$ 1.51M" 
            change="+8.2%" 
            trend="up" 
            icon={<DollarSign size={24} />} 
            color="green" 
          />
          <KpiCard 
            title="Guias Autorizadas" 
            value="2,456" 
            change="+15%" 
            trend="up" 
            icon={<FileCheck size={24} />} 
            color="blue" 
          />
          <KpiCard 
            title="Taxa de Negativa" 
            value="10%" 
            change="-2.1%" 
            trend="down" 
            icon={<AlertCircle size={24} />} 
            color="red" 
          />
          <KpiCard 
            title="Tempo Médio Autorização" 
            value="2.8 horas" 
            change="-0.3h" 
            trend="down" 
            icon={<Clock size={24} />} 
            color="purple" 
          />
        </div>

        {/* Gráficos Principais */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Faturamento por Operadora</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={faturamentoOperadorasData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`R$ ${(Number(value) / 1000).toFixed(0)}k`, '']} />
                  <Legend />
                  <Line type="monotone" dataKey="unimed" stroke="#00C49F" name="Unimed" strokeWidth={2} />
                  <Line type="monotone" dataKey="bradesco" stroke="#8884d8" name="Bradesco Saúde" strokeWidth={2} />
                  <Line type="monotone" dataKey="sulamerica" stroke="#FFBB28" name="SulAmérica" strokeWidth={2} />
                  <Line type="monotone" dataKey="outros" stroke="#FF8042" name="Outros" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Status das Guias TISS</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusGuiasData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value, count }) => `${name}: ${value}% (${count})`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {statusGuiasData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Análise de Procedimentos */}
        <Card className="bg-gray-800/50 border border-gray-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white">Análise de Procedimentos TUSS</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={procedimentosTISSData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="procedimento" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip formatter={(value, name) => [
                  name === 'quantidade' ? `${value} procedimentos` : `R$ ${Number(value).toLocaleString()}`,
                  name === 'quantidade' ? 'Quantidade' : 'Valor Faturado'
                ]} />
                <Legend />
                <Bar yAxisId="left" dataKey="quantidade" fill="#8884d8" name="Quantidade" />
                <Bar yAxisId="right" dataKey="valor" fill="#82ca9d" name="Valor (R$)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Dashboards Operacionais */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Operadoras Principais</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-900/30 rounded-lg">
                  <div>
                    <span className="text-gray-300 font-medium">Unimed</span>
                    <p className="text-green-400 text-sm">R$ 580k</p>
                  </div>
                  <span className="text-green-400 text-sm">38.4%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-900/30 rounded-lg">
                  <div>
                    <span className="text-gray-300 font-medium">Bradesco Saúde</span>
                    <p className="text-blue-400 text-sm">R$ 400k</p>
                  </div>
                  <span className="text-blue-400 text-sm">26.5%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-900/30 rounded-lg">
                  <div>
                    <span className="text-gray-300 font-medium">SulAmérica</span>
                    <p className="text-yellow-400 text-sm">R$ 340k</p>
                  </div>
                  <span className="text-yellow-400 text-sm">22.5%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-900/30 rounded-lg">
                  <div>
                    <span className="text-gray-300 font-medium">Outros</span>
                    <p className="text-purple-400 text-sm">R$ 190k</p>
                  </div>
                  <span className="text-purple-400 text-sm">12.6%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Conformidade TISS</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">Padrão XML 4.0</span>
                    <span className="text-green-400">98.5%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-green-400 h-2 rounded-full" style={{ width: '98.5%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">Validação TUSS</span>
                    <span className="text-blue-400">95.2%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-400 h-2 rounded-full" style={{ width: '95.2%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">Envio Eletrônico</span>
                    <span className="text-purple-400">99.8%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-purple-400 h-2 rounded-full" style={{ width: '99.8%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">Tempo Resposta</span>
                    <span className="text-yellow-400">87.3%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '87.3%' }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Alertas TISS</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-green-900/20 border border-green-800 rounded-lg">
                  <FileCheck className="h-5 w-5 text-green-400 mt-0.5" />
                  <div>
                    <p className="text-green-300 text-sm font-medium">Lote Aprovado</p>
                    <p className="text-green-400 text-xs">Unimed - 145 guias</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-yellow-900/20 border border-yellow-800 rounded-lg">
                  <Clock className="h-5 w-5 text-yellow-400 mt-0.5" />
                  <div>
                    <p className="text-yellow-300 text-sm font-medium">Aguardando</p>
                    <p className="text-yellow-400 text-xs">Bradesco - 23 guias</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-red-900/20 border border-red-800 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-red-400 mt-0.5" />
                  <div>
                    <p className="text-red-300 text-sm font-medium">Erro Validação</p>
                    <p className="text-red-400 text-xs">SulAmérica - 8 guias</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-blue-900/20 border border-blue-800 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-blue-400 mt-0.5" />
                  <div>
                    <p className="text-blue-300 text-sm font-medium">Performance</p>
                    <p className="text-blue-400 text-xs">+15% vs mês anterior</p>
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

export default TISSTUSSPage;
