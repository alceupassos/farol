import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Interface para configurações de cada módulo
export interface ModuleConfig {
  dashboard: {
    showKPIs: boolean;
    showCharts: boolean;
    showAlerts: boolean;
    showMetrics: boolean;
    showTrends: boolean;
    showComparatives: boolean;
  };
  financial: {
    showRevenue: boolean;
    showExpenses: boolean;
    showProfitability: boolean;
    showCashFlow: boolean;
    showBudget: boolean;
    showProjections: boolean;
  };
  operational: {
    showPerformance: boolean;
    showQuality: boolean;
    showEfficiency: boolean;
    showCapacity: boolean;
    showWorkload: boolean;
    showIncidents: boolean;
  };
  compliance: {
    showAudits: boolean;
    showCertifications: boolean;
    showRisks: boolean;
    showControls: boolean;
    showReports: boolean;
    showDeadlines: boolean;
  };
  analytics: {
    showPredictions: boolean;
    showInsights: boolean;
    showRecommendations: boolean;
    showTrends: boolean;
    showComparatives: boolean;
    showForecasts: boolean;
  };
}

// Configurações padrão
const defaultConfig: ModuleConfig = {
  dashboard: {
    showKPIs: true,
    showCharts: true,
    showAlerts: true,
    showMetrics: true,
    showTrends: true,
    showComparatives: true,
  },
  financial: {
    showRevenue: true,
    showExpenses: true,
    showProfitability: true,
    showCashFlow: true,
    showBudget: true,
    showProjections: true,
  },
  operational: {
    showPerformance: true,
    showQuality: true,
    showEfficiency: true,
    showCapacity: true,
    showWorkload: true,
    showIncidents: true,
  },
  compliance: {
    showAudits: true,
    showCertifications: true,
    showRisks: true,
    showControls: true,
    showReports: true,
    showDeadlines: true,
  },
  analytics: {
    showPredictions: true,
    showInsights: true,
    showRecommendations: true,
    showTrends: true,
    showComparatives: true,
    showForecasts: true,
  },
};

interface CustomizationContextType {
  config: ModuleConfig;
  updateConfig: (module: keyof ModuleConfig, section: string, value: boolean) => void;
  resetConfig: () => void;
  getModuleConfig: (module: keyof ModuleConfig) => any;
}

const CustomizationContext = createContext<CustomizationContextType | undefined>(undefined);

interface CustomizationProviderProps {
  children: ReactNode;
}

export const CustomizationProvider: React.FC<CustomizationProviderProps> = ({ children }) => {
  const [config, setConfig] = useState<ModuleConfig>(defaultConfig);

  // Carregar configurações do localStorage na inicialização
  useEffect(() => {
    const savedConfig = localStorage.getItem('farol-customization-config');
    if (savedConfig) {
      try {
        const parsedConfig = JSON.parse(savedConfig);
        setConfig({ ...defaultConfig, ...parsedConfig });
      } catch (error) {
        console.error('Erro ao carregar configurações:', error);
      }
    }
  }, []);

  // Salvar configurações no localStorage sempre que mudarem
  useEffect(() => {
    localStorage.setItem('farol-customization-config', JSON.stringify(config));
  }, [config]);

  const updateConfig = (module: keyof ModuleConfig, section: string, value: boolean) => {
    setConfig(prev => ({
      ...prev,
      [module]: {
        ...prev[module],
        [section]: value,
      },
    }));
  };

  const resetConfig = () => {
    setConfig(defaultConfig);
    localStorage.removeItem('farol-customization-config');
  };

  const getModuleConfig = (module: keyof ModuleConfig) => {
    return config[module];
  };

  const value: CustomizationContextType = {
    config,
    updateConfig,
    resetConfig,
    getModuleConfig,
  };

  return (
    <CustomizationContext.Provider value={value}>
      {children}
    </CustomizationContext.Provider>
  );
};

export const useCustomization = (): CustomizationContextType => {
  const context = useContext(CustomizationContext);
  if (context === undefined) {
    throw new Error('useCustomization must be used within a CustomizationProvider');
  }
  return context;
};
