import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Phone, 
  PhoneOff,
  Users,
  Settings,
  Camera,
  Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const TelemedicinePatient = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    initializeCamera();
    return cleanup;
  }, []);

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
      toast.error('Erro ao acessar câmera. Verifique as permissões.');
    }
  };

  const cleanup = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  const toggleVideo = () => {
    if (streamRef.current) {
      const videoTrack = streamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoEnabled(videoTrack.enabled);
      }
    }
  };

  const toggleAudio = () => {
    if (streamRef.current) {
      const audioTrack = streamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsAudioEnabled(audioTrack.enabled);
      }
    }
  };

  const connectToCall = () => {
    setIsConnecting(true);
    // Simulate connection process
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
      toast.success('Conectado à consulta!');
    }, 2000);
  };

  const disconnectCall = () => {
    setIsConnected(false);
    toast.info('Desconectado da consulta');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Consulta de Telemedicina
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Sessão: <span className="font-mono text-sm">{sessionId}</span>
          </p>
          {isConnected && (
            <Badge variant="default" className="bg-green-500 mt-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse mr-1" />
              Conectado
            </Badge>
          )}
        </div>

        {/* Main Video Area */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            {/* Video Container */}
            <div className="aspect-video bg-black relative">
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
                    <p>Câmera desabilitada</p>
                  </div>
                </div>
              )}

              {/* Connection Status */}
              {isConnected && (
                <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Conectado ao médico
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="p-6 bg-gray-50 dark:bg-gray-700">
              <div className="flex items-center justify-center gap-4">
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

                {!isConnected ? (
                  <Button
                    variant="default"
                    size="lg"
                    onClick={connectToCall}
                    disabled={isConnecting}
                    className="rounded-full w-12 h-12 p-0 bg-green-600 hover:bg-green-700"
                  >
                    {isConnecting ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Phone className="h-5 w-5" />
                    )}
                  </Button>
                ) : (
                  <Button
                    variant="destructive"
                    size="lg"
                    onClick={disconnectCall}
                    className="rounded-full w-12 h-12 p-0"
                  >
                    <PhoneOff className="h-5 w-5" />
                  </Button>
                )}

                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full w-12 h-12 p-0"
                >
                  <Settings className="h-5 w-5" />
                </Button>
              </div>

              {/* Status Text */}
              <div className="text-center mt-4">
                {!isConnected && !isConnecting && (
                  <p className="text-gray-600 dark:text-gray-300">
                    Clique no botão verde para se conectar à consulta
                  </p>
                )}
                {isConnecting && (
                  <p className="text-blue-600 dark:text-blue-400">
                    Conectando à consulta...
                  </p>
                )}
                {isConnected && (
                  <p className="text-green-600 dark:text-green-400">
                    Você está conectado à consulta médica
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">
              Instruções para a Consulta
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                Certifique-se de que sua câmera e microfone estão funcionando
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                Clique no botão verde para se conectar quando estiver pronto
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                Use os controles para ligar/desligar câmera e microfone
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                A consulta pode ser gravada para fins médicos
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TelemedicinePatient;
