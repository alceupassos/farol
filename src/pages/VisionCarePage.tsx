import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, AlertTriangle, CheckCircle, Calendar, Pill, Target } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const VisionCarePage = () => {
  const acuidadeData = [
    { data: 'Jan/23', od: 0.8, oe: 0.7 },
    { data: 'Jul/23', od: 0.7, oe: 0.6 },
    { data: 'Jan/24', od: 0.6, oe: 0.5 },
    { data: 'Jul/24', od: 0.5, oe: 0.4 }
  ];

  const pressaoData = [
    { mes: 'Jan', pressao: 18 }, { mes: 'Mar', pressao: 20 }, 
    { mes: 'Mai', pressao: 22 }, { mes: 'Jul', pressao: 24 }
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950 dark:to-blue-950 p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-cyan-800 dark:text-cyan-200 mb-2 flex items-center">
            <Eye className="h-10 w-10 mr-4 text-cyan-600" />
            Cuidados Visuais
          </h1>
          <p className="text-cyan-700 dark:text-cyan-300 text-lg">
            Oftalmologia Geriátrica - Prevenção e Tratamento de Doenças Oculares
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-cyan-700 dark:text-cyan-300">Acuidade Visual OD</p>
                  <p className="text-2xl font-bold text-cyan-900 dark:text-cyan-100">0.5</p>
                  <p className="text-xs text-orange-600">Reduzida</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-700">Pressão Intraocular</p>
                  <p className="text-2xl font-bold text-blue-900">24 mmHg</p>
                  <p className="text-xs text-red-600">Elevada</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-700">Catarata</p>
                  <p className="text-2xl font-bold text-green-900">Grau II</p>
                  <p className="text-xs text-yellow-600">Moderada</p>
                </div>
                <Target className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-700">Próxima Consulta</p>
                  <p className="text-2xl font-bold text-purple-900">2 meses</p>
                  <p className="text-xs text-blue-600">Oftalmologista</p>
                </div>
                <Calendar className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-cyan-800 dark:text-cyan-200">Evolução da Acuidade Visual</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={acuidadeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="data" />
                  <YAxis domain={[0, 1]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="od" stroke="#0891b2" strokeWidth={2} name="Olho Direito" />
                  <Line type="monotone" dataKey="oe" stroke="#2563eb" strokeWidth={2} name="Olho Esquerdo" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-cyan-800">Pressão Intraocular</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={pressaoData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis domain={[10, 30]} />
                  <Tooltip formatter={(value) => [`${value} mmHg`, 'Pressão']} />
                  <Bar dataKey="pressao" fill="#0891b2" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-cyan-800">Diagnósticos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <h4 className="font-medium text-red-800">Glaucoma</h4>
                  <p className="text-sm text-red-700">Pressão intraocular elevada</p>
                </div>
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="font-medium text-yellow-800">Catarata Bilateral</h4>
                  <p className="text-sm text-yellow-700">Grau II - Moderada</p>
                </div>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-medium text-blue-800">Degeneração Macular</h4>
                  <p className="text-sm text-blue-700">Forma seca - Inicial</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-cyan-800">Tratamento Atual</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <Pill className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-green-800 text-sm font-medium">Colírio Hipotensor</p>
                    <p className="text-green-700 text-xs">Timolol 0,5% - 2x/dia</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <Target className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-blue-800 text-sm font-medium">Cirurgia de Catarata</p>
                    <p className="text-blue-700 text-xs">Programada para próximo mês</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                  <Eye className="h-5 w-5 text-purple-600 mt-0.5" />
                  <div>
                    <p className="text-purple-800 text-sm font-medium">Óculos</p>
                    <p className="text-purple-700 text-xs">Multifocal - Atualizado</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-cyan-800">Cuidados Preventivos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <h4 className="font-medium text-yellow-800">Proteção Solar</h4>
                  <p className="text-sm text-yellow-700">Óculos com filtro UV sempre</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-800">Alimentação</h4>
                  <p className="text-sm text-green-700">Rica em antioxidantes e ômega-3</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-800">Exercícios Oculares</h4>
                  <p className="text-sm text-blue-700">Piscar frequente, descanso visual</p>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg">
                  <h4 className="font-medium text-orange-800">Controle Sistêmico</h4>
                  <p className="text-sm text-orange-700">Diabetes e hipertensão controlados</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default VisionCarePage;
