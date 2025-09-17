import React, { Suspense } from "react";
import "./i18n";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Removed custom translation providers in favor of react-i18next global init
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
import QualityOfLifePage from "./pages/QualityOfLifePage";
import PatientsPage from "./pages/PatientsPage";
import ProtocolsPage from "./pages/ProtocolsPage";
import PopulationPage from "./pages/PopulationPage";
import EpidemiologyPage from "./pages/EpidemiologyPage";
import ResourcesPage from "./pages/ResourcesPage";
import QrAnaAtivoPage from "./pages/QrAnaAtivoPage";
import IntelligentReading from "./pages/IntelligentReading";
import ExecutiveDashboard from "./pages/ExecutiveDashboard";
import OperationalDashboard from "./pages/OperationalDashboard";
import MonitoramentoAPSPage from './pages/MonitoramentoAPSPage';
import ControleJudicializacaoPage from './pages/ControleJudicializacaoPage';
import CapacitacaoGestoresPage from './pages/CapacitacaoGestoresPage';
import TransicaoGestaoPage from './pages/TransicaoGestaoPage';
import DemoPage from "./pages/DemoPage";
import HelpPage from "./pages/HelpPage";
import SupportPage from "./pages/SupportPage";
import DocumentationPage from "./pages/DocumentationPage";
import EpidemicAlerts from "./pages/EpidemicAlerts";
import AuthGuard from "./components/auth/AuthGuard";
import AdminPanel from "./pages/AdminPanel";
import Login from "./pages/Login";
import GestaoOrcamentariaPage from "./pages/GestaoOrcamentariaPage";
import SimuladorIEDPage from "./pages/SimuladorIEDPage";
import IndicadoresDesempenhoPage from "./pages/IndicadoresDesempenhoPage";
import GovernancaDadosPage from "./pages/GovernancaDadosPage";
import ComissoesCIRPage from "./pages/ComissoesCIRPage";
import TelemedicinePatient from "./pages/TelemedicinePatient";
import HospitalsAccess from "./pages/HospitalsAccess";
import PactuacaoRegionalPage from "./pages/PactuacaoRegionalPage";
import TerritorializacaoPage from "./pages/TerritorializacaoPage";
import AIInsightsPage from './pages/AIInsightsPage';
import FaturamentoSUSPage from './pages/FaturamentoSUSPage';
import TISSTUSSPage from './pages/TISSTUSSPage';
import APACOncologiaPage from './pages/APACOncologiaPage';
import RNDSDATASUSPage from './pages/RNDSDATASUSPage';
import ConformidadeLGPDPage from './pages/ConformidadeLGPDPage';
import ProntuarioDigitalPage from './pages/ProntuarioDigitalPage';
import GestaoClinicaPage from './pages/GestaoClinicaPage';
import CentroCircurgicoPage from './pages/CentroCircurgicoPage';
import UTITerapiaIntensivaPage from './pages/UTITerapiaIntensivaPage';
import IndicadoresQualidadePage from './pages/IndicadoresQualidadePage';
import DashboardFinanceiroPage from './pages/DashboardFinanceiroPage';
import RelatoriosAnalyticsPage from './pages/RelatoriosAnalyticsPage';
import AnalisesLaboratoriaisPage from './pages/AnalisesLaboratoriaisPage';
import GestaoFarmaceuticaPage from './pages/GestaoFarmaceuticaPage';
import AIAnalyticsPage from './pages/AIAnalyticsPage';
import SecurityDashboardPage from './pages/SecurityDashboardPage';
import IntegrationsDashboardPage from './pages/IntegrationsDashboardPage';
import IntegracoesTecnicasPage from "./pages/IntegracoesTecnicasPage";
import DiabetesCarePage from "./pages/DiabetesCarePage";
import OsteoporosisCarePage from "./pages/OsteoporosisCarePage";
import ErectileDysfunctionPage from "./pages/ErectileDysfunctionPage";
import GlucoseMonitoringPage from "./pages/GlucoseMonitoringPage";
import NeurologyCarePage from "./pages/NeurologyCarePage";
import VisionCarePage from "./pages/VisionCarePage";
import HearingCarePage from "./pages/HearingCarePage";
import PrefeituraDashboard from "./pages/PrefeituraDashboard";
import DashboardRedirect from "./components/DashboardRedirect";
import IntegracaoERPPage from "./pages/IntegracaoERPPage";
import PhilipsTasyIntegrationPage from "./pages/PhilipsTasyIntegrationPage";

const queryClient = new QueryClient();

