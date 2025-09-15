import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Database, 
  Shield, 
  Eye, 
  Lock, 
  Users, 
  FileText, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  Download,
  Settings,
  BarChart3,
  Key,
  Globe,
  Server,
  UserCheck,
  Activity
} from 'lucide-react';

const GovernancaDadosPage = () => {
  const sistemasIntegrados = [
    { nome: 'SIS Prenatal', status: 'ativo', conformidade: 95, ultimaAtualizacao: '2h', registros: '12.5k' },
    { nome: 'e-SUS APS', status: 'ativo', conformidade: 98, ultimaAtualizacao: '1h', registros: '456k' },
    { nome: 'SISVAN', status: 'ativo', conformidade: 88, ultimaAtualizacao: '4h', registros: '8.2k' },
    { nome: 'SI-PNI', status: 'ativo', conformidade: 92, ultimaAtualizacao: '2h', registros: '89k' },
    { nome: 'SINAN', status: 'ativo', conformidade: 85, ultimaAtualizacao: '6h', registros: '2.1k' },
    { nome: 'SIM', status: 'ativo', conformidade: 90, ultimaAtualizacao: '12h', registros: '892' }
  ];

  const politicasPrivacidade = [
    { nome: 'LGPD - Conformidade Geral', status: 'conforme', cobertura: 100, ultimaRevisao: '15 dias' },
    { nome: 'Consentimento de Dados', status: 'conforme', cobertura: 95, ultimaRevisao: '7 dias' },
    { nome: 'Direito ao Esquecimento', status: 'em_implementacao', cobertura: 75, ultimaRevisao: '30 dias' },
    { nome: 'Portabilidade de Dados', status: 'conforme', cobertura: 90, ultimaRevisao: '20 dias' },
    { nome: 'Notificação de Vazamentos', status: 'conforme', cobertura: 100, ultimaRevisao: '10 dias' }
  ];

  const acessosUsuarios = [
    { perfil: 'Gestores Municipais', usuarios: 25, permissoes: 'Admin', ultimoAcesso: 'Agora', status: 'ativo' },
    { perfil: 'Profissionais de Saúde', usuarios: 234, permissoes: 'Leitura/Escrita', ultimoAcesso: '5 min', status: 'ativo' },
    { perfil: 'Agentes Comunitários', usuarios: 156, permissoes: 'Leitura', ultimoAcesso: '2h', status: 'ativo' },
    { perfil: 'Auditores', usuarios: 8, permissoes: 'Auditoria', ultimoAcesso: '1 dia', status: 'ativo' },
    { perfil: 'Analistas de Dados', usuarios: 12, permissoes: 'Analytics', ultimoAcesso: '30 min', status: 'ativo' }
  ];

  const qualidadeDados = {
    completude: 94,
    consistencia: 89,
    precisao: 92,
    atualidade: 96,
    validadeLogica: 88,
    duplicatas: 3
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'conforme':
      case 'ativo':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'em_implementacao':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'nao_conforme':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'conforme':
      case 'ativo':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'em_implementacao':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'nao_conforme':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getConformidadeColor = (valor: number) => {
    if (valor >= 90) return 'text-green-600';
    if (valor >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Governança de Dados de Saúde</h1>
            <p className="text-muted-foreground mt-2">
              Gestão, qualidade e conformidade dos dados de saúde municipal
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Relatório Conformidade
            </Button>
            <Button size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Configurações
            </Button>
          </div>
        </div>

        {/* Cards de Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sistemas Integrados</CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">6</div>
              <p className="text-xs text-muted-foreground">Todos ativos</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conformidade LGPD</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">92%</div>
              <p className="text-xs text-muted-foreground">Em conformidade</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Usuários Ativos</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">435</div>
              <p className="text-xs text-muted-foreground">5 perfis de acesso</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Qualidade dos Dados</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">92%</div>
              <p className="text-xs text-muted-foreground">Acima do esperado</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="sistemas" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="sistemas">Sistemas Integrados</TabsTrigger>
            <TabsTrigger value="privacidade">Privacidade e LGPD</TabsTrigger>
            <TabsTrigger value="acessos">Controle de Acesso</TabsTrigger>
            <TabsTrigger value="qualidade">Qualidade de Dados</TabsTrigger>
          </TabsList>

          <TabsContent value="sistemas" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Sistemas de Informação em Saúde</CardTitle>
                <CardDescription>
                  Status e conformidade dos sistemas integrados ao ambiente municipal
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sistemasIntegrados.map((sistema, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Server className="w-5 h-5 text-blue-600" />
                          <div>
                            <h3 className="font-medium">{sistema.nome}</h3>
                            <p className="text-sm text-muted-foreground">{sistema.registros} registros</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(sistema.status)}
                          <Badge className={getStatusColor(sistema.status)}>
                            {sistema.status === 'ativo' ? 'Operacional' : sistema.status}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Conformidade</p>
                          <div className="flex items-center gap-2">
                            <Progress value={sistema.conformidade} className="flex-1" />
                            <span className={`text-sm font-medium ${getConformidadeColor(sistema.conformidade)}`}>
                              {sistema.conformidade}%
                            </span>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Última Atualização</p>
                          <p className="font-medium">{sistema.ultimaAtualizacao} atrás</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Status da Conexão</p>
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-sm">Online</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacidade" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Conformidade com LGPD</CardTitle>
                <CardDescription>
                  Monitoramento das políticas de privacidade e proteção de dados pessoais
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {politicasPrivacidade.map((politica, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Shield className="w-5 h-5 text-blue-600" />
                          <div>
                            <h3 className="font-medium">{politica.nome}</h3>
                            <p className="text-sm text-muted-foreground">
                              Última revisão: {politica.ultimaRevisao} atrás
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(politica.status)}
                          <Badge className={getStatusColor(politica.status)}>
                            {politica.status === 'conforme' ? 'Conforme' : 
                             politica.status === 'em_implementacao' ? 'Em Implementação' : 'Não Conforme'}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <p className="text-sm text-muted-foreground mb-1">Cobertura</p>
                          <div className="flex items-center gap-2">
                            <Progress value={politica.cobertura} className="flex-1" />
                            <span className={`text-sm font-medium ${getConformidadeColor(politica.cobertura)}`}>
                              {politica.cobertura}%
                            </span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          Detalhes
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-5 h-5 text-blue-600" />
                    <h3 className="font-medium text-blue-900 dark:text-blue-100">Direitos dos Titulares</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-blue-800 dark:text-blue-200">Solicitações Atendidas (30 dias)</p>
                      <p className="font-medium">127 de 132 (96%)</p>
                    </div>
                    <div>
                      <p className="text-blue-800 dark:text-blue-200">Tempo Médio de Resposta</p>
                      <p className="font-medium">3.2 dias</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="acessos" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Controle de Acesso e Permissões</CardTitle>
                <CardDescription>
                  Gestão de usuários, perfis e permissões de acesso aos dados de saúde
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {acessosUsuarios.map((acesso, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <UserCheck className="w-5 h-5 text-green-600" />
                          <div>
                            <h3 className="font-medium">{acesso.perfil}</h3>
                            <p className="text-sm text-muted-foreground">
                              {acesso.usuarios} usuários ativos
                            </p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(acesso.status)}>
                          {acesso.status === 'ativo' ? 'Ativo' : acesso.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Nível de Permissão</p>
                          <p className="font-medium">{acesso.permissoes}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Último Acesso</p>
                          <p className="font-medium">{acesso.ultimoAcesso}</p>
                        </div>
                        <div className="flex justify-end">
                          <Button variant="outline" size="sm">
                            <Key className="w-4 h-4 mr-2" />
                            Gerenciar
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="qualidade" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Indicadores de Qualidade de Dados</CardTitle>
                <CardDescription>
                  Monitoramento da qualidade, consistência e integridade dos dados de saúde
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-blue-600" />
                      <h3 className="font-medium">Completude</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={qualidadeDados.completude} className="flex-1" />
                      <span className={`text-sm font-medium ${getConformidadeColor(qualidadeDados.completude)}`}>
                        {qualidadeDados.completude}%
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Campos obrigatórios preenchidos
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Activity className="w-5 h-5 text-green-600" />
                      <h3 className="font-medium">Consistência</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={qualidadeDados.consistencia} className="flex-1" />
                      <span className={`text-sm font-medium ${getConformidadeColor(qualidadeDados.consistencia)}`}>
                        {qualidadeDados.consistencia}%
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Dados sem contradições
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-purple-600" />
                      <h3 className="font-medium">Precisão</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={qualidadeDados.precisao} className="flex-1" />
                      <span className={`text-sm font-medium ${getConformidadeColor(qualidadeDados.precisao)}`}>
                        {qualidadeDados.precisao}%
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Dados corretos e exatos
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-orange-600" />
                      <h3 className="font-medium">Atualidade</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={qualidadeDados.atualidade} className="flex-1" />
                      <span className={`text-sm font-medium ${getConformidadeColor(qualidadeDados.atualidade)}`}>
                        {qualidadeDados.atualidade}%
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Dados atualizados recentemente
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-teal-600" />
                      <h3 className="font-medium">Validade Lógica</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={qualidadeDados.validadeLogica} className="flex-1" />
                      <span className={`text-sm font-medium ${getConformidadeColor(qualidadeDados.validadeLogica)}`}>
                        {qualidadeDados.validadeLogica}%
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Dados logicamente válidos
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                      <h3 className="font-medium">Duplicatas</h3>
                    </div>
                    <div className="text-2xl font-bold text-red-600">{qualidadeDados.duplicatas}%</div>
                    <p className="text-xs text-muted-foreground">
                      Registros duplicados identificados
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button>
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Relatório Detalhado
                  </Button>
                  <Button variant="outline">
                    <Settings className="w-4 h-4 mr-2" />
                    Configurar Alertas
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Alertas e Recomendações */}
        <Card>
          <CardHeader>
            <CardTitle>Alertas e Recomendações</CardTitle>
            <CardDescription>
              Ações recomendadas para melhoria da governança de dados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 border rounded-lg bg-yellow-50 dark:bg-yellow-950/20">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-yellow-900 dark:text-yellow-100">
                    Política de Direito ao Esquecimento
                  </h3>
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    Implementação em andamento - 75% concluído. Previsão de finalização em 15 dias.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 border rounded-lg bg-blue-50 dark:bg-blue-950/20">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-blue-900 dark:text-blue-100">
                    Backup e Recovery
                  </h3>
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    Todos os sistemas com backup automatizado. Último teste de recovery realizado com sucesso.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default GovernancaDadosPage;