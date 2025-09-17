import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, TrendingUp, Users, Activity } from 'lucide-react';

const KpiCard = ({ title, value, icon }: { title: string, value: string, icon: React.ReactNode }) => (
  <div className="bg-gray-900/80 border border-gray-700/50 rounded-xl p-6">
    <div className="flex items-center justify-between mb-3">
      <p className="text-sm font-medium text-gray-200">{title}</p>
      <div className="text-purple-400">{icon}</div>
    </div>
    <p className="text-3xl font-bold text-white">{value}</p>
  </div>
);

const AIAnalyticsPage = () => {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center">
            <Brain className="h-10 w-10 mr-4 text-purple-400" />
            AI Analytics
          </h1>
          <p className="text-gray-400 text-lg mb-4">Análises Avançadas com Inteligência Artificial</p>
          <div className="bg-purple-900/20 border border-purple-800 rounded-lg p-4">
            <p className="text-purple-200 text-sm">
              <strong>Para o Gestor:</strong> Central de análises preditivas e inteligência artificial para otimização da gestão pública de saúde.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <KpiCard title="Modelos Ativos" value="25" icon={<Brain size={24} />} />
          <KpiCard title="Precisão Média" value="94.2%" icon={<TrendingUp size={24} />} />
          <KpiCard title="Usuários Atendidos" value="15.2k" icon={<Users size={24} />} />
          <KpiCard title="Análises/Dia" value="1,847" icon={<Activity size={24} />} />
        </div>

        <Card className="bg-gray-800/50 border border-gray-700">
          <CardHeader><CardTitle className="text-white">Inteligência Artificial</CardTitle></CardHeader>
          <CardContent>
            <p className="text-gray-300">Sistema de AI Analytics em desenvolvimento...</p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default AIAnalyticsPage;
