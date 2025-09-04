
import React from 'react';
import QoLOverviewDashboard from '@/components/quality-of-life/QoLOverviewDashboard';
import QoLDomainsGrid from '@/components/quality-of-life/QoLDomainsGrid';
import QoLAdditionalAspectsGrid from '@/components/quality-of-life/QoLAdditionalAspectsGrid';
import QoLObjectiveDataGrid from '@/components/quality-of-life/QoLObjectiveDataGrid';
import QoLAIInsightsGrid from '@/components/quality-of-life/QoLAIInsightsGrid';
import { DomainDataItem, AdditionalAspectItem, ObjectiveWearableItem, AIInsightItem } from './content/types';
import { renderTrendIcon, renderMoodIcon, renderSmallTrendIcon } from '@/utils/qolRenderUtils';

interface QoLOverviewContentProps {
  eq5dVASScore: number;
  eq5dVASTrend: 'up' | 'down' | 'stable';
  overallStatus: { text: string; mood: 'good' | 'neutral' | 'bad' };
  lastCheckIn: string;
  domainData: DomainDataItem[];
  additionalAspectsData: AdditionalAspectItem[];
  objectiveWearablesData: ObjectiveWearableItem[];
  aiInsightsData: AIInsightItem[];
}

const QoLOverviewContent: React.FC<QoLOverviewContentProps> = ({
  eq5dVASScore,
  eq5dVASTrend,
  overallStatus,
  lastCheckIn,
  domainData,
  additionalAspectsData,
  objectiveWearablesData,
  aiInsightsData,
}) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <QoLOverviewDashboard
        eq5dVASScore={eq5dVASScore}
        eq5dVASTrend={eq5dVASTrend}
        overallStatus={overallStatus}
        lastCheckIn={lastCheckIn}
        renderTrendIcon={renderTrendIcon}
        renderMoodIcon={renderMoodIcon}
      />
      <QoLDomainsGrid domainData={domainData} />
      <QoLAdditionalAspectsGrid additionalAspectsData={additionalAspectsData} renderSmallTrendIcon={renderSmallTrendIcon} />
      <QoLObjectiveDataGrid objectiveWearablesData={objectiveWearablesData} />
      <QoLAIInsightsGrid aiInsightsData={aiInsightsData} />
      <div className="text-xs text-muted-foreground text-center italic mt-2">
        * Dados fictícios não reais usados para exemplo de software. Questionários como EQ-5D, WHOQOL, IQV, QWBS são ferramentas validadas.
      </div>
    </div>
  );
};

export default QoLOverviewContent;
