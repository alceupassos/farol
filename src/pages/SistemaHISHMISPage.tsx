import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  Activity,
  CloudCog,
  Cpu,
  FileText,
  Fingerprint,
  Layers,
  ServerCog,
  ShieldCheck,
  Zap
} from 'lucide-react';

const moduleKpis = [
  { title: 'Integração RNDS', value: '100%', description: 'Fluxos CDA e FHIR ativos e monitorados', icon: <CloudCog className="h-5 w-5" /> },
  { title: 'Latência HIS → HMIS', value: '380ms', description: 'Tempo médio replicação bidirecional', icon: <Zap className="h-5 w-5" /> },
  { title: 'Disponibilidade', value: '99,982%', description: 'SLA mensal garantido por contrato', icon: <ShieldCheck className="h-5 w-5" /> },
  { title: 'Eventos Processados/dia', value: '1,2M', description: 'Mensagens clínicas + administrativas', icon: <Activity className="h-5 w-5" /> },
];

const integrationMatrix = [
  { sistema: 'Pronto Atendimento', protocolo: 'HL7 v2 / FHIR', criticidade: 'Alta', status: 'Sincronizado', janela: 'Tempo real' },
  { sistema: 'Centro Cirúrgico', protocolo: 'FHIR + APIs proprietárias', criticidade: 'Alta', status: 'Sincronizado', janela: 'Sub 5 min' },
  { sistema: 'Faturamento SUS/TUSS', protocolo: 'XML TISS / WebService', criticidade: 'Alta', status: 'Monitorado', janela: '15 min' },
  { sistema: 'Farmácia Clínica', protocolo: 'FHIR Medication / MQTT', criticidade: 'Média', status: 'Sincronizado', janela: 'Tempo real' },
  { sistema: 'Laboratório', protocolo: 'HL7 ORU / ASTM', criticidade: 'Média', status: 'Em homologação', janela: '30 min' },
];

const auditEvents = [
  { id: 'EVT-202406-091', tipo: 'Acesso Prontuário UTI', usuario: 'Dra. Mariana Silva', nivel: 'Crítico', hora: '08:41', status: 'Auditado' },
  { id: 'EVT-202406-102', tipo: 'Exportação APAC', usuario: 'Depto Faturamento', nivel: 'Grave', hora: '10:05', status: 'Em validação' },
  { id: 'EVT-202406-134', tipo: 'Integração ERP', usuario: 'Serviço Técnico', nivel: 'Atenção', hora: '13:22', status: 'Regra aplicada' },
];

