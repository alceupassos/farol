import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  User,
  FileText,
  Pill,
  Calendar,
  BarChart2,
  Microscope,
  KeyRound,
  ShieldAlert,
  Settings,
  Info,
  Video,
  Users,
  Building,
  Stethoscope,
  Scissors,
  Heart,
  CheckCircle,
  DollarSign,
  TrendingUp,
  Zap,
  MapPin,
  TestTube,
  ClipboardList,
  Brain,
  Shield,
  Database,
  Target,
  Calculator,
  Scale,
  GraduationCap,
  RefreshCw,
  BarChart3,
  Globe,
  Handshake,
  Map,
  BrainCircuit,
  Bone,
  Activity,
  Eye,
  Ear,
  Thermometer,
  Watch,
  ChevronLeft,
  ChevronRight,
  Images,
  UploadCloud,
  Newspaper
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { ossSections } from './SidebarOSS';

interface SidebarItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  currentPath: string;
  onClick?: () => void;
  isChild?: boolean;
}

interface SidebarItemCollapsibleProps extends SidebarItemProps {
  isCollapsed: boolean;
}

const SidebarItemCollapsible = ({ to, icon, label, currentPath, onClick, isCollapsed, isChild = false }: SidebarItemCollapsibleProps) => {
  const isExternal = to.startsWith('http');

  if (isExternal) {
    return (
      <a
        href={to}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        className="block"
        title={isCollapsed ? label : undefined}
      >
        <Button
          variant={'ghost'}
          className={cn(
            'w-full h-auto',
            isCollapsed ? 'justify-center px-0' : 'flex items-center',
            isCollapsed ? '' : isChild ? 'justify-start text-sm py-2 pl-10' : 'justify-start text-base py-3'
          )}
        >
          {icon}
          {!isCollapsed && label}
        </Button>
      </a>
    );
  }

  return (
    <Link to={to} onClick={onClick}>
      <Button
        variant={currentPath === to ? 'secondary' : 'ghost'}
        className={cn(
          'w-full h-auto',
          isCollapsed ? 'justify-center px-0' : 'flex items-center',
          isCollapsed ? '' : isChild ? 'justify-start text-sm py-2 pl-10' : 'justify-start text-base py-3'
        )}
        title={isCollapsed ? label : undefined}
      >
        {icon}
        {!isCollapsed && label}
      </Button>
    </Link>
  );
};

const SidebarItem = ({ to, icon, label, currentPath, onClick, isChild = false }: SidebarItemProps) => {
  const isExternal = to.startsWith('http');

  if (isExternal) {
    return (
      <a
        href={to}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        className="block"
      >
        <Button
          variant={'ghost'}
          className={cn('w-full h-auto', isChild ? 'justify-start text-sm py-2 pl-10' : 'justify-start text-base py-3')}
        >
          {icon}
          {label}
        </Button>
      </a>
    );
  }

  return (
    <Link to={to} onClick={onClick}>
      <Button
        variant={currentPath === to ? 'secondary' : 'ghost'}
        className={cn('w-full h-auto', isChild ? 'justify-start text-sm py-2 pl-10' : 'justify-start text-base py-3')}
      >
        {icon}
        {label}
      </Button>
    </Link>
  );
};

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  isCollapsed: boolean;
  toggleCollapsed: () => void;
}

type SectionItemConfig = {
  to: string;
  icon: React.ReactNode;
  labelKey: string;
  isChild?: boolean;
};

type SectionConfig = {
  titleKey: string;
  items: SectionItemConfig[];
};

