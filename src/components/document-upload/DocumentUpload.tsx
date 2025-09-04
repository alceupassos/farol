import React, { useState } from 'react';
import { Upload, FileText, Camera, User, Heart, TestTube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import CameraCapture from '@/components/camera/CameraCapture';

interface DocumentUploadProps {
  userId?: string;
  onUploadComplete?: (fileUrl: string, extractedData?: any) => void;
}

type DocumentType = 'identity' | 'medical' | 'exam';

const DocumentUpload: React.FC<DocumentUploadProps> = ({
  userId,
  onUploadComplete
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [selectedType, setSelectedType] = useState<DocumentType>('identity');
  const { toast } = useToast();

  const documentTypes = [
    {
      type: 'identity' as DocumentType,
      title: 'Documentos de Identidade',
      description: 'RG, CNH, CPF, Certidão de Nascimento',
      icon: User,
      bucket: 'identity-documents'
    },
    {
      type: 'medical' as DocumentType,
      title: 'Documentos Médicos',
      description: 'Receitas, relatórios, laudos médicos',
      icon: Heart,
      bucket: 'medical-documents'
    },
    {
      type: 'exam' as DocumentType,
      title: 'Exames e Imagens',
      description: 'Raio-X, ultrassom, tomografia, ressonância',
      icon: TestTube,
      bucket: 'exam-images'
    }
  ];

  const uploadFile = async (file: File, type: DocumentType) => {
    if (!userId) {
      toast({
        title: "Erro",
        description: "Usuário não identificado. Faça login para continuar.",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);

    try {
      const documentTypeConfig = documentTypes.find(dt => dt.type === type);
      if (!documentTypeConfig) throw new Error('Tipo de documento inválido');

      // Upload para o Supabase Storage
      const fileName = `${userId}/${Date.now()}-${file.name}`;
      const { data, error } = await supabase.storage
        .from(documentTypeConfig.bucket)
        .upload(fileName, file);

      if (error) throw error;

      // Obter URL pública
      const { data: publicData } = supabase.storage
        .from(documentTypeConfig.bucket)
        .getPublicUrl(fileName);

      // Processar documento com OCR se necessário
      let extractedData = null;
      if (type === 'identity') {
        extractedData = await processIdentityDocument(file);
      } else if (type === 'medical') {
        extractedData = await processMedicalDocument(file);
      }

      toast({
        title: "Upload realizado com sucesso!",
        description: `${documentTypeConfig.title} enviado e processado.`,
      });

      onUploadComplete?.(publicData.publicUrl, extractedData);

    } catch (error) {
      console.error('Erro no upload:', error);
      toast({
        title: "Erro no upload",
        description: "Não foi possível enviar o documento. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
      setShowCamera(false);
    }
  };

  const processIdentityDocument = async (file: File): Promise<any> => {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const { data, error } = await supabase.functions.invoke('medical-ocr-gemini', {
        body: formData,
      });

      if (error) throw error;

      // Extrair dados específicos de documentos de identidade
      const text = data.extractedText || '';
      const extractedData = {
        documentType: detectDocumentType(text),
        name: extractNameFromText(text),
        document: extractDocumentNumber(text),
        birthDate: extractBirthDate(text),
        rawText: text
      };

      return extractedData;
    } catch (error) {
      console.error('Erro no processamento OCR:', error);
      return null;
    }
  };

  const processMedicalDocument = async (file: File): Promise<any> => {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const { data, error } = await supabase.functions.invoke('medical-document-analyzer', {
        body: formData,
      });

      if (error) throw error;

      return data;
    } catch (error) {
      console.error('Erro no processamento médico:', error);
      return null;
    }
  };

  const detectDocumentType = (text: string): string => {
    if (text.includes('CARTEIRA NACIONAL') || text.includes('CNH')) return 'CNH';
    if (text.includes('REGISTRO GERAL') || text.includes('SECRETARIA')) return 'RG';
    if (text.includes('CERTIDÃO')) return 'Certidão';
    return 'Documento';
  };

  const extractNameFromText = (text: string): string => {
    const namePattern = /NOME[:\s]+([A-ZÁÊÔÇ\s]+)/i;
    const match = text.match(namePattern);
    return match ? match[1].trim() : '';
  };

  const extractDocumentNumber = (text: string): string => {
    const rgPattern = /(\d{1,2}\.?\d{3}\.?\d{3}-?[\dX])/;
    const match = text.match(rgPattern);
    return match ? match[1] : '';
  };

  const extractBirthDate = (text: string): string => {
    const datePattern = /(\d{1,2}\/\d{1,2}\/\d{4})/;
    const match = text.match(datePattern);
    return match ? match[1] : '';
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>, type: DocumentType) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadFile(file, type);
    }
  };

  const handleCameraCapture = (file: File) => {
    uploadFile(file, selectedType);
  };

  const openCamera = (type: DocumentType) => {
    setSelectedType(type);
    setShowCamera(true);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        {documentTypes.map((docType) => {
          const IconComponent = docType.icon;
          return (
            <Card key={docType.type} className="relative">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <IconComponent className="w-5 h-5" />
                  {docType.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  {docType.description}
                </p>
                
                <div className="space-y-2">
                  <Button
                    onClick={() => openCamera(docType.type)}
                    className="w-full"
                    disabled={isUploading}
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Fotografar
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="w-full"
                    disabled={isUploading}
                    onClick={() => document.getElementById(`file-${docType.type}`)?.click()}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Escolher Arquivo
                  </Button>
                </div>

                <input
                  id={`file-${docType.type}`}
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={(e) => handleFileSelect(e, docType.type)}
                  className="hidden"
                />
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Dialog open={showCamera} onOpenChange={setShowCamera}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>
              Capturar {documentTypes.find(dt => dt.type === selectedType)?.title}
            </DialogTitle>
          </DialogHeader>
          
          <CameraCapture
            type={selectedType}
            title={documentTypes.find(dt => dt.type === selectedType)?.title || ''}
            onCapture={handleCameraCapture}
            onCancel={() => setShowCamera(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DocumentUpload;