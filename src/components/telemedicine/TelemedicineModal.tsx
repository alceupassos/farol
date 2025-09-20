import { useState } from 'react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Phone, 
  PhoneOff,
  Users,
  MessageSquare,
  User,
  Clock,
  Wifi
} from 'lucide-react';

const TelemedicineModal = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isCallActive, setIsCallActive] = useState(false);

  const handleStartCall = () => {
    setIsCallActive(true);
    toast.success('Consulta de telemedicina iniciada!');
  };

  const handleEndCall = () => {
    setIsCallActive(false);
    setIsOpen(false);
    toast.info('Consulta de telemedicina finalizada.');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl h-[80vh] bg-gradient-to-b from-slate-900 to-slate-800">
        <DialogHeader className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white p-4 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <User className="h-6 w-6" />
                <div>
                  <DialogTitle className="text-lg font-semibold">
                    Dr. Carlos Eduardo Silva
                  </DialogTitle>
                  <p className="text-sm opacity-90">CRM 123456-SP • Cardiologia</p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-green-500 text-white">
                <Wifi className="h-3 w-3 mr-1" />
                Online
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span className="text-sm">00:00</span>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 p-6 space-y-6">
          {/* Video Area */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Video className="h-5 w-5" />
                Consulta de Telemedicina
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-video bg-slate-900 rounded-lg flex items-center justify-center border border-slate-600">
                  <div className="text-center text-slate-400">
                    <User className="h-12 w-12 mx-auto mb-2" />
                    <p>Médico</p>
                  </div>
                </div>
                <div className="aspect-video bg-slate-900 rounded-lg flex items-center justify-center border border-slate-600">
                  <div className="text-center text-slate-400">
                    <User className="h-12 w-12 mx-auto mb-2" />
                    <p>Paciente</p>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex justify-center gap-4">
                <Button
                  variant={isVideoEnabled ? "default" : "destructive"}
                  size="sm"
                  onClick={() => setIsVideoEnabled(!isVideoEnabled)}
                  className="flex items-center gap-2"
                >
                  {isVideoEnabled ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                  Vídeo
                </Button>
                <Button
                  variant={isAudioEnabled ? "default" : "destructive"}
                  size="sm"
                  onClick={() => setIsAudioEnabled(!isAudioEnabled)}
                  className="flex items-center gap-2"
                >
                  {isAudioEnabled ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                  Áudio
                </Button>
                {!isCallActive ? (
                  <Button
                    onClick={handleStartCall}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                  >
                    <Phone className="h-4 w-4" />
                    Iniciar Consulta
                  </Button>
                ) : (
                  <Button
                    onClick={handleEndCall}
                    variant="destructive"
                    className="flex items-center gap-2"
                  >
                    <PhoneOff className="h-4 w-4" />
                    Finalizar
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Patient Info */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Users className="h-5 w-5" />
                Informações do Paciente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-slate-300">
                <div>
                  <p className="font-semibold">Nome:</p>
                  <p>Maria Santos Silva</p>
                </div>
                <div>
                  <p className="font-semibold">Idade:</p>
                  <p>43 anos</p>
                </div>
                <div>
                  <p className="font-semibold">Condição:</p>
                  <p>Hipertensão Arterial</p>
                </div>
                <div>
                  <p className="font-semibold">Status:</p>
                  <Badge variant="secondary" className="bg-green-600">
                    Estável
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Chat */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Chat da Consulta
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-32 bg-slate-900 rounded-lg p-4 text-slate-400 text-sm">
                <p>Sistema de chat disponível durante a consulta...</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TelemedicineModal;
