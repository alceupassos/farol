import React from 'react';
import { Shield, Heart, AlertTriangle, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { RiskScore } from '@/utils/riskCalculator';

interface HealthRiskScoreProps {
  riskScore: RiskScore;
  patientName?: string;
  size?: 'sm' | 'md' | 'lg';
  showDetails?: boolean;
}

const HealthRiskScore: React.FC<HealthRiskScoreProps> = ({ 
  riskScore, 
  patientName,
  size = 'md',
  showDetails = true
}) => {
  const getRiskIcon = () => {
    switch (riskScore.level) {
      case 'BAIXO':
        return <Shield className="w-6 h-6 text-green-600" />;
      case 'MODERADO':
        return <Heart className="w-6 h-6 text-yellow-600" />;
      case 'ALTO':
        return <AlertTriangle className="w-6 h-6 text-orange-600" />;
      case 'CRÍTICO':
        return <Activity className="w-6 h-6 text-red-600" />;
      default:
        return <Shield className="w-6 h-6 text-gray-400" />;
    }
  };

  const getRiskBadgeColor = () => {
    switch (riskScore.level) {
      case 'BAIXO':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'MODERADO':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'ALTO':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'CRÍTICO':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getScoreSize = () => {
    switch (size) {
      case 'sm':
        return 'text-2xl';
      case 'md':
        return 'text-4xl';
      case 'lg':
        return 'text-6xl';
      default:
        return 'text-4xl';
    }
  };

  const tooltipContent = (
    <div className="p-4 max-w-sm">
      <h4 className="font-semibold mb-2">Detalhamento do Score</h4>
      
      <div className="space-y-2 mb-3">
        <div className="flex justify-between">
          <span className="text-sm">Exames Lab:</span>
          <span className="text-sm font-medium">{riskScore.factors.lab} pts</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm">Demografia:</span>
          <span className="text-sm font-medium">{riskScore.factors.demographic} pts</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm">Histórico:</span>
          <span className="text-sm font-medium">{riskScore.factors.medical} pts</span>
        </div>
      </div>

      {riskScore.criticalFactors.length > 0 && (
        <div className="mb-3">
          <h5 className="text-sm font-medium mb-1">Fatores Críticos:</h5>
          <ul className="text-xs space-y-1">
            {riskScore.criticalFactors.map((factor, index) => (
              <li key={index} className="flex items-center">
                <div className="w-1 h-1 bg-red-500 rounded-full mr-2" />
                {factor}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <h5 className="text-sm font-medium mb-1">Recomendações:</h5>
        <ul className="text-xs space-y-1">
          {riskScore.recommendations.slice(0, 3).map((rec, index) => (
            <li key={index} className="flex items-center">
              <div className="w-1 h-1 bg-blue-500 rounded-full mr-2" />
              {rec}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  if (size === 'sm') {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center space-x-2 cursor-pointer p-2 rounded-lg hover:bg-muted/50 transition-colors">
              {getRiskIcon()}
              <div className="flex flex-col">
                <span className="text-lg font-bold">{riskScore.total}</span>
                <Badge variant="outline" className={`text-xs ${getRiskBadgeColor()}`}>
                  {riskScore.level}
                </Badge>
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent side="right">
            {tooltipContent}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <TooltipProvider>
      <Card className="border-2 hover:shadow-lg transition-all duration-300">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {getRiskIcon()}
              <span>Score de Risco{patientName ? ` - ${patientName}` : ''}</span>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="cursor-help">
                  <Badge variant="outline" className={getRiskBadgeColor()}>
                    {riskScore.level}
                  </Badge>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                {tooltipContent}
              </TooltipContent>
            </Tooltip>
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <div className="text-center mb-4">
            <div className={`font-bold ${getScoreSize()} ${riskScore.color} mb-2`}>
              {riskScore.total}
            </div>
            <p className="text-sm text-muted-foreground">
              {riskScore.description}
            </p>
          </div>

          {showDetails && (
            <div className="space-y-3">
              {/* Breakdown dos fatores */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2 bg-muted/50 rounded">
                  <div className="text-sm font-medium">{riskScore.factors.lab}</div>
                  <div className="text-xs text-muted-foreground">Exames</div>
                </div>
                <div className="p-2 bg-muted/50 rounded">
                  <div className="text-sm font-medium">{riskScore.factors.demographic}</div>
                  <div className="text-xs text-muted-foreground">Demografia</div>
                </div>
                <div className="p-2 bg-muted/50 rounded">
                  <div className="text-sm font-medium">{riskScore.factors.medical}</div>
                  <div className="text-xs text-muted-foreground">Histórico</div>
                </div>
              </div>

              {/* Principais recomendações */}
              {riskScore.recommendations.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">Próximos Passos:</h4>
                  <ul className="text-xs space-y-1">
                    {riskScore.recommendations.slice(0, 2).map((rec, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-1 h-1 bg-primary rounded-full mr-2 mt-1.5" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};

export default HealthRiskScore;