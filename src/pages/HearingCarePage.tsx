import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Ear, AlertTriangle, CheckCircle, Calendar, Settings, Volume2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const HearingCarePage = () => {
  const audiometriaData = [
    { frequencia: '250', od: 25, oe: 30, normal: 20 },
    { frequencia: '500', od: 35, oe: 40, normal: 20 },
    { frequencia: '1000', od: 45, oe: 50, normal: 20 },
    { frequencia: '2000', od: 55, oe: 60, normal: 20 },
    { frequencia: '4000', od: 65, oe: 70, normal: 20 },
    { frequencia: '8000', od: 75, oe: 80, normal: 20 }
  ];

  const evolucaoData = [
    { ano: '2022', perda: 35 }, { ano: '2023', perda: 42 }, { ano: '2024', perda: 48 }
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950 p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-emerald-800 dark:text-emerald-200 mb-2 flex items-center">
            <Ear className="h-10 w-10 mr-4 text-emerald-600" />
            Cuidados Auditivos
          </h1>
          <p className="text-emerald-700 dark:text-emerald-300 text-lg">
            Audiologia Geriátrica - Prevenção e Tratamento da Perda Auditiva
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Perda Auditiva OD</p>
                  <p className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">48 dB</p>
                  <p className="text-xs text-orange-600">Moderada</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-teal-700">Perda Auditiva OE</p>
                  <p className="text-2xl font-bold text-teal-900">52 dB</p>
                  <p className="text-xs text-orange-600">Moderada</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-700">Aparelho Auditivo</p>
                  <p className="text-2xl font-bold text-blue-900">Ativo</p>
                  <p className="text-xs text-green-600">Bilateral</p>
                </div>
                <Volume2 className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-700">Próxima Consulta</p>
                  <p className="text-2xl font-bold text-purple-900">6 meses</p>
                  <p className="text-xs text-blue-600">Otorrinolaringologista</p>
                </div>
                <Calendar className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-emerald-800 dark:text-emerald-200">Audiometria Tonal</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={audiometriaData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="frequencia" />
                  <YAxis domain={[0, 100]} reversed />
                  <Tooltip formatter={(value) => [`${value} dB`, 'Limiar']} />
                  <Line type="monotone" dataKey="od" stroke="#10b981" strokeWidth={2} name="Orelha Direita" />
                  <Line type="monotone" dataKey="oe" stroke="#0d9488" strokeWidth={2} name="Orelha Esquerda" />
                  <Line type="monotone" dataKey="normal" stroke="#6b7280" strokeDasharray="5 5" name="Normal" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-emerald-800">Evolução da Perda Auditiva</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={evolucaoData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="ano" />
                  <YAxis domain={[0, 80]} />
                  <Tooltip formatter={(value) => [`${value} dB`, 'Perda Média']} />
                  <Bar dataKey="perda" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-emerald-800">Diagnóstico</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <h4 className="font-medium text-orange-800">Presbiacusia</h4>
                  <p className="text-sm text-orange-700">Perda auditiva relacionada à idade</p>
                </div>
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="font-medium text-yellow-800">Perda Neurossensorial</h4>
                  <p className="text-sm text-yellow-700">Bilateral, simétrica, moderada</p>
                </div>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-medium text-blue-800">Zumbido</h4>
                  <p className="text-sm text-blue-700">Tinnitus bilateral contínuo</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-emerald-800">Aparelho Auditivo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <Volume2 className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-green-800 text-sm font-medium">Modelo Digital</p>
                    <p className="text-green-700 text-xs">Retroauricular bilateral</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <Settings className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-blue-800 text-sm font-medium">Última Regulagem</p>
                    <p className="text-blue-700 text-xs">Há 3 meses - Ajuste fino</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-purple-600 mt-0.5" />
                  <div>
                    <p className="text-purple-800 text-sm font-medium">Adaptação</p>
                    <p className="text-purple-700 text-xs">Excelente - Uso diário 12h</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-emerald-800">Cuidados e Orientações</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <h4 className="font-medium text-yellow-800">Higiene Auricular</h4>
                  <p className="text-sm text-yellow-700">Limpeza externa apenas, evitar hastes</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-800">Manutenção do Aparelho</h4>
                  <p className="text-sm text-green-700">Limpeza diária, troca de pilhas</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-800">Proteção Auditiva</h4>
                  <p className="text-sm text-blue-700">Evitar ruídos intensos, usar protetor</p>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg">
                  <h4 className="font-medium text-orange-800">Comunicação</h4>
                  <p className="text-sm text-orange-700">Falar de frente, articular bem</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default HearingCarePage;
