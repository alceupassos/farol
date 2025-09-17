import { useState, useRef, useEffect } from 'react';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import './scrollbar.css';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
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
  X,
  FileText,
  Heart,
  Activity,
  Calendar,
  Stethoscope,
  Pill,
  AlertCircle,
  Save
} from 'lucide-react';
import { cn } from '@/lib/utils';

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

interface PatientData {
  id: string;
  name: string;
  age: number;
  gender: string;
  bloodType: string;
  condition: string;
  lastVisit: string;
  status: string;
  medications: string[];
  allergies: string[];
  vitals: {
    bloodPressure: string;
    heartRate: string;
    temperature: string;
    weight: string;
  };
  history: string[];
}

interface MedicalRecord {
  date: string;
  symptoms: string;
  diagnosis: string;
  treatment: string;
  notes: string;
  prescriptions: string[];
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
  const [activePanel, setActivePanel] = useState<'chat' | 'participants' | 'medical'>('chat');
  
  // Medical Record States
  const [currentRecord, setCurrentRecord] = useState<MedicalRecord>({
    date: new Date().toISOString().split('T')[0],
    symptoms: '',
    diagnosis: '',
    treatment: '',
    notes: '',
    prescriptions: []
  });
  const [newPrescription, setNewPrescription] = useState('');
  
  // Sample Patient Data
  const patientData: PatientData = {
    id: "pat001",
    name: "Maria Santos",
    age: 65,
    gender: "Feminino",
    bloodType: "A+",
    condition: "Hipertensão Arterial",
    lastVisit: "2024-01-15",
    status: "Estável",
    medications: ["Losartana 50mg", "Hidroclorotiazida 25mg", "AAS 100mg", "Atenolol 25mg", "Sinvastatina 20mg", "Omeprazol 20mg", "Metformina 850mg"],
    allergies: ["Penicilina", "Sulfa", "Dipirona", "Ibuprofeno", "Captopril"],
    vitals: {
      bloodPressure: "140/90 mmHg",
      heartRate: "78 bpm",
      temperature: "36.5°C",
      weight: "68 kg"
    },
    history: [
      "2023-12-10: Consulta de rotina - PA controlada",
      "2023-11-15: Ajuste medicação - Losartana aumentada",
      "2023-10-20: Exames laboratoriais - Colesterol elevado",
      "2023-09-25: Consulta cardiológica - ECG normal",
      "2023-08-30: Retorno pós-exames - Função renal preservada",
      "2023-07-15: Consulta de urgência - Pico hipertensivo controlado",
      "2023-06-20: Consulta de rotina - Ajuste de dieta",
      "2023-05-10: Exames de controle - HbA1c normal",
      "2023-04-05: Consulta oftalmológica - Sem retinopatia"
    ]
  };
  
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

  // Medical Record Functions
  const addPrescription = () => {
    if (newPrescription.trim()) {
      setCurrentRecord(prev => ({
        ...prev,
        prescriptions: [...prev.prescriptions, newPrescription.trim()]
      }));
      setNewPrescription('');
    }
  };

  const removePrescription = (index: number) => {
    setCurrentRecord(prev => ({
      ...prev,
      prescriptions: prev.prescriptions.filter((_, i) => i !== index)
    }));
  };

  const saveMedicalRecord = () => {
    // Here you would typically save to a backend
    console.log('Saving medical record:', currentRecord);
    toast.success('Prontuário salvo com sucesso!');
  };

  const clearMedicalRecord = () => {
    setCurrentRecord({
      date: new Date().toISOString().split('T')[0],
      symptoms: '',
      diagnosis: '',
      treatment: '',
      notes: '',
      prescriptions: []
    });
  };

