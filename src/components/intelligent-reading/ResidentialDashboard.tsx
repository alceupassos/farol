import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { 
  Home, 
  Users, 
  MapPin, 
  Calendar, 
  Activity, 
  AlertTriangle,
  Heart,
  Pill,
  FileText,
  TrendingUp,
  Phone,
  Shield
} from 'lucide-react';

interface HouseholdMember {
  id: string;
  name: string;
  age: number;
  relationship: string;
  avatar?: string;
  healthStatus: 'good' | 'attention' | 'critical';
  lastExam?: string;
  medications: number;
  documents: number;
}

interface Household {
  id: string;
  address: string;
  coordinates: [number, number];
  responsibleAgent: string;
  members: HouseholdMember[];
  totalDocuments: number;
  lastVisit: string;
  healthAlerts: number;
}

export const ResidentialDashboard = () => {
  const [selectedHousehold, setSelectedHousehold] = useState<string | null>(null);

  const households: Household[] = [
    {
      id: '1',
      address: 'Rua das Flores, 123 - Centro',
      coordinates: [-23.5505, -46.6333],
      responsibleAgent: 'Ana Silva',
      lastVisit: '2024-01-15',
      healthAlerts: 1,
      totalDocuments: 15,
      members: [
        {
          id: '1',
          name: 'João Silva',
          age: 45,
          relationship: 'Responsável',
          healthStatus: 'good',
          lastExam: '2024-01-10',
          medications: 2,
          documents: 8
        },
        {
          id: '2',
          name: 'Maria Silva',
          age: 42,
          relationship: 'Cônjuge',
          healthStatus: 'attention',
          lastExam: '2023-12-15',
          medications: 1,
          documents: 5
        },
        {
          id: '3',
          name: 'Pedro Silva',
          age: 16,
          relationship: 'Filho',
          healthStatus: 'good',
          lastExam: '2024-01-05',
          medications: 0,
          documents: 2
        }
      ]
    },
    {
      id: '2',
      address: 'Av. Principal, 456 - Jardim Norte',
      coordinates: [-23.5515, -46.6343],
      responsibleAgent: 'Carlos Santos',
      lastVisit: '2024-01-12',
      healthAlerts: 0,
      totalDocuments: 22,
      members: [
        {
          id: '4',
          name: 'Rosa Santos',
          age: 68,
          relationship: 'Responsável',
          healthStatus: 'good',
          lastExam: '2024-01-08',
          medications: 3,
          documents: 12
        },
        {
          id: '5',
          name: 'José Santos',
          age: 35,
          relationship: 'Filho',
          healthStatus: 'good',
          lastExam: '2023-11-20',
          medications: 0,
          documents: 6
        },
        {
          id: '6',
          name: 'Ana Santos',
          age: 8,
          relationship: 'Neta',
          healthStatus: 'good',
          lastExam: '2024-01-03',
          medications: 0,
          documents: 4
        }
      ]
    }
  ];

  const getHealthStatusColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'text-success';
      case 'attention':
        return 'text-warning';
      case 'critical':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const getHealthStatusBadge = (status: string) => {
    switch (status) {
      case 'good':
        return <Badge className="bg-success/10 text-success border-success/20">Boa</Badge>;
      case 'attention':
        return <Badge className="bg-warning/10 text-warning border-warning/20">Atenção</Badge>;
      case 'critical':
        return <Badge className="bg-error/10 text-error border-error/20">Crítico</Badge>;
      default:
        return <Badge variant="outline">Desconhecido</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Estatísticas Gerais */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Home className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-muted-foreground">Residências</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-success/10">
                <Users className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">38</p>
                <p className="text-sm text-muted-foreground">Familiares</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-warning/10">
                <AlertTriangle className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">3</p>
                <p className="text-sm text-muted-foreground">Alertas</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent/10">
                <FileText className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">247</p>
                <p className="text-sm text-muted-foreground">Documentos</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Residências */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Home className="h-5 w-5 text-primary" />
              Residências Monitoradas
            </CardTitle>
            <CardDescription>
              Clique em uma residência para ver detalhes da família
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {households.map((household) => (
                <Card 
                  key={household.id}
                  className={`cursor-pointer transition-colors ${
                    selectedHousehold === household.id 
                      ? 'ring-2 ring-primary bg-primary/5' 
                      : 'hover:bg-muted/50'
                  }`}
                  onClick={() => setSelectedHousehold(household.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-secondary">
                          <MapPin className="h-4 w-4" />
                        </div>
                        <div>
                          <h4 className="font-medium">{household.address}</h4>
                          <p className="text-sm text-muted-foreground">
                            Agente: {household.responsibleAgent}
                          </p>
                        </div>
                      </div>
                      {household.healthAlerts > 0 && (
                        <Badge variant="destructive" className="ml-2">
                          {household.healthAlerts} alerta{household.healthAlerts > 1 ? 's' : ''}
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {household.members.length} membros
                        </span>
                        <span className="flex items-center gap-1">
                          <FileText className="h-4 w-4" />
                          {household.totalDocuments} docs
                        </span>
                      </div>
                      <span className="text-muted-foreground">
                        Última visita: {new Date(household.lastVisit).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Detalhes da Família */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Detalhes da Família
            </CardTitle>
            <CardDescription>
              {selectedHousehold 
                ? 'Informações detalhadas dos membros'
                : 'Selecione uma residência para ver os detalhes'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedHousehold ? (
              <div className="space-y-4">
                {households
                  .find(h => h.id === selectedHousehold)
                  ?.members.map((member) => (
                    <Card key={member.id} className="border-l-4 border-l-primary">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4 mb-3">
                          <Avatar>
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback>
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold">{member.name}</h4>
                              {getHealthStatusBadge(member.healthStatus)}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {member.age} anos • {member.relationship}
                            </p>
                          </div>
                          
                          <Button variant="ghost" size="sm">
                            <Shield className="h-4 w-4" />
                          </Button>
                        </div>

                        <Separator className="my-3" />

                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div className="text-center">
                            <div className="flex items-center justify-center gap-1 mb-1">
                              <Heart className="h-4 w-4 text-error" />
                              <span className="font-medium">{member.documents}</span>
                            </div>
                            <p className="text-muted-foreground">Exames</p>
                          </div>
                          
                          <div className="text-center">
                            <div className="flex items-center justify-center gap-1 mb-1">
                              <Pill className="h-4 w-4 text-warning" />
                              <span className="font-medium">{member.medications}</span>
                            </div>
                            <p className="text-muted-foreground">Medicações</p>
                          </div>
                          
                          <div className="text-center">
                            <div className="flex items-center justify-center gap-1 mb-1">
                              <Calendar className="h-4 w-4 text-success" />
                              <span className="font-medium text-xs">
                                {member.lastExam ? 
                                  new Date(member.lastExam).toLocaleDateString('pt-BR') : 
                                  'N/A'
                                }
                              </span>
                            </div>
                            <p className="text-muted-foreground">Último exame</p>
                          </div>
                        </div>

                        <div className="flex gap-2 mt-4">
                          <Button variant="outline" size="sm" className="flex-1">
                            <Phone className="h-4 w-4 mr-2" />
                            Contatar
                          </Button>
                          <Button size="sm" className="flex-1">
                            <FileText className="h-4 w-4 mr-2" />
                            Ver Carteira
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Home className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Selecione uma residência na lista ao lado para visualizar 
                  os detalhes dos membros da família.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Mapa de Calor e Analytics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Analytics Residenciais
          </CardTitle>
          <CardDescription>
            Indicadores de saúde por região e família
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-success mb-2">92%</div>
              <p className="text-sm text-muted-foreground">Famílias com saúde boa</p>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">15</div>
              <p className="text-sm text-muted-foreground">Docs processados hoje</p>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-warning mb-2">3.2</div>
              <p className="text-sm text-muted-foreground">Média docs/pessoa</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};