/**
 * Auditoria do Prontuário - Visão Profissionais
 * KPIs de conformidade, preenchimento por IA e impacto na glosa
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, CheckCircle, AlertTriangle, TrendingUp, TrendingDown,
  Clock, User, Activity, Brain, DollarSign, Target, Award
} from 'lucide-react';

const AuditoriaProntuarioPage = () => {
  // Dados simulados
  const kpis = {
    prontuarioIncompleto: 18.5,
    preenchidoPorIA: 72.3,
    tempoMedioFechamento: 12.5,
    fechadoD0: 85.2,
    taxaRetrabalho: 8.7,
    reducaoGlosa: 35.8,
  };

  const porMedico = [
    { nome: 'Dr. Carlos Silva', especialidade: 'Cardiologia', incompleto: 12.3, iaPreenchido: 78.5, glosa: 4.2 },
    { nome: 'Dra. Ana Santos', especialidade: 'Pediatria', incompleto: 15.8, iaPreenchido: 75.2, glosa: 5.8 },
    { nome: 'Dr. Roberto Lima', especialidade: 'Ortopedia', incompleto: 22.4, iaPreenchido: 68.9, glosa: 8.5 },
    { nome: 'Dra. Maria Costa', especialidade: 'Neurologia', incompleto: 9.5, iaPreenchido: 82.1, glosa: 3.1 },
    { nome: 'Dr. João Oliveira', especialidade: 'Cirurgia Geral', incompleto: 18.7, iaPreenchido: 71.4, glosa: 6.9 },
  ];

  const porCenario = [
    { tipo: 'Enfermaria', total: 1250, incompleto: 15.2, iaPreenchido: 74.5, impacto: 'R$ 45.200' },
    { tipo: 'Centro Cirúrgico', total: 380, incompleto: 12.8, iaPreenchido: 78.9, impacto: 'R$ 128.500' },
    { tipo: 'Pronto Atendimento', total: 2100, incompleto: 22.5, iaPreenchido: 68.2, impacto: 'R$ 32.800' },
    { tipo: 'Exames', total: 1850, incompleto: 18.9, iaPreenchido: 71.3, impacto: 'R$ 28.400' },
    { tipo: 'Ambulatório', total: 980, incompleto: 14.3, iaPreenchido: 76.8, impacto: 'R$ 18.900' },
  ];

  const motivosLacuna = [
    { motivo: 'Ausência de Justificativa Clínica', casos: 245, percentual: 32.5 },
    { motivo: 'CID-10 Não Informado', casos: 198, percentual: 26.3 },
    { motivo: 'Alergias Não Checadas', casos: 156, percentual: 20.7 },
    { motivo: 'Sinais Vitais Incompletos', casos: 89, percentual: 11.8 },
    { motivo: 'Conduta Não Descrita', casos: 65, percentual: 8.7 },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <FileText className="h-8 w-8 text-primary" />
          Auditoria do Prontuário
        </h1>
        <p className="text-muted-foreground mt-1">
          Visão de conformidade e impacto da transcrição por IA
        </p>
      </div>

      {/* KPIs Principais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">Prontuário Incompleto</div>
                <div className="text-3xl font-bold text-red-600">{kpis.prontuarioIncompleto}%</div>
                <div className="text-xs text-muted-foreground mt-1">Meta: &lt;10%</div>
              </div>
              <AlertTriangle className="h-12 w-12 text-red-600 opacity-20" />
            </div>
            <Progress value={kpis.prontuarioIncompleto} className="mt-3" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">Preenchido por IA</div>
                <div className="text-3xl font-bold text-blue-600">{kpis.preenchidoPorIA}%</div>
                <div className="text-xs text-green-600 mt-1 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +12.5% vs mês anterior
                </div>
              </div>
              <Brain className="h-12 w-12 text-blue-600 opacity-20" />
            </div>
            <Progress value={kpis.preenchidoPorIA} className="mt-3" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">Fechado em D-0</div>
                <div className="text-3xl font-bold text-green-600">{kpis.fechadoD0}%</div>
                <div className="text-xs text-muted-foreground mt-1">Meta: &gt;90%</div>
              </div>
              <CheckCircle className="h-12 w-12 text-green-600 opacity-20" />
            </div>
            <Progress value={kpis.fechadoD0} className="mt-3" />
          </CardContent>
        </Card>
      </div>

      {/* Métricas Secundárias */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <Clock className="h-8 w-8 mx-auto mb-2 text-orange-600" />
              <div className="text-2xl font-bold">{kpis.tempoMedioFechamento} min</div>
              <div className="text-sm text-muted-foreground">Tempo Médio de Fechamento</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <Activity className="h-8 w-8 mx-auto mb-2 text-yellow-600" />
              <div className="text-2xl font-bold">{kpis.taxaRetrabalho}%</div>
              <div className="text-sm text-muted-foreground">Taxa de Retrabalho</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <TrendingDown className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <div className="text-2xl font-bold text-green-600">-{kpis.reducaoGlosa}%</div>
              <div className="text-sm text-muted-foreground">Redução de Glosa</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="medico" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="medico">Por Médico</TabsTrigger>
          <TabsTrigger value="cenario">Por Cenário</TabsTrigger>
          <TabsTrigger value="lacunas">Motivos de Lacuna</TabsTrigger>
        </TabsList>

        {/* Por Médico */}
        <TabsContent value="medico">
          <Card>
            <CardHeader>
              <CardTitle>Ranking por Médico/Especialidade</CardTitle>
              <CardDescription>
                Conformidade e impacto da IA no preenchimento
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {porMedico.map((medico, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="font-semibold flex items-center gap-2">
                          <User className="h-4 w-4" />
                          {medico.nome}
                        </div>
                        <div className="text-sm text-muted-foreground">{medico.especialidade}</div>
                      </div>
                      <Badge className={medico.incompleto < 15 ? 'bg-green-600' : medico.incompleto < 20 ? 'bg-yellow-600' : 'bg-red-600'}>
                        {medico.incompleto < 15 ? '✅ Excelente' : medico.incompleto < 20 ? '⚠️ Atenção' : '🔴 Crítico'}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">Incompleto</div>
                        <div className="font-bold text-red-600">{medico.incompleto}%</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">IA Preenchido</div>
                        <div className="font-bold text-blue-600">{medico.iaPreenchido}%</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Taxa Glosa</div>
                        <div className="font-bold">{medico.glosa}%</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Por Cenário */}
        <TabsContent value="cenario">
          <Card>
            <CardHeader>
              <CardTitle>Análise por Cenário Clínico</CardTitle>
              <CardDescription>
                Onde a transcrição resolve mais lacunas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {porCenario.map((cenario, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="font-semibold">{cenario.tipo}</div>
                        <div className="text-sm text-muted-foreground">{cenario.total} atendimentos</div>
                      </div>
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        {cenario.impacto}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">Incompleto</div>
                        <div className="font-bold">{cenario.incompleto}%</div>
                        <Progress value={cenario.incompleto} className="mt-1 h-2" />
                      </div>
                      <div>
                        <div className="text-muted-foreground">IA Preenchido</div>
                        <div className="font-bold text-blue-600">{cenario.iaPreenchido}%</div>
                        <Progress value={cenario.iaPreenchido} className="mt-1 h-2" />
                      </div>
                      <div>
                        <div className="text-muted-foreground">Impacto Mensal</div>
                        <div className="font-bold text-green-600">{cenario.impacto}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Motivos de Lacuna */}
        <TabsContent value="lacunas">
          <Card>
            <CardHeader>
              <CardTitle>Top 5 Motivos de Lacuna</CardTitle>
              <CardDescription>
                Principais causas de prontuário incompleto
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {motivosLacuna.map((motivo, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{index + 1}º</Badge>
                        <span className="font-semibold">{motivo.motivo}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{motivo.casos} casos</div>
                        <div className="text-sm text-muted-foreground">{motivo.percentual}%</div>
                      </div>
                    </div>
                    <Progress value={motivo.percentual} className="h-2" />
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-600">
                <div className="flex items-start gap-3">
                  <Brain className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <div className="font-semibold text-blue-900 dark:text-blue-100">
                      Impacto da IA
                    </div>
                    <p className="text-sm text-blue-800 dark:text-blue-200 mt-1">
                      A transcrição automática reduziu em <strong>68%</strong> os casos de "Ausência de Justificativa Clínica" 
                      e em <strong>72%</strong> os casos de "CID-10 Não Informado", principais causas de glosa.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Ações Recomendadas */}
      <Card className="border-green-600">
        <CardHeader className="bg-green-50 dark:bg-green-950">
          <CardTitle className="flex items-center gap-2 text-green-900 dark:text-green-100">
            <Target className="h-5 w-5" />
            Ações Recomendadas
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border-l-4 border-red-600 bg-red-50 dark:bg-red-950">
              <h4 className="font-semibold text-red-900 dark:text-red-100 mb-2">🔴 Urgente</h4>
              <p className="text-sm text-red-800 dark:text-red-200">
                Treinar equipe de Ortopedia: 22.4% de prontuários incompletos (meta: &lt;10%)
              </p>
            </div>
            <div className="p-4 border-l-4 border-yellow-600 bg-yellow-50 dark:bg-yellow-950">
              <h4 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">🟡 Importante</h4>
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                Revisar checklist de Pronto Atendimento: maior taxa de lacunas (22.5%)
              </p>
            </div>
            <div className="p-4 border-l-4 border-green-600 bg-green-50 dark:bg-green-950">
              <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">🟢 Oportunidade</h4>
              <p className="text-sm text-green-800 dark:text-green-200">
                Expandir uso da IA em Ambulatório: potencial de +R$ 12K/mês
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuditoriaProntuarioPage;
