
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from 'lucide-react';
import { QoLSection, AdditionalAspectItem, RenderDetailChartPlaceholderFn, RenderSmallTrendIconFn } from './types';

interface AdditionalAspectSectionContentProps {
  section: QoLSection;
  dataItem: AdditionalAspectItem;
  renderDetailChartPlaceholder: RenderDetailChartPlaceholderFn;
  renderSmallTrendIcon: RenderSmallTrendIconFn;
}

const AdditionalAspectSectionContent: React.FC<AdditionalAspectSectionContentProps> = ({ section, dataItem, renderDetailChartPlaceholder, renderSmallTrendIcon }) => {
  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="capitalize flex items-center">
          {section.icon && React.cloneElement(section.icon as React.ReactElement, { className: "h-6 w-6 mr-3" })}
          {section.name}
        </CardTitle>
         <CardDescription>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="cursor-default text-left flex items-center">
                  <span>{dataItem.tooltip}</span>
                  <Info size={12} className="ml-1 text-gray-400 inline flex-shrink-0" />
              </TooltipTrigger>
              <TooltipContent><p>{dataItem.tooltip}</p></TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center p-4 border rounded-lg">
           <div>
              <p className="text-sm text-muted-foreground">Pontuação (WHOQOL/IQV)</p>
              <p className="text-2xl font-semibold">{dataItem.score} {renderSmallTrendIcon(dataItem.trend)}</p>
            </div>
        </div>
        {renderDetailChartPlaceholder("Trend")}
        <p className="text-xs text-muted-foreground">Este gráfico mostra a tendência da sua pontuação para {section.name.toLowerCase()}.</p>
      </CardContent>
    </Card>
  );
};

export default AdditionalAspectSectionContent;
