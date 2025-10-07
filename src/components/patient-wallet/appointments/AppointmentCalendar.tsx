
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Clock, MapPin } from "lucide-react";

interface Appointment {
  id: string;
  date: string;
  time: string;
  doctor: string;
  specialty: string;
  location: string;
}

interface AppointmentCalendarProps {
  appointments: Appointment[];
}

const AppointmentCalendar = ({ appointments }: AppointmentCalendarProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  // Convert string dates to Date objects for the calendar
  // This is a simplified approach; in a real app, you'd parse the dates properly
  const appointmentDates = appointments.map(apt => {
    const [day, month, year] = apt.date.split('/').map(Number);
    return new Date(year, month - 1, day);
  });

  const getAppointmentsForDate = (date: Date | undefined) => {
    if (!date) return [];
    
    return appointments.filter(apt => {
      const [day, month, year] = apt.date.split('/').map(Number);
      const aptDate = new Date(year, month - 1, day);
      return aptDate.getDate() === date.getDate() && 
             aptDate.getMonth() === date.getMonth() && 
             aptDate.getFullYear() === date.getFullYear();
    });
  };

  const selectedAppointments = getAppointmentsForDate(date);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Calendário de Consultas</CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="border rounded-md p-3"
            modifiers={{
              hasAppointment: (date) => {
                return appointmentDates.some(aptDate => 
                  aptDate.getDate() === date.getDate() && 
                  aptDate.getMonth() === date.getMonth() && 
                  aptDate.getFullYear() === date.getFullYear()
                );
              },
            }}
            modifiersClassNames={{
              hasAppointment: "bg-primary/10 font-bold",
            }}
          />
        </CardContent>
      </Card>

      <div>
        <Card>
          <CardHeader>
            <CardTitle>
              {date ? (
                `Consultas em ${date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })}`
              ) : (
                'Selecione uma data'
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedAppointments.length > 0 ? (
              <div className="space-y-4">
                {selectedAppointments.map((appointment) => (
                  <AppointmentCard key={appointment.id} appointment={appointment} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <p>Nenhuma consulta agendada para esta data</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const AppointmentCard = ({ appointment }: { appointment: Appointment }) => {
  return (
    <div className="p-4 border rounded-lg">
      <div className="flex items-center mb-2">
        <Clock size={16} className="mr-2 text-primary" />
        <span className="font-medium">{appointment.time}</span>
      </div>
      <h4 className="font-medium">{appointment.doctor}</h4>
      <p className="text-sm text-gray-500 dark:text-gray-400">{appointment.specialty}</p>
      <div className="flex items-start mt-2">
        <MapPin size={16} className="mr-2 mt-0.5 text-gray-500 dark:text-gray-400" />
        <span className="text-sm text-gray-500 dark:text-gray-400">{appointment.location}</span>
      </div>
    </div>
  );
};

export default AppointmentCalendar;
