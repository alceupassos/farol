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
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserRole = async (userId: string, userEmail?: string) => {
    // Check if this is a guest user and has a stored role
    if (userEmail === 'guest@saudepublica.ai') {
      const guestRole = localStorage.getItem('guestRole');
      if (guestRole) {
        return guestRole;
      }
      // If no stored role for guest, return default
      return 'paciente';
    }
    
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .maybeSingle(); // Use maybeSingle instead of single to avoid error when no rows
      
      if (error && error.code !== 'PGRST116') {
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
            const role = await fetchUserRole(session.user.id, session.user.email);
            setUserRole(role);
            console.log('User authenticated with role:', role);
          }, 0);
        } else {
          setUserRole(null);
          localStorage.removeItem('guestRole'); // Clear guest role on logout
          console.log('User logged out');
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
          const role = await fetchUserRole(session.user.id, session.user.email);
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
    try {
      // Try to sign in first (user might already exist)
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: 'guest@saudepublica.ai',
        password: '123456',
      });

      if (!signInError) {
        // Login successful
        setUserRole(role);
        localStorage.setItem('guestRole', role);
        return { error: null };
      }

      // If sign in failed, try to create the user
      console.log('Guest user does not exist, creating...', signInError);
      
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: 'guest@saudepublica.ai',
        password: '123456',
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            role: 'paciente',
            full_name: 'Usuário Demonstração'
          }
        }
      });

      if (signUpError) {
        console.error('Error creating guest user:', signUpError);
        // If signup failed due to existing user, try login again
        if (signUpError.message?.includes('already registered')) {
          const { error: retrySignInError } = await supabase.auth.signInWithPassword({
            email: 'guest@saudepublica.ai',
            password: '123456',
          });
          
          if (!retrySignInError) {
            setUserRole(role);
            localStorage.setItem('guestRole', role);
            return { error: null };
          }
          return { error: retrySignInError };
        }
        return { error: signUpError };
      }

      // If user was created but needs confirmation, try to sign in anyway
      if (signUpData.user && !signUpData.session) {
        console.log('User created but not confirmed, trying to sign in...');
        const { error: finalSignInError } = await supabase.auth.signInWithPassword({
          email: 'guest@saudepublica.ai',
          password: '123456',
        });
        
        if (!finalSignInError) {
          setUserRole(role);
          localStorage.setItem('guestRole', role);
          return { error: null };
        }
        return { error: finalSignInError };
      }

      // User was created and session exists
      if (signUpData.session) {
        setUserRole(role);
        localStorage.setItem('guestRole', role);
        
        // Create profile and role entries
        try {
          // Insert into profiles table if not exists
          const { error: profileError } = await supabase
            .from('profiles')
            .upsert({
              user_id: signUpData.user!.id,
              full_name: 'Usuário Demonstração',
              municipality: 'Demonstração'
            });

          if (profileError) {
            console.error('Error creating profile:', profileError);
          }

          // Insert into user_roles table if not exists
          const { error: roleError } = await supabase
            .from('user_roles')
            .upsert({
              user_id: signUpData.user!.id,
              role: 'paciente' as any
            });

          if (roleError) {
            console.error('Error creating user role:', roleError);
          }
        } catch (dbError) {
          console.error('Error setting up guest user data:', dbError);
        }
        
        return { error: null };
      }

      return { error: new Error('Falha na criação do usuário de demonstração') };
      
    } catch (error) {
      console.error('Unexpected error in signInAsGuest:', error);
      return { error: error as any };
    }
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

  const switchGuestRole = (newRole: string) => {
    if (user?.email === 'guest@saudepublica.ai') {
      setUserRole(newRole);
      localStorage.setItem('guestRole', newRole);
    }
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