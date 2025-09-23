import React, { useState, useEffect } from 'react';
import { Bell, X, MapPin, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { piracicabaNeighborhoods } from '@/data/piracicabaNeighborhoods';

interface Alert {
  id: string;
  type: 'epidemic' | 'medication' | 'appointment' | 'system';
  title: string;
  message: string;
  neighborhood?: string;
  riskLevel?: string;
  timestamp: string;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

const UserSpecificAlerts = () => {
  const { userRole } = useAuth();
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Simular alertas baseados no tipo de usuário
    const generateAlerts = () => {
      const baseAlerts: Alert[] = [];
      
      if (userRole === 'paciente') {
        baseAlerts.push(
          {
            id: '1',
            type: 'epidemic',
            title: 'Alerta de Risco no Seu Bairro',
            message: 'Centro está em nível ALTO nesta semana. Evite aglomerações e mantenha máscara em locais fechados.',
            neighborhood: 'Centro',
            riskLevel: 'ALTO',
            timestamp: '5 min atrás',
            isRead: false,
            priority: 'high'
          },
          {
            id: '2',
            type: 'medication',
            title: 'Lembrete de Medicamento',
            message: 'Horário do Lisinopril 10mg - 08:00',
            timestamp: '15 min atrás',
            isRead: false,
            priority: 'medium'
          }
        );
      }
      
      if (userRole === 'medico') {
        baseAlerts.push(
          {
            id: '3',
            type: 'epidemic',
            title: 'Pacientes em Área de Risco',
            message: '5 pacientes seus estão em bairros com nível CRÍTICO',
            timestamp: '10 min atrás',
            isRead: false,
            priority: 'critical'
          },
          {
            id: '4',
            type: 'system',
            title: 'Protocolo Atualizado',
            message: 'Novo protocolo para casos suspeitos em áreas de alto risco',
            timestamp: '30 min atrás',
            isRead: true,
            priority: 'medium'
          }
        );
      }
      
      if (userRole === 'gestor') {
        baseAlerts.push(
          {
            id: '5',
            type: 'epidemic',
            title: 'Situação Crítica - Monte Líbano',
            message: 'Monte Líbano atingiu nível CRÍTICO. Mobilização das equipes de campo necessária.',
            neighborhood: 'Monte Líbano',
            riskLevel: 'CRÍTICO',
            timestamp: '2 min atrás',
            isRead: false,
            priority: 'critical'
          },
          {
            id: '6',
            type: 'system',
            title: 'Relatório Semanal Disponível',
            message: 'Dados epidemiológicos da semana 38/2024 consolidados',
            timestamp: '1 hora atrás',
            isRead: false,
            priority: 'low'
          }
        );
      }

      if (userRole === 'laboratorio') {
        baseAlerts.push(
          {
            id: '7',
            type: 'system',
            title: 'RNDS — Bundles em Análise',
            message: '3 Bundles rejeitados por "Observation.value[x]". Corrija mapeamento LOINC/UCUM.',
            timestamp: '4 min atrás',
            isRead: false,
            priority: 'critical'
          },
          {
            id: '8',
            type: 'system',
            title: 'Temperatura fora da faixa',
            message: 'Lote LT-48294 (Zona Norte) registrou 9°C. Ative runbook de contingência.',
            timestamp: '12 min atrás',
            isRead: false,
            priority: 'high'
          },
          {
            id: '9',
            type: 'system',
            title: 'Certificado ICP-Brasil',
            message: 'Certificado e-CNPJ expira em 7 dias. Planeje renovação.',
            timestamp: '30 min atrás',
            isRead: true,
            priority: 'medium'
          }
        );
      }
      
      return baseAlerts;
    };

    setAlerts(generateAlerts());
  }, [userRole]);

  const unreadCount = alerts.filter(alert => !alert.isRead).length;

  const markAsRead = (alertId: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId ? { ...alert, isRead: true } : alert
    ));
  };

  const markAllAsRead = () => {
    setAlerts(alerts.map(alert => ({ ...alert, isRead: true })));
  };

  const removeAlert = (alertId: string) => {
    setAlerts(alerts.filter(alert => alert.id !== alertId));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'high': return 'text-orange-400 bg-orange-500/20 border-orange-500/30';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      default: return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
    }
  };

  const getAlertIcon = (type: string, priority: string) => {
    if (priority === 'critical') return <AlertTriangle className="h-4 w-4 animate-pulse" />;
    if (type === 'epidemic') return <MapPin className="h-4 w-4" />;
    if (type === 'medication') return <Clock className="h-4 w-4" />;
    return <Bell className="h-4 w-4" />;
  };

  return (
    <div className="relative">
      {/* Notification Bell */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2"
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <Badge 
            className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center p-0 animate-pulse"
          >
            {unreadCount}
          </Badge>
        )}
      </Button>

      {/* Alerts Panel */}
      {isOpen && (
        <Card className="absolute right-0 top-10 w-80 max-h-96 overflow-hidden z-50 glass-morphism border-0 shadow-2xl">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Notificações</CardTitle>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={markAllAsRead}
                    className="text-xs h-6 px-2"
                  >
                    Marcar como lidas
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="h-6 w-6 p-0"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-0 max-h-64 overflow-y-auto">
            {alerts.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground text-sm">
                <CheckCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                Nenhuma notificação
              </div>
            ) : (
              <div className="space-y-1">
                {alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-3 border-l-2 hover:bg-muted/50 transition-colors cursor-pointer ${
                      !alert.isRead ? 'bg-primary/5 border-l-primary' : 'border-l-transparent'
                    }`}
                    onClick={() => markAsRead(alert.id)}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2 flex-1 min-w-0">
                        <div className={`p-1 rounded-full border ${getPriorityColor(alert.priority)}`}>
                          {getAlertIcon(alert.type, alert.priority)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium truncate">
                            {alert.title}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1 line-clamp-2">
                            {alert.message}
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs text-muted-foreground">
                              {alert.timestamp}
                            </span>
                            {alert.riskLevel && (
                            <Badge className={getPriorityColor(alert.priority)}>
                              {alert.riskLevel}
                            </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeAlert(alert.id);
                        }}
                        className="h-6 w-6 p-0 opacity-50 hover:opacity-100"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UserSpecificAlerts;
