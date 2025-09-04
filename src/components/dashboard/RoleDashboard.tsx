import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import dashboardBg from '@/assets/dashboard-bg.jpg';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Calendar, 
  Activity, 
  TrendingUp, 
  MapPin, 
  Stethoscope,
  Heart,
  TestTube,
  AlertCircle,
  Clock,
  UserCheck
} from 'lucide-react';
import { guestProfiles, samplePatients, municipalityData, appointments } from '@/data/guestProfiles';
import { Link } from 'react-router-dom';

const RoleDashboard = () => {
  const { userRole } = useAuth();

  if (!userRole) return null;

  const profile = guestProfiles[userRole as keyof typeof guestProfiles];

  const renderGestorDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-morphism border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium group-hover:text-primary transition-colors">População Total</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold group-hover:text-primary transition-colors">{municipalityData.population.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">habitantes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unidades de Saúde</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{municipalityData.healthUnits}</div>
            <p className="text-xs text-muted-foreground">+12% vs mês anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Vacinação</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{municipalityData.vaccinationRate}%</div>
            <p className="text-xs text-muted-foreground">Meta: 90%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orçamento Saúde</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{municipalityData.healthBudget}</div>
            <p className="text-xs text-muted-foreground">2024</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass-morphism border-0 shadow-xl hover:shadow-2xl transition-all duration-500 relative z-10">
          <CardHeader>
            <CardTitle className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Indicadores de Saúde</CardTitle>
            <CardDescription>Principais métricas municipais</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span>Mortalidade Infantil</span>
              <Badge variant="secondary">{municipalityData.infantMortality}‰</Badge>
            </div>
            <div className="flex justify-between">
              <span>Expectativa de Vida</span>
              <Badge variant="secondary">{municipalityData.lifeExpectancy} anos</Badge>
            </div>
            <div className="flex justify-between">
              <span>Médicos Ativos</span>
              <Badge variant="secondary">{municipalityData.doctors}</Badge>
            </div>
            <div className="flex justify-between">
              <span>Enfermeiros</span>
              <Badge variant="secondary">{municipalityData.nurses}</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ações Prioritárias</CardTitle>
            <CardDescription>Demandas que requerem atenção</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-yellow-500" />
              <span className="text-sm">Surto de dengue na região Norte</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-red-500" />
              <span className="text-sm">Fila de cirurgias eletivas acima da meta</span>
            </div>
            <div className="flex items-center gap-2">
              <UserCheck className="h-4 w-4 text-green-500" />
              <span className="text-sm">Campanha de vacinação em andamento</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderMedicoDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pacientes Hoje</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{appointments.length}</div>
            <p className="text-xs text-muted-foreground">consultas agendadas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pacientes Ativos</CardTitle>
            <Stethoscope className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{samplePatients.length}</div>
            <p className="text-xs text-muted-foreground">em acompanhamento</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Exames Pendentes</CardTitle>
            <TestTube className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">aguardando análise</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Próximas Consultas</CardTitle>
            <CardDescription>Agenda do dia</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {appointments.map((appointment) => (
              <div key={appointment.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <div className="font-medium">{appointment.patient}</div>
                  <div className="text-sm text-muted-foreground">{appointment.type}</div>
                </div>
                <Badge variant="outline">{appointment.time}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pacientes em Acompanhamento</CardTitle>
            <CardDescription>Status dos pacientes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {samplePatients.slice(0, 3).map((patient) => (
              <div key={patient.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <div className="font-medium">{patient.name}</div>
                  <div className="text-sm text-muted-foreground">{patient.condition}</div>
                </div>
                <Badge 
                  variant={patient.status === 'Estável' ? 'default' : 
                           patient.status === 'Controlado' ? 'secondary' : 'destructive'}
                >
                  {patient.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderPacienteDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Próxima Consulta</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">20/01/2024</div>
            <p className="text-xs text-muted-foreground">Cardiologia - 14:30</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Medicamentos</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">3 ativos</div>
            <p className="text-xs text-muted-foreground">2 próximos do horário</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Último Exame</CardTitle>
            <TestTube className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">Hemograma</div>
            <p className="text-xs text-muted-foreground">15/01/2024</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Meus Dados de Saúde</CardTitle>
            <CardDescription>Informações principais</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span>Tipo Sanguíneo</span>
              <Badge variant="secondary">O+</Badge>
            </div>
            <div className="flex justify-between">
              <span>Alergias</span>
              <Badge variant="secondary">3 registradas</Badge>
            </div>
            <div className="flex justify-between">
              <span>Condições</span>
              <Badge variant="secondary">Diabetes, Hipertensão</Badge>
            </div>
            <Button asChild variant="premium" className="w-full">
              <Link to="/profile">Ver Perfil Completo</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Lembretes de Saúde</CardTitle>
            <CardDescription>Próximas ações importantes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-red-500" />
              <span className="text-sm">Tomar Lisinopril às 08:00</span>
            </div>
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-blue-500" />
              <span className="text-sm">Medir glicemia após jantar</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-green-500" />
              <span className="text-sm">Consulta cardiologia em 2 dias</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="relative space-y-6">
      {/* Background with image overlay */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-5 pointer-events-none"
        style={{ backgroundImage: `url(${dashboardBg})` }}
      />
      <div className="fixed inset-0 bg-gradient-to-br from-background/80 via-background/90 to-muted/20 pointer-events-none" />
      
      {/* Profile Header */}
      <Card className="relative z-10 glass-morphism border-0 shadow-xl">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="text-4xl">{profile.avatar}</div>
            <div>
              <CardTitle>Bem-vindo, {profile.name}</CardTitle>
              <CardDescription>{profile.description}</CardDescription>
              <div className="flex gap-2 mt-2">
                <Badge variant="outline">{profile.role}</Badge>
                {userRole === 'gestor' && 'municipality' in profile && <Badge variant="secondary">{profile.municipality}</Badge>}
                {userRole === 'medico' && 'crm' in profile && <Badge variant="secondary">{profile.crm}</Badge>}
                {userRole === 'paciente' && 'age' in profile && <Badge variant="secondary">{profile.age}</Badge>}
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Role-specific Dashboard */}
      {userRole === 'gestor' && renderGestorDashboard()}
      {userRole === 'medico' && renderMedicoDashboard()}
      {userRole === 'paciente' && renderPacienteDashboard()}
    </div>
  );
};

export default RoleDashboard;