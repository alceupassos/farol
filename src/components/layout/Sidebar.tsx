import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  User, 
  FileText, 
  Pill, 
  Calendar, 
  BarChart2, 
  Microscope, 
  Smile, 
  Dna, 
  KeyRound, 
  ShieldAlert, 
  Settings, 
  Info, 
  QrCode, 
  Video,
  Users,
  Building,
  Stethoscope,
  TrendingUp,
  Zap,
  MapPin,
  TestTube,
  ClipboardList,
  Brain,
  Shield,
  Database,
  Pin,
  PinOff,
  DollarSign,
  Target,
  Calculator,
  Scale,
  GraduationCap,
  RefreshCw,
  BarChart3,
  Globe,
  Handshake,
  Map
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

interface SidebarItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  currentPath: string;
  onClick?: () => void;
}

interface SidebarItemCollapsibleProps extends SidebarItemProps {
  isCollapsed: boolean;
}

const SidebarItemCollapsible = ({ to, icon, label, currentPath, onClick, isCollapsed }: SidebarItemCollapsibleProps) => {
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
            "w-full text-base py-3 h-auto",
            isCollapsed ? "justify-center px-0" : "justify-start"
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
          "w-full text-base py-3 h-auto",
          isCollapsed ? "justify-center px-0" : "justify-start"
        )}
        title={isCollapsed ? label : undefined}
      >
        {icon}
        {!isCollapsed && label}
      </Button>
    </Link>
  );
};

