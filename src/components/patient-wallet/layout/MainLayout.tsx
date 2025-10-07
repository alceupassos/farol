
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
    <div className="relative min-h-screen bg-slate-50 dark:bg-gray-950">
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className={`transition-all duration-300 ease-in-out pt-16 ${sidebarOpen ? 'md:ml-64' : ''}`}>
        <div className="p-4 md:p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
