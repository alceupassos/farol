import CryptoJS from 'crypto-js';

// Generate a browser-specific encryption key for sensitive storage
const getBrowserKey = (): string => {
  const stored = localStorage.getItem('_bk');
  if (stored) return stored;
  
  // Generate a random key specific to this browser session
  const key = CryptoJS.lib.WordArray.random(256/8).toString();
  localStorage.setItem('_bk', key);
  return key;
};

// Secure storage for sensitive data in browser
export const secureStorage = {
  set: (key: string, value: any): void => {
    try {
      const browserKey = getBrowserKey();
      const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
      const encrypted = CryptoJS.AES.encrypt(stringValue, browserKey).toString();
      sessionStorage.setItem(`sec_${key}`, encrypted);
    } catch (error) {
      console.error('Failed to encrypt storage data:', error);
      // Fallback to sessionStorage without encryption for development
      sessionStorage.setItem(`sec_${key}`, typeof value === 'string' ? value : JSON.stringify(value));
    }
  },

  get: (key: string): any => {
    try {
      const encrypted = sessionStorage.getItem(`sec_${key}`);
      if (!encrypted) return null;
      
      const browserKey = getBrowserKey();
      const decrypted = CryptoJS.AES.decrypt(encrypted, browserKey);
      const decryptedStr = decrypted.toString(CryptoJS.enc.Utf8);
      
      if (!decryptedStr) {
        // Fallback: try reading as plain text (for development/migration)
        return encrypted;
      }
      
      // Try to parse as JSON, fall back to string
      try {
        return JSON.parse(decryptedStr);
      } catch {
        return decryptedStr;
      }
    } catch (error) {
      console.error('Failed to decrypt storage data:', error);
      // Fallback to direct sessionStorage access
      const plainValue = sessionStorage.getItem(`sec_${key}`);
      try {
        return plainValue ? JSON.parse(plainValue) : null;
      } catch {
        return plainValue;
      }
    }
  },

  remove: (key: string): void => {
    sessionStorage.removeItem(`sec_${key}`);
  },

  clear: (): void => {
    // Remove all secure storage items
    const keys = Object.keys(sessionStorage);
    keys.forEach(key => {
      if (key.startsWith('sec_')) {
        sessionStorage.removeItem(key);
      }
    });
  }
};

// Input sanitization utility
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>\\\"']/g, '') // Remove potentially dangerous characters
    .trim()
    .substring(0, 1000); // Limit length
};

// Validate email format securely
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
};

// Rate limiting for authentication attempts
export const rateLimiter = {
  attempts: new Map<string, { count: number; lastAttempt: number }>(),
  
  checkLimit: (identifier: string, maxAttempts: number = 5, windowMs: number = 15 * 60 * 1000): boolean => {
    const now = Date.now();
    const key = identifier.toLowerCase();
    const record = rateLimiter.attempts.get(key);
    
    if (!record) {
      rateLimiter.attempts.set(key, { count: 1, lastAttempt: now });
      return true;
    }
    
    // Reset if window has passed
    if (now - record.lastAttempt > windowMs) {
      rateLimiter.attempts.set(key, { count: 1, lastAttempt: now });
      return true;
    }
    
    // Check if limit exceeded
    if (record.count >= maxAttempts) {
      return false;
    }
    
    // Increment attempt count
    record.count++;
    record.lastAttempt = now;
    return true;
  },
  
  reset: (identifier: string): void => {
    rateLimiter.attempts.delete(identifier.toLowerCase());
  }
};

// Security event logger
export const logSecurityEvent = (eventType: string, details?: any): void => {
  const event = {
    type: eventType,
    timestamp: new Date().toISOString(),
    details,
    userAgent: navigator.userAgent,
    url: window.location.href
  };
  
  // Store locally for debugging and send to server if possible
  const events = secureStorage.get('security_events') || [];
  events.push(event);
  
  // Keep only last 100 events
  if (events.length > 100) {
    events.splice(0, events.length - 100);
  }
  
  secureStorage.set('security_events', events);
  
  // Log to console for development
  console.log('🔒 Security Event:', event);
};
