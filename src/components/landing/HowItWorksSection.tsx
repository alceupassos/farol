import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import SystemFlowDiagram from './SystemFlowDiagram';
import StepCard from './StepCard';
import ROISection from './ROISection';
import MunicipalityContactForm from './MunicipalityContactForm';
import { Camera, Brain, Users, BarChart3, Shield, Clock, TrendingUp, MapPin } from 'lucide-react';

const HowItWorksSection = () => {
  const steps = [
    {
      icon: Camera,
      number: "01",
      title: "Coleta Inteligente",
      description: "Agentes fotografam exames, receitas e prontuários direto do celular",
      benefit: "Sem digitação, sem erros",
      color: "from-primary/20 to-accent/20"
    },
    {
      icon: Brain,
      number: "02", 
      title: "Interpretação Automática",
      description: "IA médica especializada extrai e organiza informações dos documentos",
      benefit: "Precisão de 98% na interpretação",
      color: "from-accent/20 to-primary/20"
    },
    {
      icon: Users,
      number: "03",
      title: "Visão por Residência", 
      description: "Sistema agrupa dados por família e endereço para análise territorial",
      benefit: "Gestão por território de saúde",
      color: "from-primary/20 to-accent/20"
    },
    {
      icon: BarChart3,
      number: "04",
      title: "Inteligência para Decisão",
      description: "Prefeito e secretários recebem insights em tempo real",
      benefit: "Decisões baseadas em dados",
      color: "from-accent/20 to-primary/20"
    }
  ];

  const profiles = [
    {
      title: "Para o Prefeito",
      icon: Shield,
      benefits: [
        "Mapa de calor da saúde municipal",
        "ROI das campanhas de saúde", 
        "Indicadores populacionais em tempo real",
        "Economia em gestão preventiva"
      ]
    },
    {
      title: "Para o Secretário de Saúde",
      icon: Clock,
      benefits: [
        "Vigilância epidemiológica automatizada",
        "Gestão de recursos otimizada",
        "Campanhas direcionadas por território", 
        "Monitoramento de programas de saúde"
      ]
    },
    {
      title: "Para o Cidadão",
      icon: TrendingUp,
      benefits: [
        "Carteira familiar digital unificada",
        "Histórico médico sempre disponível",
        "Agendamentos inteligentes",
        "Telemedicina integrada"
      ]
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-background via-card to-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient-medical">
            Como o MedWallet Transforma a Gestão Municipal de Saúde
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Uma solução completa em 4 etapas simples que revoluciona a saúde pública do seu município
          </p>
        </div>

        {/* Flow Diagram */}
        <div className="mb-20 animate-slide-up">
          <SystemFlowDiagram />
        </div>

        {/* Steps Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {steps.map((step, index) => (
            <StepCard key={index} {...step} delay={index * 0.1} />
          ))}
        </div>

        {/* Benefits by Profile */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center mb-12 text-gradient-medical">
            Benefícios por Perfil
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {profiles.map((profile, index) => (
              <Card key={index} className="glass-card hover:scale-105 transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20">
                      <profile.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h4 className="text-xl font-semibold">{profile.title}</h4>
                  </div>
                  <ul className="space-y-3">
                    {profile.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span className="text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* ROI Section */}
        <ROISection />

        {/* Contact Form */}
        <MunicipalityContactForm />
      </div>
    </section>
  );
};

export default HowItWorksSection;