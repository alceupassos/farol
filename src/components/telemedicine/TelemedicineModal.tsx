import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
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
  Wifi,
  HeartPulse,
  Activity,
  Droplet,
  AlertTriangle,
  Sparkles,
  Brain,
  CalendarDays,
  FileText,
  Stethoscope
} from 'lucide-react';

const TelemedicineModal = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isCallActive, setIsCallActive] = useState(false);
  const [activeTab, setActiveTab] = useState<'summary' | 'insights'>('summary');

  const handleStartCall = () => {
    setIsCallActive(true);
    toast.success('Consulta de telemedicina iniciada!');
  };

  const handleEndCall = () => {
    setIsCallActive(false);
    setIsOpen(false);
    toast.info('Consulta de telemedicina finalizada.');
  };

  const aiInsights = useMemo(
    () => [
      {
        title: 'Risco cardiovascular',
        score: 82,
        description:
          'Modelo Vigia Angra indica probabilidade elevada de evento cardíaco em 90 dias se PA se mantiver acima de 140/90mmHg.',
        factors: ['PA média 148/94 (últimos 7 dias)', 'LDL 182 mg/dL', 'Adesão anti-hipertensivo 62%'],
        actions: [
          'Ajustar terapia combinada com IECA + bloqueador de canal de cálcio',
          'Agendar telemonitoramento diário com alerta automático',
        ],
      },
      {
        title: 'Controle glicêmico',
        score: 68,
        description:
          'Variação glicêmica acima da meta em 3/7 dias. IA recomenda reforço de educação alimentar e ajuste de metformina.',
        factors: ['Glicemia média 148 mg/dL', 'IMC 29,4', 'Atividade física 2x/semana'],
        actions: ['Encaminhar para nutricionista APS', 'Definir meta de caminhada 30 min/dia com telemonitoramento'],
      },
      {
        title: 'Atenção coordenada',
        score: 74,
        description:
          'Paciente com 2 faltas nos últimos 90 dias. Sugestão de campanha proativa via Minha Saúde Angra e visita ACS.',
        factors: ['Consultas perdidas: 2', 'Contato sem resposta: 1', 'Última visita ACS: 45 dias'],
        actions: ['Acionar equipe ESF Morro da Carioca', 'Enviar lembrete multicanal 24h antes da consulta'],
      },
    ],
    []
  );

  const clinicalSummary = {
    lastAppointment: '12/09/2024 - Hipertensão arterial descompensada',
    diagnoses: ['Hipertensão arterial sistêmica', 'Pré-diabetes', 'Dislipidemia'],
    medications: [
      { name: 'Losartana 50mg', schedule: '1x manhã e 1x noite', adherence: '82%' },
      { name: 'Hidroclorotiazida 25mg', schedule: '1x manhã', adherence: '78%' },
      { name: 'Metformina 850mg', schedule: '1x manhã e 1x noite', adherence: '65%' },
    ],
    allergies: ['Dipirona (rash cutâneo)'],
  };

  const vitals = [
    { label: 'PA média 7 dias', value: '148/94 mmHg', variation: '+12 mmHg', icon: <Activity className="h-4 w-4" /> },
    { label: 'Frequência cardíaca', value: '86 bpm', variation: '+4 bpm', icon: <HeartPulse className="h-4 w-4" /> },
    { label: 'Glicemia em jejum', value: '148 mg/dL', variation: '+18 mg/dL', icon: <Droplet className="h-4 w-4" /> },
  ];

  const careTimeline = [
    {
      time: '08:35',
      title: 'Pressão arterial enviada pelo app',
      detail: 'PA 152/96 mmHg registrada no Minha Saúde Angra',
      status: 'alerta',
    },
    {
      time: 'Ontem',
      title: 'Visita ACS confirmada',
      detail: 'ACS Laura confirmou visita domiciliar para 16/09',
      status: 'info',
    },
    {
      time: '12/09',
      title: 'Consulta presencial cancelada',
      detail: 'Paciente justificou ausência por trabalho • IA sugere teleconsulta',
      status: 'pendente',
    },
  ];

  const chatMessages = [
    {
      author: 'Paciente',
      message: 'Bom dia, doutor. Senti dor de cabeça ao acordar hoje.',
      time: '08:12',
    },
    {
      author: 'Equipe Enfermagem',
      message: 'PA 152/96mmHg registrada • Iniciado protocolo de telemonitoramento.',
      time: '08:20',
    },
    {
      author: 'Médico',
      message: 'Vamos ajustar a medicação e acompanhar diariamente pelos sinais.',
      time: '08:44',
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-6xl h-[85vh] overflow-hidden border border-slate-800 bg-slate-950 p-0 text-white">
        <DialogHeader className="border-b border-slate-800 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 px-6 py-5 text-white">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                  <User className="h-6 w-6" />
                </div>
                <div>
                  <DialogTitle className="text-xl font-semibold leading-none">Dr. Carlos Eduardo Silva</DialogTitle>
                  <p className="text-sm opacity-90">CRM 123456-SP • Cardiologia • UPA Centro</p>
                </div>
              </div>
              <Separator orientation="vertical" className="hidden h-10 bg-white/30 lg:block" />
              <div className="flex items-center gap-2 text-sm">
                <CalendarDays className="h-4 w-4" />
                <span>Paciente: Maria Santos Silva • 43 anos</span>
              </div>
              <Badge variant="secondary" className="bg-emerald-500/90 text-white">
                <Wifi className="mr-1 h-3 w-3" />
                Conexão estável
              </Badge>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Clock className="h-4 w-4" />
              <span>{isCallActive ? '00:14:08' : '00:00:00'}</span>
              <Badge variant="secondary" className="bg-indigo-500/80 text-white">
                Protocolo: Telemonitoramento Crônicos
              </Badge>
            </div>
          </div>
        </DialogHeader>

        <div className="grid h-full gap-6 overflow-hidden p-6 xl:grid-cols-3">
          <div className="flex flex-col gap-6 overflow-hidden xl:col-span-2">
            <Card className="flex flex-1 flex-col border border-slate-800 bg-slate-900/80">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                  <Video className="h-5 w-5 text-emerald-300" />
                  Sala clínica
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col gap-6">
                <div className="grid flex-1 gap-4 lg:grid-cols-[3fr_1fr]">
                  <div className="relative flex flex-col overflow-hidden rounded-2xl border border-slate-700 bg-slate-950">
                    <div className="flex flex-1 items-center justify-center">
                      <div className="text-center text-slate-400">
                        <User className="h-16 w-16 mx-auto mb-3" />
                        <p className="text-sm">Feed do paciente (aguardando conexão)</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between border-t border-slate-800 bg-slate-900/80 px-4 py-2 text-xs text-slate-300">
                      <span>Qualidade da chamada: Excelente</span>
                      <span>Bitrate: 4.2 Mbps</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-1 items-center justify-center rounded-2xl border border-slate-700 bg-slate-950">
                      <div className="text-center text-slate-400">
                        <User className="mx-auto mb-2 h-10 w-10" />
                        <p className="text-xs">Pré-visualização médico</p>
                      </div>
                    </div>
                    <Card className="border border-slate-800 bg-slate-950">
                      <CardContent className="space-y-3 py-3">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-medium text-slate-200">Pressão ao vivo</span>
                          <Badge variant="outline" className="border-emerald-500/40 text-emerald-300">148/94</Badge>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-medium text-slate-200">Oximetria</span>
                          <Badge variant="outline" className="border-blue-500/40 text-blue-300">96%</Badge>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-medium text-slate-200">Ult. medicação</span>
                          <span className="text-slate-300">07:30</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Button
                    variant={isVideoEnabled ? 'default' : 'destructive'}
                    size="sm"
                    onClick={() => setIsVideoEnabled(!isVideoEnabled)}
                    className="flex items-center gap-2"
                  >
                    {isVideoEnabled ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                    Vídeo
                  </Button>
                  <Button
                    variant={isAudioEnabled ? 'default' : 'destructive'}
                    size="sm"
                    onClick={() => setIsAudioEnabled(!isAudioEnabled)}
                    className="flex items-center gap-2"
                  >
                    {isAudioEnabled ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                    Áudio
                  </Button>
                  {!isCallActive ? (
                    <Button onClick={handleStartCall} className="flex items-center gap-2 bg-emerald-500 text-emerald-950 hover:bg-emerald-400">
                      <Phone className="h-4 w-4" />
                      Iniciar consulta
                    </Button>
                  ) : (
                    <Button onClick={handleEndCall} variant="destructive" className="flex items-center gap-2">
                      <PhoneOff className="h-4 w-4" />
                      Finalizar
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="border border-slate-800 bg-slate-900/70">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base font-semibold text-slate-100">
                    <MessageSquare className="h-5 w-5 text-blue-300" />
                    Chat assistencial
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-56">
                  <ScrollArea className="h-full pr-4">
                    <div className="space-y-4 text-sm">
                      {chatMessages.map((msg) => (
                        <div key={`${msg.author}-${msg.time}`} className="rounded-lg border border-slate-800 bg-slate-950/80 p-3">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-slate-100">{msg.author}</span>
                            <span className="text-xs text-slate-400">{msg.time}</span>
                          </div>
                          <p className="mt-2 text-slate-300">{msg.message}</p>
                        </div>
                      ))}
                      <p className="text-xs text-slate-500">Mensagens são registradas automaticamente na linha do tempo clínica.</p>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              <Card className="border border-slate-800 bg-slate-900/70">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base font-semibold text-slate-100">
                    <Sparkles className="h-5 w-5 text-emerald-300" />
                    Linha do tempo inteligente
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-56">
                  <ScrollArea className="h-full pr-3">
                    <div className="space-y-4 text-sm">
                      {careTimeline.map((event) => (
                        <div key={event.title} className="rounded-lg border border-slate-800 bg-slate-950/80 p-3">
                          <div className="flex items-center justify-between text-xs text-slate-400">
                            <span>{event.time}</span>
                            <Badge
                              variant="outline"
                              className={`border ${
                                event.status === 'alerta'
                                  ? 'border-amber-400/60 text-amber-200'
                                  : event.status === 'pendente'
                                  ? 'border-rose-400/60 text-rose-200'
                                  : 'border-slate-600 text-slate-200'
                              }`}
                            >
                              {event.status === 'alerta'
                                ? 'Alerta'
                                : event.status === 'pendente'
                                ? 'Pendência'
                                : 'Atualização'}
                            </Badge>
                          </div>
                          <h4 className="mt-2 text-sm font-semibold text-slate-100">{event.title}</h4>
                          <p className="mt-1 text-slate-300">{event.detail}</p>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="flex flex-col gap-6 overflow-hidden">
            <Card className="border border-slate-800 bg-slate-900/70">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base font-semibold text-slate-100">
                  <Users className="h-5 w-5 text-cyan-300" />
                  Dados do paciente
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border border-slate-800 bg-slate-950/70 p-3 text-xs text-slate-300">
                  <div className="flex items-center justify-between">
                    <span>Última consulta presencial</span>
                    <Badge variant="outline" className="border-blue-500/40 text-blue-300">12/09/2024</Badge>
                  </div>
                  <p className="mt-2 text-xs text-slate-400">{clinicalSummary.lastAppointment}</p>
                </div>
                <div className="grid grid-cols-1 gap-3 text-sm">
                  {vitals.map((vital) => (
                    <div key={vital.label} className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950/70 p-3">
                      <div className="flex items-center gap-2 text-slate-200">
                        <span className="rounded bg-slate-800 p-1">{vital.icon}</span>
                        <div>
                          <p className="text-xs uppercase tracking-wide text-slate-400">{vital.label}</p>
                          <p className="text-sm font-semibold text-white">{vital.value}</p>
                        </div>
                      </div>
                      <span className="text-xs text-emerald-300">{vital.variation}</span>
                    </div>
                  ))}
                </div>
                <div className="rounded-lg border border-slate-800 bg-slate-950/70 p-3 text-xs text-slate-300">
                  <p className="mb-2 font-semibold text-slate-200">Diagnósticos ativos</p>
                  <ul className="space-y-1 text-slate-400">
                    {clinicalSummary.diagnoses.map((diag) => (
                      <li key={diag} className="flex items-center gap-2">
                        <Stethoscope className="h-3.5 w-3.5 text-emerald-300" />
                        {diag}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="flex flex-1 flex-col border border-slate-800 bg-slate-900/70">
              <Tabs
                value={activeTab}
                onValueChange={(value) => setActiveTab(value as typeof activeTab)}
                className="flex flex-1 flex-col"
              >
                <CardHeader className="pb-0">
                  <TabsList className="grid w-full grid-cols-2 bg-slate-800/60">
                    <TabsTrigger value="summary" className="data-[state=active]:bg-slate-900/90">
                      Resumo clínico
                    </TabsTrigger>
                    <TabsTrigger value="insights" className="data-[state=active]:bg-slate-900/90">
                      Insights de IA
                    </TabsTrigger>
                  </TabsList>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col overflow-hidden pt-4">
                  <TabsContent value="summary" className="h-full">
                    <ScrollArea className="h-full pr-3">
                      <div className="space-y-4 text-sm text-slate-200">
                        <div className="rounded-lg border border-slate-800 bg-slate-950/70 p-3">
                          <h4 className="flex items-center gap-2 text-sm font-semibold text-slate-100">
                            <FileText className="h-4 w-4 text-blue-300" />
                            Medicações em uso
                          </h4>
                          <ul className="mt-3 space-y-2 text-xs text-slate-300">
                            {clinicalSummary.medications.map((med) => (
                              <li key={med.name} className="flex items-center justify-between rounded-md border border-slate-800 bg-slate-950/70 px-3 py-2">
                                <div>
                                  <p className="font-semibold text-slate-100">{med.name}</p>
                                  <p className="text-[11px] uppercase tracking-wide text-slate-400">{med.schedule}</p>
                                </div>
                                <Badge variant="outline" className="border-emerald-500/40 text-emerald-300">Adesão {med.adherence}</Badge>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="rounded-lg border border-slate-800 bg-slate-950/70 p-3 text-xs text-slate-300">
                          <p className="font-semibold text-slate-200">Alergias</p>
                          <p className="mt-1 text-slate-400">{clinicalSummary.allergies.join(', ')}</p>
                        </div>
                      </div>
                    </ScrollArea>
                  </TabsContent>

                  <TabsContent value="insights" className="h-full">
                    <ScrollArea className="h-full pr-3">
                      <div className="space-y-4 text-sm text-slate-200">
                        {aiInsights.map((insight) => (
                          <div key={insight.title} className="rounded-lg border border-emerald-700/40 bg-emerald-500/5 p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Brain className="h-4 w-4 text-emerald-300" />
                                <h4 className="text-sm font-semibold text-emerald-100">{insight.title}</h4>
                              </div>
                              <div className="flex items-center gap-2 text-xs text-emerald-200">
                                <span>Confiança IA</span>
                                <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-100">
                                  {insight.score}%
                                </Badge>
                              </div>
                            </div>
                            <p className="mt-2 text-xs text-emerald-100/90">{insight.description}</p>
                            <div className="mt-3 space-y-2 text-xs text-emerald-100/90">
                              <p className="font-semibold uppercase tracking-wide text-emerald-200">Fatores-chave</p>
                              <ul className="grid list-disc gap-1 pl-5">
                                {insight.factors.map((factor) => (
                                  <li key={factor}>{factor}</li>
                                ))}
                              </ul>
                            </div>
                            <div className="mt-4 space-y-2 text-xs text-emerald-100/90">
                              <p className="font-semibold uppercase tracking-wide text-emerald-200">Próximas ações sugeridas</p>
                              <ul className="grid list-disc gap-1 pl-5">
                                {insight.actions.map((action) => (
                                  <li key={action}>{action}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        ))}
                        <div className="rounded-lg border border-emerald-700/30 bg-slate-950/80 p-4 text-xs text-emerald-100/80">
                          <p className="font-semibold text-emerald-200">Compliance LGPD</p>
                          <p className="mt-1">Insights gerados a partir de dados anonimizados com consentimento ativo do paciente.</p>
                        </div>
                      </div>
                    </ScrollArea>
                  </TabsContent>
                </CardContent>
              </Tabs>
            </Card>

            <Card className="border border-slate-800 bg-slate-900/70">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base font-semibold text-slate-100">
                  <AlertTriangle className="h-5 w-5 text-amber-300" />
                  Indicadores críticos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-400">Risco cardiovascular</p>
                  <Progress value={82} className="mt-2 h-2 bg-slate-800" />
                  <span className="mt-1 block text-xs text-amber-300">82% • ação imediata recomendada</span>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-400">Adesão terapêutica</p>
                  <Progress value={68} className="mt-2 h-2 bg-slate-800" />
                  <span className="mt-1 block text-xs text-slate-300">Meta: ≥ 85% até 30 dias</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TelemedicineModal;
