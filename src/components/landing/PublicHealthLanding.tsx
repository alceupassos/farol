import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
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
  Building,
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
  Wand2,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';
import PlaceholderImage from './ImagePlaceholders';

// Using professional healthcare images - mapped to represent specific healthcare concepts
// Image 1: Global Health Network (futuristic network visualization)
const heroNetwork = '/repo_landing/health-ecosystem-network.png';
// Image 5: Laboratory Operations Dashboard (lab control systems)
const labOperationsReal = '/repo_landing/50067579-7380-49c5-9134-15db818306f6.png';
// Image 4: Radiology AI (medical imaging with AI)
const radiologyAI = '/repo_landing/7195aac8-8d2c-4be8-88ad-119e62df8eae.png';
// Image 6: Business Intelligence (professionals analyzing health dashboards)
const businessIntelligence = '/repo_landing/9213d23c-6135-4f2a-b542-e615da0e1fc2.png';
// Image 2: Executive Financial Dashboard (quarterly revenue metrics)
const quarterlyRevenueReal = '/repo_landing/bfbb24a3-44a4-473b-a5f0-5ad421382991.png';
// Image 3: Global Data Analytics (worldwide health data visualization)
const dataAnalyticsIllustration = '/repo_landing/d8f4b70f-719b-44b5-83ef-24b5d35a8694.png';

type PersonaId = 'governments' | 'secretaries' | 'imaging' | 'laboratories' | 'professionals' | 'citizens';
type PreviewId = 'executive360' | 'aiOrchestration' | 'labGreen';
type ShowcaseId = 'dataIntelligence' | 'operationalAnalytics' | 'globalNetwork';
type AccessCardId = 'publicManagers' | 'hospitalManagement' | 'laboratories' | 'professionals' | 'patients';
type FeatureCardId = 'analytics' | 'interoperability' | 'governance' | 'assistiveAI' | 'patientWallet' | 'runbooks';

interface HeroContent {
  badge: string;
  title: string;
  description: string;
  ctaPrimary: string;
  ctaSecondary: string;
  stats: Array<{ label: string; value: string }>;
  impact: {
    title: string;
    badge: string;
    metrics: Array<{ label: string; value: string }>;
    note: string;
    footerBadge: string;
    footerDescription: string;
  };
}

interface GalleryContent {
  badge: string;
  title: string;
  description: string;
  lockNote: string;
  cards: Array<{ id: ShowcaseId; title: string; description: string; accent: string }>;
  repositoryBadge: string;
  repositoryDescription: string;
}

interface PersonaTranslation {
  id: PersonaId;
  title: string;
  subtitle: string;
  description: string;
  metrics: string[];
  buttonLabel: string;
  tag: string;
}

interface ImmersiveContent {
  badge: string;
  title: string;
  description: string;
  cards: Array<{ id: PreviewId; title: string; description: string; badge: string; alt: string }>;
  repositoryNote: string;
  liveDemo: string;
}

interface AccessContent {
  badge: string;
  title: string;
  description: string;
  cards: Array<{ id: AccessCardId; label: string; description: string; button: string }>;
}

interface FeaturesContent {
  badge: string;
  title: string;
  description: string;
  cards: Array<{ id: FeatureCardId; title: string; description: string }>;
}

interface ContactContent {
  badge: string;
  title: string;
  description: string;
  bullets: string[];
  form: {
    fields: {
      municipality: { label: string; placeholder: string };
      contact: { label: string; placeholder: string };
      email: { label: string; placeholder: string };
      phone: { label: string; placeholder: string };
      population: { label: string; placeholder: string };
      currentSystems: { label: string; placeholder: string };
      mainChallenges: { label: string; placeholder: string };
    };
    select: {
      label: string;
      placeholder: string;
      options: {
        rnns: string;
        analytics: string;
        telehealth: string;
        lab: string;
        patient: string;
      };
    };
    submit: string;
  };
}

const gradientBlock = (route: string) => `bg-gradient-to-br ${route}`;

const personaIconMap: Record<PersonaId, React.ComponentType<{ className?: string }>> = {
  governments: ShieldCheck,
  secretaries: Layers,
  imaging: Hospital,
  laboratories: Microscope,
  professionals: Stethoscope,
  citizens: HeartPulse,
};

