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
  const [isFullAccessEnabled, setIsFullAccessEnabled] = useState(() => {
    // Carregar do localStorage, default false (apenas gestor)
    const saved = localStorage.getItem('profileAccessEnabled');
    return saved ? JSON.parse(saved) : false;
  });

  const toggleProfileAccess = () => {
    setIsFullAccessEnabled(prev => {
      const newValue = !prev;
      localStorage.setItem('profileAccessEnabled', JSON.stringify(newValue));
      return newValue;
    });
  };

  useEffect(() => {
    // Sincronizar com localStorage quando o valor muda
    localStorage.setItem('profileAccessEnabled', JSON.stringify(isFullAccessEnabled));
  }, [isFullAccessEnabled]);

  return (
    <ProfileAccessContext.Provider value={{ isFullAccessEnabled, toggleProfileAccess }}>
      {children}
    </ProfileAccessContext.Provider>
  );
};