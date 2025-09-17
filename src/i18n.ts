import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Static imports so Vite bundles resources
import pt from './locales/pt/translation.json';
import en from './locales/en/translation.json';
import es from './locales/es/translation.json';
import fr from './locales/fr/translation.json';

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'pt',
    supportedLngs: ['pt', 'en', 'es', 'fr'],
    resources: {
      pt: { translation: pt },
      en: { translation: en },
      es: { translation: es },
      fr: { translation: fr },
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag', 'cookie'],
      caches: ['localStorage'],
    },
    interpolation: { escapeValue: false },
    debug: false,
  });

export default i18n;
