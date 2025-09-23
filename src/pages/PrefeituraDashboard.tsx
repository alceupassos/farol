import React, { useMemo } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  DollarSign, 
  Heart, 
  Building, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp, 
  TrendingDown,
  Activity, 
  MapPin, 
  Shield,
  Stethoscope,
  Ambulance,
  Baby,
  Calendar,
  Target,
  FileText,
  BarChart3,
  PieChart as PieChartIcon,
  Thermometer,
  Eye,
  Pill,
  ExternalLink,
  ThumbsUp,
  ThumbsDown,
  Minus
} from 'lucide-react';
import { getLatestPiracicabaHealthNews } from '@/data/piracicabaHealthNews2025';
import { piracicabaNeighborhoods } from '@/data/piracicabaNeighborhoods';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  AreaChart, 
  Area, 
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

const PrefeituraDashboard = () => {
  const indicadores = [
    { mes: 'Jan', cobertura: 78, mortalidade: 12.5 },
    { mes: 'Fev', cobertura: 80, mortalidade: 11.8 },
    { mes: 'Mar', cobertura: 82, mortalidade: 11.2 },
    { mes: 'Abr', cobertura: 85, mortalidade: 10.8 }
  ];

  const orcamento = [
    { area: 'Atenção Básica', valor: 45 },
    { area: 'Média Complexidade', valor: 30 },
    { area: 'Alta Complexidade', valor: 15 },
    { area: 'Vigilância', valor: 10 }
  ];

  const visaoIntegrada = [
    {
      titulo: 'APS + Regulação',
      valor: '91% cobertura • 207 casos',
      detalhe: 'Fila cresceu 21 casos nas últimas 24h',
      acao: 'Mutirão ESF + regulação sexta-feira à noite'
    },
    {
      titulo: 'Rede Hospitalar',
      valor: '88,2% ocupação • 2,1% infecção',
      detalhe: 'Plano de giro libera 12 leitos por turno',
      acao: 'Ativar protocolo de alta segura e retaguarda pactuada'
    },
    {
      titulo: 'Crônicos & Telemedicina',
      valor: '174 pacientes alto risco • 41% adesão',
      detalhe: 'Priorizar hipertensos e gestantes monitorados',
      acao: 'Expandir telemonitoramento em Monte Líbano e Algodoal'
    }
  ];

  const agendaPrioridades = [
    {
      eixo: 'Cuidado Primário',
      meta: 'Cobertura domiciliar 92%',
      impacto: 'Reduzir fila regulação em 15%',
      prazo: '7 dias'
    },
    {
      eixo: 'Rede Hospitalar',
      meta: 'Ocupação alvo 82%',
      impacto: 'Garantir retaguarda clínica em 4 hospitais',
      prazo: '10 dias'
    },
    {
      eixo: 'Farmácia & Insumos',
      meta: 'Risco ruptura < 10%',
      impacto: 'Disponibilidade contínua de anti-hipertensivos',
      prazo: '5 dias'
    }
  ];

  const latestNews = getLatestPiracicabaHealthNews().slice(0, 3);
  const sentimentMap = {
    positive: {
      label: 'Positiva',
      className: 'text-emerald-300',
      Icon: ThumbsUp
    },
    negative: {
      label: 'Negativa',
      className: 'text-red-300',
      Icon: ThumbsDown
    },
    neutral: {
      label: 'Neutra',
      className: 'text-yellow-300',
      Icon: Minus
    }
  } as const;

  const riskLevels = ['BAIXO', 'MODERADO', 'ALTO', 'CRÍTICO', 'EMERGÊNCIA'] as const;
  const riskBreakdown = useMemo(
    () =>
      riskLevels.map((level) => {
        const filtered = piracicabaNeighborhoods.filter((n) => n.riskLevel === level);
        return {
          nivel: level,
          bairros: filtered.length,
          casos: filtered.reduce((sum, n) => sum + n.activeCases, 0),
        };
      }),
    []
  );

  const vulnerabilityRadar = useMemo(
    () =>
      piracicabaNeighborhoods.slice(0, 6).map((n) => ({
        bairro: n.name,
        vulnerabilidade: n.healthFactors.vulnerabilityIndex * 10,
        cobertura: n.demographics.healthcareCoverage,
      })),
    []
  );

  const regulationForecast = [
    { month: 'Abr', fila: 198, tele: 28 },
    { month: 'Mai', fila: 192, tele: 31 },
    { month: 'Jun', fila: 184, tele: 35 },
    { month: 'Jul', fila: 176, tele: 38 },
    { month: 'Ago', fila: 168, tele: 41 },
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center">
            <Building className="h-10 w-10 mr-4 text-blue-400" />
            Visão Geral — Prefeitura de Piracicaba
          </h1>
          <p className="text-blue-200 text-lg">
            Indicadores integrados para o prefeito e a Secretaria de Saúde de Piracicaba
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-800/90 backdrop-blur border-gray-700">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-300">Cobertura APS</p>
                  <p className="text-2xl font-bold text-white">87%</p>
                  <p className="text-xs text-green-400">Meta: 90%</p>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/90 backdrop-blur border-gray-700">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-300">Orçamento Saúde</p>
                  <p className="text-2xl font-bold text-white">18,5%</p>
                  <p className="text-xs text-green-400">R$ 45,2M</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/90 backdrop-blur border-gray-700">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-300">Mortalidade Infantil</p>
                  <p className="text-2xl font-bold text-white">10,5</p>
                  <p className="text-xs text-yellow-400">por 1.000</p>
                </div>
                <Heart className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/90 backdrop-blur border-gray-700">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-300">Unidades</p>
                  <p className="text-2xl font-bold text-white">34</p>
                  <p className="text-xs text-blue-400">UBS + UPA</p>
                </div>
                <Building className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* KPIs Adicionais */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gray-800/90 backdrop-blur border-gray-700">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-cyan-300">Vacinação</p>
                  <p className="text-2xl font-bold text-white">92%</p>
                  <p className="text-xs text-green-400">Meta: 95%</p>
                </div>
                <Shield className="h-8 w-8 text-cyan-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800/90 backdrop-blur border-gray-700">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-pink-300">Consultas/Mês</p>
                  <p className="text-2xl font-bold text-white">11.2K</p>
                  <p className="text-xs text-green-400">+8%</p>
                </div>
                <Stethoscope className="h-8 w-8 text-pink-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800/90 backdrop-blur border-gray-700">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-red-300">Equipes ESF</p>
                  <p className="text-2xl font-bold text-white">50</p>
                  <p className="text-xs text-blue-400">5 regiões</p>
                </div>
                <Users className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
          <Card className="bg-gray-900/80 backdrop-blur border-emerald-700/40 shadow-lg shadow-emerald-500/10">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-white">
                <span>Visão integrada da rede</span>
                <Badge variant="outline" className="border-emerald-500/40 text-emerald-200">APS + Hospital + Vigilância</Badge>
              </CardTitle>
              <p className="text-sm text-emerald-100/80">Combinação de indicadores para decisões coordenadas em até 48 horas.</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {visaoIntegrada.map((item) => (
                <div key={item.titulo} className="rounded-xl border border-emerald-700/30 bg-slate-950/70 p-4">
                  <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h4 className="text-sm font-semibold uppercase tracking-wide text-emerald-200">{item.titulo}</h4>
                      <p className="mt-1 text-base font-semibold text-white">{item.valor}</p>
                      <p className="text-xs text-emerald-100/80">{item.detalhe}</p>
                    </div>
                    <Badge variant="secondary" className="self-start bg-emerald-500/10 text-emerald-200">{item.acao}</Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-gray-900/75 backdrop-blur border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Agenda de prioridades gestão à vista</CardTitle>
              <p className="text-sm text-gray-300">Metas pactuadas por eixo para produção assistencial, rede hospitalar e logística.</p>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-800 text-sm text-gray-200">
                <thead className="text-xs uppercase tracking-wide text-gray-400">
                  <tr>
                    <th className="px-4 py-2 text-left">Eixo</th>
                    <th className="px-4 py-2 text-left">Meta operacional</th>
                    <th className="px-4 py-2 text-left">Impacto esperado</th>
                    <th className="px-4 py-2 text-left">Prazo</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {agendaPrioridades.map((linha) => (
                    <tr key={linha.eixo}>
                      <td className="px-4 py-3 font-semibold text-white">{linha.eixo}</td>
                      <td className="px-4 py-3">{linha.meta}</td>
                      <td className="px-4 py-3 text-emerald-300">{linha.impacto}</td>
                      <td className="px-4 py-3">{linha.prazo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-gray-800/90 backdrop-blur border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Indicadores Municipais</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={indicadores}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="cobertura" stroke="#2563eb" strokeWidth={2} name="Cobertura APS" />
                  <Line type="monotone" dataKey="mortalidade" stroke="#dc2626" strokeWidth={2} name="Mortalidade" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/90 backdrop-blur border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Orçamento por Área</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={orcamento}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="area" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="valor" fill="#2563eb" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <section className="mt-10 space-y-4">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <ExternalLink className="h-5 w-5 text-primary" />
                Últimas notícias sobre a saúde em Piracicaba
              </h2>
              <p className="text-sm text-slate-300">
                Atualizado a cada acesso com as pautas mais recentes do ano de 2025
              </p>
            </div>
            <Button asChild variant="outline" size="sm" className="text-primary border-primary/40">
              <a href="/noticias-saude-piracicaba">Ver todas as notícias</a>
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {latestNews.map((item) => {
              const publishedDate = new Date(item.publishedAt).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
              });
              const sentiment = sentimentMap[item.sentiment];

              return (
                <Card key={item.id} className="border-border/50 bg-slate-900/80">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base font-semibold text-white">
                      {item.title}
                    </CardTitle>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                      <span>{publishedDate}</span>
                      <span>·</span>
                      <span>{item.source}</span>
                      <span>·</span>
                      <span className={`inline-flex items-center gap-1 ${sentiment.className}`}>
                        <sentiment.Icon className="h-3.5 w-3.5" aria-hidden />
                        {sentiment.label}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm text-slate-300">
                    {item.summary.map((line, index) => (
                      <p key={`${item.id}-pref-${index}`}>{line}</p>
                    ))}
                    <Button asChild variant="ghost" size="sm" className="px-0 text-primary hover:text-primary/80 gap-2">
                      <a href={item.url} target="_blank" rel="noopener noreferrer">
                        Ler na fonte <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        <section className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card className="bg-gray-900/80 backdrop-blur border-gray-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-white flex items-center gap-2">
                <MapPin className="h-5 w-5 text-emerald-300" />
                Termômetro de risco por bairro
              </CardTitle>
              <p className="text-xs text-slate-300">Casos ativos e número de bairros por nível de risco</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={riskBreakdown}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                  <XAxis dataKey="nivel" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip contentStyle={{ background: '#0f172a', borderColor: '#334155' }} />
                  <Legend />
                  <Bar dataKey="bairros" name="Bairros" fill="#6366f1" radius={[6, 6, 0, 0]} />
                  <Line type="monotone" dataKey="casos" name="Casos" stroke="#f97316" />
                </BarChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-1 gap-2 text-xs text-slate-300">
                {riskBreakdown.map((item) => (
                  <div key={item.nivel} className="flex items-center justify-between rounded-md border border-slate-800 bg-slate-900/70 px-3 py-2">
                    <span className="font-semibold text-white">{item.nivel}</span>
                    <span>{item.bairros} bairros · {item.casos} casos</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/80 backdrop-blur border-gray-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-sky-300" />
                Regulação x telemedicina (projeção)
              </CardTitle>
              <p className="text-xs text-slate-300">Impacto previsto da adesão digital nas filas de especialidades</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={regulationForecast}>
                  <defs>
                    <linearGradient id="colorFila" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                  <XAxis dataKey="month" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip contentStyle={{ background: '#0f172a', borderColor: '#334155' }} />
                  <Legend />
                  <Area type="monotone" dataKey="fila" name="Fila regulação" stroke="#ef4444" fill="url(#colorFila)" />
                  <Line type="monotone" dataKey="tele" name="Adesão tele (%)" stroke="#22d3ee" />
                </AreaChart>
              </ResponsiveContainer>
              <ResponsiveContainer width="100%" height={200}>
                <RadarChart data={vulnerabilityRadar}>
                  <PolarGrid stroke="#1f2937" />
                  <PolarAngleAxis dataKey="bairro" tick={{ fill: '#cbd5f5', fontSize: 12 }} />
                  <PolarRadiusAxis angle={90} stroke="#9ca3af" />
                  <Radar name="Vulnerabilidade" dataKey="vulnerabilidade" stroke="#facc15" fill="#facc15" fillOpacity={0.4} />
                  <Radar name="Cobertura APS" dataKey="cobertura" stroke="#38bdf8" fill="#38bdf8" fillOpacity={0.2} />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </section>
      </div>
    </MainLayout>
  );
};

export default PrefeituraDashboard;
