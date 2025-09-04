import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  BookOpen, 
  Calendar, 
  Phone, 
  Mail, 
  MapPin,
  ExternalLink,
  Download
} from 'lucide-react';

const HelpPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/10 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Central de Ajuda</h1>
          <p className="text-muted-foreground">Encontre respostas e aprenda a usar o Sistema de Saúde Pública</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="text-center">
              <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Guia de Início</CardTitle>
              <CardDescription>Primeiros passos no sistema</CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="text-center">
              <FileText className="h-12 w-12 text-secondary mx-auto mb-4" />
              <CardTitle>Documentação</CardTitle>
              <CardDescription>Manuais técnicos completos</CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="text-center">
              <Phone className="h-12 w-12 text-accent mx-auto mb-4" />
              <CardTitle>Suporte Técnico</CardTitle>
              <CardDescription>Fale com nossa equipe</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* FAQ Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Perguntas Frequentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="border-b pb-4">
                <h3 className="font-semibold mb-2">Como acessar meu perfil médico?</h3>
                <p className="text-muted-foreground">Clique no botão "Acessar Sistema" no topo da página e selecione "Paciente". Use suas credenciais para fazer login.</p>
              </div>
              <div className="border-b pb-4">
                <h3 className="font-semibold mb-2">Como agendar uma consulta?</h3>
                <p className="text-muted-foreground">Após fazer login, acesse a seção "Consultas" e escolha a especialidade, unidade de saúde e horário disponível.</p>
              </div>
              <div className="border-b pb-4">
                <h3 className="font-semibold mb-2">Posso visualizar meus exames pelo sistema?</h3>
                <p className="text-muted-foreground">Sim, todos os seus exames ficam disponíveis na seção "Exames" do seu perfil, com interpretação automática dos resultados.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-primary" />
                Contato por Telefone
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="font-medium">Suporte Geral</p>
                  <p className="text-muted-foreground">(12) 3642-1234</p>
                </div>
                <div>
                  <p className="font-medium">Emergências</p>
                  <p className="text-muted-foreground">(12) 3642-5678</p>
                </div>
                <div>
                  <p className="font-medium">Horário de Atendimento</p>
                  <p className="text-muted-foreground">Segunda a Sexta: 8h às 18h</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-secondary" />
                Contato por Email
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="font-medium">Suporte Técnico</p>
                  <p className="text-muted-foreground">suporte@medwallet.com.br</p>
                </div>
                <div>
                  <p className="font-medium">Gestão Municipal</p>
                  <p className="text-muted-foreground">gestao@medwallet.com.br</p>
                </div>
                <div>
                  <p className="font-medium">Parcerias</p>
                  <p className="text-muted-foreground">parcerias@medwallet.com.br</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;