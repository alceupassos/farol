/**
 * Dashboard Diretor Geral - Hospital Rede D'Or São Luiz Barueri
 * Indicadores realistas e completos para gestão executiva
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, TrendingDown, DollarSign, Users, Activity, 
  AlertTriangle, CheckCircle, Heart, Stethoscope, Shield,
  Clock, Target, Award, Building2
} from 'lucide-react';
import { hospitalConfig, indicadoresDiretorGeral, metasDiretorGeral, alertasCriticos } from '@/data/redeDorBarueri';

const RedeDOrDiretorDashboard = () => {
  const { financeiro, assistencial, qualidade, operacional, pessoas, opme } = indicadoresDiretorGeral;
  const metas = metasDiretorGeral;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const getStatusColor = (valor: number, meta: number, inverso = false) => {
    const diff = inverso ? meta - valor : valor - meta;
    const threshold = meta * 0.05; // 5% de tolerância
    
    if (diff >= 0) return 'text-green-600';
    if (Math.abs(diff) <= threshold) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Building2 className="h-8 w-8 text-primary" />
            Dashboard Diretor Geral
          </h1>
          <p className="text-muted-foreground mt-1">
            {hospitalConfig.nome} - {hospitalConfig.unidade}
          </p>
          <p className="text-sm text-muted-foreground">
            {hospitalConfig.acreditacao} | CNES: {hospitalConfig.cnes}
          </p>
        </div>
        <div className="text-right">
          <div className="text-sm text-muted-foreground">Capacidade Total</div>
          <div className="text-2xl font-bold">{hospitalConfig.leitos.total} leitos</div>
          <div className="text-sm">
            <span className="text-muted-foreground">Ocupação: </span>
            <span className={getStatusColor(hospitalConfig.leitos.ocupacao, 85)}>
              {hospitalConfig.leitos.ocupacao}%
            </span>
          </div>
        </div>
      </div>

      {/* Alertas Críticos */}
      {alertasCriticos.length > 0 && (
        <Card className="border-red-600">
          <CardHeader className="bg-red-50 dark:bg-red-950">
            <CardTitle className="flex items-center gap-2 text-red-900 dark:text-red-100">
              <AlertTriangle className="h-5 w-5" />
              Alertas Críticos ({alertasCriticos.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-3">
              {alertasCriticos.map((alerta) => (
                <div key={alerta.id} className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                  <div className={`mt-1 ${
                    alerta.severidade === 'alta' ? 'text-red-600' :
                    alerta.severidade === 'media' ? 'text-yellow-600' : 'text-blue-600'
                  }`}>
                    {alerta.severidade === 'alta' ? '🔴' : alerta.severidade === 'media' ? '🟡' : '🔵'}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">{alerta.titulo}</div>
                    <div className="text-sm text-muted-foreground">{alerta.descricao}</div>
                    <div className="text-sm mt-1">
                      <span className="text-red-600 font-medium">Impacto: </span>
                      {alerta.impacto}
                    </div>
                    <div className="text-sm">
                      <span className="text-blue-600 font-medium">Ação: </span>
                      {alerta.acao}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Indicadores Financeiros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-green-600" />
            Indicadores Financeiros
          </CardTitle>
          <CardDescription>Performance econômica e sustentabilidade</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
              <div className="text-sm text-muted-foreground">Faturamento Mensal</div>
              <div className="text-2xl font-bold text-green-600">{formatCurrency(financeiro.faturamentoMensal)}</div>
              <div className="text-xs text-muted-foreground mt-1">
                Meta: {formatCurrency(metas.financeiro.faturamentoMensal)}
              </div>
              <Progress 
                value={(financeiro.faturamentoMensal / metas.financeiro.faturamentoMensal) * 100} 
                className="h-1 mt-2" 
              />
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <div className="text-sm text-muted-foreground">Margem EBITDA</div>
              <div className="text-2xl font-bold text-blue-600">{financeiro.margemEbitda}%</div>
              <div className="text-xs text-muted-foreground mt-1">
                Meta: {metas.financeiro.margemEbitda}%
              </div>
              <Progress 
                value={(financeiro.margemEbitda / metas.financeiro.margemEbitda) * 100} 
                className="h-1 mt-2" 
              />
            </div>

            <div className="p-4 bg-red-50 dark:bg-red-950 rounded-lg">
              <div className="text-sm text-muted-foreground">Taxa de Glosa</div>
              <div className={`text-2xl font-bold ${getStatusColor(financeiro.glosaTotal, metas.financeiro.glosaTotal, true)}`}>
                {financeiro.glosaTotal}%
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Meta: &lt;{metas.financeiro.glosaTotal}%
              </div>
              <Progress 
                value={(metas.financeiro.glosaTotal / financeiro.glosaTotal) * 100} 
                className="h-1 mt-2" 
              />
            </div>

            <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
              <div className="text-sm text-muted-foreground">Inadimplência</div>
              <div className={`text-2xl font-bold ${getStatusColor(financeiro.inadimplencia, metas.financeiro.inadimplencia, true)}`}>
                {financeiro.inadimplencia}%
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Meta: &lt;{metas.financeiro.inadimplencia}%
              </div>
              <Progress 
                value={(metas.financeiro.inadimplencia / financeiro.inadimplencia) * 100} 
                className="h-1 mt-2" 
              />
            </div>
          </div>

          <div className="mt-4 pt-4 border-t">
            <h4 className="font-semibold mb-3">Receita por Convênio</h4>
            <div className="space-y-2">
              {Object.entries(financeiro.receitaConvenios).map(([convenio, percentual]) => (
                <div key={convenio} className="flex items-center gap-3">
                  <div className="w-32 text-sm capitalize">{convenio}</div>
                  <Progress value={percentual} className="flex-1 h-2" />
                  <div className="w-16 text-right text-sm font-medium">{percentual}%</div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Indicadores Assistenciais */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-blue-600" />
            Indicadores Assistenciais
          </CardTitle>
          <CardDescription>Volume e qualidade do atendimento</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-muted rounded-lg">
              <Users className="h-6 w-6 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">{assistencial.atendimentosMes.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Atendimentos/Mês</div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <Heart className="h-6 w-6 mx-auto mb-2 text-red-600" />
              <div className="text-2xl font-bold">{assistencial.internacoesMes.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Internações/Mês</div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <Stethoscope className="h-6 w-6 mx-auto mb-2 text-green-600" />
              <div className="text-2xl font-bold">{assistencial.cirurgiasMes}</div>
              <div className="text-sm text-muted-foreground">Cirurgias/Mês</div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <Target className="h-6 w-6 mx-auto mb-2 text-purple-600" />
              <div className={`text-2xl font-bold ${getStatusColor(assistencial.satisfacaoPaciente, metas.assistencial.satisfacaoPaciente)}`}>
                {assistencial.satisfacaoPaciente}
              </div>
              <div className="text-sm text-muted-foreground">NPS Paciente</div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <div className="p-3 border rounded-lg">
              <div className="text-sm text-muted-foreground">Taxa Ocupação</div>
              <div className={`text-xl font-bold ${getStatusColor(assistencial.taxaOcupacao, metas.assistencial.taxaOcupacao)}`}>
                {assistencial.taxaOcupacao}%
              </div>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="text-sm text-muted-foreground">Tempo Permanência</div>
              <div className="text-xl font-bold">{assistencial.tempoMedioPermanencia}d</div>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="text-sm text-muted-foreground">Taxa Reinternação</div>
              <div className="text-xl font-bold">{assistencial.taxaReinternacao}%</div>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="text-sm text-muted-foreground">Tempo Espera PS</div>
              <div className={`text-xl font-bold ${getStatusColor(assistencial.tempoEsperaPS, metas.assistencial.tempoEsperaPS, true)}`}>
                {assistencial.tempoEsperaPS}min
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Indicadores de Qualidade */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-purple-600" />
            Indicadores de Qualidade e Segurança
          </CardTitle>
          <CardDescription>Acreditações e conformidade</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg text-center">
              <Award className="h-8 w-8 mx-auto mb-2 text-purple-600" />
              <div className="font-semibold text-purple-900 dark:text-purple-100">{qualidade.acreditacaoONA}</div>
              <div className="text-sm text-purple-700 dark:text-purple-300">Acreditação ONA</div>
            </div>
            <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg text-center">
              <CheckCircle className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <div className="font-semibold text-blue-900 dark:text-blue-100">{qualidade.certificacaoJCI}</div>
              <div className="text-sm text-blue-700 dark:text-blue-300">Certificação JCI</div>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg text-center">
              <Target className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <div className="text-2xl font-bold text-green-900 dark:text-green-100">{qualidade.conformidadeProtocolos}%</div>
              <div className="text-sm text-green-700 dark:text-green-300">Conformidade Protocolos</div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-3 border rounded-lg">
              <div className="text-sm text-muted-foreground">Infecção Hospitalar</div>
              <div className={`text-lg font-bold ${getStatusColor(qualidade.infeccaoHospitalar, metas.qualidade.infeccaoHospitalar, true)}`}>
                {qualidade.infeccaoHospitalar}%
              </div>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="text-sm text-muted-foreground">Quedas</div>
              <div className="text-lg font-bold">{qualidade.quedas}/1000</div>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="text-sm text-muted-foreground">Lesão Pressão</div>
              <div className="text-lg font-bold">{qualidade.lesaoPressao}%</div>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="text-sm text-muted-foreground">Erros Medicação</div>
              <div className={`text-lg font-bold ${getStatusColor(qualidade.errosMedicacao, metas.qualidade.errosMedicacao, true)}`}>
                {qualidade.errosMedicacao}/1000
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Indicadores OPME */}
      <Card className="border-orange-600">
        <CardHeader className="bg-orange-50 dark:bg-orange-950">
          <CardTitle className="flex items-center gap-2 text-orange-900 dark:text-orange-100">
            <AlertTriangle className="h-5 w-5 text-orange-600" />
            Indicadores OPME - Atenção Necessária
          </CardTitle>
          <CardDescription className="text-orange-700 dark:text-orange-300">Gestão de Órteses, Próteses e Materiais Especiais</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-red-50 dark:bg-red-950 rounded-lg">
              <div className="text-sm text-red-700 dark:text-red-300">Taxa Glosa OPME</div>
              <div className="text-2xl font-bold text-red-600">{opme.taxaGlosa}%</div>
              <div className="text-xs mt-1 text-red-700 dark:text-red-300">Meta: &lt;{metas.opme.taxaGlosa}%</div>
              <Badge className="mt-2 bg-red-600">🔴 Crítico</Badge>
            </div>
            <div className="p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
              <div className="text-sm text-yellow-800 dark:text-yellow-200">Compliance TISS</div>
              <div className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">{opme.complianceTISS}%</div>
              <div className="text-xs mt-1 text-yellow-800 dark:text-yellow-200">Meta: {metas.opme.complianceTISS}%</div>
              <Badge className="mt-2 bg-yellow-600">⚠️ Atenção</Badge>
            </div>
            <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
              <div className="text-sm text-orange-800 dark:text-orange-200">Rastreabilidade UDI</div>
              <div className="text-2xl font-bold text-orange-700 dark:text-orange-300">{opme.rastreabilidadeUDI}%</div>
              <div className="text-xs mt-1 text-orange-800 dark:text-orange-200">Meta: {metas.opme.rastreabilidadeUDI}%</div>
              <Badge className="mt-2 bg-orange-600">🔴 Crítico</Badge>
            </div>
            <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <div className="text-sm text-blue-800 dark:text-blue-200">Tempo Autorização</div>
              <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">{opme.tempoMedioAutorizacao}d</div>
              <div className="text-xs mt-1 text-blue-800 dark:text-blue-200">Meta: {metas.opme.tempoMedioAutorizacao}d</div>
              <Badge className="mt-2 bg-blue-600">⚠️ Atenção</Badge>
            </div>
          </div>

          <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg border-2 border-yellow-600">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div className="flex-1">
                <div className="font-semibold text-yellow-900 dark:text-yellow-100">Ação Recomendada</div>
                <p className="text-sm text-yellow-800 dark:text-yellow-200 mt-1">
                  Acesse o módulo OPME para análise detalhada e implementação de melhorias. 
                  Potencial de economia: R$ 348.600/mês com redução de glosas.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Indicadores de Pessoas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-indigo-600" />
            Indicadores de Pessoas
          </CardTitle>
          <CardDescription>Gestão de talentos e clima organizacional</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold">{pessoas.totalColaboradores}</div>
              <div className="text-sm text-muted-foreground">Total Colaboradores</div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold">{pessoas.medicos}</div>
              <div className="text-sm text-muted-foreground">Médicos</div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold">{pessoas.enfermeiros}</div>
              <div className="text-sm text-muted-foreground">Enfermeiros</div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold">{pessoas.turnover}%</div>
              <div className="text-sm text-muted-foreground">Turnover</div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold">{pessoas.satisfacaoColaboradores}</div>
              <div className="text-sm text-muted-foreground">Satisfação</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RedeDOrDiretorDashboard;
