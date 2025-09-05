import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { secureStorage, logSecurityEvent } from '@/utils/securityUtils';

interface SecureTOTPContextType {
  generate2FASetup: () => Promise<{
    secret: string;
    backupCodes: string[];
    uri: string;
  } | null>;
  verify2FACode: (code: string) => Promise<boolean>;
  activate2FA: () => Promise<boolean>;
  disable2FA: () => Promise<boolean>;
  is2FAEnabled: boolean;
  loading: boolean;
}

const SecureTOTPContext = createContext<SecureTOTPContextType | undefined>(undefined);

export const useSecureTOTP = () => {
  const context = useContext(SecureTOTPContext);
  if (!context) {
    throw new Error('useSecureTOTP must be used within a SecureTOTPProvider');
  }
  return context;
};

export const SecureTOTPProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check 2FA status on mount
  useEffect(() => {
    check2FAStatus();
  }, []);

  const check2FAStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setIs2FAEnabled(false);
        setLoading(false);
        return;
      }

      // Check if user has active 2FA (limited query that only checks existence)
      const { data, error } = await supabase
        .from('user_2fa_secrets')
        .select('is_active')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .single();

      setIs2FAEnabled(!!data && !error);
    } catch (error) {
      console.error('Error checking 2FA status:', error);
      setIs2FAEnabled(false);
    } finally {
      setLoading(false);
    }
  };

  const callSecureTOTP = async (action: string, payload: any = {}) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('No active session');
      }

      const { data, error } = await supabase.functions.invoke('secure-totp', {
        body: { action, ...payload },
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) {
        logSecurityEvent('totp_operation_failed', { action, error: error.message });
        throw error;
      }

      logSecurityEvent('totp_operation_success', { action });
      return data;
    } catch (error) {
      logSecurityEvent('totp_operation_error', { action, error: (error as Error).message });
      throw error;
    }
  };

  const generate2FASetup = async () => {
    try {
      setLoading(true);
      const data = await callSecureTOTP('generate');
      
      // Store setup data securely in browser
      secureStorage.set('2fa_setup', {
        secret: data.secret,
        backupCodes: data.backupCodes,
        timestamp: Date.now()
      });

      return {
        secret: data.secret,
        backupCodes: data.backupCodes,
        uri: data.uri
      };
    } catch (error) {
      console.error('Error generating 2FA setup:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const verify2FACode = async (code: string) => {
    try {
      const data = await callSecureTOTP('verify', { code });
      return data.valid === true;
    } catch (error) {
      console.error('Error verifying 2FA code:', error);
      return false;
    }
  };

  const activate2FA = async () => {
    try {
      setLoading(true);
      await callSecureTOTP('activate');
      
      // Clear setup data after successful activation
      secureStorage.remove('2fa_setup');
      
      setIs2FAEnabled(true);
      return true;
    } catch (error) {
      console.error('Error activating 2FA:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const disable2FA = async () => {
    try {
      setLoading(true);
      await callSecureTOTP('disable');
      
      // Clear any stored 2FA data
      secureStorage.remove('2fa_setup');
      
      setIs2FAEnabled(false);
      return true;
    } catch (error) {
      console.error('Error disabling 2FA:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    generate2FASetup,
    verify2FACode,
    activate2FA,
    disable2FA,
    is2FAEnabled,
    loading
  };

  return (
    <SecureTOTPContext.Provider value={value}>
      {children}
    </SecureTOTPContext.Provider>
  );
};