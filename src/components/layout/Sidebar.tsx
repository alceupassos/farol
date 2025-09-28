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
  MapPin, Eye, Ear, Thermometer, Bone
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { ossSections } from './SidebarOSS';
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
  const currentPath = location.pathname;
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
            { to: '/oraculo-ia', icon: <BrainCircuit className="h-5 w-5 mr-3" />, label: 'Oráculo IA' },
            { to: '/noticias-saude-piracicaba', icon: <Newspaper className="h-5 w-5 mr-3" />, label: 'Notícias Saúde' },
          ],
        },
      ],
      hospital: [
        {
          title: 'Dashboard',
          items: [
            { to: '/dashboard', icon: <LayoutDashboard className="h-5 w-5 mr-3" />, label: 'Visão Geral Hospital' },
            { to: '/oraculo-ia', icon: <BrainCircuit className="h-5 w-5 mr-3" />, label: 'Oráculo IA' },
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
            { to: '/oss-controle-glosa-opme', icon: <Layers className="h-5 w-5 mr-3" />, label: 'Controle Glosa OPME' },
            { to: '/oss-noticias', icon: <Newspaper className="h-5 w-5 mr-3" />, label: 'Notícias Nacionais' },
            { to: '/oss-noticias-clientes', icon: <Users className="h-5 w-5 mr-3" />, label: 'Notícias Clientes' },
            { to: '/oss-manual-descritivo', icon: <Info className="h-5 w-5 mr-3" />, label: 'Manual Descritivo' },
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
    medico: 'navbar.roles.doctor',
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
