import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, ClipboardCheck, AlertTriangle, Shield, FileSearch } from 'lucide-react';

const controles = [
  {
    titulo: 'Auditoria LGPD',
    status: 'Concluído',
    descricao: 'Mapeamento de dados pessoais, anonimização em serviços OSS e revisão de termos de confidencialidade.',
    responsavel: 'DPO - Juliana Ribeiro'
  },
  {
    titulo: 'Acesso Sistemas Críticos',
    status: 'Em andamento',
    descricao: 'Revisão trimestral de perfis na suíte TISS/Audesp e aplicação de MFA para operadores.',
    responsavel: 'TI Segurança'
  },
  {
    titulo: 'Plano de Continuidade',
    status: 'Planejado',
    descricao: 'Simulações de contingência para indisponibilidade Audesp e queda de conectividade VPN.',
    responsavel: 'Operações OSS'
  }
];

const OSSCompliancePage = () => {
  return (
    <div className="min-h-screen space-y-8 bg-gradient-to-br from-slate-950 via-slate-900 to-black p-6 text-slate-100">
      <header className="space-y-2">
        <Badge className="bg-blue-500/20 text-blue-200">Compliance & Risco</Badge>
        <h1 className="text-3xl font-bold text-white">Programa de Compliance OSS</h1>
        <p className="max-w-3xl text-sm text-slate-300">
          Monitoramento dos requisitos legais, controles de acesso e maturidade em segurança da informação para o contrato OSS.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[{
          titulo: 'Itens críticos Audesp',
          valor: '0 pendências',
          detalhe: 'última carga 25/09'
        }, {
          titulo: 'Incidentes LGPD 2025',
          valor: '1 notificação',
          detalhe: 'mitigada em 4h'
        }, {
          titulo: 'Treinamentos concluídos',
          valor: '92%',
          detalhe: 'equipe administrativa'
        }, {
          titulo: 'Controles avaliados',
          valor: '18/22',
          detalhe: 'auditados no Trimestre'
        }].map((item) => (
          <Card key={item.titulo} className="border border-white/10 bg-slate-900/80 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-sm text-slate-300">{item.titulo}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-2xl font-semibold text-white">{item.valor}</p>
              <span className="text-xs text-slate-400">{item.detalhe}</span>
            </CardContent>
          </Card>
        ))}
      </section>

      <Card className="border border-white/10 bg-slate-900/80 backdrop-blur">
        <CardHeader className="flex flex-col gap-2">
          <CardTitle className="flex items-center gap-2 text-white">
            <Shield className="h-5 w-5 text-blue-300" />Matriz de conformidade
          </CardTitle>
          <p className="text-xs text-slate-400">Principais frentes monitoradas pela governança</p>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3 text-sm text-slate-300">
          <div className="rounded-2xl bg-white/5 p-4">
            <p className="font-semibold text-white">LGPD & Segurança</p>
            <ul className="mt-2 space-y-1 text-xs text-slate-400">
              <li>• Revisão de bases de dados (Q3)</li>
              <li>• Controle de logs 
                <Badge className="ml-1 bg-emerald-500/20 text-emerald-200">100%</Badge>
              </li>
              <li>• Plano de resposta a incidentes (testado)</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-white/5 p-4">
            <p className="font-semibold text-white">Contract Compliance</p>
            <ul className="mt-2 space-y-1 text-xs text-slate-400">
              <li>• Indicadores pactuados monitorados semanalmente</li>
              <li>• Auditoria financeira Trimestral</li>
              <li>• Matriz de responsabilidades atualizada</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-white/5 p-4">
            <p className="font-semibold text-white">Riscos operacionais</p>
            <ul className="mt-2 space-y-1 text-xs text-slate-400">
              <li>• KPIs de produção, APS e atendimento</li>
              <li>• Plano de contingência TISS/TUSS</li>
              <li>• Comitê mensal de riscos</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <section className="grid gap-6 lg:grid-cols-[1.3fr,1fr]">
        <Card className="border border-white/10 bg-slate-900/80 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <ClipboardCheck className="h-5 w-5 text-emerald-300" />Plano de ação e status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-slate-300">
            {controles.map((controle) => (
              <div key={controle.titulo} className="rounded-2xl bg-white/5 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-white">{controle.titulo}</p>
                    <p className="text-xs text-slate-400">{controle.descricao}</p>
                  </div>
                  <Badge className="bg-white/10 text-slate-200">{controle.status}</Badge>
                </div>
                <p className="mt-2 text-xs text-slate-400">Responsável: {controle.responsavel}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border border-white/10 bg-slate-900/80 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <FileSearch className="h-5 w-5 text-amber-300" />Checklist de auditoria
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-xs text-slate-300">
            <div className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
              <span>Documentação OSS atualizada</span>
              <Badge className="bg-emerald-500/20 text-emerald-200">OK</Badge>
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
              <span>Controle de acessos críticos</span>
              <Badge className="bg-amber-500/20 text-amber-200">Ajustar até 05/10</Badge>
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
              <span>Logs de processamento Audesp</span>
              <Badge className="bg-emerald-500/20 text-emerald-200">OK</Badge>
            </div>
            <p className="text-xs text-slate-400">Relatório completo disponível no drive compartilhado.</p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default OSSCompliancePage;
