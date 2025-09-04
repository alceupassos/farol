import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { FileText, MicOff, MessageSquarePlus, Calendar, Clock } from "lucide-react";
import { Label } from "@/components/ui/label";

interface Appointment {
  id: string;
  date: string;
  time: string;
  doctor: string;
  specialty: string;
  location: string;
}

interface AppointmentPreparationProps {
  nextAppointment: Appointment;
}

const AppointmentPreparation = ({ nextAppointment }: AppointmentPreparationProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Preparação para Consulta</CardTitle>
              <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                Próxima: {nextAppointment.date}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="text-lg font-medium">{nextAppointment.doctor}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{nextAppointment.specialty}</div>
              <div className="flex items-center mt-2">
                <Clock size={16} className="mr-2 text-gray-500 dark:text-gray-400" />
                <span className="text-sm">{nextAppointment.time}</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-medium">Instruções para esta consulta:</h3>
              
              <div className="flex items-start">
                <Checkbox id="instruction-1" className="mt-1" />
                <Label htmlFor="instruction-1" className="ml-2">
                  <span className="font-medium">Jejum de 8 horas</span>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Necessário para exames de sangue precisos</p>
                </Label>
              </div>
              
              <div className="flex items-start">
                <Checkbox id="instruction-2" className="mt-1" />
                <Label htmlFor="instruction-2" className="ml-2">
                  <span className="font-medium">Trazer exames anteriores</span>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Inclua resultados de exames dos últimos 6 meses</p>
                </Label>
              </div>
              
              <div className="flex items-start">
                <Checkbox id="instruction-3" className="mt-1" />
                <Label htmlFor="instruction-3" className="ml-2">
                  <span className="font-medium">Lista de medicamentos atuais</span>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Inclua dosagem e frequência de todos os medicamentos</p>
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Perguntas para o Médico</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-start">
                  <Checkbox id="question-1" className="mt-1" />
                  <Label htmlFor="question-1" className="ml-2">
                    Perguntar sobre efeitos colaterais da nova medicação
                  </Label>
                </div>
                
                <div className="flex items-start">
                  <Checkbox id="question-2" className="mt-1" />
                  <Label htmlFor="question-2" className="ml-2">
                    Discutir resultados dos últimos exames
                  </Label>
                </div>
                
                <div className="flex items-start">
                  <Checkbox id="question-3" className="mt-1" />
                  <Label htmlFor="question-3" className="ml-2">
                    Perguntar sobre mudanças na dieta recomendadas
                  </Label>
                </div>
              </div>
              
              <div>
                <Label htmlFor="new-question" className="text-sm font-medium mb-1 block">
                  Adicionar nova pergunta
                </Label>
                <div className="flex gap-2">
                  <Textarea id="new-question" placeholder="Digite sua pergunta aqui..." className="flex-1" />
                  <Button size="icon" className="h-auto">
                    <MessageSquarePlus size={18} />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Resumo Médico para Compartilhar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium mb-1 block">
                  Selecione informações para compartilhar
                </Label>
                <div className="space-y-2 mt-2">
                  <div className="flex items-center">
                    <Checkbox id="share-medications" defaultChecked />
                    <Label htmlFor="share-medications" className="ml-2">Medicamentos atuais</Label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox id="share-allergies" defaultChecked />
                    <Label htmlFor="share-allergies" className="ml-2">Alergias</Label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox id="share-conditions" defaultChecked />
                    <Label htmlFor="share-conditions" className="ml-2">Condições médicas</Label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox id="share-history" defaultChecked />
                    <Label htmlFor="share-history" className="ml-2">Histórico médico recente</Label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox id="share-metrics" defaultChecked />
                    <Label htmlFor="share-metrics" className="ml-2">Métricas de saúde recentes</Label>
                  </div>
                </div>
              </div>
              
              <Button className="w-full">
                <FileText size={16} className="mr-2" />
                Gerar Resumo para Compartilhar
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Gravação da Consulta</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Com o consentimento do seu médico, você pode gravar a consulta para revisão posterior.
              </p>
              
              <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-4">
                <div className="flex items-center mb-3">
                  <MicOff size={20} className="text-gray-500 dark:text-gray-400 mr-2" />
                  <h4 className="font-medium">Gravação desativada</h4>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                  Lembre-se de obter consentimento verbal do profissional de saúde antes de iniciar qualquer gravação.
                </p>
                <Button variant="outline" className="w-full">
                  <FileText size={16} className="mr-2 text-red-500" />
                  Configurar Gravação
                </Button>
              </div>
              
              <div>
                <Label className="text-sm font-medium mb-1 block">
                  Anotações pós-consulta
                </Label>
                <Textarea 
                  placeholder="Registre informações importantes após a consulta..." 
                  className="min-h-[100px]"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AppointmentPreparation;
