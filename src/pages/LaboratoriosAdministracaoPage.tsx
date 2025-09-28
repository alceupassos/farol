import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  CheckSquare,
  FileSignature,
  KeyRound,
  Layers,
  LockKeyhole,
  Settings2,
  Shield,
  Users,
} from 'lucide-react';

const perfisPermissoes = [
  { perfil: 'Gestor', escopo: 'Administração completa do hub, integrações, compliance, KPIs.' },
  { perfil: 'Bioquímico', escopo: 'Validação de laudos, triagem, controle de qualidade.' },
  { perfil: 'Patologista / Radiologista', escopo: 'Assinatura digital e publicação de laudos especializados.' },
  { perfil: 'Geneticista', escopo: 'Validação de relatórios genômicos, gestão de consentimentos.' },
  { perfil: 'TI / Integrações', escopo: 'Gerenciamento de conectores, credenciais, monitoramento SRE.' },
  { perfil: 'Auditoria', escopo: 'Acesso somente leitura a logs, Runbooks e evidence packs.' },
];

const templatesLaudo = [
  {
    nome: 'Análises clínicas — padrão CAP',
    detalhe: 'Cabeçalho com ICP-Brasil, laudo estruturado com ranges e comentários clínicos.',
  },
  {
    nome: 'Imagem (DICOM)',
    detalhe: 'Integração com PACS · laudo narrativo + anexos DICOMweb + deep links seguros.',
  },
  {
    nome: 'Genômica (NGS / CGP)',
    detalhe: 'Relatório estruturado com genes, variantes HGVS, ACMG, VCF anexado.',
  },
];

const chavesCertificados = [
  {
    titulo: 'ICP-Brasil (e-CNPJ / e-CPF)',
    descricao: 'Armazenamento em HSM/KMS · alerta de expiração D-30 / D-7 / D-1 · rotação automática.',
  },
  {
    titulo: 'JWT RNDS',
    descricao: 'Scopes dedicados, expiração curta, refresh seguro, métricas de latência e erros.',
  },
  {
    titulo: 'Credenciais parceiros',
    descricao: 'Cofre com least privilege, segregação por ambiente (homolog / produção) e logs de acesso.',
  },
];

const LaboratoriosAdministracaoPage = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <header className="space-y-3">
          <Badge variant="outline" className="bg-emerald-500/10 text-emerald-300 border-emerald-500/30">Administração</Badge>
          <h1 className="text-3xl font-bold">Perfis, templates e credenciais seguras</h1>
          <p className="text-slate-400 max-w-4xl">
            Configure RBAC detalhado, padronize templates de laudo e gerencie chaves e certificados com controle de acesso, rotação e alertas de segurança.
          </p>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-slate-900/70 border-slate-800/60">
            <CardHeader>
              <CardTitle>Perfis &amp; Permissões</CardTitle>
              <CardDescription>RBAC com granularidade por página e ação</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              {perfisPermissoes.map((perfil) => (
                <div key={perfil.perfil} className="rounded-xl border border-slate-800/60 bg-slate-950/70 p-4">
                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-emerald-400" />
                    <div>
                      <p className="text-slate-100 font-medium">{perfil.perfil}</p>
                      <p className="text-slate-400 text-xs mt-1">{perfil.escopo}</p>
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" size="sm" className="border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/10">
                Configurar matriz RBAC
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/70 border-slate-800/60">
            <CardHeader>
              <CardTitle>Templates de laudo</CardTitle>
              <CardDescription>Padronização, assinatura digital e trilha de publicação</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              {templatesLaudo.map((template) => (
                <div key={template.nome} className="rounded-xl border border-slate-800/60 bg-slate-950/70 p-4">
                  <div className="flex items-start gap-3">
                    <FileSignature className="h-5 w-5 text-sky-400" />
                    <div>
                      <p className="text-slate-100 font-medium">{template.nome}</p>
                      <p className="text-slate-400 text-xs mt-1">{template.detalhe}</p>
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" size="sm" className="border-sky-500/30 text-sky-300 hover:bg-sky-500/10">
                Gerenciar templates
              </Button>
            </CardContent>
          </Card>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-slate-900/70 border-slate-800/60">
            <CardHeader>
              <CardTitle>Chaves &amp; certificados</CardTitle>
              <CardDescription>Segurança, rotação e auditoria</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              {chavesCertificados.map((item) => (
                <div key={item.titulo} className="rounded-xl border border-slate-800/60 bg-slate-950/70 p-4">
                  <div className="flex items-start gap-3">
                    <KeyRound className="h-5 w-5 text-amber-400" />
                    <div>
                      <p className="text-slate-100 font-medium">{item.titulo}</p>
                      <p className="text-slate-400 text-xs mt-1">{item.descricao}</p>
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" size="sm" className="border-amber-500/30 text-amber-300 hover:bg-amber-500/10">
                Abrir cofre de credenciais
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/70 border-slate-800/60">
            <CardHeader>
              <CardTitle>Governança operacional</CardTitle>
              <CardDescription>Runbooks, monitoramento e Definition of Done</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <CheckSquare className="h-5 w-5 text-emerald-400" />
                <div>
                  <p className="font-medium text-slate-100">Definition of Done do módulo</p>
                  <p className="text-slate-400">Menus entregues, bundles RNDS homologados, integrações privadas ativadas e dashboards operacionais ativos.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-indigo-400" />
                <div>
                  <p className="font-medium text-slate-100">Monitoramento SRE</p>
                  <p className="text-slate-400">Métricas `integration_request_count`, latency p95, error rate, certificados e JWT.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Settings2 className="h-5 w-5 text-slate-300" />
                <div>
                  <p className="font-medium text-slate-100">Playbooks de release &amp; migração</p>
                  <p className="text-slate-400">Fases de rollout (RNDS → privados → hospitais → genômica) com dual-write e cut-over controlado.</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/10">
                Abrir playbooks
              </Button>
            </CardContent>
          </Card>
        </section>

        <footer className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <LockKeyhole className="h-4 w-4 text-emerald-400" />
            <span>Armazenamento seguro (HSM/KMS) com rotação automática.</span>
          </div>
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-sky-400" />
            <span>Templates versionados com histórico completo.</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-amber-400" />
            <span>Runbooks de segurança integrados ao monitoramento.</span>
          </div>
        </footer>
      </div>
  );
};

export default LaboratoriosAdministracaoPage;
