import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import CryptoJS from 'https://esm.sh/crypto-js@4.2.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Generate secure salt for password hashing
const generateSalt = (): string => {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('');
};

// Hash password with salt using PBKDF2
const hashPassword = (password: string, salt: string): string => {
  return CryptoJS.PBKDF2(password, salt, {
    keySize: 256/32,
    iterations: 100000
  }).toString();
};

// Generate secure session token
const generateSessionToken = (): string => {
  const bytes = new Uint8Array(64);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('');
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { action, email, password, sessionToken } = await req.json()

    if (action === 'login') {
      if (!email || !password) {
        return new Response(
          JSON.stringify({ success: false, error: 'Email and password required' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
        )
      }

      // Get admin user securely to check salt
      const { data: adminUser, error: adminError } = await supabaseClient
        .from('admin_users')
        .select('id, email, salt, failed_login_attempts, locked_until')
        .eq('email', email.toLowerCase())
        .maybeSingle()

      if (adminError || !adminUser) {
        console.error('Admin lookup error:', adminError)
        return new Response(
          JSON.stringify({ success: false, error: 'Invalid credentials' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
        )
      }

      // Check if account is locked
      if (adminUser.locked_until && new Date(adminUser.locked_until) > new Date()) {
        return new Response(
          JSON.stringify({ success: false, error: 'Account temporarily locked due to failed login attempts' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 423 }
        )
      }

      // Hash the provided password with the stored salt
      const hashedPassword = hashPassword(password, adminUser.salt);

      // Use the secure authenticate_admin function
      const { data: authResult, error: authError } = await supabaseClient
        .rpc('authenticate_admin', {
          p_email: email.toLowerCase(),
          p_password_hash: hashedPassword
        })

      if (authError || !authResult || authResult.length === 0) {
        console.error('Authentication error:', authError)
        return new Response(
          JSON.stringify({ success: false, error: 'Invalid credentials' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
        )
      }

      const { admin_id, session_token, expires_at } = authResult[0];

      // Update session with client info
      const clientInfo = req.headers.get('user-agent') || 'Unknown';
      const clientIP = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'Unknown';

      const { error: sessionUpdateError } = await supabaseClient
        .from('admin_sessions')
        .update({
          ip_address: clientIP,
          user_agent: clientInfo
        })
        .eq('session_token', session_token)

      if (sessionUpdateError) {
        console.error('Failed to update session info:', sessionUpdateError)
      }

      return new Response(
        JSON.stringify({ 
          success: true, 
          sessionToken: session_token,
          adminUser: {
            id: admin_id,
            email: email.toLowerCase()
          }
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (action === 'verify') {
      if (!sessionToken) {
        return new Response(
          JSON.stringify({ success: false, error: 'Session token required' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
        )
      }

      // Use the secure validate_admin_session function
      const { data: isValid, error: validationError } = await supabaseClient
        .rpc('validate_admin_session', {
          session_token: sessionToken
        })

      if (validationError || !isValid) {
        return new Response(
          JSON.stringify({ success: false, error: 'Invalid or expired session' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
        )
      }

      // Get admin user info from session (still need basic info for UI)
      const { data: session, error: sessionError } = await supabaseClient
        .from('admin_sessions')
        .select(`
          admin_user_id,
          admin_users!inner (
            id,
            email
          )
        `)
        .eq('session_token', sessionToken)
        .gte('expires_at', new Date().toISOString())
        .maybeSingle()

      if (sessionError || !session) {
        return new Response(
          JSON.stringify({ success: false, error: 'Session not found' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
        )
      }

      return new Response(
        JSON.stringify({ 
          success: true, 
          adminUser: session.admin_users
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (action === 'logout') {
      if (sessionToken) {
        // Delete session
        await supabaseClient
          .from('admin_sessions')
          .delete()
          .eq('session_token', sessionToken)
      }

      return new Response(
        JSON.stringify({ success: true }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({ success: false, error: 'Invalid action' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    )

  } catch (error) {
    console.error('Error in admin-auth function:', error)
    return new Response(
      JSON.stringify({ success: false, error: 'Internal server error' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})