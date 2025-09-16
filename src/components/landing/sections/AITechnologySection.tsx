import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Scan, FileText, Users, TrendingUp, Shield } from 'lucide-react';

const aiFeatures = [
  {
    icon: Brain,
    title: 'Agente de Saúde IA',
    description: 'Interpretação inteligente de exames laboratoriais com precisão de 98.5%',
    highlight: 'Novo',
    color: 'text-primary'
  },
  {
    icon: Scan,
    title: 'OCR Médico Avançado',
    description: 'Digitalização e análise automática de documentos médicos',
    highlight: 'Aprimorado',
    color: 'text-blue-600'
  },
  {
    icon: FileText,
    title: 'Leitura Inteligente',
    description: 'Processamento de documentos médicos com IA generativa',
    highlight: 'Exclusivo',
    color: 'text-green-600'
  },
  {
    icon: Users,
    title: 'Dashboard Residencial',
    description: 'Agrupamento familiar de dados de saúde para análise holística',
    highlight: 'Novo',
    color: 'text-purple-600'
  },
  {
    icon: TrendingUp,
    title: 'Analytics Preditiva',
    description: 'Predição de surtos epidemiológicos com 94.2% de precisão',
    highlight: 'IA Avançada',
    color: 'text-orange-600'
  },
  {
    icon: Shield,
    title: 'Segurança Blockchain',
    description: 'Verificação criptográfica de dados médicos sensíveis',
    highlight: 'Enterprise',
    color: 'text-red-600'
  }
];

const AITechnologySection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-background via-accent/5 to-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-primary border-primary">
            Tecnologia de Ponta
          </Badge>
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent">
            Inteligência Artificial Revolucionária
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Potencialize a gestão municipal com IA de última geração, machine learning avançado e automação inteligente
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {aiFeatures.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 bg-card/50 backdrop-blur-sm"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-3 rounded-lg bg-accent/20 ${feature.color}`}>
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {feature.highlight}
                  </Badge>
                </div>
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-8 p-6 bg-card/60 backdrop-blur-sm rounded-xl border">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">98.5%</div>
              <div className="text-sm text-muted-foreground">Precisão IA</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">250ms</div>
              <div className="text-sm text-muted-foreground">Tempo Resposta</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">24/7</div>
              <div className="text-sm text-muted-foreground">Monitoramento</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">6+</div>
              <div className="text-sm text-muted-foreground">Modelos IA</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AITechnologySection;