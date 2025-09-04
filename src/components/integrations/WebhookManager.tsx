import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Webhook, CheckCircle, XCircle, Clock, Plus, Edit, Trash2, Send, RefreshCw } from "lucide-react";

interface WebhookEndpoint {
  id: string;
  name: string;
  url: string;
  events: string[];
  status: 'active' | 'inactive' | 'error';
  lastTriggered: Date;
  deliveryRate: number;
  retryCount: number;
  secret: string;
  createdAt: Date;
  description?: string;
}

interface WebhookEvent {
  id: string;
  webhookId: string;
  event: string;
  payload: any;
  status: 'delivered' | 'failed' | 'pending' | 'retrying';
  attempts: number;
  lastAttempt: Date;
  responseCode?: number;
  errorMessage?: string;
}

interface WebhookManagerProps {
  compact?: boolean;
}

export const WebhookManager: React.FC<WebhookManagerProps> = ({ compact = false }) => {
  const [webhooks, setWebhooks] = useState<WebhookEndpoint[]>([]);
  const [events, setEvents] = useState<WebhookEvent[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedWebhook, setSelectedWebhook] = useState<string>('all');

  useEffect(() => {
    generateWebhookData();
  }, []);

  const generateWebhookData = () => {
    const sampleWebhooks: WebhookEndpoint[] = [
      {
        id: '1',
        name: 'Hospital das Clínicas Notifications',
        url: 'https://api.hc.fm.usp.br/webhooks/medchain',
        events: ['patient.created', 'patient.updated', 'lab.result.ready'],
        status: 'active',
        lastTriggered: new Date(Date.now() - 15 * 60 * 1000),
        deliveryRate: 98.5,
        retryCount: 3,
        secret: 'whsec_123456789abcdef',
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        description: 'Notificações de pacientes e resultados de exames'
      },
      {
        id: '2',
        name: 'Laboratório Fleury Integration',
        url: 'https://webhook.fleury.com.br/medchain/results',
        events: ['lab.result.ready', 'lab.result.updated'],
        status: 'active',
        lastTriggered: new Date(Date.now() - 5 * 60 * 1000),
        deliveryRate: 95.2,
        retryCount: 5,
        secret: 'whsec_987654321fedcba',
        createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
        description: 'Integração para resultados de laboratório'
      },
      {
        id: '3',
        name: 'SMS Notification Service',
        url: 'https://sms-service.example.com/webhook',
        events: ['alert.critical', 'appointment.reminder'],
        status: 'error',
        lastTriggered: new Date(Date.now() - 2 * 60 * 60 * 1000),
        deliveryRate: 67.8,
        retryCount: 3,
        secret: 'whsec_abcdef123456789',
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        description: 'Serviço de notificações por SMS'
      },
      {
        id: '4',
        name: 'DATASUS Reporting',
        url: 'https://reporting.datasus.gov.br/medchain',
        events: ['epidemiological.alert', 'mortality.data'],
        status: 'inactive',
        lastTriggered: new Date(Date.now() - 24 * 60 * 60 * 1000),
        deliveryRate: 89.1,
        retryCount: 2,
        secret: 'whsec_datasus_reporting',
        createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
        description: 'Relatórios epidemiológicos para DATASUS'
      }
    ];

    const sampleEvents: WebhookEvent[] = [
      {
        id: '1',
        webhookId: '1',
        event: 'patient.created',
        payload: { patientId: 'P123456', name: 'João Silva', timestamp: new Date() },
        status: 'delivered',
        attempts: 1,
        lastAttempt: new Date(Date.now() - 15 * 60 * 1000),
        responseCode: 200
      },
      {
        id: '2',
        webhookId: '2',
        event: 'lab.result.ready',
        payload: { resultId: 'R789012', patientId: 'P123456', type: 'blood_test' },
        status: 'delivered',
        attempts: 1,
        lastAttempt: new Date(Date.now() - 5 * 60 * 1000),
        responseCode: 200
      },
      {
        id: '3',
        webhookId: '3',
        event: 'alert.critical',
        payload: { alertId: 'A456789', type: 'dengue_outbreak', region: 'Centro' },
        status: 'failed',
        attempts: 3,
        lastAttempt: new Date(Date.now() - 30 * 60 * 1000),
        responseCode: 500,
        errorMessage: 'Connection timeout'
      },
      {
        id: '4',
        webhookId: '1',
        event: 'patient.updated',
        payload: { patientId: 'P123456', changes: ['address', 'phone'] },
        status: 'retrying',
        attempts: 2,
        lastAttempt: new Date(Date.now() - 10 * 60 * 1000),
        responseCode: 502,
        errorMessage: 'Bad gateway'
      }
    ];

    setWebhooks(sampleWebhooks);
    setEvents(sampleEvents);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-500 border-green-500/30';
      case 'inactive': return 'bg-gray-500/20 text-gray-500 border-gray-500/30';
      case 'error': return 'bg-red-500/20 text-red-500 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-500 border-gray-500/30';
    }
  };

  const getEventStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-500/20 text-green-500 border-green-500/30';
      case 'failed': return 'bg-red-500/20 text-red-500 border-red-500/30';
      case 'pending': return 'bg-blue-500/20 text-blue-500 border-blue-500/30';
      case 'retrying': return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30';
      default: return 'bg-gray-500/20 text-gray-500 border-gray-500/30';
    }
  };

  const getEventIcon = (status: string) => {
    switch (status) {
      case 'delivered': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'failed': return <XCircle className="w-4 h-4 text-red-500" />;
      case 'pending': return <Clock className="w-4 h-4 text-blue-500" />;
      case 'retrying': return <RefreshCw className="w-4 h-4 text-yellow-500" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const toggleWebhookStatus = (webhookId: string) => {
    setWebhooks(prev => prev.map(webhook => 
      webhook.id === webhookId 
        ? { 
            ...webhook, 
            status: webhook.status === 'active' ? 'inactive' : 'active'
          }
        : webhook
    ));
  };

  const retryWebhook = (eventId: string) => {
    setEvents(prev => prev.map(event => 
      event.id === eventId 
        ? { 
            ...event, 
            status: 'retrying' as const,
            attempts: event.attempts + 1,
            lastAttempt: new Date()
          }
        : event
    ));
  };

  if (compact) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Webhook className="w-5 h-5" />
            Webhooks Ativos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {webhooks.filter(w => w.status === 'active').slice(0, 3).map((webhook) => (
              <div key={webhook.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div>
                  <div className="font-medium text-sm">{webhook.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {webhook.deliveryRate}% entrega • {webhook.events.length} eventos
                  </div>
                </div>
                <Badge className={getStatusColor(webhook.status)}>
                  {webhook.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Webhook Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Webhook className="w-6 h-6 mx-auto mb-2 text-blue-500" />
            <div className="text-2xl font-bold">{webhooks.length}</div>
            <div className="text-xs text-muted-foreground">Total Webhooks</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <CheckCircle className="w-6 h-6 mx-auto mb-2 text-green-500" />
            <div className="text-2xl font-bold">{webhooks.filter(w => w.status === 'active').length}</div>
            <div className="text-xs text-muted-foreground">Ativos</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <XCircle className="w-6 h-6 mx-auto mb-2 text-red-500" />
            <div className="text-2xl font-bold">{events.filter(e => e.status === 'failed').length}</div>
            <div className="text-xs text-muted-foreground">Falhas Hoje</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <RefreshCw className="w-6 h-6 mx-auto mb-2 text-yellow-500" />
            <div className="text-2xl font-bold">{events.filter(e => e.status === 'retrying').length}</div>
            <div className="text-xs text-muted-foreground">Tentativas</div>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <Select value={selectedWebhook} onValueChange={setSelectedWebhook}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filtrar webhook" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os Webhooks</SelectItem>
            {webhooks.map((webhook) => (
              <SelectItem key={webhook.id} value={webhook.id}>{webhook.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Adicionar Webhook
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Adicionar Webhook</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="webhook-name">Nome</Label>
                <Input id="webhook-name" placeholder="Nome do webhook" />
              </div>
              <div>
                <Label htmlFor="webhook-url">URL</Label>
                <Input id="webhook-url" placeholder="https://api.exemplo.com/webhook" />
              </div>
              <div>
                <Label htmlFor="webhook-events">Eventos</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione os eventos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="patient.created">Paciente Criado</SelectItem>
                    <SelectItem value="patient.updated">Paciente Atualizado</SelectItem>
                    <SelectItem value="lab.result.ready">Resultado Pronto</SelectItem>
                    <SelectItem value="alert.critical">Alerta Crítico</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="webhook-description">Descrição</Label>
                <Textarea id="webhook-description" placeholder="Descrição do webhook..." />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancelar</Button>
                <Button onClick={() => setIsAddDialogOpen(false)}>Adicionar</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="webhooks" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
          <TabsTrigger value="events">Eventos Recentes</TabsTrigger>
        </TabsList>

        <TabsContent value="webhooks" className="space-y-4">
          <div className="space-y-4">
            {webhooks.map((webhook) => (
              <Card key={webhook.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Webhook className="w-5 h-5 text-blue-500" />
                      <div>
                        <h3 className="font-semibold">{webhook.name}</h3>
                        <code className="text-xs text-muted-foreground">{webhook.url}</code>
                      </div>
                    </div>
                    <Badge className={getStatusColor(webhook.status)}>
                      {webhook.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-green-500">{webhook.deliveryRate}%</div>
                      <div className="text-xs text-muted-foreground">Taxa de Entrega</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-500">{webhook.events.length}</div>
                      <div className="text-xs text-muted-foreground">Eventos</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-500">{webhook.retryCount}</div>
                      <div className="text-xs text-muted-foreground">Max Tentativas</div>
                    </div>
                  </div>
                  
                  {webhook.description && (
                    <p className="text-sm text-muted-foreground">{webhook.description}</p>
                  )}
                  
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Eventos Configurados:</div>
                    <div className="flex flex-wrap gap-1">
                      {webhook.events.map((event, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {event}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Última ativação: {webhook.lastTriggered.toLocaleString()}</span>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => toggleWebhookStatus(webhook.id)}
                      >
                        {webhook.status === 'active' ? 'Desativar' : 'Ativar'}
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-1" />
                        Editar
                      </Button>
                      <Button variant="outline" size="sm">
                        <Send className="w-4 h-4 mr-1" />
                        Testar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="events" className="space-y-4">
          <div className="space-y-4">
            {events.map((event) => {
              const webhook = webhooks.find(w => w.id === event.webhookId);
              return (
                <Card key={event.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="mt-1">
                        {getEventIcon(event.status)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <h4 className="font-semibold">{event.event}</h4>
                            <p className="text-sm text-muted-foreground">
                              {webhook?.name} • {event.lastAttempt.toLocaleString()}
                            </p>
                          </div>
                          <Badge className={getEventStatusColor(event.status)}>
                            {event.status}
                          </Badge>
                        </div>
                        
                        <div className="mt-2 space-y-2">
                          <div className="text-xs">
                            <span className="text-muted-foreground">Tentativas: </span>
                            <span>{event.attempts}</span>
                            {event.responseCode && (
                              <>
                                <span className="text-muted-foreground ml-4">Status: </span>
                                <span className={event.responseCode >= 400 ? 'text-red-500' : 'text-green-500'}>
                                  {event.responseCode}
                                </span>
                              </>
                            )}
                          </div>
                          
                          {event.errorMessage && (
                            <div className="text-xs text-red-500">
                              Erro: {event.errorMessage}
                            </div>
                          )}
                          
                          <details className="text-xs">
                            <summary className="cursor-pointer text-muted-foreground hover:text-foreground">
                              Ver payload
                            </summary>
                            <pre className="mt-2 p-2 bg-muted rounded text-xs overflow-x-auto">
                              {JSON.stringify(event.payload, null, 2)}
                            </pre>
                          </details>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        {event.status === 'failed' && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => retryWebhook(event.id)}
                          >
                            <RefreshCw className="w-4 h-4 mr-1" />
                            Tentar Novamente
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};