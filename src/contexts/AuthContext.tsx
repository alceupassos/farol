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
  const [userRole, setUserRole] = useState<string | null>('gestor');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    
    const initializeAuth = async () => {
      try {
        // Set up auth state listener first
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          async (event, session) => {
            if (!mounted) return;
            
            console.log('Auth state changed:', event, session);
            setSession(session);
            setUser(session?.user ?? null);
            
            if (session?.user) {
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
            } else {
              const savedRole = localStorage.getItem('demo_user_role') || 'gestor';
              if (mounted) setUserRole(savedRole);
            }
          }
        );

        // Then check for existing session
        const { data: { session } } = await supabase.auth.getSession();
        if (!mounted) return;
        
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
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
        } else {
          const savedRole = localStorage.getItem('demo_user_role') || 'gestor';
          if (mounted) setUserRole(savedRole);
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
      setUserRole('gestor');
      localStorage.setItem('demo_user_role', 'gestor');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  };

  const switchGuestRole = (newRole: string) => {
    setUserRole(newRole);
    localStorage.setItem('demo_user_role', newRole);
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