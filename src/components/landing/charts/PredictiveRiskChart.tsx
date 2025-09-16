import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const riskData = [
  { mes: 'Jan', cardiovascular: 15, diabetes: 12, mentalHealth: 8 },
  { mes: 'Fev', cardiovascular: 18, diabetes: 14, mentalHealth: 10 },
  { mes: 'Mar', cardiovascular: 22, diabetes: 16, mentalHealth: 12 },
  { mes: 'Abr', cardiovascular: 19, diabetes: 18, mentalHealth: 14 },
  { mes: 'Mai', cardiovascular: 25, diabetes: 20, mentalHealth: 16 },
  { mes: 'Jun', cardiovascular: 23, diabetes: 22, mentalHealth: 18 },
];

const PredictiveRiskChart = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Predições de Risco por IA</CardTitle>
        <CardDescription>Tendências preditivas baseadas em machine learning</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={riskData}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis dataKey="mes" />
            <YAxis />
            <Tooltip 
              formatter={(value, name) => [`${value}%`, name]}
              labelFormatter={(label) => `Mês: ${label}`}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="cardiovascular" 
              stroke="hsl(var(--destructive))" 
              strokeWidth={2}
              name="Cardiovascular"
            />
            <Line 
              type="monotone" 
              dataKey="diabetes" 
              stroke="hsl(var(--warning))" 
              strokeWidth={2}
              name="Diabetes"
            />
            <Line 
              type="monotone" 
              dataKey="mentalHealth" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2}
              name="Saúde Mental"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default PredictiveRiskChart;