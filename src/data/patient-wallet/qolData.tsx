
import React from 'react';
import { 
  BarChart3, Activity, UserCheck, Zap, Meh, Brain, Users, Home, Award, DollarSign, PieChart, Lightbulb, FileText, BookOpen, MessageCircle,
  TrendingUp, TrendingDown, Minus, GitCompareArrows, AlertTriangle
} from 'lucide-react';
import { QoLSection, DomainDataItem, AdditionalAspectItem, ObjectiveWearableItem, AIInsightItem } from '@/components/quality-of-life/content/types';

export const qolSections: QoLSection[] = [
  { id: 'overview', name: 'Visão Geral', icon: <BarChart3 className="h-5 w-5" />, tooltip: "Visão geral da sua qualidade de vida." },
  { id: 'mobility', name: 'Mobilidade', icon: <Activity className="h-5 w-5" />, tooltip: "Sua capacidade de locomoção." },
  { id: 'selfcare', name: 'Cuidados Pessoais', icon: <UserCheck className="h-5 w-5" />, tooltip: "Sua capacidade de realizar tarefas de autocuidado." },
  { id: 'activities', name: 'Atividades Habituais', icon: <Zap className="h-5 w-5" />, tooltip: "Sua capacidade de realizar atividades diárias." },
  { id: 'pain', name: 'Dor / Desconforto', icon: <Meh className="h-5 w-5" />, tooltip: "Nível de dor ou desconforto físico." },
  { id: 'anxiety', name: 'Ansiedade / Depressão', icon: <Brain className="h-5 w-5" />, tooltip: "Seu estado emocional." },
  { id: 'social', name: 'Relações Sociais', icon: <Users className="h-5 w-5" />, tooltip: "Qualidade das suas relações pessoais." },
  { id: 'environment', name: 'Ambiente', icon: <Home className="h-5 w-5" />, tooltip: "Sua percepção sobre o ambiente." },
  { id: 'psychoSpiritual', name: 'Psicológico / Espiritual', icon: <Award className="h-5 w-5" />, tooltip: "Seus sentimentos, autoestima e sentido na vida." },
  { id: 'socioeconomic', name: 'Socioeconômico', icon: <DollarSign className="h-5 w-5" />, tooltip: "Sua satisfação com aspectos financeiros e trabalho." },
  { id: 'objectiveData', name: 'Dados Objetivos', icon: <PieChart className="h-5 w-5" />, tooltip: "Dados coletados por wearables e apps." },
  { id: 'insights', name: 'Insights IA', icon: <Lightbulb className="h-5 w-5" />, tooltip: "Análises e sugestões da IA." },
  { id: 'history', name: 'Histórico e Relatórios', icon: <FileText className="h-5 w-5" />, tooltip: "Seu histórico de qualidade de vida." },
  { id: 'source', name: 'Fonte', icon: <BookOpen className="h-5 w-5" />, tooltip: "Informações sobre os instrumentos e metodologia utilizados no Índice de Qualidade de Vida." },
  { id: 'exampleImplementation', name: 'Exemplo de Implementação', icon: <MessageCircle className="h-5 w-5" />, tooltip: "Exemplos de como um Agente IA no WhatsApp coletaria informações para os índices." },
];

export const domainData: DomainDataItem[] = [
  { name: "Mobilidade", score: "2 (alguns problemas)", objective: "Média passos: 7500", trendIcon: <TrendingUp size={16} className="text-green-500 ml-1" />, tooltip: "Sua capacidade de locomoção. Avalia dificuldades para andar (EQ-5D) e sua média de passos." },
  { name: "Cuidados Pessoais", score: "1 (sem problemas)", objective: "Autonomia: Alta", trendIcon: <Minus size={16} className="text-gray-500 ml-1" />, tooltip: "Sua capacidade de realizar tarefas de autocuidado, como se lavar e se vestir (EQ-5D)." },
  { name: "Atividades Habituais", score: "1 (sem problemas)", objective: "Atividade: 60 min/dia", trendIcon: <TrendingUp size={16} className="text-green-500 ml-1" />, tooltip: "Sua capacidade de realizar atividades diárias como trabalho, estudos ou lazer (EQ-5D) e seu nível de atividade física." },
  { name: "Dor / Desconforto Físico", score: "2 (alguns problemas)", objective: "Dor média: Moderada", trendIcon: <TrendingDown size={16} className="text-red-500 ml-1" />, tooltip: "Nível de dor ou desconforto físico que você está sentindo atualmente (EQ-5D)." },
  { name: "Ansiedade / Depressão", score: "2 (alguns problemas)", objective: "HRV: Baixa", trendIcon: <TrendingDown size={16} className="text-red-500 ml-1" />, tooltip: "Seu estado emocional referente à ansiedade ou depressão (EQ-5D) e bem-estar psicológico geral (WHOQOL)." },
];

export const additionalAspectsData: AdditionalAspectItem[] = [
  { name: "Relações Sociais", score: "8.0/10", trend: 'up', tooltip: "Qualidade das suas relações pessoais e nível de suporte social percebido." },
  { name: "Ambiente", score: "7.5/10", trend: 'stable', tooltip: "Sua percepção sobre o ambiente físico e social ao seu redor (segurança, lar, recursos)." },
  { name: "Psicológico/Espiritual", score: "7.0/10", trend: 'up', tooltip: "Avalia seus sentimentos positivos/negativos, autoestima, sentido na vida e crenças pessoais." },
  { name: "Socioeconômico", score: "6.5/10", trend: 'down', tooltip: "Sua satisfação com aspectos financeiros, trabalho e oportunidades de educação." },
];

export const objectiveWearablesData: ObjectiveWearableItem[] = [
  { name: "Qualidade do Sono", value: "7h30min/noite", graphType: "Gráfico Barras", tooltip: "Duração e qualidade do seu sono, com base em dados de wearables e/ou auto-relato." },
  { name: "Nível de Atividade Física", value: "7500 passos/dia", graphType: "Anéis Progresso", tooltip: "Quantidade de atividade física realizada, incluindo passos, minutos ativos e intensidade (dados de wearables)." },
  { name: "Frequência Cardíaca", value: "65 bpm repouso", graphType: "Gráfico Linha", tooltip: "Média dos seus batimentos cardíacos por minuto em estado de repouso (dados de wearables)." },
];

export const aiInsightsData: AIInsightItem[] = [
    { title: "Correlação Identificada", text: "Sua ansiedade diminui após noites com mais de 7 horas de sono.", icon: <GitCompareArrows size={20} className="text-blue-500"/>, tooltip: "Relações significativas entre seus hábitos/respostas e seu bem-estar, identificadas pela IA." },
    { title: "Sugestão Personalizada", text: "Aumente atividade física para reduzir a percepção de dor.", icon: <Lightbulb size={20} className="text-yellow-500"/>, tooltip: "Dicas e recomendações da IA, adaptadas ao seu perfil, para promover sua qualidade de vida." },
    { title: "Ponto de Atenção", text: "Seu nível de estresse parece aumentar em dias com reuniões longas. Considere pausas.", icon: <AlertTriangle size={20} className="text-orange-500"/>, tooltip: "Aspectos que podem precisar de mais atenção para melhorar seu bem-estar, sugeridos pela IA." },
];

export const eq5dVASScore = 82; 
export const eq5dVASTrend: 'up' | 'down' | 'stable' = 'up';
export const overallStatus = { text: "Bem-Estar Estável", mood: "neutral" as 'good' | 'neutral' | 'bad' };
export const lastCheckIn = "27/Mai às 10h45";

