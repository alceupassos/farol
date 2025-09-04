import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Layers, Server, Database, Cpu, HardDrive, Network, Settings, TrendingUp, AlertTriangle } from "lucide-react";

interface Resource {
  id: string;
  name: string;
  type: 'server' | 'database' | 'storage' | 'network' | 'application';
  status: 'healthy' | 'warning' | 'critical' | 'maintenance';
  utilization: number;
  capacity: number;
  used: number;
  cost: number;
  department: string;
  lastUpdate: Date;
}

interface ResourceAllocation {
  department: string;
  allocated: number;
  used: number;
  efficiency: number;
  cost: number;
}

export const ResourceAllocation = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [allocations, setAllocations] = useState<ResourceAllocation[]>([]);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');

  useEffect(() => {
    generateResourceData();
  }, []);

  const generateResourceData = () => {
    const sampleResources: Resource[] = [
      {
        id: '1',
        name: 'Servidor Principal',
        type: 'server',
        status: 'healthy',
        utilization: 68,
        capacity: 100,
        used: 68,
        cost: 2500,
        department: 'TI',
        lastUpdate: new Date()
      },
      {
        id: '2',
        name: 'Banco de Dados Médicos',
        type: 'database',
        status: 'warning',
        utilization: 85,
        capacity: 100,
        used: 85,
        cost: 1800,
        department: 'Análise Médica',
        lastUpdate: new Date()
      },
      {
        id: '3',
        name: 'Storage de Documentos',
        type: 'storage',
        status: 'critical',
        utilization: 92,
        capacity: 100,
        used: 92,
        cost: 1200,
        department: 'Análise Médica',
        lastUpdate: new Date()
      },
      {
        id: '4',
        name: 'Cluster de Processamento IA',
        type: 'server',
        status: 'healthy',
        utilization: 45,
        capacity: 100,
        used: 45,
        cost: 4500,
        department: 'IA e ML',
        lastUpdate: new Date()
      },
      {
        id: '5',
        name: 'Rede Municipal',
        type: 'network',
        status: 'healthy',
        utilization: 32,
        capacity: 100,
        used: 32,
        cost: 800,
        department: 'Infraestrutura',
        lastUpdate: new Date()
      },
      {
        id: '6',
        name: 'Aplicação Web Principal',
        type: 'application',
        status: 'maintenance',
        utilization: 0,
        capacity: 100,
        used: 0,
        cost: 1500,
        department: 'TI',
        lastUpdate: new Date()
      }
    ];

    const sampleAllocations: ResourceAllocation[] = [
      {
        department: 'Análise Médica',
        allocated: 40,
        used: 35,
        efficiency: 87.5,
        cost: 3200
      },
      {
        department: 'TI',
        allocated: 30,
        used: 22,
        efficiency: 73.3,
        cost: 4200
      },
      {
        department: 'IA e ML',
        allocated: 20,
        used: 18,
        efficiency: 90.0,
        cost: 4800
      },
      {
        department: 'Infraestrutura',
        allocated: 10,
        used: 8,
        efficiency: 80.0,
        cost: 1000
      }
    ];

    setResources(sampleResources);
    setAllocations(sampleAllocations);
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'server': return <Server className="w-5 h-5" />;
      case 'database': return <Database className="w-5 h-5" />;
      case 'storage': return <HardDrive className="w-5 h-5" />;
      case 'network': return <Network className="w-5 h-5" />;
      case 'application': return <Cpu className="w-5 h-5" />;
      default: return <Layers className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-500/20 text-green-500 border-green-500/30';
      case 'warning': return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30';
      case 'critical': return 'bg-red-500/20 text-red-500 border-red-500/30';
      case 'maintenance': return 'bg-blue-500/20 text-blue-500 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-500 border-gray-500/30';
    }
  };

  const getUtilizationColor = (utilization: number) => {
    if (utilization >= 90) return 'text-red-500';
    if (utilization >= 75) return 'text-yellow-500';
    return 'text-green-500';
  };

  const getFilteredResources = () => {
    let filtered = resources;
    
    if (selectedType !== 'all') {
      filtered = filtered.filter(resource => resource.type === selectedType);
    }
    
    if (selectedDepartment !== 'all') {
      filtered = filtered.filter(resource => resource.department === selectedDepartment);
    }
    
    return filtered;
  };

  const resourceTypes = [...new Set(resources.map(r => r.type))];
  const departments = [...new Set(resources.map(r => r.department))];

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', 'hsl(var(--muted))', 'hsl(var(--destructive))'];

  const utilizationData = allocations.map(alloc => ({
    name: alloc.department,
    allocated: alloc.allocated,
    used: alloc.used,
    efficiency: alloc.efficiency
  }));

  const costData = allocations.map(alloc => ({
    name: alloc.department,
    cost: alloc.cost
  }));

  return (
    <div className="space-y-6">
      {/* Resource Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Server className="w-6 h-6 mx-auto mb-2 text-blue-500" />
            <div className="text-2xl font-bold">{resources.filter(r => r.type === 'server').length}</div>
            <div className="text-xs text-muted-foreground">Servidores</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Database className="w-6 h-6 mx-auto mb-2 text-green-500" />
            <div className="text-2xl font-bold">{resources.filter(r => r.type === 'database').length}</div>
            <div className="text-xs text-muted-foreground">Bancos de Dados</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <HardDrive className="w-6 h-6 mx-auto mb-2 text-purple-500" />
            <div className="text-2xl font-bold">{resources.filter(r => r.type === 'storage').length}</div>
            <div className="text-xs text-muted-foreground">Armazenamento</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Network className="w-6 h-6 mx-auto mb-2 text-orange-500" />
            <div className="text-2xl font-bold">{resources.filter(r => r.type === 'network').length}</div>
            <div className="text-xs text-muted-foreground">Rede</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Cpu className="w-6 h-6 mx-auto mb-2 text-red-500" />
            <div className="text-2xl font-bold">{resources.filter(r => r.type === 'application').length}</div>
            <div className="text-xs text-muted-foreground">Aplicações</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium">Filtros:</span>
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Tipo de Recurso" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os Tipos</SelectItem>
            {resourceTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Departamento" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos Departamentos</SelectItem>
            {departments.map((dept) => (
              <SelectItem key={dept} value={dept}>{dept}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="resources" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="resources">Recursos</TabsTrigger>
          <TabsTrigger value="allocation">Alocação</TabsTrigger>
          <TabsTrigger value="utilization">Utilização</TabsTrigger>
          <TabsTrigger value="costs">Custos</TabsTrigger>
        </TabsList>

        <TabsContent value="resources" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getFilteredResources().map((resource) => (
              <Card key={resource.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getResourceIcon(resource.type)}
                      <CardTitle className="text-lg">{resource.name}</CardTitle>
                    </div>
                    <Badge className={getStatusColor(resource.status)}>
                      {resource.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Utilização:</span>
                      <span className={`font-bold ${getUtilizationColor(resource.utilization)}`}>
                        {resource.utilization}%
                      </span>
                    </div>
                    <Progress value={resource.utilization} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold">{resource.used}</div>
                      <div className="text-xs text-muted-foreground">Usado</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold">{resource.capacity}</div>
                      <div className="text-xs text-muted-foreground">Capacidade</div>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Departamento:</span>
                      <span className="font-medium">{resource.department}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Custo Mensal:</span>
                      <span className="font-medium">R$ {resource.cost.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Settings className="w-4 h-4 mr-1" />
                      Configurar
                    </Button>
                    <Button variant="outline" size="sm">
                      <TrendingUp className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="allocation" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Alocação por Departamento</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={allocations}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="allocated"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {allocations.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Eficiência por Departamento</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {allocations.map((alloc, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{alloc.department}</span>
                        <span className="text-sm text-muted-foreground">{alloc.efficiency}%</span>
                      </div>
                      <Progress value={alloc.efficiency} className="h-2" />
                      <div className="text-xs text-muted-foreground">
                        Usado: {alloc.used}% de {alloc.allocated}% alocado
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="utilization" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Utilização vs Alocação por Departamento</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={utilizationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="allocated" fill="hsl(var(--muted))" name="Alocado (%)" />
                  <Bar dataKey="used" fill="hsl(var(--primary))" name="Usado (%)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {allocations.map((alloc, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="text-center space-y-2">
                    <h3 className="font-semibold text-sm">{alloc.department}</h3>
                    <div className="text-2xl font-bold">{alloc.efficiency}%</div>
                    <div className="text-xs text-muted-foreground">Eficiência</div>
                    <div className="flex justify-between text-xs">
                      <span>Alocado: {alloc.allocated}%</span>
                      <span>Usado: {alloc.used}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="costs" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Custos por Departamento</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={costData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => `R$ ${Number(value).toLocaleString()}`} />
                    <Bar dataKey="cost" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resumo de Custos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 border border-border rounded-lg">
                      <div className="text-2xl font-bold">
                        R$ {allocations.reduce((acc, alloc) => acc + alloc.cost, 0).toLocaleString()}
                      </div>
                      <div className="text-xs text-muted-foreground">Custo Total Mensal</div>
                    </div>
                    <div className="text-center p-3 border border-border rounded-lg">
                      <div className="text-2xl font-bold">
                        R$ {Math.round(allocations.reduce((acc, alloc) => acc + alloc.cost, 0) / allocations.length).toLocaleString()}
                      </div>
                      <div className="text-xs text-muted-foreground">Custo Médio/Dept</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {allocations.map((alloc, index) => (
                      <div key={index} className="flex justify-between items-center p-2 border border-border rounded">
                        <span className="text-sm">{alloc.department}</span>
                        <span className="font-medium">R$ {alloc.cost.toLocaleString()}</span>
                      </div>
                    ))}
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