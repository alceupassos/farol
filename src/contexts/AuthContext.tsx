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
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserRole = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .single();
      
      if (error) {
        console.error('Error fetching user role:', error);
        return null;
      }
      
      return data?.role || null;
    } catch (error) {
      console.error('Error fetching user role:', error);
      return null;
    }
  };

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Fetch user role after authentication
          setTimeout(async () => {
            const role = await fetchUserRole(session.user.id);
            setUserRole(role);
          }, 0);
        } else {
          setUserRole(null);
        }
        
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        setTimeout(async () => {
          const role = await fetchUserRole(session.user.id);
          setUserRole(role);
        }, 0);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signInAsGuest = async (role: string) => {
    // Always use guest credentials
    const { error } = await supabase.auth.signInWithPassword({
      email: 'guest@saudepublica.ai',
      password: '1234',
    });
    
    if (!error) {
      // Set the role immediately for the guest user
      setUserRole(role);
    }
    
    return { error };
  };

  const signUp = async (email: string, password: string, role: string, additionalData?: any) => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          role: role,
          ...additionalData
        }
      }
    });

    if (error) return { error };

    // If user is created successfully, add role and profile
    if (data.user && !error) {
      try {
        // Insert user role
        const { error: roleError } = await supabase
          .from('user_roles')
          .insert([{ user_id: data.user.id, role: role as 'gestor' | 'medico' | 'paciente' }]);

        if (roleError) {
          console.error('Error inserting user role:', roleError);
        }

        // Insert profile
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([{ 
            user_id: data.user.id,
            full_name: additionalData?.full_name || '',
            municipality: additionalData?.municipality || '',
            crm: additionalData?.crm || '',
            specialty: additionalData?.specialty || ''
          }]);

        if (profileError) {
          console.error('Error inserting profile:', profileError);
        }
      } catch (err) {
        console.error('Error creating user profile:', err);
      }
    }

    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
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
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};