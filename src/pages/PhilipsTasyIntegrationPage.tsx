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
    rnds_endpoint: '',
    rnds_credentials: '',
    esus_ledi_endpoint: '',
    sisreg_api_endpoint: '',
    cnes_wsdl_endpoint: '',
    sia_bpa_config: '',
    esus_notifica_api: '',
    gal_datasus_endpoint: ''
  });

  const integrationSections = [
    {
      title: "Interoperabilidade Central",
      icon: <Globe className="h-5 w-5" />,
      fields: [
        { key: "rnds_endpoint", label: "RNDS - Endpoint API FHIR (R4)", description: "Backbone nacional para recursos clínicos" },
        { key: "rnds_credentials", label: "RNDS - Credenciais", description: "Token de acesso e certificados", type: "textarea" }
      ]
    },
    {
      title: "Atenção Primária (e-SUS APS)",
      icon: <Shield className="h-5 w-5" />,
      fields: [
        { key: "esus_ledi_endpoint", label: "e-SUS LEDI - Endpoint", description: "Integração via Apache Thrift/XML" }
      ]
    },
    {
      title: "Regulação de Acesso",
      icon: <Calendar className="h-5 w-5" />,
      fields: [
        { key: "sisreg_api_endpoint", label: "SISREG - API Endpoint", description: "API para agendamento e marcação" }
      ]
    },
    {
      title: "Cadastros Nacionais",
      icon: <FileText className="h-5 w-5" />,
      fields: [
        { key: "cnes_wsdl_endpoint", label: "CNES - WSDL Endpoint", description: "Web services SOAP para cadastro nacional" }
      ]
    },
    {
      title: "Assistência Hospitalar",
      icon: <Activity className="h-5 w-5" />,
      fields: [
        { key: "sia_bpa_config", label: "SIA/SUS - Config BPA", description: "Arquivos BPA-C e BPA-i", type: "textarea" }
      ]
    },
    {
      title: "Vigilância",
      icon: <Shield className="h-5 w-5" />,
      fields: [
        { key: "esus_notifica_api", label: "e-SUS Notifica - API", description: "API para dados de notificações" }
      ]
    },
    {
      title: "Laboratórios",
      icon: <TestTube className="h-5 w-5" />,
      fields: [
        { key: "gal_datasus_endpoint", label: "GAL - Endpoint", description: "Sistema DATASUS para laboratórios" }
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
                          value={formData[field.key as keyof typeof formData] || ''}
                          onChange={(e) => setFormData(prev => ({ ...prev, [field.key]: e.target.value }))}
                          className="min-h-[80px]"
                        />
                      ) : (
                        <Input
                          id={field.key}
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
