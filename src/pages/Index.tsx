
import React from 'react';
import PublicHealthLanding from '@/components/landing/PublicHealthLanding';

const Index = () => {
  console.log('🏠 Index component rendering');
  
  try {
    return (
      <React.Suspense fallback={<div className="flex items-center justify-center min-h-screen">Carregando...</div>}>
        <PublicHealthLanding />
      </React.Suspense>
    );
  } catch (error) {
    console.error('❌ Error in Index component:', error);
    return <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1>Erro no carregamento da página</h1>
        <p>Verifique o console para mais detalhes</p>
      </div>
    </div>;
  }
};

export default Index;
