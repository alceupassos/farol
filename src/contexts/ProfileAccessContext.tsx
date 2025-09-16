import React, { createContext, useContext, useState, useEffect } from 'react';

interface ProfileAccessContextType {
  isFullAccessEnabled: boolean;
  toggleProfileAccess: () => void;
}

const ProfileAccessContext = createContext<ProfileAccessContextType | undefined>(undefined);

export const useProfileAccess = () => {
  const context = useContext(ProfileAccessContext);
  if (context === undefined) {
    throw new Error('useProfileAccess must be used within a ProfileAccessProvider');
  }
  return context;
};

interface ProfileAccessProviderProps {
  children: React.ReactNode;
}

export const ProfileAccessProvider: React.FC<ProfileAccessProviderProps> = ({ children }) => {
  const [isFullAccessEnabled, setIsFullAccessEnabled] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Inicializar do localStorage apenas no lado do cliente
    try {
      const saved = localStorage.getItem('profileAccessEnabled');
      if (saved) {
        setIsFullAccessEnabled(JSON.parse(saved));
      }
    } catch (error) {
      console.warn('Error loading profile access state:', error);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  const toggleProfileAccess = () => {
    setIsFullAccessEnabled(prev => {
      const newValue = !prev;
      try {
        localStorage.setItem('profileAccessEnabled', JSON.stringify(newValue));
      } catch (error) {
        console.warn('Error saving profile access state:', error);
      }
      return newValue;
    });
  };

  useEffect(() => {
    // Sincronizar com localStorage quando o valor muda, mas apenas depois da inicialização
    if (isInitialized) {
      try {
        localStorage.setItem('profileAccessEnabled', JSON.stringify(isFullAccessEnabled));
      } catch (error) {
        console.warn('Error syncing profile access state:', error);
      }
    }
  }, [isFullAccessEnabled, isInitialized]);

  return (
    <ProfileAccessContext.Provider value={{ isFullAccessEnabled, toggleProfileAccess }}>
      {children}
    </ProfileAccessContext.Provider>
  );
};