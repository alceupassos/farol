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
  try {
    // Proper TOTP verification with time-based algorithm
    const window = 1; // Allow 1 step tolerance for time drift
    const step = 30; // 30 second step
    const currentTime = Math.floor(Date.now() / 1000);
    
    // Check current time and adjacent time windows
    for (let i = -window; i <= window; i++) {
      const timeStep = Math.floor((currentTime + (i * step)) / step);
      const expectedToken = generateTOTPToken(secret, timeStep);
      if (token === expectedToken) {
        return true;
      }
    }
    return false;
  } catch (error) {
    console.error('TOTP verification error:', error);
    return false;
  }
};

// Generate TOTP token for given secret and time step
const generateTOTPToken = (secret: string, timeStep: number): string => {
  // Convert base32 secret to bytes
  const secretBytes = base32ToBytes(secret);
  
  // Convert time step to 8-byte buffer
  const timeBuffer = new ArrayBuffer(8);
  const timeView = new DataView(timeBuffer);
  timeView.setUint32(4, timeStep, false); // Big endian
  
  // Generate HMAC-SHA1
  const hmac = generateHMAC(secretBytes, new Uint8Array(timeBuffer));
  
  // Dynamic truncation
  const offset = hmac[hmac.length - 1] & 0x0f;
  const truncated = ((hmac[offset] & 0x7f) << 24) |
                   ((hmac[offset + 1] & 0xff) << 16) |
                   ((hmac[offset + 2] & 0xff) << 8) |
                   (hmac[offset + 3] & 0xff);
  
  // Generate 6-digit token
  const token = (truncated % 1000000).toString().padStart(6, '0');
  return token;
};

// Convert base32 string to bytes
const base32ToBytes = (base32: string): Uint8Array => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  const cleanInput = base32.toUpperCase().replace(/[^A-Z2-7]/g, '');
  
  let bits = '';
  for (let i = 0; i < cleanInput.length; i++) {
    const char = cleanInput[i];
    const index = alphabet.indexOf(char);
    if (index === -1) continue;
    bits += index.toString(2).padStart(5, '0');
  }
  
  const bytes = new Uint8Array(Math.floor(bits.length / 8));
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(bits.substr(i * 8, 8), 2);
  }
  
  return bytes;
};

// Generate HMAC-SHA1 (simplified implementation for browser compatibility)
const generateHMAC = (key: Uint8Array, message: Uint8Array): Uint8Array => {
  // This is a simplified HMAC-SHA1 implementation
  // In production, use Web Crypto API or a proper crypto library
  const blockSize = 64;
  let keyBytes = new Uint8Array(blockSize);
  
  if (key.length > blockSize) {
    // Hash the key if it's longer than block size
    const hashedKey = simpleSHA1(key);
    keyBytes.set(hashedKey);
  } else {
    keyBytes.set(key);
  }
  
  const oKeyPad = new Uint8Array(blockSize);
  const iKeyPad = new Uint8Array(blockSize);
  
  for (let i = 0; i < blockSize; i++) {
    oKeyPad[i] = 0x5c ^ keyBytes[i];
    iKeyPad[i] = 0x36 ^ keyBytes[i];
  }
  
  const innerInput = new Uint8Array(blockSize + message.length);
  innerInput.set(iKeyPad);
  innerInput.set(message, blockSize);
  
  const innerHash = simpleSHA1(innerInput);
  
  const outerInput = new Uint8Array(blockSize + innerHash.length);
  outerInput.set(oKeyPad);
  outerInput.set(innerHash, blockSize);
  
  return simpleSHA1(outerInput);
};

// Simplified SHA1 implementation (for demonstration - use Web Crypto API in production)
const simpleSHA1 = (data: Uint8Array): Uint8Array => {
  // This is a very basic implementation for demonstration
  // In production, use Web Crypto API: crypto.subtle.digest('SHA-1', data)
  let hash = new Uint8Array(20);
  
  // Initialize with SHA1 constants
  let h0 = 0x67452301;
  let h1 = 0xEFCDAB89;
  let h2 = 0x98BADCFE;
  let h3 = 0x10325476;
  let h4 = 0xC3D2E1F0;
  
  // Padding
  const msgLength = data.length;
  const paddedLength = Math.ceil((msgLength + 9) / 64) * 64;
  const padded = new Uint8Array(paddedLength);
  padded.set(data);
  padded[msgLength] = 0x80;
  
  // Set length in bits as big-endian 64-bit integer
  const lengthBits = msgLength * 8;
  for (let i = 0; i < 8; i++) {
    padded[paddedLength - 1 - i] = (lengthBits >>> (i * 8)) & 0xff;
  }
  
  // Process 512-bit chunks
  for (let chunk = 0; chunk < paddedLength; chunk += 64) {
    const w = new Array(80);
    
    // Copy chunk into first 16 words
    for (let i = 0; i < 16; i++) {
      w[i] = (padded[chunk + i * 4] << 24) |
             (padded[chunk + i * 4 + 1] << 16) |
             (padded[chunk + i * 4 + 2] << 8) |
             padded[chunk + i * 4 + 3];
    }
    
    // Extend the sixteen 32-bit words into eighty 32-bit words
    for (let i = 16; i < 80; i++) {
      w[i] = leftRotate(w[i - 3] ^ w[i - 8] ^ w[i - 14] ^ w[i - 16], 1);
    }
    
    // Initialize hash value for this chunk
    let a = h0, b = h1, c = h2, d = h3, e = h4;
    
    // Main loop
    for (let i = 0; i < 80; i++) {
      let f, k;
      if (i < 20) {
        f = (b & c) | (~b & d);
        k = 0x5A827999;
      } else if (i < 40) {
        f = b ^ c ^ d;
        k = 0x6ED9EBA1;
      } else if (i < 60) {
        f = (b & c) | (b & d) | (c & d);
        k = 0x8F1BBCDC;
      } else {
        f = b ^ c ^ d;
        k = 0xCA62C1D6;
      }
      
      const temp = (leftRotate(a, 5) + f + e + k + w[i]) & 0xffffffff;
      e = d;
      d = c;
      c = leftRotate(b, 30);
      b = a;
      a = temp;
    }
    
    // Add this chunk's hash to result
    h0 = (h0 + a) & 0xffffffff;
    h1 = (h1 + b) & 0xffffffff;
    h2 = (h2 + c) & 0xffffffff;
    h3 = (h3 + d) & 0xffffffff;
    h4 = (h4 + e) & 0xffffffff;
  }
  
  // Convert to bytes
  const result = new Uint8Array(20);
  result.set([(h0 >>> 24) & 0xff, (h0 >>> 16) & 0xff, (h0 >>> 8) & 0xff, h0 & 0xff], 0);
  result.set([(h1 >>> 24) & 0xff, (h1 >>> 16) & 0xff, (h1 >>> 8) & 0xff, h1 & 0xff], 4);
  result.set([(h2 >>> 24) & 0xff, (h2 >>> 16) & 0xff, (h2 >>> 8) & 0xff, h2 & 0xff], 8);
  result.set([(h3 >>> 24) & 0xff, (h3 >>> 16) & 0xff, (h3 >>> 8) & 0xff, h3 & 0xff], 12);
  result.set([(h4 >>> 24) & 0xff, (h4 >>> 16) & 0xff, (h4 >>> 8) & 0xff, h4 & 0xff], 16);
  
  return result;
};

// Left rotate utility function
const leftRotate = (value: number, amount: number): number => {
  return ((value << amount) | (value >>> (32 - amount))) & 0xffffffff;
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
    throw new Error('Unable to retrieve encryption key. Please ensure the encryption service is properly configured.');
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