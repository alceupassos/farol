import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const neighborhoodData = [
  { bairro: 'Centro', eqVas: 85, status: 'Excelente', populacao: 12500 },
  { bairro: 'Vila Nova', eqVas: 72, status: 'Bom', populacao: 8900 },
  { bairro: 'Jardim Brasil', eqVas: 68, status: 'Regular', populacao: 15200 },
  { bairro: 'São José', eqVas: 58, status: 'Atenção', populacao: 7300 },
  { bairro: 'Industrial', eqVas: 45, status: 'Crítico', populacao: 9800 },
  { bairro: 'Residencial', eqVas: 78, status: 'Bom', populacao: 11400 },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Excelente': return 'bg-green-500';
    case 'Bom': return 'bg-blue-500';
    case 'Regular': return 'bg-yellow-500';
    case 'Atenção': return 'bg-orange-500';
    case 'Crítico': return 'bg-red-500';
    default: return 'bg-gray-500';
  }
};

const getStatusVariant = (status: string) => {
  switch (status) {
    case 'Excelente': return 'default';
    case 'Bom': return 'secondary';
    case 'Regular': return 'outline';
    case 'Atenção': return 'destructive';
    case 'Crítico': return 'destructive';
    default: return 'outline';
  }
};

const QualityOfLifeHeatmap = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Mapa de Qualidade de Vida</CardTitle>
        <CardDescription>Índice EQ-5D VAS por bairro em tempo real</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {neighborhoodData.map((item, index) => (
            <div 
              key={index}
              className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">{item.bairro}</h4>
                <Badge variant={getStatusVariant(item.status)}>
                  {item.status}
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>EQ-5D VAS:</span>
                  <span className="font-semibold">{item.eqVas}/100</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${getStatusColor(item.status)}`}
                    style={{ width: `${item.eqVas}%` }}
                  />
                </div>
                <div className="text-xs text-muted-foreground">
                  População: {item.populacao.toLocaleString()} hab.
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QualityOfLifeHeatmap;