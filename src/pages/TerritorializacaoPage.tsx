import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { 
  Map, 
  MapPin, 
  Users, 
  Building, 
  Stethoscope,
  BarChart3,
  Target,
  Layers,
  Navigation,
  Home,
  Hospital,
  Activity
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

const TerritorializacaoPage = () => {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            🗺️ Territorialização em Saúde
          </h1>
          <p className="text-gray-400 text-lg">
            Mapeamento e organização territorial dos serviços de saúde por áreas de abrangência
          </p>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KpiCard
            title="Territórios Mapeados"
            value="156"
            icon={<Map size={24} />}
            color="blue"
          />
          <KpiCard
            title="População Coberta"
            value="2.8M"
            icon={<Users size={24} />}
            color="green"
          />
          <KpiCard
            title="Unidades de Saúde"
            value="342"
            icon={<Building size={24} />}
            color="purple"
          />
          <KpiCard
            title="Cobertura APS"
            value="94.2%"
            icon={<Target size={24} />}
            color="emerald"
          />
        </div>

        {/* Mapa Territorial */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8">
          <div className="flex items-center mb-6">
            <Layers className="text-blue-400 mr-3" size={24} />
            <h2 className="text-xl font-semibold text-white">Mapa de Territorialização</h2>
          </div>
          <div className="bg-gray-800 rounded-lg h-96 flex items-center justify-center">
            <div className="text-center">
              <Map size={64} className="text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">Mapa Interativo de Territórios</p>
              <p className="text-gray-500 text-sm">Visualização das áreas de abrangência e unidades de saúde</p>
            </div>
          </div>
        </div>

        {/* Análise por Território */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Territórios por Região */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div className="flex items-center mb-6">
              <MapPin className="text-green-400 mr-3" size={24} />
              <h2 className="text-xl font-semibold text-white">Territórios por Região</h2>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-white font-medium">Região Norte</h3>
                  <span className="text-blue-400 font-semibold">42 territórios</span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">População</p>
                    <p className="text-white">680K</p>
                  </div>
                  <div>
                    <p className="text-gray-400">UBS</p>
                    <p className="text-white">89</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Cobertura</p>
                    <p className="text-green-400">96%</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-white font-medium">Região Sul</h3>
                  <span className="text-blue-400 font-semibold">38 territórios</span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">População</p>
                    <p className="text-white">520K</p>
                  </div>
                  <div>
                    <p className="text-gray-400">UBS</p>
                    <p className="text-white">72</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Cobertura</p>
                    <p className="text-yellow-400">91%</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-white font-medium">Região Central</h3>
                  <span className="text-blue-400 font-semibold">76 territórios</span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">População</p>
                    <p className="text-white">1.2M</p>
                  </div>
                  <div>
                    <p className="text-gray-400">UBS</p>
                    <p className="text-white">145</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Cobertura</p>
                    <p className="text-green-400">98%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Indicadores de Acesso */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div className="flex items-center mb-6">
              <BarChart3 className="text-purple-400 mr-3" size={24} />
              <h2 className="text-xl font-semibold text-white">Indicadores de Acesso</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <span className="text-gray-300">Tempo Médio de Deslocamento</span>
                <span className="text-blue-400 font-semibold">12 min</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <span className="text-gray-300">Distância Média UBS</span>
                <span className="text-green-400 font-semibold">1.8 km</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <span className="text-gray-300">População por ESF</span>
                <span className="text-purple-400 font-semibold">3.200</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <span className="text-gray-300">Territórios Descobertos</span>
                <span className="text-red-400 font-semibold">8</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tipos de Território */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8">
          <div className="flex items-center mb-6">
            <Navigation className="text-orange-400 mr-3" size={24} />
            <h2 className="text-xl font-semibold text-white">Classificação dos Territórios</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-green-900/20 border border-green-800 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <Home className="text-green-400 mr-2" size={20} />
                <h3 className="text-green-400 font-semibold">Urbano Consolidado</h3>
              </div>
              <p className="text-gray-300 text-sm mb-2">89 territórios</p>
              <p className="text-gray-400 text-xs">Alta densidade populacional, boa infraestrutura</p>
            </div>
            
            <div className="bg-yellow-900/20 border border-yellow-800 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <Building className="text-yellow-400 mr-2" size={20} />
                <h3 className="text-yellow-400 font-semibold">Urbano Periférico</h3>
              </div>
              <p className="text-gray-300 text-sm mb-2">42 territórios</p>
              <p className="text-gray-400 text-xs">Crescimento urbano, infraestrutura em desenvolvimento</p>
            </div>
            
            <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <Map className="text-blue-400 mr-2" size={20} />
                <h3 className="text-blue-400 font-semibold">Rural</h3>
              </div>
              <p className="text-gray-300 text-sm mb-2">18 territórios</p>
              <p className="text-gray-400 text-xs">Baixa densidade, grandes distâncias</p>
            </div>
            
            <div className="bg-red-900/20 border border-red-800 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <Activity className="text-red-400 mr-2" size={20} />
                <h3 className="text-red-400 font-semibold">Vulnerável</h3>
              </div>
              <p className="text-gray-300 text-sm mb-2">7 territórios</p>
              <p className="text-gray-400 text-xs">Alta vulnerabilidade social, acesso limitado</p>
            </div>
          </div>
        </div>

        {/* Estratégias de Cobertura */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <div className="flex items-center mb-6">
            <Stethoscope className="text-emerald-400 mr-3" size={24} />
            <h2 className="text-xl font-semibold text-white">Estratégias de Cobertura</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="bg-blue-500/10 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Hospital className="text-blue-400" size={24} />
              </div>
              <h3 className="text-white font-semibold mb-2">Unidades Fixas</h3>
              <p className="text-gray-400 text-sm">UBS tradicionais para territórios consolidados</p>
              <p className="text-blue-400 font-semibold mt-2">285 unidades</p>
            </div>
            
            <div className="text-center p-4">
              <div className="bg-green-500/10 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Navigation className="text-green-400" size={24} />
              </div>
              <h3 className="text-white font-semibold mb-2">Equipes Itinerantes</h3>
              <p className="text-gray-400 text-sm">Cobertura para áreas rurais e remotas</p>
              <p className="text-green-400 font-semibold mt-2">24 equipes</p>
            </div>
            
            <div className="text-center p-4">
              <div className="bg-purple-500/10 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Activity className="text-purple-400" size={24} />
              </div>
              <h3 className="text-white font-semibold mb-2">Telemedicina</h3>
              <p className="text-gray-400 text-sm">Atendimento remoto para áreas descobertas</p>
              <p className="text-purple-400 font-semibold mt-2">33 pontos</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default TerritorializacaoPage;
