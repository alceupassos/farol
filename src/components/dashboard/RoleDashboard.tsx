import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import dashboardBg from '@/assets/dashboard-bg.jpg';
import HealthRiskScore from '@/components/health/HealthRiskScore';
import PatientRiskList from '@/components/health/PatientRiskList';
import PopulationRiskMetrics from '@/components/health/PopulationRiskMetrics';
import EnhancedExecutiveCharts from '@/components/executive/EnhancedExecutiveCharts';
import SpecialtyRiskRanking from '@/components/patient/SpecialtyRiskRanking';
import { calculateRiskScore, mockPatientData } from '@/utils/riskCalculator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import DashboardAlertWidget from '@/components/epidemic/DashboardAlertWidget';
import { useTranslation } from 'react-i18next';
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
  UserCheck,
  DollarSign,
  TrendingDown,
  CheckCircle,
  ShieldCheck,
  ClipboardList,
  Truck,
  BarChart3,
  Shield,
  Handshake,
  UploadCloud,
  Images
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { guestProfiles, samplePatients, municipalityData, appointments } from '@/data/guestProfiles';
import { Link } from 'react-router-dom';
import DataSUSIntegration from '@/components/hospital/DataSUSIntegration';

const KpiCard: React.FC<{ 
  title: string; 
  value: string; 
  change?: string; 
  trend?: 'up' | 'down' | 'stable';
  icon: React.ReactNode;
  color?: string;
}> = ({ title, value, change, trend, icon, color = 'blue' }) => (
  <div className="bg-gray-900/80 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm">
    <div className="flex items-center justify-between mb-3">
      <p className="text-sm font-medium text-gray-200">{title}</p>
      <div className={`text-${color}-400`}>{icon}</div>
    </div>
    <p className="text-3xl font-bold text-white">{value}</p>
    {change && (
      <p className={`text-xs mt-2 ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
        {change} {trend === 'up' ? 'desde o mês passado' : 'otimizado'}
      </p>
    )}
  </div>
);

const RoleDashboard = () => {
  const { userRole } = useAuth();
  const { t } = useTranslation();

  if (!userRole) return null;

  const profile = guestProfiles[userRole as keyof typeof guestProfiles];

  if (!profile) {
    return (
      <div className="flex items-center justify-center h-64">
        <Card className="p-8 bg-red-900/20 border-red-800">
          <div className="flex flex-col items-center text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
            <h2 className="text-xl font-bold text-white">Erro de Configuração</h2>
            <p className="text-red-300 mt-2">
              O perfil para a role '<b>{userRole}</b>' não foi encontrado.
            </p>
            <p className="text-gray-400 text-sm mt-1">Verifique o arquivo `guestProfiles.ts`.</p>
          </div>
        </Card>
      </div>
    );
  }

  const renderGestorDashboard = () => (
    <div className="space-y-6">
      {/* Alert Widget */}
      <DashboardAlertWidget className="mb-6" />
      
      {/* Population Risk Metrics - Nova seção */}
      <PopulationRiskMetrics />
      
      {/* Enhanced Executive Charts - Novos gráficos expandidos */}
      <EnhancedExecutiveCharts />
      
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
      {/* Alert Widget */}
      <DashboardAlertWidget className="mb-6" />
      
      {/* Patient Risk List - Nova seção para médicos */}
      <PatientRiskList />
      
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

      <Card className="bg-gradient-to-r from-purple-900/60 via-slate-900/80 to-indigo-900/60 border border-purple-600/40 shadow-xl">
        <CardHeader className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <CardTitle className="text-white text-xl flex items-center gap-2">
              <UploadCloud className="h-5 w-5 text-purple-200" />
              Workspace de Imagens clínicas
            </CardTitle>
            <CardDescription className="text-slate-200">
              Faça upload de exames, receba análise preliminar com IA e gere prognósticos colaborativos durante a teleconsulta.
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="secondary" className="bg-purple-500/80 hover:bg-purple-500 text-white">
              <Link to="#" onClick={(event) => { event.preventDefault(); }}>Tutorial</Link>
            </Button>
            <Button asChild className="bg-emerald-500 hover:bg-emerald-400 text-white">
              <Link to="#" onClick={(event) => { event.preventDefault(); }}>Abrir telemedicina</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          {[
            { title: 'Diagnóstico assistido', description: 'IA gera achados e recomendações a partir das imagens enviadas.' },
            { title: 'Integração multi-modais', description: 'Suporte a RX, USG, RM/TC e anexos DICOM para comparação histórica.' },
            { title: 'Parecer colaborativo', description: 'Compartilhe rapidamente com radiologistas e equipe multidisciplinar.' }
          ].map((item) => (
            <div key={item.title} className="rounded-xl border border-white/10 bg-slate-950/60 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-purple-200">
                <Images className="h-4 w-4" />
                {item.title}
              </div>
              <p className="text-xs text-slate-200 mt-2">{item.description}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );

  const renderLaboratorioDashboard = () => (
    <div className="space-y-6">
      <DashboardAlertWidget className="mb-6" />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-morphism border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Coletas do dia</CardTitle>
            <Truck className="h-4 w-4 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24 agendadas</div>
            <p className="text-xs text-muted-foreground">12 rotas em execução</p>
          </CardContent>
        </Card>
        <Card className="glass-morphism border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">TAT médio (24h)</CardTitle>
            <Clock className="h-4 w-4 text-sky-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">03h42</div>
            <p className="text-xs text-muted-foreground">-14 min vs meta</p>
          </CardContent>
        </Card>
        <Card className="glass-morphism border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conformidade RNDS</CardTitle>
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">97,8%</div>
            <p className="text-xs text-muted-foreground">Bundles aceitos</p>
          </CardContent>
        </Card>
        <Card className="glass-morphism border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alertas críticos</CardTitle>
            <AlertCircle className="h-4 w-4 text-amber-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6 ativos</div>
            <p className="text-xs text-muted-foreground">3 compliance · 3 operação</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Operação logística</CardTitle>
            <CardDescription>Coletas, cadeia fria e chain of custody</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2">
              <ClipboardList className="h-4 w-4 text-emerald-400" />
              <span className="text-sm">Checklists concluídos · 98%</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-sky-400" />
              <span className="text-sm">62 lotes em trânsito · 12 rotas ativas</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span className="text-sm">Cadeia fria dentro da faixa · 2 alertas ativos</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Publicação de laudos</CardTitle>
            <CardDescription>Portais médicos, pacientes e RNDS</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-sky-400" />
              <span className="text-sm">37 laudos pendentes · fila genômica com 5 casos</span>
            </div>
            <div className="flex items-center gap-2">
              <Handshake className="h-4 w-4 text-indigo-400" />
              <span className="text-sm">Integrações hospitalares · 78% cobertura</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-emerald-400" />
              <span className="text-sm">Auto-publicação RNDS com validador em lote</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>KPIs estratégicos</CardTitle>
            <CardDescription>Monitoramento contínuo</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-emerald-400" />
              <span className="text-sm">Cobertura RNDS 92% · meta 98%</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-sky-400" />
              <span className="text-sm">Integrações privadas em expansão · Fleury, Pardini, Dasa</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-400" />
              <span className="text-sm">Definition of Done atendida · runbooks publicados</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Roadmap de integrações</CardTitle>
          <CardDescription>Fases de rollout e status</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-3 text-sm">
          <div className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 p-4">
            <p className="font-semibold text-emerald-200">Fase 1</p>
            <p className="text-slate-300">RNDS + Fleury + Pardini — concluído</p>
          </div>
          <div className="rounded-lg border border-sky-500/40 bg-sky-500/10 p-4">
            <p className="font-semibold text-sky-200">Fase 2</p>
            <p className="text-slate-300">Dasa Nav/Nav Pro + Sabin — em andamento</p>
          </div>
          <div className="rounded-lg border border-amber-500/40 bg-amber-500/10 p-4">
            <p className="font-semibold text-amber-200">Fase 3</p>
            <p className="text-slate-300">Hospitais prioritários + Imagem</p>
          </div>
          <div className="rounded-lg border border-indigo-500/40 bg-indigo-500/10 p-4">
            <p className="font-semibold text-indigo-200">Fase 4</p>
            <p className="text-slate-300">Genômica (Mendelics, Dasa, Fleury, GeneOne)</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderPacienteDashboard = () => {
    // Calcular score de risco para o paciente logado (usando dados mock)
    const patientRisk = calculateRiskScore(mockPatientData['joao-silva']);
    
    return (
    <div className="space-y-6">
      {/* Alert Widget */}
      <DashboardAlertWidget className="mb-6" />
      
      {/* Score de Risco - Destaque para o paciente */}
      <HealthRiskScore 
        riskScore={patientRisk}
        patientName="João Silva"
        size="lg"
        showDetails={true}
      />
      
      {/* Ranking de Risco por Especialidade - Nova funcionalidade */}
      <SpecialtyRiskRanking />
      
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
  };

  const renderHospitalDashboard = () => {
    const faturamentoData = [{ name: 'SUS', value: 57 }, { name: 'TISS', value: 43 }];
    const ocupacaoData = [{ name: 'Clínica', Ocupação: 85 }, { name: 'Cirúrgica', Ocupação: 92 }, { name: 'UTI', Ocupação: 95 }, { name: 'Pediatria', Ocupação: 75 }];
    const qualidadeData = [{ name: 'Jan', Infecção: 2.5, Readmissão: 8.5 }, { name: 'Fev', Infecção: 2.3, Readmissão: 8.2 }, { name: 'Mar', Infecção: 2.1, Readmissão: 8.3 }];
    const COLORS = ['#8884d8', '#82ca9d'];

    return (
      <div className="space-y-8">
        <DashboardAlertWidget className="mb-6" />

        {/* Seção Financeira */}
        <div>
          <h2 className="text-2xl font-semibold text-white mb-4">💰 Visão Geral Financeira</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <KpiCard title="Faturamento Total (Mês)" value="R$ 4.3M" change="+16%" trend="up" icon={<DollarSign />} color="green" />
            <KpiCard title="Custo por Paciente/Dia" value="R$ 1.2k" change="+2%" trend="up" icon={<TrendingDown />} color="orange" />
            <KpiCard title="Taxa de Glosa (Total)" value="4.1%" change="-0.5%" trend="down" icon={<AlertCircle />} color="red" />
            <Card>
              <CardHeader><CardTitle className="text-base font-medium">Faturamento SUS vs. TISS</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={150}>
                  <PieChart>
                    <Pie data={faturamentoData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} fill="#8884d8">
                      {faturamentoData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Seção Operacional */}
        <div>
          <h2 className="text-2xl font-semibold text-white mb-4">⚡ Eficiência Operacional</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <KpiCard title="Taxa de Ocupação Leitos" value="87.3%" change="+5.2%" trend="up" icon={<Activity />} color="blue" />
            <KpiCard title="Tempo Médio Permanência" value="4.2 dias" change="-0.8d" trend="down" icon={<Clock />} color="green" />
            <KpiCard title="Giro de Leitos" value="5.1" change="+0.3" trend="up" icon={<TrendingUp />} color="purple" />
            <Card>
              <CardHeader><CardTitle className="text-base font-medium">Ocupação por Ala</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={150}>
                  <BarChart data={ocupacaoData} layout="vertical">
                    <XAxis type="number" hide />
                    <YAxis type="category" dataKey="name" hide />
                    <Tooltip />
                    <Bar dataKey="Ocupação" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Seção de Qualidade */}
        <div>
          <h2 className="text-2xl font-semibold text-white mb-4">🏥 Qualidade Clínica e Segurança</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <KpiCard title="Taxa de Infecção Hosp." value="2.1%" change="-0.2%" trend="down" icon={<CheckCircle />} color="green" />
            <KpiCard title="Readmissão em 30 Dias" value="8.3%" change="+0.1%" trend="up" icon={<AlertCircle />} color="red" />
            <KpiCard title="Taxa de Mortalidade" value="1.2%" change="-0.1%" trend="down" icon={<Heart />} color="blue" />
            <Card>
              <CardHeader><CardTitle className="text-base font-medium">Qualidade vs. Metas</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={150}>
                  <LineChart data={qualidadeData}>
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="Infecção" stroke="#e53e3e" name="Infecção (%)" />
                    <Line type="monotone" dataKey="Readmissão" stroke="#f59e0b" name="Readmissão (%)" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Integração DATASUS */}
        <div>
          <h2 className="text-2xl font-semibold text-white mb-4">🔗 Integração com Dados Públicos</h2>
          <DataSUSIntegration />
        </div>

        {/* Link para Sistema HIS/HMIS */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">Acesso ao Sistema HIS/HMIS</h3>
                <p className="text-blue-100">Explore o sistema completo com todos os módulos e relatórios detalhados.</p>
              </div>
              <Link to="/hospitals-access">
                <Button variant="secondary" size="lg">Acessar Sistema Completo</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="relative space-y-6">
      {/* Background with image overlay */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-5 pointer-events-none"
        style={{ backgroundImage: `url(${dashboardBg})` }}
      />
      <div className="fixed inset-0 bg-gradient-to-br from-background/20 via-background/30 to-muted/10 pointer-events-none" />
      
      {/* Profile Header */}
      <Card className="relative z-10 glass-morphism border-0 shadow-xl">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="text-4xl">{profile.avatar}</div>
            <div>
              <CardTitle>Bem-vindo, {profile.name}</CardTitle>
              <CardDescription>
                {'descriptionKey' in profile && profile.descriptionKey
                  ? t(profile.descriptionKey)
                  : profile.description}
              </CardDescription>
              <div className="flex gap-2 mt-2">
                <Badge variant="outline">
                  {'roleKey' in profile && profile.roleKey ? t(profile.roleKey) : profile.role}
                </Badge>
                {userRole === 'gestor' && 'municipality' in profile && <Badge variant="secondary">{profile.municipality}</Badge>}
                {userRole === 'medico' && 'crm' in profile && <Badge variant="secondary">{profile.crm}</Badge>}
                {userRole === 'hospital' && 'institution' in profile && <Badge variant="secondary">{profile.institution}</Badge>}
                {userRole === 'paciente' && 'age' in profile && <Badge variant="secondary">{profile.age}</Badge>}
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Role-specific Dashboard */}
      {userRole === 'gestor' && renderGestorDashboard()}
      {userRole === 'medico' && renderMedicoDashboard()}
      {userRole === 'laboratorio' && renderLaboratorioDashboard()}
      {userRole === 'hospital' && renderHospitalDashboard()}
      {userRole === 'paciente' && renderPacienteDashboard()}
    </div>
  );
};

export default RoleDashboard;
