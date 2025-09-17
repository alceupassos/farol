import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, DollarSign, TrendingUp, AlertTriangle, CheckCircle, Calendar } from 'lucide-react';
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

const faturamentoMensalData = [
  { mes: 'Jan', ambulatorial: 850000, hospitalar: 1200000, total: 2050000 },
  { mes: 'Fev', ambulatorial: 920000, hospitalar: 1150000, total: 2070000 },
  { mes: 'Mar', ambulatorial: 880000, hospitalar: 1300000, total: 2180000 },
  { mes: 'Abr', ambulatorial: 950000, hospitalar: 1250000, total: 2200000 },
  { mes: 'Mai', ambulatorial: 1000000, hospitalar: 1400000, total: 2400000 },
  { mes: 'Jun', ambulatorial: 980000, hospitalar: 1350000, total: 2330000 }
];

const glosasData = [
  { tipo: 'AIH Rejeitadas', valor: 45000, percentual: 2.1 },
  { tipo: 'BPA Inconsistentes', valor: 28000, percentual: 1.3 },
  { tipo: 'APAC Negadas', valor: 35000, percentual: 1.6 },
  { tipo: 'Outros', valor: 15000, percentual: 0.7 }
];

const procedimentosData = [
  { name: 'Consultas', value: 45 },
  { name: 'Cirurgias', value: 25 },
  { name: 'Exames', value: 20 },
  { name: 'Internações', value: 10 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const FaturamentoSUSPage = () => {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center">
            <FileText className="h-10 w-10 mr-4 text-blue-400" />
            Faturamento SUS
          </h1>
          <p className="text-gray-400 text-lg mb-4">
            Gestão completa do faturamento SUS - AIH, BPA, APAC e análise de glosas
          </p>
          <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-4">
            <p className="text-blue-200 text-sm leading-relaxed">
              <strong>Para o Gestor:</strong> Central de controle do faturamento junto ao SUS. Monitore AIH (Autorização de Internação Hospitalar), 
              BPA (Boletim de Produção Ambulatorial), APAC (Autorização de Procedimentos de Alta Complexidade) e análise detalhada de glosas. 
              Essencial para maximizar o ressarcimento SUS, reduzir rejeições e manter a sustentabilidade financeira do hospital público ou filantrópico. 
              Acompanhe metas de faturamento, identifique gargalos e otimize processos de cobrança.
            </p>
          </div>
        </div>

        {/* KPIs Principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KpiCard 
            title="Faturamento Total (Mês)" 
            value="R$ 2.33M" 
            change="+5.8%" 
            trend="up" 
            icon={<DollarSign size={24} />} 
            color="green" 
          />
          <KpiCard 
            title="AIH Aprovadas" 
            value="1,234" 
            change="+12%" 
            trend="up" 
            icon={<CheckCircle size={24} />} 
            color="blue" 
          />
          <KpiCard 
            title="Taxa de Glosa" 
            value="5.7%" 
            change="-0.8%" 
            trend="down" 
            icon={<AlertTriangle size={24} />} 
            color="red" 
          />
          <KpiCard 
            title="Tempo Médio Processamento" 
            value="3.2 dias" 
            change="-0.5d" 
            trend="down" 
            icon={<Calendar size={24} />} 
            color="purple" 
          />
        </div>

        {/* Gráficos Principais */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Evolução do Faturamento SUS</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={faturamentoMensalData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`R$ ${(Number(value) / 1000).toFixed(0)}k`, '']} />
                  <Legend />
                  <Line type="monotone" dataKey="ambulatorial" stroke="#8884d8" name="Ambulatorial" />
                  <Line type="monotone" dataKey="hospitalar" stroke="#82ca9d" name="Hospitalar" />
                  <Line type="monotone" dataKey="total" stroke="#ffc658" name="Total" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Distribuição por Tipo de Procedimento</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={procedimentosData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {procedimentosData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Análise de Glosas */}
        <Card className="bg-gray-800/50 border border-gray-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white">Análise Detalhada de Glosas</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={glosasData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="tipo" />
                <YAxis />
                <Tooltip formatter={(value, name) => [
                  name === 'valor' ? `R$ ${Number(value).toLocaleString()}` : `${value}%`,
                  name === 'valor' ? 'Valor' : 'Percentual'
                ]} />
                <Legend />
                <Bar dataKey="valor" fill="#ff7300" name="Valor Glosado (R$)" />
                <Bar dataKey="percentual" fill="#387908" name="% do Total" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Ações e Processos */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Próximas Ações</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-blue-900/30 rounded-lg">
                  <span className="text-gray-300">Envio AIH Junho</span>
                  <span className="text-blue-400 text-sm">Em 2 dias</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-900/30 rounded-lg">
                  <span className="text-gray-300">Revisão BPA Maio</span>
                  <span className="text-yellow-400 text-sm">Pendente</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-900/30 rounded-lg">
                  <span className="text-gray-300">APAC Oncologia</span>
                  <span className="text-green-400 text-sm">Aprovado</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Indicadores de Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">Taxa de Aprovação AIH</span>
                    <span className="text-green-400">94.3%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-green-400 h-2 rounded-full" style={{ width: '94.3%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">Conformidade BPA</span>
                    <span className="text-blue-400">87.1%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-400 h-2 rounded-full" style={{ width: '87.1%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">Tempo Médio Resposta</span>
                    <span className="text-purple-400">3.2 dias</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-purple-400 h-2 rounded-full" style={{ width: '68%' }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Alertas e Notificações</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-red-900/20 border border-red-800 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5" />
                  <div>
                    <p className="text-red-300 text-sm font-medium">Glosa Alta</p>
                    <p className="text-red-400 text-xs">15 AIH rejeitadas hoje</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-yellow-900/20 border border-yellow-800 rounded-lg">
                  <Calendar className="h-5 w-5 text-yellow-400 mt-0.5" />
                  <div>
                    <p className="text-yellow-300 text-sm font-medium">Prazo Próximo</p>
                    <p className="text-yellow-400 text-xs">Envio BPA em 3 dias</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-green-900/20 border border-green-800 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                  <div>
                    <p className="text-green-300 text-sm font-medium">Meta Atingida</p>
                    <p className="text-green-400 text-xs">95% aprovação AIH</p>
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

export default FaturamentoSUSPage;
