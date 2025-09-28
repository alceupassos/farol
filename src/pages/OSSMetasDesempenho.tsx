import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Calendar, Target, Activity, TrendingUp, AlertTriangle, CheckCircle, Download } from 'lucide-react';
import { performanceData, metasIndicadores } from '@/data/performanceData';

const OSSMetasDesempenho = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('trimestral');
  const [activeTab, setActiveTab] = useState('indicadores');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'excelente':
        return <Badge className="bg-green-500 hover:bg-green-600">Excelente</Badge>;
      case 'bom':
        return <Badge className="bg-blue-500 hover:bg-blue-600">Bom</Badge>;
      case 'alerta':
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Atenção</Badge>;
      case 'critico':
        return <Badge className="bg-red-500 hover:bg-red-600">Crítico</Badge>;
      default:
        return <Badge>N/A</Badge>;
    }
  };

  const getTendenciaIcon = (tendencia: string) => {
    switch (tendencia) {
      case 'melhorando':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'piorando':
        return <TrendingUp className="h-4 w-4 text-red-500 transform rotate-180" />;
      default:
        return <Activity className="h-4 w-4 text-yellow-500" />;
    }
  };

  return (
    <div className="min-h-screen space-y-8 bg-gradient-to-br from-slate-950 via-slate-900 to-black p-6 text-slate-100">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Metas & Desempenho</h1>
          <p className="text-slate-400">Acompanhe o desempenho e o cumprimento das metas contratuais</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="text-slate-300 border-slate-700">
            <Calendar className="mr-2 h-4 w-4" />
            Últimos 6 meses
          </Button>
          <Button size="sm">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      <Tabs defaultValue="indicadores" onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="indicadores">Indicadores</TabsTrigger>
          <TabsTrigger value="evolucao">Evolução</TabsTrigger>
          <TabsTrigger value="detalhes">Detalhes</TabsTrigger>
        </TabsList>

        <TabsContent value="indicadores" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-slate-800 bg-slate-900/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Média de Desempenho</CardTitle>
                <Target className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">94.5%</div>
                <p className="text-xs text-slate-500 flex items-center">
                  <span className="text-green-500 mr-1">+2.5%</span> em relação ao período anterior
                </p>
                <Progress value={94.5} className="h-2 mt-2 bg-slate-800" />
              </CardContent>
            </Card>

            <Card className="border-slate-800 bg-slate-900/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Taxa de Glosas</CardTitle>
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1.2%</div>
                <p className="text-xs text-slate-500 flex items-center">
                  <span className="text-green-500 mr-1">-0.8%</span> em relação ao período anterior
                </p>
                <Progress value={80} className="h-2 mt-2 bg-slate-800" />
              </CardContent>
            </Card>

            <Card className="border-slate-800 bg-slate-900/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Satisfação do Cliente</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.7/5.0</div>
                <p className="text-xs text-slate-500 flex items-center">
                  <span className="text-green-500 mr-1">+0.2</span> em relação ao período anterior
                </p>
                <Progress value={94} className="h-2 mt-2 bg-slate-800" />
              </CardContent>
            </Card>

            <Card className="border-slate-800 bg-slate-900/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Eficiência Operacional</CardTitle>
                <Activity className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">96%</div>
                <p className="text-xs text-slate-500 flex items-center">
                  <span className="text-green-500 mr-1">+1.5%</span> em relação ao período anterior
                </p>
                <Progress value={96} className="h-2 mt-2 bg-slate-800" />
              </CardContent>
            </Card>
          </div>

          <Card className="border-slate-800 bg-slate-900/50">
            <CardHeader>
              <CardTitle>Indicadores de Desempenho</CardTitle>
              <CardDescription>Desempenho em relação às metas contratuais</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="w-[300px]">Indicador</TableHead>
                    <TableHead>Meta</TableHead>
                    <TableHead>Atual</TableHead>
                    <TableHead>Tendência</TableHead>
                    <TableHead className="text-right">Progresso</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {metasIndicadores.map((indicador) => (
                    <TableRow key={indicador.id} className="hover:bg-slate-800/50">
                      <TableCell className="font-medium">{indicador.nome}</TableCell>
                      <TableCell>{indicador.meta}</TableCell>
                      <TableCell>{indicador.atual}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {getTendenciaIcon(indicador.tendencia)}
                          <span className="capitalize">{indicador.tendencia}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={indicador.progresso} className="h-2 bg-slate-800" />
                          <span className="text-sm text-slate-400">{indicador.progresso}%</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        {getStatusBadge(indicador.status)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="evolucao" className="space-y-4">
          <Card className="border-slate-800 bg-slate-900/50">
            <CardHeader>
              <CardTitle>Evolução do Desempenho</CardTitle>
              <CardDescription>Comparação entre meta e realizado nos últimos 6 meses</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="month" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b' }}
                    itemStyle={{ color: '#e2e8f0' }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="meta" stroke="#3b82f6" name="Meta" strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="realizado" stroke="#10b981" name="Realizado" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border-slate-800 bg-slate-900/50">
              <CardHeader>
                <CardTitle>Evolução das Glosas</CardTitle>
                <CardDescription>Variação percentual mensal</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="month" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b' }}
                      itemStyle={{ color: '#e2e8f0' }}
                    />
                    <Bar dataKey="glosas" name="Glosas (%)" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-slate-800 bg-slate-900/50">
              <CardHeader>
                <CardTitle>Eficiência x Satisfação</CardTitle>
                <CardDescription>Relação entre eficiência operacional e satisfação</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="month" stroke="#94a3b8" />
                    <YAxis yAxisId="left" stroke="#3b82f6" />
                    <YAxis yAxisId="right" orientation="right" stroke="#10b981" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b' }}
                      itemStyle={{ color: '#e2e8f0' }}
                    />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="eficiencia" stroke="#3b82f6" name="Eficiência (%)" strokeWidth={2} dot={{ r: 4 }} />
                    <Line yAxisId="right" type="monotone" dataKey="satisfacao" stroke="#10b981" name="Satisfação (1-5)" strokeWidth={2} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="detalhes">
          <Card className="border-slate-800 bg-slate-900/50">
            <CardHeader>
              <CardTitle>Detalhes das Metas</CardTitle>
              <CardDescription>Informações detalhadas sobre cada meta contratual</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {metasIndicadores.map((meta) => (
                  <div key={meta.id} className="border border-slate-800 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-lg text-white">{meta.nome}</h3>
                        <p className="text-sm text-slate-400 mt-1">
                          Meta: <span className="text-white">{meta.meta}</span> | 
                          Atual: <span className="text-white">{meta.atual}</span>
                        </p>
                      </div>
                      {getStatusBadge(meta.status)}
                    </div>
                    
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Progresso</span>
                        <span className="text-white">{meta.progresso}%</span>
                      </div>
                      <Progress value={meta.progresso} className="h-2 bg-slate-800" />
                      
                      <div className="flex items-center gap-2 text-sm mt-2">
                        <span className="text-slate-400">Tendência:</span>
                        <div className="flex items-center gap-1">
                          {getTendenciaIcon(meta.tendencia)}
                          <span className="capitalize">{meta.tendencia}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-slate-800">
                      <h4 className="text-sm font-medium text-slate-300 mb-2">Ações Recomendadas</h4>
                      <ul className="text-sm text-slate-400 space-y-1">
                        {meta.status === 'excelente' && (
                          <li>• Manter estratégias atuais de monitoramento</li>
                        )}
                        {meta.status === 'bom' && (
                          <li>• Identificar oportunidades de melhoria contínua</li>
                        )}
                        {meta.status === 'alerta' && (
                          <>
                            <li>• Realizar análise de causa raiz</li>
                            <li>• Implementar plano de ação corretiva</li>
                          </>
                        )}
                        {meta.status === 'critico' && (
                          <>
                            <li>• Acionar comitê de crise</li>
                            <li>• Revisar processos críticos</li>
                            <li>• Alocar recursos adicionais</li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OSSMetasDesempenho;
