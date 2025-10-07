
import { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Medication } from '@/components/profile/types';
import { Bell, BellOff, Clock, Smartphone, Mail, AlertTriangle, Plus } from 'lucide-react';
import TimePicker from '@/components/medications/TimePicker';
import AppButton from '@/components/ui/AppButton';

interface MedicationRemindersProps {
  medications: Medication[];
}

const MedicationReminders = ({ medications }: MedicationRemindersProps) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [reminderTime, setReminderTime] = useState("00:30");
  const [criticalAlerts, setCriticalAlerts] = useState(true);
  
  const activeMedications = medications.filter(
    med => med.status === 'Ativo' || med.status === 'Conforme necessário'
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-xl">Configurações de Lembretes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bell className="h-4 w-4 text-primary" />
              <Label htmlFor="notifications" className="text-base">Notificações de Medicamentos</Label>
            </div>
            <Switch 
              id="notifications" 
              checked={notificationsEnabled}
              onCheckedChange={setNotificationsEnabled}
            />
          </div>
          
          <div className="space-y-4 pl-6 border-l-2 border-primary/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Smartphone className="h-4 w-4 text-muted-foreground" />
                <Label htmlFor="push" className="text-sm">Notificações Push</Label>
              </div>
              <Switch 
                id="push" 
                checked={pushNotifications}
                onCheckedChange={setPushNotifications}
                disabled={!notificationsEnabled}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <Label htmlFor="email" className="text-sm">Notificações por Email</Label>
              </div>
              <Switch 
                id="email" 
                checked={emailNotifications}
                onCheckedChange={setEmailNotifications}
                disabled={!notificationsEnabled}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <Label htmlFor="time" className="text-sm">Tempo de Antecedência</Label>
              </div>
              <TimePicker 
                value={reminderTime} 
                onChange={setReminderTime}
                disabled={!notificationsEnabled}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                <Label htmlFor="critical" className="text-sm">Alertas Críticos</Label>
              </div>
              <Switch 
                id="critical" 
                checked={criticalAlerts}
                onCheckedChange={setCriticalAlerts}
                disabled={!notificationsEnabled}
              />
            </div>
          </div>
          
          <div className="pt-4">
            <p className="text-sm text-muted-foreground mb-3">
              Alertas críticos são notificações especiais quando você deixa de tomar medicamentos importantes por mais de 2 horas após o horário programado.
            </p>
            <Button 
              variant="outline" 
              className="w-full"
            >
              Salvar Configurações
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-xl">Lembretes Ativos</CardTitle>
        </CardHeader>
        <CardContent>
          {activeMedications.length > 0 ? (
            <div className="space-y-3">
              {activeMedications.map((med, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{med.name} - {med.dose}</div>
                    <div className="text-sm text-muted-foreground">{med.nextDose || 'Horário não definido'}</div>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
              ))}
              
              <div className="pt-4">
                <AppButton 
                  variant="outline" 
                  className="w-full"
                  icon={<Plus size={16} />}
                  iconPosition="left"
                >
                  Adicionar Lembrete Personalizado
                </AppButton>
              </div>
            </div>
          ) : (
            <div className="text-center py-6">
              <BellOff className="mx-auto h-10 w-10 text-muted-foreground mb-2" />
              <p className="text-muted-foreground mb-4">
                Você não tem medicamentos ativos para configurar lembretes.
              </p>
              <AppButton>
                Adicionar Medicamento
              </AppButton>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MedicationReminders;
