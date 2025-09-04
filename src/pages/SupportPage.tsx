import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  HeadphonesIcon, 
  MessageSquare, 
  Clock, 
  CheckCircle,
  AlertCircle,
  Phone,
  Mail,
  Calendar
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const SupportPage = () => {
  const [ticketForm, setTicketForm] = useState({
    name: '',
    email: '',
    category: '',
    priority: '',
    subject: '',
    description: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Ticket criado com sucesso!",
      description: "Nossa equipe entrará em contato em breve.",
    });
    setTicketForm({
      name: '',
      email: '',
      category: '',
      priority: '',
      subject: '',
      description: ''
    });
  };

  const activeTickets = [
    { id: '#TK001', subject: 'Problema no agendamento', status: 'Em análise', created: '2024-01-20', priority: 'Alta' },
    { id: '#TK002', subject: 'Dúvida sobre exames', status: 'Respondido', created: '2024-01-19', priority: 'Média' },
    { id: '#TK003', subject: 'Erro no login', status: 'Resolvido', created: '2024-01-18', priority: 'Baixa' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/10 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Central de Suporte</h1>
          <p className="text-muted-foreground">Estamos aqui para ajudar você a resolver qualquer problema</p>
        </div>

        {/* Support Channels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <MessageSquare className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Chat Online</CardTitle>
              <CardDescription>Suporte instantâneo via chat</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button className="w-full">Iniciar Chat</Button>
              <p className="text-sm text-muted-foreground mt-2">Disponível 24/7</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Phone className="h-12 w-12 text-secondary mx-auto mb-4" />
              <CardTitle>Telefone</CardTitle>
              <CardDescription>Fale diretamente conosco</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button variant="outline" className="w-full">
                <Phone className="h-4 w-4 mr-2" />
                (12) 3642-1234
              </Button>
              <p className="text-sm text-muted-foreground mt-2">Seg-Sex: 8h às 18h</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Calendar className="h-12 w-12 text-accent mx-auto mb-4" />
              <CardTitle>Agendamento</CardTitle>
              <CardDescription>Agende uma reunião técnica</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button variant="outline" className="w-full">Agendar Reunião</Button>
              <p className="text-sm text-muted-foreground mt-2">Suporte especializado</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Create Ticket Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <HeadphonesIcon className="h-5 w-5 mr-2 text-primary" />
                Criar Ticket de Suporte
              </CardTitle>
              <CardDescription>Descreva seu problema detalhadamente para um atendimento mais eficiente</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Nome Completo</label>
                    <Input
                      value={ticketForm.name}
                      onChange={(e) => setTicketForm({ ...ticketForm, name: e.target.value })}
                      placeholder="Seu nome completo"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Email</label>
                    <Input
                      type="email"
                      value={ticketForm.email}
                      onChange={(e) => setTicketForm({ ...ticketForm, email: e.target.value })}
                      placeholder="seu@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Categoria</label>
                    <Select value={ticketForm.category} onValueChange={(value) => setTicketForm({ ...ticketForm, category: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tecnico">Problema Técnico</SelectItem>
                        <SelectItem value="conta">Conta e Login</SelectItem>
                        <SelectItem value="agendamento">Agendamento</SelectItem>
                        <SelectItem value="exames">Exames e Resultados</SelectItem>
                        <SelectItem value="outros">Outros</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Prioridade</label>
                    <Select value={ticketForm.priority} onValueChange={(value) => setTicketForm({ ...ticketForm, priority: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a prioridade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="baixa">Baixa</SelectItem>
                        <SelectItem value="media">Média</SelectItem>
                        <SelectItem value="alta">Alta</SelectItem>
                        <SelectItem value="critica">Crítica</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Assunto</label>
                  <Input
                    value={ticketForm.subject}
                    onChange={(e) => setTicketForm({ ...ticketForm, subject: e.target.value })}
                    placeholder="Resumo do problema"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Descrição Detalhada</label>
                  <Textarea
                    value={ticketForm.description}
                    onChange={(e) => setTicketForm({ ...ticketForm, description: e.target.value })}
                    placeholder="Descreva o problema em detalhes..."
                    rows={4}
                    required
                  />
                </div>

                <Button type="submit" className="w-full">
                  Criar Ticket de Suporte
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Active Tickets */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-secondary" />
                Seus Tickets
              </CardTitle>
              <CardDescription>Acompanhe o status dos seus tickets de suporte</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeTickets.map((ticket) => (
                  <div key={ticket.id} className="border rounded-lg p-4 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{ticket.subject}</h4>
                        <p className="text-sm text-muted-foreground">{ticket.id} • Criado em {ticket.created}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant={
                            ticket.priority === 'Alta' ? 'destructive' :
                            ticket.priority === 'Média' ? 'default' : 'secondary'
                          }
                        >
                          {ticket.priority}
                        </Badge>
                        <Badge 
                          variant={
                            ticket.status === 'Resolvido' ? 'default' :
                            ticket.status === 'Respondido' ? 'secondary' : 'outline'
                          }
                        >
                          {ticket.status === 'Resolvido' && <CheckCircle className="h-3 w-3 mr-1" />}
                          {ticket.status === 'Em análise' && <AlertCircle className="h-3 w-3 mr-1" />}
                          {ticket.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <Button variant="outline" className="w-full">
                  Ver Todos os Tickets
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;