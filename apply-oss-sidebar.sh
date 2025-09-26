#!/bin/bash

# Script para aplicar as mudanças do Sidebar OSS
echo "🔧 Aplicando mudanças do Sidebar OSS..."

# Backup do arquivo original
cp src/components/layout/Sidebar.tsx src/components/layout/Sidebar.tsx.backup

# Criar arquivo temporário com as mudanças
cat > /tmp/sidebar_oss_sections.txt << 'EOF'

    const ossSections: SectionConfig[] = [
      {
        titleKey: 'sidebar.sections.ossOverview.title',
        items: [
          { to: '/oss-dashboard', icon: <LayoutDashboard className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.ossOverview.items.overview' },
          { to: '/oss-dashboard', icon: <TrendingUp className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.ossOverview.items.executive' },
        ],
      },
      {
        titleKey: 'sidebar.sections.ossFinancial.title',
        items: [
          { to: '/oss-receitas-glosas', icon: <DollarSign className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.ossFinancial.items.revenue' },
          { to: '/oss-receitas-glosas', icon: <AlertTriangle className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.ossFinancial.items.glosas' },
          { to: '/oss-receitas-glosas', icon: <Calculator className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.ossFinancial.items.roi' },
        ],
      },
      {
        titleKey: 'sidebar.sections.ossCompliance.title',
        items: [
          { to: '/oss-compliance-risco', icon: <Shield className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.ossCompliance.items.compliance' },
          { to: '/oss-compliance-risco', icon: <FileText className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.ossCompliance.items.audesp' },
          { to: '/oss-compliance-risco', icon: <CheckCircle className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.ossCompliance.items.transparency' },
          { to: '/oss-compliance-risco', icon: <Database className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.ossCompliance.items.lgpd' },
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
          { to: '/hospitals-access', icon: <Users className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.ossManagement.items.contracts' },
          { to: '/ai-insights', icon: <TrendingUp className="h-5 w-5 mr-3" />, labelKey: 'sidebar.sections.ossManagement.items.nps' },
        ],
      },
    ];
EOF

echo "✅ Mudanças preparadas!"
echo ""
echo "📋 INSTRUÇÕES MANUAIS NECESSÁRIAS:"
echo "=================================="
echo ""
echo "1. Abra o arquivo: src/components/layout/Sidebar.tsx"
echo ""
echo "2. Adicione os imports que faltam no topo (se necessário):"
echo "   import { AlertTriangle } from 'lucide-react';"
echo ""
echo "3. Adicione as seções OSS após hospitalSections (linha ~350):"
echo "   Cole o conteúdo do arquivo /tmp/sidebar_oss_sections.txt"
echo ""
echo "4. Adicione a condição OSS na função getMenuItemsByRole (linha ~460):"
echo "   if (userRole === 'oss') {"
echo "     sections.push(...ossSections);"
echo "   }"
echo ""
echo "5. Adicione 'oss' no roleLabelMap (linha ~485):"
echo "   oss: 'navbar.roles.oss',"
echo ""
echo "6. Adicione as traduções do arquivo:"
echo "   src/modules/oss/docs/sidebar-translations.json"
echo "   nos arquivos de tradução em src/locales/[idioma]/translation.json"
echo ""
echo "=================================="
echo "🎯 Após aplicar as mudanças, reinicie o servidor!"
