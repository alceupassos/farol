import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, AlertTriangle, Calendar, Pill, Target } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ErectileDysfunctionPage = () => {
  const iiefData = [
    { mes: 'Jan', score: 8 }, { mes: 'Mar', score: 10 }, { mes: 'Mai', score: 12 }, { mes: 'Jul', score: 14 }
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950 dark:to-indigo-950 p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-purple-800 dark:text-purple-200 mb-2 flex items-center">
            <Activity className="h-10 w-10 mr-4 text-purple-600" />
            Função Erétil
          </h1>
          <p className="text-purple-700 dark:text-purple-300 text-lg">
            Acompanhamento Urológico Especializado - Avaliação e Tratamento da Disfunção Erétil
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-700 dark:text-purple-300">IIEF-5 Score</p>
                  <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">14/25</p>
                  <p className="text-xs text-orange-600 dark:text-orange-400">DE Moderada</p>
                </div>
                <Target className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-indigo-700 dark:text-indigo-300">Testosterona</p>
                  <p className="text-2xl font-bold text-indigo-900 dark:text-indigo-100">285 ng/dL</p>
                  <p className="text-xs text-red-600 dark:text-red-400">Baixo</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-700 dark:text-blue-300">Tratamento</p>
                  <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">Ativo</p>
                  <p className="text-xs text-green-600 dark:text-green-400">Sildenafil 50mg</p>
                </div>
                <Pill className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-cyan-700 dark:text-cyan-300">Próxima Consulta</p>
                  <p className="text-2xl font-bold text-cyan-900 dark:text-cyan-100">30 dias</p>
                  <p className="text-xs text-blue-600 dark:text-blue-400">Urologista</p>
                </div>
                <Calendar className="h-8 w-8 text-cyan-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-purple-800 dark:text-purple-200">Evolução do IIEF-5</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={iiefData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis domain={[0, 25]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="score" stroke="#7c3aed" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-purple-800 dark:text-purple-200">Plano de Tratamento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h4 className="font-medium text-blue-800 dark:text-blue-200">Medicação</h4>
                  <p className="text-sm text-blue-700 dark:text-blue-300">Sildenafil 50mg - conforme necessário</p>
                </div>
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <h4 className="font-medium text-green-800 dark:text-green-200">Exercícios</h4>
                  <p className="text-sm text-green-700 dark:text-green-300">Exercícios de Kegel - 3x/dia</p>
                </div>
                <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <h4 className="font-medium text-orange-800 dark:text-orange-200">Estilo de Vida</h4>
                  <p className="text-sm text-orange-700 dark:text-orange-300">Dieta, exercícios, parar de fumar</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default ErectileDysfunctionPage;
