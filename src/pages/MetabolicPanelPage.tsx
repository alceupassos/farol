import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Activity, Droplet, Scale, Flame, TrendingUp, Beaker, AlertTriangle } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, Tooltip } from 'recharts';

const metabolicSeries = [
  { name: 'Set', HbA1c: 7.4, LDL: 136, PCR: 3.1 },
  { name: 'Out', HbA1c: 7.1, LDL: 129, PCR: 2.7 },
  { name: 'Nov', HbA1c: 6.9, LDL: 122, PCR: 2.4 },
  { name: 'Dez', HbA1c: 6.7, LDL: 118, PCR: 2.1 },
  { name: 'Jan', HbA1c: 6.5, LDL: 112, PCR: 1.8 }
];

const MetabolicPanelPage = () => {
  return (
    <MainLayout>
      <div className="pt-8 pb-10 px-4">
        <div className="max-w-7xl mx-auto space-y-8">
          <header className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-display font-semibold">Painel Metabólico Personalizado</h1>
            <p className="text-muted-foreground max-w-3xl">
              Consolide marcadores laboratoriais, sinais vitais e metas de cuidado para acompanhamento longitudinal dos pacientes com doenças crônicas.
            </p>
          </header>

          {/* Indicadores principais */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">HbA1c média</p>
                    <p className="text-2xl font-semibold">6,5%</p>
                  </div>
                  <Badge variant="secondary">Meta &lt; 7%</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Redução de 0,9 p.p. em 4 meses</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">LDL médio</p>
                    <p className="text-2xl font-semibold">112 mg/dL</p>
                  </div>
                  <Badge variant="secondary">Meta &lt; 100</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Uso de estatina intensiva + ezetimiba</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Pressão arterial</p>
                    <p className="text-2xl font-semibold">126/78 mmHg</p>
                  </div>
                  <Badge variant="outline">MAPA 24h</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Ajuste recente de anti-hipertensivo</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">IMC médio</p>
                    <p className="text-2xl font-semibold">28,4 kg/m²</p>
                  </div>
                  <Badge variant="destructive">Meta 26</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Programa de reeducação alimentar em curso</p>
              </CardContent>
            </Card>
          </div>

          {/* Gráfico */}
          <Card>
            <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Evolução dos marcadores laboratoriais
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">Fonte: integração laboratório municipal (Supabase Edge + MCP) • Atualizado diariamente</p>
              </div>
              <Button variant="ghost" size="sm">Exportar CSV</Button>
            </CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={metabolicSeries}>
                  <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.15} />
                  <XAxis dataKey="name" strokeOpacity={0.5} />
                  <Tooltip />
                  <Bar dataKey="HbA1c" fill="#6366f1" radius={[4, 4, 0, 0]} name="HbA1c" />
                  <Bar dataKey="LDL" fill="#14b8a6" radius={[4, 4, 0, 0]} name="LDL (mg/dL)" />
                  <Bar dataKey="PCR" fill="#f97316" radius={[4, 4, 0, 0]} name="PCR us (mg/L)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Painéis auxiliares */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Beaker className="h-5 w-5" />
                  Monitoramento laboratorial
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span>Painel metabólico trimestral</span>
                  <Badge variant="secondary">Em curso</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Função renal e microalbuminúria</span>
                  <Badge variant="outline">Programado</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Vitamina D & Hormônios tireoidianos</span>
                  <Badge variant="outline">Revisar</Badge>
                </div>
                <Button variant="ghost" size="sm" className="w-full border border-dashed border-border/60">
                  + Solicitar novo painel
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Activity className="h-5 w-5" />
                  Sinais vitais & hábitos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="rounded-lg border border-border/60 p-3 flex items-center justify-between">
                  <div>
                    <p className="font-medium">Atividade física semanal</p>
                    <p className="text-muted-foreground">Média 148 minutos • 54% atingiram meta OMS</p>
                  </div>
                  <Badge variant="secondary">Wearables</Badge>
                </div>
                <div className="rounded-lg border border-border/60 p-3 flex items-center justify-between">
                  <div>
                    <p className="font-medium">Automedida domiciliar</p>
                    <p className="text-muted-foreground">Pressão e glicemia enviadas por dispositivos conectados</p>
                  </div>
                  <Badge variant="outline">Omron / Dexcom</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Flame className="h-5 w-5" />
                  Alertas metabólicos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-center justify-between rounded-lg border border-border/60 p-3">
                  <div>
                    <p className="font-medium">Pacientes fora de meta</p>
                    <p className="text-muted-foreground">HbA1c &gt; 8% ou LDL &gt; 160 mg/dL</p>
                  </div>
                  <Badge variant="destructive">7</Badge>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-border/60 p-3">
                  <div>
                    <p className="font-medium">Priorizar consulta</p>
                    <p className="text-muted-foreground">Agendar endocrinologista + nutricionista</p>
                  </div>
                  <Button size="sm" variant="ghost">Criar lista</Button>
                </div>
                <div className="rounded-lg border border-destructive/40 bg-destructive/10 p-3 flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 mt-1 text-destructive" />
                  <p className="text-xs text-destructive">4 pacientes com PCR &gt; 3 mg/L e LDL acima da meta — revisar risco cardiovascular.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default MetabolicPanelPage;
