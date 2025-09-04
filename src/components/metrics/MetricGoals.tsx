
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { PlusCircle, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';
import { HealthGoal } from '@/components/profile/types';

interface MetricGoalsProps {
  goals: HealthGoal[];
  onAddGoal?: () => void;
}

const MetricGoals = ({ goals, onAddGoal }: MetricGoalsProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Metas de Saúde</CardTitle>
            <CardDescription>Acompanhamento de suas metas pessoais</CardDescription>
          </div>
          <Button onClick={onAddGoal} size="sm" className="gap-1">
            <PlusCircle size={16} />
            Nova Meta
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {goals.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-muted-foreground mb-2">
                Você não definiu nenhuma meta de saúde ainda
              </p>
              <Button onClick={onAddGoal} className="gap-1">
                <PlusCircle size={16} />
                Definir Primeira Meta
              </Button>
            </div>
          ) : (
            goals.map((goal) => (
              <div key={goal.id} className="rounded-lg border p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium">{goal.metricName}</h4>
                    <p className="text-sm text-muted-foreground">
                      Meta: {goal.targetValue} até {goal.targetDate}
                    </p>
                  </div>
                  {goal.status === "Em andamento" && (
                    <div className="flex items-center text-sm text-amber-600 dark:text-amber-500">
                      <Clock size={14} className="mr-1" />
                      Em progresso
                    </div>
                  )}
                  {goal.status === "Concluído" && (
                    <div className="flex items-center text-sm text-green-600 dark:text-green-500">
                      <CheckCircle2 size={14} className="mr-1" />
                      Concluído
                    </div>
                  )}
                  {goal.status === "Atrasado" && (
                    <div className="flex items-center text-sm text-red-600 dark:text-red-500">
                      <AlertTriangle size={14} className="mr-1" />
                      Atrasado
                    </div>
                  )}
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Atual: {goal.currentValue}</span>
                    <span>{goal.progress}%</span>
                  </div>
                  <Progress value={goal.progress} className="h-2" />
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricGoals;
