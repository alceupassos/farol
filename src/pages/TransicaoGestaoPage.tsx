import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RefreshCw, Calendar, CheckCircle, Clock, Users, FileText } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';

const TransicaoGestaoPage = () => {
  // Mock data baseado no período de transição 2024-2025
  const estatisticasTransicao = {
    previsaoRenovacao: 40, // 30-50% das secretarias
    diasTransicao: 90, // período crítico
    municipiosEmTransicao: 1890, // estimativa baseada na rotatividade
    prazoCritico: '31 de março de 2025' // prazo para não perder recursos
  };

  const cronograma90Dias = [
    {
      periodo: '1-30 dias',
      titulo: 'Diagnóstico e Mapeamento',
      progresso: 85,
      status: 'em-andamento',
      tarefas: [
        { nome: 'Levantamento dos 15 indicadores APS', concluida: true },
        { nome: 'Diagnóstico orçamentário e passivos', concluida: true },
        { nome: 'Mapeamento de equipes e capacidades', concluida: true },
        { nome: 'Inventário de demandas judiciais', concluida: false }
      ]
    },
    {
      periodo: '31-60 dias',
      titulo: 'Planejamento e Estruturação',
      progresso: 60,
      status: 'em-andamento',
      tarefas: [
        { nome: 'Plano de ação para indicadores críticos', concluida: true },
        { nome: 'Estruturação da governança de dados', concluida: true },
        { nome: 'Agenda de capacitação da equipe', concluida: false },
        { nome: 'Participação em reuniões CIR', concluida: false }
      ]
    },
    {
      periodo: '61-90 dias',
      titulo: 'Implementação e Monitoramento',
      progresso: 25,
      status: 'pendente',
      tarefas: [
        { nome: 'Implementação de rotinas de monitoramento', concluida: false },
        { nome: 'Protocolos de judicialização ativos', concluida: false },
        { nome: 'Sistema de acompanhamento contínuo', concluida: false },
        { nome: 'Relatório de 90 dias para COSEMS', concluida: false }
      ]
    }
  ];

  const manuaisTransicao = [
    {
      nome: 'Manual de Transição SUS 2025',
      versao: '3.1',
      paginas: 68,
      downloads: 4230,
      categoria: 'essencial',
      descricao: 'Guia completo para novos secretários municipais'
    },
    {
      nome: 'Checklist dos 90 Dias Críticos',
      versao: '2.0',
      paginas: 15,
      downloads: 3890,
      categoria: 'operacional',
      descricao: 'Lista de verificação para os primeiros 3 meses'
    },
    {
      nome: 'Guia do Novo Cofinanciamento',
      versao: '1.5',
      paginas: 42,
      downloads: 2560,
      categoria: 'financeiro',
      descricao: 'Como navegar a Portaria 3.493/2024'
    },
    {
      nome: 'Protocolo de Continuidade',
      versao: '1.2',
      paginas: 28,
      downloads: 1780,
      categoria: 'institucional',
      descricao: 'Garantindo a continuidade dos serviços'
    }
  ];

  const proximosEventos = [
    {
      data: '15 Jan 2025',
      evento: 'Webinar: Transição de Gestão SUS',
      horario: '14h às 16h',
      vagas: 500,
      inscritos: 387,
      tipo: 'online'
    },
    {
      data: '22-23 Jan 2025',
      evento: 'Workshop Presencial - São Paulo',
      horario: '8h às 17h',
      vagas: 80,
      inscritos: 75,
      tipo: 'presencial'
    },
    {
      data: '29 Jan 2025',
      evento: 'Mesa Redonda CONASEMS',
      horario: '9h às 12h',
      vagas: 200,
      inscritos: 156,
      tipo: 'híbrido'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'em-andamento': return 'bg-blue-100 text-blue-800';
      case 'pendente': return 'bg-gray-100 text-gray-800';
      case 'concluido': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoriaColor = (categoria: string) => {
    switch (categoria) {
      case 'essencial': return 'bg-red-100 text-red-800';
      case 'operacional': return 'bg-blue-100 text-blue-800';
      case 'financeiro': return 'bg-green-100 text-green-800';
      case 'institucional': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'online': return '💻';
      case 'presencial': return '🏢';
      case 'híbrido': return '🔄';
      default: return '📅';
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Transição de Gestão 2024-2025</h1>
          <p className="text-muted-foreground">
            Ferramentas e apoio para novos gestores municipais de saúde
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                Renovação Prevista
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">
                {estatisticasTransicao.previsaoRenovacao}%
              </div>
              <p className="text-xs text-muted-foreground">das secretarias municipais</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Período Crítico</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">
                {estatisticasTransicao.diasTransicao}
              </div>
              <p className="text-xs text-muted-foreground">dias para estruturação</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Em Transição</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">
                {estatisticasTransicao.municipiosEmTransicao}
              </div>
              <p className="text-xs text-muted-foreground">municípios estimados</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Prazo Limite</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold text-red-600">
                31/Mar
              </div>
              <p className="text-xs text-muted-foreground">para não perder recursos</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Cronograma de 90 Dias
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {cronograma90Dias.map((fase, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-medium">{fase.periodo}</h4>
                      <p className="text-sm text-muted-foreground">{fase.titulo}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(fase.status)}>
                        {fase.status}
                      </Badge>
                      <span className="text-sm font-medium">{fase.progresso}%</span>
                    </div>
                  </div>
                  
                  <Progress value={fase.progresso} className="mb-4" />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {fase.tarefas.map((tarefa, tIndex) => (
                      <div key={tIndex} className="flex items-center gap-2 text-sm">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                          tarefa.concluida ? 'bg-green-500' : 'bg-gray-300'
                        }`}>
                          {tarefa.concluida && <CheckCircle className="h-3 w-3 text-white" />}
                        </div>
                        <span className={tarefa.concluida ? 'line-through text-muted-foreground' : ''}>
                          {tarefa.nome}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Manuais de Transição
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {manuaisTransicao.map((manual, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium">{manual.nome}</h4>
                      <Badge className={getCategoriaColor(manual.categoria)}>
                        {manual.categoria}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">
                      {manual.descricao}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>v{manual.versao}</span>
                        <span>{manual.paginas} páginas</span>
                        <span>{manual.downloads} downloads</span>
                      </div>
                      <Button size="sm" variant="outline">Download</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Próximos Eventos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {proximosEventos.map((evento, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-sm">{evento.evento}</h4>
                        <p className="text-xs text-muted-foreground">
                          {evento.data} • {evento.horario}
                        </p>
                      </div>
                      <span className="text-lg">{getTipoIcon(evento.tipo)}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-muted-foreground">
                        <span className="font-medium">{evento.inscritos}</span> de {evento.vagas} vagas
                      </div>
                      <Button size="sm">Inscrever-se</Button>
                    </div>
                    
                    <Progress 
                      value={(evento.inscritos / evento.vagas) * 100} 
                      className="h-1 mt-2"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Suporte Especializado</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="conasems" className="w-full">
              <TabsList>
                <TabsTrigger value="conasems">CONASEMS</TabsTrigger>
                <TabsTrigger value="cosems">COSEMS</TabsTrigger>
                <TabsTrigger value="mentoria">Mentoria</TabsTrigger>
              </TabsList>
              
              <TabsContent value="conasems" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Central de Apoio</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Suporte técnico direto para novos gestores
                    </p>
                    <p className="text-sm font-medium">📞 (61) 3364-2100</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Portal do Gestor</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Plataforma com recursos e materiais exclusivos
                    </p>
                    <Button size="sm" variant="outline">Acessar Portal</Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="cosems" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">COSEMS Estadual</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Apoio regional personalizado por estado
                    </p>
                    <Button size="sm" variant="outline">Encontrar COSEMS</Button>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Reuniões Regionais</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Networking e troca de experiências
                    </p>
                    <Button size="sm" variant="outline">Ver Agenda</Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="mentoria" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Programa de Mentoria</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Acompanhamento de gestores experientes
                    </p>
                    <Button size="sm" variant="outline">Solicitar Mentor</Button>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Grupos de Estudo</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Aprendizado colaborativo entre pares
                    </p>
                    <Button size="sm" variant="outline">Participar</Button>
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

export default TransicaoGestaoPage;