
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  CartesianGrid, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend,
  ReferenceLine
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle } from 'lucide-react';

interface BloodPressureDataPoint {
  date: string;
  systolic: number;
  diastolic: number;
}

interface BloodPressureChartProps {
  data: BloodPressureDataPoint[];
}

const BloodPressureChart = ({ data }: BloodPressureChartProps) => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Pressão Arterial</CardTitle>
          <CardDescription>
            Histórico e tendências da sua pressão arterial
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
              <YAxis domain={[60, 160]} />
              <Tooltip />
              <Legend />
              <ReferenceLine y={120} stroke="#ff0000" strokeDasharray="3 3" label="Limite Sistólica" />
              <ReferenceLine y={80} stroke="#ff0000" strokeDasharray="3 3" label="Limite Diastólica" />
              <Line 
                type="monotone" 
                dataKey="systolic" 
                name="Sistólica"
                stroke="#f97316" 
                strokeWidth={2}
                dot={{ stroke: '#f97316', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line 
                type="monotone" 
                dataKey="diastolic" 
                name="Diastólica"
                stroke="#0ea5e9" 
                strokeWidth={2}
                dot={{ stroke: '#0ea5e9', strokeWidth: 2, r: 4 }}
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
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Tendência Positiva
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Redução de 15 pontos na pressão sistólica comparado aos níveis de 30 dias atrás.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">
              <div className="flex items-center">
                <AlertCircle className="h-4 w-4 text-yellow-500 mr-2" />
                Recomendação
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Mantenha o monitoramento regular e continue com sua medicação conforme prescrito.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BloodPressureChart;
