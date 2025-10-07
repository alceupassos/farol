
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info, MessageSquare } from 'lucide-react';

interface QoLSectionInfo {
  id: string;
  name: string;
  icon: React.ReactNode;
  tooltip: string;
}

interface QoLExampleImplementationSectionProps {
  section: QoLSectionInfo;
}

const QoLExampleImplementationSection: React.FC<QoLExampleImplementationSectionProps> = ({ section }) => {
  const renderTextWithLineBreaks = (text: string) => {
    return text.split('\n').map((line, index, array) => (
      <React.Fragment key={index}>
        {line}
        {index < array.length - 1 && <br />}
      </React.Fragment>
    ));
  };

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
      <CardContent className="space-y-6 text-sm prose max-w-none prose-sm sm:prose-base">
        <p>Ótimo! Vamos criar exemplos de como um Agente de IA no WhatsApp poderia interagir para coletar informações para cada um desses índices. A ideia é usar uma linguagem conversacional e oferecer opções claras.</p>
        
        <hr className="my-4" />
        <p><strong>Agente IA (WhatsApp):</strong> "Olá [Nome do Usuário]! 👋 Vamos fazer nosso check-in rápido de Qualidade de Vida? Leva só alguns minutinhos!"</p>
        <hr className="my-4" />

        <h3 className="font-semibold text-lg mt-4 mb-2">📊 Visão Geral</h3>
        <p className="italic text-xs mb-2">(Normalmente, esta é a Escala Visual Analógica do EQ-5D ou uma pergunta similar do WHOQOL)</p>
        <ol className="list-decimal space-y-2 pl-5">
          <li>
            <strong>Exemplo 1 (EQ-5D VAS):</strong>
            <ul className="list-disc space-y-1 pl-5 mt-1">
              <li><strong>IA:</strong> "Para começar, numa escala de 0 (a pior saúde que você pode imaginar) a 100 (a melhor saúde que você pode imaginar), como você classificaria sua saúde geral hoje? 😊"</li>
              <li><strong>Usuário:</strong> (Digita um número, ex: "75")</li>
            </ul>
          </li>
          <li>
            <strong>Exemplo 2 (WHOQOL - Pergunta Geral):</strong>
            <ul className="list-disc space-y-1 pl-5 mt-1">
              <li><strong>IA:</strong> "Pensando de forma geral, como você avaliaria sua qualidade de vida no momento?
                <ol className="list-decimal pl-5 mt-1">
                  <li>Muito ruim</li>
                  <li>Ruim</li>
                  <li>Nem ruim, nem boa</li>
                  <li>Boa</li>
                  <li>Muito boa</li>
                </ol>"
              </li>
              <li><strong>Usuário:</strong> (Digita o número da opção, ex: "4")</li>
            </ul>
          </li>
        </ol>
        <hr className="my-4" />
        
        <h3 className="font-semibold text-lg mt-4 mb-2">🏃 Mobilidade</h3>
        <p className="italic text-xs mb-2">(Baseado no EQ-5D, QWBS, WHOQOL - Domínio Físico)</p>
        <ol className="list-decimal space-y-2 pl-5">
          <li>
            <strong>Exemplo 1 (EQ-5D):</strong>
            <ul className="list-disc space-y-1 pl-5 mt-1">
              <li><strong>IA:</strong> "Sobre sua capacidade de andar por aí hoje:
                <ol className="list-decimal pl-5 mt-1">
                  <li>Não tenho problemas para andar</li>
                  <li>Tenho alguns problemas para andar</li>
                  <li>Estou confinado(a) à cama/cadeira de rodas</li>
                </ol>"
              </li>
              <li><strong>Usuário:</strong> "1"</li>
            </ul>
          </li>
          <li>
            <strong>Exemplo 2 (WHOQOL - Foco em necessidade de ajuda):</strong>
             <ul className="list-disc space-y-1 pl-5 mt-1">
                <li><strong>IA:</strong> "Nos últimos 7 dias, você precisou de alguma ajuda (de outra pessoa, bengala, etc.) para se locomover?
                    <ol className="list-decimal pl-5 mt-1">
                        <li>Não, nenhuma</li>
                        <li>Sim, às vezes</li>
                        <li>Sim, frequentemente</li>
                    </ol>"
                </li>
                <li><strong>Usuário:</strong> "1"</li>
            </ul>
          </li>
           <li>
            <strong>Exemplo 3 (QWBS - Limitação):</strong>
             <ul className="list-disc space-y-1 pl-5 mt-1">
                <li><strong>IA:</strong> "Você se sentiu limitado(a) em sua capacidade de ir aonde gostaria nos últimos dias?
                    <ol className="list-decimal pl-5 mt-1">
                        <li>Não me senti limitado(a)</li>
                        <li>Um pouco limitado(a)</li>
                        <li>Muito limitado(a)</li>
                    </ol>"
                </li>
                <li><strong>Usuário:</strong> "2"</li>
            </ul>
          </li>
        </ol>
        <hr className="my-4" />

        <h3 className="font-semibold text-lg mt-4 mb-2">🛀 Cuidados Pessoais</h3>
        <p className="italic text-xs mb-2">(Baseado no EQ-5D, WHOQOL - Domínio Físico)</p>
        <ol className="list-decimal space-y-2 pl-5">
            <li>
                <strong>Exemplo 1 (EQ-5D):</strong>
                <ul className="list-disc space-y-1 pl-5 mt-1">
                    <li><strong>IA:</strong> "Pensando nos seus cuidados pessoais (como tomar banho, se vestir):
                        <ol className="list-decimal pl-5 mt-1">
                            <li>Não tenho problemas</li>
                            <li>Tenho alguns problemas</li>
                            <li>Sou incapaz de me lavar ou me vestir sozinho(a)</li>
                        </ol>"
                    </li>
                    <li><strong>Usuário:</strong> "1"</li>
                </ul>
            </li>
            <li>
                <strong>Exemplo 2 (Independência):</strong>
                <ul className="list-disc space-y-1 pl-5 mt-1">
                    <li><strong>IA:</strong> "Nos últimos dias, você conseguiu realizar suas atividades de higiene pessoal de forma independente?
                        <ol className="list-decimal pl-5 mt-1">
                            <li>Sim, totalmente</li>
                            <li>Com alguma dificuldade, mas consegui</li>
                            <li>Precisei de ajuda</li>
                        </ol>"
                    </li>
                    <li><strong>Usuário:</strong> "1"</li>
                </ul>
            </li>
        </ol>
        <hr className="my-4" />
        
        {/* Continue for other sections: Atividades Habituais, Dor/Desconforto, etc. */}
        {/* For brevity, only the first few sections are fully laid out here. The pattern should be repeated. */}

        <h3 className="font-semibold text-lg mt-4 mb-2">⚡ Atividades Habituais</h3>
        <p className="italic text-xs mb-2">(Baseado no EQ-5D, QWBS, WHOQOL - Domínio Físico)</p>
         <ol className="list-decimal space-y-2 pl-5">
            <li>
                <strong>Exemplo 1 (EQ-5D):</strong>
                 <ul className="list-disc space-y-1 pl-5 mt-1">
                    <li><strong>IA:</strong> {renderTextWithLineBreaks("Sobre suas atividades habituais (como trabalho, estudos, tarefas domésticas, atividades de lazer):\n1. Não tenho problemas para realizá-las\n2. Tenho alguns problemas para realizá-las\n3. Sou incapaz de realizá-las")}</li>
                    <li><strong>Usuário:</strong> "2"</li>
                </ul>
            </li>
            <li>
                <strong>Exemplo 2 (WHOQOL - Energia):</strong>
                 <ul className="list-disc space-y-1 pl-5 mt-1">
                    <li><strong>IA:</strong> {renderTextWithLineBreaks("Nos últimos 7 dias, você sentiu que teve energia suficiente para suas atividades do dia a dia?\n1. Sim, sempre\n2. Na maior parte do tempo\n3. Às vezes\n4. Raramente ou nunca")}</li>
                    <li><strong>Usuário:</strong> "3"</li>
                </ul>
            </li>
            <li>
                <strong>Exemplo 3 (QWBS - Desempenho):</strong>
                 <ul className="list-disc space-y-1 pl-5 mt-1">
                    <li><strong>IA:</strong> {renderTextWithLineBreaks("Como você avalia seu desempenho nas suas principais atividades (trabalho/estudo) recentemente?\n1. Muito bom\n2. Bom\n3. Regular\n4. Ruim")}</li>
                    <li><strong>Usuário:</strong> "2"</li>
                </ul>
            </li>
        </ol>
        <hr className="my-4" />

        <h3 className="font-semibold text-lg mt-4 mb-2">😌 Dor / Desconforto</h3>
        <p className="italic text-xs mb-2">(Baseado no EQ-5D, WHOQOL - Domínio Físico)</p>
        <ol className="list-decimal space-y-2 pl-5">
            <li>
                <strong>Exemplo 1 (EQ-5D):</strong>
                <ul className="list-disc space-y-1 pl-5 mt-1">
                    <li><strong>IA:</strong> {renderTextWithLineBreaks("Em relação à dor ou desconforto físico hoje:\n1. Não sinto nenhuma dor ou desconforto\n2. Sinto dor ou desconforto moderado\n3. Sinto dor ou desconforto extremo")}</li>
                    <li><strong>Usuário:</strong> "2"</li>
                </ul>
            </li>
            <li>
                <strong>Exemplo 2 (WHOQOL - Interferência):</strong>
                <ul className="list-disc space-y-1 pl-5 mt-1">
                    <li><strong>IA:</strong> {renderTextWithLineBreaks("Nos últimos 7 dias, o quanto a dor física interferiu nas suas atividades normais?\n1. Nada\n2. Um pouco\n3. Moderadamente\n4. Bastante\n5. Extremamente")}</li>
                    <li><strong>Usuário:</strong> "3"</li>
                </ul>
            </li>
        </ol>
        <hr className="my-4" />

        <h3 className="font-semibold text-lg mt-4 mb-2">🧠 Ansiedade / Depressão</h3>
        <p className="italic text-xs mb-2">(Baseado no EQ-5D, WHOQOL - Domínio Psicológico)</p>
        <ol className="list-decimal space-y-2 pl-5">
             <li>
                <strong>Exemplo 1 (EQ-5D):</strong>
                <ul className="list-disc space-y-1 pl-5 mt-1">
                    <li><strong>IA:</strong> {renderTextWithLineBreaks("Sobre se sentir ansioso(a) ou deprimido(a) hoje:\n1. Não estou ansioso(a) nem deprimido(a)\n2. Estou moderadamente ansioso(a) ou deprimido(a)\n3. Estou extremamente ansioso(a) ou deprimido(a)")}</li>
                    <li><strong>Usuário:</strong> "1"</li>
                </ul>
            </li>
             <li>
                <strong>Exemplo 2 (WHOQOL - Sentimentos Positivos):</strong>
                <ul className="list-disc space-y-1 pl-5 mt-1">
                    <li><strong>IA:</strong> {renderTextWithLineBreaks("Com que frequência você teve sentimentos positivos (como felicidade, esperança) nos últimos 7 dias?\n1. Nunca\n2. Raramente\n3. Às vezes\n4. Frequentemente\n5. Sempre")}</li>
                    <li><strong>Usuário:</strong> "4"</li>
                </ul>
            </li>
             <li>
                <strong>Exemplo 3 (WHOQOL - Sentimentos Negativos):</strong>
                <ul className="list-disc space-y-1 pl-5 mt-1">
                    <li><strong>IA:</strong> {renderTextWithLineBreaks("E com que frequência você teve sentimentos negativos (como tristeza, preocupação, irritação) nos últimos 7 dias?\n1. Sempre\n2. Frequentemente\n3. Às vezes\n4. Raramente\n5. Nunca")}</li>
                    <li><strong>Usuário:</strong> "3" (IA deve inverter a pontuação se necessário)</li>
                </ul>
            </li>
        </ol>
        <hr className="my-4" />

        <h3 className="font-semibold text-lg mt-4 mb-2">🫂 Relações Sociais</h3>
        <p className="italic text-xs mb-2">(Baseado no WHOQOL - Domínio Relações Sociais, IQV - Família, QWBS)</p>
        <ol className="list-decimal space-y-2 pl-5">
            <li>
                <strong>Exemplo 1 (WHOQOL - Satisfação):</strong>
                <ul className="list-disc space-y-1 pl-5 mt-1">
                    <li><strong>IA:</strong> {renderTextWithLineBreaks("Qual o seu nível de satisfação com seus relacionamentos pessoais (amigos, família, colegas)?\n1. Muito insatisfeito(a)\n2. Insatisfeito(a)\n3. Neutro\n4. Satisfeito(a)\n5. Muito satisfeito(a)")}</li>
                    <li><strong>Usuário:</strong> "5"</li>
                </ul>
            </li>
            <li>
                <strong>Exemplo 2 (WHOQOL - Suporte Social):</strong>
                <ul className="list-disc space-y-1 pl-5 mt-1">
                    <li><strong>IA:</strong> {renderTextWithLineBreaks("Você sente que tem apoio suficiente das pessoas ao seu redor quando precisa?\n1. Sim, totalmente\n2. Sim, na maioria das vezes\n3. Mais ou menos\n4. Não muito\n5. Não, nenhum")}</li>
                    <li><strong>Usuário:</strong> "2"</li>
                </ul>
            </li>
             <li>
                <strong>Exemplo 3 (IQV - Interação Familiar):</strong>
                <ul className="list-disc space-y-1 pl-5 mt-1">
                    <li><strong>IA:</strong> {renderTextWithLineBreaks("Como você descreveria a qualidade do tempo que passa com sua família ultimamente?\n1. Excelente\n2. Boa\n3. Regular\n4. Ruim")}</li>
                    <li><strong>Usuário:</strong> "1"</li>
                </ul>
            </li>
        </ol>
        <hr className="my-4" />
        
        <h3 className="font-semibold text-lg mt-4 mb-2">🏠 Ambiente</h3>
        <p className="italic text-xs mb-2">(Baseado no WHOQOL - Domínio Ambiente)</p>
        <ol className="list-decimal space-y-2 pl-5">
            <li>
                <strong>Exemplo 1 (WHOQOL - Segurança):</strong>
                <ul className="list-disc space-y-1 pl-5 mt-1">
                    <li><strong>IA:</strong> {renderTextWithLineBreaks("O quão seguro(a) você se sente no seu dia a dia (em casa e no seu bairro)?\n1. Muito inseguro(a)\n2. Inseguro(a)\n3. Neutro\n4. Seguro(a)\n5. Muito seguro(a)")}</li>
                    <li><strong>Usuário:</strong> "4"</li>
                </ul>
            </li>
            <li>
                <strong>Exemplo 2 (WHOQOL - Condições de Moradia):</strong>
                <ul className="list-disc space-y-1 pl-5 mt-1">
                    <li><strong>IA:</strong> {renderTextWithLineBreaks("Você está satisfeito(a) com as condições da sua moradia (conforto, limpeza, espaço)?\n(Use a mesma escala de satisfação de 1 a 5)")}</li>
                    <li><strong>Usuário:</strong> "5"</li>
                </ul>
            </li>
             <li>
                <strong>Exemplo 3 (WHOQOL - Acesso a Lazer):</strong>
                <ul className="list-disc space-y-1 pl-5 mt-1">
                    <li><strong>IA:</strong> {renderTextWithLineBreaks("Você tem tido oportunidades suficientes para atividades de lazer e recreação?\n1. Nenhuma\n2. Poucas\n3. Algumas\n4. Muitas")}</li>
                    <li><strong>Usuário:</strong> "3"</li>
                </ul>
            </li>
        </ol>
        <hr className="my-4" />

        <h3 className="font-semibold text-lg mt-4 mb-2">🧘 Psicológico / Espiritual</h3>
        <p className="italic text-xs mb-2">(Baseado no WHOQOL - Domínio Psicológico, IQV - Psicológico/Espiritual)</p>
        <ol className="list-decimal space-y-2 pl-5">
            <li>
                <strong>Exemplo 1 (WHOQOL/IQV - Sentido na Vida):</strong>
                <ul className="list-disc space-y-1 pl-5 mt-1">
                    <li><strong>IA:</strong> {renderTextWithLineBreaks("Até que ponto você sente que sua vida tem um sentido ou propósito?\n1. Nenhum\n2. Um pouco\n3. Moderadamente\n4. Bastante\n5. Totalmente")}</li>
                    <li><strong>Usuário:</strong> "4"</li>
                </ul>
            </li>
             <li>
                <strong>Exemplo 2 (WHOQOL - Autoestima):</strong>
                <ul className="list-disc space-y-1 pl-5 mt-1">
                    <li><strong>IA:</strong> {renderTextWithLineBreaks("Como você avaliaria sua autoestima nos últimos dias?\n1. Muito baixa\n2. Baixa\n3. Média\n4. Alta\n5. Muito alta")}</li>
                    <li><strong>Usuário:</strong> "4"</li>
                </ul>
            </li>
             <li>
                <strong>Exemplo 3 (IQV - Paz Interior/Crenças):</strong>
                <ul className="list-disc space-y-1 pl-5 mt-1">
                    <li><strong>IA:</strong> {renderTextWithLineBreaks("Você tem se sentido em paz consigo mesmo(a) e com suas crenças pessoais ultimamente?\n1. Não, de forma alguma\n2. Um pouco\n3. Moderadamente\n4. Sim, bastante")}</li>
                    <li><strong>Usuário:</strong> "3"</li>
                </ul>
            </li>
        </ol>
        <hr className="my-4" />

        <h3 className="font-semibold text-lg mt-4 mb-2">💰 Socioeconômico</h3>
        <p className="italic text-xs mb-2">(Baseado no IQV - Socioeconômico, WHOQOL - Ambiente)</p>
        <ol className="list-decimal space-y-2 pl-5">
            <li>
                <strong>Exemplo 1 (IQV - Situação Financeira):</strong>
                <ul className="list-disc space-y-1 pl-5 mt-1">
                    <li><strong>IA:</strong> {renderTextWithLineBreaks("Qual seu nível de satisfação com sua situação financeira atual?\n(Use a escala de satisfação de 1 a 5 de 'Relações Sociais')")}</li>
                    <li><strong>Usuário:</strong> "3"</li>
                </ul>
            </li>
             <li>
                <strong>Exemplo 2 (IQV - Trabalho/Ocupação):</strong>
                <ul className="list-disc space-y-1 pl-5 mt-1">
                    <li><strong>IA:</strong> {renderTextWithLineBreaks("Se você trabalha ou estuda, qual seu nível de satisfação com sua ocupação principal?\n(Use a escala de satisfação de 1 a 5. Se não se aplica, digite 0)")}</li>
                    <li><strong>Usuário:</strong> "4"</li>
                </ul>
            </li>
             <li>
                <strong>Exemplo 3 (WHOQOL - Acesso a Recursos):</strong>
                <ul className="list-disc space-y-1 pl-5 mt-1">
                    <li><strong>IA:</strong> {renderTextWithLineBreaks("Você sente que tem acesso adequado aos recursos que precisa no dia a dia (transporte, informação, etc.)?\n1. Não, acesso muito ruim\n2. Acesso limitado\n3. Acesso razoável\n4. Bom acesso")}</li>
                    <li><strong>Usuário:</strong> "3"</li>
                </ul>
            </li>
        </ol>
        <hr className="my-4" />
        
        <h3 className="font-semibold text-lg mt-4 mb-2">🏃‍♂️ Dados Objetivos</h3>
        <p className="italic text-xs mb-2">(Aqui a IA pode confirmar dados de wearables ou pedir inserção manual se não houver integração)</p>
        <ol className="list-decimal space-y-2 pl-5">
            <li>
                <strong>Exemplo 1 (Sono - Wearable):</strong>
                <ul className="list-disc space-y-1 pl-5 mt-1">
                    <li><strong>IA:</strong> {renderTextWithLineBreaks("Vi aqui no seu app de saúde que você dormiu 7h30 na noite passada. Essa informação está correta? 😴\n1. Sim\n2. Não, dormi mais\n3. Não, dormi menos")}</li>
                    <li><strong>Usuário:</strong> "1"</li>
                </ul>
            </li>
            <li>
                <strong>Exemplo 2 (Passos - Manual):</strong>
                <ul className="list-disc space-y-1 pl-5 mt-1">
                    <li><strong>IA:</strong> "Não consegui sincronizar seus passos de ontem. Você lembra aproximadamente quantos passos deu? 🚶‍♀️ (Pode ser uma estimativa: poucos, alguns, muitos, ou o número exato se souber!)"</li>
                    <li><strong>Usuário:</strong> "Muitos" ou "8500"</li>
                </ul>
            </li>
            <li>
                <strong>Exemplo 3 (Atividade Física - Tipo):</strong>
                <ul className="list-disc space-y-1 pl-5 mt-1">
                    <li><strong>IA:</strong> "Você praticou alguma atividade física específica hoje (ex: caminhada, academia, esporte)? Se sim, qual e por quanto tempo?"</li>
                    <li><strong>Usuário:</strong> "Caminhada por 45 minutos"</li>
                </ul>
            </li>
        </ol>
        <hr className="my-4" />

        <h3 className="font-semibold text-lg mt-4 mb-2">💡 Insights IA</h3>
        <p className="italic text-xs mb-2">(Esta seção é mais sobre a IA *fornecer* insights do que coletar dados, mas ela pode validar percepções)</p>
        <ol className="list-decimal space-y-2 pl-5">
            <li>
                <strong>Exemplo 1 (Validar Correlação Percebida):</strong>
                <ul className="list-disc space-y-1 pl-5 mt-1">
                    <li><strong>IA:</strong> {renderTextWithLineBreaks("Notei que nas últimas semanas, seus níveis de 'Ansiedade/Depressão' foram mais baixos nos dias em que você relatou ter dormido bem. Você também percebeu essa ligação? 🤔\n1. Sim, faz sentido\n2. Não tenho certeza\n3. Não, não percebi")}</li>
                    <li><strong>Usuário:</strong> "1"</li>
                </ul>
            </li>
            <li>
                <strong>Exemplo 2 (Feedback sobre Mudança):</strong>
                <ul className="list-disc space-y-1 pl-5 mt-1">
                    <li><strong>IA:</strong> "Seus relatos sobre 'Dor/Desconforto' melhoraram bastante desde que você mencionou ter iniciado os alongamentos! Como você está se sentindo em relação a isso? ✨"</li>
                    <li><strong>Usuário:</strong> "Muito melhor, obrigado!"</li>
                </ul>
            </li>
        </ol>
        <hr className="my-4" />

        <p><strong>Agente IA (WhatsApp):</strong> "Obrigado por compartilhar, [Nome do Usuário]! Suas respostas ajudam muito a acompanhar seu bem-estar. 😊"</p>
        <hr className="my-4" />

        <h3 className="font-semibold text-lg mt-4 mb-2">Considerações Importantes:</h3>
        <ul className="list-disc space-y-2 pl-5">
            <li><strong>Frequência:</strong> A IA não perguntaria tudo isso todos os dias. Alguns índices (como os 5 do EQ-5D) podem ser diários ou a cada poucos dias. Outros, mais abrangentes (WHOQOL, IQV), podem ser semanais ou quinzenais.</li>
            <li><strong>Lógica de Ramificação:</strong> Se o usuário reportar "problema grave" em algo, a IA poderia ter perguntas de acompanhamento específicas ou sugerir procurar um profissional.</li>
            <li><strong>Tom:</strong> Sempre amigável, empático e encorajador.</li>
            <li><strong>Privacidade:</strong> Lembrar o usuário sobre a privacidade dos dados é crucial no onboarding.</li>
            <li><strong>Emojis:</strong> Usar emojis de forma apropriada pode tornar a interação mais leve.</li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default QoLExampleImplementationSection;

