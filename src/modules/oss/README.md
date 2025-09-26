# 📋 Módulo de Gestão Contratual/OSS - BHCL

## 🏢 Organização Social de Saúde
**Beneficência Hospitalar de Cesário Lange (BHCL)** — "OSS Cesário Lange"
- **CNPJ (matriz):** 50.351.626/0001-10
- **CNES (matriz):** 2082780
- **CEBAS/SAÚDE:** Vigente
- **Sede:** Av. São Paulo, 340, Vila Brasil, Cesário Lange–SP, CEP 18285-000

## 📁 Estrutura do Módulo

```
src/modules/oss/
├── components/           # Componentes React do módulo OSS
│   ├── cockpit/         # Dashboard executivo C-Level
│   ├── compliance/      # Audesp, Transparência, LGPD
│   ├── financial/       # Receitas, Glosas, Conciliação
│   ├── contracts/       # Gestão de contratos
│   └── analytics/       # KPIs e análises
├── services/            # Serviços e integrações
│   ├── datasus/        # APIs SUS (AIH, APAC, BPA)
│   ├── audesp/         # Integração Audesp
│   ├── tiss/           # TISS/TUSS
│   └── ai/             # Oráculo IA (Gemini)
├── hooks/              # Custom hooks
├── types/              # TypeScript types
├── utils/              # Utilitários
└── pages/              # Páginas do módulo

## 🎯 Funcionalidades Principais

### 1. Cockpit C-Level (Dashboard Executivo)
- 16 KPIs críticos com semáforo e metas
- Análise de glosas e recuperação
- Tempestividade Audesp
- NPS Governamental
- Heatmap de riscos

### 2. Gestão de Receitas e Glosas
- Funil de faturamento SUS
- Análise Pareto de motivos
- Simulador de ROI
- Reprocessamento AIH/APAC

### 3. Compliance e Risco
- Pré-validador Audesp
- Transparência ativa
- LGPD compliance
- Matriz de risco 5x5

### 4. Integrações
- SIH/SUS (AIH/SISAIH01)
- SIA/SUS (BPA/APAC)
- TISS/TUSS
- Audesp JSON
- Bancos (OFX/CSV)

### 5. Oráculo IA
- Análises preditivas
- Simulações what-if
- Recomendações automáticas
- Explicabilidade

## 📊 KPIs e Metas

| Indicador | Meta | Criticidade |
|-----------|------|------------|
| Tempestividade Audesp | 100% | Alta |
| Taxa de Glosa | <5% | Alta |
| Recuperação de Glosas | >70% | Alta |
| Rejeição AIH/APAC | <10% | Média |
| NPS Governamental | >8.0 | Média |
| Conciliação Bancária | 100% | Alta |

## 🔄 Status de Implementação

- [x] Estrutura base do módulo
- [ ] Modelos de dados
- [ ] APIs de integração
- [ ] Dashboard executivo
- [ ] Drill-downs especializados
- [ ] Oráculo IA
- [ ] Testes e validação

## 📚 Documentação Adicional

- [Especificação Técnica](./docs/SPEC.md)
- [APIs e Integrações](./docs/INTEGRATIONS.md)
- [Guia de Desenvolvimento](./docs/DEVELOPMENT.md)
- [Manual do Usuário](./docs/USER_GUIDE.md)
