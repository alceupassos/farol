import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { 
  Activity, 
  Users, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  FileText,
  Shield,
  Database,
  Heart,
  Pill,
  Building2,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  PieChart,
  LineChart
} from 'lucide-react';

const KpiCard: React.FC<{ 
  title: string; 
  value: string; 
  change?: string; 
  trend?: 'up' | 'down' | 'stable';
  icon: React.ReactNode;
  color?: string;
}> = ({ title, value, change, trend, icon, color = 'blue' }) => (
  <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors">
    <div className="flex items-center justify-between">
      <div className={`p-3 rounded-lg bg-${color}-500/10`}>
        <div className={`text-${color}-400`}>{icon}</div>
      </div>
      {trend && (
        <div className={`flex items-center space-x-1 ${
          trend === 'up' ? 'text-green-400' : trend === 'down' ? 'text-red-400' : 'text-gray-400'
        }`}>
          {trend === 'up' ? <TrendingUp size={16} /> : trend === 'down' ? <TrendingDown size={16} /> : null}
          {change && <span className="text-sm">{change}</span>}
        </div>
      )}
    </div>
    <div className="mt-4">
      <h3 className="text-2xl font-bold text-white">{value}</h3>
      <p className="text-gray-400 text-sm mt-1">{title}</p>
    </div>
  </div>
);

const ChartPlaceholder: React.FC<{ title: string; type: 'bar' | 'line' | 'pie' }> = ({ title, type }) => (
  <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
    <h3 className="text-white font-semibold mb-4">{title}</h3>
    <div className="h-64 bg-gray-800 rounded-lg flex items-center justify-center">
      {type === 'bar' && <BarChart3 size={48} className="text-gray-600" />}
      {type === 'line' && <LineChart size={48} className="text-gray-600" />}
      {type === 'pie' && <PieChart size={48} className="text-gray-600" />}
      <span className="ml-2 text-gray-600">Gráfico {type === 'bar' ? 'de Barras' : type === 'line' ? 'de Linha' : 'de Pizza'}</span>
    </div>
  </div>
);

