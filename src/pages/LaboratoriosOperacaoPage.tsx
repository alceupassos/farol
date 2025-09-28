import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  ArrowRight,
  CheckSquare,
  ClipboardList,
  Droplet,
  Filter,
  Flag,
  MapPin,
  RefreshCw,
  ShieldAlert,
  Snowflake,
  Truck,
} from 'lucide-react';

const lotes = [
  {
    id: 'LT-48291',
    amostras: 64,
    status: 'Recebido',
    prioridade: 'STAT',
    cadeiaFrio: 'OK',
    horario: '07:45',
    rota: 'Zona Sul',
  },
  {
    id: 'LT-48292',
    amostras: 48,
    status: 'Triagem',
    prioridade: 'Risco clínico',
    cadeiaFrio: 'Monitorar',
    horario: '08:20',
    rota: 'Centro',
  },
  {
    id: 'LT-48293',
    amostras: 96,
    status: 'Processo',
    prioridade: 'Roteiro padrão',
    cadeiaFrio: 'OK',
    horario: '08:50',
    rota: 'Litoral',
  },
  {
    id: 'LT-48294',
    amostras: 32,
    status: 'Revisão',
    prioridade: 'Repetição técnica',
    cadeiaFrio: 'Alerta',
    horario: '09:10',
    rota: 'Zona Norte',
  },
];

