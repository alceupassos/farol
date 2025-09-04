import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Clock, DollarSign, Users, Target, Zap } from 'lucide-react';

const ROISection = () => {
  const metrics = [
    {
      icon: TrendingUp,
      value: "40%",
      label: "Redução no tempo de diagnóstico",
      description: "Identificação mais rápida de problemas de saúde"
    },
    {
      icon: DollarSign,
      value: "60%",
      label: "Economia em papel e digitalização",
      description: "Eliminação de processos manuais"
    },
    {
      icon: Users,
      value: "35%",
      label: "Aumento na adesão a campanhas",
      description: "Campanhas mais direcionadas e eficazes"
    },
    {
      icon: Target,
      value: "95%",
      label: "Cobertura das famílias em 6 meses",
      description: "Mapeamento completo da população"
    },
    {
      icon: Clock,
      value: "24/7",
      label: "Monitoramento em tempo real",
      description: "Vigilância epidemiológica contínua"
    },
    {
      icon: Zap,
      value: "98%",
      label: "Precisão na interpretação de documentos",
      description: "IA especializada em medicina"
    }
  ];

  return (
    <div className="mb-20">
      <div className="text-center mb-12">
        <h3 className="text-3xl font-bold mb-4 text-gradient-medical">
          Resultados Comprovados
        </h3>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Municípios que implementaram o MedWallet obtiveram resultados significativos
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index} className="glass-card hover:scale-105 transition-all duration-300 group">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 group-hover:from-primary group-hover:to-accent transition-all duration-300">
                  <metric.icon className="h-6 w-6 text-primary group-hover:text-white transition-colors duration-300" />
                </div>
                
                <div className="flex-1">
                  <div className="text-3xl font-bold text-primary mb-1 group-hover:text-accent transition-colors duration-300">
                    {metric.value}
                  </div>
                  <div className="font-semibold mb-2 group-hover:text-foreground transition-colors duration-300">
                    {metric.label}
                  </div>
                  <div className="text-sm text-muted-foreground group-hover:text-muted-foreground/80 transition-colors duration-300">
                    {metric.description}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Impact Summary */}
      <Card className="glass-card mt-12 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
        <CardContent className="p-8 text-center">
          <h4 className="text-2xl font-bold mb-4 text-gradient-medical">
            Impacto Transformador na Gestão Municipal
          </h4>
          <p className="text-lg text-muted-foreground mb-6 max-w-3xl mx-auto">
            O MedWallet não apenas moderniza a gestão de saúde, mas cria um ecossistema inteligente 
            que conecta cidadãos, agentes de saúde e gestores públicos em uma rede de cuidado contínuo.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="px-4 py-2 rounded-full bg-primary/20 border border-primary/30">
              <span className="text-sm font-medium text-primary">Gestão Baseada em Dados</span>
            </div>
            <div className="px-4 py-2 rounded-full bg-accent/20 border border-accent/30">
              <span className="text-sm font-medium text-accent">Prevenção Inteligente</span>
            </div>
            <div className="px-4 py-2 rounded-full bg-primary/20 border border-primary/30">
              <span className="text-sm font-medium text-primary">Transparência Total</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ROISection;