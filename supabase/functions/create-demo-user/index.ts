import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Create demo user
    const { data: authData, error: authError } = await supabaseClient.auth.admin.createUser({
      email: 'demo@angrasaude.com.br',
      password: '123456',
      email_confirm: true,
      user_metadata: {
        full_name: 'Usuário Demo'
      }
    })

    if (authError) {
      console.error('Auth error:', authError)
      return new Response(
        JSON.stringify({ error: authError.message }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    const userId = authData.user.id

    // Create profile
    const { error: profileError } = await supabaseClient
      .from('profiles')
      .upsert({
        user_id: userId,
        full_name: 'Usuário Demo',
        municipality: 'Angra dos Reis'
      })

    if (profileError) {
      console.error('Profile error:', profileError)
    }

    // Create role
    const { error: roleError } = await supabaseClient
      .from('user_roles')
      .upsert({
        user_id: userId,
        role: 'gestor'
      })

    if (roleError) {
      console.error('Role error:', roleError)
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Demo user created successfully',
        user_id: userId 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})