const SidebarItem = ({ to, icon, label, currentPath, onClick }: SidebarItemProps) => {
  const isExternal = to.startsWith('http');

  if (isExternal) {
    return (
      <a
        href={to}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick} // Permite que o onClick (ex: fechar sidebar no mobile) ainda funcione
        className="block" // Garante que o link <a> ocupe o espaço do botão
      >
        <Button
          variant={'ghost'} // Links externos geralmente não têm estado "ativo" da mesma forma
          className="w-full justify-start text-base py-3 h-auto"
        >
          {icon}
          {label}
        </Button>
      </a>
    );
  }

  // Link interno
  return (
    <Link to={to} onClick={onClick}>
      <Button
        variant={currentPath === to ? 'secondary' : 'ghost'}
        className="w-full justify-start text-base py-3 h-auto"
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

const Sidebar = ({ isOpen, toggleSidebar, isCollapsed, toggleCollapsed }: SidebarProps) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { userRole } = useAuth();

  const getMenuItemsByRole = () => {
    const menuSections = [];

    // Dashboard comum para todos
    menuSections.push({
      title: "Dashboard",
      items: [
        { to: "/dashboard", icon: <LayoutDashboard className="h-5 w-5 mr-3" />, label: "Visão Geral" }
      ]
    });

    if (userRole === 'gestor') {
      menuSections.push({
        title: "Gestão Pública",
        items: [
          { to: "/executive-dashboard", icon: <TrendingUp className="h-5 w-5 mr-3" />, label: "Dashboard Executivo" },
          { to: "/operational-dashboard", icon: <Zap className="h-5 w-5 mr-3" />, label: "Dashboard Operacional" },
          { to: "/population", icon: <Users className="h-5 w-5 mr-3" />, label: "Análise Populacional" },
          { to: "/epidemiology", icon: <MapPin className="h-5 w-5 mr-3" />, label: "Mapa Epidemiológico" },
          { to: "/epidemic-alerts", icon: <ShieldAlert className="h-5 w-5 mr-3" />, label: "Alertas Epidemiológicos" },
          { to: "/resources", icon: <ClipboardList className="h-5 w-5 mr-3" />, label: "Gestão de Recursos" }
        ]
      });
      
      menuSections.push({
        title: "Financiamento e Orçamento",
        items: [
          { to: "/monitoramento-aps", icon: <BarChart3 className="h-5 w-5 mr-3" />, label: "Monitoramento APS" },
          { to: "/gestao-orcamentaria", icon: <DollarSign className="h-5 w-5 mr-3" />, label: "Gestão Orçamentária" },
          { to: "/simulador-ied", icon: <Calculator className="h-5 w-5 mr-3" />, label: "Simulador IED" },
          { to: "/controle-judicializacao", icon: <Scale className="h-5 w-5 mr-3" />, label: "Controle Judicialização" }
        ]
      });
      
      menuSections.push({
        title: "Capacitação e Gestão",
        items: [
          { to: "/capacitacao-gestores", icon: <GraduationCap className="h-5 w-5 mr-3" />, label: "Programa Gestores SUS" },
          { to: "/transicao-gestao", icon: <RefreshCw className="h-5 w-5 mr-3" />, label: "Transição de Gestão" },
          { to: "/indicadores-desempenho", icon: <Target className="h-5 w-5 mr-3" />, label: "Indicadores APS" },
          { to: "/governanca-dados", icon: <Database className="h-5 w-5 mr-3" />, label: "Governança de Dados" }
        ]
      });
      
      menuSections.push({
        title: "Regionalização",
        items: [
          { to: "/comissoes-cir", icon: <Globe className="h-5 w-5 mr-3" />, label: "Comissões CIR" },
          { to: "/pactuacao-regional", icon: <Handshake className="h-5 w-5 mr-3" />, label: "Pactuação Regional" },
          { to: "/territorializacao", icon: <Map className="h-5 w-5 mr-3" />, label: "Territorialização" }
        ]
      });
      
      menuSections.push({
        title: "Analytics",
        items: [
          { to: "/ai-analytics", icon: <Brain className="h-5 w-5 mr-3" />, label: "AI Analytics" },
          { to: "/security-dashboard", icon: <Shield className="h-5 w-5 mr-3" />, label: "Segurança" },
          { to: "/integrations-dashboard", icon: <Database className="h-5 w-5 mr-3" />, label: "Integrações" }
        ]
      });
    }

    if (userRole === 'medico') {
      menuSections.push({
        title: "Assistência Médica",
        items: [
          { to: "/patients", icon: <Users className="h-5 w-5 mr-3" />, label: "Meus Pacientes" },
          { to: "/appointments", icon: <Calendar className="h-5 w-5 mr-3" />, label: "Agenda Médica" },
          { to: "/lab-exams", icon: <TestTube className="h-5 w-5 mr-3" />, label: "Exames e Resultados" },
          { to: "/protocols", icon: <FileText className="h-5 w-5 mr-3" />, label: "Protocolos Médicos" },
          { to: "https://www.angrasaude.com.br", icon: <Video className="h-5 w-5 mr-3" />, label: "Telemedicina" }
        ]
      });
      menuSections.push({
        title: "Mapas e Localização",
        items: [
          { to: "/epidemiology", icon: <MapPin className="h-5 w-5 mr-3" />, label: "Mapa Epidemiológico" },
          { to: "/epidemic-alerts", icon: <ShieldAlert className="h-5 w-5 mr-3" />, label: "Alertas Epidemiológicos" }
        ]
      });
      menuSections.push({
        title: "Analytics",
        items: [
          { to: "/ai-analytics", icon: <Brain className="h-5 w-5 mr-3" />, label: "AI Analytics" },
          { to: "/security-dashboard", icon: <Shield className="h-5 w-5 mr-3" />, label: "Segurança" }
        ]
      });
    }

    if (userRole === 'paciente') {
      menuSections.push({
        title: "Minha Saúde",
        items: [
          { to: "/profile", icon: <User className="h-5 w-5 mr-3" />, label: "Meu Perfil" },
          { to: "/records", icon: <FileText className="h-5 w-5 mr-3" />, label: "Registros Médicos" },
          { to: "/medications", icon: <Pill className="h-5 w-5 mr-3" />, label: "Medicamentos" },
          { to: "/appointments", icon: <Calendar className="h-5 w-5 mr-3" />, label: "Minhas Consultas" },
          { to: "/metrics", icon: <BarChart2 className="h-5 w-5 mr-3" />, label: "Métricas de Saúde" },
          { to: "/labexams", icon: <Microscope className="h-5 w-5 mr-3" />, label: "Meus Exames" },
          { to: "/quality-of-life", icon: <Smile className="h-5 w-5 mr-3" />, label: "Qualidade de Vida" },
          { to: "/genetic-data", icon: <Dna className="h-5 w-5 mr-3" />, label: "Dados Genéticos" }
        ]
      });
      menuSections.push({
        title: "Mapas e Localização",
        items: [
          { to: "/epidemiology", icon: <MapPin className="h-5 w-5 mr-3" />, label: "Consultar Mapas" },
          { to: "/epidemic-alerts", icon: <ShieldAlert className="h-5 w-5 mr-3" />, label: "Alertas de Saúde" }
        ]
      });
      menuSections.push({
        title: "Emergência e Acesso",
        items: [
          { to: "/emergency", icon: <ShieldAlert className="h-5 w-5 mr-3" />, label: "QR Emergência" },
          { to: "/manage-access", icon: <KeyRound className="h-5 w-5 mr-3" />, label: "Gerenciar Acesso" },
          { to: "/qr-ana-ativo", icon: <QrCode className="h-5 w-5 mr-3" />, label: "QR ANA+ATIVO" }
        ]
      });
    }

    // Sistema para todos
    menuSections.push({
      title: "Sistema",
      items: [
        { to: "/settings", icon: <Settings className="h-5 w-5 mr-3" />, label: "Configurações" },
        { to: "/technical-details", icon: <Info className="h-5 w-5 mr-3" />, label: "Detalhes Técnicos" }
      ]
    });

    return menuSections;
  };

  const menuSections = getMenuItemsByRole();

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex transform flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-all duration-300 ease-in-out md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
          isCollapsed ? "w-16" : "w-64"
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-3">
          {!isCollapsed ? (
            <Link to="/dashboard" className="flex items-center gap-2">
              <img src="/favicon.ico" alt="Logo" className="h-8 w-8" />
              <span className="text-lg font-semibold text-sidebar-foreground">Vida Segura</span>
            </Link>
          ) : (
            <Link to="/dashboard" className="flex items-center justify-center w-full">
              <img src="/favicon.ico" alt="Logo" className="h-8 w-8" />
            </Link>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleCollapsed}
            className="p-1 h-8 w-8 text-sidebar-accent-foreground hover:bg-sidebar-accent/20"
          >
            {isCollapsed ? <Pin className="h-4 w-4" /> : <PinOff className="h-4 w-4" />}
          </Button>
        </div>

        {/* Indicador de role atual */}
        {userRole && !isCollapsed && (
          <div className="px-6 py-3 border-b border-sidebar-border bg-sidebar-accent/10">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-sm font-medium text-sidebar-accent-foreground">
                {userRole === 'gestor' && 'Gestor Municipal'}
                {userRole === 'medico' && 'Profissional de Saúde'}  
                {userRole === 'paciente' && 'Paciente'}
              </span>
            </div>
          </div>
        )}

        <nav className="flex-1 space-y-1 overflow-y-auto p-2">
          {menuSections.map((section, index) => (
            <div key={section.title}>
              {!isCollapsed && (
                <h3 className={`px-3 text-xs font-semibold uppercase text-sidebar-accent-foreground tracking-wider mb-2 ${index > 0 ? 'pt-4' : ''}`}>
                  {section.title}
                </h3>
              )}
              {section.items.map(item => (
                <SidebarItemCollapsible
                  key={item.label} 
                  {...item} 
                  currentPath={currentPath}
                  isCollapsed={isCollapsed}
                  onClick={isOpen && !item.to.startsWith('http') ? toggleSidebar : (item.to.startsWith('http') && isOpen ? toggleSidebar : undefined)} 
                />
              ))}
            </div>
          ))}
        </nav>

        {!isCollapsed && (
          <div className="mt-auto border-t border-sidebar-border p-4">
            <p className="text-center text-xs text-sidebar-accent-foreground">
              © {new Date().getFullYear()} Vida Segura.
              <br />
              Todos os direitos reservados.
            </p>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;
