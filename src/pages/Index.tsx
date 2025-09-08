
import React, { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import PublicHealthLanding from '@/components/landing/PublicHealthLanding';

const Index = () => {
  console.log('🏠 Index component rendering');
  
  useEffect(() => {
    // Create demo user on first load
    const createDemoUser = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('create-demo-user');
        if (error) {
          console.error('Error creating demo user:', error);
        } else {
          console.log('Demo user creation result:', data);
        }
      } catch (err) {
        console.error('Demo user creation failed:', err);
      }
    };
    
    createDemoUser();
  }, []);
  
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
