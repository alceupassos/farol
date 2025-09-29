import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, TrendingUp, DollarSign, Shield, Target, Brain,
  FileText, AlertTriangle, CheckCircle, BarChart3, Activity,
  Database, Globe, Users, Calculator, RefreshCw, Zap,
  Newspaper, Layers, Info, Building, ClipboardList,
  Handshake, GraduationCap, Scale, Map, BrainCircuit,
  Stethoscope, Scissors, Heart, TestTube, Pill,
  Settings, User, KeyRound, Microscope, Calendar,
  Video, Images, UploadCloud, Watch, ShieldAlert,
  MapPin, Eye, Ear, Thermometer, Bone, Ambulance,
  Workflow, Network, BookOpen, SquareStack, ClipboardCheck,
  ShieldCheck, CheckCircle2, Clock, Gauge
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { CustomizationPanel } from '@/components/customization/CustomizationPanel';

interface SidebarItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  currentPath: string;
  onClick?: () => void;
  isChild?: boolean;
}

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

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

const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const location = useLocation();
  const currentPath = `${location.pathname}${location.search}`;
  const { userRole } = useAuth();
  const { t } = useTranslation();
  const [isCustomizationOpen, setIsCustomizationOpen] = useState(false);

  const getMenuItemsByRole = () => {
    if (!userRole) return [];

    const sections: Array<{ title: string; items: SidebarItemProps[] }> = [];

    // Seções baseadas no role
    const roleSections: Record<string, Array<{ title: string; items: Array<{ to: string; icon: React.ReactNode; label: string; isChild?: boolean }> }>> = {
      gestor: [
        {
          title: 'Dashboard',
          items: [
            { to: '/prefeitura-dashboard', icon: <LayoutDashboard className="h-5 w-5 mr-3" />, label: 'Visão Geral Prefeitura' },
            { to: '/executive-dashboard', icon: <TrendingUp className="h-5 w-5 mr-3" />, label: 'Dashboard Executivo' },
            { to: '/operational-dashboard', icon: <Activity className="h-5 w-5 mr-3" />, label: 'Dashboard Operacional' },
            { to: '/oraculo-ia', icon: <BrainCircuit className="h-5 w-5 mr-3" />, label: 'Oráculo IA Gestão' },
            { to: '/noticias-saude-piracicaba', icon: <Newspaper className="h-5 w-5 mr-3" />, label: 'Notícias Saúde' },
          ],
        },
        {
          title: 'Gestão Pública',
          items: [
            { to: '/population', icon: <Users className="h-5 w-5 mr-3" />, label: 'Análise Populacional' },
            { to: '/epidemiology', icon: <Map className="h-5 w-5 mr-3" />, label: 'Mapa Epidemiológico' },
            { to: '/epidemic-alerts', icon: <AlertTriangle className="h-5 w-5 mr-3" />, label: 'Alertas Epidemiológicos' },
            { to: '/resources', icon: <ClipboardList className="h-5 w-5 mr-3" />, label: 'Gestão de Recursos' },
          ],
        },
        {
          title: 'Financiamento e Orçamento',
          items: [
            { to: '/monitoramento-aps', icon: <Activity className="h-5 w-5 mr-3" />, label: 'Monitoramento APS' },
            { to: '/gestao-orcamentaria', icon: <DollarSign className="h-5 w-5 mr-3" />, label: 'Gestão Orçamentária' },
            { to: '/simulador-ied', icon: <Calculator className="h-5 w-5 mr-3" />, label: 'Simulador IED' },
            { to: '/controle-judicializacao', icon: <Scale className="h-5 w-5 mr-3" />, label: 'Controle Judicialização' },
          ],
        },
        {
          title: 'Capacitação e Gestão',
          items: [
            { to: '/capacitacao-gestores', icon: <GraduationCap className="h-5 w-5 mr-3" />, label: 'Programa Gestores SUS' },
            { to: '/transicao-gestao', icon: <RefreshCw className="h-5 w-5 mr-3" />, label: 'Transição de Gestão' },
            { to: '/indicadores-desempenho', icon: <BarChart3 className="h-5 w-5 mr-3" />, label: 'Indicadores APS' },
            { to: '/governanca-dados', icon: <Shield className="h-5 w-5 mr-3" />, label: 'Governança de Dados' },
          ],
        },
        {
          title: 'Regionalização',
          items: [
            { to: '/comissoes-cir', icon: <Users className="h-5 w-5 mr-3" />, label: 'Comissões CIR' },
            { to: '/pactuacao-regional', icon: <Handshake className="h-5 w-5 mr-3" />, label: 'Pactuação Regional' },
            { to: '/territorializacao', icon: <MapPin className="h-5 w-5 mr-3" />, label: 'Territorialização' },
          ],
        },
        {
          title: 'Gestão Hospitalar',
          items: [
            { to: '/hospitals-access', icon: <Building className="h-5 w-5 mr-3" />, label: 'Acesso Hospitais' },
          ],
        },
        {
          title: 'Analytics',
          items: [
            { to: '/ai-analytics', icon: <Brain className="h-5 w-5 mr-3" />, label: 'AI Analytics' },
            { to: '/security-dashboard', icon: <ShieldAlert className="h-5 w-5 mr-3" />, label: 'Segurança' },
            { to: '/integrations-dashboard', icon: <Globe className="h-5 w-5 mr-3" />, label: 'Integrações' },
          ],
        },
      ],
      hospital: [
        {
          title: 'Dashboard',
          items: [
            { to: '/dashboard', icon: <LayoutDashboard className="h-5 w-5 mr-3" />, label: 'Visão Geral Hospital' },
            { to: '/hospital-dashboard-detalhado', icon: <BarChart3 className="h-5 w-5 mr-3" />, label: 'Dashboard Hospitalar' },
            { to: '/sistema-his-hmis', icon: <Database className="h-5 w-5 mr-3" />, label: 'Sistema HIS/HMIS' },
          ],
        },
        {
          title: 'Faturamento e Financeiro',
          items: [
            { to: '/faturamento-sustiss-tuss', icon: <DollarSign className="h-5 w-5 mr-3" />, label: 'Faturamento SUSTISS/TUSS' },
            { to: '/apac-oncologia', icon: <FileText className="h-5 w-5 mr-3" />, label: 'APAC Oncologia' },
          ],
        },
        {
          title: 'Interoperabilidade',
          items: [
            { to: '/rnds-datasus', icon: <Globe className="h-5 w-5 mr-3" />, label: 'RNDS/DATASUS' },
            { to: '/conformidade-lgpd', icon: <Shield className="h-5 w-5 mr-3" />, label: 'Conformidade LGPD' },
            { to: '/prontuario-digital', icon: <FileText className="h-5 w-5 mr-3" />, label: 'Prontuário Digital' },
          ],
        },
        {
          title: 'Gestão Clínica',
          items: [
            { to: '/gestao-clinica', icon: <Stethoscope className="h-5 w-5 mr-3" />, label: 'Gestão Clínica' },
            { to: '/centro-cirurgico', icon: <Scissors className="h-5 w-5 mr-3" />, label: 'Centro Cirúrgico' },
            { to: '/uti-terapia-intensiva', icon: <Heart className="h-5 w-5 mr-3" />, label: 'UTI e Terapia Intensiva' },
            { to: '/indicadores-qualidade', icon: <CheckCircle className="h-5 w-5 mr-3" />, label: 'Indicadores de Qualidade' },
            { to: '/analises-laboratoriais', icon: <TestTube className="h-5 w-5 mr-3" />, label: 'Análises Laboratoriais' },
            { to: '/gestao-farmaceutica', icon: <Pill className="h-5 w-5 mr-3" />, label: 'Gestão Farmacêutica' },
          ],
        },
        {
          title: 'Analytics e Inteligência',
          items: [
            { to: '/relatorios-analytics', icon: <BarChart3 className="h-5 w-5 mr-3" />, label: 'Relatórios e Analytics' },
            { to: '/dashboard-financeiro', icon: <TrendingUp className="h-5 w-5 mr-3" />, label: 'Dashboard Financeiro' },
            { to: '/insights-ia', icon: <Brain className="h-5 w-5 mr-3" />, label: 'Insights de IA' },
          ],
        },
        {
          title: 'Integrações Técnicas',
          items: [
            { to: '/integracoes-tecnicas', icon: <Handshake className="h-5 w-5 mr-3" />, label: 'Integrações Técnicas' },
            { to: '/integracao-erp', icon: <Building className="h-5 w-5 mr-3" />, label: 'Integração ERP' },
          ],
        },
      ],
      aph: [
        {
          title: 'Dashboard & Monitoramento',
          items: [
            { to: '/aph-dashboard', icon: <Activity className="h-5 w-5 mr-3" />, label: 'Dashboard Tempo Real' },
            { to: '/aph-mapa-ambulancias', icon: <MapPin className="h-5 w-5 mr-3" />, label: 'Mapa GPS Ambulâncias' },
            { to: '/aph-insights-ia', icon: <Brain className="h-5 w-5 mr-3" />, label: 'Insights de IA' },
            { to: '/aph-oraculo', icon: <Zap className="h-5 w-5 mr-3" />, label: 'Oráculo APH' },
          ],
        },
        {
          title: 'Operações & Frota',
          items: [
            { to: '/aph-despacho-regulacao', icon: <Target className="h-5 w-5 mr-3" />, label: 'Despacho & Regulação' },
            { to: '/aph-heatmap-cobertura', icon: <Map className="h-5 w-5 mr-3" />, label: 'Heatmap & Cobertura' },
            { to: '/aph-frota-telemetria', icon: <Ambulance className="h-5 w-5 mr-3" />, label: 'Frota & Telemetria' },
            { to: '/aph-manutencao-preditiva', icon: <RefreshCw className="h-5 w-5 mr-3" />, label: 'Manutenção Preditiva' },
            { to: '/aph-catalogo', icon: <ClipboardList className="h-5 w-5 mr-3" />, label: 'Catálogo Operacional' },
          ],
        },
        {
          title: 'Qualidade & Gestão',
          items: [
            { to: '/aph-clinica-qualidade', icon: <Stethoscope className="h-5 w-5 mr-3" />, label: 'Clínica & Qualidade' },
            { to: '/aph-protocolos', icon: <CheckCircle className="h-5 w-5 mr-3" />, label: 'Protocolos e Auditoria' },
            { to: '/aph-educacao-continuada', icon: <GraduationCap className="h-5 w-5 mr-3" />, label: 'Educação Continuada' },
            { to: '/aph-monitoramento-cameras', icon: <Video className="h-5 w-5 mr-3" />, label: 'Monitoramento Câmeras' },
            { to: '/aph-playbooks-operacionais', icon: <ClipboardList className="h-5 w-5 mr-3" />, label: 'Playbooks Operacionais' },
          ],
        },
        {
          title: 'Financeiro & Compliance',
          items: [
            { to: '/aph-financeiro', icon: <DollarSign className="h-5 w-5 mr-3" />, label: 'Performance Financeira' },
            { to: '/aph-antiglosas', icon: <Shield className="h-5 w-5 mr-3" />, label: 'Antiglosas & Pré-Auditoria' },
            { to: '/aph-pre-auditoria', icon: <FileText className="h-5 w-5 mr-3" />, label: 'Pacotes de Evidências' },
            { to: '/aph-portal-contratante', icon: <Users className="h-5 w-5 mr-3" />, label: 'Portal do Contratante' },
            { to: '/aph-storytelling', icon: <Newspaper className="h-5 w-5 mr-3" />, label: 'Storytelling & NPS' },
            { to: '/aph-relatorios', icon: <BarChart3 className="h-5 w-5 mr-3" />, label: 'Relatórios Executivos' },
            { to: '/aph-governanca-lgpd', icon: <ShieldAlert className="h-5 w-5 mr-3" />, label: 'Governança & LGPD' },
            { to: '/aph-integracoes', icon: <Globe className="h-5 w-5 mr-3" />, label: 'Integrações & MCP' },
            { to: '/aph-compliance', icon: <Scale className="h-5 w-5 mr-3" />, label: 'Compliance & Auditoria' },
          ],
        },
      ],
      oss: [
        {
          title: 'Visão Geral OSS',
          items: [
            { to: '/oss-dashboard', icon: <LayoutDashboard className="h-5 w-5 mr-3" />, label: 'Dashboard OSS' },
            { to: '/oss-oracle-ai', icon: <BrainCircuit className="h-5 w-5 mr-3" />, label: 'Oráculo IA' },
            { to: '/oss-glosas', icon: <AlertTriangle className="h-5 w-5 mr-3" />, label: 'Glosas' },
            { to: '/oss-roi-rentabilidade', icon: <TrendingUp className="h-5 w-5 mr-3" />, label: 'ROI & Rentabilidade' },
            { to: '/oss-compliance', icon: <Shield className="h-5 w-5 mr-3" />, label: 'Compliance' },
            { to: '/oss-audesp', icon: <FileText className="h-5 w-5 mr-3" />, label: 'AUDESP' },
            { to: '/oss-metas-desempenho', icon: <Target className="h-5 w-5 mr-3" />, label: 'Metas de Desempenho' },
            { to: '/oss-predicao', icon: <Activity className="h-5 w-5 mr-3" />, label: 'Predições' },
            { to: '/oss-simulador', icon: <Calculator className="h-5 w-5 mr-3" />, label: 'Simulador' },
            { to: '/oss-controle-opme', icon: <Layers className="h-5 w-5 mr-3" />, label: 'Controle de OPME' },
            { to: '/oss-noticias', icon: <Newspaper className="h-5 w-5 mr-3" />, label: 'Notícias Nacionais' },
            { to: '/oss-noticias-clientes', icon: <Users className="h-5 w-5 mr-3" />, label: 'Notícias Clientes' },
            { to: '/oss-manual-descritivo', icon: <Info className="h-5 w-5 mr-3" />, label: 'Manual Descritivo' },
          ],
        },
      ],
      controleOpme: [
        {
          title: 'Cockpit & Infográficos',
          items: [
            { to: '/oss-controle-opme?section=overview', icon: <LayoutDashboard className="h-5 w-5 mr-3" />, label: 'Visão Geral & OKRs' },
            { to: '/oss-controle-opme?section=cockpit', icon: <BarChart3 className="h-5 w-5 mr-3" />, label: 'Cockpit de KPIs' },
            { to: '/oss-controle-opme?section=metricas', icon: <Gauge className="h-5 w-5 mr-3" />, label: 'Métricas & Fórmulas' },
            { to: '/oss-controle-opme?section=dados', icon: <Database className="h-5 w-5 mr-3" />, label: 'Modelo de Dados' },
          ],
        },
        {
          title: 'Operação & Fluxos',
          items: [
            { to: '/oss-controle-opme?section=fluxos', icon: <Workflow className="h-5 w-5 mr-3" />, label: 'Fluxos Críticos' },
            { to: '/oss-controle-opme?section=integracoes', icon: <Network className="h-5 w-5 mr-3" />, label: 'Integrações & Portais' },
            { to: '/oss-controle-opme?section=kanban', icon: <SquareStack className="h-5 w-5 mr-3" />, label: 'Kanban Operacional' },
            { to: '/oss-controle-opme?section=playbooks', icon: <BookOpen className="h-5 w-5 mr-3" />, label: 'Playbooks por Convênio' },
          ],
        },
        {
          title: 'IA & Compliance',
          items: [
            { to: '/oss-controle-opme?section=ia', icon: <Brain className="h-5 w-5 mr-3" />, label: 'IA & What-if' },
            { to: '/oss-controle-opme?section=governanca', icon: <ShieldCheck className="h-5 w-5 mr-3" />, label: 'Governança & Segurança' },
            { to: '/oss-controle-opme?section=erros', icon: <AlertTriangle className="h-5 w-5 mr-3" />, label: 'Erros & Glosas' },
            { to: '/oss-controle-opme?section=relatorios', icon: <FileText className="h-5 w-5 mr-3" />, label: 'Relatórios Essenciais' },
          ],
        },
        {
          title: 'Execução & Roadmap',
          items: [
            { to: '/oss-controle-opme?section=onboarding', icon: <ClipboardCheck className="h-5 w-5 mr-3" />, label: 'Onboarding & Dados' },
            { to: '/oss-controle-opme?section=apis', icon: <Settings className="h-5 w-5 mr-3" />, label: 'APIs & Checklists' },
            { to: '/oss-controle-opme?section=raci', icon: <Users className="h-5 w-5 mr-3" />, label: 'RACI & Testes' },
            { to: '/oss-controle-opme?section=roadmap', icon: <Clock className="h-5 w-5 mr-3" />, label: 'Roadmap 90/180/365' },
            { to: '/oss-controle-opme?section=principios', icon: <CheckCircle2 className="h-5 w-5 mr-3" />, label: 'Princípios Estratégicos' },
          ],
        },
      ],
      laboratorio: [
        {
          title: 'Hub Laboratorial',
          items: [
            { to: '/laboratorios/visao-geral', icon: <LayoutDashboard className="h-5 w-5 mr-3" />, label: 'Visão Geral' },
            { to: '/laboratorios/operacao', icon: <ClipboardList className="h-5 w-5 mr-3" />, label: 'Operações' },
            { to: '/laboratorios/resultados-laudos', icon: <FileText className="h-5 w-5 mr-3" />, label: 'Resultados e Laudos' },
            { to: '/laboratorios/integracoes', icon: <Handshake className="h-5 w-5 mr-3" />, label: 'Integrações' },
            { to: '/laboratorios/qualidade-compliance', icon: <Shield className="h-5 w-5 mr-3" />, label: 'Qualidade e Compliance' },
            { to: '/laboratorios/analytics-kpis', icon: <BarChart3 className="h-5 w-5 mr-3" />, label: 'Analytics e KPIs' },
            { to: '/laboratorios/administracao', icon: <Settings className="h-5 w-5 mr-3" />, label: 'Administração' },
          ],
        },
      ],
      medico: [
        {
          title: 'Cuidados Médicos',
          items: [
            { to: '/patients', icon: <Users className="h-5 w-5 mr-3" />, label: 'Meus Pacientes' },
            { to: '/appointments', icon: <Calendar className="h-5 w-5 mr-3" />, label: 'Agenda Médica' },
            { to: '/lab-exams', icon: <TestTube className="h-5 w-5 mr-3" />, label: 'Resultados de Exames' },
            { to: '/protocols', icon: <FileText className="h-5 w-5 mr-3" />, label: 'Protocolos Médicos' },
            { to: 'https://www.angrasaude.com.br', icon: <Video className="h-5 w-5 mr-3" />, label: 'Telemedicina' },
          ],
        },
      ],
      paciente: [
        {
          title: 'Minha Saúde',
          items: [
            { to: '/profile', icon: <User className="h-5 w-5 mr-3" />, label: 'Meu Perfil' },
            { to: '/records', icon: <FileText className="h-5 w-5 mr-3" />, label: 'Prontuários' },
            { to: '/medications', icon: <Pill className="h-5 w-5 mr-3" />, label: 'Medicamentos' },
            { to: '/appointments', icon: <Calendar className="h-5 w-5 mr-3" />, label: 'Minhas Consultas' },
            { to: '/metrics', icon: <BarChart3 className="h-5 w-5 mr-3" />, label: 'Métricas de Saúde' },
            { to: '/labexams', icon: <Microscope className="h-5 w-5 mr-3" />, label: 'Meus Exames' },
          ],
        },
      ],
    };

    if (roleSections[userRole]) {
      sections.push(...roleSections[userRole]);
    }

    // Seções do sistema para todos os usuários
    sections.push({
      title: 'Sistema',
      items: [
        { to: '/settings', icon: <Settings className="h-5 w-5 mr-3" />, label: 'Configurações' },
        { to: '/technical-details', icon: <Info className="h-5 w-5 mr-3" />, label: 'Detalhes Técnicos' },
      ],
    });

    return sections;
  };

  const menuSections = getMenuItemsByRole();

  const roleLabelMap: Record<string, string> = {
    gestor: 'navbar.roles.manager',
    hospital: 'navbar.roles.hospital',
    laboratorio: 'navbar.roles.laboratory',
    controleOpme: 'navbar.roles.controleOpme',
    medico: 'navbar.roles.doctor',
    aph: 'navbar.roles.aph',
    paciente: 'navbar.roles.patient',
    oss: 'navbar.roles.oss',
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-20 bg-black/50 md:hidden" onClick={toggleSidebar} />
      )}

      <aside className="fixed inset-y-0 left-0 z-30 w-64 flex flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground">
        <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-6">
          <Link to="/dashboard" className="flex items-center gap-2">
            <img src="/favicon.ico" alt="Farol" className="h-8 w-8" />
            <span className="text-lg font-semibold">Sistema Farol</span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden h-8 w-8"
            onClick={toggleSidebar}
          >
            ✕
          </Button>
        </div>

        {userRole && (
          <div className="px-6 py-3 border-b border-sidebar-border bg-sidebar-accent/10">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full" />
              <span className="text-sm font-medium text-sidebar-accent-foreground">
                {t(roleLabelMap[userRole] ?? 'navbar.roles.visitor')}
              </span>
            </div>
          </div>
        )}

        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          {menuSections.map((section, index) => (
            <div key={`${section.title}-${index}`}>
              <h3 className="px-3 text-xs font-semibold uppercase text-sidebar-accent-foreground tracking-wider mb-2">
                {section.title}
              </h3>
              {section.items.map((item) => (
                <SidebarItem
                  key={`${section.title}-${item.label}-${item.to}`}
                  {...item}
                  currentPath={currentPath}
                  onClick={isOpen ? toggleSidebar : undefined}
                />
              ))}
            </div>
          ))}
        </nav>

        <div className="mt-auto border-t border-sidebar-border p-4 space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-start text-sidebar-accent-foreground hover:bg-sidebar-accent/20"
            onClick={() => setIsCustomizationOpen(true)}
          >
            <Settings className="h-4 w-4 mr-2" />
            Personalizar
          </Button>
          <p className="text-center text-xs text-sidebar-accent-foreground">
            © {new Date().getFullYear()} Sistema Farol
          </p>
        </div>
      </aside>

      <CustomizationPanel
        isOpen={isCustomizationOpen}
        onClose={() => setIsCustomizationOpen(false)}
      />
    </>
  );
};

export default Sidebar;
