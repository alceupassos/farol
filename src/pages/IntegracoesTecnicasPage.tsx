import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RefreshCw, Database, Server, Globe, Shield, Code, CheckCircle, AlertTriangle, Clock, Target, TestTube, Pill, DollarSign, Stethoscope, Heart, BarChart3, Brain } from 'lucide-react';

const IntegracoesTecnicasPage = () => {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center">
            <RefreshCw className="h-10 w-10 mr-4 text-blue-400" />
            Integrações Técnicas Necessárias
          </h1>
          <p className="text-gray-400 text-lg mb-4">
            Roadmap Técnico - Integrações para Dados Reais Hospitalares
          </p>
          <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-4">
            <p className="text-blue-200 text-sm leading-relaxed">
              <strong>Para o CTO/Arquiteto:</strong> Documentação técnica completa das integrações necessárias para conectar 
              dados reais dos sistemas hospitalares aos dashboards executivos. Inclui APIs, protocolos, bancos de dados e 
              cronograma de implementação para cada módulo do sistema.
            </p>
          </div>
        </div>

        {/* Integrações Críticas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="bg-gray-800/50 border border-red-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Stethoscope className="h-6 w-6 mr-3 text-red-400" />
                Sistema HIS/HMIS Hospitalar
                <span className="ml-auto px-2 py-1 bg-red-900/30 text-red-400 rounded text-xs">CRÍTICO</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4">Integração com sistemas hospitalares para dados de pacientes, internações e prontuários.</p>
              <div className="space-y-2">
                <div><strong className="text-blue-400">APIs:</strong> HL7 FHIR R4, REST API, ADT Messages</div>
                <div><strong className="text-green-400">Bancos:</strong> PostgreSQL, Oracle, SQL Server</div>
                <div><strong className="text-purple-400">Protocolos:</strong> HL7 v2.x, FHIR R4, DICOM</div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border border-red-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Globe className="h-6 w-6 mr-3 text-green-400" />
                DATASUS/RNDS Integration
                <span className="ml-auto px-2 py-1 bg-red-900/30 text-red-400 rounded text-xs">CRÍTICO</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4">Conexão com Rede Nacional de Dados em Saúde do Ministério da Saúde.</p>
              <div className="space-y-2">
                <div><strong className="text-blue-400">APIs:</strong> RNDS API, CNES API, SIGTAP API</div>
                <div><strong className="text-green-400">Bancos:</strong> DATASUS DBF, PostgreSQL, Redis</div>
                <div><strong className="text-purple-400">Protocolos:</strong> FHIR R4, OAuth 2.0, JWT</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Integrações por Setor */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <TestTube className="h-5 w-5 mr-2 text-cyan-400" />
                Laboratório (LIS)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-sm mb-3">Resultados de exames, valores críticos, controle de qualidade.</p>
              <div className="text-xs space-y-1">
                <div><strong>APIs:</strong> LIS API, HL7 Lab Orders</div>
                <div><strong>Protocolos:</strong> HL7 v2.5, ASTM</div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Pill className="h-5 w-5 mr-2 text-green-400" />
                Farmácia e OPME
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-sm mb-3">Gestão farmacêutica, estoque, rastreabilidade OPME.</p>
              <div className="text-xs space-y-1">
                <div><strong>APIs:</strong> Pharmacy API, ANVISA API</div>
                <div><strong>Protocolos:</strong> EDI, SNGPC, GS1</div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Heart className="h-5 w-5 mr-2 text-purple-400" />
                UTI e Monitoramento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-sm mb-3">Equipamentos UTI, monitores, ventiladores, scores.</p>
              <div className="text-xs space-y-1">
                <div><strong>APIs:</strong> Device API, Monitor API</div>
                <div><strong>Protocolos:</strong> IEEE 11073, Continua</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Roadmap de Implementação */}
        <Card className="bg-gray-800/50 border border-gray-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white">Roadmap de Implementação Técnica</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-4 p-3 bg-gray-700/30 rounded-lg">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">1</div>
                <div>
                  <h3 className="text-white font-medium">Análise e Mapeamento (2-4 semanas)</h3>
                  <p className="text-gray-400 text-sm">Levantamento de sistemas, APIs e protocolos existentes</p>
                  <div className="flex gap-2 mt-1">
                    <span className="px-2 py-1 bg-indigo-900/30 text-indigo-300 rounded text-xs">System Analysis</span>
                    <span className="px-2 py-1 bg-indigo-900/30 text-indigo-300 rounded text-xs">API Discovery</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-3 bg-gray-700/30 rounded-lg">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">2</div>
                <div>
                  <h3 className="text-white font-medium">Arquitetura de Integração (3-6 semanas)</h3>
                  <p className="text-gray-400 text-sm">ESB, message brokers, API gateway</p>
                  <div className="flex gap-2 mt-1">
                    <span className="px-2 py-1 bg-indigo-900/30 text-indigo-300 rounded text-xs">Apache Kafka</span>
                    <span className="px-2 py-1 bg-indigo-900/30 text-indigo-300 rounded text-xs">API Gateway</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-3 bg-gray-700/30 rounded-lg">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">3</div>
                <div>
                  <h3 className="text-white font-medium">Desenvolvimento de Conectores (8-12 semanas)</h3>
                  <p className="text-gray-400 text-sm">Conectores específicos para cada sistema</p>
                  <div className="flex gap-2 mt-1">
                    <span className="px-2 py-1 bg-indigo-900/30 text-indigo-300 rounded text-xs">Node.js</span>
                    <span className="px-2 py-1 bg-indigo-900/30 text-indigo-300 rounded text-xs">HL7 Libraries</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-3 bg-gray-700/30 rounded-lg">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">4</div>
                <div>
                  <h3 className="text-white font-medium">ETL e Data Warehouse (6-10 semanas)</h3>
                  <p className="text-gray-400 text-sm">Pipelines ETL e consolidação de dados</p>
                  <div className="flex gap-2 mt-1">
                    <span className="px-2 py-1 bg-indigo-900/30 text-indigo-300 rounded text-xs">Apache Airflow</span>
                    <span className="px-2 py-1 bg-indigo-900/30 text-indigo-300 rounded text-xs">PostgreSQL</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tecnologias e Arquitetura */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Stack Tecnológico</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="text-blue-400 font-medium mb-2">Backend & APIs</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-blue-900/30 text-blue-300 rounded text-xs">Node.js</span>
                    <span className="px-2 py-1 bg-blue-900/30 text-blue-300 rounded text-xs">FastAPI</span>
                    <span className="px-2 py-1 bg-blue-900/30 text-blue-300 rounded text-xs">GraphQL</span>
                  </div>
                </div>
                <div>
                  <h4 className="text-green-400 font-medium mb-2">Bancos de Dados</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-green-900/30 text-green-300 rounded text-xs">PostgreSQL</span>
                    <span className="px-2 py-1 bg-green-900/30 text-green-300 rounded text-xs">ClickHouse</span>
                    <span className="px-2 py-1 bg-green-900/30 text-green-300 rounded text-xs">Redis</span>
                  </div>
                </div>
                <div>
                  <h4 className="text-purple-400 font-medium mb-2">Infraestrutura</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-purple-900/30 text-purple-300 rounded text-xs">Docker</span>
                    <span className="px-2 py-1 bg-purple-900/30 text-purple-300 rounded text-xs">Kubernetes</span>
                    <span className="px-2 py-1 bg-purple-900/30 text-purple-300 rounded text-xs">Apache Kafka</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Cronograma Estimado</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-2 bg-gray-700/30 rounded">
                  <span className="text-white text-sm">Fase 1 - Análise</span>
                  <span className="text-blue-400 text-sm">4 semanas</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-700/30 rounded">
                  <span className="text-white text-sm">Fase 2 - Arquitetura</span>
                  <span className="text-yellow-400 text-sm">6 semanas</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-700/30 rounded">
                  <span className="text-white text-sm">Fase 3 - Conectores</span>
                  <span className="text-orange-400 text-sm">12 semanas</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-700/30 rounded">
                  <span className="text-white text-sm">Fase 4 - ETL/DW</span>
                  <span className="text-red-400 text-sm">10 semanas</span>
                </div>
                <div className="border-t border-gray-600 pt-2 mt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-medium">Total Estimado</span>
                    <span className="text-green-400 font-bold">32 semanas</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default IntegracoesTecnicasPage;
