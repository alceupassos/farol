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
    <div className="min-h-screen" style={{
      background: 'linear-gradient(135deg, hsl(210, 20%, 8%) 0%, hsl(18, 100%, 50%, 0.1) 50%, hsl(180, 100%, 50%, 0.1) 100%)'
    }}>
      {/* Header */}
      <header className="relative z-50 border-b border-orange-500/20 bg-slate-900/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/f328f86f-9e20-428c-b571-91f861610d33.png" 
                alt="MedWallet Logo" 
                className="h-10 w-auto"
              />
              <span className="text-2xl font-bold text-white">Saúde Pública</span>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-orange-500 transition-colors">
                Recursos
              </a>
              <a href="#benefits" className="text-gray-300 hover:text-orange-500 transition-colors">
                Benefícios
              </a>
              <a href="#trust" className="text-gray-300 hover:text-orange-500 transition-colors">
                Segurança
              </a>
              <LanguageSwitcher />
              <Button 
                onClick={handleGetStarted} 
                size="sm"
                className="bg-orange-500 hover:bg-orange-600 text-white transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-orange-500/25"
              >
                Entrar
              </Button>
            </nav>

            <div className="md:hidden flex items-center space-x-2">
              <LanguageSwitcher />
              <Button 
                onClick={handleGetStarted} 
                size="sm"
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                Entrar
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ 
            backgroundImage: `url('/lovable-uploads/f4731860-a224-4e16-b81d-315aed901499.png')`,
          }}
        />
        
        {/* Gradient Overlays */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(135deg, rgba(255, 102, 0, 0.2) 0%, transparent 50%, rgba(0, 188, 212, 0.2) 100%)'
        }} />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to top, rgba(33, 41, 60, 0.8) 0%, transparent 100%)'
        }} />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="outline" className="w-fit border-orange-500 text-orange-500 bg-orange-500/10">
                  Nova versão disponível
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight text-white">
                  Sua Saúde,{' '}
                  <span 
                    className="bg-clip-text text-transparent"
                    style={{
                      backgroundImage: 'linear-gradient(135deg, #ff6600 0%, #00bcd4 50%, #4caf50 100%)'
                    }}
                  >
                    Unificada
                  </span>
                  .
                  <br />
                  Sua Carteira,{' '}
                  <span 
                    className="bg-clip-text text-transparent"
                    style={{
                      backgroundImage: 'linear-gradient(135deg, #ff6600 0%, #00bcd4 50%, #4caf50 100%)'
                    }}
                  >
                    Inteligente
                  </span>
                </h1>
                <p className="text-xl text-gray-300 max-w-lg">
                  Gerencie consultas, prescrições e dados de saúde de forma integrada e segura com o Sistema de Saúde Pública
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={handleGetStarted} 
                  size="lg"
                  className="relative overflow-hidden transform hover:scale-105 transition-all duration-300"
                  style={{
                    background: 'linear-gradient(135deg, #ff6600 0%, #ff8533 100%)',
                    boxShadow: '0 10px 30px rgba(255, 102, 0, 0.3)',
                    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                  }}
                >
                  Começar Gratuitamente
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-orange-500/50 text-white hover:bg-orange-500/20 hover:border-orange-500 backdrop-blur-sm transform hover:scale-105 transition-all duration-300"
                >
                  Ver Demonstração
                </Button>
              </div>

              <div className="flex items-center space-x-6 text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Gratuito para sempre</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Sem cartão de crédito</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div 
                className="absolute inset-0 rounded-full blur-3xl opacity-50"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 102, 0, 0.3) 0%, rgba(0, 188, 212, 0.3) 100%)',
                  animation: 'pulse 3s ease-in-out infinite'
                }}
              />
              <div 
                className="relative z-10 p-8 rounded-2xl backdrop-blur-xl border border-white/10"
                style={{
                  background: 'linear-gradient(135deg, rgba(33, 41, 60, 0.8) 0%, rgba(15, 23, 42, 0.4) 100%)',
                  boxShadow: '0 8px 32px rgba(255, 102, 0, 0.1)'
                }}
              >
                <img 
                  src={heroShield} 
                  alt="MedWallet Security Shield" 
                  className="w-full max-w-lg mx-auto"
                  style={{
                    animation: 'float 3s ease-in-out infinite'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5"
          style={{ backgroundImage: `url('/lovable-uploads/bfbb24a3-44a4-473b-a5f0-5ad421382991.png')` }}
        />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(135deg, rgba(71, 85, 105, 0.3) 0%, rgba(255, 102, 0, 0.05) 50%, rgba(0, 188, 212, 0.1) 100%)'
        }} />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center space-y-4 mb-16">
            <h2 
              className="text-3xl lg:text-4xl font-bold bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(135deg, #ff6600 0%, #00bcd4 50%, #4caf50 100%)'
              }}
            >
              Recursos Principais
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Tudo que você precisa para gerenciar sua saúde de forma moderna e segura
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="relative group border-0 transform hover:scale-105 transition-all duration-500"
                style={{
                  background: 'linear-gradient(135deg, rgba(33, 41, 60, 0.8) 0%, rgba(15, 23, 42, 0.4) 100%)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 8px 32px rgba(255, 102, 0, 0.1)',
                  animationDelay: `${index * 0.2}s`
                }}
              >
                <CardHeader className="text-center pb-4">
                  <div 
                    className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all duration-300"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255, 102, 0, 0.2) 0%, rgba(255, 102, 0, 0.1) 100%)',
                      animation: 'float 3s ease-in-out infinite',
                      animationDelay: `${index * 0.5}s`
                    }}
                  >
                    <feature.icon className="h-8 w-8 text-orange-500" />
                  </div>
                  <Badge 
                    variant="secondary" 
                    className="w-fit mx-auto mb-2 bg-gradient-to-r from-orange-500/20 to-cyan-500/20 border-0 text-white"
                  >
                    {feature.highlight}
                  </Badge>
                  <CardTitle className="text-xl text-white group-hover:text-orange-500 transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-gray-300 group-hover:text-white transition-colors">
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
                <h2 className="text-3xl lg:text-4xl font-bold text-white">
                  Por que escolher o Sistema de Saúde Pública?
                </h2>
                <p className="text-xl text-gray-300">
                  Uma plataforma completa que revoluciona a forma como você cuida da sua saúde
                </p>
              </div>

              <div className="grid gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-white">{benefit}</span>
                  </div>
                ))}
              </div>

              <Button 
                size="lg" 
                onClick={handleGetStarted}
                className="transform hover:scale-105 transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, #ff6600 0%, #00bcd4 50%, #4caf50 100%)',
                  boxShadow: '0 10px 30px rgba(255, 102, 0, 0.3)'
                }}
              >
                Experimente Agora
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '10k+', label: 'Usuários ativos' },
                { value: '99.9%', label: 'Uptime' },
                { value: '500+', label: 'Hospitais parceiros' },
                { value: '24/7', label: 'Suporte' }
              ].map((stat, index) => (
                <Card 
                  key={index}
                  className="p-6 text-center border-0 transform hover:scale-105 transition-all duration-300 group"
                  style={{
                    background: 'linear-gradient(135deg, rgba(33, 41, 60, 0.8) 0%, rgba(15, 23, 42, 0.4) 100%)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <div 
                    className="text-3xl font-bold text-orange-500 mb-2"
                    style={{ animation: 'pulse 2s ease-in-out infinite' }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-gray-300 group-hover:text-white transition-colors">
                    {stat.label}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section id="trust" className="py-20 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5"
          style={{ backgroundImage: `url('/lovable-uploads/50067579-7380-49c5-9134-15db818306f6.png')` }}
        />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(135deg, rgba(71, 85, 105, 0.2) 0%, rgba(255, 102, 0, 0.05) 50%, rgba(0, 188, 212, 0.1) 100%)'
        }} />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center space-y-4 mb-16">
            <h2 
              className="text-3xl lg:text-4xl font-bold bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(135deg, #ff6600 0%, #00bcd4 50%, #4caf50 100%)'
              }}
            >
              Confiança e Segurança
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Seus dados médicos protegidos com a mais alta tecnologia de segurança
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Card 
              className="p-8 border-0 transform hover:scale-105 transition-all duration-500"
              style={{
                background: 'linear-gradient(135deg, rgba(33, 41, 60, 0.8) 0%, rgba(15, 23, 42, 0.4) 100%)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 8px 32px rgba(255, 102, 0, 0.2)'
              }}
            >
              <blockquote className="space-y-6">
                <div className="flex space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="h-5 w-5 fill-orange-500 text-orange-500"
                      style={{ 
                        animation: 'pulse 2s ease-in-out infinite',
                        animationDelay: `${i * 0.1}s`
                      }}
                    />
                  ))}
                </div>
                <p className="text-lg italic text-white">
                  "O MedWallet transformou como eu gerencio a saúde da minha família. 
                  Ter todos os dados médicos seguros e acessíveis em um só lugar é indispensável."
                </p>
                <footer className="text-gray-300">
                  — Sarah K., Usuária MedWallet
                </footer>
              </blockquote>
            </Card>

            <div className="space-y-6">
              {[
                { icon: Shield, title: 'Certificação LGPD', desc: 'Conformidade total com a lei brasileira', color: 'text-green-500' },
                { icon: Database, title: 'Blockchain Security', desc: 'Dados imutáveis e distribuídos', color: 'text-orange-500' },
                { icon: Smartphone, title: 'Acesso Móvel Seguro', desc: 'Biometria e autenticação dupla', color: 'text-cyan-500' }
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255, 102, 0, 0.1) 0%, rgba(0, 188, 212, 0.1) 100%)'
                    }}
                  >
                    <item.icon className={`h-6 w-6 ${item.color}`} />
                  </div>
                  <div>
                    <div className="font-semibold text-white">{item.title}</div>
                    <div className="text-sm text-gray-300">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card 
            className="relative overflow-hidden p-12 text-center border-0"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 102, 0, 0.1) 0%, rgba(33, 41, 60, 0.8) 50%, rgba(0, 188, 212, 0.1) 100%)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 102, 0, 0.2)'
            }}
          >
            <div className="space-y-6 relative z-10">
              <h2 className="text-3xl lg:text-4xl font-bold text-white">
                Pronto para revolucionar sua saúde?
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Junte-se a milhares de usuários que já confiam no MedWallet para cuidar da sua saúde
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  onClick={handleGetStarted}
                  className="transform hover:scale-105 transition-all duration-300"
                  style={{
                    background: 'linear-gradient(135deg, #ff6600 0%, #ff8533 100%)',
                    boxShadow: '0 10px 30px rgba(255, 102, 0, 0.3)',
                    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                  }}
                >
                  Começar Agora
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-orange-500/50 text-white hover:bg-orange-500/20 hover:border-orange-500"
                >
                  Falar com Especialista
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-orange-500/20 py-12 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <img 
                  src="/lovable-uploads/f328f86f-9e20-428c-b571-91f861610d33.png" 
                  alt="MedWallet Logo" 
                  className="h-8 w-auto"
                />
                <span className="text-xl font-bold text-white">MedWallet</span>
              </div>
              <p className="text-gray-300">
                Sua saúde, unificada. Sua carteira, inteligente.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-white">Produto</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-orange-500 transition-colors">Recursos</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Preços</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Integrações</a></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-white">Suporte</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-orange-500 transition-colors">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Contato</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Status</a></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-white">Legal</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-orange-500 transition-colors">Termos de Uso</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Política de Privacidade</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">LGPD</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-orange-500/20 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2024 MedWallet. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;