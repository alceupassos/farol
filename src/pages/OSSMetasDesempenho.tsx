import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Target, TrendingUp, TrendingDown, CheckCircle, XCircle, AlertTriangle,
  Calendar, Users, BarChart3, Activity, FileText, Download, RefreshCw,
  ChevronRight, Clock, Award
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  Radar, ComposedChart, Area, Cell
} from 'recharts';

const OSSMetasDesempenho = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('trimestral');

  // Dados de Metas
  const metasData = [
    { id: 1, contrato: 'Prefeitura de Cesário Lange', indicador: 'Consultas Médicas', meta: 3000, realizado: 3245, percentual: 108.2, status: 'atingida', peso: 25 },
    { id: 2, contrato: 'Prefeitura de Cesário Lange', indicador: 'Cirurgias Eletivas', meta: 150, realizado: 142, percentual: 94.7, status: 'parcial', peso: 30 },
    { id: 3, contrato: 'Prefeitura de Cesário Lange', indicador: 'Exames Laboratoriais', meta: 5000, realizado: 5234, percentual: 104.7, status: 'atingida', peso: 20 },
    { id: 4, contrato: 'Hospital Regional', indicador: 'Taxa de Ocupação', meta: 85, realizado: 82, percentual: 96.5, status: 'parcial', peso: 35 },
    { id: 5, contrato: 'Hospital Regional', indicador: 'Tempo Médio Permanência', meta: 4.5, realizado: 4.2, percentual: 107.1, status: 'atingida', peso: 25 }
  ];

  // Dados Radar
  const radarData = [
    { indicador: 'Consultas', A: 95, B: 108, C: 87, meta: 100 },
    { indicador: 'Cirurgias', A: 88, B: 95, C: 92, meta: 100 },
    { indicador: 'Exames', A: 105, B: 98, C: 110, meta: 100 },
    { indicador: 'Internações', A: 92, B: 89, C: 94, meta: 100 },
    { indicador: 'Emergência', A: 97, B: 103, C: 91, meta: 100 },
    { indicador: 'Qualidade', A: 94, B: 96, C: 98, meta: 100 }
  ];

  // Evolução
  const evolucaoData = [
    { mes: 'Jan', meta: 100, realizado: 95, tendencia: 93 },
    { mes: 'Fev', meta: 100, realizado: 97, tendencia: 95 },
    { mes: 'Mar', meta: 100, realizado: 92, tendencia: 94 },
    { mes: 'Abr', meta: 100, realizado: 98, tendencia: 96 },
    { mes: 'Mai', meta: 100, realizado: 103, tendencia: 98 },
    { mes: 'Jun', meta: 100, realizado: 105, tendencia: 101 }
  ];

  // Planos
  const planosAcao = [
    { id: 1, meta: 'Cirurgias Eletivas', acao: 'Ampliar horário do centro cirúrgico', responsavel: 'Dr. Silva', prazo: '15/02/2025', status: 'em_andamento', impacto: '+15 cirurgias/mês', progresso: 60 },
    { id: 2, meta: 'Taxa de Ocupação', acao: 'Otimizar fluxo de altas', responsavel: 'Enf. Maria', prazo: '28/02/2025', status: 'planejado', impacto: '+3% ocupação', progresso: 25 },
    { id: 3, meta: 'Tempo de Espera', acao: 'Implementar triagem avançada', responsavel: 'Coord. João', prazo: '10/03/2025', status: 'em_andamento', impacto: '-30min espera', progresso: 45 }
  ];

  // Benchmark
  const benchmarkData = [
    { unidade: 'Cesário Lange', score: 94, ranking: 2 },
    { unidade: 'Hospital A', score: 96, ranking: 1 },
    { unidade: 'Hospital B', score: 89, ranking: 4 },
    { unidade: 'Hospital C', score: 91, ranking: 3 },
    { unidade: 'Média Regional', score: 92, ranking: null }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'atingida': return <Badge className="bg-green-100 text-green-800">Atingida</Badge>;
      case 'parcial': return <Badge className="bg-yellow-100 text-yellow-800">Parcial</Badge>;
      default: return <Badge className="bg-red-100 text-red-800">Não Atingida</Badge>;
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Metas e Desempenho</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Acompanhamento de metas contratuais</p>
          </div>
          <div className="flex gap-2">
            <select className="px-3 py-2 border rounded-md" value={selectedPeriod} onChange={(e) => setSelectedPeriod(e.target.value)}>
              <option value="mensal">Mensal</option>
              <option value="trimestral">Trimestral</option>
              <option value="anual">Anual</option>
            </select>
            <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-2" />Exportar</Button>
            <Button variant="default" size="sm"><RefreshCw className="h-4 w-4 mr-2" />Atualizar</Button>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Metas Atingidas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">68%</div>
              <p className="text-xs text-gray-500">17 de 25 indicadores</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Desempenho Médio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94.3%</div>
              <p className="text-xs text-gray-500">Meta: 95%</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Planos de Ação</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-gray-500">8 em andamento</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Ranking Regional</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold flex items-center">2º <Award className="h-5 w-5 text-yellow-500 ml-2" /></div>
              <p className="text-xs text-gray-500">Entre 15 unidades</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="metas" className="space-y-4">
          <TabsList>
            <TabsTrigger value="metas">Metas x Realizado</TabsTrigger>
            <TabsTrigger value="comparativo">Comparativo</TabsTrigger>
            <TabsTrigger value="evolucao">Evolução</TabsTrigger>
            <TabsTrigger value="planos">Planos de Ação</TabsTrigger>
            <TabsTrigger value="benchmark">Benchmark</TabsTrigger>
          </TabsList>

          {/* Metas x Realizado */}
          <TabsContent value="metas">
            <Card>
              <CardHeader><CardTitle>Metas Contratuais</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {metasData.map((meta) => (
                    <div key={meta.id} className="border rounded-lg p-4">
                      <div className="flex justify-between mb-3">
                        <div>
                          <h4 className="font-semibold">{meta.indicador}</h4>
                          <p className="text-sm text-gray-500">{meta.contrato}</p>
                        </div>
                        {getStatusBadge(meta.status)}
                      </div>
                      <div className="grid grid-cols-4 gap-4">
                        <div>
                          <p className="text-xs text-gray-500">Meta</p>
                          <p className="font-bold">{meta.meta}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Realizado</p>
                          <p className="font-bold">{meta.realizado}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Atingimento</p>
                          <p className="font-bold">{meta.percentual}%</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Peso</p>
                          <p className="font-bold">{meta.peso}%</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Comparativo */}
          <TabsContent value="comparativo">
            <Card>
              <CardHeader><CardTitle>Análise Comparativa</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <RadarChart data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="indicador" />
                    <PolarRadiusAxis angle={90} domain={[0, 120]} />
                    <Radar name="Unidade A" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                    <Radar name="Unidade B" dataKey="B" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                    <Radar name="Unidade C" dataKey="C" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.3} />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Evolução */}
          <TabsContent value="evolucao">
            <Card>
              <CardHeader><CardTitle>Evolução Temporal</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <ComposedChart data={evolucaoData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mes" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="realizado" fill="#3b82f6" fillOpacity={0.3} />
                    <Line type="monotone" dataKey="meta" stroke="#ef4444" strokeDasharray="5 5" strokeWidth={2} />
                    <Line type="monotone" dataKey="realizado" stroke="#3b82f6" strokeWidth={2} />
                    <Line type="monotone" dataKey="tendencia" stroke="#10b981" strokeDasharray="3 3" strokeWidth={2} />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Planos de Ação */}
          <TabsContent value="planos">
            <Card>
              <CardHeader><CardTitle>Planos de Ação</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {planosAcao.map((plano) => (
                    <div key={plano.id} className="border rounded-lg p-4">
                      <h4 className="font-semibold">{plano.acao}</h4>
                      <p className="text-sm text-gray-500">Meta: {plano.meta}</p>
                      <div className="grid grid-cols-3 gap-4 mt-3">
                        <div>
                          <p className="text-xs text-gray-500">Responsável</p>
                          <p className="font-medium">{plano.responsavel}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Prazo</p>
                          <p className="font-medium">{plano.prazo}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Impacto</p>
                          <p className="font-medium text-green-600">{plano.impacto}</p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progresso</span>
                          <span>{plano.progresso}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${plano.progresso}%` }}></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Benchmark */}
          <TabsContent value="benchmark">
            <Card>
              <CardHeader><CardTitle>Benchmark Regional</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={benchmarkData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="unidade" angle={-45} textAnchor="end" height={100} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="score">
                      {benchmarkData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.unidade === 'Cesário Lange' ? '#3b82f6' : '#e5e7eb'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default OSSMetasDesempenho;
