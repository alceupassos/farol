
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  CartesianGrid, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend 
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, TrendingUp } from 'lucide-react';

interface GlucoseDataPoint {
  date: string;
  glucose: number;
}

interface GlucoseChartProps {
  data: GlucoseDataPoint[];
}

const GlucoseChart = ({ data }: GlucoseChartProps) => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Glicemia</CardTitle>
          <CardDescription>
            Histórico e tendências da sua glicose sanguínea
          </CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 20, right: 10, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="glucose" 
                name="Glicose"
                stroke="#f97316" 
                strokeWidth={2}
                dot={{ stroke: '#f97316', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="text-xs text-muted-foreground text-center italic mt-3">
            * Dados fictícios não reais usado para exemplo de software
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">
              <div className="flex items-center">
                <AlertCircle className="h-4 w-4 text-yellow-500 mr-2" />
                Atenção
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Suas leituras estão na faixa de pré-diabetes (100-125 mg/dL) em 60% das medições.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">
              <div className="flex items-center">
                <TrendingUp className="h-4 w-4 text-destructive mr-2" />
                Tendência de Aumento
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Aumento médio de 8 mg/dL em comparação com o mês anterior. Considere consultar seu médico.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GlucoseChart;
