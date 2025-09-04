
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info, FileText, ArrowRight } from 'lucide-react';

interface QoLSection {
  id: string;
  name: string;
  icon: React.ReactNode;
  tooltip: string;
}

interface QoLInternalSidebarProps {
  qolSections: QoLSection[];
  activeSection: string;
  setActiveSection: (sectionId: string) => void;
}

const QoLInternalSidebar: React.FC<QoLInternalSidebarProps> = ({ qolSections, activeSection, setActiveSection }) => {
  return (
    <nav className="md:w-72 lg:w-80 space-y-2 bg-card p-4 rounded-lg shadow-sm md:sticky md:top-20 md:max-h-[calc(100vh-10rem)] overflow-y-auto">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="w-full text-left">
            <h2 className="text-lg font-semibold px-3 mb-2 text-primary flex items-center">
              Índice de Qualidade de Vida <Info size={14} className="ml-1 text-gray-400" />
            </h2>
          </TooltipTrigger>
          <TooltipContent>
            <p>Navegue pelas diferentes seções da sua avaliação de Qualidade de Vida.</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      {qolSections.map((section) => (
        <TooltipProvider key={section.id}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={activeSection === section.id ? "secondary" : "ghost"}
                className="w-full justify-start text-base py-3 h-auto"
                onClick={() => setActiveSection(section.id)}
              >
                {React.cloneElement(section.icon as React.ReactElement, { className: "h-5 w-5 mr-3 flex-shrink-0" })}
                <span className="truncate">{section.name}</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" align="center">
              <p>{section.tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
      <div className="mt-auto pt-4 border-t border-border">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-base py-3 h-auto mb-2" onClick={() => setActiveSection('history')}>
                <FileText className="h-5 w-5 mr-3 flex-shrink-0" /> Ver Histórico Completo
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Acesse o histórico completo e detalhado de todos os seus índices de qualidade de vida.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-base py-3 h-auto">
                <ArrowRight className="h-5 w-5 mr-3 flex-shrink-0" /> Exportar Relatório PDF
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Gere um relatório resumido em PDF para visualizar ou compartilhar com profissionais de saúde.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </nav>
  );
};

export default QoLInternalSidebar;
