import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowUp, ArrowDown } from 'lucide-react';

const noticiasUltimos30 = [
	{
		titulo: 'Nova parceria OSS-SUS reduz fila cirúrgica em 28%',
		resumo: 'Estado de SP anuncia reforço de R$ 20 mi para mutirões com OSS e amplia transparência de resultados.',
		link: 'https://example.com/oss-parceria-sp',
		positiva: true,
		data: '15/09/2025'
	},
	{
		titulo: 'Programa de auditoria digital corta glosas em 22%',
		resumo: 'OSS no Paraná implementa BI e revisão automática de documentação, destacada pelo Ministério da Saúde.',
		link: 'https://example.com/auditoria-bi-pr',
		positiva: true,
		data: '05/09/2025'
	}
];

const noticiasMaisAntigas = [
	{
		titulo: 'Tribunal de Contas aprova contas OSS 2024',
		resumo: 'Relatório aponta melhoria na prestação de contas Audesp e execução de metas hospitalares.',
		link: 'https://example.com/tc-oss-2024',
		positiva: true,
		data: '20/07/2025'
	},
	{
		titulo: 'Alerta sobre gestão trabalhista em contrato OSS',
		resumo: 'Promotoria recomenda revisão em contratos temporários e transparência em benefícios.',
		link: 'https://example.com/mpf-alerta-oss',
		positiva: false,
		data: '18/06/2025'
	}
];

const NoticiasCard = ({ noticia }: { noticia: typeof noticiasUltimos30[number] }) => (
	<Card className="border border-white/10 bg-slate-900/70 backdrop-blur">
		<CardHeader className="flex items-center justify-between">
			<CardTitle className="text-base text-white">{noticia.titulo}</CardTitle>
			<Badge className={`flex items-center gap-1 ${noticia.positiva ? 'bg-emerald-500/20 text-emerald-200' : 'bg-rose-500/20 text-rose-200'}`}>
				{noticia.positiva ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
				{noticia.positiva ? 'Positiva' : 'Alerta'}
			</Badge>
		</CardHeader>
		<CardContent className="space-y-2">
			<p className="text-sm text-slate-300">{noticia.resumo}</p>
			<div className="flex items-center justify-between text-xs text-slate-400">
				<span>{noticia.data}</span>
				<a className="text-blue-300 hover:underline" href={noticia.link} target="_blank" rel="noreferrer">
					Ler matéria
				</a>
			</div>
		</CardContent>
	</Card>
);

const OSSNoticiasNacionais = () => (
	<div className="min-h-screen space-y-8 bg-gradient-to-br from-slate-950 via-slate-900 to-black p-6 text-slate-100">
		<header className="space-y-2">
			<Badge className="bg-blue-500/20 text-blue-200">Radar OSS</Badge>
			<h1 className="text-3xl font-bold text-white">Notícias & Novidades OSS no Brasil</h1>
			<p className="text-sm text-slate-300">Curadoria das principais matérias de 2025 — monitoramento contínuo para apoiar decisões estratégicas.</p>
		</header>
			<section className="grid gap-6 lg:grid-cols-2">
				<div className="space-y-3">
					<h2 className="text-xl font-semibold text-white">Últimos 30 dias</h2>
					{noticiasUltimos30.map((noticia) => (
						<NoticiasCard key={noticia.titulo} noticia={noticia} />
					))}
				</div>
				<div className="space-y-3">
					<h2 className="text-xl font-semibold text-white">Anterior</h2>
					{noticiasMaisAntigas.map((noticia) => (
						<NoticiasCard key={noticia.titulo} noticia={noticia} />
					))}
				</div>
		</section>
	</div>
);

export default OSSNoticiasNacionais;
