import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const specialtyData = [
  { especialidade: 'Cardiologia', risco: 78, demanda: 85, capacidade: 70 },
  { especialidade: 'Endocrinologia', risco: 72, demanda: 90, capacidade: 65 },
  { especialidade: 'Neurologia', risco: 65, demanda: 75, capacidade: 80 },
  { especialidade: 'Oncologia', risco: 88, demanda: 95, capacidade: 60 },
  { especialidade: 'Pediatria', risco: 45, demanda: 70, capacidade: 85 },
  { especialidade: 'Psiquiatria', risco: 82, demanda: 88, capacidade: 55 },
];

const SpecialtyAnalyticsChart = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Analytics de Especialidades</CardTitle>
        <CardDescription>Distribuição de riscos, demanda e capacidade por especialidade</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart data={specialtyData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="especialidade" tick={{ fontSize: 12 }} />
            <PolarRadiusAxis 
              angle={0} 
              domain={[0, 100]} 
              tick={{ fontSize: 10 }}
            />
            <Radar
              name="Nível de Risco"
              dataKey="risco"
              stroke="hsl(var(--destructive))"
              fill="hsl(var(--destructive))"
              fillOpacity={0.3}
              strokeWidth={2}
            />
            <Radar
              name="Demanda"
              dataKey="demanda"
              stroke="hsl(var(--warning))"
              fill="hsl(var(--warning))"
              fillOpacity={0.3}
              strokeWidth={2}
            />
            <Radar
              name="Capacidade"
              dataKey="capacidade"
              stroke="hsl(var(--primary))"
              fill="hsl(var(--primary))"
              fillOpacity={0.3}
              strokeWidth={2}
            />
            <Tooltip 
              formatter={(value, name) => [`${value}%`, name]}
            />
          </RadarChart>
        </ResponsiveContainer>
        <div className="mt-4 flex justify-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-destructive rounded-full"></div>
            <span>Nível de Risco</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-warning rounded-full"></div>
            <span>Demanda</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span>Capacidade</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SpecialtyAnalyticsChart;