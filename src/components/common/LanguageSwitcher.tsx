import { Globe } from 'lucide-react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const supportedLanguages: Array<{ code: 'pt' | 'en' | 'es' | 'fr'; flag: string }> = [
  { code: 'pt', flag: '🇧🇷' },
  { code: 'en', flag: '🇺🇸' },
  { code: 'es', flag: '🇪🇸' },
  { code: 'fr', flag: '🇫🇷' },
];

export function LanguageSwitcher() {
  const { t, i18n } = useTranslation();
  const currentLang = useMemo(() => (i18n.language || 'pt').split('-')[0] as 'pt' | 'en' | 'es' | 'fr', [i18n.language]);

  const handleLanguageChange = (code: 'pt' | 'en' | 'es' | 'fr') => {
    void i18n.changeLanguage(code);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9"
          title={t('common.selectLanguage')}
        >
          <Globe className="h-4 w-4" />
          <span className="sr-only">{t('common.selectLanguage')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {supportedLanguages.map(({ code, flag }) => (
          <DropdownMenuItem
            key={code}
            onClick={() => handleLanguageChange(code)}
            className={currentLang === code ? 'bg-accent' : ''}
          >
            <span className="mr-2" role="img" aria-hidden>
              {flag}
            </span>
            {t(`languages.${code}`)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
