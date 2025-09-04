
import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Search, Filter, Calendar, Upload, Download, Share2, Printer, PlusCircle, CheckCircle } from 'lucide-react';

const medicalRecords = [
  {
    id: "1",
    date: "15/05/2023",
    type: "Consulta",
    doctor: "Dra. Ana Silva",
    specialty: "Cardiologia",
    institution: "Hospital São Lucas",
    diagnosis: "Hipertensão Arterial",
    notes: "Paciente apresentou pressão arterial elevada. Recomendado monitoramento diário e ajuste na medicação."
  },
  {
    id: "2",
    date: "03/04/2023",
    type: "Exame",
    doctor: "Dr. Carlos Mendes",
    specialty: "Cardiologia",
    institution: "Laboratório Central",
    diagnosis: "Exames de Rotina",
    notes: "Ecocardiograma realizado. Resultados dentro dos padrões de normalidade."
  },
  {
    id: "3",
    date: "22/03/2023",
    type: "Internação",
    doctor: "Dr. Roberto Almeida",
    specialty: "Pneumologia",
    institution: "Hospital Santa Casa",
    diagnosis: "Pneumonia",
    notes: "Paciente internado por 5 dias. Tratamento com antibióticos. Alta com recomendação de repouso por mais 7 dias."
  },
  {
    id: "4",
    date: "15/02/2023",
    type: "Procedimento",
    doctor: "Dra. Márcia Oliveira",
    specialty: "Dermatologia",
    institution: "Clínica Dermatológica Saúde",
    diagnosis: "Remoção de Lesão",
    notes: "Remoção de lesão cutânea no antebraço direito. Biópsia enviada para análise."
  },
  {
    id: "5",
    date: "10/01/2023",
    type: "Consulta",
    doctor: "Dr. Paulo Ribeiro",
    specialty: "Ortopedia",
    institution: "Centro Médico Vida",
    diagnosis: "Artrose Leve",
    notes: "Paciente com dores no joelho direito. Recomendado fisioterapia 2x por semana e uso de anti-inflamatório quando necessário."
  }
];

const RecordsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("todos");
  
  const filteredRecords = medicalRecords.filter(record => {
    const matchesSearch = 
      record.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.notes.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.institution.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === "todos") return matchesSearch;
    return matchesSearch && record.type.toLowerCase() === activeTab.toLowerCase();
  });

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Prontuários</h1>
            <p className="text-muted-foreground">
              Gerencie e visualize seu histórico médico completo
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <Button className="gap-2">
              <PlusCircle size={16} />
              Adicionar Prontuário
            </Button>
            <Button variant="outline" className="gap-2">
              <Upload size={16} />
              Importar
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="md:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle>Estatísticas de Saúde</CardTitle>
              <CardDescription>Visão geral dos seus registros médicos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-card rounded-lg p-3 border border-border">
                  <div className="text-sm font-medium text-muted-foreground">Total de Registros</div>
                  <div className="text-2xl font-semibold mt-1">28</div>
                </div>
                <div className="bg-card rounded-lg p-3 border border-border">
                  <div className="text-sm font-medium text-muted-foreground">Consultas</div>
                  <div className="text-2xl font-semibold mt-1">12</div>
                </div>
                <div className="bg-card rounded-lg p-3 border border-border">
                  <div className="text-sm font-medium text-muted-foreground">Exames</div>
                  <div className="text-2xl font-semibold mt-1">9</div>
                </div>
                <div className="bg-card rounded-lg p-3 border border-border">
                  <div className="text-sm font-medium text-muted-foreground">Internações</div>
                  <div className="text-2xl font-semibold mt-1">2</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Verificação Blockchain</CardTitle>
              <CardDescription>Status de segurança dos registros</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center space-y-2">
              <div className="rounded-full bg-green-100 p-3 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                <CheckCircle size={28} />
              </div>
              <p className="text-center font-medium">Todos os registros verificados</p>
              <p className="text-center text-sm text-muted-foreground">
                Última verificação: hoje às 10:45
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Histórico de Prontuários</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar por médico, diagnóstico ou instituição..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2">
                <Select defaultValue="todos">
                  <SelectTrigger className="w-[180px] gap-2">
                    <Filter className="h-4 w-4" />
                    <SelectValue placeholder="Filtrar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="especialidade">Especialidade</SelectItem>
                    <SelectItem value="instituicao">Instituição</SelectItem>
                    <SelectItem value="medico">Médico</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select defaultValue="recentes">
                  <SelectTrigger className="w-[180px] gap-2">
                    <Calendar className="h-4 w-4" />
                    <SelectValue placeholder="Período" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recentes">Mais recentes</SelectItem>
                    <SelectItem value="antigos">Mais antigos</SelectItem>
                    <SelectItem value="ano">Último ano</SelectItem>
                    <SelectItem value="personalizado">Personalizado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Tabs defaultValue="todos" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="w-full max-w-md grid grid-cols-4 mb-4">
                <TabsTrigger value="todos">Todos</TabsTrigger>
                <TabsTrigger value="consulta">Consultas</TabsTrigger>
                <TabsTrigger value="exame">Exames</TabsTrigger>
                <TabsTrigger value="internação">Internações</TabsTrigger>
              </TabsList>
              
              <TabsContent value="todos" className="space-y-4">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Data</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead className="hidden md:table-cell">Médico</TableHead>
                        <TableHead className="hidden lg:table-cell">Instituição</TableHead>
                        <TableHead>Diagnóstico</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredRecords.map((record) => (
                        <TableRow key={record.id}>
                          <TableCell>{record.date}</TableCell>
                          <TableCell>
                            <Badge variant={
                              record.type === "Consulta" ? "default" :
                              record.type === "Exame" ? "outline" : 
                              record.type === "Internação" ? "destructive" :
                              "secondary"
                            }>
                              {record.type}
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {record.doctor}
                            <span className="text-xs text-muted-foreground block">
                              {record.specialty}
                            </span>
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">{record.institution}</TableCell>
                          <TableCell>{record.diagnosis}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon">
                                <FileText className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Share2 className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Printer className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                      {filteredRecords.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-8">
                            <div className="flex flex-col items-center">
                              <p className="text-muted-foreground mb-2">Nenhum registro encontrado</p>
                              <Button variant="outline" className="gap-2">
                                <PlusCircle size={16} />
                                Adicionar Prontuário
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              
              <TabsContent value="consulta" className="space-y-4">
                {/* Mesma estrutura da tab "todos" filtrada para consultas */}
              </TabsContent>
              
              <TabsContent value="exame" className="space-y-4">
                {/* Mesma estrutura da tab "todos" filtrada para exames */}
              </TabsContent>
              
              <TabsContent value="internação" className="space-y-4">
                {/* Mesma estrutura da tab "todos" filtrada para internações */}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default RecordsPage;
