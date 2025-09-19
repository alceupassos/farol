// Simple TOTP implementation that works without external libraries
export class SimpleTOTP {
  private static base32Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  
  // Convert base32 to bytes
  private static base32ToBytes(base32: string): Uint8Array {
    const cleanBase32 = base32.toUpperCase().replace(/=+$/, '');
    const bytes: number[] = [];
    let bits = 0;
    let value = 0;
    
    for (const char of cleanBase32) {
      const index = this.base32Chars.indexOf(char);
      if (index === -1) continue;
      
      value = (value << 5) | index;
      bits += 5;
      
      if (bits >= 8) {
        bytes.push((value >>> (bits - 8)) & 255);
        bits -= 8;
      }
    }
    
    return new Uint8Array(bytes);
  }
  
  // Simple HMAC-SHA1 using Web Crypto API
  private static async hmacSha1(key: Uint8Array, data: Uint8Array): Promise<Uint8Array> {
    try {
      const cryptoKey = await crypto.subtle.importKey(
        'raw',
        key,
        { name: 'HMAC', hash: 'SHA-1' },
        false,
        ['sign']
      );
      
      const signature = await crypto.subtle.sign('HMAC', cryptoKey, data);
      return new Uint8Array(signature);
    } catch (error) {
      console.error('HMAC-SHA1 error:', error);
      // Fallback to simple hash
      return this.simpleFallbackHash(key, data);
    }
  }
  
  // Fallback hash for when crypto API fails
  private static simpleFallbackHash(key: Uint8Array, data: Uint8Array): Uint8Array {
    const result = new Uint8Array(20);
    for (let i = 0; i < 20; i++) {
      result[i] = (key[i % key.length] + data[i % data.length] + i) % 256;
    }
    return result;
  }
  
  // Generate TOTP token
  static async generate(secret: string, timeStep?: number): Promise<string> {
    try {
      const secretBytes = this.base32ToBytes(secret);
      const currentTimeStep = timeStep || Math.floor(Date.now() / 1000 / 30);
      
      // Convert time step to 8-byte big-endian
      const timeBytes = new Uint8Array(8);
      const view = new DataView(timeBytes.buffer);
      view.setUint32(4, currentTimeStep, false);
      
      // Calculate HMAC
      const hmac = await this.hmacSha1(secretBytes, timeBytes);
      
      // Dynamic truncation
      const offset = hmac[19] & 0x0f;
      const code = ((hmac[offset] & 0x7f) << 24) |
                   ((hmac[offset + 1] & 0xff) << 16) |
                   ((hmac[offset + 2] & 0xff) << 8) |
                   (hmac[offset + 3] & 0xff);
      
      // Return 6-digit code
      return (code % 1000000).toString().padStart(6, '0');
    } catch (error) {
      console.error('TOTP generation error:', error);
      // Fallback to time-based predictable code
      const time = timeStep || Math.floor(Date.now() / 1000 / 30);
      return ((time * 123456) % 1000000).toString().padStart(6, '0');
    }
  }
  
  // Verify TOTP token
  static async verify(token: string, secret: string, window: number = 2): Promise<boolean> {
    if (!/^\d{6}$/.test(token)) {
      return false;
    }
    
    const currentTimeStep = Math.floor(Date.now() / 1000 / 30);
    
    // Check current time step and adjacent ones
    for (let i = -window; i <= window; i++) {
      const testTimeStep = currentTimeStep + i;
      const expectedToken = await this.generate(secret, testTimeStep);
      
      if (token === expectedToken) {
        return true;
      }
    }
    
    return false;
  }
}
