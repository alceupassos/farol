
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, FileEdit, X, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Appointment {
  id: string;
  date: string;
  time: string;
  doctor: string;
  specialty: string;
  location: string;
}

interface AppointmentListProps {
  appointments: Appointment[];
}

const AppointmentList = ({ appointments }: AppointmentListProps) => {
  return (
    <div className="space-y-4">
      <div className="bg-card rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead>Hora</TableHead>
              <TableHead>Médico</TableHead>
              <TableHead>Especialidade</TableHead>
              <TableHead>Local</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell>{appointment.date}</TableCell>
                <TableCell>{appointment.time}</TableCell>
                <TableCell className="font-medium">{appointment.doctor}</TableCell>
                <TableCell>{appointment.specialty}</TableCell>
                <TableCell>{appointment.location}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon" title="Confirmar">
                      <Check size={16} className="text-green-500" />
                    </Button>
                    <Button variant="ghost" size="icon" title="Reagendar">
                      <FileEdit size={16} />
                    </Button>
                    <Button variant="ghost" size="icon" title="Cancelar">
                      <X size={16} className="text-red-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Card>
        <CardContent className="p-4">
          <h3 className="text-lg font-medium mb-3">Dicas para suas consultas</h3>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Calendar className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h4 className="font-medium text-sm">Chegue com antecedência</h4>
                <p className="text-xs text-muted-foreground">
                  Recomendamos chegar 15 minutos antes do horário marcado para completar qualquer documentação necessária.
                </p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Clock className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h4 className="font-medium text-sm">Prepare suas perguntas</h4>
                <p className="text-xs text-muted-foreground">
                  Anote suas dúvidas com antecedência para aproveitar ao máximo o tempo com o médico.
                </p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <MapPin className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h4 className="font-medium text-sm">Verifique o local</h4>
                <p className="text-xs text-muted-foreground">
                  Confira o endereço e como chegar com antecedência, especialmente se for um local novo.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppointmentList;
