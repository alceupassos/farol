import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';

// Exemplo de como usar traduções em qualquer componente
export const TranslatedExample: React.FC = () => {
  const { t, language, changeLanguage } = useTranslation();

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="mb-4 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">🌐 Sistema de Tradução Ativo</h3>
        <p className="text-blue-600 mb-2">Idioma atual: <strong>{language.toUpperCase()}</strong></p>
        <div className="flex space-x-2">
          <button 
            onClick={() => changeLanguage('pt')} 
            className={`px-3 py-1 rounded ${language === 'pt' ? 'bg-blue-600 text-white' : 'bg-blue-200 text-blue-800'}`}
          >
            🇧🇷 PT
          </button>
          <button 
            onClick={() => changeLanguage('en')} 
            className={`px-3 py-1 rounded ${language === 'en' ? 'bg-blue-600 text-white' : 'bg-blue-200 text-blue-800'}`}
          >
            🇺🇸 EN
          </button>
          <button 
            onClick={() => changeLanguage('es')} 
            className={`px-3 py-1 rounded ${language === 'es' ? 'bg-blue-600 text-white' : 'bg-blue-200 text-blue-800'}`}
          >
            🇪🇸 ES
          </button>
          <button 
            onClick={() => changeLanguage('fr')} 
            className={`px-3 py-1 rounded ${language === 'fr' ? 'bg-blue-600 text-white' : 'bg-blue-200 text-blue-800'}`}
          >
            🇫🇷 FR
          </button>
        </div>
      </div>
      
      <h2 className="text-2xl font-bold mb-4">{t('dashboard.title')}</h2>
      <p className="mb-4">{t('dashboard.overview')}</p>
      
      <div className="space-y-2 mb-4">
        <h3 className="text-lg font-semibold">{t('dashboard.quickActions')}</h3>
        <Button className="mr-2">{t('common.save')}</Button>
        <Button variant="outline" className="mr-2">{t('common.edit')}</Button>
        <Button variant="destructive">{t('common.delete')}</Button>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">{t('nav.dashboard')}</h3>
        <ul className="space-y-1">
          <li>• {t('nav.profile')}</li>
          <li>• {t('nav.records')}</li>
          <li>• {t('nav.medications')}</li>
          <li>• {t('nav.appointments')}</li>
        </ul>
      </div>
    </div>
  );
};

export default TranslatedExample;
