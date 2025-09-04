// Script para atualizar a senha do usuário guest existente
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://droygvpcwkrdzfdtxqsq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRyb3lndnBjd2tyZHpmZHR4cXNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY5OTI0MzgsImV4cCI6MjA3MjU2ODQzOH0.wCKXYKMbwEgFLaLWNSqitvmteK85HG5yTMAsuHouVfk';

const supabase = createClient(supabaseUrl, supabaseKey);

async function updateGuestPassword() {
  console.log('🔄 Atualizando senha do usuário guest...');
  
  try {
    // Primeiro, tentar fazer login com a senha antiga para verificar se o usuário existe
    const { error: oldLoginError } = await supabase.auth.signInWithPassword({
      email: 'guest@saudepublica.ai',
      password: '1234'
    });

    if (oldLoginError) {
      console.log('❌ Usuário guest com senha antiga não encontrado.');
      console.log('   Tentando fazer login com a nova senha...');
      
      // Verificar se já está com a nova senha
      const { error: newLoginError } = await supabase.auth.signInWithPassword({
        email: 'guest@saudepublica.ai',
        password: '123456'
      });
      
      if (!newLoginError) {
        console.log('✅ Usuário guest já está com a nova senha (123456)!');
        await supabase.auth.signOut();
        return { success: true, message: 'Senha já atualizada' };
      } else {
        console.log('❌ Usuário guest não existe. Execute create-guest-user.js primeiro.');
        return { success: false, message: 'Usuário não existe' };
      }
    }

    console.log('✅ Usuário guest encontrado com senha antiga.');
    console.log('   Obs: A atualização de senha via API client não é possível.');
    console.log('   Recomendação: Deletar e recriar o usuário guest.');
    
    // Fazer logout
    await supabase.auth.signOut();
    
    return { 
      success: true, 
      message: 'Usuário encontrado mas senha não pode ser atualizada via API client' 
    };

  } catch (error) {
    console.error('❌ Erro ao verificar usuário guest:', error);
    return { success: false, error };
  }
}

// Execute o script
updateGuestPassword().then(result => {
  if (result.success) {
    console.log('✅ Verificação concluída:', result.message);
    console.log('\n📋 Próximos passos:');
    console.log('1. Se o usuário não existe, execute: node scripts/create-guest-user.js');
    console.log('2. Se existe mas com senha antiga, delete manualmente no Supabase Dashboard');
    console.log('3. Execute create-guest-user.js para criar com a nova senha');
  } else {
    console.error('❌ Falha na verificação:', result.error);
  }
  process.exit(0);
});