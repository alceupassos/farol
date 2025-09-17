import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  userRole: string | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signInAsGuest: (role: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, role: string, additionalData?: any) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  switchGuestRole: (newRole: string) => void;
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
  const [userRole, setUserRole] = useState<string | null>(localStorage.getItem('demo_user_role') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    
    const initializeAuth = async () => {
      try {
        // Verificar se é a primeira carga da sessão e fazer logout automático
        const isFirstLoad = !sessionStorage.getItem('auth_initialized');
        
        if (isFirstLoad) {
          console.log('Primeira carga detectada - fazendo logout automático');
          try {
            await supabase.auth.signOut();
            // Limpar localStorage
            localStorage.removeItem('demo_user_role');
            localStorage.removeItem('profileAccessEnabled');
            // Marcar como inicializado para esta sessão
            sessionStorage.setItem('auth_initialized', 'true');
          } catch (error) {
            console.warn('Erro no logout automático inicial:', error);
          }
        }

        // Set up auth state listener first
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          (event, session) => {
            if (!mounted) return;
            
            console.log('Auth state changed:', event, session);
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
      // Manter o role atual após logout para demo
      // setUserRole('gestor');
      // localStorage.setItem('demo_user_role', 'gestor');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  };

  const switchGuestRole = (newRole: string) => {
    console.log('Switching to role:', newRole);
    setUserRole(newRole);
    localStorage.setItem('demo_user_role', newRole);
    
    // Remover redirecionamento automático - será feito manualmente no AccessDropdown
    console.log('Role switched successfully to:', newRole);
  };

  const value = {
    user,
    session,
    userRole,
    loading,
    signIn,
    signInAsGuest,
    signUp,
    signOut,
    switchGuestRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};