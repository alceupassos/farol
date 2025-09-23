import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, MapPin, TrendingUp, Users, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { piracicabaNeighborhoods } from '@/data/piracicabaNeighborhoods';

interface DashboardAlertWidgetProps {
  className?: string;
}

const DashboardAlertWidget = ({ className = "" }: DashboardAlertWidgetProps) => {
  const { userRole } = useAuth();

  // Simular dados de bairro do usuário (Centro para demo)
  const userNeighborhood = piracicabaNeighborhoods.find(n => n.name === 'Centro') || piracicabaNeighborhoods[0];
  
  // Dados críticos para gestores
  const criticalNeighborhoods = piracicabaNeighborhoods
    .filter(n => n.riskLevel === 'CRÍTICO' || n.riskLevel === 'EMERGÊNCIA')
    .slice(0, 3);

  // Pacientes em risco para médicos
  const patientsInRisk = piracicabaNeighborhoods
    .filter(n => n.riskLevel === 'ALTO' || n.riskLevel === 'CRÍTICO')
    .reduce((acc, n) => acc + Math.floor(n.activeCases * 0.15), 0); // 15% são pacientes

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'BAIXO': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'MODERADO': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'ALTO': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'CRÍTICO': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'EMERGÊNCIA': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getRiskIcon = (level: string) => {
    if (level === 'CRÍTICO' || level === 'EMERGÊNCIA') {
      return <AlertTriangle className="h-4 w-4 animate-pulse" />;
    }
    return <MapPin className="h-4 w-4" />;
  };

  if (userRole === 'paciente') {
    return (
      <Card className={`glass-morphism border-0 shadow-xl hover:shadow-2xl transition-all duration-300 ${className}`}>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            {getRiskIcon(userNeighborhood.riskLevel)}
            Alerta do Seu Bairro
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{userNeighborhood.name}</span>
            <Badge className={`${getRiskColor(userNeighborhood.riskLevel)} border`}>
              {userNeighborhood.riskLevel}
            </Badge>
          </div>
          
          <div className="text-2xl font-bold text-primary">
            {userNeighborhood.activeCases} casos ativos
          </div>
          
          <div className="text-xs text-muted-foreground">
            Densidade: {userNeighborhood.casesPerThousand}/1k hab
          </div>
          
          {(userNeighborhood.riskLevel === 'ALTO' || userNeighborhood.riskLevel === 'CRÍTICO') && (
            <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-3 mt-3">
              <div className="text-xs text-orange-400 font-medium">⚠️ Recomendações:</div>
              <div className="text-xs text-muted-foreground mt-1">
                • Evite aglomerações • Use máscara • Lave as mãos frequentemente
              </div>
            </div>
          )}
          
          <Button asChild variant="outline" size="sm" className="w-full mt-3">
            <Link to="/epidemic-alerts">Ver Mapa Completo</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (userRole === 'medico') {
    return (
      <Card className={`glass-morphism border-0 shadow-xl hover:shadow-2xl transition-all duration-300 ${className}`}>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Users className="h-4 w-4" />
            Pacientes em Risco
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-2xl font-bold text-red-400">
            {patientsInRisk} pacientes
          </div>
          
          <div className="text-xs text-muted-foreground">
            em áreas de alto risco epidemiológico
          </div>
          
          <div className="space-y-2">
            {criticalNeighborhoods.slice(0, 2).map((neighborhood) => (
              <div key={neighborhood.name} className="flex items-center justify-between text-xs">
                <span>{neighborhood.name}</span>
                <Badge className={getRiskColor(neighborhood.riskLevel)}>
                  {neighborhood.activeCases}
                </Badge>
              </div>
            ))}
          </div>
          
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 mt-3">
            <div className="text-xs text-red-400 font-medium">🩺 Protocolo:</div>
            <div className="text-xs text-muted-foreground mt-1">
              Redobrar atenção nos sintomas • Protocolo de isolamento • Teste rápido
            </div>
          </div>
          
          <Button asChild variant="outline" size="sm" className="w-full mt-3">
            <Link to="/epidemic-alerts">Dashboard Epidemiológico</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (userRole === 'gestor') {
    return (
      <Card className={`glass-morphism border-0 shadow-xl hover:shadow-2xl transition-all duration-300 ${className}`}>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <AlertTriangle className="h-4 w-4 text-red-400 animate-pulse" />
            Ação Necessária
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-2xl font-bold text-red-400">
            {criticalNeighborhoods.length} bairros
          </div>
          
          <div className="text-xs text-muted-foreground">
            em situação crítica ou emergência
          </div>
          
          <div className="space-y-2">
            {criticalNeighborhoods.map((neighborhood) => (
              <div key={neighborhood.name} className="flex items-center justify-between text-xs">
                <span className="font-medium">{neighborhood.name}</span>
                <Badge className={getRiskColor(neighborhood.riskLevel)}>
                  {neighborhood.riskLevel}
                </Badge>
              </div>
            ))}
          </div>
          
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 mt-3">
            <div className="text-xs text-red-400 font-medium">⚡ Ações Recomendadas:</div>
            <div className="text-xs text-muted-foreground mt-1">
              • Mobilizar equipes • Campanha preventiva • Recursos emergenciais
            </div>
          </div>
          
          <Button asChild variant="outline" size="sm" className="w-full mt-3">
            <Link to="/epidemic-alerts">Painel de Comando</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return null;
};

export default DashboardAlertWidget;
