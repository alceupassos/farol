
import { Button } from "@/components/ui/button";
import { ChevronLeft, Download, Share2, Printer } from 'lucide-react';

interface ActionButtonsProps {
  onBack: () => void;
}

const ActionButtons = ({ onBack }: ActionButtonsProps) => {
  return (
    <div className="flex items-center justify-between">
      <Button 
        variant="ghost" 
        className="gap-2" 
        onClick={onBack}
      >
        <ChevronLeft className="h-4 w-4" />
        Voltar para exames
      </Button>
      
      <div className="flex gap-2">
        <Button variant="outline" className="gap-2" size="sm">
          <Download className="h-4 w-4" />
          <span className="hidden sm:inline">Baixar</span>
        </Button>
        <Button variant="outline" className="gap-2" size="sm">
          <Share2 className="h-4 w-4" />
          <span className="hidden sm:inline">Compartilhar</span>
        </Button>
        <Button variant="outline" className="gap-2" size="sm">
          <Printer className="h-4 w-4" />
          <span className="hidden sm:inline">Imprimir</span>
        </Button>
      </div>
    </div>
  );
};

export default ActionButtons;