const Sidebar = ({ isOpen, toggleSidebar, isCollapsed, toggleCollapsed }: SidebarProps) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { userRole } = useAuth();
  const { t } = useTranslation();

  const buildSections = (configs: SectionConfig[]) =>
    configs.map((section) => ({
      title: t(section.titleKey),
      items: section.items.map((item) => ({
        to: item.to,
        icon: item.icon,
        label: t(item.labelKey),
        isChild: item.isChild,
      })),
    }));

  const getMenuItemsByRole = () => {
    if (!userRole) {
      return [] as Array<{ title: string; items: SidebarItemProps[] }>;
    }

    const sections: SectionConfig[] = [];

    const dashboardSections: Record<string, SectionConfig[]> = {
      gestor: [
        {
          titleKey: 'sidebar.sections.dashboard.title',
          items: [
            {
              to: '/prefeitura-dashboard',
              icon: <LayoutDashboard className="h-5 w-5 mr-3" />,
              labelKey: 'sidebar.sections.dashboard.items.prefeituraOverview',
            },
            {
              to: '/oraculo-ia',
              icon: <BrainCircuit className="h-5 w-5 mr-3" />,
              labelKey: 'sidebar.sections.dashboard.items.aiOracle',
            },
            {
              to: '/noticias-saude-piracicaba',
              icon: <Newspaper className="h-5 w-5 mr-3" />,
              labelKey: 'sidebar.sections.dashboard.items.healthNews',
            },
          ],
        },
      ],
      hospital: [
        {
          titleKey: 'sidebar.sections.dashboard.title',
          items: [
            {
              to: '/dashboard',
              icon: <LayoutDashboard className="h-5 w-5 mr-3" />,
              labelKey: 'sidebar.sections.dashboard.items.hospitalOverview',
            },
            {
              to: '/oraculo-ia',
              icon: <BrainCircuit className="h-5 w-5 mr-3" />,
              labelKey: 'sidebar.sections.dashboard.items.aiOracle',
            },
          ],
        },
      ],
      oss: [
        {
          titleKey: 'sidebar.sections.dashboard.title',
          items: [
            {
              to: '/oss-dashboard',
              icon: <LayoutDashboard className="h-5 w-5 mr-3" />,
              labelKey: 'sidebar.sections.dashboard.items.ossOverview',
            },
            {
              to: '/oss-oracle-ai',
              icon: <BrainCircuit className="h-5 w-5 mr-3" />,
              labelKey: 'sidebar.sections.dashboard.items.aiOracle',
            },
          ],
        },
      ],
    };

    const laboratorySections: SectionConfig[] = [
      {
        titleKey: 'sidebar.sections.laboratoryHub.title',
        items: [
          { to: '/laboratorios/visao-geral', icon: <LayoutDashboard className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.laboratoryHub.items.overview' },
          { to: '/laboratorios/operacao', icon: <ClipboardList className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.laboratoryHub.items.operations' },
          { to: '/laboratorios/operacao#coleta-logistica', icon: <div className="w-2 h-2 rounded-full bg-emerald-400 mr-3" />, labelKey: 'sidebar.sections.laboratoryHub.items.collectionLogistics', isChild: true },
          { to: '/laboratorios/operacao#amostras-lotes', icon: <div className="w-2 h-2 rounded-full bg-emerald-400 mr-3" />, labelKey: 'sidebar.sections.laboratoryHub.items.samplesBatches', isChild: true },
          { to: '/laboratorios/operacao#triagem-prioridades', icon: <div className="w-2 h-2 rounded-full bg-emerald-400 mr-3" />, labelKey: 'sidebar.sections.laboratoryHub.items.triagePriorities', isChild: true },
          { to: '/laboratorios/resultados-laudos', icon: <FileText className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.laboratoryHub.items.resultsReports' },
          { to: '/laboratorios/integracoes', icon: <Handshake className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.laboratoryHub.items.integrations' },
          { to: '/laboratorios/qualidade-compliance', icon: <Shield className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.laboratoryHub.items.qualityCompliance' },
          { to: '/laboratorios/analytics-kpis', icon: <BarChart3 className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.laboratoryHub.items.analytics' },
          { to: '/laboratorios/administracao', icon: <Settings className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.laboratoryHub.items.administration' },
        ],
      },
    ];

    const managerSections: SectionConfig[] = [
      {
        titleKey: 'sidebar.sections.publicManagement.title',
        items: [
          { to: '/executive-dashboard', icon: <TrendingUp className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.publicManagement.items.executiveDashboard' },
          { to: '/operational-dashboard', icon: <Zap className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.publicManagement.items.operationalDashboard' },
          { to: '/population', icon: <Users className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.publicManagement.items.populationAnalysis' },
          { to: '/epidemiology', icon: <MapPin className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.publicManagement.items.epidemiologyMap' },
          { to: '/epidemic-alerts', icon: <ShieldAlert className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.publicManagement.items.epidemicAlerts' },
          { to: '/resources', icon: <ClipboardList className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.publicManagement.items.resourceManagement' },
        ],
      },
      {
        titleKey: 'sidebar.sections.financeBudget.title',
        items: [
          { to: '/monitoramento-aps', icon: <BarChart3 className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.financeBudget.items.apsMonitoring' },
          { to: '/gestao-orcamentaria', icon: <DollarSign className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.financeBudget.items.budgetManagement' },
          { to: '/simulador-ied', icon: <Calculator className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.financeBudget.items.investmentSimulator' },
          { to: '/controle-judicializacao', icon: <Scale className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.financeBudget.items.legalControl' },
        ],
      },
      {
        titleKey: 'sidebar.sections.trainingManagement.title',
        items: [
          { to: '/capacitacao-gestores', icon: <GraduationCap className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.trainingManagement.items.susManagersProgram' },
          { to: '/transicao-gestao', icon: <RefreshCw className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.trainingManagement.items.managementTransition' },
          { to: '/indicadores-desempenho', icon: <Target className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.trainingManagement.items.apsIndicators' },
          { to: '/governanca-dados', icon: <Database className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.trainingManagement.items.dataGovernance' },
        ],
      },
      {
        titleKey: 'sidebar.sections.regionalization.title',
        items: [
          { to: '/comissoes-cir', icon: <Globe className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.regionalization.items.cirCommittees' },
          { to: '/pactuacao-regional', icon: <Handshake className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.regionalization.items.regionalAgreement' },
          { to: '/territorializacao', icon: <Map className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.regionalization.items.territorialization' },
        ],
      },
      {
        titleKey: 'sidebar.sections.hospitalManagement.title',
        items: [
          { to: '/hospitals-access', icon: <Building className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.hospitalManagement.items.hospitalAccess' },
        ],
      },
      {
        titleKey: 'sidebar.sections.analytics.title',
        items: [
          { to: '/ai-analytics', icon: <Brain className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.analytics.items.aiAnalytics' },
          { to: '/security-dashboard', icon: <Shield className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.analytics.items.security' },
          { to: '/integrations-dashboard', icon: <Database className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.analytics.items.integrations' },
        ],
      },
    ];

    const hospitalSections: SectionConfig[] = [
      {
        titleKey: 'sidebar.sections.hospitalDashboard.title',
        items: [
          { to: '/hospitals-access', icon: <Building className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.hospitalDashboard.items.hisHmisSystem' },
        ],
      },
      {
        titleKey: 'sidebar.sections.billingFinance.title',
        items: [
          { to: '/faturamento-sus', icon: <FileText className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.billingFinance.items.susBilling' },
          { to: '/tiss-tuss', icon: <Shield className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.billingFinance.items.tissTuss' },
          { to: '/apac-oncologia', icon: <Heart className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.billingFinance.items.apacOncology' },
        ],
      },
      {
        titleKey: 'sidebar.sections.interoperability.title',
        items: [
          { to: '/rnds-datasus', icon: <Database className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.interoperability.items.rndsDatasus' },
          { to: '/conformidade-lgpd', icon: <Shield className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.interoperability.items.lgpdCompliance' },
          { to: '/prontuario-digital', icon: <FileText className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.interoperability.items.digitalRecord' },
        ],
      },
      {
        titleKey: 'sidebar.sections.clinicalManagement.title',
        items: [
          { to: '/gestao-clinica', icon: <Stethoscope className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.clinicalManagement.items.clinicalManagement' },
          { to: '/centro-cirurgico', icon: <Scissors className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.clinicalManagement.items.surgeryCenter' },
          { to: '/uti-terapia-intensiva', icon: <Heart className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.clinicalManagement.items.icu' },
          { to: '/indicadores-qualidade', icon: <CheckCircle className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.clinicalManagement.items.qualityIndicators' },
          { to: '/analises-laboratoriais', icon: <TestTube className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.clinicalManagement.items.labAnalysis' },
          { to: '/gestao-farmaceutica', icon: <Pill className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.clinicalManagement.items.pharmacyManagement' },
        ],
      },
      {
        titleKey: 'sidebar.sections.analyticsIntelligence.title',
        items: [
          { to: '/relatorios-analytics', icon: <BarChart3 className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.analyticsIntelligence.items.reportsAnalytics' },
          { to: '/dashboard-financeiro', icon: <DollarSign className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.analyticsIntelligence.items.financialDashboard' },
          { to: '/ai-insights', icon: <BrainCircuit className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.analyticsIntelligence.items.aiInsights' },
        ],
      },
      {
        titleKey: 'sidebar.sections.technicalIntegrations.title',
        items: [
          { to: '/integracoes-tecnicas', icon: <Zap className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.technicalIntegrations.items.technicalIntegrations' },
          { to: '/integracao-erp', icon: <Database className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.technicalIntegrations.items.erpIntegration' },
        ],
      },
    ];

    const doctorSections: SectionConfig[] = [
      {
        titleKey: 'sidebar.sections.medicalCare.title',
        items: [
          { to: '/patients', icon: <Users className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.medicalCare.items.myPatients' },
          { to: '/appointments', icon: <Calendar className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.medicalCare.items.medicalSchedule' },
          { to: '/lab-exams', icon: <TestTube className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.medicalCare.items.labResults' },
          { to: '/protocols', icon: <FileText className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.medicalCare.items.medicalProtocols' },
          { to: 'https://www.angrasaude.com.br', icon: <Video className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.medicalCare.items.telemedicine' },
        ],
      },
      {
        titleKey: 'sidebar.sections.imagingAI.title',
        items: [
          { to: '/laboratorios/visao-geral', icon: <Images className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.imagingAI.items.imagingWorkspace' },
          { to: '/laboratorios/analytics-kpis', icon: <UploadCloud className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.imagingAI.items.examAnalytics' },
        ],
      },
      {
        titleKey: 'sidebar.sections.hospitalManagement.title',
        items: [
          { to: '/hospitals-access', icon: <Building className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.hospitalManagement.items.hospitalAccess' },
        ],
      },
      {
        titleKey: 'sidebar.sections.mapsLocation.title',
        items: [
          { to: '/epidemiology', icon: <MapPin className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.mapsLocation.items.epidemiologyMap' },
          { to: '/epidemic-alerts', icon: <ShieldAlert className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.mapsLocation.items.epidemicAlerts' },
        ],
      },
      {
        titleKey: 'sidebar.sections.analytics.title',
        items: [
          { to: '/ai-analytics', icon: <Brain className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.analytics.items.aiAnalytics' },
          { to: '/security-dashboard', icon: <Shield className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.analytics.items.security' },
        ],
      },
    ];

    const patientSections: SectionConfig[] = [
      {
        titleKey: 'sidebar.sections.myHealth.title',
        items: [
          { to: '/profile', icon: <User className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.myHealth.items.myProfile' },
          { to: '/records', icon: <FileText className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.myHealth.items.medicalRecords' },
          { to: '/medications', icon: <Pill className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.myHealth.items.medications' },
          { to: '/appointments', icon: <Calendar className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.myHealth.items.myAppointments' },
          { to: '/metrics', icon: <BarChart2 className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.myHealth.items.healthMetrics' },
          { to: '/labexams', icon: <Microscope className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.myHealth.items.myExams' },
        ],
      },
      {
        titleKey: 'sidebar.sections.seniorCare.title',
        items: [
          { to: '/diabetes-care', icon: <Heart className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.seniorCare.items.diabetesCare' },
          { to: '/osteoporosis-care', icon: <Bone className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.seniorCare.items.osteoporosisCare' },
          { to: '/saude-mental-integral', icon: <Brain className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.seniorCare.items.mentalHealth' },
          { to: '/glucose-monitoring', icon: <Thermometer className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.seniorCare.items.glucoseMonitoring' },
          { to: '/neurology-care', icon: <Brain className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.seniorCare.items.neurologyCare' },
          { to: '/vision-care', icon: <Eye className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.seniorCare.items.visionCare' },
          { to: '/hearing-care', icon: <Ear className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.seniorCare.items.hearingCare' },
        ],
      },
      {
        titleKey: 'sidebar.sections.connectedData.title',
        items: [
          { to: '/painel-metabolico', icon: <Activity className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.connectedData.items.metabolicPanel' },
          { to: '/conectores-saude', icon: <Watch className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.connectedData.items.healthConnectors' },
        ],
      },
      {
        titleKey: 'sidebar.sections.emergencyAccess.title',
        items: [
          { to: '/emergency', icon: <ShieldAlert className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.emergencyAccess.items.emergencyQr' },
          { to: '/manage-access', icon: <KeyRound className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.emergencyAccess.items.manageAccess' },
        ],
      },
    ];

    const systemSections: SectionConfig[] = [
      {
        titleKey: 'sidebar.sections.system.title',
        items: [
          { to: '/settings', icon: <Settings className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.system.items.settings' },
          { to: '/technical-details', icon: <Info className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.system.items.technicalDetails' },
        ],
      },
    ];

    if (dashboardSections[userRole]) {
      sections.push(...dashboardSections[userRole]);
    }

    if (userRole === 'laboratorio') {
      sections.push(...laboratorySections);
    }

    if (userRole === 'gestor') {
      sections.push(...managerSections);
    }

    if (userRole === 'hospital') {
      sections.push(...hospitalSections);
    }

    if (userRole === 'medico') {
      sections.push(...doctorSections);
    }

    if (userRole === 'paciente') {
      sections.push(...patientSections);
    }

    if (userRole === 'oss') {
      sections.push(...ossSections);
    }

    sections.push(...systemSections);

    return buildSections(sections);
  };

  const menuSections = getMenuItemsByRole();

  const roleLabelMap: Record<string, string> = {
    gestor: 'navbar.roles.manager',
    hospital: 'navbar.roles.hospital',
    laboratorio: 'navbar.roles.laboratory',
    medico: 'navbar.roles.doctor',
    paciente: 'navbar.roles.patient',
    oss: 'navbar.roles.oss',
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-30 bg-black/50 md:hidden" onClick={toggleSidebar} />
      )}

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 flex transform flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-all duration-300 ease-in-out md:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          isCollapsed ? 'w-16' : 'w-64'
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-3">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex h-8 w-8 text-sidebar-accent-foreground hover:bg-sidebar-accent/20"
              onClick={toggleCollapsed}
              title={isCollapsed ? t('sidebar.controls.expand') : t('sidebar.controls.collapse')}
            >
              {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-8 w-8 text-sidebar-accent-foreground hover:bg-sidebar-accent/20"
              onClick={toggleSidebar}
              title={isOpen ? t('sidebar.controls.close') : t('sidebar.controls.open')}
            >
              {isOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
            {!isCollapsed ? (
              <Link to="/dashboard" className="flex items-center gap-2">
                <img src="/favicon.ico" alt={t('sidebar.brand')} className="h-8 w-8" />
                <span className="text-lg font-semibold text-sidebar-foreground">{t('sidebar.brand')}</span>
              </Link>
            ) : (
              <Link to="/dashboard" className="flex items-center justify-center w-full">
                <img src="/favicon.ico" alt={t('sidebar.brand')} className="h-8 w-8" />
              </Link>
            )}
          </div>
        </div>

        {userRole && !isCollapsed && (
          <div className="px-6 py-3 border-b border-sidebar-border bg-sidebar-accent/10">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full" />
              <span className="text-sm font-medium text-sidebar-accent-foreground">
                {t(roleLabelMap[userRole] ?? 'navbar.roles.visitor')}
              </span>
            </div>
          </div>
        )}

        <nav className="flex-1 space-y-1 overflow-y-auto p-2">
          {menuSections.map((section, index) => (
            <div key={`${section.title}-${index}`}>
              {!isCollapsed && (
                <h3
                  className={cn(
                    'px-3 text-xs font-semibold uppercase text-sidebar-accent-foreground tracking-wider mb-2',
                    index > 0 ? 'pt-4' : ''
                  )}
                >
                  {section.title}
                </h3>
              )}
              {section.items.map((item) => (
                <SidebarItemCollapsible
                  key={`${section.title}-${item.label}-${item.to}`}
                  {...item}
                  currentPath={currentPath}
                  isCollapsed={isCollapsed}
                  onClick={
                    isOpen && !item.to.startsWith('http')
                      ? toggleSidebar
                      : item.to.startsWith('http') && isOpen
                        ? toggleSidebar
                        : undefined
                  }
                />
              ))}
            </div>
          ))}
        </nav>

        {!isCollapsed && (
          <div className="mt-auto border-t border-sidebar-border p-4">
            <p className="text-center text-xs text-sidebar-accent-foreground">
              {t('sidebar.footer.copyright', { year: new Date().getFullYear() })}
              <br />
              {t('sidebar.footer.rights')}
            </p>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;
