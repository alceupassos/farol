import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const roiData = [
  { trimestre: 'Q1 2024', investimento: 500000, economia: 320000, roi: 64 },
  { trimestre: 'Q2 2024', investimento: 650000, economia: 580000, roi: 89 },
  { trimestre: 'Q3 2024', investimento: 750000, economia: 890000, roi: 119 },
  { trimestre: 'Q4 2024', investimento: 850000, economia: 1250000, roi: 147 },
];

const BudgetROIChart = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">ROI Orçamentário</CardTitle>
        <CardDescription>Retorno sobre investimento em saúde pública</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={roiData}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis dataKey="trimestre" />
            <YAxis />
            <Tooltip 
              formatter={(value, name) => {
                if (name === 'roi') return [`${value}%`, 'ROI'];
                return [`R$ ${(value as number).toLocaleString()}`, name];
              }}
              labelFormatter={(label) => `Período: ${label}`}
            />
            <Legend />
            <Area 
              type="monotone" 
              dataKey="economia" 
              stackId="1"
              stroke="hsl(var(--primary))" 
              fill="hsl(var(--primary))"
              fillOpacity={0.6}
              name="Economia Gerada"
            />
            <Area 
              type="monotone" 
              dataKey="investimento" 
              stackId="2"
              stroke="hsl(var(--secondary))" 
              fill="hsl(var(--secondary))"
              fillOpacity={0.6}
              name="Investimento"
            />
          </AreaChart>
        </ResponsiveContainer>
        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-primary">147%</div>
            <div className="text-sm text-muted-foreground">ROI Atual</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">R$ 1.25M</div>
            <div className="text-sm text-muted-foreground">Economia Q4</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">R$ 850K</div>
            <div className="text-sm text-muted-foreground">Investimento Q4</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetROIChart;