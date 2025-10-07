
import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AppointmentList from '@/components/appointments/AppointmentList';
import AppointmentCalendar from '@/components/appointments/AppointmentCalendar';
import AppointmentPreparation from '@/components/appointments/AppointmentPreparation';
import AppointmentMap from '@/components/appointments/AppointmentMap';

// Sample appointment data
const appointments = [
  {
    id: "apt1",
    date: "15/06/2023",
    time: "14:00",
    doctor: "Dra. Maria Silva",
    specialty: "Cardiologia",
    location: "Clínica Saúde Total",
    type: "Presencial" as const,
    status: "Agendada" as const
  },
  {
    id: "apt2",
    date: "22/06/2023",
    time: "10:30",
    doctor: "Dr. Carlos Mendes",
    specialty: "Endocrinologia",
    location: "Hospital São Lucas",
    type: "Presencial" as const,
    status: "Agendada" as const
  },
  {
    id: "apt3",
    date: "05/07/2023",
    time: "09:15",
    doctor: "Dr. Paulo Ribeiro",
    specialty: "Neurologia",
    location: "Centro Médico Paulista",
    type: "Telemedicina" as const,
    status: "Agendada" as const
  }
];

const Appointments = () => {
  const [activeTab, setActiveTab] = useState("list");
  
  // Get the next appointment for the preparation tab
  const nextAppointment = appointments.find(apt => apt.status === "Agendada") || appointments[0];

  return (
    <MainLayout>
      <div className="p-4 md:p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Consultas</h1>
            <p className="text-muted-foreground">
              Gerencie suas consultas médicas e histórico de atendimentos
            </p>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full md:w-auto mb-4">
            <TabsTrigger value="list">Lista de Consultas</TabsTrigger>
            <TabsTrigger value="calendar">Calendário</TabsTrigger>
            <TabsTrigger value="preparation">Preparação</TabsTrigger>
            <TabsTrigger value="location">Localização</TabsTrigger>
          </TabsList>
          
          <TabsContent value="list" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Suas Consultas</CardTitle>
                <CardDescription>
                  Visualize suas consultas agendadas e históricas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AppointmentList appointments={appointments} />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="calendar" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Calendário de Consultas</CardTitle>
                <CardDescription>
                  Visualize suas consultas em formato de calendário
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AppointmentCalendar appointments={appointments} />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="preparation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Preparação para Consulta</CardTitle>
                <CardDescription>
                  Instruções e informações para sua próxima consulta
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AppointmentPreparation nextAppointment={nextAppointment} />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="location" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Localização</CardTitle>
                <CardDescription>
                  Encontre o caminho para suas consultas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AppointmentMap appointments={appointments} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Appointments;
