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

      // Check if admin exists
      const { data: adminUser, error: adminError } = await supabaseClient
        .from('admin_users')
        .select('*')
        .eq('email', email.toLowerCase())
        .single()

      if (adminError || !adminUser) {
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

      // Verify password
      const hashedPassword = hashPassword(password, adminUser.salt);
      if (hashedPassword !== adminUser.password_hash) {
        // Increment failed attempts
        const failedAttempts = (adminUser.failed_login_attempts || 0) + 1;
        const lockUntil = failedAttempts >= 5 ? new Date(Date.now() + 15 * 60 * 1000) : null; // 15 minutes lock

        await supabaseClient
          .from('admin_users')
          .update({ 
            failed_login_attempts: failedAttempts,
            locked_until: lockUntil?.toISOString()
          })
          .eq('id', adminUser.id)

        return new Response(
          JSON.stringify({ success: false, error: 'Invalid credentials' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
        )
      }

      // Reset failed attempts on successful login
      await supabaseClient
        .from('admin_users')
        .update({ 
          failed_login_attempts: 0,
          locked_until: null,
          last_login_at: new Date().toISOString()
        })
        .eq('id', adminUser.id)

      // Create session
      const sessionTokenValue = generateSessionToken();
      const clientInfo = req.headers.get('user-agent') || 'Unknown';
      const clientIP = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'Unknown';

      const { error: sessionError } = await supabaseClient
        .from('admin_sessions')
        .insert({
          admin_user_id: adminUser.id,
          session_token: sessionTokenValue,
          ip_address: clientIP,
          user_agent: clientInfo
        })

      if (sessionError) {
        console.error('Failed to create session:', sessionError)
        return new Response(
          JSON.stringify({ success: false, error: 'Failed to create session' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
        )
      }

      return new Response(
        JSON.stringify({ 
          success: true, 
          sessionToken: sessionTokenValue,
          adminUser: {
            id: adminUser.id,
            email: adminUser.email
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

      // Verify session
      const { data: session, error: sessionError } = await supabaseClient
        .from('admin_sessions')
        .select(`
          *,
          admin_users (
            id,
            email
          )
        `)
        .eq('session_token', sessionToken)
        .gte('expires_at', new Date().toISOString())
        .single()

      if (sessionError || !session) {
        return new Response(
          JSON.stringify({ success: false, error: 'Invalid or expired session' }),
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