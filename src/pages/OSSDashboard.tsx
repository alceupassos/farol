import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Target, 
  DollarSign, 
  AlertTriangle, 
  FileCheck, 
  Clock, 
  TrendingUp, 
  TrendingDown,
  Shield, 
  ThumbsUp, 
  RefreshCw,
  FileText,
  Activity,
  AlertCircle,
  Users,
  BarChart3,
  PieChart,
  Brain,
  Zap
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  PieChart as RechartsChart, 
  Pie, 
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

const OSSDashboard = () => {
  const { t } = useTranslation();

  // Dados mockados para demonstração
  const kpiData = {
    metasContratuais: { onTrack: 85, total: 12 },
    indiceGlosa: { valor: 245000, percentual: 3.2, recuperacao: 72 },
    rejeicaoAIH: { taxa: 8.5, topMotivos: ['Código inválido', 'Documentação incompleta', 'Prazo expirado'] },
    tempestividadeAudesp: { prazo: 98, erros: 2 },
    agingRepasses: { dias: 15, impacto60: 450000, impacto90: 780000 },
    conciliacao: { percentual: 96, excecoes: 3 },
    transparencia: { publicado: 94, pendentes: 4 },
    lgpd: { incidentes: 1, mttr: 4.5, revisao: 100 },
    nps: { score: 8.2, trend: 'up' },
    renovacao: { media: 78 },
    completudeBPA: { percentual: 93, reprocessos: 12 },
    indicadoresClinicos: { infeccao: 2.1, reinternacao: 4.3, eventos: 3 },
    pipeline: { novos: 3, expansao: 2, valor: 5200000 }
  };

  const getStatusColor = (value: number, thresholds: { good: number, warning: number }) => {
    if (value >= thresholds.good) return 'text-green-500';
    if (value >= thresholds.warning) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getStatusBadge = (value: number, thresholds: { good: number, warning: number }) => {
    if (value >= thresholds.good) return <Badge className="bg-green-500">Ótimo</Badge>;
    if (value >= thresholds.warning) return <Badge className="bg-yellow-500">Atenção</Badge>;
    return <Badge className="bg-red-500">Crítico</Badge>;
  };

  return (
    <MainLayout>
      <div className="space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Gestão Contratual/OSS
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Beneficência Hospitalar de Cesário Lange (BHCL)
            </p>
            <div className="flex gap-4 mt-2 text-sm text-gray-500">
              <span>CNPJ: 50.351.626/0001-10</span>
              <span>CNES: 2082780</span>
              <span>CEBAS: Vigente</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <FileText className="h-4 w-4 mr-2" />
              Gerar Prestação Audesp
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Reprocessar AIH/APAC
            </Button>
            <Button variant="default" size="sm">
              <Brain className="h-4 w-4 mr-2" />
              Oráculo IA
            </Button>
          </div>
        </div>

        {/* Cockpit C-Level - Grid de KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* 1. Metas Contratuais */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Metas Contratuais</CardTitle>
                <Target className="h-4 w-4 text-gray-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {kpiData.metasContratuais.onTrack}%
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {kpiData.metasContratuais.total} contratos on track
              </p>
              {getStatusBadge(kpiData.metasContratuais.onTrack, { good: 90, warning: 75 })}
            </CardContent>
          </Card>

          {/* 2. Índice de Glosa */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Índice de Glosa</CardTitle>
                <DollarSign className="h-4 w-4 text-gray-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {kpiData.indiceGlosa.percentual}%
              </div>
              <p className="text-xs text-gray-500 mt-1">
                R$ {(kpiData.indiceGlosa.valor / 1000).toFixed(0)}k glosado
              </p>
              <div className="text-xs text-green-500 mt-1">
                {kpiData.indiceGlosa.recuperacao}% recuperado
              </div>
            </CardContent>
          </Card>

          {/* 3. Rejeição AIH/APAC */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Rejeição AIH/APAC</CardTitle>
                <AlertTriangle className="h-4 w-4 text-gray-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {kpiData.rejeicaoAIH.taxa}%
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Top: {kpiData.rejeicaoAIH.topMotivos[0]}
              </p>
              {getStatusBadge(100 - kpiData.rejeicaoAIH.taxa, { good: 95, warning: 90 })}
            </CardContent>
          </Card>

          {/* 4. Tempestividade Audesp */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Tempestividade Audesp</CardTitle>
                <Clock className="h-4 w-4 text-gray-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {kpiData.tempestividadeAudesp.prazo}%
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {kpiData.tempestividadeAudesp.erros} erros de schema
              </p>
              {getStatusBadge(kpiData.tempestividadeAudesp.prazo, { good: 100, warning: 95 })}
            </CardContent>
          </Card>

          {/* 5. Aging de Repasses */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Aging de Repasses</CardTitle>
                <Clock className="h-4 w-4 text-gray-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {kpiData.agingRepasses.dias} dias
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Impacto 60d: R$ {(kpiData.agingRepasses.impacto60 / 1000).toFixed(0)}k
              </p>
              {getStatusBadge(30 - kpiData.agingRepasses.dias, { good: 15, warning: 0 })}
            </CardContent>
          </Card>

          {/* 6. Conciliação */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Conciliação</CardTitle>
                <FileCheck className="h-4 w-4 text-gray-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {kpiData.conciliacao.percentual}%
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {kpiData.conciliacao.excecoes} exceções
              </p>
              {getStatusBadge(kpiData.conciliacao.percentual, { good: 100, warning: 95 })}
            </CardContent>
          </Card>

          {/* 7. Transparência Ativa */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Transparência Ativa</CardTitle>
                <FileText className="h-4 w-4 text-gray-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {kpiData.transparencia.publicado}%
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {kpiData.transparencia.pendentes} documentos pendentes
              </p>
              {getStatusBadge(kpiData.transparencia.publicado, { good: 95, warning: 90 })}
            </CardContent>
          </Card>

          {/* 8. LGPD Compliance */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">LGPD Compliance</CardTitle>
                <Shield className="h-4 w-4 text-gray-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {kpiData.lgpd.revisao}%
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {kpiData.lgpd.incidentes} incidente, MTTR: {kpiData.lgpd.mttr}h
              </p>
              {getStatusBadge(kpiData.lgpd.revisao, { good: 100, warning: 95 })}
            </CardContent>
          </Card>

          {/* 9. NPS Governamental */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">NPS Governamental</CardTitle>
                <ThumbsUp className="h-4 w-4 text-gray-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold flex items-center">
                {kpiData.nps.score}
                {kpiData.nps.trend === 'up' ? 
                  <TrendingUp className="h-4 w-4 text-green-500 ml-2" /> :
                  <TrendingDown className="h-4 w-4 text-red-500 ml-2" />
                }
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Score médio contratantes
              </p>
              {getStatusBadge(kpiData.nps.score, { good: 8, warning: 7 })}
            </CardContent>
          </Card>

          {/* 10. Probabilidade de Renovação */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Prob. Renovação</CardTitle>
                <RefreshCw className="h-4 w-4 text-gray-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {kpiData.renovacao.media}%
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Média dos contratos ativos
              </p>
              <div className="text-xs text-blue-500 mt-1 flex items-center">
                <Brain className="h-3 w-3 mr-1" />
                Análise IA disponível
              </div>
            </CardContent>
          </Card>

          {/* 11. Completude BPA/APAC */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Completude BPA</CardTitle>
                <FileCheck className="h-4 w-4 text-gray-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {kpiData.completudeBPA.percentual}%
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {kpiData.completudeBPA.reprocessos} reprocessos
              </p>
              {getStatusBadge(kpiData.completudeBPA.percentual, { good: 95, warning: 90 })}
            </CardContent>
          </Card>

          {/* 12. Indicadores Clínicos */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Indicadores Clínicos</CardTitle>
                <Activity className="h-4 w-4 text-gray-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <div className="text-xs">
                  <span className="text-gray-500">Infecção:</span>
                  <span className="font-bold ml-1">{kpiData.indicadoresClinicos.infeccao}%</span>
                </div>
                <div className="text-xs">
                  <span className="text-gray-500">Reinternação:</span>
                  <span className="font-bold ml-1">{kpiData.indicadoresClinicos.reinternacao}%</span>
                </div>
                <div className="text-xs">
                  <span className="text-gray-500">Eventos:</span>
                  <span className="font-bold ml-1">{kpiData.indicadoresClinicos.eventos}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Heatmap de Risco e Pipeline */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Heatmap de Risco 5x5 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertCircle className="h-5 w-5 mr-2" />
                Matriz de Risco 5x5
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 gap-1">
                {[...Array(25)].map((_, i) => {
                  const row = Math.floor(i / 5);
                  const col = i % 5;
                  const risk = (5 - row) * (col + 1);
                  let color = 'bg-green-200';
                  if (risk > 15) color = 'bg-red-400';
                  else if (risk > 10) color = 'bg-orange-400';
                  else if (risk > 5) color = 'bg-yellow-300';
                  
                  return (
                    <div
                      key={i}
                      className={`${color} h-12 flex items-center justify-center text-xs font-bold rounded`}
                    >
                      {risk}
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 space-y-1">
                <div className="flex items-center text-xs">
                  <div className="w-3 h-3 bg-red-400 rounded mr-2"></div>
                  <span>Crítico: Audesp, TISS</span>
                </div>
                <div className="flex items-center text-xs">
                  <div className="w-3 h-3 bg-orange-400 rounded mr-2"></div>
                  <span>Alto: SIH/SIA, Transparência</span>
                </div>
                <div className="flex items-center text-xs">
                  <div className="w-3 h-3 bg-yellow-300 rounded mr-2"></div>
                  <span>Médio: LGPD</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pipeline de Contratos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2" />
                Pipeline de Contratos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Novos Contratos</span>
                  <Badge>{kpiData.pipeline.novos}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Em Expansão</span>
                  <Badge>{kpiData.pipeline.expansao}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Valor Total Pipeline</span>
                  <span className="font-bold">R$ {(kpiData.pipeline.valor / 1000000).toFixed(1)}M</span>
                </div>
                <div className="pt-4 border-t">
                  <Button className="w-full" variant="outline">
                    <Zap className="h-4 w-4 mr-2" />
                    Simular ROI com IA
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Ações Rápidas */}
        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Button size="sm" variant="outline">Gerar Prestação Audesp</Button>
              <Button size="sm" variant="outline">Recurso de Glosa</Button>
              <Button size="sm" variant="outline">Reprocessar AIH/APAC</Button>
              <Button size="sm" variant="outline">Publicar Pacote Transparência</Button>
              <Button size="sm" variant="outline">Revisar Acessos LGPD</Button>
              <Button size="sm" variant="default">
                <Brain className="h-4 w-4 mr-2" />
                Consultar Oráculo IA
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default OSSDashboard;
