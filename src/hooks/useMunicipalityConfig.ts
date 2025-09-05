import { useState, useEffect } from 'react';
import { DEFAULT_MUNICIPALITY_CONFIG, MunicipalityConfig } from '@/utils/municipalityConstants';

// Hook para configuração dinâmica de município
// Permite personalização futura por município específico

export function useMunicipalityConfig() {
  const [config, setConfig] = useState<MunicipalityConfig>(DEFAULT_MUNICIPALITY_CONFIG);
  const [isDemoMode, setIsDemoMode] = useState(true);

  useEffect(() => {
    // Por enquanto, sempre usa dados demonstrativos
    // No futuro, pode carregar configuração específica do município
    const demoMode = localStorage.getItem('demoMode') === 'true';
    setIsDemoMode(demoMode);
    
    // Aqui poderia carregar configuração específica baseada em:
    // - URL parameters
    // - Local storage
    // - API call
    // - Database lookup
    
    setConfig(DEFAULT_MUNICIPALITY_CONFIG);
  }, []);

  const updateConfig = (newConfig: Partial<MunicipalityConfig>) => {
    setConfig(prev => ({ ...prev, ...newConfig }));
  };

  const resetToDemo = () => {
    setConfig(DEFAULT_MUNICIPALITY_CONFIG);
    setIsDemoMode(true);
    localStorage.setItem('demoMode', 'true');
  };

  const setMunicipalityName = (name: string) => {
    setConfig(prev => ({ ...prev, name }));
  };

  return {
    config,
    isDemoMode,
    updateConfig,
    resetToDemo,
    setMunicipalityName,
    isGeneric: config.name === 'Seu Município'
  };
}