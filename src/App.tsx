import React, { Suspense } from "react";
import "./i18n";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import MainLayout from "./components/layout/MainLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProfileAccessProvider } from "@/contexts/ProfileAccessContext";
import { PWAInstallPrompt } from "./components/pwa/PWAInstallPrompt";
import { ServiceWorkerManager } from "./components/pwa/ServiceWorkerManager";
import ErrorBoundary from "./components/ErrorBoundary";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Records from "./pages/Records";
import Medications from "./pages/Medications";
import Access from "./pages/Access";
import Metrics from "./pages/Metrics";
import Appointments from "./pages/Appointments";
import Emergency from "./pages/Emergency";
import LabExams from "./pages/LabExams";
import TechnicalDetailsPage from "./pages/TechnicalDetails";
import GeneticDataPage from "./pages/GeneticData";
import SettingsPage from "./pages/SettingsPage";
import ManageAccessPage from "./pages/ManageAccessPage";
import PatientsPage from "./pages/PatientsPage";
import ProtocolsPage from "./pages/ProtocolsPage";
import PopulationPage from "./pages/PopulationPage";
import EpidemiologyPage from "./pages/EpidemiologyPage";
import ResourcesPage from "./pages/ResourcesPage";
import IntelligentReading from "./pages/IntelligentReading";
import ExecutiveDashboard from "./pages/ExecutiveDashboard";
import OperationalDashboard from "./pages/OperationalDashboard";
import MonitoramentoAPSPage from "./pages/MonitoramentoAPSPage";
import OSSManualDescritivo from "./pages/OSSManualDescritivo";
import QualityOfLifePage from "./pages/QualityOfLifePage";
import QrAnaAtivoPage from "./pages/QrAnaAtivoPage";
import ControleJudicializacaoPage from "./pages/ControleJudicializacaoPage";
import CapacitacaoGestoresPage from "./pages/CapacitacaoGestoresPage";
import TransicaoGestaoPage from "./pages/TransicaoGestaoPage";
import DemoPage from "./pages/DemoPage";
import HelpPage from "./pages/HelpPage";
import SupportPage from "./pages/SupportPage";
import DocumentationPage from "./pages/DocumentationPage";
import EpidemicAlerts from "./pages/EpidemicAlerts";
import AuthGuard from "./components/auth/AuthGuard";
import AdminPanel from "./pages/AdminPanel";
import Login from "./pages/Login";
import { ProtectedRoute as TOTPProtectedRoute } from "./components/auth/ProtectedRoute";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { QRCodeGenerator } from "./components/auth/QRCodeGenerator";
import AccessLogsPage from "./pages/AccessLogsPage";
import GestaoOrcamentariaPage from "./pages/GestaoOrcamentariaPage";
import SimuladorIEDPage from "./pages/SimuladorIEDPage";
import IndicadoresDesempenhoPage from "./pages/IndicadoresDesempenhoPage";
import GovernancaDadosPage from "./pages/GovernancaDadosPage";
import ComissoesCIRPage from "./pages/ComissoesCIRPage";
import TelemedicinePatient from "./pages/TelemedicinePatient";
import HospitalsAccess from "./pages/HospitalsAccess";
import PactuacaoRegionalPage from "./pages/PactuacaoRegionalPage";
import TerritorializacaoPage from "./pages/TerritorializacaoPage";
import AIInsightsPage from "./pages/AIInsightsPage";
import FaturamentoSUSPage from "./pages/FaturamentoSUSPage";
import TISSTUSSPage from "./pages/TISSTUSSPage";
import APACOncologiaPage from "./pages/APACOncologiaPage";
import RNDSDATASUSPage from "./pages/RNDSDATASUSPage";
import ConformidadeLGPDPage from "./pages/ConformidadeLGPDPage";
import ProntuarioDigitalPage from "./pages/ProntuarioDigitalPage";
import GestaoClinicaPage from "./pages/GestaoClinicaPage";
import CentroCircurgicoPage from "./pages/CentroCircurgicoPage";
import UTITerapiaIntensivaPage from "./pages/UTITerapiaIntensivaPage";
import IndicadoresQualidadePage from "./pages/IndicadoresQualidadePage";
import DashboardFinanceiroPage from "./pages/DashboardFinanceiroPage";
import RelatoriosAnalyticsPage from "./pages/RelatoriosAnalyticsPage";
import AnalisesLaboratoriaisPage from "./pages/AnalisesLaboratoriaisPage";
import GestaoFarmaceuticaPage from "./pages/GestaoFarmaceuticaPage";
import AIAnalyticsPage from "./pages/AIAnalyticsPage";
import HospitalDashboardDetalhadoPage from "./pages/HospitalDashboardDetalhadoPage";
import SistemaHISHMISPage from "./pages/SistemaHISHMISPage";
import FaturamentoSUSTISSTUSSPage from "./pages/FaturamentoSUSTISSTUSSPage";
import AIOraclePage from "./pages/AIOraclePage";
import PiracicabaHealthNews from "./pages/PiracicabaHealthNews";
import SecurityDashboardPage from "./pages/SecurityDashboardPage";
import IntegrationsDashboardPage from "./pages/IntegrationsDashboardPage";
import IntegracoesTecnicasPage from "./pages/IntegracoesTecnicasPage";
import DiabetesCarePage from "./pages/DiabetesCarePage";
import OsteoporosisCarePage from "./pages/OsteoporosisCarePage";
import OSSSatisfacaoUsuarioPage from "./pages/OSSSatisfacaoUsuarioPage";
import OSSDashboard from "./pages/OSSDashboard";
import OSSVisionExecutivePage from "./pages/OSSVisionExecutivePage";
import OSSReceitasPage from "./pages/OSSReceitasPage";
import OSSReceitasGlosas from "./pages/OSSReceitasGlosas";
import DashboardRedirect from "./components/DashboardRedirect";
import OSSROIRentabilidade from "./pages/OSSROIRentabilidade";
import OSSComplianceRisco from "./pages/OSSComplianceRisco";
import OSSAudespPage from "./pages/OSSAudespPage";
import OSSTransparenciaPage from "./pages/OSSTransparenciaPage";
import OSSLgpdPage from "./pages/OSSLgpdPage";
import OSSMetasDesempenho from "./pages/OSSMetasDesempenho";
import OSSMedidasDesempenhoPage from "./pages/OSSMedidasDesempenhoPage";
import OSSCompliancePage from "./pages/OSSCompliancePage";
import OSSOracleAI from "./pages/OSSOracleAI";
import OSSGlosasDashboard from "./pages/OSSGlosasDashboard";
import OSSPredicaoPage from "./pages/OSSPredicaoPage";
import OSSSimuladorDono from "./pages/OSSSimuladorDono";
import OSSControleOPME from "./pages/OSSControleOPME";
import OSSNoticiasNacionais from "./pages/OSSNoticiasNacionais";
import OSSNoticiasClientes from "./pages/OSSNoticiasClientes";
import OSSContratosAditivosPage from "./pages/OSSContratosAditivosPage";
import IntegracaoERPPage from "./pages/IntegracaoERPPage";
import PrefeituraDashboard from "./pages/PrefeituraDashboard";
import PhilipsTasyIntegrationPage from "./pages/PhilipsTasyIntegrationPage";
import ESUSIntegrationPage from "./pages/ESUSIntegrationPage";
import GlucoseMonitoringPage from "./pages/GlucoseMonitoringPage";
import NeurologyCarePage from "./pages/NeurologyCarePage";
import VisionCarePage from "./pages/VisionCarePage";
import HearingCarePage from "./pages/HearingCarePage";
import LaboratoriosOverviewPage from "./pages/LaboratoriosOverviewPage";
import LaboratoriosOperacaoPage from "./pages/LaboratoriosOperacaoPage";
import LaboratoriosResultadosPage from "./pages/LaboratoriosResultadosPage";
import LaboratoriosIntegracoesPage from "./pages/LaboratoriosIntegracoesPage";
import LaboratoriosQualidadePage from "./pages/LaboratoriosQualidadePage";
import LaboratoriosAdministracaoPage from "./pages/LaboratoriosAdministracaoPage";
import LaboratoriosAnalyticsPage from "./pages/LaboratoriosAnalyticsPage";
import LaboratorioIntegrationDetailPage from "./pages/LaboratorioIntegrationDetailPage";
import TestPage from "./pages/TestPage";
import {
  AphAntiglosasPage,
  AphClinicaQualidadePage,
  AphCompliancePage,
  AphDashboardPage,
  AphDespachoRegulacaoPage,
  AphEducacaoContinuadaPage,
  AphFinanceiroPage,
  AphFrotaTelemetriaPage,
  AphGovernancaLgpdPage,
  AphHeatmapCoberturaPage,
  AphInsightsIAPage,
  AphCatalogoPage,
  AphIntegracoesPage,
  AphManutencaoPreditivaPage,
  AphMapaAmbulanciasPage,
  AphMonitoramentoCamerasPage,
  AphOraculoPage,
  AphPlaybooksOperacionaisPage,
  AphPortalContratantePage,
  AphPreAuditoriaPage,
  AphProtocolosPage,
  AphRelatoriosPage,
  AphStorytellingPage
} from "./pages/APH";

