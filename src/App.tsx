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
import DemoPage from "./pages/DemoPage";
import HelpPage from "./pages/HelpPage";
import SupportPage from "./pages/SupportPage";
import DocumentationPage from "./pages/DocumentationPage";
import EpidemicAlerts from "./pages/EpidemicAlerts";
import { SiteAccessProvider } from "./contexts/SiteAccessContext";
import PreLoginGuard from "./components/auth/PreLoginGuard";
import SiteAccess from "./pages/SiteAccess";
import AdminPanel from "./pages/AdminPanel";

const queryClient = new QueryClient();

// No authentication required - direct access to all routes
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
        <SiteAccessProvider>
          <AuthProvider>
            <ProfileAccessProvider>
              <LanguageProvider>
              <TooltipProvider>
                <div>
                  <Toaster />
                  <Sonner />
                  <PWAInstallPrompt />
                  <ServiceWorkerManager />
                  <BrowserRouter>
                    <PreLoginGuard>
                      <Routes>
                        <Route path="/site-access" element={<SiteAccess />} />
                        <Route path="/admin" element={<AdminPanel />} />
                        <Route path="/" element={<Index />} />
                        <Route path="/demo" element={<DemoPage />} />
                        <Route path="/documentation" element={<DocumentationPage />} />
                        <Route path="/dashboard" element={<PublicRoute><Dashboard /></PublicRoute>} />
                        <Route path="/profile" element={<PublicRoute><Profile /></PublicRoute>} />
                        <Route path="/records" element={<PublicRoute><Records /></PublicRoute>} />
                        <Route path="/medications" element={<PublicRoute><Medications /></PublicRoute>} />
                        <Route path="/appointments" element={<PublicRoute><Appointments /></PublicRoute>} />
                        <Route path="/metrics" element={<PublicRoute><Metrics /></PublicRoute>} />
                        <Route path="/access" element={<PublicRoute><Access /></PublicRoute>} />
                        <Route path="/emergency" element={<PublicRoute><Emergency /></PublicRoute>} />
                        <Route path="/labexams" element={<PublicRoute><LabExams /></PublicRoute>} />
                        <Route path="/genetic-data" element={<PublicRoute><GeneticDataPage /></PublicRoute>} />
                        <Route path="/quality-of-life" element={<PublicRoute><QualityOfLifePage /></PublicRoute>} />
                        <Route path="/help" element={<PublicRoute><HelpPage /></PublicRoute>} />
                        <Route path="/support" element={<PublicRoute><SupportPage /></PublicRoute>} />
                        <Route path="/manage-access" element={<PublicRoute><ManageAccessPage /></PublicRoute>} />
                        <Route path="/settings" element={<PublicRoute><SettingsPage /></PublicRoute>} />
                        <Route path="/technical-details" element={<PublicRoute><TechnicalDetailsPage /></PublicRoute>} />
                        <Route path="/qr-ana-ativo" element={<PublicRoute><QrAnaAtivoPage /></PublicRoute>} />
                        <Route path="/intelligent-reading" element={<PublicRoute><IntelligentReading /></PublicRoute>} />
                        <Route path="/executive-dashboard" element={<PublicRoute><ExecutiveDashboard /></PublicRoute>} />
                        <Route path="/operational-dashboard" element={<PublicRoute><OperationalDashboard /></PublicRoute>} />
                        <Route path="/integrations-dashboard" element={<PublicRoute><IntegrationsDashboard /></PublicRoute>} />
                        <Route path="/ai-analytics" element={<PublicRoute><AIAnalyticsDashboard /></PublicRoute>} />
                        <Route path="/security-dashboard" element={<PublicRoute><SecurityDashboard /></PublicRoute>} />
                        <Route path="/patients" element={<PublicRoute><PatientsPage /></PublicRoute>} />
                        <Route path="/protocols" element={<PublicRoute><ProtocolsPage /></PublicRoute>} />
                        <Route path="/population" element={<PublicRoute><PopulationPage /></PublicRoute>} />
                        <Route path="/epidemiology" element={<PublicRoute><EpidemiologyPage /></PublicRoute>} />
                        <Route path="/resources" element={<PublicRoute><ResourcesPage /></PublicRoute>} />
                        <Route path="/lab-exams" element={<PublicRoute><LabExams /></PublicRoute>} />
                        <Route path="/epidemic-alerts" element={<PublicRoute><EpidemicAlerts /></PublicRoute>} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </PreLoginGuard>
                  </BrowserRouter>
                </div>
              </TooltipProvider>
              </LanguageProvider>
            </ProfileAccessProvider>
          </AuthProvider>
        </SiteAccessProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;