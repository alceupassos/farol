
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import AppButton from '@/components/ui/AppButton';

interface HealthMetric {
  name: string;
  value: string;
  date: string;
  status: "Normal" | "Alerta" | "Crítico";
}

interface HealthMetricsProps {
  metrics: HealthMetric[];
}

const HealthMetrics = ({ metrics }: HealthMetricsProps) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex flex-wrap justify-between items-center gap-2">
          <CardTitle className="text-xl">Métricas de Saúde</CardTitle>
          <AppButton size="sm" icon={<Plus size={16} />} iconPosition="left">
            Nova Medição
          </AppButton>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-card rounded-lg p-4 border border-border">
              <div className="text-sm font-medium text-gray-500 mb-1">{metric.name}</div>
              <div className="text-2xl font-semibold">{metric.value}</div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-gray-500">{metric.date}</span>
                <span className={cn(
                  "px-1.5 py-0.5 rounded-full text-xs font-medium",
                  metric.status === "Normal" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" :
                  metric.status === "Alerta" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400" :
                  "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                )}>
                  {metric.status}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">Histórico de Métricas</h3>
          <div className="bg-card rounded-lg p-4 border border-border h-72 flex items-center justify-center">
            <p className="text-muted-foreground">Visualização de gráficos em desenvolvimento</p>
          </div>
        </div>
        
        <div className="text-xs text-muted-foreground text-center italic mt-4">
          * Dados fictícios não reais usado para exemplo de software
        </div>
      </CardContent>
    </Card>
  );
};

export default HealthMetrics;
