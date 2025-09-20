import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link2, Activity, Cpu, RefreshCcw, CheckCircle, AlertTriangle, Apple, HeartPulse, Watch, Satellite } from 'lucide-react';

const connectors = [
  {
    name: 'Apple HealthKit',
    description: 'Sincroniza passos, frequência cardíaca, sono e notificações de ritmo irregular.' ,
    status: 'Sincronizado',
    lastSync: 'há 2h',
    icon: <Apple className="h-5 w-5" />,
    integration: 'OAuth',
  },
  {
    name: 'Google Fit / Fitbit',
    description: 'Dados de atividade física, peso, IMC e saturação de oxigênio com atualizações hora a hora.',
    status: 'Conectado',
    lastSync: 'há 45 min',
    icon: <HeartPulse className="h-5 w-5" />,
    integration: 'OAuth',
  },
  {
    name: 'Dexcom G7 / Libre 3',
    description: 'Monitoramento contínuo de glicose com alertas críticos e feed para plano metabólico.',
    status: 'Monitorando',
    lastSync: 'tempo real',
    icon: <Activity className="h-5 w-5" />,
    integration: 'API via MCP',
  },
  {
    name: 'Omron Connect',
    description: 'Pressão arterial domiciliar, frequência cardíaca e monitor de peso conectados ao prontuário.',
    status: 'Conectado',
    lastSync: 'há 3h',
    icon: <Watch className="h-5 w-5" />,
    integration: 'FHIR/HL7',
  }
];

const HealthConnectorsPage = () => {
  return (
    <MainLayout>
      <div className="pt-8 pb-10 px-4">
        <div className="max-w-5xl mx-auto space-y-8">
          <header className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-display font-semibold">Conectores de Saúde</h1>
            <p className="text-muted-foreground">
              Unifique dados de dispositivos vestíveis, monitores clínicos e APIs globais para manter a carteira do paciente sempre atualizada.
            </p>
          </header>

          <Card className="border border-primary/30 bg-primary/5">
            <CardContent className="py-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm text-muted-foreground uppercase tracking-wide">Orquestração MCP</p>
                <h2 className="text-lg font-semibold">Ingestão automática com Supabase Edge Functions + MCP Server</h2>
                <p className="text-sm text-muted-foreground">Jobs agendados consolidam dados de APIs externas, normalizam para FHIR e gravam no prontuário longitudinal.</p>
              </div>
              <Button variant="secondary" size="lg" className="gap-2">
                <RefreshCcw className="h-4 w-4" />
                Executar sincronização agora
              </Button>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 gap-4">
            {connectors.map((connector) => (
              <Card key={connector.name}>
                <CardHeader className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground">
                      {connector.icon}
                    </span>
                    {connector.name}
                  </CardTitle>
                  <Badge variant={connector.status === 'Monitorando' ? 'destructive' : 'secondary'}>{connector.status}</Badge>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <p className="text-muted-foreground">{connector.description}</p>
                  <div className="flex flex-wrap gap-3 text-xs text-muted-foreground uppercase tracking-wide">
                    <span className="flex items-center gap-1">
                      <Link2 className="h-3 w-3" /> {connector.integration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Satellite className="h-3 w-3" /> Última sincronização {connector.lastSync}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Cpu className="h-4 w-4" /> Configurar credenciais
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <CheckCircle className="h-4 w-4" /> Testar chamada de API
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                Boas práticas
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>• Armazene tokens de acesso no Supabase Vault ou serviço secreto equivalente.</p>
              <p>• Utilize MCP Server para agendar jobs e tratar limites de rate limit.</p>
              <p>• Normalize payloads para o schema `patient_device_metrics` garantindo versionamento e auditoria.</p>
              <p>• Permita que o paciente ative/desative conectores com consentimento granular via LGPD.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default HealthConnectorsPage;