const personaAccentMap: Record<PersonaId, string> = {
  governments: 'from-emerald-500/80 via-emerald-400/70 to-teal-500/80',
  secretaries: 'from-cyan-500/80 via-sky-500/70 to-blue-500/80',
  imaging: 'from-purple-500/80 via-fuchsia-500/70 to-indigo-500/80',
  laboratories: 'from-amber-500/80 via-orange-500/70 to-red-500/80',
  professionals: 'from-rose-500/80 via-pink-500/70 to-red-400/80',
  citizens: 'from-slate-500/80 via-slate-400/70 to-slate-300/80',
};

const personaRoleMap: Record<PersonaId, 'gestor' | 'medico' | 'paciente' | 'hospital' | 'laboratorio'> = {
  governments: 'gestor',
  secretaries: 'gestor',
  imaging: 'hospital',
  laboratories: 'laboratorio',
  professionals: 'medico',
  citizens: 'paciente',
};

const personaNavigateMap: Record<PersonaId, string> = {
  governments: '/prefeitura-dashboard',
  secretaries: '/dashboard',
  imaging: '/dashboard',
  laboratories: '/laboratorios/visao-geral',
  professionals: '/profile',
  citizens: '/profile',
};

const previewAssets: Record<PreviewId, { image: string; gradient: string }> = {
  executive360: {
    image: quarterlyRevenueReal,
    gradient: gradientBlock('from-emerald-600/80 via-slate-900/70 to-slate-950/80'),
  },
  aiOrchestration: {
    image: radiologyAI,
    gradient: gradientBlock('from-indigo-600/80 via-slate-900/70 to-slate-950/80'),
  },
  labGreen: {
    image: labOperationsReal,
    gradient: gradientBlock('from-amber-600/80 via-slate-900/70 to-slate-950/80'),
  },
};

const showcaseAssets: Record<ShowcaseId, { image: string; gradient: string }> = {
  dataIntelligence: {
    image: businessIntelligence,
    gradient: 'from-cyan-500/40 via-slate-900/70 to-slate-950/90',
  },
  operationalAnalytics: {
    image: dataAnalyticsIllustration,
    gradient: 'from-fuchsia-500/40 via-slate-900/70 to-slate-950/90',
  },
  globalNetwork: {
    image: heroNetwork,
    gradient: 'from-emerald-500/40 via-slate-900/70 to-slate-950/90',
  },
};

const accessIconMap: Record<AccessCardId, React.ComponentType<{ className?: string }>> = {
  publicManagers: Users,
  hospitalManagement: Building,
  laboratories: Microscope,
  professionals: Stethoscope,
  patients: HeartPulse,
};

const accessRoleMap: Record<AccessCardId, 'gestor' | 'hospital' | 'laboratorio' | 'medico' | 'paciente'> = {
  publicManagers: 'gestor',
  hospitalManagement: 'hospital',
  laboratories: 'laboratorio',
  professionals: 'medico',
  patients: 'paciente',
};

const accessNavigateMap: Record<AccessCardId, string> = {
  publicManagers: '/prefeitura-dashboard',
  hospitalManagement: '/hospitals-access',
  laboratories: '/laboratorios/visao-geral',
  professionals: '/profile',
  patients: '/profile',
};

const featureIconMap: Record<FeatureCardId, React.ComponentType<{ className?: string }>> = {
  analytics: BarChart3,
  interoperability: Database,
  governance: Lock,
  assistiveAI: Activity,
  patientWallet: HeartPulse,
  runbooks: Wand2,
};

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

