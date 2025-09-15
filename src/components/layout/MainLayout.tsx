
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebar-collapsed');
    return saved ? JSON.parse(saved) : false;
  });
  
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleCollapsed = () => {
    const newCollapsed = !sidebarCollapsed;
    setSidebarCollapsed(newCollapsed);
    localStorage.setItem('sidebar-collapsed', JSON.stringify(newCollapsed));
  };

  const sidebarWidth = sidebarCollapsed ? 64 : 256; // 16px = w-16, 256px = w-64

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/10">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar 
        isOpen={sidebarOpen} 
        toggleSidebar={toggleSidebar}
        isCollapsed={sidebarCollapsed}
        toggleCollapsed={toggleCollapsed}
      />
      
      <div 
        className={`transition-all duration-300 ease-in-out pt-16 relative z-10 ${
          sidebarOpen ? 'md:ml-64' : ''
        } ${sidebarCollapsed && sidebarOpen ? 'md:ml-16' : ''}`}
      >
        <div className="p-4 md:p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
