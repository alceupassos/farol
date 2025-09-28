import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { TrendingUp, DollarSign, Calculator, AlertTriangle } from 'lucide-react';

const OSSSimuladorDono = () => {
  const [mixPrivado, setMixPrivado] = React.useState(18);
  const [reduGlosa, setReduGlosa] = React.useState(1.5);
  const [reduCusto, setReduCusto] = React.useState(3);

  const projecao = useMemo(() => {
    const receitaBase = 4.2; // R$ mi
    const impactoPrivado = receitaBase * (mixPrivado / 100);
    const impactoGlosa = 0.45 * (reduGlosa / 100);
    const impactoCusto = 0.6 * (reduCusto / 100);

    const incremento = impactoPrivado + impactoGlosa + impactoCusto;
    return {
      receitaProjetada: receitaBase + incremento,
      margem: 21 + reduCusto * 0.6,
      payback: Math.max(4, 8 - reduGlosa * 0.8),
      investimento: 850000,
    };
  }, [mixPrivado, reduGlosa, reduCusto]);

  const formatCurrency = (valor: number) => `R$ ${(valor).toFixed(2)}M`;

  return (
      <div className="min-h-screen space-y-8 bg-gradient-to-br from-slate-950 via-slate-900 to-black p-6 text-slate-100">
        <header className="space-y-2">
          <Badge className="bg-emerald-500/20 text-emerald-200">Simulações</Badge>
          <h1 className="text-3xl font-bold text-white">Simulador estratégico — Dono da OSS</h1>
          <p className="text-sm text-slate-300">
            Ajuste variáveis financeiras e operacionais para visualizar impacto no resultado contratual, payback e caixa disponível.
          </p>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
          <Card className="border border-white/10 bg-slate-900/80 backdrop-blur">
            <CardHeader className="flex flex-col gap-2">
              <CardTitle className="flex items-center gap-2 text-white">
                <Calculator className="h-5 w-5 text-sky-300" />Parâmetros do cenário
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-sm text-slate-300">
              <div>
                <p className="font-semibold text-white">Ampliação do mix privado</p>
                <Slider value={[mixPrivado]} onValueChange={(v) => setMixPrivado(v[0])} min={10} max={30} step={1} />
                <p className="text-xs text-slate-400">Aumento percentual na participação de convênios/particular. Atual: {mixPrivado}%</p>
              </div>
              <div>
                <p className="font-semibold text-white">Redução da glosa técnica (%)</p>
                <Slider value={[reduGlosa]} onValueChange={(v) => setReduGlosa(v[0])} min={0.5} max={4} step={0.1} />
                <p className="text-xs text-slate-400">Impacto via automação e revisão documental. Atual: {reduGlosa.toFixed(1)}%</p>
              </div>
              <div>
                <p className="font-semibold text-white">Redução de custo direto (%)</p>
                <Slider value={[reduCusto]} onValueChange={(v) => setReduCusto(v[0])} min={1} max={6} step={0.5} />
                <p className="text-xs text-slate-400">Negociação OPME, escalas e logística. Atual: {reduCusto.toFixed(1)}%</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-white/10 bg-slate-900/80 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <TrendingUp className="h-5 w-5 text-emerald-300" />Resultados do cenário
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-slate-300">
              <div className="rounded-2xl bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Receita prevista</p>
                <p className="text-3xl font-semibold text-white">{formatCurrency(projecao.receitaProjetada)}</p>
                <span className="text-xs text-slate-400">Receita base considerada: R$ 4,20M</span>
              </div>
              <div className="grid gap-3">
                <div className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3">
                  <span>Margem estimada</span>
                  <span className="text-emerald-300">{projecao.margem.toFixed(1)}%</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3">
                  <span>Payback</span>
                  <span className="text-emerald-300">{projecao.payback.toFixed(1)} meses</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3">
                  <span>Investimento estimado</span>
                  <span className="text-emerald-300">R$ {projecao.investimento.toLocaleString('pt-BR')}</span>
                </div>
              </div>
              <div className="rounded-2xl bg-emerald-500/10 p-3 text-xs text-emerald-200">
                <strong>Insights IA:</strong> direcione R$ 260k para automação de glosa e R$ 180k para BI de OPME; 35% do ganho vem da renegociação de mix.
              </div>
            </CardContent>
          </Card>
        </section>

        <Card className="border border-white/10 bg-slate-900/80 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <DollarSign className="h-5 w-5 text-amber-300" />Fluxo de caixa projetado
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 text-xs text-slate-300">
            {[{
              mes: 'Mês 1',
              descricao: 'Implementação de automação e treinamento',
              fluxo: '-R$ 420k'
            }, {
              mes: 'Mês 2',
              descricao: 'Entrada incremental convênio + queda de glosa',
              fluxo: '+R$ 180k'
            }, {
              mes: 'Mês 3',
              descricao: 'Economia de OPME e produtividade',
              fluxo: '+R$ 220k'
            }, {
              mes: 'Mês 4',
              descricao: 'Resultado consolidado e margem >22%',
              fluxo: '+R$ 260k'
            }].map((linha) => (
              <div key={linha.mes} className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
                <span className="font-medium text-white">{linha.mes}</span>
                <span className="text-slate-400">{linha.descricao}</span>
                <span className="text-emerald-300">{linha.fluxo}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border border-white/10 bg-slate-900/80 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <AlertTriangle className="h-5 w-5 text-rose-300" />Riscos e mitigação
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 text-sm text-slate-300">
            <div className="rounded-2xl bg-white/5 p-3">
              <p className="font-semibold text-white">Dependência de mix privado</p>
              <p className="text-xs text-slate-400">Diversificar convênios, estabelecer contratos guarda-chuva e renegociar reajustes anuais.</p>
            </div>
            <div className="rounded-2xl bg-white/5 p-3">
              <p className="font-semibold text-white">Capacidade operacional</p>
              <p className="text-xs text-slate-400">Estruturar equipe volante e teleatendimento para absorver a demanda incremental.</p>
            </div>
            <div className="rounded-2xl bg-white/5 p-3">
              <p className="font-semibold text-white">Integração TI</p>
              <p className="text-xs text-slate-400">Garantir redundância e SLA com fornecedores antes de ativar automações críticas.</p>
            </div>
          </CardContent>
        </Card>
      </div>
  );
};

export default OSSSimuladorDono;
