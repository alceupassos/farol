
import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from "@/components/ui/button";
import { Download, QrCode } from 'lucide-react';
import EmergencyTabs from '@/components/emergency/EmergencyTabs';
import EmergencyContacts from '@/components/emergency/EmergencyContacts';
import PhysicalQRInstructions from '@/components/emergency/PhysicalQRInstructions';
import type { EmergencySettings } from '@/components/emergency/SettingsTab';

const Emergency = () => {
  const [settings, setSettings] = useState<EmergencySettings>({
    showAllergies: true,
    showMedications: true,
    showContacts: true,
    showBloodType: true,
    showChronicConditions: true,
    autoExpire: false,
    sendNotifications: true
  });

  const handleSettingToggle = (setting: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  return (
    <MainLayout>
      <div className="p-4 md:p-6 space-y-6">
        <PageHeader />
        
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
          <div className="space-y-6">
            <EmergencyTabs 
              settings={settings}
              onSettingToggle={handleSettingToggle}
            />
          </div>
          
          <div className="space-y-6">
            <EmergencyContacts />
            <PhysicalQRInstructions />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

const PageHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">QR de Emergência</h1>
        <p className="text-muted-foreground">
          Acesso rápido às suas informações médicas críticas
        </p>
      </div>
      
      <div className="flex space-x-2">
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Baixar QR Code
        </Button>
        <Button size="sm">
          <QrCode className="mr-2 h-4 w-4" />
          Gerar Novo QR
        </Button>
      </div>
    </div>
  );
};

export default Emergency;
