
import React from 'react';
import { CardTitle } from "@/components/ui/card"; // Re-using CardTitle. Card is not needed for the whole block, it's part of the page layout.
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from 'lucide-react';

interface QoLOverviewDashboardProps {
  eq5dVASScore: number;
  eq5dVASTrend: 'up' | 'down' | 'stable';
  overallStatus: { text: string; mood: 'good' | 'neutral' | 'bad' };
  lastCheckIn: string;
  renderTrendIcon: (trend: 'up' | 'down' | 'stable', size?: number) => React.ReactNode;
  renderMoodIcon: (mood: 'good' | 'neutral' | 'bad') => React.ReactNode;
}

const QoLOverviewDashboard: React.FC<QoLOverviewDashboardProps> = ({
  eq5dVASScore,
  eq5dVASTrend,
  overallStatus,
  lastCheckIn,
  renderTrendIcon,
  renderMoodIcon,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch p-4 bg-card rounded-lg shadow">
      {/* Minha Qualidade de Vida Hoje */}
      <div className="md:col-span-1 flex flex-col items-center justify-center text-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="cursor-default">
              <CardTitle className="text-lg mb-1 text-muted-foreground flex items-center justify-center">
                Minha Qualidade de Vida Hoje (EQ-5D VAS) <Info size={14} className="ml-1 text-gray-400" />
              </CardTitle>
            </TooltipTrigger>
            <TooltipContent>
              <p>Sua autoavaliação geral do estado de saúde, numa escala de 0 (pior) a 100 (melhor).</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div className="flex items-center">
          <span className="text-7xl font-bold text-primary">{eq5dVASScore}</span>
          {renderTrendIcon(eq5dVASTrend)}
        </div>
        <Progress 
          value={eq5dVASScore} 
          className="w-full h-3 mt-2"
          indicatorClassName={
            eq5dVASScore > 70 ? "bg-green-500" : eq5dVASScore > 40 ? "bg-yellow-500" : "bg-red-500"
          }
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-1 w-full px-1">
          <span>0</span>
          <span>100</span>
        </div>
      </div>

      {/* Status Geral (IA) */}
      <div className="md:col-span-1 flex flex-col items-center justify-center text-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="cursor-default">
              <CardTitle className="text-lg mb-2 text-muted-foreground flex items-center justify-center">
                Status Geral (IA) <Info size={14} className="ml-1 text-gray-400" />
              </CardTitle>
            </TooltipTrigger>
            <TooltipContent>
              <p>Resumo interpretativo da IA sobre seu bem-estar atual, baseado nos seus últimos dados.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div className="flex items-center">
          {renderMoodIcon(overallStatus.mood)}
          <Badge
            variant={overallStatus.mood === 'good' ? 'default' : overallStatus.mood === 'neutral' ? 'secondary' : 'destructive'}
            className="text-lg"
          >
            {overallStatus.text}
          </Badge>
        </div>
      </div>

      {/* Último Check-in Realizado */}
      <div className="md:col-span-1 flex flex-col items-center justify-center text-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="cursor-default">
              <CardTitle className="text-lg mb-2 text-muted-foreground flex items-center justify-center">
                Último Check-in Realizado <Info size={14} className="ml-1 text-gray-400" />
              </CardTitle>
            </TooltipTrigger>
            <TooltipContent>
              <p>Data e hora da sua última resposta aos questionários de qualidade de vida.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <p className="text-xl font-semibold">{lastCheckIn}</p>
      </div>
    </div>
  );
};

export default QoLOverviewDashboard;
