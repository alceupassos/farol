import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Phone, 
  PhoneOff, 
  Copy, 
  Share2,
  Play,
  Square,
  Users,
  Settings,
  Camera,
  MessageSquare,
  UserPlus,
  Maximize2,
  Minimize2,
  Send,
  MessageCircle,
  User,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
  isCurrentUser: boolean;
}

interface Participant {
  id: string;
  name: string;
  role: 'doctor' | 'patient' | 'assistant';
  isVideoOn: boolean;
  isAudioOn: boolean;
}

interface TelemedicineModalProps {
  children: React.ReactNode;
}

const TelemedicineModal = ({ children }: TelemedicineModalProps) => {
  const { t, i18n } = useTranslation();
  
  const [isOpen, setIsOpen] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const [patientLink, setPatientLink] = useState('');
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [isPatientConnected, setIsPatientConnected] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const patientVideoRef = useRef<HTMLVideoElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Generate session ID and patient link
  useEffect(() => {
    if (isOpen && !sessionId) {
      const newSessionId = `tele-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      setSessionId(newSessionId);
      setPatientLink(`${window.location.origin}/telemedicine/patient/${newSessionId}`);
      
      // Add doctor as first participant
      setParticipants([
        {
          id: 'doctor-1',
          name: t('telemedicine.doctor') + ' Silva',
          role: 'doctor',
          isVideoOn: true,
          isAudioOn: true
        }
      ]);
    }
  }, [isOpen, sessionId]);

  // Initialize camera when modal opens
  useEffect(() => {
    if (isOpen) {
      initializeCamera();
    } else {
      cleanup();
    }

    return cleanup;
  }, [isOpen]);

  const initializeCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast.error(t('telemedicine.errorAccessingCamera'));
    }
  };

  const cleanup = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    
    if (recordingIntervalRef.current) {
      clearInterval(recordingIntervalRef.current);
      recordingIntervalRef.current = null;
    }
    
    setIsRecording(false);
    setRecordingDuration(0);
  };

  const toggleVideo = () => {
    if (streamRef.current) {
      const videoTrack = streamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoEnabled(videoTrack.enabled);
        
        // Update participant video status
        setParticipants(prev => 
          prev.map(p => 
            p.id === 'doctor-1' ? { ...p, isVideoOn: videoTrack.enabled } : p
          )
        );
      }
    }
  };

  const toggleAudio = () => {
    if (streamRef.current) {
      const audioTrack = streamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsAudioEnabled(audioTrack.enabled);
        
        // Update participant audio status
        setParticipants(prev => 
          prev.map(p => 
            p.id === 'doctor-1' ? { ...p, isAudioOn: audioTrack.enabled } : p
          )
        );
      }
    }
  };

  const startRecording = async () => {
    if (!streamRef.current) return;

    try {
      const mediaRecorder = new MediaRecorder(streamRef.current);
      mediaRecorderRef.current = mediaRecorder;
      
      const chunks: BlobPart[] = [];
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        
        // Create download link
        const a = document.createElement('a');
        a.href = url;
        a.download = `telemedicine-session-${sessionId}-${new Date().toISOString()}.webm`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        URL.revokeObjectURL(url);
        toast.success(t('telemedicine.recordingSaved'));
      };
      
      mediaRecorder.start();
      setIsRecording(true);
      setRecordingDuration(0);
      
      // Start recording timer
      recordingIntervalRef.current = setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);
      
      toast.success(t('telemedicine.recordingStarted'));
    } catch (error) {
      console.error('Error starting recording:', error);
      toast.error(t('telemedicine.errorStartingRecording'));
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    
    if (recordingIntervalRef.current) {
      clearInterval(recordingIntervalRef.current);
      recordingIntervalRef.current = null;
    }
    
    setIsRecording(false);
    toast.success(t('telemedicine.recordingStopped'));
  };

  const copyPatientLink = () => {
    navigator.clipboard.writeText(patientLink);
    toast.success(t('telemedicine.linkCopied'));
  };

  const sharePatientLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: t('telemedicine.shareLink'),
          text: t('telemedicine.shareLinkText'),
          url: patientLink,
        });
      } catch (error) {
        copyPatientLink();
      }
    } else {
      copyPatientLink();
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startCall = () => {
    setIsCallActive(true);
    
    // Simulate patient joining after 2 seconds
    setTimeout(() => {
      setIsPatientConnected(true);
      setParticipants(prev => [
        ...prev,
        {
          id: 'patient-1',
          name: 'Paciente',
          role: 'patient',
          isVideoOn: true,
          isAudioOn: true
        }
      ]);
      
      // Add welcome message
      addSystemMessage(t('telemedicine.patientJoined'));
      
      toast.success(t('telemedicine.patientConnected'));
    }, 2000);
  };

  const endCall = () => {
    setIsCallActive(false);
    setIsPatientConnected(false);
    
    // Remove patient from participants
    setParticipants(prev => prev.filter(p => p.role === 'doctor'));
    
    if (isRecording) {
      stopRecording();
    }
    
    // Add leave message
    addSystemMessage(t('telemedicine.callEnded'));
    
    toast.info(t('telemedicine.callEnded'));
  };
  
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const addSystemMessage = (content: string) => {
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      sender: 'Sistema',
      content,
      timestamp: new Date(),
      isCurrentUser: false
    };
    
    setMessages(prev => [...prev, newMessage]);
  };

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      sender: 'Você',
      content: message,
      timestamp: new Date(),
      isCurrentUser: true
    };
    
    setMessages(prev => [...prev, newMessage]);
    setMessage('');
    
    // Simulate response after 1 second
    setTimeout(() => {
      const responseMessage: Message = {
        id: `msg-${Date.now()}`,
        sender: 'Paciente',
        content: t('telemedicine.patientResponse'),
        timestamp: new Date(),
        isCurrentUser: false
      };
      
      setMessages(prev => [...prev, responseMessage]);
    }, 1000);
  };

  const renderChatMessage = (message: Message) => {
    return (
      <div 
        key={message.id} 
        className={cn(
          "flex mb-4",
          message.isCurrentUser ? "justify-end" : "justify-start"
        )}
      >
        <div 
          className={cn(
            "max-w-xs lg:max-w-md px-4 py-2 rounded-lg",
            message.isCurrentUser 
              ? "bg-blue-600 text-white rounded-br-none" 
              : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-none"
          )}
        >
          {!message.isCurrentUser && (
            <div className="font-semibold text-xs mb-1">
              {message.sender}
            </div>
          )}
          <p className="text-sm">{message.content}</p>
          <div className="text-xs opacity-70 mt-1 text-right">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>
    );
  };

  const renderParticipant = (participant: Participant) => {
    return (
      <div key={participant.id} className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
        <div className="relative">
          <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
            <User className="h-5 w-5 text-gray-500 dark:text-gray-300" />
          </div>
          <div className="absolute -bottom-1 -right-1 flex items-center space-x-1">
            {!participant.isVideoOn && (
              <div className="bg-red-500 rounded-full p-1">
                <VideoOff className="h-3 w-3 text-white" />
              </div>
            )}
            {!participant.isAudioOn && (
              <div className="bg-red-500 rounded-full p-1">
                <MicOff className="h-3 w-3 text-white" />
              </div>
            )}
          </div>
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium">
            {participant.name}
            {participant.role === 'doctor' && (
              <span className="ml-2 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-0.5 rounded-full">
                {t('telemedicine.doctor')}
              </span>
            )}
          </p>
          <p className="text-xs text-muted-foreground">
            {participant.isVideoOn ? t('telemedicine.cameraOn') : t('telemedicine.cameraOff')}
          </p>
        </div>
      </div>
    );
  };

  // Auto-scroll chat to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className={cn(
        "max-w-7xl h-[90vh] p-0 overflow-hidden",
        isFullscreen ? "w-full h-full max-w-none rounded-none" : "rounded-lg"
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center space-x-2">
              <Video className="h-5 w-5 text-blue-600" />
              <h2 className="text-lg font-semibold">{t('telemedicine.telemedicineConsultation')}</h2>
              {isCallActive && (
                <Badge variant="default" className="bg-green-500">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse mr-1" />
                  {isPatientConnected ? t('telemedicine.inProgress') : t('telemedicine.waitingForPatient')}
                </Badge>
              )}
              {isRecording && (
                <Badge variant="destructive" className="ml-2">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse mr-1" />
                  {t('telemedicine.recording')} {formatDuration(recordingDuration)}
                </Badge>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={toggleFullscreen}
                className="text-muted-foreground hover:text-foreground"
              >
                {isFullscreen ? (
                  <Minimize2 className="h-4 w-4" />
                ) : (
                  <Maximize2 className="h-4 w-4" />
                )}
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={toggleChat}
                className="text-muted-foreground hover:text-foreground relative"
              >
                <MessageCircle className="h-4 w-4" />
                {messages.length > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center">
                    {messages.length}
                  </span>
                )}
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-muted-foreground hover:text-foreground"
              >
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex flex-1 overflow-hidden">
            {/* Video Area */}
            <div className={cn(
              "flex-1 flex flex-col p-4",
              isChatOpen ? "w-2/3" : "w-full"
            )}>
              {/* Video Grid */}
              <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                {/* Doctor's Video */}
                <div className="bg-black rounded-lg overflow-hidden relative">
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  
                  {!isVideoEnabled && (
                    <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
                      <div className="text-center text-white">
                        <Camera className="h-12 w-12 mx-auto mb-2 opacity-50" />
                        <p>{t('telemedicine.cameraOff')}</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                    {t('telemedicine.you')}
                  </div>
                </div>

                {/* Patient's Video */}
                <div className={cn(
                  "bg-gradient-to-br from-slate-900 to-indigo-900 rounded-2xl overflow-hidden relative shadow-2xl border border-indigo-200/20",
                  !isPatientConnected && "flex items-center justify-center"
                )}>
                  {isPatientConnected ? (
                    <>
                      <video
                        ref={patientVideoRef}
                        autoPlay
                        playsInline
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-4 left-4 bg-gradient-to-r from-green-600 to-teal-600 text-white px-4 py-2 rounded-xl text-sm font-medium shadow-lg backdrop-blur-sm">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                          <span>{t('telemedicine.patient')}</span>
                        </div>
                      </div>
                      
                      {/* Patient Status Indicators */}
                      <div className="absolute top-4 right-4 flex space-x-2">
                        {!isVideoEnabled && (
                          <div className="bg-red-500/90 rounded-full p-2 shadow-lg">
                            <VideoOff className="h-4 w-4 text-white" />
                          </div>
                        )}
                        {!isAudioEnabled && (
                          <div className="bg-red-500/90 rounded-full p-2 shadow-lg">
                            <MicOff className="h-4 w-4 text-white" />
                          </div>
                        )}
                      </div>
                      
                      {/* Connection Quality Indicator */}
                      <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-1">
                        <div className="flex items-center space-x-2">
                          <div className="flex space-x-1">
                            <div className="w-1 h-3 bg-green-400 rounded-full animate-pulse" />
                            <div className="w-1 h-4 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }} />
                            <div className="w-1 h-5 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                          </div>
                          <span className="text-white text-xs font-medium">{t('telemedicine.excellent')}</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-center p-8 w-full">
                      {/* Animated Background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/50 via-purple-900/30 to-blue-900/50" />
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />
                      
                      {/* Main Content */}
                      <div className="relative z-10">
                        {/* Avatar with pulse effect */}
                        <div className="relative mb-6">
                          <div className="p-8 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full mb-4 backdrop-blur-sm border border-indigo-300/20 mx-auto w-fit">
                            <User className="h-20 w-20 text-indigo-300" />
                          </div>
                          {/* Pulse rings */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-32 h-32 border-2 border-indigo-400/30 rounded-full animate-ping" />
                            <div className="absolute w-40 h-40 border border-purple-400/20 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
                          </div>
                        </div>
                        
                        {/* Text Content */}
                        <div className="space-y-4">
                          <h3 className="text-2xl font-bold text-white mb-2 bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
                            {t('telemedicine.waitingForPatient')}
                          </h3>
                          <p className="text-indigo-200 text-lg font-medium">
                            {t('telemedicine.connectingToConsultation')}
                          </p>
                          <p className="text-indigo-300/80 text-sm max-w-md mx-auto leading-relaxed">
                            {t('telemedicine.patientWillReceiveNotification')}
                          </p>
                        </div>
                        
                        {/* Loading Animation */}
                        <div className="mt-8 flex items-center justify-center space-x-2">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" />
                            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                          </div>
                          <span className="text-indigo-300 text-sm font-medium ml-3">{t('telemedicine.establishingConnection')}</span>
                        </div>
                        
                        {/* Status Cards */}
                        <div className="mt-8 grid grid-cols-2 gap-4 max-w-sm mx-auto">
                          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
                            <div className="flex items-center space-x-2 mb-2">
                              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                              <span className="text-white text-sm font-medium">{t('telemedicine.roomActive')}</span>
                            </div>
                            <p className="text-indigo-200 text-xs">{t('telemedicine.readyForConnection')}</p>
                          </div>
                          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
                            <div className="flex items-center space-x-2 mb-2">
                              <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" />
                              <span className="text-white text-sm font-medium">{t('telemedicine.secure')}</span>
                            </div>
                            <p className="text-indigo-200 text-xs">{t('telemedicine.endToEndEncryption')}</p>
                          </div>
                        </div>
                        
                        {/* Quick Actions */}
                        <div className="mt-6 flex flex-wrap gap-2 justify-center">
                          <div className="bg-gradient-to-r from-green-500/20 to-teal-500/20 border border-green-400/30 rounded-lg px-3 py-2 backdrop-blur-sm">
                            <span className="text-green-300 text-xs font-medium">{t('telemedicine.linkSent')}</span>
                          </div>
                          <div className="bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border border-blue-400/30 rounded-lg px-3 py-2 backdrop-blur-sm">
                            <span className="text-blue-300 text-xs font-medium">{t('telemedicine.secureConnection')}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Session Info */}
              <div className="bg-muted p-4 rounded-lg mb-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label className="text-sm font-medium">{t('telemedicine.sessionId')}</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Input value={sessionId} readOnly className="font-mono text-sm" />
                      <Button size="sm" variant="outline" onClick={() => {
                        navigator.clipboard.writeText(sessionId);
                        toast.success(t('telemedicine.idCopied'));
                      }}>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">{t('telemedicine.patientLink')}</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Input value={patientLink} readOnly className="text-sm truncate" />
                      <Button size="sm" variant="outline" onClick={copyPatientLink}>
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={sharePatientLink}>
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-end">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => {
                        copyPatientLink();
                        toast.success(t('telemedicine.linkCopied'));
                      }}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      {t('telemedicine.copyConsultationLink')}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-2 p-3 bg-muted rounded-lg">
                <Button
                  variant={isVideoEnabled ? "default" : "destructive"}
                  size="lg"
                  onClick={toggleVideo}
                  className="rounded-full w-12 h-12 p-0"
                >
                  {isVideoEnabled ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
                </Button>

                <Button
                  variant={isAudioEnabled ? "default" : "destructive"}
                  size="lg"
                  onClick={toggleAudio}
                  className="rounded-full w-12 h-12 p-0"
                >
                  {isAudioEnabled ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
                </Button>

                <Button
                  variant={isRecording ? "destructive" : "secondary"}
                  size="lg"
                  onClick={isRecording ? stopRecording : startRecording}
                  className="rounded-full w-12 h-12 p-0"
                  disabled={!isCallActive}
                >
                  {isRecording ? (
                    <Square className="h-5 w-5" />
                  ) : (
                    <Play className="h-5 w-5" />
                  )}
                </Button>

                <div className="w-px h-8 bg-gray-300 mx-2"></div>

                <Button
                  variant={isCallActive ? "destructive" : "default"}
                  size="lg"
                  onClick={isCallActive ? endCall : startCall}
                  className={cn(
                    "rounded-full w-12 h-12 p-0",
                    !isCallActive && "bg-green-600 hover:bg-green-700"
                  )}
                >
                  {isCallActive ? (
                    <PhoneOff className="h-5 w-5" />
                  ) : (
                    <Phone className="h-5 w-5" />
                  )}
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full w-12 h-12 p-0"
                  onClick={() => {
                    setActiveTab('participants');
                    setIsChatOpen(true);
                  }}
                >
                  <Users className="h-5 w-5" />
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full w-12 h-12 p-0 relative"
                  onClick={() => {
                    setActiveTab('chat');
                    setIsChatOpen(true);
                  }}
                >
                  <MessageSquare className="h-5 w-5" />
                  {messages.length > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center">
                      {messages.length}
                    </span>
                  )}
                </Button>
              </div>
            </div>

            {/* Chat/Participants Panel */}
            {isChatOpen && (
              <div className="w-1/3 border-l flex flex-col h-full bg-white dark:bg-gray-900">
                <div className="border-b p-2 flex justify-between items-center">
                  <div className="flex space-x-2">
                    <button
                      className={`px-3 py-1 text-sm rounded-md ${
                        activeTab === 'chat' 
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200' 
                          : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                      }`}
                      onClick={() => setActiveTab('chat')}
                    >
                      {t('telemedicine.chat')}
                    </button>
                    <button
                      className={`px-3 py-1 text-sm rounded-md ${
                        activeTab === 'participants' 
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200' 
                          : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                      }`}
                      onClick={() => setActiveTab('participants')}
                    >
                      {t('telemedicine.participants')} ({participants.length})
                    </button>
                  </div>
                  <button 
                    onClick={() => setIsChatOpen(false)}
                    className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex-1 overflow-hidden">
                  {activeTab === 'chat' ? (
                    <div className="h-full flex flex-col">
                      <div 
                        ref={chatContainerRef}
                        className="flex-1 p-4 overflow-y-auto"
                      >
                        {messages.length > 0 ? (
                          messages.map(renderChatMessage)
                        ) : (
                          <div className="h-full flex flex-col items-center justify-center text-center p-6">
                            <MessageSquare className="h-10 w-10 text-gray-400 mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                              {t('telemedicine.noMessages')}
                            </h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                              {t('telemedicine.sendMessageToStartConversation')}
                            </p>
                          </div>
                        )}
                      </div>
                      
                      <form onSubmit={sendMessage} className="p-4 border-t">
                        <div className="flex items-center gap-2">
                          <Input
                            placeholder={t('telemedicine.typeMessage')}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                            className="flex-1"
                          />
                          <Button type="submit" size="sm" className="h-10">
                            <Send className="h-4 w-4 mr-2" />
                            {t('telemedicine.sendMessage')}
                          </Button>
                        </div>
                      </form>
                    </div>
                  ) : (
                    <div className="h-full overflow-y-auto p-4">
                      <div className="mb-4">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full mb-2"
                          onClick={() => {
                            copyPatientLink();
                            toast.success(t('telemedicine.linkCopied'));
                          }}
                        >
                          <UserPlus className="h-4 w-4 mr-2" />
                          {t('telemedicine.inviteParticipant')}
                        </Button>
                        <p className="text-xs text-muted-foreground text-center">
                          {participants.length} {participants.length === 1 ? t('telemedicine.participant') : t('telemedicine.participants')} {t('telemedicine.inCall')}
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        {participants.map(renderParticipant)}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TelemedicineModal;
