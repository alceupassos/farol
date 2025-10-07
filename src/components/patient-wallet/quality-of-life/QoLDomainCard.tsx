
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface QoLDomainCardProps {
  domain: {
    name: string;
    score: string;
    objective: string;
    trendIcon: React.ReactNode;
    tooltip: string;
  };
}

const sampleDomainChartData = [
  { name: 'D-6', value: 2 },
  { name: 'D-5', value: 1 },
  { name: 'D-4', value: 2 },
  { name: 'D-3', value: 3 },
  { name: 'D-2', value: 2 },
  { name: 'D-1', value: 2 },
  { name: 'Hoje', value: 1 },
];

const QoLDomainCard: React.FC<QoLDomainCardProps> = ({ domain }) => {
  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="cursor-default w-full">
              <CardTitle className="text-base font-semibold text-center flex items-center justify-center">
                {domain.name} <Info size={12} className="ml-1 text-gray-400" />
              </CardTitle>
            </TooltipTrigger>
            <TooltipContent><p>{domain.tooltip}</p></TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <CardDescription className="text-sm text-center text-muted-foreground mt-1">
          {domain.score} {domain.trendIcon}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between">
        <ResponsiveContainer width="100%" height={80}>
          <LineChart data={sampleDomainChartData} margin={{ top: 5, right: 5, left: -30, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
            <XAxis dataKey="name" fontSize={10} axisLine={false} tickLine={false} />
            <YAxis fontSize={10} domain={['dataMin - 1', 'dataMax + 1']} axisLine={false} tickLine={false} />
            <RechartsTooltip 
              contentStyle={{fontSize: '10px', padding: '2px 5px', borderRadius: '4px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)'}} 
              itemStyle={{padding: '0'}}
              labelStyle={{display: 'none'}}
            />
            <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} dot={{ r: 2 }} activeDot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
        <p className="text-xs text-center text-muted-foreground mt-2">{domain.objective}</p>
      </CardContent>
    </Card>
  );
};

export default QoLDomainCard;
