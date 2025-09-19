import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  Activity,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Database,
  HeartPulse,
  Hospital,
  Layers,
  Lock,
  Microscope,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Users,
  Wand2
} from 'lucide-react';

interface PersonaCard {
  title: string;
  subtitle: string;
  description: string;
  metrics: string[];
  buttonLabel: string;
  tag: string;
  icon: React.ComponentType<{ className?: string }>;
  role: 'gestor' | 'medico' | 'paciente' | 'hospital' | 'laboratorio';
  navigateTo: string;
  accent: string;
}

const gradientBlock = (route: string) => `bg-gradient-to-br ${route}`;

const PublicHealthLanding = () => {
  const navigate = useNavigate();
  const { switchGuestRole } = useAuth();
  const [formData, setFormData] = useState({
    municipality: '',
    contact: '',
    email: '',
    phone: '',
    population: '',
    currentSystems: '',
    mainChallenges: '',
    priority: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Municipal contact form submitted:', formData);
  };

  const personaBlocks = useMemo<PersonaCard[]>(
    () => [
      {
        title: 'Governos & Prefeituras',
        subtitle: 'Planejamento populacional conectado',
        description:
          'Dashboards em tempo real para controlar indicadores, orçamentos e pactuações regionais com governança RNDS.',
        metrics: ['Cobertura RNDS 98%', 'SLO 99,5% integrações', 'Alertas epidemiológicos automáticos'],
        buttonLabel: 'Ativar visão gestor',
        tag: 'Política Pública',
        icon: ShieldCheck,
        role: 'gestor',
        navigateTo: '/prefeitura-dashboard',
        accent: 'from-emerald-500/80 via-emerald-400/70 to-teal-500/80'
      },
      {
        title: 'Secretarias de Saúde',
        subtitle: 'Rede SUS com compliance total',
        description:
          'Auditoria LGPD, RNDS e gestão de contratos em um mosaico único. Elimine planilhas e centralize evidências.',
        metrics: ['Bundles validados automaticamente', 'Runbooks CAPA', 'Monitoramento de certificados'],
        buttonLabel: 'Ver painel de secretarias',
        tag: 'Compliance',
        icon: Layers,
        role: 'gestor',
        navigateTo: '/dashboard',
        accent: 'from-cyan-500/80 via-sky-500/70 to-blue-500/80'
      },
      {
        title: 'Clínicas de Imagem',
        subtitle: 'PACS, DICOM e RNDS no mesmo fluxo',
        description:
          'Integração com deep links seguros, controle de laudos e publicação automatizada para portais e RNDS.',
        metrics: ['Viewer 4K', 'Automação de laudos em 2 cliques', 'KPIs de disponibilidade'],
        buttonLabel: 'Explorar jornada de imagem',
        tag: 'Clínicas',
        icon: Hospital,
        role: 'hospital',
        navigateTo: '/dashboard',
        accent: 'from-purple-500/80 via-fuchsia-500/70 to-indigo-500/80'
      },
      {
        title: 'Laboratórios & Genômica',
        subtitle: 'Operação, VCF e genomics hub',
        description:
          'Monitoramento da cadeia de custódia, TAT por linha de exame e ingestão de VCF com controle de consentimentos.',
        metrics: ['Runbooks RNDS', 'KPIs STAT / SLA', 'Integrações Fleury · Pardini · Dasa'],
        buttonLabel: 'Entrar no hub laboratorial',
        tag: 'Interoperabilidade',
        icon: Microscope,
        role: 'laboratorio',
        navigateTo: '/laboratorios/visao-geral',
        accent: 'from-amber-500/80 via-orange-500/70 to-red-500/80'
      },
      {
        title: 'Profissionais de Saúde',
        subtitle: 'Prontuário vivo e IA clínica',
        description:
          'Contexto completo do paciente, alertas inteligentes, protocolos e prescrição conectada ao território.',
        metrics: ['Assistente de IA com guardrails', 'Checklist de qualidade', 'Corredor do paciente omnicanal'],
        buttonLabel: 'Acessar workspace clínico',
        tag: 'Assistência',
        icon: Stethoscope,
        role: 'medico',
        navigateTo: '/profile',
        accent: 'from-rose-500/80 via-pink-500/70 to-red-400/80'
      },
      {
        title: 'Cidadãos & Pacientes',
        subtitle: 'Carteira digital de saúde pública',
        description:
          'Cartão SUS inteligente, alertas preventivos e portabilidade de dados com privacidade e consentimento granular.',
        metrics: ['Histórico longitudinal', 'Planos de cuidado personalizados', 'QR de emergência'],
        buttonLabel: 'Testar experiência paciente',
        tag: 'Engajamento',
        icon: HeartPulse,
        role: 'paciente',
        navigateTo: '/profile',
        accent: 'from-slate-500/80 via-slate-400/70 to-slate-300/80'
      }
    ],
    []
  );

  const previewScreens = useMemo(
    () => [
      {
        title: 'Visão Executiva 360º',
        description: 'KPIs de gestão pública, pactuações regionais e auditoria RNDS em um painel unificado.',
        gradient: gradientBlock('from-emerald-600/80 via-slate-900/70 to-slate-950/80')
      },
      {
        title: 'Orquestração Clínica com IA',
        description: 'Assistente assistencial, protocolos contextuais e telemedicina integrada.',
        gradient: gradientBlock('from-indigo-600/80 via-slate-900/70 to-slate-950/80')
      },
      {
        title: 'Laboratório Operando no Verde',
        description: 'Controle de cadeia fria, VCF e integrações privadas com runbooks de compliance.',
        gradient: gradientBlock('from-amber-600/80 via-slate-900/70 to-slate-950/80')
      }
    ],
    []
  );

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar toggleSidebar={() => {}} />
      <main className="pt-16">
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl" />
            <div className="absolute top-0 right-0 h-[28rem] w-[28rem] rounded-full bg-cyan-500/20 blur-3xl" />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="grid lg:grid-cols-[1.15fr,0.85fr] gap-12 items-center">
              <div className="space-y-8">
                <Badge className="bg-emerald-500/15 text-emerald-200 border border-emerald-500/40 rounded-full px-3 py-1 w-fit">
                  HUB VIDA SEGURA · SAÚDE PÚBLICA AUGMENTADA
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                  Uma plataforma única para conectar governos, clínicas e cidadãos em toda a jornada de saúde.
                </h1>
                <p className="text-lg md:text-xl text-slate-300 max-w-3xl">
                  Automação RNDS, analytics em tempo real, carteira digital do paciente e integrações privadas. Tudo em conformidade com LGPD, pronto para hospitais, laboratórios, clínicas de imagem e secretarias de saúde.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="px-8 py-6 text-lg shadow-xl" onClick={() => navigate('/login')}>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Explorar demo guiada
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="px-8 py-6 text-lg border-slate-500 text-slate-100 hover:bg-slate-800"
                    onClick={() => navigate('/documentation')}
                  >
                    <Layers className="w-5 h-5 mr-2" />
                    Baixar one-pager técnico
                  </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-slate-300">
                  {[{
                    label: 'Integrações públicas + privadas',
                    value: '24 conectores homologados'
                  }, {
                    label: 'SLA de atendimento RNDS',
                    value: 'Latência média 1.9s'
                  }, {
                    label: 'Governança de dados',
                    value: 'LGPD · ISO 27701 · ICP-Brasil'
                  }].map((item) => (
                    <div key={item.label} className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur">
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-400 mb-1">{item.label}</p>
                      <p className="text-base font-medium text-slate-100">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-500/20 via-slate-800/40 to-transparent blur-2xl" />
                <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/80 via-slate-900/90 to-slate-950/95 p-8 shadow-2xl">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-slate-300">Impacto comprovado</p>
                      <Badge variant="outline" className="border-emerald-500/30 text-emerald-300">
                        Resultados 2024
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-left">
                      <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                        <span className="text-3xl font-semibold text-emerald-300">-34%</span>
                        <p className="text-xs text-slate-400 mt-2">Redução média de TAT em laboratórios</p>
                      </div>
                      <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                        <span className="text-3xl font-semibold text-emerald-300">+47%</span>
                        <p className="text-xs text-slate-400 mt-2">Engajamento de profissionais em prontuário vivo</p>
                      </div>
                      <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                        <span className="text-3xl font-semibold text-emerald-300">8h</span>
                        <p className="text-xs text-slate-400 mt-2">Economia diária em conciliações RNDS</p>
                      </div>
                      <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                        <span className="text-3xl font-semibold text-emerald-300">99.5%</span>
                        <p className="text-xs text-slate-400 mt-2">Uptime em integrações críticas monitoradas</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-400">
                      <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                      Carteira digital do paciente – dados portáveis com consentimento granular
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
            <div className="text-center space-y-4">
              <Badge className="bg-white/10 text-slate-200 border border-white/20">Para cada elo da rede de saúde</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Conectamos governos, clínicas, laboratórios, profissionais e pacientes.
              </h2>
              <p className="text-lg text-slate-300 max-w-3xl mx-auto">
                Personalize a jornada em segundos. Acesse ambientes simulados ou conecte-se via RNDS, parceiros privados e integrações hospitalares.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {personaBlocks.map((persona) => {
                const Icon = persona.icon;
                return (
                  <div key={persona.title} className="group">
                    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-slate-950/90 p-8 shadow-xl transition-transform duration-300 group-hover:-translate-y-1">
                      <div className={`absolute -top-24 -right-24 h-48 w-48 rounded-full blur-3xl opacity-60 ${persona.accent}`} />
                      <div className="relative z-10 space-y-6">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="border-white/30 text-white/80">{persona.tag}</Badge>
                          <Icon className="w-10 h-10 text-white/80" />
                        </div>
                        <div className="space-y-3 text-left">
                          <h3 className="text-2xl font-semibold text-white">{persona.title}</h3>
                          <p className="text-slate-200">{persona.subtitle}</p>
                          <p className="text-sm text-slate-300/80">{persona.description}</p>
                        </div>
                        <ul className="space-y-2 text-sm text-slate-200/90">
                          {persona.metrics.map((metric) => (
                            <li key={metric} className="flex items-center gap-2">
                              <Sparkles className="w-4 h-4 text-emerald-300" />
                              {metric}
                            </li>
                          ))}
                        </ul>
                        <Button
                          variant="secondary"
                          className="w-full justify-between font-medium"
                          onClick={() => {
                            switchGuestRole(persona.role);
                            setTimeout(() => navigate(persona.navigateTo), 80);
                          }}
                        >
                          {persona.buttonLabel}
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-20 bg-slate-900/60 backdrop-blur">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center space-y-3">
              <Badge className="bg-emerald-500/15 text-emerald-200 border border-emerald-500/30">Imersão visual</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Painéis e telas ilustrativas para apresentar o impacto.
              </h2>
              <p className="text-lg text-slate-300 max-w-3xl mx-auto">
                Inspiradas em ilustrações criadas via Gemini Flash Image 2.5, estas composições representam dashboards, jornadas do paciente e execução integrada para demonstrações comerciais.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {previewScreens.map((screen) => (
                <div key={screen.title} className="group relative overflow-hidden rounded-3xl border border-white/10 shadow-xl">
                  <div className={`h-56 ${screen.gradient} flex items-end p-6`}>
                    <div className="space-y-2 text-white">
                      <h3 className="text-lg font-semibold">{screen.title}</h3>
                      <p className="text-sm text-white/80 max-w-sm">{screen.description}</p>
                    </div>
                  </div>
                  <div className="bg-slate-950/90 p-6 border-t border-white/10 text-sm text-slate-300">
                    Substitua por imagens exportadas do Gemini com as dimensões recomendadas (1440x900) para apresentações de alta resolução.
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-slate-950">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <Badge className="bg-white/10 text-white border border-white/20">Acesso instantâneo</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Teste agora mesmo com usuários de demonstração.</h2>
            <p className="text-lg text-slate-300">
              Entre com perfis configurados para evidenciar KPIs em minutos. Sem instalação, sem contratos.
            </p>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 text-left">
              {[{
                label: 'Gestores Públicos',
                description: 'Dashboards executivos, pactuações regionais e governança RNDS.',
                role: 'gestor' as const,
                navigateTo: '/prefeitura-dashboard',
                icon: Users
              }, {
                label: 'Gestão Hospitalar',
                description: 'Fluxos assistenciais, integração PACS e automações clínicas.',
                role: 'hospital' as const,
                navigateTo: '/dashboard',
                icon: Hospital
              }, {
                label: 'Laboratórios',
                description: 'Hub de coletas, TAT, RNDS e integrações privadas.',
                role: 'laboratorio' as const,
                navigateTo: '/laboratorios/visao-geral',
                icon: Microscope
              }, {
                label: 'Profissionais de Saúde',
                description: 'Workspace clínico com prontuário vivo e IA assistencial.',
                role: 'medico' as const,
                navigateTo: '/profile',
                icon: Stethoscope
              }, {
                label: 'Pacientes',
                description: 'Carteira digital, histórico longitudinal e alertas preventivos.',
                role: 'paciente' as const,
                navigateTo: '/profile',
                icon: HeartPulse
              }].map((entry) => {
                const Icon = entry.icon;
                return (
                  <Card key={entry.label} className="border border-white/10 bg-slate-900/80 backdrop-blur">
                    <CardHeader className="space-y-3">
                      <Icon className="w-8 h-8 text-emerald-300" />
                      <CardTitle className="text-slate-100">{entry.label}</CardTitle>
                      <CardDescription className="text-slate-400">
                        {entry.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button
                        className="w-full"
                        onClick={() => {
                          switchGuestRole(entry.role);
                          setTimeout(() => navigate(entry.navigateTo), 80);
                        }}
                      >
                        <ArrowRight className="w-4 h-4 mr-2" />Entrar como {entry.label.split(' ')[0]}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-20 bg-slate-900/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center space-y-4">
              <Badge className="bg-emerald-500/15 text-emerald-200 border border-emerald-400/20">Recursos premium</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-white">Do território ao genoma: um ecossistema completo.</h2>
              <p className="text-lg text-slate-300 max-w-4xl mx-auto">
                Conecte dados administrativos, clínicos e laboratoriais com guardrails de segurança, IA confiável e automação operacional.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[{
                icon: BarChart3,
                title: 'Analytics augmentado',
                description: 'Dashboards executivos, monitoramento de TAT, pactuações regionais e simulações financeiras.'
              }, {
                icon: Database,
                title: 'Interoperabilidade sem atrito',
                description: 'RNDS, GAL/LACEN, Fleury, Pardini, Dasa, hospitais de referência e APIs proprietárias.'
              }, {
                icon: Lock,
                title: 'Governança LGPD + ICP-Brasil',
                description: 'Consentimento granular, auditoria AuditEvent, cofre de credenciais, rotação e evidências CAPA.'
              }, {
                icon: Activity,
                title: 'IA assistencial segura',
                description: 'Assistentes clínicos com explainability, validação humana e rastreabilidade de decisões.'
              }, {
                icon: HeartPulse,
                title: 'Carteira digital do paciente',
                description: 'Histórico longitudinal, QR de emergência, prescrições e notificações inteligentes.'
              }, {
                icon: Wand2,
                title: 'Runbooks automatizados',
                description: 'Playbooks para RNDS, integrações privadas, cadeia de frio e contingência de dados.'
              }].map((feature) => {
                const Icon = feature.icon;
                return (
                  <Card key={feature.title} className="border border-white/10 bg-slate-900/85 backdrop-blur">
                    <CardHeader className="space-y-4">
                      <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-300/20 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-emerald-300" />
                      </div>
                      <CardTitle className="text-slate-100">{feature.title}</CardTitle>
                      <CardDescription className="text-slate-300">{feature.description}</CardDescription>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-20 bg-slate-950">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-12 lg:grid-cols-[1.1fr,0.9fr] items-center">
            <div className="space-y-6 text-left">
              <Badge className="bg-emerald-500/15 text-emerald-200 border border-emerald-500/30">Conversar com especialistas</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-white">Pronto para levar sua rede de saúde para o próximo nível?</h2>
              <p className="text-lg text-slate-300">
                Envie seus dados ou agende uma demonstração personalizada. Nossa equipe configura protótipos com dados sintéticos da sua região em até 72 horas.
              </p>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-300" /> Onboarding com RNDS e parceiros privados</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-300" /> Provas de conceito com dashboards dedicados</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-300" /> Suporte integrado para equipes técnicas e clínicas</li>
              </ul>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6 bg-slate-900/85 border border-white/10 rounded-3xl p-8 backdrop-blur">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="municipality" className="text-slate-200">Prefeitura / Instituição</Label>
                  <Input
                    id="municipality"
                    placeholder="Secretaria Municipal de Saúde"
                    value={formData.municipality}
                    onChange={(event) => handleInputChange('municipality', event.target.value)}
                    className="bg-slate-950/60 border-slate-700 text-slate-100"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact" className="text-slate-200">Nome do contato</Label>
                  <Input
                    id="contact"
                    placeholder="Nome completo"
                    value={formData.contact}
                    onChange={(event) => handleInputChange('contact', event.target.value)}
                    className="bg-slate-950/60 border-slate-700 text-slate-100"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-200">E-mail corporativo</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="contato@instituicao.gov.br"
                    value={formData.email}
                    onChange={(event) => handleInputChange('email', event.target.value)}
                    className="bg-slate-950/60 border-slate-700 text-slate-100"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-slate-200">Telefone</Label>
                  <Input
                    id="phone"
                    placeholder="(11) 99999-0000"
                    value={formData.phone}
                    onChange={(event) => handleInputChange('phone', event.target.value)}
                    className="bg-slate-950/60 border-slate-700 text-slate-100"
                  />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="population" className="text-slate-200">População atendida</Label>
                  <Input
                    id="population"
                    placeholder="Ex: 320.000 habitantes"
                    value={formData.population}
                    onChange={(event) => handleInputChange('population', event.target.value)}
                    className="bg-slate-950/60 border-slate-700 text-slate-100"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-200">Prioridade principal</Label>
                  <Select value={formData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                    <SelectTrigger className="bg-slate-950/60 border-slate-700 text-slate-100">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 text-slate-100">
                      <SelectItem value="rnns">Integração RNDS</SelectItem>
                      <SelectItem value="analytics">Analytics & KPIs</SelectItem>
                      <SelectItem value="telehealth">Telemedicina & Assistência</SelectItem>
                      <SelectItem value="lab">Laboratórios & Genômica</SelectItem>
                      <SelectItem value="patient">Experiência do paciente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="currentSystems" className="text-slate-200">Sistemas atuais</Label>
                <Input
                  id="currentSystems"
                  placeholder="Ex: e-SUS, MV Soul, Tasy, LIS próprio..."
                  value={formData.currentSystems}
                  onChange={(event) => handleInputChange('currentSystems', event.target.value)}
                  className="bg-slate-950/60 border-slate-700 text-slate-100"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mainChallenges" className="text-slate-200">Desafios principais</Label>
                <Textarea
                  id="mainChallenges"
                  placeholder="Descreva necessidades, metas e prazos."
                  value={formData.mainChallenges}
                  onChange={(event) => handleInputChange('mainChallenges', event.target.value)}
                  className="bg-slate-950/60 border-slate-700 text-slate-100 min-h-[120px]"
                />
              </div>
              <Button type="submit" size="lg" className="w-full">
                Enviar briefing e agendar conversa
              </Button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PublicHealthLanding;
