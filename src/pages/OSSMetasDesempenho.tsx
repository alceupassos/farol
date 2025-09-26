import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Target, ClipboardList, ChartBar } from 'lucide-react';
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line, BarChart, Bar, Legend } from 'recharts';

const metasExecutiva = [
	{ indicador: 'Metas pactuadas', meta: '92%', realizado: '88%', status: 'On track' },
	{ indicador: 'Margem operacional', meta: '21%', realizado: '23%', status: 'Acima' },
	{ indicador: 'Satisfação contratante', meta: '8,0', realizado: '8,4', status: 'Acima' }
];

const desempenhoMensal = [
	{ mes: 'Jan', metas: 84, realizado: 82 },
	{ mes: 'Fev', metas: 86, realizado: 85 },
	{ mes: 'Mar', metas: 87, realizado: 88 },
	{ mes: 'Abr', metas: 88, realizado: 89 },
	{ mes: 'Mai', metas: 90, realizado: 91 },
	{ mes: 'Jun', metas: 91, realizado: 92 }
];

const benchmarks = [
	{ nome: 'Hospital Referência A', margem: 19, glosa: 3.1 },
	{ nome: 'Hospital Referência B', margem: 20, glosa: 2.8 },
	{ nome: 'OSS BHCL', margem: 23, glosa: 2.9 }
];

