import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Settings, RotateCcw, Eye, EyeOff, CheckCircle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCustomization, ModuleConfig } from '@/contexts/CustomizationContext';

interface CustomizationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CustomizationPanel: React.FC<CustomizationPanelProps> = ({
  isOpen,
  onClose,
}) => {
  const { config, updateConfig, resetConfig } = useCustomization();
  const [activeModule, setActiveModule] = useState<keyof ModuleConfig>('dashboard');

  const modules = [
    { key: 'dashboard' as keyof ModuleConfig, label: 'Dashboard', icon: '📊', color: 'bg-blue-500' },
    { key: 'financial' as keyof ModuleConfig, label: 'Financeiro', icon: '💰', color: 'bg-green-500' },
    { key: 'operational' as keyof ModuleConfig, label: 'Operacional', icon: '⚙️', color: 'bg-orange-500' },
    { key: 'compliance' as keyof ModuleConfig, label: 'Compliance', icon: '🛡️', color: 'bg-purple-500' },
    { key: 'analytics' as keyof ModuleConfig, label: 'Analytics', icon: '📈', color: 'bg-pink-500' },
  ];

  const getModuleConfig = (module: keyof ModuleConfig) => {
    return config[module];
  };

  const getToggleCount = (moduleConfig: any) => {
    return Object.values(moduleConfig).filter(Boolean).length;
  };

  const getTotalToggles = (moduleConfig: any) => {
    return Object.keys(moduleConfig).length;
  };

  const renderModuleSettings = (module: keyof ModuleConfig) => {
    const moduleConfig = getModuleConfig(module);
    const settings = Object.entries(moduleConfig);

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <span className="text-2xl">
              {modules.find(m => m.key === module)?.icon}
            </span>
            {modules.find(m => m.key === module)?.label}
          </h3>
          <Badge className="bg-slate-700 text-slate-200">
            {getToggleCount(moduleConfig)}/{getTotalToggles(moduleConfig)} ativos
          </Badge>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {settings.map(([key, value]) => (
            <div key={key} className="flex items-center justify-between p-3 rounded-lg bg-slate-800 border border-slate-700">
              <div className="flex-1">
                <label className="text-sm font-medium text-white cursor-pointer">
                  {formatLabel(key)}
                </label>
                <p className="text-xs text-slate-400 mt-1">
                  {getDescription(key, module)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {value ? (
                  <CheckCircle className="h-4 w-4 text-green-400" />
                ) : (
                  <XCircle className="h-4 w-4 text-slate-500" />
                )}
                <Switch
                  checked={value}
                  onCheckedChange={(checked) => updateConfig(module, key, checked)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const formatLabel = (key: string) => {
    return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  };

  const getDescription = (key: string, module: keyof ModuleConfig) => {
    const descriptions: Record<string, string> = {
      showKPIs: 'Indicadores principais de performance',
      showCharts: 'Gráficos e visualizações de dados',
      showAlerts: 'Alertas e notificações importantes',
      showMetrics: 'Métricas detalhadas de operação',
      showTrends: 'Análise de tendências temporais',
      showComparatives: 'Comparações entre períodos',
      showRevenue: 'Receitas e faturamento',
      showExpenses: 'Despesas e custos operacionais',
      showProfitability: 'Análise de rentabilidade',
      showCashFlow: 'Fluxo de caixa e liquidez',
      showBudget: 'Orçamento e planejamento financeiro',
      showProjections: 'Projeções e cenários futuros',
      showPerformance: 'Indicadores de desempenho',
      showQuality: 'Métricas de qualidade',
      showEfficiency: 'Eficiência operacional',
      showCapacity: 'Capacidade e utilização',
      showWorkload: 'Carga de trabalho',
      showIncidents: 'Incidentes e problemas',
      showAudits: 'Auditorias e fiscalizações',
      showCertifications: 'Certificações e conformidades',
      showRisks: 'Análise de riscos',
      showControls: 'Controles internos',
      showReports: 'Relatórios e documentação',
      showDeadlines: 'Prazos e entregas',
      showPredictions: 'Previsões e forecasts',
      showInsights: 'Insights e descobertas',
      showRecommendations: 'Recomendações de ação',
      showForecasts: 'Previsões avançadas',
    };
    return descriptions[key] || 'Configuração de exibição';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Painel lateral */}
      <div className="relative z-50 w-full max-w-4xl bg-slate-900 border-l border-slate-700 shadow-xl">
        <Card className="h-full border-0 bg-transparent">
          <CardHeader className="border-b border-slate-700">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-white">
                <Settings className="h-5 w-5 text-blue-400" />
                Personalização de Interface
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-slate-400 hover:text-white"
              >
                <XCircle className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <div className="flex gap-6 h-full">
              {/* Menu lateral */}
              <div className="w-64 space-y-2">
                <h3 className="text-sm font-semibold text-slate-300 mb-4">Módulos</h3>
                {modules.map((module) => {
                  const moduleConfig = getModuleConfig(module.key);
                  const activeCount = getToggleCount(moduleConfig);
                  const totalCount = getTotalToggles(moduleConfig);

                  return (
                    <Button
                      key={module.key}
                      variant={activeModule === module.key ? 'secondary' : 'ghost'}
                      className={cn(
                        'w-full justify-start h-auto p-3',
                        activeModule === module.key && 'bg-slate-800 border border-slate-600'
                      )}
                      onClick={() => setActiveModule(module.key)}
                    >
                      <div className="flex items-center gap-3 w-full">
                        <span className="text-lg">{module.icon}</span>
                        <div className="flex-1 text-left">
                          <div className="text-sm font-medium text-white">{module.label}</div>
                          <div className="text-xs text-slate-400">
                            {activeCount}/{totalCount} ativos
                          </div>
                        </div>
                      </div>
                    </Button>
                  );
                })}

                <div className="pt-4 border-t border-slate-700 mt-6">
                  <Button
                    variant="outline"
                    className="w-full border-slate-600 text-slate-300 hover:bg-slate-800"
                    onClick={resetConfig}
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Resetar Tudo
                  </Button>
                </div>
              </div>

              {/* Conteúdo principal */}
              <div className="flex-1 overflow-y-auto">
                {renderModuleSettings(activeModule)}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
