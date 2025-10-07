
import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from 'lucide-react';

interface AddMetricFormProps {
  onAddMetric: (data: any) => void;
}

const AddMetricForm = ({ onAddMetric }: AddMetricFormProps) => {
  const [selectedMetricType, setSelectedMetricType] = useState<string | null>(null);

  const addForm = useForm({
    defaultValues: {
      metricType: null,
      value: null,
      date: null,
      notes: null,
      systolic: null,
      diastolic: null,
    },
  });

  useEffect(() => {
    const subscription = addForm.watch((value) => {
      setSelectedMetricType(value.metricType);
    });
    
    return () => subscription.unsubscribe();
  }, [addForm]);

  const getMetricUnit = (metricType) => {
    switch (metricType) {
      case 'bloodPressure':
        return 'mmHg';
      case 'bloodGlucose':
        return 'mg/dL';
      case 'heartRate':
        return 'bpm';
      case 'cholesterol':
        return 'mg/dL';
      case 'oxygenSaturation':
        return '%';
      default:
        return '';
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-1">
          <Plus size={16} />
          Nova Medição
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar Nova Medição</DialogTitle>
          <DialogDescription>
            Registre um novo valor para uma de suas métricas de saúde
          </DialogDescription>
        </DialogHeader>
        
        <Form {...addForm}>
          <form onSubmit={addForm.handleSubmit(onAddMetric)} className="space-y-4">
            <FormField
              control={addForm.control}
              name="metricType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Métrica</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a métrica" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="weight">Peso</SelectItem>
                      <SelectItem value="bloodPressure">Pressão Arterial</SelectItem>
                      <SelectItem value="bloodGlucose">Glicemia</SelectItem>
                      <SelectItem value="heartRate">Frequência Cardíaca</SelectItem>
                      <SelectItem value="cholesterol">Colesterol</SelectItem>
                      <SelectItem value="oxygenSaturation">Saturação de Oxigênio</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            
            {selectedMetricType === 'bloodPressure' ? (
              <>
                <FormField
                  control={addForm.control}
                  name="systolic"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sistólica (mmHg)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="120" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={addForm.control}
                  name="diastolic"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Diastólica (mmHg)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="80" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </>
            ) : (
              <FormField
                control={addForm.control}
                name="value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor {getMetricUnit(selectedMetricType)}</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.1" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            )}
            
            <FormField
              control={addForm.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data da Medição</FormLabel>
                  <FormControl>
                    <Input type="datetime-local" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={addForm.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Observações</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Após exercício, em jejum, etc." />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogClose>
              <Button type="submit">Salvar</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddMetricForm;
