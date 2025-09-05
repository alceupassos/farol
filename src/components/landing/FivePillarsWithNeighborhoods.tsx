import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Activity, 
  Brain, 
  Zap, 
  BarChart3, 
  Users, 
  MapPin,
  Clock,
  AlertTriangle,
  TrendingUp
} from 'lucide-react';

const FivePillarsWithNeighborhoods = () => {
  const pillars = [
    {
      icon: <Activity className="w-8 h-8" />,
      title: "Monitoramento Contínuo",
      description: "Dispositivos vestíveis, aplicativos móveis e integração com prontuários eletrônicos",
      example: {
        neighborhood: "Vila Operária",
        metric: "82 casos ativos",
        status: "monitoring",
        detail: "Dados coletados de 234 wearables"
      },
      color: "primary"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Gestão Preditiva",
      description: "Algoritmos de análise de dados para identificar riscos antes que se tornem emergências",
      example: {
        neighborhood: "Bosque da Princesa",
        metric: "Risco de surto em 7 dias",
        status: "warning",
        detail: "IA detectou padrão epidemiológico"
      },
      color: "secondary"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Atendimento Ágil",
      description: "Alertas em tempo real para equipes de saúde, reduzindo tempo de resposta",
      example: {
        neighborhood: "Centro",
        metric: "3 alertas críticos",
        status: "urgent",
        detail: "Tempo médio resposta: 12 min"
      },
      color: "accent"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Visão Populacional",
      description: "Dashboards para gestores públicos acompanharem tendências, surtos ou demandas específicas",
      example: {
        neighborhood: "Todos os bairros",
        metric: "Dashboard comparativo",
        status: "active",
        detail: "10 regiões em análise simultânea"
      },
      color: "chart-1"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Engajamento do Cidadão",
      description: "O próprio munícipe acompanha sua saúde e recebe recomendações personalizadas",
      example: {
        neighborhood: "Jardim Regina",
        metric: "1.247 cidadãos ativos",
        status: "engaged",
        detail: "85% engajamento semanal"
      },
      color: "chart-2"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'monitoring': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'warning': return 'bg-orange-500/10 text-orange-600 border-orange-500/20';
      case 'urgent': return 'bg-red-500/10 text-red-600 border-red-500/20';
      case 'active': return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'engaged': return 'bg-purple-500/10 text-purple-600 border-purple-500/20';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'monitoring': return <Activity className="w-3 h-3" />;
      case 'warning': return <AlertTriangle className="w-3 h-3" />;
      case 'urgent': return <Zap className="w-3 h-3" />;
      case 'active': return <TrendingUp className="w-3 h-3" />;
      case 'engaged': return <Users className="w-3 h-3" />;
      default: return <Clock className="w-3 h-3" />;
    }
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-muted/10 to-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge className="mb-4 px-4 py-2 bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border-primary/30">
            <Brain className="w-4 h-4 mr-2" />
            5 Pilares da Angra Saúde
          </Badge>
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-foreground via-primary to-secondary bg-clip-text text-transparent">
            Tecnologia Integrada para Saúde Preventiva
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Cada pilar trabalha em sinergia para transformar a saúde municipal de reativa para preventiva e inteligente
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-2xl transition-all duration-500 border-2 hover:border-primary/40 hover:scale-105 animate-fade-in bg-card/90 backdrop-blur-sm"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="pb-4">
                <div className={`w-16 h-16 bg-gradient-to-br from-${pillar.color}/30 to-${pillar.color}/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 group-hover:animate-pulse shadow-lg`}>
                  <div className={`text-${pillar.color}`}>
                    {pillar.icon}
                  </div>
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors text-center">
                  {pillar.title}
                </CardTitle>
                <CardDescription className="text-center">
                  {pillar.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Exemplo Prático com Bairro */}
                <div className="p-4 bg-gradient-to-br from-muted/30 to-background/50 rounded-lg border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{pillar.example.neighborhood}</span>
                    </div>
                    <Badge className={`text-xs px-2 py-1 ${getStatusColor(pillar.example.status)}`}>
                      {getStatusIcon(pillar.example.status)}
                      <span className="ml-1 capitalize">{pillar.example.status}</span>
                    </Badge>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="text-lg font-semibold text-foreground">
                      {pillar.example.metric}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {pillar.example.detail}
                    </div>
                  </div>
                </div>

                {/* Indicador de Tempo Real */}
                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span>Dados em tempo real</span>
                  <Clock className="w-3 h-3" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Resumo da Integração */}
        <div className="mt-16 p-8 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 rounded-xl border border-primary/20">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Integração Total dos Pilares</h3>
            <p className="text-muted-foreground mb-6 max-w-3xl mx-auto">
              Os 5 pilares trabalham simultaneamente, criando um ecossistema de saúde que permite intervenções preventivas, 
              reduz custos operacionais e melhora significativamente a qualidade de vida dos munícipes.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">-60%</div>
                <div className="text-sm text-muted-foreground">Tempo de Resposta</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">+75%</div>
                <div className="text-sm text-muted-foreground">Prevenção Efetiva</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">-40%</div>
                <div className="text-sm text-muted-foreground">Custos Operacionais</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-chart-1">+85%</div>
                <div className="text-sm text-muted-foreground">Satisfação Cidadã</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FivePillarsWithNeighborhoods;