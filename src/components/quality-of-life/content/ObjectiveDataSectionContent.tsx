
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from 'lucide-react';
import { QoLSection, ObjectiveWearableItem, RenderDetailChartPlaceholderFn } from './types';

interface ObjectiveDataSectionContentProps {
  section: QoLSection;
  objectiveWearablesData: ObjectiveWearableItem[];
  renderDetailChartPlaceholder: RenderDetailChartPlaceholderFn;
}

const ObjectiveDataSectionContent: React.FC<ObjectiveDataSectionContentProps> = ({ section, objectiveWearablesData, renderDetailChartPlaceholder }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle className="capitalize flex items-center">
            {section.icon && React.cloneElement(section.icon as React.ReactElement, { className: "h-6 w-6 mr-3" })}
            {section.name}
          </CardTitle>
          <CardDescription>
              <TooltipProvider>
                  <Tooltip>
                      <TooltipTrigger className="cursor-default text-left flex items-center">
                          <span>{section.tooltip}</span>
                          <Info size={12} className="ml-1 text-gray-400 inline flex-shrink-0" />
                      </TooltipTrigger>
                      <TooltipContent><p>{section.tooltip}</p></TooltipContent>
                  </Tooltip>
              </TooltipProvider>
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {objectiveWearablesData.map(item => (
            <Card key={item.name}>
              <CardHeader>
                <CardTitle className="text-lg">{item.name}</CardTitle>
                 <CardDescription>
                  <TooltipProvider>
                      <Tooltip>
                          <TooltipTrigger className="cursor-default text-left flex items-center">
                              <span>{item.tooltip}</span>
                              <Info size={12} className="ml-1 text-gray-400 inline flex-shrink-0" />
                          </TooltipTrigger>
                          <TooltipContent><p>{item.tooltip}</p></TooltipContent>
                      </Tooltip>
                  </TooltipProvider>
                 </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold mb-2">{item.value}</p>
                {item.graphType === "Gráfico Barras" && renderDetailChartPlaceholder("Bar", 160) }
                {item.graphType === "Anéis Progresso" && renderDetailChartPlaceholder("Trend", 160) /* Using Trend as placeholder, ideally a specific ring chart here */}
                {item.graphType === "Gráfico Linha" && renderDetailChartPlaceholder("Line", 160) }
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default ObjectiveDataSectionContent;
