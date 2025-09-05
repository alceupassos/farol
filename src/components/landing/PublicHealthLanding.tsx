import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfileAccess } from '@/contexts/ProfileAccessContext';
import { Button } from "@/components/ui/button";
import medicalTechBg from '@/assets/medical-tech-bg.jpg';
import medicalHeroBg from '@/assets/medical-hero-bg.jpg';
import { Squares } from '@/components/ui/squares-background';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from '@/components/layout/Navbar';
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { 
  Shield, 
  BarChart3, 
  Users, 
  MapPin, 
  Calendar,
  AlertTriangle,
  TrendingUp,
  Brain,
  Smartphone,
  Server,
  Lock,
  CheckCircle,
  ArrowRight,
  Building,
  DollarSign,
  Trophy,
  Target,
  Clock,
  FileText,
  Phone,
  Mail,
  LogIn,
  UserPlus,
  Stethoscope,
  Heart
} from 'lucide-react';
import AngraSaudeHero from './AngraSaudeHero';
import FivePillarsWithNeighborhoods from './FivePillarsWithNeighborhoods';
import NeighborhoodTransformation from './NeighborhoodTransformation';

const PublicHealthLanding = () => {
  const navigate = useNavigate();
  const { isFullAccessEnabled } = useProfileAccess();
  const [formData, setFormData] = useState({
    municipality: '',
    contact: '',
    email: '',
    phone: '',
    population: '',
    healthBudget: '',
    currentSystems: '',
    mainChallenges: '',
    priority: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Municipal contact form submitted:', formData);
    // Here would integrate with your backend
  };

  const handleDemoClick = () => {
    navigate('/demo');
  };

  const handleDocumentationClick = () => {
    navigate('/documentation');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/90 to-muted/20">
      <Navbar toggleSidebar={() => {}} />
      <div className="pt-16">
      {/* Hero Section - Angra Saúde */}
      <AngraSaudeHero />

      {/* Five Pillars Section */}
      <FivePillarsWithNeighborhoods />

      {/* Transformation Section */}
      <NeighborhoodTransformation />

      {/* Quick Access Section - Moved up for better visibility */}
      <section className="py-20 px-4 bg-gradient-to-br from-muted/10 to-background relative">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Acesso Rápido ao Sistema</h2>
          <p className="text-xl text-muted-foreground mb-12">
            Entre diretamente como demonstração para seu perfil
          </p>

          <div className={`grid gap-8 mb-12 ${isFullAccessEnabled ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1 max-w-md mx-auto'}`}>
            <Card className="group hover:shadow-2xl transition-all duration-500 border-2 border-primary/20 hover:border-primary/40 hover:scale-105 animate-scale-in bg-card/90 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/30 to-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gradient-to-br group-hover:from-primary/50 group-hover:to-primary/30 transition-all duration-300 group-hover:animate-pulse shadow-lg">
                  <Building className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">Gestor/Prefeitura</CardTitle>
                <CardDescription className="text-base">
                  Dashboards executivos e análise epidemiológica
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="default"
                  size="lg"
                  className="w-full text-lg py-3 shadow-lg hover:shadow-xl transition-all duration-300" 
                  onClick={() => navigate('/auth?role=gestor')}
                >
                  <Building className="w-5 h-5 mr-2" />
                  Acesso Gestor
                </Button>
              </CardContent>
            </Card>

            {isFullAccessEnabled && (
            <Card className="group hover:shadow-2xl transition-all duration-300 border-2 border-secondary/20 hover:border-secondary/40 bg-card/90 backdrop-blur-sm hover:scale-105">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-secondary/30 to-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary/40 transition-colors shadow-lg">
                  <Stethoscope className="w-8 h-8 text-secondary" />
                </div>
                <CardTitle className="text-xl group-hover:text-secondary transition-colors">Médico/Profissional</CardTitle>
                <CardDescription className="text-base">
                  Prontuários e análise de exames com IA
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="secondary" 
                  size="lg"
                  className="w-full text-lg py-3 shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => navigate('/auth?role=medico')}
                >
                  <Stethoscope className="w-5 h-5 mr-2" />
                  Acesso Médico
                </Button>
              </CardContent>
            </Card>
            )}

            {isFullAccessEnabled && (
            <Card className="group hover:shadow-2xl transition-all duration-300 border-2 border-accent/20 hover:border-accent/40 bg-card/90 backdrop-blur-sm hover:scale-105">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-accent/30 to-accent/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/40 transition-colors shadow-lg">
                  <Heart className="w-8 h-8 text-accent" />
                </div>
                <CardTitle className="text-xl group-hover:text-accent transition-colors">Paciente</CardTitle>
                <CardDescription className="text-base">
                  Histórico médico e cartão digital de saúde
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="w-full text-lg py-3 border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => navigate('/auth?role=paciente')}
                >
                  <Heart className="w-5 h-5 mr-2" />
                  Acesso Paciente
                </Button>
              </CardContent>
            </Card>
            )}
          </div>
        </div>
      </section>

      {/* Key Features Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Recursos Principais</h2>
            <p className="text-xl text-muted-foreground">Tecnologia de ponta para gestão eficiente da saúde municipal</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-2xl transition-all duration-500 border-0 glass-morphism hover:scale-105 animate-fade-in">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-gradient-to-br group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-300 group-hover:animate-float">
                  <BarChart3 className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="group-hover:text-primary transition-colors">Dashboards Executivos</CardTitle>
                <CardDescription>
                  Visualizações em tempo real para prefeitos e secretários tomarem decisões baseadas em dados
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-card to-muted/30">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
                  <Brain className="w-6 h-6 text-secondary" />
                </div>
                <CardTitle>Análise Epidemiológica IA</CardTitle>
                <CardDescription>
                  Predição de surtos, análise de tendências e alertas automáticos para tomada de decisão proativa
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-card to-muted/30">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <Users className="w-6 h-6 text-accent" />
                </div>
                <CardTitle>Gestão de Recursos</CardTitle>
                <CardDescription>
                  Otimização inteligente de equipes, agendamentos e alocação de recursos médicos
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-card to-muted/30">
              <CardHeader>
                <div className="w-12 h-12 bg-chart-1/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-chart-1/20 transition-colors">
                  <MapPin className="w-6 h-6 text-chart-1" />
                </div>
                <CardTitle>Mapas de Calor</CardTitle>
                <CardDescription>
                  Visualização geográfica de indicadores de saúde, focos de doenças e cobertura de serviços
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-card to-muted/30">
              <CardHeader>
                <div className="w-12 h-12 bg-chart-2/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-chart-2/20 transition-colors">
                  <Shield className="w-6 h-6 text-chart-2" />
                </div>
                <CardTitle>Conformidade Legal</CardTitle>
                <CardDescription>
                  Total conformidade com LGPD, transparência pública e requisitos de auditoria do SUS
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-card to-muted/30">
              <CardHeader>
                <div className="w-12 h-12 bg-chart-3/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-chart-3/20 transition-colors">
                  <Smartphone className="w-6 h-6 text-chart-3" />
                </div>
                <CardTitle>Integração SUS</CardTitle>
                <CardDescription>
                  Conectividade nativa com DataSUS, e-SUS, Gov.br e outros sistemas governamentais
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-muted/20 via-primary/5 to-secondary/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-background/50 to-transparent" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-foreground via-primary to-secondary bg-clip-text text-transparent">Benefícios para seu Município</h2>
            <p className="text-xl text-muted-foreground">Resultados comprovados em gestão pública de saúde</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4 group animate-slide-up">
              <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center mx-auto group-hover:bg-gradient-to-br group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-300 group-hover:scale-110">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">+35%</h3>
              <p className="text-muted-foreground group-hover:text-foreground transition-colors">Melhoria na eficiência operacional</p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                <DollarSign className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-2xl font-bold">-25%</h3>
              <p className="text-muted-foreground">Redução nos custos operacionais</p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                <Clock className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-2xl font-bold">-50%</h3>
              <p className="text-muted-foreground">Redução no tempo de atendimento</p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-chart-1/10 rounded-full flex items-center justify-center mx-auto">
                <Trophy className="w-8 h-8 text-chart-1" />
              </div>
              <h3 className="text-2xl font-bold">+90%</h3>
              <p className="text-muted-foreground">Satisfação dos cidadãos</p>
            </div>
          </div>
        </div>
      </section>


      {/* Municipal Contact Form */}
      <section className="py-20 px-4 bg-gradient-to-br from-muted/20 to-background">
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl">Solicite uma Demonstração</CardTitle>
              <CardDescription className="text-lg">
                Nossa equipe especializada entrará em contato em até 24h
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="municipality">Município *</Label>
                    <Input 
                      id="municipality"
                      placeholder="Nome do município"
                      value={formData.municipality}
                      onChange={(e) => handleInputChange('municipality', e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact">Nome do Responsável *</Label>
                    <Input 
                      id="contact"
                      placeholder="Secretário(a) ou responsável"
                      value={formData.contact}
                      onChange={(e) => handleInputChange('contact', e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail Institucional *</Label>
                    <Input 
                      id="email"
                      type="email"
                      placeholder="email@prefeitura.gov.br"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone *</Label>
                    <Input 
                      id="phone"
                      placeholder="(11) 99999-9999"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="population">População</Label>
                    <Select onValueChange={(value) => handleInputChange('population', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Porte do município" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="micro">Até 20.000 hab</SelectItem>
                        <SelectItem value="small">20.000 - 50.000 hab</SelectItem>
                        <SelectItem value="medium">50.000 - 100.000 hab</SelectItem>
                        <SelectItem value="large">100.000 - 500.000 hab</SelectItem>
                        <SelectItem value="metro">Acima de 500.000 hab</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="priority">Prioridade Principal</Label>
                    <Select onValueChange={(value) => handleInputChange('priority', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Principal desafio" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="efficiency">Eficiência Operacional</SelectItem>
                        <SelectItem value="transparency">Transparência e Auditoria</SelectItem>
                        <SelectItem value="prevention">Medicina Preventiva</SelectItem>
                        <SelectItem value="integration">Integração de Sistemas</SelectItem>
                        <SelectItem value="costs">Redução de Custos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="challenges">Principais Desafios Atuais</Label>
                  <Textarea 
                    id="challenges"
                    placeholder="Descreva os principais desafios da gestão de saúde no seu município..."
                    rows={4}
                    value={formData.mainChallenges}
                    onChange={(e) => handleInputChange('mainChallenges', e.target.value)}
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button type="submit" size="lg" className="flex-1">
                    <Calendar className="w-5 h-5 mr-2" />
                    Solicitar Demonstração
                  </Button>
                  <Button type="button" variant="outline" size="lg">
                    <Phone className="w-5 h-5 mr-2" />
                    Ligar Agora: (11) 3000-0000
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">
            Pronto para Transformar a Saúde Pública?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Junte-se aos municípios que já estão revolucionando a gestão de saúde pública
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-4">
              Começar Implementação
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4">
              <Mail className="w-5 h-5 mr-2" />
              Falar com Especialista
            </Button>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
};

export default PublicHealthLanding;