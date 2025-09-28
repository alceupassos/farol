import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheck } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const OSSLgpdPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Conformidade LGPD</h1>
      <Card>
        <CardHeader>
          <CardTitle>Status de Adequação</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <ShieldCheck className="h-10 w-10 text-green-500" />
            <div>
              <p className="text-lg font-semibold">95% Adequado</p>
              <Progress value={95} className="w-full" />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Checklist de Ações</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-center space-x-2">
              <ShieldCheck className="h-5 w-5 text-green-500" />
              <span>Mapeamento de dados realizado.</span>
            </li>
            <li className="flex items-center space-x-2">
              <ShieldCheck className="h-5 w-5 text-green-500" />
              <span>DPO (Data Protection Officer) nomeado.</span>
            </li>
            <li className="flex items-center space-x-2">
              <ShieldCheck className="h-5 w-5 text-yellow-500" />
              <span>Revisão de contratos com fornecedores em andamento.</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default OSSLgpdPage;
