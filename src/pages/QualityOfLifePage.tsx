import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { TooltipProvider } from "@/components/ui/tooltip"; 

// Import new components and data/utils
import QoLOverviewContent from '@/components/quality-of-life/QoLOverviewContent';
import QoLSectionContentRenderer from '@/components/quality-of-life/QoLSectionContentRenderer';
import QoLInternalSidebar from '@/components/quality-of-life/QoLInternalSidebar';
import { 
  qolSections, 
  domainData, 
  additionalAspectsData, 
  objectiveWearablesData, 
  aiInsightsData,
  eq5dVASScore,
  eq5dVASTrend,
  overallStatus,
  lastCheckIn
} from '@/data/qolData.tsx'; // Changed .ts to .tsx
import { renderSmallTrendIcon } from '@/utils/qolRenderUtils';


const QualityOfLifePage = () => {
  const [activeSection, setActiveSection] = useState('overview');

  return (
    <MainLayout>
      <div className="flex flex-col md:flex-row gap-6">
        <QoLInternalSidebar 
          qolSections={qolSections}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
        <div className="flex-1">
          <TooltipProvider>
            {activeSection === 'overview' ? (
              <QoLOverviewContent
                eq5dVASScore={eq5dVASScore}
                eq5dVASTrend={eq5dVASTrend}
                overallStatus={overallStatus}
                lastCheckIn={lastCheckIn}
                domainData={domainData}
                additionalAspectsData={additionalAspectsData}
                objectiveWearablesData={objectiveWearablesData}
                aiInsightsData={aiInsightsData}
              />
            ) : (
              <QoLSectionContentRenderer
                activeSection={activeSection}
                qolSections={qolSections}
                domainData={domainData}
                additionalAspectsData={additionalAspectsData}
                objectiveWearablesData={objectiveWearablesData}
                aiInsightsData={aiInsightsData}
                renderSmallTrendIcon={renderSmallTrendIcon} 
              />
            )}
          </TooltipProvider>
        </div>
      </div>
    </MainLayout>
  );
};

export default QualityOfLifePage;
