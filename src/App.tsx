import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
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
import IntegrationsDashboard from "./pages/IntegrationsDashboard";
import AIAnalyticsDashboard from "./pages/AIAnalyticsDashboard";
import SecurityDashboard from "./pages/SecurityDashboard";
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
        <AuthProvider>
          <ProfileAccessProvider>
            <LanguageProvider>
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
                    <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
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
                    <Route path="/integrations-dashboard" element={<ProtectedRoute><IntegrationsDashboard /></ProtectedRoute>} />
                    <Route path="/ai-analytics" element={<ProtectedRoute><AIAnalyticsDashboard /></ProtectedRoute>} />
                    <Route path="/security-dashboard" element={<ProtectedRoute><SecurityDashboard /></ProtectedRoute>} />
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
                    <Route path="/demo" element={<ProtectedRoute><DemoPage /></ProtectedRoute>} />
                    <Route path="/documentation" element={<ProtectedRoute><DocumentationPage /></ProtectedRoute>} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </div>
              </BrowserRouter>
            </LanguageProvider>
          </ProfileAccessProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;