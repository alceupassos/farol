
import { Plus } from 'lucide-react';
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import AppButton from '@/components/ui/AppButton';
import { Medication } from '@/components/profile/types';

interface MedicationsProps {
  medications: Medication[];
}

const Medications = ({ medications }: MedicationsProps) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex flex-wrap justify-between items-center gap-2">
          <CardTitle className="text-xl">Medicamentos Atuais</CardTitle>
          <AppButton size="sm" icon={<Plus size={16} />} iconPosition="left">
            Adicionar Medicamento
          </AppButton>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Dosagem</TableHead>
              <TableHead>Frequência</TableHead>
              <TableHead>Início</TableHead>
              <TableHead>Término</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {medications.map((medication) => (
              <TableRow key={medication.id}>
                <TableCell className="font-medium">{medication.name}</TableCell>
                <TableCell>{medication.dose}</TableCell>
                <TableCell>{medication.frequency}</TableCell>
                <TableCell>{medication.startDate}</TableCell>
                <TableCell>{medication.endDate}</TableCell>
                <TableCell>{medication.status}</TableCell>
                <TableCell className="text-right">
                  <AppButton
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2"
                  >
                    Editar
                  </AppButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default Medications;
