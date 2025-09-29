import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { SimpleTOTP } from '@/utils/simpleTOTP';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  userRole: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signInAsGuest: (role: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, role: string, additionalData?: any) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  switchGuestRole: (newRole: string) => void;
  verifyTOTP: (email: string, token: string) => Promise<{ success: boolean; error?: any }>;
  generateTOTPSecret: (email: string) => Promise<{ secret?: string; qrCode?: string; error?: any }>;
  setRole: (role: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userRole, setUserRole] = useState<string | null>(() => {
    if (typeof window === 'undefined') {
      return null;
    }
    try {
      return localStorage.getItem('demo_user_role');
    } catch (error) {
      console.warn('Failed to read demo_user_role from localStorage:', error);
      return null;
    }
  });
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const TOTP_FLAG_KEY = 'totp_authenticated';

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const totpAuth = localStorage.getItem(TOTP_FLAG_KEY);
    setIsAuthenticated(totpAuth === 'true');
  }, []);

  useEffect(() => {
    let mounted = true;
    
    const initializeAuth = async () => {
      try {
        const totpAuth = localStorage.getItem(TOTP_FLAG_KEY) === 'true';
        setIsAuthenticated(totpAuth);

        // Verificar se é a primeira carga da sessão
        const isFirstLoad = !sessionStorage.getItem('auth_initialized');
        
        if (isFirstLoad) {
          console.debug('Primeira carga detectada - inicializando autenticação');
          try {
            // Apenas limpar dados obsoletos, sem forçar logout
            localStorage.removeItem('profileAccessEnabled');
            
            // Marcar como inicializado para esta sessão
            sessionStorage.setItem('auth_initialized', 'true');
          } catch (error) {
            console.warn('Erro na inicialização automática:', error);
          }
        }

        // Set up auth state listener first
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          (event, session) => {
            if (!mounted) return;
            
            console.debug('Auth state changed:', event, session);
            setSession(session);
            setUser(session?.user ?? null);
            
            if (session?.user) {
              // Para usuários autenticados, buscar role no banco
               setTimeout(async () => {
                 try {
                   const { data: roleData } = await supabase
                     .from('user_roles')
                     .select('role')
                     .eq('user_id', session.user.id)
                     .single();
                   
                   if (roleData && mounted) {
                     setUserRole(roleData.role);
                     localStorage.setItem('demo_user_role', roleData.role);
                   }
                 } catch (error) {
                   console.warn('Error fetching user role:', error);
                 }
               }, 0);
            } else {
              // Para usuários não autenticados, manter o role atual ou usar do localStorage
              const savedRole = localStorage.getItem('demo_user_role');
              if (savedRole && mounted) {
                setUserRole(savedRole);
              }
            }
          }
        );

        // Then check for existing session with timeout
        const sessionPromise = supabase.auth.getSession();
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Session check timeout')), 3000)
        );
        
        try {
          const { data: { session } } = await Promise.race([sessionPromise, timeoutPromise]) as any;
          if (!mounted) return;
          
          setSession(session);
          setUser(session?.user ?? null);
          
           if (session?.user) {
             setTimeout(async () => {
               try {
                 const { data: roleData } = await supabase
                   .from('user_roles')
                   .select('role')
                   .eq('user_id', session.user.id)
                   .single();
                 
                 if (roleData && mounted) {
                   setUserRole(roleData.role);
                   localStorage.setItem('demo_user_role', roleData.role);
                 }
               } catch (error) {
                 console.warn('Error fetching user role:', error);
               }
             }, 0);
          } else {
            const savedRole = localStorage.getItem('demo_user_role');
            if (savedRole && mounted) {
              setUserRole(savedRole);
            }
          }
        } catch (error) {
          console.warn('Session check failed or timeout:', error);
          // Em caso de erro/timeout, assumir não autenticado
          if (mounted) {
            setSession(null);
            setUser(null);
            const savedRole = localStorage.getItem('demo_user_role');
            if (savedRole) {
              setUserRole(savedRole);
            }
          }
        }

        return () => subscription.unsubscribe();
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    const cleanup = initializeAuth();
    
    return () => {
      mounted = false;
      cleanup?.then(cleanupFn => cleanupFn?.());
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        console.error('Login error:', error);
        return { error };
      }
      
      return { error: null };
    } catch (error) {
      console.error('Unexpected login error:', error);
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signInAsGuest = async (role: string) => {
    setUserRole(role);
    localStorage.setItem('demo_user_role', role);
    return { error: null };
  };

  const signUp = async (email: string, password: string, role: string, additionalData?: any) => {
    try {
      setLoading(true);
      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: additionalData?.full_name || '',
            role: role || 'paciente'
          }
        }
      });
      
      if (error) {
        console.error('Signup error:', error);
        return { error };
      }
      
      return { error: null };
    } catch (error) {
      console.error('Unexpected signup error:', error);
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
      setIsAuthenticated(false);
      localStorage.removeItem(TOTP_FLAG_KEY);
      localStorage.removeItem('demo_user_role');
      localStorage.removeItem('profileAccessEnabled');
      
      // Force redirect to home page to trigger TOTP login
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  };

  const switchGuestRole = (newRole: string) => {
    console.log('AuthContext: Alterando papel para:', newRole, 'no contexto de autenticação');
    console.log('Switching to role:', newRole);
    setUserRole(newRole);
    localStorage.setItem('demo_user_role', newRole);
    
    // Remover redirecionamento automático - será feito manualmente no AccessDropdown
    console.log('Role switched successfully to:', newRole);
  };

  const verifyTOTP = async (email: string, token: string) => {
    try {
      // Validate token format
      if (token.length !== 6 || !/^\d+$/.test(token)) {
        return { success: false, error: 'Token deve ter 6 dígitos' };
      }

      console.log('Verifying Google Authenticator TOTP:', { email, token });

      // Use the same secret that Google Authenticator uses
      const secret = 'JBSWY3DPEHPK3PXP';
      
      // Generate current token for comparison (async to leverage Web Crypto)
      const currentToken = await SimpleTOTP.generate(secret);
      console.log('Current expected token:', currentToken);
      console.log('User provided token:', token);
      
      // Verify the token within a ±2 step window
      const isValid = await SimpleTOTP.verify(token, secret, 2);
      
      console.log('TOTP verification result:', isValid);
      
      // If verification fails, show debug info
      if (!isValid) {
        const currentTime = Math.floor(Date.now() / 1000);
        const timeStep = Math.floor(currentTime / 30);
        
        console.log('Debug info:');
        console.log('Current timestamp:', currentTime);
        console.log('Current time step:', timeStep);
        console.log('Expected token:', currentToken);
        console.log('Received token:', token);
        
        // Check if it's a timing issue
        const prevToken = await SimpleTOTP.generate(secret, timeStep - 1);
        console.log('Previous token (one window back):', prevToken);
      }

      // Log the attempt
      try {
        const logEntry = {
          id: 'totp_' + Date.now(),
          ip_address: '127.0.0.1',
          user_agent: 'TOTP-' + (isValid ? 'SUCCESS' : 'FAILED') + '-' + token,
          country: 'Brazil',
          region: 'Rio de Janeiro', 
          city: 'Angra dos Reis',
          latitude: -23.0067,
          longitude: -44.3186,
          timezone: 'America/Sao_Paulo',
          isp: 'Local Network',
          page_accessed: '/totp-login',
          referrer: '',
          session_id: sessionStorage.getItem('session_id') || 'totp_session',
          user_email: email,
          access_time: new Date().toISOString()
        };

        const existingLogs = JSON.parse(localStorage.getItem('access_logs') || '[]');
        existingLogs.unshift(logEntry);
        localStorage.setItem('access_logs', JSON.stringify(existingLogs));
      } catch (logError) {
        console.error('Error logging TOTP attempt:', logError);
      }

      if (isValid) {
        localStorage.setItem(TOTP_FLAG_KEY, 'true');
        setIsAuthenticated(true);
        return { success: true };
      }

      if (!isValid) {
        return { success: false, error: 'Código TOTP inválido ou expirado.' };
      }
    } catch (error) {
      console.error('TOTP verification error:', error);
      return { success: false, error: 'Erro na verificação TOTP' };
    }
  };

  const generateTOTPSecret = async (email: string) => {
    try {
      // Use the same secret for consistency
      const secret = 'JBSWY3DPEHPK3PXP'; // Base32 encoded secret
      const qrCode = `otpauth://totp/SaudePublica:${email}?secret=${secret}&issuer=SaudePublica`;
      
      return { secret, qrCode };
    } catch (error) {
      console.error('TOTP generation error:', error);
      return { error };
    }
  };

  const setRole = (role: string | null) => {
    setUserRole(role);
    if (role) {
      localStorage.setItem('demo_user_role', role);
    } else {
      localStorage.removeItem('demo_user_role');
    }
  };

  const value = {
    user,
    session,
    userRole,
    loading,
    isAuthenticated,
    signIn,
    signInAsGuest,
    signUp,
    signOut,
    switchGuestRole,
    verifyTOTP,
    generateTOTPSecret,
    setRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
