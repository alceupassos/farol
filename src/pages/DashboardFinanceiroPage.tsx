import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, TrendingUp, FileText, CreditCard, AlertTriangle, CheckCircle, BarChart3, PieChart } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart as RechartsPieChart, Pie, Cell, AreaChart, Area } from 'recharts';

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

const receitaData = [
  { mes: 'Jan', sus: 2800000, convenios: 1200000, particular: 450000, total: 4450000 },
  { mes: 'Fev', sus: 2950000, convenios: 1350000, particular: 480000, total: 4780000 },
  { mes: 'Mar', sus: 3100000, convenios: 1400000, particular: 520000, total: 5020000 },
  { mes: 'Abr', sus: 2980000, convenios: 1380000, particular: 490000, total: 4850000 },
  { mes: 'Mai', sus: 3200000, convenios: 1450000, particular: 550000, total: 5200000 },
  { mes: 'Jun', sus: 3350000, convenios: 1500000, particular: 580000, total: 5430000 }
];

const custosData = [
  { categoria: 'Pessoal', valor: 2100000, percentual: 42.5 },
  { categoria: 'Medicamentos', valor: 980000, percentual: 19.8 },
  { categoria: 'Materiais', valor: 650000, percentual: 13.1 },
  { categoria: 'Equipamentos', valor: 420000, percentual: 8.5 },
  { categoria: 'Infraestrutura', valor: 380000, percentual: 7.7 },
  { categoria: 'Outros', valor: 410000, percentual: 8.4 }
];

const fluxoCaixaData = [
  { dia: '1-7', entradas: 1200000, saidas: 980000, saldo: 220000 },
  { dia: '8-14', entradas: 1350000, saidas: 1100000, saldo: 250000 },
  { dia: '15-21', entradas: 1180000, saidas: 1050000, saldo: 130000 },
  { dia: '22-28', entradas: 1420000, saidas: 1200000, saldo: 220000 }
];

