import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Cloud, Hospital, Activity, Database, Settings, Plus, Edit, Trash2, Power, PowerOff } from "lucide-react";

interface ExternalSystem {
  id: string;
  name: string;
  type: 'hospital' | 'laboratory' | 'clinic' | 'government' | 'insurance' | 'pharmacy';
  status: 'connected' | 'disconnected' | 'error' | 'maintenance';
  url: string;
  apiVersion: string;
  lastSync: Date;
  dataTypes: string[];
  connectionMethod: 'rest' | 'soap' | 'hl7' | 'fhir';
  healthScore: number;
  description?: string;
}

export const ExternalSystemsManager = () => {
  const [systems, setSystems] = useState<ExternalSystem[]>([]);
  const [filteredSystems, setFilteredSystems] = useState<ExternalSystem[]>([]);
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingSystem, setEditingSystem] = useState<ExternalSystem | null>(null);

  useEffect(() => {
    generateSampleSystems();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [systems, filterType, filterStatus]);

  const generateSampleSystems = () => {
    const sampleSystems: ExternalSystem[] = [
      {
        id: '1',
        name: 'Hospital das Clínicas',
        type: 'hospital',
        status: 'connected',
        url: 'https://api.hc.fm.usp.br',
        apiVersion: 'v2.1',
        lastSync: new Date(Date.now() - 15 * 60 * 1000),
        dataTypes: ['patient-records', 'lab-results', 'prescriptions'],
        connectionMethod: 'fhir',
        healthScore: 95,
        description: 'Principal hospital da região metropolitana'
      },
      {
        id: '2',
        name: 'Laboratório Fleury',
        type: 'laboratory',
        status: 'connected',
        url: 'https://api.fleury.com.br',
        apiVersion: 'v1.8',
        lastSync: new Date(Date.now() - 5 * 60 * 1000),
        dataTypes: ['lab-results', 'exam-images', 'reports'],
        connectionMethod: 'rest',
        healthScore: 88,
        description: 'Rede de laboratórios de análises clínicas'
      },
      {
        id: '3',
        name: 'UBS Centro',
        type: 'clinic',
        status: 'connected',
        url: 'https://api.ubs-centro.saude.gov.br',
        apiVersion: 'v1.0',
        lastSync: new Date(Date.now() - 30 * 60 * 1000),
        dataTypes: ['patient-records', 'vaccinations', 'consultations'],
        connectionMethod: 'hl7',
        healthScore: 78,
        description: 'Unidade Básica de Saúde do centro da cidade'
      },
      {
        id: '4',
        name: 'DATASUS',
        type: 'government',
        status: 'error',
        url: 'https://api.datasus.gov.br',
        apiVersion: 'v3.0',
        lastSync: new Date(Date.now() - 2 * 60 * 60 * 1000),
        dataTypes: ['epidemiological-data', 'mortality-data', 'health-indicators'],
        connectionMethod: 'soap',
        healthScore: 45,
        description: 'Sistema nacional de informações em saúde'
      },
      {
        id: '5',
        name: 'Farmácia Popular',
        type: 'pharmacy',
        status: 'maintenance',
        url: 'https://api.farmaciapopular.gov.br',
        apiVersion: 'v2.0',
        lastSync: new Date(Date.now() - 4 * 60 * 60 * 1000),
        dataTypes: ['medications', 'dispensations', 'stock'],
        connectionMethod: 'rest',
        healthScore: 0,
        description: 'Rede nacional de farmácias populares'
      },
      {
        id: '6',
        name: 'Bradesco Saúde',
        type: 'insurance',
        status: 'disconnected',
        url: 'https://api.bradescosaude.com.br',
        apiVersion: 'v1.5',
        lastSync: new Date(Date.now() - 24 * 60 * 60 * 1000),
        dataTypes: ['authorizations', 'claims', 'coverage'],
        connectionMethod: 'rest',
        healthScore: 0,
        description: 'Operadora de planos de saúde'
      }
    ];
    
    setSystems(sampleSystems);
  };

  const applyFilters = () => {
    let filtered = systems;
    
    if (filterType !== 'all') {
      filtered = filtered.filter(system => system.type === filterType);
    }
    
    if (filterStatus !== 'all') {
      filtered = filtered.filter(system => system.status === filterStatus);
    }
    
    setFilteredSystems(filtered);
  };

  const getSystemIcon = (type: string) => {
    switch (type) {
      case 'hospital': return <Hospital className="w-5 h-5" />;
      case 'laboratory': return <Activity className="w-5 h-5" />;
      case 'clinic': return <Hospital className="w-5 h-5" />;
      case 'government': return <Database className="w-5 h-5" />;
      case 'insurance': return <Settings className="w-5 h-5" />;
      case 'pharmacy': return <Plus className="w-5 h-5" />;
      default: return <Cloud className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-green-500/20 text-green-500 border-green-500/30';
      case 'disconnected': return 'bg-red-500/20 text-red-500 border-red-500/30';
      case 'error': return 'bg-orange-500/20 text-orange-500 border-orange-500/30';
      case 'maintenance': return 'bg-blue-500/20 text-blue-500 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-500 border-gray-500/30';
    }
  };

  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    if (score > 0) return 'text-orange-500';
    return 'text-red-500';
  };

  const toggleSystemStatus = (systemId: string) => {
    setSystems(prev => prev.map(system => 
      system.id === systemId 
        ? { 
            ...system, 
            status: system.status === 'connected' ? 'disconnected' : 'connected',
            healthScore: system.status === 'connected' ? 0 : 85
          }
        : system
    ));
  };

  const systemTypes = [...new Set(systems.map(s => s.type))];
  const systemStatuses = [...new Set(systems.map(s => s.status))];

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Tipo de Sistema" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Tipos</SelectItem>
              {systemTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos Status</SelectItem>
              {systemStatuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Adicionar Sistema
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Adicionar Sistema Externo</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nome do Sistema</Label>
                <Input id="name" placeholder="Ex: Hospital São Paulo" />
              </div>
              <div>
                <Label htmlFor="type">Tipo</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hospital">Hospital</SelectItem>
                    <SelectItem value="laboratory">Laboratório</SelectItem>
                    <SelectItem value="clinic">Clínica</SelectItem>
                    <SelectItem value="government">Governo</SelectItem>
                    <SelectItem value="insurance">Plano de Saúde</SelectItem>
                    <SelectItem value="pharmacy">Farmácia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="url">URL da API</Label>
                <Input id="url" placeholder="https://api.exemplo.com.br" />
              </div>
              <div>
                <Label htmlFor="description">Descrição</Label>
                <Textarea id="description" placeholder="Descrição do sistema..." />
              </div>
              <div className="flex gap-2">
                <Button onClick={() => setIsAddDialogOpen(false)}>Cancelar</Button>
                <Button onClick={() => setIsAddDialogOpen(false)}>Adicionar</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Systems Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSystems.map((system) => (
          <Card key={system.id} className="relative">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getSystemIcon(system.type)}
                  <CardTitle className="text-lg">{system.name}</CardTitle>
                </div>
                <Badge className={getStatusColor(system.status)}>
                  {system.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Health Score:</span>
                  <span className={`font-bold ${getHealthScoreColor(system.healthScore)}`}>
                    {system.healthScore}%
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      system.healthScore >= 80 ? 'bg-green-500' :
                      system.healthScore >= 60 ? 'bg-yellow-500' :
                      system.healthScore > 0 ? 'bg-orange-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${system.healthScore}%` }}
                  />
                </div>
              </div>
              
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tipo:</span>
                  <span className="capitalize">{system.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">API:</span>
                  <span>{system.apiVersion}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Método:</span>
                  <span className="uppercase">{system.connectionMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Última Sync:</span>
                  <span>{system.lastSync.toLocaleTimeString()}</span>
                </div>
              </div>
              
              {system.description && (
                <p className="text-xs text-muted-foreground">{system.description}</p>
              )}
              
              <div className="space-y-2">
                <div className="text-xs font-medium">Tipos de Dados:</div>
                <div className="flex flex-wrap gap-1">
                  {system.dataTypes.slice(0, 3).map((dataType, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {dataType}
                    </Badge>
                  ))}
                  {system.dataTypes.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{system.dataTypes.length - 3}
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => toggleSystemStatus(system.id)}
                >
                  {system.status === 'connected' ? (
                    <>
                      <PowerOff className="w-4 h-4 mr-1" />
                      Desconectar
                    </>
                  ) : (
                    <>
                      <Power className="w-4 h-4 mr-1" />
                      Conectar
                    </>
                  )}
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
            
            {/* Connection indicator */}
            <div className="absolute top-2 right-2">
              <div className={`h-3 w-3 rounded-full ${
                system.status === 'connected' ? 'bg-green-500 animate-pulse' :
                system.status === 'error' ? 'bg-orange-500' :
                system.status === 'maintenance' ? 'bg-blue-500' :
                'bg-red-500'
              }`}></div>
            </div>
          </Card>
        ))}
      </div>

      {filteredSystems.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Cloud className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground">
              Nenhum sistema encontrado com os filtros aplicados.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};