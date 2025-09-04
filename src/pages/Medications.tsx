
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MainLayout from '@/components/layout/MainLayout';
import MedicationList from '@/components/medications/MedicationList';
import MedicationCalendar from '@/components/medications/MedicationCalendar';
import MedicationReminders from '@/components/medications/MedicationReminders';
import MedicationInteractions from '@/components/medications/MedicationInteractions';
import { Pill, Calendar, Bell, AlertTriangle, BarChart3 } from 'lucide-react';

// Sample medications data
const medications = [
  { 
    id: "med1", 
    name: "Lisinopril", 
    dose: "10mg", 
    frequency: "Uma vez ao dia", 
    startDate: "15/01/2022", 
    endDate: "Contínuo", 
    status: "Ativo" as const,
    stock: 15,
    totalDoses: 30,
    nextDose: "Hoje, 08:00",
    instructions: "Tomar em jejum, 30 minutos antes do café da manhã",
    category: "Anti-hipertensivo",
    prescriptionInfo: {
      doctorName: "Dr. Carlos Silva",
      prescriptionDate: "10/01/2022",
      expiryDate: "10/07/2022",
      renewable: true
    }
  },
  { 
    id: "med2", 
    name: "Metformina", 
    dose: "500mg", 
    frequency: "Duas vezes ao dia", 
    startDate: "10/03/2022", 
    endDate: "Contínuo", 
    status: "Ativo" as const,
    stock: 28,
    totalDoses: 60,
    nextDose: "Hoje, 12:00",
    instructions: "Tomar após as refeições",
    category: "Antidiabético",
    prescriptionInfo: {
      doctorName: "Dra. Ana Oliveira",
      prescriptionDate: "05/03/2022",
      expiryDate: "05/09/2022",
      renewable: true
    }
  },
  { 
    id: "med3", 
    name: "Atorvastatina", 
    dose: "20mg", 
    frequency: "Uma vez ao dia antes de dormir", 
    startDate: "05/08/2023", 
    endDate: "Contínuo", 
    status: "Ativo" as const,
    stock: 22,
    totalDoses: 30,
    nextDose: "Hoje, 22:00",
    instructions: "Tomar à noite, antes de dormir",
    category: "Estatina",
    prescriptionInfo: {
      doctorName: "Dr. Paulo Mendes",
      prescriptionDate: "01/08/2023",
      expiryDate: "01/02/2024",
      renewable: true
    }
  },
  { 
    id: "med4", 
    name: "Ibuprofeno", 
    dose: "400mg", 
    frequency: "Conforme necessário, máximo 3x ao dia", 
    startDate: "20/05/2023", 
    endDate: "Conforme necessário", 
    status: "Conforme necessário" as const,
    stock: 10,
    totalDoses: 20,
    instructions: "Tomar com alimentos para evitar irritação gástrica",
    category: "Anti-inflamatório",
    prescriptionInfo: {
      doctorName: "Dra. Mariana Costa",
      prescriptionDate: "18/05/2023",
      expiryDate: "18/11/2023",
      renewable: false
    }
  },
  { 
    id: "med5", 
    name: "Dipirona", 
    dose: "500mg", 
    frequency: "A cada 6 horas se necessário", 
    startDate: "15/04/2023", 
    endDate: "Finalizado", 
    status: "Finalizado" as const,
    stock: 0,
    totalDoses: 20,
    category: "Analgésico",
    prescriptionInfo: {
      doctorName: "Dr. Roberto Almeida",
      prescriptionDate: "15/04/2023",
      expiryDate: "15/10/2023",
      renewable: false
    }
  }
];

const Medications = () => {
  const [activeTab, setActiveTab] = useState("lista");

  return (
    <MainLayout>
      <div className="pt-20 pb-10 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">Medicamentos</h1>
            <p className="text-muted-foreground">
              Gerencie seus medicamentos, receitas, lembretes e verifique interações medicamentosas.
            </p>
          </div>

          <Tabs defaultValue="lista" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full flex flex-nowrap justify-start mb-4 overflow-x-auto">
              <TabsTrigger value="lista" className="flex items-center whitespace-nowrap">
                <Pill size={16} className="mr-2" />
                Lista de Medicamentos
              </TabsTrigger>
              <TabsTrigger value="calendario" className="flex items-center whitespace-nowrap">
                <Calendar size={16} className="mr-2" />
                Calendário
              </TabsTrigger>
              <TabsTrigger value="lembretes" className="flex items-center whitespace-nowrap">
                <Bell size={16} className="mr-2" />
                Lembretes
              </TabsTrigger>
              <TabsTrigger value="interacoes" className="flex items-center whitespace-nowrap">
                <AlertTriangle size={16} className="mr-2" />
                Interações
              </TabsTrigger>
              <TabsTrigger value="adherencia" className="flex items-center whitespace-nowrap">
                <BarChart3 size={16} className="mr-2" />
                Aderência
              </TabsTrigger>
            </TabsList>

            <TabsContent value="lista">
              <MedicationList medications={medications} />
            </TabsContent>
            
            <TabsContent value="calendario">
              <MedicationCalendar />
            </TabsContent>
            
            <TabsContent value="lembretes">
              <MedicationReminders medications={medications} />
            </TabsContent>
            
            <TabsContent value="interacoes">
              <MedicationInteractions medications={medications} />
            </TabsContent>
            
            <TabsContent value="adherencia">
              <div className="glass-card rounded-xl p-5">
                <h2 className="text-xl font-semibold mb-4">Aderência ao Tratamento</h2>
                <p className="text-muted-foreground mb-6">
                  Visualize e acompanhe sua aderência aos tratamentos medicamentosos ao longo do tempo.
                </p>
                <div className="bg-card rounded-lg p-4 border border-border h-72 flex items-center justify-center">
                  <p className="text-muted-foreground">Visualização de gráficos de aderência em desenvolvimento</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

export default Medications;
