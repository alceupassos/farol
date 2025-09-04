import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Heart, Brain, Activity, AlertTriangle, TrendingUp, Calendar } from "lucide-react";

export const HealthPredictions = () => {
  const predictions = [
    {
      id: 1,
      type: "cardiovascular",
      title: "Risco Cardiovascular",
      risk: "Alto",
      probability: 78,
      timeline: "6 meses",
      factors: ["Pressão arterial elevada", "Colesterol alto", "Sedentarismo"],
      recommendations: ["Consulta cardiológica urgente", "Iniciar medicação", "Programa exercícios"],
      icon: Heart,
      color: "red"
    },
    {
      id: 2,
      type: "diabetes",
      title: "Desenvolvimento de Diabetes Tipo 2",
      risk: "Médio",
      probability: 45,
      timeline: "12 meses",
      factors: ["Resistência à insulina", "Histórico familiar", "IMC elevado"],
      recommendations: ["Dieta low-carb", "Exercício regular", "Monitoramento glicemia"],
      icon: Activity,
      color: "yellow"
    },
    {
      id: 3,
      type: "mental",
      title: "Episódio Depressivo",
      risk: "Baixo",
      probability: 23,
      timeline: "3 meses",
      factors: ["Estresse elevado", "Padrão sono irregular", "Isolamento social"],
      recommendations: ["Terapia preventiva", "Técnicas relaxamento", "Atividades sociais"],
      icon: Brain,
      color: "blue"
    }
  ];

  const riskFactors = [
    { category: "Estilo de Vida", score: 72, items: ["Sedentarismo", "Dieta inadequada", "Tabagismo"] },
    { category: "Histórico Familiar", score: 85, items: ["Diabetes", "Hipertensão", "Câncer"] },
    { category: "Biomarcadores", score: 68, items: ["Colesterol alto", "Glicemia alterada", "Inflamação"] },
    { category: "Fatores Ambientais", score: 45, items: ["Poluição", "Estresse ocupacional", "Qualidade sono"] }
  ];

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case "alto": return "destructive";
      case "médio": return "default";
      case "baixo": return "secondary";
      default: return "secondary";
    }
  };

  const getIconColor = (color: string) => {
    switch (color) {
      case "red": return "text-red-500";
      case "yellow": return "text-yellow-500";
      case "blue": return "text-blue-500";
      default: return "text-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      {/* Predictions Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Predições Ativas</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Alto Risco</p>
                <p className="text-2xl font-bold">3</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Precisão Média</p>
                <p className="text-2xl font-bold">87%</p>
              </div>
              <Activity className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Health Predictions */}
      <Card>
        <CardHeader>
          <CardTitle>Predições de Saúde Personalizadas</CardTitle>
          <CardDescription>
            Análises preditivas baseadas em dados individuais e padrões populacionais
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {predictions.map((prediction) => {
              const IconComponent = prediction.icon;
              return (
                <div key={prediction.id} className="border rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-gray-500/10 border border-gray-500/20">
                        <IconComponent className={`w-6 h-6 ${getIconColor(prediction.color)}`} />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold">{prediction.title}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant={getRiskColor(prediction.risk)}>
                            {prediction.risk} Risco
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {prediction.probability}% probabilidade
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      {prediction.timeline}
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium mb-2">Probabilidade de Desenvolvimento</p>
                    <Progress value={prediction.probability} className="h-3" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm font-medium mb-2">Fatores de Risco Identificados</p>
                      <ul className="space-y-1">
                        {prediction.factors.map((factor, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                            {factor}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium mb-2">Recomendações Preventivas</p>
                      <ul className="space-y-1">
                        {prediction.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button size="sm" variant="outline">
                      Ver Detalhes
                    </Button>
                    <Button size="sm" variant="outline">
                      Agendar Consulta
                    </Button>
                    <Button size="sm" variant="outline">
                      Plano Preventivo
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Risk Factors Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Análise de Fatores de Risco</CardTitle>
          <CardDescription>
            Categorização e pontuação dos principais fatores que influenciam sua saúde
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {riskFactors.map((factor, index) => (
              <div key={index} className="space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">{factor.category}</h4>
                  <span className="text-sm text-muted-foreground">{factor.score}/100</span>
                </div>
                <Progress value={factor.score} className="h-2" />
                <ul className="space-y-1">
                  {factor.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};