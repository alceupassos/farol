
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from 'lucide-react';
import { QoLSection, DomainDataItem, RenderDetailChartPlaceholderFn } from './types';

interface DomainSectionContentProps {
  section: QoLSection;
  dataItem: DomainDataItem;
  renderDetailChartPlaceholder: RenderDetailChartPlaceholderFn;
}

const DomainSectionContent: React.FC<DomainSectionContentProps> = ({ section, dataItem, renderDetailChartPlaceholder }) => {
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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border rounded-lg gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Pontuação (EQ-5D)</p>
            <p className="text-2xl font-semibold">{dataItem.score} {dataItem.trendIcon}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Objetivo / Métrica Chave</p>
            <p className="text-lg font-medium">{dataItem.objective}</p>
          </div>
        </div>
        {renderDetailChartPlaceholder("Line")}
        <p className="text-xs text-muted-foreground">Este gráfico mostra a evolução da sua pontuação e métricas relacionadas a {section.name.toLowerCase()} ao longo do tempo.</p>
      </CardContent>
    </Card>
  );
};

export default DomainSectionContent;
