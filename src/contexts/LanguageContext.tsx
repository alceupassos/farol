import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

type Language = 'pt' | 'en' | 'fr' | 'es';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  changeLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const translations = {
  pt: {
    // Onboarding
    'welcome.title': 'Bem-vindo ao Sistema de Saúde Pública',
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
    
    // Telemedicine
    'telemedicine.welcome': 'Bem-vindo à Telemedicina',
    'telemedicine.waitingForPatient': 'Aguardando paciente...',
    'telemedicine.patientConnected': 'Paciente conectado',
    'telemedicine.connectionQuality': 'Qualidade da Conexão',
    'telemedicine.excellent': 'Excelente',
    'telemedicine.consultation': 'Consulta de Telemedicina',
    'telemedicine.telemedicineConsultation': 'Consulta de Telemedicina',
    'telemedicine.inProgress': 'Em Andamento',
    'telemedicine.recording': 'Gravando',
    'telemedicine.you': 'Você',
    'telemedicine.noMessages': 'Nenhuma mensagem',
    'telemedicine.sendMessageToStartConversation': 'Envie uma mensagem para iniciar a conversa',
    'telemedicine.typeMessage': 'Digite uma mensagem...',
    'telemedicine.sendMessage': 'Enviar Mensagem',
    'telemedicine.close': 'Fechar',
    'telemedicine.fullscreen': 'Tela Cheia',
    'telemedicine.exitFullscreen': 'Sair da Tela Cheia',
    'telemedicine.cameraOn': 'Câmera Ativada',
    'telemedicine.cameraOff': 'Câmera Desativada',
    'telemedicine.copyLink': 'Copiar Link',
    'telemedicine.linkCopied': 'Link copiado!',
    'telemedicine.sessionId': 'ID da Sessão',
    'telemedicine.patientLink': 'Link do Paciente',
    'telemedicine.copyConsultationLink': 'Copiar link da consulta',
    'telemedicine.chat': 'Chat',
    'telemedicine.participants': 'Participantes',
    'telemedicine.inviteParticipant': 'Convidar Participante',
  },
  en: {
    // Onboarding
    'welcome.title': 'Welcome to Public Health System',
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
    
    // Telemedicine
    'telemedicine.welcome': 'Welcome to Telemedicine',
    'telemedicine.waitingForPatient': 'Waiting for patient to join...',
    'telemedicine.patientConnected': 'Patient connected',
    'telemedicine.connectionQuality': 'Connection Quality',
    'telemedicine.excellent': 'Excellent',
    'telemedicine.consultation': 'Telemedicine Consultation',
    'telemedicine.telemedicineConsultation': 'Telemedicine Consultation',
    'telemedicine.inProgress': 'In Progress',
    'telemedicine.recording': 'Recording',
    'telemedicine.you': 'You',
    'telemedicine.noMessages': 'No messages',
    'telemedicine.sendMessageToStartConversation': 'Send a message to start the conversation',
    'telemedicine.typeMessage': 'Type a message...',
    'telemedicine.sendMessage': 'Send Message',
    'telemedicine.close': 'Close',
    'telemedicine.fullscreen': 'Fullscreen',
    'telemedicine.exitFullscreen': 'Exit Fullscreen',
    'telemedicine.cameraOn': 'Camera On',
    'telemedicine.cameraOff': 'Camera Off',
    'telemedicine.copyLink': 'Copy Link',
    'telemedicine.linkCopied': 'Link copied!',
    'telemedicine.sessionId': 'Session ID',
    'telemedicine.patientLink': 'Patient Link',
    'telemedicine.copyConsultationLink': 'Copy consultation link',
    'telemedicine.chat': 'Chat',
    'telemedicine.participants': 'Participants',
    'telemedicine.inviteParticipant': 'Invite Participant',
  },
  fr: {
    // Onboarding
    'welcome.title': 'Bienvenue au Système de Santé Publique',
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
    
    // Telemedicine
    'telemedicine.welcome': 'Bienvenue en Télémédecine',
    'telemedicine.waitingForPatient': 'En attente du patient...',
    'telemedicine.patientConnected': 'Patient connecté',
    'telemedicine.connectionQuality': 'Qualité de Connexion',
    'telemedicine.excellent': 'Excellente',
    'telemedicine.consultation': 'Consultation de Télémédecine',
    'telemedicine.telemedicineConsultation': 'Consultation de Télémédecine',
    'telemedicine.inProgress': 'En Cours',
    'telemedicine.recording': 'Enregistrement',
    'telemedicine.you': 'Vous',
    'telemedicine.noMessages': 'Aucun message',
    'telemedicine.sendMessageToStartConversation': 'Envoyez un message pour démarrer la conversation',
    'telemedicine.typeMessage': 'Tapez un message...',
    'telemedicine.sendMessage': 'Envoyer un Message',
    'telemedicine.close': 'Fermer',
    'telemedicine.fullscreen': 'Plein Écran',
    'telemedicine.exitFullscreen': 'Quitter le Mode Plein Écran',
    'telemedicine.cameraOn': 'Caméra Activée',
    'telemedicine.cameraOff': 'Caméra Désactivée',
    'telemedicine.copyLink': 'Copier le Lien',
    'telemedicine.linkCopied': 'Lien copié !',
    'telemedicine.sessionId': 'ID de Session',
    'telemedicine.patientLink': 'Lien du Patient',
    'telemedicine.copyConsultationLink': 'Copier le lien de consultation',
    'telemedicine.chat': 'Chat',
    'telemedicine.participants': 'Participants',
    'telemedicine.inviteParticipant': 'Inviter un Participant',
  },
  es: {
    // Onboarding
    'welcome.title': 'Bienvenido al Sistema de Salud Pública',
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
    
    // Telemedicine
    'telemedicine.welcome': 'Bienvenido a Telemedicina',
    'telemedicine.waitingForPatient': 'Esperando a que se una el paciente...',
    'telemedicine.patientConnected': 'Paciente conectado',
    'telemedicine.connectionQuality': 'Calidad de Conexión',
    'telemedicine.excellent': 'Excelente',
    'telemedicine.consultation': 'Consulta de Telemedicina',
    'telemedicine.telemedicineConsultation': 'Consulta de Telemedicina',
    'telemedicine.inProgress': 'En Progreso',
    'telemedicine.recording': 'Grabando',
    'telemedicine.you': 'Tú',
    'telemedicine.noMessages': 'Sin mensajes',
    'telemedicine.sendMessageToStartConversation': 'Envía un mensaje para iniciar la conversación',
    'telemedicine.typeMessage': 'Escribe un mensaje...',
    'telemedicine.sendMessage': 'Enviar Mensaje',
    'telemedicine.close': 'Cerrar',
    'telemedicine.fullscreen': 'Pantalla Completa',
    'telemedicine.exitFullscreen': 'Salir de Pantalla Completa',
    'telemedicine.cameraOn': 'Cámara Activada',
    'telemedicine.cameraOff': 'Cámara Desactivada',
    'telemedicine.copyLink': 'Copiar Enlace',
    'telemedicine.linkCopied': '¡Enlace copiado!',
    'telemedicine.sessionId': 'ID de Sesión',
    'telemedicine.patientLink': 'Enlace del Paciente',
    'telemedicine.copyConsultationLink': 'Copiar enlace de consulta',
    'telemedicine.chat': 'Chat',
    'telemedicine.participants': 'Participantes',
    'telemedicine.inviteParticipant': 'Invitar Participante',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('pt');

  const changeLanguage = (newLanguage: Language) => {
    console.log('LanguageProvider: Changing language from', language, 'to', newLanguage);
    setLanguage(newLanguage);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', newLanguage);
    }
  };
  
  const t = (key: string) => {
    const translation = translations[language]?.[key as keyof typeof translations[typeof language]];
    if (translation) {
      return translation as string;
    }
    console.warn(`Translation missing for key: ${key} in language: ${language}`);
    return key;
  };
  
  // Load language from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('language') as Language;
      if (savedLanguage && ['pt', 'en', 'es', 'fr'].includes(savedLanguage)) {
        setLanguage(savedLanguage);
      }
    }
  }, []);
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, changeLanguage, t }}>
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
