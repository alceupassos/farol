import React, { useState } from 'react';
import { Building, Users, Truck, Heart, Pill, Stethoscope, Activity, AlertCircle } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

interface HealthUnit {
  id: string;
  name: string;
  type: 'UBS' | 'Hospital' | 'UPA' | 'Especializada';
  area: string;
  capacity: number;
  currentOccupancy: number;
  staff: {
    doctors: number;
    nurses: number;
    technicians: number;
  };
  equipment: {
    ventilators: { total: number; available: number };
    beds: { total: number; occupied: number };
    xray: { total: number; functional: number };
  };
  status: 'operational' | 'overloaded' | 'maintenance';
}

interface Resource {
  id: string;
  name: string;
  category: 'equipment' | 'medication' | 'staff' | 'infrastructure';
  quantity: number;
  allocated: number;
  status: 'adequate' | 'low' | 'critical';
  location: string;
  lastUpdate: string;
}

const mockHealthUnits: HealthUnit[] = [
  {
    id: '1',
    name: 'UBS Vila Nova',
    type: 'UBS',
    area: 'Zona Norte',
    capacity: 200,
    currentOccupancy: 150,
    staff: { doctors: 8, nurses: 15, technicians: 12 },
    equipment: {
      ventilators: { total: 2, available: 1 },
      beds: { total: 20, occupied: 15 },
      xray: { total: 1, functional: 1 }
    },
    status: 'operational'
  },
  {
    id: '2',
    name: 'Hospital Municipal',
    type: 'Hospital',
    area: 'Centro',
    capacity: 500,
    currentOccupancy: 475,
    staff: { doctors: 35, nurses: 80, technicians: 45 },
    equipment: {
      ventilators: { total: 25, available: 3 },
      beds: { total: 150, occupied: 142 },
      xray: { total: 4, functional: 3 }
    },
    status: 'overloaded'
  },
  {
    id: '3',
    name: 'UPA 24h',
    type: 'UPA',
    area: 'Zona Sul',
    capacity: 300,
    currentOccupancy: 280,
    staff: { doctors: 18, nurses: 25, technicians: 20 },
    equipment: {
      ventilators: { total: 8, available: 2 },
      beds: { total: 30, occupied: 28 },
      xray: { total: 2, functional: 1 }
    },
    status: 'overloaded'
  }
];

const mockResources: Resource[] = [
  {
    id: '1',
    name: 'Ventiladores Mecânicos',
    category: 'equipment',
    quantity: 35,
    allocated: 29,
    status: 'low',
    location: 'Rede Municipal',
    lastUpdate: '2024-01-20'
  },
  {
    id: '2',
    name: 'Medicamentos Básicos',
    category: 'medication',
    quantity: 10000,
    allocated: 7500,
    status: 'adequate',
    location: 'Farmácia Central',
    lastUpdate: '2024-01-19'
  },
  {
    id: '3',
    name: 'Médicos Especialistas',
    category: 'staff',
    quantity: 45,
    allocated: 42,
    status: 'adequate',
    location: 'Rede Municipal',
    lastUpdate: '2024-01-18'
  },
  {
    id: '4',
    name: 'Ambulâncias',
    category: 'infrastructure',
    quantity: 12,
    allocated: 11,
    status: 'adequate',
    location: 'SAMU/UPAs',
    lastUpdate: '2024-01-20'
  },
  {
    id: '5',
    name: 'Vacinas COVID-19',
    category: 'medication',
    quantity: 5000,
    allocated: 4800,
    status: 'critical',
    location: 'Rede de Vacinação',
    lastUpdate: '2024-01-20'
  }
];