import { CustomizationProvider } from "@/contexts/CustomizationContext";

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={new QueryClient()}>
      <TooltipProvider>
        <Suspense fallback={null}>
          <CustomizationProvider>
            <AuthProvider>
              <ProfileAccessProvider>
              <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                <div>
                  <Routes>
                    <Route
                      path="/login"
                      element={
                        <PublicRoute>
                          <Login />
                        </PublicRoute>
                      }
                    />
                    <Route
                      path="/qrcodenovo"
                      element={
                        <PublicRoute>
                          <QRCodeGenerator />
                        </PublicRoute>
                      }
                    />
                    <Route
                      path="/access-logs"
                      element={
                        <PublicRoute>
                          <AccessLogsPage />
                        </PublicRoute>
                      }
                    />
                    <Route
                      path="/admin"
                      element={
                        <PublicRoute>
                          <AdminPanel />
                        </PublicRoute>
                      }
                    />
                    <Route
                      path="/telemedicine/patient/:sessionId"
                      element={
                        <PublicRoute>
                          <TelemedicinePatient />
                        </PublicRoute>
                      }
                    />

                    {/* Landing page pública */}
                    <Route index element={<Index />} />
                    <Route path="public-health-landing" element={<Index />} />

                    <Route
                      element={
                        <TOTPProtectedRoute>
                          <ProtectedRoute>
                            <MainLayout />
                          </ProtectedRoute>
                        </TOTPProtectedRoute>
                      }
                    >
                      <Route
                        path="/dashboard-redirect"
                        element={<DashboardRedirect />}
                      />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/aph-dashboard" element={<AphDashboardPage />} />
                      <Route path="/aph-mapa-ambulancias" element={<AphMapaAmbulanciasPage />} />
                      <Route path="/aph-insights-ia" element={<AphInsightsIAPage />} />
                      <Route path="/aph-oraculo" element={<AphOraculoPage />} />
                      <Route path="/aph-catalogo" element={<AphCatalogoPage />} />
                      <Route
                        path="/hospital-dashboard-detalhado"
                        element={<HospitalDashboardDetalhadoPage />}
                      />
                      <Route
                        path="/sistema-his-hmis"
                        element={<SistemaHISHMISPage />}
                      />
                      <Route
                        path="/prefeitura-dashboard"
                        element={<PrefeituraDashboard />}
                      />
                      <Route path="/oss-dashboard" element={<OSSDashboard />} />
                      <Route
                        path="/oss-visao-executiva"
                        element={<OSSVisionExecutivePage />}
                      />
                      <Route
                        path="/oss-receitas"
                        element={<OSSReceitasPage />}
                      />
                      <Route
                        path="/oss-receitas-glosas"
                        element={<OSSReceitasGlosas />}
                      />
                      <Route
                        path="/oss-roi-rentabilidade"
                        element={<OSSROIRentabilidade />}
                      />
                      <Route
                        path="/oss-compliance-risco"
                        element={<OSSComplianceRisco />}
                      />
                      <Route path="/oss-audesp" element={<OSSAudespPage />} />
                      <Route
                        path="/oss-transparencia"
                        element={<OSSTransparenciaPage />}
                      />
                      <Route path="/oss-lgpd" element={<OSSLgpdPage />} />
                      <Route
                        path="/oss-metas-desempenho"
                        element={<OSSMetasDesempenho />}
                      />
                      <Route
                        path="/oss-compliance"
                        element={<OSSCompliancePage />}
                      />
                      <Route path="/oss-oracle-ai" element={<OSSOracleAI />} />
                      <Route
                        path="/oss-glosas"
                        element={<OSSGlosasDashboard />}
                      />
                      <Route
                        path="/oss-predicao"
                        element={<OSSPredicaoPage />}
                      />
                      <Route
                        path="/oss-simulador"
                        element={<OSSSimuladorDono />}
                      />
                      <Route
                        path="/oss-controle-opme"
                        element={<OSSControleOPME />}
                      />
                      <Route
                        path="/oss-controle-glosa-opme"
                        element={<OSSControleOPME />}
                      />
                      <Route
                        path="/oss-noticias"
                        element={<OSSNoticiasNacionais />}
                      />
                      <Route
                        path="/oss-noticias-clientes"
                        element={<OSSNoticiasClientes />}
                      />
                      <Route
                        path="/oss-manual-descritivo"
                        element={<OSSManualDescritivo />}
                      />
                      <Route
                        path="/oss-contratos-aditivos"
                        element={<OSSContratosAditivosPage />}
                      />
                      <Route
                        path="/oss-medidas-desempenho"
                        element={<OSSMedidasDesempenhoPage />}
                      />
                      <Route
                        path="/oss-satisfacao-usuario"
                        element={<OSSSatisfacaoUsuarioPage />}
                      />

                      <Route path="/profile" element={<Profile />} />
                      <Route path="/records" element={<Records />} />
                      <Route path="/medications" element={<Medications />} />
                      <Route path="/appointments" element={<Appointments />} />
                      <Route path="/metrics" element={<Metrics />} />
                      <Route path="/access" element={<Access />} />
                      <Route path="/emergency" element={<Emergency />} />
                      <Route path="/labexams" element={<LabExams />} />
                      <Route path="/lab-exams" element={<LabExams />} />
                      <Route
                        path="/genetic-data"
                        element={<GeneticDataPage />}
                      />
                      <Route
                        path="/quality-of-life"
                        element={<QualityOfLifePage />}
                      />
                      <Route path="/help" element={<HelpPage />} />
                      <Route path="/support" element={<SupportPage />} />
                      <Route
                        path="/manage-access"
                        element={<ManageAccessPage />}
                      />
                      <Route path="/settings" element={<SettingsPage />} />
                      <Route
                        path="/technical-details"
                        element={<TechnicalDetailsPage />}
                      />
                      <Route
                        path="/qr-ana-ativo"
                        element={<QrAnaAtivoPage />}
                      />
                      <Route
                        path="/intelligent-reading"
                        element={<IntelligentReading />}
                      />
                      <Route
                        path="/executive-dashboard"
                        element={<ExecutiveDashboard />}
                      />
                      <Route
                        path="/operational-dashboard"
                        element={<OperationalDashboard />}
                      />
                      <Route path="/patients" element={<PatientsPage />} />
                      <Route path="/protocols" element={<ProtocolsPage />} />
                      <Route path="/population" element={<PopulationPage />} />
                      <Route
                        path="/epidemiology"
                        element={<EpidemiologyPage />}
                      />
                      <Route path="/resources" element={<ResourcesPage />} />
                      <Route
                        path="/epidemic-alerts"
                        element={<EpidemicAlerts />}
                      />
                      <Route
                        path="/monitoramento-aps"
                        element={<MonitoramentoAPSPage />}
                      />
                      <Route
                        path="/controle-judicializacao"
                        element={<ControleJudicializacaoPage />}
                      />
                      <Route
                        path="/capacitacao-gestores"
                        element={<CapacitacaoGestoresPage />}
                      />
                      <Route
                        path="/transicao-gestao"
                        element={<TransicaoGestaoPage />}
                      />
                      <Route
                        path="/gestao-orcamentaria"
                        element={<GestaoOrcamentariaPage />}
                      />
                      <Route
                        path="/simulador-ied"
                        element={<SimuladorIEDPage />}
                      />
                      <Route
                        path="/indicadores-desempenho"
                        element={<IndicadoresDesempenhoPage />}
                      />
                      <Route
                        path="/governanca-dados"
                        element={<GovernancaDadosPage />}
                      />
                      <Route
                        path="/comissoes-cir"
                        element={<ComissoesCIRPage />}
                      />
                      <Route
                        path="/hospitals-access"
                        element={<HospitalsAccess />}
                      />
                      <Route
                        path="/pactuacao-regional"
                        element={<PactuacaoRegionalPage />}
                      />
                      <Route
                        path="/territorializacao"
                        element={<TerritorializacaoPage />}
                      />
                      <Route path="/ai-insights" element={<AIInsightsPage />} />
                      <Route path="/oraculo-ia" element={<AIOraclePage />} />
                      <Route
                        path="/noticias-saude-piracicaba"
                        element={<PiracicabaHealthNews />}
                      />
                      <Route
                        path="/faturamento-sus"
                        element={<FaturamentoSUSPage />}
                      />
                      <Route path="/tiss-tuss" element={<TISSTUSSPage />} />
                      <Route
                        path="/apac-oncologia"
                        element={<APACOncologiaPage />}
                      />
                      <Route
                        path="/faturamento-sustiss-tuss"
                        element={<FaturamentoSUSTISSTUSSPage />}
                      />
                      <Route
                        path="/rnds-datasus"
                        element={<RNDSDATASUSPage />}
                      />
                      <Route
                        path="/conformidade-lgpd"
                        element={<ConformidadeLGPDPage />}
                      />
                      <Route
                        path="/prontuario-digital"
                        element={<ProntuarioDigitalPage />}
                      />
                      <Route
                        path="/gestao-clinica"
                        element={<GestaoClinicaPage />}
                      />
                      <Route
                        path="/centro-cirurgico"
                        element={<CentroCircurgicoPage />}
                      />
                      <Route
                        path="/uti-terapia-intensiva"
                        element={<UTITerapiaIntensivaPage />}
                      />
                      <Route
                        path="/indicadores-qualidade"
                        element={<IndicadoresQualidadePage />}
                      />
                      <Route
                        path="/dashboard-financeiro"
                        element={<DashboardFinanceiroPage />}
                      />
                      <Route
                        path="/relatorios-analytics"
                        element={<RelatoriosAnalyticsPage />}
                      />
                      <Route
                        path="/analises-laboratoriais"
                        element={<AnalisesLaboratoriaisPage />}
                      />
                      <Route
                        path="/gestao-farmaceutica"
                        element={<GestaoFarmaceuticaPage />}
                      />
                      <Route path="/insights-ia" element={<AIInsightsPage />} />
                      <Route
                        path="/ai-analytics"
                        element={<AIAnalyticsPage />}
                      />
                      <Route
                        path="/security-dashboard"
                        element={<SecurityDashboardPage />}
                      />
                      <Route
                        path="/integrations-dashboard"
                        element={<IntegrationsDashboardPage />}
                      />
                      <Route
                        path="/integracoes-tecnicas"
                        element={<IntegracoesTecnicasPage />}
                      />
                      <Route
                        path="/integracao-erp"
                        element={<IntegracaoERPPage />}
                      />
                      <Route
                        path="/aph-despacho-regulacao"
                        element={<AphDespachoRegulacaoPage />}
                      />
                      <Route
                        path="/aph-heatmap-cobertura"
                        element={<AphHeatmapCoberturaPage />}
                      />
                      <Route
                        path="/aph-playbooks-operacionais"
                        element={<AphPlaybooksOperacionaisPage />}
                      />
                      <Route
                        path="/aph-frota-telemetria"
                        element={<AphFrotaTelemetriaPage />}
                      />
                      <Route
                        path="/aph-manutencao-preditiva"
                        element={<AphManutencaoPreditivaPage />}
                      />
                      <Route
                        path="/aph-monitoramento-cameras"
                        element={<AphMonitoramentoCamerasPage />}
                      />
                      <Route
                        path="/aph-clinica-qualidade"
                        element={<AphClinicaQualidadePage />}
                      />
                      <Route
                        path="/aph-protocolos"
                        element={<AphProtocolosPage />}
                      />
                      <Route
                        path="/aph-educacao-continuada"
                        element={<AphEducacaoContinuadaPage />}
                      />
                      <Route
                        path="/aph-financeiro"
                        element={<AphFinanceiroPage />}
                      />
                      <Route
                        path="/aph-antiglosas"
                        element={<AphAntiglosasPage />}
                      />
                      <Route
                        path="/aph-pre-auditoria"
                        element={<AphPreAuditoriaPage />}
                      />
                      <Route
                        path="/aph-portal-contratante"
                        element={<AphPortalContratantePage />}
                      />
                      <Route
                        path="/aph-storytelling"
                        element={<AphStorytellingPage />}
                      />
                      <Route
                        path="/aph-relatorios"
                        element={<AphRelatoriosPage />}
                      />
                      <Route
                        path="/aph-governanca-lgpd"
                        element={<AphGovernancaLgpdPage />}
                      />
                      <Route
                        path="/aph-integracoes"
                        element={<AphIntegracoesPage />}
                      />
                      <Route
                        path="/aph-compliance"
                        element={<AphCompliancePage />}
                      />
                      <Route
                        path="/philips-tasy-integration"
                        element={<PhilipsTasyIntegrationPage />}
                      />
                      <Route
                        path="/esus-integration"
                        element={<ESUSIntegrationPage />}
                      />
                      <Route
                        path="/diabetes-care"
                        element={<DiabetesCarePage />}
                      />
                      <Route
                        path="/osteoporosis-care"
                        element={<OsteoporosisCarePage />}
                      />
                      <Route
                        path="/glucose-monitoring"
                        element={<GlucoseMonitoringPage />}
                      />
                      <Route
                        path="/neurology-care"
                        element={<NeurologyCarePage />}
                      />
                      <Route path="/vision-care" element={<VisionCarePage />} />
                      <Route
                        path="/hearing-care"
                        element={<HearingCarePage />}
                      />
                      <Route
                        path="/laboratorios/visao-geral"
                        element={<LaboratoriosOverviewPage />}
                      />
                      <Route
                        path="/laboratorios/operacao"
                        element={<LaboratoriosOperacaoPage />}
                      />
                      <Route
                        path="/laboratorios/resultados-laudos"
                        element={<LaboratoriosResultadosPage />}
                      />
                      <Route
                        path="/laboratorios/integracoes"
                        element={<LaboratoriosIntegracoesPage />}
                      />
                      <Route
                        path="/laboratorios/integracoes/:integrationId"
                        element={<LaboratorioIntegrationDetailPage />}
                      />
                      <Route
                        path="/laboratorios/qualidade-compliance"
                        element={<LaboratoriosQualidadePage />}
                      />
                      <Route
                        path="/laboratorios/analytics-kpis"
                        element={<LaboratoriosAnalyticsPage />}
                      />
                      <Route
                        path="/laboratorios/administracao"
                        element={<LaboratoriosAdministracaoPage />}
                      />
                      <Route path="/test" element={<TestPage />} />
                    </Route>

                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </div>
              </BrowserRouter>
            </ProfileAccessProvider>
          </AuthProvider>
          </CustomizationProvider>
        </Suspense>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
