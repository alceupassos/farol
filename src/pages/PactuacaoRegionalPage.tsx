import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { 
  Handshake, 
  Users, 
  MapPin, 
  FileText, 
  Calendar,
  TrendingUp,
  Building,
  Target,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

const KpiCard: React.FC<{ 
  title: string; 
  value: string; 
  icon: React.ReactNode;
  color?: string;
}> = ({ title, value, icon, color = 'blue' }) => (
  <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
    <div className="flex items-center justify-between">
      <div className={`p-3 rounded-lg bg-${color}-500/10`}>
        <div className={`text-${color}-400`}>{icon}</div>
      </div>
    </div>
    <div className="mt-4">
      <h3 className="text-2xl font-bold text-white">{value}</h3>
      <p className="text-gray-400 text-sm mt-1">{title}</p>
    </div>
  </div>
);

const PactuacaoRegionalPage = () => {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            🤝 Pactuação Regional
          </h1>
          <p className="text-gray-400 text-lg">
            Gestão de acordos e pactuações entre municípios e regiões de saúde
          </p>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KpiCard
            title="Regiões Pactuadas"
            value="12"
            icon={<MapPin size={24} />}
            color="blue"
          />
          <KpiCard
            title="Municípios Envolvidos"
            value="45"
            icon={<Building size={24} />}
            color="green"
          />
          <KpiCard
            title="Acordos Ativos"
            value="28"
            icon={<FileText size={24} />}
            color="purple"
          />
          <KpiCard
            title="Taxa de Cumprimento"
            value="87%"
            icon={<Target size={24} />}
            color="emerald"
          />
        </div>

        {/* Seções Principais */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Acordos Regionais */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div className="flex items-center mb-6">
              <Handshake className="text-blue-400 mr-3" size={24} />
              <h2 className="text-xl font-semibold text-white">Acordos Regionais</h2>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-white font-medium">Região Metropolitana I</h3>
                  <CheckCircle className="text-green-400" size={20} />
                </div>
                <p className="text-gray-400 text-sm">15 municípios • Vigência até 12/2024</p>
                <p className="text-gray-300 text-sm mt-2">Pactuação de leitos de UTI e especialidades</p>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-white font-medium">Região Norte</h3>
                  <AlertTriangle className="text-yellow-400" size={20} />
                </div>
                <p className="text-gray-400 text-sm">8 municípios • Renovação pendente</p>
                <p className="text-gray-300 text-sm mt-2">Pactuação de transporte sanitário</p>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-white font-medium">Região Sul</h3>
                  <CheckCircle className="text-green-400" size={20} />
                </div>
                <p className="text-gray-400 text-sm">12 municípios • Vigência até 06/2025</p>
                <p className="text-gray-300 text-sm mt-2">Pactuação de exames de alta complexidade</p>
              </div>
            </div>
          </div>

          {/* Indicadores de Performance */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div className="flex items-center mb-6">
              <TrendingUp className="text-green-400 mr-3" size={24} />
              <h2 className="text-xl font-semibold text-white">Indicadores de Performance</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <span className="text-gray-300">Cumprimento de Metas</span>
                <span className="text-green-400 font-semibold">92%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <span className="text-gray-300">Recursos Compartilhados</span>
                <span className="text-blue-400 font-semibold">156</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <span className="text-gray-300">Economia Gerada</span>
                <span className="text-purple-400 font-semibold">R$ 2.8M</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <span className="text-gray-300">Tempo Médio Negociação</span>
                <span className="text-orange-400 font-semibold">45 dias</span>
              </div>
            </div>
          </div>
        </div>

        {/* Cronograma de Renovações */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8">
          <div className="flex items-center mb-6">
            <Calendar className="text-purple-400 mr-3" size={24} />
            <h2 className="text-xl font-semibold text-white">Cronograma de Renovações</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-red-900/20 border border-red-800 rounded-lg p-4">
              <h3 className="text-red-400 font-semibold mb-2">Vencendo em 30 dias</h3>
              <div className="space-y-2">
                <p className="text-gray-300 text-sm">• Região Norte - Transporte</p>
                <p className="text-gray-300 text-sm">• Região Leste - Oncologia</p>
              </div>
            </div>
            
            <div className="bg-yellow-900/20 border border-yellow-800 rounded-lg p-4">
              <h3 className="text-yellow-400 font-semibold mb-2">Vencendo em 90 dias</h3>
              <div className="space-y-2">
                <p className="text-gray-300 text-sm">• Região Central - UTI</p>
                <p className="text-gray-300 text-sm">• Região Oeste - Cardiologia</p>
              </div>
            </div>
            
            <div className="bg-green-900/20 border border-green-800 rounded-lg p-4">
              <h3 className="text-green-400 font-semibold mb-2">Renovados Recentemente</h3>
              <div className="space-y-2">
                <p className="text-gray-300 text-sm">• Região Sul - Exames</p>
                <p className="text-gray-300 text-sm">• Região Metro I - Leitos</p>
              </div>
            </div>
          </div>
        </div>

        {/* Benefícios da Pactuação */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <div className="flex items-center mb-6">
            <Users className="text-emerald-400 mr-3" size={24} />
            <h2 className="text-xl font-semibold text-white">Benefícios da Pactuação Regional</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4">
              <div className="bg-blue-500/10 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Target className="text-blue-400" size={24} />
              </div>
              <h3 className="text-white font-semibold mb-2">Otimização de Recursos</h3>
              <p className="text-gray-400 text-sm">Melhor aproveitamento da capacidade instalada</p>
            </div>
            
            <div className="text-center p-4">
              <div className="bg-green-500/10 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <TrendingUp className="text-green-400" size={24} />
              </div>
              <h3 className="text-white font-semibold mb-2">Economia de Escala</h3>
              <p className="text-gray-400 text-sm">Redução de custos através do compartilhamento</p>
            </div>
            
            <div className="text-center p-4">
              <div className="bg-purple-500/10 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Users className="text-purple-400" size={24} />
              </div>
              <h3 className="text-white font-semibold mb-2">Acesso Ampliado</h3>
              <p className="text-gray-400 text-sm">Maior acesso a serviços especializados</p>
            </div>
            
            <div className="text-center p-4">
              <div className="bg-orange-500/10 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <CheckCircle className="text-orange-400" size={24} />
              </div>
              <h3 className="text-white font-semibold mb-2">Qualidade Assistencial</h3>
              <p className="text-gray-400 text-sm">Melhoria na qualidade dos serviços</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default PactuacaoRegionalPage;
