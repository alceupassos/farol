import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  AlertTriangle,
  FileLock,
  FileSignature,
  Gavel,
  Lock,
  Scale,
  ShieldCheck,
  ShieldHalf,
  Target,
  UserCheck,
} from 'lucide-react';

const lgpdBasesLegais = [
  {
    titulo: 'Execução de contrato e tutela da saúde',
    detalhe: 'Processamento essencial para prestação de serviços laboratoriais e continuidade assistencial.',
  },
  {
    titulo: 'Consentimento granular',
    detalhe: 'Consentimentos por propósito (diagnóstico, compartilhamento com terceiros, genômica).',
  },
  {
    titulo: 'Anonimização e pseudonimização',
    detalhe: 'Rotinas automáticas para uso secundário de dados (analytics, pesquisa) com registros AuditEvent.',
  },
];

const auditoriasRnds = [
  {
    nome: 'Validador de perfis',
    descricao: 'Execução automática contra guias nacionais, com relatório por recurso (Observation, DiagnosticReport, Bundle).',
  },
  {
    nome: 'Índice de conformidade',
    descricao: 'Score consolidado por perfil (FHIR R4) com metas e benchmarking nacional.',
  },
  {
    nome: 'Auto-fix sugerido',
    descricao: 'Correções guiadas para mapeamentos LOINC/SNOMED/UCUM e ajustes de Bundles.',
  },
];

const regulatorio = [
  {
    titulo: 'Rastreio de não conformidades',
    descricao: 'Registro estruturado (CAPA), evidências anexadas e prazos monitorados.',
  },
  {
    titulo: 'Documentação de versões',
    descricao: 'Versionamento de protocolos, POPs e laudos com histórico completo.',
  },
  {
    titulo: 'Matriz de risco',
    descricao: 'Probabilidade x impacto por conector · plano de contingência vinculado.',
  },
];

const LaboratoriosQualidadePage = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <header className="space-y-3">
          <Badge variant="outline" className="bg-emerald-500/10 text-emerald-300 border-emerald-500/30">Qualidade &amp; Compliance</Badge>
          <h1 className="text-3xl font-bold">LGPD, RNDS e governança regulatória</h1>
          <p className="text-slate-400 max-w-4xl">
            Controle total da base legal, auditorias RNDS, runbooks regulatórios e evidências para inspeções. Configure matrizes de risco, CAPA e trilhas de auditoria com exportação instantânea.
          </p>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="bg-slate-900/70 border-slate-800/60">
            <CardHeader>
              <CardTitle>LGPD — Governança de dados</CardTitle>
              <CardDescription>Bases legais, consentimentos e retenção</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              {lgpdBasesLegais.map((item) => (
                <div key={item.titulo} className="rounded-xl border border-slate-800/60 bg-slate-950/70 p-4">
                  <div className="flex items-start gap-3">
                    <Lock className="h-5 w-5 text-emerald-400" />
                    <div>
                      <p className="text-slate-100 font-medium">{item.titulo}</p>
                      <p className="text-slate-400 text-xs mt-1">{item.detalhe}</p>
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" size="sm" className="border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/10">
                Abrir painel de consentimento
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/70 border-slate-800/60">
            <CardHeader>
              <CardTitle>Auditoria RNDS</CardTitle>
              <CardDescription>Bundles FHIR, conformidade e auto-correção</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              {auditoriasRnds.map((item) => (
                <div key={item.nome} className="rounded-xl border border-slate-800/60 bg-slate-950/70 p-4">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="h-5 w-5 text-sky-400" />
                    <div>
                      <p className="text-slate-100 font-medium">{item.nome}</p>
                      <p className="text-slate-400 text-xs mt-1">{item.descricao}</p>
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" size="sm" className="border-sky-500/30 text-sky-300 hover:bg-sky-500/10">
                Validar Bundle agora
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/70 border-slate-800/60">
            <CardHeader>
              <CardTitle>Regulatórios &amp; inspeções</CardTitle>
              <CardDescription>CAPA, documentação e evidências</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              {regulatorio.map((item) => (
                <div key={item.titulo} className="rounded-xl border border-slate-800/60 bg-slate-950/70 p-4">
                  <div className="flex items-start gap-3">
                    <Gavel className="h-5 w-5 text-amber-400" />
                    <div>
                      <p className="text-slate-100 font-medium">{item.titulo}</p>
                      <p className="text-slate-400 text-xs mt-1">{item.descricao}</p>
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" size="sm" className="border-amber-500/30 text-amber-300 hover:bg-amber-500/10">
                Abrir matriz de risco
              </Button>
            </CardContent>
          </Card>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-slate-900/70 border-slate-800/60">
            <CardHeader>
              <CardTitle>Logs &amp; auditoria técnica</CardTitle>
              <CardDescription>AuditEvent, hash dos pacotes e evidence packs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <FileLock className="h-5 w-5 text-indigo-400" />
                <div>
                  <p className="font-medium text-slate-100">Trilhas imutáveis</p>
                  <p className="text-slate-400">AuditEvent com quem, o quê, quando, propósito e origem (IP, user agent, app).</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FileSignature className="h-5 w-5 text-emerald-400" />
                <div>
                  <p className="font-medium text-slate-100">Evidence pack</p>
                  <p className="text-slate-400">Exportação automática (PDF + hash + logs) para inspeções ANVISA, VISA, acreditações.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-400" />
                <div>
                  <p className="font-medium text-slate-100">Alertas críticos</p>
                  <p className="text-slate-400">Expiração de certificado, falhas de assinatura digital, divergências de bundle.</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/10">
                Exportar evidence pack
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/70 border-slate-800/60">
            <CardHeader>
              <CardTitle>Governança e risco</CardTitle>
              <CardDescription>Matriz de risco, runbooks e auditoria contínua</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <Target className="h-5 w-5 text-rose-400" />
                <div>
                  <p className="font-medium text-slate-100">Risk scoring por conector</p>
                  <p className="text-slate-400">Avaliação probabilidade x impacto com plano de contingência vinculado.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ShieldHalf className="h-5 w-5 text-slate-300" />
                <div>
                  <p className="font-medium text-slate-100">Runbooks SRE</p>
                  <p className="text-slate-400">Planos de resposta para falhas RNDS, bundles inválidos, portais offline.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Scale className="h-5 w-5 text-emerald-400" />
                <div>
                  <p className="font-medium text-slate-100">Conformidade contínua</p>
                  <p className="text-slate-400">Monitoramento de SLAs e políticas de retenção com alertas de vencimento.</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="border-rose-500/30 text-rose-300 hover:bg-rose-500/10">
                Abrir runbooks de compliance
              </Button>
            </CardContent>
          </Card>
        </section>

        <footer className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <UserCheck className="h-4 w-4 text-emerald-400" />
            <span>RBAC aplicado por página, ação e integração.</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-sky-400" />
            <span>ICP-Brasil monitorado com alertas D-30, D-7 e D-1.</span>
          </div>
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-amber-400" />
            <span>Planos de contingência testados trimestralmente.</span>
          </div>
        </footer>
      </div>
  );
};

export default LaboratoriosQualidadePage;
