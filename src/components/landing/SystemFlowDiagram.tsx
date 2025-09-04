import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const SystemFlowDiagram = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <h3 className="text-2xl font-bold text-center mb-8 text-gradient-medical">
        Fluxo do Sistema MedWallet Municipal
      </h3>
      
      <Card className="glass-card">
        <CardContent className="p-8">
          <div className="p-8 bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg border border-primary/20">
            <div className="space-y-8">
              {/* Step indicators */}
              <div className="flex items-center justify-between">
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg">
                    1
                  </div>
                  <div className="text-sm font-medium">Captura</div>
                </div>
                <div className="flex-1 h-0.5 bg-primary/30 mx-4" />
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center text-white font-bold text-lg">
                    2
                  </div>
                  <div className="text-sm font-medium">Processamento</div>
                </div>
                <div className="flex-1 h-0.5 bg-primary/30 mx-4" />
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg">
                    3
                  </div>
                  <div className="text-sm font-medium">Agrupamento</div>
                </div>
                <div className="flex-1 h-0.5 bg-primary/30 mx-4" />
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center text-white font-bold text-lg">
                    4
                  </div>
                  <div className="text-sm font-medium">Gestão</div>
                </div>
              </div>

              {/* Process description */}
              <div className="text-center space-y-4">
                <p className="text-lg text-muted-foreground">
                  🏠 Cidadão fotografa → 🤖 IA processa → 👨‍👩‍👧‍👦 Sistema agrupa → 👨‍💼 Gestores decidem
                </p>
                <p className="text-sm text-muted-foreground">
                  Ciclo contínuo de coleta, processamento e otimização da saúde municipal
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid md:grid-cols-3 gap-6 mt-8 text-center">
        <div className="p-4">
          <div className="text-3xl font-bold text-primary mb-2">4 Etapas</div>
          <div className="text-muted-foreground">Processo simplificado</div>
        </div>
        <div className="p-4">
          <div className="text-3xl font-bold text-primary mb-2">Tempo Real</div>
          <div className="text-muted-foreground">Dados atualizados</div>
        </div>
        <div className="p-4">
          <div className="text-3xl font-bold text-primary mb-2">100% Digital</div>
          <div className="text-muted-foreground">Sem papel, sem perda</div>
        </div>
      </div>
    </div>
  );
};

export default SystemFlowDiagram;