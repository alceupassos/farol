import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Stethoscope, Users, Bed, Heart, AlertTriangle, CheckCircle, Clock, Activity, TrendingUp, UserCheck } from 'lucide-react';
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

const ocupacaoLeitosData = [
  { setor: 'UTI Adulto', ocupados: 28, total: 30, taxa: 93.3, fila: 8 },
  { setor: 'UTI Pediátrica', ocupados: 8, total: 10, taxa: 80.0, fila: 2 },
  { setor: 'UTI Neonatal', ocupados: 12, total: 15, taxa: 80.0, fila: 3 },
  { setor: 'Enfermaria Geral', ocupados: 145, total: 180, taxa: 80.6, fila: 25 },
  { setor: 'Emergência', ocupados: 22, total: 25, taxa: 88.0, fila: 15 },
  { setor: 'Maternidade', ocupados: 18, total: 20, taxa: 90.0, fila: 4 },
  { setor: 'Pediatria', ocupados: 35, total: 40, taxa: 87.5, fila: 7 },
  { setor: 'Cirurgia', ocupados: 42, total: 50, taxa: 84.0, fila: 12 }
];

const indicadoresQualidadeData = [
  { mes: 'Jan', mortalidade: 2.8, infeccao: 3.2, satisfacao: 87.5, readmissao: 8.5, permanencia: 7.2 },
  { mes: 'Fev', mortalidade: 2.5, infeccao: 2.9, satisfacao: 89.2, readmissao: 7.8, permanencia: 6.9 },
  { mes: 'Mar', mortalidade: 2.3, infeccao: 2.7, satisfacao: 91.0, readmissao: 7.2, permanencia: 6.7 },
  { mes: 'Abr', mortalidade: 2.1, infeccao: 2.4, satisfacao: 92.3, readmissao: 6.8, permanencia: 6.4 },
  { mes: 'Mai', mortalidade: 2.0, infeccao: 2.1, satisfacao: 93.1, readmissao: 6.5, permanencia: 6.2 },
  { mes: 'Jun', mortalidade: 1.9, infeccao: 1.8, satisfacao: 94.2, readmissao: 6.1, permanencia: 5.9 }
];

const fluxoPacientesData = [
  { hora: '00h', internacoes: 2, altas: 1, transferencias: 0, obitos: 0 },
  { hora: '06h', internacoes: 8, altas: 3, transferencias: 2, obitos: 1 },
  { hora: '12h', internacoes: 15, altas: 12, transferencias: 4, obitos: 0 },
  { hora: '18h', internacoes: 12, altas: 18, transferencias: 3, obitos: 1 },
  { hora: '24h', internacoes: 5, altas: 8, transferencias: 1, obitos: 0 }
];

const especialidadesData = [
  { name: 'Clínica Médica', pacientes: 156, percentual: 28.5 },
  { name: 'Cirurgia Geral', pacientes: 89, percentual: 16.2 },
  { name: 'Cardiologia', pacientes: 67, percentual: 12.2 },
  { name: 'Ortopedia', pacientes: 54, percentual: 9.8 },
  { name: 'Pediatria', pacientes: 45, percentual: 8.2 },
  { name: 'Ginecologia', pacientes: 38, percentual: 6.9 },
  { name: 'Neurologia', pacientes: 32, percentual: 5.8 },
  { name: 'Outros', pacientes: 67, percentual: 12.4 }
];

const protocolosClinicosData = [
  { protocolo: 'Sepse', aderencia: 94.2, casos: 156, tempo_medio: 3.2 },
  { protocolo: 'AVC', aderencia: 91.8, casos: 89, tempo_medio: 2.8 },
  { protocolo: 'IAM', aderencia: 96.5, casos: 67, tempo_medio: 1.9 },
  { protocolo: 'TEP', aderencia: 88.7, casos: 34, tempo_medio: 4.1 },
  { protocolo: 'Pneumonia', aderencia: 92.3, casos: 234, tempo_medio: 2.5 }
];

const mortalidadeCIDData = [
  { cid: 'I21 - IAM', casos: 67, obitos: 3, taxa: 4.5, meta: 6.0 },
  { cid: 'I64 - AVC', casos: 89, obitos: 8, taxa: 9.0, meta: 12.0 },
  { cid: 'J44 - DPOC', casos: 156, obitos: 12, taxa: 7.7, meta: 10.0 },
  { cid: 'A41 - Sepse', casos: 156, obitos: 18, taxa: 11.5, meta: 15.0 },
  { cid: 'N18 - IRC', casos: 78, obitos: 6, taxa: 7.7, meta: 9.0 }
];

const indicadoresSegurancaData = [
  { mes: 'Jan', quedas: 8, medicacao: 12, cirurgia: 3, identificacao: 2, comunicacao: 5 },
  { mes: 'Fev', quedas: 6, medicacao: 9, cirurgia: 2, identificacao: 1, comunicacao: 4 },
  { mes: 'Mar', quedas: 5, medicacao: 7, cirurgia: 1, identificacao: 1, comunicacao: 3 },
  { mes: 'Abr', quedas: 4, medicacao: 8, cirurgia: 2, identificacao: 0, comunicacao: 2 },
  { mes: 'Mai', quedas: 3, medicacao: 6, cirurgia: 1, identificacao: 1, comunicacao: 2 },
  { mes: 'Jun', quedas: 2, medicacao: 5, cirurgia: 0, identificacao: 0, comunicacao: 1 }
];

