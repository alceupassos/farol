
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
import QrAnaAtivoPage from "./pages/QrAnaAtivoPage"; // Importa a nova página
import IntelligentReading from "./pages/IntelligentReading";
import ExecutiveDashboard from "./pages/ExecutiveDashboard";
import OperationalDashboard from "./pages/OperationalDashboard";
import IntegrationsDashboard from "./pages/IntegrationsDashboard";
import AIAnalyticsDashboard from "./pages/AIAnalyticsDashboard";
import SecurityDashboard from "./pages/SecurityDashboard";
import AuthPage from "./pages/AuthPage";
import DemoPage from "./pages/DemoPage";
import HelpPage from "./pages/HelpPage";
import SupportPage from "./pages/SupportPage";
import DocumentationPage from "./pages/DocumentationPage";
import EpidemicAlerts from "./pages/EpidemicAlerts";

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
                <Route path="/" element={<Index />} />
                <Route path="/demo" element={<DemoPage />} />
                <Route path="/documentation" element={<DocumentationPage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } />
                <Route path="/records" element={
                  <ProtectedRoute>
                    <Records />
                  </ProtectedRoute>
                } />
                <Route path="/medications" element={
                  <ProtectedRoute>
                    <Medications />
                  </ProtectedRoute>
                } />
                <Route path="/appointments" element={
                  <ProtectedRoute>
                    <Appointments />
                  </ProtectedRoute>
                } />
                <Route path="/metrics" element={
                  <ProtectedRoute>
                    <Metrics />
                  </ProtectedRoute>
                } />
                <Route path="/access" element={
                  <ProtectedRoute>
                    <Access />
                  </ProtectedRoute>
                } />
                <Route path="/emergency" element={
                  <ProtectedRoute>
                    <Emergency />
                  </ProtectedRoute>
                } />
                <Route path="/labexams" element={
                  <ProtectedRoute>
                    <LabExams />
                  </ProtectedRoute>
                } />
                <Route path="/genetic-data" element={
                  <ProtectedRoute>
                    <GeneticDataPage />
                  </ProtectedRoute>
                } />
                <Route path="/quality-of-life" element={
                  <ProtectedRoute>
                    <QualityOfLifePage />
                  </ProtectedRoute>
                } />
                <Route path="/help" element={
                  <ProtectedRoute>
                    <HelpPage />
                  </ProtectedRoute>
                } />
                <Route path="/support" element={
                  <ProtectedRoute>
                    <SupportPage />
                  </ProtectedRoute>
                } />
                <Route path="/manage-access" element={
                  <ProtectedRoute>
                    <ManageAccessPage />
                  </ProtectedRoute>
                } />
                <Route path="/settings" element={
                  <ProtectedRoute>
                    <SettingsPage />
                  </ProtectedRoute>
                } />
                <Route path="/technical-details" element={
                  <ProtectedRoute>
                    <TechnicalDetailsPage />
                  </ProtectedRoute>
                } />
                <Route path="/qr-ana-ativo" element={
                  <ProtectedRoute>
                    <QrAnaAtivoPage />
                  </ProtectedRoute>
                } />
                <Route path="/intelligent-reading" element={
                  <ProtectedRoute>
                    <IntelligentReading />
                  </ProtectedRoute>
                } />
                <Route path="/executive-dashboard" element={
                  <ProtectedRoute>
                    <ExecutiveDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/operational-dashboard" element={
                  <ProtectedRoute>
                    <OperationalDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/integrations-dashboard" element={
                  <ProtectedRoute>
                    <IntegrationsDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/ai-analytics" element={
                  <ProtectedRoute>
                    <AIAnalyticsDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/security-dashboard" element={
                  <ProtectedRoute>
                    <SecurityDashboard />
                  </ProtectedRoute>
                } />
                {/* New pages for different user types */}
                <Route path="/patients" element={
                  <ProtectedRoute>
                    <PatientsPage />
                  </ProtectedRoute>
                } />
                <Route path="/protocols" element={
                  <ProtectedRoute>
                    <ProtocolsPage />
                  </ProtectedRoute>
                } />
                <Route path="/population" element={
                  <ProtectedRoute>
                    <PopulationPage />
                  </ProtectedRoute>
                } />
                <Route path="/epidemiology" element={
                  <ProtectedRoute>
                    <EpidemiologyPage />
                  </ProtectedRoute>
                } />
                <Route path="/resources" element={
                  <ProtectedRoute>
                    <ResourcesPage />
                  </ProtectedRoute>
                } />
                <Route path="/lab-exams" element={
                  <ProtectedRoute>
                    <LabExams />
                  </ProtectedRoute>
                } />
                <Route path="/epidemic-alerts" element={
                  <ProtectedRoute>
                    <EpidemicAlerts />
                  </ProtectedRoute>
                } />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </div>
        </TooltipProvider>
      </LanguageProvider>
    </ProfileAccessProvider>
    </AuthProvider>
  </QueryClientProvider>
  </ErrorBoundary>
);

export default App;

