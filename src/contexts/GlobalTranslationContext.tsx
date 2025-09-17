import React, { createContext, useContext, ReactNode } from 'react';
import { useSimpleTranslation } from '@/hooks/useSimpleTranslation';

type TranslationContextType = {
  t: (key: string) => string;
  language: 'pt' | 'en' | 'es' | 'fr';
  changeLanguage: (lang: 'pt' | 'en' | 'es' | 'fr') => void;
};

const GlobalTranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const GlobalTranslationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { t, language, changeLanguage } = useSimpleTranslation();
  
  return (
    <GlobalTranslationContext.Provider value={{ t, language, changeLanguage }}>
      {children}
    </GlobalTranslationContext.Provider>
  );
};

export const useGlobalTranslation = () => {
  const context = useContext(GlobalTranslationContext);
  if (context === undefined) {
    throw new Error('useGlobalTranslation must be used within a GlobalTranslationProvider');
  }
  return context;
};
