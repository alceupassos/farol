import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Users, Clock, CheckCircle, AlertTriangle, Database } from 'lucide-react';
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

const utilizacaoData = [
  { mes: 'Jan', prontuarios: 8450, consultas: 12300, prescricoes: 9800 },
  { mes: 'Fev', prontuarios: 8920, consultas: 13100, prescricoes: 10400 },
  { mes: 'Mar', prontuarios: 9380, consultas: 14200, prescricoes: 11200 },
  { mes: 'Abr', prontuarios: 9650, consultas: 13800, prescricoes: 10900 },
  { mes: 'Mai', prontuarios: 10100, consultas: 14800, prescricoes: 11800 },
  { mes: 'Jun', prontuarios: 10450, consultas: 15200, prescricoes: 12300 }
];

const certificacaoData = [
  { categoria: 'SBIS-CFM Nível 1', conformidade: 98.5 },
  { categoria: 'SBIS-CFM Nível 2', conformidade: 95.2 },
  { categoria: 'ICP-Brasil', conformidade: 97.8 },
  { categoria: 'Lei 13.787/2018', conformidade: 96.4 },
  { categoria: 'Resolução CFM 1821', conformidade: 94.7 }
];

const modulosData = [
  { name: 'Prescrição Eletrônica', value: 32, usuarios: 145 },
  { name: 'Evolução Médica', value: 28, usuarios: 128 },
  { name: 'Exames Laboratoriais', value: 22, usuarios: 98 },
  { name: 'Imagens Médicas', value: 18, usuarios: 82 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const ProntuarioDigitalPage = () => {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center">
            <FileText className="h-10 w-10 mr-4 text-blue-400" />
            Prontuário Eletrônico
          </h1>
          <p className="text-gray-400 text-lg mb-4">
            Sistema de Registro Eletrônico em Saúde - Certificação SBIS-CFM e Lei 13.787/2018
          </p>
          <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-4">
            <p className="text-blue-200 text-sm leading-relaxed">
              <strong>Para o Gestor:</strong> Gestão do Sistema de Registro Eletrônico em Saúde (S-RES) com certificação SBIS-CFM. 
              Monitore prescrição eletrônica, assinatura digital ICP-Brasil, evoluções médicas, laudos, exames e interoperabilidade FHIR. 
              Garante conformidade com a Lei 13.787/2018, Resolução CFM 1821/2007 e diretrizes de segurança. Fundamental para eliminar papel, 
              reduzir erros médicos, melhorar qualidade assistencial e facilitar auditoria clínica e administrativa.
            </p>
          </div>
        </div>

        {/* KPIs Principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KpiCard 
            title="Prontuários Ativos" 
            value="10,450" 
            change="+3.5%" 
            trend="up" 
            icon={<FileText size={24} />} 
            color="blue" 
          />
          <KpiCard 
            title="Usuários Ativos" 
            value="453" 
            change="+8%" 
            trend="up" 
            icon={<Users size={24} />} 
            color="green" 
          />
          <KpiCard 
            title="Certificação SBIS" 
            value="Nível 2" 
            change="Ativo" 
            trend="up" 
            icon={<CheckCircle size={24} />} 
            color="purple" 
          />
          <KpiCard 
            title="Tempo Médio Acesso" 
            value="1.2s" 
            change="-0.3s" 
            trend="down" 
            icon={<Clock size={24} />} 
            color="teal" 
          />
        </div>

        {/* Gráficos Principais */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Evolução do Uso do Prontuário</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={utilizacaoData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="prontuarios" stroke="#8884d8" name="Prontuários Criados" strokeWidth={2} />
                  <Line type="monotone" dataKey="consultas" stroke="#00C49F" name="Consultas Registradas" strokeWidth={2} />
                  <Line type="monotone" dataKey="prescricoes" stroke="#FFBB28" name="Prescrições Eletrônicas" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Uso por Módulo</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={modulosData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value, usuarios }) => `${name}: ${value}% (${usuarios})`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {modulosData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Análise de Certificação */}
        <Card className="bg-gray-800/50 border border-gray-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white">Conformidade com Certificações</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={certificacaoData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis dataKey="categoria" type="category" width={150} />
                <Tooltip formatter={(value) => [`${value}%`, 'Conformidade']} />
                <Bar dataKey="conformidade" fill="#4ECDC4" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Dashboards Operacionais */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Funcionalidades Principais</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-blue-900/30 rounded-lg">
                  <div>
                    <span className="text-gray-300 font-medium">Prescrição Eletrônica</span>
                    <p className="text-blue-400 text-sm">12,300 prescrições</p>
                  </div>
                  <CheckCircle className="h-5 w-5 text-green-400" />
                </div>
                <div className="flex items-center justify-between p-3 bg-green-900/30 rounded-lg">
                  <div>
                    <span className="text-gray-300 font-medium">Assinatura Digital</span>
                    <p className="text-green-400 text-sm">ICP-Brasil</p>
                  </div>
                  <CheckCircle className="h-5 w-5 text-green-400" />
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-900/30 rounded-lg">
                  <div>
                    <span className="text-gray-300 font-medium">Auditoria Completa</span>
                    <p className="text-purple-400 text-sm">100% rastreável</p>
                  </div>
                  <CheckCircle className="h-5 w-5 text-green-400" />
                </div>
                <div className="flex items-center justify-between p-3 bg-teal-900/30 rounded-lg">
                  <div>
                    <span className="text-gray-300 font-medium">Interoperabilidade</span>
                    <p className="text-teal-400 text-sm">FHIR R4</p>
                  </div>
                  <CheckCircle className="h-5 w-5 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Performance do Sistema</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">Disponibilidade</span>
                    <span className="text-green-400">99.9%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-green-400 h-2 rounded-full" style={{ width: '99.9%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">Tempo de Resposta</span>
                    <span className="text-blue-400">1.2s</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-400 h-2 rounded-full" style={{ width: '88%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">Satisfação Usuários</span>
                    <span className="text-purple-400">94.2%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-purple-400 h-2 rounded-full" style={{ width: '94.2%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">Backup Automático</span>
                    <span className="text-yellow-400">100%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Status e Alertas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-green-900/20 border border-green-800 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                  <div>
                    <p className="text-green-300 text-sm font-medium">Certificação Válida</p>
                    <p className="text-green-400 text-xs">SBIS-CFM até 2025</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-blue-900/20 border border-blue-800 rounded-lg">
                  <Database className="h-5 w-5 text-blue-400 mt-0.5" />
                  <div>
                    <p className="text-blue-300 text-sm font-medium">Backup Realizado</p>
                    <p className="text-blue-400 text-xs">Hoje às 02:00</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-yellow-900/20 border border-yellow-800 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-yellow-400 mt-0.5" />
                  <div>
                    <p className="text-yellow-300 text-sm font-medium">Atualização Disponível</p>
                    <p className="text-yellow-400 text-xs">Versão 3.2.1</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-purple-900/20 border border-purple-800 rounded-lg">
                  <Clock className="h-5 w-5 text-purple-400 mt-0.5" />
                  <div>
                    <p className="text-purple-300 text-sm font-medium">Manutenção Programada</p>
                    <p className="text-purple-400 text-xs">Domingo 02:00-04:00</p>
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

export default ProntuarioDigitalPage;
