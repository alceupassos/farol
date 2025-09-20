import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Brain, HeartPulse, Users, Activity, ClipboardList, MessageCircle, Stethoscope, Sparkles } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, Tooltip, XAxis, CartesianGrid } from 'recharts';

const moodTrend = [
  { name: 'Nov', humor: 6.2, sono: 72 },
  { name: 'Dez', humor: 6.8, sono: 75 },
  { name: 'Jan', humor: 7.1, sono: 78 },
  { name: 'Fev', humor: 7.4, sono: 80 },
];

const SaudeMentalIntegralPage = () => {
  return (
    <MainLayout>
      <div className="pt-8 pb-10 px-4">
        <div className="max-w-7xl mx-auto space-y-8">
          <header className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-display font-semibold">Saúde Mental Integral</h1>
            <p className="text-muted-foreground max-w-3xl">
              Acompanhe avaliações psicométricas, planos terapêuticos e sinais precoces de descompensação emocional com apoio da equipe multiprofissional.
            </p>
          </header>

          {/* Destaques */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Painéis ativos</p>
                <p className="text-2xl font-semibold">32</p>
                <p className="text-xs text-muted-foreground mt-1">Planos com terapia combinada (medicação + psicoterapia)</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Risco elevado</p>
                <p className="text-2xl font-semibold text-red-600">5</p>
                <p className="text-xs text-muted-foreground mt-1">PHQ-9 ≥ 15 ou ideação recente</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Adesão psicoterapia</p>
                <p className="text-2xl font-semibold text-green-600">82%</p>
                <p className="text-xs text-muted-foreground mt-1">Encontros realizados nas últimas 6 semanas</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Suporte familiar</p>
                <p className="text-2xl font-semibold">18</p>
                <p className="text-xs text-muted-foreground mt-1">Famílias engajadas com agenda educativa e grupos</p>
              </CardContent>
            </Card>
          </div>

          {/* Painel principal */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr,0.9fr] gap-4">
            <Card>
              <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Brain className="h-5 w-5 text-primary" />
                    Evolução de humor e qualidade do sono
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Dados auto-relatados via aplicativo + wearables conectados (HealthKit / Google Fit)
                  </p>
                </div>
                <Badge variant="secondary">Atualizado há 3 horas</Badge>
              </CardHeader>
              <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={moodTrend}>
                    <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.15} />
                    <XAxis dataKey="name" strokeOpacity={0.5} />
                    <Tooltip />
                    <Area type="monotone" dataKey="humor" name="Humor (0-10)" stroke="#6366f1" fill="#6366f1" fillOpacity={0.25} />
                    <Area type="monotone" dataKey="sono" name="Sono (min)" stroke="#14b8a6" fill="#14b8a6" fillOpacity={0.15} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-primary/60">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <HeartPulse className="h-5 w-5 text-primary" />
                  Planos terapêuticos ativos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start justify-between rounded-lg border border-border/60 p-3">
                  <div>
                    <p className="font-medium">Programa de transtorno de ansiedade</p>
                    <p className="text-muted-foreground">Psicoterapia semanal + mindfulness + acompanhamento farmacêutico</p>
                  </div>
                  <Badge variant="secondary">20 pacientes</Badge>
                </div>
                <div className="flex items-start justify-between rounded-lg border border-border/60 p-3">
                  <div>
                    <p className="font-medium">Linha do cuidado depressão moderada</p>
                    <p className="text-muted-foreground">Telemonitoramento diário de humor, check-in da enfermagem e psiquiatra quinzenal</p>
                  </div>
                  <Badge variant="outline">12 pacientes</Badge>
                </div>
                <div className="flex items-start justify-between rounded-lg border border-border/60 p-3">
                  <div>
                    <p className="font-medium">Programa pós-crise</p>
                    <p className="text-muted-foreground">Plano de segurança personalizado + contato familiar + acesso rápido ao CAPS</p>
                  </div>
                  <Badge variant="destructive">Prioridade</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Avaliações e rede de apoio */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <ClipboardList className="h-5 w-5" />
                  Triagem psicométrica
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span>PHQ-9 atualizado</span>
                  <Badge variant="secondary">78% concluído</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>GAD-7 em dia</span>
                  <Badge variant="outline">68%</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Escala de estresse ocupacional</span>
                  <Badge variant="outline">piloto</Badge>
                </div>
                <Button variant="ghost" className="w-full border border-dashed border-border/60" size="sm">
                  + Disparar novo questionário
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <MessageCircle className="h-5 w-5" />
                  Rede de apoio e corresponsáveis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span>Familiares cadastrados</span>
                  <Badge variant="outline">27</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Grupos terapêuticos ativos</span>
                  <Badge variant="secondary">5</Badge>
                </div>
                <div className="rounded-lg border border-border/60 p-3">
                  <p className="font-medium">Próximo encontro comunitário</p>
                  <p className="text-muted-foreground text-sm">Sábado, 10h • Espaço Saúde Mental</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Users className="h-5 w-5" />
                  Equipe multiprofissional
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span>Psiquiatras</span>
                  <Badge variant="outline">4</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Psicólogos</span>
                  <Badge variant="outline">9</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Enfermagem especializada</span>
                  <Badge variant="outline">6</Badge>
                </div>
                <Button variant="ghost" className="w-full" size="sm">
                  Ver planos de disponibilidade
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Chamada para ação */}
          <Card className="border border-primary/30 bg-primary/5">
            <CardContent className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 py-6">
              <div>
                <p className="text-sm text-muted-foreground uppercase tracking-wide">Engajamento proativo</p>
                <h2 className="text-lg font-semibold">Ative agora o programa de acompanhamento intensivo pós-alta</h2>
                <p className="text-sm text-muted-foreground">Integração com CAPS, apoio familiar e telemonitoramento diário guiado por enfermeiros especialistas.</p>
              </div>
              <Button size="lg" className="gap-2">
                <Sparkles className="h-4 w-4" />
                Configurar programa piloto
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default SaudeMentalIntegralPage;
