
import { Activity, TrendingDown, AlertTriangle, Zap, Calendar, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const ExamInsights = () => {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-sm font-medium mb-3">Resumo da Saúde</h3>
        
        <div className="space-y-3">
          <div className="rounded-lg p-3 bg-muted/30 border flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600">
              <CheckCircle className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-medium">Status geral</div>
              <div className="text-xs text-muted-foreground">Maioria dos exames normais</div>
            </div>
          </div>
          
          <div className="rounded-lg p-3 bg-muted/30 border flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-medium">Atenção</div>
              <div className="text-xs text-muted-foreground">Sinais de anemia leve</div>
            </div>
          </div>
          
          <div className="rounded-lg p-3 bg-muted/30 border flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
              <TrendingDown className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-medium">Tendência</div>
              <div className="text-xs text-muted-foreground">Hemoglobina em declínio</div>
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-3">Acompanhamento</h3>
        
        <div className="rounded-lg p-3 bg-muted/30 border">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium">Próximo exame recomendado</div>
            <div className="text-xs text-muted-foreground flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              Em 3 meses
            </div>
          </div>
          <p className="text-xs text-muted-foreground mb-3">
            Baseado nos valores de hemoglobina e hematócrito, recomenda-se repetir o hemograma em 3 meses.
          </p>
          <Button size="sm" variant="outline" className="w-full gap-1">
            Agendar lembrete <Zap className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-3">Completude do Perfil</h3>
        
        <div className="rounded-lg p-3 bg-muted/30 border">
          <div className="flex justify-between items-center mb-2">
            <div className="text-sm font-medium">Exames essenciais</div>
            <div className="text-xs font-medium">60%</div>
          </div>
          <Progress value={60} className="h-2 mb-3" />
          <p className="text-xs text-muted-foreground mb-3">
            Complete seu perfil adicionando outros exames essenciais para uma visão completa da sua saúde.
          </p>
          <div className="text-xs flex justify-between mb-1">
            <span className="text-muted-foreground">Hemograma</span>
            <span className="text-green-600 flex items-center gap-1">
              <CheckCircle className="h-3 w-3" /> Concluído
            </span>
          </div>
          <div className="text-xs flex justify-between mb-1">
            <span className="text-muted-foreground">Lipidograma</span>
            <span className="text-green-600 flex items-center gap-1">
              <CheckCircle className="h-3 w-3" /> Concluído
            </span>
          </div>
          <div className="text-xs flex justify-between">
            <span className="text-muted-foreground">Glicemia de jejum</span>
            <span className="text-amber-600">Pendente</span>
          </div>
          
          <div className="mt-3 pt-3 border-t border-border">
            <Button size="sm" variant="link" className="w-full h-auto p-0 text-xs text-primary justify-start gap-1">
              Ver todos os exames recomendados <ArrowRight className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamInsights;
