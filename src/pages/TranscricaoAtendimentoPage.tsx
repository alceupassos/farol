/**
 * Ferramenta de Transcrição e Estruturação do Atendimento
 * GRAVAR & Transcrever - Auxílio ao Médico
 */

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Mic, MicOff, Play, Pause, CheckCircle, AlertTriangle, 
  FileText, Clock, User, Activity, Stethoscope, Scissors,
  TestTube, Ambulance, Heart, Video, Building2, Pill, 
  UtensilsCrossed, Wind, UserCheck, LogOut, ArrowRightLeft
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';

type TipoAtendimento = 
  | 'enfermaria' 
  | 'quarto-a' 
  | 'ajuste-quarto'
  | 'ajuste-medicamentos'
  | 'ajuste-dieta'
  | 'ajuste-oxigenoterapia'
  | 'centro-cirurgico' 
  | 'exames' 
  | 'pronto-atendimento' 
  | 'uti' 
  | 'ambulatorio' 
  | 'interconsulta'
  | 'alta-hospitalar'
  | 'transferencia-leito'
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
  { value: 'ajuste-quarto', label: 'Ajuste de Quarto/Leito', icon: Building2 },
  { value: 'ajuste-medicamentos', label: 'Ajuste de Medicamentos', icon: Pill },
  { value: 'ajuste-dieta', label: 'Ajuste de Dieta', icon: UtensilsCrossed },
  { value: 'ajuste-oxigenoterapia', label: 'Ajuste de Oxigenoterapia', icon: Wind },
  { value: 'centro-cirurgico', label: 'Centro Cirúrgico', icon: Scissors },
  { value: 'exames', label: 'Exames', icon: TestTube },
  { value: 'pronto-atendimento', label: 'Pronto Atendimento', icon: Ambulance },
  { value: 'uti', label: 'UTI', icon: Heart },
  { value: 'ambulatorio', label: 'Ambulatório', icon: Stethoscope },
  { value: 'interconsulta', label: 'Interconsulta', icon: UserCheck },
  { value: 'alta-hospitalar', label: 'Alta Hospitalar', icon: LogOut },
  { value: 'transferencia-leito', label: 'Transferência de Leito', icon: ArrowRightLeft },
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
  'ajuste-quarto': [
    { campo: 'Identificação do Paciente', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Motivo do Ajuste/Transferência', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Tipo de Quarto Atual', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Tipo de Quarto Solicitado', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Justificativa Clínica', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Condições Clínicas do Paciente', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Autorização do Convênio', obrigatorio: false, preenchido: false, preenchidoPorIA: false },
  ],
  'ajuste-medicamentos': [
    { campo: 'Identificação do Paciente', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Medicação Atual', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Medicação Nova/Ajustada', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Justificativa do Ajuste', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Posologia', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Alergias Checadas', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Interações Medicamentosas', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Sinais Vitais', obrigatorio: false, preenchido: false, preenchidoPorIA: false },
  ],
  'ajuste-dieta': [
    { campo: 'Identificação do Paciente', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Dieta Atual', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Dieta Nova', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Justificativa Clínica', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Restrições Alimentares', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Via de Administração', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
  ],
  'ajuste-oxigenoterapia': [
    { campo: 'Identificação do Paciente', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Oxigenoterapia Atual', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Oxigenoterapia Nova', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Fluxo de O2 (L/min)', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Saturação de O2', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Justificativa do Ajuste', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Gasometria (se aplicável)', obrigatorio: false, preenchido: false, preenchidoPorIA: false },
  ],
  'interconsulta': [
    { campo: 'Identificação do Paciente', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Especialidade Solicitada', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Motivo da Interconsulta', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Resumo Clínico', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Dúvida Específica', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Exames Relevantes', obrigatorio: false, preenchido: false, preenchidoPorIA: false },
  ],
  'alta-hospitalar': [
    { campo: 'Identificação do Paciente', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Resumo da Internação', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Diagnóstico Principal (CID-10)', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Diagnósticos Secundários', obrigatorio: false, preenchido: false, preenchidoPorIA: false },
    { campo: 'Procedimentos Realizados', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Medicações de Alta', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Orientações ao Paciente', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Retorno Ambulatorial', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
  ],
  'transferencia-leito': [
    { campo: 'Identificação do Paciente', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Leito Origem', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Leito Destino', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Motivo da Transferência', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Condições Clínicas', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Sinais Vitais', obrigatorio: true, preenchido: false, preenchidoPorIA: false },
    { campo: 'Cuidados Especiais', obrigatorio: false, preenchido: false, preenchidoPorIA: false },
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
  const [textoAnamnese, setTextoAnamnese] = useState('');
  const [transcricaoRealTime, setTranscricaoRealTime] = useState('');
  const [tipoDetectadoAuto, setTipoDetectadoAuto] = useState(false);

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

  // Detectar tipo de atendimento automaticamente baseado no texto
  useEffect(() => {
    if (textoAnamnese.length > 50 && !tipoDetectadoAuto) {
      const texto = textoAnamnese.toLowerCase();
      let tipoDetectado: TipoAtendimento | null = null;

      if (texto.includes('cirurgia') || texto.includes('opme') || texto.includes('procedimento cirúrgico')) {
        tipoDetectado = 'centro-cirurgico';
      } else if (texto.includes('uti') || texto.includes('terapia intensiva') || texto.includes('ventilação')) {
        tipoDetectado = 'uti';
      } else if (texto.includes('exame') || texto.includes('raio-x') || texto.includes('tomografia') || texto.includes('ressonância')) {
        tipoDetectado = 'exames';
      } else if (texto.includes('emergência') || texto.includes('pronto socorro') || texto.includes('ps')) {
        tipoDetectado = 'pronto-atendimento';
      } else if (texto.includes('ambulatório') || texto.includes('consulta')) {
        tipoDetectado = 'ambulatorio';
      } else if (texto.includes('telemedicina') || texto.includes('teleconsulta')) {
        tipoDetectado = 'telemedicina';
      } else if (texto.includes('enfermaria') || texto.includes('internação')) {
        tipoDetectado = 'enfermaria';
      }

      if (tipoDetectado && tipoDetectado !== tipoAtendimento) {
        setTipoAtendimento(tipoDetectado);
        setChecklist(checklistsPorTipo[tipoDetectado]);
        setTipoDetectadoAuto(true);
      }
    }
  }, [textoAnamnese, tipoDetectadoAuto, tipoAtendimento]);

  // Simular transcrição em tempo real
  useEffect(() => {
    if (gravando && textoAnamnese) {
      const timer = setTimeout(() => {
        setTranscricaoRealTime(textoAnamnese);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [textoAnamnese, gravando]);

  const handleTranscrever = () => {
    // Simular transcrição e preenchimento automático
    const checklistAtualizado = checklist.map((item, index) => ({
      ...item,
      preenchido: index < checklist.length * 0.8, // 80% preenchido pela IA
      preenchidoPorIA: index < checklist.length * 0.8,
    }));
    setChecklist(checklistAtualizado);
    setTranscricaoRealTime(textoAnamnese);
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
          {tipoDetectadoAuto && (
            <Badge className="mt-3 bg-green-600">
              <CheckCircle className="h-3 w-3 mr-1" />
              Tipo detectado automaticamente pela anamnese
            </Badge>
          )}
        </CardContent>
      </Card>

      {/* Área de Anamnese e Transcrição em Tempo Real */}
      <Card>
        <CardHeader>
          <CardTitle>Anamnese e Transcrição</CardTitle>
          <CardDescription>
            Escreva a anamnese à esquerda e veja a transcrição estruturada em tempo real à direita
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Área de Escrita */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Escrever Anamnese</label>
              <Textarea
                placeholder="Digite ou cole a anamnese do paciente aqui...\n\nExemplo:\nPaciente deu entrada no pronto socorro com dor torácica há 2 horas...\nHistória de hipertensão e diabetes...\nSinais vitais: PA 160/100, FC 95, Tax 36.8°C..."
                value={textoAnamnese}
                onChange={(e) => setTextoAnamnese(e.target.value)}
                className="min-h-[400px] font-mono text-sm"
              />
              <div className="text-xs text-muted-foreground">
                {textoAnamnese.length} caracteres
              </div>
            </div>

            {/* Transcrição em Tempo Real */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                Transcrição Estruturada (Tempo Real)
                {transcricaoRealTime && (
                  <Badge className="bg-blue-600">
                    <Activity className="h-3 w-3 mr-1 animate-pulse" />
                    Processando IA
                  </Badge>
                )}
              </label>
              <div className="min-h-[400px] p-4 border rounded-md bg-muted/30 font-mono text-sm overflow-y-auto">
                {transcricaoRealTime ? (
                  <div className="space-y-3">
                    <div>
                      <div className="font-semibold text-blue-600">📋 SOAP Estruturado:</div>
                      <div className="mt-2 space-y-2">
                        <div>
                          <span className="font-semibold">S (Subjetivo):</span>
                          <p className="text-muted-foreground ml-4">{transcricaoRealTime.substring(0, 100)}...</p>
                        </div>
                        <div>
                          <span className="font-semibold">O (Objetivo):</span>
                          <p className="text-muted-foreground ml-4">Sinais vitais extraídos automaticamente...</p>
                        </div>
                        <div>
                          <span className="font-semibold">A (Avaliação):</span>
                          <p className="text-muted-foreground ml-4">Hipóteses diagnósticas sendo processadas...</p>
                        </div>
                        <div>
                          <span className="font-semibold">P (Plano):</span>
                          <p className="text-muted-foreground ml-4">Conduta terapêutica em análise...</p>
                        </div>
                      </div>
                    </div>
                    <div className="pt-3 border-t">
                      <div className="font-semibold text-green-600">✅ Campos Preenchidos Automaticamente:</div>
                      <ul className="mt-2 space-y-1 text-xs">
                        <li>• Identificação do Paciente</li>
                        <li>• Motivo da Consulta</li>
                        <li>• História Pregressa</li>
                        <li>• Sinais Vitais</li>
                        <li>• Hipóteses Diagnósticas (CID-10)</li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground py-20">
                    <FileText className="h-12 w-12 mx-auto mb-4 opacity-20" />
                    <p>A transcrição estruturada aparecerá aqui em tempo real</p>
                    <p className="text-xs mt-2">Comece a escrever na área à esquerda</p>
                  </div>
                )}
              </div>
            </div>
          </div>
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