const SistemaHISHMISPage = () => {
  return (
    <div className="min-h-screen space-y-8 bg-slate-950 px-6 py-8 text-slate-100">
      <header className="space-y-3">
        <div className="flex items-center gap-3">
          <ServerCog className="h-10 w-10 text-sky-400" />
          <div>
            <h1 className="text-3xl font-bold">Plataforma HIS/HMIS Integrada</h1>
            <p className="text-sm text-slate-400">
              Backbone tecnológico hospitalar com interoperabilidade total, visão operacional e governança de dados em padrão C-LEVEL.
            </p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {moduleKpis.map((kpi) => (
            <Card key={kpi.title} className="border-slate-800 bg-slate-900/70">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-200">{kpi.title}</CardTitle>
                <span className="text-slate-400">{kpi.icon}</span>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold text-white">{kpi.value}</div>
                <CardDescription className="pt-2 text-xs text-slate-400">{kpi.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </header>

      <Card className="border-slate-800 bg-slate-900/70">
        <CardHeader>
          <CardTitle className="text-lg text-white">Arquitetura Corporativa</CardTitle>
          <CardDescription className="text-slate-400">
            Camadas funcionais, integrações e mecanismos de alta disponibilidade.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            {[ 
              {
                titulo: 'Camada Assistencial',
                descricao: 'Prontuário eletrônico, protocolos clínicos, checklists cirúrgicos e prescrição eletrônica unificada.'
              },
              {
                titulo: 'Camada Administrativa',
                descricao: 'Faturamento SUS/TUSS, APAC, glosas e recursos, estoque farmacêutico, agendamentos e hotelaria.'
              },
              {
                titulo: 'Camada Analítica',
                descricao: 'Lakehouse hospitalar, indicadores de produtividade, margem por serviço, BI preditivo e Data Governance.'
              },
              {
                titulo: 'Camada de Interoperabilidade',
                descricao: 'Gateway HL7/FHIR, streaming MQTT, APIs REST seguras, monitoramento em tempo real.'
              }
            ].map((layer) => (
              <div key={layer.titulo} className="rounded-lg border border-slate-800/80 bg-slate-900/60 p-4">
                <h3 className="text-sm font-semibold text-white">{layer.titulo}</h3>
                <p className="mt-1 text-sm text-slate-300">{layer.descricao}</p>
              </div>
            ))}
          </div>
          <div className="space-y-4">
            <div className="rounded-lg border border-slate-800/80 bg-slate-900/60 p-4">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-white">
                <Layers className="h-4 w-4 text-sky-400" /> Redundância Ativa
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-300">
                <li>• Cluster HIS em active-active com replicação síncrona.</li>
                <li>• Failover automático em 30 segundos para cloud secundária.</li>
                <li>• Backup imutável horário e teste de restauração semanal.</li>
              </ul>
            </div>
            <div className="rounded-lg border border-slate-800/80 bg-slate-900/60 p-4">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-white">
                <Cpu className="h-4 w-4 text-sky-400" /> Inteligência Operacional
              </h3>
              <p className="mt-2 text-sm text-slate-300">
                Monitoramento com algoritmos de detecção de anomalias, previsão de carga assistencial e ajuste dinâmico de recursos.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="integracoes" className="space-y-4">
        <TabsList className="bg-slate-900/40">
          <TabsTrigger value="integracoes">Integrações</TabsTrigger>
          <TabsTrigger value="seguranca">Segurança & Compliance</TabsTrigger>
          <TabsTrigger value="auditoria">Trilha de Auditoria</TabsTrigger>
        </TabsList>

        <TabsContent value="integracoes" className="space-y-4">
          <Card className="border-slate-800 bg-slate-900/70">
            <CardHeader>
              <CardTitle className="text-lg text-white">Matriz de Integração HIS/HMIS</CardTitle>
              <CardDescription className="text-slate-400">
                Conectividade end-to-end com sistemas assistenciais, financeiros e regulatórios.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sistema Integrado</TableHead>
                    <TableHead>Protocolo</TableHead>
                    <TableHead>Criticidade</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Janela</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {integrationMatrix.map((entry) => (
                    <TableRow key={entry.sistema}>
                      <TableCell className="font-medium">{entry.sistema}</TableCell>
                      <TableCell>{entry.protocolo}</TableCell>
                      <TableCell className="text-rose-300">{entry.criticidade}</TableCell>
                      <TableCell className="text-emerald-300">{entry.status}</TableCell>
                      <TableCell>{entry.janela}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seguranca" className="space-y-4">
          <Card className="border-slate-800 bg-slate-900/70">
            <CardHeader>
              <CardTitle className="text-lg text-white">Mecanismos de Segurança</CardTitle>
              <CardDescription className="text-slate-400">
                Conformidade LGPD, controle de acesso e camadas de criptografia ponta a ponta.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              {[ 
                {
                  titulo: 'Identidade Unificada',
                  descricao: 'Single Sign-On com MFA obrigatório e segregação de perfis assistenciais.'
                },
                {
                  titulo: 'Criptografia Avançada',
                  descricao: 'TLS 1.3, dados em repouso com AES-256 e HSM para gerenciamento de chaves.'
                },
                {
                  titulo: 'Monitoramento Contínuo',
                  descricao: 'SIEM dedicado com alertas de comportamento anômalo e resposta automática.'
                },
                {
                  titulo: 'Compliance LGPD',
                  descricao: 'Mapeamento de dados pessoais, relatórios de impacto e anonimização just-in-time.'
                },
              ].map((item) => (
                <div key={item.titulo} className="rounded-lg border border-slate-800/80 bg-slate-900/60 p-4">
                  <h3 className="flex items-center gap-2 text-sm font-semibold text-white">
                    <Fingerprint className="h-4 w-4 text-sky-400" /> {item.titulo}
                  </h3>
                  <p className="mt-2 text-sm text-slate-300">{item.descricao}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="auditoria" className="space-y-4">
          <Card className="border-slate-800 bg-slate-900/70">
            <CardHeader>
              <CardTitle className="text-lg text-white">Eventos de Auditoria</CardTitle>
              <CardDescription className="text-slate-400">
                Monitoramento da trilha HIS/HMIS com foco em acessos sensíveis e transações críticas.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Evento</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Usuário</TableHead>
                    <TableHead>Nível</TableHead>
                    <TableHead>Horário</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {auditEvents.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell className="font-medium">{event.id}</TableCell>
                      <TableCell>{event.tipo}</TableCell>
                      <TableCell>{event.usuario}</TableCell>
                      <TableCell className="text-rose-300">{event.nivel}</TableCell>
                      <TableCell>{event.hora}</TableCell>
                      <TableCell className="text-emerald-300">{event.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="border-slate-800 bg-slate-900/70">
        <CardHeader>
          <CardTitle className="text-lg text-white">Roadmap de Evolução HIS/HMIS</CardTitle>
          <CardDescription className="text-slate-400">
            Entregas priorizadas junto à diretoria de transformação digital hospitalar.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          {[ 
            {
              fase: 'Imediato',
              itens: ['Integração APAC Oncologia 100% automática', 'Portal médico com prescrições mobile', 'Dashboards assistenciais em tempo real'],
            },
            {
              fase: 'Próximos 90 dias',
              itens: ['Data lake unificado HIS + ERP', 'IA para previsão de glosas', 'Centralização de leitos multiunidade'],
            },
            {
              fase: 'Visão anual',
              itens: ['Integração com prontuário regional', 'Assistente clínico com IA generativa', 'Playbook de operação multimodal'],
            },
          ].map((fase) => (
            <div key={fase.fase} className="rounded-lg border border-slate-800/80 bg-slate-900/60 p-4">
              <h3 className="text-sm font-semibold text-white">{fase.fase}</h3>
              <ul className="mt-2 space-y-2 text-sm text-slate-300">
                {fase.itens.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <FileText className="mt-1 h-3.5 w-3.5 text-sky-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default SistemaHISHMISPage;
