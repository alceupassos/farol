// Script para criar usuário guest
// Execute este script uma vez para criar o usuário de demonstração

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://droygvpcwkrdzfdtxqsq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRyb3lndnBjd2tyZHpmZHR4cXNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY5OTI0MzgsImV4cCI6MjA3MjU2ODQzOH0.wCKXYKMbwEgFLaLWNSqitvmteK85HG5yTMAsuHouVfk';

const supabase = createClient(supabaseUrl, supabaseKey);

async function createGuestUser() {
  try {
    console.log('Criando usuário guest...');
    
    const { data, error } = await supabase.auth.signUp({
      email: 'guest@saudepublica.ai',
      password: '1234',
      options: {
        data: {
          role: 'paciente',
          full_name: 'Usuário Demonstração'
        }
      }
    });

    if (error) {
      if (error.message.includes('already registered')) {
        console.log('Usuário guest já existe!');
        return { success: true, message: 'Usuário já existe' };
      }
      throw error;
    }

    console.log('Usuário guest criado com sucesso:', data.user?.email);

    // Criar perfil
    if (data.user) {
      await supabase.from('profiles').insert({
        user_id: data.user.id,
        full_name: 'Usuário Demonstração',
        municipality: 'Demonstração'
      });

      await supabase.from('user_roles').insert({
        user_id: data.user.id,
        role: 'paciente'
      });
      
      console.log('Perfil e role criados com sucesso!');
    }

    return { success: true, data };
  } catch (error) {
    console.error('Erro ao criar usuário guest:', error);
    return { success: false, error };
  }
}

// Execute o script
createGuestUser().then(result => {
  if (result.success) {
    console.log('✅ Usuário guest configurado com sucesso!');
  } else {
    console.error('❌ Falha ao criar usuário guest:', result.error);
  }
  process.exit(0);
});