  // AI-Assisted Medical Functions
  const generatePrognosis = () => {
    console.log('Gerando prognóstico...', patientData);
    const age = patientData.age;
    const condition = patientData.condition;
    const status = patientData.status;
    const vitals = patientData.vitals;
    
    let prognosis = '';
    
    if (condition === 'Hipertensão Arterial') {
      if (status === 'Estável') {
        prognosis = `Paciente de ${age} anos com hipertensão arterial em acompanhamento. `;
        prognosis += `Pressão arterial atual: ${vitals.bloodPressure}. `;
        prognosis += `Prognóstico: FAVORÁVEL com controle adequado da medicação. `;
        prognosis += `Recomenda-se manutenção do tratamento atual, atividade física regular e dieta hipossódica. `;
        prognosis += `Controle ambulatorial em 3 meses. Risco cardiovascular baixo a moderado com aderência ao tratamento.`;
      } else {
        prognosis = `Paciente de ${age} anos com hipertensão arterial necessitando ajuste terapêutico. `;
        prognosis += `PA atual: ${vitals.bloodPressure} - acima da meta (<140/90). `;
        prognosis += `Prognóstico: RESERVADO, requer otimização medicamentosa. `;
        prognosis += `Risco aumentado para eventos cardiovasculares. Retorno em 2 semanas para reavaliação.`;
      }
    } else if (condition === 'Diabetes Tipo 2') {
      prognosis = `Paciente de ${age} anos com diabetes mellitus tipo 2. `;
      prognosis += `Prognóstico: BOM com controle glicêmico adequado e aderência ao tratamento. `;
      prognosis += `Necessário monitoramento contínuo da glicemia, HbA1c trimestral e acompanhamento oftalmológico anual.`;
    } else {
      prognosis = `Paciente de ${age} anos em acompanhamento por ${condition}. `;
      prognosis += `Prognóstico baseado na evolução clínica atual: ${status.toLowerCase()}. `;
      prognosis += `Seguimento conforme protocolo específico da condição apresentada.`;
    }
    
    setCurrentRecord(prev => ({ ...prev, notes: prognosis }));
    toast.success('Prognóstico gerado com base nos dados do paciente!');
  };

