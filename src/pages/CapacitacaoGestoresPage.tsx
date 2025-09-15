import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GraduationCap, Users, BookOpen, Award, Clock, Target } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';

const CapacitacaoGestoresPage = () => {
  // Mock data baseado nos dados de rotatividade gestora
  const estatisticasGestores = {
    substituicoesMensais: 300, // 300 secretários substituídos por mês
    semExperiencia: 54, // 54% nunca ocuparam cargos de gestão
    percentualOrcamento: 25, // 20-30% do orçamento municipal
    meta2025: 'Capacitar 3.600 gestores até 2025'
  };

  const trilhasCapacitacao = [
    {
      nome: 'Fundamentos da Gestão SUS',
      duracao: '40h',
      modulos: 8,
      concluidos: 1250,
      meta: 2000,
      nivel: 'básico',
      status: 'disponível'
    },
    {
      nome: 'Financiamento e Orçamento',
      duracao: '60h',
      modulos: 12,
      concluidos: 850,
      meta: 1500,
      nivel: 'intermediário',
      status: 'disponível'
    },
    {
      nome: 'Indicadores de Desempenho APS',
      duracao: '30h',
      modulos: 6,
      concluidos: 920,
      meta: 1800,
      nivel: 'intermediário',
      status: 'novo'
    },
    {
      nome: 'Gestão de Dados e Informação',
      duracao: '45h',
      modulos: 9,
      concluidos: 650,
      meta: 1200,
      nivel: 'avançado',
      status: 'disponível'
    },
    {
      nome: 'Judicialização da Saúde',
      duracao: '35h',
      modulos: 7,
      concluidos: 420,
      meta: 1000,
      nivel: 'avançado',
      status: 'novo'
    },
    {
      nome: 'Regionalização e CIR',
      duracao: '25h',
      modulos: 5,
      concluidos: 380,
      meta: 800,
      nivel: 'especialização',
      status: 'disponível'
    }
  ];

  const manuaisOperacionais = [
    { titulo: 'Manual de Transição de Gestão', paginas: 45, downloads: 2340, status: 'atualizado' },
    { titulo: 'Guia dos 15 Indicadores APS', paginas: 32, downloads: 1890, status: 'novo' },
    { titulo: 'Checklist de 90 dias', paginas: 12, downloads: 3420, status: 'atualizado' },
    { titulo: 'Protocolo de Judicialização', paginas: 28, downloads: 1560, status: 'atualizado' },
    { titulo: 'Manual de Territorialização', paginas: 38, downloads: 1120, status: 'novo' }
  ];

  const getNivelColor = (nivel: string) => {
    switch (nivel) {
      case 'básico': return 'bg-green-100 text-green-800';
      case 'intermediário': return 'bg-blue-100 text-blue-800';
      case 'avançado': return 'bg-purple-100 text-purple-800';
      case 'especialização': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'novo': return 'bg-red-100 text-red-800';
      case 'atualizado': return 'bg-green-100 text-green-800';
      case 'disponível': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Programa Gestores SUS</h1>
          <p className="text-muted-foreground">
            Capacitação continuada para secretários municipais de saúde
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Users className="h-4 w-4" />
                Rotatividade Mensal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">
                {estatisticasGestores.substituicoesMensais}
              </div>
              <p className="text-xs text-muted-foreground">secretários substituídos</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Sem Experiência</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">
                {estatisticasGestores.semExperiencia}%
              </div>
              <p className="text-xs text-muted-foreground">nunca ocuparam cargo</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Responsabilidade</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">
                {estatisticasGestores.percentualOrcamento}%
              </div>
              <p className="text-xs text-muted-foreground">do orçamento municipal</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Meta 2025</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">3.600</div>
              <p className="text-xs text-muted-foreground">gestores capacitados</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Trilhas de Capacitação
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {trilhasCapacitacao.map((trilha, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-medium">{trilha.nome}</h4>
                      <div className="flex gap-1">
                        <Badge variant="outline" className={getNivelColor(trilha.nivel)}>
                          {trilha.nivel}
                        </Badge>
                        {trilha.status === 'novo' && (
                          <Badge className={getStatusColor(trilha.status)}>
                            Novo!
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {trilha.duracao}
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-3 w-3" />
                        {trilha.modulos} módulos
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progresso</span>
                        <span>{trilha.concluidos}/{trilha.meta}</span>
                      </div>
                      <Progress 
                        value={(trilha.concluidos / trilha.meta) * 100} 
                        className="h-2"
                      />
                    </div>
                    
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" className="flex-1">Acessar Trilha</Button>
                      <Button size="sm" variant="outline">Detalhes</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Manuais Operacionais
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {manuaisOperacionais.map((manual, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{manual.titulo}</h4>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-muted-foreground">
                          {manual.paginas} páginas
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {manual.downloads} downloads
                        </span>
                        <Badge className={getStatusColor(manual.status)}>
                          {manual.status}
                        </Badge>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">Download</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Checklist de Ações Imediatas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <h4 className="font-medium text-red-800 mb-2">Primeiros 30 dias</h4>
                  <ul className="text-sm text-red-700 space-y-1">
                    <li>☐ Diagnóstico dos 15 indicadores APS</li>
                    <li>☐ Revisar orçamento e passivos judiciais</li>
                    <li>☐ Mapear equipes e capacidades</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="font-medium text-yellow-800 mb-2">60 dias</h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>☐ Plano de ação para indicadores críticos</li>
                    <li>☐ Iniciar capacitação da equipe</li>
                    <li>☐ Participar das reuniões CIR</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-medium text-green-800 mb-2">90 dias</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>☐ Governança de dados estabelecida</li>
                    <li>☐ Protocolos de judicialização ativos</li>
                    <li>☐ Monitoramento contínuo implantado</li>
                  </ul>
                </div>
                
                <Button className="w-full">Baixar Checklist Completo</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Próximas Capacitações</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="presencial" className="w-full">
              <TabsList>
                <TabsTrigger value="presencial">Presencial</TabsTrigger>
                <TabsTrigger value="online">Online</TabsTrigger>
                <TabsTrigger value="regional">Regional</TabsTrigger>
              </TabsList>
              
              <TabsContent value="presencial" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Workshop Novo Financiamento</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      15-16 de Janeiro • São Paulo
                    </p>
                    <Badge variant="outline">40 vagas disponíveis</Badge>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Seminário Gestão de Dados</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      22-23 de Janeiro • Brasília
                    </p>
                    <Badge variant="outline">25 vagas disponíveis</Badge>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="online" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Webinar Indicadores APS</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Todas as terças • 14h às 16h
                    </p>
                    <Badge variant="outline">Inscrições abertas</Badge>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Curso EAD Transição</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Autoinstrucional • 20h
                    </p>
                    <Badge variant="outline">Disponível</Badge>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="regional" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">COSEMS São Paulo</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Encontro Mensal • Última sexta
                    </p>
                    <Badge variant="outline">Próximo: 31/01</Badge>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Região Sudeste</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Fórum Trimestral • CIR Regional
                    </p>
                    <Badge variant="outline">Próximo: 15/02</Badge>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default CapacitacaoGestoresPage;