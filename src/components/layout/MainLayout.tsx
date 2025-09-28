import { createContext, useContext, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { OSSDebug } from '@/components/debug/OSSDebug';

interface MainLayoutProps {
  children?: React.ReactNode;
}

const LayoutNestingContext = createContext(false);

const MainLayout = ({ children }: MainLayoutProps) => {
  const isNested = useContext(LayoutNestingContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (isNested) {
    return <>{children || <Outlet />}</>;
  }

  const toggleSidebar = () => setSidebarOpen((open) => !open);

  return (
    <LayoutNestingContext.Provider value={true}>
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
    </LayoutNestingContext.Provider>
  );
};

export default MainLayout;
