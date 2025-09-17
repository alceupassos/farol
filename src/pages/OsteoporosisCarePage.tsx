import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bone, TrendingDown, AlertTriangle, CheckCircle, Calendar, Pill, Activity, Shield } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

const OsteoporosisCarePage = () => {
  const densidadeOsseaData = [
    { data: 'Jan/23', coluna: -2.1, femur: -1.8, punho: -1.5 },
    { data: 'Jul/23', coluna: -2.0, femur: -1.7, punho: -1.4 },
    { data: 'Jan/24', coluna: -1.9, femur: -1.6, punho: -1.3 }
  ];

  const suplementosData = [
    { suplemento: 'Cálcio', dosagem: '1200mg', frequencia: '2x/dia', aderencia: 95 },
    { suplemento: 'Vitamina D3', dosagem: '2000UI', frequencia: '1x/dia', aderencia: 90 },
    { suplemento: 'Alendronato', dosagem: '70mg', frequencia: '1x/semana', aderencia: 85 }
  ];

  const riscosData = [
    { fator: 'Idade', risco: 'Alto', valor: '67 anos' },
    { fator: 'IMC', risco: 'Baixo', valor: '22.5 kg/m²' },
    { fator: 'Histórico Familiar', risco: 'Médio', valor: 'Mãe com fratura' },
    { fator: 'Tabagismo', risco: 'Baixo', valor: 'Não fumante' }
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-blue-800 dark:text-blue-200 mb-2 flex items-center">
            <Bone className="h-10 w-10 mr-4 text-blue-600" />
            Cuidados com Osteoporose
          </h1>
          <p className="text-blue-700 dark:text-blue-300 text-lg mb-4">
            Monitoramento da Saúde Óssea - Densidade, Prevenção de Fraturas e Tratamento
          </p>
          <div className="bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-800 rounded-lg p-4">
            <p className="text-blue-800 dark:text-blue-200 text-sm leading-relaxed">
              <strong>Cuidados Especializados:</strong> Acompanhamento da densidade mineral óssea, prevenção de fraturas, 
              suplementação adequada de cálcio e vitamina D, exercícios específicos para fortalecimento ósseo e 
              orientações para redução do risco de quedas.
            </p>
          </div>
        </div>

        {/* Indicadores Principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white dark:bg-gray-800 border-blue-200 dark:border-blue-800">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-700 dark:text-blue-300">T-Score Coluna</p>
                  <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">-1.9</p>
                  <p className="text-xs text-orange-600 dark:text-orange-400">Osteopenia</p>
                </div>
                <TrendingDown className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-indigo-200 dark:border-indigo-800">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-indigo-700 dark:text-indigo-300">Cálcio Sérico</p>
                  <p className="text-2xl font-bold text-indigo-900 dark:text-indigo-100">9.8 mg/dL</p>
                  <p className="text-xs text-green-600 dark:text-green-400">Normal</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-purple-200 dark:border-purple-800">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-700 dark:text-purple-300">Vitamina D</p>
                  <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">32 ng/mL</p>
                  <p className="text-xs text-green-600 dark:text-green-400">Adequado</p>
                </div>
                <Shield className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-cyan-200 dark:border-cyan-800">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-cyan-700 dark:text-cyan-300">Próximo Exame</p>
                  <p className="text-2xl font-bold text-cyan-900 dark:text-cyan-100">6 meses</p>
                  <p className="text-xs text-blue-600 dark:text-blue-400">Densitometria</p>
                </div>
                <Calendar className="h-8 w-8 text-cyan-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-blue-800 dark:text-blue-200">Evolução da Densidade Óssea</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={densidadeOsseaData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="data" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="coluna" stroke="#2563eb" strokeWidth={2} name="Coluna Lombar" />
                  <Line type="monotone" dataKey="femur" stroke="#7c3aed" strokeWidth={2} name="Fêmur" />
                  <Line type="monotone" dataKey="punho" stroke="#0891b2" strokeWidth={2} name="Punho" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-blue-800 dark:text-blue-200">Aderência aos Suplementos</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={suplementosData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="suplemento" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value}%`, 'Aderência']} />
                  <Bar dataKey="aderencia" fill="#2563eb" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Plano de Cuidados */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-blue-800 dark:text-blue-200">Suplementação Atual</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {suplementosData.map((sup, index) => (
                  <div key={index} className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h4 className="font-medium text-blue-900 dark:text-blue-100">{sup.suplemento}</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300">{sup.dosagem} - {sup.frequencia}</p>
                    <div className="flex items-center mt-2">
                      <div className="flex-1 bg-blue-200 dark:bg-blue-800 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${sup.aderencia}%` }}
                        ></div>
                      </div>
                      <span className="ml-2 text-xs text-blue-600 dark:text-blue-400">{sup.aderencia}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-blue-800 dark:text-blue-200">Fatores de Risco</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {riscosData.map((risco, index) => (
                  <div key={index} className={`p-3 rounded-lg ${
                    risco.risco === 'Alto' ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800' :
                    risco.risco === 'Médio' ? 'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800' :
                    'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                  }`}>
                    <div className="flex justify-between items-center">
                      <h4 className={`font-medium ${
                        risco.risco === 'Alto' ? 'text-red-800 dark:text-red-200' :
                        risco.risco === 'Médio' ? 'text-yellow-800 dark:text-yellow-200' :
                        'text-green-800 dark:text-green-200'
                      }`}>{risco.fator}</h4>
                      <span className={`px-2 py-1 rounded text-xs ${
                        risco.risco === 'Alto' ? 'bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200' :
                        risco.risco === 'Médio' ? 'bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200' :
                        'bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200'
                      }`}>{risco.risco}</span>
                    </div>
                    <p className={`text-sm mt-1 ${
                      risco.risco === 'Alto' ? 'text-red-700 dark:text-red-300' :
                      risco.risco === 'Médio' ? 'text-yellow-700 dark:text-yellow-300' :
                      'text-green-700 dark:text-green-300'
                    }`}>{risco.valor}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-blue-800 dark:text-blue-200">Exercícios Recomendados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <Activity className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-green-800 dark:text-green-200 text-sm font-medium">Caminhada</p>
                    <p className="text-green-700 dark:text-green-300 text-xs">30 min, 5x/semana</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <Activity className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-blue-800 dark:text-blue-200 text-sm font-medium">Musculação</p>
                    <p className="text-blue-700 dark:text-blue-300 text-xs">2-3x/semana, peso moderado</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg">
                  <Activity className="h-5 w-5 text-purple-600 mt-0.5" />
                  <div>
                    <p className="text-purple-800 dark:text-purple-200 text-sm font-medium">Tai Chi</p>
                    <p className="text-purple-700 dark:text-purple-300 text-xs">Equilíbrio e coordenação</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="text-yellow-800 dark:text-yellow-200 text-sm font-medium">Evitar</p>
                    <p className="text-yellow-700 dark:text-yellow-300 text-xs">Exercícios de alto impacto</p>
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

export default OsteoporosisCarePage;
