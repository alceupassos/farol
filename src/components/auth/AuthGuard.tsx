import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const { user, loading, userRole } = useAuth();
  const location = useLocation();

  // Allow guest access if userRole exists (for demo purposes) - PRIORITY CHECK
  if (!user && userRole) {
    return <>{children}</>;
  }

  // Show loading indicator only if we're actually loading and no guest role
  if (loading && !userRole) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-lg font-medium text-foreground">Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  // If user is not authenticated and no guest role, redirect to login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default AuthGuard;