
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Bell, BellOff, Clock, Shield } from "lucide-react";

const AccessSettings = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Configurações de Privacidade</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Eye className="h-4 w-4 text-gray-500" />
                <Label htmlFor="visibility">Visibilidade do Perfil</Label>
              </div>
              <Switch id="visibility" />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <EyeOff className="h-4 w-4 text-gray-500" />
                <Label htmlFor="anonymous">Modo Anônimo</Label>
              </div>
              <Switch id="anonymous" />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bell className="h-4 w-4 text-gray-500" />
                <Label htmlFor="notifications">Notificações de Acesso</Label>
              </div>
              <Switch id="notifications" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <BellOff className="h-4 w-4 text-gray-500" />
                <Label htmlFor="do-not-disturb">Não Perturbe</Label>
              </div>
              <Switch id="do-not-disturb" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Limites de Acesso</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <Label htmlFor="auto-revoke">Revogar Automaticamente Após 30 Dias</Label>
              </div>
              <Switch id="auto-revoke" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-gray-500" />
                <Label htmlFor="location">Restrição de Localização</Label>
              </div>
              <Switch id="location" />
            </div>
            
            <div className="pt-4">
              <Button variant="outline" className="w-full">
                Configurar Restrições Avançadas
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Exportar Dados</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Exporte um relatório completo de todos os acessos aos seus dados médicos.
          </p>
          <div className="flex space-x-2">
            <Button variant="outline" className="flex-1">
              Exportar como PDF
            </Button>
            <Button variant="outline" className="flex-1">
              Exportar como CSV
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccessSettings;
