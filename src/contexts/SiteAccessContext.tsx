import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface SiteAccessContextType {
  siteAccessGranted: boolean;
  loading: boolean;
  verifySiteCode: (code: string) => Promise<boolean>;
  checkSiteAccess: () => void;
  revokeSiteAccess: () => void;
}

const SiteAccessContext = createContext<SiteAccessContextType | undefined>(undefined);

export const useSiteAccess = () => {
  const context = useContext(SiteAccessContext);
  if (!context) {
    throw new Error('useSiteAccess must be used within a SiteAccessProvider');
  }
  return context;
};

interface SiteAccessProviderProps {
  children: ReactNode;
}

export const SiteAccessProvider = ({ children }: SiteAccessProviderProps) => {
  const [siteAccessGranted, setSiteAccessGranted] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkSiteAccess = () => {
    const sessionToken = sessionStorage.getItem('site_access_token');
    const accessTime = sessionStorage.getItem('site_access_time');
    
    if (sessionToken && accessTime) {
      const timeElapsed = Date.now() - parseInt(accessTime);
      const eightHours = 8 * 60 * 60 * 1000; // 8 hours in milliseconds
      
      if (timeElapsed < eightHours) {
        setSiteAccessGranted(true);
      } else {
        // Session expired
        sessionStorage.removeItem('site_access_token');
        sessionStorage.removeItem('site_access_time');
        setSiteAccessGranted(false);
      }
    } else {
      setSiteAccessGranted(false);
    }
    setLoading(false);
  };

  const verifySiteCode = async (code: string): Promise<boolean> => {
    try {
      setLoading(true);
      
      // Use the site-auth edge function
      const { data, error } = await supabase.functions.invoke('site-auth', {
        body: { 
          code,
          ip_address: '', // Will be populated by the edge function
          user_agent: navigator.userAgent
        }
      });

      if (error) {
        console.error('Error calling site-auth function:', error);
        return false;
      }

      if (data?.valid) {
        // Store session token
        const sessionToken = data.session_token;
        const accessTime = Date.now().toString();
        
        sessionStorage.setItem('site_access_token', sessionToken);
        sessionStorage.setItem('site_access_time', accessTime);
        
        setSiteAccessGranted(true);
        return true;
      }

      return false;
    } catch (error) {
      console.error('Error verifying site code:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const revokeSiteAccess = () => {
    sessionStorage.removeItem('site_access_token');
    sessionStorage.removeItem('site_access_time');
    setSiteAccessGranted(false);
  };

  useEffect(() => {
    checkSiteAccess();
  }, []);

  return (
    <SiteAccessContext.Provider
      value={{
        siteAccessGranted,
        loading,
        verifySiteCode,
        checkSiteAccess,
        revokeSiteAccess
      }}
    >
      {children}
    </SiteAccessContext.Provider>
  );
};