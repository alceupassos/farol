# Mudanças Necessárias no App.tsx

## 1. Adicionar import do OSSDashboard
Adicione após a linha de import do PrefeituraDashboard (aproximadamente linha 91):
```typescript
import OSSDashboard from "./pages/OSSDashboard";
```

## 2. Adicionar a rota para o OSS Dashboard
Adicione dentro do componente Routes, após a rota do prefeitura-dashboard:
```typescript
<Route path="/oss-dashboard" element={<OSSDashboard />} />
```

## Localização exata:
- **Import**: Adicionar na linha 92, após `import PrefeituraDashboard from "./pages/PrefeituraDashboard";`
- **Route**: Adicionar após a rota `/prefeitura-dashboard` no componente Routes

## Exemplo completo:
```typescript
// Imports (linha ~91-92)
import PrefeituraDashboard from "./pages/PrefeituraDashboard";
import OSSDashboard from "./pages/OSSDashboard";

// Routes (dentro do componente Routes)
<Route path="/prefeitura-dashboard" element={<PrefeituraDashboard />} />
<Route path="/oss-dashboard" element={<OSSDashboard />} />
```

## Rotas adicionadas para Gestor Hospitalar
- `/hospital-dashboard-detalhado` → `HospitalDashboardDetalhadoPage`
- `/sistema-his-hmis` → `SistemaHISHMISPage`
- `/faturamento-sustiss-tuss` → `FaturamentoSUSTISSTUSSPage`
- `/insights-ia` → `AIInsightsPage`
- `/aph-dashboard` → `AphDashboardPage`
- `/aph-insights-ia` → `AphInsightsIAPage`
- `/aph-oraculo` → `AphOraculoPage`
- `/aph-catalogo` → `AphCatalogoPage`
- `/aph-despacho-regulacao` → `AphDespachoRegulacaoPage`
- `/aph-heatmap-cobertura` → `AphHeatmapCoberturaPage`
- `/aph-playbooks-operacionais` → `AphPlaybooksOperacionaisPage`
- `/aph-frota-telemetria` → `AphFrotaTelemetriaPage`
- `/aph-manutencao-preditiva` → `AphManutencaoPreditivaPage`
- `/aph-monitoramento-cameras` → `AphMonitoramentoCamerasPage`
- `/aph-clinica-qualidade` → `AphClinicaQualidadePage`
- `/aph-protocolos` → `AphProtocolosPage`
- `/aph-educacao-continuada` → `AphEducacaoContinuadaPage`
- `/aph-financeiro` → `AphFinanceiroPage`
- `/aph-antiglosas` → `AphAntiglosasPage`
- `/aph-pre-auditoria` → `AphPreAuditoriaPage`
- `/aph-portal-contratante` → `AphPortalContratantePage`
- `/aph-storytelling` → `AphStorytellingPage`
- `/aph-relatorios` → `AphRelatoriosPage`
- `/aph-governanca-lgpd` → `AphGovernancaLgpdPage`
- `/aph-integracoes` → `AphIntegracoesPage`
- `/aph-compliance` → `AphCompliancePage`
- `/oss-controle-opme` → `OSSControleOPME`
- `/oss-controle-glosa-opme` → `OSSControleOPME` *(alias legado para links existentes)*
