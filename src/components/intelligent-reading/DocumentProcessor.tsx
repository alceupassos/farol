import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { 
  Brain, 
  FileText, 
  Stethoscope, 
  Pill, 
  ClipboardList, 
  Activity,
  CheckCircle,
  AlertTriangle,
  Loader2,
  Zap
} from 'lucide-react';

interface ProcessingStep {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  progress: number;
  result?: any;
}

interface AIAgent {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  status: 'idle' | 'processing' | 'completed';
  results?: any[];
}

export const DocumentProcessor = () => {
  const [processingSteps, setProcessingSteps] = useState<ProcessingStep[]>([
    {
      id: 'ocr',
      name: 'Extração OCR',
      description: 'Extraindo texto do documento',
      status: 'pending',
      progress: 0
    },
    {
      id: 'classification',
      name: 'Classificação de Documento',
      description: 'Identificando tipo de documento médico',
      status: 'pending',
      progress: 0
    },
    {
      id: 'structure',
      name: 'Análise Estrutural',
      description: 'Identificando seções e campos',
      status: 'pending',
      progress: 0
    },
    {
      id: 'interpretation',
      name: 'Interpretação Médica',
      description: 'Analisando conteúdo médico',
      status: 'pending',
      progress: 0
    }
  ]);

  const [aiAgents, setAiAgents] = useState<AIAgent[]>([
    {
      id: 'ia-exames',
      name: 'IA-EXAMES',
      icon: <Activity className="h-5 w-5" />,
      description: 'Interpreta resultados laboratoriais e valores de referência',
      status: 'idle'
    },
    {
      id: 'ia-receitas',
      name: 'IA-RECEITAS',
      icon: <Pill className="h-5 w-5" />,
      description: 'Extrai medicamentos, dosagens e instruções',
      status: 'idle'
    },
    {
      id: 'ia-prontuarios',
      name: 'IA-PRONTUÁRIOS',
      icon: <ClipboardList className="h-5 w-5" />,
      description: 'Estrutura consultas, diagnósticos e procedimentos',
      status: 'idle'
    },
    {
      id: 'ia-laudos',
      name: 'IA-LAUDOS',
      icon: <FileText className="h-5 w-5" />,
      description: 'Analisa relatórios de imagem e biópsias',
      status: 'idle'
    }
  ]);

  const [currentDocument, setCurrentDocument] = useState({
    name: 'hemograma_completo_2024.pdf',
    type: 'exam',
    extractedText: `LABORATÓRIO CLÍNICO - HEMOGRAMA COMPLETO
    
Paciente: João Silva
Data: 15/01/2024
Idade: 45 anos

ERITROGRAMA:
Hemácias: 4.8 milhões/mm³ (VR: 4.5-6.0)
Hemoglobina: 14.2 g/dL (VR: 13.5-17.5)
Hematócrito: 42% (VR: 41-53)

LEUCOGRAMA:
Leucócitos: 7.200/mm³ (VR: 4.000-11.000)
Neutrófilos: 65% (VR: 50-70)
Linfócitos: 30% (VR: 20-40)
Monócitos: 4% (VR: 2-8)
Eosinófilos: 1% (VR: 1-4)

PLAQUETAS: 280.000/mm³ (VR: 150.000-450.000)

Observações: Hemograma dentro dos padrões de normalidade.`
  });

  const { toast } = useToast();

  useEffect(() => {
    startProcessing();
  }, []);

  const startProcessing = async () => {
    // Simular processamento sequencial
    for (let i = 0; i < processingSteps.length; i++) {
      await processStep(i);
    }

    // Após conclusão, ativar agentes IA
    await activateAIAgents();
  };

  const processStep = async (stepIndex: number) => {
    const step = processingSteps[stepIndex];
    
    // Iniciar processamento
    setProcessingSteps(prev => prev.map((s, i) => 
      i === stepIndex 
        ? { ...s, status: 'processing', progress: 0 }
        : s
    ));

    // Simular progresso
    for (let progress = 0; progress <= 100; progress += 10) {
      await new Promise(resolve => setTimeout(resolve, 100));
      setProcessingSteps(prev => prev.map((s, i) => 
        i === stepIndex 
          ? { ...s, progress }
          : s
      ));
    }

    // Completar
    setProcessingSteps(prev => prev.map((s, i) => 
      i === stepIndex 
        ? { 
            ...s, 
            status: 'completed', 
            progress: 100,
            result: getStepResult(step.id)
          }
        : s
    ));
  };

  const getStepResult = (stepId: string) => {
    switch (stepId) {
      case 'ocr':
        return { confidence: 95, textLength: 1240 };
      case 'classification':
        return { type: 'Hemograma Completo', confidence: 98 };
      case 'structure':
        return { sections: ['Eritrograma', 'Leucograma', 'Plaquetas'], fields: 12 };
      case 'interpretation':
        return { status: 'Normal', alerts: 0, recommendations: 2 };
      default:
        return null;
    }
  };

  const activateAIAgents = async () => {
    // Ativar agente específico baseado no tipo de documento
    const agentId = 'ia-exames'; // Para hemograma
    
    setAiAgents(prev => prev.map(agent => 
      agent.id === agentId 
        ? { ...agent, status: 'processing' }
        : agent
    ));

    // Simular processamento do agente
    await new Promise(resolve => setTimeout(resolve, 2000));

    setAiAgents(prev => prev.map(agent => 
      agent.id === agentId 
        ? { 
            ...agent, 
            status: 'completed',
            results: getAgentResults(agentId)
          }
        : agent
    ));

    toast({
      title: "Processamento concluído",
      description: "Documento analisado com sucesso pelos agentes IA.",
    });
  };

  const getAgentResults = (agentId: string) => {
    if (agentId === 'ia-exames') {
      return [
        {
          parameter: 'Hemoglobina',
          value: '14.2 g/dL',
          reference: '13.5-17.5 g/dL',
          status: 'normal',
          interpretation: 'Valor dentro da normalidade'
        },
        {
          parameter: 'Leucócitos',
          value: '7.200/mm³',
          reference: '4.000-11.000/mm³',
          status: 'normal',
          interpretation: 'Contagem normal, sem sinais de infecção'
        },
        {
          parameter: 'Plaquetas',
          value: '280.000/mm³',
          reference: '150.000-450.000/mm³',
          status: 'normal',
          interpretation: 'Coagulação adequada'
        }
      ];
    }
    return [];
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <div className="w-6 h-6 rounded-full border-2 border-muted" />;
      case 'processing':
        return <Loader2 className="h-6 w-6 animate-spin text-warning" />;
      case 'completed':
        return <CheckCircle className="h-6 w-6 text-success" />;
      case 'error':
        return <AlertTriangle className="h-6 w-6 text-error" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Documento Atual */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Documento em Processamento
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">{currentDocument.name}</h3>
              <p className="text-sm text-muted-foreground">
                Tipo: {currentDocument.type === 'exam' ? 'Exame Laboratorial' : 'Documento'}
              </p>
            </div>
            <Badge variant="secondary">Hemograma Completo</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Etapas de Processamento */}
      <Card>
        <CardHeader>
          <CardTitle>Etapas de Processamento</CardTitle>
          <CardDescription>
            Pipeline de análise automática do documento
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {processingSteps.map((step, index) => (
              <div key={step.id} className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  {getStatusIcon(step.status)}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{step.name}</h4>
                    <span className="text-sm text-muted-foreground">
                      {step.progress}%
                    </span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-2">
                    {step.description}
                  </p>
                  
                  {step.status !== 'pending' && (
                    <Progress value={step.progress} className="h-2" />
                  )}
                  
                  {step.result && (
                    <div className="mt-2 text-xs text-muted-foreground">
                      {JSON.stringify(step.result)}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Agentes IA */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            Agentes de IA Especializados
          </CardTitle>
          <CardDescription>
            Interpretação especializada por área médica
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {aiAgents.map((agent) => (
              <Card key={agent.id} className="border-2">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2 rounded-lg ${
                      agent.status === 'completed' ? 'bg-success/10 text-success' :
                      agent.status === 'processing' ? 'bg-warning/10 text-warning' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {agent.icon}
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="font-semibold">{agent.name}</h4>
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant={
                            agent.status === 'completed' ? 'default' :
                            agent.status === 'processing' ? 'secondary' :
                            'outline'
                          }
                        >
                          {agent.status === 'completed' ? 'Concluído' :
                           agent.status === 'processing' ? 'Processando' :
                           'Aguardando'}
                        </Badge>
                        {agent.status === 'processing' && (
                          <Zap className="h-4 w-4 text-warning animate-pulse" />
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">
                    {agent.description}
                  </p>
                  
                  {agent.results && (
                    <div className="space-y-2">
                      <Separator />
                      <h5 className="font-medium text-sm">Resultados:</h5>
                      {agent.results.map((result, idx) => (
                        <div key={idx} className="text-xs space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{result.parameter}</span>
                            <Badge 
                              variant={result.status === 'normal' ? 'default' : 'destructive'}
                              className="text-xs"
                            >
                              {result.status}
                            </Badge>
                          </div>
                          <div className="text-muted-foreground">
                            {result.value} (Ref: {result.reference})
                          </div>
                          <div className="text-muted-foreground italic">
                            {result.interpretation}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Ações */}
      <div className="flex gap-4 justify-end">
        <Button variant="outline">
          Reprocessar
        </Button>
        <Button>
          Salvar na Carteira
        </Button>
      </div>
    </div>
  );
};