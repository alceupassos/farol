import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';

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
  // Create a mock user that's always "logged in" for demo purposes
  const mockUser = {
    id: 'demo-user',
    email: 'demo@sistema.local',
    aud: 'authenticated',
    role: 'authenticated',
    email_confirmed_at: new Date().toISOString(),
    app_metadata: {},
    user_metadata: {},
    identities: [],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  } as User;

  const [user] = useState<User | null>(mockUser);
  const [session] = useState<Session | null>(null);
  const [userRole, setUserRole] = useState<string | null>('gestor');
  const [loading] = useState(false);

  useEffect(() => {
    // Set default role from localStorage or default to 'gestor'
    const savedRole = localStorage.getItem('demo_user_role') || 'gestor';
    setUserRole(savedRole);
  }, []);

  const signIn = async (email: string, password: string) => {
    // In demo mode, just set the role based on email
    const role = email.includes('gestor') ? 'gestor' : 
                 email.includes('medico') ? 'medico' : 'paciente';
    setUserRole(role);
    localStorage.setItem('demo_user_role', role);
    return { error: null };
  };

  const signInAsGuest = async (role: string) => {
    setUserRole(role);
    localStorage.setItem('demo_user_role', role);
    return { error: null };
  };

  const signUp = async (email: string, password: string, role: string, additionalData?: any) => {
    // In demo mode, just act as if signup was successful
    const newRole = role || 'paciente'; // Default role for new signups
    setUserRole(newRole);
    localStorage.setItem('demo_user_role', newRole);
    return { error: null };
  };

  const signOut = async () => {
    // In demo mode, just switch to default role
    setUserRole('gestor');
    localStorage.setItem('demo_user_role', 'gestor');
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