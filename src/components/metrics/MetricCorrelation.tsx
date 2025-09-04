
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowDownRight, ArrowUpRight, MoveHorizontal } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface MetricDataPoint {
  date: string;
  metric1Value: number;
  metric2Value: number;
}

interface MetricCorrelationProps {
  data: MetricDataPoint[];
  metrics: Array<{id: string, name: string}>;
  onMetricChange: (metricId: string, position: 'primary' | 'secondary') => void;
  selectedMetrics: {
    primary: string;
    secondary: string;
  };
  correlationStrength?: number;
  correlationDirection?: 'positive' | 'negative' | 'none';
}

const MetricCorrelation = ({ 
  data, 
  metrics, 
  onMetricChange, 
  selectedMetrics,
  correlationStrength = 0,
  correlationDirection = 'none'
}: MetricCorrelationProps) => {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <CardTitle>Correlação entre Métricas</CardTitle>
            <CardDescription>Analise como suas métricas se relacionam</CardDescription>
          </div>
          <div className="flex flex-wrap gap-2">
            <Select 
              value={selectedMetrics.primary}
              onValueChange={(value) => onMetricChange(value, 'primary')}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Primeira métrica" />
              </SelectTrigger>
              <SelectContent>
                {metrics.map(metric => (
                  <SelectItem key={metric.id} value={metric.id}>{metric.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select 
              value={selectedMetrics.secondary}
              onValueChange={(value) => onMetricChange(value, 'secondary')}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Segunda métrica" />
              </SelectTrigger>
              <SelectContent>
                {metrics.map(metric => (
                  <SelectItem key={metric.id} value={metric.id}>{metric.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 p-3 rounded-lg bg-muted/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-medium">Correlação:</span>
              {correlationDirection === 'positive' && (
                <div className="flex items-center text-green-600 dark:text-green-500">
                  <ArrowUpRight size={16} className="mr-1" />
                  Positiva
                </div>
              )}
              {correlationDirection === 'negative' && (
                <div className="flex items-center text-red-600 dark:text-red-500">
                  <ArrowDownRight size={16} className="mr-1" />
                  Negativa
                </div>
              )}
              {correlationDirection === 'none' && (
                <div className="flex items-center text-amber-600 dark:text-amber-500">
                  <MoveHorizontal size={16} className="mr-1" />
                  Sem correlação significativa
                </div>
              )}
            </div>
            <div className="text-sm">
              Força: <span className="font-mono">{Math.abs(correlationStrength).toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        <div className="h-[300px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorMetric1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorMetric2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Area 
                yAxisId="left"
                type="monotone" 
                dataKey="metric1Value" 
                stroke="#8884d8" 
                fillOpacity={1} 
                fill="url(#colorMetric1)" 
              />
              <Area 
                yAxisId="right"
                type="monotone" 
                dataKey="metric2Value" 
                stroke="#82ca9d" 
                fillOpacity={1} 
                fill="url(#colorMetric2)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        <div className="flex justify-between mt-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-[#8884d8] mr-2"></div>
            <span>{metrics.find(m => m.id === selectedMetrics.primary)?.name || 'Métrica 1'}</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-[#82ca9d] mr-2"></div>
            <span>{metrics.find(m => m.id === selectedMetrics.secondary)?.name || 'Métrica 2'}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricCorrelation;
