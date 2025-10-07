/**
 * Evolução de Glosas por Convênio - Com Projeções
 * Gráficos de histórico e projeção de melhorias
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine, Area, AreaChart } from 'recharts';
import { TrendingDown, DollarSign, Target, AlertCircle } from 'lucide-react';
import { conveniosAtivos } from '@/data/redeDorBarueri';

const OPMEEvolucaoGlosas = () => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  // Dados consolidados para gráfico comparativo
  const dadosComparativos = conveniosAtivos.map(conv => ({
    convenio: conv.nome.split(' ')[0],
    atual: conv.taxaGlosa,
    projetado: conv.taxaGlosa - conv.melhoriaEsperada,
    melhoria: conv.melhoriaEsperada,
    economia: conv.economiaProjetada
  }));

  // Economia total projetada
  const economiaTotalProjetada = conveniosAtivos.reduce((acc, conv) => acc + conv.economiaProjetada, 0);
  const melhoriaMediaEsperada = conveniosAtivos.reduce((acc, conv) => acc + conv.melhoriaEsperada, 0) / conveniosAtivos.length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Evolução de Glosas por Convênio</h1>
        <p className="text-muted-foreground">Histórico, situação atual e projeções com melhorias implementadas</p>
      </div>

      {/* KPIs de Economia */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-green-600">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Economia Total Projetada</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{formatCurrency(economiaTotalProjetada)}</div>
            <p className="text-xs text-muted-foreground mt-1">Por mês após implementação completa</p>
          </CardContent>
        </Card>

        <Card className="border-blue-600">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Melhoria Média Esperada</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">-{melhoriaMediaEsperada.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground mt-1">Pontos percentuais de redução</p>
          </CardContent>
        </Card>

        <Card className="border-purple-600">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Prazo de Implementação</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">6 meses</div>
            <p className="text-xs text-muted-foreground mt-1">Para atingir metas projetadas</p>
          </CardContent>
        </Card>
      </div>

      {/* Gráfico Comparativo - Atual vs Projetado */}
      <Card>
        <CardHeader>
          <CardTitle>Comparativo: Taxa de Glosa Atual vs Projetada</CardTitle>
          <CardDescription>Impacto das melhorias propostas por convênio</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={dadosComparativos}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="convenio" />
              <YAxis label={{ value: 'Taxa de Glosa (%)', angle: -90, position: 'insideLeft' }} />
              <Tooltip 
                formatter={(value: number, name: string) => {
                  if (name === 'economia') return [formatCurrency(value), 'Economia Mensal'];
                  return [`${value.toFixed(1)}%`, name === 'atual' ? 'Atual' : name === 'projetado' ? 'Projetado' : 'Melhoria'];
                }}
              />
              <Legend />
              <ReferenceLine y={5} stroke="#22c55e" strokeDasharray="3 3" label="Meta: 5%" />
              <Bar dataKey="atual" fill="#ef4444" name="Taxa Atual" />
              <Bar dataKey="projetado" fill="#22c55e" name="Taxa Projetada" />
            </BarChart>
          </ResponsiveContainer>

          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-600">
            <div className="flex items-start gap-3">
              <Target className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <div className="font-semibold text-blue-900 dark:text-blue-100">Análise Comparativa</div>
                <p className="text-sm text-blue-800 dark:text-blue-200 mt-1">
                  Bradesco apresenta maior potencial de melhoria (-7.5 pontos) com economia de R$ 487k/mês.
                  Todos os convênios podem atingir meta de 5% com implementação das ações recomendadas.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Gráficos Individuais por Convênio */}
      {conveniosAtivos.map((convenio) => {
        // Combinar histórico e projeção
        const dadosCompletos = [
          ...convenio.historicoGlosas.map(d => ({ ...d, tipo: 'Histórico' })),
          ...convenio.projecaoComMelhorias.map(d => ({ ...d, tipo: 'Projeção' }))
        ];

        const getStatusColor = () => {
          switch (convenio.status) {
            case 'critico': return 'bg-red-600';
            case 'atencao': return 'bg-yellow-600';
            case 'otimo': return 'bg-green-600';
            default: return 'bg-gray-600';
          }
        };

        const getStatusIcon = () => {
          switch (convenio.status) {
            case 'critico': return '🔴';
            case 'atencao': return '🟡';
            case 'otimo': return '🟢';
            default: return '⚪';
          }
        };

        return (
          <Card key={convenio.id} className="border-l-4" style={{ 
            borderLeftColor: convenio.status === 'critico' ? '#ef4444' : 
                            convenio.status === 'atencao' ? '#eab308' : '#22c55e' 
          }}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <span>{getStatusIcon()}</span>
                    {convenio.nome}
                  </CardTitle>
                  <CardDescription className="mt-1">{convenio.prioridade}</CardDescription>
                </div>
                <Badge className={getStatusColor()}>
                  {convenio.status.toUpperCase()}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="p-4 bg-red-50 dark:bg-red-950 rounded-lg">
                  <div className="text-sm text-muted-foreground">Taxa Atual</div>
                  <div className="text-2xl font-bold text-red-600">{convenio.taxaGlosa}%</div>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                  <div className="text-sm text-muted-foreground">Meta Projetada</div>
                  <div className="text-2xl font-bold text-green-600">
                    {(convenio.taxaGlosa - convenio.melhoriaEsperada).toFixed(1)}%
                  </div>
                </div>
                <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <div className="text-sm text-muted-foreground">Melhoria</div>
                  <div className="text-2xl font-bold text-blue-600">-{convenio.melhoriaEsperada}%</div>
                </div>
                <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                  <div className="text-sm text-muted-foreground">Economia/Mês</div>
                  <div className="text-xl font-bold text-purple-600">{formatCurrency(convenio.economiaProjetada)}</div>
                </div>
              </div>

              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={dadosCompletos}>
                  <defs>
                    <linearGradient id={`colorGlosa${convenio.id}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id={`colorProjecao${convenio.id}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis label={{ value: 'Taxa de Glosa (%)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip formatter={(value: number) => `${value.toFixed(1)}%`} />
                  <Legend />
                  <ReferenceLine y={5} stroke="#22c55e" strokeDasharray="3 3" label="Meta: 5%" />
                  <Area 
                    type="monotone" 
                    dataKey="glosa" 
                    stroke="#ef4444" 
                    fillOpacity={1} 
                    fill={`url(#colorGlosa${convenio.id})`}
                    name="Taxa de Glosa"
                  />
                </AreaChart>
              </ResponsiveContainer>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="p-3 border rounded-lg">
                  <div className="text-sm text-muted-foreground">Tendência Histórica (6 meses)</div>
                  <div className="flex items-center gap-2 mt-1">
                    <TrendingDown className="h-4 w-4 text-green-600" />
                    <span className="font-semibold text-green-600">
                      -{(convenio.historicoGlosas[0].glosa - convenio.taxaGlosa).toFixed(1)}%
                    </span>
                    <span className="text-xs text-muted-foreground">de melhoria</span>
                  </div>
                </div>
                <div className="p-3 border rounded-lg">
                  <div className="text-sm text-muted-foreground">Projeção (6 meses)</div>
                  <div className="flex items-center gap-2 mt-1">
                    <TrendingDown className="h-4 w-4 text-blue-600" />
                    <span className="font-semibold text-blue-600">
                      -{convenio.melhoriaEsperada}%
                    </span>
                    <span className="text-xs text-muted-foreground">adicional</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-4 bg-muted rounded-lg">
                <div className="flex items-start gap-3">
                  <DollarSign className="h-5 w-5 text-green-600 mt-0.5" />
                  <div className="flex-1">
                    <div className="font-semibold">Impacto Financeiro Projetado</div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Redução de {convenio.melhoriaEsperada} pontos percentuais na taxa de glosa resultará em economia de{' '}
                      <span className="font-semibold text-green-600">{formatCurrency(convenio.economiaProjetada)}/mês</span>
                      {' '}ou{' '}
                      <span className="font-semibold text-green-600">{formatCurrency(convenio.economiaProjetada * 12)}/ano</span>.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}

      {/* Resumo de Implementação */}
      <Card className="border-orange-600">
        <CardHeader className="bg-orange-50 dark:bg-orange-950">
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-orange-600" />
            Plano de Implementação - Timeline
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-24 flex-shrink-0">
                <Badge className="bg-red-600">Mês 1-2</Badge>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold">Fase 1: Validações Críticas</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Implementar validações automáticas de vínculos, TUSS e Registro Anvisa.
                  Impacto: -3.5% de glosa (R$ 420k economia/mês)
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-24 flex-shrink-0">
                <Badge className="bg-yellow-600">Mês 3-4</Badge>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold">Fase 2: Melhorias por Convênio</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Implementar Passo 3 Bradesco, Biblioteca 3 Marcas Unimed, Integração GNDI.
                  Impacto adicional: -2.8% de glosa (R$ 680k economia/mês)
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-24 flex-shrink-0">
                <Badge className="bg-green-600">Mês 5-6</Badge>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold">Fase 3: Otimização e Consolidação</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Padronização TISSNET Hapvida, Otimização SulAmérica, Ajustes finos.
                  Impacto final: -2.0% de glosa (R$ 340k economia/mês)
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-600">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-green-900 dark:text-green-100">Resultado Total Esperado</div>
                <p className="text-sm text-green-800 dark:text-green-200 mt-1">
                  Redução de 8.3% para 4.5% em 6 meses
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-green-600">{formatCurrency(economiaTotalProjetada)}</div>
                <div className="text-sm text-muted-foreground">Economia mensal</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OPMEEvolucaoGlosas;