  const generateDiagnosis = () => {
    console.log('Gerando diagnóstico completo...', { patientData, symptoms: currentRecord.symptoms });
    
    if (!currentRecord.symptoms.trim()) {
      toast.error('Por favor, descreva os sintomas antes de gerar o diagnóstico!');
      return;
    }

    const age = patientData.age;
    const condition = patientData.condition;
    const symptoms = currentRecord.symptoms.toLowerCase();
    const vitals = patientData.vitals;
    const allergies = patientData.allergies;
    const currentMeds = patientData.medications;
    
    let diagnosis = '';
    let treatment = '';
    let newPrescriptions: string[] = [];
    
    // AI-based diagnosis based on symptoms and patient data
    if (symptoms.includes('dor no peito') || symptoms.includes('dor torácica')) {
      if (condition === 'Hipertensão Arterial') {
        diagnosis = `Dor torácica em paciente hipertenso de ${age} anos. Possível origem cardiovascular relacionada à hipertensão arterial não controlada (PA: ${vitals.bloodPressure}). Descartar síndrome coronariana aguda. Investigar compliance medicamentosa.`;
        
        treatment = `CONDUTA TERAPÊUTICA:\n\n1. INVESTIGAÇÃO IMEDIATA:\n   - ECG de 12 derivações\n   - Troponina I seriada\n   - Raio-X de tórax\n   - Ecocardiograma\n\n2. OTIMIZAÇÃO ANTI-HIPERTENSIVA:\n   - Aumentar Losartana para 100mg/dia\n   - Manter Hidroclorotiazida 25mg/dia\n   - Adicionar Anlodipino 5mg/dia se PA persistir elevada\n\n3. CARDIOPROTEÇÃO:\n   - Manter AAS 100mg/dia\n   - Considerar Atorvastatina 20mg/dia\n\n4. ORIENTAÇÕES:\n   - Repouso relativo\n   - Retorno imediato se piora da dor\n   - Controle rigoroso da PA domiciliar`;
        
        newPrescriptions = [
          'Losartana 100mg - 1 comprimido pela manhã',
          'Hidroclorotiazida 25mg - 1 comprimido pela manhã',
          'AAS 100mg - 1 comprimido após café',
          'Anlodipino 5mg - 1 comprimido à noite',
          'Atorvastatina 20mg - 1 comprimido à noite'
        ];
      }
    } else if (symptoms.includes('falta de ar') || symptoms.includes('dispneia') || symptoms.includes('cansaço')) {
      if (condition === 'Hipertensão Arterial') {
        diagnosis = `Dispneia em paciente hipertenso de ${age} anos. Suspeita de insuficiência cardíaca diastólica secundária à hipertensão arterial. PA atual: ${vitals.bloodPressure} - descontrolada.`;
        
        treatment = `CONDUTA PARA DISPNEIA/INSUFICIÊNCIA CARDÍACA:\n\n1. INVESTIGAÇÃO:\n   - Ecocardiograma com Doppler\n   - BNP ou NT-proBNP\n   - Raio-X de tórax\n   - Função renal (ureia/creatinina)\n\n2. TRATAMENTO MEDICAMENTOSO:\n   - Otimizar IECA: Losartana 100mg/dia\n   - Diurético: Hidroclorotiazida 25mg/dia\n   - Beta-bloqueador: Atenolol 25mg/dia\n\n3. MEDIDAS GERAIS:\n   - Restrição de sal (<2g/dia)\n   - Controle hídrico (1,5L/dia)\n   - Atividade física leve após estabilização\n   - Controle de peso diário`;
        
        newPrescriptions = [
          'Losartana 100mg - 1 comprimido pela manhã',
          'Hidroclorotiazida 25mg - 1 comprimido pela manhã',
          'Atenolol 25mg - 1 comprimido pela manhã',
          'AAS 100mg - 1 comprimido após café'
        ];
      }
    } else if (symptoms.includes('tontura') || symptoms.includes('vertigem') || symptoms.includes('mal estar')) {
      diagnosis = `Tontura em paciente hipertenso de ${age} anos. Possível hipotensão ortostática secundária ao uso de anti-hipertensivos ou episódios de hipertensão arterial. PA atual: ${vitals.bloodPressure}.`;
      
      treatment = `CONDUTA PARA TONTURA/VERTIGEM:\n\n1. AVALIAÇÃO:\n   - Medida da PA em decúbito e ortostatismo\n   - Verificar compliance medicamentosa\n   - Avaliar interações medicamentosas\n\n2. AJUSTE MEDICAMENTOSO:\n   - Reduzir Hidroclorotiazida para 12,5mg/dia\n   - Manter Losartana 50mg/dia\n   - Orientar tomada noturna se hipotensão\n\n3. ORIENTAÇÕES:\n   - Hidratação adequada\n   - Levantar-se lentamente\n   - Evitar jejum prolongado\n   - Retorno em 1 semana`;
      
      newPrescriptions = [
        'Losartana 50mg - 1 comprimido pela manhã',
        'Hidroclorotiazida 12,5mg - 1 comprimido pela manhã',
        'AAS 100mg - 1 comprimido após café'
      ];
    } else if (symptoms.includes('dor de cabeça') || symptoms.includes('cefaleia')) {
      diagnosis = `Cefaleia em paciente hipertenso de ${age} anos. Provável cefaleia secundária à hipertensão arterial descontrolada (PA: ${vitals.bloodPressure}). Descartar emergência hipertensiva.`;
      
      treatment = `CONDUTA PARA CEFALEIA HIPERTENSIVA:\n\n1. AVALIAÇÃO URGENTE:\n   - Medida seriada da PA\n   - Fundoscopia (se disponível)\n   - Avaliar sinais neurológicos\n\n2. CONTROLE PRESSÓRICO:\n   - Captopril 25mg sublingual se PA >180/110\n   - Otimizar medicação de base\n   - Losartana 100mg/dia\n   - Adicionar Anlodipino 5mg/dia\n\n3. ANALGESIA:\n   - Dipirona 500mg se necessário\n   - Evitar AINEs\n\n4. SEGUIMENTO:\n   - Retorno em 24-48h\n   - Orientar sinais de alarme`;
      
      newPrescriptions = [
        'Losartana 100mg - 1 comprimido pela manhã',
        'Anlodipino 5mg - 1 comprimido à noite',
        'Hidroclorotiazida 25mg - 1 comprimido pela manhã',
        'Captopril 25mg - SOS se PA >180/110',
        'Dipirona 500mg - SOS dor'
      ];
    } else {
      // Generic diagnosis based on patient condition
      diagnosis = `Paciente de ${age} anos com ${condition} em acompanhamento. Sintomas relatados: ${currentRecord.symptoms}. Necessária avaliação clínica detalhada para correlação com quadro de base.`;
      
      treatment = `CONDUTA CLÍNICA GERAL:\n\n1. AVALIAÇÃO:\n   - Exame físico completo\n   - Correlação com medicações em uso\n   - Avaliar aderência ao tratamento\n\n2. MANUTENÇÃO TERAPÊUTICA:\n   - Continuar medicações atuais\n   - Monitorização clínica\n   - Ajustes conforme evolução\n\n3. ORIENTAÇÕES:\n   - Seguimento regular\n   - Sinais de alarme\n   - Retorno programado`;
      
      newPrescriptions = currentMeds.map(med => `${med} - manter dose atual`);
    }
    
    // Add allergy warnings
    if (allergies.length > 0) {
      treatment += `\n\n⚠️ ALERGIAS CONHECIDAS: ${allergies.join(', ')}\nEVITAR medicações com estes componentes!`;
    }
    
    // Update all fields
    setCurrentRecord(prev => ({ 
      ...prev, 
      diagnosis,
      treatment,
      prescriptions: [...prev.prescriptions, ...newPrescriptions]
    }));
    
    toast.success('Diagnóstico completo gerado com IA baseado nos sintomas e dados do paciente!');
  };

