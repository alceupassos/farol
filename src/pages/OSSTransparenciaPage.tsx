import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, FileText } from 'lucide-react';

const OSSTransparenciaPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Portal da Transparência</h1>
      <Card>
        <CardHeader>
          <CardTitle>Documentos Públicos</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-blue-500" />
              <a href="#" className="text-blue-500 hover:underline">Contrato de Gestão 2024</a>
            </li>
            <li className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-blue-500" />
              <a href="#" className="text-blue-500 hover:underline">Relatório de Atividades Q1 2024</a>
            </li>
            <li className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-blue-500" />
              <a href="#" className="text-blue-500 hover:underline">Balanço Financeiro 2023</a>
            </li>
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Checklist de Conformidade</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>Publicação de relatórios financeiros trimestrais.</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>Divulgação de salários de diretores.</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default OSSTransparenciaPage;
