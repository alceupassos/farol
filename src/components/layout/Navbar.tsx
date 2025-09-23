import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Moon, Search, Sun, User, Video } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import AccessDropdown from './AccessDropdown';
import UserSpecificAlerts from '@/components/epidemic/UserSpecificAlerts';
import TelemedicineModal from '@/components/telemedicine/TelemedicineModal';
import saudePublicaLogo from '@/assets/saude-publica-logo.png';
import piracicabaLogo from '@/assets/piracicaba-logo.svg';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar = ({ toggleSidebar }: NavbarProps) => {
  const [isDark, setIsDark] = useState(() =>
    typeof document !== 'undefined' && document.documentElement.classList.contains('dark')
  );
  const navigate = useNavigate();
  const { user, userRole, signOut } = useAuth();
  const { t, i18n } = useTranslation();
  const currentLang = (i18n.language || 'pt').split('-')[0] as 'pt' | 'en' | 'es' | 'fr';

  const languages = useMemo(
    () => [
      { code: 'pt' as const, flag: '🇧🇷' },
      { code: 'en' as const, flag: '🇺🇸' },
      { code: 'es' as const, flag: '🇪🇸' },
      { code: 'fr' as const, flag: '🇫🇷' },
    ],
    []
  );

  const handleLanguageChange = (lang: 'pt' | 'en' | 'es' | 'fr') => {
    i18n.changeLanguage(lang);
  };

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', next);
    }
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      setIsDark(document.documentElement.classList.contains('dark'));
    }
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success(t('navbar.logoutSuccess'));
    } catch (error) {
      console.error('Navbar sign out error:', error);
    }
  };

  const roleLabel = userRole ? t(`navbar.roles.${userRole}` as const) : t('navbar.roles.visitor');

  const showPrefeituraBranding = userRole === 'gestor';

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="rounded-full p-2 text-slate-300 transition-colors hover:bg-slate-800"
            onClick={toggleSidebar}
            title={t('navbar.openMenu')}
          >
            <Menu className="h-5 w-5" />
          </button>
          <Link to="/" className="flex items-center gap-2 text-slate-100">
            <img
              src={showPrefeituraBranding ? piracicabaLogo : saudePublicaLogo}
              alt={showPrefeituraBranding ? 'Prefeitura de Piracicaba' : 'FAROL Angra Saúde Pública'}
              className="h-9 w-auto"
            />
            <span className="hidden text-sm font-semibold uppercase tracking-[0.2em] sm:block">
              {showPrefeituraBranding ? 'Prefeitura de Piracicaba' : 'FAROL Angra Saúde Pública'}
            </span>
          </Link>
        </div>

        <div className="hidden flex-1 items-center justify-center px-4 md:flex">
          <div className="relative w-full max-w-md">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder={t('nav.search')}
              className="w-full rounded-full border border-white/5 bg-slate-900/70 py-2 pl-11 pr-4 text-sm text-slate-100 backdrop-blur placeholder:text-slate-500 focus:border-emerald-400/60 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-1 lg:flex">
            {languages.map(({ code, flag }) => (
              <button
                key={code}
                onClick={() => handleLanguageChange(code)}
                className={cn(
                  'rounded-full px-2 py-1 text-lg transition-colors hover:bg-slate-800',
                  currentLang === code && 'bg-slate-800 ring-2 ring-emerald-500'
                )}
                title={t(`languages.${code}`)}
              >
                {flag}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-full p-2 text-slate-300 transition-colors hover:bg-slate-800"
            aria-label={isDark ? 'Ativar tema claro' : 'Ativar tema escuro'}
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          {userRole === 'medico' && (
            <TelemedicineModal>
              <Button
                size="sm"
                className="hidden items-center gap-2 bg-gradient-to-r from-emerald-400 to-cyan-500 text-sm font-semibold text-emerald-950 shadow-lg hover:from-emerald-300 hover:to-cyan-400 md:flex"
              >
                <Video className="h-4 w-4" />
                {t('navbar.telemedicineButton')}
              </Button>
            </TelemedicineModal>
          )}

          <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-slate-100 md:flex">
            <User className="h-4 w-4 text-emerald-300" />
            <span className="font-medium">{roleLabel}</span>
          </div>

          {user ? (
            <Button
              variant="outline"
              size="sm"
              className="border-emerald-500/40 text-slate-100 hover:bg-emerald-500/10"
              onClick={handleSignOut}
            >
              {t('nav.logout')}
            </Button>
          ) : (
            <AccessDropdown />
          )}

          <UserSpecificAlerts />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
