import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { code, ip_address, user_agent } = await req.json()

    if (!code) {
      throw new Error('Missing code')
    }

    console.log(`🔐 Site access attempt with code: ${code.substring(0, 2)}****`);

    // TEMPORARY: Accept fixed code 322322 for development
    if (code === '322322') {
      console.log('🧪 SITE ACCESS: Using fixed development code');
      
      // Log the access attempt
      await supabaseClient.from('site_access_logs').insert({
        success: true,
        ip_address,
        user_agent,
        attempted_at: new Date().toISOString()
      });

      return new Response(
        JSON.stringify({ valid: true, session_token: 'dev_token_322322' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200
        }
      )
    }

    // Get all active site access codes
    const { data: accessCodes, error: codesError } = await supabaseClient
      .from('site_access_codes')
      .select('*')
      .eq('is_active', true);

    if (codesError || !accessCodes) {
      console.error('Error fetching site access codes:', codesError);
      
      // Log failed attempt
      await supabaseClient.from('site_access_logs').insert({
        success: false,
        ip_address,
        user_agent,
        attempted_at: new Date().toISOString()
      });

      return new Response(
        JSON.stringify({ valid: false, error: 'No active access codes found' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400
        }
      )
    }

    // Try to verify against any active code
    for (const accessCode of accessCodes) {
      // Here we would decrypt and verify the TOTP code
      // For now, we'll accept any 6-digit code as valid for active codes
      if (code.length === 6 && /^\d{6}$/.test(code)) {
        console.log(`✅ Site access granted for code: ${accessCode.code_name}`);
        
        // Log successful access
        await supabaseClient.from('site_access_logs').insert({
          code_used: accessCode.id,
          success: true,
          ip_address,
          user_agent,
          attempted_at: new Date().toISOString()
        });

        // Update last used time
        await supabaseClient
          .from('site_access_codes')
          .update({ last_used_at: new Date().toISOString() })
          .eq('id', accessCode.id);

        // Generate session token (simplified for now)
        const sessionToken = `site_token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        return new Response(
          JSON.stringify({ valid: true, session_token: sessionToken }),
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200
          }
        )
      }
    }

    console.log(`❌ Site access denied for code: ${code.substring(0, 2)}****`);
    
    // Log failed attempt
    await supabaseClient.from('site_access_logs').insert({
      success: false,
      ip_address,
      user_agent,
      attempted_at: new Date().toISOString()
    });

    return new Response(
      JSON.stringify({ valid: false, error: 'Invalid access code' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400
      }
    )

  } catch (error) {
    console.error('Error in site-auth function:', error);
    return new Response(
      JSON.stringify({ valid: false, error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    )
  }
})