/**
 * Dashboard Principal OPME - Visão 360°
 * Hospital Rede D'Or São Luiz - Barueri
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, CheckCircle, TrendingDown, TrendingUp, Clock, Shield } from 'lucide-react';

const OPMEDashboard = () => {
  const indicadores = {
    taxaGlosaGeral: 8.3,
    complianceTISS: 87,
    slaRN259: 94,
    rastreabilidadeUDI: 45,
    registroAnvisa: 91,
    tempoMedioAutorizacao: 6.2,
    retrabalho: 14
  };

  const metas = {
    taxaGlosaGeral: 5,
    complianceTISS: 100,
    slaRN259: 95,
    rastreabilidadeUDI: 100,
    registroAnvisa: 100,
    tempoMedioAutorizacao: 5,
    retrabalho: 10
  };

  const getStatusColor = (valor: number, meta: number, inverso = false) => {
    const diff = inverso ? meta - valor : valor - meta;
    if (diff >= 0) return 'text-green-600';
    if (Math.abs(diff) <= 5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusBadge = (valor: number, meta: number, inverso = false) => {
    const diff = inverso ? meta - valor : valor - meta;
    if (diff >= 0) return <Badge className="bg-green-600">✅ META</Badge>;
    if (Math.abs(diff) <= 5) return <Badge className="bg-yellow-600">⚠️ ATENÇÃO</Badge>;
    return <Badge className="bg-red-600">🔴 CRÍTICO</Badge>;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Painel Geral OPME - Visão 360°</h1>
        <p className="text-muted-foreground">Hospital Rede D'Or São Luiz - Barueri</p>
      </div>

      {/* Indicadores Consolidados */}
      <Card>
        <CardHeader>
          <CardTitle>Indicadores Gerais de Performance - OPME</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Taxa de Glosa */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium">Taxa de Glosa Geral:</span>
              <div className="flex items-center gap-2">
                <span className={`text-2xl font-bold ${getStatusColor(indicadores.taxaGlosaGeral, metas.taxaGlosaGeral, true)}`}>
                  {indicadores.taxaGlosaGeral}%
                </span>
                {getStatusBadge(indicadores.taxaGlosaGeral, metas.taxaGlosaGeral, true)}
                <span className="text-sm text-muted-foreground">META: &lt;{metas.taxaGlosaGeral}%</span>
              </div>
            </div>
            <Progress value={(metas.taxaGlosaGeral / indicadores.taxaGlosaGeral) * 100} className="h-2" />
          </div>

          {/* Compliance TISS */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium">Compliance TISS:</span>
              <div className="flex items-center gap-2">
                <span className={`text-2xl font-bold ${getStatusColor(indicadores.complianceTISS, metas.complianceTISS)}`}>
                  {indicadores.complianceTISS}%
                </span>
                {getStatusBadge(indicadores.complianceTISS, metas.complianceTISS)}
                <span className="text-sm text-muted-foreground">META: {metas.complianceTISS}%</span>
              </div>
            </div>
            <Progress value={indicadores.complianceTISS} className="h-2" />
          </div>

          {/* SLA RN 259 */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium">SLA RN 259:</span>
              <div className="flex items-center gap-2">
                <span className={`text-2xl font-bold ${getStatusColor(indicadores.slaRN259, metas.slaRN259)}`}>
                  {indicadores.slaRN259}%
                </span>
                {getStatusBadge(indicadores.slaRN259, metas.slaRN259)}
                <span className="text-sm text-muted-foreground">META: &gt;{metas.slaRN259}%</span>
              </div>
            </div>
            <Progress value={indicadores.slaRN259} className="h-2" />
          </div>

          {/* Rastreabilidade UDI */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium">Rastreabilidade UDI:</span>
              <div className="flex items-center gap-2">
                <span className={`text-2xl font-bold ${getStatusColor(indicadores.rastreabilidadeUDI, metas.rastreabilidadeUDI)}`}>
                  {indicadores.rastreabilidadeUDI}%
                </span>
                {getStatusBadge(indicadores.rastreabilidadeUDI, metas.rastreabilidadeUDI)}
                <span className="text-sm text-muted-foreground">META: {metas.rastreabilidadeUDI}%</span>
              </div>
            </div>
            <Progress value={indicadores.rastreabilidadeUDI} className="h-2" />
          </div>

          {/* Registro Anvisa */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium">Registro Anvisa OK:</span>
              <div className="flex items-center gap-2">
                <span className={`text-2xl font-bold ${getStatusColor(indicadores.registroAnvisa, metas.registroAnvisa)}`}>
                  {indicadores.registroAnvisa}%
                </span>
                {getStatusBadge(indicadores.registroAnvisa, metas.registroAnvisa)}
                <span className="text-sm text-muted-foreground">META: {metas.registroAnvisa}%</span>
              </div>
            </div>
            <Progress value={indicadores.registroAnvisa} className="h-2" />
          </div>

          {/* Tempo Médio Autorização */}
          <div className="flex justify-between items-center pt-4 border-t">
            <span className="font-medium flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Tempo Médio Autorização:
            </span>
            <div className="flex items-center gap-2">
              <span className={`text-xl font-bold ${getStatusColor(indicadores.tempoMedioAutorizacao, metas.tempoMedioAutorizacao, true)}`}>
                {indicadores.tempoMedioAutorizacao} dias
              </span>
              <span className="text-sm text-muted-foreground">(meta: {metas.tempoMedioAutorizacao} dias)</span>
            </div>
          </div>

          {/* Retrabalho */}
          <div className="flex justify-between items-center">
            <span className="font-medium flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Retrabalho:
            </span>
            <div className="flex items-center gap-2">
              <span className={`text-xl font-bold ${getStatusColor(indicadores.retrabalho, metas.retrabalho, true)}`}>
                {indicadores.retrabalho}%
              </span>
              <span className="text-sm text-muted-foreground">(meta: &lt;{metas.retrabalho}%)</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance por Convênio */}
      <Card>
        <CardHeader>
          <CardTitle>Performance por Convênio</CardTitle>
          <CardDescription>Principais operadoras e indicadores</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { nome: 'Unimed', glosa: 6.2, compliance: 89, tempo: 5.8, status: 'atencao', acao: 'Validar 3 marcas obrigatórias' },
              { nome: 'Bradesco', glosa: 12.5, compliance: 82, tempo: 7.1, status: 'critico', acao: 'Implementar Passo 3 OPME automático' },
              { nome: 'SulAmérica', glosa: 4.8, compliance: 93, tempo: 4.2, status: 'otimo', acao: 'Manter processo VPP' },
              { nome: 'GNDI', glosa: 9.1, compliance: 85, tempo: 6.5, status: 'atencao', acao: 'Melhorar transação no ato' },
              { nome: 'Hapvida', glosa: 7.4, compliance: 88, tempo: 5.9, status: 'atencao', acao: 'Padronizar emissão TISSNET' }
            ].map((conv, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{conv.nome}</span>
                    {conv.status === 'critico' && <Badge className="bg-red-600">🔴 Crítico</Badge>}
                    {conv.status === 'atencao' && <Badge className="bg-yellow-600">🟡 Atenção</Badge>}
                    {conv.status === 'otimo' && <Badge className="bg-green-600">🟢 Ótimo</Badge>}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{conv.acao}</p>
                </div>
                <div className="flex gap-6 text-sm">
                  <div className="text-center">
                    <div className="text-muted-foreground">Taxa Glosa</div>
                    <div className="font-bold">{conv.glosa}%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-muted-foreground">Compliance</div>
                    <div className="font-bold">{conv.compliance}%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-muted-foreground">Tempo Médio</div>
                    <div className="font-bold">{conv.tempo}d</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Distribuição de Glosas por Causa */}
      <Card>
        <CardHeader>
          <CardTitle>Distribuição de Glosas por Causa</CardTitle>
          <CardDescription>Principais causas de glosas (% do total)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { causa: 'Vínculos quebrados', percentual: 24, status: 'critico' },
              { causa: 'TUSS inválido', percentual: 19, status: 'critico' },
              { causa: 'Registro Anvisa', percentual: 17, status: 'critico' },
              { causa: 'Prazo RN 259', percentual: 14, status: 'atencao' },
              { causa: 'Laudo incompleto', percentual: 11, status: 'atencao' },
              { causa: 'Qtd divergente', percentual: 8, status: 'atencao' },
              { causa: 'Outros', percentual: 7, status: 'ok' }
            ].map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-2">
                    {item.status === 'critico' && <span className="text-red-600">🔴</span>}
                    {item.status === 'atencao' && <span className="text-yellow-600">🟡</span>}
                    {item.status === 'ok' && <span className="text-green-600">🟢</span>}
                    {item.causa}
                  </span>
                  <span className="font-semibold">{item.percentual}%</span>
                </div>
                <Progress value={item.percentual * 4} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Ações de Alto Impacto */}
      <Card>
        <CardHeader>
          <CardTitle>TOP 3 Ações que Eliminam 60% das Glosas</CardTitle>
          <CardDescription>Prioridades de implementação</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border-l-4 border-red-600 bg-red-50 dark:bg-red-950">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-red-600 mt-1" />
                <div className="flex-1">
                  <h4 className="font-semibold text-red-900 dark:text-red-100">1. VALIDAÇÃO DE VÍNCULOS (elimina 24% das glosas)</h4>
                  <p className="text-sm text-red-800 dark:text-red-200 mt-1">
                    Validação automática campo 3 do Anexo OPME → número guia principal. Bloqueio: anexo sem guia ou guia sem anexo.
                  </p>
                  <p className="text-sm font-semibold text-red-900 dark:text-red-100 mt-2">ROI: R$ 200.000/mês economizados</p>
                </div>
              </div>
            </div>

            <div className="p-4 border-l-4 border-orange-600 bg-orange-50 dark:bg-orange-950">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-orange-600 mt-1" />
                <div className="flex-1">
                  <h4 className="font-semibold text-orange-900 dark:text-orange-100">2. VALIDAÇÃO TUSS (elimina 19% das glosas)</h4>
                  <p className="text-sm text-orange-800 dark:text-orange-200 mt-1">
                    Atualização automática semanal da Tabela 19 ANS. Validação em tempo real: código existe + está ativo.
                  </p>
                  <p className="text-sm font-semibold text-orange-900 dark:text-orange-100 mt-2">ROI: R$ 158.000/mês economizados</p>
                </div>
              </div>
            </div>

            <div className="p-4 border-l-4 border-yellow-600 bg-yellow-50 dark:bg-yellow-950">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mt-1" />
                <div className="flex-1">
                  <h4 className="font-semibold text-yellow-900 dark:text-yellow-100">3. VALIDAÇÃO REGISTRO ANVISA (elimina 17% das glosas)</h4>
                  <p className="text-sm text-yellow-800 dark:text-yellow-200 mt-1">
                    Integração com API consulta Anvisa em tempo real. Bloqueio de materiais com registro vencido.
                  </p>
                  <p className="text-sm font-semibold text-yellow-900 dark:text-yellow-100 mt-2">ROI: R$ 141.000/mês economizados</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-600">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-green-900 dark:text-green-100">ROI Combinado:</span>
                <span className="text-2xl font-bold text-green-600">R$ 499.000/mês</span>
              </div>
              <p className="text-sm text-green-800 dark:text-green-200 mt-1">Redução de 60% nas glosas com estas 3 ações</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OPMEDashboard;
