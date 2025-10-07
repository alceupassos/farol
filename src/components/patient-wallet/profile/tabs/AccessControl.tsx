
import { UserCog, Share2 } from 'lucide-react';
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import AppButton from '@/components/ui/AppButton';

interface AccessLog {
  id: string;
  date: string;
  time: string;
  user: string;
  action: string;
}

interface AccessControlProps {
  accessLogs: AccessLog[];
}

const AccessControl = ({ accessLogs }: AccessControlProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Controle de Acesso</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-3">Gerenciar Acesso</h3>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <AppButton
              icon={<UserCog size={16} />}
              iconPosition="left"
            >
              Adicionar Profissional
            </AppButton>
            <AppButton
              variant="outline"
              icon={<Share2 size={16} />}
              iconPosition="left"
            >
              Compartilhar Perfil
            </AppButton>
          </div>
          
          <div className="border rounded-lg border-border overflow-hidden">
            <div className="bg-muted/50 px-4 py-3 text-sm font-medium">
              Profissionais com Acesso
            </div>
            <div className="divide-y divide-border">
              <div className="flex items-center justify-between px-4 py-3">
                <div>
                  <div className="font-medium">Dr. Antônio Ferreira</div>
                  <div className="text-sm text-muted-foreground">Clínico Geral</div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                    Ativo
                  </span>
                  <AppButton
                    variant="ghost"
                    size="sm"
                    className="h-8"
                  >
                    Revogar
                  </AppButton>
                </div>
              </div>
              
              <div className="flex items-center justify-between px-4 py-3">
                <div>
                  <div className="font-medium">Dra. Mariana Santos</div>
                  <div className="text-sm text-muted-foreground">Cardiologista</div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                    Ativo
                  </span>
                  <AppButton
                    variant="ghost"
                    size="sm"
                    className="h-8"
                  >
                    Revogar
                  </AppButton>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-3">Registro de Acessos</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Hora</TableHead>
                <TableHead>Usuário</TableHead>
                <TableHead>Ação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {accessLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>{log.date}</TableCell>
                  <TableCell>{log.time}</TableCell>
                  <TableCell>{log.user}</TableCell>
                  <TableCell>{log.action}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccessControl;
