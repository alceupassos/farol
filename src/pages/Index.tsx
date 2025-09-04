
import React from 'react';
import PublicHealthLanding from '@/components/landing/PublicHealthLanding';

const Index = () => {
  return (
    <React.Suspense fallback={<div className="flex items-center justify-center min-h-screen">Carregando...</div>}>
      <PublicHealthLanding />
    </React.Suspense>
  );
};

export default Index;
