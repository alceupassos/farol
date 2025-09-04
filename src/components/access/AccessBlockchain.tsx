
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Shield, CheckCircle, Link as LinkIcon } from "lucide-react";

const AccessBlockchain = () => {
  return (
    <div>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Registro Blockchain</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Todos os acessos aos seus dados são registrados em blockchain para garantir segurança, imutabilidade e transparência.
          </p>
          
          <div className="space-y-6 mt-6">
            <div className="flex items-start gap-4 p-4 border rounded-lg">
              <div className="p-2 rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                <Shield size={20} />
              </div>
              <div>
                <h3 className="font-medium mb-1">Acesso Seguro</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Seus dados de saúde são criptografados e acessíveis apenas por você e profissionais autorizados.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 border rounded-lg">
              <div className="p-2 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                <Activity size={20} />
              </div>
              <div>
                <h3 className="font-medium mb-1">Auditoria Completa</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Visualize todo o histórico de acesso e modificações nos seus dados.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 border rounded-lg">
              <div className="p-2 rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                <CheckCircle size={20} />
              </div>
              <div>
                <h3 className="font-medium mb-1">Verificação</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Confirme a autenticidade dos seus registros médicos através da verificação em blockchain.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Transações Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="flex items-center justify-between p-3 border-b last:border-0">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-800">
                    <LinkIcon size={16} className="text-gray-500" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Acesso ao Prontuário</div>
                    <div className="text-xs text-gray-500">Dr. Carlos Mendes</div>
                    <div className="text-xs text-gray-400 mt-1">Hash: 0x8f3a...</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-medium">15/04/2023</div>
                  <div className="text-xs text-gray-500">14:25</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccessBlockchain;
