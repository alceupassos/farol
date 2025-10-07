
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ActiveQRTab from './ActiveQRTab';
import SettingsTab, { EmergencySettings } from './SettingsTab';
import HistoryTab from './HistoryTab';

interface EmergencyTabsProps {
  settings: EmergencySettings;
  onSettingToggle: (setting: keyof EmergencySettings) => void;
}

const EmergencyTabs = ({ settings, onSettingToggle }: EmergencyTabsProps) => {
  return (
    <Tabs defaultValue="active" className="w-full">
      <TabsList className="w-full md:w-auto mb-4">
        <TabsTrigger value="active">QR Ativo</TabsTrigger>
        <TabsTrigger value="settings">Configurações</TabsTrigger>
        <TabsTrigger value="history">Histórico de Uso</TabsTrigger>
      </TabsList>
      
      <TabsContent value="active" className="space-y-6">
        <ActiveQRTab />
      </TabsContent>
      
      <TabsContent value="settings" className="space-y-6">
        <SettingsTab 
          settings={settings}
          onSettingToggle={onSettingToggle}
        />
      </TabsContent>
      
      <TabsContent value="history" className="space-y-6">
        <HistoryTab />
      </TabsContent>
    </Tabs>
  );
};

export default EmergencyTabs;
