import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Progress } from "@/components/ui/progress";
import { 
  ChevronDown, 
  ChevronUp, 
  Activity, 
  AlertTriangle, 
  TrendingUp,
  TrendingDown,
  Utensils,
  Heart,
  Info
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, ReferenceLine, Tooltip, Cell, PieChart, Pie } from 'recharts';

interface ParameterAnalysis {
  name: string;
  value: string;
  unit: string;
  referenceRange: string;
  status: 'normal' | 'warning' | 'critical';
  explanation: string;
  function: string;
  lowRiskConsequences: string;
  highRiskConsequences: string;
  nutritionalRecommendations: string[];
  lifestyle: string[];
}

interface EnhancedParameterCardProps {
  parameter: ParameterAnalysis;
  chartType?: 'bar' | 'gauge' | 'pie';
}

const EnhancedParameterCard: React.FC<EnhancedParameterCardProps> = ({ 
  parameter, 
  chartType = 'bar' 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'hsl(var(--chart-2))';
      case 'warning': return 'hsl(var(--chart-3))';
      case 'critical': return 'hsl(var(--chart-1))';
      default: return 'hsl(var(--muted))';
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'normal': return 'default';
      case 'warning': return 'secondary';
      case 'critical': return 'destructive';
      default: return 'outline';
    }
  };

  const parseReferenceRange = (range: string) => {
    const match = range.match(/(\d+\.?\d*)\s*-\s*(\d+\.?\d*)/);
    if (match) {
      return { min: parseFloat(match[1]), max: parseFloat(match[2]) };
    }
    return { min: 0, max: 100 };
  };

  const parseValue = (value: string) => {
    const numericValue = parseFloat(value.replace(/[^\d.-]/g, ''));
    return isNaN(numericValue) ? 0 : numericValue;
  };

  const { min, max } = parseReferenceRange(parameter.referenceRange);
  const currentValue = parseValue(parameter.value);

  const renderVisualization = () => {
    const data = [
      { name: 'Mínimo', value: min, color: 'hsl(var(--muted))' },
      { name: 'Atual', value: currentValue, color: getStatusColor(parameter.status) },
      { name: 'Máximo', value: max, color: 'hsl(var(--muted))' }
    ];

    if (chartType === 'gauge') {
      const percentage = ((currentValue - min) / (max - min)) * 100;
      return (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>{min}{parameter.unit}</span>
            <span className="font-semibold">{parameter.value}</span>
            <span>{max}{parameter.unit}</span>
          </div>
          <Progress value={Math.max(0, Math.min(100, percentage))} className="h-3" />
        </div>
      );
    }

    if (chartType === 'pie') {
      const pieData = [
        { name: 'Valor Atual', value: currentValue, fill: getStatusColor(parameter.status) },
        { name: 'Referência', value: max - currentValue, fill: 'hsl(var(--muted))' }
      ];

      return (
        <ResponsiveContainer width="100%" height={120}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={25}
              outerRadius={50}
              paddingAngle={5}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      );
    }

    return (
      <ResponsiveContainer width="100%" height={120}>
        <BarChart data={data}>
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <ReferenceLine y={min} stroke="hsl(var(--muted-foreground))" strokeDasharray="3 3" />
          <ReferenceLine y={max} stroke="hsl(var(--muted-foreground))" strokeDasharray="3 3" />
          <Bar dataKey="value" radius={4}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg font-semibold">{parameter.name}</CardTitle>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-primary">{parameter.value}</span>
              <Badge variant={getStatusBadgeVariant(parameter.status)}>
                {parameter.status}
              </Badge>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Referência</p>
            <p className="font-medium">{parameter.referenceRange}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {renderVisualization()}

        <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full">
              <Info className="w-4 h-4 mr-2" />
              Detalhes e Recomendações
              {isExpanded ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
            </Button>
          </CollapsibleTrigger>

          <CollapsibleContent className="mt-4">
            <Tabs defaultValue="function" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="function">
                  <Activity className="w-4 h-4 mr-1" />
                  Função
                </TabsTrigger>
                <TabsTrigger value="risks">
                  <AlertTriangle className="w-4 h-4 mr-1" />
                  Riscos
                </TabsTrigger>
                <TabsTrigger value="nutrition">
                  <Utensils className="w-4 h-4 mr-1" />
                  Nutrição
                </TabsTrigger>
                <TabsTrigger value="lifestyle">
                  <Heart className="w-4 h-4 mr-1" />
                  Estilo de Vida
                </TabsTrigger>
              </TabsList>

              <TabsContent value="function" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">O que é e para que serve</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{parameter.explanation}</p>
                    <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm font-medium">Função no organismo:</p>
                      <p className="text-sm text-muted-foreground mt-1">{parameter.function}</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="risks" className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base flex items-center">
                        <TrendingDown className="w-4 h-4 mr-2 text-chart-4" />
                        Valores Baixos
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{parameter.lowRiskConsequences}</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base flex items-center">
                        <TrendingUp className="w-4 h-4 mr-2 text-chart-1" />
                        Valores Altos
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{parameter.highRiskConsequences}</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="nutrition" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Recomendações Nutricionais</CardTitle>
                    <CardDescription>Alimentos e nutrientes que podem ajudar</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {parameter.nutritionalRecommendations.map((rec, index) => (
                        <li key={index} className="flex items-start">
                          <Utensils className="w-4 h-4 mr-2 mt-0.5 text-chart-2" />
                          <span className="text-sm text-muted-foreground">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="lifestyle" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Cuidados e Estilo de Vida</CardTitle>
                    <CardDescription>Hábitos para manter valores saudáveis</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {parameter.lifestyle.map((rec, index) => (
                        <li key={index} className="flex items-start">
                          <Heart className="w-4 h-4 mr-2 mt-0.5 text-chart-3" />
                          <span className="text-sm text-muted-foreground">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
};

export default EnhancedParameterCard;