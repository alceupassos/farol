import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Database, Activity, Key, Globe, TrendingUp, AlertTriangle, CheckCircle, Settings, Plus } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface APIEndpoint {
  id: string;
  name: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  status: 'active' | 'deprecated' | 'maintenance';
  calls24h: number;
  successRate: number;
  avgResponseTime: number;
  rateLimit: number;
  rateLimitUsed: number;
  lastUsed: Date;
}

interface APIMetrics {
  totalCalls: number;
  successfulCalls: number;
  errorCalls: number;
  avgResponseTime: number;
  topEndpoints: string[];
  hourlyData: Array<{ hour: string; calls: number; errors: number }>;
}

interface APIManagementProps {
  compact?: boolean;
}

export const APIManagement: React.FC<APIManagementProps> = ({ compact = false }) => {
  const [endpoints, setEndpoints] = useState<APIEndpoint[]>([]);
  const [metrics, setMetrics] = useState<APIMetrics | null>(null);
  const [selectedEndpoint, setSelectedEndpoint] = useState<string>('all');

  useEffect(() => {
    generateAPIData();
  }, []);

  const generateAPIData = () => {
    const sampleEndpoints: APIEndpoint[] = [
      {
        id: '1',
        name: 'Get Patient Records',
        method: 'GET',
        path: '/api/v1/patients/{id}/records',
        status: 'active',
        calls24h: 2340,
        successRate: 98.5,
        avgResponseTime: 145,
        rateLimit: 1000,
        rateLimitUsed: 234,
        lastUsed: new Date(Date.now() - 2 * 60 * 1000)
      },
      {
        id: '2',
        name: 'Submit Lab Results',
        method: 'POST',
        path: '/api/v1/lab-results',
        status: 'active',
        calls24h: 1560,
        successRate: 97.2,
        avgResponseTime: 280,
        rateLimit: 500,
        rateLimitUsed: 156,
        lastUsed: new Date(Date.now() - 5 * 60 * 1000)
      },
      {
        id: '3',
        name: 'Update Patient Data',
        method: 'PUT',
        path: '/api/v1/patients/{id}',
        status: 'active',
        calls24h: 890,
        successRate: 95.8,
        avgResponseTime: 320,
        rateLimit: 200,
        rateLimitUsed: 89,
        lastUsed: new Date(Date.now() - 1 * 60 * 1000)
      },
      {
        id: '4',
        name: 'Get Health Analytics',
        method: 'GET',
        path: '/api/v1/analytics/health',
        status: 'maintenance',
        calls24h: 45,
        successRate: 89.2,
        avgResponseTime: 1200,
        rateLimit: 100,
        rateLimitUsed: 4,
        lastUsed: new Date(Date.now() - 30 * 60 * 1000)
      },
      {
        id: '5',
        name: 'Legacy Patient Search',
        method: 'GET',
        path: '/api/v0/patients/search',
        status: 'deprecated',
        calls24h: 12,
        successRate: 92.1,
        avgResponseTime: 850,
        rateLimit: 50,
        rateLimitUsed: 1,
        lastUsed: new Date(Date.now() - 4 * 60 * 60 * 1000)
      }
    ];

    const sampleMetrics: APIMetrics = {
      totalCalls: sampleEndpoints.reduce((acc, ep) => acc + ep.calls24h, 0),
      successfulCalls: sampleEndpoints.reduce((acc, ep) => acc + Math.floor(ep.calls24h * ep.successRate / 100), 0),
      errorCalls: sampleEndpoints.reduce((acc, ep) => acc + Math.floor(ep.calls24h * (100 - ep.successRate) / 100), 0),
      avgResponseTime: sampleEndpoints.reduce((acc, ep) => acc + ep.avgResponseTime, 0) / sampleEndpoints.length,
      topEndpoints: sampleEndpoints.sort((a, b) => b.calls24h - a.calls24h).slice(0, 5).map(ep => ep.name),
      hourlyData: Array.from({ length: 24 }, (_, i) => ({
        hour: `${i.toString().padStart(2, '0')}:00`,
        calls: Math.floor(Math.random() * 500) + 100,
        errors: Math.floor(Math.random() * 20) + 2
      }))
    };

    setEndpoints(sampleEndpoints);
    setMetrics(sampleMetrics);
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'bg-blue-500/20 text-blue-500 border-blue-500/30';
      case 'POST': return 'bg-green-500/20 text-green-500 border-green-500/30';
      case 'PUT': return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30';
      case 'DELETE': return 'bg-red-500/20 text-red-500 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-500 border-gray-500/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-500 border-green-500/30';
      case 'maintenance': return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30';
      case 'deprecated': return 'bg-red-500/20 text-red-500 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-500 border-gray-500/30';
    }
  };

  if (compact) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Database className="w-5 h-5" />
            APIs Principais
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {endpoints.slice(0, 3).map((endpoint) => (
              <div key={endpoint.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div>
                  <div className="flex items-center gap-2">
                    <Badge className={getMethodColor(endpoint.method)}>
                      {endpoint.method}
                    </Badge>
                    <span className="font-medium text-sm">{endpoint.name}</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {endpoint.calls24h} chamadas • {endpoint.successRate}% sucesso
                  </div>
                </div>
                <Badge className={getStatusColor(endpoint.status)}>
                  {endpoint.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* API Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Activity className="w-6 h-6 mx-auto mb-2 text-blue-500" />
            <div className="text-2xl font-bold">{metrics?.totalCalls.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Total de Chamadas</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <CheckCircle className="w-6 h-6 mx-auto mb-2 text-green-500" />
            <div className="text-2xl font-bold">{metrics?.successfulCalls.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Sucessos</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <AlertTriangle className="w-6 h-6 mx-auto mb-2 text-red-500" />
            <div className="text-2xl font-bold">{metrics?.errorCalls.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Erros</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="w-6 h-6 mx-auto mb-2 text-purple-500" />
            <div className="text-2xl font-bold">{Math.round(metrics?.avgResponseTime || 0)}ms</div>
            <div className="text-xs text-muted-foreground">Tempo Médio</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="endpoints" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
          <TabsTrigger value="metrics">Métricas</TabsTrigger>
          <TabsTrigger value="security">Segurança</TabsTrigger>
        </TabsList>

        <TabsContent value="endpoints" className="space-y-4">
          <div className="space-y-4">
            {endpoints.map((endpoint) => (
              <Card key={endpoint.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Badge className={getMethodColor(endpoint.method)}>
                        {endpoint.method}
                      </Badge>
                      <div>
                        <h3 className="font-semibold">{endpoint.name}</h3>
                        <code className="text-xs text-muted-foreground">{endpoint.path}</code>
                      </div>
                    </div>
                    <Badge className={getStatusColor(endpoint.status)}>
                      {endpoint.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-500">{endpoint.calls24h.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">Chamadas 24h</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-500">{endpoint.successRate}%</div>
                      <div className="text-xs text-muted-foreground">Taxa de Sucesso</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-orange-500">{endpoint.avgResponseTime}ms</div>
                      <div className="text-xs text-muted-foreground">Tempo Médio</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-500">
                        {Math.round((endpoint.rateLimitUsed / endpoint.rateLimit) * 100)}%
                      </div>
                      <div className="text-xs text-muted-foreground">Rate Limit</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Rate Limit Usage:</span>
                      <span>{endpoint.rateLimitUsed}/{endpoint.rateLimit}</span>
                    </div>
                    <Progress value={(endpoint.rateLimitUsed / endpoint.rateLimit) * 100} className="h-2" />
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Última utilização: {endpoint.lastUsed.toLocaleString()}</span>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4 mr-1" />
                        Configurar
                      </Button>
                      <Button variant="outline" size="sm">
                        <Key className="w-4 h-4 mr-1" />
                        Chaves
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
                <CardTitle>Chamadas por Hora</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={metrics?.hourlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="calls" stroke="hsl(var(--primary))" name="Chamadas" />
                    <Line type="monotone" dataKey="errors" stroke="hsl(var(--destructive))" name="Erros" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Endpoints por Volume</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={endpoints.slice(0, 5)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="calls24h" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="w-5 h-5" />
                  Chaves de API
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div>
                      <div className="font-medium">Chave Principal</div>
                      <div className="text-xs text-muted-foreground">api_key_12345...abcde</div>
                    </div>
                    <Badge className="bg-green-500/20 text-green-500">Ativa</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div>
                      <div className="font-medium">Chave de Backup</div>
                      <div className="text-xs text-muted-foreground">api_key_67890...fghij</div>
                    </div>
                    <Badge className="bg-yellow-500/20 text-yellow-500">Standby</Badge>
                  </div>
                  <Button className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Gerar Nova Chave
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Controle de Acesso
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="font-medium mb-2">IPs Permitidos</div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between items-center">
                        <span>192.168.1.0/24</span>
                        <Badge variant="secondary">Interno</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>203.0.113.0/24</span>
                        <Badge variant="secondary">Parceiro</Badge>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="font-medium mb-2">Rate Limits</div>
                    <div className="text-sm space-y-1">
                      <div>Padrão: 1000 req/hora</div>
                      <div>Premium: 5000 req/hora</div>
                      <div>Interno: Ilimitado</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};