
import { Button } from "@/components/ui/button";
import { FileText, ExternalLink } from 'lucide-react';

interface ExamDocumentProps {
  imageUrl?: string;
}

const ExamDocument = ({ imageUrl }: ExamDocumentProps) => {
  if (!imageUrl) return null;
  
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/30">
      <div className="flex items-center gap-3">
        <FileText className="h-6 w-6 text-primary" />
        <div>
          <p className="text-sm font-medium">Imagem original do exame</p>
          <p className="text-xs text-muted-foreground">Documento digitalizado</p>
        </div>
      </div>
      <Button variant="ghost" size="sm" className="gap-2">
        Visualizar <ExternalLink className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
};

export default ExamDocument;
