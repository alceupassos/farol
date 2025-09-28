import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DollarSign, TrendingUp, Zap } from 'lucide-react';

const monthlyData = [
  { month: 'Jan', revenue: 4000, cost: 2400, profit: 1600 },
  { month: 'Fev', revenue: 3000, cost: 1398, profit: 1602 },
  { month: 'Mar', revenue: 5000, cost: 9800, profit: -4800 },
  { month: 'Abr', revenue: 4780, cost: 3908, profit: 872 },
  { month: 'Mai', revenue: 5890, cost: 4800, profit: 1090 },
  { month: 'Jun', revenue: 4390, cost: 3800, profit: 590 },
];

const OSSVisionExecutivePage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Visão Executiva</h1>
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$27,450</div>
            <p className="text-xs text-muted-foreground">+20.1% em relação ao mês passado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Margem de Lucro</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+15.3%</div>
            <p className="text-xs text-muted-foreground">+2.5% em relação ao mês passado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ROI Contratual</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.8x</div>
            <p className="text-xs text-muted-foreground">Retorno sobre o investimento</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Análise Financeira Mensal</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#4ade80" name="Receita" />
              <Bar dataKey="cost" fill="#f87171" name="Custo" />
              <Line type="monotone" dataKey="profit" stroke="#38bdf8" name="Lucro" />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default OSSVisionExecutivePage;
