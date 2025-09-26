import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle, AlertTriangle, RefreshCw, FileText } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const tempestividade = [
  { mes: 'Jan', tempestividade: 94 },
  { mes: 'Fev', tempestividade: 95 },
  { mes: 'Mar', tempestividade: 96 },
  { mes: 'Abr', tempestividade: 97 },
  { mes: 'Mai', tempestividade: 98 },
  { mes: 'Jun', tempestividade: 98 }
];

const enviosRecentes = [
  { lote: '2025-09-20', status: 'Homologado', tempo: '6 horas' },
  { lote: '2025-09-13', status: 'Homologado', tempo: '5 horas' },
  { lote: '2025-09-06', status: 'Retorno com alerta', tempo: '18 horas' }
];

const OSSAudespPage = () => {
  return (
    <MainLayout>
      <div className="min-h-screen space-y-8 bg-gradient-to-br from-slate-950 via-slate-900 to-black p-6 text-slate-100">
        <header className="space-y-2">
          <Badge className="bg-sky-500/20 text-sky-200">Processos</Badge>
          <h1 className="text-3xl font-bold text-white">Audesp • Prestação de contas</h1>
          <p className="max-w-3xl text-sm text-slate-300">
            Painel de acompanhamento dos lotes Audesp, tempestividade de envios e rotina de validações automáticas.
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[{
            titulo: 'Envios últimos 30 dias',
            valor: '12 lotes',
            detalhe: '100% homologados'
          }, {
            titulo: 'Alertas Audesp ativos',
            valor: '1 alerta',
            detalhe: 'Schema XML — responsável TI'
          }, {
            titulo: 'Tempo médio de homologação',
            valor: '6h18',
            detalhe: 'Meta 8 horas'
          }, {
            titulo: 'Checklist automatizado',
            valor: '98% campos OK',
            detalhe: '2 campos com ajuste recorrente'
          }].map((indicador) => (
            <Card key={indicador.titulo} className="border border-white/10 bg-slate-900/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-sm text-slate-300">{indicador.titulo}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-2xl font-semibold text-white">{indicador.valor}</p>
                <span className="text-xs text-slate-400">{indicador.detalhe}</span>
              </CardContent>
            </Card>
          ))}
        </section>

        <Card className="border border-white/10 bg-slate-900/80 backdrop-blur">
          <CardHeader className="flex flex-col gap-2">
            <CardTitle className="flex items-center gap-2 text-white">
              <Clock className="h-5 w-5 text-sky-300" /> Tempestividade x meta (% dentro do prazo)
            </CardTitle>
            <p className="text-xs text-slate-400">Jan–jun 2025 • Meta 95%</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={tempestividade}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis dataKey="mes" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" domain={[90, 100]} tickFormatter={(value) => `${value}%`} />
                <Tooltip
                  contentStyle={{
                    background: '#0f172a',
                    border: '1px solid rgba(148,163,184,0.2)',
                    borderRadius: '0.75rem',
                    color: '#e2e8f0'
                  }}
                />
                <Line type="monotone" dataKey="tempestividade" stroke="#38bdf8" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <section className="grid gap-6 lg:grid-cols-[1.3fr,1fr]">
          <Card className="border border-white/10 bg-slate-900/80 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <FileText className="h-5 w-5 text-slate-300" />Últimos envios
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-300">
              {enviosRecentes.map((envio) => (
                <div key={envio.lote} className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
                  <div>
                    <p className="font-semibold text-white">Lote {envio.lote}</p>
                    <span className="text-xs text-slate-400">Tempo de homologação: {envio.tempo}</span>
                  </div>
                  <Badge className={`bg-white/10 ${envio.status === 'Homologado' ? 'text-emerald-200' : 'text-amber-200'}`}>{envio.status}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border border-white/10 bg-slate-900/80 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <RefreshCw className="h-5 w-5 text-emerald-300" />Checklist pré-envio
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs text-slate-300">
              <div className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
                <span>Schema XML validado</span>
                <CheckCircle className="h-4 w-4 text-emerald-300" />
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
                <span>Saldo financeiro concilia</span>
                <CheckCircle className="h-4 w-4 text-emerald-300" />
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
                <span>Pendências de auditoria</span>
                <AlertTriangle className="h-4 w-4 text-amber-300" />
              </div>
              <p className="text-xs text-slate-400">Fluxo automatizado executado diariamente às 02h00.</p>
            </CardContent>
          </Card>
        </section>
      </div>
    </MainLayout>
  );
};

export default OSSAudespPage;
