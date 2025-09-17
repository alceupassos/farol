import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, TrendingUp, AlertTriangle, CheckCircle, Calendar, Pill, Activity, Target } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

const DiabetesCarePage = () => {
  const glicemiaData = [
    { data: '01/01', jejum: 142, pos_prandial: 180, meta_jejum: 130, meta_pos: 180 },
    { data: '02/01', jejum: 138, pos_prandial: 175, meta_jejum: 130, meta_pos: 180 },
    { data: '03/01', jejum: 145, pos_prandial: 185, meta_jejum: 130, meta_pos: 180 },
    { data: '04/01', jejum: 135, pos_prandial: 170, meta_jejum: 130, meta_pos: 180 },
    { data: '05/01', jejum: 140, pos_prandial: 178, meta_jejum: 130, meta_pos: 180 },
    { data: '06/01', jejum: 132, pos_prandial: 165, meta_jejum: 130, meta_pos: 180 },
    { data: '07/01', jejum: 128, pos_prandial: 160, meta_jejum: 130, meta_pos: 180 }
  ];

  const medicamentosData = [
    { medicamento: 'Metformina', dosagem: '850mg', frequencia: '2x/dia', aderencia: 95 },
    { medicamento: 'Glibenclamida', dosagem: '5mg', frequencia: '1x/dia', aderencia: 88 },
    { medicamento: 'Insulina NPH', dosagem: '20UI', frequencia: '2x/dia', aderencia: 92 }
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950 dark:to-orange-950 p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-red-800 dark:text-red-200 mb-2 flex items-center">
            <Heart className="h-10 w-10 mr-4 text-red-600" />
            Controle de Diabetes
          </h1>
          <p className="text-red-700 dark:text-red-300 text-lg mb-4">
            Monitoramento Completo - Glicemia, Medicamentos e Cuidados Especializados
          </p>
          <div className="bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-800 rounded-lg p-4">
            <p className="text-red-800 dark:text-red-200 text-sm leading-relaxed">
              <strong>Acompanhamento Diabético:</strong> Controle rigoroso da glicemia, aderência medicamentosa, 
              monitoramento de complicações e orientações nutricionais personalizadas para manter seus níveis 
              glicêmicos dentro da meta terapêutica.
            </p>
          </div>
        </div>

        {/* Indicadores Principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white dark:bg-gray-800 border-red-200 dark:border-red-800">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-red-700 dark:text-red-300">Glicemia Jejum</p>
                  <p className="text-2xl font-bold text-red-900 dark:text-red-100">128 mg/dL</p>
                  <p className="text-xs text-green-600 dark:text-green-400">Dentro da meta</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-orange-200 dark:border-orange-800">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-700 dark:text-orange-300">HbA1c</p>
                  <p className="text-2xl font-bold text-orange-900 dark:text-orange-100">7.2%</p>
                  <p className="text-xs text-yellow-600 dark:text-yellow-400">Próximo da meta</p>
                </div>
                <Target className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-blue-200 dark:border-blue-800">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-700 dark:text-blue-300">Aderência Medicamentosa</p>
                  <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">92%</p>
                  <p className="text-xs text-green-600 dark:text-green-400">Excelente</p>
                </div>
                <Pill className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-purple-200 dark:border-purple-800">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-700 dark:text-purple-300">Próxima Consulta</p>
                  <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">15 dias</p>
                  <p className="text-xs text-blue-600 dark:text-blue-400">Endocrinologista</p>
                </div>
                <Calendar className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-red-800 dark:text-red-200">Evolução da Glicemia</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={glicemiaData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="data" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="jejum" stroke="#dc2626" strokeWidth={2} name="Jejum" />
                  <Line type="monotone" dataKey="pos_prandial" stroke="#ea580c" strokeWidth={2} name="Pós-prandial" />
                  <Line type="monotone" dataKey="meta_jejum" stroke="#16a34a" strokeDasharray="5 5" name="Meta Jejum" />
                  <Line type="monotone" dataKey="meta_pos" stroke="#059669" strokeDasharray="5 5" name="Meta Pós-prandial" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-red-800 dark:text-red-200">Aderência aos Medicamentos</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={medicamentosData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="medicamento" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value}%`, 'Aderência']} />
                  <Bar dataKey="aderencia" fill="#dc2626" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Plano de Cuidados */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-red-800 dark:text-red-200">Medicamentos Atuais</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {medicamentosData.map((med, index) => (
                  <div key={index} className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <h4 className="font-medium text-red-900 dark:text-red-100">{med.medicamento}</h4>
                    <p className="text-sm text-red-700 dark:text-red-300">{med.dosagem} - {med.frequencia}</p>
                    <div className="flex items-center mt-2">
                      <div className="flex-1 bg-red-200 dark:bg-red-800 rounded-full h-2">
                        <div 
                          className="bg-red-600 h-2 rounded-full" 
                          style={{ width: `${med.aderencia}%` }}
                        ></div>
                      </div>
                      <span className="ml-2 text-xs text-red-600 dark:text-red-400">{med.aderencia}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-red-800 dark:text-red-200">Orientações Nutricionais</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <h4 className="font-medium text-green-800 dark:text-green-200">Carboidratos</h4>
                  <p className="text-sm text-green-700 dark:text-green-300">45-65% das calorias totais</p>
                  <p className="text-xs text-green-600 dark:text-green-400">Prefira carboidratos complexos</p>
                </div>
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h4 className="font-medium text-blue-800 dark:text-blue-200">Proteínas</h4>
                  <p className="text-sm text-blue-700 dark:text-blue-300">15-20% das calorias totais</p>
                  <p className="text-xs text-blue-600 dark:text-blue-400">Carnes magras, peixes, ovos</p>
                </div>
                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <h4 className="font-medium text-purple-800 dark:text-purple-200">Fibras</h4>
                  <p className="text-sm text-purple-700 dark:text-purple-300">25-35g por dia</p>
                  <p className="text-xs text-purple-600 dark:text-purple-400">Frutas, verduras, grãos integrais</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-red-800 dark:text-red-200">Alertas e Lembretes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="text-yellow-800 dark:text-yellow-200 text-sm font-medium">Exame de Fundo de Olho</p>
                    <p className="text-yellow-700 dark:text-yellow-300 text-xs">Agendar em 30 dias</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <Activity className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-blue-800 dark:text-blue-200 text-sm font-medium">Atividade Física</p>
                    <p className="text-blue-700 dark:text-blue-300 text-xs">150 min/semana recomendados</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-green-800 dark:text-green-200 text-sm font-medium">Meta Atingida</p>
                    <p className="text-green-700 dark:text-green-300 text-xs">Glicemia jejum &lt; 130 mg/dL</p>
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

export default DiabetesCarePage;
