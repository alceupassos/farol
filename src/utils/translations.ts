// Sistema de tradução simples e direto
export type Language = 'pt' | 'en' | 'es' | 'fr';

// Estado global simples
let currentLanguage: Language = 'pt';
const listeners: Array<() => void> = [];

// Traduções
const translations = {
  pt: {
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
    'nav.search': 'Pesquisar...',
    
    // Common
    'common.save': 'Salvar',
    'common.cancel': 'Cancelar',
    'common.edit': 'Editar',
    'common.delete': 'Excluir',
    'common.add': 'Adicionar',
    'common.remove': 'Remover',
    'common.confirm': 'Confirmar',
    'common.loading': 'Carregando...',
    'common.error': 'Erro',
    'common.success': 'Sucesso',
    'common.warning': 'Aviso',
    'common.info': 'Informação',
    
    // Telemedicine
    'telemedicine.welcome': 'Bem-vindo à Telemedicina',
    'telemedicine.telemedicineConsultation': 'Consulta de Telemedicina',
    'telemedicine.waitingForPatient': 'Aguardando paciente...',
    'telemedicine.patientConnected': 'Paciente conectado',
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
    'telemedicine.connectionQuality': 'Qualidade da Conexão',
    'telemedicine.excellent': 'Excelente',
    'telemedicine.doctor': 'Médico',
    'telemedicine.patient': 'Paciente',
    
    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.overview': 'Visão Geral',
    'dashboard.recentActivity': 'Atividade Recente',
    'dashboard.quickActions': 'Ações Rápidas',
  },
  en: {
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
    'nav.search': 'Search...',
    
    // Common
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.add': 'Add',
    'common.remove': 'Remove',
    'common.confirm': 'Confirm',
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.warning': 'Warning',
    'common.info': 'Information',
    
    // Telemedicine
    'telemedicine.welcome': 'Welcome to Telemedicine',
    'telemedicine.telemedicineConsultation': 'Telemedicine Consultation',
    'telemedicine.waitingForPatient': 'Waiting for patient to join...',
    'telemedicine.patientConnected': 'Patient connected',
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
    'telemedicine.connectionQuality': 'Connection Quality',
    'telemedicine.excellent': 'Excellent',
    'telemedicine.doctor': 'Doctor',
    'telemedicine.patient': 'Patient',
    
    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.overview': 'Overview',
    'dashboard.recentActivity': 'Recent Activity',
    'dashboard.quickActions': 'Quick Actions',
  },
  es: {
    // Navigation
    'nav.dashboard': 'Panel',
    'nav.profile': 'Perfil Médico',
    'nav.records': 'Registros Médicos',
    'nav.medications': 'Medicamentos',
    'nav.appointments': 'Citas',
    'nav.metrics': 'Métricas de Salud',
    'nav.access': 'Control de Acceso',
    'nav.emergency': 'QR de Emergencia',
    'nav.labexams': 'Exámenes de Laboratorio',
    'nav.help': 'Centro de Ayuda',
    'nav.support': 'Soporte',
    'nav.manage': 'Gestionar Acceso',
    'nav.logout': 'Cerrar Sesión',
    'nav.search': 'Buscar...',
    
    // Common
    'common.save': 'Guardar',
    'common.cancel': 'Cancelar',
    'common.edit': 'Editar',
    'common.delete': 'Eliminar',
    'common.add': 'Agregar',
    'common.remove': 'Quitar',
    'common.confirm': 'Confirmar',
    'common.loading': 'Cargando...',
    'common.error': 'Error',
    'common.success': 'Éxito',
    'common.warning': 'Advertencia',
    'common.info': 'Información',
    
    // Telemedicine
    'telemedicine.welcome': 'Bienvenido a Telemedicina',
    'telemedicine.telemedicineConsultation': 'Consulta de Telemedicina',
    'telemedicine.waitingForPatient': 'Esperando a que se una el paciente...',
    'telemedicine.patientConnected': 'Paciente conectado',
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
    'telemedicine.connectionQuality': 'Calidad de Conexión',
    'telemedicine.excellent': 'Excelente',
    'telemedicine.doctor': 'Médico',
    'telemedicine.patient': 'Paciente',
    
    // Dashboard
    'dashboard.title': 'Panel',
    'dashboard.overview': 'Resumen',
    'dashboard.recentActivity': 'Actividad Reciente',
    'dashboard.quickActions': 'Acciones Rápidas',
  },
  fr: {
    // Navigation
    'nav.dashboard': 'Tableau de Bord',
    'nav.profile': 'Profil Médical',
    'nav.records': 'Dossiers Médicaux',
    'nav.medications': 'Médicaments',
    'nav.appointments': 'Rendez-vous',
    'nav.metrics': 'Métriques de Santé',
    'nav.access': 'Contrôle d\'Accès',
    'nav.emergency': 'QR d\'Urgence',
    'nav.labexams': 'Examens de Laboratoire',
    'nav.help': 'Centre d\'Aide',
    'nav.support': 'Support',
    'nav.manage': 'Gérer l\'Accès',
    'nav.logout': 'Déconnexion',
    'nav.search': 'Rechercher...',
    
    // Common
    'common.save': 'Enregistrer',
    'common.cancel': 'Annuler',
    'common.edit': 'Modifier',
    'common.delete': 'Supprimer',
    'common.add': 'Ajouter',
    'common.remove': 'Retirer',
    'common.confirm': 'Confirmer',
    'common.loading': 'Chargement...',
    'common.error': 'Erreur',
    'common.success': 'Succès',
    'common.warning': 'Avertissement',
    'common.info': 'Information',
    
    // Telemedicine
    'telemedicine.welcome': 'Bienvenue en Télémédecine',
    'telemedicine.telemedicineConsultation': 'Consultation de Télémédecine',
    'telemedicine.waitingForPatient': 'En attente du patient...',
    'telemedicine.patientConnected': 'Patient connecté',
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
    'telemedicine.connectionQuality': 'Qualité de Connexion',
    'telemedicine.excellent': 'Excellente',
    'telemedicine.doctor': 'Médecin',
    'telemedicine.patient': 'Patient',
    
    // Dashboard
    'dashboard.title': 'Tableau de Bord',
    'dashboard.overview': 'Aperçu',
    'dashboard.recentActivity': 'Activité Récente',
    'dashboard.quickActions': 'Actions Rapides',
  }
};

// Funções públicas
export const getCurrentLanguage = (): Language => currentLanguage;

export const setLanguage = (lang: Language) => {
  console.log('🌐 Changing language from', currentLanguage, 'to', lang);
  currentLanguage = lang;
  localStorage.setItem('app-language', lang);
  
  // Notificar todos os listeners
  listeners.forEach(listener => listener());
};

export const t = (key: string): string => {
  const translation = translations[currentLanguage]?.[key as keyof typeof translations[typeof currentLanguage]];
  if (translation) {
    return translation as string;
  }
  console.warn(`🚫 Translation missing for key: ${key} in language: ${currentLanguage}`);
  return key;
};

export const subscribe = (listener: () => void) => {
  listeners.push(listener);
  return () => {
    const index = listeners.indexOf(listener);
    if (index > -1) {
      listeners.splice(index, 1);
    }
  };
};

// Inicializar idioma do localStorage
if (typeof window !== 'undefined') {
  const savedLang = localStorage.getItem('app-language') as Language;
  if (savedLang && ['pt', 'en', 'es', 'fr'].includes(savedLang)) {
    currentLanguage = savedLang;
  }
}
