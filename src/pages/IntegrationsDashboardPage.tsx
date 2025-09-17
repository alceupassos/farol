import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Database, Zap, CheckCircle, AlertTriangle } from 'lucide-react';

const KpiCard = ({ title, value, icon }: { title: string, value: string, icon: React.ReactNode }) => (
  <div className="bg-gray-900/80 border border-gray-700/50 rounded-xl p-6">
    <div className="flex items-center justify-between mb-3">
      <p className="text-sm font-medium text-gray-200">{title}</p>
      <div className="text-blue-400">{icon}</div>
    </div>
    <p className="text-3xl font-bold text-white">{value}</p>
  </div>
);

const IntegrationsDashboardPage = () => {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center">
            <Database className="h-10 w-10 mr-4 text-blue-400" />
            Dashboard de Integrações
          </h1>
          <p className="text-gray-400 text-lg mb-4">Monitoramento de APIs e Integrações</p>
          <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-4">
            <p className="text-blue-200 text-sm">
              <strong>Para o Gestor:</strong> Central de monitoramento de integrações com sistemas externos, APIs e fluxos de dados.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <KpiCard title="Integrações Ativas" value="24" icon={<Database size={24} />} />
          <KpiCard title="APIs Funcionais" value="22" icon={<CheckCircle size={24} />} />
          <KpiCard title="Falhas" value="2" icon={<AlertTriangle size={24} />} />
          <KpiCard title="Uptime" value="99.2%" icon={<Zap size={24} />} />
        </div>

        <Card className="bg-gray-800/50 border border-gray-700">
          <CardHeader><CardTitle className="text-white">Integrações do Sistema</CardTitle></CardHeader>
          <CardContent>
            <p className="text-gray-300">Dashboard de integrações em desenvolvimento...</p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default IntegrationsDashboardPage;
