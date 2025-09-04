import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Calendar, CreditCard, Users, Star, ArrowRight, CheckCircle, Activity, Database, Smartphone } from 'lucide-react';
import LanguageSwitcher from '@/components/language/LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';
import heroShield from '@/assets/hero-shield.png';
import HowItWorksSection from './HowItWorksSection';

const LandingPage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleGetStarted = () => {
    navigate('/dashboard');
  };

  const features = [
    {
      icon: Shield,
      title: 'Dados Seguros',
      description: 'Criptografia de ponta a ponta e blockchain para máxima segurança dos seus dados médicos',
      highlight: 'Certificado LGPD'
    },
    {
      icon: Calendar,
      title: 'Agendamento Fácil',
      description: 'Gerencie consultas, exames e procedimentos em um só lugar com lembretes inteligentes',
      highlight: 'Sincronização automática'
    },
    {
      icon: CreditCard,
      title: 'Pagamentos Unificados',
      description: 'Centralize pagamentos médicos, planos de saúde e reembolsos em uma carteira digital',
      highlight: 'PIX e cartões aceitos'
    },
    {
      icon: Activity,
      title: 'Monitoramento Contínuo',
      description: 'Acompanhe métricas de saúde, medicamentos e resultados de exames em tempo real',
      highlight: 'IA para insights'
    }
  ];

  const benefits = [
    'Acesso completo aos seus dados médicos',
    'Integração com dispositivos wearables',
    'Relatórios personalizados e análises',
    'Compartilhamento seguro com médicos',
    'Backup automático em blockchain',
    'Suporte 24/7 especializado'
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="relative z-50 border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/f328f86f-9e20-428c-b571-91f861610d33.png" 
                alt="MedWallet Logo" 
                className="h-10 w-auto"
              />
              <span className="text-2xl font-bold text-foreground">MedWallet</span>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-muted-foreground hover:text-primary transition-colors">
                Recursos
              </a>
              <a href="#benefits" className="text-muted-foreground hover:text-primary transition-colors">
                Benefícios
              </a>
              <a href="#trust" className="text-muted-foreground hover:text-primary transition-colors">
                Segurança
              </a>
              <LanguageSwitcher />
              <Button onClick={handleGetStarted} size="sm">
                Entrar
              </Button>
            </nav>

            <div className="md:hidden flex items-center space-x-2">
              <LanguageSwitcher />
              <Button onClick={handleGetStarted} size="sm">
                Entrar
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="outline" className="w-fit">
                  Nova versão disponível
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Sua Saúde,{' '}
                  <span className="text-gradient-medical">Unificada</span>.
                  <br />
                  Sua Carteira,{' '}
                  <span className="text-gradient-medical">Inteligente</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  Gerencie consultas, prescrições e pagamentos de forma integrada e segura com a tecnologia blockchain do MedWallet
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={handleGetStarted} 
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Começar Gratuitamente
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg">
                  Ver Demonstração
                </Button>
              </div>

              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>Gratuito para sempre</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>Sem cartão de crédito</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 blur-3xl rounded-full" />
              <img 
                src={heroShield} 
                alt="MedWallet Security Shield" 
                className="relative z-10 w-full max-w-lg mx-auto animate-pulse-gentle"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">Recursos Principais</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Tudo que você precisa para gerenciar sua saúde de forma moderna e segura
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="relative group hover:shadow-lg transition-all duration-300 border-border/50">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <Badge variant="secondary" className="w-fit mx-auto mb-2">
                    {feature.highlight}
                  </Badge>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <HowItWorksSection />

      {/* Benefits Section */}
      <section id="benefits" className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl lg:text-4xl font-bold">
                  Por que escolher o MedWallet?
                </h2>
                <p className="text-xl text-muted-foreground">
                  Uma plataforma completa que revoluciona a forma como você cuida da sua saúde
                </p>
              </div>

              <div className="grid gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>

              <Button size="lg" onClick={handleGetStarted}>
                Experimente Agora
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card className="p-6 text-center border-border/50">
                <div className="text-3xl font-bold text-primary mb-2">10k+</div>
                <div className="text-muted-foreground">Usuários ativos</div>
              </Card>
              <Card className="p-6 text-center border-border/50">
                <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
                <div className="text-muted-foreground">Uptime</div>
              </Card>
              <Card className="p-6 text-center border-border/50">
                <div className="text-3xl font-bold text-primary mb-2">500+</div>
                <div className="text-muted-foreground">Hospitais parceiros</div>
              </Card>
              <Card className="p-6 text-center border-border/50">
                <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                <div className="text-muted-foreground">Suporte</div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section id="trust" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">Confiança e Segurança</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Seus dados médicos protegidos com a mais alta tecnologia de segurança
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
              <blockquote className="space-y-6">
                <div className="flex space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-lg italic">
                  "O MedWallet transformou como eu gerencio a saúde da minha família. 
                  Ter todos os dados médicos seguros e acessíveis em um só lugar é indispensável."
                </p>
                <footer className="text-muted-foreground">
                  — Sarah K., Usuária MedWallet
                </footer>
              </blockquote>
            </Card>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
                  <Shield className="h-6 w-6 text-success" />
                </div>
                <div>
                  <div className="font-semibold">Certificação LGPD</div>
                  <div className="text-sm text-muted-foreground">Conformidade total com a lei brasileira</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Database className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="font-semibold">Blockchain Security</div>
                  <div className="text-sm text-muted-foreground">Dados imutáveis e distribuídos</div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <Smartphone className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <div className="font-semibold">Acesso Móvel Seguro</div>
                  <div className="text-sm text-muted-foreground">Biometria e autenticação dupla</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="relative overflow-hidden p-12 text-center bg-gradient-to-br from-primary/10 via-background to-accent/10 border-primary/20">
            <div className="space-y-6 relative z-10">
              <h2 className="text-3xl lg:text-4xl font-bold">
                Pronto para revolucionar sua saúde?
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Junte-se a milhares de usuários que já confiam no MedWallet para cuidar da sua saúde
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" onClick={handleGetStarted}>
                  Começar Agora
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg">
                  Falar com Especialista
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <img 
                  src="/lovable-uploads/f328f86f-9e20-428c-b571-91f861610d33.png" 
                  alt="MedWallet Logo" 
                  className="h-8 w-auto"
                />
                <span className="text-xl font-bold">MedWallet</span>
              </div>
              <p className="text-muted-foreground">
                Sua saúde, unificada. Sua carteira, inteligente.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Produto</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Recursos</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Preços</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Integrações</a></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Suporte</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contato</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Status</a></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Legal</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Termos de Uso</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Política de Privacidade</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">LGPD</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border/50 mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 MedWallet. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;