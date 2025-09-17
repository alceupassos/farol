import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { 
  Database, 
  Building, 
  Zap, 
  Globe, 
  Shield, 
  Activity,
  FileText,
  Users,
  Heart,
  TestTube,
  Calendar,
  BarChart3,
  CheckCircle,
  ArrowRight,
  Link as LinkIcon,
  Server,
  Cloud,
  Stethoscope
} from 'lucide-react';

const IntegracaoERPPage = () => {
  const navigate = useNavigate();
  const erpSystems = [
    { name: "Philips Tasy", description: "Sistema integrado de gestão hospitalar", hasIntegration: true },
    { name: "SOUL MV Hospitalar", description: "Plataforma completa para gestão hospitalar" },
    { name: "TOTVS Saúde para hospitais", description: "ERP especializado em saúde" },
    { name: "Benner – Gestão Hospitalar/HIS", description: "Sistema de informação hospitalar" },
    { name: "Otto Hx", description: "Plataforma de gestão hospitalar inteligente" },
    { name: "Pixeon", description: "Soluções em tecnologia para radiologia" },
    { name: "SisHOSP Core", description: "Sistema core para gestão hospitalar" },
    { name: "Real Clinic", description: "Gestão clínica e hospitalar" },
    { name: "Feegow Clinic", description: "Plataforma de gestão médica" },
    { name: "MXM – ERP para Hospitais/Backoffice de Saúde", description: "ERP especializado em backoffice" },
    { name: "SysMiddle – HIS", description: "Sistema de informação hospitalar" },
    { name: "Sistema Colmeia – Gestão Hospitalar", description: "Gestão integrada hospitalar" }
  ];

  const interoperabilityServices = [
    {
      category: "Interoperabilidade Central",
      services: [
        {
          name: "RNDS – Rede Nacional de Dados em Saúde",
          description: "Backbone nacional de interoperabilidade com API REST FHIR (R4) para envio/consulta de recursos clínicos, incluindo pacientes, imunizações e resultados de exames.",
          icon: <Globe className="h-5 w-5" />
        },
        {
          name: "RNDS EHR Services por UF",
          description: "Manual com diretrizes de credenciamento, suporte e endpoints estaduais de produção para integração autenticada.",
          icon: <Shield className="h-5 w-5" />
        }
      ]
    },
    {
      category: "Atenção Primária (e-SUS APS)",
      services: [
        {
          name: "e-SUS APS PEC – LEDI APS e DW PEC",
          description: "Integração de sistemas próprios via LEDI (Apache Thrift/XML) e acesso ao data warehouse para relatórios e extração de dados.",
          icon: <Database className="h-5 w-5" />,
          hasIntegration: true,
          route: "/esus-integration"
        },
        {
          name: "API de transmissão LEDI no PEC",
          description: "A partir da versão 5.3.19, permite enviar registros LEDI diretamente ao PEC via HTTPS com credenciais gerenciadas no próprio sistema.",
          icon: <Zap className="h-5 w-5" />
        }
      ]
    },
    {
      category: "Regulação de Acesso",
      services: [
        {
          name: "SISREG – Sistema de Regulação",
          description: "API oficial para extração de informações de agendamento, marcação e cancelamento; o MS realizou atualização tecnológica recente na API.",
          icon: <Calendar className="h-5 w-5" />,
          hasIntegration: true,
          route: "/sisreg-integration"
        }
      ]
    },
    {
      category: "Cadastros e Tabelas Nacionais",
      services: [
        {
          name: "CNES – Cadastro Nacional de Estabelecimentos de Saúde",
          description: "Web services oficiais (WSDL/SOAP) para consumo de dados do cadastro nacional; também há APIs/dumps públicos para integração analítica.",
          icon: <Building className="h-5 w-5" />,
          hasIntegration: true,
          route: "/cnes-integration"
        },
        {
          name: "CADSUS/CNS – Cartão Nacional de Saúde",
          description: "Web service governamental para troca de informações cadastrais de usuários do SUS.",
          icon: <Users className="h-5 w-5" />
        },
        {
          name: "SIGTAP – Tabela de Procedimentos/Medicamentos/OPM",
          description: "Integração via barramento SOA com especificação técnica publicada e portal oficial de referência.",
          icon: <FileText className="h-5 w-5" />
        }
      ]
    },
    {
      category: "Assistência Ambulatorial e Hospitalar",
      services: [
        {
          name: "SIA/SUS – Produção ambulatorial",
          description: "Integração por arquivos padronizados (BPA-C e BPA-i) e fluxos definidos para processamento ambulatorial.",
          icon: <Stethoscope className="h-5 w-5" />
        },
        {
          name: "SIH/SUS – Produção hospitalar (AIH)",
          description: "Padronização do fluxo de internações com bases consolidadas e orientação para integração dos dados de produção.",
          icon: <Activity className="h-5 w-5" />
        }
      ]
    },
    {
      category: "Vigilância e Notificação",
      services: [
        {
          name: "e-SUS Notifica",
          description: "Manual oficial de API para acesso aos dados de notificações, com coleções e requisições documentadas.",
          icon: <Shield className="h-5 w-5" />
        },
        {
          name: "SINAN e e-SUS Sinan",
          description: "Modernização com datasets e API publicados no OpenDataSUS para integração e análise de notificações.",
          icon: <BarChart3 className="h-5 w-5" />
        }
      ]
    },
    {
      category: "Laboratórios e Exames",
      services: [
        {
          name: "GAL – Gerenciador de Ambiente Laboratorial",
          description: "Sistema DATASUS para redes de laboratórios com módulos nacionais/estaduais e integração técnica em evolução via API para LIS.",
          icon: <TestTube className="h-5 w-5" />
        },
        {
          name: "Envio de resultados de exames via RNDS",
          description: "Serviços FHIR de submissão/consulta de Bundles para resultados laboratoriais.",
          icon: <Heart className="h-5 w-5" />
        }
      ]
    },
    {
      category: "Catálogos e Apoio Técnico",
      services: [
        {
          name: "Catálogo de APIs Gov.br",
          description: "Portal unificado para pesquisa, solicitação de acesso e documentação de APIs governamentais (inclui entrada oficial da RNDS).",
          icon: <LinkIcon className="h-5 w-5" />
        },
        {
          name: "Ecossistema FHIR da RNDS",
          description: "Diretrizes técnicas, perfis e tecnologias usadas (ex.: HAPI FHIR) para adequação de integrações clínicas.",
          icon: <Server className="h-5 w-5" />
        }
      ]
    }
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-blue-800 dark:text-blue-200 mb-2 flex items-center">
            <Database className="h-10 w-10 mr-4 text-blue-600" />
            Integração ERP Hospitalar
          </h1>
          <p className="text-blue-700 dark:text-blue-300 text-lg">
            Conecte seu hospital aos principais sistemas ERP e APIs governamentais de saúde
          </p>
        </div>

        {/* Sistemas ERP */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 flex items-center">
            <Cloud className="h-6 w-6 mr-3 text-blue-600" />
            Sistemas ERP Hospitalares
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {erpSystems.map((system, index) => (
              <Card key={index} className="bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white mb-3"
                    size="sm"
                    onClick={() => {
                      if (system.hasIntegration) {
                        navigate('/philips-tasy-integration');
                      }
                    }}
                  >
                    <Database className="h-4 w-4 mr-2" />
                    {system.name}
                  </Button>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {system.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* APIs e Serviços de Interoperabilidade */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 flex items-center">
            <Zap className="h-6 w-6 mr-3 text-green-600" />
            APIs e Serviços de Interoperabilidade
          </h2>
          
          {interoperabilityServices.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-8">
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center">
                <ArrowRight className="h-5 w-5 mr-2 text-green-600" />
                {category.category}
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {category.services.map((service, serviceIndex) => (
                  <Card key={serviceIndex} className="bg-white dark:bg-gray-800 border-l-4 border-l-green-500">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3 mb-3">
                        <Button 
                          className="bg-green-600 hover:bg-green-700 text-white flex-shrink-0"
                          size="sm"
                          onClick={() => {
                            if (service.hasIntegration && service.route) {
                              navigate(service.route);
                            }
                          }}
                        >
                          {service.icon}
                          <span className="ml-2 text-xs">{service.name}</span>
                          {service.hasIntegration && <ArrowRight className="h-3 w-3 ml-1" />}
                        </Button>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {service.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer de Integração */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">Precisa de Suporte Técnico?</h3>
              <p className="text-blue-100">
                Nossa equipe especializada pode ajudar na integração com qualquer sistema ERP ou API governamental.
              </p>
            </div>
            <Button className="bg-white text-blue-600 hover:bg-gray-100">
              <CheckCircle className="h-4 w-4 mr-2" />
              Solicitar Suporte
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default IntegracaoERPPage;
