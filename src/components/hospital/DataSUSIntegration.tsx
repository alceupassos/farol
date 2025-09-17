import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Database, 
  Activity, 
  FileText, 
  DollarSign, 
  Users, 
  Calendar,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Building,
  Stethoscope,
  Heart
} from 'lucide-react';
import { dataSUSService, type CNESEstabelecimento, type SIAProducao, type SIHInternacao, type TISSGuia } from '@/services/datasus-mcp-server';

interface DataSUSData {
  estabelecimento: CNESEstabelecimento | null;
  producaoAmb: SIAProducao[];
  internacoes: SIHInternacao[];
  guiasTiss: TISSGuia[];
  kpis: {
    faturamentoSUS: number;
    faturamentoTISS: number;
    faturamentoTotal: number;
    internacoes: number;
    procedimentosAmb: number;
    mediaPermancencia: number;
    taxaOcupacao: number;
    guiasAutorizadas: number;
  };
}

const DataSUSIntegration: React.FC = () => {
  const [data, setData] = useState<DataSUSData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDataSUSData();
  }, []);

  const loadDataSUSData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Consulta dados da Santa Casa (CNES: 2077469)
      const dashboardData = await dataSUSService.getDashboardData('2077469');
      setData(dashboardData);
    } catch (err) {
      setError('Erro ao carregar dados do DATASUS');
      console.error('Erro DATASUS:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center space-x-2">
            <Database className="h-5 w-5 animate-spin" />
            <span>Carregando dados do DATASUS...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center space-x-2 text-red-600">
            <AlertCircle className="h-5 w-5" />
            <span>{error}</span>
            <Button onClick={loadDataSUSData} size="sm" variant="outline">
              Tentar Novamente
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!data) return null;

  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

  return (
    <div className="space-y-6">
      {/* Header com dados do estabelecimento */}
      {data.estabelecimento && (
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">{data.estabelecimento.nome}</CardTitle>
                <CardDescription className="text-blue-100">
                  CNES: {data.estabelecimento.cnes} | CNPJ: {data.estabelecimento.cnpj}
                </CardDescription>
              </div>
              <div className="text-right">
                <Badge variant="secondary" className="mb-2">
                  {data.estabelecimento.status}
                </Badge>
                <p className="text-sm text-blue-100">{data.estabelecimento.municipio}/{data.estabelecimento.uf}</p>
              </div>
            </div>
          </CardHeader>
        </Card>
      )}

      {/* KPIs do DATASUS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700">Faturamento SUS</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800">
              {formatCurrency(data.kpis.faturamentoSUS)}
            </div>
            <p className="text-xs text-green-600">SIA + SIH</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">Faturamento TISS</CardTitle>
            <FileText className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-800">
              {formatCurrency(data.kpis.faturamentoTISS)}
            </div>
            <p className="text-xs text-blue-600">Saúde Suplementar</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-700">Internações</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-800">{data.kpis.internacoes}</div>
            <p className="text-xs text-purple-600">Competência atual</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 border-orange-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-700">Média Permanência</CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-800">{data.kpis.mediaPermancencia} dias</div>
            <p className="text-xs text-orange-600">Por internação</p>
          </CardContent>
        </Card>
      </div>

      {/* Dados detalhados em cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CNES */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Building className="h-5 w-5" />
              <span>Dados CNES</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {data.estabelecimento && (
              <div className="space-y-2">
                <p className="text-sm"><strong>Razão Social:</strong> {data.estabelecimento.razaoSocial}</p>
                <p className="text-sm"><strong>Tipo:</strong> {data.estabelecimento.tipoUnidade}</p>
                <div className="grid grid-cols-2 gap-2 mt-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Leitos Total:</span>
                    <Badge variant="outline">{data.estabelecimento.leitos.total}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Leitos SUS:</span>
                    <Badge variant="secondary">{data.estabelecimento.leitos.sus}</Badge>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* SIA */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5" />
              <span>Produção SIA</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {data.producaoAmb.slice(0, 2).map((item, index) => (
                <div key={index} className="flex justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm">Proc: {item.procedimento}</span>
                  <span className="text-sm font-semibold">{formatCurrency(item.valorAprovado)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Botão para atualizar dados */}
      <div className="flex justify-center">
        <Button onClick={loadDataSUSData} disabled={loading}>
          <Database className="h-4 w-4 mr-2" />
          Atualizar Dados DATASUS
        </Button>
      </div>
    </div>
  );
};

export default DataSUSIntegration;
