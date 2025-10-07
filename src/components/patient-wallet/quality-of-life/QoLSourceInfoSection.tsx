
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from 'lucide-react';

interface QoLSectionInfo {
  id: string;
  name: string;
  icon: React.ReactNode;
  tooltip: string;
}

interface QoLSourceInfoSectionProps {
  section: QoLSectionInfo;
}

const QoLSourceInfoSection: React.FC<QoLSourceInfoSectionProps> = ({ section }) => {
  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="capitalize flex items-center">
          {section.icon && React.cloneElement(section.icon as React.ReactElement, { className: "h-6 w-6 mr-3" })}
          {section.name}
        </CardTitle>
        <CardDescription>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="cursor-default text-left flex items-center">
                <span>{section.tooltip}</span>
                <Info size={12} className="ml-1 text-gray-400 inline flex-shrink-0" />
              </TooltipTrigger>
              <TooltipContent side="bottom" align="start" className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
                <p>{section.tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 text-sm">
        <div>
          <h3 className="font-semibold text-lg mb-2">1. Instrumentos de Qualidade de Vida Apresentados:</h3>
          <ul className="list-disc space-y-3 pl-5">
            <li>
              <strong className="font-medium">WHOQOL (Organização Mundial da Saúde):</strong>
              <ul className="list-circle space-y-1 pl-5 mt-1">
                <li><strong>Características:</strong> Robusto, abrangente (aplicável a várias doenças e situações não-médicas).</li>
                <li><strong>Modularidade:</strong> Possui módulos para condições específicas (doenças crônicas, cuidadores, estresse intenso, dificuldades de comunicação, crianças).</li>
                <li><strong>Adequação para Blockchain:</strong> Ideal para personalização devido à sua modularidade.</li>
              </ul>
            </li>
            <li>
              <strong className="font-medium">EQ-5D (EuroQol Group):</strong>
              <ul className="list-circle space-y-1 pl-5 mt-1">
                <li><strong>Características:</strong> Avalia 5 domínios (mobilidade, cuidados próprios, atividade habitual, dor/desconforto, ansiedade/depressão) com gradação (sem, algum, problema grave). Inclui escala analógica visual (0-100) para estado geral de saúde.</li>
                <li><strong>Adequação para Blockchain:</strong> Simplicidade de graduação facilita implementação digital automatizada.</li>
              </ul>
            </li>
            <li>
              <strong className="font-medium">SF-36 (Short Form 36):</strong>
              <ul className="list-circle space-y-1 pl-5 mt-1">
                <li><strong>Características:</strong> Avaliação mais abrangente com 8 dimensões (funcionamento físico, papel físico, dor corporal, saúde geral, vitalidade, funcionamento social, papel emocional, saúde mental).</li>
                <li><strong>Relação com EQ-5D:</strong> Modelos de mapeamento entre SF-36 e EQ-5D mostram predições similares.</li>
              </ul>
            </li>
            <li>
              <strong className="font-medium">IQV (Índice Qualidade de Vida de Ferrans e Powers):</strong>
              <ul className="list-circle space-y-1 pl-5 mt-1">
                <li><strong>Características:</strong> Genérico (pessoas sadias e com problemas de saúde). Dividido em duas partes (34 itens cada) cobrindo 4 aspectos (saúde/funcionamento, socioeconômico, psicológico/espiritual, família). Abordagem individualista (sujeito define QV).</li>
                <li><strong>Adequação para Blockchain:</strong> Estrutura personalizável.</li>
              </ul>
            </li>
            <li>
              <strong className="font-medium">QWBS (Quality of Well-Being Scale):</strong>
              <ul className="list-circle space-y-1 pl-5 mt-1">
                <li><strong>Características:</strong> Afere bem-estar em 3 domínios (mobilidade, atividade física, atividade social) e inclui lista de sintomas.</li>
                <li><strong>Adequação para Blockchain:</strong> Estrutura modular e personalizável, alinhada com a descentralização da blockchain.</li>
              </ul>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-2">2. Considerações Técnicas para Implementação em Blockchain:</h3>
          <ul className="list-disc space-y-3 pl-5">
            <li>
              <strong className="font-medium">Coleta e Validação de Dados:</strong>
              <ul className="list-circle space-y-1 pl-5 mt-1">
                <li><strong>Fontes de Dados:</strong>
                  <ul className="list-disc space-y-1 pl-5 mt-1">
                      <li>Objetivos: Dispositivos wearables, apps de saúde móvel, sistemas hospitalares (frequência cardíaca, sono, atividade física, sinais vitais). Podem alimentar métricas do EQ-5D.</li>
                      <li>Subjetivos: Questionários periódicos (bem-estar psicológico, satisfação com relacionamentos).</li>
                  </ul>
                </li>
                <li><strong>Validação:</strong> Cruzamento de fontes, contratos inteligentes para integridade e confiabilidade.</li>
              </ul>
            </li>
            <li>
              <strong className="font-medium">Privacidade e Segurança:</strong>
              <ul className="list-circle space-y-1 pl-5 mt-1">
                <li><strong>Desafio:</strong> Natureza sensível dos dados médicos.</li>
                <li><strong>Soluções Propostas:</strong>
                  <ul className="list-disc space-y-1 pl-5 mt-1">
                    <li>Zero-Knowledge Proofs (ZKP): Verificação de índices sem revelar dados subjacentes.</li>
                    <li>Criptografia Homomórfica: Cálculos sobre dados criptografados.</li>
                    <li>Sistemas de Permissão (Contratos Inteligentes): Controle de acesso granular.</li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-2">3. Recomendações para Carteira Digital Médica em Blockchain:</h3>
          <ul className="list-disc space-y-3 pl-5">
            <li>
              <strong className="font-medium">Índices Prioritários:</strong>
              <ul className="list-circle space-y-1 pl-5 mt-1">
                <li>Conjunto híbrido (objetividade + personalização).</li>
                <li>EQ-5D como principal: Simples, validado, mapeável a dados automáticos e questionários.</li>
                <li>Elementos do WHOQOL como complemento: Para aspectos psicológicos e sociais.</li>
                <li>Métricas Objetivas (wearables): Para atividade física, sono, sinais vitais.</li>
              </ul>
            </li>
            <li>
              <strong className="font-medium">Estrutura de Dados e Atualizações:</strong>
              <ul className="list-circle space-y-1 pl-5 mt-1">
                <li><strong>Design:</strong> Permitir atualizações frequentes e comparações longitudinais.</li>
                <li><strong>Campos por Índice:</strong> Timestamp, fonte de dados, nível de confiança, metadados contextuais.</li>
                <li><strong>Automação (Contratos Inteligentes):</strong> Cálculo de índices compostos, detecção de tendências, alertas para usuários/profissionais (se índices abaixo de limiares).</li>
              </ul>
            </li>
            <li><strong className="font-medium">Interoperabilidade:</strong> Padrões como HL7 FHIR para integração com sistemas existentes e portabilidade.</li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-semibold text-lg mb-2">4. Conclusão do Texto:</h3>
          <p className="mb-2">A implementação de índices de QV em carteiras digitais médicas blockchain oferece oportunidades significativas para monitoramento personalizado e contínuo.</p>
          <p className="mb-2">A combinação de instrumentos validados (EQ-5D, WHOQOL) com métricas objetivas é promissora.</p>
          <p className="mb-2">Desafios técnicos (privacidade, interoperabilidade, validação) precisam ser superados.</p>
          <p className="mb-2">A evolução tecnológica (blockchain, wearables) tornará esses sistemas mais práticos e valiosos, avançando na democratização e personalização dos cuidados de saúde.</p>
          <h4 className="font-medium text-md mt-3 mb-1">Pontos Chave e Implicações:</h4>
          <ul className="list-disc space-y-2 pl-5">
            <li><strong>Personalização:</strong> A modularidade de instrumentos como WHOQOL e QWBS, e a abordagem individualista do IQV, alinham-se bem com a capacidade da blockchain de criar soluções customizadas.</li>
            <li><strong>Automação e Objetividade:</strong> A simplicidade do EQ-5D e a coleta de dados por wearables permitem automação e a inclusão de métricas objetivas.</li>
            <li><strong>Segurança e Privacidade:</strong> Tecnologias como ZKP e criptografia homomórfica são cruciais para proteger dados sensíveis, um dos maiores desafios na saúde digital.</li>
            <li><strong>Contratos Inteligentes:</strong> São fundamentais para validação de dados, cálculo de índices, automação de alertas e gerenciamento de permissões.</li>
            <li><strong>Interoperabilidade:</strong> A menção ao HL7 FHIR destaca a necessidade de integração com o ecossistema de saúde existente.</li>
            <li><strong>Visão Holística:</strong> A combinação de diferentes instrumentos e fontes de dados (objetivas e subjetivas) visa uma compreensão mais completa da QV do indivíduo.</li>
          </ul>
          <p className="mt-3 italic">O texto apresenta uma visão otimista e bem fundamentada sobre o potencial dessa integração, sem negligenciar os desafios técnicos inerentes.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default QoLSourceInfoSection;