const ResourcesPage = () => {
  const [selectedTab, setSelectedTab] = useState('units');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'overloaded': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'adequate': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'low': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'critical': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'UBS': return <Building className="h-5 w-5" />;
      case 'Hospital': return <Heart className="h-5 w-5" />;
      case 'UPA': return <Activity className="h-5 w-5" />;
      case 'Especializada': return <Stethoscope className="h-5 w-5" />;
      default: return <Building className="h-5 w-5" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'equipment': return <Stethoscope className="h-5 w-5" />;
      case 'medication': return <Pill className="h-5 w-5" />;
      case 'staff': return <Users className="h-5 w-5" />;
      case 'infrastructure': return <Truck className="h-5 w-5" />;
      default: return <Building className="h-5 w-5" />;
    }
  };

  const totalUnits = mockHealthUnits.length;
  const overloadedUnits = mockHealthUnits.filter(u => u.status === 'overloaded').length;
  const totalBeds = mockHealthUnits.reduce((sum, unit) => sum + unit.equipment.beds.total, 0);
  const occupiedBeds = mockHealthUnits.reduce((sum, unit) => sum + unit.equipment.beds.occupied, 0);
  const criticalResources = mockResources.filter(r => r.status === 'critical').length;

  return (
    <MainLayout>
      <div className="pt-8 pb-10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-display font-semibold mb-2">
              Gestão de Recursos
            </h1>
            <p className="text-muted-foreground">
              Monitoramento e alocação de recursos da rede municipal de saúde
            </p>
          </div>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Unidades de Saúde</CardTitle>
                <Building className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalUnits}</div>
                <p className="text-xs text-muted-foreground">
                  {overloadedUnits} sobrecarregadas
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Taxa de Ocupação</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round((occupiedBeds / totalBeds) * 100)}%
                </div>
                <p className="text-xs text-muted-foreground">
                  {occupiedBeds}/{totalBeds} leitos
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Recursos Críticos</CardTitle>
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{criticalResources}</div>
                <p className="text-xs text-muted-foreground">requerem atenção</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Profissionais</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {mockHealthUnits.reduce((sum, unit) => 
                    sum + unit.staff.doctors + unit.staff.nurses + unit.staff.technicians, 0)}
                </div>
                <p className="text-xs text-muted-foreground">na rede municipal</p>
              </CardContent>
            </Card>
          </div>

          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="units">Unidades de Saúde</TabsTrigger>
              <TabsTrigger value="resources">Recursos e Insumos</TabsTrigger>
            </TabsList>
            
            <TabsContent value="units" className="mt-6">
              <div className="space-y-4">
                {mockHealthUnits.map((unit) => (
                  <Card key={unit.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {getTypeIcon(unit.type)}
                          <div>
                            <CardTitle className="text-lg">{unit.name}</CardTitle>
                            <CardDescription className="flex items-center gap-2">
                              {unit.area} • Capacidade: {unit.capacity} atendimentos/dia
                            </CardDescription>
                          </div>
                        </div>
                        <Badge className={getStatusColor(unit.status)}>
                          {unit.status === 'operational' ? 'Operacional' :
                           unit.status === 'overloaded' ? 'Sobrecarregada' : 'Manutenção'}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <h4 className="text-sm font-medium mb-3">Ocupação Atual</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Atendimentos</span>
                              <span>{unit.currentOccupancy}/{unit.capacity}</span>
                            </div>
                            <Progress 
                              value={(unit.currentOccupancy / unit.capacity) * 100} 
                              className="h-2" 
                            />
                            <div className="flex justify-between text-sm">
                              <span>Leitos</span>
                              <span>{unit.equipment.beds.occupied}/{unit.equipment.beds.total}</span>
                            </div>
                            <Progress 
                              value={(unit.equipment.beds.occupied / unit.equipment.beds.total) * 100} 
                              className="h-2" 
                            />
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium mb-3">Equipe</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Médicos</span>
                              <span>{unit.staff.doctors}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Enfermeiros</span>
                              <span>{unit.staff.nurses}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Técnicos</span>
                              <span>{unit.staff.technicians}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium mb-3">Equipamentos</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Ventiladores</span>
                              <span className={unit.equipment.ventilators.available === 0 ? 'text-red-500' : ''}>
                                {unit.equipment.ventilators.available}/{unit.equipment.ventilators.total}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Raio-X</span>
                              <span className={unit.equipment.xray.functional < unit.equipment.xray.total ? 'text-yellow-500' : ''}>
                                {unit.equipment.xray.functional}/{unit.equipment.xray.total}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {unit.status === 'overloaded' && (
                        <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                          <div className="flex items-center gap-2">
                            <AlertCircle className="h-4 w-4 text-red-500" />
                            <span className="text-sm text-red-700 dark:text-red-300">
                              Unidade com sobrecarga - necessário redistribuição de pacientes
                            </span>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="resources" className="mt-6">
              <div className="space-y-4">
                {mockResources.map((resource) => (
                  <Card key={resource.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {getCategoryIcon(resource.category)}
                          <div>
                            <CardTitle className="text-lg">{resource.name}</CardTitle>
                            <CardDescription>
                              {resource.location} • Atualizado: {new Date(resource.lastUpdate).toLocaleDateString('pt-BR')}
                            </CardDescription>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge className={getStatusColor(resource.status)}>
                            {resource.status === 'adequate' ? 'Adequado' :
                             resource.status === 'low' ? 'Baixo' : 'Crítico'}
                          </Badge>
                          <div className="text-right">
                            <div className="text-xl font-bold">
                              {resource.allocated}/{resource.quantity}
                            </div>
                            <div className="text-sm text-muted-foreground">alocados</div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Taxa de Utilização</span>
                          <span>{Math.round((resource.allocated / resource.quantity) * 100)}%</span>
                        </div>
                        <Progress 
                          value={(resource.allocated / resource.quantity) * 100} 
                          className="h-2" 
                        />
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>Disponível: {resource.quantity - resource.allocated}</span>
                          <span>
                            {resource.category === 'equipment' ? 'Equipamentos' :
                             resource.category === 'medication' ? 'Unidades' :
                             resource.category === 'staff' ? 'Profissionais' : 'Recursos'}
                          </span>
                        </div>
                      </div>
                      
                      {resource.status === 'critical' && (
                        <div className="mt-4 flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                          <div className="flex items-center gap-2">
                            <AlertCircle className="h-4 w-4 text-red-500" />
                            <span className="text-sm text-red-700 dark:text-red-300">
                              Recurso em nível crítico - reabastecimento urgente
                            </span>
                          </div>
                          <Button size="sm" variant="destructive">
                            Solicitar Reposição
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

export default ResourcesPage;