import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, TrendingUp, Download, FileText, Database, Activity, Target, Zap, Brain, Eye, DollarSign } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, ComposedChart } from 'recharts';

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
        {change} vs período anterior
      </p>
    )}
  </div>
);

const performanceHospitalar = [
  { mes: 'Jan', receita: 4450000, custos: 3780000, margem: 15.1, ocupacao: 82.5, satisfacao: 87.2 },
  { mes: 'Fev', receita: 4780000, custos: 3950000, margem: 17.4, ocupacao: 84.1, satisfacao: 88.5 },
  { mes: 'Mar', receita: 5020000, custos: 4100000, margem: 18.3, ocupacao: 85.8, satisfacao: 89.8 },
  { mes: 'Abr', receita: 4850000, custos: 3980000, margem: 17.9, ocupacao: 83.2, satisfacao: 90.2 },
  { mes: 'Mai', receita: 5200000, custos: 4180000, margem: 19.6, ocupacao: 86.4, satisfacao: 91.5 },
  { mes: 'Jun', receita: 5430000, custos: 4280000, margem: 21.2, ocupacao: 87.9, satisfacao: 92.8 }
];

const indicadoresSetoriais = [
  { setor: 'UTI', produtividade: 94.8, qualidade: 91.2, eficiencia: 88.5, custo_dia: 2840 },
  { setor: 'Centro Cirúrgico', produtividade: 92.1, qualidade: 95.6, eficiencia: 90.2, custo_dia: 3200 },
  { setor: 'Laboratório', produtividade: 96.3, qualidade: 99.4, eficiencia: 94.1, custo_dia: 180 },
  { setor: 'Farmácia', produtividade: 89.7, qualidade: 98.8, eficiencia: 92.6, custo_dia: 450 },
  { setor: 'Emergência', produtividade: 87.2, qualidade: 89.4, eficiencia: 85.8, custo_dia: 280 }
];

const benchmarkNacional = [
  { indicador: 'Mortalidade Geral', hospital: 2.0, benchmark: 2.8, percentil: 85 },
  { indicador: 'Infecção Hospitalar', hospital: 2.1, benchmark: 3.2, percentil: 78 },
  { indicador: 'Satisfação Paciente', hospital: 92.8, benchmark: 87.5, percentil: 92 },
  { indicador: 'Tempo Permanência', hospital: 6.8, benchmark: 7.5, percentil: 72 },
  { indicador: 'Margem EBITDA', hospital: 21.2, benchmark: 15.8, percentil: 95 }
];

const analisesPreditivas = [
  { modelo: 'Demanda Leitos UTI', precisao: 94.2, alertas: 3, economia: 180000 },
  { modelo: 'Consumo Medicamentos', precisao: 91.8, alertas: 8, economia: 95000 },
  { modelo: 'Readmissão 30 dias', precisao: 89.5, alertas: 12, economia: 120000 },
  { modelo: 'Tempo Permanência', precisao: 87.3, alertas: 5, economia: 75000 },
  { modelo: 'Satisfação Paciente', precisao: 92.1, alertas: 2, economia: 45000 }
];

const relatoriosExecutivos = [
  { relatorio: 'Dashboard Executivo', frequencia: 'Diário', usuarios: 8, downloads: 156 },
  { relatorio: 'Relatório Financeiro', frequencia: 'Mensal', usuarios: 12, downloads: 89 },
  { relatorio: 'Indicadores Qualidade', frequencia: 'Semanal', usuarios: 15, downloads: 234 },
  { relatorio: 'Performance Setorial', frequencia: 'Quinzenal', usuarios: 22, downloads: 178 },
  { relatorio: 'Análise Competitiva', frequencia: 'Trimestral', usuarios: 6, downloads: 45 }
];

