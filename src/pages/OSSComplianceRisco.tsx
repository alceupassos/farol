import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  FileCheck,
  Clock,
  Eye,
  Lock,
  AlertCircle,
  TrendingUp,
  Calendar,
  Hash,
  Upload
} from 'lucide-react';

const OSSComplianceRisco = () => {
  const [selectedRisk, setSelectedRisk] = useState(null);

  // Dados da Matriz de Risco 5x5
  const riskMatrix = [
    { id: 1, nome: 'Audesp - Erro Schema', probabilidade: 4, impacto: 5, categoria: 'Compliance' },
    { id: 2, nome: 'TISS - Versão Desatualizada', probabilidade: 3, impacto: 4, categoria: 'Técnico' },
    { id: 3, nome: 'SIH/SIA - Rejeição', probabilidade: 3, impacto: 3, categoria: 'Operacional' },
    { id: 4, nome: 'Transparência - Atraso', probabilidade: 2, impacto: 4, categoria: 'Legal' },
    { id: 5, nome: 'LGPD - Vazamento', probabilidade: 1, impacto: 5, categoria: 'Segurança' },
    { id: 6, nome: 'Glosas - Aumento', probabilidade: 3, impacto: 3, categoria: 'Financeiro' },
  ];

  // Validador Audesp
  const audespValidation = {
    schemas: [
      { campo: 'cnpjContratante', status: 'ok', mensagem: 'Válido' },
      { campo: 'valorContrato', status: 'erro', mensagem: 'Formato inválido - esperado decimal(15,2)' },
      { campo: 'dataAssinatura', status: 'ok', mensagem: 'Válido' },
      { campo: 'metasFisicas', status: 'aviso', mensagem: 'Campo opcional não preenchido' },
      { campo: 'indicadores', status: 'erro', mensagem: 'Array vazio - mínimo 1 item' },
    ],
    competencias: [
      { mes: 'Janeiro/2025', status: 'enviado', protocolo: 'AUD2025010001', prazo: '10/02/2025' },
      { mes: 'Dezembro/2024', status: 'aceito', protocolo: 'AUD2024120001', prazo: '10/01/2025' },
      { mes: 'Novembro/2024', status: 'aceito', protocolo: 'AUD2024110001', prazo: '10/12/2024' },
    ]
  };

  // Checklist Transparência
  const transparenciaChecklist = [
    { item: 'Contrato de Gestão', obrigatorio: true, publicado: true, hash: 'a3f5...8b2c', data: '15/01/2025' },
    { item: 'Relatório Trimestral', obrigatorio: true, publicado: true, hash: 'b7d2...3e1a', data: '10/01/2025' },
    { item: 'Demonstrativo Financeiro', obrigatorio: true, publicado: false, hash: null, data: null },
    { item: 'Ata de Reunião CG', obrigatorio: false, publicado: true, hash: 'c9e4...7f5d', data: '20/01/2025' },
    { item: 'Plano de Trabalho', obrigatorio: true, publicado: true, hash: 'd1a6...2b8e', data: '05/01/2025' },
  ];

  // LGPD Dashboard
  const lgpdMetrics = {
    incidentes: [
      { tipo: 'Acesso não autorizado', gravidade: 'baixa', data: '20/01/2025', status: 'resolvido', mttr: 2 },
      { tipo: 'Compartilhamento indevido', gravidade: 'media', data: '15/01/2025', status: 'em_analise', mttr: null },
    ],
    acessos: {
      total: 145,
      revisados: 145,
      pendentes: 0,
      ultimaRevisao: '25/01/2025'
    },
    ropa: [
      { processo: 'Faturamento SUS', dados: 'Dados de pacientes', base: 'Art. 6º, II', retencao: '5 anos' },
      { processo: 'Folha de Pagamento', dados: 'Dados funcionários', base: 'Art. 7º, I', retencao: '35 anos' },
      { processo: 'Prestação Contas', dados: 'Dados contratuais', base: 'Art. 6º, V', retencao: '10 anos' },
    ]
  };

  const getRiskColor = (prob, impact) => {
    const score = prob * impact;
    if (score >= 15) return 'bg-red-500';
    if (score >= 10) return 'bg-orange-400';
    if (score >= 5) return 'bg-yellow-300';
    return 'bg-green-300';
  };

  return (
    <div className="space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Compliance e Risco
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Gestão de conformidade regulatória e matriz de riscos
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Enviar Audesp
            </Button>
            <Button variant="outline" size="sm">
              <FileCheck className="h-4 w-4 mr-2" />
              Validar Schema
            </Button>
            <Button variant="default" size="sm">
              <Shield className="h-4 w-4 mr-2" />
              Auditoria LGPD
            </Button>
          </div>
        </div>

        {/* KPIs de Compliance */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94%</div>
              <div className="flex items-center mt-2">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '94%' }}></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Riscos Críticos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">2</div>
              <p className="text-xs text-gray-500 mt-1">
                Audesp, TISS
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Prazo Audesp</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15 dias</div>
              <p className="text-xs text-gray-500 mt-1">
                Próximo: 10/02/2025
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">LGPD Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">Conforme</div>
              <p className="text-xs text-gray-500 mt-1">
                100% acessos revisados
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="matriz" className="space-y-4">
          <TabsList>
            <TabsTrigger value="matriz">Matriz de Risco</TabsTrigger>
            <TabsTrigger value="audesp">Audesp</TabsTrigger>
            <TabsTrigger value="transparencia">Transparência</TabsTrigger>
            <TabsTrigger value="lgpd">LGPD</TabsTrigger>
          </TabsList>

          {/* Matriz de Risco 5x5 */}
          <TabsContent value="matriz">
            <Card>
              <CardHeader>
                <CardTitle>Matriz de Risco 5x5</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-4">Mapa de Calor</h4>
                    <div className="relative">
                      <div className="grid grid-cols-5 gap-1">
                        {[...Array(25)].map((_, i) => {
                          const row = Math.floor(i / 5);
                          const col = i % 5;
                          const prob = 5 - row;
                          const impact = col + 1;
                          const risks = riskMatrix.filter(r => 
                            r.probabilidade === prob && r.impacto === impact
                          );
                          
                          return (
                            <div
                              key={i}
                              className={`${getRiskColor(prob, impact)} h-16 flex items-center justify-center text-xs font-bold rounded cursor-pointer hover:opacity-80`}
                              onClick={() => risks.length > 0 && setSelectedRisk(risks[0])}
                            >
                              {risks.length > 0 && (
                                <div className="text-center">
                                  <div className="text-white bg-black/30 rounded px-1">
                                    {risks.length}
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                      <div className="mt-2 text-xs text-gray-500">
                        <span>← Impacto →</span>
                      </div>
                      <div className="absolute -left-20 top-1/2 transform -translate-y-1/2 -rotate-90 text-xs text-gray-500">
                        <span>← Probabilidade →</span>
                      </div>
                    </div>

                    <div className="mt-4 space-y-1">
                      <div className="flex items-center text-xs">
                        <div className="w-3 h-3 bg-red-500 rounded mr-2"></div>
                        <span>Crítico (15-25)</span>
                      </div>
                      <div className="flex items-center text-xs">
                        <div className="w-3 h-3 bg-orange-400 rounded mr-2"></div>
                        <span>Alto (10-14)</span>
                      </div>
                      <div className="flex items-center text-xs">
                        <div className="w-3 h-3 bg-yellow-300 rounded mr-2"></div>
                        <span>Médio (5-9)</span>
                      </div>
                      <div className="flex items-center text-xs">
                        <div className="w-3 h-3 bg-green-300 rounded mr-2"></div>
                        <span>Baixo (1-4)</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-4">Lista de Riscos</h4>
                    <div className="space-y-2">
                      {riskMatrix.map(risk => (
                        <div 
                          key={risk.id}
                          className={`p-3 border rounded cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 ${
                            selectedRisk?.id === risk.id ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : ''
                          }`}
                          onClick={() => setSelectedRisk(risk)}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">{risk.nome}</p>
                              <p className="text-xs text-gray-500">{risk.categoria}</p>
                            </div>
                            <div className="text-right">
                              <Badge className={
                                risk.probabilidade * risk.impacto >= 15 ? 'bg-red-500' :
                                risk.probabilidade * risk.impacto >= 10 ? 'bg-orange-400' :
                                risk.probabilidade * risk.impacto >= 5 ? 'bg-yellow-300' :
                                'bg-green-300'
                              }>
                                Score: {risk.probabilidade * risk.impacto}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {selectedRisk && (
                      <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded">
                        <h5 className="font-semibold mb-2">Plano de Mitigação</h5>
                        <div className="space-y-2 text-sm">
                          <p><strong>Risco:</strong> {selectedRisk.nome}</p>
                          <p><strong>Ação:</strong> Implementar validação automatizada</p>
                          <p><strong>Responsável:</strong> Equipe de TI</p>
                          <p><strong>Prazo:</strong> 30 dias</p>
                          <Button size="sm" className="mt-2">
                            <Eye className="h-4 w-4 mr-2" />
                            Ver Detalhes
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Audesp */}
          <TabsContent value="audesp">
            <Card>
              <CardHeader>
                <CardTitle>Validador Audesp</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Validação de Schema */}
                  <div>
                    <h4 className="font-semibold mb-3">Validação de Schema</h4>
                    <div className="space-y-2">
                      {audespValidation.schemas.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded">
                          <div className="flex items-center">
                            {item.status === 'ok' ? (
                              <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                            ) : item.status === 'erro' ? (
                              <XCircle className="h-5 w-5 text-red-500 mr-3" />
                            ) : (
                              <AlertCircle className="h-5 w-5 text-yellow-500 mr-3" />
                            )}
                            <div>
                              <p className="font-medium">{item.campo}</p>
                              <p className="text-sm text-gray-500">{item.mensagem}</p>
                            </div>
                          </div>
                          <Badge className={
                            item.status === 'ok' ? 'bg-green-100 text-green-800' :
                            item.status === 'erro' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }>
                            {item.status.toUpperCase()}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Relógio Regulatório */}
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center">
                      <Clock className="h-5 w-5 mr-2" />
                      Relógio Regulatório
                    </h4>
                    <div className="space-y-2">
                      {audespValidation.competencias.map((comp, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded">
                          <div>
                            <p className="font-medium">{comp.mes}</p>
                            <p className="text-sm text-gray-500">Prazo: {comp.prazo}</p>
                          </div>
                          <div className="text-right">
                            <Badge className={
                              comp.status === 'aceito' ? 'bg-green-100 text-green-800' :
                              comp.status === 'enviado' ? 'bg-blue-100 text-blue-800' :
                              'bg-gray-100 text-gray-800'
                            }>
                              {comp.status.toUpperCase()}
                            </Badge>
                            {comp.protocolo && (
                              <p className="text-xs text-gray-500 mt-1">{comp.protocolo}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full">
                    <Upload className="h-4 w-4 mr-2" />
                    Gerar e Enviar Prestação de Contas
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Transparência */}
          <TabsContent value="transparencia">
            <Card>
              <CardHeader>
                <CardTitle>Transparência Ativa</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded">
                    <div>
                      <p className="font-semibold">Conformidade Geral</p>
                      <p className="text-sm text-gray-500">4 de 5 documentos obrigatórios publicados</p>
                    </div>
                    <div className="text-2xl font-bold text-blue-500">80%</div>
                  </div>

                  <div className="space-y-2">
                    {transparenciaChecklist.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded">
                        <div className="flex items-center">
                          {item.publicado ? (
                            <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-500 mr-3" />
                          )}
                          <div>
                            <p className="font-medium">
                              {item.item}
                              {item.obrigatorio && (
                                <Badge className="ml-2 bg-red-100 text-red-800" variant="outline">
                                  Obrigatório
                                </Badge>
                              )}
                            </p>
                            {item.publicado && (
                              <div className="flex items-center text-xs text-gray-500 mt-1">
                                <Hash className="h-3 w-3 mr-1" />
                                Hash: {item.hash}
                                <span className="mx-2">•</span>
                                <Calendar className="h-3 w-3 mr-1" />
                                {item.data}
                              </div>
                            )}
                          </div>
                        </div>
                        <Button size="sm" variant={item.publicado ? "outline" : "default"}>
                          {item.publicado ? 'Atualizar' : 'Publicar'}
                        </Button>
                      </div>
                    ))}
                  </div>

                  <Button className="w-full" variant="outline">
                    <FileCheck className="h-4 w-4 mr-2" />
                    Publicar Pacote Completo de Transparência
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* LGPD */}
          <TabsContent value="lgpd">
            <Card>
              <CardHeader>
                <CardTitle>LGPD Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Incidentes */}
                  <div>
                    <h4 className="font-semibold mb-3">Incidentes Recentes</h4>
                    <div className="space-y-2">
                      {lgpdMetrics.incidentes.map((inc, index) => (
                        <div key={index} className="p-3 border rounded">
                          <div className="flex items-center justify-between mb-2">
                            <Badge className={
                              inc.gravidade === 'baixa' ? 'bg-green-100 text-green-800' :
                              inc.gravidade === 'media' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }>
                              {inc.gravidade.toUpperCase()}
                            </Badge>
                            <span className="text-xs text-gray-500">{inc.data}</span>
                          </div>
                          <p className="text-sm font-medium">{inc.tipo}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-gray-500">
                              Status: {inc.status === 'resolvido' ? 'Resolvido' : 'Em Análise'}
                            </span>
                            {inc.mttr && (
                              <span className="text-xs text-gray-500">
                                MTTR: {inc.mttr}h
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Revisão de Acessos */}
                  <div>
                    <h4 className="font-semibold mb-3">Revisão de Acessos</h4>
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded">
                      <div className="flex items-center justify-between mb-3">
                        <Lock className="h-8 w-8 text-green-500" />
                        <div className="text-right">
                          <p className="text-2xl font-bold text-green-500">100%</p>
                          <p className="text-xs text-gray-500">Revisados</p>
                        </div>
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Total de Perfis:</span>
                          <span className="font-medium">{lgpdMetrics.acessos.total}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Última Revisão:</span>
                          <span className="font-medium">{lgpdMetrics.acessos.ultimaRevisao}</span>
                        </div>
                      </div>
                    </div>

                    <Button className="w-full mt-4" variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      Iniciar Nova Revisão
                    </Button>
                  </div>

                  {/* ROPA */}
                  <div className="md:col-span-2">
                    <h4 className="font-semibold mb-3">ROPA - Registro de Operações</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-2">Processo</th>
                            <th className="text-left p-2">Dados Tratados</th>
                            <th className="text-left p-2">Base Legal</th>
                            <th className="text-left p-2">Retenção</th>
                          </tr>
                        </thead>
                        <tbody>
                          {lgpdMetrics.ropa.map((item, index) => (
                            <tr key={index} className="border-b">
                              <td className="p-2">{item.processo}</td>
                              <td className="p-2">{item.dados}</td>
                              <td className="p-2">{item.base}</td>
                              <td className="p-2">{item.retencao}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
  );
};

export default OSSComplianceRisco;
