import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus,
  Target,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  Heart,
  Activity,
  Shield,
  Download,
  Calendar
} from 'lucide-react';

const IndicadoresDesempenhoPage = () => {
  const indicadoresESF = [
    { nome: 'Cobertura de Atenção Básica', valor: '85%', meta: '80%', status: 'success', tendencia: 'up' },
    { nome: 'Consultas Médicas per capita', valor: '2.8', meta: '2.5', status: 'success', tendencia: 'up' },
    { nome: 'Tempo Médio de Espera', valor: '12 dias', meta: '15 dias', status: 'success', tendencia: 'down' },
    { nome: 'Taxa de Absenteísmo', valor: '18%', meta: '15%', status: 'warning', tendencia: 'up' },
    { nome: 'Satisfação do Usuário', valor: '78%', meta: '75%', status: 'success', tendencia: 'stable' },
    { nome: 'Resolutividade na APS', valor: '82%', meta: '80%', status: 'success', tendencia: 'up' }
  ];

  const indicadoresMultiprofissionais = [
    { nome: 'Cobertura NASF', valor: '65%', meta: '70%', status: 'warning', tendencia: 'up' },
    { nome: 'Atendimentos Fisioterapia', valor: '1.2k', meta: '1.0k', status: 'success', tendencia: 'up' },
    { nome: 'Consultas Nutrição', valor: '850', meta: '800', status: 'success', tendencia: 'up' },
    { nome: 'Apoio Matricial Realizado', valor: '92%', meta: '85%', status: 'success', tendencia: 'stable' },
    { nome: 'Tempo Espera Especialidade', valor: '45 dias', meta: '30 dias', status: 'error', tendencia: 'up' },
    { nome: 'Taxa de Encaminhamentos', valor: '15%', meta: '20%', status: 'success', tendencia: 'down' }
  ];

  const indicadoresSaudeBucal = [
    { nome: 'Cobertura Saúde Bucal', valor: '68%', meta: '65%', status: 'success', tendencia: 'up' },
    { nome: 'Primeira Consulta Odontológica', valor: '1.8k', meta: '1.5k', status: 'success', tendencia: 'up' },
    { nome: 'Procedimentos Preventivos', valor: '78%', meta: '75%', status: 'success', tendencia: 'stable' },
    { nome: 'Urgências Odontológicas', valor: '185', meta: '200', status: 'success', tendencia: 'down' },
    { nome: 'Tratamentos Concluídos', valor: '82%', meta: '80%', status: 'success', tendencia: 'up' },
    { nome: 'CEO - Especialidades', valor: '95%', meta: '90%', status: 'success', tendencia: 'stable' }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'error': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getTendenciaIcon = (tendencia: string) => {
    switch (tendencia) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-600" />;
      default: return <Minus className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800 border-green-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'error': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const IndicadorCard = ({ indicador, index }: { indicador: any, index: number }) => (
    <Card key={index} className="transition-all hover:shadow-md">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-medium text-sm leading-tight">{indicador.nome}</h3>
          <div className="flex items-center gap-1">
            {getStatusIcon(indicador.status)}
            {getTendenciaIcon(indicador.tendencia)}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Resultado</p>
            <p className="text-lg font-bold text-primary">{indicador.valor}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Meta</p>
            <p className="text-lg font-medium">{indicador.meta}</p>
          </div>
        </div>
        
        <div className="mt-3">
          <Badge className={`text-xs ${getStatusColor(indicador.status)}`}>
            {indicador.status === 'success' ? 'Meta Atingida' : 
             indicador.status === 'warning' ? 'Atenção' : 'Crítico'}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );

  const calcularResumo = (indicadores: any[]) => {
    const naMeta = indicadores.filter(i => i.status === 'success').length;
    const atencao = indicadores.filter(i => i.status === 'warning').length;
    const critico = indicadores.filter(i => i.status === 'error').length;
    
    return { naMeta, atencao, critico, total: indicadores.length };
  };

  const resumoESF = calcularResumo(indicadoresESF);
  const resumoMulti = calcularResumo(indicadoresMultiprofissionais);
  const resumoBucal = calcularResumo(indicadoresSaudeBucal);

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Indicadores de Desempenho da APS</h1>
            <p className="text-muted-foreground mt-2">
              Monitoramento dos indicadores de qualidade e desempenho da Atenção Primária à Saúde
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              Período: Jan-Dez 2024
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>

        {/* Cards de Resumo Geral */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Equipes de Saúde da Família</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42</div>
              <p className="text-xs text-muted-foreground">Equipes ativas</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">População Coberta</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">168.5k</div>
              <p className="text-xs text-muted-foreground">85% da população</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Unidades Básicas</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">35</div>
              <p className="text-xs text-muted-foreground">UBS em funcionamento</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Qualidade Geral</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">Boa</div>
              <p className="text-xs text-muted-foreground">78% metas atingidas</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="esf" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="esf" className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Estratégia Saúde da Família
            </TabsTrigger>
            <TabsTrigger value="multiprofissional" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Equipes Multiprofissionais
            </TabsTrigger>
            <TabsTrigger value="saude-bucal" className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Saúde Bucal
            </TabsTrigger>
          </TabsList>

          <TabsContent value="esf" className="space-y-4">
            {/* Resumo ESF */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">{resumoESF.naMeta}</div>
                  <p className="text-xs text-muted-foreground">Metas Atingidas</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-yellow-600">{resumoESF.atencao}</div>
                  <p className="text-xs text-muted-foreground">Requer Atenção</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-red-600">{resumoESF.critico}</div>
                  <p className="text-xs text-muted-foreground">Situação Crítica</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold">{resumoESF.total}</div>
                  <p className="text-xs text-muted-foreground">Total de Indicadores</p>
                </CardContent>
              </Card>
            </div>

            {/* Indicadores ESF */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {indicadoresESF.map((indicador, index) => (
                <IndicadorCard key={index} indicador={indicador} index={index} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="multiprofissional" className="space-y-4">
            {/* Resumo Multiprofissional */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">{resumoMulti.naMeta}</div>
                  <p className="text-xs text-muted-foreground">Metas Atingidas</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-yellow-600">{resumoMulti.atencao}</div>
                  <p className="text-xs text-muted-foreground">Requer Atenção</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-red-600">{resumoMulti.critico}</div>
                  <p className="text-xs text-muted-foreground">Situação Crítica</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold">{resumoMulti.total}</div>
                  <p className="text-xs text-muted-foreground">Total de Indicadores</p>
                </CardContent>
              </Card>
            </div>

            {/* Indicadores Multiprofissionais */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {indicadoresMultiprofissionais.map((indicador, index) => (
                <IndicadorCard key={index} indicador={indicador} index={index} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="saude-bucal" className="space-y-4">
            {/* Resumo Saúde Bucal */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">{resumoBucal.naMeta}</div>
                  <p className="text-xs text-muted-foreground">Metas Atingidas</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-yellow-600">{resumoBucal.atencao}</div>
                  <p className="text-xs text-muted-foreground">Requer Atenção</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-red-600">{resumoBucal.critico}</div>
                  <p className="text-xs text-muted-foreground">Situação Crítica</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold">{resumoBucal.total}</div>
                  <p className="text-xs text-muted-foreground">Total de Indicadores</p>
                </CardContent>
              </Card>
            </div>

            {/* Indicadores Saúde Bucal */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {indicadoresSaudeBucal.map((indicador, index) => (
                <IndicadorCard key={index} indicador={indicador} index={index} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Ações Prioritárias */}
        <Card>
          <CardHeader>
            <CardTitle>Ações Prioritárias Recomendadas</CardTitle>
            <CardDescription>
              Com base na análise dos indicadores, estas são as ações prioritárias para melhoria do desempenho
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h3 className="font-medium text-red-600">Críticas - Ação Imediata</h3>
                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-sm">
                    <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span>Reduzir tempo de espera para especialidades (Meta: 30 dias)</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className="font-medium text-yellow-600">Melhorias - Prazo 90 dias</h3>
                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-sm">
                    <Clock className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <span>Aumentar cobertura NASF para 70%</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <Clock className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <span>Reduzir taxa de absenteísmo para 15%</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2 mt-6">
              <Button size="sm">
                <Target className="w-4 h-4 mr-2" />
                Gerar Plano de Ação
              </Button>
              <Button variant="outline" size="sm">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Configurar Alertas
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default IndicadoresDesempenhoPage;