import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, UserCircle, Clock, MapPin, Phone, Mail, ChevronRight, Calendar, Heart, Bone, Activity, AlertTriangle } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  phone: string;
  email: string;
  lastVisit: string;
  nextAppointment?: string;
  condition: string;
  status: 'Estável' | 'Atenção' | 'Crítico' | 'Recuperação';
  riskLevel: 'Baixo' | 'Médio' | 'Alto';
}

const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'Maria Santos Silva',
    age: 45,
    gender: 'Feminino',
    phone: '(11) 99999-1234',
    email: 'maria.santos@email.com',
    lastVisit: '2024-01-15',
    nextAppointment: '2024-01-25',
    condition: 'Diabetes Tipo 2',
    status: 'Estável',
    riskLevel: 'Médio'
  },
  {
    id: '2',
    name: 'João Pedro Oliveira',
    age: 62,
    gender: 'Masculino',
    phone: '(11) 98888-5678',
    email: 'joao.oliveira@email.com',
    lastVisit: '2024-01-18',
    nextAppointment: '2024-01-22',
    condition: 'Hipertensão Arterial',
    status: 'Atenção',
    riskLevel: 'Alto'
  },
  {
    id: '3',
    name: 'Ana Carolina Ferreira',
    age: 34,
    gender: 'Feminino',
    phone: '(11) 97777-9012',
    email: 'ana.ferreira@email.com',
    lastVisit: '2024-01-20',
    condition: 'Acompanhamento Gestacional',
    status: 'Estável',
    riskLevel: 'Baixo'
  },
  {
    id: '4',
    name: 'Roberto Carlos Lima',
    age: 58,
    gender: 'Masculino',
    phone: '(11) 96666-3456',
    email: 'roberto.lima@email.com',
    lastVisit: '2024-01-12',
    nextAppointment: '2024-01-28',
    condition: 'Cardiopatia',
    status: 'Crítico',
    riskLevel: 'Alto'
  },
  {
    id: '5',
    name: 'Lucia Helena Costa',
    age: 29,
    gender: 'Feminino',
    phone: '(11) 95555-7890',
    email: 'lucia.costa@email.com',
    lastVisit: '2024-01-16',
    condition: 'Ansiedade',
    status: 'Recuperação',
    riskLevel: 'Baixo'
  },
  {
    id: '6',
    name: 'Carlos Eduardo Santos',
    age: 58,
    gender: 'Masculino',
    phone: '(11) 94444-1122',
    email: 'carlos.santos@email.com',
    lastVisit: '2024-01-19',
    nextAppointment: '2024-01-26',
    condition: 'Diabetes Tipo 2',
    status: 'Atenção',
    riskLevel: 'Alto'
  },
  {
    id: '7',
    name: 'Margareth Silva Oliveira',
    age: 67,
    gender: 'Feminino',
    phone: '(11) 93333-5566',
    email: 'margareth.oliveira@email.com',
    lastVisit: '2024-01-17',
    nextAppointment: '2024-01-24',
    condition: 'Osteoporose',
    status: 'Atenção',
    riskLevel: 'Médio'
  },
  {
    id: '8',
    name: 'Fernando Rodrigues Lima',
    age: 52,
    gender: 'Masculino',
    phone: '(11) 92222-7788',
    email: 'fernando.lima@email.com',
    lastVisit: '2024-01-21',
    nextAppointment: '2024-01-29',
    condition: 'Disfunção Erétil',
    status: 'Estável',
    riskLevel: 'Médio'
  }
];

const PatientsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [riskFilter, setRiskFilter] = useState('');

  const filteredPatients = mockPatients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.condition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || patient.status === statusFilter;
    const matchesRisk = !riskFilter || patient.riskLevel === riskFilter;
    
    return matchesSearch && matchesStatus && matchesRisk;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Estável': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Atenção': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Crítico': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'Recuperação': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Baixo': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Médio': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Alto': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getConditionIcon = (condition: string) => {
    if (condition.toLowerCase().includes('diabetes')) {
      return <Heart className="h-4 w-4 text-red-500" />;
    }
    if (condition.toLowerCase().includes('osteoporose')) {
      return <Bone className="h-4 w-4 text-blue-500" />;
    }
    if (condition.toLowerCase().includes('disfunção erétil')) {
      return <Activity className="h-4 w-4 text-purple-500" />;
    }
    return null;
  };

  const getSpecialConditions = () => {
    const diabetes = mockPatients.filter(p => p.condition.toLowerCase().includes('diabetes')).length;
    const osteoporose = mockPatients.filter(p => p.condition.toLowerCase().includes('osteoporose')).length;
    const disfuncao = mockPatients.filter(p => p.condition.toLowerCase().includes('disfunção')).length;
    return { diabetes, osteoporose, disfuncao };
  };

  const specialConditions = getSpecialConditions();

  return (
    <MainLayout>
      <div className="pt-8 pb-10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-display font-semibold mb-2">
              Meus Pacientes
            </h1>
            <p className="text-muted-foreground">
              Gerencie seus pacientes e acompanhe seus tratamentos
            </p>
          </div>

          {/* Indicadores Especiais em Destaque */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-950 dark:to-red-900 border-red-200 dark:border-red-800">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-red-100 dark:bg-red-800 rounded-lg">
                      <Heart className="h-6 w-6 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-red-800 dark:text-red-200">Pacientes com Diabetes</p>
                      <p className="text-2xl font-bold text-red-900 dark:text-red-100">{specialConditions.diabetes}</p>
                    </div>
                  </div>
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                </div>
                <p className="text-xs text-red-600 dark:text-red-400 mt-2">Monitoramento glicêmico necessário</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-lg">
                      <Bone className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-blue-800 dark:text-blue-200">Pacientes com Osteoporose</p>
                      <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">{specialConditions.osteoporose}</p>
                    </div>
                  </div>
                  <AlertTriangle className="h-5 w-5 text-blue-500" />
                </div>
                <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">Densidade óssea em acompanhamento</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200 dark:border-purple-800">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-100 dark:bg-purple-800 rounded-lg">
                      <Activity className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-purple-800 dark:text-purple-200">Pacientes com Disfunção Erétil</p>
                      <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">{specialConditions.disfuncao}</p>
                    </div>
                  </div>
                  <AlertTriangle className="h-5 w-5 text-purple-500" />
                </div>
                <p className="text-xs text-purple-600 dark:text-purple-400 mt-2">Avaliação urológica especializada</p>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar pacientes por nome ou condição..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="clear">Todos os Status</SelectItem>
                    <SelectItem value="Estável">Estável</SelectItem>
                    <SelectItem value="Atenção">Atenção</SelectItem>
                    <SelectItem value="Crítico">Crítico</SelectItem>
                    <SelectItem value="Recuperação">Recuperação</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={riskFilter} onValueChange={setRiskFilter}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Risco" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="clear">Todos os Riscos</SelectItem>
                    <SelectItem value="Baixo">Baixo</SelectItem>
                    <SelectItem value="Médio">Médio</SelectItem>
                    <SelectItem value="Alto">Alto</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">{mockPatients.length}</div>
                <p className="text-sm text-muted-foreground">Total de Pacientes</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-red-600">
                  {mockPatients.filter(p => p.status === 'Crítico').length}
                </div>
                <p className="text-sm text-muted-foreground">Pacientes Críticos</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-yellow-600">
                  {mockPatients.filter(p => p.riskLevel === 'Alto').length}
                </div>
                <p className="text-sm text-muted-foreground">Alto Risco</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-blue-600">
                  {mockPatients.filter(p => p.nextAppointment).length}
                </div>
                <p className="text-sm text-muted-foreground">Consultas Agendadas</p>
              </CardContent>
            </Card>
          </div>

          {/* Patients List */}
          <div className="space-y-4">
            {filteredPatients.map((patient) => (
              <Card key={patient.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <UserCircle className="h-12 w-12 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-semibold">{patient.name}</h3>
                          <Badge className={getStatusColor(patient.status)}>
                            {patient.status}
                          </Badge>
                          <Badge className={getRiskColor(patient.riskLevel)}>
                            Risco {patient.riskLevel}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2 flex items-center">
                          {patient.age} anos • {patient.gender} • 
                          <span className="flex items-center ml-1">
                            {getConditionIcon(patient.condition)}
                            <span className="ml-1">{patient.condition}</span>
                          </span>
                        </p>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Phone className="h-4 w-4" />
                            {patient.phone}
                          </div>
                          <div className="flex items-center gap-1">
                            <Mail className="h-4 w-4" />
                            {patient.email}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            Última consulta: {new Date(patient.lastVisit).toLocaleDateString('pt-BR')}
                          </div>
                          {patient.nextAppointment && (
                            <div className="flex items-center gap-1 text-blue-600">
                              <Calendar className="h-4 w-4" />
                              Próxima: {new Date(patient.nextAppointment).toLocaleDateString('pt-BR')}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to={`/patients/${patient.id}`}>
                        Ver Detalhes
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPatients.length === 0 && (
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-muted-foreground">
                  Nenhum paciente encontrado com os filtros aplicados.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default PatientsPage;