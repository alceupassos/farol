import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  Heart,
  Target,
  Users,
  Lightbulb,
  Activity
} from 'lucide-react';

interface Correlation {
  parameters: string[];
  observation: string;
}

interface HealthInsightsPanelProps {
  summary: string;
  overallRisk: 'low' | 'moderate' | 'high';
  recommendations: string[];
  correlations: Correlation[];
}

const HealthInsightsPanel: React.FC<HealthInsightsPanelProps> = ({
  summary,
  overallRisk,
  recommendations,
  correlations
}) => {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'hsl(var(--chart-2))';
      case 'moderate': return 'hsl(var(--chart-3))';
      case 'high': return 'hsl(var(--chart-1))';
      default: return 'hsl(var(--muted))';
    }
  };

  const getRiskBadgeVariant = (risk: string) => {
    switch (risk) {
      case 'low': return 'default';
      case 'moderate': return 'secondary';
      case 'high': return 'destructive';
      default: return 'outline';
    }
  };

  const getRiskLabel = (risk: string) => {
    switch (risk) {
      case 'low': return 'Baixo Risco';
      case 'moderate': return 'Risco Moderado';
      case 'high': return 'Alto Risco';
      default: return 'Não Avaliado';
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'low': return <Heart className="w-5 h-5 text-chart-2" />;
      case 'moderate': return <AlertTriangle className="w-5 h-5 text-chart-3" />;
      case 'high': return <AlertTriangle className="w-5 h-5 text-chart-1" />;
      default: return <Activity className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Risk Assessment Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Brain className="w-6 h-6 text-primary" />
              <CardTitle>Análise Geral da IA</CardTitle>
            </div>
            <Badge variant={getRiskBadgeVariant(overallRisk)} className="flex items-center gap-1">
              {getRiskIcon(overallRisk)}
              {getRiskLabel(overallRisk)}
            </Badge>
          </div>
          <CardDescription>
            Interpretação inteligente baseada em todos os parâmetros analisados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground leading-relaxed">{summary}</p>
        </CardContent>
      </Card>

      <Tabs defaultValue="recommendations" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="recommendations">
            <Target className="w-4 h-4 mr-2" />
            Recomendações
          </TabsTrigger>
          <TabsTrigger value="correlations">
            <TrendingUp className="w-4 h-4 mr-2" />
            Correlações
          </TabsTrigger>
          <TabsTrigger value="monitoring">
            <Activity className="w-4 h-4 mr-2" />
            Monitoramento
          </TabsTrigger>
        </TabsList>

        <TabsContent value="recommendations" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Lightbulb className="w-5 h-5 mr-2 text-chart-3" />
                Recomendações Personalizadas
              </CardTitle>
              <CardDescription>
                Ações sugeridas pela IA com base nos seus resultados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recommendations.map((recommendation, index) => (
                  <Alert key={index}>
                    <Lightbulb className="h-4 w-4" />
                    <AlertDescription className="text-sm">
                      {recommendation}
                    </AlertDescription>
                  </Alert>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="correlations" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                Correlações Identificadas
              </CardTitle>
              <CardDescription>
                Relações importantes entre os parâmetros do seu exame
              </CardDescription>
            </CardHeader>
            <CardContent>
              {correlations.length > 0 ? (
                <div className="space-y-4">
                  {correlations.map((correlation, index) => (
                    <Card key={index} className="border-l-4 border-l-primary">
                      <CardContent className="pt-4">
                        <div className="space-y-2">
                          <div className="flex flex-wrap gap-1">
                            {correlation.parameters.map((param, paramIndex) => (
                              <Badge key={paramIndex} variant="outline" className="text-xs">
                                {param}
                              </Badge>
                            ))}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {correlation.observation}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Alert>
                  <TrendingUp className="h-4 w-4" />
                  <AlertDescription>
                    Nenhuma correlação significativa identificada entre os parâmetros analisados.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Activity className="w-5 h-5 mr-2 text-chart-2" />
                Plano de Monitoramento
              </CardTitle>
              <CardDescription>
                Sugestões para acompanhamento e próximos exames
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Alert>
                  <Users className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Consulta Médica:</strong> Agende uma consulta com seu médico para discutir esses resultados e receber orientações personalizadas.
                  </AlertDescription>
                </Alert>

                <Alert>
                  <Activity className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Próximos Exames:</strong> Baseado no risco {getRiskLabel(overallRisk).toLowerCase()}, recomenda-se repetir os exames em {overallRisk === 'high' ? '3 meses' : overallRisk === 'moderate' ? '6 meses' : '1 ano'}.
                  </AlertDescription>
                </Alert>

                <Alert>
                  <Heart className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Monitoramento Diário:</strong> Considere usar nossa funcionalidade de métricas para acompanhar indicadores importantes como pressão arterial, peso e glicemia.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HealthInsightsPanel;