const HospitalsAccess = () => {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            🏥 Sistema HIS/HMIS - Santa Casa
          </h1>
          <p className="text-gray-400 text-lg">
            Plataforma unificada de gestão hospitalar com integração SUS, RNDS/DATASUS, TISS/TUSS e conformidade LGPD
          </p>
        </div>

        {/* KPIs Dashboard */}
        <div id="kpis" className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">📊 Dashboard Executivo - KPIs Principais</h2>
          
          {/* Linha 1 - KPIs Gerais */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <KpiCard
              title="Internações Ativas"
              value="247"
              change="+12%"
              trend="up"
              icon={<Users size={24} />}
              color="blue"
            />
            <KpiCard
              title="Taxa de Ocupação"
              value="87.3%"
              change="+5.2%"
              trend="up"
              icon={<Building2 size={24} />}
              color="green"
            />
            <KpiCard
              title="Faturamento Mensal"
              value="R$ 2.8M"
              change="+18%"
              trend="up"
              icon={<DollarSign size={24} />}
              color="emerald"
            />
            <KpiCard
              title="Tempo Médio Permanência"
              value="4.2 dias"
              change="-0.8"
              trend="down"
              icon={<Clock size={24} />}
              color="orange"
            />
          </div>

          {/* Linha 2 - KPIs SUS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <KpiCard
              title="Produção SUS (AIH)"
              value="1.847"
              change="+23%"
              trend="up"
              icon={<FileText size={24} />}
              color="blue"
            />
            <KpiCard
              title="Taxa Glosa SUS"
              value="3.2%"
              change="-1.1%"
              trend="down"
              icon={<AlertTriangle size={24} />}
              color="red"
            />
            <KpiCard
              title="APAC Oncologia"
              value="156"
              change="+8%"
              trend="up"
              icon={<Heart size={24} />}
              color="pink"
            />
            <KpiCard
              title="Conformidade RNDS"
              value="98.7%"
              change="+2.1%"
              trend="up"
              icon={<Shield size={24} />}
              color="green"
            />
          </div>

          {/* Linha 3 - KPIs Saúde Suplementar */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <KpiCard
              title="Faturamento TISS"
              value="R$ 1.2M"
              change="+15%"
              trend="up"
              icon={<DollarSign size={24} />}
              color="purple"
            />
            <KpiCard
              title="Taxa Autorização"
              value="94.8%"
              change="+3.2%"
              trend="up"
              icon={<CheckCircle size={24} />}
              color="green"
            />
            <KpiCard
              title="Tempo Resposta Op."
              value="2.3h"
              change="-0.5h"
              trend="down"
              icon={<Clock size={24} />}
              color="blue"
            />
            <KpiCard
              title="Glosa Convênios"
              value="5.7%"
              change="-2.1%"
              trend="down"
              icon={<TrendingDown size={24} />}
              color="red"
            />
          </div>
        </div>

        {/* Gráficos */}
        <div id="graficos" className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">📈 Análises Gráficas</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <ChartPlaceholder title="Produção Mensal SUS vs Convênios" type="bar" />
            <ChartPlaceholder title="Evolução Taxa de Ocupação" type="line" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <ChartPlaceholder title="Distribuição por Especialidade" type="pie" />
            <ChartPlaceholder title="Faturamento por Fonte" type="pie" />
            <ChartPlaceholder title="Indicadores de Qualidade" type="bar" />
          </div>
        </div>

        {/* Módulos do Sistema */}
        <div id="modulos" className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">🔧 Módulos do Sistema</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* RNDS/DATASUS */}
            <div id="rnds" className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <Database className="text-blue-400 mr-3" size={24} />
                <h3 className="text-xl font-semibold text-white">RNDS/DATASUS</h3>
              </div>
              <div className="text-gray-300 space-y-2 text-sm">
                <p>• Integração FHIR v4.0.1 com RNDS</p>
                <p>• Sincronização CNES (estabelecimentos/profissionais)</p>
                <p>• Atualização mensal SIGTAP (procedimentos/medicamentos)</p>
                <p>• Conformidade SUS Digital</p>
                <p>• Auditabilidade e controle de acesso</p>
              </div>
            </div>

            {/* SIA/SIH SUS */}
            <div id="faturamento-sus" className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <FileText className="text-green-400 mr-3" size={24} />
                <h3 className="text-xl font-semibold text-white">Faturamento SUS</h3>
              </div>
              <div className="text-gray-300 space-y-2 text-sm">
                <p>• BPA/APAC ambulatorial (SIA)</p>
                <p>• AIH hospitalar (SIH)</p>
                <p>• Verificação VERSIA</p>
                <p>• Controle glosas/rejeições</p>
                <p>• ETL TABWIN/TABNET</p>
              </div>
            </div>

            {/* TISS/TUSS */}
            <div id="tiss-tuss" className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <Shield className="text-purple-400 mr-3" size={24} />
                <h3 className="text-xl font-semibold text-white">Saúde Suplementar</h3>
              </div>
              <div className="text-gray-300 space-y-2 text-sm">
                <p>• Padrão TISS (5 componentes)</p>
                <p>• Terminologia TUSS atualizada</p>
                <p>• Autorizações/guias XML</p>
                <p>• Faturamento eletrônico</p>
                <p>• Monitoramento prazos ANS</p>
              </div>
            </div>

            {/* Oncologia */}
            <div id="oncologia" className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <Heart className="text-pink-400 mr-3" size={24} />
                <h3 className="text-xl font-semibold text-white">Centro Oncológico</h3>
              </div>
              <div className="text-gray-300 space-y-2 text-sm">
                <p>• APAC-Oncologia (quimio/radioterapia)</p>
                <p>• Diretrizes INCA/SIA-SUS</p>
                <p>• Esquemas terapêuticos</p>
                <p>• Auditoria alta complexidade</p>
                <p>• Relatórios específicos oncologia</p>
              </div>
            </div>
          </div>
        </div>

        {/* Conformidade e Segurança */}
        <div id="conformidade" className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">🔒 Conformidade e Segurança</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <Shield className="text-green-400 mr-3" size={24} />
                <h3 className="text-lg font-semibold text-white">LGPD</h3>
              </div>
              <div className="text-gray-300 space-y-2 text-sm">
                <p>• Lei 13.709/2018</p>
                <p>• Governança de dados</p>
                <p>• Trilhas de auditoria</p>
                <p>• Políticas de retenção</p>
              </div>
            </div>

            <div id="prontuario" className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <FileText className="text-blue-400 mr-3" size={24} />
                <h3 className="text-lg font-semibold text-white">Prontuário Digital</h3>
              </div>
              <div className="text-gray-300 space-y-2 text-sm">
                <p>• Lei 13.787/2018</p>
                <p>• Certificado ICP-Brasil</p>
                <p>• Assinatura digital</p>
                <p>• Certificação SBIS-CFM</p>
              </div>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <Activity className="text-orange-400 mr-3" size={24} />
                <h3 className="text-lg font-semibold text-white">Interoperabilidade</h3>
              </div>
              <div className="text-gray-300 space-y-2 text-sm">
                <p>• APIs FHIR REST</p>
                <p>• Conectores ETL</p>
                <p>• Barramento RNDS</p>
                <p>• Padrões HL7</p>
              </div>
            </div>
          </div>
        </div>

        {/* Referências e Links */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">📚 Referências Oficiais</h2>
          
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
              <div>
                <h4 className="text-white font-semibold mb-2">RNDS/FHIR</h4>
                <div className="space-y-1 text-gray-400">
                  <a href="https://rnds-fhir.saude.gov.br" className="hover:text-blue-400 block">RNDS FHIR</a>
                  <a href="https://rnds-guia.saude.gov.br" className="hover:text-blue-400 block">Guia RNDS</a>
                  <a href="https://www.gov.br/saude/pt-br/composicao/seidigi/rnds" className="hover:text-blue-400 block">Portal RNDS</a>
                </div>
              </div>
              
              <div>
                <h4 className="text-white font-semibold mb-2">SUS/DATASUS</h4>
                <div className="space-y-1 text-gray-400">
                  <a href="http://sigtap.datasus.gov.br" className="hover:text-blue-400 block">SIGTAP</a>
                  <a href="https://datasus.saude.gov.br" className="hover:text-blue-400 block">DATASUS</a>
                  <a href="https://wiki.saude.gov.br/sia" className="hover:text-blue-400 block">SIA Wiki</a>
                </div>
              </div>
              
              <div>
                <h4 className="text-white font-semibold mb-2">TISS/ANS</h4>
                <div className="space-y-1 text-gray-400">
                  <a href="https://www.gov.br/ans/pt-br/assuntos/prestadores/padrao-para-troca-de-informacao-de-saude-suplementar-2013-tiss" className="hover:text-blue-400 block">Padrão TISS</a>
                  <a href="https://www.ans.gov.br/prestadores/tiss-troca-de-informacao-de-saude-suplementar" className="hover:text-blue-400 block">TISS ANS</a>
                </div>
              </div>
              
              <div>
                <h4 className="text-white font-semibold mb-2">Oncologia</h4>
                <div className="space-y-1 text-gray-400">
                  <a href="https://www.inca.gov.br/publicacoes/manuais/manual-de-bases-tecnicas-da-oncologia-sia-sus" className="hover:text-blue-400 block">Manual INCA</a>
                  <a href="https://biblioteca.cofen.gov.br/manual-de-bases-tecnicas-oncologia" className="hover:text-blue-400 block">Bases Técnicas</a>
                </div>
              </div>
              
              <div>
                <h4 className="text-white font-semibold mb-2">Conformidade</h4>
                <div className="space-y-1 text-gray-400">
                  <a href="https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm" className="hover:text-blue-400 block">LGPD</a>
                  <a href="https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13787.htm" className="hover:text-blue-400 block">Lei Prontuário</a>
                  <a href="https://www.sbis.org.br/certificacao" className="hover:text-blue-400 block">SBIS-CFM</a>
                </div>
              </div>
              
              <div>
                <h4 className="text-white font-semibold mb-2">Análises</h4>
                <div className="space-y-1 text-gray-400">
                  <a href="https://datasus.saude.gov.br/informacoes-de-saude-tabnet" className="hover:text-blue-400 block">TABNET</a>
                  <a href="http://tabnet.datasus.gov.br" className="hover:text-blue-400 block">TABWIN</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm">
          <p>Sistema HIS/HMIS desenvolvido para hospitais filantrópicos tipo Santa Casa</p>
          <p>Conformidade total com regulamentações SUS, ANS, LGPD e certificações SBIS-CFM</p>
        </div>
      </div>
    </MainLayout>
  );
};

export default HospitalsAccess;
