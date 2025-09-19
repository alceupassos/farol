import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Globe, 
  MapPin, 
  Clock, 
  Monitor, 
  User, 
  Search, 
  Filter,
  Download,
  Eye,
  Wifi,
  Calendar,
  RefreshCw
} from 'lucide-react';
import { toast } from 'sonner';

interface AccessLog {
  id: string;
  ip_address: string;
  user_agent: string;
  country: string;
  region: string;
  city: string;
  latitude: number;
  longitude: number;
  timezone: string;
  isp: string;
  page_accessed: string;
  referrer: string;
  session_id: string;
  user_email: string;
  access_time: string;
}

const AccessLogsPage: React.FC = () => {
  const [logs, setLogs] = useState<AccessLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [countryFilter, setCountryFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [stats, setStats] = useState({
    totalAccesses: 0,
    uniqueIPs: 0,
    uniqueCountries: 0,
    todayAccesses: 0
  });

  useEffect(() => {
    // Generate sample logs if none exist
    const existingLogs = localStorage.getItem('access_logs');
    if (!existingLogs) {
      generateSampleLogs();
    }
    fetchLogs();
  }, []);

  const generateSampleLogs = () => {
    const sampleLogs = [
      {
        id: 'log_1',
        ip_address: '192.168.1.100',
        user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        country: 'Brazil',
        region: 'Rio de Janeiro',
        city: 'Angra dos Reis',
        latitude: -23.0067,
        longitude: -44.3186,
        timezone: 'America/Sao_Paulo',
        isp: 'Vivo Fibra',
        page_accessed: '/',
        referrer: '',
        session_id: 'session_demo_1',
        user_email: 'admin@saudepublica.com',
        access_time: new Date(Date.now() - 1000 * 60 * 5).toISOString() // 5 min ago
      },
      {
        id: 'log_2',
        ip_address: '201.23.45.67',
        user_agent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        country: 'Brazil',
        region: 'São Paulo',
        city: 'São Paulo',
        latitude: -23.5505,
        longitude: -46.6333,
        timezone: 'America/Sao_Paulo',
        isp: 'NET Virtua',
        page_accessed: '/dashboard',
        referrer: 'https://google.com',
        session_id: 'session_demo_2',
        user_email: 'medico@saudepublica.com',
        access_time: new Date(Date.now() - 1000 * 60 * 15).toISOString() // 15 min ago
      },
      {
        id: 'log_3',
        ip_address: '177.12.34.56',
        user_agent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15',
        country: 'Brazil',
        region: 'Minas Gerais',
        city: 'Belo Horizonte',
        latitude: -19.9167,
        longitude: -43.9345,
        timezone: 'America/Sao_Paulo',
        isp: 'Oi Fibra',
        page_accessed: '/telemedicine',
        referrer: '',
        session_id: 'session_demo_3',
        user_email: null,
        access_time: new Date(Date.now() - 1000 * 60 * 30).toISOString() // 30 min ago
      },
      {
        id: 'log_4',
        ip_address: '189.45.67.89',
        user_agent: 'Mozilla/5.0 (Android 11; Mobile; rv:68.0) Gecko/68.0 Firefox/88.0',
        country: 'Argentina',
        region: 'Buenos Aires',
        city: 'Buenos Aires',
        latitude: -34.6118,
        longitude: -58.3960,
        timezone: 'America/Argentina/Buenos_Aires',
        isp: 'Telecom Argentina',
        page_accessed: '/qrcodenovo',
        referrer: '',
        session_id: 'session_demo_4',
        user_email: null,
        access_time: new Date(Date.now() - 1000 * 60 * 60).toISOString() // 1 hour ago
      },
      {
        id: 'log_5',
        ip_address: '200.100.50.25',
        user_agent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124',
        country: 'Chile',
        region: 'Santiago Metropolitan',
        city: 'Santiago',
        latitude: -33.4489,
        longitude: -70.6693,
        timezone: 'America/Santiago',
        isp: 'Movistar Chile',
        page_accessed: '/access-logs',
        referrer: 'https://sistema.gov.cl',
        session_id: 'session_demo_5',
        user_email: 'gestor@saudepublica.com',
        access_time: new Date(Date.now() - 1000 * 60 * 90).toISOString() // 1.5 hours ago
      }
    ];

    localStorage.setItem('access_logs', JSON.stringify(sampleLogs));
  };

  const fetchLogs = async () => {
    setLoading(true);
    try {
      // Get logs from localStorage
      const storedLogs = localStorage.getItem('access_logs');
      const logsData = storedLogs ? JSON.parse(storedLogs) : [];
      
      setLogs(logsData);
      calculateStats(logsData);
      
      toast.success(`${logsData.length} logs carregados com sucesso`);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (logsData: AccessLog[]) => {
    const uniqueIPs = new Set(logsData.map(log => log.ip_address)).size;
    const uniqueCountries = new Set(logsData.map(log => log.country).filter(Boolean)).size;
    const today = new Date().toISOString().split('T')[0];
    const todayAccesses = logsData.filter(log => 
      log.access_time.startsWith(today)
    ).length;

    setStats({
      totalAccesses: logsData.length,
      uniqueIPs,
      uniqueCountries,
      todayAccesses
    });
  };

  const filteredLogs = logs.filter(log => {
    const matchesSearch = !searchTerm || 
      log.ip_address.includes(searchTerm) ||
      log.country?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.user_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.page_accessed?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCountry = !countryFilter || log.country === countryFilter;
    const matchesDate = !dateFilter || log.access_time.startsWith(dateFilter);

    return matchesSearch && matchesCountry && matchesDate;
  });

  const uniqueCountries = [...new Set(logs.map(log => log.country).filter(Boolean))];

  const exportLogs = () => {
    const csvContent = [
      ['Data/Hora', 'IP', 'País', 'Região', 'Cidade', 'ISP', 'Página', 'Email', 'User Agent'].join(','),
      ...filteredLogs.map(log => [
        log.access_time,
        log.ip_address,
        log.country || '',
        log.region || '',
        log.city || '',
        log.isp || '',
        log.page_accessed || '',
        log.user_email || '',
        `"${log.user_agent || ''}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `access_logs_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR');
  };

  const getBrowserFromUserAgent = (userAgent: string) => {
    if (!userAgent) return 'Desconhecido';
    if (userAgent.includes('Chrome')) return 'Chrome';
    if (userAgent.includes('Firefox')) return 'Firefox';
    if (userAgent.includes('Safari')) return 'Safari';
    if (userAgent.includes('Edge')) return 'Edge';
    return 'Outro';
  };

  const getCountryFlag = (country: string) => {
    const countryFlags: { [key: string]: string } = {
      'Brazil': '🇧🇷',
      'United States': '🇺🇸',
      'Argentina': '🇦🇷',
      'Chile': '🇨🇱',
      'Colombia': '🇨🇴',
      'Mexico': '🇲🇽',
      'Spain': '🇪🇸',
      'Portugal': '🇵🇹',
      'France': '🇫🇷',
      'Germany': '🇩🇪',
      'United Kingdom': '🇬🇧'
    };
    return countryFlags[country] || '🌍';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
              <Eye className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Logs de Acesso do Sistema
              </h1>
              <p className="text-gray-600">
                Monitoramento em tempo real de acessos com geolocalização
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Total de Acessos</p>
                  <p className="text-2xl font-bold">{stats.totalAccesses}</p>
                </div>
                <Globe className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">IPs Únicos</p>
                  <p className="text-2xl font-bold">{stats.uniqueIPs}</p>
                </div>
                <Wifi className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Países</p>
                  <p className="text-2xl font-bold">{stats.uniqueCountries}</p>
                </div>
                <MapPin className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">Hoje</p>
                  <p className="text-2xl font-bold">{stats.todayAccesses}</p>
                </div>
                <Calendar className="h-8 w-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filtros e Controles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Buscar</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="IP, país, cidade, email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">País</label>
                <select
                  value={countryFilter}
                  onChange={(e) => setCountryFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Todos os países</option>
                  {uniqueCountries.map(country => (
                    <option key={country} value={country}>
                      {getCountryFlag(country)} {country}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Data</label>
                <Input
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Ações</label>
                <div className="flex gap-2">
                  <Button
                    onClick={fetchLogs}
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    <RefreshCw className="h-4 w-4 mr-1" />
                    Atualizar
                  </Button>
                  <Button
                    onClick={exportLogs}
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Exportar
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Logs Table */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Logs de Acesso ({filteredLogs.length} registros)</span>
              {loading && (
                <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="text-left p-3 font-medium">Data/Hora</th>
                    <th className="text-left p-3 font-medium">IP</th>
                    <th className="text-left p-3 font-medium">Localização</th>
                    <th className="text-left p-3 font-medium">ISP</th>
                    <th className="text-left p-3 font-medium">Página</th>
                    <th className="text-left p-3 font-medium">Usuário</th>
                    <th className="text-left p-3 font-medium">Navegador</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLogs.map((log) => (
                    <tr key={log.id} className="border-b hover:bg-gray-50">
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span className="text-xs">
                            {formatDate(log.access_time)}
                          </span>
                        </div>
                      </td>
                      <td className="p-3">
                        <Badge variant="outline" className="font-mono text-xs">
                          {log.ip_address}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1">
                            <span>{getCountryFlag(log.country)}</span>
                            <span className="text-sm font-medium">{log.country}</span>
                          </div>
                          <div className="text-xs text-gray-500">
                            {log.region}, {log.city}
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <span className="text-xs text-gray-600">{log.isp}</span>
                      </td>
                      <td className="p-3">
                        <Badge variant="secondary" className="text-xs">
                          {log.page_accessed}
                        </Badge>
                      </td>
                      <td className="p-3">
                        {log.user_email ? (
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3 text-green-600" />
                            <span className="text-xs text-green-600">{log.user_email}</span>
                          </div>
                        ) : (
                          <span className="text-xs text-gray-400">Anônimo</span>
                        )}
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-1">
                          <Monitor className="h-3 w-3 text-gray-400" />
                          <span className="text-xs">{getBrowserFromUserAgent(log.user_agent)}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {filteredLogs.length === 0 && !loading && (
                <div className="text-center py-8 text-gray-500">
                  <Eye className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Nenhum log de acesso encontrado</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AccessLogsPage;
