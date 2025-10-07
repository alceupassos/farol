
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from '@/components/ui/button';
import { Info, BookOpen } from 'lucide-react';
import { QoLSection, RenderDetailChartPlaceholderFn } from './types';

interface HistorySectionContentProps {
  section: QoLSection;
  renderDetailChartPlaceholder: RenderDetailChartPlaceholderFn;
}

const HistorySectionContent: React.FC<HistorySectionContentProps> = ({ section, renderDetailChartPlaceholder }) => {
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
                     <span>Acesse o histórico completo e detalhado de todos os seus índices de qualidade de vida.</span>
                     <Info size={12} className="ml-1 text-gray-400 inline flex-shrink-0" />
                  </TooltipTrigger>
                  <TooltipContent><p>Acesse o histórico completo e detalhado de todos os seus índices de qualidade de vida.</p></TooltipContent>
              </Tooltip>
          </TooltipProvider>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Esta seção apresentará um histórico detalhado de todas as suas avaliações de qualidade de vida ao longo do tempo.</p>
        <p className="mt-2">Você poderá ver gráficos de evolução, comparar períodos e entender melhor suas tendências.</p>
        {renderDetailChartPlaceholder("Line", 300)}
         <Button variant="outline" className="w-full justify-center text-base py-3 h-auto mt-6">
            <BookOpen className="h-5 w-5 mr-3 flex-shrink-0" /> Ver Guias de Interpretação
        </Button>
      </CardContent>
    </Card>
  );
};

export default HistorySectionContent;
