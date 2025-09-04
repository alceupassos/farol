import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, Square, Settings, Database, Zap } from "lucide-react";

export const AIModelTraining = () => {
  const trainingJobs = [
    {
      id: 1,
      name: "CardioPredict v3.3",
      status: "running",
      progress: 67,
      eta: "2h 15m",
      dataset: "Cardiovascular Dataset v2",
      dataPoints: 52000,
      epochs: 100,
      currentEpoch: 67,
      accuracy: 92.4
    },
    {
      id: 2,
      name: "MentalHealth v1.6",
      status: "queued",
      progress: 0,
      eta: "4h 30m",
      dataset: "Mental Health Dataset v1",
      dataPoints: 18500,
      epochs: 150,
      currentEpoch: 0,
      accuracy: 0
    },
    {
      id: 3,
      name: "DiabetesDetect v2.9",
      status: "completed",
      progress: 100,
      eta: "Concluído",
      dataset: "Diabetes Dataset v3",
      dataPoints: 35000,
      epochs: 80,
      currentEpoch: 80,
      accuracy: 89.8
    }
  ];

  const datasets = [
    { name: "Cardiovascular Dataset v2", size: "2.1 GB", records: 52000, lastUpdated: "2024-01-12" },
    { name: "Diabetes Dataset v3", size: "1.8 GB", records: 35000, lastUpdated: "2024-01-10" },
    { name: "Mental Health Dataset v1", size: "950 MB", records: 18500, lastUpdated: "2024-01-08" },
    { name: "Cancer Risk Dataset v2", size: "3.2 GB", records: 67000, lastUpdated: "2024-01-05" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "running": return "default";
      case "queued": return "secondary";
      case "completed": return "outline";
      case "failed": return "destructive";
      default: return "secondary";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "running": return "Executando";
      case "queued": return "Na Fila";
      case "completed": return "Concluído";
      case "failed": return "Falhou";
      default: return "Desconhecido";
    }
  };

  return (
    <div className="space-y-6">
      {/* Training Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Jobs Ativos</p>
                <p className="text-2xl font-bold">1</p>
              </div>
              <Zap className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Na Fila</p>
                <p className="text-2xl font-bold">1</p>
              </div>
              <Play className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Concluídos</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <Settings className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Datasets</p>
                <p className="text-2xl font-bold">4</p>
              </div>
              <Database className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Training Jobs */}
      <Card>
        <CardHeader>
          <CardTitle>Jobs de Treinamento</CardTitle>
          <CardDescription>
            Monitor e controle os processos de treinamento de modelos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {trainingJobs.map((job) => (
              <div key={job.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
                      <Zap className="w-5 h-5 text-purple-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{job.name}</h4>
                      <p className="text-sm text-muted-foreground">{job.dataset}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={getStatusColor(job.status)}>
                      {getStatusText(job.status)}
                    </Badge>
                    <span className="text-sm text-muted-foreground">ETA: {job.eta}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium">Progresso</p>
                    <div className="space-y-1">
                      <Progress value={job.progress} className="h-2" />
                      <p className="text-xs text-muted-foreground">{job.progress}%</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Épocas</p>
                    <p className="text-sm text-muted-foreground">{job.currentEpoch}/{job.epochs}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Dados</p>
                    <p className="text-sm text-muted-foreground">{job.dataPoints.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Precisão</p>
                    <p className="text-sm text-muted-foreground">{job.accuracy}%</p>
                  </div>
                  <div className="flex gap-2">
                    {job.status === "running" ? (
                      <>
                        <Button size="sm" variant="outline">
                          <Pause className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Square className="w-4 h-4" />
                        </Button>
                      </>
                    ) : job.status === "queued" ? (
                      <Button size="sm" variant="outline">
                        <Play className="w-4 h-4" />
                      </Button>
                    ) : (
                      <Button size="sm" variant="outline">
                        <Settings className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Datasets */}
      <Card>
        <CardHeader>
          <CardTitle>Datasets Disponíveis</CardTitle>
          <CardDescription>
            Conjuntos de dados para treinamento de modelos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {datasets.map((dataset, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Database className="w-5 h-5 text-blue-500" />
                  <div>
                    <h4 className="font-medium">{dataset.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {dataset.records.toLocaleString()} registros • {dataset.size}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Atualizado em</p>
                  <p className="text-sm font-medium">{dataset.lastUpdated}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};