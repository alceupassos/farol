
import { AlertTriangle, CheckCircle, FileText } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

const InterpretationTab = () => {
  return (
    <>
      <Card className="border-amber-200/30 bg-amber-50/10 dark:bg-amber-900/5">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <AlertTriangle className="h-6 w-6 text-amber-500 flex-shrink-0 mt-1" />
            <div>
              <h4 className="text-base font-medium mb-2">Aviso importante</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Esta interpretação é gerada automaticamente com base nos resultados do exame, mas não substitui
                a avaliação de um profissional de saúde. Sempre consulte seu médico para interpretação adequada
                dos seus resultados.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="mt-6 space-y-4">
        <h3 className="text-lg font-medium">Interpretação Preliminar</h3>
        
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              Hemoglobina e Hematócrito Reduzidos
            </h4>
            <p className="text-sm text-muted-foreground mb-3">
              Seus valores de hemoglobina (11,3 g/dL) e hematócrito (35,3%) estão ligeiramente abaixo da faixa de referência,
              o que pode indicar uma anemia leve. 
            </p>
            <div className="text-sm">
              <p className="font-medium mb-1">Possíveis causas incluem:</p>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                <li>Deficiência de ferro na alimentação</li>
                <li>Perda sanguínea recente ou crônica</li>
                <li>Deficiência de vitaminas como B12 ou ácido fólico</li>
                <li>Condições inflamatórias crônicas</li>
              </ul>
            </div>
          </div>
          
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium flex items-center gap-2 mb-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              Contagem de Leucócitos Normal
            </h4>
            <p className="text-sm text-muted-foreground">
              Sua contagem de células brancas (leucócitos) está dentro da faixa normal (7.700/mm³), 
              indicando que não há sinais de infecção ou inflamação aguda no momento do exame.
            </p>
          </div>
          
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium flex items-center gap-2 mb-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              Plaquetas Normais
            </h4>
            <p className="text-sm text-muted-foreground">
              Sua contagem de plaquetas está normal (202.000/mm³), indicando boa capacidade de coagulação sanguínea.
            </p>
          </div>
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">Recomendações Gerais</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="pt-6">
                <h4 className="font-medium flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-primary" />
                  Consulte seu médico
                </h4>
                <p className="text-sm text-muted-foreground">
                  Devido aos valores alterados, recomenda-se agendar uma consulta com seu médico para avaliar
                  os resultados e discutir possíveis investigações adicionais.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h4 className="font-medium flex items-center gap-2 mb-2">
                  <FileText className="h-4 w-4 text-primary" />
                  Considere exames adicionais
                </h4>
                <p className="text-sm text-muted-foreground">
                  Seu médico pode solicitar exames complementares como ferritina, ferro sérico,
                  vitamina B12 e ácido fólico para investigar a causa da possível anemia.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default InterpretationTab;
