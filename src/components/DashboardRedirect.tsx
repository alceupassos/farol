import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const DashboardRedirect: React.FC = () => {
  const { userRole } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (userRole === 'gestor') {
      navigate('/prefeitura-dashboard', { replace: true });
    } else if (userRole === 'hospital') {
      navigate('/dashboard', { replace: true });
    } else {
      // Para pacientes ou outros roles, redirecionar para profile
      navigate('/profile', { replace: true });
    }
  }, [userRole, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
      <div className="text-white text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
        <p>Redirecionando para o dashboard apropriado...</p>
      </div>
    </div>
  );
};

export default DashboardRedirect;
