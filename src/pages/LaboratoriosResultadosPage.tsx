import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ActivitySquare,
  Bell,
  CheckCircle2,
  CloudUpload,
  FileText,
  Layers,
  MonitorPlay,
  Share2,
  ShieldCheck,
  Users,
} from 'lucide-react';

const filasValidacao = [
  {
    setor: 'Hematologia',
    pendentes: 8,
    tempoMedio: '23 min',
    deltaCritico: '2 casos',
    revisores: ['Dr. Paula', 'Dr. Vinícius'],
  },
  {
    setor: 'Imagem (DICOM)',
    pendentes: 5,
    tempoMedio: '42 min',
    deltaCritico: '1 estudo',
    revisores: ['Dr. Sofia'],
  },
  {
    setor: 'Genômica',
    pendentes: 3,
    tempoMedio: '6h 20',
    deltaCritico: 'Variação ACMG',
    revisores: ['Dra. Helena', 'Dr. Gustavo'],
  },
];

const destinosPublicacao = [
  { nome: 'Portal Médico', tipo: 'Push automático', status: 'Ativo', usuarios: '1.245 acessos/mês' },
  { nome: 'Portal Paciente', tipo: 'Release agendável', status: 'Sincronizado', usuarios: '98% app mobile' },
  { nome: 'RNDS', tipo: 'FHIR Bundle', status: 'Conectado', usuarios: '98% bundles aceitos' },
  { nome: 'Parceiros Privados', tipo: 'APIs / Portais', status: 'Parcial', usuarios: 'Fleury · Pardini · Dasa' },
];

