
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from 'lucide-react';
import { QoLSection, AIInsightItem } from './types';

interface AIInsightsSectionContentProps {
  section: QoLSection;
  aiInsightsData: AIInsightItem[];
}

const AIInsightsSectionContent: React.FC<AIInsightsSectionContentProps> = ({ section, aiInsightsData }) => {
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
          {aiInsightsData.map(item => (
            <Card key={item.title}>
              <CardHeader className="flex flex-row items-start space-x-3 space-y-0">
                {React.cloneElement(item.icon as React.ReactElement, { size: 20, className: "text-blue-500"})}
                <div className="flex-1">
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <CardDescription>
                      <TooltipProvider>
                          <Tooltip>
                              <TooltipTrigger className="cursor-default text-left flex items-center">
                                  <span>Clique para mais detalhes.</span>
                                  <Info size={12} className="ml-1 text-gray-400 inline flex-shrink-0" />
                              </TooltipTrigger>
                              <TooltipContent><p>{item.tooltip}</p></TooltipContent>
                          </Tooltip>
                      </TooltipProvider>
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{item.text}</p>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default AIInsightsSectionContent;
