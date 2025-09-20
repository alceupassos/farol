import React from 'react';
import { useTranslation } from 'react-i18next';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  FileText,
  Users,
  Clock,
  CheckCircle,
  AlertTriangle,
  Database,
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

const kpiIconMap: Record<string, React.ReactNode> = {
  activeRecords: <FileText size={24} />,
  activeUsers: <Users size={24} />,
  certification: <CheckCircle size={24} />,
  averageAccess: <Clock size={24} />,
};

const rawKpis = [
  {
    id: 'activeRecords',
    value: '10,450',
    change: '+3.5%',
    changeSuffixKey: 'pages.prontuarioDigital.kpis.changeSuffix',
    trend: 'up' as const,
    color: 'blue',
  },
  {
    id: 'activeUsers',
    value: '453',
    change: '+8%',
    changeSuffixKey: 'pages.prontuarioDigital.kpis.changeSuffix',
    trend: 'up' as const,
    color: 'green',
  },
  {
    id: 'certification',
    valueKey: 'pages.prontuarioDigital.kpis.cards.certification.value',
    changeKey: 'pages.prontuarioDigital.kpis.cards.certification.change',
    trend: 'up' as const,
    color: 'purple',
  },
  {
    id: 'averageAccess',
    value: '1.2s',
    change: '-0.3s',
    changeSuffixKey: 'pages.prontuarioDigital.kpis.changeSuffix',
    trend: 'down' as const,
    color: 'teal',
  },
];

const rawUtilizationData = [
  { month: 'jan', records: 8450, appointments: 12300, prescriptions: 9800 },
  { month: 'feb', records: 8920, appointments: 13100, prescriptions: 10400 },
  { month: 'mar', records: 9380, appointments: 14200, prescriptions: 11200 },
  { month: 'apr', records: 9650, appointments: 13800, prescriptions: 10900 },
  { month: 'may', records: 10100, appointments: 14800, prescriptions: 11800 },
  { month: 'jun', records: 10450, appointments: 15200, prescriptions: 12300 },
];

const rawModulesData = [
  { id: 'electronicPrescription', value: 32, users: 145 },
  { id: 'medicalNotes', value: 28, users: 128 },
  { id: 'labExams', value: 22, users: 98 },
  { id: 'medicalImaging', value: 18, users: 82 },
];

const rawCertificationData = [
  { id: 'sbisLevel1', compliance: 98.5 },
  { id: 'sbisLevel2', compliance: 95.2 },
  { id: 'icpBrasil', compliance: 97.8 },
  { id: 'law13787', compliance: 96.4 },
  { id: 'cfm1821', compliance: 94.7 },
];

const featureConfig = [
  { id: 'electronicPrescription', containerClass: 'bg-blue-900/30' },
  { id: 'digitalSignature', containerClass: 'bg-green-900/30' },
  { id: 'fullAudit', containerClass: 'bg-purple-900/30' },
  { id: 'interoperability', containerClass: 'bg-teal-900/30' },
];

const performanceConfig = [
  { id: 'availability', value: '99.9%', valueClass: 'text-green-400', barClass: 'bg-green-400', width: '99.9%' },
  { id: 'responseTime', value: '1.2s', valueClass: 'text-blue-400', barClass: 'bg-blue-400', width: '88%' },
  { id: 'userSatisfaction', value: '94.2%', valueClass: 'text-purple-400', barClass: 'bg-purple-400', width: '94.2%' },
  { id: 'automaticBackup', value: '100%', valueClass: 'text-yellow-400', barClass: 'bg-yellow-400', width: '100%' },
];

