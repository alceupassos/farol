import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { RefreshCw, Database, CheckCircle, AlertTriangle, Clock, Play, Pause, Settings } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SyncJob {
  id: string;
  name: string;
  source: string;
  destination: string;
  status: 'running' | 'completed' | 'failed' | 'scheduled' | 'paused';
  progress: number;
  lastRun: Date;
  nextRun: Date;
  recordsProcessed: number;
  totalRecords: number;
  dataTypes: string[];
  syncType: 'full' | 'incremental' | 'real-time';
  duration: number; // in minutes
  errorCount: number;
}

interface SyncMetrics {
  totalJobs: number;
  activeJobs: number;
  completedToday: number;
  failedToday: number;
  totalRecordsToday: number;
  avgDuration: number;
  successRate: number;
  hourlyData: Array<{ hour: string; synced: number; errors: number }>;
}

export const DataSyncMonitor = () => {
  const [jobs, setJobs] = useState<SyncJob[]>([]);
  const [metrics, setMetrics] = useState<SyncMetrics | null>(null);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    generateSyncData();
    
    if (autoRefresh) {
      const interval = setInterval(generateSyncData, 10000); // Refresh every 10 seconds
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const generateSyncData = () => {
    const sampleJobs: SyncJob[] = [
      {
        id: '1',
        name: 'Hospital das Clínicas - Registros de Pacientes',
        source: 'Hospital das Clínicas API',
        destination: 'MedChain Database',
        status: 'running',
        progress: 67,
        lastRun: new Date(Date.now() - 10 * 60 * 1000),
        nextRun: new Date(Date.now() + 50 * 60 * 1000),
        recordsProcessed: 1340,
        totalRecords: 2000,
        dataTypes: ['patient-records', 'medical-history'],
        syncType: 'incremental',
        duration: 15,
        errorCount: 3
      },
      {
        id: '2',
        name: 'Laboratório Fleury - Resultados',
        source: 'Fleury API',
        destination: 'MedChain Database',
        status: 'completed',
        progress: 100,
        lastRun: new Date(Date.now() - 30 * 60 * 1000),
        nextRun: new Date(Date.now() + 30 * 60 * 1000),
        recordsProcessed: 856,
        totalRecords: 856,
        dataTypes: ['lab-results', 'reports'],
        syncType: 'real-time',
        duration: 8,
        errorCount: 0
      },
      {
        id: '3',
        name: 'DATASUS - Dados Epidemiológicos',
        source: 'DATASUS API',
        destination: 'MedChain Analytics',
        status: 'failed',
        progress: 45,
        lastRun: new Date(Date.now() - 2 * 60 * 60 * 1000),
        nextRun: new Date(Date.now() + 4 * 60 * 60 * 1000),
        recordsProcessed: 450,
        totalRecords: 1000,
        dataTypes: ['epidemiological-data', 'mortality-data'],
        syncType: 'full',
        duration: 120,
        errorCount: 15
      },
      {
        id: '4',
        name: 'UBS Centro - Consultas',
        source: 'UBS Centro System',
        destination: 'MedChain Database',
        status: 'scheduled',
        progress: 0,
        lastRun: new Date(Date.now() - 6 * 60 * 60 * 1000),
        nextRun: new Date(Date.now() + 15 * 60 * 1000),
        recordsProcessed: 0,
        totalRecords: 450,
        dataTypes: ['consultations', 'prescriptions'],
        syncType: 'incremental',
        duration: 25,
        errorCount: 0
      },
      {
        id: '5',
        name: 'Farmácia Popular - Dispensações',
        source: 'Farmácia Popular API',
        destination: 'MedChain Pharmacy',
        status: 'paused',
        progress: 25,
        lastRun: new Date(Date.now() - 4 * 60 * 60 * 1000),
        nextRun: new Date(Date.now() + 2 * 60 * 60 * 1000),
        recordsProcessed: 125,
        totalRecords: 500,
        dataTypes: ['dispensations', 'stock'],
        syncType: 'incremental',
        duration: 30,
        errorCount: 2
      }
    ];

    const sampleMetrics: SyncMetrics = {
      totalJobs: sampleJobs.length,
      activeJobs: sampleJobs.filter(j => j.status === 'running').length,
      completedToday: sampleJobs.filter(j => j.status === 'completed').length,
      failedToday: sampleJobs.filter(j => j.status === 'failed').length,
      totalRecordsToday: sampleJobs.reduce((acc, j) => acc + j.recordsProcessed, 0),
      avgDuration: sampleJobs.reduce((acc, j) => acc + j.duration, 0) / sampleJobs.length,
      successRate: (sampleJobs.filter(j => j.status === 'completed').length / sampleJobs.length) * 100,
      hourlyData: Array.from({ length: 24 }, (_, i) => ({
        hour: `${i.toString().padStart(2, '0')}:00`,
        synced: Math.floor(Math.random() * 200) + 50,
        errors: Math.floor(Math.random() * 10)
      }))
    };

    setJobs(sampleJobs);
    setMetrics(sampleMetrics);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-blue-500/20 text-blue-500 border-blue-500/30';
      case 'completed': return 'bg-green-500/20 text-green-500 border-green-500/30';
      case 'failed': return 'bg-red-500/20 text-red-500 border-red-500/30';
      case 'scheduled': return 'bg-purple-500/20 text-purple-500 border-purple-500/30';
      case 'paused': return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30';
      default: return 'bg-gray-500/20 text-gray-500 border-gray-500/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running': return <RefreshCw className="w-4 h-4 text-blue-500 animate-spin" />;
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'failed': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'scheduled': return <Clock className="w-4 h-4 text-purple-500" />;
      case 'paused': return <Pause className="w-4 h-4 text-yellow-500" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getSyncTypeColor = (type: string) => {
    switch (type) {
      case 'real-time': return 'bg-green-500/20 text-green-500 border-green-500/30';
      case 'incremental': return 'bg-blue-500/20 text-blue-500 border-blue-500/30';
      case 'full': return 'bg-purple-500/20 text-purple-500 border-purple-500/30';
      default: return 'bg-gray-500/20 text-gray-500 border-gray-500/30';
    }
  };

  const toggleJobStatus = (jobId: string) => {
    setJobs(prev => prev.map(job => 
      job.id === jobId 
        ? { 
            ...job, 
            status: job.status === 'paused' ? 'scheduled' : 'paused'
          }
        : job
    ));
  };

  const restartJob = (jobId: string) => {
    setJobs(prev => prev.map(job => 
      job.id === jobId 
        ? { 
            ...job, 
            status: 'running' as const,
            progress: 0,
            recordsProcessed: 0,
            errorCount: 0,
            lastRun: new Date()
          }
        : job
    ));
  };

  const filteredJobs = selectedType === 'all' 
    ? jobs 
    : jobs.filter(job => job.syncType === selectedType);

  return (
    <div className="space-y-6">
      {/* Sync Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Database className="w-6 h-6 mx-auto mb-2 text-blue-500" />
            <div className="text-2xl font-bold">{metrics?.totalJobs}</div>
            <div className="text-xs text-muted-foreground">Jobs Totais</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <RefreshCw className="w-6 h-6 mx-auto mb-2 text-green-500" />
            <div className="text-2xl font-bold">{metrics?.activeJobs}</div>
            <div className="text-xs text-muted-foreground">Jobs Ativos</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <CheckCircle className="w-6 h-6 mx-auto mb-2 text-emerald-500" />
            <div className="text-2xl font-bold">{metrics?.successRate.toFixed(1)}%</div>
            <div className="text-xs text-muted-foreground">Taxa de Sucesso</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <AlertTriangle className="w-6 h-6 mx-auto mb-2 text-red-500" />
            <div className="text-2xl font-bold">{metrics?.totalRecordsToday.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Registros Hoje</div>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Tipo de Sync" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Tipos</SelectItem>
              <SelectItem value="real-time">Tempo Real</SelectItem>
              <SelectItem value="incremental">Incremental</SelectItem>
              <SelectItem value="full">Completo</SelectItem>
            </SelectContent>
          </Select>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setAutoRefresh(!autoRefresh)}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${autoRefresh ? 'animate-spin' : ''}`} />
            Auto Refresh {autoRefresh ? 'ON' : 'OFF'}
          </Button>
        </div>
        
        <Button onClick={generateSyncData}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Atualizar Agora
        </Button>
      </div>

      <Tabs defaultValue="jobs" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="jobs">Jobs de Sincronização</TabsTrigger>
          <TabsTrigger value="metrics">Métricas e Gráficos</TabsTrigger>
        </TabsList>

        <TabsContent value="jobs" className="space-y-4">
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <Card key={job.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(job.status)}
                      <div>
                        <h3 className="font-semibold">{job.name}</h3>
                        <div className="text-xs text-muted-foreground">
                          {job.source} → {job.destination}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getSyncTypeColor(job.syncType)}>
                        {job.syncType}
                      </Badge>
                      <Badge className={getStatusColor(job.status)}>
                        {job.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Progress Bar */}
                  {job.status === 'running' && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progresso:</span>
                        <span>{job.recordsProcessed.toLocaleString()} / {job.totalRecords.toLocaleString()} registros</span>
                      </div>
                      <Progress value={job.progress} className="h-2" />
                      <div className="text-center text-xs text-muted-foreground">
                        {job.progress}% concluído
                      </div>
                    </div>
                  )}
                  
                  {/* Job Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-blue-500">
                        {job.recordsProcessed.toLocaleString()}
                      </div>
                      <div className="text-xs text-muted-foreground">Processados</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-purple-500">
                        {job.duration}min
                      </div>
                      <div className="text-xs text-muted-foreground">Duração</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-red-500">
                        {job.errorCount}
                      </div>
                      <div className="text-xs text-muted-foreground">Erros</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-green-500">
                        {job.nextRun.toLocaleTimeString()}
                      </div>
                      <div className="text-xs text-muted-foreground">Próxima Exec.</div>
                    </div>
                  </div>
                  
                  {/* Data Types */}
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Tipos de Dados:</div>
                    <div className="flex flex-wrap gap-1">
                      {job.dataTypes.map((dataType, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {dataType}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Última execução: {job.lastRun.toLocaleString()}</span>
                    <div className="flex gap-2">
                      {job.status === 'failed' && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => restartJob(job.id)}
                        >
                          <Play className="w-4 h-4 mr-1" />
                          Reiniciar
                        </Button>
                      )}
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => toggleJobStatus(job.id)}
                      >
                        {job.status === 'paused' ? (
                          <>
                            <Play className="w-4 h-4 mr-1" />
                            Retomar
                          </>
                        ) : (
                          <>
                            <Pause className="w-4 h-4 mr-1" />
                            Pausar
                          </>
                        )}
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4 mr-1" />
                        Configurar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="metrics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Sincronização por Hora</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={metrics?.hourlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="synced" 
                      stackId="1"
                      stroke="hsl(var(--primary))" 
                      fill="hsl(var(--primary))" 
                      name="Registros Sincronizados"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="errors" 
                      stackId="2"
                      stroke="hsl(var(--destructive))" 
                      fill="hsl(var(--destructive))" 
                      name="Erros"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance dos Jobs</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={filteredJobs}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="recordsProcessed" 
                      stroke="hsl(var(--primary))" 
                      name="Registros Processados"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="errorCount" 
                      stroke="hsl(var(--destructive))" 
                      name="Erros"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Estatísticas do Dia</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Jobs Concluídos:</span>
                    <span className="font-bold text-green-500">{metrics?.completedToday}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Jobs com Falha:</span>
                    <span className="font-bold text-red-500">{metrics?.failedToday}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tempo Médio:</span>
                    <span className="font-bold">{metrics?.avgDuration.toFixed(1)}min</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Volume de Dados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">
                    {metrics?.totalRecordsToday.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Registros sincronizados hoje
                  </div>
                  <div className="mt-4 text-xs text-muted-foreground">
                    Taxa: ~{Math.round((metrics?.totalRecordsToday || 0) / 24)} registros/hora
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Qualidade da Sync</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-500">
                    {metrics?.successRate.toFixed(1)}%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Taxa de sucesso geral
                  </div>
                  <Progress value={metrics?.successRate} className="mt-4 h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};