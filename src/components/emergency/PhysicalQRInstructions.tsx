
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from 'lucide-react';

const PhysicalQRInstructions = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Instruções QR Físico</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Para maior segurança, imprima seu QR code e mantenha-o consigo
        </p>
        
        <div className="space-y-3">
          <InstructionStep
            number={1}
            text="Baixe o QR code em alta resolução"
          />
          
          <InstructionStep
            number={2}
            text="Imprima em material resistente"
          />
          
          <InstructionStep
            number={3}
            text="Mantenha na carteira ou pulseira médica"
          />
        </div>
        
        <div className="mt-4">
          <Button variant="outline" size="sm" className="w-full">
            <Download className="mr-2 h-4 w-4" />
            Baixar para Impressão
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

interface InstructionStepProps {
  number: number;
  text: string;
}

const InstructionStep = ({ number, text }: InstructionStepProps) => {
  return (
    <div className="flex items-start gap-2">
      <div className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">
        {number}
      </div>
      <p className="text-sm">{text}</p>
    </div>
  );
};

export default PhysicalQRInstructions;
