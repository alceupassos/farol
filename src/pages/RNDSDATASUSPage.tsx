import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Database, Wifi, CheckCircle, AlertTriangle, Clock, RefreshCw, Download, FileSpreadsheet, FileText, Users } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

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

const sincronizacaoData = [
  { mes: 'Jan', enviados: 12450, aceitos: 11890, rejeitados: 560 },
  { mes: 'Fev', enviados: 13200, aceitos: 12680, rejeitados: 520 },
  { mes: 'Mar', enviados: 14100, aceitos: 13620, rejeitados: 480 },
  { mes: 'Abr', enviados: 13800, aceitos: 13350, rejeitados: 450 },
  { mes: 'Mai', enviados: 14500, aceitos: 14080, rejeitados: 420 },
  { mes: 'Jun', enviados: 15200, aceitos: 14820, rejeitados: 380 }
];

const integracoesData = [
  { sistema: 'CNES', status: 'Ativo', ultimaSync: '2 min', registros: 1250, descricao: 'Cadastro Nacional de Estabelecimentos de Saúde' },
  { sistema: 'SIGTAP', status: 'Ativo', ultimaSync: '5 min', registros: 8900, descricao: 'Sistema de Gerenciamento da Tabela de Procedimentos' },
  { sistema: 'SIA/SUS', status: 'Ativo', ultimaSync: '1 min', registros: 3400, descricao: 'Sistema de Informações Ambulatoriais' },
  { sistema: 'SIH/SUS', status: 'Ativo', ultimaSync: '3 min', registros: 890, descricao: 'Sistema de Informações Hospitalares' },
  { sistema: 'SISREG', status: 'Manutenção', ultimaSync: '2h', registros: 0, descricao: 'Sistema Nacional de Regulação' },
  { sistema: 'e-SUS AB', status: 'Ativo', ultimaSync: '8 min', registros: 2100, descricao: 'e-SUS Atenção Básica' },
  { sistema: 'SINAN', status: 'Ativo', ultimaSync: '15 min', registros: 450, descricao: 'Sistema de Informação de Agravos de Notificação' },
  { sistema: 'SIM', status: 'Ativo', ultimaSync: '30 min', registros: 89, descricao: 'Sistema de Informações sobre Mortalidade' },
  { sistema: 'SINASC', status: 'Ativo', ultimaSync: '45 min', registros: 234, descricao: 'Sistema de Informações sobre Nascidos Vivos' },
  { sistema: 'SISVAN', status: 'Ativo', ultimaSync: '1h', registros: 1890, descricao: 'Sistema de Vigilância Alimentar e Nutricional' },
  { sistema: 'HIPERDIA', status: 'Ativo', ultimaSync: '2h', registros: 3450, descricao: 'Sistema de Cadastramento de Hipertensos e Diabéticos' },
  { sistema: 'SISCOLO', status: 'Ativo', ultimaSync: '4h', registros: 567, descricao: 'Sistema de Informação do Câncer do Colo do Útero' },
  { sistema: 'SISMAMA', status: 'Ativo', ultimaSync: '4h', registros: 234, descricao: 'Sistema de Informação do Câncer de Mama' },
  { sistema: 'APAC', status: 'Ativo', ultimaSync: '10 min', registros: 678, descricao: 'Autorização de Procedimentos de Alta Complexidade' },
  { sistema: 'SCNES', status: 'Ativo', ultimaSync: '6h', registros: 1200, descricao: 'Sistema do Cadastro Nacional de Estabelecimentos de Saúde' },
  { sistema: 'TABNET', status: 'Ativo', ultimaSync: '12h', registros: 15600, descricao: 'Tabulador de Informações de Saúde' }
];

const conformidadeData = [
  { categoria: 'FHIR R4', conformidade: 98.5 },
  { categoria: 'Segurança', conformidade: 96.2 },
  { categoria: 'Interoperabilidade', conformidade: 94.8 },
  { categoria: 'Terminologia', conformidade: 92.1 },
  { categoria: 'Auditoria', conformidade: 97.3 }
];