const LaboratoriosOperacaoPage = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <header className="space-y-3">
          <Badge variant="outline" className="bg-emerald-500/10 text-emerald-300 border-emerald-500/30">Operação</Badge>
          <h1 className="text-3xl font-bold">Coleta, logística e cadeia de custódia</h1>
          <p className="text-slate-400 max-w-3xl">
            Planeje rotas, acompanhe lotes e monitore prioridades em tempo real. Cada etapa da operação — do agendamento ao processamento — traz checklists, rastreabilidade e alertas ativos.
          </p>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6" aria-label="Áreas operacionais">
          <div id="coleta-logistica">
            <Card className="bg-slate-900/70 border-slate-800/60">
              <CardHeader>
                <CardTitle>Coleta & Logística</CardTitle>
                <CardDescription>Agenda diária, rotas e cadeia fria</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <Truck className="h-5 w-5 text-emerald-400" />
                  <div>
                    <p className="font-medium text-slate-100">Rotas dinâmicas com SLA</p>
                    <p className="text-slate-400">12 rotas ativas · janela média 45 minutos · ajuste automático via geofencing.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Snowflake className="h-5 w-5 text-sky-400" />
                  <div>
                    <p className="font-medium text-slate-100">Cadeia de frio monitorada</p>
                    <p className="text-slate-400">Sensores BLE · alertas em tempo real · laudo automático do logger anexado ao lote.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <ClipboardList className="h-5 w-5 text-amber-400" />
                  <div>
                    <p className="font-medium text-slate-100">Checklists por lote</p>
                    <p className="text-slate-400">Checklist inteligente com validação de tubos, volume mínimo e documentação de transporte.</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/10">
                  Mapear nova rota
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>

          <div id="amostras-lotes">
            <Card className="bg-slate-900/70 border-slate-800/60">
              <CardHeader>
                <CardTitle>Amostras & Lotes</CardTitle>
                <CardDescription>Recebimento, chain of custody e rejeições</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <CheckSquare className="h-5 w-5 text-emerald-400" />
                  <div>
                    <p className="font-medium text-slate-100">Recebimento omnichannel</p>
                    <p className="text-slate-400">Lab-to-lab, hospitais e parceiros privados com barcode, QR ou DICOM manifest.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Flag className="h-5 w-5 text-rose-400" />
                  <div>
                    <p className="font-medium text-slate-100">Chain of custody completo</p>
                    <p className="text-slate-400">Assinaturas digitais, evidências fotográficas e GPS. Exportação para auditorias.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <ShieldAlert className="h-5 w-5 text-amber-400" />
                  <div>
                    <p className="font-medium text-slate-100">Rejeições tratadas</p>
                    <p className="text-slate-400">Fluxo guiado para hemólise, identificação, volume insuficiente e repetição técnica.</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="border-slate-700 text-slate-300 hover:bg-slate-800/60">
                  Registrar lote manualmente
                </Button>
              </CardContent>
            </Card>
          </div>

          <div id="triagem-prioridades">
            <Card className="bg-slate-900/70 border-slate-800/60">
              <CardHeader>
                <CardTitle>Triagem & Prioridades</CardTitle>
                <CardDescription>Blocagem inteligente por criticidade</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <Droplet className="h-5 w-5 text-sky-400" />
                  <div>
                    <p className="font-medium text-slate-100">Trilhas STAT e urgência</p>
                    <p className="text-slate-400">Alertas multi-canal quando o SLA de painéis críticos entra em risco.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <RefreshCw className="h-5 w-5 text-indigo-400" />
                  <div>
                    <p className="font-medium text-slate-100">Repetição técnica assistida</p>
                    <p className="text-slate-400">Workflow guiado para repetição automática com comparação pré e pós.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Filter className="h-5 w-5 text-emerald-400" />
                  <div>
                    <p className="font-medium text-slate-100">Filtro por SLA e impacto</p>
                    <p className="text-slate-400">Ordenação por risco clínico, origem e tempo restante de TAT.</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/10">
                  Configurar regras de prioridade
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="space-y-4" id="amostras-lotes-detalhes" aria-labelledby="amostras-lotes-heading">
          <div className="flex items-center justify-between">
            <div>
              <h2 id="amostras-lotes-heading" className="text-xl font-semibold">Amostras & Lotes</h2>
              <p className="text-sm text-slate-400">Filtro rápido por data, unidade remetente, rota logística e prioridade.</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="border-slate-700 text-slate-300">Hoje</Button>
              <Button variant="outline" size="sm" className="border-slate-700 text-slate-300">Últimos 7 dias</Button>
              <Button variant="outline" size="sm" className="border-emerald-500/30 text-emerald-300">Exportar CSV</Button>
            </div>
          </div>

          <Card className="bg-slate-900/70 border-slate-800/60">
            <CardHeader className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <CardTitle>Chain of custody</CardTitle>
                <CardDescription>Eventos registrados automaticamente por lote</CardDescription>
              </div>
              <Badge className="bg-emerald-500/10 text-emerald-300 border-emerald-400/30">Rastreamento ativo · 100% digital</Badge>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-800">
                    <TableHead>ID Lote</TableHead>
                    <TableHead>Qtd. amostras</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Prioridade</TableHead>
                    <TableHead>Cadeia de frio</TableHead>
                    <TableHead>Horário</TableHead>
                    <TableHead>Rota</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {lotes.map((lote) => (
                    <TableRow key={lote.id} className="border-slate-800/60 hover:bg-slate-800/40">
                      <TableCell className="font-mono text-xs text-emerald-200">{lote.id}</TableCell>
                      <TableCell>{lote.amostras}</TableCell>
                      <TableCell>
                        <Badge className="bg-slate-800/80 text-slate-200 border-slate-700">{lote.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={
                          lote.prioridade.includes('STAT')
                            ? 'bg-rose-500/10 text-rose-300 border-rose-400/40'
                            : lote.prioridade.includes('Repetição')
                            ? 'bg-amber-500/10 text-amber-300 border-amber-400/40'
                            : 'bg-sky-500/10 text-sky-300 border-sky-400/40'
                        }>
                          {lote.prioridade}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={
                          lote.cadeiaFrio === 'OK'
                            ? 'bg-emerald-500/10 text-emerald-300 border-emerald-400/40'
                            : lote.cadeiaFrio === 'Monitorar'
                            ? 'bg-amber-500/10 text-amber-300 border-amber-400/40'
                            : 'bg-rose-500/10 text-rose-300 border-rose-400/40'
                        }>
                          {lote.cadeiaFrio}
                        </Badge>
                      </TableCell>
                      <TableCell>{lote.horario}</TableCell>
                      <TableCell className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-slate-400" />
                        {lote.rota}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6" aria-label="Checklist e runbooks">
          <Card className="bg-slate-900/70 border-slate-800/60">
            <CardHeader>
              <CardTitle>Checklist inteligente por lote</CardTitle>
              <CardDescription>Auditoria em tempo real com geração de evidências</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              {[
                {
                  titulo: 'Captura de evidências',
                  descricao: 'Upload de fotos, assinatura digital e hash criptográfico anexado ao AuditEvent.',
                },
                {
                  titulo: 'Sensores vinculados',
                  descricao: 'Integração com loggers BLE e IoT com upload automático do relatório PDF.',
                },
                {
                  titulo: 'Relatórios instantâneos',
                  descricao: 'Exportação com carimbo de tempo para ANVISA, vigilância sanitária e parceiros privados.',
                },
              ].map((item) => (
                <div key={item.titulo} className="rounded-xl border border-slate-800/60 bg-slate-950/70 p-4">
                  <p className="text-slate-100 font-medium">{item.titulo}</p>
                  <p className="text-slate-400 text-xs mt-1">{item.descricao}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-slate-900/70 border-slate-800/60">
            <CardHeader>
              <CardTitle>Runbooks de operação</CardTitle>
              <CardDescription>Respostas rápidas para incidentes logísticos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <ShieldAlert className="h-5 w-5 text-rose-400" />
                <div>
                  <p className="font-medium text-slate-100">Temperatura fora da faixa</p>
                  <p className="text-slate-400">Acionamento automático do protocolo: pausar processamento, registrar evidências e notificar responsáveis.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <RefreshCw className="h-5 w-5 text-emerald-400" />
                <div>
                  <p className="font-medium text-slate-100">Reprogramar coleta</p>
                  <p className="text-slate-400">Agenda inteligente sugere melhor janela considerando SLA, rota e prioridade clínica.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-indigo-400" />
                <div>
                  <p className="font-medium text-slate-100">Desvio de rota</p>
                  <p className="text-slate-400">Alertas com geolocalização, sugestão de unidade backup e registro em AuditEvent.</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="border-rose-500/30 text-rose-300 hover:bg-rose-500/10">
                Abrir runbooks completos
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>
  );
};

export default LaboratoriosOperacaoPage;
