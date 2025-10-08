/**
 * Ferramenta de Transcrição e Estruturação do Atendimento
 * GRAVAR & Transcrever - Auxílio ao Médico
 */

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Mic, MicOff, Play, Pause, CheckCircle, AlertTriangle, 
  FileText, Clock, User, Activity, Stethoscope, Scissors,
  TestTube, Ambulance, Heart, Video, Building2
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type TipoAtendimento = 
  | 'enfermaria' 
  | 'quarto-a' 
  | 'centro-cirurgico' 
  | 'exames' 
  | 'pronto-atendimento' 
  | 'uti' 
  | 'ambulatorio' 
  | 'telemedicina' 
  | 'outros';

interface ChecklistItem {
  campo: string;
  obrigatorio: boolean;
  preenchido: boolean;
  preenchidoPorIA: boolean;
}

const tiposAtendimento = [
  { value: 'enfermaria', label: 'Enfermaria', icon: Activity },
  { value: 'quarto-a', label: 'Quarto Tipo A', icon: Building2 },
  { value: 'centro-cirurgico', label: 'Centro Cirúrgico', icon: Scissors },
  { value: 'exames', label: 'Exames', icon: TestTube },
  { value: 'pronto-atendimento', label: 'Pronto Atendimento', icon: Ambulance },
  { value: 'uti', label: 'UTI', icon: Heart },
  { value: 'ambulatorio', label: 'Ambulatório', icon: Stethoscope },
  { value: 'telemedicina', label: 'Telemedicina', icon: Video },
  { value: 'outros', label: 'Outros', icon: FileText },
];

