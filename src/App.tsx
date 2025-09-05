
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { ProfileAccessProvider } from "@/contexts/ProfileAccessContext";
import { PWAInstallPrompt } from "./components/pwa/PWAInstallPrompt";
import { ServiceWorkerManager } from "./components/pwa/ServiceWorkerManager";
import ErrorBoundary from "./components/ErrorBoundary";
import HealthCheckDashboard from "./components/debug/HealthCheckDashboard";
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
import AuthPage from "./pages/AuthPage";
import Auth2FA from "./pages/Auth2FA";
import Setup2FA from "./pages/Setup2FA";
import DemoPage from "./pages/DemoPage";
import HelpPage from "./pages/HelpPage";
import SupportPage from "./pages/SupportPage";
import DocumentationPage from "./pages/DocumentationPage";
import EpidemicAlerts from "./pages/EpidemicAlerts";
import { TwoFAProtectedRoute } from "./components/auth/2FAProtectedRoute";
import { SiteAccessProvider } from "./contexts/SiteAccessContext";
import PreLoginGuard from "./components/auth/PreLoginGuard";
import SiteAccess from "./pages/SiteAccess";
import AdminPanel from "./pages/AdminPanel";

const queryClient = new QueryClient();

// Protected Route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Carregando...</div>;
  }
  
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  return <>{children}</>;
};

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <SiteAccessProvider>
        <PreLoginGuard>
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
                  <Routes>
                    <Route path="/site-access" element={<SiteAccess />} />
                    <Route path="/admin" element={<AdminPanel />} />
                <Route path="/" element={<Index />} />
                <Route path="/demo" element={<DemoPage />} />
                <Route path="/documentation" element={<DocumentationPage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/auth-2fa" element={<Auth2FA />} />
                <Route path="/setup-2fa" element={<Setup2FA />} />
                <Route path="/dashboard" element={
                  <TwoFAProtectedRoute>
                    <Dashboard />
                  </TwoFAProtectedRoute>
                } />
                <Route path="/profile" element={
                  <TwoFAProtectedRoute>
                    <Profile />
                  </TwoFAProtectedRoute>
                } />
                <Route path="/records" element={
                  <TwoFAProtectedRoute>
                    <Records />
                  </TwoFAProtectedRoute>
                } />
                <Route path="/medications" element={
                  <TwoFAProtectedRoute>
                    <Medications />
                  </TwoFAProtectedRoute>
                } />
                <Route path="/appointments" element={
                  <TwoFAProtectedRoute>
                    <Appointments />
                  </TwoFAProtectedRoute>
                } />
                <Route path="/metrics" element={
                  <TwoFAProtectedRoute>
                    <Metrics />
                  </TwoFAProtectedRoute>
                } />
                <Route path="/access" element={
                  <TwoFAProtectedRoute>
                    <Access />
                  </TwoFAProtectedRoute>
                } />
                <Route path="/emergency" element={
                  <TwoFAProtectedRoute>
                    <Emergency />
                  </TwoFAProtectedRoute>
                } />
                <Route path="/labexams" element={
                  <TwoFAProtectedRoute>
                    <LabExams />
                  </TwoFAProtectedRoute>
                } />
                <Route path="/genetic-data" element={
                  <TwoFAProtectedRoute>
                    <GeneticDataPage />
                  </TwoFAProtectedRoute>
                } />
                <Route path="/quality-of-life" element={
                  <TwoFAProtectedRoute>
                    <QualityOfLifePage />
                  </TwoFAProtectedRoute>
                } />
                <Route path="/help" element={
                  <TwoFAProtectedRoute>
                    <HelpPage />
                  </TwoFAProtectedRoute>
                } />
                <Route path="/support" element={
                  <TwoFAProtectedRoute>
                    <SupportPage />
                  </TwoFAProtectedRoute>
                } />
                <Route path="/manage-access" element={
                  <TwoFAProtectedRoute>
                    <ManageAccessPage />
                  </TwoFAProtectedRoute>
                } />
                <Route path="/settings" element={
                  <TwoFAProtectedRoute>
                    <SettingsPage />
                  </TwoFAProtectedRoute>
                } />
                <Route path="/technical-details" element={
                  <TwoFAProtectedRoute>
                    <TechnicalDetailsPage />
                  </TwoFAProtectedRoute>
                } />
                <Route path="/qr-ana-ativo" element={
                  <TwoFAProtectedRoute>
                    <QrAnaAtivoPage />
                  </TwoFAProtectedRoute>
                } />
                <Route path="/intelligent-reading" element={
                  <TwoFAProtectedRoute>
                    <IntelligentReading />
                  </TwoFAProtectedRoute>
                } />
                <Route path="/executive-dashboard" element={
                  <TwoFAProtectedRoute>
                    <ExecutiveDashboard />
                  </TwoFAProtectedRoute>
                } />
                <Route path="/operational-dashboard" element={
                  <TwoFAProtectedRoute>
                    <OperationalDashboard />
                  </TwoFAProtectedRoute>
                } />
                <Route path="/integrations-dashboard" element={
                  <TwoFAProtectedRoute>
                    <IntegrationsDashboard />
                  </TwoFAProtectedRoute>
                } />
                <Route path="/ai-analytics" element={
                  <TwoFAProtectedRoute>
                    <AIAnalyticsDashboard />
                  </TwoFAProtectedRoute>
                } />
                <Route path="/security-dashboard" element={
                  <TwoFAProtectedRoute>
                    <SecurityDashboard />
                  </TwoFAProtectedRoute>
                } />
                {/* New pages for different user types */}
                <Route path="/patients" element={
                  <TwoFAProtectedRoute>
                    <PatientsPage />
                  </TwoFAProtectedRoute>
                } />
                <Route path="/protocols" element={
                  <TwoFAProtectedRoute>
                    <ProtocolsPage />
                  </TwoFAProtectedRoute>
                } />
                <Route path="/population" element={
                  <TwoFAProtectedRoute>
                    <PopulationPage />
                  </TwoFAProtectedRoute>
                } />
                <Route path="/epidemiology" element={
                  <TwoFAProtectedRoute>
                    <EpidemiologyPage />
                  </TwoFAProtectedRoute>
                } />
                <Route path="/resources" element={
                  <TwoFAProtectedRoute>
                    <ResourcesPage />
                  </TwoFAProtectedRoute>
                } />
                <Route path="/lab-exams" element={
                  <TwoFAProtectedRoute>
                    <LabExams />
                  </TwoFAProtectedRoute>
                } />
                <Route path="/epidemic-alerts" element={
                  <TwoFAProtectedRoute>
                    <EpidemicAlerts />
                  </TwoFAProtectedRoute>
                } />
                <Route path="*" element={<NotFound />} />
                  </Routes>
                </BrowserRouter>
              </div>
            </TooltipProvider>
          </LanguageProvider>
        </ProfileAccessProvider>
        </AuthProvider>
      </PreLoginGuard>
    </SiteAccessProvider>
  </QueryClientProvider>
  </ErrorBoundary>
);

export default App;

