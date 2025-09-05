import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Squares } from '@/components/ui/squares-background';
import medicalHeroBg from '@/assets/medical-hero-bg.jpg';
import { 
  Shield, 
  MapPin, 
  Clock, 
  Brain, 
  Users, 
  Activity,
  LogIn,
  BarChart3,
  Info
} from 'lucide-react';
import { GENERIC_DEMO_NEIGHBORHOODS, getRiskColor, getTotalDemoPopulation, getTotalDemoActiveCases } from '@/data/genericNeighborhoodsDemo';
import { useMunicipalityConfig } from '@/hooks/useMunicipalityConfig';

const AngraSaudeHero = () => {
  const navigate = useNavigate();
  const { config, isDemoMode } = useMunicipalityConfig();
  const { switchGuestRole } = useAuth();

  return (
    <section className="relative py-20 px-4 overflow-hidden min-h-[90vh] flex items-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url(${medicalHeroBg})` }}
      />
      
      {/* Squares Background Animation */}
      <div className="absolute inset-0 opacity-30">
        <Squares 
          direction="diagonal"
          speed={0.3}
          squareSize={60}
          borderColor="hsl(var(--primary) / 0.1)"
          hoverFillColor="hsl(var(--primary) / 0.05)"
        />
      </div>
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
      
      <div className="relative max-w-7xl mx-auto text-center z-10">
        {/* Badge Principal */}
        <Badge className="mb-6 px-6 py-3 text-base bg-gradient-to-r from-primary to-secondary border-0 text-primary-foreground">
          <Activity className="w-5 h-5 mr-2" />
          Sistema Integrado de Acompanhamento em Tempo Real
        </Badge>
        
        {/* Título Principal */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-fade-in">
          Angra Saúde
        </h1>
        
        {/* Subtítulo Descritivo */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-5xl mx-auto leading-relaxed animate-slide-up">
          Capaz de coletar, monitorar e analisar indicadores individuais e populacionais, 
          oferecendo suporte para <span className="text-primary font-semibold">prevenção</span>, 
          <span className="text-secondary font-semibold"> intervenção rápida</span> e 
          <span className="text-accent font-semibold"> gestão eficiente</span> da saúde pública.
        </p>

        {/* Mapa Interativo de Bairros - Dados Demonstrativos */}
        <div className="mb-10 bg-card/80 backdrop-blur-sm rounded-xl p-6 border border-border max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-2">
            <MapPin className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">
              Monitoramento por Bairros - {config.name}
            </h3>
          </div>
          
          {isDemoMode && (
            <div className="flex items-center justify-center gap-2 mb-4">
              <Badge variant="secondary" className="text-xs px-3 py-1">
                <Info className="w-3 h-3 mr-1" />
                Dados Demonstrativos
              </Badge>
            </div>
          )}
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm">
            {GENERIC_DEMO_NEIGHBORHOODS.slice(0, 10).map((neighborhood, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-2 rounded-lg border transition-colors hover:bg-muted/50"
                style={{ borderColor: getRiskColor(neighborhood.riskLevel) + '40' }}
              >
                <span className="text-foreground font-medium truncate">{neighborhood.name}</span>
                <div 
                  className="w-3 h-3 rounded-full flex-shrink-0 ml-2"
                  style={{ backgroundColor: getRiskColor(neighborhood.riskLevel) }}
                  title={`${neighborhood.riskLevel} - ${neighborhood.activeCases} casos`}
                />
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            <Clock className="w-3 h-3 inline mr-1" />
            Atualizado em tempo real • Última atualização: agora
          </p>
        </div>

        {/* Métricas Destacadas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{GENERIC_DEMO_NEIGHBORHOODS.length}</div>
            <div className="text-sm text-muted-foreground">Bairros Monitorados</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-secondary">24/7</div>
            <div className="text-sm text-muted-foreground">Tempo Real</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">5</div>
            <div className="text-sm text-muted-foreground">Pilares Integrados</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-chart-1">100%</div>
            <div className="text-sm text-muted-foreground">Preventivo</div>
          </div>
        </div>

        {/* Transformação Principal */}
        <div className="mb-10 p-6 bg-gradient-to-r from-card/80 to-muted/30 backdrop-blur-sm rounded-xl border border-border max-w-2xl mx-auto">
          <h3 className="text-lg font-semibold mb-4 flex items-center justify-center gap-2">
            <Brain className="w-5 h-5 text-primary" />
            Transformação da Saúde Municipal
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-destructive/10 rounded-lg border border-destructive/20">
              <div className="font-medium text-destructive mb-1">Antes: Reativa</div>
              <div className="text-muted-foreground">Resposta apenas após emergências</div>
            </div>
            <div className="p-3 bg-success/10 rounded-lg border border-success/20">
              <div className="font-medium text-success mb-1">Depois: Preventiva</div>
              <div className="text-muted-foreground">Predição e prevenção inteligente</div>
            </div>
          </div>
        </div>
        
        {/* Botões de Ação */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in">
          <Button 
            variant="default" 
            size="lg" 
            className="text-lg px-8 py-4 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90" 
            onClick={() => {
              switchGuestRole('gestor');
              navigate('/dashboard');
            }}
          >
            <LogIn className="w-5 h-5 mr-2" />
            Entrar no Sistema Angra Saúde
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="text-lg px-8 py-4 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground" 
            onClick={() => navigate('/dashboard')}
          >
            <BarChart3 className="w-5 h-5 mr-2" />
            Ver Dashboard em Tempo Real
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AngraSaudeHero;