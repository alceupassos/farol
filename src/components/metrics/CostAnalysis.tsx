import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CostAnalysisData } from '@/modules/oss/types/kpis';
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  BarChart,
  Bar,
} from 'recharts';

interface CostAnalysisProps {
  data: CostAnalysisData;
}

const CostAnalysis: React.FC<CostAnalysisProps> = ({ data }) => {
  return (
    <section className="space-y-4">
      <header>
        <h2 className="text-xl font-semibold text-white">Análise de Custos</h2>
        <p className="text-sm text-slate-300">
          Visão integrada de custo médio por paciente, especialidade e tendência mensal.
        </p>
      </header>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="border-slate-800 bg-slate-950/80">
          <CardHeader>
            <CardTitle className="text-white">Tendência Mensal de Custos</CardTitle>
            <CardDescription className="text-slate-400">
              Custo real vs orçado consolidado — {data.averageCostVariation}.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="mes" stroke="#64748b" />
                <YAxis stroke="#64748b" tickFormatter={(value) => `R$ ${value}`} />
                <Tooltip formatter={(value: number) => `R$ ${value.toLocaleString('pt-BR')}`} />
                <Legend />
                <Line type="monotone" dataKey="custoReal" name="Custo Real" stroke="#f97316" strokeWidth={2} dot />
                <Line type="monotone" dataKey="custoOrcado" name="Custo Orçado" stroke="#38bdf8" strokeWidth={2} strokeDasharray="4 4" dot />
              </LineChart>
            </ResponsiveContainer>
            <p className="mt-4 text-xs text-slate-300">
              Custo médio atual por paciente: <span className="font-semibold text-white">R$ {data.averageCostPerPatient.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}</span>
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-800 bg-slate-950/80">
          <CardHeader>
            <CardTitle className="text-white">Custo por Especialidade</CardTitle>
            <CardDescription className="text-slate-400">
              Distribuição percentual e valor médio desembolsado por linha assistencial.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.specialtyBreakdown}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="especialidade" stroke="#64748b" tick={{ fontSize: 12 }} />
                <YAxis stroke="#64748b" tickFormatter={(value) => `R$ ${value}`} />
                <Tooltip formatter={(value: number) => `R$ ${value.toLocaleString('pt-BR')}`} />
                <Bar dataKey="custoMedio" name="Custo Médio" fill="#22c55e" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-slate-300">
              {data.specialtyBreakdown.map((item) => (
                <div key={item.especialidade} className="rounded border border-slate-800/60 bg-slate-900/60 p-2">
                  <p className="font-semibold text-white">{item.especialidade}</p>
                  <p>Custo médio: R$ {item.custoMedio.toLocaleString('pt-BR')}</p>
                  <p>Participação: {item.contribuicao}%</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CostAnalysis;
