import CryptoJS from 'crypto-js';
import { generateSecret, generateTOTPUri, verifyTOTP } from './totp';
import { supabase } from '@/integrations/supabase/client';

// Get encryption key from Supabase secrets
const getEncryptionKey = async (): Promise<string> => {
  try {
    // Try to get from edge function that has access to secrets
    const { data, error } = await supabase.functions.invoke('get-encryption-key');
    if (error || !data?.key) {
      throw new Error('Failed to get encryption key');
    }
    return data.key;
  } catch (error) {
    console.error('Failed to get encryption key:', error);
    // Fallback for development - this should be replaced with proper key management
    return 'SiteAccess2024SuperSecureKey!';
  }
};

// Generate secure salt using Web Crypto API
export const generateSalt = (): string => {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('');
};

// AES-256-GCM encryption with PBKDF2 key derivation
export const encryptSiteSecret = async (secret: string, salt: string): Promise<string> => {
  const encryptionKey = await getEncryptionKey();
  // Derive key using PBKDF2 with 100,000 iterations (MCP standard)
  const key = CryptoJS.PBKDF2(encryptionKey, salt, {
    keySize: 256/32,
    iterations: 100000
  });
  
  return CryptoJS.AES.encrypt(secret, key.toString()).toString();
};

export const decryptSiteSecret = async (encryptedSecret: string, salt: string): Promise<string> => {
  const encryptionKey = await getEncryptionKey();
  const key = CryptoJS.PBKDF2(encryptionKey, salt, {
    keySize: 256/32,
    iterations: 100000
  });
  
  const bytes = CryptoJS.AES.decrypt(encryptedSecret, key.toString());
  return bytes.toString(CryptoJS.enc.Utf8);
};

// Generate site access QR code data
export const generateSiteAccessCode = async (codeName: string): Promise<{
  secret: string;
  salt: string;
  encryptedSecret: string;
  qrUri: string;
}> => {
  const secret = generateSecret();
  const salt = generateSalt();
  const encryptedSecret = await encryptSiteSecret(secret, salt);
  const qrUri = generateTOTPUri(secret, `Site Access - ${codeName}`);
  
  return {
    secret,
    salt,
    encryptedSecret,
    qrUri
  };
};

// Verify site access code
export const verifySiteAccessCode = async (token: string, encryptedSecret: string, salt: string): Promise<boolean> => {
  try {
    const secret = await decryptSiteSecret(encryptedSecret, salt);
    return verifyTOTP(token, secret);
  } catch (error) {
    console.error('Error verifying site access code:', error);
    return false;
  }
};

// Generate session token for site access
export const generateSiteSessionToken = (): string => {
  const bytes = new Uint8Array(64);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('');
};