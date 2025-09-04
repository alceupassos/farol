
import { Link } from 'react-router-dom';
import HealthMetric from "@/components/ui/HealthMetric";
import { Activity, Heart, TrendingDown, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MetricsSummaryProps {
  // Empty for now, could add props for dynamic data later
}

const MetricsSummary = ({}: MetricsSummaryProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <HealthMetric 
          title="Pressão Arterial"
          value="120/80" 
          unit="mmHg"
          status="normal"
          change={{ value: "-5", direction: "down" }}
          icon={<Heart className="h-4 w-4" />}
        />
        
        <HealthMetric 
          title="Glicemia"
          value="105" 
          unit="mg/dL"
          status="warning"
          change={{ value: "+8", direction: "up" }}
          icon={<Activity className="h-4 w-4" />}
        />
        
        <HealthMetric 
          title="Frequência Cardíaca"
          value="72" 
          unit="bpm"
          status="normal"
          change={{ value: "-3", direction: "down" }}
          icon={<TrendingDown className="h-4 w-4" />}
        />
      </div>
      
      <div className="flex justify-between items-center mt-4">
        <div className="text-xs text-muted-foreground italic">
          * Dados fictícios não reais usado para exemplo de software
        </div>
        
        <Link to="/labexams">
          <Button variant="outline" size="sm" className="gap-2">
            <FileText className="h-4 w-4" />
            Exames laboratoriais
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default MetricsSummary;
