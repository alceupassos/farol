
import { useState } from 'react';
import { Plus, FileText, Download, Share2, Printer, Search, Filter } from 'lucide-react';
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AppButton from '@/components/ui/AppButton';
import { MedicalRecord } from '../types';

interface MedicalRecordsProps {
  records: MedicalRecord[];
}

const MedicalRecords = ({ records }: MedicalRecordsProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [recordType, setRecordType] = useState("all");
  
  const filteredRecords = records.filter(record => {
    const matchesSearch = 
      record.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.notes.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (recordType === "all") return matchesSearch;
    return matchesSearch && record.type.toLowerCase() === recordType.toLowerCase();
  });

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex flex-wrap justify-between items-center gap-2">
          <CardTitle className="text-xl">Prontuários Médicos</CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar prontuário..." 
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select defaultValue="all" onValueChange={setRecordType}>
              <SelectTrigger className="w-[150px] gap-2">
                <Filter className="h-4 w-4" />
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="consulta">Consulta</SelectItem>
                <SelectItem value="exame">Exame</SelectItem>
                <SelectItem value="internação">Internação</SelectItem>
                <SelectItem value="procedimento">Procedimento</SelectItem>
              </SelectContent>
            </Select>
            <AppButton size="sm" icon={<Plus size={16} />} iconPosition="left">
              Novo Prontuário
            </AppButton>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Médico</TableHead>
              <TableHead className="hidden md:table-cell">Especialidade</TableHead>
              <TableHead className="hidden lg:table-cell">Instituição</TableHead>
              <TableHead>Observações</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRecords.length > 0 ? (
              filteredRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">{record.date}</TableCell>
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
                  <TableCell>{record.doctor}</TableCell>
                  <TableCell className="hidden md:table-cell">{record.specialty || "Geral"}</TableCell>
                  <TableCell className="hidden lg:table-cell">{record.institution || "Não informado"}</TableCell>
                  <TableCell className="max-w-[250px] truncate">{record.notes}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" title="Visualizar">
                        <FileText className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Baixar">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Compartilhar">
                        <Share2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Imprimir">
                        <Printer className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  <div className="flex flex-col items-center justify-center">
                    <p className="text-muted-foreground mb-4">Nenhum prontuário encontrado</p>
                    <AppButton size="sm" icon={<Plus size={16} />} iconPosition="left">
                      Adicionar Prontuário
                    </AppButton>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default MedicalRecords;
