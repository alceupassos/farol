import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useSecureTOTP } from '@/contexts/SecureTOTPContext';
import { secureStorage, logSecurityEvent } from '@/utils/securityUtils';

export const use2FA = () => {
  const { user } = useAuth();
  const { is2FAEnabled, verify2FACode, generate2FASetup, activate2FA, disable2FA, loading } = useSecureTOTP();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    if (user) {
      checkVerificationStatus();
    } else {
      setIsVerified(false);
    }
  }, [user, is2FAEnabled]);

  const checkVerificationStatus = () => {
    const sessionData = secureStorage.get('2fa_session');
    if (sessionData && sessionData.expiry && Date.now() < sessionData.expiry) {
      setIsVerified(true);
    } else {
      setIsVerified(false);
      secureStorage.remove('2fa_session');
    }
  };

  const setup2FA = async () => {
    try {
      const result = await generate2FASetup();
      if (result) {
        logSecurityEvent('2fa_setup_initiated');
      }
      return result;
    } catch (error) {
      console.error('Error in setup2FA:', error);
      logSecurityEvent('2fa_setup_failed', { error: (error as Error).message });
      return null;
    }
  };

  const verify2FACodeLocal = async (code: string) => {
    try {
      const isValid = await verify2FACode(code);
      if (isValid) {
        logSecurityEvent('2fa_verification_success');
      } else {
        logSecurityEvent('2fa_verification_failed', { code_length: code.length });
      }
      return isValid;
    } catch (error) {
      console.error('Error in verify2FACode:', error);
      logSecurityEvent('2fa_verification_error', { error: (error as Error).message });
      return false;
    }
  };

  const activate2FALocal = async () => {
    try {
      const success = await activate2FA();
      if (success) {
        logSecurityEvent('2fa_activated');
      }
      return success;
    } catch (error) {
      console.error('Error in activate2FA:', error);
      logSecurityEvent('2fa_activation_failed', { error: (error as Error).message });
      return false;
    }
  };

  const markAsVerified = () => {
    const expiry = Date.now() + (30 * 60 * 1000); // 30 minutes
    secureStorage.set('2fa_session', { expiry, timestamp: Date.now() });
    setIsVerified(true);
    logSecurityEvent('2fa_session_verified');
  };

  const clearVerification = () => {
    secureStorage.remove('2fa_session');
    setIsVerified(false);
    logSecurityEvent('2fa_session_cleared');
  };

  // Legacy compatibility
  const has2FA = is2FAEnabled;
  const is2FAVerified = isVerified;
  
  const check2FAStatus = async () => {
    // This is now handled by SecureTOTPProvider
    return is2FAEnabled;
  };

  const checkSessionVerification = () => {
    checkVerificationStatus();
    return isVerified;
  };

  return {
    is2FAEnabled,
    isVerified,
    loading,
    setup2FA,
    verify2FACode: verify2FACodeLocal,
    activate2FA: activate2FALocal,
    markAsVerified,
    clearVerification,
    disable2FA,
    // Legacy compatibility
    has2FA,
    is2FAVerified,
    check2FAStatus,
    checkSessionVerification
  };
};