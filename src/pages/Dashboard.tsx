
import React from 'react';
import { Link } from 'react-router-dom';
import { Stethoscope, Calendar, FileText, Clock, Zap, Heart, Activity, Pill, Shield, DollarSign, Users, Bed, TestTube, Scissors, CheckCircle, AlertTriangle, TrendingUp, Star, Brain, BarChart3, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';

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

// Dados integrados de todas as páginas expandidas
const performanceGeral = [
  { mes: 'Jan', receita: 4450000, pacientes: 12500, ocupacao: 82.5, satisfacao: 87.2, mortalidade: 2.8 },
  { mes: 'Fev', receita: 4780000, pacientes: 13200, ocupacao: 84.1, satisfacao: 88.5, mortalidade: 2.5 },
  { mes: 'Mar', receita: 5020000, pacientes: 13800, ocupacao: 85.8, satisfacao: 89.8, mortalidade: 2.3 },
  { mes: 'Abr', receita: 4850000, pacientes: 14100, ocupacao: 83.2, satisfacao: 90.2, mortalidade: 2.1 },
  { mes: 'Mai', receita: 5200000, pacientes: 14500, ocupacao: 86.4, satisfacao: 91.5, mortalidade: 2.0 },
  { mes: 'Jun', receita: 5430000, pacientes: 15200, ocupacao: 87.9, satisfacao: 92.8, mortalidade: 1.9 }
];

const indicadoresFinanceiros = [
  { categoria: 'SUS', valor: 3350000, percentual: 61.7 },
  { categoria: 'Convênios', valor: 1500000, percentual: 27.6 },
  { categoria: 'Particular', valor: 580000, percentual: 10.7 }
];

const COLORS = ['#4ECDC4', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2 flex items-center">
          <Activity className="h-10 w-10 mr-4 text-blue-400" />
          Visão Geral Executiva
        </h1>
        <p className="text-gray-400 text-lg mb-4">
          Dashboard Integrado - Santa Casa de Misericórdia - Performance Hospitalar Completa
        </p>
        <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-4">
          <p className="text-blue-200 text-sm leading-relaxed">
            <strong>Para o Executivo Municipal:</strong> Visão geral integrada de todos os setores hospitalares com KPIs executivos,
            performance financeira, qualidade assistencial, indicadores operacionais e analytics avançados.
            Monitore receitas, ocupação, satisfação, mortalidade e eficiência em tempo real para tomada de decisão estratégica.
          </p>
        </div>
      </div>

      {/* KPIs Executivos Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
        <KpiCard title="Receita Total" value="R$ 5.43M" change="+4.4%" trend="up" icon={<DollarSign size={24} />} color="green" />
        <KpiCard title="Pacientes Atendidos" value="15.2k" change="+4.7%" trend="up" icon={<Users size={24} />} color="blue" />
        <KpiCard title="Taxa Ocupação" value="87.9%" change="+2.1%" trend="up" icon={<Bed size={24} />} color="purple" />
        <KpiCard title="Satisfação Geral" value="92.8%" change="+0.8%" trend="up" icon={<Star size={24} />} color="yellow" />
        <KpiCard title="Mortalidade" value="1.9%" change="-0.1%" trend="down" icon={<Heart size={24} />} color="red" />
        <KpiCard title="Margem EBITDA" value="21.2%" change="+0.6%" trend="up" icon={<TrendingUp size={24} />} color="cyan" />
      </div>

      {/* Performance Integrada */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card className="bg-gray-800/50 border border-gray-700">
          <CardHeader><CardTitle className="text-white">Performance Hospitalar Integrada</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={performanceGeral}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip formatter={(value, name) => [
                  name === 'receita' ? `R$ ${(Number(value)/1000000).toFixed(2)}M` :
                  name === 'pacientes' ? `${(Number(value)/1000).toFixed(1)}k` :
                  `${value}%`, ''
                ]} />
                <Legend />
                <Area type="monotone" dataKey="receita" stackId="1" stroke="#4ECDC4" fill="#4ECDC4" fillOpacity={0.3} name="Receita" />
                <Line type="monotone" dataKey="ocupacao" stroke="#00C49F" strokeWidth={3} name="Ocupação %" />
                <Line type="monotone" dataKey="satisfacao" stroke="#8884d8" strokeWidth={3} name="Satisfação %" />
                <Line type="monotone" dataKey="mortalidade" stroke="#FF6B6B" strokeWidth={2} name="Mortalidade %" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border border-gray-700">
          <CardHeader><CardTitle className="text-white">Receitas por Fonte de Pagamento</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={indicadoresFinanceiros}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ categoria, percentual }) => `${categoria}: ${percentual}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="valor"
                >
                  {indicadoresFinanceiros.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`R$ ${(Number(value)/1000000).toFixed(2)}M`, '']} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Acesso Rápido aos Setores */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <Card className="bg-gray-800/50 border border-gray-700 lg:col-span-2">
          <CardHeader><CardTitle className="text-white">Acesso Rápido aos Setores Hospitalares</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <Link to="/gestao-clinica" className="block">
                <div className="p-4 bg-blue-900/30 rounded-lg hover:bg-blue-900/50 transition-colors">
                  <Stethoscope className="h-8 w-8 text-blue-400 mb-2" />
                  <h3 className="text-white font-medium">Gestão Clínica</h3>
                  <p className="text-gray-400 text-sm">548 pacientes • 84.2% ocupação</p>
                </div>
              </Link>
              <Link to="/centro-cirurgico" className="block">
                <div className="p-4 bg-red-900/30 rounded-lg hover:bg-red-900/50 transition-colors">
                  <Scissors className="h-8 w-8 text-red-400 mb-2" />
                  <h3 className="text-white font-medium">Centro Cirúrgico</h3>
                  <p className="text-gray-400 text-sm">421 cirurgias • 90.2% ocupação</p>
                </div>
              </Link>
              <Link to="/uti-terapia-intensiva" className="block">
                <div className="p-4 bg-purple-900/30 rounded-lg hover:bg-purple-900/50 transition-colors">
                  <Heart className="h-8 w-8 text-purple-400 mb-2" />
                  <h3 className="text-white font-medium">UTI</h3>
                  <p className="text-gray-400 text-sm">54 pacientes • 87.5% ocupação</p>
                </div>
              </Link>
              <Link to="/analises-laboratoriais" className="block">
                <div className="p-4 bg-cyan-900/30 rounded-lg hover:bg-cyan-900/50 transition-colors">
                  <TestTube className="h-8 w-8 text-cyan-400 mb-2" />
                  <h3 className="text-white font-medium">Laboratório</h3>
                  <p className="text-gray-400 text-sm">33.6k exames • 99.4% precisão</p>
                </div>
              </Link>
              <Link to="/gestao-farmaceutica" className="block">
                <div className="p-4 bg-green-900/30 rounded-lg hover:bg-green-900/50 transition-colors">
                  <Pill className="h-8 w-8 text-green-400 mb-2" />
                  <h3 className="text-white font-medium">Farmácia</h3>
                  <p className="text-gray-400 text-sm">R$ 1.39M estoque • 2.6x giro</p>
                </div>
              </Link>
              <Link to="/indicadores-qualidade" className="block">
                <div className="p-4 bg-yellow-900/30 rounded-lg hover:bg-yellow-900/50 transition-colors">
                  <Shield className="h-8 w-8 text-yellow-400 mb-2" />
                  <h3 className="text-white font-medium">Qualidade</h3>
                  <p className="text-gray-400 text-sm">ONA Nível 3 • 91% satisfação</p>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border border-gray-700">
          <CardHeader><CardTitle className="text-white">Indicadores Críticos</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-green-900/30 rounded-lg">
                <h4 className="text-green-300 font-medium text-sm">Performance Geral</h4>
                <p className="text-white text-lg font-bold">Excelente</p>
                <p className="text-green-400 text-xs">Top 5% nacional</p>
              </div>
              <div className="p-3 bg-blue-900/30 rounded-lg">
                <h4 className="text-blue-300 font-medium text-sm">Acreditação</h4>
                <p className="text-white text-lg font-bold">ONA Nível 3</p>
                <p className="text-blue-400 text-xs">Certificado até Dez/2024</p>
              </div>
              <div className="p-3 bg-purple-900/30 rounded-lg">
                <h4 className="text-purple-300 font-medium text-sm">Benchmark</h4>
                <p className="text-white text-lg font-bold">95° Percentil</p>
                <p className="text-purple-400 text-xs">Acima da média nacional</p>
              </div>
              <div className="p-3 bg-orange-900/30 rounded-lg">
                <h4 className="text-orange-300 font-medium text-sm">Economia IA</h4>
                <p className="text-white text-lg font-bold">R$ 515k</p>
                <p className="text-orange-400 text-xs">+15% vs mês anterior</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alertas e Acesso Rápido */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-gray-800/50 border border-gray-700">
          <CardHeader><CardTitle className="text-white">Alertas Executivos</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 bg-green-900/20 border border-green-800 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                <div>
                  <p className="text-green-300 text-sm font-medium">Meta Atingida</p>
                  <p className="text-green-400 text-xs">Satisfação &gt; 90% • Margem EBITDA &gt; 18%</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-blue-900/20 border border-blue-800 rounded-lg">
                <TrendingUp className="h-5 w-5 text-blue-400 mt-0.5" />
                <div>
                  <p className="text-blue-300 text-sm font-medium">Crescimento</p>
                  <p className="text-blue-400 text-xs">Receita +4.4% • Pacientes +4.7%</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-yellow-900/20 border border-yellow-800 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-yellow-400 mt-0.5" />
                <div>
                  <p className="text-yellow-300 text-sm font-medium">Atenção</p>
                  <p className="text-yellow-400 text-xs">5 medicamentos em falta • 2 equipamentos manutenção</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border border-gray-700">
          <CardHeader><CardTitle className="text-white">Acesso Rápido - Analytics</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Link to="/dashboard-financeiro" className="block">
                <div className="p-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white rounded-lg transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Dashboard Financeiro</span>
                    <DollarSign size={16} />
                  </div>
                  <p className="text-xs opacity-80 mt-1">R$ 5.43M receita • 21.2% margem</p>
                </div>
              </Link>
              <Link to="/relatorios-analytics" className="block">
                <div className="p-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Relatórios & Analytics</span>
                    <BarChart3 size={16} />
                  </div>
                  <p className="text-xs opacity-80 mt-1">156 relatórios • 702 downloads</p>
                </div>
              </Link>
              <Link to="/ai-analytics" className="block">
                <div className="p-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">AI Analytics</span>
                    <Brain size={16} />
                  </div>
                  <p className="text-xs opacity-80 mt-1">25 modelos • 94.2% precisão</p>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
