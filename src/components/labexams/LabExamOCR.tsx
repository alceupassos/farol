
import { useState } from 'react';
import { Camera, Upload, Loader2, Check, AlertTriangle, XCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { LabExam } from './types';
import { processSampleHemogram } from '@/data/labExamsData';
import { useToast } from '@/components/ui/use-toast';

interface LabExamOCRProps {
  onComplete: (exam: LabExam) => void;
  onCancel: () => void;
}

const LabExamOCR = ({ onComplete, onCancel }: LabExamOCRProps) => {
  const [step, setStep] = useState<'initial' | 'capture' | 'processing' | 'review' | 'complete'>('initial');
  const [progress, setProgress] = useState(0);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [processedExam, setProcessedExam] = useState<LabExam | null>(null);
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === 'string') {
        setImagePreview(event.target.result);
        setStep('processing');
        simulateProcessing();
      }
    };
    reader.readAsDataURL(file);
  };

  const simulateProcessing = () => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          const exam = processSampleHemogram();
          setProcessedExam(exam);
          setStep('review');
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };

  const handleComplete = () => {
    if (processedExam) {
      toast({
        title: "Exame processado com sucesso",
        description: "Os resultados do hemograma foram extraídos e salvos.",
      });
      onComplete(processedExam);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 'initial':
        return (
          <div className="flex flex-col items-center space-y-6 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              <Button 
                variant="outline" 
                className="h-32 flex flex-col gap-2 border-dashed"
                onClick={() => setStep('capture')}
              >
                <Camera className="h-8 w-8" />
                <span>Capturar com câmera</span>
              </Button>
              
              <label htmlFor="upload-exam" className="cursor-pointer">
                <div className="h-32 flex flex-col items-center justify-center gap-2 border border-dashed border-border rounded-md hover:bg-muted/30 transition-all">
                  <Upload className="h-8 w-8" />
                  <span>Fazer upload de imagem</span>
                </div>
                <input 
                  id="upload-exam" 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleImageUpload}
                />
              </label>
            </div>
            
            <div className="text-sm text-muted-foreground text-center max-w-md">
              Faça o upload de uma imagem nítida do seu exame ou tire uma foto. 
              Para melhores resultados, certifique-se de que o documento está bem iluminado.
            </div>
          </div>
        );
        
      case 'capture':
        return (
          <div className="flex flex-col items-center space-y-6 py-8">
            <div className="w-full max-w-md aspect-[3/4] bg-black rounded-lg flex items-center justify-center">
              <div className="text-center text-white">
                <p>Acesso à câmera não disponível nesta demonstração</p>
                <Button 
                  variant="outline" 
                  className="mt-4 bg-white text-black hover:bg-gray-200"
                  onClick={() => {
                    // Simular captura usando a imagem de exemplo
                    setImagePreview("/lovable-uploads/f4731860-a224-4e16-b81d-315aed901499.png");
                    setStep('processing');
                    simulateProcessing();
                  }}
                >
                  Simular captura
                </Button>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep('initial')}>Voltar</Button>
            </div>
          </div>
        );
        
      case 'processing':
        return (
          <div className="flex flex-col items-center space-y-6 py-8">
            {imagePreview && (
              <div className="w-full max-w-md overflow-hidden rounded-lg border border-border">
                <img 
                  src={imagePreview} 
                  alt="Exame capturado" 
                  className="w-full h-auto"
                />
              </div>
            )}
            
            <div className="w-full max-w-md space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <span>Processando documento</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
              
              <div className="text-sm text-muted-foreground pt-2">
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Extraindo texto com OCR...</span>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'review':
        return (
          <div className="flex flex-col items-center space-y-6 py-8">
            <div className="flex flex-col md:flex-row gap-6 w-full">
              {imagePreview && (
                <div className="w-full max-w-xs overflow-hidden rounded-lg border border-border">
                  <img 
                    src={imagePreview} 
                    alt="Exame capturado" 
                    className="w-full h-auto"
                  />
                </div>
              )}
              
              <div className="flex-1 space-y-4">
                <h3 className="text-lg font-medium">Informações extraídas</h3>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium">Tipo de exame</p>
                    <p className="flex items-center gap-1">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>Hemograma Completo</span>
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium">Laboratório</p>
                    <p className="flex items-center gap-1">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>Laboratório Flor</span>
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium">Data</p>
                    <p className="flex items-center gap-1">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>24/05/2022</span>
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium">Parâmetros detectados</p>
                    <p className="flex items-center gap-1">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>21 parâmetros extraídos com sucesso</span>
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium">Valores fora da referência</p>
                    <p className="flex items-center gap-1">
                      <AlertTriangle className="h-4 w-4 text-amber-500" />
                      <span>3 valores fora da referência (hemoglobina, hematócrito, VCM)</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2 w-full justify-end">
              <Button variant="outline" onClick={onCancel}>Cancelar</Button>
              <Button onClick={handleComplete}>Salvar Exame</Button>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div>
      {renderStep()}
    </div>
  );
};

export default LabExamOCR;
