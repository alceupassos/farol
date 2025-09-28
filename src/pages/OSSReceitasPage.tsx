import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FunnelChart, Funnel, Tooltip, LabelList, ResponsiveContainer } from 'recharts';

const funnelData = [
  { value: 100, name: 'Faturamento Bruto', fill: '#3b82f6' },
  { value: 80, name: 'Contas Enviadas', fill: '#60a5fa' },
  { value: 65, name: 'Contas Aprovadas', fill: '#93c5fd' },
  { value: 50, name: 'Contas Recebidas', fill: '#bfdbfe' },
  { value: 15, name: 'Glosas', fill: '#ef4444' },
];

const OSSReceitasPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Receitas e Glosas</h1>
      <Card>
        <CardHeader>
          <CardTitle>Funil de Faturamento</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <FunnelChart>
              <Tooltip />
              <Funnel dataKey="value" data={funnelData} isAnimationActive>
                <LabelList position="right" fill="#000" stroke="none" dataKey="name" />
              </Funnel>
            </FunnelChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default OSSReceitasPage;
