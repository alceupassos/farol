import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import {
  Activity,
  BookOpen,
  CheckCircle,
  ClipboardSignature,
  CloudLightning,
  Globe2,
  Link2,
  Network,
  ShieldCheck,
  Workflow,
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface IntegracaoCard {
  nome: string;
  descricao: string;
  requisitos: string[];
  ambientes: string;
  passos: string[];
  kpis: string[];
  status: 'Conectado' | 'Parcial' | 'Pendente';
  acoes: string[];
  slug: string;
}

const publicos: IntegracaoCard[] = [
  {
    nome: 'RNDS (FHIR/REST)',
    descricao: 'Camada nacional de interoperabilidade (HL7 FHIR R4) para envio e conciliação de resultados.',
    requisitos: ['Credenciamento DATASUS', 'Certificado ICP-Brasil (e-CNPJ/e-CPF)', 'JWT client_credentials'],
    ambientes: 'Homologação · Produção (por UF)',
    passos: [
      'Montar Bundle R4 com Observation + DiagnosticReport + referências',
      'Validar perfis nacionais (validador interno)',
      'Assinar, tokenizar e enviar via POST',
      'Registrar retorno, erros e reprocessar quando necessário',
    ],
    kpis: ['Taxa de aceitação >= 98%', 'Latência < 3s', 'Erros < 0,5%/dia', 'Bundles válidos por perfil'],
    status: 'Conectado',
    acoes: ['Conectar RNDS', 'Validar Bundle', 'Monitor de Erros', 'Exportar Logs'],
    slug: 'rnds',
  },
  {
    nome: 'GAL/LACEN',
    descricao: 'Integração com sistemas estaduais para laboratórios públicos e vigilância sanitária.',
    requisitos: ['Credenciais estaduais', 'Procedimentos operacionais específicos', 'Fluxo homologado por instância'],
    ambientes: 'Portais estaduais (manual assistido)',
    passos: [
      'Configurar acesso por instância',
      'Importar planilhas/relatórios oficiais',
      'Conciliar dados e registrar evidências',
      'Manter trilhas de auditoria e SLA de lançamento',
    ],
    kpis: ['Tempo de lançamento por LACEN', 'Pendências por instância', 'Reconciliação semanal'],
    status: 'Parcial',
    acoes: ['Configurar Acesso', 'Importar Arquivo', 'Registrar Evidências'],
    slug: 'gal-lacen',
  },
];

const hospitais: IntegracaoCard[] = [
  {
    nome: 'Hospitais & Redes (Einstein · Sírio · Rede D’Or · BP · HCor · Moinhos · HCFMUSP)',
    descricao: 'Integração B2B para publicação e consulta de laudos em portais/apps hospitalares.',
    requisitos: ['Parceria institucional', 'Credenciais corporativas', 'Mapeamento de agendamento e publicação'],
    ambientes: 'Ambiente institucional + RNDS como backbone',
    passos: [
      'Solicitar parceria e provisionar contas',
      'Configurar destinos (PDF/DICOM/links seguros)',
      'Testar publicação (push/pull)',
      'Auditar acessos e consentimentos',
    ],
    kpis: ['Tempo de publicação hospitalar', 'Acessos por médico/unidade', 'Falhas de sincronização'],
    status: 'Parcial',
    acoes: ['Solicitar Parceria', 'Configurar Contas', 'Teste de Publicação', 'Auditar Acessos'],
    slug: 'hospitais',
  },
];

const laboratoriosPrivados: IntegracaoCard[] = [
  {
    nome: 'Grupo Fleury (Portal Dev)',
    descricao: 'APIs e SDKs com ambiente sandbox para troca de resultados e estudos.',
    requisitos: ['Cadastro de aplicativos', 'Credenciais OAuth', 'Contrato B2B'],
    ambientes: 'Sandbox · Produção',
    passos: ['Registrar app no portal dev', 'Obter client_id/secret', 'Testar sandbox', 'Monitorar produção'],
    kpis: ['Disponibilidade API', 'Sucesso das chamadas', 'Tempo de resposta'],
    status: 'Conectado',
    acoes: ['Conectar via Portal Dev', 'Teste Sandbox', 'Monitor de Erros'],
    slug: 'fleury',
  },
  {
    nome: 'Hermes Pardini (Apoio)',
    descricao: 'Integração para consultas e retorno de resultados em modelo apoio laboratorial.',
    requisitos: ['Credenciais de apoio', 'Documentação técnica', 'Plano de cooperação'],
    ambientes: 'Portal apoio · Integração programática',
    passos: ['Configurar credenciais', 'Sincronizar períodos', 'Realizar reconciliação automática'],
    kpis: ['Tempo de retorno', 'Taxa de lotes conciliados'],
    status: 'Conectado',
    acoes: ['Configurar Apoio', 'Sincronizar Períodos', 'Exportar Relatórios'],
    slug: 'hermes-pardini',
  },
  {
    nome: 'Dasa (Nav / Nav Pro)',
    descricao: 'Publicação espelhada em apps e portais com automações e notificações.',
    requisitos: ['Fluxos via credenciais CPF/CIP', 'Parceria técnica', 'Mapeamento de automações'],
    ambientes: 'Portais Nav/Nav Pro · APIs dedicadas',
    passos: ['Vincular contas', 'Configurar automações de publicação', 'Solicitar parceria técnica'],
    kpis: ['Taxa de engajamento', 'Tempo de espelhamento', 'Cobertura de linhas de exame'],
    status: 'Parcial',
    acoes: ['Vincular Contas', 'Automação de Publicação', 'Solicitar Parceria Técnica'],
    slug: 'dasa-nav',
  },
  {
    nome: 'Sabin (Portal/LIS)',
    descricao: 'Portal web e apps com ingestão de PDFs/links para clientes e médicos.',
    requisitos: ['Credenciais portal', 'Automação de coleta de laudos', 'Políticas de reconciliação'],
    ambientes: 'Portal Sabin · APIs complementares',
    passos: ['Conectar portal', 'Agendar coleta de laudos', 'Monitorar integridade'],
    kpis: ['Sucesso de download', 'Integridade de laudos', 'Taxa de reconciliação'],
    status: 'Pendente',
    acoes: ['Conectar Portal', 'Agendar Coletas', 'Monitorar Integridade'],
    slug: 'sabin',
  },
  {
    nome: 'Imagem (CDPI / Alta)',
    descricao: 'Portais de resultados DICOM com deep links e protocolos vinculados.',
    requisitos: ['Contas institucionais', 'Tokens de sessão', 'Protocolo DICOM linkado'],
    ambientes: 'Portais CDPI/Alta · DICOMweb',
    passos: ['Vincular unidade/protocolo', 'Testar deep links', 'Auditar acessos médicos'],
    kpis: ['Visualizações por estudo', 'Sucesso de deep links', 'Tempo de liberação'],
    status: 'Parcial',
    acoes: ['Vincular Unidade', 'Teste de Deep Links', 'Auditar Acessos Médicos'],
    slug: 'imagem-cdpi-alta',
  },
  {
    nome: 'Genômica (Dasa · Fleury · Mendelics · GeneOne)',
    descricao: 'Integrações para painéis NGS/CGP com ingestão de relatórios estruturados e VCFs.',
    requisitos: ['NDA e credenciais dedicadas', 'Ambientes dev (quando disponíveis)', 'Política de consentimentos'],
    ambientes: 'Portais genômicos · APIs sob NDA',
    passos: ['Solicitar NDA/parceria', 'Configurar portais', 'Validar metadados genômicos'],
    kpis: ['TAT genômico', 'Integridade de metadados', 'Rastreio de consentimentos'],
    status: 'Pendente',
    acoes: ['Solicitar NDA/Parceria', 'Configurar Portais', 'Validar Metadados Genômicos'],
    slug: 'genomica',
  },
];

const statusColor = {
  Conectado: 'bg-emerald-500/10 text-emerald-300 border-emerald-400/30',
  Parcial: 'bg-sky-500/10 text-sky-300 border-sky-400/30',
  Pendente: 'bg-amber-500/10 text-amber-300 border-amber-400/30',
};

const LaboratoriosIntegracoesPage = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <header className="space-y-3">
          <Badge variant="outline" className="bg-emerald-500/10 text-emerald-300 border-emerald-500/30">Integrações</Badge>
          <h1 className="text-3xl font-bold">Integrações governamentais, hospitalares e privadas</h1>
          <p className="text-slate-400 max-w-4xl">
            Organize o hub de interoperabilidade com agrupamento visual: verde para órgãos públicos, azul para hospitais e marrom para laboratórios privados. Cada cartão apresenta requisitos, fluxos, KPIs e ações imediatas.
          </p>
        </header>

        <Tabs defaultValue="publicos" className="space-y-6">
          <TabsList className="bg-slate-900/60 border border-slate-800/60">
            <TabsTrigger value="publicos" className="data-[state=active]:bg-emerald-600/20 data-[state=active]:text-emerald-300">Órgãos Públicos</TabsTrigger>
            <TabsTrigger value="hospitais" className="data-[state=active]:bg-sky-600/20 data-[state=active]:text-sky-300">Hospitais</TabsTrigger>
            <TabsTrigger value="laboratorios" className="data-[state=active]:bg-amber-700/30 data-[state=active]:text-amber-200">Laboratórios Privados</TabsTrigger>
          </TabsList>

          <TabsContent value="publicos" className="space-y-4">
            {publicos.map((item) => (
              <Card key={item.nome} className="bg-slate-900/70 border-emerald-800/40">
                <CardHeader className="flex flex-col gap-2 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <CardTitle className="text-emerald-300 flex items-center gap-2">
                      <Globe2 className="h-5 w-5 text-emerald-400" />
                      {item.nome}
                    </CardTitle>
                    <CardDescription className="text-slate-300/80">
                      {item.descricao}
                    </CardDescription>
                  </div>
                  <Badge className={`${statusColor[item.status]} uppercase`}>{item.status}</Badge>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-emerald-200/70">Requisitos</p>
                      <ul className="mt-2 space-y-1">
                        {item.requisitos.map((req) => (
                          <li key={req} className="flex items-start gap-2">
                            <ShieldCheck className="h-4 w-4 mt-0.5 text-emerald-400" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-emerald-200/70">Ambientes</p>
                      <p className="mt-1 text-slate-400">{item.ambientes}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-emerald-200/70">Passo a passo</p>
                      <ol className="mt-2 space-y-1">
                        {item.passos.map((passo) => (
                          <li key={passo} className="flex items-start gap-2">
                            <Workflow className="h-4 w-4 mt-0.5 text-emerald-400" />
                            <span>{passo}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-emerald-200/70">KPIs</p>
                      <ul className="mt-2 space-y-1">
                        {item.kpis.map((kpi) => (
                          <li key={kpi} className="flex items-start gap-2">
                            <Activity className="h-4 w-4 mt-0.5 text-emerald-400" />
                            <span>{kpi}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
                <Separator className="bg-emerald-800/30" />
                <CardContent className="flex flex-wrap gap-2 pt-4">
                  {item.acoes.map((acao) => (
                    <Button
                      key={acao}
                      variant="outline"
                      size="sm"
                      className="border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/10"
                    >
                      {acao}
                    </Button>
                  ))}
                  <Button asChild size="sm" className="mt-2 bg-emerald-500/80 hover:bg-emerald-500 text-white">
                    <Link to={`/laboratorios/integracoes/${item.slug}`}>
                      Abrir painel detalhado
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="hospitais" className="space-y-4">
            {hospitais.map((item) => (
              <Card key={item.nome} className="bg-slate-900/70 border-sky-800/40">
                <CardHeader className="flex flex-col gap-2 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <CardTitle className="text-sky-300 flex items-center gap-2">
                      <Network className="h-5 w-5 text-sky-400" />
                      {item.nome}
                    </CardTitle>
                    <CardDescription className="text-slate-300/80">
                      {item.descricao}
                    </CardDescription>
                  </div>
                  <Badge className={`${statusColor[item.status]} uppercase`}>{item.status}</Badge>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
                  <div className="space-y-3">
                    <p className="text-xs uppercase tracking-wide text-sky-200/70">Requisitos</p>
                    <ul className="mt-2 space-y-1">
                      {item.requisitos.map((req) => (
                        <li key={req} className="flex items-start gap-2">
                          <ClipboardSignature className="h-4 w-4 mt-0.5 text-sky-400" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-xs uppercase tracking-wide text-sky-200/70">Ambientes</p>
                    <p className="mt-1 text-slate-400">{item.ambientes}</p>
                  </div>
                  <div className="space-y-3">
                    <p className="text-xs uppercase tracking-wide text-sky-200/70">Fluxo</p>
                    <ol className="mt-2 space-y-1">
                      {item.passos.map((passo) => (
                        <li key={passo} className="flex items-start gap-2">
                          <Link2 className="h-4 w-4 mt-0.5 text-sky-400" />
                          <span>{passo}</span>
                        </li>
                      ))}
                    </ol>
                    <p className="text-xs uppercase tracking-wide text-sky-200/70">KPIs</p>
                    <ul className="mt-2 space-y-1">
                      {item.kpis.map((kpi) => (
                        <li key={kpi} className="flex items-start gap-2">
                          <Activity className="h-4 w-4 mt-0.5 text-sky-400" />
                          <span>{kpi}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
                <Separator className="bg-sky-800/30" />
                <CardContent className="flex flex-wrap gap-2 pt-4">
                  {item.acoes.map((acao) => (
                    <Button
                      key={acao}
                      variant="outline"
                      size="sm"
                      className="border-sky-500/40 text-sky-300 hover:bg-sky-500/10"
                    >
                      {acao}
                    </Button>
                  ))}
                  <Button asChild size="sm" className="mt-2 bg-sky-500/80 hover:bg-sky-500 text-white">
                    <Link to={`/laboratorios/integracoes/${item.slug}`}>
                      Abrir painel detalhado
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="laboratorios" className="space-y-4">
            {laboratoriosPrivados.map((item) => (
              <Card key={item.nome} className="bg-slate-900/70 border-amber-900/40">
                <CardHeader className="flex flex-col gap-2 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <CardTitle className="text-amber-200 flex items-center gap-2">
                      <CloudLightning className="h-5 w-5 text-amber-300" />
                      {item.nome}
                    </CardTitle>
                    <CardDescription className="text-slate-300/80">
                      {item.descricao}
                    </CardDescription>
                  </div>
                  <Badge className={`${statusColor[item.status]} uppercase`}>{item.status}</Badge>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
                  <div className="space-y-3">
                    <p className="text-xs uppercase tracking-wide text-amber-200/70">Requisitos</p>
                    <ul className="mt-2 space-y-1">
                      {item.requisitos.map((req) => (
                        <li key={req} className="flex items-start gap-2">
                          <BookOpen className="h-4 w-4 mt-0.5 text-amber-300" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-xs uppercase tracking-wide text-amber-200/70">Ambientes</p>
                    <p className="mt-1 text-slate-400">{item.ambientes}</p>
                  </div>
                  <div className="space-y-3">
                    <p className="text-xs uppercase tracking-wide text-amber-200/70">Passo a passo</p>
                    <ol className="mt-2 space-y-1">
                      {item.passos.map((passo) => (
                        <li key={passo} className="flex items-start gap-2">
                          <Workflow className="h-4 w-4 mt-0.5 text-amber-300" />
                          <span>{passo}</span>
                        </li>
                      ))}
                    </ol>
                    <p className="text-xs uppercase tracking-wide text-amber-200/70">KPIs</p>
                    <ul className="mt-2 space-y-1">
                      {item.kpis.map((kpi) => (
                        <li key={kpi} className="flex items-start gap-2">
                          <Activity className="h-4 w-4 mt-0.5 text-amber-300" />
                          <span>{kpi}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
                <Separator className="bg-amber-900/40" />
                <CardContent className="flex flex-wrap gap-2 pt-4">
                  {item.acoes.map((acao) => (
                    <Button
                      key={acao}
                      variant="outline"
                      size="sm"
                      className="border-amber-600/40 text-amber-200 hover:bg-amber-600/10"
                    >
                      {acao}
                    </Button>
                  ))}
                  <Button asChild size="sm" className="mt-2 bg-amber-500/80 hover:bg-amber-500 text-white">
                    <Link to={`/laboratorios/integracoes/${item.slug}`}>
                      Abrir painel detalhado
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        <footer className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-emerald-400" />
            <span>Runbooks, checklists e SLAs prontos para homologação.</span>
          </div>
          <div className="flex items-center gap-2">
            <Network className="h-4 w-4 text-sky-400" />
            <span>Backbone RNDS como pilar de compliance e escalabilidade.</span>
          </div>
          <div className="flex items-center gap-2">
            <CloudLightning className="h-4 w-4 text-amber-300" />
            <span>Privados iniciam com Fleury + Pardini · roadmap progressivo para Dasa/Sabin.</span>
          </div>
        </footer>
      </div>
  );
};

export default LaboratoriosIntegracoesPage;
