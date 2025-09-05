import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { verifySiteAccessCode, generateSiteSessionToken } from '@/utils/siteCrypto';

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
      
      // Get all active site access codes
      const { data: accessCodes, error } = await supabase
        .from('site_access_codes')
        .select('*')
        .eq('is_active', true);

      if (error) {
        console.error('Error fetching site access codes:', error);
        return false;
      }

      // Try to verify against any active code
      for (const accessCode of accessCodes || []) {
        const isValid = verifySiteAccessCode(code, accessCode.encrypted_secret, accessCode.salt);
        
        if (isValid) {
          // Generate session token
          const sessionToken = generateSiteSessionToken();
          const accessTime = Date.now().toString();
          
          // Store in session storage
          sessionStorage.setItem('site_access_token', sessionToken);
          sessionStorage.setItem('site_access_time', accessTime);
          
          // Log the access
          await supabase.from('site_access_logs').insert({
            code_used: accessCode.id,
            success: true,
            attempted_at: new Date().toISOString()
          });

          // Update last used time
          await supabase
            .from('site_access_codes')
            .update({ last_used_at: new Date().toISOString() })
            .eq('id', accessCode.id);

          setSiteAccessGranted(true);
          return true;
        }
      }

      // Log failed attempt
      await supabase.from('site_access_logs').insert({
        success: false,
        attempted_at: new Date().toISOString()
      });

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