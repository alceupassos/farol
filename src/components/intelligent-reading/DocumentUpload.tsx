import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  Upload, 
  Camera, 
  FileText, 
  Image as ImageIcon, 
  Loader2,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface UploadedDocument {
  id: string;
  name: string;
  type: string;
  url: string;
  status: 'processing' | 'completed' | 'error';
  extractedText?: string;
  documentType?: 'exam' | 'prescription' | 'record' | 'report';
}

export const DocumentUpload = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [documents, setDocuments] = useState<UploadedDocument[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = async (files: File[]) => {
    for (const file of files) {
      await uploadFile(file);
    }
  };

  const uploadFile = async (file: File) => {
    setUploading(true);
    setUploadProgress(0);

    try {
      // Simular progresso de upload
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 90));
      }, 100);

      // Upload para Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
      
      const { data, error } = await supabase.storage
        .from('medical-documents')
        .upload(fileName, file);

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (error) throw error;

      // Obter URL pública
      const { data: urlData } = supabase.storage
        .from('medical-documents')
        .getPublicUrl(fileName);

      // Adicionar documento à lista
      const newDocument: UploadedDocument = {
        id: Date.now().toString(),
        name: file.name,
        type: file.type,
        url: urlData.publicUrl,
        status: 'processing'
      };

      setDocuments(prev => [...prev, newDocument]);

      // Processar OCR
      await processOCR(newDocument);

      toast({
        title: "Upload concluído",
        description: `${file.name} foi processado com sucesso.`,
      });

    } catch (error) {
      console.error('Erro no upload:', error);
      toast({
        title: "Erro no upload",
        description: "Falha ao fazer upload do arquivo.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const processOCR = async (document: UploadedDocument) => {
    try {
      // Simular processamento OCR
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Atualizar documento com texto extraído
      setDocuments(prev => prev.map(doc => 
        doc.id === document.id 
          ? { 
              ...doc, 
              status: 'completed',
              extractedText: 'Texto extraído do documento...',
              documentType: detectDocumentType(document.name)
            }
          : doc
      ));

    } catch (error) {
      setDocuments(prev => prev.map(doc => 
        doc.id === document.id 
          ? { ...doc, status: 'error' }
          : doc
      ));
    }
  };

  const detectDocumentType = (filename: string): 'exam' | 'prescription' | 'record' | 'report' => {
    const lower = filename.toLowerCase();
    if (lower.includes('exame') || lower.includes('lab')) return 'exam';
    if (lower.includes('receita') || lower.includes('prescription')) return 'prescription';
    if (lower.includes('laudo') || lower.includes('report')) return 'report';
    return 'record';
  };

  const getDocumentTypeLabel = (type: string) => {
    const types = {
      exam: 'Exame',
      prescription: 'Receita',
      record: 'Prontuário',
      report: 'Laudo'
    };
    return types[type as keyof typeof types] || 'Documento';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'processing':
        return <Loader2 className="h-4 w-4 animate-spin text-warning" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-error" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Área de Upload */}
      <Card 
        className={`border-2 border-dashed transition-colors ${
          dragActive 
            ? 'border-primary bg-primary/5' 
            : 'border-muted-foreground/25 hover:border-primary/50'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Upload className="h-8 w-8 text-primary" />
          </div>
          
          <h3 className="text-lg font-semibold mb-2">
            Arraste documentos aqui ou clique para selecionar
          </h3>
          
          <p className="text-muted-foreground text-center mb-6">
            Suporte para imagens (JPG, PNG, PDF) e documentos médicos
          </p>
          
          <div className="flex gap-4">
            <Button onClick={() => fileInputRef.current?.click()}>
              <FileText className="h-4 w-4 mr-2" />
              Selecionar Arquivos
            </Button>
            
            <Button variant="outline">
              <Camera className="h-4 w-4 mr-2" />
              Capturar Foto
            </Button>
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,.pdf"
            onChange={handleFileInput}
            className="hidden"
          />
        </CardContent>
      </Card>

      {/* Progresso de Upload */}
      {uploading && (
        <Card>
          <CardContent className="py-6">
            <div className="flex items-center gap-4">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
              <div className="flex-1">
                <div className="flex justify-between text-sm mb-2">
                  <span>Fazendo upload...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Lista de Documentos */}
      {documents.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Documentos Processados</h3>
          
          {documents.map((doc) => (
            <Card key={doc.id} className="animate-slide-up">
              <CardContent className="py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-secondary">
                      <ImageIcon className="h-5 w-5 text-secondary-foreground" />
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{doc.name}</h4>
                        {doc.documentType && (
                          <Badge variant="secondary">
                            {getDocumentTypeLabel(doc.documentType)}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {doc.type}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {getStatusIcon(doc.status)}
                    <span className="text-sm capitalize">{doc.status}</span>
                  </div>
                </div>
                
                {doc.extractedText && (
                  <div className="mt-4 p-4 bg-muted rounded-lg">
                    <h5 className="font-medium mb-2">Texto Extraído:</h5>
                    <p className="text-sm text-muted-foreground">
                      {doc.extractedText}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};