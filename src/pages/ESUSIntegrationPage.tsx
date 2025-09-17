import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Shield, Database, Server, FileText, Activity, Globe, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ESUSIntegrationPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    // API LEDI PEC
    pec_https_endpoint: '',
    pec_version: '',
    pec_admin_user: '',
    pec_admin_password: '',
    ledi_version: '',
    
    // Credenciais de Integração
    integrator_type: '',
    integrator_name: '',
    integrator_document: '',
    jsessionid_cookie: '',
    
    // Configuração LEDI
    ledi_format: '',
    ledi_xml_config: '',
    ledi_thrift_config: '',
    esus_file_path: '',
    
    // DW PEC Analytics
    dw_pec_host: '',
    dw_pec_port: '',
    dw_pec_database: '',
    dw_pec_user: '',
    dw_pec_password: '',
    dw_queries_config: '',
    
    // MCP Server
    mcp_server_endpoint: '',
    mcp_auth_config: '',
    mcp_queue_config: '',
    mcp_retry_config: '',
    
    // Ambiente e Testes
    training_environment: '',
    test_pipeline_config: '',
    error_handling_config: '',
    
    // Informatiza APS
    informatiza_aps_config: '',
    municipality_config: ''
  });

  const integrationSections = [
    {
      title: "API LEDI PEC (Envio de Registros)",
      icon: <Shield className="h-5 w-5" />,
      fields: [
        { key: "pec_https_endpoint", label: "PEC - Endpoint HTTPS", description: "URL base da instalação local do PEC (versão 5.3.19+)", placeholder: "https://esus-pec.municipio.gov.br" },
        { key: "pec_version", label: "PEC - Versão", description: "Versão do PEC instalada (ex: 5.4.12+)", placeholder: "5.4.12" },
        { key: "pec_admin_user", label: "PEC - Usuário Administrador", description: "Usuário administrador para gerar credenciais", placeholder: "admin_pec" },
        { key: "pec_admin_password", label: "PEC - Senha Administrador", description: "Senha do administrador PEC", type: "password", placeholder: "senha_admin" },
        { key: "ledi_version", label: "LEDI - Versão", description: "Versão LEDI compatível (ex: 7.2.3)", placeholder: "7.2.3" }
      ]
    },
    {
      title: "Credenciais de Integração",
      icon: <FileText className="h-5 w-5" />,
      fields: [
        { key: "integrator_type", label: "Tipo de Integrador", description: "Pessoa física ou jurídica", placeholder: "juridica" },
        { key: "integrator_name", label: "Nome do Integrador", description: "Nome/Razão social do integrador", placeholder: "Hospital Municipal XYZ" },
        { key: "integrator_document", label: "Documento do Integrador", description: "CPF ou CNPJ do integrador", placeholder: "12.345.678/0001-90" },
        { key: "jsessionid_cookie", label: "Cookie JSESSIONID", description: "Cookie retornado pelo login da API", placeholder: "JSESSIONID=ABC123DEF456..." }
      ]
    },
    {
      title: "Configuração LEDI",
      icon: <Database className="h-5 w-5" />,
      fields: [
        { key: "ledi_format", label: "Formato LEDI", description: "XML ou Apache Thrift", placeholder: "XML" },
        { key: "ledi_xml_config", label: "Configuração XML LEDI", description: "Estruturas e regras para fichas XML", type: "textarea", placeholder: "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<ledi:ficha xmlns:ledi=\"http://esus.gov.br/ledi\">\n  <versao>7.2.3</versao>\n  <tipo>ATENDIMENTO_INDIVIDUAL</tipo>\n</ledi:ficha>" },
        { key: "ledi_thrift_config", label: "Configuração Apache Thrift", description: "Configuração para serialização Thrift", type: "textarea", placeholder: "THRIFT_PROTOCOL=binary\nTHRIFT_TRANSPORT=http\nSERIALIZATION=compact" },
        { key: "esus_file_path", label: "Diretório Arquivos .esus", description: "Caminho para arquivos .esus (UUID.esus)", placeholder: "/dados/esus/fichas/" }
      ]
    },
    {
      title: "Endpoints da API",
      icon: <Globe className="h-5 w-5" />,
      fields: [
        { key: "login_endpoint", label: "Endpoint de Login", description: "POST /api/recebimento/login", placeholder: "/api/recebimento/login", readonly: true },
        { key: "ficha_endpoint", label: "Endpoint de Envio", description: "POST /api/v1/recebimento/ficha", placeholder: "/api/v1/recebimento/ficha", readonly: true },
        { key: "status_endpoint", label: "Endpoint de Status", description: "GET /api/v1/status", placeholder: "/api/v1/status", readonly: true }
      ]
    },
    {
      title: "DW PEC (Data Warehouse Analytics)",
      icon: <Activity className="h-5 w-5" />,
      fields: [
        { key: "dw_pec_host", label: "DW PEC - Host", description: "Servidor do Data Warehouse PEC", placeholder: "localhost" },
        { key: "dw_pec_port", label: "DW PEC - Porta", description: "Porta do banco DW PEC", placeholder: "5432" },
        { key: "dw_pec_database", label: "DW PEC - Database", description: "Nome do banco de dados DW", placeholder: "dw_pec" },
        { key: "dw_pec_user", label: "DW PEC - Usuário", description: "Usuário para acesso ao DW", placeholder: "dw_user" },
        { key: "dw_pec_password", label: "DW PEC - Senha", description: "Senha para acesso ao DW", type: "password", placeholder: "dw_password" },
        { key: "dw_queries_config", label: "DW PEC - Consultas", description: "Consultas parametrizadas para relatórios", type: "textarea", placeholder: "-- Indicadores APS\nSELECT * FROM tb_dim_equipe;\nSELECT * FROM tb_fat_atendimento_individual;\nSELECT * FROM tb_fat_procedimento;" }
      ]
    },
    {
      title: "MCP Server (Orquestração)",
      icon: <Server className="h-5 w-5" />,
      fields: [
        { key: "mcp_server_endpoint", label: "MCP Server - Endpoint", description: "Servidor MCP para fachada de integração", placeholder: "http://mcp-esus.local:8080" },
        { key: "mcp_auth_config", label: "MCP - Configuração Auth", description: "Gerenciamento de JSESSIONID e credenciais", type: "textarea", placeholder: "AUTH_METHOD=cookie\nSESSION_TIMEOUT=3600\nRETRY_LOGIN=true\nMAX_SESSIONS=10" },
        { key: "mcp_queue_config", label: "MCP - Configuração Filas", description: "Filas internas para envio de fichas", type: "textarea", placeholder: "QUEUE_TYPE=redis\nMAX_RETRIES=3\nRETRY_DELAY=5000\nDEAD_LETTER_QUEUE=true" },
        { key: "mcp_retry_config", label: "MCP - Configuração Retry", description: "Política de retentativas e logs", type: "textarea", placeholder: "RETRY_ATTEMPTS=3\nRETRY_BACKOFF=exponential\nLOG_ERRORS=true\nERROR_STORAGE=database" }
      ]
    },
    {
      title: "Ambiente e Testes",
      icon: <FileText className="h-5 w-5" />,
      fields: [
        { key: "training_environment", label: "Ambiente de Treinamento", description: "URL da instalação de treinamento PEC", placeholder: "https://treinamento-pec.esus.gov.br" },
        { key: "test_pipeline_config", label: "Pipeline de Testes", description: "Configuração para testes automatizados", type: "textarea", placeholder: "TEST_LEDI_VERSION=true\nTEST_ESUS_INTEGRITY=true\nTEST_ERROR_HANDLING=true\nTEST_ENVIRONMENT=training" },
        { key: "error_handling_config", label: "Tratamento de Erros", description: "Configuração para persistência e reprocessamento", type: "textarea", placeholder: "STORE_ERRORS=true\nERROR_TABLE=tb_integration_errors\nRETRY_FAILED=true\nNOTIFY_ADMIN=true" }
      ]
    },
    {
      title: "Informatiza APS",
      icon: <Shield className="h-5 w-5" />,
      fields: [
        { key: "informatiza_aps_config", label: "Configuração Informatiza APS", description: "Alinhamento à política pública de informatização", type: "textarea", placeholder: "STRATEGY=informatiza_aps\nCOMPLIANCE=true\nREPORTING=enabled\nMONITORING=active" },
        { key: "municipality_config", label: "Configuração Municipal", description: "Configurações específicas do município", type: "textarea", placeholder: "MUNICIPALITY_CODE=123456\nUF=SP\nREGION=sudeste\nPOPULATION=100000\nAPS_TEAMS=15" }
      ]
    }
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 p-6">
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Button variant="outline" onClick={() => navigate('/integracao-erp')} className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-green-800 dark:text-green-200 flex items-center">
                <Shield className="h-8 w-8 mr-3" />
                Integração e-SUS APS PEC
              </h1>
              <p className="text-green-600 dark:text-green-400 mt-2">
                Configuração completa para integração via LEDI APS e DW PEC
              </p>
            </div>
          </div>
        </div>

        {integrationSections.map((section, index) => (
          <Card key={index} className="bg-white dark:bg-gray-800 mb-6 shadow-lg">
            <CardHeader>
              <CardTitle className="text-green-800 dark:text-green-200 flex items-center">
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
                        className="min-h-[100px]"
                        readOnly={field.readonly}
                      />
                    ) : (
                      <Input
                        id={field.key}
                        type={field.type === 'password' ? 'password' : 'text'}
                        placeholder={field.placeholder}
                        value={formData[field.key as keyof typeof formData] || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, [field.key]: e.target.value }))}
                        readOnly={field.readonly}
                      />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}

        <div className="mt-8 flex justify-end">
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            <Save className="h-4 w-4 mr-2" />
            Salvar Configuração e-SUS APS
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default ESUSIntegrationPage;
