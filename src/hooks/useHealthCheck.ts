import { useEffect, useState } from 'react';
import { performHealthCheck } from '@/utils/assetVerification';

interface HealthCheckStatus {
  status: 'healthy' | 'warning' | 'error' | 'checking';
  checks: Array<{ name: string; status: string; message?: string }>;
  lastCheck: Date | null;
}

export const useHealthCheck = (intervalMs: number = 30000) => {
  const [healthStatus, setHealthStatus] = useState<HealthCheckStatus>({
    status: 'checking',
    checks: [],
    lastCheck: null
  });

  const runHealthCheck = async () => {
    try {
      const result = await performHealthCheck();
      setHealthStatus({
        ...result,
        lastCheck: new Date()
      });
    } catch (error) {
      console.error('Health check failed:', error);
      setHealthStatus({
        status: 'error',
        checks: [{ name: 'Health Check', status: 'error', message: 'Failed to run health check' }],
        lastCheck: new Date()
      });
    }
  };

  useEffect(() => {
    // Run initial health check
    runHealthCheck();

    // Set up periodic health checks
    const interval = setInterval(runHealthCheck, intervalMs);

    return () => clearInterval(interval);
  }, [intervalMs]);

  return {
    healthStatus,
    runHealthCheck
  };
};