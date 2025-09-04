
import { useState } from 'react';
import { CalendarIcon, Plus, Upload, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import AppButton from "@/components/ui/AppButton";

interface AddRecordFormProps {
  onAddRecord: (record: any) => void;
}

const AddRecordForm = ({ onAddRecord }: AddRecordFormProps) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date>();
  const [files, setFiles] = useState<File[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const recordData = {
      id: Date.now().toString(),
      date: date ? format(date, 'dd/MM/yyyy') : format(new Date(), 'dd/MM/yyyy'),
      type: formData.get('type') as string,
      doctor: formData.get('doctor') as string,
      specialty: formData.get('specialty') as string,
      institution: formData.get('institution') as string,
      diagnosis: formData.get('diagnosis') as string,
      notes: formData.get('notes') as string,
      blockchainVerified: false,
      attachments: files.map(file => ({
        id: Date.now() + file.name,
        name: file.name,
        type: file.type.split('/')[1].toUpperCase(),
        url: URL.createObjectURL(file)
      })),
      lastModified: format(new Date(), 'dd/MM/yyyy'),
    };
    
    onAddRecord(recordData);
    setOpen(false);
    setDate(undefined);
    setFiles([]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles(prev => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <AppButton icon={<Plus size={16} />} iconPosition="left" size="sm">
          Novo Prontuário
        </AppButton>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Prontuário</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Tipo de Prontuário</Label>
              <Select name="type" required>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Consulta">Consulta</SelectItem>
                  <SelectItem value="Exame">Exame</SelectItem>
                  <SelectItem value="Internação">Internação</SelectItem>
                  <SelectItem value="Procedimento">Procedimento</SelectItem>
                  <SelectItem value="Outro">Outro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Data</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, 'dd/MM/yyyy') : "Selecionar data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="doctor">Médico</Label>
              <Input id="doctor" name="doctor" placeholder="Nome do médico" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialty">Especialidade</Label>
              <Input id="specialty" name="specialty" placeholder="Especialidade médica" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="institution">Instituição</Label>
              <Input id="institution" name="institution" placeholder="Hospital ou clínica" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="diagnosis">Diagnóstico</Label>
              <Input id="diagnosis" name="diagnosis" placeholder="Diagnóstico principal" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Observações</Label>
            <Textarea 
              id="notes" 
              name="notes" 
              placeholder="Detalhes sobre o atendimento, tratamentos recomendados, etc."
              rows={4}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Anexos</Label>
            <div className="border border-dashed rounded-md p-6 flex flex-col items-center justify-center">
              <Input
                type="file"
                id="file-upload"
                className="hidden"
                multiple
                onChange={handleFileChange}
              />
              <Label 
                htmlFor="file-upload" 
                className="flex flex-col items-center cursor-pointer"
              >
                <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                <span className="text-sm font-medium">Clique para carregar arquivos</span>
                <span className="text-xs text-muted-foreground mt-1">
                  ou arraste e solte aqui
                </span>
              </Label>
            </div>
            
            {files.length > 0 && (
              <div className="mt-4 space-y-2">
                <Label>Arquivos selecionados</Label>
                <div className="space-y-2">
                  {files.map((file, index) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between p-2 bg-muted rounded-md"
                    >
                      <div className="flex items-center">
                        <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                        <span className="text-xs text-muted-foreground ml-2">
                          ({(file.size / 1024).toFixed(0)} KB)
                        </span>
                      </div>
                      <Button 
                        type="button"
                        variant="ghost" 
                        size="sm" 
                        onClick={() => removeFile(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit">Salvar Prontuário</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddRecordForm;
