import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Activity,
  BarChart3,
  Gauge,
  LineChart as LineChartIcon,
  PieChart as PieChartIcon,
  Signal,
  TimerReset,
  TrendingUp,
  UploadCloud,
  FileCheck2,
  ShieldAlert,
} from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';

const tatSetor = [
  { setor: 'Hematologia', meta: 2, realizado: 1.6 },
  { setor: 'Bioquímica', meta: 4, realizado: 3.5 },
  { setor: 'Imuno', meta: 24, realizado: 20 },
  { setor: 'Micro', meta: 48, realizado: 35 },
  { setor: 'Imagem', meta: 2, realizado: 2.2 },
  { setor: 'Genômica', meta: 240, realizado: 198 },
];

const falhasPreAnaliticas = [
  { motivo: 'Amostra insuficiente', percentual: 34 },
  { motivo: 'Hemólise', percentual: 29 },
  { motivo: 'Identificação incorreta', percentual: 18 },
  { motivo: 'Transporte atrasado', percentual: 12 },
  { motivo: 'Temperatura fora da faixa', percentual: 7 },
];

const coberturaIntegracoes = [
  { nome: 'RNDS', cobertura: 92, uptime: 99.7 },
  { nome: 'Hospitais', cobertura: 78, uptime: 99.4 },
  { nome: 'Privados', cobertura: 65, uptime: 99.1 },
];

const coresPie = ['#34d399', '#22d3ee', '#facc15', '#fb7185', '#a855f7'];

const volumeBundles = [
  { semana: 'Semana 1', diagnostico: 620, imagem: 180, genomica: 24 },
  { semana: 'Semana 2', diagnostico: 658, imagem: 210, genomica: 31 },
  { semana: 'Semana 3', diagnostico: 702, imagem: 236, genomica: 28 },
  { semana: 'Semana 4', diagnostico: 745, imagem: 242, genomica: 36 },
];

const LaboratoriosAnalyticsPage = () => {
  return (
    <MainLayout>
      <div className="min-h-screen bg-slate-950 text-slate-100 px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <header className="space-y-3">
          <Badge variant="outline" className="bg-emerald-500/10 text-emerald-300 border-emerald-500/30">Analytics &amp; KPIs</Badge>
          <h1 className="text-3xl font-bold">Indicadores operacionais e estratégicos</h1>
          <p className="text-slate-400 max-w-4xl">
            Dashboards interativos para monitorar TAT por setor e unidade remetente, falhas pré-analíticas, cobertura das integrações (RNDS, hospitais, privados) e uptime de conectores críticos.
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-4">
          {[
            { label: 'SLA TAT Médio', valor: '93%', detalhe: 'Meta ≥ 90%', icon: <TimerReset className="h-4 w-4" />, cor: 'text-emerald-300' },
            { label: 'Cobertura RNDS', valor: '92%', detalhe: 'Bundles aceitos', icon: <Activity className="h-4 w-4" />, cor: 'text-sky-300' },
            { label: 'Falhas pré-analíticas', valor: '1,2%', detalhe: 'Últimos 30 dias', icon: <Signal className="h-4 w-4" />, cor: 'text-amber-300' },
            { label: 'Uptime integrações', valor: '99,5%', detalhe: 'RNDS + parceiros', icon: <Gauge className="h-4 w-4" />, cor: 'text-indigo-300' },
            { label: 'Envios RNDS/dia', valor: '187', detalhe: 'DiagnosticReport + Observation', icon: <UploadCloud className="h-4 w-4" />, cor: 'text-cyan-300' },
            { label: 'Genes validados ACMG', valor: '512', detalhe: 'Último painel genômico', icon: <FileCheck2 className="h-4 w-4" />, cor: 'text-purple-300' },
          ].map((item) => (
            <Card key={item.label} className="bg-slate-900/70 border-slate-800/60">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs text-slate-400 uppercase tracking-wide">{item.label}</CardTitle>
                <span className={item.cor}>{item.icon}</span>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold" style={{ color: item.cor }}>
                  {item.valor}
                </p>
                <p className="text-xs text-slate-400 mt-1">{item.detalhe}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <Card className="bg-slate-900/70 border-slate-800/60">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LineChartIcon className="h-5 w-5 text-emerald-400" />
                TAT por setor
              </CardTitle>
              <CardDescription>Meta vs realizado (horas)</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={tatSetor}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                  <XAxis dataKey="setor" stroke="#94a3b8" tick={{ fontSize: 12 }} />
                  <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} />
                  <Tooltip contentStyle={{ background: '#0f172a', borderRadius: 12, border: '1px solid #1e293b' }} />
                  <Legend />
                  <Line type="monotone" dataKey="meta" name="Meta" stroke="#64748b" strokeDasharray="4 4" strokeWidth={2} />
                  <Line type="monotone" dataKey="realizado" name="Realizado" stroke="#34d399" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/70 border-slate-800/60">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-amber-400" />
                Falhas pré-analíticas
              </CardTitle>
              <CardDescription>Principais motivos e distribuição percentual</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={falhasPreAnaliticas}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                  <XAxis dataKey="motivo" stroke="#94a3b8" tick={{ fontSize: 11 }} interval={0} angle={-12} textAnchor="end" />
                  <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} />
                  <Tooltip contentStyle={{ background: '#0f172a', borderRadius: 12, border: '1px solid #1e293b' }} />
                  <Legend />
                  <Bar dataKey="percentual" name="Percentual" radius={[8, 8, 0, 0]} fill="#facc15" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-slate-900/70 border-slate-800/60">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChartIcon className="h-5 w-5 text-sky-400" />
                Cobertura de integrações
              </CardTitle>
              <CardDescription>Distribuição percentual por eixo (últimos 30 dias)</CardDescription>
            </CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={coberturaIntegracoes}
                    dataKey="cobertura"
                    nameKey="nome"
                    cx="50%"
                    cy="50%"
                    outerRadius={110}
                    label={(entry) => `${entry.nome} ${entry.cobertura}%`}
                  >
                    {coberturaIntegracoes.map((entry, index) => (
                      <Cell key={entry.nome} fill={coresPie[index % coresPie.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ background: '#0f172a', borderRadius: 12, border: '1px solid #1e293b' }} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/70 border-slate-800/60">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-emerald-400" />
                Uptime dos conectores
              </CardTitle>
              <CardDescription>Disponibilidade média + metas SLO</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {coberturaIntegracoes.map((conector) => (
                <div key={conector.nome} className="rounded-xl border border-slate-800/60 bg-slate-950/70 p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-slate-100">{conector.nome}</p>
                    <Badge className="bg-emerald-500/10 text-emerald-300 border-emerald-400/30">{conector.uptime}%</Badge>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">SLO: ≥ 99,5% · MTTR &lt; 30 min · monitoramento Prometheus/Otel.</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-slate-900/70 border-slate-800/60">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UploadCloud className="h-5 w-5 text-emerald-400" />
                Volume de bundles enviados
              </CardTitle>
              <CardDescription>Diagnóstico, imagem e genômica — últimas 4 semanas</CardDescription>
            </CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={volumeBundles}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                  <XAxis dataKey="semana" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip contentStyle={{ background: '#0f172a', borderRadius: 12, border: '1px solid #1e293b' }} />
                  <Legend />
                  <Area type="monotone" dataKey="diagnostico" name="Diagnóstico" stroke="#34d399" fill="#34d39955" />
                  <Area type="monotone" dataKey="imagem" name="Imagem" stroke="#38bdf8" fill="#38bdf855" />
                  <Area type="monotone" dataKey="genomica" name="Genômica" stroke="#a855f7" fill="#a855f755" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/70 border-slate-800/60">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldAlert className="h-5 w-5 text-amber-400" />
                Alertas críticos (últimos 7 dias)
              </CardTitle>
              <CardDescription>Eventos que exigiram intervenção manual</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[{
                label: 'Bundles RNDS rejeitados', valor: '8', detalhe: 'LOINC/UCUM inconsistentes'
              }, {
                label: 'Quebra de cadeia fria', valor: '3', detalhe: 'Hemato · Urgência'
              }, {
                label: 'Credenciais expiradas', valor: '2', detalhe: 'Sabin portal · token MFA'
              }, {
                label: 'Deep link fora do ar', valor: '1', detalhe: 'CDPI · TTL excedido'
              }].map((alerta) => (
                <div key={alerta.label} className="flex items-center justify-between rounded-xl border border-amber-500/20 bg-amber-500/10 px-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-amber-200">{alerta.label}</p>
                    <p className="text-xs text-amber-100/70">{alerta.detalhe}</p>
                  </div>
                  <span className="text-lg font-semibold text-amber-200">{alerta.valor}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <footer className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-emerald-400" />
            <span>KPIs executivos atualizados a cada 5 minutos.</span>
          </div>
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-sky-400" />
            <span>Monitoramento Prometheus / OpenTelemetry com alertas SRE.</span>
          </div>
          <div className="flex items-center gap-2">
            <LineChartIcon className="h-4 w-4 text-amber-400" />
            <span>Dashboards prontos para exportação (PDF, PNG, CSV).</span>
          </div>
        </footer>
      </div>
    </MainLayout>
  );
};

export default LaboratoriosAnalyticsPage;
