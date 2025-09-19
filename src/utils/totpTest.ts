export const testTOTP = () => {
  console.log('=== Simple TOTP Test ===');
  
  try {
    // Test simple token generation
    const currentTime = Math.floor(Date.now() / 1000 / 30);
    const token = ((currentTime * 123456) % 1000000).toString().padStart(6, '0');
    console.log('Generated token:', token);
    
    // Test verification logic
    const validTokens = [];
    for (let i = -2; i <= 2; i++) {
      const timeStep = currentTime + i;
      const testToken = ((timeStep * 123456) % 1000000).toString().padStart(6, '0');
      validTokens.push(testToken);
    }
    
    console.log('Valid tokens:', validTokens);
    const isValid = validTokens.includes(token);
    console.log('Verification result:', isValid);
    
    return { token, validTokens, isValid };
  } catch (error) {
    console.error('Simple TOTP test error:', error);
    return { error };
  }
};
