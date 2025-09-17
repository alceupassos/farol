import { useCallback, useState } from 'react';

type TranslationKey = string;
type TranslationValue = string | Record<string, unknown>;
type Translations = Record<string, TranslationValue>;

// Static translations for Vite/React setup
const translations: Record<string, Translations> = {
  pt: {
    // Common translations
    welcome: "Bem-vindo à Telemedicina",
    startCall: "Iniciar Chamada",
    endCall: "Encerrar Chamada",
    toggleVideo: "Ativar/Desativar Vídeo",
    toggleAudio: "Ativar/Desativar Áudio",
    toggleChat: "Mostrar/Esconder Chat",
    toggleParticipants: "Participantes",
    sendMessage: "Enviar Mensagem",
    typeMessage: "Digite uma mensagem...",
    copyLink: "Copiar Link",
    linkCopied: "Link copiado para a área de transferência!",
    selectLanguage: "Selecionar Idioma",
    close: "Fechar",
    fullscreen: "Tela Cheia",
    exitFullscreen: "Sair da Tela Cheia",
    cameraOn: "Câmera Ativada",
    cameraOff: "Câmera Desativada",
    // Telemedicine translations
    waitingForPatient: "Aguardando paciente...",
    patientConnected: "Paciente conectado",
    connectionQuality: "Qualidade da Conexão",
    excellent: "Excelente",
    telemedicineConsultation: "Consulta de Telemedicina",
    inProgress: "Em Andamento",
    you: "Você",
    noMessages: "Nenhuma mensagem",
    sendMessageToStartConversation: "Envie uma mensagem para iniciar a conversa",
  },
  en: {
    // Common translations
    welcome: "Welcome to Telemedicine",
    startCall: "Start Call",
    endCall: "End Call",
    toggleVideo: "Toggle Video",
    toggleAudio: "Toggle Audio",
    toggleChat: "Toggle Chat",
    toggleParticipants: "Participants",
    sendMessage: "Send Message",
    typeMessage: "Type a message...",
    copyLink: "Copy Link",
    linkCopied: "Link copied to clipboard!",
    selectLanguage: "Select Language",
    close: "Close",
    fullscreen: "Fullscreen",
    exitFullscreen: "Exit Fullscreen",
    cameraOn: "Camera On",
    cameraOff: "Camera Off",
    // Telemedicine translations
    waitingForPatient: "Waiting for patient to join...",
    patientConnected: "Patient connected",
    connectionQuality: "Connection Quality",
    excellent: "Excellent",
    telemedicineConsultation: "Telemedicine Consultation",
    inProgress: "In Progress",
    you: "You",
    noMessages: "No messages",
    sendMessageToStartConversation: "Send a message to start the conversation",
  },
  es: {
    // Common translations
    welcome: "Bienvenido a Telemedicina",
    startCall: "Iniciar Llamada",
    endCall: "Finalizar Llamada",
    toggleVideo: "Activar/Desactivar Video",
    toggleAudio: "Activar/Desactivar Audio",
    toggleChat: "Mostrar/Ocultar Chat",
    toggleParticipants: "Participantes",
    sendMessage: "Enviar Mensaje",
    typeMessage: "Escribe un mensaje...",
    copyLink: "Copiar Enlace",
    linkCopied: "¡Enlace copiado al portapapeles!",
    selectLanguage: "Seleccionar Idioma",
    close: "Cerrar",
    fullscreen: "Pantalla Completa",
    exitFullscreen: "Salir de Pantalla Completa",
    cameraOn: "Cámara Activada",
    cameraOff: "Cámara Desactivada",
    // Telemedicine translations
    waitingForPatient: "Esperando a que se una el paciente...",
    patientConnected: "Paciente conectado",
    connectionQuality: "Calidad de Conexión",
    excellent: "Excelente",
    telemedicineConsultation: "Consulta de Telemedicina",
    inProgress: "En Progreso",
    you: "Tú",
    noMessages: "Sin mensajes",
    sendMessageToStartConversation: "Envía un mensaje para iniciar la conversación",
  },
  fr: {
    // Common translations
    welcome: "Bienvenue en Télémédecine",
    startCall: "Démarrer l'Appel",
    endCall: "Terminer l'Appel",
    toggleVideo: "Activer/Désactiver la Vidéo",
    toggleAudio: "Activer/Désactiver l'Audio",
    toggleChat: "Afficher/Masquer le Chat",
    toggleParticipants: "Participants",
    sendMessage: "Envoyer un Message",
    typeMessage: "Tapez un message...",
    copyLink: "Copier le Lien",
    linkCopied: "Lien copié dans le presse-papiers !",
    selectLanguage: "Sélectionner la Langue",
    close: "Fermer",
    fullscreen: "Plein Écran",
    exitFullscreen: "Quitter le Mode Plein Écran",
    cameraOn: "Caméra Activée",
    cameraOff: "Caméra Désactivée",
    // Telemedicine translations
    waitingForPatient: "En attente du patient...",
    patientConnected: "Patient connecté",
    connectionQuality: "Qualité de Connexion",
    excellent: "Excellente",
    telemedicineConsultation: "Consultation de Télémédecine",
    inProgress: "En Cours",
    you: "Vous",
    noMessages: "Aucun message",
    sendMessageToStartConversation: "Envoyez un message pour démarrer la conversation",
  }
};

export const useTranslation = () => {
  const [locale, setLocale] = useState<string>(() => {
    return localStorage.getItem('locale') || 'pt';
  });
  
  const changeLanguage = (newLocale: string) => {
    setLocale(newLocale);
    localStorage.setItem('locale', newLocale);
  };
  
  const t = useCallback((key: string, params?: Record<string, string>): string => {
    const translation = translations[locale]?.[key] || key;
    
    if (typeof translation !== 'string') {
      console.warn(`Translation for key "${key}" is not a string`);
      return key;
    }
    
    if (!params) return translation;
    
    // Replace placeholders like {{name}} with values from params
    return Object.entries(params).reduce(
      (result, [param, value]) => 
        result.replace(new RegExp(`{{${param}}}`, 'g'), value),
      translation
    );
  }, [locale]);

  return { t, locale, changeLanguage };
};

export default useTranslation;
