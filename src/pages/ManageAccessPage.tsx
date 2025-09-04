
import MainLayout from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus, ShieldCheck, KeyRound } from "lucide-react";
import AccessPermissions from '@/components/access/AccessPermissions';
import AccessSettings from '@/components/access/AccessSettings';
import AccessBlockchain from '@/components/access/AccessBlockchain'; // Added for completeness

const ManageAccessPage = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center">
              <KeyRound size={30} className="mr-3 text-primary" />
              Gerenciar Acesso e Permissões
            </h1>
            <p className="text-muted-foreground mt-1">
              Controle quem tem acesso aos seus dados e defina as políticas de compartilhamento.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button className="flex items-center">
              <UserPlus size={16} className="mr-2" />
              Conceder Novo Acesso
            </Button>
          </div>
        </div>

        <Tabs defaultValue="permissoes" className="w-full">
          <TabsList className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mb-4 max-w-xl">
            <TabsTrigger value="permissoes">Permissões Detalhadas</TabsTrigger>
            <TabsTrigger value="configuracoes">Configurações Globais</TabsTrigger>
            <TabsTrigger value="blockchain">Registro Blockchain</TabsTrigger>
          </TabsList>

          <TabsContent value="permissoes">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciamento de Permissões</CardTitle>
                <CardDescription>
                  Revise, aprove ou revogue acessos concedidos a profissionais e instituições.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AccessPermissions />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="configuracoes">
            <Card>
              <CardHeader>
                <CardTitle>Configurações de Acesso Global</CardTitle>
                <CardDescription>
                  Defina as políticas gerais de privacidade e segurança para o compartilhamento dos seus dados.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AccessSettings />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="blockchain">
            <Card>
              <CardHeader>
                <CardTitle>Auditoria em Blockchain</CardTitle>
                <CardDescription>
                  Consulte o registro imutável de todas as interações de acesso aos seus dados.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AccessBlockchain />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default ManageAccessPage;

