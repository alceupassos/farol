import { useState, useEffect } from 'react';
import { getCurrentLanguage, setLanguage, t, subscribe, Language } from '@/utils/translations';

export const useTranslation = () => {
  const [language, setCurrentLanguage] = useState<Language>(getCurrentLanguage());

  useEffect(() => {
    // Subscrever mudanças de idioma
    const unsubscribe = subscribe(() => {
      setCurrentLanguage(getCurrentLanguage());
    });

    return unsubscribe;
  }, []);

  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
  };

  return {
    t,
    language,
    changeLanguage
  };
};
