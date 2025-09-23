import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
  TestTube,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

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
        <div
          className={`flex items-center space-x-1 ${
            trend === 'up' ? 'text-green-400' : trend === 'down' ? 'text-red-400' : 'text-gray-400'
          }`}
        >
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

const COLORS = ['#8884d8', '#82ca9d'];

const HospitalsAccess = () => {
  const { t } = useTranslation();

  const generalKpis = [
    {
      title: t('pages.hospitalsAccess.kpis.general.activeAdmissions'),
      value: '312',
      change: '+9%',
      trend: 'up' as const,
      icon: <Users size={24} />,
      color: 'blue',
    },
    {
      title: t('pages.hospitalsAccess.kpis.general.occupancyRate'),
      value: '88.2%',
      change: '+3.8%',
      trend: 'up' as const,
      icon: <Building2 size={24} />,
      color: 'green',
    },
    {
      title: t('pages.hospitalsAccess.kpis.general.monthlyRevenue'),
      value: 'R$ 3.4M',
      change: '+15%',
      trend: 'up' as const,
      icon: <DollarSign size={24} />,
      color: 'emerald',
    },
    {
      title: t('pages.hospitalsAccess.kpis.general.averageStay'),
      value: '4.1 dias',
      change: '-0.6',
      trend: 'down' as const,
      icon: <Clock size={24} />,
      color: 'orange',
    },
  ];

  const susKpis = [
    {
      title: t('pages.hospitalsAccess.kpis.sus.production'),
      value: '2.364',
      change: '+19%',
      trend: 'up' as const,
      icon: <FileText size={24} />,
      color: 'blue',
    },
    {
      title: t('pages.hospitalsAccess.kpis.sus.denialRate'),
      value: '2.4%',
      change: '-0.9%',
      trend: 'down' as const,
      icon: <AlertTriangle size={24} />,
      color: 'red',
    },
    {
      title: t('pages.hospitalsAccess.kpis.sus.apacOncology'),
      value: '212',
      change: '+12%',
      trend: 'up' as const,
      icon: <Heart size={24} />,
      color: 'pink',
    },
    {
      title: t('pages.hospitalsAccess.kpis.sus.rndsCompliance'),
      value: '99.1%',
      change: '+1.4%',
      trend: 'up' as const,
      icon: <Shield size={24} />,
      color: 'green',
    },
  ];

  const supplementalKpis = [
    {
      title: t('pages.hospitalsAccess.kpis.supplementary.billing'),
      value: 'R$ 1.8M',
      change: '+11%',
      trend: 'up' as const,
      icon: <DollarSign size={24} />,
      color: 'purple',
    },
    {
      title: t('pages.hospitalsAccess.kpis.supplementary.authorizationRate'),
      value: '95.6%',
      change: '+2.4%',
      trend: 'up' as const,
      icon: <CheckCircle size={24} />,
      color: 'green',
    },
    {
      title: t('pages.hospitalsAccess.kpis.supplementary.responseTime'),
      value: '2.1h',
      change: '-0.4h',
      trend: 'down' as const,
      icon: <Clock size={24} />,
      color: 'blue',
    },
    {
      title: t('pages.hospitalsAccess.kpis.supplementary.denials'),
      value: '4.9%',
      change: '-1.6%',
      trend: 'down' as const,
      icon: <TrendingDown size={24} />,
      color: 'red',
    },
  ];

  const integratedSnapshot = {
    apsCoverage: 91,
    regulationQueue: 207,
    occupancyRate: 88.2,
    averageStay: 4.1,
    telemedicineUsage: 41,
    infectionRate: 2.1,
    budgetExecution: 19.4,
    predictiveAdmissions: 63,
    medicationRisk: 24,
    financialVolume: 5.2,
  };

  const integratedKPIs = [
    {
      label: t('pages.hospitalsAccess.integrated.metrics.carePressure.label'),
      value: `${integratedSnapshot.occupancyRate.toFixed(1)}%`,
      detail: t('pages.hospitalsAccess.integrated.metrics.carePressure.detail', {
        averageStay: integratedSnapshot.averageStay.toFixed(1),
      }),
    },
    {
      label: t('pages.hospitalsAccess.integrated.metrics.flow.label'),
      value: `${integratedSnapshot.apsCoverage}% • ${integratedSnapshot.regulationQueue} ${t('pages.hospitalsAccess.integrated.metrics.flow.indicatorSuffix')}`,
      detail: t('pages.hospitalsAccess.integrated.metrics.flow.detail'),
    },
    {
      label: t('pages.hospitalsAccess.integrated.metrics.financial.label'),
      value: `R$ ${integratedSnapshot.financialVolume.toFixed(1)}M`,
      detail: t('pages.hospitalsAccess.integrated.metrics.financial.detail', {
        execution: integratedSnapshot.budgetExecution.toFixed(1),
      }),
    },
  ];

  const integratedHighlights = [
    {
      title: t('pages.hospitalsAccess.integrated.highlights.careFlow.title'),
      description: t('pages.hospitalsAccess.integrated.highlights.careFlow.description', {
        aps: integratedSnapshot.apsCoverage,
        queue: integratedSnapshot.regulationQueue,
      }),
      action: t('pages.hospitalsAccess.integrated.highlights.careFlow.action'),
      indicator: t('pages.hospitalsAccess.integrated.highlights.careFlow.indicator', {
        averageStay: integratedSnapshot.averageStay.toFixed(1),
      }),
    },
    {
      title: t('pages.hospitalsAccess.integrated.highlights.hospitalPressure.title'),
      description: t('pages.hospitalsAccess.integrated.highlights.hospitalPressure.description', {
        occupancy: integratedSnapshot.occupancyRate.toFixed(1),
        infection: integratedSnapshot.infectionRate.toFixed(1),
      }),
      action: t('pages.hospitalsAccess.integrated.highlights.hospitalPressure.action'),
      indicator: t('pages.hospitalsAccess.integrated.highlights.hospitalPressure.indicator', {
        predictiveAdmissions: integratedSnapshot.predictiveAdmissions,
      }),
    },
    {
      title: t('pages.hospitalsAccess.integrated.highlights.pharmacy.title'),
      description: t('pages.hospitalsAccess.integrated.highlights.pharmacy.description', {
        risk: integratedSnapshot.medicationRisk,
      }),
      action: t('pages.hospitalsAccess.integrated.highlights.pharmacy.action'),
      indicator: t('pages.hospitalsAccess.integrated.highlights.pharmacy.indicator', {
        telemedicine: integratedSnapshot.telemedicineUsage,
      }),
    },
  ];

  const decisionMatrix = [
    {
      axis: t('pages.hospitalsAccess.integrated.matrix.rows.careFlow.axis'),
      current: t('pages.hospitalsAccess.integrated.matrix.rows.careFlow.current', {
        aps: integratedSnapshot.apsCoverage,
        queue: integratedSnapshot.regulationQueue,
      }),
      trend: t('pages.hospitalsAccess.integrated.matrix.rows.careFlow.trend'),
      action: t('pages.hospitalsAccess.integrated.matrix.rows.careFlow.action'),
    },
    {
      axis: t('pages.hospitalsAccess.integrated.matrix.rows.bedManagement.axis'),
      current: t('pages.hospitalsAccess.integrated.matrix.rows.bedManagement.current', {
        occupancy: integratedSnapshot.occupancyRate.toFixed(1),
        averageStay: integratedSnapshot.averageStay.toFixed(1),
      }),
      trend: t('pages.hospitalsAccess.integrated.matrix.rows.bedManagement.trend'),
      action: t('pages.hospitalsAccess.integrated.matrix.rows.bedManagement.action'),
    },
    {
      axis: t('pages.hospitalsAccess.integrated.matrix.rows.pharmacy.axis'),
      current: t('pages.hospitalsAccess.integrated.matrix.rows.pharmacy.current', {
        risk: integratedSnapshot.medicationRisk,
      }),
      trend: t('pages.hospitalsAccess.integrated.matrix.rows.pharmacy.trend'),
      action: t('pages.hospitalsAccess.integrated.matrix.rows.pharmacy.action'),
    },
  ];

  const revenueData = [
    { name: t('pages.hospitalsAccess.charts.revenue.labels.sus'), value: 57 },
    { name: t('pages.hospitalsAccess.charts.revenue.labels.supplementary'), value: 43 },
  ];

  const occupancyData = [
    { name: t('pages.hospitalsAccess.charts.specialty.labels.clinic'), occupancy: 85 },
    { name: t('pages.hospitalsAccess.charts.specialty.labels.surgical'), occupancy: 92 },
    { name: t('pages.hospitalsAccess.charts.specialty.labels.icu'), occupancy: 95 },
    { name: t('pages.hospitalsAccess.charts.specialty.labels.pediatrics'), occupancy: 75 },
  ];

  const qualityData = [
    {
      month: t('pages.hospitalsAccess.charts.months.jan'),
      infection: 2.5,
      readmission: 8.5,
    },
    {
      month: t('pages.hospitalsAccess.charts.months.feb'),
      infection: 2.3,
      readmission: 8.2,
    },
    {
      month: t('pages.hospitalsAccess.charts.months.mar'),
      infection: 2.1,
      readmission: 8.3,
    },
  ];

  const clinicalCards = [
    {
      title: t('pages.hospitalsAccess.clinical.cards.activePatients'),
      value: '1,234',
      icon: <Users size={24} />,
      color: 'blue',
    },
    {
      title: t('pages.hospitalsAccess.clinical.cards.dailyAppointments'),
      value: '432',
      icon: <Calendar size={24} />,
      color: 'green',
    },
    {
      title: t('pages.hospitalsAccess.clinical.cards.protocolAdherence'),
      value: '97%',
      icon: <CheckCircle size={24} />,
      color: 'purple',
    },
  ];

  const laboratoryCards = [
    {
      title: t('pages.hospitalsAccess.laboratory.cards.monthlyExams'),
      value: '12,456',
      icon: <TestTube size={24} />,
      color: 'orange',
    },
    {
      title: t('pages.hospitalsAccess.laboratory.cards.turnaround'),
      value: '4 horas',
      icon: <Clock size={24} />,
      color: 'blue',
    },
    {
      title: t('pages.hospitalsAccess.laboratory.cards.averageCost'),
      value: 'R$ 45,80',
      icon: <DollarSign size={24} />,
      color: 'red',
    },
  ];

  const pharmacyCards = [
    {
      title: t('pages.hospitalsAccess.pharmacy.cards.dispensations'),
      value: '34,567',
      icon: <Pill size={24} />,
      color: 'green',
    },
    {
      title: t('pages.hospitalsAccess.pharmacy.cards.stockValue'),
      value: 'R$ 1.2M',
      icon: <Database size={24} />,
      color: 'purple',
    },
    {
      title: t('pages.hospitalsAccess.pharmacy.cards.expiredRate'),
      value: '0.8%',
      icon: <AlertTriangle size={24} />,
      color: 'red',
    },
  ];

  const modules = [
    {
      title: t('pages.hospitalsAccess.modules.rnds.title'),
      icon: <Database className="text-blue-400 mr-3" size={24} />,
      items: t('pages.hospitalsAccess.modules.rnds.items', { returnObjects: true }) as string[],
    },
    {
      title: t('pages.hospitalsAccess.modules.billingSus.title'),
      icon: <FileText className="text-green-400 mr-3" size={24} />,
      items: t('pages.hospitalsAccess.modules.billingSus.items', { returnObjects: true }) as string[],
    },
    {
      title: t('pages.hospitalsAccess.modules.supplementary.title'),
      icon: <Shield className="text-purple-400 mr-3" size={24} />,
      items: t('pages.hospitalsAccess.modules.supplementary.items', { returnObjects: true }) as string[],
    },
    {
      title: t('pages.hospitalsAccess.modules.oncology.title'),
      icon: <Heart className="text-pink-400 mr-3" size={24} />,
      items: t('pages.hospitalsAccess.modules.oncology.items', { returnObjects: true }) as string[],
    },
  ];

  const complianceCards = [
    {
      title: t('pages.hospitalsAccess.compliance.lgpd.title'),
      icon: <Shield className="text-green-400 mr-3" size={24} />,
      items: t('pages.hospitalsAccess.compliance.lgpd.items', { returnObjects: true }) as string[],
    },
    {
      title: t('pages.hospitalsAccess.compliance.digitalRecord.title'),
      icon: <FileText className="text-blue-400 mr-3" size={24} />,
      items: t('pages.hospitalsAccess.compliance.digitalRecord.items', { returnObjects: true }) as string[],
    },
    {
      title: t('pages.hospitalsAccess.compliance.interoperability.title'),
      icon: <Activity className="text-orange-400 mr-3" size={24} />,
      items: t('pages.hospitalsAccess.compliance.interoperability.items', { returnObjects: true }) as string[],
    },
  ];

  const references = [
    {
      title: t('pages.hospitalsAccess.references.rnds.title'),
      links: [
        { label: 'RNDS FHIR', href: 'https://rnds-fhir.saude.gov.br' },
        { label: 'Guia RNDS', href: 'https://rnds-guia.saude.gov.br' },
        { label: 'Portal RNDS', href: 'https://www.gov.br/saude/pt-br/composicao/seidigi/rnds' },
      ],
    },
    {
      title: t('pages.hospitalsAccess.references.sus.title'),
      links: [
        { label: 'SIGTAP', href: 'http://sigtap.datasus.gov.br' },
        { label: 'DATASUS', href: 'https://datasus.saude.gov.br' },
        { label: 'SIA Wiki', href: 'https://wiki.saude.gov.br/sia' },
      ],
    },
    {
      title: t('pages.hospitalsAccess.references.tiss.title'),
      links: [
        {
          label: 'Padrão TISS',
          href: 'https://www.gov.br/ans/pt-br/assuntos/prestadores/padrao-para-troca-de-informacao-de-saude-suplementar-2013-tiss',
        },
        {
          label: 'TISS ANS',
          href: 'https://www.ans.gov.br/prestadores/tiss-troca-de-informacao-de-saude-suplementar',
        },
      ],
    },
    {
      title: t('pages.hospitalsAccess.references.oncology.title'),
      links: [
        {
          label: 'Manual INCA',
          href: 'https://www.inca.gov.br/publicacoes/manuais/manual-de-bases-tecnicas-da-oncologia-sia-sus',
        },
        {
          label: 'Bases Técnicas',
          href: 'https://biblioteca.cofen.gov.br/manual-de-bases-tecnicas-oncologia',
        },
      ],
    },
    {
      title: t('pages.hospitalsAccess.references.compliance.title'),
      links: [
        {
          label: 'LGPD',
          href: 'https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm',
        },
        {
          label: t('pages.hospitalsAccess.references.compliance.prontuario'),
          href: 'https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13787.htm',
        },
        {
          label: 'SBIS-CFM',
          href: 'https://www.sbis.org.br/certificacao',
        },
      ],
    },
    {
      title: t('pages.hospitalsAccess.references.analytics.title'),
      links: [
        { label: 'TABNET', href: 'https://datasus.saude.gov.br/informacoes-de-saude-tabnet' },
        { label: 'TABWIN', href: 'http://tabnet.datasus.gov.br' },
      ],
    },
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">{t('pages.hospitalsAccess.header.title')}</h1>
          <p className="text-gray-400 text-lg">{t('pages.hospitalsAccess.header.subtitle')}</p>
        </div>

        <div id="kpis" className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">{t('pages.hospitalsAccess.kpis.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {generalKpis.map((kpi) => (
              <KpiCard key={kpi.title} {...kpi} />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {susKpis.map((kpi) => (
              <KpiCard key={kpi.title} {...kpi} />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {supplementalKpis.map((kpi) => (
              <KpiCard key={kpi.title} {...kpi} />
            ))}
          </div>
        </div>

        <div className="mb-10">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <Card className="bg-gray-900/80 border border-emerald-700/30 shadow-lg shadow-emerald-500/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  <span>{t('pages.hospitalsAccess.integrated.title')}</span>
                  <Badge variant="outline" className="border-emerald-500/40 text-emerald-200">
                    {t('pages.hospitalsAccess.integrated.badge')}
                  </Badge>
                </CardTitle>
                <p className="text-sm text-emerald-100/80">
                  {t('pages.hospitalsAccess.integrated.description')}
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {integratedKPIs.map((item) => (
                    <div key={item.label} className="rounded-xl border border-emerald-700/40 bg-emerald-500/5 p-4">
                      <p className="text-sm font-medium text-emerald-200">{item.label}</p>
                      <p className="mt-2 text-2xl font-bold text-white">{item.value}</p>
                      <p className="mt-1 text-xs text-emerald-100/70">{item.detail}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  {integratedHighlights.map((highlight) => (
                    <div key={highlight.title} className="rounded-xl border border-emerald-700/30 bg-slate-950/70 p-4">
                      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                        <div>
                          <h4 className="text-sm font-semibold uppercase tracking-wide text-emerald-200">
                            {highlight.title}
                          </h4>
                          <p className="mt-2 text-sm text-slate-200">{highlight.description}</p>
                          <p className="mt-3 text-xs font-semibold text-emerald-300">
                            {highlight.action}
                          </p>
                        </div>
                        <Badge variant="secondary" className="self-start bg-emerald-500/10 text-emerald-200">
                          {highlight.indicator}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/80 border border-gray-700/60">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  <span>{t('pages.hospitalsAccess.integrated.matrix.title')}</span>
                  <Badge variant="outline" className="border-slate-600 text-slate-200">
                    {t('pages.hospitalsAccess.integrated.matrix.horizon')}
                  </Badge>
                </CardTitle>
                <p className="text-sm text-slate-300">
                  {t('pages.hospitalsAccess.integrated.matrix.subtitle')}
                </p>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-800 text-sm text-slate-200">
                  <thead className="text-xs uppercase tracking-wide text-slate-400">
                    <tr>
                      <th className="px-4 py-2 text-left">{t('pages.hospitalsAccess.integrated.matrix.headers.axis')}</th>
                      <th className="px-4 py-2 text-left">{t('pages.hospitalsAccess.integrated.matrix.headers.current')}</th>
                      <th className="px-4 py-2 text-left">{t('pages.hospitalsAccess.integrated.matrix.headers.trend')}</th>
                      <th className="px-4 py-2 text-left">{t('pages.hospitalsAccess.integrated.matrix.headers.action')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {decisionMatrix.map((row) => (
                      <tr key={row.axis}>
                        <td className="px-4 py-3 font-semibold text-slate-100">{row.axis}</td>
                        <td className="px-4 py-3 text-slate-300">{row.current}</td>
                        <td className="px-4 py-3 text-emerald-300">{row.trend}</td>
                        <td className="px-4 py-3 text-slate-200">{row.action}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>
        </div>

        <div id="graficos" className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">{t('pages.hospitalsAccess.charts.title')}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card className="bg-gray-800/50 border border-gray-700 rounded-xl">
              <CardHeader>
                <CardTitle>{t('pages.hospitalsAccess.charts.production.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={occupancyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="occupancy" fill="#8884d8" name={t('pages.hospitalsAccess.charts.production.seriesTitle')} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="bg-gray-800/50 border border-gray-700 rounded-xl">
              <CardHeader>
                <CardTitle>{t('pages.hospitalsAccess.charts.occupancy.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={qualityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="infection" stroke="#e53e3e" name={t('pages.hospitalsAccess.charts.occupancy.series.infection')} />
                    <Line type="monotone" dataKey="readmission" stroke="#f59e0b" name={t('pages.hospitalsAccess.charts.occupancy.series.readmission')} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="bg-gray-800/50 border border-gray-700 rounded-xl">
              <CardHeader>
                <CardTitle>{t('pages.hospitalsAccess.charts.revenue.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie data={revenueData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
                      {revenueData.map((entry, index) => (
                        <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="bg-gray-800/50 border border-gray-700 rounded-xl">
              <CardHeader>
                <CardTitle>{t('pages.hospitalsAccess.charts.quality.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={qualityData}>
                    <Tooltip />
                    <Bar dataKey="infection" fill="#e53e3e" name={t('pages.hospitalsAccess.charts.quality.series.infection')} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="bg-gray-800/50 border border-gray-700 rounded-xl">
              <CardHeader>
                <CardTitle>{t('pages.hospitalsAccess.charts.specialty.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={occupancyData} layout="vertical">
                    <YAxis type="category" dataKey="name" />
                    <XAxis type="number" />
                    <Tooltip />
                    <Bar dataKey="occupancy" fill="#82ca9d" name={t('pages.hospitalsAccess.charts.specialty.series.occupancy')} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>

        <div id="gestao-clinica" className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">{t('pages.hospitalsAccess.clinical.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {clinicalCards.map((card) => (
              <KpiCard key={card.title} {...card} trend="stable" icon={card.icon} />
            ))}
          </div>
        </div>

        <div id="laboratorio" className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">{t('pages.hospitalsAccess.laboratory.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {laboratoryCards.map((card) => (
              <KpiCard key={card.title} {...card} trend="stable" icon={card.icon} />
            ))}
          </div>
        </div>

        <div id="farmacia" className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">{t('pages.hospitalsAccess.pharmacy.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pharmacyCards.map((card) => (
              <KpiCard key={card.title} {...card} trend="stable" icon={card.icon} />
            ))}
          </div>
        </div>

        <div id="modulos" className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">{t('pages.hospitalsAccess.modules.title')}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {modules.map((module) => (
              <div key={module.title} className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  {module.icon}
                  <h3 className="text-xl font-semibold text-white">{module.title}</h3>
                </div>
                <div className="text-gray-300 space-y-2 text-sm">
                  {module.items.map((item) => (
                    <p key={item}>• {item}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div id="conformidade" className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">{t('pages.hospitalsAccess.compliance.title')}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {complianceCards.map((card) => (
              <div key={card.title} className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  {card.icon}
                  <h3 className="text-lg font-semibold text-white">{card.title}</h3>
                </div>
                <div className="text-gray-300 space-y-2 text-sm">
                  {card.items.map((item) => (
                    <p key={item}>• {item}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">{t('pages.hospitalsAccess.references.title')}</h2>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
              {references.map((reference) => (
                <div key={reference.title}>
                  <h4 className="text-white font-semibold mb-2">{reference.title}</h4>
                  <div className="space-y-1 text-gray-400">
                    {reference.links.map((link) => (
                      <a key={link.href} href={link.href} className="hover:text-blue-400 block">
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center text-gray-500 text-sm">
          <p>{t('pages.hospitalsAccess.footer.developed')}</p>
          <p>{t('pages.hospitalsAccess.footer.compliance')}</p>
        </div>
      </div>
    </MainLayout>
  );
};

export default HospitalsAccess;
