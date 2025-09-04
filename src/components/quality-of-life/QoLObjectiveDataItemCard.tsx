
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface QoLObjectiveDataItemCardProps {
  data: {
    name: string;
    value: string;
    graphType: string; // "Gráfico Barras", "Anéis Progresso", "Gráfico Linha"
    tooltip: string;
  };
}

// Sample Data
const sampleLineData = Array.from({ length: 7 }, (_, i) => ({ name: `D${i+1}`, value: Math.floor(Math.random() * 30) + 60 }));
const sampleBarData = Array.from({ length: 7 }, (_, i) => ({ name: `Dia ${i+1}`, horas: Math.floor(Math.random() * 4) + 5 }));
const sampleProgressData = [{ name: 'Feito', value: 7500 }, { name: 'Meta', value: 10000-7500 }]; // For 7500 out of 10000 steps
const PROGRESS_COLORS = ['#0ea5e9', '#e2e8f0'];


const QoLObjectiveDataItemCard: React.FC<QoLObjectiveDataItemCardProps> = ({ data }) => {
  const renderChart = () => {
    switch (data.graphType) {
      case "Gráfico Barras":
        return (
          <ResponsiveContainer width="100%" height={80}>
            <BarChart data={sampleBarData} margin={{ top: 5, right: 0, left: -20, bottom: -5 }}>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
              <XAxis dataKey="name" fontSize={9} axisLine={false} tickLine={false} />
              <YAxis fontSize={9} axisLine={false} tickLine={false}/>
              <RechartsTooltip contentStyle={{fontSize: '9px', padding: '2px 4px'}} itemStyle={{padding: '0'}} labelStyle={{display: 'none'}} />
              <Bar dataKey="horas" fill="#8884d8" barSize={15} radius={[2,2,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
        );
      case "Anéis Progresso": // Implemented as a Pie Chart (Donut)
        return (
          <ResponsiveContainer width="100%" height={80}>
            <PieChart>
              <RechartsTooltip contentStyle={{fontSize: '9px', padding: '2px 4px'}} />
              <Pie
                data={sampleProgressData}
                cx="50%"
                cy="50%"
                innerRadius={25}
                outerRadius={35}
                fill="#8884d8"
                paddingAngle={2}
                dataKey="value"
                labelLine={false}
              >
                {sampleProgressData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={PROGRESS_COLORS[index % PROGRESS_COLORS.length]} />
                ))}
              </Pie>
               {/* Text in center - approximate, might need fine tuning */}
              <text x="50%" y="53%" textAnchor="middle" dominantBaseline="middle" fontSize="12" fontWeight="bold" fill="#333">
                {`${Math.round(sampleProgressData[0].value / (sampleProgressData[0].value + sampleProgressData[1].value) * 100)}%`}
              </text>
            </PieChart>
          </ResponsiveContainer>
        );
      case "Gráfico Linha":
        return (
          <ResponsiveContainer width="100%" height={80}>
            <LineChart data={sampleLineData} margin={{ top: 5, right: 5, left: -20, bottom: -5 }}>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
              <XAxis dataKey="name" fontSize={9} axisLine={false} tickLine={false} />
              <YAxis fontSize={9} axisLine={false} tickLine={false} />
              <RechartsTooltip contentStyle={{fontSize: '9px', padding: '2px 4px'}} itemStyle={{padding: '0'}} labelStyle={{display: 'none'}} />
              <Line type="monotone" dataKey="value" stroke="#82ca9d" strokeWidth={2} dot={{r:1}} activeDot={{r:3}} />
            </LineChart>
          </ResponsiveContainer>
        );
      default:
        return <div className="h-20 flex items-center justify-center text-xs text-muted-foreground">Gráfico indisponível</div>;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="cursor-default w-full">
              <CardTitle className="text-base font-semibold text-center flex items-center justify-center">
                {data.name} <Info size={12} className="ml-1 text-gray-400" />
              </CardTitle>
            </TooltipTrigger>
            <TooltipContent><p>{data.tooltip}</p></TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <CardDescription className="text-sm text-center text-muted-foreground mt-1">{data.value}</CardDescription>
      </CardHeader>
      <CardContent>
        {renderChart()}
      </CardContent>
    </Card>
  );
};

export default QoLObjectiveDataItemCard;
