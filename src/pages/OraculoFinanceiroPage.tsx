/**
 * Página do Oráculo Financeiro
 * Assistente IA especializado em análise financeira hospitalar
 */

import OraculoFinanceiro from '@/components/oracle/OraculoFinanceiro';

const OraculoFinanceiroPage = () => {
  return (
    <div className="p-6 h-full">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Oráculo Financeiro</h1>
        <p className="text-muted-foreground">
          Assistente inteligente com IA para análise financeira e tomada de decisões estratégicas
        </p>
      </div>
      
      <div className="h-[calc(100vh-200px)]">
        <OraculoFinanceiro />
      </div>
    </div>
  );
};

export default OraculoFinanceiroPage;
