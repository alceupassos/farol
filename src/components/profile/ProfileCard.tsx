
import { useState } from 'react';
import { Pencil, Plus, FileText, Pill, Calendar, Activity, Lock, QrCode } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from '@/lib/utils';
import AppButton from '@/components/ui/AppButton';
import PersonalData from './tabs/PersonalData';
import MedicalRecords from './tabs/MedicalRecords';
import Medications from './tabs/Medications';
import Appointments from './tabs/Appointments';
import HealthMetrics from './tabs/HealthMetrics';
import AccessControl from './tabs/AccessControl';
import EmergencyQR from './tabs/EmergencyQR';
import { ProfileSection, MedicalRecord, Medication, Appointment, HealthMetric, AccessLog } from './types';

interface ProfileCardProps {
  sections: ProfileSection[];
  medicalRecords: MedicalRecord[];
  medications: Medication[];
  appointments: Appointment[];
  healthMetrics: HealthMetric[];
  accessLogs: AccessLog[];
  className?: string;
}

const ProfileCard = ({ 
  sections, 
  medicalRecords, 
  medications, 
  appointments, 
  healthMetrics, 
  accessLogs, 
  className 
}: ProfileCardProps) => {
  const [activeTab, setActiveTab] = useState("dados-pessoais");

  return (
    <div className={cn("glass-card rounded-xl overflow-hidden", className)}>
      <div className="p-5 border-b border-border flex justify-between items-center">
        <h3 className="text-lg font-medium text-foreground">Perfil Médico</h3>
        <AppButton 
          variant="outline" 
          size="sm"
          icon={<Pencil size={14} />}
          iconPosition="left"
        >
          Editar Perfil
        </AppButton>
      </div>
      
      <div className="px-5 py-4">
        <Tabs defaultValue="dados-pessoais" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full overflow-x-auto flex flex-nowrap justify-start mb-4 bg-transparent space-x-1">
            <TabsTrigger value="dados-pessoais" className="whitespace-nowrap">
              <Pencil size={16} className="mr-2" />
              Dados Pessoais
            </TabsTrigger>
            <TabsTrigger value="prontuarios" className="whitespace-nowrap">
              <FileText size={16} className="mr-2" />
              Prontuários
            </TabsTrigger>
            <TabsTrigger value="medicamentos" className="whitespace-nowrap">
              <Pill size={16} className="mr-2" />
              Medicamentos
            </TabsTrigger>
            <TabsTrigger value="consultas" className="whitespace-nowrap">
              <Calendar size={16} className="mr-2" />
              Consultas
            </TabsTrigger>
            <TabsTrigger value="metricas" className="whitespace-nowrap">
              <Activity size={16} className="mr-2" />
              Métricas de Saúde
            </TabsTrigger>
            <TabsTrigger value="acesso" className="whitespace-nowrap">
              <Lock size={16} className="mr-2" />
              Controle de Acesso
            </TabsTrigger>
            <TabsTrigger value="emergencia" className="whitespace-nowrap">
              <QrCode size={16} className="mr-2" />
              QR Emergência
            </TabsTrigger>
          </TabsList>
          
          {/* Conteúdo das abas */}
          <TabsContent value="dados-pessoais" className="space-y-4">
            <PersonalData sections={sections} />
          </TabsContent>
          
          <TabsContent value="prontuarios">
            <MedicalRecords records={medicalRecords} />
          </TabsContent>
          
          <TabsContent value="medicamentos">
            <Medications medications={medications} />
          </TabsContent>
          
          <TabsContent value="consultas">
            <Appointments appointments={appointments} />
          </TabsContent>
          
          <TabsContent value="metricas">
            <HealthMetrics metrics={healthMetrics} />
          </TabsContent>
          
          <TabsContent value="acesso">
            <AccessControl accessLogs={accessLogs} />
          </TabsContent>
          
          <TabsContent value="emergencia">
            <EmergencyQR />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfileCard;
