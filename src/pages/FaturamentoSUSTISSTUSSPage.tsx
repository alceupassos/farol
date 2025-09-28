import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  AlertTriangle,
  Calculator,
  CheckCircle2,
  ClipboardList,
  DollarSign,
  FileCheck2,
  Globe,
  PieChart,
  Shield,
  TrendingUp
} from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, AreaChart, Area, BarChart, Bar, Legend } from 'recharts';

const receitaMensal = [
  { mes: 'Jan', sus: 3.1, conv: 1.2, particular: 0.5 },
  { mes: 'Fev', sus: 3.4, conv: 1.15, particular: 0.52 },
  { mes: 'Mar', sus: 3.55, conv: 1.28, particular: 0.54 },
  { mes: 'Abr', sus: 3.48, conv: 1.34, particular: 0.63 },
  { mes: 'Mai', sus: 3.62, conv: 1.37, particular: 0.6 },
  { mes: 'Jun', sus: 3.78, conv: 1.45, particular: 0.66 },
];

const glosasPorMotivo = [
  { motivo: 'Compatibilidade CID', percentual: 28, valor: 0.42 },
  { motivo: 'Documentação incompleta', percentual: 24, valor: 0.36 },
  { motivo: 'Procedimento não autorizado', percentual: 19, valor: 0.29 },
  { motivo: 'Erro tabela TUSS', percentual: 16, valor: 0.24 },
  { motivo: 'Divergência APAC', percentual: 13, valor: 0.19 },
];

const pendenciasFinanceiras = [
  { id: 'P-202406-018', tipo: 'APAC Oncologia', valor: 'R$ 182.430,00', prazo: '7 dias', status: 'Auditoria clínica' },
  { id: 'P-202406-025', tipo: 'AIH Ortopedia', valor: 'R$ 96.780,00', prazo: '3 dias', status: 'Reapresentação' },
  { id: 'P-202406-031', tipo: 'Consulta TUSS', valor: 'R$ 18.240,00', prazo: '1 dia', status: 'Cobrança complementar' },
];

const auditoriaDetalhes = [
  { processo: 'Lote TUSS #321', responsavel: 'Controlleria', status: 'Concluído', recuperado: 'R$ 86.400,00' },
  { processo: 'APAC #1981', responsavel: 'Oncologia', status: 'Em andamento', recuperado: 'R$ 0,00' },
  { processo: 'AIH #554', responsavel: 'Faturamento', status: 'Concluído', recuperado: 'R$ 42.780,00' },
];

