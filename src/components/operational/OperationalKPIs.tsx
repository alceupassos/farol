import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Users, FileCheck, AlertCircle, Clock, Zap, Shield } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface OperationalKPIData {
  activeAlerts: number;
  documentsToday: number;
  teamEfficiency: number;
  responseTime: number;
  systemUptime: number;
  pendingReviews: number;
  completedTasks: number;
  resourceUtilization: number;
}

export const OperationalKPIs = () => {
  const [kpiData, setKpiData] = useState<OperationalKPIData>({
    activeAlerts: 0,
    documentsToday: 0,
    teamEfficiency: 0,
    responseTime: 0,
    systemUptime: 0,
    pendingReviews: 0,
    completedTasks: 0,
    resourceUtilization: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOperationalKPIs();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchOperationalKPIs, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchOperationalKPIs = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase.functions.invoke('operational-analytics', {
        body: { 
          type: 'operational-kpis',
          timeframe: 'today'
        }
      });

      if (error) {
        console.error('Error fetching operational KPIs:', error);
        // Fallback to mock data
        setKpiData({
          activeAlerts: 12,
          documentsToday: 847,
          teamEfficiency: 89.5,
          responseTime: 4.2,
          systemUptime: 99.8,
          pendingReviews: 23,
          completedTasks: 156,
          resourceUtilization: 78.3
        });
      } else {
        setKpiData(data.kpis);
      }
    } catch (error) {
      console.error('Error in fetchOperationalKPIs:', error);
      // Fallback data
      setKpiData({
        activeAlerts: 12,
        documentsToday: 847,
        teamEfficiency: 89.5,
        responseTime: 4.2,
        systemUptime: 99.8,
        pendingReviews: 23,
        completedTasks: 156,
        resourceUtilization: 78.3
      });
    } finally {
      setLoading(false);
    }
  };

  const kpiCards = [
    {
      title: "Alertas Ativos",
      value: kpiData.activeAlerts.toString(),
      icon: AlertCircle,
      trend: -15.2,
      color: "text-red-500",
      progress: Math.min((kpiData.activeAlerts / 50) * 100, 100),
      status: kpiData.activeAlerts > 20 ? "crítico" : kpiData.activeAlerts > 10 ? "atenção" : "normal"
    },
    {
      title: "Documentos Hoje",
      value: kpiData.documentsToday.toLocaleString(),
      icon: FileCheck,
      trend: 12.8,
      color: "text-blue-500",
      progress: (kpiData.documentsToday / 1000) * 100,
      status: "normal"
    },
    {
      title: "Eficiência da Equipe",
      value: `${kpiData.teamEfficiency}%`,
      icon: Users,
      trend: 5.7,
      color: "text-green-500",
      progress: kpiData.teamEfficiency,
      status: "excelente"
    },
    {
      title: "Tempo de Resposta",
      value: `${kpiData.responseTime}min`,
      icon: Clock,
      trend: -8.3,
      color: "text-purple-500",
      progress: Math.max(100 - (kpiData.responseTime * 10), 0),
      status: kpiData.responseTime < 5 ? "excelente" : "normal"
    },
    {
      title: "Uptime do Sistema",
      value: `${kpiData.systemUptime}%`,
      icon: Shield,
      trend: 0.2,
      color: "text-emerald-500",
      progress: kpiData.systemUptime,
      status: "excelente"
    },
    {
      title: "Utilização de Recursos",
      value: `${kpiData.resourceUtilization}%`,
      icon: Zap,
      trend: 3.4,
      color: "text-orange-500",
      progress: kpiData.resourceUtilization,
      status: kpiData.resourceUtilization > 85 ? "alto" : "normal"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'crítico': return 'bg-red-500/20 text-red-500 border-red-500/30';
      case 'atenção': return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30';
      case 'alto': return 'bg-orange-500/20 text-orange-500 border-orange-500/30';
      case 'excelente': return 'bg-green-500/20 text-green-500 border-green-500/30';
      default: return 'bg-blue-500/20 text-blue-500 border-blue-500/30';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {kpiCards.map((kpi, index) => (
        <Card key={index} className="border-border bg-card hover:bg-card/80 transition-colors relative">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {kpi.title}
            </CardTitle>
            <div className="flex items-center gap-2">
              <kpi.icon className={`h-5 w-5 ${kpi.color}`} />
              {loading && (
                <div className="animate-pulse h-2 w-2 bg-primary rounded-full"></div>
              )}
            </div>
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
                <Badge className={getStatusColor(kpi.status)}>
                  {kpi.status}
                </Badge>
              </div>
              
              <div className="space-y-1">
                <Progress value={kpi.progress} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  Status operacional
                </p>
              </div>
            </div>
          </CardContent>
          
          {/* Real-time indicator */}
          <div className="absolute top-2 right-2">
            <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </Card>
      ))}
    </div>
  );
};