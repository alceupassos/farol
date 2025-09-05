import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { use2FA } from '@/hooks/use2FA';

interface TwoFAProtectedRouteProps {
  children: React.ReactNode;
}

export const TwoFAProtectedRoute: React.FC<TwoFAProtectedRouteProps> = ({ children }) => {
  const { user, loading: authLoading } = useAuth();
  const { has2FA, is2FAVerified, checkSessionVerification, check2FAStatus } = use2FA();
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const initialize = async () => {
      if (!user || authLoading) return;

      try {
        // Check if user has 2FA enabled
        await check2FAStatus();
        
        // Check if already verified in this session
        checkSessionVerification();
      } catch (error) {
        console.error('Error initializing 2FA check:', error);
      } finally {
        setLoading(false);
      }
    };

    initialize();
  }, [user, authLoading]);

  // Show loading while checking authentication
  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if no user
  if (!user) {
    return <Navigate to="/auth" state={{ from: location.pathname }} replace />;
  }

  // If user doesn't have 2FA enabled, redirect to setup
  if (!has2FA) {
    return <Navigate to="/setup-2fa" replace />;
  }

  // If user has 2FA but hasn't verified in this session, redirect to verification
  if (has2FA && !is2FAVerified) {
    return <Navigate to="/auth-2fa" state={{ from: location.pathname }} replace />;
  }

  // All checks passed, render the protected content
  return <>{children}</>;
};