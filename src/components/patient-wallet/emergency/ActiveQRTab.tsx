
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Shield, Clock } from 'lucide-react';

// Badge component for the QR page
const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20">
    {children}
  </span>
);

const ActiveQRTab = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Seu QR Code de Emergência</CardTitle>
          <CardDescription>
            Apresente este QR em situações de emergência para permitir acesso rápido às suas informações médicas críticas
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <div className="bg-white p-6 rounded-xl mb-4">
            <div className="w-64 h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
              <img 
                src="/placeholder.svg" 
                alt="QR Code" 
                className="w-full h-full object-contain" 
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md">
            <div className="flex items-center p-3 rounded-lg border bg-muted/50">
              <Shield className="h-5 w-5 text-green-500 mr-3" />
              <div>
                <div className="text-sm font-medium">Segurança</div>
                <div className="text-xs text-muted-foreground">Protegido e Verificado</div>
              </div>
            </div>
            
            <div className="flex items-center p-3 rounded-lg border bg-muted/50">
              <Clock className="h-5 w-5 text-blue-500 mr-3" />
              <div>
                <div className="text-sm font-medium">Validade</div>
                <div className="text-xs text-muted-foreground">Permanente</div>
              </div>
            </div>
          </div>
          
          <Separator className="my-6" />
          
          <div className="text-center space-y-2">
            <h3 className="font-medium">Informações incluídas:</h3>
            <div className="flex flex-wrap justify-center gap-2">
              <Badge>Alergias</Badge>
              <Badge>Medicamentos</Badge>
              <Badge>Tipo Sanguíneo</Badge>
              <Badge>Contatos</Badge>
              <Badge>Condições Crônicas</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <EmergencyInstructions />
    </div>
  );
};

const EmergencyInstructions = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Instruções para Emergência</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-3 p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
          <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
          <div>
            <h4 className="font-medium text-yellow-800 dark:text-yellow-300">Em caso de emergência</h4>
            <p className="text-sm text-yellow-700 dark:text-yellow-400">
              Este QR code permite que profissionais de saúde acessem suas informações médicas críticas rapidamente.
              Mantenha-o acessível em seu smartphone ou impresso.
            </p>
          </div>
        </div>
        
        <div className="rounded-lg border p-4">
          <h4 className="font-medium mb-2">Para profissionais de saúde:</h4>
          <ol className="text-sm space-y-2 list-decimal list-inside">
            <li>Escaneie o QR code com qualquer leitor</li>
            <li>Acesse as informações médicas críticas</li>
            <li>Autentique-se como profissional de saúde para dados completos</li>
            <li>Em caso de dúvidas, contate os números de emergência listados</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
};

// Need to import this at the top
import { AlertTriangle } from 'lucide-react';

export default ActiveQRTab;