const OSSMetasDesempenho = () => {
	const [selectedPeriod, setSelectedPeriod] = useState('trimestral');

	return (
		<MainLayout>
			<div className="min-h-screen space-y-8 bg-gradient-to-br from-slate-950 via-slate-900 to-black p-6 text-slate-100">
				{/* Header */}
				<div className="flex items-center justify-between">
					<div>
						<header className="space-y-2">
							<Badge className="bg-indigo-500/20 text-indigo-200">Estratégia</Badge>
							<h1 className="text-3xl font-bold text-white">Metas & Desempenho</h1>
							<p className="text-sm text-slate-300">
								Acompanhe o atingimento das metas contratuais, planos de ação priorizados e benchmark frente a outras OSS/hospitais referenciados.
							</p>
						</header>
					</div>
				</div>

				<Tabs defaultValue="desempenho" className="space-y-6">
					<TabsList className="bg-slate-900/70 text-slate-200">
						<TabsTrigger value="desempenho">Desempenho</TabsTrigger>
						<TabsTrigger value="planos">Planos de Ação</TabsTrigger>
						<TabsTrigger value="benchmark">Benchmark</TabsTrigger>
					</TabsList>

					{/* Desempenho */}
					<TabsContent value="desempenho" className="space-y-6">
						<Card className="border border-white/10 bg-slate-900/80 backdrop-blur">
							<CardHeader className="flex flex-col gap-2">
								<CardTitle className="flex items-center gap-2 text-white">
									<TrendingUp className="h-5 w-5 text-emerald-300" />Atingimento trimestral
								</CardTitle>
								<p className="text-xs text-slate-400">Detalhe do cumprimento das metas críticas — jan-jun 2025</p>
							</CardHeader>
							<CardContent>
								<ResponsiveContainer width="100%" height={260}>
									<LineChart data={desempenhoMensal}>
										<CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
										<XAxis dataKey="mes" stroke="#94a3b8" />
										<YAxis stroke="#94a3b8" domain={[80, 95]} tickFormatter={(value) => `${value}%`} />
										<Tooltip
											contentStyle={{
												background: '#0f172a',
												border: '1px solid rgba(148,163,184,0.2)',
												borderRadius: '0.75rem',
												color: '#e2e8f0'
											}}
										/>
										<Legend wrapperStyle={{ color: '#cbd5f5', paddingTop: '12px' }} />
										<Line type="monotone" dataKey="metas" name="Meta" stroke="#60a5fa" strokeWidth={3} dot={false} />
										<Line type="monotone" dataKey="realizado" name="Realizado" stroke="#34d399" strokeWidth={3} dot={{ r: 4 }} />
									</LineChart>
								</ResponsiveContainer>
							</CardContent>
						</Card>

						<Card className="border border-white/10 bg-slate-900/80 backdrop-blur">
							<CardHeader>
								<CardTitle className="text-white">Resumo executivo</CardTitle>
							</CardHeader>
							<CardContent className="grid gap-4 md:grid-cols-3 text-sm text-slate-300">
								{metasExecutiva.map((meta) => (
									<div key={meta.indicador} className="rounded-2xl bg-white/5 p-4">
										<p className="font-semibold text-white">{meta.indicador}</p>
										<p className="text-xs text-slate-400">Meta {meta.meta}</p>
										<p className="text-xs text-slate-400">Realizado {meta.realizado}</p>
										<Badge className="mt-2 bg-white/10 text-xs text-slate-200">{meta.status}</Badge>
									</div>
								))}
							</CardContent>
						</Card>
					</TabsContent>

					{/* Planos de Ação */}
					<TabsContent value="planos" className="space-y-6">
						<Card className="border border-white/10 bg-slate-900/80 backdrop-blur">
							<CardHeader className="flex flex-col gap-2">
								<CardTitle className="flex items-center gap-2 text-white">
									<Target className="h-5 w-5 text-fuchsia-300" />Planejamento 2025
								</CardTitle>
								<p className="text-xs text-slate-400">Principais iniciativas para acelerar entregas.</p>
							</CardHeader>
							<CardContent className="space-y-3 text-sm text-slate-300">
								{[{
									titulo: 'Automação de glosas',
									meta: 'Reduzir incidência para <2,5%',
									prazo: 'Outubro/25',
									status: 'Execução 65%'
								}, {
									titulo: 'APS digital + telessaúde',
									meta: 'Aumentar cobertura em 12%',
									prazo: 'Dezembro/25',
									status: 'Planejamento aprovado'
								}, {
									titulo: 'BI OPME e auditoria em tempo real',
									meta: 'Economia R$ 1,1M',
									prazo: 'Novembro/25',
									status: 'Kick-off realizado'
								}].map((plano) => (
									<div key={plano.titulo} className="rounded-2xl bg-white/5 p-4">
										<p className="font-semibold text-white">{plano.titulo}</p>
										<p className="text-xs text-slate-400">Meta: {plano.meta}</p>
										<p className="text-xs text-slate-400">Prazo: {plano.prazo}</p>
										<Badge className="mt-2 bg-white/10 text-xs text-slate-200">{plano.status}</Badge>
									</div>
								))}
							</CardContent>
						</Card>
					</TabsContent>

					{/* Benchmark */}
					<TabsContent value="benchmark" className="space-y-6">
						<Card className="border border-white/10 bg-slate-900/80 backdrop-blur">
							<CardHeader>
								<CardTitle className="flex items-center gap-2 text-white">
									<ChartBar className="h-5 w-5 text-sky-300" />Comparativo de performance
								</CardTitle>
							</CardHeader>
							<CardContent>
								<ResponsiveContainer width="100%" height={260}>
									<BarChart data={benchmarks}>
										<CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
										<XAxis dataKey="nome" stroke="#94a3b8" />
										<YAxis stroke="#94a3b8" />
										<Tooltip
											contentStyle={{
												background: '#0f172a',
												border: '1px solid rgba(148,163,184,0.2)',
												borderRadius: '0.75rem',
												color: '#e2e8f0'
											}}
										/>
										<Legend wrapperStyle={{ color: '#cbd5f5', paddingTop: '12px' }} />
										<Bar dataKey="margem" name="Margem %" fill="#34d399" radius={[10, 10, 0, 0]} />
										<Bar dataKey="glosa" name="Glosa %" fill="#f97316" radius={[10, 10, 0, 0]} />
									</BarChart>
								</ResponsiveContainer>
							</CardContent>
						</Card>
					</TabsContent>
				</Tabs>
			</div>
		</MainLayout>
	);
};

export default OSSMetasDesempenho;
