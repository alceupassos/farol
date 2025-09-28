import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const OSSDebug = () => {
  const { userRole, isAuthenticated } = useAuth();
  const location = useLocation();

  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <Card className="fixed bottom-4 right-4 z-50 w-80 bg-black/90 text-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">🔧 OSS Debug Panel</CardTitle>
      </CardHeader>
      <CardContent className="text-xs space-y-1">
        <div>Role: <span className="text-green-400">{userRole || 'none'}</span></div>
        <div>Authenticated: <span className="text-green-400">{isAuthenticated ? 'Yes' : 'No'}</span></div>
        <div>Current Path: <span className="text-blue-400">{location.pathname}</span></div>
        <div>Is OSS: <span className="text-yellow-400">{userRole === 'oss' ? 'YES ✓' : 'NO ✗'}</span></div>
      </CardContent>
    </Card>
  );
};
