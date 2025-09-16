import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, MapPin, Users, TrendingUp, Clock } from 'lucide-react';

const successStories = [
  {
    city: 'Pindamonhangaba',
    state: 'SP',
    population: '165.000',
    implementation: '6 meses',
    results: {
      efficiency: '+47%',
      cost: '-32%',
      satisfaction: '+78%',
      response: '-65%'
    },
    highlight: 'Redução de 65% no tempo de resposta a emergências',
    metrics: [
      { label: 'Consultas Otimizadas', value: '12.450', trend: '+28%' },
      { label: 'Economia Gerada', value: 'R$ 2.3M', trend: '+32%' },
      { label: 'Satisfação Cidadã', value: '94%', trend: '+15%' }
    ]
  },
  {
    city: 'Águas de Lindóia',
    state: 'SP',
    population: '18.500',
    implementation: '4 meses',
    results: {
      efficiency: '+52%',
      cost: '-28%',
      satisfaction: '+71%',
      response: '-58%'
    },
    highlight: 'Prevenção de surto de dengue com 95% de precisão',
    metrics: [
      { label: 'Casos Prevenidos', value: '347', trend: '+95%' },
      { label: 'Recursos Economizados', value: 'R$ 890K', trend: '+28%' },
      { label: 'Cobertura Populacional', value: '98%', trend: '+12%' }
    ]
  },
  {
    city: 'Campos do Jordão',
    state: 'SP',
    population: '52.000',
    implementation: '8 meses',
    results: {
      efficiency: '+43%',
      cost: '-35%',
      satisfaction: '+82%',
      response: '-72%'
    },
    highlight: 'Sistema de triagem inteligente reduziu filas em 72%',
    metrics: [
      { label: 'Tempo Médio Triagem', value: '8 min', trend: '-72%' },
      { label: 'Eficiência Operacional', value: '91%', trend: '+43%' },
      { label: 'Leitos Otimizados', value: '156', trend: '+35%' }
    ]
  }
];

const SuccessStoriesCarousel = () => {
  const [currentStory, setCurrentStory] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStory((prev) => (prev + 1) % successStories.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const nextStory = () => {
    setCurrentStory((prev) => (prev + 1) % successStories.length);
  };

  const prevStory = () => {
    setCurrentStory((prev) => (prev - 1 + successStories.length) % successStories.length);
  };

  const story = successStories[currentStory];

  return (
    <section className="py-20 bg-gradient-to-br from-accent/10 via-background to-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-primary border-primary">
            Casos de Sucesso
          </Badge>
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent">
            Municípios Transformados
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Resultados reais de cidades que revolucionaram sua gestão de saúde pública
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <Card className="bg-gradient-to-br from-card/80 to-accent/20 backdrop-blur-sm border-0 shadow-2xl">
            <CardHeader className="pb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    <CardTitle className="text-2xl">{story.city}</CardTitle>
                    <Badge variant="secondary">{story.state}</Badge>
                  </div>
                </div>
                <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{story.population} hab.</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{story.implementation}</span>
                  </div>
                </div>
              </div>
              <CardDescription className="text-lg text-primary font-medium mt-2">
                {story.highlight}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-8">
              {/* Key Results */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center p-4 rounded-lg bg-green-50 dark:bg-green-950/20">
                  <div className="text-2xl font-bold text-green-600">{story.results.efficiency}</div>
                  <div className="text-sm text-muted-foreground">Eficiência</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20">
                  <div className="text-2xl font-bold text-blue-600">{story.results.cost}</div>
                  <div className="text-sm text-muted-foreground">Redução Custos</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-purple-50 dark:bg-purple-950/20">
                  <div className="text-2xl font-bold text-purple-600">{story.results.satisfaction}</div>
                  <div className="text-sm text-muted-foreground">Satisfação</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-orange-50 dark:bg-orange-950/20">
                  <div className="text-2xl font-bold text-orange-600">{story.results.response}</div>
                  <div className="text-sm text-muted-foreground">Tempo Resposta</div>
                </div>
              </div>

              {/* Detailed Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {story.metrics.map((metric, index) => (
                  <div key={index} className="p-4 border rounded-lg bg-card/50">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm">{metric.label}</h4>
                      <Badge variant="outline" className="text-xs">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        {metric.trend}
                      </Badge>
                    </div>
                    <div className="text-2xl font-bold text-primary">{metric.value}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-8">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={prevStory}
              className="flex items-center space-x-2"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Anterior</span>
            </Button>

            <div className="flex space-x-2">
              {successStories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStory(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentStory 
                      ? 'bg-primary scale-125' 
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                />
              ))}
            </div>

            <Button 
              variant="outline" 
              size="sm" 
              onClick={nextStory}
              className="flex items-center space-x-2"
            >
              <span>Próximo</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStoriesCarousel;