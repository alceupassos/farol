
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Info, ExternalLink } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface BloodExamInfoCard {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
}

const bloodExamCards: BloodExamInfoCard[] = [
  {
    id: "hemacias",
    title: "Hemácias (Eritrócitos)",
    imageUrl: "/lovable-uploads/0d055728-6fc1-479a-876d-cbb4099365ac.png",
    description: "Células vermelhas do sangue responsáveis pelo transporte de oxigênio dos pulmões para os tecidos do corpo. A contagem normal varia entre 4,00 a 5,50 milhões/mm³."
  },
  {
    id: "vcm",
    title: "VCM (Volume Corpuscular Médio)",
    imageUrl: "/lovable-uploads/50067579-7380-49c5-9134-15db818306f6.png",
    description: "Indica o tamanho médio das hemácias. É um dado importante para classificar tipos de anemia. O valor normal varia entre 80 a 100 fL."
  },
  {
    id: "chcm",
    title: "CHCM (Concentração de Hemoglobina Corpuscular Média)",
    imageUrl: "/lovable-uploads/bfbb24a3-44a4-473b-a5f0-5ad421382991.png",
    description: "Mede a concentração de hemoglobina dentro das hemácias. Diferente do HCM, mostra se as células estão bem pigmentadas. Valor normal: 32 a 36 g/dL."
  },
  {
    id: "hcm",
    title: "HCM (Hemoglobina Corpuscular Média)",
    imageUrl: "/lovable-uploads/d8f4b70f-719b-44b5-83ef-24b5d35a8694.png",
    description: "Indica a quantidade média de hemoglobina presente em cada hemácia. Ajuda a classificar o tipo de anemia. Valor normal: 27 a 32 pg."
  },
  {
    id: "hematocrito",
    title: "Hematócrito",
    imageUrl: "/lovable-uploads/ffa8face-b99a-4bf4-b3d5-4f93943a55da.png",
    description: "Representa a porcentagem de glóbulos vermelhos no volume total de sangue. Importante indicador para avaliar anemia ou desidratação. Valor normal: 37% a 47%."
  },
  {
    id: "hemoglobina",
    title: "Hemoglobina",
    imageUrl: "/lovable-uploads/9213d23c-6135-4f2a-b542-e615da0e1fc2.png",
    description: "Proteína presente nas hemácias responsável por transportar oxigênio dos pulmões para todo o corpo. Valor normal: 12,0 a 16,0 g/dL."
  },
  {
    id: "hemograma",
    title: "Hemograma Completo",
    imageUrl: "/lovable-uploads/7195aac8-8d2c-4be8-88ad-119e62df8eae.png",
    description: "Exame que avalia as células sanguíneas (hemácias, leucócitos e plaquetas). Usado para diagnosticar anemia, infecções e outras condições hematológicas."
  }
];

const BloodExamGuide = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');
  
  const handlePrevious = () => {
    setCurrentCardIndex((prev) => 
      prev === 0 ? bloodExamCards.length - 1 : prev - 1
    );
  };
  
  const handleNext = () => {
    setCurrentCardIndex((prev) => 
      prev === bloodExamCards.length - 1 ? 0 : prev + 1
    );
  };
  
  const currentCard = bloodExamCards[currentCardIndex];
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Guia de Exames Sanguíneos</h2>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setViewMode('carousel')}
            className={viewMode === 'carousel' ? 'bg-primary/10' : ''}
          >
            Carrossel
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setViewMode('grid')}
            className={viewMode === 'grid' ? 'bg-primary/10' : ''}
          >
            Grade
          </Button>
        </div>
      </div>
      
      {viewMode === 'carousel' ? (
        <Card className="border-2 border-primary/10 overflow-hidden">
          <CardContent className="p-0">
            <div className="relative">
              <img 
                src={currentCard.imageUrl} 
                alt={currentCard.title} 
                className="w-full h-auto object-contain max-h-[500px]"
              />
              
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4">
                <h3 className="text-lg font-bold">{currentCard.title}</h3>
                <p className="text-sm">{currentCard.description}</p>
              </div>
              
              <div className="absolute left-2 top-1/2 -translate-y-1/2">
                <Button 
                  size="icon" 
                  variant="secondary" 
                  className="rounded-full bg-white/80 text-black hover:bg-white"
                  onClick={handlePrevious}
                >
                  <ChevronLeft />
                </Button>
              </div>
              
              <div className="absolute right-2 top-1/2 -translate-y-1/2">
                <Button 
                  size="icon" 
                  variant="secondary" 
                  className="rounded-full bg-white/80 text-black hover:bg-white"
                  onClick={handleNext}
                >
                  <ChevronRight />
                </Button>
              </div>
            </div>
            
            <div className="p-4 flex justify-center">
              <div className="flex gap-2">
                {bloodExamCards.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full ${index === currentCardIndex ? 'bg-primary' : 'bg-gray-300'}`}
                    onClick={() => setCurrentCardIndex(index)}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bloodExamCards.map((card) => (
            <Card key={card.id} className="overflow-hidden h-full flex flex-col">
              <div className="relative overflow-hidden" style={{ height: '200px' }}>
                <img 
                  src={card.imageUrl} 
                  alt={card.title} 
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <CardContent className="p-4 flex-1 flex flex-col">
                <h3 className="text-lg font-bold mb-2">{card.title}</h3>
                <p className="text-sm text-muted-foreground flex-1">{card.description}</p>
                <Button 
                  variant="ghost" 
                  className="mt-2 justify-start p-0 h-auto text-primary hover:text-primary/80"
                  onClick={() => {
                    setViewMode('carousel');
                    setCurrentCardIndex(bloodExamCards.findIndex(c => c.id === card.id));
                  }}
                >
                  Ver detalhes <ExternalLink className="h-3.5 w-3.5 ml-1" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
      <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mt-4">
        <div className="flex gap-3">
          <Info className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-muted-foreground">
            <p className="font-medium text-amber-800 dark:text-amber-300">Nota educativa</p>
            <p>
              As imagens acima servem como guia educativo para entendimento dos exames de sangue. 
              Os valores de referência podem variar de acordo com o laboratório, idade, sexo e condições de saúde.
              Sempre consulte seu médico para interpretar adequadamente seus resultados.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BloodExamGuide;
