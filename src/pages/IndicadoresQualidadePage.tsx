import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, AlertTriangle, TrendingUp, Heart, Shield, Users, Clock, Star, Award, Target } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

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

const indicadoresSeguranca = [
  { mes: 'Jan', quedas: 8, medicacao: 12, cirurgia: 3, identificacao: 2, comunicacao: 5, infeccao: 15 },
  { mes: 'Fev', quedas: 6, medicacao: 9, cirurgia: 2, identificacao: 1, comunicacao: 4, infeccao: 12 },
  { mes: 'Mar', quedas: 5, medicacao: 7, cirurgia: 1, identificacao: 1, comunicacao: 3, infeccao: 10 },
  { mes: 'Abr', quedas: 4, medicacao: 8, cirurgia: 2, identificacao: 0, comunicacao: 2, infeccao: 8 },
  { mes: 'Mai', quedas: 3, medicacao: 6, cirurgia: 1, identificacao: 1, comunicacao: 2, infeccao: 7 },
  { mes: 'Jun', quedas: 2, medicacao: 5, cirurgia: 0, identificacao: 0, comunicacao: 1, infeccao: 6 }
];

const satisfacaoPaciente = [
  { categoria: 'Atendimento Médico', nota: 9.2, meta: 8.5, casos: 1250 },
  { categoria: 'Enfermagem', nota: 9.0, meta: 8.5, casos: 1250 },
  { categoria: 'Hotelaria', nota: 8.7, meta: 8.0, casos: 1250 },
  { categoria: 'Alimentação', nota: 8.4, meta: 8.0, casos: 1250 },
  { categoria: 'Limpeza', nota: 9.1, meta: 8.5, casos: 1250 },
  { categoria: 'Infraestrutura', nota: 8.9, meta: 8.5, casos: 1250 }
];

const acreditacaoIndicadores = [
  { area: 'Segurança Paciente', pontuacao: 95, meta: 90, maximo: 100 },
  { area: 'Gestão Qualidade', pontuacao: 92, meta: 85, maximo: 100 },
  { area: 'Gestão Pessoas', pontuacao: 88, meta: 85, maximo: 100 },
  { area: 'Gestão Processos', pontuacao: 90, meta: 85, maximo: 100 },
  { area: 'Gestão Tecnologia', pontuacao: 87, meta: 80, maximo: 100 },
  { area: 'Gestão Ambiente', pontuacao: 93, meta: 85, maximo: 100 }
];

const mortalidadeEspecialidade = [
  { especialidade: 'Clínica Médica', casos: 456, obitos: 9, taxa: 1.97, meta: 2.5, benchmark: 2.2 },
  { especialidade: 'Cirurgia Geral', casos: 289, obitos: 3, taxa: 1.04, meta: 1.5, benchmark: 1.3 },
  { especialidade: 'Cardiologia', casos: 167, obitos: 4, taxa: 2.40, meta: 3.0, benchmark: 2.8 },
  { especialidade: 'UTI', casos: 89, obitos: 14, taxa: 15.73, meta: 18.0, benchmark: 16.5 },
  { especialidade: 'Emergência', casos: 234, obitos: 2, taxa: 0.85, meta: 1.2, benchmark: 1.0 }
];

