import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Lock, Eye, AlertTriangle, CheckCircle, FileText } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

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

const conformidadeData = [
  { categoria: 'Consentimento', conformidade: 95.2, meta: 98 },
  { categoria: 'Anonimização', conformidade: 88.7, meta: 95 },
  { categoria: 'Segurança', conformidade: 97.1, meta: 99 },
  { categoria: 'Auditoria', conformidade: 92.4, meta: 95 },
  { categoria: 'Relatórios', conformidade: 89.8, meta: 90 }
];

const incidentesData = [
  { mes: 'Jan', criticos: 2, altos: 5, medios: 12, baixos: 28 },
  { mes: 'Fev', criticos: 1, altos: 3, medios: 8, baixos: 22 },
  { mes: 'Mar', criticos: 0, altos: 4, medios: 10, baixos: 25 },
  { mes: 'Abr', criticos: 1, altos: 2, medios: 6, baixos: 18 },
  { mes: 'Mai', criticos: 0, altos: 1, medios: 4, baixos: 15 },
  { mes: 'Jun', criticos: 0, altos: 2, medios: 7, baixos: 20 }
];

const acessosData = [
  { name: 'Autorizados', value: 78, count: 15680 },
  { name: 'Negados', value: 12, count: 2410 },
  { name: 'Suspeitos', value: 8, count: 1605 },
  { name: 'Auditoria', value: 2, count: 402 }
];

const COLORS = ['#00C49F', '#FF8042', '#FFBB28', '#8884d8'];

const ConformidadeLGPDPage = () => {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center">
            <Shield className="h-10 w-10 mr-4 text-green-400" />
            Conformidade LGPD
          </h1>
          <p className="text-gray-400 text-lg mb-4">
            Lei Geral de Proteção de Dados - Governança, privacidade e segurança da informação em saúde
          </p>
          <div className="bg-green-900/20 border border-green-800 rounded-lg p-4">
            <p className="text-green-200 text-sm leading-relaxed">
              <strong>Para o Gestor:</strong> Governança de dados e conformidade com a Lei 13.709/2018 (LGPD). Monitore consentimentos de pacientes, 
              controle de acesso a dados sensíveis, incidentes de segurança, direitos dos titulares (acesso, correção, exclusão, portabilidade) 
              e medidas de proteção. Essencial para evitar multas da ANPD, proteger a reputação institucional e garantir a confiança dos pacientes. 
              Inclui auditoria, relatórios de conformidade e treinamento de equipes.
            </p>
          </div>
        </div>

        {/* KPIs Principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KpiCard 
            title="Índice de Conformidade" 
            value="92.6%" 
            change="+2.1%" 
            trend="up" 
            icon={<CheckCircle size={24} />} 
            color="green" 
          />
          <KpiCard 
            title="Incidentes (Mês)" 
            value="29" 
            change="-15%" 
            trend="down" 
            icon={<AlertTriangle size={24} />} 
            color="red" 
          />
          <KpiCard 
            title="Consentimentos Ativos" 
            value="18,542" 
            change="+8%" 
            trend="up" 
            icon={<FileText size={24} />} 
            color="blue" 
          />
          <KpiCard 
            title="Tempo Médio Resposta" 
            value="2.3 dias" 
            change="-0.5d" 
            trend="down" 
            icon={<Eye size={24} />} 
            color="purple" 
          />
        </div>

        {/* Gráficos Principais */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Conformidade por Categoria</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={conformidadeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="categoria" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip formatter={(value, name) => [`${value}%`, name === 'conformidade' ? 'Atual' : 'Meta']} />
                  <Legend />
                  <Bar dataKey="conformidade" fill="#00C49F" name="Conformidade Atual" />
                  <Bar dataKey="meta" fill="#8884d8" name="Meta" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Controle de Acessos</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={acessosData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value, count }) => `${name}: ${value}% (${count})`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {acessosData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Análise de Incidentes */}
        <Card className="bg-gray-800/50 border border-gray-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white">Evolução de Incidentes de Segurança</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={incidentesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="criticos" stackId="a" fill="#FF4444" name="Críticos" />
                <Bar dataKey="altos" stackId="a" fill="#FF8042" name="Altos" />
                <Bar dataKey="medios" stackId="a" fill="#FFBB28" name="Médios" />
                <Bar dataKey="baixos" stackId="a" fill="#00C49F" name="Baixos" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Dashboards Operacionais */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Direitos dos Titulares</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-blue-900/30 rounded-lg">
                  <div>
                    <span className="text-gray-300 font-medium">Acesso aos Dados</span>
                    <p className="text-blue-400 text-sm">145 solicitações</p>
                  </div>
                  <span className="text-blue-400 text-sm">Ativo</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-900/30 rounded-lg">
                  <div>
                    <span className="text-gray-300 font-medium">Correção</span>
                    <p className="text-green-400 text-sm">23 solicitações</p>
                  </div>
                  <span className="text-green-400 text-sm">Ativo</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-red-900/30 rounded-lg">
                  <div>
                    <span className="text-gray-300 font-medium">Exclusão</span>
                    <p className="text-red-400 text-sm">8 solicitações</p>
                  </div>
                  <span className="text-red-400 text-sm">Análise</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-900/30 rounded-lg">
                  <div>
                    <span className="text-gray-300 font-medium">Portabilidade</span>
                    <p className="text-purple-400 text-sm">12 solicitações</p>
                  </div>
                  <span className="text-purple-400 text-sm">Ativo</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Medidas de Segurança</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">Criptografia</span>
                    <span className="text-green-400">100%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-green-400 h-2 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">Controle de Acesso</span>
                    <span className="text-blue-400">97.2%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-400 h-2 rounded-full" style={{ width: '97.2%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">Logs de Auditoria</span>
                    <span className="text-purple-400">95.8%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-purple-400 h-2 rounded-full" style={{ width: '95.8%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">Backup Seguro</span>
                    <span className="text-yellow-400">92.1%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '92.1%' }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Alertas LGPD</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-green-900/20 border border-green-800 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                  <div>
                    <p className="text-green-300 text-sm font-medium">Conformidade OK</p>
                    <p className="text-green-400 text-xs">Todos os processos em dia</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-yellow-900/20 border border-yellow-800 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-yellow-400 mt-0.5" />
                  <div>
                    <p className="text-yellow-300 text-sm font-medium">Revisão Pendente</p>
                    <p className="text-yellow-400 text-xs">8 consentimentos expirados</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-blue-900/20 border border-blue-800 rounded-lg">
                  <FileText className="h-5 w-5 text-blue-400 mt-0.5" />
                  <div>
                    <p className="text-blue-300 text-sm font-medium">Relatório Mensal</p>
                    <p className="text-blue-400 text-xs">Pronto para envio ANPD</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-purple-900/20 border border-purple-800 rounded-lg">
                  <Lock className="h-5 w-5 text-purple-400 mt-0.5" />
                  <div>
                    <p className="text-purple-300 text-sm font-medium">Treinamento</p>
                    <p className="text-purple-400 text-xs">85% da equipe capacitada</p>
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

export default ConformidadeLGPDPage;
