import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Brain, TrendingUp, AlertTriangle, CheckCircle, Activity, Target } from "lucide-react";

export const AIInsightsDashboard = () => {
  const insights = [
    {
      id: 1,
      type: "health_risk",
      title: "Risco Cardiovascular Elevado",
      description: "Padrões indicam aumento de 23% no risco cardiovascular baseado em métricas recentes",
      confidence: 87,
      severity: "high",
      recommendations: ["Consulta cardiológica", "Ajuste medicação", "Exercícios aeróbicos"]
    },
    {
      id: 2,
      type: "medication_optimization",
      title: "Otimização de Medicação",
      description: "IA sugere ajuste na dosagem de metformina para melhor controle glicêmico",
      confidence: 92,
      severity: "medium",
      recommendations: ["Consultar endocrinologista", "Monitorar glicemia", "Ajustar dieta"]
    },
    {
      id: 3,
      type: "lifestyle_pattern",
      title: "Padrão de Sono Irregular",
      description: "Detectado impacto negativo do sono na regulação hormonal e imunidade",
      confidence: 78,
      severity: "low",
      recommendations: ["Higiene do sono", "Meditação", "Reduzir cafeína"]
    }
  ];

  const modelPerformance = [
    { name: "Predição Cardiovascular", accuracy: 94, status: "active" },
    { name: "Detecção Diabetes", accuracy: 89, status: "active" },
    { name: "Análise Mental", accuracy: 82, status: "training" },
    { name: "Risco Câncer", accuracy: 91, status: "active" }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* AI Insights */}
      <div className="lg:col-span-2 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-500" />
              Insights de IA em Tempo Real
            </CardTitle>
            <CardDescription>
              Análises inteligentes baseadas em seus dados de saúde
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {insights.map((insight) => (
              <div key={insight.id} className="p-4 border rounded-lg space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {insight.severity === "high" && <AlertTriangle className="w-5 h-5 text-red-500" />}
                    {insight.severity === "medium" && <Activity className="w-5 h-5 text-yellow-500" />}
                    {insight.severity === "low" && <CheckCircle className="w-5 h-5 text-green-500" />}
                    <h4 className="font-semibold">{insight.title}</h4>
                  </div>
                  <Badge variant={insight.severity === "high" ? "destructive" : insight.severity === "medium" ? "default" : "secondary"}>
                    {insight.confidence}% confiança
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground">{insight.description}</p>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium">Recomendações:</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {insight.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Model Performance */}
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-purple-500" />
              Performance dos Modelos
            </CardTitle>
            <CardDescription>
              Precisão e status dos modelos de IA
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {modelPerformance.map((model) => (
              <div key={model.name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{model.name}</span>
                  <Badge variant={model.status === "active" ? "default" : "secondary"}>
                    {model.status === "active" ? "Ativo" : "Treinando"}
                  </Badge>
                </div>
                <Progress value={model.accuracy} className="h-2" />
                <p className="text-xs text-muted-foreground">{model.accuracy}% precisão</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-500" />
              Métricas de IA
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">8.7K</p>
                <p className="text-xs text-muted-foreground">Análises processadas</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">94%</p>
                <p className="text-xs text-muted-foreground">Precisão média</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">127</p>
                <p className="text-xs text-muted-foreground">Insights gerados</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">23</p>
                <p className="text-xs text-muted-foreground">Alertas ativos</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};