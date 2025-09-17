import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TestTube, Users, Clock, CheckCircle, TrendingUp, AlertTriangle, Activity, Target, Microscope, Beaker } from 'lucide-react';
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

const producaoLaboratorial = [
  { mes: 'Jan', bioquimica: 12500, hematologia: 8900, microbiologia: 3200, imunologia: 2100, anatomia: 890, total: 27590 },
  { mes: 'Fev', bioquimica: 13200, hematologia: 9200, microbiologia: 3400, imunologia: 2200, anatomia: 920, total: 28920 },
  { mes: 'Mar', bioquimica: 13800, hematologia: 9500, microbiologia: 3600, imunologia: 2350, anatomia: 980, total: 30230 },
  { mes: 'Abr', bioquimica: 14100, hematologia: 9800, microbiologia: 3750, imunologia: 2400, anatomia: 1020, total: 31070 },
  { mes: 'Mai', bioquimica: 14500, hematologia: 10100, microbiologia: 3900, imunologia: 2500, anatomia: 1080, total: 32080 },
  { mes: 'Jun', bioquimica: 15200, hematologia: 10500, microbiologia: 4100, imunologia: 2650, anatomia: 1150, total: 33600 }
];

const tempoResultados = [
  { exame: 'Hemograma', tempo_atual: 2.5, meta: 4.0, urgencia: 1.0, volume_dia: 450 },
  { exame: 'Glicemia', tempo_atual: 1.8, meta: 2.0, urgencia: 0.5, volume_dia: 320 },
  { exame: 'Creatinina', tempo_atual: 3.2, meta: 4.0, urgencia: 1.5, volume_dia: 280 },
  { exame: 'Troponina', tempo_atual: 1.5, meta: 2.0, urgencia: 0.8, volume_dia: 85 },
  { exame: 'Gasometria', tempo_atual: 0.8, meta: 1.0, urgencia: 0.3, volume_dia: 120 },
  { exame: 'Cultura', tempo_atual: 48.0, meta: 72.0, urgencia: 24.0, volume_dia: 45 }
];

const examesCriticos = [
  { exame: 'Troponina Elevada', casos: 23, percentual: 2.8, acao: 'Cardiologia', tempo_medio: 1.2 },
  { exame: 'Creatinina Alta', casos: 45, percentual: 5.1, acao: 'Nefrologia', tempo_medio: 2.5 },
  { exame: 'Leucocitose', casos: 67, percentual: 7.8, acao: 'Infectologia', tempo_medio: 3.1 },
  { exame: 'Anemia Severa', casos: 34, percentual: 4.2, acao: 'Hematologia', tempo_medio: 4.0 },
  { exame: 'Hipoglicemia', casos: 12, percentual: 1.5, acao: 'Endocrinologia', tempo_medio: 0.8 }
];

const custosLaboratorio = [
  { categoria: 'Reagentes', valor: 450000, percentual: 45.2, variacao: -2.1 },
  { categoria: 'Equipamentos', valor: 280000, percentual: 28.1, variacao: 1.5 },
  { categoria: 'Pessoal', valor: 180000, percentual: 18.1, variacao: 0.8 },
  { categoria: 'Manutenção', valor: 85000, percentual: 8.5, variacao: -1.2 }
];

