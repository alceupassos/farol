
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from 'lucide-react';

interface AIInsightItem {
  title: string;
  text: string;
  icon: React.ReactNode; // Assuming icon is a JSX element
  tooltip: string;
}

interface QoLAIInsightsGridProps {
  aiInsightsData: AIInsightItem[];
}

const QoLAIInsightsGrid: React.FC<QoLAIInsightsGridProps> = ({ aiInsightsData }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Insights e Recomendações da IA</CardTitle>
        <CardDescription>Análises e sugestões personalizadas para você.</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {aiInsightsData.map(insight => (
          <Card key={insight.title}>
            <CardHeader className="pb-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="cursor-default w-full">
                    <CardTitle className="text-base font-semibold flex items-center">
                      {React.cloneElement(insight.icon as React.ReactElement, { className: "mr-2"})} {/* Ensure icon has proper styling passed if needed */}
                      {insight.title} 
                      <Info size={12} className="ml-auto text-gray-400" />
                    </CardTitle>
                  </TooltipTrigger>
                  <TooltipContent><p>{insight.tooltip}</p></TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{insight.text}</p>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
};

export default QoLAIInsightsGrid;
