import MainLayout from '@/components/layout/MainLayout';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  FileText,
  Globe2,
  MapPin,
  ShieldCheck,
  Thermometer,
  TrendingDown,
  TrendingUp,
  Truck,
  FlaskConical,
  Scan,
  Dna,
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, AreaChart, Area } from 'recharts';
import LabKpiHighlights from '@/components/laboratories/LabKpiHighlights';

const tatByExamLine = [
  { exame: 'Hematologia', tat: 1.6 },
  { exame: 'Bioquímica', tat: 3.4 },
  { exame: 'Imunologia', tat: 6.2 },
  { exame: 'Microbiologia', tat: 18.5 },
  { exame: 'Imagem', tat: 2.8 },
  { exame: 'Genômica', tat: 170.0 },
];

const alertasCompliance = [
  {
    id: 'ac-01',
    titulo: 'Bundles RNDS pendentes',
    detalhe: '3 bundles aguardando correção de LOINC/UCUM',
    severidade: 'alto',
  },
  {
    id: 'ac-02',
    titulo: 'Certificado ICP-Brasil',
    detalhe: 'Token e-CNPJ expira em 7 dias',
    severidade: 'moderado',
  },
  {
    id: 'ac-03',
    titulo: 'SLA TAT Genômica',
    detalhe: '2 painéis acima do TAT acordado (10 dias)',
    severidade: 'crítico',
  },
];

const pontosColeta = [
  { nome: 'Matriz - Centro', status: 'Conectado', coletasHoje: 28 },
  { nome: 'Unidade Sul', status: 'Em trânsito', coletasHoje: 15 },
  { nome: 'Clínica Parceira Norte', status: 'Sincronizando', coletasHoje: 12 },
  { nome: 'DNA Hub Genômico', status: 'Prioridade', coletasHoje: 8 },
];

const laboratorioSegments = [
  {
    id: 'analises-clinicas',
    icon: FlaskConical,
    title: 'Laboratórios de Análises Clínicas',
    description: 'Coletas, análises bioquímicas, hematologia e imunologia com monitoramento de TAT e cadeia fria.',
    badges: ['LIS • Hemato • Bioq', 'STAT 94%', 'Bundle RNDS 98%'],
    actions: [
      { label: 'Abrir operação', href: '/laboratorios/operacao' },
      { label: 'Ver analytics', href: '/laboratorios/analytics-kpis' }
    ]
  },
  {
    id: 'imagem',
    icon: Scan,
    title: 'Laboratórios de Imagem',
    description: 'Integração PACS, deep links DICOM e publicação automatizada para portais médicos.',
    badges: ['RX', 'Ultrassom', 'Tomografia'],
    actions: [
      { label: 'Fluxo de imagem', href: '/laboratorios/integracoes/imagem-cdpi-alta' },
      { label: 'Controle operacional', href: '/laboratorios/operacao#triagem-prioridades' }
    ]
  },
  {
    id: 'genomica',
    icon: Dna,
    title: 'Laboratórios Genômicos',
    description: 'Ingestão de VCF, metadados ACMG e consentimentos com rastreabilidade completa.',
    badges: ['NGS', 'Painéis CGP', 'Consentimentos'],
    actions: [
      { label: 'Hub genômico', href: '/laboratorios/integracoes/genomica' },
      { label: 'KPIs genômica', href: '/laboratorios/analytics-kpis' }
    ]
  }
];

const quickActions = [
  {
    label: 'Validar Bundle RNDS',
    description: 'Executa validação automática contra perfis nacionais antes do envio.',
    href: '/laboratorios/integracoes/rnds'
  },
  {
    label: 'Publicar em Hospital',
    description: 'Espelha laudos em portais hospitalares parceiros com auditoria de acesso.',
    href: '/laboratorios/integracoes/hospitais'
  },
  {
    label: 'Conectar Parceiro Privado',
    description: 'Onboard acelerado com Fleury, Pardini, Dasa e outros apoios laboratoriais.',
    href: '/laboratorios/integracoes'
  }
];

