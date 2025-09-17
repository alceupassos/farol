import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Database, Globe, Shield, Calendar, FileText, Activity, TestTube, Server, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PhilipsTasyIntegrationPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    // RNDS - Interoperabilidade Central
    rnds_endpoint: '',
    rnds_token: '',
    rnds_environment: '',
    rnds_client_id: '',
    rnds_client_secret: '',
    rnds_profiles: '',
    
    // e-SUS APS
    esus_ledi_endpoint: '',
    esus_ledi_user: '',
    esus_ledi_password: '',
    esus_pec_version: '',
    esus_https_config: '',
    
    // SISREG
    sisreg_api_endpoint: '',
    sisreg_token: '',
    sisreg_version: '',
    sisreg_operations: '',
    
    // Cadastros Nacionais
    cnes_api_endpoint: '',
    cnes_dataset_id: '',
    cnes_wsdl_endpoint: '',
    cadsus_soap_endpoint: '',
    cadsus_ws_security: '',
    sigtap_endpoint: '',
    tabnet_base_url: '',
    
    // Assistência Hospitalar
    sia_bpa_path: '',
    sia_bpa_config: '',
    sih_aih_path: '',
    sih_aih_config: '',
    
    // Vigilância
    esus_notifica_api: '',
    esus_notifica_token: '',
    esus_notifica_collections: '',
    sinan_api_endpoint: '',
    sinan_datasets: '',
    
    // Laboratórios
    gal_datasus_endpoint: '',
    gal_lis_config: '',
    rnds_fhir_bundles: '',
    rnds_lab_profiles: '',
    pni_api_endpoint: '',
    
    // Catálogos e MCP Server
    gov_api_catalog: '',
    mcp_server_endpoint: '',
    mcp_auth_config: '',
    fhir_hapi_server: '',
    portal_servicos_url: ''
  });

  const integrationSections = [
    {
      title: "Interoperabilidade Central",
      icon: <Globe className="h-5 w-5" />,
      fields: [
        { key: "rnds_endpoint", label: "RNDS - Endpoint API FHIR (R4)", description: "RESTful API baseada em FHIR R4 para dados clínicos", placeholder: "https://rnds.saude.gov.br/api/fhir/r4" },
        { key: "rnds_token", label: "RNDS - Token de Autenticação", description: "Token obtido no Portal de Serviços DATASUS", placeholder: "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9..." },
        { key: "rnds_environment", label: "RNDS - Ambiente", description: "Homologação ou Produção", placeholder: "homologacao" },
        { key: "rnds_client_id", label: "RNDS - Client ID", description: "ID do cliente registrado no Portal de Serviços", placeholder: "client_id_datasus" },
        { key: "rnds_client_secret", label: "RNDS - Client Secret", description: "Chave secreta para autenticação", type: "password", placeholder: "client_secret_value" },
        { key: "rnds_profiles", label: "RNDS - Perfis Nacionais", description: "Perfis FHIR utilizados (Patient, Observation, Immunization)", type: "textarea", placeholder: "Patient\nObservation\nImmunization\nDiagnosticReport" }
      ]
    },
    {
      title: "Atenção Primária (e-SUS APS)",
      icon: <Shield className="h-5 w-5" />,
      fields: [
        { key: "esus_ledi_endpoint", label: "e-SUS LEDI - Endpoint", description: "Integração via Apache Thrift/XML e acesso ao data warehouse", placeholder: "http://esus-pec.local/ledi" },
        { key: "esus_ledi_user", label: "e-SUS LEDI - Usuário", description: "Usuário para autenticação LEDI", placeholder: "usuario_ledi" },
        { key: "esus_ledi_password", label: "e-SUS LEDI - Senha", description: "Senha para autenticação LEDI", type: "password", placeholder: "senha_ledi" },
        { key: "esus_pec_version", label: "e-SUS PEC - Versão", description: "Versão 5.3.19+ para transmissão LEDI via HTTPS", placeholder: "5.3.19" },
        { key: "esus_https_config", label: "e-SUS - Configuração HTTPS", description: "Configuração SSL/TLS para envio direto", type: "textarea", placeholder: "SSL_VERIFY_PEER=true\nSSL_CAINFO=/path/to/ca-bundle.crt" }
      ]
    },
    {
      title: "Regulação de Acesso",
      icon: <Calendar className="h-5 w-5" />,
      fields: [
        { key: "sisreg_api_endpoint", label: "SISREG - API Endpoint", description: "API oficial para extração de informações de agendamento", placeholder: "https://sisreg.saude.gov.br/api" },
        { key: "sisreg_token", label: "SISREG - Token de Acesso", description: "Token de autenticação para API do SISREG", placeholder: "sisreg_token_123456" },
        { key: "sisreg_version", label: "SISREG - Versão da API", description: "Versão atualizada da API (atualização tecnológica recente do MS)", placeholder: "v2.0" },
        { key: "sisreg_operations", label: "SISREG - Operações", description: "Operações disponíveis (agendamento, marcação, cancelamento)", type: "textarea", placeholder: "agendamento\nmarcacao\ncancelamento\nconsulta" }
      ]
    },
    {
      title: "Cadastros Nacionais",
      icon: <FileText className="h-5 w-5" />,
      fields: [
        { key: "cnes_api_endpoint", label: "CNES - API OpenDataSUS", description: "API de dados abertos via OpenDataSUS/CKAN", placeholder: "https://opendatasus.saude.gov.br/api/3/action/datastore_search" },
        { key: "cnes_dataset_id", label: "CNES - Dataset ID", description: "ID do dataset CNES no OpenDataSUS", placeholder: "cnes-estabelecimentos-saude" },
        { key: "cnes_wsdl_endpoint", label: "CNES - WSDL Endpoint (Legacy)", description: "Web services SOAP para cadastro nacional (legado)", placeholder: "http://cnes.datasus.gov.br/services/cnes?wsdl" },
        { key: "cadsus_soap_endpoint", label: "CadSUS/CNS - Endpoint SOAP", description: "Web Service SOAP com WS-Security para usuários do SUS", placeholder: "https://servicos.saude.gov.br/cadsus/v1" },
        { key: "cadsus_ws_security", label: "CadSUS - WS-Security Config", description: "Configuração WS-Security (PIX/PDQ v3/XML)", type: "textarea", placeholder: "Username: usuario_cadsus\nPassword: senha_cadsus\nTimestamp: true\nSignature: true" },
        { key: "sigtap_endpoint", label: "SIGTAP - Endpoint SOA", description: "Integração via barramento SOA para procedimentos/medicamentos/OPM", placeholder: "https://sigtap.datasus.gov.br/soa" },
        { key: "tabnet_base_url", label: "TABNET - Base URL", description: "Interface de tabulação pública para séries históricas", placeholder: "http://tabnet.datasus.gov.br/cgi/tabcgi.exe" }
      ]
    },
    {
      title: "Assistência Hospitalar",
      icon: <Activity className="h-5 w-5" />,
      fields: [
        { key: "sia_bpa_path", label: "SIA/SUS - Diretório BPA", description: "Caminho para arquivos BPA-C e BPA-i", placeholder: "/dados/sia/bpa/" },
        { key: "sia_bpa_config", label: "SIA/SUS - Configuração BPA", description: "Configuração para processamento ambulatorial", type: "textarea", placeholder: "BPA_CONSOLIDADO=true\nBPA_INDIVIDUAL=true\nFORMATO=XML\nVALIDACAO=true" },
        { key: "sih_aih_path", label: "SIH/SUS - Diretório AIH", description: "Caminho para arquivos AIH", placeholder: "/dados/sih/aih/" },
        { key: "sih_aih_config", label: "SIH/SUS - Configuração AIH", description: "Padronização do fluxo de internações", type: "textarea", placeholder: "AIH_FORMATO=RD\nBASE_CONSOLIDADA=true\nVALIDACAO_CAMPOS=true\nCODIFICACAO=UTF-8" }
      ]
    },
    {
      title: "Vigilância",
      icon: <Shield className="h-5 w-5" />,
      fields: [
        { key: "esus_notifica_api", label: "e-SUS Notifica - API Endpoint", description: "Manual oficial de API para acesso aos dados de notificações", placeholder: "https://notifica.saude.gov.br/api" },
        { key: "esus_notifica_token", label: "e-SUS Notifica - Token", description: "Token de acesso para API de notificações", placeholder: "notifica_token_123456" },
        { key: "esus_notifica_collections", label: "e-SUS Notifica - Coleções", description: "Coleções e requisições documentadas", type: "textarea", placeholder: "covid19\ndengue\nzika\nchikungunya\ninfluenza" },
        { key: "sinan_api_endpoint", label: "SINAN/e-SUS Sinan - Endpoint", description: "API modernizada com datasets publicados no OpenDataSUS", placeholder: "https://opendatasus.saude.gov.br/sinan/api" },
        { key: "sinan_datasets", label: "SINAN - Datasets", description: "Datasets disponíveis para integração e análise", type: "textarea", placeholder: "sinan-dengue\nsinan-tuberculose\nsinan-hanseniase\nsinan-malaria" }
      ]
    },
    {
      title: "Laboratórios",
      icon: <TestTube className="h-5 w-5" />,
      fields: [
        { key: "gal_datasus_endpoint", label: "GAL - Endpoint DATASUS", description: "Sistema DATASUS para redes de laboratórios", placeholder: "https://gal.datasus.gov.br/api" },
        { key: "gal_lis_config", label: "GAL - Configuração LIS", description: "Integração técnica em evolução via API para LIS", type: "textarea", placeholder: "LIS_INTEGRATION=true\nMODULO=nacional\nFORMATO=HL7\nVERSAO=2.5" },
        { key: "rnds_fhir_bundles", label: "RNDS - Endpoint FHIR Bundles", description: "Serviços FHIR para submissão/consulta de resultados laboratoriais", placeholder: "https://rnds.saude.gov.br/fhir/Bundle" },
        { key: "rnds_lab_profiles", label: "RNDS - Perfis Laboratoriais", description: "Perfis FHIR específicos para laboratórios", type: "textarea", placeholder: "DiagnosticReport\nObservation\nSpecimen\nServiceRequest" },
        { key: "pni_api_endpoint", label: "PNI - API Imunizações", description: "API para dados de doses aplicadas via RNDS", placeholder: "http://pni.datasus.gov.br/api" }
      ]
    },
    {
      title: "Catálogos e MCP Server",
      icon: <Server className="h-5 w-5" />,
      fields: [
        { key: "gov_api_catalog", label: "Catálogo APIs Gov.br", description: "Portal unificado para pesquisa e solicitação de acesso", placeholder: "https://www.gov.br/conecta/catalogo/apis" },
        { key: "mcp_server_endpoint", label: "MCP Server - Endpoint", description: "Servidor MCP para orquestração centralizada", placeholder: "http://mcp-server.local:8080" },
        { key: "mcp_auth_config", label: "MCP Server - Configuração Auth", description: "Configuração de autenticação centralizada", type: "textarea", placeholder: "CACHE_ENABLED=true\nLOGS_ENABLED=true\nTOKEN_REFRESH=3600\nRETRY_ATTEMPTS=3" },
        { key: "fhir_hapi_server", label: "HAPI FHIR Server", description: "Servidor HAPI FHIR para adequação de integrações clínicas", placeholder: "http://hapi-fhir.local:8080/fhir" },
        { key: "portal_servicos_url", label: "Portal de Serviços DATASUS", description: "URL para solicitação de credenciais", placeholder: "https://servicos.saude.gov.br/portal" }
      ]
    }
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 p-6">
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Button variant="outline" onClick={() => navigate('/integracao-erp')} className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
            <div>
              <h1 className="text-4xl font-bold text-blue-800 dark:text-blue-200 mb-2 flex items-center">
                <Database className="h-10 w-10 mr-4 text-blue-600" />
                Integração Philips Tasy
              </h1>
              <p className="text-blue-700 dark:text-blue-300 text-lg">
                Configuração de APIs governamentais de saúde
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {integrationSections.map((section, index) => (
            <Card key={index} className="bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-blue-800 dark:text-blue-200 flex items-center">
                  {section.icon}
                  <span className="ml-3">{section.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {section.fields.map((field, fieldIndex) => (
                    <div key={fieldIndex} className="space-y-2">
                      <Label htmlFor={field.key}>{field.label}</Label>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{field.description}</p>
                      {field.type === 'textarea' ? (
                        <Textarea
                          id={field.key}
                          placeholder={field.placeholder}
                          value={formData[field.key as keyof typeof formData] || ''}
                          onChange={(e) => setFormData(prev => ({ ...prev, [field.key]: e.target.value }))}
                          className="min-h-[80px]"
                        />
                      ) : (
                        <Input
                          id={field.key}
                          type={field.type === 'password' ? 'password' : 'text'}
                          placeholder={field.placeholder}
                          value={formData[field.key as keyof typeof formData] || ''}
                          onChange={(e) => setFormData(prev => ({ ...prev, [field.key]: e.target.value }))}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 flex justify-end">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Save className="h-4 w-4 mr-2" />
            Salvar Configuração
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default PhilipsTasyIntegrationPage;
