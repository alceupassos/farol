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
  Database
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
}

const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
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
          { to: "/resources", icon: <ClipboardList className="h-5 w-5 mr-3" />, label: "Gestão de Recursos" }
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
          "fixed inset-y-0 left-0 z-40 flex w-64 transform flex-col border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950 transition-transform duration-300 ease-in-out md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-gray-200 px-6 dark:border-gray-800">
          <Link to="/dashboard" className="flex items-center gap-2">
            <img src="/favicon.ico" alt="Logo" className="h-8 w-8" />
            <span className="text-lg font-semibold">Vida Segura</span>
          </Link>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          {menuSections.map((section, index) => (
            <div key={section.title}>
              <h3 className={`px-3 text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 tracking-wider mb-2 ${index > 0 ? 'pt-4' : ''}`}>
                {section.title}
              </h3>
              {section.items.map(item => (
                <SidebarItem 
                  key={item.label} 
                  {...item} 
                  currentPath={currentPath} 
                  onClick={isOpen && !item.to.startsWith('http') ? toggleSidebar : (item.to.startsWith('http') && isOpen ? toggleSidebar : undefined)} 
                />
              ))}
            </div>
          ))}
        </nav>

        <div className="mt-auto border-t border-gray-200 p-4 dark:border-gray-800">
          <p className="text-center text-xs text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Vida Segura.
            <br />
            Todos os direitos reservados.
          </p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
