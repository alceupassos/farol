import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Info, Target, Zap, Globe } from 'lucide-react';

const AdaptabilityDisclaimer = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-background via-background/95 to-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 px-4 py-2">
            <Globe className="h-4 w-4 mr-2" />
            Sistema Adaptável
          </Badge>
          <h2 className="text-3xl font-bold mb-4">
            Adaptável para <span className="text-primary">Qualquer Município</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            O Angra Saúde é projetado para ser facilmente adaptado às especificidades 
            de cada município brasileiro, independente do tamanho ou características regionais.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="p-6 border-2 hover:border-primary/50 transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-primary/10 rounded-lg mr-3">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Personalização Total</h3>
            </div>
            <p className="text-muted-foreground">
              Dados, métricas e alertas configuráveis para atender as necessidades 
              específicas de cada região e população local.
            </p>
          </Card>

          <Card className="p-6 border-2 hover:border-primary/50 transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-primary/10 rounded-lg mr-3">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Implementação Rápida</h3>
            </div>
            <p className="text-muted-foreground">
              Sistema modular que se adapta rapidamente às estruturas de saúde 
              existentes, minimizando tempo de implementação.
            </p>
          </Card>

          <Card className="p-6 border-2 hover:border-primary/50 transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-primary/10 rounded-lg mr-3">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Escalabilidade</h3>
            </div>
            <p className="text-muted-foreground">
              Funciona tanto em pequenos municípios quanto em grandes centros urbanos, 
              adaptando-se ao volume e complexidade dos dados.
            </p>
          </Card>
        </div>

        <Card className="p-6 bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
          <div className="flex items-start space-x-3">
            <Info className="h-5 w-5 text-amber-600 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-amber-800 mb-2">
                Dados Demonstrativos
              </h4>
              <p className="text-amber-700 text-sm">
                <strong>Importante:</strong> Todos os dados, métricas e nomes de bairros 
                apresentados nesta demonstração são fictícios e servem apenas para 
                ilustrar as capacidades do sistema. Na implementação real, o sistema 
                será configurado com os dados específicos do seu município.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default AdaptabilityDisclaimer;