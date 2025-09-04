
import { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/10">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className={`transition-all duration-300 ease-in-out pt-16 ${sidebarOpen ? 'md:ml-64' : ''} relative z-10`}>
        <div className="p-4 md:p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
