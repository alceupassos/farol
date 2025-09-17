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
  User,
  Video
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import AccessDropdown from './AccessDropdown';
import UserSpecificAlerts from '@/components/epidemic/UserSpecificAlerts';
import TelemedicineModal from '@/components/telemedicine/TelemedicineModal';
import saudePublicaLogo from '@/assets/saude-publica-logo.png';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar = ({ toggleSidebar }: NavbarProps) => {
  const [isDark, setIsDark] = useState(document.documentElement.classList.contains('dark'));
  const { user, userRole, signOut } = useAuth();
  const { t, i18n } = useTranslation();
  const currentLang = (i18n.language || 'pt').split('-')[0] as 'pt' | 'en' | 'es' | 'fr';
  
  const handleLanguageChange = (lang: 'pt' | 'en' | 'es' | 'fr') => {
    i18n.changeLanguage(lang);
  };
  
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
              placeholder={t('nav.search')}
              className="w-full bg-gray-800 text-gray-100 pl-10 pr-4 py-2 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Language Test */}
          <div className="text-white text-sm mr-2">
            {t('telemedicine.welcome')}
          </div>
          
          {/* Language Flags */}
          <div className="flex items-center space-x-1">
            <button
              onClick={() => handleLanguageChange('pt')}
              className={`p-2 text-lg rounded hover:bg-gray-700 transition-colors cursor-pointer ${
                currentLang === 'pt' ? 'bg-gray-700 ring-2 ring-blue-500' : ''
              }`}
              title="Português"
            >
              🇧🇷
            </button>
            <button
              onClick={() => handleLanguageChange('en')}
              className={`p-2 text-lg rounded hover:bg-gray-700 transition-colors cursor-pointer ${
                currentLang === 'en' ? 'bg-gray-700 ring-2 ring-blue-500' : ''
              }`}
              title="English"
            >
              🇺🇸
            </button>
            <button
              onClick={() => handleLanguageChange('es')}
              className={`p-2 text-lg rounded hover:bg-gray-700 transition-colors cursor-pointer ${
                currentLang === 'es' ? 'bg-gray-700 ring-2 ring-blue-500' : ''
              }`}
              title="Español"
            >
              🇪🇸
            </button>
            <button
              onClick={() => handleLanguageChange('fr')}
              className={`p-2 text-lg rounded hover:bg-gray-700 transition-colors cursor-pointer ${
                currentLang === 'fr' ? 'bg-gray-700 ring-2 ring-blue-500' : ''
              }`}
              title="Français"
            >
              🇫🇷
            </button>
          </div>
          
          {/* Telemedicine button for doctors */}
          {userRole === 'medico' && (
            <TelemedicineModal>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
              >
                <Video size={16} className="animate-pulse" />
                <span className="hidden sm:inline font-semibold">Telemedicina</span>
                <div className="hidden sm:block w-2 h-2 bg-green-400 rounded-full animate-pulse ml-1" />
              </Button>
            </TelemedicineModal>
          )}
          
          {/* Show current role */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2 px-3 py-2 bg-gray-800 rounded-lg">
              <User size={16} className="text-gray-400" />
              <span className="text-sm text-gray-300">{getRoleDisplayName(userRole)}</span>
            </div>
            <AccessDropdown />
          </div>
          
          <UserSpecificAlerts />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
