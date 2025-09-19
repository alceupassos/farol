import { useEffect } from 'react';

interface LocationData {
  ip: string;
  country: string;
  region: string;
  city: string;
  latitude: number;
  longitude: number;
  timezone: string;
  isp: string;
}

export const useAccessLogger = () => {
  const logAccess = async (pageAccessed?: string, userEmail?: string) => {
    try {
      // Get user's IP and location data
      const locationResponse = await fetch('https://ipapi.co/json/');
      const locationData: LocationData = await locationResponse.json();

      // Get additional browser info
      const userAgent = navigator.userAgent;
      const referrer = document.referrer;
      const sessionId = sessionStorage.getItem('session_id') || generateSessionId();
      
      // Store session ID if not exists
      if (!sessionStorage.getItem('session_id')) {
        sessionStorage.setItem('session_id', sessionId);
      }

      // Create access log entry
      const logEntry = {
        id: generateSessionId(),
        ip_address: locationData.ip,
        user_agent: userAgent,
        country: locationData.country,
        region: locationData.region,
        city: locationData.city,
        latitude: locationData.latitude,
        longitude: locationData.longitude,
        timezone: locationData.timezone,
        isp: locationData.isp,
        page_accessed: pageAccessed || window.location.pathname,
        referrer: referrer || null,
        session_id: sessionId,
        user_email: userEmail || null,
        access_time: new Date().toISOString()
      };

      // Store in localStorage for demo
      const existingLogs = JSON.parse(localStorage.getItem('access_logs') || '[]');
      existingLogs.unshift(logEntry); // Add to beginning
      
      // Keep only last 1000 entries
      if (existingLogs.length > 1000) {
        existingLogs.splice(1000);
      }
      
      localStorage.setItem('access_logs', JSON.stringify(existingLogs));
      
      console.log('Access logged:', logEntry);
    } catch (error) {
      console.warn('Error getting location data:', error);
      
      // Fallback: log basic info without location
      const logEntry = {
        id: generateSessionId(),
        ip_address: '127.0.0.1', // Fallback IP
        user_agent: navigator.userAgent,
        country: 'Brazil',
        region: 'Rio de Janeiro',
        city: 'Angra dos Reis',
        latitude: -23.0067,
        longitude: -44.3186,
        timezone: 'America/Sao_Paulo',
        isp: 'Local Network',
        page_accessed: pageAccessed || window.location.pathname,
        referrer: document.referrer || null,
        session_id: sessionStorage.getItem('session_id') || generateSessionId(),
        user_email: userEmail || null,
        access_time: new Date().toISOString()
      };

      const existingLogs = JSON.parse(localStorage.getItem('access_logs') || '[]');
      existingLogs.unshift(logEntry);
      localStorage.setItem('access_logs', JSON.stringify(existingLogs));
    }
  };

  const generateSessionId = () => {
    return 'session_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
  };

  return { logAccess };
};

// Hook to automatically log page access
export const usePageAccessLogger = (userEmail?: string) => {
  const { logAccess } = useAccessLogger();

  useEffect(() => {
    // Log access when component mounts
    logAccess(window.location.pathname, userEmail);

    // Log access on page visibility change (when user returns to tab)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        logAccess(window.location.pathname, userEmail);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [logAccess, userEmail]);
};
