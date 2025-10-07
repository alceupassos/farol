
import { Plus } from 'lucide-react';
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import AppButton from '@/components/ui/AppButton';

interface Appointment {
  id: string;
  date: string;
  time: string;
  doctor: string;
  specialty: string;
  location: string;
}

interface AppointmentsProps {
  appointments: Appointment[];
}

const Appointments = ({ appointments }: AppointmentsProps) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex flex-wrap justify-between items-center gap-2">
          <CardTitle className="text-xl">Consultas Agendadas</CardTitle>
          <AppButton size="sm" icon={<Plus size={16} />} iconPosition="left">
            Nova Consulta
          </AppButton>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead>Horário</TableHead>
              <TableHead>Médico</TableHead>
              <TableHead>Especialidade</TableHead>
              <TableHead>Local</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell className="font-medium">{appointment.date}</TableCell>
                <TableCell>{appointment.time}</TableCell>
                <TableCell>{appointment.doctor}</TableCell>
                <TableCell>{appointment.specialty}</TableCell>
                <TableCell>{appointment.location}</TableCell>
                <TableCell className="text-right">
                  <AppButton
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2"
                  >
                    Reagendar
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

export default Appointments;
