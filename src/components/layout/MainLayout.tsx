
import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { OSSDebug } from '@/components/debug/OSSDebug';

interface MainLayoutProps {
  children?: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  // Simplificar: apenas controle mobile overlay
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/10">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Container principal - LAYOUT FIXO */}
      <main className="ml-64 min-h-screen">
        <div className="p-2 md:p-3 lg:p-4 min-h-full">
          {children || <Outlet />}
        </div>
      </main>

      <OSSDebug />
    </div>
  );
};

export default MainLayout;
