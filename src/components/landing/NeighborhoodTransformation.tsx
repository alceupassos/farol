import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  MapPin, 
  TrendingUp,
  Activity,
  Shield,
  Zap,
  Target
} from 'lucide-react';

const NeighborhoodTransformation = () => {
  const transformationAspects = [
    {
      category: "Abordagem",
      before: {
        title: "Dados Municipais Gerais",
        description: "Informações agregadas de toda cidade",
        icon: <AlertTriangle className="w-5 h-5" />,
        problems: ["Falta de precisão geográfica", "Demora na identificação de focos", "Recursos mal distribuídos"]
      },
      after: {
        title: "Análise Detalhada por Bairros",
        description: "Monitoramento específico de cada região",
        icon: <CheckCircle className="w-5 h-5" />,
        benefits: ["Precisão geográfica total", "Identificação imediata de focos", "Distribuição otimizada de recursos"]
      }
    },
    {
      category: "Alertas",
      before: {
        title: "Alertas Municipais Genéricos",
        description: "Notificações para toda cidade",
        icon: <Clock className="w-5 h-5" />,
        problems: ["Alertas irrelevantes por área", "Sobrecarga de informações", "Resposta lenta"]
      },
      after: {
        title: "Alertas Geo-Específicos",
        description: "Notificações direcionadas por bairro",
        icon: <Zap className="w-5 h-5" />,
        benefits: ["Alertas relevantes por região", "Informações filtradas", "Resposta instantânea"]
      }
    },
    {
      category: "Intervenções",
      before: {
        title: "Ações Reativas Generalizadas",
        description: "Medidas após problemas se espalharem",
        icon: <AlertTriangle className="w-5 h-5" />,
        problems: ["Intervenção tardia", "Alto custo operacional", "Baixa efetividade"]
      },
      after: {
        title: "Intervenções Localizadas",
        description: "Ações preventivas específicas por área",
        icon: <Target className="w-5 h-5" />,
        benefits: ["Prevenção efetiva", "Custo otimizado", "Máxima efetividade"]
      }
    }
  ];

  const neighborhoodMetrics = [
    { neighborhood: "Centro", before: "45 casos", after: "12 casos (-73%)", improvement: "excellent" },
    { neighborhood: "Jardim Regina", before: "78 casos", after: "23 casos (-71%)", improvement: "excellent" },
    { neighborhood: "Vila Operária", before: "82 casos", after: "28 casos (-66%)", improvement: "good" },
    { neighborhood: "Bosque da Princesa", before: "125 casos", after: "35 casos (-72%)", improvement: "excellent" }
  ];

  const getImprovementColor = (improvement: string) => {
    switch (improvement) {
      case 'excellent': return 'text-green-600 bg-green-500/10 border-green-500/20';
      case 'good': return 'text-blue-600 bg-blue-500/10 border-blue-500/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-background via-muted/10 to-primary/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge className="mb-4 px-4 py-2 bg-gradient-to-r from-destructive/20 to-success/20 text-foreground border-primary/30">
            <TrendingUp className="w-4 h-4 mr-2" />
            Transformação por Bairros
          </Badge>
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-foreground via-primary to-secondary bg-clip-text text-transparent">
            De Municipal para Hiper-Local
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Veja como a Angra Saúde revoluciona a gestão municipal ao oferecer visibilidade e controle granular por bairros
          </p>
        </div>

        {/* Comparação Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Antes */}
          <Card className="border-2 border-destructive/30 bg-destructive/5">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-destructive/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-destructive" />
              </div>
              <CardTitle className="text-2xl text-destructive">Modelo Anterior</CardTitle>
              <CardDescription>Gestão municipal tradicional</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                <h4 className="font-semibold text-destructive mb-2">Limitações Principais:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Visão apenas municipal geral</li>
                  <li>• Alertas genéricos para toda cidade</li>
                  <li>• Intervenções reativas e tardias</li>
                  <li>• Recursos mal distribuídos</li>
                  <li>• Falta de precisão geográfica</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Depois */}
          <Card className="border-2 border-success/30 bg-success/5">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-success" />
              </div>
              <CardTitle className="text-2xl text-success">Angra Saúde</CardTitle>
              <CardDescription>Gestão inteligente por bairros</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-success/10 rounded-lg border border-success/20">
                <h4 className="font-semibold text-success mb-2">Benefícios Transformadores:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Monitoramento detalhado de 10 bairros</li>
                  <li>• Alertas geo-específicos inteligentes</li>
                  <li>• Intervenções preventivas localizadas</li>
                  <li>• Otimização de recursos por área</li>
                  <li>• Precisão geográfica total</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Transformações Detalhadas */}
        <div className="space-y-8 mb-16">
          {transformationAspects.map((aspect, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <Activity className="w-6 h-6 text-primary" />
                  {aspect.category}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Antes */}
                  <div className="p-6 bg-destructive/5 rounded-lg border border-destructive/20">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="text-destructive">{aspect.before.icon}</div>
                      <div>
                        <h4 className="font-semibold text-destructive">{aspect.before.title}</h4>
                        <p className="text-sm text-muted-foreground">{aspect.before.description}</p>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {aspect.before.problems.map((problem, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                          <div className="w-1 h-1 bg-destructive rounded-full flex-shrink-0" />
                          {problem}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Seta de Transformação */}
                  <div className="hidden lg:flex items-center justify-center">
                    <ArrowRight className="w-8 h-8 text-primary" />
                  </div>

                  {/* Depois */}
                  <div className="p-6 bg-success/5 rounded-lg border border-success/20">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="text-success">{aspect.after.icon}</div>
                      <div>
                        <h4 className="font-semibold text-success">{aspect.after.title}</h4>
                        <p className="text-sm text-muted-foreground">{aspect.after.description}</p>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {aspect.after.benefits.map((benefit, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                          <CheckCircle className="w-3 h-3 text-success flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Resultados por Bairro */}
        <Card className="bg-gradient-to-br from-success/5 to-primary/5 border-success/30">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl flex items-center justify-center gap-3">
              <MapPin className="w-6 h-6 text-success" />
              Resultados Comprovados por Bairro
            </CardTitle>
            <CardDescription>
              Comparação antes vs depois da implementação da Angra Saúde
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {neighborhoodMetrics.map((metric, index) => (
                <div key={index} className="p-4 bg-card/80 rounded-lg border border-border">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold">{metric.neighborhood}</h4>
                    <Badge className={`px-2 py-1 text-xs ${getImprovementColor(metric.improvement)}`}>
                      {metric.improvement === 'excellent' ? 'Excelente' : 'Boa'} Melhoria
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-destructive">Antes: {metric.before}</span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                    <span className="text-success font-semibold">{metric.after}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-primary/10 rounded-lg border border-primary/20 text-center">
              <h4 className="text-lg font-semibold mb-2">Impacto Global da Transformação</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <div>
                  <div className="text-2xl font-bold text-success">-70%</div>
                  <div className="text-sm text-muted-foreground">Casos Ativos</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">+85%</div>
                  <div className="text-sm text-muted-foreground">Eficiência</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-secondary">-60%</div>
                  <div className="text-sm text-muted-foreground">Tempo Resposta</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-accent">+90%</div>
                  <div className="text-sm text-muted-foreground">Satisfação</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Button size="lg" className="px-8 py-4 text-lg bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90">
            <Shield className="w-5 h-5 mr-2" />
            Transforme Seu Município Agora
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NeighborhoodTransformation;