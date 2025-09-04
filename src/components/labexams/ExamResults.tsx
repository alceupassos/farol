
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LabExam } from './types';
import ActionButtons from './results/ActionButtons';
import ExamHeader from './results/ExamHeader';
import ResultsTab from './results/ResultsTab';
import PlaceholderTab from './results/PlaceholderTab';
import InterpretationTab from './results/InterpretationTab';

interface ExamResultsProps {
  exam: LabExam;
  onBack: () => void;
}

const ExamResults = ({ exam, onBack }: ExamResultsProps) => {
  const countAbnormalResults = () => {
    let count = 0;
    exam.groups.forEach(group => {
      group.parameters.forEach(param => {
        if (param.status === 'warning' || param.status === 'critical') {
          count++;
        }
      });
    });
    return count;
  };
  
  const abnormalCount = countAbnormalResults();

  return (
    <div className="space-y-6">
      <ActionButtons onBack={onBack} />
      
      <Card>
        <CardHeader>
          <ExamHeader exam={exam} abnormalCount={abnormalCount} />
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="resultados">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full max-w-md mb-6">
              <TabsTrigger value="resultados">Resultados</TabsTrigger>
              <TabsTrigger value="grafico">Gráficos</TabsTrigger>
              <TabsTrigger value="historico">Histórico</TabsTrigger>
              <TabsTrigger value="interpretacao">Interpretação</TabsTrigger>
            </TabsList>
            
            <TabsContent value="resultados" className="space-y-6">
              <ResultsTab exam={exam} />
            </TabsContent>
            
            <TabsContent value="grafico">
              <PlaceholderTab 
                title="Gráficos"
                description="Os gráficos de evolução estarão disponíveis quando você tiver mais de um exame do mesmo tipo."
              />
            </TabsContent>
            
            <TabsContent value="historico">
              <PlaceholderTab 
                title="Histórico" 
                description="O histórico de exames anteriores estará disponível quando você adicionar mais exames do mesmo tipo."
              />
            </TabsContent>
            
            <TabsContent value="interpretacao">
              <InterpretationTab />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <div className="text-xs text-muted-foreground text-center italic mt-2">
        * Dados fictícios não reais usados para exemplo de software
      </div>
    </div>
  );
};

export default ExamResults;
