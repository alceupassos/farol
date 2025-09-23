import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { piracicabaNeighborhoods, getRiskColor } from '@/data/piracicabaNeighborhoods';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Users, 
  MapPin, 
  Activity,
  Droplets,
  Building,
  Heart,
  AlertTriangle
} from 'lucide-react';

interface NeighborhoodMetricsProps {
  selectedNeighborhood?: string | null;
}

export const NeighborhoodMetrics: React.FC<NeighborhoodMetricsProps> = ({
  selectedNeighborhood
}) => {
  // Sort neighborhoods by risk level for ranking
  const sortedNeighborhoods = [...piracicabaNeighborhoods].sort((a, b) => {
    const riskValues = { 'BAIXO': 1, 'MODERADO': 2, 'ALTO': 3, 'CRÍTICO': 4, 'EMERGÊNCIA': 5 };
    return riskValues[b.riskLevel] - riskValues[a.riskLevel];
  });

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-red-500" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-green-500" />;
      case 'stable': return <Minus className="h-4 w-4 text-yellow-500" />;
    }
  };

  const selectedData = selectedNeighborhood 
    ? piracicabaNeighborhoods.find(n => n.id === selectedNeighborhood)
    : null;

  return (
    <div className="space-y-6">
      {/* Selected Neighborhood Details */}
      {selectedData && (
        <Card className="glass-card border-primary/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              {selectedData.name} - Análise Detalhada
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <div className="text-2xl font-bold" style={{ color: getRiskColor(selectedData.riskLevel) }}>
                  {selectedData.activeCases}
                </div>
                <div className="text-sm text-muted-foreground">Casos Ativos</div>
              </div>
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <div className="text-2xl font-bold text-foreground">
                  {selectedData.population.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">População</div>
              </div>
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <div className="text-2xl font-bold text-foreground">
                  {selectedData.casesPerThousand}
                </div>
                <div className="text-sm text-muted-foreground">Casos/1000 hab</div>
              </div>
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <div className="text-2xl font-bold text-foreground">
                  {selectedData.density}
                </div>
                <div className="text-sm text-muted-foreground">Densidade hab/km²</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Disease Breakdown */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  Casos por Doença
                </h4>
                <div className="space-y-3">
                  {Object.entries(selectedData.epidemiologicalData).map(([disease, data]) => (
                    <div key={disease} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="capitalize font-medium">{disease}</span>
                        {getTrendIcon(data.trend)}
                      </div>
                      <Badge variant="secondary">{data.cases} casos</Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* Health Infrastructure */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  Infraestrutura de Saúde
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Unidade Básica</span>
                    <Badge variant={selectedData.healthFactors.basicHealthUnit ? 'default' : 'destructive'}>
                      {selectedData.healthFactors.basicHealthUnit ? 'Sim' : 'Não'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Hospital</span>
                    <Badge variant={selectedData.healthFactors.hospital ? 'default' : 'destructive'}>
                      {selectedData.healthFactors.hospital ? 'Sim' : 'Não'}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Acesso à Água</span>
                      <span>{selectedData.healthFactors.waterAccess}%</span>
                    </div>
                    <Progress value={selectedData.healthFactors.waterAccess} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Acesso ao Esgoto</span>
                      <span>{selectedData.healthFactors.sewerAccess}%</span>
                    </div>
                    <Progress value={selectedData.healthFactors.sewerAccess} className="h-2" />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-muted/20 rounded-lg">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Índice de Vulnerabilidade
              </h4>
              <div className="flex items-center gap-4">
                <Progress 
                  value={selectedData.healthFactors.vulnerabilityIndex * 10} 
                  className="flex-1" 
                />
                <span className="font-bold text-lg">
                  {selectedData.healthFactors.vulnerabilityIndex}/10
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Índice baseado em fatores socioeconômicos, demográficos e de infraestrutura
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Ranking of All Neighborhoods */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Ranking por Risco
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {sortedNeighborhoods.slice(0, 10).map((neighborhood, index) => (
                <div 
                  key={neighborhood.id}
                  className={`flex items-center justify-between p-3 rounded-lg border transition-colors cursor-pointer hover:bg-muted/30 ${
                    selectedNeighborhood === neighborhood.id ? 'border-primary bg-primary/10' : 'border-border'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-lg font-bold text-muted-foreground w-6">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium">{neighborhood.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {neighborhood.activeCases} casos ({neighborhood.casesPerThousand}/1000)
                      </div>
                    </div>
                  </div>
                  <Badge 
                    className="text-white"
                    style={{ 
                      backgroundColor: getRiskColor(neighborhood.riskLevel),
                      borderColor: getRiskColor(neighborhood.riskLevel)
                    }}
                  >
                    {neighborhood.riskLevel}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Estatísticas Gerais
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-muted/30 rounded-lg">
                <div className="text-xl font-bold text-foreground">
                  {piracicabaNeighborhoods.reduce((sum, n) => sum + n.activeCases, 0)}
                </div>
                <div className="text-sm text-muted-foreground">Total de Casos</div>
              </div>
              <div className="text-center p-3 bg-muted/30 rounded-lg">
                <div className="text-xl font-bold text-foreground">
                  {piracicabaNeighborhoods.reduce((sum, n) => sum + n.population, 0).toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">População Total</div>
              </div>
              <div className="text-center p-3 bg-muted/30 rounded-lg">
                <div className="text-xl font-bold text-red-600">
                  {piracicabaNeighborhoods.filter(n => n.riskLevel === 'EMERGÊNCIA' || n.riskLevel === 'CRÍTICO').length}
                </div>
                <div className="text-sm text-muted-foreground">Áreas Críticas</div>
              </div>
              <div className="text-center p-3 bg-muted/30 rounded-lg">
                <div className="text-xl font-bold text-green-600">
                  {piracicabaNeighborhoods.filter(n => n.riskLevel === 'BAIXO').length}
                </div>
                <div className="text-sm text-muted-foreground">Áreas Seguras</div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold">Distribuição por Nível de Risco</h4>
              {['EMERGÊNCIA', 'CRÍTICO', 'ALTO', 'MODERADO', 'BAIXO'].map(level => {
                const count = piracicabaNeighborhoods.filter(n => n.riskLevel === level).length;
                const percentage = (count / piracicabaNeighborhoods.length) * 100;
                return (
                  <div key={level} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{level}</span>
                      <span>{count} bairros ({percentage.toFixed(1)}%)</span>
                    </div>
                    <Progress 
                      value={percentage} 
                      className="h-2"
                      style={{ 
                        '--progress-background': getRiskColor(level) 
                      } as React.CSSProperties}
                    />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
