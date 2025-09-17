import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, AlertTriangle, CheckCircle, Lock } from 'lucide-react';

const KpiCard = ({ title, value, icon }: { title: string, value: string, icon: React.ReactNode }) => (
  <div className="bg-gray-900/80 border border-gray-700/50 rounded-xl p-6">
    <div className="flex items-center justify-between mb-3">
      <p className="text-sm font-medium text-gray-200">{title}</p>
      <div className="text-green-400">{icon}</div>
    </div>
    <p className="text-3xl font-bold text-white">{value}</p>
  </div>
);

const SecurityDashboardPage = () => {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center">
            <Shield className="h-10 w-10 mr-4 text-green-400" />
            Dashboard de Segurança
          </h1>
          <p className="text-gray-400 text-lg mb-4">Monitoramento de Segurança e Conformidade</p>
          <div className="bg-green-900/20 border border-green-800 rounded-lg p-4">
            <p className="text-green-200 text-sm">
              <strong>Para o Gestor:</strong> Painel de segurança cibernética, conformidade LGPD e proteção de dados sensíveis.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <KpiCard title="Nível Segurança" value="98.5%" icon={<Shield size={24} />} />
          <KpiCard title="Incidentes" value="0" icon={<CheckCircle size={24} />} />
          <KpiCard title="Alertas Ativos" value="3" icon={<AlertTriangle size={24} />} />
          <KpiCard title="Conformidade" value="100%" icon={<Lock size={24} />} />
        </div>

        <Card className="bg-gray-800/50 border border-gray-700">
          <CardHeader><CardTitle className="text-white">Segurança do Sistema</CardTitle></CardHeader>
          <CardContent>
            <p className="text-gray-300">Dashboard de segurança em desenvolvimento...</p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default SecurityDashboardPage;
