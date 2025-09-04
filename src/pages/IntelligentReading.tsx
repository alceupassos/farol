import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DocumentUpload } from '@/components/intelligent-reading/DocumentUpload';
import { EnhancedDocumentUpload } from '@/components/intelligent-reading/EnhancedDocumentUpload';
import { DocumentProcessor } from '@/components/intelligent-reading/DocumentProcessor';
import { ResidentialDashboard } from '@/components/intelligent-reading/ResidentialDashboard';
import { HealthAgentInterface } from '@/components/intelligent-reading/HealthAgentInterface';
import { ScanLine, Brain, Users, Stethoscope } from 'lucide-react';

const IntelligentReading = () => {
  const [activeTab, setActiveTab] = useState('upload');

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gradient-medical mb-4">
            Sistema de Leitura Inteligente
          </h1>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            OCR avançado com IA para documentos médicos, agrupamento residencial 
            e interpretação inteligente de exames, receitas e prontuários
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <ScanLine className="h-4 w-4" />
              Upload & OCR
            </TabsTrigger>
            <TabsTrigger value="enhanced-upload" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              Upload IA Avançado
            </TabsTrigger>
            <TabsTrigger value="processing" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              Processamento IA
            </TabsTrigger>
            <TabsTrigger value="residential" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Dashboard Residencial
            </TabsTrigger>
            <TabsTrigger value="agent" className="flex items-center gap-2">
              <Stethoscope className="h-4 w-4" />
              Interface Agente
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ScanLine className="h-5 w-5 text-primary" />
                  Upload e Processamento OCR Básico
                </CardTitle>
                <CardDescription>
                  Faça upload ou capture documentos médicos para processamento básico
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DocumentUpload />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="enhanced-upload" className="animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  Upload com IA Avançada
                </CardTitle>
                <CardDescription>
                  Análise médica inteligente com GPT-5 e processamento contextual
                </CardDescription>
              </CardHeader>
              <CardContent>
                <EnhancedDocumentUpload />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="processing" className="animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  Processamento e Interpretação IA
                </CardTitle>
                <CardDescription>
                  Visualize o processamento em tempo real e os resultados da interpretação
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DocumentProcessor />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="residential" className="animate-fade-in">
            <ResidentialDashboard />
          </TabsContent>

          <TabsContent value="agent" className="animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Stethoscope className="h-5 w-5 text-primary" />
                  Interface do Agente de Saúde
                </CardTitle>
                <CardDescription>
                  Ferramentas móveis para coleta e análise em campo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <HealthAgentInterface />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default IntelligentReading;