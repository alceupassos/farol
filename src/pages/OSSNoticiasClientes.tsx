import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowUp, ArrowDown } from 'lucide-react';

const noticiasPorCliente: Record<string, Array<{
  titulo: string;
  resumo: string;
  link: string;
  positiva: boolean;
  data: string;
}>> = {
  'BHCL - Cesário Lange': [
    {
      titulo: 'BHCL amplia atendimento APS com telemonitoramento',
      resumo: 'Projeto piloto reduz em 18% as consultas presenciais e aumenta acompanhamento de crônicos.',
      link: 'https://example.com/bhcl-telemonitoramento',
      positiva: true,
      data: '22/08/2025'
    },
    {
      titulo: 'Auditoria identifica ajustes em escala de plantão',
      resumo: 'Recomendações incluem redefinição de jornada e reforço em registros de ponto.',
      link: 'https://example.com/bhcl-auditoria',
      positiva: false,
      data: '30/07/2025'
    }
  ],
  'Hospital Piracicaba': [
    {
      titulo: 'Nova unidade de pronto atendimento entra em operação',
      resumo: 'OSS antecipa entrega e garante integração com BI de fluxo assistencial.',
      link: 'https://example.com/piracicaba-upa',
      positiva: true,
      data: '03/09/2025'
    },
    {
      titulo: 'Checklist documental digital gera curva de aprendizado',
      resumo: 'Equipe aponta dificuldades iniciais, mas indicadores mostram redução na glosa após 6 semanas.',
      link: 'https://example.com/piracicaba-checklist',
      positiva: false,
      data: '11/08/2025'
    }
  ],
  'Clínica Regional Parnaíba': [
    {
      titulo: 'Investimento em OPME garantiu economia de R$ 140k',
      resumo: 'Negociações com fornecedores e rastreabilidade reduziram custo direto em 11%.',
      link: 'https://example.com/parnaiba-opme',
      positiva: true,
      data: '18/09/2025'
    }
  ]
};

const CardNoticia = ({ titulo, resumo, link, positiva, data }: { titulo: string; resumo: string; link: string; positiva: boolean; data: string }) => (
  <Card className="border border-white/10 bg-slate-900/70 backdrop-blur">
    <CardHeader className="flex items-center justify-between">
      <CardTitle className="text-base text-white">{titulo}</CardTitle>
      <Badge className={`flex items-center gap-1 ${positiva ? 'bg-emerald-500/20 text-emerald-200' : 'bg-rose-500/20 text-rose-200'}`}>
        {positiva ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
        {positiva ? 'Positiva' : 'Alerta'}
      </Badge>
    </CardHeader>
    <CardContent className="space-y-2">
      <p className="text-sm text-slate-300">{resumo}</p>
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span>{data}</span>
        <a className="text-blue-300 hover:underline" href={link} target="_blank" rel="noreferrer">
          Ler matéria
        </a>
      </div>
    </CardContent>
  </Card>
);

const OSSNoticiasClientes = () => (
    <div className="min-h-screen space-y-8 bg-gradient-to-br from-slate-950 via-slate-900 to-black p-6 text-slate-100">
      <header className="space-y-2">
        <Badge className="bg-blue-500/20 text-blue-200">Radar OSS</Badge>
        <h1 className="text-3xl font-bold text-white">Notícias dos Clientes</h1>
        <p className="text-sm text-slate-300">Acompanhe comunicados, reconhecimentos e alertas específicos por cliente.</p>
      </header>

      <Tabs defaultValue={Object.keys(noticiasPorCliente)[0]} className="space-y-4">
        <TabsList className="flex flex-wrap bg-slate-900/70 text-slate-200">
          {Object.keys(noticiasPorCliente).map((cliente) => (
            <TabsTrigger key={cliente} value={cliente}>{cliente}</TabsTrigger>
          ))}
        </TabsList>
        {Object.entries(noticiasPorCliente).map(([cliente, noticias]) => (
          <TabsContent key={cliente} value={cliente} className="space-y-3">
            {noticias.map((noticia) => (
              <CardNoticia key={noticia.titulo} {...noticia} />
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
);

export default OSSNoticiasClientes;
