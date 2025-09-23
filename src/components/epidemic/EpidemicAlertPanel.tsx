import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getRiskColor } from '@/data/piracicabaNeighborhoods';
import { 
  Bell, 
  AlertTriangle, 
  Clock, 
  Send, 
  Phone, 
  Mail,
  MessageCircle,
  CheckCircle,
  X,
  Eye,
  Calendar,
  TrendingUp,
  Zap,
  Settings
} from 'lucide-react';

interface Alert {
  id: string;
  type: 'SURTO' | 'AUMENTO_CASOS' | 'EMERGÊNCIA' | 'SISTEMA';
  neighborhood: string;
  message: string;
  timestamp: string;
  severity: 'baixa' | 'média' | 'alta' | 'crítica';
  status: 'ativo' | 'resolvido' | 'em_andamento';
  recipients: string[];
  actions: string[];
}

const mockAlerts: Alert[] = [
  {
    id: 'alert_001',
    type: 'EMERGÊNCIA',
    neighborhood: 'Monte Líbano',
    message: 'Surto de dengue confirmado - 132 casos ativos. Índice de infestação crítico.',
    timestamp: '2024-09-15T08:30:00Z',
    severity: 'crítica',
    status: 'ativo',
    recipients: ['gestor.saude@piracicaba.sp.gov.br', '+55199999-9999'],
    actions: ['Bloqueio epidemiológico', 'Busca ativa', 'Comunicação à população']
  },
  {
    id: 'alert_002',
    type: 'AUMENTO_CASOS',
    neighborhood: 'Piracicamirim',
    message: 'Aumento de 32% nos casos de COVID-19 nas últimas 72h. Monitoramento intensificado.',
    timestamp: '2024-09-15T06:15:00Z',
    severity: 'alta',
    status: 'em_andamento',
    recipients: ['vigilancia@piracicaba.sp.gov.br'],
    actions: ['Investigação epidemiológica', 'Testagem em massa']
  },
  {
    id: 'alert_003',
    type: 'SURTO',
    neighborhood: 'Paulista',
    message: 'Cluster de influenza detectado em CMEI local. 18 casos confirmados.',
    timestamp: '2024-09-14T14:20:00Z',
    severity: 'média',
    status: 'resolvido',
    recipients: ['educacao@piracicaba.sp.gov.br', 'vigilancia@piracicaba.sp.gov.br'],
    actions: ['Isolamento', 'Desinfecção da unidade', 'Vacinação emergencial']
  },
  {
    id: 'alert_004',
    type: 'SISTEMA',
    neighborhood: 'Centro',
    message: 'Falha na integração automática do SINAN. Verificação manual necessária.',
    timestamp: '2024-09-14T09:45:00Z',
    severity: 'baixa',
    status: 'resolvido',
    recipients: ['ti@piracicaba.sp.gov.br'],
    actions: ['Correção do conector', 'Backup manual']
  }
];

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'crítica': return 'bg-red-100 text-red-800 border-red-200';
    case 'alta': return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'média': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'baixa': return 'bg-blue-100 text-blue-800 border-blue-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'ativo': return 'bg-red-100 text-red-800';
    case 'em_andamento': return 'bg-yellow-100 text-yellow-800';
    case 'resolvido': return 'bg-green-100 text-green-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'EMERGÊNCIA': return <AlertTriangle className="h-4 w-4 text-red-600" />;
    case 'SURTO': return <Bell className="h-4 w-4 text-orange-600" />;
    case 'AUMENTO_CASOS': return <TrendingUp className="h-4 w-4 text-yellow-600" />;
    case 'SISTEMA': return <AlertTriangle className="h-4 w-4 text-blue-600" />;
    default: return <Bell className="h-4 w-4" />;
  }
};

