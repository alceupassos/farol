
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Flag } from 'lucide-react';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  
  return (
    <div className="flex space-x-2 items-center">
      <Button
        variant="ghost" 
        size="icon"
        onClick={() => setLanguage('pt')}
        className={`p-0 h-8 w-8 rounded-full overflow-hidden ${language === 'pt' ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''}`}
      >
        <span className="sr-only">Português (Brasil)</span>
        <span className="text-xl">🇧🇷</span>
      </Button>
      
      <Button
        variant="ghost" 
        size="icon"
        onClick={() => setLanguage('en')}
        className={`p-0 h-8 w-8 rounded-full overflow-hidden ${language === 'en' ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''}`}
      >
        <span className="sr-only">English (USA)</span>
        <span className="text-xl">🇺🇸</span>
      </Button>
      
      <Button
        variant="ghost" 
        size="icon"
        onClick={() => setLanguage('fr')}
        className={`p-0 h-8 w-8 rounded-full overflow-hidden ${language === 'fr' ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''}`}
      >
        <span className="sr-only">Français</span>
        <span className="text-xl">🇫🇷</span>
      </Button>
      
      <Button
        variant="ghost" 
        size="icon"
        onClick={() => setLanguage('es')}
        className={`p-0 h-8 w-8 rounded-full overflow-hidden ${language === 'es' ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''}`}
      >
        <span className="sr-only">Español</span>
        <span className="text-xl">🇪🇸</span>
      </Button>
    </div>
  );
};

export default LanguageSwitcher;
