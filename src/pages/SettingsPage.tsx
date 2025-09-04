
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { UserCircle, Bell, Palette, ShieldCheck, ListChecks } from 'lucide-react';

const SettingsPage = () => {
  const settingsCategories = [
    {
      id: "profile",
      title: "Perfil",
      description: "Atualize suas informações pessoais e de contato.",
      icon: <UserCircle className="h-6 w-6 text-primary" />,
      options: ["Editar nome", "Mudar email", "Alterar senha", "Foto de perfil"]
    },
    {
      id: "notifications",
      title: "Notificações",
      description: "Gerencie como você recebe alertas e atualizações.",
      icon: <Bell className="h-6 w-6 text-primary" />,
      options: ["Notificações por email", "Notificações push", "Alertas de medicamento"]
    },
    {
      id: "appearance",
      title: "Aparência",
      description: "Personalize o tema e a exibição do aplicativo.",
      icon: <Palette className="h-6 w-6 text-primary" />,
      options: ["Tema claro/escuro", "Tamanho da fonte", "Idioma"]
    },
    {
      id: "security",
      title: "Segurança e Privacidade",
      description: "Configurações de segurança da conta e privacidade dos dados.",
      icon: <ShieldCheck className="h-6 w-6 text-primary" />,
      options: ["Autenticação de dois fatores", "Histórico de login", "Gerenciar dispositivos conectados"]
    },
    {
      id: "preferences",
      title: "Preferências da Conta",
      description: "Defina suas preferências gerais para o Sistema de Saúde Pública.",
      icon: <ListChecks className="h-6 w-6 text-primary" />,
      options: ["Unidades de medida (métrico/imperial)", "Formatos de data", "Configurações de exportação de dados"]
    }
  ];

  return (
    <MainLayout>
      <div className="space-y-8">
        <header>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Configurações</h1>
          <p className="text-muted-foreground mt-1">Gerencie as configurações da sua conta e preferências do aplicativo.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {settingsCategories.map((category) => (
            <Card key={category.id}>
              <CardHeader>
                <div className="flex items-center space-x-3 mb-2">
                  {category.icon}
                  <CardTitle className="text-xl">{category.title}</CardTitle>
                </div>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  {category.options.map((option, index) => (
                    <li key={index} className="text-gray-700 dark:text-gray-300 hover:text-primary cursor-pointer">
                      {option}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-muted-foreground mt-4">Mais opções em breve.</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default SettingsPage;