const checklistsPorTipo: Record<TipoAtendimento, ChecklistItem[]> = {
  'enfermaria': [
    { campo: 'Identificação do Paciente', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Motivo da Intercorrência', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'HPI (História Pregressa da Moléstia)', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Sinais Vitais', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Exame Físico Resumido', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Medicações em Uso', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Alergias', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Hipóteses Diagnósticas (CID-10)', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Conduta e Prescrição', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Plano de Reavaliação', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Orientações ao Paciente/Família', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
  ],
  'quarto-a': [
    { campo: 'Identificação do Paciente', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Motivo da Intercorrência', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'HPI', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Sinais Vitais', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Exame Físico', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Medicações e Alergias', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Hipóteses Diagnósticas', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Conduta', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
  ],
  'centro-cirurgico': [
    { campo: 'Check Time-out', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Classificação ASA', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Consentimento Procedimento', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Consentimento Anestésico', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Descrição Cirúrgica', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Tempos (Incisão/Fechamento)', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Materiais/OPME Utilizados', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Ocorrências', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Sangramento Estimado', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Antibiótico Profilático', obrigatorio: false, preenchido: false, preenchidoPorIA: false },
    { campo: 'Envio Anatomia Patológica', obrigatorio: false, preenchido: false, preenchidoPorIA: false },
    { campo: 'Destino (RPA/UTI)', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
  ],
  'exames': [
    { campo: 'Indicação Clínica', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Justificativa', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Protocolo de Preparo', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Resultado/Laudo', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Achados Relevantes', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Recomendação/Follow-up', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
  ],
  'pronto-atendimento': [
    { campo: 'HPI Focal', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Red Flags', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Escalas (NEWS2)', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Sinais Vitais', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Exame Físico Dirigido', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Conduta Imediata', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Prescrição e Justificativa', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Plano 6-24h', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
  ],
  'uti': [
    { campo: 'HPI Focal', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Red Flags', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Escalas de Gravidade', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Sinais Vitais Completos', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Exame Físico Detalhado', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Suporte Ventilatório', obrigatorio: false, preenchido: false, preenchidoPorIA: false },
    { campo: 'Drogas Vasoativas', obrigatorio: false, preenchido: false, preenchidoPorIA: false },
    { campo: 'Plano Terapêutico', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
  ],
  'ambulatorio': [
    { campo: 'Motivo da Consulta', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'HPI', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Antecedentes/Medicações', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Exame Físico', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Hipóteses/Planos', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Educação do Paciente', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Retorno Programado', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
  ],
  'telemedicina': [
    { campo: 'Motivo da Teleconsulta', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'HPI', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Antecedentes/Medicações', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Exame Físico (ou N/A com justificativa)', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Hipóteses/Planos', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Orientações', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Retorno/Follow-up', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
  ],
  'outros': [
    { campo: 'Identificação', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Motivo', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Descrição do Atendimento', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Conduta', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
  ],
};

const TranscricaoAtendimentoPage = () => {
  const [tipoAtendimento, setTipoAtendimento] = useState<TipoAtendimento>('enfermaria');
  const [gravando, setGravando] = useState(false);
  const [transcrito, setTranscrito] = useState(false);
  const [checklist, setChecklist] = useState<ChecklistItem[]>(checklistsPorTipo['enfermaria']);
  const [tempoGravacao, setTempoGravacao] = useState(0);

  const handleTipoChange = (value: string) => {
    const tipo = value as TipoAtendimento;
    setTipoAtendimento(tipo);
    setChecklist(checklistsPorTipo[tipo]);
    setTranscrito(false);
  };

  const handleGravar = () => {
    setGravando(!gravando);
    if (!gravando) {
      // Simular gravação
      const interval = setInterval(() => {
        setTempoGravacao(prev => prev + 1);
      }, 1000);
      setTimeout(() => {
        clearInterval(interval);
        setGravando(false);
        handleTranscrever();
      }, 5000); // Simula 5 segundos de gravação
    }
  };

  const handleTranscrever = () => {
    // Simular transcrição e preenchimento automático
    const checklistAtualizado = checklist.map((item, index) => ({
      ...item,
      preenchido: index < checklist.length * 0.8, // 80% preenchido pela IA
      preenchidoPorIA: index < checklist.length * 0.8,
    }));
    setChecklist(checklistAtualizado);
    setTranscrito(true);
  };

  const camposObrigatorios = checklist.filter(item => item.obrigatorio).length;
  const camposPreenchidos = checklist.filter(item => item.preenchido).length;
  const camposIAPreenchidos = checklist.filter(item => item.preenchidoPorIA).length;
  const percentualCompleto = (camposPreenchidos / camposObrigatorios) * 100;
  const percentualIA = (camposIAPreenchidos / camposObrigatorios) * 100;

  const tipoSelecionado = tiposAtendimento.find(t => t.value === tipoAtendimento);
  const IconeTipo = tipoSelecionado?.icon || FileText;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Mic className="h-8 w-8 text-primary" />
          GRAVAR & Transcrever Atendimento
        </h1>
        <p className="text-muted-foreground mt-1">
          Prontuário completo, padronizado e auditável em 1 clique
        </p>
      </div>

      {/* Seletor de Tipo de Atendimento */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <IconeTipo className="h-5 w-5" />
            Tipo de Atendimento
          </CardTitle>
          <CardDescription>
            Selecione o cenário clínico para ajustar os checklists obrigatórios
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={tipoAtendimento} onValueChange={handleTipoChange}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {tiposAtendimento.map((tipo) => {
                const Icon = tipo.icon;
                return (
                  <SelectItem key={tipo.value} value={tipo.value}>
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      {tipo.label}
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Controles de Gravação */}
      <Card className="border-primary">
        <CardHeader>
          <CardTitle>Gravação e Transcrição</CardTitle>
          <CardDescription>
            Consentimento do paciente obtido • Captação até o fim do contato clínico
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-center gap-4">
            <Button
              size="lg"
              onClick={handleGravar}
              className={gravando ? 'bg-red-600 hover:bg-red-700' : 'bg-primary'}
            >
              {gravando ? (
                <>
                  <MicOff className="mr-2 h-5 w-5" />
                  PARAR GRAVAÇÃO
                </>
              ) : (
                <>
                  <Mic className="mr-2 h-5 w-5" />
                  GRAVAR
                </>
              )}
            </Button>

            {transcrito && (
              <Badge className="bg-green-600 text-lg px-4 py-2">
                <CheckCircle className="mr-2 h-5 w-5" />
                TRANSCRITO
              </Badge>
            )}
          </div>

          {gravando && (
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                <Clock className="inline h-6 w-6 mr-2" />
                {Math.floor(tempoGravacao / 60)}:{(tempoGravacao % 60).toString().padStart(2, '0')}
              </div>
              <p className="text-sm text-muted-foreground">Gravando...</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Métricas de Preenchimento */}
      {transcrito && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{percentualCompleto.toFixed(0)}%</div>
                <div className="text-sm text-muted-foreground">Prontuário Completo</div>
                <Progress value={percentualCompleto} className="mt-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{percentualIA.toFixed(0)}%</div>
                <div className="text-sm text-muted-foreground">Preenchido pela IA</div>
                <Progress value={percentualIA} className="mt-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {camposPreenchidos}/{camposObrigatorios}
                </div>
                <div className="text-sm text-muted-foreground">Campos Obrigatórios</div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Checklist */}
      <Card>
        <CardHeader>
          <CardTitle>Checklist de Campos Obrigatórios</CardTitle>
          <CardDescription>
            Campos necessários para {tipoSelecionado?.label}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {checklist.map((item, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-3 rounded-lg border ${
                  item.preenchido ? 'bg-green-50 dark:bg-green-950 border-green-600' : 'bg-muted'
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.preenchido ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  )}
                  <span className={item.obrigatorio ? 'font-semibold' : ''}>
                    {item.campo}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {item.obrigatorio && (
                    <Badge variant="outline" className="text-xs">Obrigatório</Badge>
                  )}
                  {item.preenchidoPorIA && (
                    <Badge className="bg-blue-600 text-xs">IA</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>

          {transcrito && (
            <div className="mt-6 flex justify-end gap-3">
              <Button variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                Editar
              </Button>
              <Button className="bg-green-600 hover:bg-green-700">
                <CheckCircle className="mr-2 h-4 w-4" />
                Validar e Assinar
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Alertas */}
      {transcrito && percentualCompleto < 100 && (
        <Card className="border-yellow-600">
          <CardHeader className="bg-yellow-50 dark:bg-yellow-950">
            <CardTitle className="flex items-center gap-2 text-yellow-900 dark:text-yellow-100">
              <AlertTriangle className="h-5 w-5" />
              Atenção: Campos Incompletos
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-yellow-800 dark:text-yellow-200">
              Existem {camposObrigatorios - camposPreenchidos} campos obrigatórios não preenchidos.
              Complete-os antes de assinar o prontuário para evitar glosas.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TranscricaoAtendimentoPage;
