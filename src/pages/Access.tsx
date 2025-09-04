
import MainLayout from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EyeOff, UserPlus, ShieldCheck, Clock, History } from "lucide-react";
import { accessLogs } from '@/data/profileData';
import AccessPermissions from '@/components/access/AccessPermissions';
import AccessLogs from '@/components/access/AccessLogs';
import AccessBlockchain from '@/components/access/AccessBlockchain';
import AccessSettings from '@/components/access/AccessSettings';

const AccessPage = () => {
  return (
    <MainLayout>
      <div className="pt-20 pb-10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Controle de Acesso</h1>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                Gerencie quem pode acessar suas informações médicas e monitore todos os acessos.
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button className="flex items-center">
                <UserPlus size={16} className="mr-2" />
                Conceder Acesso
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <AccessSummary />
            </div>
            <div className="lg:col-span-3">
              <Tabs defaultValue="permissoes" className="w-full">
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value="permissoes">Permissões</TabsTrigger>
                  <TabsTrigger value="logs">Logs de Acesso</TabsTrigger>
                  <TabsTrigger value="blockchain">Registro Blockchain</TabsTrigger>
                  <TabsTrigger value="configuracoes">Configurações</TabsTrigger>
                </TabsList>
                <TabsContent value="permissoes" className="mt-0">
                  <AccessPermissions />
                </TabsContent>
                <TabsContent value="logs" className="mt-0">
                  <AccessLogs logs={accessLogs} />
                </TabsContent>
                <TabsContent value="blockchain" className="mt-0">
                  <AccessBlockchain />
                </TabsContent>
                <TabsContent value="configuracoes" className="mt-0">
                  <AccessSettings />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

const AccessSummary = () => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Resumo de Acesso</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400">Permissões ativas</span>
              <span className="font-medium">5</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400">Permissões pendentes</span>
              <span className="font-medium">2</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400">Acessos recentes (7 dias)</span>
              <span className="font-medium">8</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400">Última revisão de segurança</span>
              <span className="font-medium">10/11/2023</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Nível de Proteção</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-1 text-xs">
                <span>Dados protegidos</span>
                <span className="font-medium">90%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '90%' }}></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">10% dos seus dados não estão protegidos por criptografia de ponta a ponta.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Ações Rápidas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button variant="outline" className="w-full justify-start">
            <ShieldCheck size={16} className="mr-2" />
            Verificação de Segurança
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Clock size={16} className="mr-2" />
            Acessos Temporários
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <History size={16} className="mr-2" />
            Histórico Completo
          </Button>
          <Button variant="outline" className="w-full justify-start text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300">
            <EyeOff size={16} className="mr-2" />
            Revogar Todos os Acessos
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccessPage;