const qualidadeLaboratorio = [
  { mes: 'Jan', precisao: 98.5, exatidao: 97.8, cv: 2.1, controle_qualidade: 99.2 },
  { mes: 'Fev', precisao: 98.7, exatidao: 98.1, cv: 1.9, controle_qualidade: 99.4 },
  { mes: 'Mar', precisao: 98.9, exatidao: 98.3, cv: 1.8, controle_qualidade: 99.5 },
  { mes: 'Abr', precisao: 99.1, exatidao: 98.5, cv: 1.7, controle_qualidade: 99.6 },
  { mes: 'Mai', precisao: 99.2, exatidao: 98.7, cv: 1.6, controle_qualidade: 99.7 },
  { mes: 'Jun', precisao: 99.4, exatidao: 98.9, cv: 1.5, controle_qualidade: 99.8 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const AnalisesLaboratoriaisPage = () => {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center">
            <TestTube className="h-10 w-10 mr-4 text-cyan-400" />
            Análises Laboratoriais
          </h1>
          <p className="text-gray-400 text-lg mb-4">
            Laboratório Clínico - Bioquímica, Hematologia, Microbiologia e Anatomia Patológica
          </p>
          <div className="bg-cyan-900/20 border border-cyan-800 rounded-lg p-4">
            <p className="text-cyan-200 text-sm leading-relaxed">
              <strong>Para o Executivo Municipal:</strong> Painel executivo do laboratório clínico com monitoramento completo de produção, 
              tempos de resultado, qualidade analítica, custos operacionais e valores críticos. Acompanhe performance por setor, 
              precisão/exatidão, controle de qualidade, gestão de reagentes e indicadores de eficiência para tomada de decisão estratégica.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
          <KpiCard title="Exames/Mês" value="33.6k" change="+4.7%" trend="up" icon={<TestTube size={24} />} color="cyan" />
          <KpiCard title="Tempo Médio Resultado" value="3.2h" change="-0.3h" trend="down" icon={<Clock size={24} />} color="blue" />
          <KpiCard title="Precisão Analítica" value="99.4%" change="+0.2%" trend="up" icon={<Target size={24} />} color="green" />
          <KpiCard title="Controle Qualidade" value="99.8%" change="+0.1%" trend="up" icon={<CheckCircle size={24} />} color="purple" />
          <KpiCard title="Valores Críticos" value="181" change="-8%" trend="down" icon={<AlertTriangle size={24} />} color="orange" />
          <KpiCard title="Custo/Exame" value="R$ 29.60" change="-1.2%" trend="down" icon={<Activity size={24} />} color="yellow" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader><CardTitle className="text-white">Produção Laboratorial por Setor</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={producaoLaboratorial}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value} exames`, '']} />
                  <Legend />
                  <Area type="monotone" dataKey="bioquimica" stackId="1" stroke="#4ECDC4" fill="#4ECDC4" name="Bioquímica" />
                  <Area type="monotone" dataKey="hematologia" stackId="1" stroke="#00C49F" fill="#00C49F" name="Hematologia" />
                  <Area type="monotone" dataKey="microbiologia" stackId="1" stroke="#FFBB28" fill="#FFBB28" name="Microbiologia" />
                  <Area type="monotone" dataKey="imunologia" stackId="1" stroke="#FF8042" fill="#FF8042" name="Imunologia" />
                  <Area type="monotone" dataKey="anatomia" stackId="1" stroke="#8884d8" fill="#8884d8" name="Anatomia Patológica" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader><CardTitle className="text-white">Tempo de Resultado por Exame</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={tempoResultados}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="exame" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip formatter={(value, name) => [
                    name === 'tempo_atual' || name === 'meta' ? `${value}h` : 
                    name === 'urgencia' ? `${value}h (urgência)` : 
                    `${value}/dia`, ''
                  ]} />
                  <Legend />
                  <Bar dataKey="tempo_atual" fill="#4ECDC4" name="Tempo Atual (h)" />
                  <Bar dataKey="meta" fill="#8884d8" name="Meta (h)" />
                  <Bar dataKey="urgencia" fill="#FF6B6B" name="Urgência (h)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader><CardTitle className="text-white">Valores Críticos por Tipo</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-4">
                {examesCriticos.map((critico, index) => (
                  <div key={index} className="p-4 bg-gray-700/30 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-white font-medium text-sm">{critico.exame}</h4>
                      <span className="px-2 py-1 bg-red-600 text-white rounded text-xs">
                        CRÍTICO
                      </span>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Casos</p>
                        <p className="text-white font-bold">{critico.casos}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">% Total</p>
                        <p className="text-white font-bold">{critico.percentual}%</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Ação</p>
                        <p className="text-white font-bold">{critico.acao}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Tempo Médio</p>
                        <p className="text-white font-bold">{critico.tempo_medio}h</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader><CardTitle className="text-white">Custos Operacionais do Laboratório</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={custosLaboratorio}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ categoria, percentual }) => `${categoria}: ${percentual}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="valor"
                  >
                    {custosLaboratorio.map((entry, index) => (
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
            <CardHeader><CardTitle className="text-white">Evolução da Qualidade Analítica</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={qualidadeLaboratorio}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis domain={[95, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="precisao" stroke="#4ECDC4" name="Precisão %" strokeWidth={2} />
                  <Line type="monotone" dataKey="exatidao" stroke="#00C49F" name="Exatidão %" strokeWidth={2} />
                  <Line type="monotone" dataKey="controle_qualidade" stroke="#8884d8" name="Controle Qualidade %" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader><CardTitle className="text-white">Distribuição de Exames por Urgência</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Rotina', value: 28500, tempo: '4-8h' },
                      { name: 'Urgência', value: 4200, tempo: '1-2h' },
                      { name: 'Emergência', value: 900, tempo: '<1h' }
                    ]}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {['#4ECDC4', '#FFE66D', '#FF6B6B'].map((color, index) => (
                      <Cell key={`cell-${index}`} fill={color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name, props) => [
                    `${value} exames`, 
                    `Tempo: ${props.payload.tempo}`
                  ]} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader><CardTitle className="text-white">Metas Laboratoriais</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">Precisão &gt; 99%</span>
                    <span className="text-green-400">100.4% da meta</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-green-400 h-2 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">Tempo &lt; 4h</span>
                    <span className="text-green-400">80% da meta</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-green-400 h-2 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">Custo &lt; R$ 30</span>
                    <span className="text-green-400">98.7% da meta</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-green-400 h-2 rounded-full" style={{ width: '98.7%' }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader><CardTitle className="text-white">Equipamentos Lab</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-green-900/30 rounded-lg">
                  <h4 className="text-green-300 font-medium text-sm">Analisadores</h4>
                  <p className="text-white text-lg font-bold">12/14</p>
                  <p className="text-green-400 text-xs">85.7% funcionando</p>
                </div>
                <div className="p-3 bg-blue-900/30 rounded-lg">
                  <h4 className="text-blue-300 font-medium text-sm">Microscópios</h4>
                  <p className="text-white text-lg font-bold">8/8</p>
                  <p className="text-blue-400 text-xs">100% funcionando</p>
                </div>
                <div className="p-3 bg-purple-900/30 rounded-lg">
                  <h4 className="text-purple-300 font-medium text-sm">Centrífugas</h4>
                  <p className="text-white text-lg font-bold">6/6</p>
                  <p className="text-purple-400 text-xs">100% funcionando</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader><CardTitle className="text-white">Alertas Laboratório</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-red-900/20 border border-red-800 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5" />
                  <div>
                    <p className="text-red-300 text-sm font-medium">Reagente Baixo</p>
                    <p className="text-red-400 text-xs">Troponina: 2 dias estoque</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-yellow-900/20 border border-yellow-800 rounded-lg">
                  <Clock className="h-5 w-5 text-yellow-400 mt-0.5" />
                  <div>
                    <p className="text-yellow-300 text-sm font-medium">Manutenção</p>
                    <p className="text-yellow-400 text-xs">Analisador 3 - preventiva</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-green-900/20 border border-green-800 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                  <div>
                    <p className="text-green-300 text-sm font-medium">Meta Atingida</p>
                    <p className="text-green-400 text-xs">Precisão &gt; 99%</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader><CardTitle className="text-white">Performance Lab</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-cyan-900/30 rounded-lg">
                  <h4 className="text-cyan-300 font-medium text-sm">Produtividade</h4>
                  <p className="text-white text-lg font-bold">1,120 exames/dia</p>
                  <p className="text-cyan-400 text-xs">+4.7% vs mês anterior</p>
                </div>
                <div className="p-3 bg-green-900/30 rounded-lg">
                  <h4 className="text-green-300 font-medium text-sm">Qualidade</h4>
                  <p className="text-white text-lg font-bold">99.8%</p>
                  <p className="text-green-400 text-xs">Controle de qualidade</p>
                </div>
                <div className="p-3 bg-blue-900/30 rounded-lg">
                  <h4 className="text-blue-300 font-medium text-sm">Eficiência</h4>
                  <p className="text-white text-lg font-bold">R$ 29.60</p>
                  <p className="text-blue-400 text-xs">Custo por exame</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default AnalisesLaboratoriaisPage;