const FaturamentoSUSTISSTUSSPage = () => {
  return (
    <div className="min-h-screen space-y-8 bg-slate-950 px-6 py-8 text-slate-100">
      <header className="space-y-3">
        <div className="flex items-center gap-3">
          <DollarSign className="h-10 w-10 text-emerald-400" />
          <div>
            <h1 className="text-3xl font-bold">Faturamento SUSTISS/TUSS</h1>
            <p className="text-sm text-slate-400">
              Governaça financeira completa para diretoria hospitalar com foco em maximização de receita SUS, convênios e redução de glosas.
            </p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[ 
            {
              titulo: 'Receita Bruta 30 dias',
              valor: 'R$ 5,89M',
              variacao: '+6,2%',
              detalhe: 'Meta atingida (103%)',
              icon: <TrendingUp className="h-5 w-5" />
            },
            {
              titulo: 'Índice de Glosas',
              valor: '3,4%',
              variacao: '-0,8pp',
              detalhe: 'Abaixo limite 4,5%',
              icon: <Shield className="h-5 w-5" />
            },
            {
              titulo: 'APAC Oncologia',
              valor: 'R$ 1,12M',
              variacao: '+18%',
              detalhe: 'Glosas recuperáveis R$ 420k',
              icon: <ClipboardList className="h-5 w-5" />
            },
            {
              titulo: 'Tempo Médio Recebimento',
              valor: '28 dias',
              variacao: '-4 dias',
              detalhe: 'Meta CFO: 30 dias',
              icon: <FileCheck2 className="h-5 w-5" />
            }
          ].map((metric) => (
            <Card key={metric.titulo} className="border-slate-800 bg-slate-900/70">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-200">{metric.titulo}</CardTitle>
                <span className="text-slate-400">{metric.icon}</span>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold text-white">{metric.valor}</div>
                <p className="mt-2 text-xs text-emerald-400">{metric.variacao} vs mês anterior</p>
                <CardDescription className="pt-2 text-xs text-slate-400">{metric.detalhe}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </header>

      <Card className="border-slate-800 bg-slate-900/70">
        <CardHeader>
          <CardTitle className="text-lg text-white">Receita por Fonte Pagadora</CardTitle>
          <CardDescription className="text-slate-400">
            Evolução dos últimos 6 meses considerando AIH + APAC + procedimentos ambulatoriais.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={receitaMensal}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="mes" stroke="#64748b" />
              <YAxis stroke="#64748b" tickFormatter={(value) => `R$ ${value.toFixed(1)}M`} />
              <Tooltip formatter={(value: number) => `R$ ${value.toFixed(2)}M`} />
              <Area type="monotone" dataKey="sus" stackId="1" stroke="#22c55e" fill="#22c55e" fillOpacity={0.35} name="SUS" />
              <Area type="monotone" dataKey="conv" stackId="1" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.35} name="Convênios" />
              <Area type="monotone" dataKey="particular" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.35} name="Particular" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card className="border-slate-800 bg-slate-900/70">
          <CardHeader>
            <CardTitle className="text-lg text-white">Top 5 Motivos de Glosa</CardTitle>
            <CardDescription className="text-slate-400">
              Monitoramento crítico para atuação imediata das equipes de faturamento e auditoria.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={glosasPorMotivo}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="motivo" stroke="#64748b" tick={{ fontSize: 12 }} />
                <YAxis stroke="#64748b" tickFormatter={(value) => `${value}%`} />
                <Tooltip formatter={(value: number) => `${value}%`} />
                <Legend />
                <Bar dataKey="percentual" name="Percentual" fill="#ef4444" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {glosasPorMotivo.map((item) => (
                <div key={item.motivo} className="flex items-center justify-between rounded-lg border border-rose-500/30 bg-rose-500/10 px-4 py-2">
                  <span className="text-sm text-rose-100">{item.motivo}</span>
                  <span className="text-xs text-rose-200">R$ {(item.valor * 1_000_000).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-800 bg-slate-900/70">
          <CardHeader>
            <CardTitle className="text-lg text-white">Pendências Financeiras Prioritárias</CardTitle>
            <CardDescription className="text-slate-400">Processos com risco direto para fluxo de caixa e resultado.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Processo</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Prazo</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendenciasFinanceiras.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>{item.tipo}</TableCell>
                    <TableCell>{item.valor}</TableCell>
                    <TableCell>{item.prazo}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-amber-500/20 text-amber-200">
                        {item.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>

      <Tabs defaultValue="operacional" className="space-y-4">
        <TabsList className="bg-slate-900/40">
          <TabsTrigger value="operacional">Operacional</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="acoes">Planos de Ação</TabsTrigger>
        </TabsList>

        <TabsContent value="operacional" className="space-y-4">
          <Card className="border-slate-800 bg-slate-900/70">
            <CardHeader>
              <CardTitle className="text-lg text-white">Linha do Tempo de Receita</CardTitle>
              <CardDescription className="text-slate-400">
                Aprovação, transmissão, glosa e recebimento com visão preditiva de caixa.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={receitaMensal}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="mes" stroke="#64748b" />
                  <YAxis stroke="#64748b" tickFormatter={(value) => `R$ ${value.toFixed(1)}M`} />
                  <Tooltip formatter={(value: number) => `R$ ${value.toFixed(2)}M`} />
                  <Line type="monotone" dataKey="sus" stroke="#22c55e" strokeWidth={2} name="SUS" />
                  <Line type="monotone" dataKey="conv" stroke="#f59e0b" strokeWidth={2} name="Convênios" />
                  <Line type="monotone" dataKey="particular" stroke="#ef4444" strokeWidth={2} name="Particular" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          <Card className="border-slate-800 bg-slate-900/70">
            <CardHeader>
              <CardTitle className="text-lg text-white">Conformidade Regulatória</CardTitle>
              <CardDescription className="text-slate-400">
                Monitoramento contínuo com foco em auditorias SUS, convênios e LGPD.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              {[ 
                {
                  titulo: 'e-SUS + RNDS',
                  descricao: 'Transmissão diária validada com auditoria de consistência automática.',
                  icon: <Globe className="h-5 w-5" />
                },
                {
                  titulo: 'TISS/TUSS',
                  descricao: 'Atualização TUSS 4.03 implementada com checklist de faturamento.',
                  icon: <PieChart className="h-5 w-5" />
                },
                {
                  titulo: 'Controles Internos CFO',
                  descricao: 'Política segregação funções 100% aderente e evidências em portal.',
                  icon: <CheckCircle2 className="h-5 w-5" />
                },
                {
                  titulo: 'Auditoria Preventiva',
                  descricao: 'Robôs de validação pré-envio com 250 regras clínicas e financeiras.',
                  icon: <Calculator className="h-5 w-5" />
                }
              ].map((item) => (
                <div key={item.titulo} className="flex items-start gap-3 rounded-lg border border-slate-800/80 bg-slate-900/60 p-4">
                  <span className="text-emerald-300">{item.icon}</span>
                  <div>
                    <h3 className="text-sm font-semibold text-white">{item.titulo}</h3>
                    <p className="mt-1 text-sm text-slate-300">{item.descricao}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="acoes" className="space-y-4">
          <Card className="border-slate-800 bg-slate-900/70">
            <CardHeader>
              <CardTitle className="text-lg text-white">Ações Imediatas</CardTitle>
              <CardDescription className="text-slate-400">Plano executado pela diretoria financeira e auditoria.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[ 
                {
                  prioridade: 'Crítico',
                  descricao: 'Implantar dupla checagem clínica para APAC Oncologia com IA de validação.',
                  responsavel: 'Diretoria Assistencial',
                },
                {
                  prioridade: 'Grave',
                  descricao: 'Ofensiva junto a 3 convênios com baixa adimplência – comitê CFO + jurídico.',
                  responsavel: 'Controladoria e Jurídico',
                },
                {
                  prioridade: 'Atenção',
                  descricao: 'Expandir robô de conferência de tabelas TUSS para 100% dos lotes.',
                  responsavel: 'TI & Faturamento',
                },
              ].map((acao) => (
                <div key={acao.descricao} className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4">
                  <div className="flex items-center justify-between">
                    <Badge className={acao.prioridade === 'Crítico' ? 'bg-rose-500/20 text-rose-200' : acao.prioridade === 'Grave' ? 'bg-amber-500/20 text-amber-200' : 'bg-emerald-500/20 text-emerald-200'}>
                      {acao.prioridade}
                    </Badge>
                    <span className="text-xs text-slate-400">Responsável: {acao.responsavel}</span>
                  </div>
                  <p className="mt-3 text-sm text-slate-200">{acao.descricao}</p>
                </div>
              ))}
              <div className="flex justify-end">
                <Button variant="secondary" className="bg-emerald-500/20 text-emerald-200 hover:bg-emerald-500/30">
                  Exportar Plano de Ação
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="border-slate-800 bg-slate-900/70">
        <CardHeader>
          <CardTitle className="text-lg text-white">Painel de Auditoria Financeira</CardTitle>
          <CardDescription className="text-slate-400">
            Resultado das auditorias realizadas nos últimos 45 dias com foco em recuperação de receita.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Processo</TableHead>
                <TableHead>Responsável</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Valor Recuperado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {auditoriaDetalhes.map((registro) => (
                <TableRow key={registro.processo}>
                  <TableCell className="font-medium">{registro.processo}</TableCell>
                  <TableCell>{registro.responsavel}</TableCell>
                  <TableCell>
                    <Badge className={registro.status === 'Concluído' ? 'bg-emerald-500/20 text-emerald-200' : 'bg-amber-500/20 text-amber-200'}>
                      {registro.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{registro.recuperado}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="border-rose-500/40 bg-rose-500/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg text-rose-100">
            <AlertTriangle className="h-5 w-5" /> Radar de Riscos Financeiros Imediatos
          </CardTitle>
          <CardDescription className="text-rose-200">
            Acionamento prioritário para Diretoria Financeira, Controlleria e Auditoria Clínica.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          {[ 
            {
              titulo: 'Divergência TUSS – Ortopedia',
              impacto: 'Risco R$ 210 mil/mês',
              acao: 'Checklist automático + revisão protocolos',
            },
            {
              titulo: 'Prazo médio Convênio LifeCare',
              impacto: 'Atraso 42 dias',
              acao: 'Negociação CFO agendada + bloqueio eletivo',
            },
            {
              titulo: 'Glosas APAC Quimioterapia',
              impacto: 'R$ 120 mil pendente',
              acao: 'Auditoria in loco + reforço documentação clínica',
            },
          ].map((risco) => (
            <div key={risco.titulo} className="rounded-lg border border-rose-500/40 bg-rose-500/15 p-4">
              <h3 className="text-sm font-semibold text-white">{risco.titulo}</h3>
              <p className="mt-2 text-xs text-rose-200">Impacto: {risco.impacto}</p>
              <p className="mt-2 text-sm text-white">{risco.acao}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default FaturamentoSUSTISSTUSSPage;
