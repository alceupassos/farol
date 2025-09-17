import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Pill, Package, AlertTriangle, TrendingUp, DollarSign, Clock, Shield, Activity, Target, Zap } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';

const KpiCard = ({ title, value, change, trend, icon, color = 'green' }: { 
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

const estoqueValor = [
  { mes: 'Jan', medicamentos: 850000, opme: 240000, total: 1090000, giro: 2.1 },
  { mes: 'Fev', medicamentos: 920000, opme: 260000, total: 1180000, giro: 2.3 },
  { mes: 'Mar', medicamentos: 980000, opme: 280000, total: 1260000, giro: 2.2 },
  { mes: 'Abr', medicamentos: 950000, opme: 270000, total: 1220000, giro: 2.4 },
  { mes: 'Mai', medicamentos: 1020000, opme: 290000, total: 1310000, giro: 2.5 },
  { mes: 'Jun', medicamentos: 1080000, opme: 310000, total: 1390000, giro: 2.6 }
];

const consumoMedicamentos = [
  { categoria: 'Antibióticos', valor: 180000, percentual: 32.7, economia: 15000 },
  { categoria: 'Analgésicos', valor: 95000, percentual: 17.3, economia: 8000 },
  { categoria: 'Cardiovasculares', valor: 85000, percentual: 15.5, economia: 12000 },
  { categoria: 'Oncológicos', valor: 75000, percentual: 13.6, economia: 25000 },
  { categoria: 'Neurológicos', valor: 60000, percentual: 10.9, economia: 7000 },
  { categoria: 'Outros', valor: 55000, percentual: 10.0, economia: 5000 }
];

const opmeRastreabilidade = [
  { item: 'Stents Cardíacos', quantidade: 45, valor_unitario: 3500, total: 157500, rastreado: 100 },
  { item: 'Próteses Ortopédicas', quantidade: 23, valor_unitario: 8500, total: 195500, rastreado: 100 },
  { item: 'Marcapassos', quantidade: 12, valor_unitario: 15000, total: 180000, rastreado: 100 },
  { item: 'Válvulas Cardíacas', quantidade: 8, valor_unitario: 25000, total: 200000, rastreado: 100 },
  { item: 'Implantes Neurológicos', quantidade: 6, valor_unitario: 35000, total: 210000, rastreado: 100 }
];

const alertasEstoque = [
  { medicamento: 'Vancomicina 500mg', estoque_atual: 45, estoque_minimo: 100, dias_restantes: 3, criticidade: 'alta' },
  { medicamento: 'Noradrenalina 4mg', estoque_atual: 12, estoque_minimo: 50, dias_restantes: 2, criticidade: 'crítica' },
  { medicamento: 'Propofol 200mg', estoque_atual: 78, estoque_minimo: 150, dias_restantes: 5, criticidade: 'média' },
  { medicamento: 'Fentanil 250mcg', estoque_atual: 23, estoque_minimo: 80, dias_restantes: 4, criticidade: 'alta' },
  { medicamento: 'Midazolam 15mg', estoque_atual: 156, estoque_minimo: 200, dias_restantes: 8, criticidade: 'baixa' }
];

const economiaCompras = [
  { mes: 'Jan', economia_medicamentos: 65000, economia_opme: 24000, total: 89000, percentual: 12.5 },
  { mes: 'Fev', economia_medicamentos: 72000, economia_opme: 28000, total: 100000, percentual: 13.2 },
  { mes: 'Mar', economia_medicamentos: 68000, economia_opme: 31000, total: 99000, percentual: 12.8 },
  { mes: 'Abr', economia_medicamentos: 75000, economia_opme: 29000, total: 104000, percentual: 13.5 },
  { mes: 'Mai', economia_medicamentos: 78000, economia_opme: 33000, total: 111000, percentual: 14.1 },
  { mes: 'Jun', economia_medicamentos: 82000, economia_opme: 35000, total: 117000, percentual: 14.8 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const GestaoFarmaceuticaPage = () => {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center">
            <Pill className="h-10 w-10 mr-4 text-green-400" />
            Gestão Farmacêutica
          </h1>
          <p className="text-gray-400 text-lg mb-4">
            Farmácia Hospitalar - Medicamentos, OPME, Rastreabilidade e Controle de Estoque
          </p>
          <div className="bg-green-900/20 border border-green-800 rounded-lg p-4">
            <p className="text-green-200 text-sm leading-relaxed">
              <strong>Para o Executivo Municipal:</strong> Painel executivo da farmácia hospitalar com gestão completa de medicamentos, 
              OPME (Órteses, Próteses e Materiais Especiais), rastreabilidade 100%, controle de estoque, economia de compras e 
              conformidade regulatória. Monitore giro de estoque, alertas críticos, custos por categoria e sustentabilidade financeira.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
          <KpiCard title="Valor Estoque Total" value="R$ 1.39M" change="+6.1%" trend="up" icon={<Package size={24} />} color="green" />
          <KpiCard title="Consumo Mensal" value="R$ 550k" change="+2.8%" trend="up" icon={<TrendingUp size={24} />} color="blue" />
          <KpiCard title="Itens em Falta" value="5" change="-58%" trend="down" icon={<AlertTriangle size={24} />} color="orange" />
          <KpiCard title="Economia Total" value="R$ 117k" change="+5.4%" trend="up" icon={<DollarSign size={24} />} color="purple" />
          <KpiCard title="Giro de Estoque" value="2.6x" change="+0.1" trend="up" icon={<Activity size={24} />} color="cyan" />
          <KpiCard title="Rastreabilidade OPME" value="100%" change="0%" trend="up" icon={<Shield size={24} />} color="yellow" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader><CardTitle className="text-white">Evolução do Valor do Estoque</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={estoqueValor}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`R$ ${(Number(value)/1000).toFixed(0)}k`, '']} />
                  <Legend />
                  <Area type="monotone" dataKey="medicamentos" stackId="1" stroke="#4ECDC4" fill="#4ECDC4" name="Medicamentos" />
                  <Area type="monotone" dataKey="opme" stackId="1" stroke="#00C49F" fill="#00C49F" name="OPME" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader><CardTitle className="text-white">Consumo por Categoria de Medicamentos</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={consumoMedicamentos}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ categoria, percentual }) => `${categoria}: ${percentual}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="valor"
                  >
                    {consumoMedicamentos.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`R$ ${(Number(value)/1000).toFixed(0)}k`, '']} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader><CardTitle className="text-white">OPME - Rastreabilidade 100%</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-4">
                {opmeRastreabilidade.map((item, index) => (
                  <div key={index} className="p-4 bg-gray-700/30 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-white font-medium text-sm">{item.item}</h4>
                      <span className="px-2 py-1 bg-green-600 text-white rounded text-xs">
                        {item.rastreado}% RASTREADO
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Quantidade</p>
                        <p className="text-white font-bold">{item.quantidade}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Valor Unit.</p>
                        <p className="text-white font-bold">R$ {(item.valor_unitario/1000).toFixed(1)}k</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Total</p>
                        <p className="text-white font-bold">R$ {(item.total/1000).toFixed(0)}k</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader><CardTitle className="text-white">Economia em Compras</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={economiaCompras}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip formatter={(value, name) => [
                    name === 'percentual' ? `${value}%` : `R$ ${(Number(value)/1000).toFixed(0)}k`, ''
                  ]} />
                  <Legend />
                  <Line type="monotone" dataKey="economia_medicamentos" stroke="#4ECDC4" name="Medicamentos" strokeWidth={2} />
                  <Line type="monotone" dataKey="economia_opme" stroke="#00C49F" name="OPME" strokeWidth={2} />
                  <Line type="monotone" dataKey="total" stroke="#8884d8" name="Total" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader><CardTitle className="text-white">Alertas Críticos de Estoque</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alertasEstoque.map((alerta, index) => (
                  <div key={index} className="p-4 bg-gray-700/30 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-white font-medium text-sm">{alerta.medicamento}</h4>
                      <span className={`px-2 py-1 rounded text-xs ${
                        alerta.criticidade === 'crítica' ? 'bg-red-600 text-white' :
                        alerta.criticidade === 'alta' ? 'bg-orange-600 text-white' :
                        alerta.criticidade === 'média' ? 'bg-yellow-600 text-black' :
                        'bg-blue-600 text-white'
                      }`}>
                        {alerta.criticidade.toUpperCase()}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Atual</p>
                        <p className="text-white font-bold">{alerta.estoque_atual}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Mínimo</p>
                        <p className="text-white font-bold">{alerta.estoque_minimo}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Dias Rest.</p>
                        <p className="text-white font-bold">{alerta.dias_restantes}</p>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="w-full bg-gray-600 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            alerta.criticidade === 'crítica' ? 'bg-red-400' :
                            alerta.criticidade === 'alta' ? 'bg-orange-400' :
                            alerta.criticidade === 'média' ? 'bg-yellow-400' :
                            'bg-blue-400'
                          }`}
                          style={{ width: `${(alerta.estoque_atual/alerta.estoque_minimo)*100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader><CardTitle className="text-white">Giro de Estoque por Categoria</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={[
                  { categoria: 'Antibióticos', giro: 3.2, meta: 3.0 },
                  { categoria: 'Analgésicos', giro: 2.8, meta: 2.5 },
                  { categoria: 'Cardiovasculares', giro: 2.1, meta: 2.0 },
                  { categoria: 'Oncológicos', giro: 1.8, meta: 1.5 },
                  { categoria: 'OPME', giro: 2.6, meta: 2.0 }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="categoria" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="giro" fill="#4ECDC4" name="Giro Atual" />
                  <Bar dataKey="meta" fill="#8884d8" name="Meta" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader><CardTitle className="text-white">Metas Farmácia</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">Giro &gt; 2.5x</span>
                    <span className="text-green-400">104% da meta</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-green-400 h-2 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">Economia &gt; R$ 100k</span>
                    <span className="text-green-400">117% da meta</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-green-400 h-2 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">Rastreabilidade 100%</span>
                    <span className="text-green-400">100% da meta</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-green-400 h-2 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader><CardTitle className="text-white">Conformidade</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-green-900/30 rounded-lg">
                  <h4 className="text-green-300 font-medium text-sm">ANVISA</h4>
                  <p className="text-white text-lg font-bold">100%</p>
                  <p className="text-green-400 text-xs">Conformidade total</p>
                </div>
                <div className="p-3 bg-blue-900/30 rounded-lg">
                  <h4 className="text-blue-300 font-medium text-sm">Rastreabilidade</h4>
                  <p className="text-white text-lg font-bold">100%</p>
                  <p className="text-blue-400 text-xs">OPME rastreados</p>
                </div>
                <div className="p-3 bg-purple-900/30 rounded-lg">
                  <h4 className="text-purple-300 font-medium text-sm">Validade</h4>
                  <p className="text-white text-lg font-bold">99.8%</p>
                  <p className="text-purple-400 text-xs">Controle de vencimento</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader><CardTitle className="text-white">Alertas Farmácia</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-red-900/20 border border-red-800 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5" />
                  <div>
                    <p className="text-red-300 text-sm font-medium">Estoque Crítico</p>
                    <p className="text-red-400 text-xs">Noradrenalina: 2 dias</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-yellow-900/20 border border-yellow-800 rounded-lg">
                  <Clock className="h-5 w-5 text-yellow-400 mt-0.5" />
                  <div>
                    <p className="text-yellow-300 text-sm font-medium">Vencimento</p>
                    <p className="text-yellow-400 text-xs">12 itens vencem em 30 dias</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-green-900/20 border border-green-800 rounded-lg">
                  <Shield className="h-5 w-5 text-green-400 mt-0.5" />
                  <div>
                    <p className="text-green-300 text-sm font-medium">OPME OK</p>
                    <p className="text-green-400 text-xs">100% rastreabilidade</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader><CardTitle className="text-white">Performance</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-green-900/30 rounded-lg">
                  <h4 className="text-green-300 font-medium text-sm">Economia Mensal</h4>
                  <p className="text-white text-lg font-bold">R$ 117k</p>
                  <p className="text-green-400 text-xs">14.8% economia total</p>
                </div>
                <div className="p-3 bg-blue-900/30 rounded-lg">
                  <h4 className="text-blue-300 font-medium text-sm">Giro Estoque</h4>
                  <p className="text-white text-lg font-bold">2.6x</p>
                  <p className="text-blue-400 text-xs">Acima da meta (2.5x)</p>
                </div>
                <div className="p-3 bg-purple-900/30 rounded-lg">
                  <h4 className="text-purple-300 font-medium text-sm">Valor Total</h4>
                  <p className="text-white text-lg font-bold">R$ 1.39M</p>
                  <p className="text-purple-400 text-xs">Estoque otimizado</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default GestaoFarmaceuticaPage;
