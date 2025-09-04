import React from 'react';
import { AlertCircle, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useHealthCheck } from '@/hooks/useHealthCheck';

const HealthCheckDashboard: React.FC = () => {
  const { healthStatus, runHealthCheck } = useHealthCheck();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'error':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (process.env.NODE_ENV !== 'development') {
    return null; // Only show in development
  }

  return (
    <Card className="fixed bottom-4 right-4 w-80 z-50 shadow-lg border-2">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm">
          {getStatusIcon(healthStatus.status)}
          System Health Check
          <Badge className={getStatusColor(healthStatus.status)}>
            {healthStatus.status.toUpperCase()}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {healthStatus.checks.map((check, index) => (
          <div key={index} className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">{check.name}</span>
            <div className="flex items-center gap-1">
              {getStatusIcon(check.status)}
              <span className={check.status === 'ok' ? 'text-green-600' : 'text-red-600'}>
                {check.status}
              </span>
            </div>
          </div>
        ))}
        {healthStatus.lastCheck && (
          <div className="text-xs text-muted-foreground pt-2 border-t">
            Last check: {healthStatus.lastCheck.toLocaleTimeString()}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HealthCheckDashboard;