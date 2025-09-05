import { authenticator } from 'otplib';
import CryptoJS from 'crypto-js';

// Configure TOTP settings
authenticator.options = {
  step: 30, // 30 seconds window
  window: 1, // Allow 1 step tolerance
};

// Secret for encryption (in production, this should be from environment)
const ENCRYPTION_KEY = 'SaudeMunicipalSecretKey2024!';

// Base32 alphabet for secret generation
const BASE32_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

// Browser-compatible secret generation using Web Crypto API
export const generateSecret = (): string => {
  const bytes = new Uint8Array(20); // 160 bits for TOTP secret
  crypto.getRandomValues(bytes);
  
  // Convert to base32
  let secret = '';
  for (let i = 0; i < bytes.length; i++) {
    secret += BASE32_ALPHABET[bytes[i] % 32];
  }
  
  return secret;
};

export const generateTOTPUri = (secret: string, email: string): string => {
  return authenticator.keyuri(email, 'Saúde Municipal+', secret);
};

export const verifyTOTP = (token: string, secret: string): boolean => {
  return authenticator.verify({ token, secret });
};

export const encryptSecret = (secret: string): string => {
  return CryptoJS.AES.encrypt(secret, ENCRYPTION_KEY).toString();
};

export const decryptSecret = (encryptedSecret: string): string => {
  const bytes = CryptoJS.AES.decrypt(encryptedSecret, ENCRYPTION_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};

export const generateBackupCodes = (): string[] => {
  const codes: string[] = [];
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  
  for (let i = 0; i < 10; i++) {
    // Generate 8-character backup codes using Web Crypto API
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

export const encryptBackupCodes = (codes: string[]): string[] => {
  return codes.map(code => CryptoJS.AES.encrypt(code, ENCRYPTION_KEY).toString());
};

export const decryptBackupCodes = (encryptedCodes: string[]): string[] => {
  return encryptedCodes.map(encryptedCode => {
    const bytes = CryptoJS.AES.decrypt(encryptedCode, ENCRYPTION_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  });
};