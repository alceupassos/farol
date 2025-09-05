import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { authenticator } from 'https://esm.sh/otplib@12.0.1'
import CryptoJS from 'https://esm.sh/crypto-js@4.2.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Configure TOTP settings
authenticator.options = {
  step: 30,
  window: 1,
};

// Get encryption key from secure environment
const getEncryptionKey = (): string => {
  const key = Deno.env.get('TOTP_ENCRYPTION_KEY');
  if (!key) {
    throw new Error('TOTP encryption key not configured');
  }
  return key;
};

// Browser-compatible secret generation
const generateSecret = (): string => {
  const BASE32_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  
  let secret = '';
  for (let i = 0; i < bytes.length; i++) {
    secret += BASE32_ALPHABET[bytes[i] % 32];
  }
  
  return secret;
};

const encryptSecret = (secret: string): string => {
  const key = getEncryptionKey();
  return CryptoJS.AES.encrypt(secret, key).toString();
};

const decryptSecret = (encryptedSecret: string): string => {
  const key = getEncryptionKey();
  const bytes = CryptoJS.AES.decrypt(encryptedSecret, key);
  return bytes.toString(CryptoJS.enc.Utf8);
};

const generateBackupCodes = (): string[] => {
  const codes: string[] = [];
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  
  for (let i = 0; i < 10; i++) {
    const bytes = new Uint8Array(8);
    crypto.getRandomValues(bytes);
    
    let code = '';
    for (let j = 0; j < 8; j++) {
      code += chars[bytes[j] % chars.length];
    }
    codes.push(code);
  }
  return codes;
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get the JWT token from the request
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Missing authorization header' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
      );
    }

    // Verify the JWT token
    const { data: { user }, error: authError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Invalid authorization token' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
      );
    }

    const { action, code, secret } = await req.json();

    switch (action) {
      case 'generate': {
        // Generate new 2FA setup
        const newSecret = generateSecret();
        const encryptedSecret = encryptSecret(newSecret);
        const backupCodes = generateBackupCodes();
        const encryptedBackupCodes = backupCodes.map(code => encryptSecret(code));
        const uri = authenticator.keyuri(user.email || '', 'Saúde Municipal+', newSecret);

        // Store encrypted secret in database
        const { error: insertError } = await supabase
          .from('user_2fa_secrets')
          .upsert({
            user_id: user.id,
            encrypted_secret: encryptedSecret,
            backup_codes: encryptedBackupCodes,
            is_active: false
          });

        if (insertError) {
          console.error('Error storing 2FA secret:', insertError);
          return new Response(
            JSON.stringify({ error: 'Failed to store 2FA secret' }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
          );
        }

        return new Response(
          JSON.stringify({ 
            secret: newSecret, 
            backupCodes,
            uri 
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'verify': {
        if (!code) {
          return new Response(
            JSON.stringify({ error: 'Code is required' }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
          );
        }

        // Get user's encrypted secret
        const { data: secretData, error: secretError } = await supabase
          .from('user_2fa_secrets')
          .select('encrypted_secret, backup_codes')
          .eq('user_id', user.id)
          .single();

        if (secretError || !secretData) {
          return new Response(
            JSON.stringify({ error: '2FA not set up for this user' }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 404 }
          );
        }

        try {
          const decryptedSecret = decryptSecret(secretData.encrypted_secret);
          const isValid = authenticator.verify({ token: code, secret: decryptedSecret });

          // Check backup codes if TOTP fails
          let usedBackupCode = false;
          if (!isValid && secretData.backup_codes) {
            const decryptedBackupCodes = secretData.backup_codes.map((encCode: string) => 
              decryptSecret(encCode)
            );
            
            const backupIndex = decryptedBackupCodes.indexOf(code);
            if (backupIndex !== -1) {
              // Remove used backup code
              const updatedBackupCodes = [...secretData.backup_codes];
              updatedBackupCodes.splice(backupIndex, 1);
              
              await supabase
                .from('user_2fa_secrets')
                .update({ backup_codes: updatedBackupCodes })
                .eq('user_id', user.id);
              
              usedBackupCode = true;
            }
          }

          return new Response(
            JSON.stringify({ 
              valid: isValid || usedBackupCode,
              usedBackupCode 
            }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        } catch (decryptError) {
          console.error('Error decrypting 2FA secret:', decryptError);
          return new Response(
            JSON.stringify({ error: 'Failed to verify 2FA code' }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
          );
        }
      }

      case 'activate': {
        // Activate 2FA for user
        const { error: updateError } = await supabase
          .from('user_2fa_secrets')
          .update({ is_active: true })
          .eq('user_id', user.id);

        if (updateError) {
          return new Response(
            JSON.stringify({ error: 'Failed to activate 2FA' }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
          );
        }

        return new Response(
          JSON.stringify({ success: true }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'disable': {
        // Disable 2FA for user
        const { error: deleteError } = await supabase
          .from('user_2fa_secrets')
          .delete()
          .eq('user_id', user.id);

        if (deleteError) {
          return new Response(
            JSON.stringify({ error: 'Failed to disable 2FA' }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
          );
        }

        return new Response(
          JSON.stringify({ success: true }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      default:
        return new Response(
          JSON.stringify({ error: 'Invalid action' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
        );
    }

  } catch (error) {
    console.error('Error in secure-totp function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});