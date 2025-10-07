
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import QoLSourceInfoSection from './QoLSourceInfoSection';
import QoLExampleImplementationSection from './QoLExampleImplementationSection';
import { renderDetailChartPlaceholder } from './charts/QoLChartPlaceholders';
import { 
  QoLSection, 
  DomainDataItem, 
  AdditionalAspectItem, 
  ObjectiveWearableItem, 
  AIInsightItem,
  RenderSmallTrendIconFn
} from './content/types';

import DomainSectionContent from './content/DomainSectionContent';
import AdditionalAspectSectionContent from './content/AdditionalAspectSectionContent';
import ObjectiveDataSectionContent from './content/ObjectiveDataSectionContent';
import AIInsightsSectionContent from './content/AIInsightsSectionContent';
import HistorySectionContent from './content/HistorySectionContent';

interface QoLSectionContentRendererProps {
  activeSection: string;
  qolSections: QoLSection[];
  domainData: DomainDataItem[];
  additionalAspectsData: AdditionalAspectItem[];
  objectiveWearablesData: ObjectiveWearableItem[];
  aiInsightsData: AIInsightItem[];
  renderSmallTrendIcon: RenderSmallTrendIconFn;
}

const QoLSectionContentRenderer: React.FC<QoLSectionContentRendererProps> = ({
  activeSection,
  qolSections,
  domainData,
  additionalAspectsData,
  objectiveWearablesData,
  aiInsightsData,
  renderSmallTrendIcon,
}) => {
  const currentSectionInfo = qolSections.find(s => s.id === activeSection);

  if (!currentSectionInfo) {
    return (
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle>Seção não encontrada</CardTitle>
        </CardHeader>
        <CardContent><p>A seção solicitada não pôde ser encontrada.</p></CardContent>
      </Card>
    );
  }

  switch (currentSectionInfo.id) {
    case 'mobility':
    case 'selfcare':
    case 'activities':
    case 'pain':
    case 'anxiety': {
      const dataItem = domainData.find(d => d.name === currentSectionInfo.name || (currentSectionInfo.name === "Dor / Desconforto" && d.name === "Dor / Desconforto Físico") || (currentSectionInfo.name === "Ansiedade / Depressão" && d.name === "Ansiedade / Depressão"));
      if (!dataItem) return <p>Dados não encontrados para {currentSectionInfo.name}.</p>;
      return <DomainSectionContent section={currentSectionInfo} dataItem={dataItem} renderDetailChartPlaceholder={renderDetailChartPlaceholder} />;
    }

    case 'social':
    case 'environment':
    case 'psychoSpiritual':
    case 'socioeconomic': {
      const dataItem = additionalAspectsData.find(d => d.name === currentSectionInfo.name || (currentSectionInfo.id === "psychoSpiritual" && d.name === "Psicológico/Espiritual"));
      if (!dataItem) return <p>Dados não encontrados para {currentSectionInfo.name}.</p>;
      return <AdditionalAspectSectionContent section={currentSectionInfo} dataItem={dataItem} renderDetailChartPlaceholder={renderDetailChartPlaceholder} renderSmallTrendIcon={renderSmallTrendIcon} />;
    }
    
    case 'objectiveData': {
      return <ObjectiveDataSectionContent section={currentSectionInfo} objectiveWearablesData={objectiveWearablesData} renderDetailChartPlaceholder={renderDetailChartPlaceholder} />;
    }

    case 'insights': {
      return <AIInsightsSectionContent section={currentSectionInfo} aiInsightsData={aiInsightsData} />;
    }
    
    case 'history': {
      return <HistorySectionContent section={currentSectionInfo} renderDetailChartPlaceholder={renderDetailChartPlaceholder} />;
    }
    
    case 'source':
      return <QoLSourceInfoSection section={currentSectionInfo} />;

    case 'exampleImplementation':
      return <QoLExampleImplementationSection section={currentSectionInfo} />;

    default:
      return (
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="capitalize flex items-center">
              {currentSectionInfo?.icon && React.cloneElement(currentSectionInfo.icon as React.ReactElement, { className: "h-6 w-6 mr-3" })}
              {currentSectionInfo?.name || "Seção Desconhecida"}
            </CardTitle>
            <CardDescription>Conteúdo para {currentSectionInfo?.name || "esta seção"} será implementado em breve.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Detalhes e gráficos específicos para <strong>{currentSectionInfo?.name || "esta seção"}</strong> estão em desenvolvimento.</p>
            {renderDetailChartPlaceholder("Line")}
          </CardContent>
        </Card>
      );
  }
};

export default QoLSectionContentRenderer;
