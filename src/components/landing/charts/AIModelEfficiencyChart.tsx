import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const modelData = [
  { modelo: 'OCR Médico', precisao: 98.5 },
  { modelo: 'Predição Surtos', precisao: 94.2 },
  { modelo: 'Análise Lab', precisao: 96.8 },
  { modelo: 'Triagem IA', precisao: 92.1 },
  { modelo: 'Diagnóstico', precisao: 89.7 },
];

const AIModelEfficiencyChart = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Eficiência dos Modelos de IA</CardTitle>
        <CardDescription>Precisão dos algoritmos de machine learning</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={modelData}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis dataKey="modelo" angle={-45} textAnchor="end" height={80} />
            <YAxis domain={[80, 100]} />
            <Tooltip 
              formatter={(value) => [`${value}%`, 'Precisão']}
              labelFormatter={(label) => `Modelo: ${label}`}
            />
            <Bar 
              dataKey="precisao" 
              fill="hsl(var(--primary))"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default AIModelEfficiencyChart;