import React from 'react';
import { useTranslation } from 'react-i18next';
import { Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface UnderDevelopmentPageProps {
  pageName: string;
}

export default function UnderDevelopmentPage({ pageName }: UnderDevelopmentPageProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
        <div className="bg-blue-100 p-6 rounded-full mb-6">
          <Wrench className="h-12 w-12 text-blue-600" />
        </div>
        <h1 className="text-2xl font-bold mb-4">{pageName}</h1>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Página em Desenvolvimento
        </h2>
        <p className="text-gray-600 mb-6 max-w-md">
          Estamos trabalhando para trazer a melhor experiência para você.
          Esta funcionalidade estará disponível em breve.
        </p>
        <div className="space-x-4">
          <Button onClick={() => navigate(-1)} variant="outline">
            Voltar
          </Button>
          <Button onClick={() => navigate('/')}>
            Página Inicial
          </Button>
        </div>
      </div>
    </div>
  );
}
