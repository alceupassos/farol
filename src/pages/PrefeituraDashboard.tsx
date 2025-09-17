import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  DollarSign, 
  Heart, 
  Building, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp, 
  TrendingDown,
  Activity, 
  MapPin, 
  Shield,
  Stethoscope,
  Ambulance,
  Baby,
  Calendar,
  Target,
  FileText,
  BarChart3,
  PieChart as PieChartIcon,
  Thermometer,
  Eye,
  Pill
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  AreaChart, 
  Area, 
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

const PrefeituraDashboard = () => {
  const indicadores = [
    { mes: 'Jan', cobertura: 78, mortalidade: 12.5 },
    { mes: 'Fev', cobertura: 80, mortalidade: 11.8 },
    { mes: 'Mar', cobertura: 82, mortalidade: 11.2 },
    { mes: 'Abr', cobertura: 85, mortalidade: 10.8 }
  ];

  const orcamento = [
    { area: 'Atenção Básica', valor: 45 },
    { area: 'Média Complexidade', valor: 30 },
    { area: 'Alta Complexidade', valor: 15 },
    { area: 'Vigilância', valor: 10 }
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center">
            <Building className="h-10 w-10 mr-4 text-blue-400" />
            Visão Geral - Prefeitura Municipal
          </h1>
          <p className="text-blue-200 text-lg">
            Dashboard Executivo para Prefeito e Secretário Municipal de Saúde
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-800/90 backdrop-blur border-gray-700">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-300">Cobertura APS</p>
                  <p className="text-2xl font-bold text-white">87%</p>
                  <p className="text-xs text-green-400">Meta: 90%</p>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/90 backdrop-blur border-gray-700">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-300">Orçamento Saúde</p>
                  <p className="text-2xl font-bold text-white">18,5%</p>
                  <p className="text-xs text-green-400">R$ 45,2M</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/90 backdrop-blur border-gray-700">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-300">Mortalidade Infantil</p>
                  <p className="text-2xl font-bold text-white">10,5</p>
                  <p className="text-xs text-yellow-400">por 1.000</p>
                </div>
                <Heart className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/90 backdrop-blur border-gray-700">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-300">Unidades</p>
                  <p className="text-2xl font-bold text-white">34</p>
                  <p className="text-xs text-blue-400">UBS + UPA</p>
                </div>
                <Building className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* KPIs Adicionais */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gray-800/90 backdrop-blur border-gray-700">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-cyan-300">Vacinação</p>
                  <p className="text-2xl font-bold text-white">92%</p>
                  <p className="text-xs text-green-400">Meta: 95%</p>
                </div>
                <Shield className="h-8 w-8 text-cyan-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800/90 backdrop-blur border-gray-700">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-pink-300">Consultas/Mês</p>
                  <p className="text-2xl font-bold text-white">11.2K</p>
                  <p className="text-xs text-green-400">+8%</p>
                </div>
                <Stethoscope className="h-8 w-8 text-pink-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800/90 backdrop-blur border-gray-700">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-red-300">Equipes ESF</p>
                  <p className="text-2xl font-bold text-white">50</p>
                  <p className="text-xs text-blue-400">5 regiões</p>
                </div>
                <Users className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-gray-800/90 backdrop-blur border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Indicadores Municipais</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={indicadores}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="cobertura" stroke="#2563eb" strokeWidth={2} name="Cobertura APS" />
                  <Line type="monotone" dataKey="mortalidade" stroke="#dc2626" strokeWidth={2} name="Mortalidade" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/90 backdrop-blur border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Orçamento por Área</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={orcamento}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="area" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="valor" fill="#2563eb" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default PrefeituraDashboard;
