# Mudanças Necessárias no Sidebar.tsx para OSS

## 1. Adicionar imports no topo do arquivo
```typescript
import { FileText, AlertTriangle, Calculator } from 'lucide-react';
```

## 2. Adicionar as seções OSS após hospitalSections (aproximadamente linha 350)

```typescript
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
```

## 3. Adicionar condição para OSS na função getMenuItemsByRole (aproximadamente linha 460)

```typescript
    if (userRole === 'oss') {
      sections.push(...ossSections);
    }
```

Adicionar APÓS:
```typescript
    if (userRole === 'gestor') {
      sections.push(...managerSections);
    }
```

## 4. Adicionar OSS no roleLabelMap (aproximadamente linha 485)

```typescript
  const roleLabelMap: Record<string, string> = {
    gestor: 'navbar.roles.manager',
    hospital: 'navbar.roles.hospital',
    oss: 'navbar.roles.oss',  // <-- ADICIONAR ESTA LINHA
    laboratorio: 'navbar.roles.laboratory',
    medico: 'navbar.roles.doctor',
    paciente: 'navbar.roles.patient',
  };
```

## Localização das mudanças:
- **Imports**: Linha 1-50 (adicionar os ícones que faltam)
- **ossSections**: Adicionar após linha 350 (depois de hospitalSections)
- **Condição OSS**: Adicionar na linha ~460 (na função getMenuItemsByRole)
- **roleLabelMap**: Adicionar na linha ~485
