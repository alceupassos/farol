
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { QrCode } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

const QrAnaAtivoPage = () => {
  const anaQrValue = "https://wa.me/SEUNUMEROANA?text=IniciarAnamnese"; // Substitua SEUNUMEROANA pelo número correto
  const ativoQrValue = "https://wa.me/SEUNUMEROATIVO?text=IniciarPlano"; // Substitua SEUNUMEROATIVO pelo número correto

  return (
    <MainLayout>
      <div className="space-y-8">
        <header className="flex items-center space-x-3">
          <QrCode className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">QR CODE de ANA + ATIVO</h1>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Integração ANA + ATIVO</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300">
              A dupla ANA (Agente de iNteligência Artificial para Anamnese) e ATIVO (Agente Terapêutico Inteligente para Vida Organizada) forma um ecossistema completo de cuidado digital. Enquanto a ANA diagnostica e mapeia necessidades através de uma anamnese inteligente via WhatsApp, o ATIVO operacionaliza soluções, transformando recomendações médicas em planos de ação práticos e motivacionais. Juntos, criam um ciclo virtuoso de cuidado preventivo e terapêutico que acompanha o paciente desde a avaliação inicial até a manutenção de hábitos saudáveis a longo prazo.
            </p>
            <p className="mt-4 text-gray-700 dark:text-gray-300">
              Escaneie os QR Codes abaixo com a câmera do seu celular para iniciar uma conversa com os agentes de IA no WhatsApp:
            </p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">ANA - Agente de iNteligência Artificial para Anamnese</CardTitle>
              <CardDescription>Sua assistente virtual para uma anamnese completa e inteligente.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center">
                <QRCodeSVG value={anaQrValue} size={160} className="p-2 border rounded-md bg-white"/>
                <p className="mt-2 text-sm text-center text-gray-600 dark:text-gray-400">Escanear para iniciar com ANA</p>
              </div>
              
              <h3 className="font-semibold text-lg">Propósito Principal</h3>
              <p>A ANA é um agente conversacional especializado em realizar anamnese médica completa através do WhatsApp, conduzindo entrevistas estruturadas e inteligentes para coleta de informações de saúde dos pacientes.</p>

              <h3 className="font-semibold text-lg">Características Principais</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                <li><strong>Comunicação Humanizada</strong>: Utiliza linguagem natural e empática.</li>
                <li><strong>Questionário Adaptativo</strong>: Ajusta perguntas com base nas respostas anteriores.</li>
                <li><strong>Coleta Abrangente</strong>: Investiga histórico, sintomas, medicações, hábitos.</li>
                <li><strong>Interface Familiar</strong>: Opera via WhatsApp.</li>
                <li><strong>Processamento Inteligente</strong>: Analisa respostas em tempo real.</li>
              </ul>

              <h3 className="font-semibold text-lg">Funcionalidades</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                <li>Entrevista inicial estruturada.</li>
                <li>Identificação de sintomas e queixas.</li>
                <li>Levantamento de histórico familiar e pessoal.</li>
                <li>Análise de medicações e tratamentos.</li>
                <li>Avaliação de hábitos (alimentares, exercícios).</li>
                <li>Detecção de fatores de risco e alertas.</li>
                <li>Geração de relatório estruturado para profissionais.</li>
              </ul>

              <h3 className="font-semibold text-lg">Benefícios</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                <li>Economiza tempo da consulta.</li>
                <li>Padroniza a coleta de informações.</li>
                <li>Permite ao paciente responder no seu ritmo.</li>
                <li>Reduz ansiedade pré-consulta.</li>
                <li>Melhora a qualidade dos dados coletados.</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">ATIVO - Agente Terapêutico Inteligente para Vida Organizada</CardTitle>
              <CardDescription>Seu parceiro para transformar recomendações médicas em hábitos saudáveis.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center">
                  <QRCodeSVG value={ativoQrValue} size={160} className="p-2 border rounded-md bg-white"/>
                  <p className="mt-2 text-sm text-center text-gray-600 dark:text-gray-400">Escanear para iniciar com ATIVO</p>
              </div>

              <h3 className="font-semibold text-lg">Propósito Principal</h3>
              <p>O ATIVO é um agente motivacional e executivo que transforma as recomendações médicas em ações práticas e sustentáveis, acompanhando o paciente na implementação de mudanças de estilo de vida.</p>

              <h3 className="font-semibold text-lg">Características Principais</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                <li><strong>Executor Prático</strong>: Converte prescrições em planos de ação.</li>
                <li><strong>Motivador Personalizado</strong>: Adapta linguagem e estratégias.</li>
                <li><strong>Acompanhamento Contínuo</strong>: Monitora progresso e ajusta.</li>
                <li><strong>Gamificação Inteligente</strong>: Utiliza jogos para engajamento.</li>
                <li><strong>Multimodal</strong>: Combina lembretes, desafios, educação.</li>
              </ul>
              
              <h3 className="font-semibold text-lg">Funcionalidades</h3>
              <div className="space-y-2 text-gray-700 dark:text-gray-300">
                <p><strong>Gestão de Medicamentos:</strong> Lembretes, controle de estoque, educação.</p>
                <p><strong>Programa de Exercícios:</strong> Rotinas adaptadas, progressão, desafios.</p>
                <p><strong>Orientação Nutricional:</strong> Planos alimentares, receitas, controle de peso.</p>
                <p><strong>Suporte Comportamental:</strong> Mindfulness, metas SMART, coaching.</p>
              </div>

              <h3 className="font-semibold text-lg">Metodologia de Ação</h3>
              <ol className="list-decimal list-inside space-y-1 text-gray-700 dark:text-gray-300">
                <li><strong>Análise</strong>: Processa recomendações e cria perfil.</li>
                <li><strong>Planejamento</strong>: Desenvolve cronograma personalizado.</li>
                <li><strong>Execução</strong>: Implementa ações com lembretes e orientações.</li>
                <li><strong>Monitoramento</strong>: Acompanha aderência e resultados.</li>
                <li><strong>Ajuste</strong>: Modifica estratégias com base no feedback.</li>
              </ol>

              <h3 className="font-semibold text-lg">Benefícios</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                <li>Aumenta aderência a tratamentos.</li>
                <li>Transforma hábitos de forma sustentável.</li>
                <li>Reduz sobrecarga dos profissionais de saúde.</li>
                <li>Empodera o paciente no autocuidado.</li>
                <li>Melhora resultados clínicos de longo prazo.</li>
                <li>Previne recaídas e abandono de tratamento.</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default QrAnaAtivoPage;

