
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  CartesianGrid, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend 
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart4, CheckCircle } from 'lucide-react';

interface HeartRateDataPoint {
  date: string;
  rest: number;
  activity: number;
}

interface HeartRateChartProps {
  data: HeartRateDataPoint[];
}

const HeartRateChart = ({ data }: HeartRateChartProps) => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Frequência Cardíaca</CardTitle>
          <CardDescription>
            Histórico e tendências da sua frequência cardíaca
          </CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 10, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar 
                dataKey="rest" 
                name="Em Repouso" 
                fill="#0ea5e9" 
                barSize={20}
              />
              <Bar 
                dataKey="activity" 
                name="Em Atividade" 
                fill="#f97316" 
                barSize={20}
              />
            </BarChart>
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
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Dentro da Meta
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Sua frequência cardíaca em repouso se mantém na faixa ideal (60-80 bpm).
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">
              <div className="flex items-center">
                <BarChart4 className="h-4 w-4 text-primary mr-2" />
                Boa Recuperação
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Seu tempo de recuperação após exercícios melhorou em 12% no último mês.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HeartRateChart;
