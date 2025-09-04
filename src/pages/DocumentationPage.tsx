import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Code, 
  Download, 
  ExternalLink, 
  FileText, 
  Globe, 
  Smartphone,
  Database,
  Shield,
  Zap
} from 'lucide-react';

const DocumentationPage = () => {
  const apiEndpoints = [
    { method: 'GET', endpoint: '/api/patients', description: 'Listar pacientes' },
    { method: 'POST', endpoint: '/api/appointments', description: 'Criar agendamento' },
    { method: 'GET', endpoint: '/api/exams/{id}', description: 'Obter resultado de exame' },
    { method: 'PUT', endpoint: '/api/patients/{id}', description: 'Atualizar dados do paciente' }
  ];

  const integrationGuides = [
    { title: 'Integração com Sistema Municipal', icon: Globe, description: 'Como integrar com sistemas existentes da prefeitura' },
    { title: 'API de Prontuário Eletrônico', icon: FileText, description: 'Documentação completa da API de prontuários' },
    { title: 'Webhooks e Notificações', icon: Zap, description: 'Configure notificações em tempo real' },
    { title: 'Segurança e Autenticação', icon: Shield, description: 'Implementação de OAuth2 e JWT' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/10 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Documentação Técnica</h1>
          <p className="text-muted-foreground">Guias completos para desenvolvedores e administradores do sistema</p>
        </div>

        {/* Quick Access Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="text-center">
              <BookOpen className="h-10 w-10 text-primary mx-auto mb-3" />
              <CardTitle className="text-lg">Guia do Usuário</CardTitle>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="text-center">
              <Code className="h-10 w-10 text-secondary mx-auto mb-3" />
              <CardTitle className="text-lg">API Reference</CardTitle>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="text-center">
              <Database className="h-10 w-10 text-accent mx-auto mb-3" />
              <CardTitle className="text-lg">Admin Guide</CardTitle>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="text-center">
              <Smartphone className="h-10 w-10 text-primary mx-auto mb-3" />
              <CardTitle className="text-lg">Mobile SDK</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Main Documentation Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="api">API</TabsTrigger>
            <TabsTrigger value="integration">Integração</TabsTrigger>
            <TabsTrigger value="downloads">Downloads</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Primeiros Passos</CardTitle>
                  <CardDescription>Como começar a usar o Sistema de Saúde Pública</CardDescription>
                </CardHeader>
                <CardContent>
                  <ol className="list-decimal list-inside space-y-3 text-sm">
                    <li>Faça o cadastro inicial do município</li>
                    <li>Configure as unidades de saúde</li>
                    <li>Importe ou cadastre os profissionais</li>
                    <li>Configure os protocolos de atendimento</li>
                    <li>Treine os usuários no sistema</li>
                  </ol>
                  <Button className="w-full mt-4" variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    Baixar Guia Completo
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Arquitetura do Sistema</CardTitle>
                  <CardDescription>Entenda como o Sistema de Saúde Pública funciona</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-primary rounded-full"></div>
                      <span className="text-sm">Frontend React + TypeScript</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-secondary rounded-full"></div>
                      <span className="text-sm">Backend Supabase + PostgreSQL</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-accent rounded-full"></div>
                      <span className="text-sm">AI/ML Google Gemini</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-muted-foreground rounded-full"></div>
                      <span className="text-sm">Blockchain para auditoria</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="api" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Endpoints da API</CardTitle>
                <CardDescription>Lista completa dos endpoints disponíveis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {apiEndpoints.map((endpoint, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Badge variant={endpoint.method === 'GET' ? 'default' : endpoint.method === 'POST' ? 'secondary' : 'outline'}>
                          {endpoint.method}
                        </Badge>
                        <code className="text-sm font-mono bg-muted px-2 py-1 rounded">
                          {endpoint.endpoint}
                        </code>
                        <span className="text-sm text-muted-foreground">{endpoint.description}</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integration" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {integrationGuides.map((guide, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <guide.icon className="h-5 w-5 mr-2 text-primary" />
                      {guide.title}
                    </CardTitle>
                    <CardDescription>{guide.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">
                      <FileText className="h-4 w-4 mr-2" />
                      Ver Documentação
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="downloads" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Manual do Administrador</CardTitle>
                  <CardDescription>Guia completo para gestores</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <p>• Configuração inicial</p>
                    <p>• Gerenciamento de usuários</p>
                    <p>• Relatórios e analytics</p>
                    <p>• Backup e segurança</p>
                  </div>
                  <Button className="w-full mt-4">
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>SDK Mobile</CardTitle>
                  <CardDescription>Para desenvolvimento de apps</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <p>• React Native SDK</p>
                    <p>• Flutter Plugin</p>
                    <p>• iOS Swift Library</p>
                    <p>• Android Kotlin Library</p>
                  </div>
                  <Button className="w-full mt-4">
                    <Download className="h-4 w-4 mr-2" />
                    Download SDK
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Postman Collection</CardTitle>
                  <CardDescription>Para testes de API</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <p>• Todos os endpoints</p>
                    <p>• Exemplos de requests</p>
                    <p>• Variáveis de ambiente</p>
                    <p>• Testes automatizados</p>
                  </div>
                  <Button className="w-full mt-4">
                    <Download className="h-4 w-4 mr-2" />
                    Download Collection
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DocumentationPage;