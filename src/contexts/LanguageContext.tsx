import React, { createContext, useState, useContext, ReactNode } from 'react';

type Language = 'pt' | 'en' | 'fr' | 'es';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const translations = {
  pt: {
    // Onboarding
    'welcome.title': 'Bem-vindo ao MedChain',
    'welcome.subtitle': 'Suas informações médicas seguras em blockchain',
    'auth.login': 'Entrar',
    'auth.register': 'Cadastrar',
    'auth.email': 'E-mail',
    'auth.password': 'Senha',
    'auth.name': 'Nome completo',
    
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.profile': 'Perfil Médico',
    'nav.records': 'Prontuários',
    'nav.medications': 'Medicamentos',
    'nav.appointments': 'Consultas',
    'nav.metrics': 'Métricas de Saúde',
    'nav.access': 'Controle de Acesso',
    'nav.emergency': 'QR de Emergência',
    'nav.labexams': 'Exames Laboratoriais',
    'nav.help': 'Central de Ajuda',
    'nav.support': 'Suporte',
    'nav.manage': 'Gerenciar Acesso',
    'nav.logout': 'Sair',
    
    // Emergency QR
    'emergency.title': 'QR Code de Emergência',
    'emergency.description': 'O QR Code de emergência permite que profissionais de saúde acessem suas informações médicas essenciais em caso de emergência.',
    'emergency.generate': 'Gerar QR Code de Emergência',
    'emergency.access_code': 'Código de Acesso Emergencial',
    'emergency.download': 'Baixar',
    'emergency.share': 'Compartilhar',
    'emergency.info_title': 'Informações incluídas no QR Code:',
    'emergency.info.name': 'Nome completo e data de nascimento',
    'emergency.info.contact': 'Contato de emergência',
    'emergency.info.blood': 'Tipo sanguíneo',
    'emergency.info.allergies': 'Alergias e condições críticas',
    'emergency.info.medications': 'Medicamentos atuais',
  },
  en: {
    // Onboarding
    'welcome.title': 'Welcome to MedChain',
    'welcome.subtitle': 'Your medical information secure on blockchain',
    'auth.login': 'Login',
    'auth.register': 'Register',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.name': 'Full name',
    
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.profile': 'Medical Profile',
    'nav.records': 'Medical Records',
    'nav.medications': 'Medications',
    'nav.appointments': 'Appointments',
    'nav.metrics': 'Health Metrics',
    'nav.access': 'Access Control',
    'nav.emergency': 'Emergency QR',
    'nav.labexams': 'Lab Exams',
    'nav.help': 'Help Center',
    'nav.support': 'Support',
    'nav.manage': 'Manage Access',
    'nav.logout': 'Logout',
    
    // Emergency QR
    'emergency.title': 'Emergency QR Code',
    'emergency.description': 'The emergency QR code allows healthcare professionals to access your essential medical information in case of emergency.',
    'emergency.generate': 'Generate Emergency QR Code',
    'emergency.access_code': 'Emergency Access Code',
    'emergency.download': 'Download',
    'emergency.share': 'Share',
    'emergency.info_title': 'Information included in the QR Code:',
    'emergency.info.name': 'Full name and date of birth',
    'emergency.info.contact': 'Emergency contact',
    'emergency.info.blood': 'Blood type',
    'emergency.info.allergies': 'Allergies and critical conditions',
    'emergency.info.medications': 'Current medications',
  },
  fr: {
    // Onboarding
    'welcome.title': 'Bienvenue à MedChain',
    'welcome.subtitle': 'Vos informations médicales sécurisées sur blockchain',
    'auth.login': 'Connexion',
    'auth.register': 'S\'inscrire',
    'auth.email': 'E-mail',
    'auth.password': 'Mot de passe',
    'auth.name': 'Nom complet',
    
    // Navigation
    'nav.dashboard': 'Tableau de bord',
    'nav.profile': 'Profil médical',
    'nav.records': 'Dossiers médicaux',
    'nav.medications': 'Médicaments',
    'nav.appointments': 'Rendez-vous',
    'nav.metrics': 'Métriques de santé',
    'nav.access': 'Contrôle d\'accès',
    'nav.emergency': 'QR d\'urgence',
    'nav.labexams': 'Examens de laboratoire',
    'nav.help': 'Centre d\'aide',
    'nav.support': 'Support',
    'nav.manage': 'Gérer l\'accès',
    'nav.logout': 'Déconnexion',
    
    // Emergency QR
    'emergency.title': 'Code QR d\'urgence',
    'emergency.description': 'Le code QR d\'urgence permet aux professionnels de la santé d\'accéder à vos informations médicales essentielles en cas d\'urgence.',
    'emergency.generate': 'Générer un code QR d\'urgence',
    'emergency.access_code': 'Code d\'accès d\'urgence',
    'emergency.download': 'Télécharger',
    'emergency.share': 'Partager',
    'emergency.info_title': 'Informations incluses dans le code QR:',
    'emergency.info.name': 'Nom complet et date de naissance',
    'emergency.info.contact': 'Contact d\'urgence',
    'emergency.info.blood': 'Groupe sanguin',
    'emergency.info.allergies': 'Allergies et conditions critiques',
    'emergency.info.medications': 'Médicaments actuels',
  },
  es: {
    // Onboarding
    'welcome.title': 'Bienvenido a MedChain',
    'welcome.subtitle': 'Su información médica segura en blockchain',
    'auth.login': 'Iniciar sesión',
    'auth.register': 'Registrarse',
    'auth.email': 'Correo electrónico',
    'auth.password': 'Contraseña',
    'auth.name': 'Nombre completo',
    
    // Navigation
    'nav.dashboard': 'Panel',
    'nav.profile': 'Perfil médico',
    'nav.records': 'Registros médicos',
    'nav.medications': 'Medicamentos',
    'nav.appointments': 'Citas',
    'nav.metrics': 'Métricas de salud',
    'nav.access': 'Control de acceso',
    'nav.emergency': 'QR de emergencia',
    'nav.labexams': 'Exámenes de laboratorio',
    'nav.help': 'Centro de ayuda',
    'nav.support': 'Soporte',
    'nav.manage': 'Gestionar acceso',
    'nav.logout': 'Cerrar sesión',
    
    // Emergency QR
    'emergency.title': 'Código QR de emergencia',
    'emergency.description': 'El código QR de emergencia permite a los profesionales de la salud acceder a su información médica esencial en caso de emergencia.',
    'emergency.generate': 'Generar código QR de emergencia',
    'emergency.access_code': 'Código de acceso de emergencia',
    'emergency.download': 'Descargar',
    'emergency.share': 'Compartir',
    'emergency.info_title': 'Información incluida en el código QR:',
    'emergency.info.name': 'Nombre completo y fecha de nacimiento',
    'emergency.info.contact': 'Contacto de emergencia',
    'emergency.info.blood': 'Tipo de sangre',
    'emergency.info.allergies': 'Alergias y condiciones críticas',
    'emergency.info.medications': 'Medicamentos actuales',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('pt');
  
  const t = (key: string) => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
