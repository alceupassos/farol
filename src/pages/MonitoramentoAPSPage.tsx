import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart2, TrendingUp, TrendingDown, Minus, AlertTriangle, CheckCircle } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';

const MonitoramentoAPSPage = () => {
  // Mock data baseado nos 15 indicadores do novo cofinanciamento
  const indicadoresESF = [
    { nome: 'Cobertura ESF', valor: 85.2, meta: 90, status: 'warning', tendencia: 'up' },
    { nome: 'Consultas Médicas APS', valor: 92.4, meta: 85, status: 'success', tendencia: 'up' },
    { nome: 'Territorialização', valor: 78.9, meta: 80, status: 'warning', tendencia: 'stable' },
    { nome: 'Vínculo com APS', valor: 88.7, meta: 85, status: 'success', tendencia: 'up' },
    { nome: 'Acolhimento Demanda Espontânea', valor: 76.3, meta: 80, status: 'warning', tendencia: 'down' }
  ];

  const indicadoresMultiprofissionais = [
    { nome: 'NASF Ativo', valor: 72.1, meta: 75, status: 'warning', tendencia: 'up' },
    { nome: 'Saúde Mental APS', valor: 65.8, meta: 70, status: 'error', tendencia: 'stable' },
    { nome: 'Reabilitação', valor: 83.4, meta: 80, status: 'success', tendencia: 'up' },
    { nome: 'Atividade Física', valor: 59.2, meta: 65, status: 'error', tendencia: 'down' },
    { nome: 'Grupos Educativos', valor: 81.7, meta: 75, status: 'success', tendencia: 'up' }
  ];

  const indicadoresSaudeBucal = [
    { nome: 'Cobertura Saúde Bucal', valor: 67.5, meta: 70, status: 'warning', tendencia: 'up' },
    { nome: 'Procedimentos Preventivos', valor: 89.3, meta: 85, status: 'success', tendencia: 'up' },
    { nome: 'Tratamentos Concluídos', valor: 74.8, meta: 80, status: 'warning', tendencia: 'stable' },
    { nome: 'Urgências Odontológicas', valor: 91.2, meta: 90, status: 'success', tendencia: 'up' },
    { nome: 'Supervisão Escovação', valor: 82.6, meta: 75, status: 'success', tendencia: 'up' }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'error': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return null;
    }
  };

  const getTendenciaIcon = (tendencia: string) => {
    switch (tendencia) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-red-500" />;
      case 'stable': return <Minus className="h-4 w-4 text-gray-500" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const IndicadorCard = ({ indicador }: { indicador: any }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-medium text-sm">{indicador.nome}</h4>
          <div className="flex items-center gap-1">
            {getStatusIcon(indicador.status)}
            {getTendenciaIcon(indicador.tendencia)}
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-2">
          <span className="text-2xl font-bold">{indicador.valor}%</span>
          <Badge variant="outline" className={getStatusColor(indicador.status)}>
            Meta: {indicador.meta}%
          </Badge>
        </div>
        
        <Progress 
          value={indicador.valor} 
          className="h-2"
        />
        
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>0%</span>
          <span>100%</span>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Monitoramento APS</h1>
          <p className="text-muted-foreground">
            Acompanhamento dos 15 indicadores do novo cofinanciamento federal (Portaria 3.493/2024)
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-green-600">Indicadores no Alvo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">7/15</div>
              <p className="text-xs text-muted-foreground">46.7% dos indicadores</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-yellow-600">Atenção Necessária</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">6/15</div>
              <p className="text-xs text-muted-foreground">40% dos indicadores</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-red-600">Críticos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">2/15</div>
              <p className="text-xs text-muted-foreground">13.3% dos indicadores</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart2 className="h-5 w-5" />
              Indicadores por Bloco
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="esf" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="esf">ESF/APS (5)</TabsTrigger>
                <TabsTrigger value="multi">Multiprofissionais (5)</TabsTrigger>
                <TabsTrigger value="bucal">Saúde Bucal (5)</TabsTrigger>
              </TabsList>
              
              <TabsContent value="esf" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {indicadoresESF.map((indicador, index) => (
                    <IndicadorCard key={index} indicador={indicador} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="multi" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {indicadoresMultiprofissionais.map((indicador, index) => (
                    <IndicadorCard key={index} indicador={indicador} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="bucal" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {indicadoresSaudeBucal.map((indicador, index) => (
                    <IndicadorCard key={index} indicador={indicador} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ações Prioritárias</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <h4 className="font-medium text-red-800 mb-2">Urgente - 2º Quadrimestre 2025</h4>
              <ul className="text-sm text-red-700 space-y-1">
                <li>• Fortalecer atividades de saúde mental na APS</li>
                <li>• Ampliar programa de atividade física</li>
              </ul>
            </div>
            
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="font-medium text-yellow-800 mb-2">Atenção - Próximos 90 dias</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Melhorar territorialização das equipes ESF</li>
                <li>• Fortalecer acolhimento à demanda espontânea</li>
                <li>• Aumentar cobertura de saúde bucal</li>
              </ul>
            </div>
            
            <div className="flex gap-2">
              <Button>Exportar Relatório</Button>
              <Button variant="outline">Configurar Alertas</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default MonitoramentoAPSPage;