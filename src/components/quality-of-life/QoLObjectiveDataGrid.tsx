
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import QoLObjectiveDataItemCard from './QoLObjectiveDataItemCard';

interface ObjectiveWearableItem {
  name: string;
  value: string;
  graphType: string;
  tooltip: string;
}

interface QoLObjectiveDataGridProps {
  objectiveWearablesData: ObjectiveWearableItem[];
}

const QoLObjectiveDataGrid: React.FC<QoLObjectiveDataGridProps> = ({ objectiveWearablesData }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Monitoramento Objetivo (Dados de Wearables/Apps)</CardTitle>
        <CardDescription>Informações coletadas por seus dispositivos e aplicativos.</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {objectiveWearablesData.map(data => (
          <QoLObjectiveDataItemCard key={data.name} data={data} />
        ))}
      </CardContent>
    </Card>
  );
};

export default QoLObjectiveDataGrid;