const performanceEquipeData = [
  { equipe: 'Clínica Médica', produtividade: 87.5, satisfacao: 4.2, rotatividade: 8.3 },
  { equipe: 'Cirurgia Geral', produtividade: 92.1, satisfacao: 4.5, rotatividade: 5.7 },
  { equipe: 'UTI', produtividade: 94.8, satisfacao: 4.7, rotatividade: 4.2 },
  { equipe: 'Emergência', produtividade: 89.3, satisfacao: 4.1, rotatividade: 12.1 },
  { equipe: 'Pediatria', produtividade: 91.7, satisfacao: 4.6, rotatividade: 6.8 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#ff7300'];

const GestaoClinicaPage = () => {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center">
            <Stethoscope className="h-10 w-10 mr-4 text-blue-400" />
            Gestão Clínica
          </h1>
          <p className="text-gray-400 text-lg mb-4">
            Centro de Controle Clínico - Qualidade Assistencial e Performance
          </p>
          <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-4">
            <p className="text-blue-200 text-sm leading-relaxed">
              <strong>Para o Gestor da Santa Casa:</strong> Painel estratégico para monitoramento da qualidade assistencial. 
              Acompanhe mortalidade, infecção hospitalar, ocupação de leitos, protocolos clínicos e satisfação do paciente. 
              Essencial para excelência no cuidado e conformidade com acreditação hospitalar.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
          <KpiCard title="Taxa de Ocupação Geral" value="84.2%" change="+2.1%" trend="up" icon={<Bed size={24} />} color="blue" />
          <KpiCard title="Mortalidade Hospitalar" value="2.0%" change="-0.1%" trend="down" icon={<Heart size={24} />} color="red" />
          <KpiCard title="Infecção Hospitalar" value="2.1%" change="-0.2%" trend="down" icon={<AlertTriangle size={24} />} color="orange" />
          <KpiCard title="Satisfação Paciente" value="91.0%" change="+0.8%" trend="up" icon={<CheckCircle size={24} />} color="green" />
          <KpiCard title="Tempo Médio Permanência" value="6.8 dias" change="-0.3" trend="down" icon={<Clock size={24} />} color="purple" />
          <KpiCard title="Taxa Readmissão 30d" value="6.1%" change="-0.4%" trend="down" icon={<UserCheck size={24} />} color="cyan" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader><CardTitle className="text-white">Ocupação de Leitos por Setor</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={ocupacaoLeitosData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="setor" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip formatter={(value, name) => [value, name === 'ocupados' ? 'Ocupados' : name === 'total' ? 'Total' : 'Fila']} />
                  <Legend />
                  <Bar dataKey="ocupados" fill="#4ECDC4" name="Ocupados" />
                  <Bar dataKey="total" fill="#8884d8" name="Total" />
                  <Bar dataKey="fila" fill="#FF6B6B" name="Fila de Espera" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader><CardTitle className="text-white">Indicadores de Qualidade Assistencial</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={indicadoresQualidadeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="mortalidade" stroke="#FF6B6B" name="Mortalidade %" strokeWidth={2} />
                  <Line type="monotone" dataKey="infeccao" stroke="#FFE66D" name="Infecção %" strokeWidth={2} />
                  <Line type="monotone" dataKey="satisfacao" stroke="#4ECDC4" name="Satisfação %" strokeWidth={2} />
                  <Line type="monotone" dataKey="readmissao" stroke="#FF8042" name="Readmissão %" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader><CardTitle className="text-white">Fluxo de Pacientes (24h)</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={fluxoPacientesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hora" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="internacoes" stackId="1" stroke="#4ECDC4" fill="#4ECDC4" name="Internações" />
                  <Area type="monotone" dataKey="altas" stackId="2" stroke="#00C49F" fill="#00C49F" name="Altas" />
                  <Area type="monotone" dataKey="transferencias" stackId="3" stroke="#FFBB28" fill="#FFBB28" name="Transferências" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader><CardTitle className="text-white">Distribuição por Especialidade</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={especialidadesData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percentual }) => `${name}: ${percentual}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="pacientes"
                  >
                    {especialidadesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name, props) => [`${value} pacientes`, `${props.payload.percentual}%`]} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader><CardTitle className="text-white">Aderência a Protocolos Clínicos</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={protocolosClinicosData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="protocolo" />
                  <YAxis />
                  <Tooltip formatter={(value, name) => [
                    name === 'aderencia' ? `${value}%` : 
                    name === 'casos' ? `${value} casos` : 
                    `${value}h`, ''
                  ]} />
                  <Legend />
                  <Bar dataKey="aderencia" fill="#4ECDC4" name="Aderência %" />
                  <Bar dataKey="tempo_medio" fill="#FF8042" name="Tempo Médio (h)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader><CardTitle className="text-white">Mortalidade por CID-10 Principal</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={mortalidadeCIDData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="cid" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip formatter={(value, name) => [
                    name === 'taxa' || name === 'meta' ? `${value}%` : `${value}`, ''
                  ]} />
                  <Legend />
                  <Bar dataKey="taxa" fill="#FF6B6B" name="Taxa Atual %" />
                  <Bar dataKey="meta" fill="#8884d8" name="Meta %" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader><CardTitle className="text-white">Indicadores de Segurança do Paciente</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={indicadoresSegurancaData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="quedas" stroke="#FF6B6B" name="Quedas" strokeWidth={2} />
                  <Line type="monotone" dataKey="medicacao" stroke="#FFE66D" name="Erro Medicação" strokeWidth={2} />
                  <Line type="monotone" dataKey="cirurgia" stroke="#4ECDC4" name="Cirurgia Segura" strokeWidth={2} />
                  <Line type="monotone" dataKey="identificacao" stroke="#8884d8" name="Identificação" strokeWidth={2} />
                  <Line type="monotone" dataKey="comunicacao" stroke="#82ca9d" name="Comunicação" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader><CardTitle className="text-white">Performance das Equipes Assistenciais</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={performanceEquipeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="equipe" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip formatter={(value, name) => [
                    name === 'produtividade' || name === 'rotatividade' ? `${value}%` : 
                    name === 'satisfacao' ? `${value}/5` : value, ''
                  ]} />
                  <Legend />
                  <Bar dataKey="produtividade" fill="#4ECDC4" name="Produtividade %" />
                  <Bar dataKey="satisfacao" fill="#00C49F" name="Satisfação (1-5)" />
                  <Bar dataKey="rotatividade" fill="#FF8042" name="Rotatividade %" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader><CardTitle className="text-white">Metas Assistenciais</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">Mortalidade &lt; 2.5%</span>
                    <span className="text-green-400">80% da meta</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-green-400 h-2 rounded-full" style={{ width: '80%' }}></div>
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
                    <span className="text-gray-300">Satisfação &gt; 90%</span>
                    <span className="text-blue-400">91% da meta</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-400 h-2 rounded-full" style={{ width: '91%' }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader><CardTitle className="text-white">Alertas Clínicos</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-red-900/20 border border-red-800 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5" />
                  <div>
                    <p className="text-red-300 text-sm font-medium">Sepse Grave</p>
                    <p className="text-red-400 text-xs">UTI Leito 12 - Protocolo ativado</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-yellow-900/20 border border-yellow-800 rounded-lg">
                  <Clock className="h-5 w-5 text-yellow-400 mt-0.5" />
                  <div>
                    <p className="text-yellow-300 text-sm font-medium">Longa Permanência</p>
                    <p className="text-yellow-400 text-xs">Enfermaria: 15 pacientes &gt; 10 dias</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-green-900/20 border border-green-800 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                  <div>
                    <p className="text-green-300 text-sm font-medium">Meta Atingida</p>
                    <p className="text-green-400 text-xs">Satisfação &gt; 90%</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader><CardTitle className="text-white">Acreditação e Qualidade</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-blue-900/30 rounded-lg">
                  <h4 className="text-blue-300 font-medium text-sm">ONA Nível 3</h4>
                  <p className="text-white text-lg font-bold">Acreditado</p>
                  <p className="text-blue-400 text-xs">Válido até Dez/2024</p>
                </div>
                <div className="p-3 bg-green-900/30 rounded-lg">
                  <h4 className="text-green-300 font-medium text-sm">ISO 9001</h4>
                  <p className="text-white text-lg font-bold">Certificado</p>
                  <p className="text-green-400 text-xs">Auditoria em Nov/2024</p>
                </div>
                <div className="p-3 bg-purple-900/30 rounded-lg">
                  <h4 className="text-purple-300 font-medium text-sm">CNES</h4>
                  <p className="text-white text-lg font-bold">Atualizado</p>
                  <p className="text-purple-400 text-xs">Última atualização: Set/2024</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader><CardTitle className="text-white">Resumo Executivo</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-blue-900/30 rounded-lg">
                  <h4 className="text-blue-300 font-medium text-sm">Pacientes Internados</h4>
                  <p className="text-white text-lg font-bold">548</p>
                  <p className="text-blue-400 text-xs">84.2% de ocupação</p>
                </div>
                <div className="p-3 bg-green-900/30 rounded-lg">
                  <h4 className="text-green-300 font-medium text-sm">Qualidade Assistencial</h4>
                  <p className="text-white text-lg font-bold">Excelente</p>
                  <p className="text-green-400 text-xs">Todos indicadores dentro da meta</p>
                </div>
                <div className="p-3 bg-purple-900/30 rounded-lg">
                  <h4 className="text-purple-300 font-medium text-sm">Equipe Médica</h4>
                  <p className="text-white text-lg font-bold">187 profissionais</p>
                  <p className="text-purple-400 text-xs">6.8% rotatividade média</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default GestaoClinicaPage;
