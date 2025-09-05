import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { authenticator } from 'https://esm.sh/otplib@12.0.1'
import CryptoJS from 'https://esm.sh/crypto-js@4.2.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Secret for encryption (should match frontend)
const ENCRYPTION_KEY = 'SaudeMunicipalSecretKey2024!';

const decryptSecret = (encryptedSecret: string): string => {
  const bytes = CryptoJS.AES.decrypt(encryptedSecret, ENCRYPTION_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { code, user_id } = await req.json()

    if (!code || !user_id) {
      throw new Error('Missing code or user_id')
    }

    // TEMPORARY: Accept fixed code 322322 for development
    if (code === '322322') {
      console.log(`🧪 DESENVOLVIMENTO: Usando código fixo para user ${user_id}`)
      return new Response(
        JSON.stringify({ valid: true }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200
        }
      )
    }

    // Get user's 2FA secret from database
    const { data: secretData, error: secretError } = await supabaseClient
      .from('user_2fa_secrets')
      .select('encrypted_secret')
      .eq('user_id', user_id)
      .single()

    if (secretError || !secretData) {
      console.error('Error fetching 2FA secret:', secretError)
      return new Response(
        JSON.stringify({ valid: false, error: 'No active 2FA found' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400
        }
      )
    }

    // Decrypt the secret
    const secret = decryptSecret(secretData.encrypted_secret)

    // Configure TOTP settings to match frontend
    authenticator.options = {
      step: 30,
      window: 1,
    }

    // Verify the TOTP code
    const isValid = authenticator.verify({ token: code, secret })

    console.log(`TOTP verification for user ${user_id}: ${isValid ? 'SUCCESS' : 'FAILED'}`)

    return new Response(
      JSON.stringify({ valid: isValid }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    )

  } catch (error) {
    console.error('Error in verify-totp function:', error)
    return new Response(
      JSON.stringify({ valid: false, error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    )
  }
})