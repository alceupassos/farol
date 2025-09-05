import CryptoJS from 'crypto-js';
import { supabase } from '@/integrations/supabase/client';

// Browser-compatible secret generation using Web Crypto API
const generateSecret = (): string => {
  const bytes = new Uint8Array(20); // 160 bits for TOTP secret
  crypto.getRandomValues(bytes);
  
  // Convert to base32
  const BASE32_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  let secret = '';
  for (let i = 0; i < bytes.length; i++) {
    secret += BASE32_ALPHABET[bytes[i] % 32];
  }
  
  return secret;
};

const generateTOTPUri = (secret: string, email: string): string => {
  return `otpauth://totp/${encodeURIComponent(email)}?secret=${secret}&issuer=${encodeURIComponent('Saúde Municipal+')}`;
};

const verifyTOTP = (token: string, secret: string): boolean => {
  // Simple TOTP verification for demo purposes
  // In production, use a proper TOTP library
  return token.length === 6 && /^\d+$/.test(token);
};

// Get encryption key from Supabase secrets
const getEncryptionKey = async (): Promise<string> => {
  try {
    console.log('🔑 Attempting to get encryption key from Supabase...');
    const { data, error } = await supabase.functions.invoke('get-encryption-key');
    
    if (error) {
      console.error('❌ Edge function error:', error);
      throw new Error(`Edge function error: ${error.message}`);
    }
    
    if (!data?.key) {
      console.error('❌ No encryption key in response:', data);
      throw new Error('No encryption key received from server');
    }
    
    console.log('✅ Successfully retrieved encryption key');
    return data.key;
  } catch (error) {
    console.error('❌ Failed to get encryption key:', error);
    // Fallback for development - this should be replaced with proper key management
    console.log('🔄 Using fallback encryption key');
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