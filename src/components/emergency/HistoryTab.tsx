
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Shield, AlertTriangle } from 'lucide-react';

const HistoryTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Histórico de Acessos</CardTitle>
        <CardDescription>
          Registro de quando seu QR de emergência foi utilizado
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <AccessHistoryItem 
            institution="Hospital Santa Casa"
            accessedBy="Dr. Carlos Silva"
            verified={true}
            date="10/06/2023"
            time="15:42"
          />
          
          <AccessHistoryItem 
            institution="Clínica São Paulo"
            accessedBy="Dra. Ana Ferreira"
            verified={true}
            date="28/05/2023"
            time="09:15"
          />
          
          <AccessHistoryItem 
            institution="SAMU"
            accessedBy="Acesso de emergência"
            verified={false}
            isEmergency={true}
            date="15/04/2023"
            time="22:07"
          />
        </div>
      </CardContent>
    </Card>
  );
};

interface AccessHistoryItemProps {
  institution: string;
  accessedBy: string;
  verified: boolean;
  isEmergency?: boolean;
  date: string;
  time: string;
}

const AccessHistoryItem = ({ 
  institution, 
  accessedBy, 
  verified, 
  isEmergency = false, 
  date, 
  time 
}: AccessHistoryItemProps) => {
  return (
    <div className="border rounded-md p-4">
      <div className="flex items-start justify-between">
        <div>
          <h4 className="font-medium">{institution}</h4>
          <p className="text-sm text-muted-foreground">Acessado por {accessedBy}</p>
          <div className="flex items-center mt-1">
            {verified ? (
              <>
                <Shield className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-xs text-green-600 dark:text-green-400">Verificado</span>
              </>
            ) : isEmergency ? (
              <>
                <AlertTriangle className="h-4 w-4 text-amber-500 mr-1" />
                <span className="text-xs text-amber-600 dark:text-amber-400">Emergência</span>
              </>
            ) : null}
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm">{date}</div>
          <div className="text-xs text-muted-foreground">{time}</div>
        </div>
      </div>
    </div>
  );
};

export default HistoryTab;
