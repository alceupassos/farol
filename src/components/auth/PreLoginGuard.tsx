import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSiteAccess } from '@/contexts/SiteAccessContext';

interface PreLoginGuardProps {
  children: React.ReactNode;
}

const PreLoginGuard = ({ children }: PreLoginGuardProps) => {
  const { siteAccessGranted, loading } = useSiteAccess();
  const location = useLocation();

  // Allow access to site access page and admin page without site access
  const publicRoutes = ['/site-access', '/admin'];
  const isPublicRoute = publicRoutes.includes(location.pathname);

  // Show loading indicator
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-lg font-medium text-foreground">Verificando acesso ao sistema...</p>
        </div>
      </div>
    );
  }

  // If site access is not granted and not on public route, redirect to site access
  if (!siteAccessGranted && !isPublicRoute) {
    return <Navigate to="/site-access" replace />;
  }

  // If site access is granted and on site access page, redirect to home
  if (siteAccessGranted && location.pathname === '/site-access') {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default PreLoginGuard;