
import MainLayout from '@/components/layout/MainLayout';
import { BarChart2, PieChart, Table, Users, Network, HelpCircle, FileText, Sigma } from 'lucide-react'; // Dna é usado no Header, ExternalLink não está em uso nos dados atuais
import ManhattanPlot from '@/components/genetics/ManhattanPlot';
import GeneticInfographic from '@/components/genetics/GeneticInfographic';
import ConceptualMap from '@/components/genetics/ConceptualMap';
import GeneticPageHeader from '@/components/genetics/GeneticPageHeader';
import RecommendedReportsSection from '@/components/genetics/RecommendedReportsSection';
import AdditionalVisualizationsSection from '@/components/genetics/AdditionalVisualizationsSection';

import { 
  manhattanPlotData, 
  alleleFrequencyData, 
  riskScoreData, 
  genotypeData,
  conceptualMapNodes,
  conceptualMapEdges
} from '@/components/genetics/SampleData';

const GeneticDataPage = () => {
  const reports = [
    {
      id: "perfil-genetico",
      title: "Perfil Genético Pessoal",
      icon: <FileText className="mr-2 h-5 w-5 text-purple-500" />,
      content: "Resumo dos principais genes analisados, variantes identificadas e suas implicações clínicas.",
      graphs: "Mapa cromossômico interativo destacando variantes relevantes; gráficos de barras comparando frequências alélicas.",
      explanations: "Descrições simples sobre o que cada gene faz e como as variantes podem influenciar a saúde.",
      sources: ["SciELO Brasil", "Wikipédia", "Wikipédia"]
    },
    {
      id: "risco-doencas",
      title: "Risco Genético para Doenças Comuns",
      icon: <PieChart className="mr-2 h-5 w-5 text-purple-500" />,
      content: "Avaliação do risco genético para doenças como diabetes tipo 2, hipertensão, doenças cardiovasculares e certos tipos de câncer.",
      graphs: "Gráficos de pizza ou barras mostrando o risco individual comparado à média populacional.",
      explanations: "Informações sobre como os fatores genéticos contribuem para o risco e sugestões de medidas preventivas."
    },
    {
      id: "farmacogenetica",
      title: "Farmacogenética",
      icon: <Table className="mr-2 h-5 w-5 text-purple-500" />,
      content: "Informações sobre como o paciente pode responder a determinados medicamentos com base em seu perfil genético.",
      graphs: "Tabelas coloridas indicando eficácia, risco de efeitos colaterais e dosagens recomendadas para diferentes medicamentos.",
      explanations: "Orientações sobre a importância de discutir essas informações com profissionais de saúde antes de iniciar ou alterar tratamentos."
    },
    {
      id: "ancestralidade",
      title: "Ancestralidade Genética",
      icon: <Users className="mr-2 h-5 w-5 text-purple-500" />,
      content: "Distribuição percentual das origens ancestrais do paciente.",
      graphs: "Mapas geográficos interativos e gráficos de barras mostrando a composição ancestral.",
      explanations: "Contextualização sobre como a ancestralidade pode influenciar características genéticas e predisposições."
    },
    {
      id: "portador-condicoes",
      title: "Portador de Condições Genéticas",
      icon: <Network className="mr-2 h-5 w-5 text-purple-500" />,
      content: "Identificação de variantes genéticas que o paciente pode transmitir a seus descendentes, mesmo que não apresentem sintomas.",
      graphs: "Diagramas de heredogramas simples mostrando possíveis padrões de herança.",
      explanations: "Informações sobre o que significa ser portador e implicações para planejamento familiar."
    },
    {
      id: "vus",
      title: "Relatório de Variantes de Significado Incerto (VUS)",
      icon: <HelpCircle className="mr-2 h-5 w-5 text-purple-500" />,
      content: "Listagem de variantes genéticas cujo impacto na saúde ainda não é totalmente compreendido.",
      graphs: "Listas categorizadas com indicadores de nível de evidência científica.",
      explanations: "Esclarecimentos sobre a natureza dessas variantes e a importância de monitoramento contínuo da pesquisa científica.",
      sources: ["Wikipédia"]
    }
  ];

  const additionalVisualizations = [
    { 
      title: "Gráficos de Manhattan", 
      description: "Utilizados para mostrar associações entre variantes genéticas e doenças específicas, destacando as mais significativas.", 
      icon: <BarChart2 className="mr-2 h-4 w-4 text-blue-500" />,
      component: <ManhattanPlot 
                   title="Associação de Variantes Genéticas com Doenças" 
                   data={manhattanPlotData} 
                 />,
      explanation: "Esses gráficos mostram claramente associações entre variantes genéticas específicas e doenças. Os pontos acima da linha vermelha representam associações estatisticamente significativas, ajudando a identificar genes importantes relacionados a doenças específicas."
    },
    { 
      title: "Infográficos Educativos", 
      description: "Representações visuais que explicam conceitos genéticos complexos de maneira simplificada.",
      icon: <Sigma className="mr-2 h-4 w-4 text-blue-500" />,
      groupedComponents: [ // Renomeado de 'components' para 'groupedComponents' e adicionado 'explanation'
        {
          component: <GeneticInfographic 
            key="genotype-phenotype"
            title="Diferença entre Genótipo e Fenótipo" 
            description="O genótipo é o conjunto de genes de um organismo, enquanto o fenótipo são as características observáveis resultantes da expressão desses genes e da influência do ambiente."
            data={genotypeData}
            type="genotype"
          />,
          explanation: "Infográficos educativos explicam conceitos genéticos complexos como a diferença entre genótipo (seus genes específicos) e fenótipo (as características visíveis ou observáveis resultantes da expressão genética e interação com o ambiente)."
        },
        {
          component: <GeneticInfographic
            key="allele-frequency"
            title="Frequência Alélica na População"
            description="Distribuição dos diferentes alelos (variantes) de um gene na população geral."
            data={alleleFrequencyData}
            type="allele"
          />,
          explanation: "Este gráfico mostra claramente a prevalência de variantes genéticas específicas (alelos) na população geral, comparando sua frequência relativa para ajudar na compreensão do quanto uma variante é comum ou rara."
        },
        {
          component: <GeneticInfographic
            key="risk-score"
            title="Escores de Risco Genético"
            description="Impacto de variantes genéticas específicas no risco relativo para uma condição."
            data={riskScoreData}
            type="risk"
          />,
          explanation: "Este gráfico compara o risco relativo de doenças específicas entre indivíduos com diferentes variantes genéticas. Os dados são apresentados de maneira simples e intuitiva, destacando claramente como diferentes combinações genéticas influenciam seu risco individual em comparação à população geral."
        }
      ]
    },
    { 
      title: "Mapas Conceituais", 
      description: "Diagramas que organizam e relacionam informações genéticas, facilitando a compreensão de como diferentes genes interagem.", 
      sources: ["Wikipédia"], 
      icon: <Network className="mr-2 h-4 w-4 text-blue-500" />,
      component: <ConceptualMap
                   title="Interações de Genes Relacionados ao Câncer de Mama"
                   description="Este mapa mostra como os genes BRCA1, BRCA2 e TP53 interagem com vários processos celulares e estão associados ao desenvolvimento de câncer."
                   nodes={conceptualMapNodes}
                   edges={conceptualMapEdges}
                 />,
      explanation: "Diagramas simples mostram como genes específicos, como BRCA1, BRCA2 e TP53, interagem em processos celulares relacionados ao câncer. Esses mapas facilitam o entendimento da complexidade genética do desenvolvimento de doenças como o câncer de mama e ovário, detalhando como mutações específicas aumentam o risco dessas condições."
    }
  ];

  // A constante 'understandingVisualizations' e sua seção de renderização foram removidas,
  // pois o conteúdo agora está integrado em 'additionalVisualizations'.

  return (
    <MainLayout>
      <div className="space-y-8 p-4 md:p-6">
        <GeneticPageHeader />
        <RecommendedReportsSection reports={reports} />
        <AdditionalVisualizationsSection visualizations={additionalVisualizations} />
      </div>
    </MainLayout>
  );
};

export default GeneticDataPage;