// No authentication required - direct access to all routes
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  return <AuthGuard>{children}</AuthGuard>;
};

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <AuthProvider>
            <ProfileAccessProvider>
              <BrowserRouter>
                <div>
                  <Toaster />
                  <Sonner />
                  <PWAInstallPrompt />
                  <ServiceWorkerManager />
                  <Routes>
                    <Route path="/" element={<PublicRoute><Index /></PublicRoute>} />
                    <Route path="/public-health-landing" element={<PublicRoute><Index /></PublicRoute>} />
                    <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
                    <Route path="/admin" element={<PublicRoute><AdminPanel /></PublicRoute>} />
                    <Route path="/dashboard-redirect" element={<ProtectedRoute><DashboardRedirect /></ProtectedRoute>} />
                    <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                    <Route path="/prefeitura-dashboard" element={<ProtectedRoute><PrefeituraDashboard /></ProtectedRoute>} />
                    <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                    <Route path="/records" element={<ProtectedRoute><Records /></ProtectedRoute>} />
                    <Route path="/medications" element={<ProtectedRoute><Medications /></ProtectedRoute>} />
                    <Route path="/appointments" element={<ProtectedRoute><Appointments /></ProtectedRoute>} />
                    <Route path="/metrics" element={<ProtectedRoute><Metrics /></ProtectedRoute>} />
                    <Route path="/access" element={<ProtectedRoute><Access /></ProtectedRoute>} />
                    <Route path="/emergency" element={<ProtectedRoute><Emergency /></ProtectedRoute>} />
                    <Route path="/labexams" element={<ProtectedRoute><LabExams /></ProtectedRoute>} />
                    <Route path="/lab-exams" element={<ProtectedRoute><LabExams /></ProtectedRoute>} />
                    <Route path="/genetic-data" element={<ProtectedRoute><GeneticDataPage /></ProtectedRoute>} />
                    <Route path="/quality-of-life" element={<ProtectedRoute><QualityOfLifePage /></ProtectedRoute>} />
                    <Route path="/help" element={<ProtectedRoute><HelpPage /></ProtectedRoute>} />
                    <Route path="/support" element={<ProtectedRoute><SupportPage /></ProtectedRoute>} />
                    <Route path="/manage-access" element={<ProtectedRoute><ManageAccessPage /></ProtectedRoute>} />
                    <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
                    <Route path="/technical-details" element={<ProtectedRoute><TechnicalDetailsPage /></ProtectedRoute>} />
                    <Route path="/qr-ana-ativo" element={<ProtectedRoute><QrAnaAtivoPage /></ProtectedRoute>} />
                    <Route path="/intelligent-reading" element={<ProtectedRoute><IntelligentReading /></ProtectedRoute>} />
                    <Route path="/executive-dashboard" element={<ProtectedRoute><ExecutiveDashboard /></ProtectedRoute>} />
                    <Route path="/operational-dashboard" element={<ProtectedRoute><OperationalDashboard /></ProtectedRoute>} />
                    <Route path="/patients" element={<ProtectedRoute><PatientsPage /></ProtectedRoute>} />
                    <Route path="/protocols" element={<ProtectedRoute><ProtocolsPage /></ProtectedRoute>} />
                    <Route path="/population" element={<ProtectedRoute><PopulationPage /></ProtectedRoute>} />
                    <Route path="/epidemiology" element={<ProtectedRoute><EpidemiologyPage /></ProtectedRoute>} />
                    <Route path="/resources" element={<ProtectedRoute><ResourcesPage /></ProtectedRoute>} />
                    <Route path="/epidemic-alerts" element={<ProtectedRoute><EpidemicAlerts /></ProtectedRoute>} />
                    <Route path="/monitoramento-aps" element={<ProtectedRoute><MonitoramentoAPSPage /></ProtectedRoute>} />
                    <Route path="/controle-judicializacao" element={<ProtectedRoute><ControleJudicializacaoPage /></ProtectedRoute>} />
                    <Route path="/capacitacao-gestores" element={<ProtectedRoute><CapacitacaoGestoresPage /></ProtectedRoute>} />
                    <Route path="/transicao-gestao" element={<ProtectedRoute><TransicaoGestaoPage /></ProtectedRoute>} />
                    <Route path="/gestao-orcamentaria" element={<ProtectedRoute><GestaoOrcamentariaPage /></ProtectedRoute>} />
                    <Route path="/simulador-ied" element={<ProtectedRoute><SimuladorIEDPage /></ProtectedRoute>} />
                    <Route path="/indicadores-desempenho" element={<ProtectedRoute><IndicadoresDesempenhoPage /></ProtectedRoute>} />
                    <Route path="/governanca-dados" element={<ProtectedRoute><GovernancaDadosPage /></ProtectedRoute>} />
                    <Route path="/comissoes-cir" element={<ProtectedRoute><ComissoesCIRPage /></ProtectedRoute>} />
                    <Route path="/hospitals-access" element={<ProtectedRoute><HospitalsAccess /></ProtectedRoute>} />
                    <Route path="/pactuacao-regional" element={<ProtectedRoute><PactuacaoRegionalPage /></ProtectedRoute>} />
                    <Route path="/territorializacao" element={<ProtectedRoute><TerritorializacaoPage /></ProtectedRoute>} />
                    <Route path="/ai-insights" element={<ProtectedRoute><AIInsightsPage /></ProtectedRoute>} />
                    <Route path="/faturamento-sus" element={<ProtectedRoute><FaturamentoSUSPage /></ProtectedRoute>} />
                    <Route path="/tiss-tuss" element={<ProtectedRoute><TISSTUSSPage /></ProtectedRoute>} />
                    <Route path="/apac-oncologia" element={<ProtectedRoute><APACOncologiaPage /></ProtectedRoute>} />
                    <Route path="/rnds-datasus" element={<ProtectedRoute><RNDSDATASUSPage /></ProtectedRoute>} />
                    <Route path="/conformidade-lgpd" element={<ProtectedRoute><ConformidadeLGPDPage /></ProtectedRoute>} />
                    <Route path="/prontuario-digital" element={<ProtectedRoute><ProntuarioDigitalPage /></ProtectedRoute>} />
                    <Route path="/gestao-clinica" element={<ProtectedRoute><GestaoClinicaPage /></ProtectedRoute>} />
                    <Route path="/centro-cirurgico" element={<ProtectedRoute><CentroCircurgicoPage /></ProtectedRoute>} />
                    <Route path="/uti-terapia-intensiva" element={<ProtectedRoute><UTITerapiaIntensivaPage /></ProtectedRoute>} />
                    <Route path="/indicadores-qualidade" element={<ProtectedRoute><IndicadoresQualidadePage /></ProtectedRoute>} />
                    <Route path="/dashboard-financeiro" element={<ProtectedRoute><DashboardFinanceiroPage /></ProtectedRoute>} />
                    <Route path="/relatorios-analytics" element={<ProtectedRoute><RelatoriosAnalyticsPage /></ProtectedRoute>} />
                    <Route path="/analises-laboratoriais" element={<ProtectedRoute><AnalisesLaboratoriaisPage /></ProtectedRoute>} />
                    <Route path="/gestao-farmaceutica" element={<ProtectedRoute><GestaoFarmaceuticaPage /></ProtectedRoute>} />
                    <Route path="/ai-analytics" element={<ProtectedRoute><AIAnalyticsPage /></ProtectedRoute>} />
                    <Route path="/security-dashboard" element={<ProtectedRoute><SecurityDashboardPage /></ProtectedRoute>} />
                    <Route path="/integrations-dashboard" element={<ProtectedRoute><IntegrationsDashboardPage /></ProtectedRoute>} />
                    <Route path="/integracoes-tecnicas" element={<ProtectedRoute><IntegracoesTecnicasPage /></ProtectedRoute>} />
                    <Route path="/integracao-erp" element={<ProtectedRoute><IntegracaoERPPage /></ProtectedRoute>} />
                    <Route path="/philips-tasy-integration" element={<ProtectedRoute><PhilipsTasyIntegrationPage /></ProtectedRoute>} />
                    <Route path="/diabetes-care" element={<ProtectedRoute><DiabetesCarePage /></ProtectedRoute>} />
                    <Route path="/osteoporosis-care" element={<ProtectedRoute><OsteoporosisCarePage /></ProtectedRoute>} />
                    <Route path="/erectile-dysfunction" element={<ProtectedRoute><ErectileDysfunctionPage /></ProtectedRoute>} />
                    <Route path="/glucose-monitoring" element={<ProtectedRoute><GlucoseMonitoringPage /></ProtectedRoute>} />
                    <Route path="/neurology-care" element={<ProtectedRoute><NeurologyCarePage /></ProtectedRoute>} />
                    <Route path="/vision-care" element={<ProtectedRoute><VisionCarePage /></ProtectedRoute>} />
                    <Route path="/hearing-care" element={<ProtectedRoute><HearingCarePage /></ProtectedRoute>} />
                    <Route path="/telemedicine/patient/:sessionId" element={<PublicRoute><TelemedicinePatient /></PublicRoute>} />
                    <Route path="/demo" element={<ProtectedRoute><DemoPage /></ProtectedRoute>} />
                    <Route path="/documentation" element={<ProtectedRoute><DocumentationPage /></ProtectedRoute>} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </div>
              </BrowserRouter>
            </ProfileAccessProvider>
          </AuthProvider>
        </Suspense>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;