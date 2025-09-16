import React from 'react';
import { Badge } from '@/components/ui/badge';
import PredictiveRiskChart from '../charts/PredictiveRiskChart';
import AIModelEfficiencyChart from '../charts/AIModelEfficiencyChart';
import QualityOfLifeHeatmap from '../charts/QualityOfLifeHeatmap';
import BudgetROIChart from '../charts/BudgetROIChart';
import SpecialtyAnalyticsChart from '../charts/SpecialtyAnalyticsChart';

const ChartsShowcaseSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-primary border-primary">
            Dashboards & Analytics
          </Badge>
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent">
            Visualizações Inteligentes em Tempo Real
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transforme dados complexos em insights acionáveis com gráficos interativos e painéis personalizados
          </p>
        </div>

        <div className="space-y-12">
          {/* Row 1: Risk & AI Models */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="animate-fade-in">
              <PredictiveRiskChart />
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <AIModelEfficiencyChart />
            </div>
          </div>

          {/* Row 2: Quality of Life Heatmap - Full Width */}
          <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <QualityOfLifeHeatmap />
          </div>

          {/* Row 3: ROI & Specialty Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <BudgetROIChart />
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.8s' }}>
              <SpecialtyAnalyticsChart />
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-8 p-8 bg-card/80 backdrop-blur-sm rounded-xl border shadow-lg">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">15+</div>
              <div className="text-sm text-muted-foreground">Tipos de Gráficos</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">Real-time</div>
              <div className="text-sm text-muted-foreground">Atualizações</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">100%</div>
              <div className="text-sm text-muted-foreground">Interativo</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">Mobile</div>
              <div className="text-sm text-muted-foreground">Responsivo</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChartsShowcaseSection;