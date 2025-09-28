import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';

const seções = [
  {
    categoria: 'Gestão Estratégica',
    itens: [
      {
        titulo: 'Visão Geral OSS',
        score: 95,
        resumo: 'Panorama rápido para dono da OSS — mostra KPIs essenciais (metas, glosa, NPS, risco).',
        utilidade: 'Usar na abertura de reuniões com prefeitura ou diretoria; revela o nível de entrega contratual.',
        dados: 'Consolidação dos módulos de metas, glosa e matrícula contratual integrados ao BI.',
        rota: '/oss-dashboard'
      },
      {
        titulo: 'Dashboard Executiva',
        score: 92,
        resumo: 'Análise trimestral de receita, glosa e margem com alertas automáticos.',
        utilidade: 'Base para decisões de investimento e renegociação contratual.',
        dados: 'Produção SUS/privada, faturamento Audesp, dados financeiros importados do ERP.',
        rota: '/oss-dashboard#visao-executiva'
      },
      {
        titulo: 'Insights de IA',
        score: 88,
        resumo: 'Sugestões do Oráculo IA para acelerar resultados (recuperação, satisfação, margem).',
        utilidade: 'Priorizar planos de ação com maior ROI e monitorar resultados semanais.',
        dados: 'Modelos de IA treinados com históricos de produção, glosa e níveis de satisfação.',
        rota: '/oss-dashboard#insights-ia'
      }
    ]
  },
  {
    categoria: 'Operações e Finanças',
    itens: [
      {
        titulo: 'Painel de Glosas',
        score: 90,
        resumo: 'Mostra glosa mensal, recuperação e causas principais. Fundamental para tesouraria.',
        utilidade: 'Apoia auditoria de faturamento e renegociação com convênios.',
        dados: 'Faturamento SUS/Convênios, BI de glosa, retorno Audesp/TISS.',
        rota: '/oss-glosas'
      },
      {
        titulo: 'ROI & Rentabilidade',
        score: 87,
        resumo: 'Compara margem, ROI de projetos e payback.',
        utilidade: 'Direcionar investimentos em automações, OPME, equipes.',
        dados: 'Financeiro mensal, custos operacionais, projetos mapeados na controladoria.',
        rota: '/oss-roi-rentabilidade'
      },
      {
        titulo: 'Controle Glosa / OPME',
        score: 85,
        resumo: 'Gráficos por convênio (jan-set) e gastos de OPME.',
        utilidade: 'Suporte a CFO e diretoria médica na gestão de materiais e glosa recorrente.',
        dados: 'ERP financeiro, BI de materiais, faturamento.',
        rota: '/oss-controle-glosa-opme'
      }
    ]
  },
  {
    categoria: 'Predição & Simulador',
    itens: [
      {
        titulo: 'Predição Operacional',
        score: 82,
        resumo: 'Demanda prevista (internação, PA, absenteísmo) e recomendações.',
        utilidade: 'Planejar escalas, campanhas de prevenção e ajustar capacidade.',
        dados: 'Histórico assistencial, sazonalidade, algoritmos prophet/IA.',
        rota: '/oss-predicao'
      },
      {
        titulo: 'Simulador do Dono',
        score: 89,
        resumo: 'Simulador financeiro (mix privado, glosa, custos) com projeção de margem e ROI.',
        utilidade: 'Tomada de decisão estratégica em reuniões com sócios e prefeitura.',
        dados: 'Projeção financeira + parâmetros de IA.',
        rota: '/oss-simulador'
      }
    ]
  },
  {
    categoria: 'Compliance & Processos',
    itens: [
      {
        titulo: 'Compliance OSS',
        score: 78,
        resumo: 'Matriz de conformidade, auditorias LGPD e plano de ação.',
        utilidade: 'Mitigar riscos jurídicos e garantir confiança.',
        dados: 'Auditorias internas, checklist LGPD, registros de acesso TI.',
        rota: '/oss-compliance'
      },
      {
        titulo: 'Audesp / Prestação de Contas',
        score: 83,
        resumo: 'Status de envios, tempestividade e checklist pré-envio.',
        utilidade: 'Evitar bloqueios financeiros e pendências com TCE.',
        dados: 'Envios Audesp, logs de schema, conciliações.',
        rota: '/oss-audesp'
      }
    ]
  },
  {
    categoria: 'Comunicação & Relacionamento',
    itens: [
      {
        titulo: 'Notícias OSS Brasil',
        score: 70,
        resumo: 'Radar nacional com matérias e alertas do setor.',
        utilidade: 'Antecipar tendências, comparar resultados, reforçar marketing institucional.',
        dados: 'Curadoria manual + clipping de fontes públicas.',
        rota: '/oss-noticias'
      },
      {
        titulo: 'Notícias por Cliente',
        score: 68,
        resumo: 'Destaques e alertas específicos por cliente/parceiro.',
        utilidade: 'Preparar reuniões locais e ajustar comunicação.',
        dados: 'Relatórios locais, imprensa municipal, canais internos.',
        rota: '/oss-noticias-clientes'
      }
    ]
  }
];

const OSSManualDescritivo = () => (
  <div className="min-h-screen space-y-8 bg-gradient-to-br from-slate-950 via-slate-900 to-black p-6 text-slate-100">
      <header className="space-y-2">
        <Badge className="bg-indigo-500/20 text-indigo-200">Guia</Badge>
        <h1 className="text-3xl font-bold text-white">Manual Descritivo — Donos da OSS</h1>
        <p className="text-sm text-slate-300">
          Use este manual como um coach: leia a descrição, entenda de onde vem a informação e priorize conforme o ranking de importância.
        </p>
      </header>

      <div className="space-y-8">
        {seções.map((secao) => (
          <section key={secao.categoria} className="space-y-4">
            <h2 className="text-xl font-semibold text-white">{secao.categoria}</h2>
            <div className="grid gap-4 lg:grid-cols-2">
              {secao.itens.map((item) => (
                <Card key={item.titulo} className="border border-white/10 bg-slate-900/75 backdrop-blur">
                  <CardHeader className="space-y-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white">{item.titulo}</CardTitle>
                      <Badge className="bg-emerald-500/20 text-emerald-200">Importância {item.score}/100</Badge>
                    </div>
                    <Progress value={item.score} className="h-2" />
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm text-slate-300">
                    <p><strong>Para que serve:</strong> {item.resumo}</p>
                    <p><strong>Como usar:</strong> {item.utilidade}</p>
                    <p><strong>Origem dos dados:</strong> {item.dados}</p>
                    <Button variant="outline" size="sm" className="border-white/20 text-slate-100" asChild>
                      <Link to={item.rota}>Abrir módulo</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
);

export default OSSManualDescritivo;