const PublicHealthLanding = () => {
  const navigate = useNavigate();
  const { switchGuestRole } = useAuth();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    municipality: '',
    contact: '',
    email: '',
    phone: '',
    population: '',
    currentSystems: '',
    mainChallenges: '',
    priority: '',
  });

  const heroContent = t('landing.publicHealth.hero', { returnObjects: true }) as HeroContent;
  const galleryContent = t('landing.publicHealth.gallery', { returnObjects: true }) as GalleryContent;
  const personaContent = t('landing.publicHealth.personas', { returnObjects: true }) as {
    badge: string;
    title: string;
    description: string;
    cards: PersonaTranslation[];
  };
  const immersiveContent = t('landing.publicHealth.immersion', { returnObjects: true }) as ImmersiveContent;
  const accessContent = t('landing.publicHealth.access', { returnObjects: true }) as AccessContent;
  const featuresContent = t('landing.publicHealth.features', { returnObjects: true }) as FeaturesContent;
  const contactContent = t('landing.publicHealth.contact', { returnObjects: true }) as ContactContent;

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Municipal contact form submitted:', formData);
  };

  const personaCards = useMemo<PersonaCard[]>(
    () =>
      personaContent.cards.map((card) => ({
        title: card.title,
        subtitle: card.subtitle,
        description: card.description,
        metrics: card.metrics,
        buttonLabel: card.buttonLabel,
        tag: card.tag,
        icon: personaIconMap[card.id],
        role: personaRoleMap[card.id],
        navigateTo: personaNavigateMap[card.id],
        accent: personaAccentMap[card.id],
      })),
    [personaContent.cards]
  );

  const showcaseCards = galleryContent.cards.map((card) => ({
    ...card,
    image: showcaseAssets[card.id]?.image ?? heroNetwork,
    gradient: showcaseAssets[card.id]?.gradient ?? 'from-emerald-500/40 via-slate-900/70 to-slate-950/90',
  }));

  const previewScreens = immersiveContent.cards.map((card) => ({
    ...card,
    image: previewAssets[card.id]?.image ?? quarterlyRevenueReal,
    gradient: previewAssets[card.id]?.gradient ?? gradientBlock('from-emerald-600/80 via-slate-900/70 to-slate-950/80'),
  }));

  const accessCards = accessContent.cards.map((card) => ({
    ...card,
    icon: accessIconMap[card.id],
    role: accessRoleMap[card.id],
    navigateTo: accessNavigateMap[card.id],
  }));

  const featureCards = featuresContent.cards.map((card) => ({
    ...card,
    icon: featureIconMap[card.id],
  }));

  const hasImpactFooter = Boolean(
    heroContent.impact.footerBadge?.trim() || heroContent.impact.footerDescription?.trim()
  );

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar toggleSidebar={() => {}} />
      <main className="pt-16">
        <section className="relative overflow-hidden bg-slate-950">
          <div className="absolute inset-0 pointer-events-none">
            <motion.img
              src={heroNetwork}
              alt={t('landing.publicHealth.images.heroAlt')}
              className="w-full h-full object-cover opacity-30 mix-blend-screen"
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.3 }}
              transition={{ duration: 1.6, ease: 'easeOut' }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-950/70 to-cyan-900/30" />
            <div className="absolute -top-40 -left-32 h-[26rem] w-[26rem] rounded-full bg-emerald-500/25 blur-3xl" />
            <div className="absolute top-24 -right-24 h-[30rem] w-[30rem] rounded-full bg-cyan-500/25 blur-[140px]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.14),_transparent_55%)]" />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
            <div className="grid lg:grid-cols-[1.15fr,0.85fr] gap-12 xl:gap-20 items-center">
              <div className="space-y-10">
                <motion.div
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-emerald-500/15 text-emerald-100 border border-emerald-400/30 backdrop-blur"
                  initial={{ y: -12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.6, ease: 'easeOut' }}
                >
                  <Sparkles className="w-4 h-4" />
                  {heroContent.badge}
                </motion.div>
                <motion.h1
                  className="text-4xl md:text-5xl xl:text-6xl font-bold text-white leading-tight tracking-tight"
                  initial={{ y: 28, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.7, ease: 'easeOut' }}
                >
                  {heroContent.title}
                </motion.h1>
                <motion.p
                  className="text-lg md:text-xl text-slate-300/90 max-w-3xl"
                  initial={{ y: 32, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.35, duration: 0.7, ease: 'easeOut' }}
                >
                  {heroContent.description}
                </motion.p>
                <motion.div
                  className="flex flex-col sm:flex-row gap-4"
                  initial={{ y: 32, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.45, duration: 0.7, ease: 'easeOut' }}
                >
                  <Button
                    size="lg"
                    className="px-8 py-6 text-lg shadow-[0_25px_60px_-20px_rgba(16,185,129,0.55)] bg-gradient-to-r from-emerald-400 to-emerald-600 text-emerald-950 hover:from-emerald-300 hover:to-emerald-500"
                    onClick={() => navigate('/login')}
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    {heroContent.ctaPrimary}
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="px-8 py-6 text-lg border-slate-500/70 text-slate-100 hover:bg-slate-900/60 backdrop-blur"
                    onClick={() => navigate('/documentation')}
                  >
                    <Layers className="w-5 h-5 mr-2" />
                    {heroContent.ctaSecondary}
                  </Button>
                </motion.div>
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-slate-300"
                  initial={{ y: 32, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.7, ease: 'easeOut' }}
                >
                  {heroContent.stats.map((item) => (
                    <div
                      key={item.label}
                      className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-lg"
                    >
                      <div className="absolute -top-10 right-0 h-24 w-24 rounded-full bg-emerald-500/10 blur-2xl" />
                      <p className="text-xs uppercase tracking-[0.24em] text-slate-400 mb-2">{item.label}</p>
                      <p className="text-base font-medium text-white">{item.value}</p>
                    </div>
                  ))}
                </motion.div>
              </div>
              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 48 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.8, ease: 'easeOut' }}
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-400/20 via-cyan-500/15 to-transparent blur-3xl" />
                <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-slate-950/70 backdrop-blur-xl p-8 shadow-[0_30px_70px_-25px_rgba(15,118,110,0.45)]">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-slate-200">{heroContent.impact.title}</p>
                      <Badge variant="outline" className="border-emerald-400/40 text-emerald-200 bg-emerald-500/10">
                        {heroContent.impact.badge}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-left">
                      {heroContent.impact.metrics.map((metric) => (
                        <div
                          key={metric.label}
                          className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4"
                        >
                          <div className="absolute inset-x-0 -top-8 h-16 bg-gradient-to-b from-emerald-400/20 via-emerald-400/0" />
                          <span className="text-3xl font-semibold text-emerald-300 drop-shadow-sm">{metric.value}</span>
                          <p className="text-xs text-slate-400 mt-2 leading-relaxed">{metric.label}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                      {heroContent.impact.note}
                    </div>
                    {hasImpactFooter && (
                      <motion.div
                        className="relative overflow-hidden rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-4"
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.75, duration: 0.6, ease: 'easeOut' }}
                      >
                        {heroContent.impact.footerBadge?.trim() && (
                          <p className="text-xs uppercase tracking-[0.3em] text-emerald-200 mb-2">
                            {heroContent.impact.footerBadge}
                          </p>
                        )}
                        {heroContent.impact.footerDescription?.trim() && (
                          <p className="text-sm text-emerald-100">
                            {heroContent.impact.footerDescription}
                          </p>
                        )}
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
              <div className="space-y-3 max-w-2xl">
                <Badge className="bg-white/10 text-white border border-white/15">{galleryContent.badge}</Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">{galleryContent.title}</h2>
                <p className="text-lg text-slate-300">
                  {galleryContent.description}{' '}
                  <code className="font-mono text-xs bg-white/5 px-1 py-0.5 rounded">public/repo_image</code>.
                </p>
              </div>
              <div className="text-sm text-slate-400 max-w-md">
                <p className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  {galleryContent.lockNote}
                </p>
              </div>
            </div>
            <div className="grid gap-8 lg:grid-cols-[1.2fr,0.8fr]">
              {showcaseCards.length > 0 ? (
                <motion.div
                  className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/70 shadow-[0_40px_80px_-40px_rgba(15,118,110,0.5)]"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.65, ease: 'easeOut' }}
                >
                  <img
                    src={showcaseCards[0].image}
                    alt={showcaseCards[0].title}
                    className="h-[420px] w-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${showcaseCards[0].gradient} opacity-40`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/20 to-transparent p-8 space-y-3">
                    <Badge className="bg-emerald-500/15 text-emerald-100 border border-emerald-500/30">
                      {showcaseCards[0].accent}
                    </Badge>
                    <h3 className="text-2xl font-semibold text-white">{showcaseCards[0].title}</h3>
                    <p className="text-slate-300 text-sm leading-relaxed">{showcaseCards[0].description}</p>
                  </div>
                </motion.div>
              ) : (
                <PlaceholderImage
                  type="network"
                  className="h-[420px] rounded-3xl"
                  alt={t('landing.publicHealth.images.placeholderAlt')}
                />
              )}
              <div className="space-y-8">
                {showcaseCards.slice(1).map((item, index) => (
                  <motion.div
                    key={item.title}
                    className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: 0.1 * (index + 1), duration: 0.55, ease: 'easeOut' }}
                  >
                    <div className="grid md:grid-cols-[0.9fr,1.1fr]">
                      <div className="relative h-48 md:h-full">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-cover"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-40`} />
                      </div>
                      <div className="p-6 space-y-3 text-slate-200 bg-slate-950/80">
                        <Badge className="w-fit bg-white/10 text-white border border-white/15">{item.accent}</Badge>
                        <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                        <p className="text-sm text-slate-300 leading-relaxed">{item.description}</p>
                        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-slate-500">
                          <Database className="w-3 h-3" />
                          {galleryContent.repositoryBadge}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
            <div className="text-center space-y-4">
              <Badge className="bg-white/10 text-slate-200 border border-white/20">{personaContent.badge}</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-white">{personaContent.title}</h2>
              <p className="text-lg text-slate-300 max-w-3xl mx-auto">{personaContent.description}</p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {personaCards.map((persona) => {
                const Icon = persona.icon;
                return (
                  <div key={persona.title} className="group">
                    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-slate-950/90 p-8 shadow-xl transition-transform duration-300 group-hover:-translate-y-1">
                      <div className={`absolute -top-24 -right-24 h-48 w-48 rounded-full blur-3xl opacity-60 ${persona.accent}`} />
                      <div className="relative z-10 space-y-6">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="border-white/30 text-white/80">
                            {persona.tag}
                          </Badge>
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

        <section className="py-24 bg-slate-900/60 backdrop-blur relative overflow-hidden">
          <div className="absolute inset-x-0 top-10 h-96 bg-[radial-gradient(circle,_rgba(45,212,191,0.12)_0%,_rgba(15,23,42,0)_70%)]" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
            <div className="text-center space-y-3">
              <Badge className="bg-emerald-500/15 text-emerald-200 border border-emerald-500/30">
                {immersiveContent.badge}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-white">{immersiveContent.title}</h2>
              <p className="text-lg text-slate-300 max-w-3xl mx-auto">{immersiveContent.description}</p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {previewScreens.map((screen, index) => (
                <motion.article
                  key={screen.title}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/70 shadow-[0_40px_70px_-40px_rgba(15,118,110,0.45)]"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: index * 0.15, duration: 0.6, ease: 'easeOut' }}
                >
                  <div className="relative h-60">
                    <img
                      src={screen.image}
                      alt={screen.alt}
                      className="h-full w-full object-cover"
                    />
                    <div className={`absolute inset-0 ${screen.gradient} opacity-40`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/10 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-white/90 text-slate-900 shadow-sm">{screen.badge}</Badge>
                    </div>
                    <motion.div
                      className="absolute bottom-6 left-6 right-6 space-y-2 text-white"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.8 }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                    >
                      <h3 className="text-lg font-semibold">{screen.title}</h3>
                      <p className="text-sm text-white/80 leading-relaxed">{screen.description}</p>
                    </motion.div>
                  </div>
                  <div className="bg-slate-950/95 p-6 border-t border-white/10 text-sm text-slate-300 space-y-3">
                    <div className="flex items-start gap-3">
                      <Wand2 className="w-4 h-4 text-emerald-300 mt-0.5" />
                      <p>{immersiveContent.repositoryNote}</p>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-500 uppercase tracking-[0.25em]">
                      <Activity className="w-3 h-3" />
                      {immersiveContent.liveDemo}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-slate-950">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <Badge className="bg-white/10 text-white border border-white/20">{accessContent.badge}</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white">{accessContent.title}</h2>
            <p className="text-lg text-slate-300">{accessContent.description}</p>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 text-left">
              {accessCards.map((entry) => {
                const Icon = entry.icon;
                return (
                  <Card key={entry.id} className="border border-white/10 bg-slate-900/85 backdrop-blur">
                    <CardHeader className="space-y-4">
                      <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-300/20 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-emerald-300" />
                      </div>
                      <CardTitle className="text-slate-100">{entry.label}</CardTitle>
                      <CardDescription className="text-slate-400">{entry.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button
                        className="w-full"
                        onClick={() => {
                          switchGuestRole(entry.role);
                          setTimeout(() => navigate(entry.navigateTo), 80);
                        }}
                      >
                        <ArrowRight className="w-4 h-4 mr-2" />
                        {entry.button}
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
              <Badge className="bg-emerald-500/15 text-emerald-200 border border-emerald-400/20">
                {featuresContent.badge}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-white">{featuresContent.title}</h2>
              <p className="text-lg text-slate-300 max-w-4xl mx-auto">{featuresContent.description}</p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {featureCards.map((feature) => {
                const Icon = feature.icon;
                return (
                  <Card key={feature.id} className="border border-white/10 bg-slate-900/85 backdrop-blur">
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
              <Badge className="bg-emerald-500/15 text-emerald-200 border border-emerald-500/30">
                {contactContent.badge}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-white">{contactContent.title}</h2>
              <p className="text-lg text-slate-300">{contactContent.description}</p>
              <ul className="space-y-3 text-sm text-slate-300">
                {contactContent.bullets.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6 bg-slate-900/85 border border-white/10 rounded-3xl p-8 backdrop-blur">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="municipality" className="text-slate-200">
                    {contactContent.form.fields.municipality.label}
                  </Label>
                  <Input
                    id="municipality"
                    placeholder={contactContent.form.fields.municipality.placeholder}
                    value={formData.municipality}
                    onChange={(event) => handleInputChange('municipality', event.target.value)}
                    className="bg-slate-950/60 border-slate-700 text-slate-100"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact" className="text-slate-200">
                    {contactContent.form.fields.contact.label}
                  </Label>
                  <Input
                    id="contact"
                    placeholder={contactContent.form.fields.contact.placeholder}
                    value={formData.contact}
                    onChange={(event) => handleInputChange('contact', event.target.value)}
                    className="bg-slate-950/60 border-slate-700 text-slate-100"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-200">
                    {contactContent.form.fields.email.label}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={contactContent.form.fields.email.placeholder}
                    value={formData.email}
                    onChange={(event) => handleInputChange('email', event.target.value)}
                    className="bg-slate-950/60 border-slate-700 text-slate-100"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-slate-200">
                    {contactContent.form.fields.phone.label}
                  </Label>
                  <Input
                    id="phone"
                    placeholder={contactContent.form.fields.phone.placeholder}
                    value={formData.phone}
                    onChange={(event) => handleInputChange('phone', event.target.value)}
                    className="bg-slate-950/60 border-slate-700 text-slate-100"
                  />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="population" className="text-slate-200">
                    {contactContent.form.fields.population.label}
                  </Label>
                  <Input
                    id="population"
                    placeholder={contactContent.form.fields.population.placeholder}
                    value={formData.population}
                    onChange={(event) => handleInputChange('population', event.target.value)}
                    className="bg-slate-950/60 border-slate-700 text-slate-100"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-200">{contactContent.form.select.label}</Label>
                  <Select value={formData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                    <SelectTrigger className="bg-slate-950/60 border-slate-700 text-slate-100">
                      <SelectValue placeholder={contactContent.form.select.placeholder} />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 text-slate-100">
                      <SelectItem value="rnns">{contactContent.form.select.options.rnns}</SelectItem>
                      <SelectItem value="analytics">{contactContent.form.select.options.analytics}</SelectItem>
                      <SelectItem value="telehealth">{contactContent.form.select.options.telehealth}</SelectItem>
                      <SelectItem value="lab">{contactContent.form.select.options.lab}</SelectItem>
                      <SelectItem value="patient">{contactContent.form.select.options.patient}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="currentSystems" className="text-slate-200">
                  {contactContent.form.fields.currentSystems.label}
                </Label>
                <Input
                  id="currentSystems"
                  placeholder={contactContent.form.fields.currentSystems.placeholder}
                  value={formData.currentSystems}
                  onChange={(event) => handleInputChange('currentSystems', event.target.value)}
                  className="bg-slate-950/60 border-slate-700 text-slate-100"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mainChallenges" className="text-slate-200">
                  {contactContent.form.fields.mainChallenges.label}
                </Label>
                <Textarea
                  id="mainChallenges"
                  placeholder={contactContent.form.fields.mainChallenges.placeholder}
                  value={formData.mainChallenges}
                  onChange={(event) => handleInputChange('mainChallenges', event.target.value)}
                  className="bg-slate-950/60 border-slate-700 text-slate-100 min-h-[120px]"
                />
              </div>
              <Button type="submit" size="lg" className="w-full">
                {contactContent.form.submit}
              </Button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PublicHealthLanding;
