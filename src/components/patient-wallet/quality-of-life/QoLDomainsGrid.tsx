
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import QoLDomainCard from './QoLDomainCard'; // Assuming QoLDomainCard is in the same directory

interface DomainDataItem {
  name: string;
  score: string;
  objective: string;
  trendIcon: React.ReactNode;
  tooltip: string;
}

interface QoLDomainsGridProps {
  domainData: DomainDataItem[];
}

const QoLDomainsGrid: React.FC<QoLDomainsGridProps> = ({ domainData }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Detalhamento por Domínios Principais</CardTitle>
        <CardDescription>Avaliação dos 5 domínios chave da qualidade de vida.</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {domainData.map(domain => (
          <QoLDomainCard key={domain.name} domain={domain} />
        ))}
      </CardContent>
    </Card>
  );
};

export default QoLDomainsGrid;
