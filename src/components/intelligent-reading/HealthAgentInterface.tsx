import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { 
  Camera, 
  MapPin, 
  Mic, 
  Users, 
  Stethoscope, 
  ClipboardList,
  Send,
  Navigation,
  Smartphone,
  Wifi,
  WifiOff,
  Clock,
  MessageSquare,
  AlertTriangle
} from 'lucide-react';

interface VisitRecord {
  id: string;
  household: string;
  timestamp: string;
  status: 'completed' | 'in-progress' | 'pending';
  documentsCollected: number;
  notes: string;
}

export const HealthAgentInterface = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [currentLocation, setCurrentLocation] = useState('Rua das Flores, 123');
  const [activeVisit, setActiveVisit] = useState<string | null>(null);
  const [anamnesis, setAnamnesis] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const { toast } = useToast();

  const visits: VisitRecord[] = [
    {
      id: '1',
      household: 'Família Silva - Rua das Flores, 123',
      timestamp: '2024-01-15 09:30',
      status: 'completed',
      documentsCollected: 3,
      notes: 'Hemograma e receita coletados. Paciente relatou melhora.'
    },
    {
      id: '2',
      household: 'Família Santos - Av. Principal, 456',
      timestamp: '2024-01-15 11:00',
      status: 'in-progress',
      documentsCollected: 1,
      notes: 'Visita em andamento. Coletando exames de rotina.'
    },
    {
      id: '3',
      household: 'Família Costa - Rua do Sol, 789',
      timestamp: '2024-01-15 14:00',
      status: 'pending',
      documentsCollected: 0,
      notes: ''
    }
  ];

  const handleStartRecording = () => {
    setIsRecording(true);
    // Simular reconhecimento de voz
    setTimeout(() => {
      setAnamnesis(prev => prev + 'Paciente relata dor de cabeça há 3 dias, sem febre. ');
      setIsRecording(false);
      toast({
        title: "Gravação processada",
        description: "Texto convertido e adicionado à anamnese.",
      });
    }, 3000);
  };

  const handleStartVisit = (visitId: string) => {
    setActiveVisit(visitId);
    toast({
      title: "Visita iniciada",
      description: "Timer iniciado. Boa sorte na coleta!",
    });
  };

  const handleCaptureDocument = () => {
    toast({
      title: "Documento capturado",
      description: "Processamento OCR iniciado em segundo plano.",
    });
  };

  const syncData = () => {
    if (!isOnline) {
      toast({
        title: "Modo offline",
        description: "Dados serão sincronizados quando conexão for restabelecida.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Sincronização concluída",
      description: "Todos os dados foram enviados para o servidor.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Status do Agente */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Stethoscope className="h-5 w-5 text-primary" />
              Agente de Campo - Ana Silva
            </div>
            <div className="flex items-center gap-2">
              {isOnline ? (
                <Badge className="bg-success/10 text-success border-success/20">
                  <Wifi className="h-3 w-3 mr-1" />
                  Online
                </Badge>
              ) : (
                <Badge variant="destructive">
                  <WifiOff className="h-3 w-3 mr-1" />
                  Offline
                </Badge>
              )}
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsOnline(!isOnline)}
              >
                <Smartphone className="h-4 w-4 mr-2" />
                Alternar Conexão
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Localização Atual</p>
                <p className="text-sm text-muted-foreground">{currentLocation}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Visitas Hoje</p>
                <p className="text-sm text-muted-foreground">3 de 5 concluídas</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <ClipboardList className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Documentos Coletados</p>
                <p className="text-sm text-muted-foreground">12 documentos hoje</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Captura Rápida */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5 text-primary" />
            Captura Rápida de Documentos
          </CardTitle>
          <CardDescription>
            Capture ou faça upload de documentos médicos com OCR em tempo real
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button 
              onClick={handleCaptureDocument}
              className="h-24 flex flex-col gap-2"
            >
              <Camera className="h-8 w-8" />
              Capturar com Câmera
            </Button>
            
            <Button 
              variant="outline"
              className="h-24 flex flex-col gap-2"
            >
              <ClipboardList className="h-8 w-8" />
              Upload Manual
            </Button>
          </div>
          
          <Separator className="my-4" />
          
          <div className="space-y-3">
            <h4 className="font-medium">Últimos Documentos Capturados</h4>
            <div className="space-y-2">
              {['Hemograma - João Silva', 'Receita - Maria Santos', 'Atestado - Pedro Costa'].map((doc, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 bg-muted rounded-lg">
                  <span className="text-sm">{doc}</span>
                  <Badge variant="secondary">Processando</Badge>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Anamnese por IA */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            Anamnese Assistida por IA
          </CardTitle>
          <CardDescription>
            Converse naturalmente com o paciente, a IA estruturará automaticamente
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Button
                variant={isRecording ? "destructive" : "default"}
                onClick={handleStartRecording}
                disabled={isRecording}
                className="flex-shrink-0"
              >
                <Mic className={`h-4 w-4 mr-2 ${isRecording ? 'animate-pulse' : ''}`} />
                {isRecording ? 'Gravando...' : 'Gravar'}
              </Button>
              
              <Button variant="outline" size="sm">
                IA Sugere Perguntas
              </Button>
            </div>
            
            <Textarea
              placeholder="A IA preencherá automaticamente conforme você conversa com o paciente..."
              value={anamnesis}
              onChange={(e) => setAnamnesis(e.target.value)}
              className="min-h-[120px]"
            />
            
            <div className="flex gap-2">
              <Button size="sm">
                <Send className="h-4 w-4 mr-2" />
                Enviar para Carteira
              </Button>
              <Button variant="outline" size="sm">
                Salvar Rascunho
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Visitas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Navigation className="h-5 w-5 text-primary" />
            Agenda de Visitas
          </CardTitle>
          <CardDescription>
            Gerencie suas visitas domiciliares programadas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {visits.map((visit) => (
              <Card 
                key={visit.id} 
                className={`border-l-4 ${
                  visit.status === 'completed' ? 'border-l-success' :
                  visit.status === 'in-progress' ? 'border-l-warning' :
                  'border-l-muted-foreground'
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-medium">{visit.household}</h4>
                      <p className="text-sm text-muted-foreground">
                        {new Date(visit.timestamp).toLocaleString('pt-BR')}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={
                          visit.status === 'completed' ? 'default' :
                          visit.status === 'in-progress' ? 'secondary' :
                          'outline'
                        }
                      >
                        {visit.status === 'completed' ? 'Concluída' :
                         visit.status === 'in-progress' ? 'Em Andamento' :
                         'Pendente'}
                      </Badge>
                      
                      {visit.status === 'pending' && (
                        <Button 
                          size="sm"
                          onClick={() => handleStartVisit(visit.id)}
                        >
                          Iniciar
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span>
                      <Users className="h-4 w-4 inline mr-1" />
                      {visit.documentsCollected} documentos coletados
                    </span>
                    
                    {visit.notes && (
                      <span className="text-muted-foreground max-w-xs truncate">
                        {visit.notes}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Ações de Sincronização */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {!isOnline && (
                <AlertTriangle className="h-5 w-5 text-warning" />
              )}
              <div>
                <p className="font-medium">
                  {isOnline ? 'Dados sincronizados' : 'Dados aguardando sincronização'}
                </p>
                <p className="text-sm text-muted-foreground">
                  {isOnline ? 
                    'Última sincronização: agora' : 
                    '8 documentos pendentes de envio'
                  }
                </p>
              </div>
            </div>
            
            <Button onClick={syncData} disabled={!isOnline}>
              Sincronizar Agora
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};