
import { useState } from 'react';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Medication } from '@/components/profile/types';
import { Check, Plus, Edit, Trash, FileText, Download } from 'lucide-react';
import AppButton from '@/components/ui/AppButton';

interface MedicationListProps {
  medications: Medication[];
}

const MedicationList = ({ medications }: MedicationListProps) => {
  const [viewMode, setViewMode] = useState<'active' | 'all' | 'finished'>('active');
  
  const filteredMedications = medications.filter(med => {
    if (viewMode === 'active') return med.status === 'Ativo' || med.status === 'Conforme necessário';
    if (viewMode === 'finished') return med.status === 'Finalizado' || med.status === 'Suspenso';
    return true; // 'all' view
  });

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Ativo': return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case 'Finalizado': return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
      case 'Conforme necessário': return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case 'Suspenso': return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  return (
    <Card className="glass-card">
      <CardHeader className="pb-3">
        <div className="flex flex-wrap justify-between items-center gap-2">
          <CardTitle className="text-xl">Seus Medicamentos</CardTitle>
          <AppButton 
            size="sm" 
            icon={<Plus size={16} />} 
            iconPosition="left"
          >
            Adicionar Medicamento
          </AppButton>
        </div>
        
        <div className="flex mt-4 space-x-2">
          <Button
            variant={viewMode === 'active' ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode('active')}
          >
            Ativos
          </Button>
          <Button
            variant={viewMode === 'all' ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode('all')}
          >
            Todos
          </Button>
          <Button
            variant={viewMode === 'finished' ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode('finished')}
          >
            Finalizados
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {filteredMedications.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Dosagem</TableHead>
                <TableHead>Frequência</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Próxima Dose</TableHead>
                <TableHead>Estoque</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMedications.map((medication) => (
                <TableRow key={medication.id}>
                  <TableCell className="font-medium">{medication.name}</TableCell>
                  <TableCell>{medication.dose}</TableCell>
                  <TableCell>{medication.frequency}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusColor(medication.status)}>
                      {medication.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{medication.nextDose || 'N/A'}</TableCell>
                  <TableCell>
                    {medication.stock !== undefined && medication.totalDoses !== undefined ? (
                      <div className="flex items-center">
                        <span className="mr-2">{medication.stock}/{medication.totalDoses}</span>
                        <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                          <div className="bg-medical h-1.5 rounded-full" style={{ 
                            width: `${Math.min(100, (medication.stock / medication.totalDoses) * 100)}%` 
                          }}></div>
                        </div>
                      </div>
                    ) : (
                      'N/A'
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" title="Marcar como tomado">
                        <Check size={16} />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8" title="Editar">
                        <Edit size={16} />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8" title="Ver bula">
                        <FileText size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">
              Não há medicamentos {viewMode === 'active' ? 'ativos' : viewMode === 'finished' ? 'finalizados' : ''} para exibir.
            </p>
            <AppButton 
              icon={<Plus size={16} />} 
              iconPosition="left"
            >
              Adicionar Medicamento
            </AppButton>
          </div>
        )}
        
        <div className="flex justify-between mt-6">
          <Button variant="outline" className="flex items-center gap-1">
            <Download size={16} />
            Exportar Lista
          </Button>
          <Button variant="outline" className="flex items-center gap-1 text-destructive">
            <Trash size={16} />
            Limpar Finalizados
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MedicationList;
