import { authenticator } from 'otplib';
import CryptoJS from 'crypto-js';

// Configure TOTP settings
authenticator.options = {
  step: 30, // 30 seconds window
  window: 1, // Allow 1 step tolerance
};

// Secret for encryption (in production, this should be from environment)
const ENCRYPTION_KEY = 'SaudeMunicipalSecretKey2024!';

export const generateSecret = (): string => {
  return authenticator.generateSecret();
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
  for (let i = 0; i < 10; i++) {
    // Generate 8-character backup codes
    const code = Math.random().toString(36).substring(2, 10).toUpperCase();
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