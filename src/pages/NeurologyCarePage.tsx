import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Activity, AlertTriangle, CheckCircle, Calendar, Pill } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const NeurologyCarePage = () => {
  const cognitiveData = [
    { mes: 'Jan', memoria: 85, atencao: 78, linguagem: 92, executiva: 80 },
    { mes: 'Mar', memoria: 83, atencao: 80, linguagem: 90, executiva: 82 },
    { mes: 'Mai', memoria: 80, atencao: 75, linguagem: 88, executiva: 78 },
    { mes: 'Jul', memoria: 78, atencao: 73, linguagem: 85, executiva: 75 }
  ];

  const avaliacaoRadar = [
    { funcao: 'Memória', valor: 78, maximo: 100 },
    { funcao: 'Atenção', valor: 73, maximo: 100 },
    { funcao: 'Linguagem', valor: 85, maximo: 100 },
    { funcao: 'Função Executiva', valor: 75, maximo: 100 },
    { funcao: 'Orientação', valor: 90, maximo: 100 },
    { funcao: 'Coordenação', valor: 82, maximo: 100 }
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950 p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-indigo-800 dark:text-indigo-200 mb-2 flex items-center">
            <Brain className="h-10 w-10 mr-4 text-indigo-600" />
            Cuidados Neurológicos
          </h1>
          <p className="text-indigo-700 dark:text-indigo-300 text-lg mb-4">
            Avaliação Neurológica Completa - Cognição, Memória, Parkinson e Prevenção
          </p>
          <div className="bg-indigo-100 dark:bg-indigo-900/30 border border-indigo-300 dark:border-indigo-800 rounded-lg p-4">
            <p className="text-indigo-800 dark:text-indigo-200 text-sm leading-relaxed">
              <strong>Cuidados Integrados:</strong> Avaliação cognitiva, screening para demências, 
              acompanhamento de Parkinson, avaliação de memória, coordenação motora e orientações 
              para manutenção da saúde cerebral e prevenção de declínio cognitivo.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-indigo-700 dark:text-indigo-300">MEEM Score</p>
                  <p className="text-2xl font-bold text-indigo-900 dark:text-indigo-100">26/30</p>
                  <p className="text-xs text-green-600 dark:text-green-400">Normal</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-700 dark:text-purple-300">Memória</p>
                  <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">78%</p>
                  <p className="text-xs text-yellow-600 dark:text-yellow-400">Leve declínio</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-700 dark:text-blue-300">Coordenação</p>
                  <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">82%</p>
                  <p className="text-xs text-green-600 dark:text-green-400">Preservada</p>
                </div>
                <Activity className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-cyan-700 dark:text-cyan-300">Próxima Consulta</p>
                  <p className="text-2xl font-bold text-cyan-900 dark:text-cyan-100">3 meses</p>
                  <p className="text-xs text-blue-600 dark:text-blue-400">Neurologista</p>
                </div>
                <Calendar className="h-8 w-8 text-cyan-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-indigo-800 dark:text-indigo-200">Evolução Cognitiva</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={cognitiveData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis domain={[60, 100]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="memoria" stroke="#6366f1" strokeWidth={2} name="Memória" />
                  <Line type="monotone" dataKey="atencao" stroke="#8b5cf6" strokeWidth={2} name="Atenção" />
                  <Line type="monotone" dataKey="linguagem" stroke="#06b6d4" strokeWidth={2} name="Linguagem" />
                  <Line type="monotone" dataKey="executiva" stroke="#10b981" strokeWidth={2} name="F. Executiva" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-indigo-800 dark:text-indigo-200">Perfil Neurológico</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={avaliacaoRadar}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="funcao" />
                  <PolarRadiusAxis domain={[0, 100]} />
                  <Radar name="Avaliação" dataKey="valor" stroke="#6366f1" fill="#6366f1" fillOpacity={0.3} />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-indigo-800">Avaliações Realizadas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-800">Mini Exame Mental</h4>
                  <p className="text-sm text-green-700">26/30 pontos - Normal</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-800">Teste do Relógio</h4>
                  <p className="text-sm text-blue-700">8/10 pontos - Adequado</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <h4 className="font-medium text-purple-800">Fluência Verbal</h4>
                  <p className="text-sm text-purple-700">15 palavras/min - Normal</p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <h4 className="font-medium text-yellow-800">Memória Episódica</h4>
                  <p className="text-sm text-yellow-700">6/10 itens - Leve déficit</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-indigo-800">Fatores de Risco</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <h4 className="font-medium text-red-800">Alto Risco</h4>
                  <p className="text-sm text-red-700">Idade avançada (75 anos)</p>
                </div>
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="font-medium text-yellow-800">Médio Risco</h4>
                  <p className="text-sm text-yellow-700">Histórico familiar de demência</p>
                </div>
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-medium text-green-800">Baixo Risco</h4>
                  <p className="text-sm text-green-700">Atividade física regular</p>
                </div>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-medium text-blue-800">Protetor</h4>
                  <p className="text-sm text-blue-700">Alta escolaridade</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-indigo-800">Recomendações</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <Brain className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-green-800 text-sm font-medium">Estimulação Cognitiva</p>
                    <p className="text-green-700 text-xs">Leitura, jogos, palavras cruzadas</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <Activity className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-blue-800 text-sm font-medium">Exercício Físico</p>
                    <p className="text-blue-700 text-xs">150 min/semana de atividade</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                  <Pill className="h-5 w-5 text-purple-600 mt-0.5" />
                  <div>
                    <p className="text-purple-800 text-sm font-medium">Suplementação</p>
                    <p className="text-purple-700 text-xs">Vitamina B12, Ômega-3</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <Calendar className="h-5 w-5 text-orange-600 mt-0.5" />
                  <div>
                    <p className="text-orange-800 text-sm font-medium">Acompanhamento</p>
                    <p className="text-orange-700 text-xs">Reavaliação a cada 6 meses</p>
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

export default NeurologyCarePage;
