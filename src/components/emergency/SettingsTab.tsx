
import { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

interface EmergencySettings {
  showAllergies: boolean;
  showMedications: boolean;
  showContacts: boolean;
  showBloodType: boolean;
  showChronicConditions: boolean;
  autoExpire: boolean;
  sendNotifications: boolean;
}

interface SettingsTabProps {
  settings: EmergencySettings;
  onSettingToggle: (setting: keyof EmergencySettings) => void;
}

const SettingsTab = ({ settings, onSettingToggle }: SettingsTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurações do QR de Emergência</CardTitle>
        <CardDescription>
          Controle quais informações serão disponibilizadas em emergências
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Informações visíveis</h3>
          
          <div className="space-y-3">
            <SettingToggle
              id="show-allergies"
              label="Alergias"
              description="Mostrar informações sobre alergias e reações"
              checked={settings.showAllergies}
              onToggle={() => onSettingToggle('showAllergies')}
            />
            
            <Separator />
            
            <SettingToggle
              id="show-medications"
              label="Medicamentos"
              description="Mostrar medicamentos atuais"
              checked={settings.showMedications}
              onToggle={() => onSettingToggle('showMedications')}
            />
            
            <Separator />
            
            <SettingToggle
              id="show-bloodtype"
              label="Tipo Sanguíneo"
              description="Mostrar seu tipo sanguíneo"
              checked={settings.showBloodType}
              onToggle={() => onSettingToggle('showBloodType')}
            />
            
            <Separator />
            
            <SettingToggle
              id="show-conditions"
              label="Condições Crônicas"
              description="Mostrar condições médicas crônicas"
              checked={settings.showChronicConditions}
              onToggle={() => onSettingToggle('showChronicConditions')}
            />
            
            <Separator />
            
            <SettingToggle
              id="show-contacts"
              label="Contatos de Emergência"
              description="Mostrar contatos para emergência"
              checked={settings.showContacts}
              onToggle={() => onSettingToggle('showContacts')}
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Segurança e privacidade</h3>
          
          <div className="space-y-3">
            <SettingToggle
              id="auto-expire"
              label="Expiração Automática"
              description="QR code expira após 24h de geração"
              checked={settings.autoExpire}
              onToggle={() => onSettingToggle('autoExpire')}
            />
            
            <Separator />
            
            <SettingToggle
              id="send-notifications"
              label="Notificações de Acesso"
              description="Receber notificação quando seu QR for acessado"
              checked={settings.sendNotifications}
              onToggle={() => onSettingToggle('sendNotifications')}
            />
          </div>
        </div>
        
        <div className="pt-2">
          <Button className="w-full">Salvar Configurações</Button>
        </div>
      </CardContent>
    </Card>
  );
};

interface SettingToggleProps {
  id: string;
  label: string;
  description: string;
  checked: boolean;
  onToggle: () => void;
}

const SettingToggle = ({ id, label, description, checked, onToggle }: SettingToggleProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-0.5">
        <Label htmlFor={id}>{label}</Label>
        <p className="text-xs text-muted-foreground">
          {description}
        </p>
      </div>
      <Switch 
        id={id} 
        checked={checked}
        onCheckedChange={onToggle}
      />
    </div>
  );
};

export default SettingsTab;
export type { EmergencySettings };