const RNDSDATASUSPage = () => {
  const downloadData = (format: 'excel' | 'csv' | 'json') => {
    // Simula download de dados consolidados
    const data = {
      timestamp: new Date().toISOString(),
      hospital: 'Santa Casa de Misericórdia',
      periodo: 'Junho 2024',
      sistemas: integracoesData.length,
      registros_total: integracoesData.reduce((sum, item) => sum + item.registros, 0),
      integrações: integracoesData
    };
    
    const filename = `datasus_consolidado_${new Date().toISOString().split('T')[0]}`;
    
    if (format === 'json') {
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${filename}.json`;
      a.click();
    } else if (format === 'csv') {
      const csvContent = [
        'Sistema,Status,Última Sync,Registros,Descrição',
        ...integracoesData.map(item => 
          `${item.sistema},${item.status},${item.ultimaSync},${item.registros},"${item.descricao}"`
        )
      ].join('\n');
      
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${filename}.csv`;
      a.click();
    } else {
      // Para Excel, simula um arquivo CSV com formatação
      alert('Funcionalidade de download Excel será implementada com biblioteca específica (xlsx)');
    }
  };
  
  const downloadSystemData = (sistema: string) => {
    const systemData = integracoesData.find(item => item.sistema === sistema);
    if (systemData) {
      const data = {
        sistema: systemData.sistema,
        descricao: systemData.descricao,
        status: systemData.status,
        ultima_sincronizacao: systemData.ultimaSync,
        total_registros: systemData.registros,
        timestamp_download: new Date().toISOString()
      };
      
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${sistema.toLowerCase()}_${new Date().toISOString().split('T')[0]}.json`;
      a.click();
    }
  };
  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center">
            <Database className="h-10 w-10 mr-4 text-blue-400" />
            RNDS/DATASUS
          </h1>
          <p className="text-gray-400 text-lg mb-4">
            Rede Nacional de Dados em Saúde - Integração FHIR e interoperabilidade com sistemas do DATASUS
          </p>
          <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-4">
            <p className="text-blue-200 text-sm leading-relaxed">
              <strong>Para o Gestor:</strong> Esta área centraliza todas as integrações com os sistemas nacionais de saúde do DATASUS. 
              Aqui você monitora a sincronização de dados com CNES, SIGTAP, SIA/SUS, SIH/SUS, SINAN, SIM, SINASC e outros sistemas essenciais. 
              Garante conformidade com a RNDS (Rede Nacional de Dados em Saúde), padrão FHIR R4, e permite download de relatórios 
              para auditoria e gestão. Fundamental para manter o hospital em conformidade com as exigências do Ministério da Saúde.
            </p>
          </div>
        </div>

        {/* KPIs Principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KpiCard 
            title="Registros Sincronizados (Hoje)" 
            value="14,820" 
            change="+5.3%" 
            trend="up" 
            icon={<CheckCircle size={24} />} 
            color="green" 
          />
          <KpiCard 
            title="Taxa de Sucesso" 
            value="97.5%" 
            change="+1.2%" 
            trend="up" 
            icon={<Wifi size={24} />} 
            color="blue" 
          />
          <KpiCard 
            title="Tempo Médio Resposta" 
            value="1.8s" 
            change="-0.3s" 
            trend="down" 
            icon={<Clock size={24} />} 
            color="purple" 
          />
          <KpiCard 
            title="Sistemas Integrados" 
            value="6/6" 
            change="100%" 
            trend="up" 
            icon={<Database size={24} />} 
            color="teal" 
          />
        </div>

        {/* Gráficos Principais */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Evolução da Sincronização RNDS</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={sincronizacaoData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="enviados" stroke="#8884d8" name="Enviados" strokeWidth={2} />
                  <Line type="monotone" dataKey="aceitos" stroke="#00C49F" name="Aceitos" strokeWidth={2} />
                  <Line type="monotone" dataKey="rejeitados" stroke="#FF8042" name="Rejeitados" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Conformidade FHIR por Categoria</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={conformidadeData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis dataKey="categoria" type="category" width={100} />
                  <Tooltip formatter={(value) => [`${value}%`, 'Conformidade']} />
                  <Bar dataKey="conformidade" fill="#4ECDC4" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Botões de Download */}
        <Card className="bg-gray-800/50 border border-gray-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              Downloads de Dados DATASUS
              <div className="flex space-x-2">
                <button 
                  onClick={() => downloadData('excel')} 
                  className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-white text-sm transition-colors"
                >
                  <FileSpreadsheet className="h-4 w-4" />
                  <span>Excel</span>
                </button>
                <button 
                  onClick={() => downloadData('csv')} 
                  className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white text-sm transition-colors"
                >
                  <FileText className="h-4 w-4" />
                  <span>CSV</span>
                </button>
                <button 
                  onClick={() => downloadData('json')} 
                  className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg text-white text-sm transition-colors"
                >
                  <Database className="h-4 w-4" />
                  <span>JSON</span>
                </button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400 text-sm">
              Baixe relatórios consolidados de todas as integrações DATASUS para análise, auditoria e conformidade regulatória.
            </p>
          </CardContent>
        </Card>

        {/* Status das Integrações */}
        <Card className="bg-gray-800/50 border border-gray-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white">Status das Integrações DATASUS (16 Sistemas)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {integracoesData.map((integracao, index) => (
                <div key={index} className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 hover:bg-gray-800/50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white font-medium text-sm">{integracao.sistema}</h3>
                    <div className={`flex items-center space-x-1 ${
                      integracao.status === 'Ativo' ? 'text-green-400' : 
                      integracao.status === 'Manutenção' ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      <div className={`w-2 h-2 rounded-full ${
                        integracao.status === 'Ativo' ? 'bg-green-400' : 
                        integracao.status === 'Manutenção' ? 'bg-yellow-400' : 'bg-red-400'
                      }`}></div>
                      <span className="text-xs">{integracao.status}</span>
                    </div>
                  </div>
                  <p className="text-gray-400 text-xs mb-2">{integracao.descricao}</p>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Última Sync:</span>
                      <span className="text-gray-300">{integracao.ultimaSync}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Registros:</span>
                      <span className="text-gray-300">{integracao.registros.toLocaleString()}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => downloadSystemData(integracao.sistema)} 
                    className="w-full mt-2 bg-blue-600/20 hover:bg-blue-600/40 border border-blue-600/30 rounded px-2 py-1 text-blue-300 text-xs transition-colors flex items-center justify-center space-x-1"
                  >
                    <Download className="h-3 w-3" />
                    <span>Download</span>
                  </button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Dashboards Operacionais */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Recursos FHIR Ativos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-blue-900/30 rounded-lg">
                  <div>
                    <span className="text-gray-300 font-medium">Patient</span>
                    <p className="text-blue-400 text-sm">12,450 recursos</p>
                  </div>
                  <CheckCircle className="h-5 w-5 text-green-400" />
                </div>
                <div className="flex items-center justify-between p-3 bg-green-900/30 rounded-lg">
                  <div>
                    <span className="text-gray-300 font-medium">Encounter</span>
                    <p className="text-green-400 text-sm">8,920 recursos</p>
                  </div>
                  <CheckCircle className="h-5 w-5 text-green-400" />
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-900/30 rounded-lg">
                  <div>
                    <span className="text-gray-300 font-medium">Observation</span>
                    <p className="text-purple-400 text-sm">15,680 recursos</p>
                  </div>
                  <CheckCircle className="h-5 w-5 text-green-400" />
                </div>
                <div className="flex items-center justify-between p-3 bg-teal-900/30 rounded-lg">
                  <div>
                    <span className="text-gray-300 font-medium">Procedure</span>
                    <p className="text-teal-400 text-sm">6,340 recursos</p>
                  </div>
                  <CheckCircle className="h-5 w-5 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Monitoramento de Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">Disponibilidade RNDS</span>
                    <span className="text-green-400">99.8%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-green-400 h-2 rounded-full" style={{ width: '99.8%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">Latência Média</span>
                    <span className="text-blue-400">1.8s</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-400 h-2 rounded-full" style={{ width: '82%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">Taxa de Erro</span>
                    <span className="text-red-400">2.5%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-red-400 h-2 rounded-full" style={{ width: '2.5%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">Throughput</span>
                    <span className="text-purple-400">450 req/min</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-purple-400 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Alertas e Notificações</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-green-900/20 border border-green-800 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                  <div>
                    <p className="text-green-300 text-sm font-medium">Sincronização OK</p>
                    <p className="text-green-400 text-xs">Todos os sistemas operacionais</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-yellow-900/20 border border-yellow-800 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-yellow-400 mt-0.5" />
                  <div>
                    <p className="text-yellow-300 text-sm font-medium">SISREG Manutenção</p>
                    <p className="text-yellow-400 text-xs">Previsto retorno: 14:00</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-blue-900/20 border border-blue-800 rounded-lg">
                  <RefreshCw className="h-5 w-5 text-blue-400 mt-0.5" />
                  <div>
                    <p className="text-blue-300 text-sm font-medium">Atualização FHIR</p>
                    <p className="text-blue-400 text-xs">Nova versão disponível</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-purple-900/20 border border-purple-800 rounded-lg">
                  <Database className="h-5 w-5 text-purple-400 mt-0.5" />
                  <div>
                    <p className="text-purple-300 text-sm font-medium">Backup Completo</p>
                    <p className="text-purple-400 text-xs">Realizado às 02:00</p>
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

export default RNDSDATASUSPage;