export const EpidemicAlertPanel: React.FC = () => {
  const [selectedAlert, setSelectedAlert] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredAlerts = filterStatus === 'all' 
    ? mockAlerts 
    : mockAlerts.filter(alert => alert.status === filterStatus);

  const activeAlerts = mockAlerts.filter(alert => alert.status === 'ativo');
  const criticalAlerts = mockAlerts.filter(alert => alert.severity === 'crítica');

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Alertas Ativos</p>
                <p className="text-2xl font-bold text-red-600">{activeAlerts.length}</p>
              </div>
              <Bell className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Alertas Críticos</p>
                <p className="text-2xl font-bold text-purple-600">{criticalAlerts.length}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Última Atualização</p>
                <p className="text-sm font-medium">Há 15 minutos</p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Alerts List */}
        <Card className="lg:col-span-2 glass-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Alertas Epidemiológicos
              </CardTitle>
              <div className="flex gap-2">
                <Button 
                  variant={filterStatus === 'all' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setFilterStatus('all')}
                >
                  Todos
                </Button>
                <Button 
                  variant={filterStatus === 'ativo' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setFilterStatus('ativo')}
                >
                  Ativos
                </Button>
                <Button 
                  variant={filterStatus === 'resolvido' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setFilterStatus('resolvido')}
                >
                  Resolvidos
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {filteredAlerts.map((alert) => (
              <Alert 
                key={alert.id}
                className={`cursor-pointer transition-colors hover:bg-muted/50 ${
                  selectedAlert === alert.id ? 'border-primary bg-primary/5' : ''
                }`}
                onClick={() => setSelectedAlert(alert.id)}
              >
                <div className="flex items-start gap-3">
                  {getTypeIcon(alert.type)}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-sm">{alert.neighborhood}</h4>
                        <Badge className={getSeverityColor(alert.severity)}>
                          {alert.severity.toUpperCase()}
                        </Badge>
                        <Badge className={getStatusColor(alert.status)}>
                          {alert.status.replace('_', ' ').toUpperCase()}
                        </Badge>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {new Date(alert.timestamp).toLocaleString('pt-BR')}
                      </span>
                    </div>
                    
                    <AlertDescription className="text-sm">
                      {alert.message}
                    </AlertDescription>
                    
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-muted-foreground">Ações:</span>
                      {alert.actions.slice(0, 2).map((action, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {action}
                        </Badge>
                      ))}
                      {alert.actions.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{alert.actions.length - 2} mais
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </Alert>
            ))}
          </CardContent>
        </Card>

        {/* Alert Details & Actions */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Detalhes do Alerta
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedAlert ? (
              <div className="space-y-4">
                {(() => {
                  const alert = mockAlerts.find(a => a.id === selectedAlert);
                  if (!alert) return null;
                  
                  return (
                    <>
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-semibold text-sm mb-1">Bairro Afetado</h4>
                          <p className="text-sm">{alert.neighborhood}</p>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-sm mb-1">Tipo do Alerta</h4>
                          <div className="flex items-center gap-2">
                            {getTypeIcon(alert.type)}
                            <span className="text-sm">{alert.type}</span>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-sm mb-1">Descrição</h4>
                          <p className="text-sm text-muted-foreground">{alert.message}</p>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-sm mb-1">Ações Necessárias</h4>
                          <ul className="space-y-1">
                            {alert.actions.map((action, index) => (
                              <li key={index} className="text-sm flex items-center gap-2">
                                <CheckCircle className="h-3 w-3 text-green-600" />
                                {action}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-sm mb-1">Notificados</h4>
                          <div className="space-y-1">
                            {alert.recipients.map((recipient, index) => (
                              <div key={index} className="text-sm flex items-center gap-2">
                                {recipient.includes('@') ? (
                                  <Mail className="h-3 w-3 text-blue-600" />
                                ) : (
                                  <Phone className="h-3 w-3 text-green-600" />
                                )}
                                {recipient}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2 pt-4 border-t">
                        <Button size="sm" className="w-full">
                          <Send className="h-4 w-4 mr-2" />
                          Reenviar Notificação
                        </Button>
                        <Button variant="outline" size="sm" className="w-full">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Comunicar População
                        </Button>
                        {alert.status === 'ativo' && (
                          <Button variant="destructive" size="sm" className="w-full">
                            <X className="h-4 w-4 mr-2" />
                            Marcar como Resolvido
                          </Button>
                        )}
                      </div>
                    </>
                  );
                })()}
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-8">
                <Bell className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>Selecione um alerta para ver os detalhes</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Ações Rápidas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button variant="outline" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Novo Alerta
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              Comunicado Geral
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Agendar Alerta
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Configurar Alertas
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
