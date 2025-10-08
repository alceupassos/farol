import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Thermometer, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const GlucoseMonitoringPage = () => {
  const glicemiaData = [
    { hora: '06:00', valor: 128, tipo: 'Jejum' },
    { hora: '09:00', valor: 165, tipo: 'Pós-café' },
    { hora: '12:00', valor: 142, tipo: 'Pré-almoço' },
    { hora: '15:00', valor: 180, tipo: 'Pós-almoço' },
    { hora: '18:00', valor: 135, tipo: 'Pré-jantar' },
    { hora: '21:00', valor: 155, tipo: 'Pós-jantar' }
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-orange-900 to-red-900 dark:from-orange-950 dark:to-red-950 p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-orange-800 dark:text-orange-200 mb-2 flex items-center">
            <Thermometer className="h-10 w-10 mr-4 text-orange-600" />
            Monitoramento Glicêmico
          </h1>
          <p className="text-orange-700 dark:text-orange-300 text-lg">
            Controle Contínuo da Glicose - Monitoramento 24h e Análise de Tendências
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-700 dark:text-orange-300">Glicemia Atual</p>
                  <p className="text-2xl font-bold text-orange-900 dark:text-orange-100">142 mg/dL</p>
                  <p className="text-xs text-yellow-600 dark:text-yellow-400">Elevada</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-red-700 dark:text-red-300">Média 7 dias</p>
                  <p className="text-2xl font-bold text-red-900 dark:text-red-100">148 mg/dL</p>
                  <p className="text-xs text-orange-600 dark:text-orange-400">Acima da meta</p>
                </div>
                <TrendingUp className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-700 dark:text-green-300">Tempo no Alvo</p>
                  <p className="text-2xl font-bold text-green-900 dark:text-green-100">68%</p>
                  <p className="text-xs text-green-600 dark:text-green-400">70-180 mg/dL</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-700 dark:text-blue-300">Variabilidade</p>
                  <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">32%</p>
                  <p className="text-xs text-blue-600 dark:text-blue-400">CV Glicêmico</p>
                </div>
                <Thermometer className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-white text-orange-800 dark:text-orange-200">Perfil Glicêmico Diário</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={glicemiaData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hora" />
                  <YAxis domain={[70, 200]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="valor" stroke="#ea580c" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-white text-orange-800 dark:text-orange-200">Orientações de Controle</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <h4 className="font-medium text-green-800 dark:text-green-200">Meta Pré-prandial</h4>
                  <p className="text-sm text-green-700 dark:text-green-300">80-130 mg/dL antes das refeições</p>
                </div>
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h4 className="font-medium text-blue-800 dark:text-blue-200">Meta Pós-prandial</h4>
                  <p className="text-sm text-blue-700 dark:text-blue-300">&lt; 180 mg/dL após 2h das refeições</p>
                </div>
                <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <h4 className="font-medium text-yellow-800 dark:text-yellow-200">Hipoglicemia</h4>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">&lt; 70 mg/dL - Tratar imediatamente</p>
                </div>
                <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <h4 className="font-medium text-red-800 dark:text-red-200">Hiperglicemia</h4>
                  <p className="text-sm text-red-700 dark:text-red-300">&gt; 250 mg/dL - Procurar atendimento</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default GlucoseMonitoringPage;
