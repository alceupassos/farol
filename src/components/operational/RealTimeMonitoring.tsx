import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Monitor, Activity, Server, Database, RefreshCw, Play, Pause, Zap } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface RealTimeData {
  timestamp: string;
  documentsProcessed: number;
  activeUsers: number;
  systemLoad: number;
  memoryUsage: number;
  apiCalls: number;
}

interface RealTimeMonitoringProps {
  compact?: boolean;
}

export const RealTimeMonitoring: React.FC<RealTimeMonitoringProps> = ({ compact = false }) => {
  const [realTimeData, setRealTimeData] = useState<RealTimeData[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  useEffect(() => {
    // Initialize with some sample data
    generateSampleData();
    
    const interval = setInterval(() => {
      if (isMonitoring) {
        updateRealTimeData();
      }
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [isMonitoring]);

  const generateSampleData = () => {
    const data = [];
    const now = new Date();
    
    for (let i = 23; i >= 0; i--) {
      const timestamp = new Date(now.getTime() - i * 5 * 60 * 1000);
      data.push({
        timestamp: timestamp.toLocaleTimeString('pt-BR', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        documentsProcessed: Math.floor(Math.random() * 50) + 20,
        activeUsers: Math.floor(Math.random() * 200) + 50,
        systemLoad: Math.floor(Math.random() * 30) + 40,
        memoryUsage: Math.floor(Math.random() * 20) + 60,
        apiCalls: Math.floor(Math.random() * 100) + 150
      });
    }
    
    setRealTimeData(data);
  };

  const updateRealTimeData = () => {
    setRealTimeData(prev => {
      const newData = [...prev.slice(1)];
      const now = new Date();
      
      newData.push({
        timestamp: now.toLocaleTimeString('pt-BR', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        documentsProcessed: Math.floor(Math.random() * 50) + 20,
        activeUsers: Math.floor(Math.random() * 200) + 50,
        systemLoad: Math.floor(Math.random() * 30) + 40,
        memoryUsage: Math.floor(Math.random() * 20) + 60,
        apiCalls: Math.floor(Math.random() * 100) + 150
      });
      
      return newData;
    });
    
    setLastUpdate(new Date());
  };

  const toggleMonitoring = () => {
    setIsMonitoring(!isMonitoring);
  };

  const currentData = realTimeData[realTimeData.length - 1];

  if (compact) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Monitor className="w-5 h-5" />
            Status do Sistema
            <div className={`h-2 w-2 rounded-full ${isMonitoring ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 border border-border rounded-lg">
              <div className="text-2xl font-bold text-blue-500">{currentData?.activeUsers || 0}</div>
              <div className="text-xs text-muted-foreground">Usuários Ativos</div>
            </div>
            <div className="text-center p-3 border border-border rounded-lg">
              <div className="text-2xl font-bold text-green-500">{currentData?.documentsProcessed || 0}</div>
              <div className="text-xs text-muted-foreground">Docs/5min</div>
            </div>
          </div>
          <div className="mt-4">
            <ResponsiveContainer width="100%" height={120}>
              <LineChart data={realTimeData.slice(-6)}>
                <Line 
                  type="monotone" 
                  dataKey="systemLoad" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className={`h-3 w-3 rounded-full ${isMonitoring ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
            <span className="text-sm font-medium">
              {isMonitoring ? 'Monitoramento Ativo' : 'Monitoramento Pausado'}
            </span>
          </div>
          <Badge variant="secondary" className="text-xs">
            Última atualização: {lastUpdate.toLocaleTimeString()}
          </Badge>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleMonitoring}
            className="flex items-center gap-2"
          >
            {isMonitoring ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isMonitoring ? 'Pausar' : 'Iniciar'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={updateRealTimeData}
            className="flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Atualizar
          </Button>
        </div>
      </div>

      {/* Current Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Activity className="w-6 h-6 mx-auto mb-2 text-blue-500" />
            <div className="text-2xl font-bold">{currentData?.activeUsers || 0}</div>
            <div className="text-xs text-muted-foreground">Usuários Ativos</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Server className="w-6 h-6 mx-auto mb-2 text-green-500" />
            <div className="text-2xl font-bold">{currentData?.systemLoad || 0}%</div>
            <div className="text-xs text-muted-foreground">Carga do Sistema</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Database className="w-6 h-6 mx-auto mb-2 text-purple-500" />
            <div className="text-2xl font-bold">{currentData?.memoryUsage || 0}%</div>
            <div className="text-xs text-muted-foreground">Uso de Memória</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Zap className="w-6 h-6 mx-auto mb-2 text-orange-500" />
            <div className="text-2xl font-bold">{currentData?.apiCalls || 0}</div>
            <div className="text-xs text-muted-foreground">Chamadas API/5min</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Monitor className="w-6 h-6 mx-auto mb-2 text-red-500" />
            <div className="text-2xl font-bold">{currentData?.documentsProcessed || 0}</div>
            <div className="text-xs text-muted-foreground">Docs Processados</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Tabs defaultValue="system" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="system">Performance do Sistema</TabsTrigger>
          <TabsTrigger value="usage">Uso de Recursos</TabsTrigger>
          <TabsTrigger value="activity">Atividade de Usuários</TabsTrigger>
        </TabsList>

        <TabsContent value="system" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Carga do Sistema em Tempo Real</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={realTimeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="timestamp" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="systemLoad" 
                    stackId="1" 
                    stroke="hsl(var(--primary))" 
                    fill="hsl(var(--primary))" 
                    name="Carga do Sistema (%)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Uso de Recursos</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={realTimeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="timestamp" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="memoryUsage" 
                    stroke="hsl(var(--secondary))" 
                    name="Memória (%)" 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="systemLoad" 
                    stroke="hsl(var(--primary))" 
                    name="CPU (%)" 
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Usuários Ativos</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={realTimeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timestamp" />
                    <YAxis />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="activeUsers" 
                      stroke="hsl(var(--accent))" 
                      fill="hsl(var(--accent))" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Atividade de Processamento</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={realTimeData.slice(-8)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timestamp" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="documentsProcessed" fill="hsl(var(--primary))" name="Documentos" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};