const indicadoresFinanceirosData = [
  { mes: 'Jan', margem: 16.8, liquidez: 1.45, endividamento: 32.5, giro: 2.1 },
  { mes: 'Fev', margem: 17.2, liquidez: 1.52, endividamento: 31.8, giro: 2.3 },
  { mes: 'Mar', margem: 17.8, liquidez: 1.48, endividamento: 30.9, giro: 2.2 },
  { mes: 'Abr', margem: 17.5, liquidez: 1.55, endividamento: 29.8, giro: 2.4 },
  { mes: 'Mai', margem: 18.1, liquidez: 1.62, endividamento: 28.9, giro: 2.5 },
  { mes: 'Jun', margem: 18.7, liquidez: 1.68, endividamento: 27.8, giro: 2.6 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const DashboardFinanceiroPage = () => {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center">
            <DollarSign className="h-10 w-10 mr-4 text-blue-400" />
            Dashboard Financeiro
          </h1>
          <p className="text-gray-400 text-lg mb-4">
            Gestão Financeira Hospitalar - Receitas, Custos e Indicadores Econômicos
          </p>
          <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-4">
            <p className="text-blue-200 text-sm leading-relaxed">
              <strong>Para o Gestor Municipal:</strong> Dashboard financeiro completo com análise de receitas (SUS, convênios, particular), 
              controle de custos, fluxo de caixa, margem EBITDA e indicadores de sustentabilidade financeira. 
              Monitore a saúde econômica do hospital e tome decisões estratégicas baseadas em dados.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KpiCard title="Receita Total (Mês)" value="R$ 5.43M" change="+4.4%" trend="up" icon={<DollarSign size={24} />} color="blue" />
          <KpiCard title="Margem EBITDA" value="18.7%" change="+0.6%" trend="up" icon={<TrendingUp size={24} />} color="green" />
          <KpiCard title="Liquidez Corrente" value="1.68" change="+0.06" trend="up" icon={<CreditCard size={24} />} color="purple" />
          <KpiCard title="Endividamento" value="27.8%" change="-1.1%" trend="down" icon={<BarChart3 size={24} />} color="orange" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader><CardTitle className="text-white">Evolução da Receita por Fonte</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={receitaData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`R$ ${(Number(value)/1000000).toFixed(2)}M`, '']} />
                  <Legend />
                  <Area type="monotone" dataKey="sus" stackId="1" stroke="#4ECDC4" fill="#4ECDC4" name="SUS" />
                  <Area type="monotone" dataKey="convenios" stackId="1" stroke="#00C49F" fill="#00C49F" name="Convênios" />
                  <Area type="monotone" dataKey="particular" stackId="1" stroke="#FFBB28" fill="#FFBB28" name="Particular" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader><CardTitle className="text-white">Distribuição de Custos</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPieChart>
                  <Pie
                    data={custosData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ categoria, percentual }) => `${categoria}: ${percentual}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="valor"
                  >
                    {custosData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`R$ ${(Number(value)/1000000).toFixed(2)}M`, '']} />
                </RechartsPieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader><CardTitle className="text-white">Fluxo de Caixa Semanal</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={fluxoCaixaData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="dia" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`R$ ${(Number(value)/1000000).toFixed(2)}M`, '']} />
                  <Legend />
                  <Bar dataKey="entradas" fill="#4ECDC4" name="Entradas" />
                  <Bar dataKey="saidas" fill="#FF6B6B" name="Saídas" />
                  <Bar dataKey="saldo" fill="#00C49F" name="Saldo" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader><CardTitle className="text-white">Indicadores Financeiros</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={indicadoresFinanceirosData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="margem" stroke="#4ECDC4" name="Margem %" strokeWidth={2} />
                  <Line type="monotone" dataKey="liquidez" stroke="#00C49F" name="Liquidez" strokeWidth={2} />
                  <Line type="monotone" dataKey="endividamento" stroke="#FF6B6B" name="Endividamento %" strokeWidth={2} />
                  <Line type="monotone" dataKey="giro" stroke="#FFBB28" name="Giro do Ativo" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader><CardTitle className="text-white">Metas Financeiras</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">Receita Anual</span>
                    <span className="text-green-400">87.2% da meta</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-green-400 h-2 rounded-full" style={{ width: '87.2%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">Margem EBITDA</span>
                    <span className="text-blue-400">93.5% da meta</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-400 h-2 rounded-full" style={{ width: '93.5%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">Redução Custos</span>
                    <span className="text-purple-400">78.3% da meta</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-purple-400 h-2 rounded-full" style={{ width: '78.3%' }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader><CardTitle className="text-white">Alertas Financeiros</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-yellow-900/20 border border-yellow-800 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-yellow-400 mt-0.5" />
                  <div>
                    <p className="text-yellow-300 text-sm font-medium">Prazo de Pagamento</p>
                    <p className="text-yellow-400 text-xs">Fornecedores: 45 dias (meta: 30)</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-green-900/20 border border-green-800 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                  <div>
                    <p className="text-green-300 text-sm font-medium">Meta Atingida</p>
                    <p className="text-green-400 text-xs">Margem EBITDA acima de 18%</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-blue-900/20 border border-blue-800 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-blue-400 mt-0.5" />
                  <div>
                    <p className="text-blue-300 text-sm font-medium">Crescimento</p>
                    <p className="text-blue-400 text-xs">Receita +4.4% vs mês anterior</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader><CardTitle className="text-white">Resumo Executivo</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-blue-900/30 rounded-lg">
                  <h4 className="text-blue-300 font-medium text-sm">Receita Total</h4>
                  <p className="text-white text-lg font-bold">R$ 5.43M</p>
                  <p className="text-blue-400 text-xs">+4.4% vs mês anterior</p>
                </div>
                <div className="p-3 bg-green-900/30 rounded-lg">
                  <h4 className="text-green-300 font-medium text-sm">Margem Operacional</h4>
                  <p className="text-white text-lg font-bold">18.7%</p>
                  <p className="text-green-400 text-xs">Acima da meta (18%)</p>
                </div>
                <div className="p-3 bg-purple-900/30 rounded-lg">
                  <h4 className="text-purple-300 font-medium text-sm">Liquidez</h4>
                  <p className="text-white text-lg font-bold">1.68</p>
                  <p className="text-purple-400 text-xs">Situação financeira saudável</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default DashboardFinanceiroPage;