  const generateMedication = () => {
    console.log('Gerando medicação...', patientData);
    const age = patientData.age;
    const condition = patientData.condition;
    const currentMeds = patientData.medications;
    const allergies = patientData.allergies;
    const vitals = patientData.vitals;
    
    let medicationPlan = '';
    let newPrescriptions: string[] = [];
    
    if (condition === 'Hipertensão Arterial') {
      const systolic = parseInt(vitals.bloodPressure.split('/')[0]);
      
      medicationPlan = `PLANO TERAPÊUTICO PARA HIPERTENSÃO ARTERIAL:\n\n`;
      
      if (systolic > 140) {
        medicationPlan += `PA atual: ${vitals.bloodPressure} - Necessário ajuste medicamentoso.\n\n`;
        
        if (!allergies.includes('Sulfa')) {
          medicationPlan += `1. OTIMIZAÇÃO DA TERAPIA ATUAL:\n`;
          medicationPlan += `   - Manter Losartana 50mg 1x/dia\n`;
          medicationPlan += `   - Aumentar Hidroclorotiazida para 25mg 1x/dia (manhã)\n`;
          medicationPlan += `   - Manter AAS 100mg 1x/dia (após café da manhã)\n\n`;
          
          newPrescriptions = [
            'Losartana 50mg - 1 comprimido pela manhã',
            'Hidroclorotiazida 25mg - 1 comprimido pela manhã',
            'AAS 100mg - 1 comprimido após café da manhã'
          ];
        } else {
          medicationPlan += `⚠️ ATENÇÃO: Paciente alérgico a SULFA - Evitar Hidroclorotiazida\n\n`;
          medicationPlan += `ALTERNATIVA TERAPÊUTICA:\n`;
          medicationPlan += `   - Manter Losartana 50mg 1x/dia\n`;
          medicationPlan += `   - Adicionar Anlodipino 5mg 1x/dia\n`;
          medicationPlan += `   - Manter AAS 100mg 1x/dia\n\n`;
          
          newPrescriptions = [
            'Losartana 50mg - 1 comprimido pela manhã',
            'Anlodipino 5mg - 1 comprimido pela manhã',
            'AAS 100mg - 1 comprimido após café da manhã'
          ];
        }
      } else {
        medicationPlan += `PA atual: ${vitals.bloodPressure} - Controle adequado.\n\n`;
        medicationPlan += `MANUTENÇÃO DA TERAPIA ATUAL:\n`;
        currentMeds.forEach(med => {
          medicationPlan += `   - ${med}\n`;
        });
        
        newPrescriptions = [
          'Losartana 50mg - 1 comprimido pela manhã',
          'Hidroclorotiazida 25mg - 1 comprimido pela manhã',
          'AAS 100mg - 1 comprimido após café da manhã'
        ];
      }
      
      medicationPlan += `\n2. ORIENTAÇÕES GERAIS:\n`;
      medicationPlan += `   - Tomar medicações sempre no mesmo horário\n`;
      medicationPlan += `   - Não suspender medicações sem orientação médica\n`;
      medicationPlan += `   - Monitorar PA em casa 2x/semana\n`;
      medicationPlan += `   - Dieta hipossódica (<2g sal/dia)\n`;
      medicationPlan += `   - Atividade física regular (caminhada 30min/dia)\n\n`;
      
      medicationPlan += `3. RETORNO:\n`;
      medicationPlan += `   - Reavaliação em 4 semanas\n`;
      medicationPlan += `   - Trazer anotações da PA domiciliar\n`;
      medicationPlan += `   - Exames: Ureia, Creatinina, Potássio em 2 semanas`;
      
    } else if (condition === 'Diabetes Tipo 2') {
      medicationPlan = `PLANO TERAPÊUTICO PARA DIABETES TIPO 2:\n\n`;
      medicationPlan += `1. MEDICAÇÕES:\n`;
      medicationPlan += `   - Metformina 850mg - 2x/dia (almoço e jantar)\n`;
      medicationPlan += `   - Glicazida 30mg - 1x/dia (café da manhã)\n\n`;
      medicationPlan += `2. MONITORAMENTO:\n`;
      medicationPlan += `   - Glicemia capilar: jejum e 2h pós-prandial\n`;
      medicationPlan += `   - HbA1c a cada 3 meses\n`;
      medicationPlan += `   - Meta glicêmica: 70-130mg/dL jejum\n\n`;
      
      newPrescriptions = [
        'Metformina 850mg - 1 comprimido no almoço e jantar',
        'Glicazida 30mg - 1 comprimido no café da manhã'
      ];
    } else {
      medicationPlan = `PLANO TERAPÊUTICO INDIVIDUALIZADO:\n\n`;
      medicationPlan += `Baseado na condição: ${condition}\n`;
      medicationPlan += `Idade: ${age} anos\n`;
      medicationPlan += `Status atual: ${patientData.status}\n\n`;
      medicationPlan += `Medicações atuais em uso:\n`;
      currentMeds.forEach(med => {
        medicationPlan += `   - ${med}\n`;
      });
      medicationPlan += `\nAjustes conforme evolução clínica e resposta terapêutica.`;
    }
    
    // Add allergy warnings
    if (allergies.length > 0) {
      medicationPlan += `\n\n⚠️ ALERGIAS CONHECIDAS: ${allergies.join(', ')}`;
      medicationPlan += `\nEVITAR medicações com estes componentes!`;
    }
    
    setCurrentRecord(prev => ({ 
      ...prev, 
      treatment: medicationPlan,
      prescriptions: [...prev.prescriptions, ...newPrescriptions]
    }));
    
    toast.success('Plano medicamentoso gerado com base no perfil do paciente!');
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
              <div className="w-1/3 border-l border-slate-700 flex flex-col h-full bg-slate-900">
                <div className="border-b border-slate-700 p-2 flex justify-between items-center bg-slate-800">
                  <div className="flex space-x-1 overflow-x-auto">
                    <button
                      className={`px-2 py-1 text-xs rounded-md whitespace-nowrap transition-all duration-200 ${
                        activePanel === 'chat' 
                          ? 'bg-blue-600 text-white shadow-md' 
                          : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                      }`}
                      onClick={() => setActivePanel('chat')}
                    >
                      <MessageCircle className="h-3 w-3 inline mr-1" />
                      Chat
                    </button>
                    <button
                      className={`px-2 py-1 text-xs rounded-md whitespace-nowrap transition-all duration-200 ${
                        activePanel === 'participants' 
                          ? 'bg-blue-600 text-white shadow-md' 
                          : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                      }`}
                      onClick={() => setActivePanel('participants')}
                    >
                      <Users className="h-3 w-3 inline mr-1" />
                      Participantes ({participants.length})
                    </button>
                    <button
                      className={`px-2 py-1 text-xs rounded-md whitespace-nowrap transition-all duration-200 ${
                        activePanel === 'medical' 
                          ? 'bg-green-600 text-white shadow-md' 
                          : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                      }`}
                      onClick={() => setActivePanel('medical')}
                    >
                      <FileText className="h-3 w-3 inline mr-1" />
                      Prontuário
                    </button>
                  </div>
                  <button 
                    onClick={() => setIsChatOpen(false)}
                    className="p-1 rounded-full hover:bg-slate-700 text-slate-400 hover:text-white transition-colors duration-200"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex-1 overflow-hidden">
                  {activePanel === 'chat' ? (
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
                  ) : activePanel === 'participants' ? (
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
                  ) : (
                    // Medical Records Panel
                    <div className="h-full overflow-y-auto medical-scrollbar">
                      <Tabs defaultValue="patient-info" className="h-full flex flex-col">
                        <TabsList className="grid w-full grid-cols-2 mx-3 mt-3 bg-gradient-to-r from-slate-800 to-slate-700 border border-slate-600 rounded-lg p-1">
                          <TabsTrigger 
                            value="patient-info" 
                            className="text-sm font-medium text-slate-300 data-[state=active]:bg-slate-900 data-[state=active]:text-white data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-slate-500 rounded-md transition-all duration-200"
                          >
                            <User className="h-4 w-4 mr-2 text-blue-400" />
                            Dados do Paciente
                          </TabsTrigger>
                          <TabsTrigger 
                            value="medical-record" 
                            className="text-sm font-medium text-slate-300 data-[state=active]:bg-slate-900 data-[state=active]:text-white data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-slate-500 rounded-md transition-all duration-200"
                          >
                            <Stethoscope className="h-4 w-4 mr-2 text-green-400" />
                            Consulta Atual
                          </TabsTrigger>
                        </TabsList>

                        <TabsContent value="patient-info" className="flex-1 p-3 overflow-y-auto bg-gradient-to-b from-slate-900 to-slate-800">
                          <ScrollArea className="h-full medical-scrollbar">
                            {/* Patient Header Card */}
                            <Card className="mb-4 border-0 shadow-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                              <CardContent className="p-4">
                                <div className="flex items-center space-x-4">
                                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                                    <User className="h-8 w-8 text-white" />
                                  </div>
                                  <div className="flex-1">
                                    <h3 className="text-xl font-bold">{patientData.name}</h3>
                                    <p className="text-blue-100">{patientData.age} anos • {patientData.gender}</p>
                                    <div className="flex items-center space-x-4 mt-2">
                                      <Badge className="bg-white/20 text-white border-white/30">
                                        🩸 {patientData.bloodType}
                                      </Badge>
                                      <Badge variant={patientData.status === 'Estável' ? 'secondary' : 'destructive'} className="bg-white/20 text-white border-white/30">
                                        {patientData.status}
                                      </Badge>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>

                            {/* Condition Alert */}
                            <Card className="mb-4 border-l-4 border-l-orange-500 bg-orange-50 border-orange-200">
                              <CardContent className="p-3">
                                <div className="flex items-center">
                                  <AlertCircle className="h-5 w-5 text-orange-600 mr-2" />
                                  <div>
                                    <p className="font-medium text-orange-800">Condição Principal</p>
                                    <p className="text-sm text-orange-700">{patientData.condition}</p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>

                            {/* Vital Signs - Modern Grid */}
                            <div className="grid grid-cols-2 gap-3 mb-4">
                              <Card className="border-0 shadow-md bg-gradient-to-br from-red-50 to-red-100 border-red-200">
                                <CardContent className="p-3 text-center">
                                  <Activity className="h-6 w-6 text-red-600 mx-auto mb-1" />
                                  <p className="text-xs text-red-700 font-medium">Pressão Arterial</p>
                                  <p className="text-lg font-bold text-red-800">{patientData.vitals.bloodPressure}</p>
                                </CardContent>
                              </Card>
                              <Card className="border-0 shadow-md bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200">
                                <CardContent className="p-3 text-center">
                                  <Heart className="h-6 w-6 text-pink-600 mx-auto mb-1" />
                                  <p className="text-xs text-pink-700 font-medium">Frequência Cardíaca</p>
                                  <p className="text-lg font-bold text-pink-800">{patientData.vitals.heartRate}</p>
                                </CardContent>
                              </Card>
                              <Card className="border-0 shadow-md bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                                <CardContent className="p-3 text-center">
                                  <div className="w-6 h-6 mx-auto mb-1 flex items-center justify-center">
                                    <span className="text-blue-600 font-bold">°C</span>
                                  </div>
                                  <p className="text-xs text-blue-700 font-medium">Temperatura</p>
                                  <p className="text-lg font-bold text-blue-800">{patientData.vitals.temperature}</p>
                                </CardContent>
                              </Card>
                              <Card className="border-0 shadow-md bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                                <CardContent className="p-3 text-center">
                                  <div className="w-6 h-6 mx-auto mb-1 flex items-center justify-center">
                                    <span className="text-green-600 font-bold">kg</span>
                                  </div>
                                  <p className="text-xs text-green-700 font-medium">Peso</p>
                                  <p className="text-lg font-bold text-green-800">{patientData.vitals.weight}</p>
                                </CardContent>
                              </Card>
                            </div>

                            {/* Medications & Allergies - Side by Side */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              <Card className="border-0 shadow-md bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                                <CardHeader className="pb-2">
                                  <CardTitle className="text-sm flex items-center text-green-800">
                                    <Pill className="h-4 w-4 mr-2 text-green-600" />
                                    💊 Medicações Atuais
                                  </CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div 
                                    className="space-y-2 max-h-32 overflow-y-auto medical-scrollbar"
                                    style={{
                                      scrollbarWidth: 'thin',
                                      scrollbarColor: '#475569 #1e293b'
                                    }}
                                  >
                                    {patientData.medications.map((med, index) => (
                                      <div key={index} className="bg-white/60 rounded-lg p-2 border border-green-200">
                                        <p className="text-sm font-medium text-green-800">{med}</p>
                                      </div>
                                    ))}
                                  </div>
                                </CardContent>
                              </Card>

                              <Card className="border-0 shadow-md bg-gradient-to-br from-red-50 to-orange-50 border-red-200">
                                <CardHeader className="pb-2">
                                  <CardTitle className="text-sm flex items-center text-red-800">
                                    <AlertCircle className="h-4 w-4 mr-2 text-red-600" />
                                    ⚠️ Alergias
                                  </CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div 
                                    className="space-y-2 max-h-32 overflow-y-auto medical-scrollbar"
                                    style={{
                                      scrollbarWidth: 'thin',
                                      scrollbarColor: '#475569 #1e293b'
                                    }}
                                  >
                                    {patientData.allergies.map((allergy, index) => (
                                      <div key={index} className="bg-red-100 rounded-lg p-2 border border-red-300">
                                        <p className="text-sm font-bold text-red-800">⚠️ {allergy}</p>
                                      </div>
                                    ))}
                                  </div>
                                </CardContent>
                              </Card>
                            </div>

                            {/* Medical History - Timeline Style */}
                            <Card className="border-0 shadow-md bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200">
                              <CardHeader className="pb-2">
                                <CardTitle className="text-sm flex items-center text-purple-800">
                                  <Calendar className="h-4 w-4 mr-2 text-purple-600" />
                                  📅 Histórico Recente
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div 
                                  className="space-y-3 max-h-48 overflow-y-auto medical-scrollbar"
                                  style={{
                                    scrollbarWidth: 'thin',
                                    scrollbarColor: '#475569 #1e293b'
                                  }}
                                >
                                  {patientData.history.map((entry, index) => (
                                    <div key={index} className="relative pl-6">
                                      <div className="absolute left-0 top-1 w-2 h-2 bg-purple-400 rounded-full"></div>
                                      <div className="bg-white/70 rounded-lg p-3 border border-purple-200">
                                        <p className="text-sm text-purple-800">{entry}</p>
                                      </div>
                                      {index < patientData.history.length - 1 && (
                                        <div className="absolute left-0.5 top-3 w-0.5 h-6 bg-purple-300"></div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </CardContent>
                            </Card>
                          </ScrollArea>
                        </TabsContent>

                        <TabsContent value="medical-record" className="flex-1 p-3 overflow-y-auto bg-gradient-to-b from-slate-900 to-slate-800">
                          <ScrollArea className="h-full medical-scrollbar">
                            <div className="space-y-4">
                              {/* Header with Date */}
                              <Card className="border-0 shadow-lg bg-gradient-to-r from-green-600 to-emerald-600 text-white">
                                <CardContent className="p-4">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                      <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                                        <Stethoscope className="h-6 w-6 text-white" />
                                      </div>
                                      <div>
                                        <h3 className="text-lg font-bold">Nova Consulta</h3>
                                        <p className="text-green-100 text-sm">Prontuário Eletrônico</p>
                                      </div>
                                    </div>
                                    <div className="text-right">
                                      <Label className="text-xs text-green-100">Data da Consulta</Label>
                                      <Input
                                        type="date"
                                        value={currentRecord.date}
                                        onChange={(e) => setCurrentRecord(prev => ({ ...prev, date: e.target.value }))}
                                        className="text-sm bg-white border-slate-600 text-black placeholder-slate-500 mt-1 focus:border-green-400 focus:ring-green-400"
                                      />
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>

                              {/* Symptoms Card */}
                              <Card className="border-0 shadow-md bg-gradient-to-br from-slate-800 to-slate-700 border-slate-600">
                                <CardHeader className="pb-2">
                                  <CardTitle className="text-sm flex items-center text-blue-300">
                                    <MessageSquare className="h-4 w-4 mr-2 text-blue-400" />
                                    💬 Sintomas Relatados
                                  </CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <Textarea
                                    placeholder="Descreva detalhadamente os sintomas apresentados pelo paciente..."
                                    value={currentRecord.symptoms}
                                    onChange={(e) => setCurrentRecord(prev => ({ ...prev, symptoms: e.target.value }))}
                                    className="text-sm min-h-[80px] bg-white border-slate-600 text-black placeholder-slate-500 focus:border-blue-400 focus:ring-blue-400"
                                  />
                                  {/* AI Diagnosis Button */}
                                  <div className="mt-3 flex justify-center">
                                    <Button 
                                      onClick={generateDiagnosis} 
                                      className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-sm h-12 px-8 shadow-lg transform hover:scale-105 transition-all duration-200"
                                      disabled={!currentRecord.symptoms.trim()}
                                    >
                                      <Stethoscope className="h-5 w-5 mr-2" />
                                      🧠 Gerar Diagnóstico com IA
                                    </Button>
                                  </div>
                                </CardContent>
                              </Card>

                              {/* Diagnosis & Treatment - Side by Side */}
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                <Card className="border-0 shadow-md bg-gradient-to-br from-slate-800 to-slate-700 border-slate-600">
                                  <CardHeader className="pb-2">
                                    <CardTitle className="text-sm flex items-center text-orange-300">
                                      <Activity className="h-4 w-4 mr-2 text-orange-400" />
                                      🔍 Diagnóstico Médico
                                    </CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <Textarea
                                      placeholder="Diagnóstico baseado na avaliação clínica..."
                                      value={currentRecord.diagnosis}
                                      onChange={(e) => setCurrentRecord(prev => ({ ...prev, diagnosis: e.target.value }))}
                                      className="text-sm min-h-[100px] bg-white border-slate-600 text-black placeholder-slate-500 focus:border-orange-400 focus:ring-orange-400"
                                    />
                                  </CardContent>
                                </Card>

                                <Card className="border-0 shadow-md bg-gradient-to-br from-slate-800 to-slate-700 border-slate-600">
                                  <CardHeader className="pb-2">
                                    <CardTitle className="text-sm flex items-center text-teal-300">
                                      <Stethoscope className="h-4 w-4 mr-2 text-teal-400" />
                                      📋 Plano de Tratamento
                                    </CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <Textarea
                                      placeholder="Plano terapêutico detalhado..."
                                      value={currentRecord.treatment}
                                      onChange={(e) => setCurrentRecord(prev => ({ ...prev, treatment: e.target.value }))}
                                      className="text-sm min-h-[100px] bg-white border-slate-600 text-black placeholder-slate-500 focus:border-teal-400 focus:ring-teal-400"
                                    />
                                  </CardContent>
                                </Card>
                              </div>

                              {/* Prescriptions Card */}
                              <Card className="border-0 shadow-md bg-gradient-to-br from-slate-800 to-slate-700 border-slate-600">
                                <CardHeader className="pb-2">
                                  <CardTitle className="text-sm flex items-center text-emerald-300">
                                    <Pill className="h-4 w-4 mr-2 text-emerald-400" />
                                    💊 Prescrições Médicas
                                  </CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="space-y-3">
                                    <div className="flex gap-2">
                                      <Input
                                        placeholder="Digite nova prescrição (ex: Losartana 50mg - 1x ao dia)..."
                                        value={newPrescription}
                                        onChange={(e) => setNewPrescription(e.target.value)}
                                        className="text-sm flex-1 bg-white border-slate-600 text-black placeholder-slate-500 focus:border-emerald-400 focus:ring-emerald-400"
                                        onKeyPress={(e) => e.key === 'Enter' && addPrescription()}
                                      />
                                      <Button 
                                        onClick={addPrescription} 
                                        size="sm" 
                                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-4"
                                      >
                                        <Pill className="h-4 w-4 mr-1" />
                                        Adicionar
                                      </Button>
                                    </div>
                                    <div 
                                      className="space-y-2 max-h-32 overflow-y-auto medical-scrollbar"
                                      style={{
                                        scrollbarWidth: 'thin',
                                        scrollbarColor: '#475569 #1e293b'
                                      }}
                                    >
                                      {currentRecord.prescriptions.map((prescription, index) => (
                                        <div key={index} className="flex items-center justify-between bg-slate-900/80 p-3 rounded-lg border border-slate-600 shadow-sm">
                                          <span className="text-sm text-emerald-300 font-medium">{prescription}</span>
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => removePrescription(index)}
                                            className="h-8 w-8 p-0 text-red-400 hover:text-red-300 hover:bg-red-900/30"
                                          >
                                            <X className="h-4 w-4" />
                                          </Button>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>

                              {/* Notes Card */}
                              <Card className="border-0 shadow-md bg-gradient-to-br from-slate-800 to-slate-700 border-slate-600">
                                <CardHeader className="pb-2">
                                  <CardTitle className="text-sm flex items-center text-violet-300">
                                    <MessageCircle className="h-4 w-4 mr-2 text-violet-400" />
                                    📝 Observações Médicas
                                  </CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <Textarea
                                    placeholder="Observações adicionais, orientações ao paciente, recomendações especiais..."
                                    value={currentRecord.notes}
                                    onChange={(e) => setCurrentRecord(prev => ({ ...prev, notes: e.target.value }))}
                                    className="text-sm min-h-[100px] bg-white border-slate-600 text-black placeholder-slate-500 focus:border-violet-400 focus:ring-violet-400"
                                  />
                                </CardContent>
                              </Card>

                              {/* Action Buttons */}
                              <Card className="border-0 shadow-lg bg-gradient-to-r from-slate-800 to-slate-700 border-slate-600">
                                <CardContent className="p-4">
                                  <div className="flex gap-3">
                                    <Button 
                                      onClick={saveMedicalRecord} 
                                      className="flex-1 text-sm h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg transform hover:scale-105 transition-all duration-200"
                                    >
                                      <Save className="h-5 w-5 mr-2" />
                                      💾 Salvar Prontuário Completo
                                    </Button>
                                    <Button 
                                      onClick={clearMedicalRecord} 
                                      variant="outline" 
                                      className="text-sm h-12 px-6 border-2 border-slate-500 text-slate-300 hover:border-red-400 hover:bg-red-900/30 hover:text-red-300 transition-all duration-200"
                                    >
                                      <X className="h-4 w-4 mr-2" />
                                      🗑️ Limpar Formulário
                                    </Button>
                                  </div>
                                  <p className="text-xs text-slate-400 mt-2 text-center">
                                    ✅ Prontuário será salvo com data/hora atual e assinatura digital
                                  </p>
                                </CardContent>
                              </Card>
                            </div>
                          </ScrollArea>
                        </TabsContent>
                      </Tabs>
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
