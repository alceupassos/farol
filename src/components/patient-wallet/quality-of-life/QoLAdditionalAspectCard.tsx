
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface QoLAdditionalAspectCardProps {
  aspect: {
    name: string;
    score: string;
    trend: 'up' | 'down' | 'stable';
    tooltip: string;
  };
  renderSmallTrendIcon: (trend: 'up' | 'down' | 'stable') => React.ReactNode;
}

const sampleAspectChartData = [
  { name: 'Jan', score: 6.5 },
  { name: 'Fev', score: 7.0 },
  { name: 'Mar', score: 7.2 },
  { name: 'Abr', score: 7.0 },
];

const QoLAdditionalAspectCard: React.FC<QoLAdditionalAspectCardProps> = ({ aspect, renderSmallTrendIcon }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="cursor-default w-full">
              <CardTitle className="text-base font-semibold text-center flex items-center justify-center">
                {aspect.name} <Info size={12} className="ml-1 text-gray-400" />
              </CardTitle>
            </TooltipTrigger>
            <TooltipContent><p>{aspect.tooltip}</p></TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <CardDescription className="text-sm text-center text-muted-foreground mt-1">
          {aspect.score} {renderSmallTrendIcon(aspect.trend)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={60}>
          <BarChart data={sampleAspectChartData} margin={{ top: 5, right: 0, left: -30, bottom: -5 }}>
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
            <XAxis dataKey="name" fontSize={9} axisLine={false} tickLine={false} interval={0}/>
            <YAxis fontSize={9} domain={[0, 10]} axisLine={false} tickLine={false} />
            <RechartsTooltip 
              contentStyle={{fontSize: '9px', padding: '2px 4px', borderRadius: '3px', boxShadow: '0 1px 2px rgba(0,0,0,0.1)'}}
              itemStyle={{padding: '0'}}
              labelStyle={{display: 'none'}}
            />
            <Bar dataKey="score" fill="#82ca9d" barSize={10} radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default QoLAdditionalAspectCard;
