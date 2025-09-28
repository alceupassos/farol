import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, FileText, Search, Download, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { DataTable } from '@/components/data-table';

// Dados de exemplo - substituir por chamada à API real
const contratosData = [
  {
    id: 'CT2023001',
    nome: 'Contrato de Prestação de Serviços',
    tipo: 'Contrato',
    inicio: '01/01/2023',
    termino: '31/12/2023',
    valor: 'R$ 1.200.000,00',
    status: 'Vigente',
  },
  {
    id: 'AD2023001',
    nome: 'Aditivo 01/2023',
    tipo: 'Aditivo',
    inicio: '01/07/2023',
    termino: '31/12/2023',
    valor: 'R$ 150.000,00',
    status: 'Vigente',
  },
];

const columns = [
  {
    accessorKey: 'id',
    header: 'Número',
  },
  {
    accessorKey: 'nome',
    header: 'Descrição',
  },
  {
    accessorKey: 'tipo',
    header: 'Tipo',
  },
  {
    accessorKey: 'inicio',
    header: 'Início',
  },
  {
    accessorKey: 'termino',
    header: 'Término',
  },
  {
    accessorKey: 'valor',
    header: 'Valor',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: (row: any) => (
      <Badge variant={row.status === 'Vigente' ? 'default' : 'secondary'}>
        {row.status}
      </Badge>
    ),
  },
];

export default function OSSContratosAditivosPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Gestão de Contratos e Aditivos</h1>
          <p className="text-muted-foreground">Gerencie os contratos e aditivos da OSS</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Novo Contrato/Aditivo
        </Button>
      </div>

      <Tabs defaultValue="ativos" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="ativos">Ativos</TabsTrigger>
            <TabsTrigger value="encerrados">Encerrados</TabsTrigger>
            <TabsTrigger value="todos">Todos</TabsTrigger>
          </TabsList>
          
          <div className="flex space-x-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar contratos..."
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

        <TabsContent value="ativos" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Contratos Ativos</CardTitle>
                  <CardDescription>
                    Lista de contratos e aditivos em vigência
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <FileText className="mr-2 h-4 w-4" />
                    Relatório
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={columns}
                data={contratosData}
                emptyMessage="Nenhum contrato ativo encontrado"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="encerrados">
          <Card>
            <CardHeader>
              <CardTitle>Contratos Encerrados</CardTitle>
              <CardDescription>
                Histórico de contratos e aditivos finalizados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <p>Nenhum contrato encerrado encontrado</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="todos">
          <Card>
            <CardHeader>
              <CardTitle>Todos os Contratos e Aditivos</CardTitle>
              <CardDescription>
                Visão completa de todos os registros
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <p>Nenhum registro encontrado</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
