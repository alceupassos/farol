import { useState } from 'react';
import { UploadCloud, FileText, Search, Filter, AlertTriangle, Info, Camera } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import LabExamOCR from '@/components/labexams/LabExamOCR';
import ExamResults from '@/components/labexams/ExamResults';
import RecentExams from '@/components/labexams/RecentExams';
import ExamInsights from '@/components/labexams/ExamInsights';
import BloodExamGuide from '@/components/labexams/BloodExamGuide';
import { LabExam } from '@/components/labexams/types';
import { sampleLabExams } from '@/data/labExamsData';
import { additionalLabExams } from '@/data/additionalLabExamsData';

const LabExamsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("exames");
  const [currentExam, setCurrentExam] = useState<LabExam | null>(null);
  const [showOCRUpload, setShowOCRUpload] = useState(false);
  const [exams, setExams] = useState<LabExam[]>([...sampleLabExams, ...additionalLabExams].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
  const [showGuide, setShowGuide] = useState(true);

  const filteredExams = exams.filter(exam => 
    exam.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (exam.provider && exam.provider.toLowerCase().includes(searchTerm.toLowerCase())) ||
    exam.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleOCRComplete = (exam: LabExam) => {
    setExams(prev => [exam, ...prev].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    setCurrentExam(exam);
    setShowOCRUpload(false);
    setActiveTab("resultados");
  };

  const handleExamSelect = (exam: LabExam) => {
    setCurrentExam(exam);
    setActiveTab("resultados");
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Exames Laboratoriais</h1>
            <p className="text-muted-foreground">
              Gerencie e visualize seus exames laboratoriais com interpretação automática
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <Button 
              variant={showGuide ? "default" : "outline"}
              className="gap-2" 
              onClick={() => setShowGuide(!showGuide)}
            >
              <Info size={16} />
              Guia de Exames
            </Button>
            <Button 
              className="gap-2" 
              onClick={() => setShowOCRUpload(true)}
            >
              <Camera size={16} />
              Digitalizar Exame
            </Button>
            <Button variant="outline" className="gap-2">
              <UploadCloud size={16} />
              Importar PDF
            </Button>
          </div>
        </div>

        {showGuide && (
          <Card>
            <CardHeader>
              <CardTitle>Guia Educativo de Exames Sanguíneos</CardTitle>
              <CardDescription>
                Entenda os principais parâmetros de um hemograma completo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BloodExamGuide />
            </CardContent>
          </Card>
        )}
        
        {showOCRUpload ? (
          <Card>
            <CardHeader>
              <CardTitle>Digitalizar Exame</CardTitle>
              <CardDescription>
                Tire uma foto ou faça o upload de um exame para processamento OCR
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LabExamOCR onComplete={handleOCRComplete} onCancel={() => setShowOCRUpload(false)} />
            </CardContent>
          </Card>
        ) : (
          <>
            {currentExam && activeTab === "resultados" ? (
              <ExamResults 
                exam={currentExam} 
                onBack={() => {
                  setCurrentExam(null); // Clear current exam when going back to list
                  setActiveTab("exames");
                }} 
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2">
                  <CardHeader className="pb-3">
                    <CardTitle>Histórico de Exames</CardTitle>
                    <CardDescription>Visualize todos os seus exames laboratoriais ({filteredExams.length} encontrados)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4 flex flex-col sm:flex-row gap-3">
                      <div className="relative flex-1">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="search"
                          placeholder="Buscar por nome, laboratório ou categoria..."
                          className="pl-8"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                      
                      <div className="flex gap-2">
                        <Select defaultValue="todos">
                          <SelectTrigger className="w-full sm:w-[180px] gap-2">
                            <Filter className="h-4 w-4" />
                            <SelectValue placeholder="Categoria" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="todos">Todos os exames</SelectItem>
                            <SelectItem value="hemograma">Hemograma</SelectItem>
                            <SelectItem value="bioquimica">Bioquímica</SelectItem>
                            <SelectItem value="urinalise">Urinálise</SelectItem>
                            <SelectItem value="hormonios">Hormônios</SelectItem>
                            <SelectItem value="vitaminas">Vitaminas</SelectItem>
                            <SelectItem value="marcadores_inflamatorios">Marcadores Inflamatórios</SelectItem>
                            <SelectItem value="diabetes">Diabetes</SelectItem>
                            <SelectItem value="metabolismo_ferro">Metabolismo do Ferro</SelectItem>
                            <SelectItem value="metabolismo">Metabolismo</SelectItem>
                            <SelectItem value="marcadores_tumorais">Marcadores Tumorais</SelectItem>
                            <SelectItem value="gases_sanguineos">Gases Sanguíneos</SelectItem>
                            <SelectItem value="coagulacao">Coagulação</SelectItem>
                            <SelectItem value="cardiologia">Cardiologia</SelectItem>
                          </SelectContent>
                        </Select>
                        
                        <Select defaultValue="recentes">
                          <SelectTrigger className="w-full sm:w-[180px]">
                            <SelectValue placeholder="Ordenar por" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="recentes">Mais recentes</SelectItem>
                            <SelectItem value="antigos">Mais antigos</SelectItem>
                            <SelectItem value="nome_asc">Nome (A-Z)</SelectItem>
                            <SelectItem value="nome_desc">Nome (Z-A)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Tabs defaultValue="exames" value={activeTab} onValueChange={setActiveTab}>
                      <TabsList className="w-full grid grid-cols-2 sm:grid-cols-3 mb-4">
                        <TabsTrigger value="exames">Exames</TabsTrigger>
                        <TabsTrigger value="tendencias">Tendências</TabsTrigger>
                        <TabsTrigger value="alertas">Alertas</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="exames" className="space-y-4">
                        <RecentExams 
                          exams={filteredExams} 
                          onExamSelect={handleExamSelect} 
                        />
                         {filteredExams.length === 0 && (
                          <div className="text-center py-10">
                            <FileText size={48} className="mx-auto text-muted-foreground mb-4" />
                            <p className="text-muted-foreground">Nenhum exame encontrado para os critérios de busca.</p>
                          </div>
                        )}
                      </TabsContent>
                      
                      <TabsContent value="tendencias" className="space-y-4">
                        <Card>
                          <CardContent className="pt-6">
                            <div className="flex flex-col items-center justify-center py-10 text-center">
                              <Info className="h-10 w-10 text-muted-foreground mb-4" />
                              <h3 className="text-lg font-medium mb-2">Análise de Tendências</h3>
                              <p className="text-muted-foreground max-w-md mb-6">
                                Visualize como seus resultados de exames estão evoluindo ao longo do tempo 
                                para monitorar sua saúde.
                              </p>
                              <Button variant="outline">Explorar Tendências</Button>
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>
                      
                      <TabsContent value="alertas" className="space-y-4">
                        <Card>
                          <CardContent className="pt-6">
                            <div className="flex flex-col items-center justify-center py-10 text-center">
                              <AlertTriangle className="h-10 w-10 text-amber-500 mb-4" />
                              <h3 className="text-lg font-medium mb-2">Alertas de Exames</h3>
                              <p className="text-muted-foreground max-w-md mb-2">
                                Você tem {exams.filter(e => e.status === 'critical' || e.status === 'warning').length} resultados de exames com valores fora da referência.
                              </p>
                              <Button>Ver Alertas</Button>
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle>Insights</CardTitle>
                    <CardDescription>Análise dos seus exames recentes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ExamInsights />
                  </CardContent>
                </Card>
              </div>
            )}
            
            <div className="text-xs text-muted-foreground text-center italic mt-2">
              * Dados fictícios não reais usados para exemplo de software
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default LabExamsPage;
