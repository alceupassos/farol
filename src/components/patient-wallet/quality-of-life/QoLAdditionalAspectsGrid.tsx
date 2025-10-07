
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import QoLAdditionalAspectCard from './QoLAdditionalAspectCard';

interface AdditionalAspectItem {
  name: string;
  score: string;
  trend: 'up' | 'down' | 'stable';
  tooltip: string;
}

interface QoLAdditionalAspectsGridProps {
  additionalAspectsData: AdditionalAspectItem[];
  renderSmallTrendIcon: (trend: 'up' | 'down' | 'stable') => React.ReactNode;
}

const QoLAdditionalAspectsGrid: React.FC<QoLAdditionalAspectsGridProps> = ({ additionalAspectsData, renderSmallTrendIcon }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Aspectos Adicionais de Qualidade de Vida</CardTitle>
        <CardDescription>Outras dimensões importantes para o seu bem-estar.</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {additionalAspectsData.map(aspect => (
          <QoLAdditionalAspectCard key={aspect.name} aspect={aspect} renderSmallTrendIcon={renderSmallTrendIcon} />
        ))}
      </CardContent>
    </Card>
  );
};

export default QoLAdditionalAspectsGrid;
