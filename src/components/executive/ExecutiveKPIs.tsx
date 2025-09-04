import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Users, FileText, AlertTriangle, DollarSign, Activity, Heart } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface KPIData {
  totalResidences: number;
  totalFamilyMembers: number;
  documentsProcessed: number;
  healthAlerts: number;
  budgetEfficiency: number;
  populationCoverage: number;
  avgHealthScore: number;
  monthlyTrend: number;
}

export const ExecutiveKPIs = () => {
  const [kpiData, setKpiData] = useState<KPIData>({
    totalResidences: 0,
    totalFamilyMembers: 0,
    documentsProcessed: 0,
    healthAlerts: 0,
    budgetEfficiency: 0,
    populationCoverage: 0,
    avgHealthScore: 0,
    monthlyTrend: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchKPIData();
  }, []);

  const fetchKPIData = async () => {
    try {
      setLoading(true);
      
      // Call municipal analytics edge function
      const { data, error } = await supabase.functions.invoke('municipal-analytics', {
        body: { 
          type: 'executive-kpis',
          municipality: 'default' 
        }
      });

      if (error) {
        console.error('Error fetching KPI data:', error);
        // Fallback to mock data for demo
        setKpiData({
          totalResidences: 12847,
          totalFamilyMembers: 48392,
          documentsProcessed: 23567,
          healthAlerts: 34,
          budgetEfficiency: 87.5,
          populationCoverage: 68.3,
          avgHealthScore: 78.9,
          monthlyTrend: 12.3
        });
      } else {
        setKpiData(data.kpis);
      }
    } catch (error) {
      console.error('Error in fetchKPIData:', error);
      // Fallback data
      setKpiData({
        totalResidences: 12847,
        totalFamilyMembers: 48392,
        documentsProcessed: 23567,
        healthAlerts: 34,
        budgetEfficiency: 87.5,
        populationCoverage: 68.3,
        avgHealthScore: 78.9,
        monthlyTrend: 12.3
      });
    } finally {
      setLoading(false);
    }
  };

  const kpiCards = [
    {
      title: "Residências Monitoradas",
      value: kpiData.totalResidences.toLocaleString(),
      icon: Users,
      trend: kpiData.monthlyTrend,
      color: "text-blue-500",
      progress: kpiData.populationCoverage
    },
    {
      title: "Membros Familiares",
      value: kpiData.totalFamilyMembers.toLocaleString(),
      icon: Activity,
      trend: 8.7,
      color: "text-green-500",
      progress: 75
    },
    {
      title: "Documentos Processados",
      value: kpiData.documentsProcessed.toLocaleString(),
      icon: FileText,
      trend: 15.2,
      color: "text-purple-500",
      progress: 89
    },
    {
      title: "Alertas de Saúde",
      value: kpiData.healthAlerts.toString(),
      icon: AlertTriangle,
      trend: -5.4,
      color: "text-red-500",
      progress: 100
    },
    {
      title: "Eficiência Orçamentária",
      value: `${kpiData.budgetEfficiency}%`,
      icon: DollarSign,
      trend: 3.2,
      color: "text-emerald-500",
      progress: kpiData.budgetEfficiency
    },
    {
      title: "Score Médio de Saúde",
      value: `${kpiData.avgHealthScore}/100`,
      icon: Heart,
      trend: 2.8,
      color: "text-pink-500",
      progress: kpiData.avgHealthScore
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {kpiCards.map((kpi, index) => (
        <Card key={index} className="border-border bg-card hover:bg-card/80 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {kpi.title}
            </CardTitle>
            <kpi.icon className={`h-5 w-5 ${kpi.color}`} />
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-2xl font-bold text-foreground">
                {loading ? "..." : kpi.value}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  {kpi.trend > 0 ? (
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500" />
                  )}
                  <span className={`text-xs ${kpi.trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {Math.abs(kpi.trend)}%
                  </span>
                </div>
                <Badge variant="secondary" className="text-xs">
                  Mês anterior
                </Badge>
              </div>
              
              <div className="space-y-1">
                <Progress value={kpi.progress} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  {kpi.progress}% da meta
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};