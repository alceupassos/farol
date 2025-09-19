import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getLaboratoryIntegration, laboratoryIntegrations } from '@/data/labIntegrations';
import { performIntegrationAction, submitIntegrationForm, fetchIntegrationStatus } from '@/services/labIntegrationsService';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { ArrowLeft, Globe2, Rocket, ListChecks } from 'lucide-react';

const fieldRenderer = (field: any, value: string, onChange: (id: string, val: string) => void) => {
  switch (field.type) {
    case 'textarea':
      return (
        <Textarea
          id={field.id}
          placeholder={field.placeholder}
          value={value}
          onChange={(event) => onChange(field.id, event.target.value)}
          className="bg-slate-950/60 border-slate-700 text-slate-100"
        />
      );
    case 'select':
      return (
        <Select value={value} onValueChange={(val) => onChange(field.id, val)}>
          <SelectTrigger className="bg-slate-950/60 border-slate-700 text-slate-100">
            <SelectValue placeholder={field.placeholder ?? 'Selecione'} />
          </SelectTrigger>
          <SelectContent className="bg-slate-900 text-slate-100">
            {field.options?.map((option: string) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    case 'password':
      return (
        <Input
          id={field.id}
          type="password"
          placeholder={field.placeholder}
          value={value}
          onChange={(event) => onChange(field.id, event.target.value)}
          className="bg-slate-950/60 border-slate-700 text-slate-100"
        />
      );
    case 'number':
      return (
        <Input
          id={field.id}
          type="number"
          placeholder={field.placeholder}
          value={value}
          onChange={(event) => onChange(field.id, event.target.value)}
          className="bg-slate-950/60 border-slate-700 text-slate-100"
        />
      );
    default:
      return (
        <Input
          id={field.id}
          placeholder={field.placeholder}
          value={value}
          onChange={(event) => onChange(field.id, event.target.value)}
          className="bg-slate-950/60 border-slate-700 text-slate-100"
        />
      );
  }
};

const LaboratorioIntegrationDetailPage = () => {
  const { integrationId = '' } = useParams();
  const navigate = useNavigate();
  const integration = getLaboratoryIntegration(integrationId);
  const [sectionData, setSectionData] = useState<Record<string, Record<string, string>>>({});
  const [status, setStatus] = useState<{ details?: string; status?: string; environment?: string; lastSyncedAt?: string }>();
  const [submittingSection, setSubmittingSection] = useState<string | null>(null);
  const [runningAction, setRunningAction] = useState<string | null>(null);

  useEffect(() => {
    if (!integration) return;
    fetchIntegrationStatus(integration.id).then(setStatus).catch(() => undefined);
  }, [integration]);

  useEffect(() => {
    if (!integration) return;
    const seed: Record<string, Record<string, string>> = {};
    integration.formSections.forEach((section) => {
      seed[section.id] = {};
      section.fields.forEach((field) => {
        seed[section.id][field.id] = '';
      });
    });
    setSectionData(seed);
  }, [integration]);

  const hasMultipleIntegrations = useMemo(() => Object.keys(laboratoryIntegrations).length > 1, []);

  if (!integration) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h1 className="text-3xl font-semibold">Integração não encontrada</h1>
          <p className="text-slate-400">Verifique o identificador utilizado ou selecione uma integração válida na listagem.</p>
          <Button variant="secondary" onClick={() => navigate('/laboratorios/integracoes')}>
            Voltar para integrações
          </Button>
        </div>
      </div>
    );
  }

  const handleFieldChange = (sectionId: string, fieldId: string, value: string) => {
    setSectionData((prev) => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        [fieldId]: value
      }
    }));
  };

  const handleSubmitSection = async (sectionId: string) => {
    setSubmittingSection(sectionId);
    try {
      const payload = sectionData[sectionId];
      const response = await submitIntegrationForm(integration, sectionId, payload);
      toast.success(response.message);
    } catch (error: any) {
      toast.error(error?.message ?? 'Falha ao enviar dados.');
    } finally {
      setSubmittingSection(null);
    }
  };

  const handleAction = async (actionId: string, requiresPayload = false) => {
    if (requiresPayload) {
      toast.info('Preencha o formulário correspondente antes de executar esta ação.');
      return;
    }
    setRunningAction(actionId);
    try {
      const response = await performIntegrationAction(integration, actionId, {});
      toast.success(response.message);
    } catch (error: any) {
      toast.error(error?.message ?? 'Erro ao executar ação.');
    } finally {
      setRunningAction(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                {hasMultipleIntegrations && (
                  <Button variant="ghost" size="sm" onClick={() => navigate('/laboratorios/integracoes')} className="text-slate-300 hover:text-white">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
                  </Button>
                )}
                <Badge className="bg-white/10 text-slate-100 border border-white/20">{integration.category.toUpperCase()}</Badge>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">{integration.name}</h1>
              <p className="text-slate-300 max-w-3xl">{integration.longDescription}</p>
              <div className="flex flex-wrap gap-3">
                {integration.statusBadges.map((badge) => (
                  <Badge key={badge} variant="outline" className="border-emerald-500/40 text-emerald-200">
                    {badge}
                  </Badge>
                ))}
                {status?.status && (
                  <Badge variant="outline" className="border-sky-500/40 text-sky-200">
                    Status: {status.status}
                  </Badge>
                )}
              </div>
            </div>
            {integration.endpoints && (
              <Card className="bg-slate-900/80 border border-white/10 backdrop-blur max-w-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-slate-200 flex items-center gap-2">
                    <Globe2 className="w-4 h-4" /> Endpoints registrados
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {integration.endpoints.map((endpoint) => (
                    <p key={endpoint} className="text-xs text-slate-400 break-all">{endpoint}</p>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {integration.kpis.map((kpi) => (
            <Card key={kpi} className="border border-white/10 bg-slate-900/80">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-slate-200 flex items-center gap-2">
                  <ListChecks className="w-4 h-4 text-emerald-300" /> KPI monitorado
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-300">{kpi}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <Rocket className="w-5 h-5 text-emerald-300" />
            <h2 className="text-2xl font-semibold text-white">Ações rápidas</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {integration.actions.map((action) => (
              <Card key={action.id} className="border border-white/10 bg-slate-900/85">
                <CardHeader>
                  <CardTitle className="text-lg text-white">{action.label}</CardTitle>
                  <CardDescription className="text-slate-400 text-sm">{action.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    className="w-full"
                    disabled={runningAction === action.id}
                    onClick={() => handleAction(action.id, action.requiresPayload)}
                  >
                    {runningAction === action.id ? 'Executando...' : 'Executar'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-12">
          <div className="flex items-center gap-3">
            <ListChecks className="w-5 h-5 text-emerald-300" />
            <h2 className="text-2xl font-semibold text-white">Configurações</h2>
          </div>
          <div className="space-y-10">
            {integration.formSections.map((section) => (
              <Card key={section.id} className="border border-white/10 bg-slate-900/85">
                <CardHeader className="space-y-2">
                  <CardTitle className="text-xl text-white">{section.title}</CardTitle>
                  <CardDescription className="text-slate-400">{section.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    {section.fields.map((field) => (
                      <div key={field.id} className="space-y-2">
                        <Label htmlFor={`${section.id}-${field.id}`} className="text-slate-200">
                          {field.label}
                          {field.required && <span className="text-emerald-300 ml-1">*</span>}
                        </Label>
                        {field.helperText && (
                          <p className="text-xs text-slate-400">{field.helperText}</p>
                        )}
                        {fieldRenderer(
                          field,
                          sectionData?.[section.id]?.[field.id] ?? '',
                          (fieldId, val) => handleFieldChange(section.id, fieldId, val)
                        )}
                      </div>
                    ))}
                  </div>
                  <Button
                    variant="secondary"
                    disabled={submittingSection === section.id}
                    onClick={() => handleSubmitSection(section.id)}
                  >
                    {submittingSection === section.id ? 'Enviando...' : 'Salvar seção'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaboratorioIntegrationDetailPage;
