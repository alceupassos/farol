
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HealthMetric } from '@/components/profile/types';
import { Download, FileUp, BarChart3, Goal, Share2, Bell } from 'lucide-react';
import ImportMetricsModal from './ImportMetricsModal';

interface MetricsControlPanelProps {
  onTimeRangeChange: (range: string) => void;
  onGenerateReport: () => void;
  onSetGoal: () => void;
  onSetAlert: () => void;
  onShareMetrics: () => void;
}

const MetricsControlPanel = ({
  onTimeRangeChange,
  onGenerateReport,
  onSetGoal,
  onSetAlert,
  onShareMetrics
}: MetricsControlPanelProps) => {
  const [importModalOpen, setImportModalOpen] = useState(false);
  
  const handleImportMetrics = (source: string, metrics: string[]) => {
    console.log(`Importing from ${source}:`, metrics);
    // Implementação real conectaria com APIs externas
  };

  return (
    <>
      <Card>
        <CardContent className="p-3">
          <div className="space-y-4">
            <Tabs defaultValue="7d" onValueChange={onTimeRangeChange}>
              <TabsList className="w-full">
                <TabsTrigger value="1d">1D</TabsTrigger>
                <TabsTrigger value="7d">7D</TabsTrigger>
                <TabsTrigger value="30d">30D</TabsTrigger>
                <TabsTrigger value="90d">90D</TabsTrigger>
                <TabsTrigger value="1y">1A</TabsTrigger>
                <TabsTrigger value="all">Todos</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start" 
                onClick={() => setImportModalOpen(true)}
              >
                <FileUp className="mr-2 h-4 w-4" />
                Importar
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start"
                onClick={onGenerateReport}
              >
                <BarChart3 className="mr-2 h-4 w-4" />
                Relatório
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start"
                onClick={onSetGoal}
              >
                <Goal className="mr-2 h-4 w-4" />
                Definir Meta
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start"
                onClick={onSetAlert}
              >
                <Bell className="mr-2 h-4 w-4" />
                Alertas
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start col-span-2"
                onClick={onShareMetrics}
              >
                <Share2 className="mr-2 h-4 w-4" />
                Compartilhar com Médico
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <ImportMetricsModal 
        open={importModalOpen}
        onOpenChange={setImportModalOpen}
        onImport={handleImportMetrics}
      />
    </>
  );
};

export default MetricsControlPanel;
