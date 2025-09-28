import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { PlusCircle, Search, Download, Filter, BarChart2, Users, MessageSquare, Star } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { DataTable } from '@/components/data-table';
import { ColumnDef } from '@tanstack/react-table';

interface SatisfacaoData {
  id: string;
  data: string;
  tipo: string;
  respondentes: number;
  nps: number;
  status: 'Aberto' | 'Finalizado';
}

interface CellProps {
  row: {
    original: SatisfacaoData;
  };
}

// Dados de exemplo - substituir por chamada à API real
const satisfacaoData: SatisfacaoData[] = [
  {
    id: 'NPS-001',
    data: '15/03/2024',
    tipo: 'Pesquisa de Satisfação',
    respondentes: 42,
    nps: 72,
    status: 'Aberto',
  },
  {
    id: 'NPS-002',
    data: '01/03/2024',
    tipo: 'Avaliação de Atendimento',
    respondentes: 128,
    nps: 85,
    status: 'Finalizado',
  },
  {
    id: 'NPS-003',
    data: '15/02/2024',
    tipo: 'Pesquisa de Satisfação',
    respondentes: 95,
    nps: 68,
    status: 'Finalizado',
  },
];

const columns: ColumnDef<SatisfacaoData>[] = [
  {
    accessorKey: 'id',
    header: 'ID da Pesquisa',
  },
  {
    accessorKey: 'data',
    header: 'Data',
  },
  {
    accessorKey: 'tipo',
    header: 'Tipo',
  },
  {
    accessorKey: 'respondentes',
    header: 'Respondentes',
  },
  {
    accessorKey: 'nps',
    header: 'NPS',
    cell: ({ row }: CellProps) => (
      <div className="flex items-center">
        <div className="w-16 bg-gray-200 rounded-full h-2.5 mr-2">
          <div 
            className="bg-green-500 h-2.5 rounded-full" 
            style={{ width: `${row.original.nps}%` }}
          />
        </div>
        <span>{row.original.nps}</span>
      </div>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }: CellProps) => (
      <span 
        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
          row.original.status === 'Finalizado' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-yellow-100 text-yellow-800'
        }`}
      >
        {row.original.status}
      </span>
    ),
  },
];

export default function OSSSatisfacaoUsuarioPage() {
  const { t } = useTranslation();

  // Calcular NPS médio
  const npsMedio = Math.round(
    satisfacaoData.reduce((acc, curr) => acc + curr.nps, 0) / satisfacaoData.length
  );

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Satisfação do Usuário</h1>
          <p className="text-muted-foreground">Acompanhe e gerencie a satisfação dos usuários</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nova Pesquisa
        </Button>
      </div>

      {/* Cards de Métricas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">NPS Atual</CardTitle>
            <BarChart2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{npsMedio}</div>
            <p className="text-xs text-muted-foreground">
              {npsMedio >= 70 ? 'Excelente' : npsMedio >= 50 ? 'Bom' : 'Necessita melhorias'}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Pesquisas</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{satisfacaoData.length}</div>
            <p className="text-xs text-muted-foreground">
              {satisfacaoData.filter(item => item.status === 'Finalizado').length} finalizadas
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Respondentes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {satisfacaoData.reduce((acc, curr) => acc + curr.respondentes, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Média de {Math.round(satisfacaoData.reduce((acc, curr) => acc + curr.respondentes, 0) / satisfacaoData.length)} por pesquisa
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Satisfação Média</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2/5</div>
            <p className="text-xs text-muted-foreground">
              Baseado em 265 avaliações
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pesquisas" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="pesquisas">Pesquisas</TabsTrigger>
            <TabsTrigger value="relatorios">Relatórios</TabsTrigger>
            <TabsTrigger value="configuracoes">Configurações</TabsTrigger>
          </TabsList>
          
          <div className="flex space-x-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar pesquisas..."
                className="pl-8 w-[200px] lg:w-[300px]"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <TabsContent value="pesquisas" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Pesquisas de Satisfação</CardTitle>
                  <CardDescription>
                    Gerencie as pesquisas de satisfação dos usuários
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Exportar
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={columns}
                data={satisfacaoData}
                emptyMessage="Nenhuma pesquisa encontrada"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="relatorios">
          <Card>
            <CardHeader>
              <CardTitle>Relatórios de Satisfação</CardTitle>
              <CardDescription>
                Visualize relatórios detalhados de satisfação do usuário
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <p>Selecione um período para gerar o relatório</p>
                <div className="mt-4 flex justify-center space-x-4">
                  <Button variant="outline">Últimos 30 dias</Button>
                  <Button variant="outline">Últimos 90 dias</Button>
                  <Button variant="outline">Personalizado</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="configuracoes">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Pesquisa</CardTitle>
              <CardDescription>
                Configure as opções de pesquisa de satisfação
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Frequência das Pesquisas</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Defina com que frequência as pesquisas de satisfação são enviadas aos usuários.
                  </p>
                  <div className="flex items-center space-x-4">
                    <Button variant="outline">Mensal</Button>
                    <Button variant="outline">Trimestral</Button>
                    <Button variant="outline">Personalizado</Button>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Modelos de Pesquisa</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Gerencie os modelos de pesquisa disponíveis.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 border rounded">
                      <div>
                        <p className="font-medium">Pesquisa de Satisfação Padrão</p>
                        <p className="text-sm text-muted-foreground">10 perguntas • NPS + perguntas abertas</p>
                      </div>
                      <Button variant="ghost" size="sm">Editar</Button>
                    </div>
                    <Button variant="ghost" className="w-full justify-start">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Adicionar novo modelo
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
