import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Settings, Play, Pause, RotateCcw, Download, Upload, Brain } from "lucide-react";

export const ModelManagement = () => {
  const models = [
    {
      id: 1,
      name: "CardioPredict v3.2",
      type: "Predição Cardiovascular",
      status: "active",
      accuracy: 94.2,
      lastTrained: "2024-01-10",
      dataPoints: 45000,
      version: "3.2.1"
    },
    {
      id: 2,
      name: "DiabetesDetect v2.8",
      type: "Detecção de Diabetes",
      status: "active",
      accuracy: 89.7,
      lastTrained: "2024-01-08",
      dataPoints: 32000,
      version: "2.8.0"
    },
    {
      id: 3,
      name: "MentalHealth v1.5",
      type: "Análise de Saúde Mental",
      status: "training",
      accuracy: 82.3,
      lastTrained: "2024-01-12",
      dataPoints: 18000,
      version: "1.5.2"
    },
    {
      id: 4,
      name: "CancerRisk v4.1",
      type: "Avaliação de Risco de Câncer",
      status: "active",
      accuracy: 91.5,
      lastTrained: "2024-01-05",
      dataPoints: 67000,
      version: "4.1.0"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "default";
      case "training": return "secondary";
      case "inactive": return "outline";
      default: return "secondary";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active": return "Ativo";
      case "training": return "Treinando";
      case "inactive": return "Inativo";
      default: return "Desconhecido";
    }
  };

  return (
    <div className="space-y-6">
      {/* Models Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Modelos Ativos</p>
                <p className="text-2xl font-bold">3</p>
              </div>
              <Brain className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Precisão Média</p>
                <p className="text-2xl font-bold">91.9%</p>
              </div>
              <Settings className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Em Treinamento</p>
                <p className="text-2xl font-bold">1</p>
              </div>
              <RotateCcw className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Dados</p>
                <p className="text-2xl font-bold">162K</p>
              </div>
              <Upload className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Models List */}
      <Card>
        <CardHeader>
          <CardTitle>Gerenciamento de Modelos</CardTitle>
          <CardDescription>
            Configure e monitore os modelos de IA do sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {models.map((model) => (
              <div key={model.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
                      <Brain className="w-5 h-5 text-purple-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{model.name}</h4>
                      <p className="text-sm text-muted-foreground">{model.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={getStatusColor(model.status)}>
                      {getStatusText(model.status)}
                    </Badge>
                    <span className="text-sm text-muted-foreground">v{model.version}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium">Precisão</p>
                    <div className="space-y-1">
                      <Progress value={model.accuracy} className="h-2" />
                      <p className="text-xs text-muted-foreground">{model.accuracy}%</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Último Treino</p>
                    <p className="text-sm text-muted-foreground">{model.lastTrained}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Dados de Treino</p>
                    <p className="text-sm text-muted-foreground">{model.dataPoints.toLocaleString()}</p>
                  </div>
                  <div className="flex gap-2">
                    {model.status === "active" ? (
                      <Button size="sm" variant="outline">
                        <Pause className="w-4 h-4 mr-1" />
                        Pausar
                      </Button>
                    ) : (
                      <Button size="sm" variant="outline">
                        <Play className="w-4 h-4 mr-1" />
                        Ativar
                      </Button>
                    )}
                    <Button size="sm" variant="outline">
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};