const LaboratoriosResultadosPage = () => {
  return (
    <MainLayout>
      <div className="min-h-screen bg-slate-950 text-slate-100 px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <header className="space-y-3">
          <Badge variant="outline" className="bg-emerald-500/10 text-emerald-300 border-emerald-500/30">Resultados &amp; Laudos</Badge>
          <h1 className="text-3xl font-bold">Fila de validação, dupla checagem e publicação multicanal</h1>
          <p className="text-slate-400 max-w-3xl">
            Organize a fila por setor, garanta dupla checagem com checklist inteligente e publique laudos em múltiplos canais — RNDS, portais hospitalares, parceiros privados e apps de pacientes.
          </p>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 bg-slate-900/70 border-slate-800/60">
            <CardHeader>
              <CardTitle>Fila de validação por setor</CardTitle>
              <CardDescription>Priorize exames críticos, acompanhe delta check e sign-off duplo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {filasValidacao.map((fila) => (
                <div key={fila.setor} className="rounded-xl border border-slate-800/60 bg-slate-950/70 p-4">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-slate-100">{fila.setor}</p>
                      <p className="text-xs text-slate-400">Revisores: {fila.revisores.join(', ')}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs">
                      <Badge className="bg-emerald-500/10 text-emerald-300 border-emerald-400/30">{fila.pendentes} pendentes</Badge>
                      <Badge className="bg-sky-500/10 text-sky-300 border-sky-400/30">TAT médio {fila.tempoMedio}</Badge>
                      <Badge className="bg-amber-500/10 text-amber-300 border-amber-400/30">{fila.deltaCritico}</Badge>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-slate-900/70 border-slate-800/60">
            <CardHeader>
              <CardTitle>Checklist de qualidade</CardTitle>
              <CardDescription>Delta check, segundo sign-off e anexos clínicos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                <div>
                  <p className="font-medium text-slate-100">Dupla checagem configurável</p>
                  <p className="text-slate-400">Sign-off obrigatório por biomédico + especialista. Registro criptografado e carimbo ICP-Brasil.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ActivitySquare className="h-5 w-5 text-amber-400" />
                <div>
                  <p className="font-medium text-slate-100">Delta check automático</p>
                  <p className="text-slate-400">Comparação histórica por paciente e biomarcador. Alertas contextuais com justificativa obrigatória.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Layers className="h-5 w-5 text-indigo-400" />
                <div>
                  <p className="font-medium text-slate-100">Anexos multi-formato</p>
                  <p className="text-slate-400">PDF, DICOM, JSON FHIR, VCF (genômica) com viewer embutido e link seguro.</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/10">
                Abrir checklist padrão CAP/ISO
              </Button>
            </CardContent>
          </Card>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-slate-900/70 border-slate-800/60">
            <CardHeader className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <CardTitle>Publicação multicanal</CardTitle>
                <CardDescription>Portais médicos, pacientes, RNDS e parceiros privados</CardDescription>
              </div>
              <Badge className="bg-emerald-500/10 text-emerald-300 border-emerald-400/30">Automação 100%</Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              {destinosPublicacao.map((destino) => (
                <div key={destino.nome} className="rounded-xl border border-slate-800/60 bg-slate-950/70 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-slate-100">{destino.nome}</p>
                      <p className="text-xs text-slate-400">{destino.tipo} · {destino.usuarios}</p>
                    </div>
                    <Badge className={
                      destino.status === 'Ativo'
                        ? 'bg-emerald-500/10 text-emerald-300 border-emerald-400/30'
                        : destino.status === 'Sincronizado'
                        ? 'bg-sky-500/10 text-sky-300 border-sky-400/30'
                        : 'bg-amber-500/10 text-amber-300 border-amber-400/30'
                    }>
                      {destino.status}
                    </Badge>
                  </div>
                </div>
              ))}
              <Button variant="outline" size="sm" className="border-sky-500/30 text-sky-300 hover:bg-sky-500/10">
                Configurar destinos avançados
                <Share2 className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/70 border-slate-800/60">
            <CardHeader>
              <CardTitle>Histórico &amp; comparativos</CardTitle>
              <CardDescription>Tendências por paciente, órgão ou biomarcador</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="rounded-xl border border-slate-800/60 bg-slate-950/70 p-4">
                <p className="text-slate-100 font-medium">Linha do tempo individual</p>
                <p className="text-slate-400 text-xs mt-1">Comparativos automáticos por paciente com alertas de variação crítica.</p>
              </div>
              <div className="rounded-xl border border-slate-800/60 bg-slate-950/70 p-4">
                <p className="text-slate-100 font-medium">Painel por órgão/sistema</p>
                <p className="text-slate-400 text-xs mt-1">Dashboards customizáveis para patologias cardiometabólicas, hematológicas e oncológicas.</p>
              </div>
              <div className="rounded-xl border border-slate-800/60 bg-slate-950/70 p-4">
                <p className="text-slate-100 font-medium">Genômica avançada</p>
                <p className="text-slate-400 text-xs mt-1">Cruze variantes ACMG, classificações ClinVar e consentimentos vinculados a painéis NGS.</p>
              </div>
              <Button variant="outline" size="sm" className="border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/10">
                Abrir comparativo longitudinal
              </Button>
            </CardContent>
          </Card>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-slate-900/70 border-slate-800/60">
            <CardHeader>
              <CardTitle>Alertas e notificações</CardTitle>
              <CardDescription>Push dinâmico para equipes clínicas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <Bell className="h-5 w-5 text-amber-400" />
                <div>
                  <p className="font-medium text-slate-100">Alertas clínicos</p>
                  <p className="text-slate-400">Notificações instantâneas sobre laudos críticos, delta check pendente e reprocessamentos.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CloudUpload className="h-5 w-5 text-emerald-400" />
                <div>
                  <p className="font-medium text-slate-100">Auto-publish</p>
                  <p className="text-slate-400">Republique automaticamente após correções ou reprocessamentos aprovados.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-sky-400" />
                <div>
                  <p className="font-medium text-slate-100">Jornadas colaborativas</p>
                  <p className="text-slate-400">Comentários, anexos e trilha de auditoria em cada laudo com controle de acesso.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/70 border-slate-800/60">
            <CardHeader>
              <CardTitle>Auditoria &amp; segurança</CardTitle>
              <CardDescription>LGPD, RNDS e evidências digitais</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <ShieldCheck className="h-5 w-5 text-emerald-400" />
                <div>
                  <p className="font-medium text-slate-100">AuditEvent FHIR</p>
                  <p className="text-slate-400">Registro completo de quem acessou, exportou ou redistribuiu cada laudo.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MonitorPlay className="h-5 w-5 text-indigo-400" />
                <div>
                  <p className="font-medium text-slate-100">Viewer seguro</p>
                  <p className="text-slate-400">DICOM web viewer com deep link expira automaticamente e logs de acesso granulares.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-amber-400" />
                <div>
                  <p className="font-medium text-slate-100">Evidence pack</p>
                  <p className="text-slate-400">Exportação consolidada (PDF + hash + consentimentos) para inspeções e acreditações.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </MainLayout>
  );
};

export default LaboratoriosResultadosPage;