const statusConfig = [
  {
    id: 'certValid',
    containerClass: 'bg-green-900/20 border border-green-800',
    icon: CheckCircle,
    iconColor: 'text-green-400',
  },
  {
    id: 'backup',
    containerClass: 'bg-blue-900/20 border border-blue-800',
    icon: Database,
    iconColor: 'text-blue-400',
  },
  {
    id: 'updateAvailable',
    containerClass: 'bg-yellow-900/20 border border-yellow-800',
    icon: AlertTriangle,
    iconColor: 'text-yellow-400',
  },
  {
    id: 'maintenance',
    containerClass: 'bg-purple-900/20 border border-purple-800',
    icon: Clock,
    iconColor: 'text-purple-400',
  },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

type KpiTrend = 'up' | 'down' | 'stable';

const KpiCard = ({
  title,
  value,
  change,
  changeSuffix,
  trend,
  icon,
  color = 'blue',
}: {
  title: string;
  value: string;
  change?: string;
  changeSuffix?: string;
  trend?: KpiTrend;
  icon: React.ReactNode;
  color?: string;
}) => (
  <div className="bg-gray-900/80 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm">
    <div className="flex items-center justify-between mb-3">
      <p className="text-sm font-medium text-gray-200">{title}</p>
      <div className={`text-${color}-400`}>{icon}</div>
    </div>
    <p className="text-3xl font-bold text-white">{value}</p>
    {change && (
      <p
        className={`text-xs mt-2 ${
          trend === 'down'
            ? 'text-red-400'
            : trend === 'up'
            ? 'text-green-400'
            : 'text-gray-300'
        }`}
      >
        {changeSuffix ? `${change} ${changeSuffix}` : change}
      </p>
    )}
  </div>
);

const ProntuarioDigitalPage = () => {
  const { t } = useTranslation();

  const headerTitle = t('pages.prontuarioDigital.header.title');
  const headerSubtitle = t('pages.prontuarioDigital.header.subtitle');
  const highlightTitle = t('pages.prontuarioDigital.header.highlightTitle');
  const highlightBody = t('pages.prontuarioDigital.header.highlightBody');

  const kpis = rawKpis.map((item) => ({
    id: item.id,
    title: t(`pages.prontuarioDigital.kpis.cards.${item.id}.title`),
    value: item.valueKey ? t(item.valueKey) : item.value,
    change: item.changeKey ? t(item.changeKey) : item.change,
    changeSuffix: item.changeSuffixKey ? t(item.changeSuffixKey) : undefined,
    trend: item.trend,
    color: item.color,
    icon: kpiIconMap[item.id],
  }));

  const utilizationMonths = t('pages.prontuarioDigital.charts.utilization.months', {
    returnObjects: true,
  }) as Record<string, string>;

  const utilizationData = rawUtilizationData.map((item) => ({
    month: utilizationMonths[item.month] ?? item.month,
    records: item.records,
    appointments: item.appointments,
    prescriptions: item.prescriptions,
  }));

  const modulesData = rawModulesData.map((item) => ({
    ...item,
    name: t(`pages.prontuarioDigital.charts.modules.names.${item.id}`),
  }));

  const certificationData = rawCertificationData.map((item) => ({
    category: t(`pages.prontuarioDigital.charts.certification.categories.${item.id}`),
    compliance: item.compliance,
  }));

  const featureCards = featureConfig.map((item) => ({
    title: t(`pages.prontuarioDigital.features.items.${item.id}.title`),
    description: t(`pages.prontuarioDigital.features.items.${item.id}.description`),
    className: item.containerClass,
  }));

  const performanceMetrics = performanceConfig.map((item) => ({
    label: t(`pages.prontuarioDigital.performance.metrics.${item.id}`),
    value: item.value,
    valueClass: item.valueClass,
    barClass: item.barClass,
    width: item.width,
  }));

  const statusItems = statusConfig.map((item) => {
    const Icon = item.icon;
    return {
      id: item.id,
      containerClass: item.containerClass,
      icon: <Icon className={`h-5 w-5 ${item.iconColor} mt-0.5`} />,
      title: t(`pages.prontuarioDigital.status.items.${item.id}.title`),
      description: t(`pages.prontuarioDigital.status.items.${item.id}.description`),
    };
  });

  const moduleLabel = (name: string, value: number, users: number) =>
    t('pages.prontuarioDigital.charts.modules.label', { name, value, users });

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center">
            <FileText className="h-10 w-10 mr-4 text-blue-400" />
            {headerTitle}
          </h1>
          <p className="text-gray-400 text-lg mb-4">{headerSubtitle}</p>
          <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-4">
            <p className="text-blue-200 text-sm leading-relaxed">
              <strong>{highlightTitle}</strong> {highlightBody}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpis.map((kpi) => (
            <KpiCard
              key={kpi.id}
              title={kpi.title}
              value={kpi.value ?? ''}
              change={kpi.change}
              changeSuffix={kpi.changeSuffix}
              trend={kpi.trend}
              icon={kpi.icon}
              color={kpi.color}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">
                {t('pages.prontuarioDigital.charts.utilization.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={utilizationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="records"
                    stroke="#8884d8"
                    name={t('pages.prontuarioDigital.charts.utilization.series.records')}
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="appointments"
                    stroke="#00C49F"
                    name={t('pages.prontuarioDigital.charts.utilization.series.appointments')}
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="prescriptions"
                    stroke="#FFBB28"
                    name={t('pages.prontuarioDigital.charts.utilization.series.prescriptions')}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">
                {t('pages.prontuarioDigital.charts.modules.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={modulesData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value, users }) => moduleLabel(name, value, users as number)}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {modulesData.map((entry, index) => (
                      <Cell key={`cell-${entry.id}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, t('pages.prontuarioDigital.charts.modules.tooltipLabel')]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gray-800/50 border border-gray-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white">
              {t('pages.prontuarioDigital.charts.certification.title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={certificationData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} hide />
                <YAxis dataKey="category" type="category" width={180} />
                <Tooltip
                  formatter={(value: number) => [t('pages.prontuarioDigital.charts.certification.tooltip', { value }), t('pages.prontuarioDigital.charts.certification.axisLabel')]}
                />
                <Bar dataKey="compliance" fill="#4ECDC4" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">
                {t('pages.prontuarioDigital.features.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {featureCards.map((item) => (
                  <div
                    key={item.title}
                    className={`flex items-center justify-between p-3 rounded-lg ${item.className}`}
                  >
                    <div>
                      <span className="text-gray-300 font-medium">{item.title}</span>
                      <p className="text-sm text-blue-200">{item.description}</p>
                    </div>
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">
                {t('pages.prontuarioDigital.performance.title')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {performanceMetrics.map((metric) => (
                <div key={metric.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">{metric.label}</span>
                    <span className={metric.valueClass}>{metric.value}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className={`${metric.barClass} h-2 rounded-full`}
                      style={{ width: metric.width }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">
                {t('pages.prontuarioDigital.status.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {statusItems.map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-start space-x-3 p-3 rounded-lg ${item.containerClass}`}
                  >
                    {item.icon}
                    <div>
                      <p className="text-sm font-medium text-white">{item.title}</p>
                      <p className="text-xs text-slate-300">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProntuarioDigitalPage;
