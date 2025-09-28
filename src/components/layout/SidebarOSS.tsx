// Seções do menu OSS para adicionar no Sidebar.tsx

import { 
  LayoutDashboard, TrendingUp, DollarSign, Shield, Target, Brain,
  FileText, AlertTriangle, CheckCircle, BarChart3, Activity,
  Database, Globe, Users, Calculator, RefreshCw, Zap
} from 'lucide-react';

export const ossSections = [
  {
    titleKey: 'sidebar.sections.ossOverview.title',
    items: [
      { to: '/oss-dashboard', icon: <LayoutDashboard className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.ossOverview.items.overview' },
      { to: '/oss-visao-executiva', icon: <TrendingUp className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.ossOverview.items.executive' },
    ],
  },
  {
    titleKey: 'sidebar.sections.ossFinancial.title',
    items: [
      { to: '/oss-receitas-glosas', icon: <DollarSign className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.ossFinancial.items.revenue' },
      { to: '/oss-glosas', icon: <AlertTriangle className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.ossFinancial.items.glosas' },
      { to: '/oss-roi-rentabilidade', icon: <Calculator className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.ossFinancial.items.roi' },
    ],
  },
  {
    titleKey: 'sidebar.sections.ossCompliance.title',
    items: [
      { to: '/oss-compliance', icon: <Shield className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.ossCompliance.items.compliance' },
      { to: '/oss-audesp', icon: <FileText className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.ossCompliance.items.audesp' },
      { to: '/oss-transparencia', icon: <CheckCircle className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.ossCompliance.items.transparency' },
      { to: '/oss-lgpd', icon: <Database className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.ossCompliance.items.lgpd' },
    ],
  },
  {
    titleKey: 'sidebar.sections.ossPerformance.title',
    items: [
      { to: '/oss-metas-desempenho', icon: <Target className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.ossPerformance.items.goals' },
      { to: '/oss-metas-desempenho', icon: <BarChart3 className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.ossPerformance.items.performance' },
      { to: '/oss-metas-desempenho', icon: <Activity className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.ossPerformance.items.actionPlans' },
      { to: '/oss-metas-desempenho', icon: <Globe className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.ossPerformance.items.benchmark' },
    ],
  },
  {
    titleKey: 'sidebar.sections.ossIntegrations.title',
    items: [
      { to: '/integracao-erp', icon: <Database className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.ossIntegrations.items.datasus' },
      { to: '/tiss-tuss', icon: <FileText className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.ossIntegrations.items.tiss' },
      { to: '/esus-integration', icon: <Globe className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.ossIntegrations.items.esus' },
    ],
  },
  {
    titleKey: 'sidebar.sections.ossAI.title',
    items: [
      { to: '/oss-oracle-ai', icon: <Brain className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.ossAI.items.oracle' },
      { to: '/oss-oracle-ai', icon: <Zap className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.ossAI.items.simulator' },
      { to: '/oss-oracle-ai', icon: <RefreshCw className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.ossAI.items.predictions' },
    ],
  },
  {
    titleKey: 'sidebar.sections.ossManagement.title',
    items: [
      { to: '/oss-contratos-aditivos', icon: <FileText className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.ossManagement.items.contracts' },
      { to: '/oss-satisfacao-usuario', icon: <TrendingUp className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.ossManagement.items.nps' },
      { to: '/oss-metas-desempenho', icon: <Target className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.ossManagement.items.performanceGoals' },
    ],
  },
];