const COLORS_CHART = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const RelatoriosAnalyticsPage = () => {
  const downloadReport = (type: string) => {
    const data = {
      tipo: type,
      periodo: 'Junho 2024',
      hospital: 'Santa Casa de Misericórdia',
      timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `relatorio_${type}_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center">
            <BarChart3 className="h-10 w-10 mr-4 text-purple-400" />
            Relatórios e Analytics
          </h1>
          <p className="text-gray-400 text-lg mb-4">
            Business Intelligence Avançado - Relatórios Executivos e Analytics Preditivos
          </p>
          <div className="bg-purple-900/20 border border-purple-800 rounded-lg p-4">
            <p className="text-purple-200 text-sm leading-relaxed">
              <strong>Para o Executivo Municipal:</strong> Central de Business Intelligence com relatórios executivos automatizados, 
              analytics preditivos, benchmarks nacionais, análises setoriais e dashboards interativos. Monitore performance hospitalar, 
              indicadores comparativos, modelos de IA e economia gerada para tomada de decisão estratégica baseada em dados.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
          <KpiCard title="Relatórios Ativos" value="156" change="+12%" trend="up" icon={<FileText size={24} />} color="purple" />
          <KpiCard title="Dashboards BI" value="24" change="+3" trend="up" icon={<BarChart3 size={24} />} color="blue" />
          <KpiCard title="Downloads/Mês" value="702" change="+18%" trend="up" icon={<Download size={24} />} color="green" />
          <KpiCard title="Usuários Ativos" value="63" change="+8%" trend="up" icon={<Eye size={24} />} color="cyan" />
          <KpiCard title="Modelos IA" value="25" change="+2" trend="up" icon={<Brain size={24} />} color="orange" />
          <KpiCard title="Economia IA" value="R$ 515k" change="+15%" trend="up" icon={<DollarSign size={24} />} color="yellow" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader><CardTitle className="text-white">Performance Hospitalar Integrada</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <ComposedChart data={performanceHospitalar}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip formatter={(value, name) => [
                    name === 'receita' || name === 'custos' ? `R$ ${(Number(value)/1000000).toFixed(2)}M` :
                    name === 'margem' ? `${value}%` :
                    name === 'ocupacao' ? `${value}%` :
                    `${value}%`, ''
                  ]} />
                  <Legend />
                  <Bar dataKey="receita" fill="#4ECDC4" name="Receita" />
                  <Bar dataKey="custos" fill="#FF6B6B" name="Custos" />
                  <Line type="monotone" dataKey="margem" stroke="#00C49F" name="Margem %" strokeWidth={3} />
                  <Line type="monotone" dataKey="satisfacao" stroke="#8884d8" name="Satisfação %" strokeWidth={2} />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader><CardTitle className="text-white">Benchmark Nacional vs Hospital</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={benchmarkNacional}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="indicador" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip formatter={(value, name) => [
                    `${value}${name === 'percentil' ? '° percentil' : name.includes('Tempo') ? ' dias' : '%'}`, ''
                  ]} />
                  <Legend />
                  <Bar dataKey="hospital" fill="#4ECDC4" name="Nossa Performance" />
                  <Bar dataKey="benchmark" fill="#8884d8" name="Benchmark Nacional" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader><CardTitle className="text-white">Indicadores Setoriais - Performance</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-4">
                {indicadoresSetoriais.map((setor, index) => (
                  <div key={index} className="p-4 bg-gray-700/30 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-white font-medium text-sm">{setor.setor}</h4>
                      <span className="px-2 py-1 bg-blue-600 text-white rounded text-xs">
                        {setor.produtividade}% PRODUTIVIDADE
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Qualidade</p>
                        <p className="text-white font-bold">{setor.qualidade}%</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Eficiência</p>
                        <p className="text-white font-bold">{setor.eficiencia}%</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Custo/Dia</p>
                        <p className="text-white font-bold">R$ {setor.custo_dia}</p>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="w-full bg-gray-600 rounded-full h-2">
                        <div 
                          className="bg-blue-400 h-2 rounded-full"
                          style={{ width: `${setor.produtividade}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader><CardTitle className="text-white">Modelos Preditivos de IA</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analisesPreditivas.map((modelo, index) => (
                  <div key={index} className="p-4 bg-gray-700/30 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-white font-medium text-sm">{modelo.modelo}</h4>
                      <span className="px-2 py-1 bg-green-600 text-white rounded text-xs">
                        {modelo.precisao}% PRECISÃO
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Alertas</p>
                        <p className="text-white font-bold">{modelo.alertas}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Economia</p>
                        <p className="text-white font-bold">R$ {(modelo.economia/1000).toFixed(0)}k</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Status</p>
                        <p className="text-green-400 font-bold">ATIVO</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader><CardTitle className="text-white">Relatórios Executivos</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-3">
                {relatoriosExecutivos.map((rel, index) => (
                  <button 
                    key={index}
                    onClick={() => downloadReport(rel.relatorio.toLowerCase().replace(/\s+/g, '_'))}
                    className="w-full p-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg flex items-center justify-between transition-all transform hover:scale-105"
                  >
                    <div className="text-left">
                      <p className="text-sm font-medium">{rel.relatorio}</p>
                      <p className="text-xs opacity-80">{rel.frequencia}</p>
                    </div>
                    <Download size={16} />
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader><CardTitle className="text-white">Analytics Avançados</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-blue-900/30 rounded-lg">
                  <h4 className="text-blue-300 font-medium text-sm">Receita Total</h4>
                  <p className="text-white text-lg font-bold">R$ 5.43M</p>
                  <p className="text-blue-400 text-xs">+21.2% margem EBITDA</p>
                </div>
                <div className="p-3 bg-green-900/30 rounded-lg">
                  <h4 className="text-green-300 font-medium text-sm">Benchmark</h4>
                  <p className="text-white text-lg font-bold">95° Percentil</p>
                  <p className="text-green-400 text-xs">Top 5% nacional</p>
                </div>
                <div className="p-3 bg-purple-900/30 rounded-lg">
                  <h4 className="text-purple-300 font-medium text-sm">IA Economy</h4>
                  <p className="text-white text-lg font-bold">R$ 515k</p>
                  <p className="text-purple-400 text-xs">Economia com IA</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader><CardTitle className="text-white">Dashboards BI</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-cyan-900/30 rounded-lg">
                  <h4 className="text-cyan-300 font-medium text-sm">Dashboards Ativos</h4>
                  <p className="text-white text-lg font-bold">24</p>
                  <p className="text-cyan-400 text-xs">Tempo real</p>
                </div>
                <div className="p-3 bg-orange-900/30 rounded-lg">
                  <h4 className="text-orange-300 font-medium text-sm">Usuários</h4>
                  <p className="text-white text-lg font-bold">63</p>
                  <p className="text-orange-400 text-xs">Gestores ativos</p>
                </div>
                <div className="p-3 bg-yellow-900/30 rounded-lg">
                  <h4 className="text-yellow-300 font-medium text-sm">Downloads</h4>
                  <p className="text-white text-lg font-bold">702</p>
                  <p className="text-yellow-400 text-xs">Este mês</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader><CardTitle className="text-white">Resumo Executivo</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-green-900/30 rounded-lg">
                  <h4 className="text-green-300 font-medium text-sm">Performance Geral</h4>
                  <p className="text-white text-lg font-bold">Excelente</p>
                  <p className="text-green-400 text-xs">Top 5% nacional</p>
                </div>
                <div className="p-3 bg-blue-900/30 rounded-lg">
                  <h4 className="text-blue-300 font-medium text-sm">BI Maturity</h4>
                  <p className="text-white text-lg font-bold">Nível 4</p>
                  <p className="text-blue-400 text-xs">Analytics avançados</p>
                </div>
                <div className="p-3 bg-purple-900/30 rounded-lg">
                  <h4 className="text-purple-300 font-medium text-sm">ROI Analytics</h4>
                  <p className="text-white text-lg font-bold">340%</p>
                  <p className="text-purple-400 text-xs">Retorno investimento</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default RelatoriosAnalyticsPage;
