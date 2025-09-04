
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Stethoscope, Calendar, FileText, Clock, Zap, Heart, Activity, Pill } from 'lucide-react';
import AppButton from '@/components/ui/AppButton';
import SummaryCard from '@/components/dashboard/SummaryCard';
import RecentActivity from '@/components/dashboard/RecentActivity';
import HealthMetric from '@/components/ui/HealthMetric';
import MainLayout from '@/components/layout/MainLayout';
import RoleDashboard from '@/components/dashboard/RoleDashboard';
import { useAuth } from '@/contexts/AuthContext';

const Dashboard = () => {
  const { userRole } = useAuth();
  const [recentActivities] = useState([
    {
      id: '1',
      type: 'record' as const,
      title: 'Resultados de Exame de Sangue',
      description: 'Hemograma completo (CBC) e resultados do painel metabólico enviados',
      timestamp: '2 horas atrás',
      provider: 'Laboratório Hospital da Cidade',
      status: 'completed' as const
    },
    {
      id: '2',
      type: 'appointment' as const,
      title: 'Check-up Anual',
      description: 'Exame físico anual com Dra. Sarah Johnson',
      timestamp: 'Amanhã, 10:00',
      provider: 'Centro de Cuidados Primários',
      status: 'upcoming' as const
    },
    {
      id: '3',
      type: 'medication' as const,
      title: 'Lembrete de Medicamento',
      description: 'Tomar Lisinopril 10mg uma vez ao dia com comida',
      timestamp: 'Hoje, 8:00',
      status: 'active' as const
    },
    {
      id: '4',
      type: 'access' as const,
      title: 'Permissão de Acesso Concedida',
      description: 'Dr. Michael Chen recebeu acesso ao seu histórico médico',
      timestamp: 'Ontem, 14:15',
      status: 'granted' as const
    }
  ]);

  return (
    <MainLayout>
      <div className="pt-8 pb-10 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8 animate-fade-in">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-display font-semibold">
                  {userRole === 'gestor' ? 'Dashboard Executivo' :
                   userRole === 'medico' ? 'Painel Médico' :
                   'Olá, João'}
                </h1>
                <p className="text-gray-400 mt-1">
                  {userRole === 'gestor' ? 'Visão estratégica da saúde municipal' :
                   userRole === 'medico' ? 'Gestão de pacientes e consultas' :
                   'Aqui está um resumo dos seus dados de saúde'}
                  <span className="text-xs text-muted-foreground italic ml-1">
                    * Sistema de Saúde Pública com dados de demonstração
                  </span>
                </p>
              </div>
              {userRole === 'paciente' && (
                <div className="flex space-x-3">
                  <AppButton
                    variant="outline"
                    icon={<Zap size={16} />}
                    iconPosition="left"
                  >
                    Acesso Rápido
                  </AppButton>
                  <AppButton
                    icon={<FileText size={16} />}
                    iconPosition="left"
                  >
                    Adicionar Registro
                  </AppButton>
                </div>
              )}
            </div>
          </div>

          {/* Role-based Dashboard */}
          <RoleDashboard />
          
          {/* Legacy Patient Dashboard - shown only for patients */}
          {userRole === 'paciente' && (
            <>
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 mt-8">
                <SummaryCard
                  title="Próximas Consultas"
                  value="2"
                  subtitle="Próxima: Amanhã, 10:00"
                  icon={<Calendar size={20} className="text-white" />}
                  color="bg-medical"
                  link={{ url: "/appointments", text: "Ver Agenda" }}
                  className="animate-slide-up"
                />
                
                <SummaryCard
                  title="Registros Médicos"
                  value="24"
                  subtitle="Última atualização: Hoje"
                  icon={<FileText size={20} className="text-white" />}
                  color="bg-orange-500"
                  change={{ value: "3", isPositive: true }}
                  link={{ url: "/records", text: "Ver Registros" }}
                  className="animate-slide-up [animation-delay:100ms]"
                />
                
                <SummaryCard
                  title="Medicamentos"
                  value="3"
                  subtitle="2 prescrições ativas"
                  icon={<Pill size={20} className="text-white" />}
                  color="bg-purple-500"
                  link={{ url: "/medications", text: "Gerenciar Medicamentos" }}
                  className="animate-slide-up [animation-delay:200ms]"
                />
                
                <SummaryCard
                  title="Permissões Ativas"
                  value="2"
                  subtitle="1 solicitação pendente"
                  icon={<Stethoscope size={20} className="text-white" />}
                  color="bg-green-500"
                  link={{ url: "/access", text: "Gerenciar Acesso" }}
                  className="animate-slide-up [animation-delay:300ms]"
                />
              </div>
              
              {/* Health Metrics and Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="glass-card rounded-xl p-5 animate-scale-in">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium">Métricas de Saúde</h3>
                      <div className="flex items-center text-sm">
                        <Clock size={16} className="mr-1 text-gray-500" />
                        <span className="text-gray-500">Última Atualização: Hoje, 9:45</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <HealthMetric
                        icon={<Heart size={18} />}
                        title="Frequência Cardíaca"
                        value={72}
                        unit="bpm"
                        status="normal"
                        change={{ value: "3%", direction: "down" }}
                      />
                      
                      <HealthMetric
                        icon={<Activity size={18} />}
                        title="Pressão Arterial"
                        value="118/78"
                        unit="mmHg"
                        status="normal"
                        change={{ value: "2%", direction: "down" }}
                      />
                      
                      <HealthMetric
                        icon={<Zap size={18} />}
                        title="Glicose no Sangue"
                        value={104}
                        unit="mg/dL"
                        status="warning"
                        change={{ value: "5%", direction: "up" }}
                      />
                    </div>
                    
                    <Link to="/metrics" className="w-full mt-4 text-sm text-primary font-medium hover:underline flex items-center justify-center">
                      Ver Todas as Métricas de Saúde
                    </Link>
                  </div>
                  
                  <div className="glass-card rounded-xl overflow-hidden mt-6 animate-scale-in [animation-delay:100ms]">
                    <div className="p-5 border-b border-gray-800 flex justify-between items-center">
                      <h3 className="text-lg font-medium">Verificação Blockchain</h3>
                      <span className="text-xs px-2 py-1 rounded-full bg-green-900/30 text-green-400 flex items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1"></span>
                        Todos os Registros Verificados
                      </span>
                    </div>
                    
                    <div className="p-5">
                      <div className="flex flex-col md:flex-row md:items-center justify-between text-sm text-gray-500 mb-4">
                        <div>Última verificação: Hoje às 12:34</div>
                        <div>Registros protegidos com Hyperledger Fabric</div>
                      </div>
                      
                      <div className="border border-gray-800 rounded-lg p-3 bg-gray-800/50 font-mono text-xs overflow-x-auto">
                        <div className="flex items-center text-gray-300">
                          <span className="text-green-400 mr-2">✓</span>
                          <span className="mr-2">Bloco:</span>
                          <span className="font-semibold">0x7c3a95b784d28...</span>
                        </div>
                        <div className="flex items-center text-gray-300 mt-1">
                          <span className="text-green-400 mr-2">✓</span>
                          <span className="mr-2">Timestamp:</span>
                          <span className="font-semibold">2023-06-15 12:34:56 UTC</span>
                        </div>
                      </div>
                      
                      <Link to="/access" className="w-full mt-4 text-sm text-primary font-medium hover:underline flex items-center justify-center">
                        Ver Detalhes de Verificação
                      </Link>
                    </div>
                  </div>
                </div>
                
                <div className="animate-scale-in [animation-delay:200ms]">
                  <RecentActivity activities={recentActivities} />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
