import { useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  Upload, 
  Camera, 
  FileText, 
  Brain, 
  CheckCircle,
  AlertCircle,
  Loader2,
  User,
  Calendar
} from 'lucide-react';

interface DocumentUploadProps {
  onDocumentProcessed?: (result: any) => void;
}

export const EnhancedDocumentUpload = ({ onDocumentProcessed }: DocumentUploadProps) => {
  const [uploadStep, setUploadStep] = useState<'upload' | 'processing' | 'completed'>('upload');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [documentType, setDocumentType] = useState<'exam' | 'prescription' | 'medical_record' | 'report'>('exam');
  const [patientInfo, setPatientInfo] = useState({
    name: '',
    age: '',
    gender: ''
  });
  const [analysisResult, setAnalysisResult] = useState(null);
  const { toast } = useToast();

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    toast({
      title: "Arquivo selecionado",
      description: `${file.name} está pronto para processamento`,
    });
  };

  const simulateOCR = async (file: File): Promise<string> => {
    // Simular extração OCR baseada no tipo de documento
    const sampleTexts = {
      exam: `LABORATÓRIO CLÍNICO - HEMOGRAMA COMPLETO
      
Paciente: ${patientInfo.name || 'João Silva'}
Data: 15/01/2024
Idade: ${patientInfo.age || '45'} anos

ERITROGRAMA:
Hemácias: 4.8 milhões/mm³ (VR: 4.5-6.0)
Hemoglobina: 14.2 g/dL (VR: 13.5-17.5)
Hematócrito: 42% (VR: 41-53)
Glicose: 180 mg/dL (VR: 70-99)
Colesterol Total: 240 mg/dL (VR: <200)

LEUCOGRAMA:
Leucócitos: 7.200/mm³ (VR: 4.000-11.000)
Neutrófilos: 65% (VR: 50-70)
Linfócitos: 30% (VR: 20-40)

PLAQUETAS: 280.000/mm³ (VR: 150.000-450.000)`,

      prescription: `RECEITA MÉDICA

Dr. Carlos Santos - CRM 12345
Clínica Médica

Paciente: ${patientInfo.name || 'Maria Silva'}
Data: 15/01/2024

MEDICAMENTOS:
1. Metformina 850mg - 1 comprimido 2x ao dia
2. Losartana 50mg - 1 comprimido pela manhã
3. Sinvastatina 20mg - 1 comprimido à noite

Diagnóstico: Diabetes Mellitus tipo 2, Hipertensão
Retorno em 30 dias`,

      medical_record: `PRONTUÁRIO MÉDICO

Data: 15/01/2024
Paciente: ${patientInfo.name || 'Ana Costa'}
Idade: ${patientInfo.age || '35'} anos

QUEIXA PRINCIPAL: Dor abdominal há 3 dias

HISTÓRIA DA DOENÇA ATUAL:
Paciente relata dor em região epigástrica, tipo queimação,
que piora após alimentação. Nega febre, vômitos.

EXAME FÍSICO:
Estado geral: Bom
Abdome: Dor à palpação em epigástrio
Sinais vitais: PA 120/80, FC 72

HIPÓTESE DIAGNÓSTICA: Gastrite
CONDUTA: Prescrição de inibidor de bomba de prótons`,

      report: `LAUDO RADIOLÓGICO

Exame: Radiografia de Tórax PA e Perfil
Data: 15/01/2024
Paciente: ${patientInfo.name || 'Pedro Oliveira'}

TÉCNICA: Radiografias simples do tórax

ACHADOS:
- Pulmões com transparência conservada
- Seios costofrênicos livres
- Área cardíaca dentro da normalidade
- Estruturas ósseas sem alterações

CONCLUSÃO:
Exame radiológico do tórax dentro dos limites da normalidade.`
    };

    return sampleTexts[documentType];
  };

  const processDocument = async () => {
    if (!selectedFile) {
      toast({
        title: "Erro",
        description: "Selecione um arquivo primeiro",
        variant: "destructive"
      });
      return;
    }

    setUploadStep('processing');
    setUploadProgress(10);

    try {
      // Simular OCR
      setUploadProgress(30);
      const extractedText = await simulateOCR(selectedFile);

      // Processar com IA
      setUploadProgress(60);
      
      const { data, error } = await supabase.functions.invoke('medical-document-analyzer', {
        body: {
          ocrText: extractedText,
          documentType,
          patientInfo: {
            name: patientInfo.name,
            age: parseInt(patientInfo.age) || undefined,
            gender: patientInfo.gender
          }
        }
      });

      if (error) {
        console.error('Analysis error:', error);
        throw error;
      }

      setUploadProgress(100);
      setAnalysisResult(data);
      setUploadStep('completed');

      if (onDocumentProcessed) {
        onDocumentProcessed(data);
      }

      toast({
        title: "Processamento concluído",
        description: "Documento analisado com sucesso pela IA",
      });

    } catch (error) {
      console.error('Error processing document:', error);
      toast({
        title: "Erro no processamento",
        description: "Erro ao processar documento. Verifique sua conexão.",
        variant: "destructive"
      });
      setUploadStep('upload');
      setUploadProgress(0);
    }
  };

  const resetUpload = () => {
    setUploadStep('upload');
    setUploadProgress(0);
    setSelectedFile(null);
    setAnalysisResult(null);
  };

  if (uploadStep === 'completed' && analysisResult) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-success" />
              Análise Concluída
            </CardTitle>
            <CardDescription>
              Documento processado com sucesso
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {analysisResult.documentType}
                  </div>
                  <div className="text-sm text-muted-foreground">Tipo de Documento</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-success">
                    {analysisResult.extractedData?.results?.length || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">Parâmetros Extraídos</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-warning">
                    {analysisResult.medicalInsights?.length || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">Insights Médicos</div>
                </div>
              </div>

              {analysisResult.extractedData?.results && (
                <div>
                  <h4 className="font-medium mb-3">Resultados Extraídos:</h4>
                  <div className="space-y-2">
                    {analysisResult.extractedData.results.slice(0, 3).map((result: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-card rounded border">
                        <div>
                          <div className="font-medium">{result.parameter}</div>
                          <div className="text-sm text-muted-foreground">
                            Ref: {result.referenceRange}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">{result.value} {result.unit}</div>
                          <Badge variant={result.status === 'normal' ? 'default' : 'destructive'}>
                            {result.status === 'normal' ? 'Normal' : 'Alterado'}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-4">
                <Button onClick={resetUpload} variant="outline">
                  Processar Novo Documento
                </Button>
                <Button>
                  Ver Análise Completa
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (uploadStep === 'processing') {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin" />
            Processando Documento
          </CardTitle>
          <CardDescription>
            Extraindo e analisando conteúdo médico...
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Progress value={uploadProgress} className="h-2" />
            <div className="text-center text-sm text-muted-foreground">
              {uploadProgress < 30 && "Extraindo texto (OCR)..."}
              {uploadProgress >= 30 && uploadProgress < 60 && "Classificando documento..."}
              {uploadProgress >= 60 && uploadProgress < 100 && "Analisando com IA médica..."}
              {uploadProgress === 100 && "Finalizando análise..."}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Informações do Paciente */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Informações do Paciente
          </CardTitle>
          <CardDescription>
            Dados para contextualizar a análise médica
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="patient-name">Nome do Paciente</Label>
              <Input
                id="patient-name"
                value={patientInfo.name}
                onChange={(e) => setPatientInfo(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Nome completo"
              />
            </div>
            <div>
              <Label htmlFor="patient-age">Idade</Label>
              <Input
                id="patient-age"
                type="number"
                value={patientInfo.age}
                onChange={(e) => setPatientInfo(prev => ({ ...prev, age: e.target.value }))}
                placeholder="Idade"
              />
            </div>
            <div>
              <Label htmlFor="patient-gender">Sexo</Label>
              <Select value={patientInfo.gender} onValueChange={(value) => setPatientInfo(prev => ({ ...prev, gender: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="M">Masculino</SelectItem>
                  <SelectItem value="F">Feminino</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tipo de Documento */}
      <Card>
        <CardHeader>
          <CardTitle>Tipo de Documento</CardTitle>
          <CardDescription>
            Selecione o tipo para otimizar a análise
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={documentType} onValueChange={(value: any) => setDocumentType(value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="exam">Exame Laboratorial</SelectItem>
              <SelectItem value="prescription">Receita Médica</SelectItem>
              <SelectItem value="medical_record">Prontuário Médico</SelectItem>
              <SelectItem value="report">Laudo/Relatório</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Upload */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload de Documento
          </CardTitle>
          <CardDescription>
            Faça upload de arquivos PDF, imagens ou use a câmera
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div 
              className="border-2 border-dashed border-muted rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
              onClick={() => document.getElementById('file-input')?.click()}
            >
              <input
                id="file-input"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                className="hidden"
              />
              <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-lg font-medium mb-2">
                {selectedFile ? selectedFile.name : 'Clique para selecionar arquivo'}
              </p>
              <p className="text-sm text-muted-foreground">
                PDF, JPG, PNG até 10MB
              </p>
            </div>

            {selectedFile && (
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium">{selectedFile.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </div>
                  </div>
                </div>
                <Badge variant="secondary">Pronto</Badge>
              </div>
            )}

            <div className="flex gap-4">
              <Button 
                onClick={processDocument} 
                disabled={!selectedFile}
                className="flex-1"
              >
                <Brain className="h-4 w-4 mr-2" />
                Processar com IA
              </Button>
              <Button variant="outline">
                <Camera className="h-4 w-4 mr-2" />
                Câmera
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};