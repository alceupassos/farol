# 📋 INSTRUÇÕES COMPLETAS PARA ADICIONAR O MENU OSS NO SIDEBAR

## ✅ O QUE PRECISA SER FEITO:

### NOVO — Controle de OPME
- Atualizar o item do menu para apontar para `/oss-controle-opme` (rótulo “Controle de OPME”).
- Fazer deploy com as traduções correspondentes (`ossControleOpme`).
- Manter a rota `/oss-controle-glosa-opme` disponível apenas como compatibilidade legada.

### 1. **ADICIONAR IMPORTS** (se necessário)
No arquivo `/src/components/layout/Sidebar.tsx`, verifique se tem o import:
```typescript
import { AlertTriangle } from 'lucide-react';
```

### 2. **ADICIONAR AS SEÇÕES OSS**
Adicione após `const hospitalSections` (aproximadamente linha 350):

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

### 3. **ADICIONAR CONDIÇÃO PARA OSS**
Na função `getMenuItemsByRole`, adicione após `if (userRole === 'gestor')`:

```typescript
if (userRole === 'oss') {
  sections.push(...ossSections);
}
```

### 4. **ADICIONAR OSS NO MAPEAMENTO DE ROLES**
No objeto `roleLabelMap`, adicione:

```typescript
const roleLabelMap: Record<string, string> = {
  gestor: 'navbar.roles.manager',
  hospital: 'navbar.roles.hospital',
  oss: 'navbar.roles.oss',  // <-- ADICIONAR
  laboratorio: 'navbar.roles.laboratory',
  medico: 'navbar.roles.doctor',
  paciente: 'navbar.roles.patient',
};
```

### 5. **ADICIONAR TRADUÇÕES**
No arquivo `/src/locales/pt/translation.json`, adicione dentro de `sidebar.sections`:

```json
"ossOverview": {
  "title": "VISÃO GERAL",
  "items": {
    "overview": "Dashboard Principal",
    "executive": "Dashboard Executivo"
  }
},
"ossFinancial": {
  "title": "OPERACIONAL FINANCEIRO",
  "items": {
    "revenue": "Receitas e Faturamento",
    "glosas": "Gestão de Glosas",
    "roi": "Simulador de ROI"
  }
},
"ossCompliance": {
  "title": "COMPLIANCE E RISCO",
  "items": {
    "compliance": "Matriz de Risco",
    "audesp": "Audesp",
    "transparency": "Transparência Ativa",
    "lgpd": "LGPD Compliance"
  }
},
"ossPerformance": {
  "title": "METAS E DESEMPENHO",
  "items": {
    "goals": "Metas Contratuais",
    "performance": "Indicadores de Desempenho",
    "actionPlans": "Planos de Ação",
    "benchmark": "Benchmark Regional"
  }
},
"ossIntegrations": {
  "title": "INTEGRAÇÕES",
  "items": {
    "datasus": "DATASUS/SUS",
    "tiss": "TISS/TUSS",
    "esus": "e-SUS"
  }
},
"ossAI": {
  "title": "INTELIGÊNCIA ARTIFICIAL",
  "items": {
    "oracle": "Oráculo IA",
    "simulator": "Simulador What-If",
    "predictions": "Análises Preditivas"
  }
},
"ossManagement": {
  "title": "GESTÃO CONTRATUAL",
  "items": {
    "contracts": "Contratos",
    "nps": "NPS Governamental"
  }
}
```

## 🎯 RESULTADO ESPERADO:

Após aplicar essas mudanças, o menu lateral do OSS terá:

1. **VISÃO GERAL**
   - Dashboard Principal
   - Dashboard Executivo

2. **OPERACIONAL FINANCEIRO**
   - Receitas e Faturamento
   - Gestão de Glosas
   - Simulador de ROI

3. **COMPLIANCE E RISCO**
   - Matriz de Risco
   - Audesp
   - Transparência Ativa
   - LGPD Compliance

4. **METAS E DESEMPENHO**
   - Metas Contratuais
   - Indicadores de Desempenho
   - Planos de Ação
   - Benchmark Regional

5. **INTEGRAÇÕES**
   - DATASUS/SUS
   - TISS/TUSS
   - e-SUS

6. **INTELIGÊNCIA ARTIFICIAL**
   - Oráculo IA
   - Simulador What-If
   - Análises Preditivas

7. **GESTÃO CONTRATUAL**
   - Contratos
   - NPS Governamental

## ⚡ APLICAÇÃO RÁPIDA:

1. Faça backup do arquivo original
2. Aplique as mudanças conforme indicado acima
3. Reinicie o servidor: `npm run dev`
4. Teste acessando com o perfil OSS

---

**IMPORTANTE:** Todas as rotas já estão configuradas no App.tsx e as páginas já foram criadas!
