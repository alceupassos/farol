
import { useState } from 'react';
import { X, Download, Share2, Printer, FileText, Clock, User, CheckCircle, AlertTriangle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MedicalRecord } from '../profile/types';

interface RecordDetailProps {
  record: MedicalRecord | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const RecordDetail = ({ record, open, onOpenChange }: RecordDetailProps) => {
  const [activeTab, setActiveTab] = useState("details");

  if (!record) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-xl">Prontuário Médico</DialogTitle>
              <DialogDescription>
                {record.date} - {record.type}
              </DialogDescription>
            </div>
            {record.blockchainVerified ? (
              <Badge variant="outline" className="flex items-center gap-1 bg-green-500/10 text-green-500 border-green-500/20">
                <CheckCircle className="h-3 w-3" />
                Verificado
              </Badge>
            ) : (
              <Badge variant="outline" className="flex items-center gap-1 bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
                <AlertTriangle className="h-3 w-3" />
                Pendente
              </Badge>
            )}
          </div>
        </DialogHeader>

        <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="details">Detalhes</TabsTrigger>
            <TabsTrigger value="attachments">Anexos</TabsTrigger>
            <TabsTrigger value="history">Histórico de Acesso</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground">Médico</div>
                <div>{record.doctor}</div>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground">Especialidade</div>
                <div>{record.specialty || "Não especificada"}</div>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground">Instituição</div>
                <div>{record.institution || "Não especificada"}</div>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground">Diagnóstico</div>
                <div>{record.diagnosis || "Não especificado"}</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium text-muted-foreground">Observações</div>
              <div className="p-3 rounded-md bg-muted/50 whitespace-pre-wrap">
                {record.notes}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="attachments">
            {record.attachments && record.attachments.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {record.attachments.map((attachment) => (
                  <div key={attachment.id} className="border rounded-md p-4 flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-primary" />
                        <span className="font-medium truncate">{attachment.name}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">{attachment.type}</Badge>
                    </div>
                    <div className="mt-auto pt-2 flex justify-end gap-2">
                      <Button size="sm" variant="ghost">
                        <Download className="h-3.5 w-3.5" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Share2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-muted-foreground">
                Nenhum anexo disponível para este prontuário
              </div>
            )}
          </TabsContent>

          <TabsContent value="history">
            {record.accessHistory && record.accessHistory.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Usuário</TableHead>
                    <TableHead>Ação</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {record.accessHistory.map((access, index) => (
                    <TableRow key={index}>
                      <TableCell>{access.date}</TableCell>
                      <TableCell>{access.user}</TableCell>
                      <TableCell>{access.action}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="py-8 text-center text-muted-foreground">
                Nenhum histórico de acesso registrado
              </div>
            )}
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex flex-wrap items-center justify-between gap-2">
          <div className="text-sm text-muted-foreground flex items-center">
            <Clock className="h-3.5 w-3.5 mr-1" />
            Última modificação: {record.lastModified || record.date}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <Download className="h-4 w-4" />
              Baixar
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Share2 className="h-4 w-4" />
              Compartilhar
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Printer className="h-4 w-4" />
              Imprimir
            </Button>
            <DialogClose asChild>
              <Button variant="default" size="sm">Fechar</Button>
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RecordDetail;
