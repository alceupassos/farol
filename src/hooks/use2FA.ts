import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { generateSecret, encryptSecret, generateBackupCodes, encryptBackupCodes } from '@/utils/totp';

interface User2FASecret {
  id: string;
  user_id: string;
  encrypted_secret: string;
  backup_codes: string[] | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const use2FA = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [has2FA, setHas2FA] = useState(false);
  const [is2FAVerified, setIs2FAVerified] = useState(false);

  useEffect(() => {
    if (user) {
      check2FAStatus();
    }
  }, [user]);

  const check2FAStatus = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_2fa_secrets')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
        console.error('Error checking 2FA status:', error);
        return;
      }

      setHas2FA(!!data);
    } catch (error) {
      console.error('Error checking 2FA status:', error);
    }
  };

  const setup2FA = async () => {
    if (!user) {
      console.error('2FA Setup Error: No user authenticated');
      throw new Error('No user authenticated');
    }

    console.log('Starting 2FA setup for user:', user.id);
    setLoading(true);
    
    try {
      // Generate and encrypt secrets
      console.log('Generating 2FA secret...');
      const secret = generateSecret();
      const encryptedSecret = encryptSecret(secret);
      const backupCodes = generateBackupCodes();
      const encryptedBackupCodes = encryptBackupCodes(backupCodes);
      
      console.log('Secrets generated successfully');

      // First, remove any existing 2FA setup for this user
      console.log('Removing existing 2FA setup...');
      const { error: deleteError } = await supabase
        .from('user_2fa_secrets')
        .delete()
        .eq('user_id', user.id);

      if (deleteError) {
        console.error('Error deleting existing 2FA:', deleteError);
      }

      // Insert new 2FA setup
      console.log('Inserting new 2FA setup...');
      const { error: insertError, data } = await supabase
        .from('user_2fa_secrets')
        .insert({
          user_id: user.id,
          encrypted_secret: encryptedSecret,
          backup_codes: encryptedBackupCodes,
          is_active: false, // Will be activated after verification
        })
        .select();

      if (insertError) {
        console.error('Error inserting 2FA setup:', insertError);
        throw insertError;
      }

      console.log('2FA setup completed successfully:', data);
      return { secret, backupCodes };
    } catch (error) {
      console.error('Error setting up 2FA:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const activate2FA = async () => {
    if (!user) throw new Error('No user authenticated');

    try {
      const { error } = await supabase
        .from('user_2fa_secrets')
        .update({ is_active: true })
        .eq('user_id', user.id);

      if (error) throw error;

      setHas2FA(true);
    } catch (error) {
      console.error('Error activating 2FA:', error);
      throw error;
    }
  };

  const verify2FACode = async (code: string): Promise<boolean> => {
    if (!user) return false;

    console.log('🔐 Verificando código 2FA:', { userId: user.id, code: code.substring(0, 2) + '****' });

    try {
      // Try edge function first
      const { data, error } = await supabase.functions.invoke('verify-totp', {
        body: { code, user_id: user.id }
      });

      console.log('🌐 Resposta da Edge Function:', { data, error });

      if (!error && data?.valid === true) {
        console.log('✅ Verificação via Edge Function bem-sucedida');
        setIs2FAVerified(true);
        sessionStorage.setItem('2fa_verified', 'true');
        return true;
      }

      // Fallback to local verification
      console.log('🔄 Tentando verificação local...');
      
      const { data: secretData, error: secretError } = await supabase
        .from('user_2fa_secrets')
        .select('encrypted_secret')
        .eq('user_id', user.id)
        .single();

      if (secretError || !secretData) {
        console.error('❌ Erro ao buscar segredo 2FA:', secretError);
        return false;
      }

      console.log('🔑 Segredo 2FA encontrado, verificando localmente...');

      const { decryptSecret, verifyTOTP } = await import('@/utils/totp');
      const secret = decryptSecret(secretData.encrypted_secret);
      const isValid = verifyTOTP(code, secret);

      console.log('🎯 Resultado da verificação local:', isValid);

      if (isValid) {
        setIs2FAVerified(true);
        sessionStorage.setItem('2fa_verified', 'true');
      }

      return isValid;
    } catch (error) {
      console.error('❌ Erro na verificação 2FA:', error);
      return false;
    }
  };

  const disable2FA = async () => {
    if (!user) throw new Error('No user authenticated');

    try {
      const { error } = await supabase
        .from('user_2fa_secrets')
        .delete()
        .eq('user_id', user.id);

      if (error) throw error;

      setHas2FA(false);
      setIs2FAVerified(false);
      sessionStorage.removeItem('2fa_verified');
    } catch (error) {
      console.error('Error disabling 2FA:', error);
      throw error;
    }
  };

  const checkSessionVerification = () => {
    const verified = sessionStorage.getItem('2fa_verified') === 'true';
    setIs2FAVerified(verified);
    return verified;
  };

  return {
    loading,
    has2FA,
    is2FAVerified,
    setup2FA,
    activate2FA,
    verify2FACode,
    disable2FA,
    check2FAStatus,
    checkSessionVerification,
  };
};