const infeccaoHospitalar = [
  { tipo: 'Pneumonia Associada VM', casos: 12, taxa: 8.5, meta: 12.0, custo_medio: 15000 },
  { tipo: 'Infecção Corrente Sanguínea', casos: 8, taxa: 5.2, meta: 8.0, custo_medio: 12000 },
  { tipo: 'Infecção Trato Urinário', casos: 15, taxa: 3.8, meta: 6.0, custo_medio: 8000 },
  { tipo: 'Infecção Sítio Cirúrgico', casos: 6, taxa: 1.2, meta: 2.0, custo_medio: 18000 },
  { tipo: 'Outras IRAS', casos: 9, taxa: 2.1, meta: 3.5, custo_medio: 10000 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const IndicadoresQualidadePage = () => {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center">
            <CheckCircle className="h-10 w-10 mr-4 text-green-400" />
            Indicadores de Qualidade
          </h1>
          <p className="text-gray-400 text-lg mb-4">
            Segurança do Paciente, Acreditação e Excelência Assistencial
          </p>
          <div className="bg-green-900/20 border border-green-800 rounded-lg p-4">
            <p className="text-green-200 text-sm leading-relaxed">
              <strong>Para o Executivo Municipal:</strong> Painel executivo de qualidade assistencial com monitoramento completo de segurança do paciente, 
              satisfação, acreditação ONA/ISO, mortalidade por especialidade, infecções hospitalares e indicadores de excelência. 
              Acompanhe metas de qualidade, benchmarks nacionais, custos da não-qualidade e conformidade regulatória para gestão estratégica.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
          <KpiCard title="Satisfação Paciente" value="91.0%" change="+0.8%" trend="up" icon={<Star size={24} />} color="green" />
          <KpiCard title="Infecção Hospitalar" value="2.1%" change="-0.3%" trend="down" icon={<Shield size={24} />} color="blue" />
          <KpiCard title="Mortalidade Geral" value="2.0%" change="-0.1%" trend="down" icon={<Heart size={24} />} color="red" />
          <KpiCard title="Acreditação ONA" value="Nível 3" change="Renovado" trend="up" icon={<Award size={24} />} color="purple" />
          <KpiCard title="Eventos Adversos" value="8" change="-33%" trend="down" icon={<AlertTriangle size={24} />} color="orange" />
          <KpiCard title="Tempo Permanência" value="6.8 dias" change="-0.3" trend="down" icon={<Clock size={24} />} color="cyan" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader><CardTitle className="text-white">Evolução dos Indicadores de Segurança</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={indicadoresSeguranca}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="quedas" stroke="#FF6B6B" name="Quedas" strokeWidth={2} />
                  <Line type="monotone" dataKey="medicacao" stroke="#FFE66D" name="Erro Medicação" strokeWidth={2} />
                  <Line type="monotone" dataKey="cirurgia" stroke="#4ECDC4" name="Cirurgia Segura" strokeWidth={2} />
                  <Line type="monotone" dataKey="infeccao" stroke="#8884d8" name="Infecção" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader><CardTitle className="text-white">Satisfação do Paciente por Categoria</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={satisfacaoPaciente}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="categoria" angle={-45} textAnchor="end" height={80} />
                  <YAxis domain={[0, 10]} />
                  <Tooltip formatter={(value, name) => [
                    name === 'nota' || name === 'meta' ? `${value}/10` : value, ''
                  ]} />
                  <Legend />
                  <Bar dataKey="nota" fill="#4ECDC4" name="Nota Atual" />
                  <Bar dataKey="meta" fill="#8884d8" name="Meta" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader><CardTitle className="text-white">Mortalidade por Especialidade</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={mortalidadeEspecialidade}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="especialidade" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip formatter={(value, name) => [
                    name === 'taxa' || name === 'meta' || name === 'benchmark' ? `${value}%` : value, ''
                  ]} />
                  <Legend />
                  <Bar dataKey="taxa" fill="#FF6B6B" name="Taxa Atual %" />
                  <Bar dataKey="meta" fill="#8884d8" name="Meta %" />
                  <Bar dataKey="benchmark" fill="#82ca9d" name="Benchmark %" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader><CardTitle className="text-white">Indicadores de Acreditação ONA</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <RadarChart data={acreditacaoIndicadores}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="area" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar name="Pontuação" dataKey="pontuacao" stroke="#4ECDC4" fill="#4ECDC4" fillOpacity={0.3} />
                  <Radar name="Meta" dataKey="meta" stroke="#8884d8" fill="#8884d8" fillOpacity={0.1} />
                  <Tooltip />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader><CardTitle className="text-white">Infecções Hospitalares (IRAS)</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-4">
                {infeccaoHospitalar.map((infec, index) => (
                  <div key={index} className="p-4 bg-gray-700/30 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-white font-medium text-sm">{infec.tipo}</h4>
                      <span className={`px-2 py-1 rounded text-xs ${
                        infec.taxa <= infec.meta ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                      }`}>
                        {infec.taxa <= infec.meta ? 'META OK' : 'ACIMA META'}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Casos</p>
                        <p className="text-white font-bold">{infec.casos}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Taxa</p>
                        <p className="text-white font-bold">{infec.taxa}‰</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Custo Médio</p>
                        <p className="text-white font-bold">R$ {(infec.custo_medio/1000).toFixed(0)}k</p>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-400">Meta: {infec.meta}‰</span>
                        <span className="text-gray-400">{((infec.taxa/infec.meta)*100).toFixed(0)}% da meta</span>
                      </div>
                      <div className="w-full bg-gray-600 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${infec.taxa <= infec.meta ? 'bg-green-400' : 'bg-red-400'}`}
                          style={{ width: `${Math.min((infec.taxa/infec.meta)*100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader><CardTitle className="text-white">Distribuição de Eventos Adversos</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Quedas', value: 2, custo: 25000 },
                      { name: 'Erro Medicação', value: 5, custo: 15000 },
                      { name: 'Cirurgia Segura', value: 0, custo: 0 },
                      { name: 'Identificação', value: 0, custo: 0 },
                      { name: 'Comunicação', value: 1, custo: 8000 }
                    ]}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {COLORS.map((color, index) => (
                      <Cell key={`cell-${index}`} fill={color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name, props) => [
                    `${value} eventos`, 
                    `Custo: R$ ${(props.payload.custo/1000).toFixed(0)}k`
                  ]} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader><CardTitle className="text-white">Metas de Qualidade</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">Satisfação &gt; 90%</span>
                    <span className="text-green-400">101% da meta</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-green-400 h-2 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">Infecção &lt; 3%</span>
                    <span className="text-green-400">70% da meta</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-green-400 h-2 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">Mortalidade &lt; 2.5%</span>
                    <span className="text-green-400">80% da meta</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-green-400 h-2 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader><CardTitle className="text-white">Certificações</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-green-900/30 rounded-lg">
                  <h4 className="text-green-300 font-medium text-sm">ONA Nível 3</h4>
                  <p className="text-white text-lg font-bold">Acreditado</p>
                  <p className="text-green-400 text-xs">Válido até Dez/2024</p>
                </div>
                <div className="p-3 bg-blue-900/30 rounded-lg">
                  <h4 className="text-blue-300 font-medium text-sm">ISO 9001:2015</h4>
                  <p className="text-white text-lg font-bold">Certificado</p>
                  <p className="text-blue-400 text-xs">Auditoria Nov/2024</p>
                </div>
                <div className="p-3 bg-purple-900/30 rounded-lg">
                  <h4 className="text-purple-300 font-medium text-sm">PNSP</h4>
                  <p className="text-white text-lg font-bold">Implantado</p>
                  <p className="text-purple-400 text-xs">6 metas de segurança</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader><CardTitle className="text-white">Alertas de Qualidade</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-green-900/20 border border-green-800 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                  <div>
                    <p className="text-green-300 text-sm font-medium">Meta Atingida</p>
                    <p className="text-green-400 text-xs">Satisfação &gt; 90%</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-blue-900/20 border border-blue-800 rounded-lg">
                  <Shield className="h-5 w-5 text-blue-400 mt-0.5" />
                  <div>
                    <p className="text-blue-300 text-sm font-medium">Segurança OK</p>
                    <p className="text-blue-400 text-xs">Redução 33% eventos adversos</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-purple-900/20 border border-purple-800 rounded-lg">
                  <Award className="h-5 w-5 text-purple-400 mt-0.5" />
                  <div>
                    <p className="text-purple-300 text-sm font-medium">Acreditação</p>
                    <p className="text-purple-400 text-xs">ONA Nível 3 renovado</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader><CardTitle className="text-white">Resumo Executivo</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-green-900/30 rounded-lg">
                  <h4 className="text-green-300 font-medium text-sm">Qualidade Geral</h4>
                  <p className="text-white text-lg font-bold">Excelente</p>
                  <p className="text-green-400 text-xs">Todas metas atingidas</p>
                </div>
                <div className="p-3 bg-blue-900/30 rounded-lg">
                  <h4 className="text-blue-300 font-medium text-sm">Custo Não-Qualidade</h4>
                  <p className="text-white text-lg font-bold">R$ 48k</p>
                  <p className="text-blue-400 text-xs">-35% vs mês anterior</p>
                </div>
                <div className="p-3 bg-purple-900/30 rounded-lg">
                  <h4 className="text-purple-300 font-medium text-sm">Benchmark Nacional</h4>
                  <p className="text-white text-lg font-bold">Top 10%</p>
                  <p className="text-purple-400 text-xs">Acima da média nacional</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default IndicadoresQualidadePage;
