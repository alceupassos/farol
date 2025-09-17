import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Activity, Users, AlertTriangle, TrendingUp, Clock, Zap, UserCheck, Stethoscope } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';

const KpiCard = ({ title, value, change, trend, icon, color = 'red' }: { 
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

const ocupacaoUTIDetalhada = [
  { tipo: 'UTI Adulto', ocupados: 28, total: 30, taxa: 93.3, vm: 18, hd: 8, vasoativo: 12, apache: 22.5 },
  { tipo: 'UTI Pediátrica', ocupados: 8, total: 10, taxa: 80.0, vm: 4, hd: 1, vasoativo: 3, apache: 18.2 },
  { tipo: 'UTI Neonatal', ocupados: 12, total: 15, taxa: 80.0, vm: 8, hd: 0, vasoativo: 5, apache: 15.8 },
  { tipo: 'UTI Coronariana', ocupados: 6, total: 8, taxa: 75.0, vm: 2, hd: 2, vasoativo: 4, apache: 19.3 }
];

const indicadoresUTITempo = [
  { mes: 'Jan', mortalidade: 18.5, permanencia: 8.2, infeccao: 12.3, vm_dias: 4.8, apache: 21.2, saps: 45.6 },
  { mes: 'Fev', mortalidade: 17.8, permanencia: 7.9, infeccao: 11.8, vm_dias: 4.5, apache: 20.8, saps: 44.2 },
  { mes: 'Mar', mortalidade: 16.9, permanencia: 7.6, infeccao: 11.2, vm_dias: 4.2, apache: 20.1, saps: 43.1 },
  { mes: 'Abr', mortalidade: 16.2, permanencia: 7.4, infeccao: 10.8, vm_dias: 4.0, apache: 19.7, saps: 42.5 },
  { mes: 'Mai', mortalidade: 15.8, permanencia: 7.1, infeccao: 10.3, vm_dias: 3.8, apache: 19.2, saps: 41.8 },
  { mes: 'Jun', mortalidade: 15.2, permanencia: 6.9, infeccao: 9.8, vm_dias: 3.6, apache: 18.8, saps: 41.2 }
];

const procedimentosUTI = [
  { procedimento: 'Ventilação Mecânica', quantidade: 156, custo_medio: 2800, tempo_medio: 4.2 },
  { procedimento: 'Hemodiálise', quantidade: 89, custo_medio: 1200, tempo_medio: 4.0 },
  { procedimento: 'Cateter Central', quantidade: 234, custo_medio: 450, tempo_medio: 0.5 },
  { procedimento: 'Traqueostomia', quantidade: 45, custo_medio: 3200, tempo_medio: 1.2 },
  { procedimento: 'Marcapasso Temp', quantidade: 23, custo_medio: 5600, tempo_medio: 0.8 }
];

const patologiasUTI = [
  { name: 'Sepse/Choque Séptico', casos: 89, mortalidade: 22.5, permanencia: 9.8 },
  { name: 'Insuficiência Respiratória', casos: 67, mortalidade: 15.2, permanencia: 7.2 },
  { name: 'Pós-Operatório Complexo', casos: 156, mortalidade: 8.9, permanencia: 5.4 },
  { name: 'IAM/Síndrome Coronariana', casos: 45, mortalidade: 12.1, permanencia: 6.8 },
  { name: 'AVC/TCE', casos: 34, mortalidade: 18.7, permanencia: 12.3 },
  { name: 'Outros', casos: 78, mortalidade: 14.2, permanencia: 8.1 }
];

const equipamentosUTI = [
  { equipamento: 'Ventiladores', total: 30, funcionando: 28, manutencao: 2, utilizacao: 85.2 },
  { equipamento: 'Monitores', total: 50, funcionando: 47, manutencao: 3, utilizacao: 92.1 },
  { equipamento: 'Bombas Infusão', total: 75, funcionando: 71, manutencao: 4, utilizacao: 88.7 },
  { equipamento: 'Desfibriladores', total: 15, funcionando: 14, manutencao: 1, utilizacao: 78.3 },
  { equipamento: 'Máq. Hemodiálise', total: 8, funcionando: 7, manutencao: 1, utilizacao: 95.4 }
];

const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'];

const UTITerapiaIntensivaPage = () => {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center">
            <Heart className="h-10 w-10 mr-4 text-red-400" />
            UTI e Terapia Intensiva
          </h1>
          <p className="text-gray-400 text-lg mb-4">
            Gestão Avançada das UTIs - Adulto, Pediátrica, Neonatal e Coronariana
          </p>
          <div className="bg-red-900/20 border border-red-800 rounded-lg p-4">
            <p className="text-red-200 text-sm leading-relaxed">
              <strong>Para o Executivo Municipal:</strong> Painel executivo das Unidades de Terapia Intensiva com monitoramento completo de ocupação, 
              mortalidade, scores de gravidade (APACHE II, SAPS III), ventilação mecânica, hemodiálise, procedimentos invasivos e custos operacionais. 
              Acompanhe indicadores críticos, performance assistencial, utilização de equipamentos e sustentabilidade financeira das UTIs.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
          <KpiCard title="Taxa Ocupação UTI" value="87.5%" change="+1.8%" trend="up" icon={<Users size={24} />} color="red" />
          <KpiCard title="Mortalidade UTI" value="15.2%" change="-0.6%" trend="down" icon={<Heart size={24} />} color="orange" />
          <KpiCard title="Permanência Média" value="6.9 dias" change="-0.2" trend="down" icon={<Clock size={24} />} color="blue" />
          <KpiCard title="Infecção Hospitalar" value="9.8%" change="-0.5%" trend="down" icon={<AlertTriangle size={24} />} color="yellow" />
          <KpiCard title="APACHE II Médio" value="18.8" change="-0.4" trend="down" icon={<Activity size={24} />} color="purple" />
          <KpiCard title="Ventilação Mecânica" value="3.6 dias" change="-0.2" trend="down" icon={<Zap size={24} />} color="cyan" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader><CardTitle className="text-white">Ocupação Detalhada por Tipo de UTI</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={ocupacaoUTIDetalhada}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="tipo" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip formatter={(value, name) => [
                    name === 'taxa' ? `${value}%` : 
                    name === 'apache' ? `APACHE ${value}` : 
                    `${value}`, ''
                  ]} />
                  <Legend />
                  <Bar dataKey="ocupados" fill="#FF6B6B" name="Ocupados" />
                  <Bar dataKey="vm" fill="#4ECDC4" name="Ventilação Mecânica" />
                  <Bar dataKey="hd" fill="#45B7D1" name="Hemodiálise" />
                  <Bar dataKey="vasoativo" fill="#96CEB4" name="Drogas Vasoativas" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader><CardTitle className="text-white">Evolução dos Indicadores UTI</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={indicadoresUTITempo}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="mortalidade" stroke="#FF6B6B" name="Mortalidade %" strokeWidth={2} />
                  <Line type="monotone" dataKey="permanencia" stroke="#4ECDC4" name="Permanência (dias)" strokeWidth={2} />
                  <Line type="monotone" dataKey="infeccao" stroke="#FFE66D" name="Infecção %" strokeWidth={2} />
                  <Line type="monotone" dataKey="vm_dias" stroke="#45B7D1" name="VM (dias)" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader><CardTitle className="text-white">Principais Patologias UTI</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={patologiasUTI}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, casos }) => `${name}: ${casos}`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="casos"
                  >
                    {patologiasUTI.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name, props) => [
                    `${value} casos`, 
                    `Mortalidade: ${props.payload.mortalidade}% | Permanência: ${props.payload.permanencia} dias`
                  ]} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader><CardTitle className="text-white">Procedimentos e Custos UTI</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={procedimentosUTI}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="procedimento" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip formatter={(value, name) => [
                    name === 'custo_medio' ? `R$ ${value}` : 
                    name === 'tempo_medio' ? `${value} dias` : 
                    `${value}`, ''
                  ]} />
                  <Legend />
                  <Bar dataKey="quantidade" fill="#4ECDC4" name="Quantidade" />
                  <Bar dataKey="custo_medio" fill="#FF8042" name="Custo Médio (R$)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader><CardTitle className="text-white">Equipamentos UTI</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-4">
                {equipamentosUTI.map((equip, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300">{equip.equipamento}</span>
                      <span className="text-green-400">{equip.funcionando}/{equip.total}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-green-400 h-2 rounded-full" 
                        style={{ width: `${(equip.funcionando/equip.total)*100}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">Utilização: {equip.utilizacao}%</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader><CardTitle className="text-white">Scores de Gravidade</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-red-900/30 rounded-lg">
                  <h4 className="text-red-300 font-medium text-sm">APACHE II Médio</h4>
                  <p className="text-white text-lg font-bold">18.8</p>
                  <p className="text-red-400 text-xs">Mortalidade predita: 15.2%</p>
                </div>
                <div className="p-3 bg-orange-900/30 rounded-lg">
                  <h4 className="text-orange-300 font-medium text-sm">SAPS III Médio</h4>
                  <p className="text-white text-lg font-bold">41.2</p>
                  <p className="text-orange-400 text-xs">Mortalidade predita: 14.8%</p>
                </div>
                <div className="p-3 bg-blue-900/30 rounded-lg">
                  <h4 className="text-blue-300 font-medium text-sm">SOFA Médio</h4>
                  <p className="text-white text-lg font-bold">6.4</p>
                  <p className="text-blue-400 text-xs">Disfunção orgânica moderada</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader><CardTitle className="text-white">Alertas UTI</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-red-900/20 border border-red-800 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5" />
                  <div>
                    <p className="text-red-300 text-sm font-medium">Paciente Crítico</p>
                    <p className="text-red-400 text-xs">UTI Adulto Leito 12 - APACHE 28</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-yellow-900/20 border border-yellow-800 rounded-lg">
                  <Clock className="h-5 w-5 text-yellow-400 mt-0.5" />
                  <div>
                    <p className="text-yellow-300 text-sm font-medium">Longa Permanência</p>
                    <p className="text-yellow-400 text-xs">3 pacientes &gt; 15 dias</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-blue-900/20 border border-blue-800 rounded-lg">
                  <Zap className="h-5 w-5 text-blue-400 mt-0.5" />
                  <div>
                    <p className="text-blue-300 text-sm font-medium">Ventilador Livre</p>
                    <p className="text-blue-400 text-xs">2 ventiladores disponíveis</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader><CardTitle className="text-white">Performance UTI</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-green-900/30 rounded-lg">
                  <h4 className="text-green-300 font-medium text-sm">Taxa de Sobrevida</h4>
                  <p className="text-white text-lg font-bold">84.8%</p>
                  <p className="text-green-400 text-xs">Acima da média nacional</p>
                </div>
                <div className="p-3 bg-blue-900/30 rounded-lg">
                  <h4 className="text-blue-300 font-medium text-sm">Tempo Desmame VM</h4>
                  <p className="text-white text-lg font-bold">3.6 dias</p>
                  <p className="text-blue-400 text-xs">Meta: &lt; 4 dias</p>
                </div>
                <div className="p-3 bg-purple-900/30 rounded-lg">
                  <h4 className="text-purple-300 font-medium text-sm">Custo/Paciente/Dia</h4>
                  <p className="text-white text-lg font-bold">R$ 2.840</p>
                  <p className="text-purple-400 text-xs">Dentro do orçamento</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default UTITerapiaIntensivaPage;