const LaboratoriosOverviewPage = () => {
  const navigate = useNavigate();
  return (
    <MainLayout>
      <div className="min-h-screen bg-slate-950 text-slate-100 px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <header className="space-y-3">
          <Badge variant="outline" className="bg-emerald-500/10 text-emerald-300 border-emerald-500/30">Laboratórios</Badge>
          <h1 className="text-3xl font-bold">Hub de Laboratórios</h1>
          <p className="text-slate-400 max-w-3xl">
            Operação, resultados e integrações — um só lugar. Monitoramento em tempo real das coletas, amostras, laudos e conformidade RNDS, com visão executiva para gestores de análises clínicas, imagem e genômica.
          </p>
        </header>

        <section className="space-y-6">
          <LabKpiHighlights />
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-4">
            {[
              { label: 'Coletas de hoje', valor: '24 agendadas', icon: <Truck className="h-4 w-4" />, tendencia: '+8% vs ontem', tendenciaPositiva: true },
              { label: 'Amostras em trânsito', valor: '62 lotes', icon: <Globe2 className="h-4 w-4" />, tendencia: '12 rotas ativas', tendenciaPositiva: true },
              { label: 'Laudos pendentes', valor: '37 exames', icon: <FileText className="h-4 w-4" />, tendencia: 'Fila genômica: 5', tendenciaPositiva: false },
              { label: 'RNDS — conformidade', valor: '97,8%', icon: <ShieldCheck className="h-4 w-4" />, tendencia: 'Meta >= 98%', tendenciaPositiva: false },
              { label: 'TAT médio (24h)', valor: '03h42', icon: <Activity className="h-4 w-4" />, tendencia: '-14 min vs meta', tendenciaPositiva: true },
              { label: 'Alertas', valor: '6 críticos', icon: <AlertTriangle className="h-4 w-4" />, tendencia: '3 compliance · 3 operação', tendenciaPositiva: false },
            ].map((card) => (
              <Card key={card.label} className="bg-slate-900/60 border-slate-800/60">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xs text-slate-400 uppercase tracking-wide">{card.label}</CardTitle>
                  <span className={`${card.tendenciaPositiva ? 'text-emerald-400' : 'text-amber-400'}`}>{card.icon}</span>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-semibold">{card.valor}</p>
                  <p className="text-xs text-slate-400 mt-1">{card.tendencia}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 bg-slate-900/70 border-slate-800/60">
            <CardHeader>
              <CardTitle>Atalhos rápidos</CardTitle>
              <CardDescription>Orquestração das rotinas críticas em um clique</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 md:grid-cols-3">
                  {quickActions.map((action) => (
                    <Card key={action.label} className="border border-white/10 bg-slate-950/80">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm text-slate-200">{action.label}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <p className="text-xs text-slate-400">{action.description}</p>
                        <Button variant="secondary" className="w-full justify-between" onClick={() => navigate(action.href)}>
                          Acessar
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </CardContent>
                    </Card>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-slate-900/70 border-slate-800/60">
            <CardHeader>
              <CardTitle>Feed de eventos</CardTitle>
              <CardDescription>Últimos envios e integrações monitoradas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              {[
                {
                  titulo: 'Bundle RNDS aceito',
                  detalhe: 'Hemograma completo · paciente 112034 · sucesso em 1.2s',
                  tempo: 'há 2 min'
                },
                {
                  titulo: 'Publicação hospital Einstein',
                  detalhe: '90 laudos de imagem espelhados · deep links validados',
                  tempo: 'há 8 min'
                },
                {
                  titulo: 'Erro de integração Sabin',
                  detalhe: 'Login institucional expirado · fila movida para retry',
                  tempo: 'há 12 min'
                },
                {
                  titulo: 'Parceria Fleury Sandbox',
                  detalhe: 'Teste de webhook concluído · latência média 640ms',
                  tempo: 'há 20 min'
                }
              ].map((evento) => (
                <div key={evento.titulo} className="rounded-lg border border-slate-800/60 bg-slate-950/60 p-3">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>{evento.tempo}</span>
                  </div>
                  <p className="text-slate-100 font-medium mt-1">{evento.titulo}</p>
                  <p className="text-slate-400 text-xs mt-1">{evento.detalhe}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {laboratorioSegments.map((segment) => {
            const Icon = segment.icon;
            return (
              <Card key={segment.id} className="border border-white/10 bg-slate-900/75 backdrop-blur">
                <CardHeader className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-300/25 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-emerald-300" />
                    </div>
                    <CardTitle className="text-xl text-white">{segment.title}</CardTitle>
                  </div>
                  <CardDescription className="text-slate-300">{segment.description}</CardDescription>
                  <div className="flex flex-wrap gap-2">
                    {segment.badges.map((badge) => (
                      <Badge key={badge} className="bg-white/10 text-slate-100 border border-white/20">
                        {badge}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                  {segment.actions.map((action) => (
                    <Button key={action.href} variant="outline" className="justify-between" onClick={() => navigate(action.href)}>
                      {action.label}
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  ))}
                </CardContent>
              </Card>
            );
          })}
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 bg-slate-900/70 border-slate-800/60">
            <CardHeader>
              <CardTitle>TAT por linha de exame</CardTitle>
              <CardDescription>Média das últimas 24 horas — meta por linha (horas)</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={tatByExamLine}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                  <XAxis dataKey="exame" stroke="#94a3b8" tick={{ fontSize: 12 }} />
                  <YAxis unit="h" stroke="#94a3b8" tick={{ fontSize: 12 }} />
                  <Tooltip cursor={{ fill: 'rgba(148, 163, 184, 0.1)' }} contentStyle={{ background: '#0f172a', borderRadius: 12, border: '1px solid #1e293b' }} />
                  <Legend />
                  <Bar dataKey="tat" name="Tat médio" radius={[8, 8, 0, 0]} fill="#34d399" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/70 border-slate-800/60">
            <CardHeader>
              <CardTitle>Heatmap — Ponto de coleta & unidades conectadas</CardTitle>
              <CardDescription>Saúde das integrações por cadeia logística</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="h-40 rounded-xl bg-gradient-to-br from-emerald-900/50 via-slate-900 to-slate-950 grid grid-cols-2 gap-1 p-2">
                {[60, 45, 80, 30, 95, 50].map((intensidade, idx) => (
                  <div
                    key={idx}
                    style={{ backgroundColor: `rgba(16, 185, 129, ${0.2 + intensidade / 120})` }}
                    className="rounded-lg border border-emerald-500/20"
                  />
                ))}
              </div>
              <ul className="space-y-3">
                {pontosColeta.map((ponto) => (
                  <li key={ponto.nome} className="flex items-center justify-between text-sm text-slate-300">
                    <div className="flex flex-col">
                      <span className="font-medium text-slate-100">{ponto.nome}</span>
                      <span className="text-xs text-slate-400">{ponto.coletasHoje} coletas hoje</span>
                    </div>
                    <Badge className={
                      ponto.status === 'Conectado'
                        ? 'bg-emerald-500/10 text-emerald-300 border-emerald-400/40'
                        : ponto.status === 'Prioridade'
                        ? 'bg-amber-500/10 text-amber-300 border-amber-400/40'
                        : 'bg-sky-500/10 text-sky-300 border-sky-400/40'
                    }>
                      <MapPin className="h-3 w-3 mr-1" />
                      {ponto.status}
                    </Badge>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-slate-900/70 border-slate-800/60">
            <CardHeader>
              <CardTitle>Alertas de compliance</CardTitle>
              <CardDescription>Prioridade automática por severidade e impacto</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {alertasCompliance.map((alerta) => (
                <div key={alerta.id} className="flex items-start justify-between rounded-xl border border-slate-800/70 bg-slate-950/60 p-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-slate-100">{alerta.titulo}</p>
                    <p className="text-xs text-slate-400">{alerta.detalhe}</p>
                  </div>
                  <Badge
                    className={
                      alerta.severidade === 'crítico'
                        ? 'bg-rose-500/10 text-rose-300 border-rose-400/40'
                        : alerta.severidade === 'alto'
                        ? 'bg-amber-500/10 text-amber-300 border-amber-400/40'
                        : 'bg-sky-500/10 text-sky-300 border-sky-400/40'
                    }
                  >
                    {alerta.severidade.toUpperCase()}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-slate-900/70 border-slate-800/60">
            <CardHeader>
              <CardTitle>Indicadores executivos</CardTitle>
              <CardDescription>SLA, rejeições e qualidade clínica</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-xl border border-slate-800/80 bg-slate-950/60">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-300">Rejeição pré-analítica</span>
                  <Badge className="bg-rose-500/10 text-rose-300 border-rose-400/30">1,2%</Badge>
                </div>
                <p className="text-xs text-slate-500 mt-1">Meta &lt; 2%. Principais causas: hemólise (45%), identificação (27%).</p>
              </div>
              <div className="p-4 rounded-xl border border-slate-800/80 bg-slate-950/60">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-300">Cobertura RNDS</span>
                  <Badge className="bg-emerald-500/10 text-emerald-300 border-emerald-400/30">92% laudos</Badge>
                </div>
                <p className="text-xs text-slate-500 mt-1">Bundles validados automaticamente. Monitoramento de erros por perfil FHIR.</p>
              </div>
              <div className="p-4 rounded-xl border border-slate-800/80 bg-slate-950/60">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-300">Genômica — consentimentos</span>
                  <Badge className="bg-indigo-500/10 text-indigo-300 border-indigo-400/30">100% atualizados</Badge>
                </div>
                <p className="text-xs text-slate-500 mt-1">Consentimentos vinculados a painéis, com rastreio e caducidade automática.</p>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="grid grid-cols-1 gap-6">
          <Card className="bg-slate-900/70 border-slate-800/60">
            <CardHeader>
              <CardTitle>Evolução operacional</CardTitle>
              <CardDescription>Comparativo semanal — SLA, reconciliação RNDS e lotes logísticos</CardDescription>
            </CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={[
                  { semana: 'Semana 1', sla: 89, reconcil: 94, lotes: 210 },
                  { semana: 'Semana 2', sla: 91, reconcil: 96, lotes: 228 },
                  { semana: 'Semana 3', sla: 93, reconcil: 97, lotes: 240 },
                  { semana: 'Semana 4', sla: 92, reconcil: 98, lotes: 235 },
                ]}>
                  <defs>
                    <linearGradient id="sla" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="reconcil" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#34d399" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                  <XAxis dataKey="semana" stroke="#94a3b8" tick={{ fontSize: 12 }} />
                  <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} />
                  <Tooltip contentStyle={{ background: '#0f172a', borderRadius: 12, border: '1px solid #1e293b' }} />
                  <Legend />
                  <Area type="monotone" dataKey="sla" stroke="#22d3ee" name="SLA cumprido" fill="url(#sla)" />
                  <Area type="monotone" dataKey="reconcil" stroke="#34d399" name="Reconciliação RNDS" fill="url(#reconcil)" />
                  <Area type="monotone" dataKey="lotes" stroke="#f97316" name="Lotes movimentados" fillOpacity={0} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </section>

        <footer className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Thermometer className="h-4 w-4 text-slate-500" />
            <span>Monitoramento contínuo de cadeia fria, SLA TAT e integridade RNDS.</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-emerald-400" />
            <span>KPIs atualizados a cada 5 minutos · Dados simulados para demonstração.</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingDown className="h-4 w-4 text-amber-400" />
            <span>Alertas de risco operam com priorização automática e runbooks integrados.</span>
          </div>
        </footer>
      </div>
    </MainLayout>
  );
};

export default LaboratoriosOverviewPage;
