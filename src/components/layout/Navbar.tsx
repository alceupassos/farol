import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Bell,
  Menu,
  Moon,
  Search,
  Settings,
  Sun,
  LogOut,
  User
} from 'lucide-react';
import { cn } from '@/lib/utils';
import LanguageSwitcher from '@/components/language/LanguageSwitcher';
import AccessDropdown from './AccessDropdown';
import ProfileAccessSwitch from './ProfileAccessSwitch';
import UserSpecificAlerts from '@/components/epidemic/UserSpecificAlerts';
import saudePublicaLogo from '@/assets/saude-publica-logo.png';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar = ({ toggleSidebar }: NavbarProps) => {
  const [isDark, setIsDark] = useState(document.documentElement.classList.contains('dark'));
  const { user, userRole, signOut } = useAuth();
  
  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    if (newIsDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Ensure theme is set on mount based on existing class
  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  const getRoleDisplayName = (role: string | null) => {
    const roleMap = {
      'gestor': 'Gestor Municipal',
      'medico': 'Profissional de Saúde',
      'paciente': 'Paciente'
    };
    return role ? roleMap[role as keyof typeof roleMap] || role : 'Visitante';
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="fixed w-full h-16 z-50 bg-gray-900 border-b border-gray-800 px-4">
      <div className="flex h-full items-center justify-between">
        <div className="flex items-center">
          <button
            type="button"
            className="p-2 rounded-md text-gray-400 hover:bg-gray-800 mr-2"
            onClick={toggleSidebar}
          >
            <Menu size={20} />
            <span className="sr-only">Abrir menu</span>
          </button>
          
          <Link to="/" className="flex items-center">
            <img 
              src={saudePublicaLogo} 
              alt="Saúde Pública Logo" 
              className="h-10 w-auto"
            />
          </Link>
        </div>

        <div className="flex-1 max-w-xl mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -mt-2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Pesquisar..."
              className="w-full bg-gray-800 text-gray-100 pl-10 pr-4 py-2 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <LanguageSwitcher />
          
          {/* Show current role */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2 px-3 py-2 bg-gray-800 rounded-lg">
              <User size={16} className="text-gray-400" />
              <span className="text-sm text-gray-300">{getRoleDisplayName(userRole)}</span>
            </div>
            <AccessDropdown />
          </div>
          
          <UserSpecificAlerts />
          
          <ProfileAccessSwitch />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
