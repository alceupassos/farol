
import React from 'react';
import { Dna } from 'lucide-react';

const GeneticPageHeader: React.FC = () => (
  <header className="flex items-center space-x-3">
    <Dna className="h-8 w-8 text-purple-600" />
    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Dados Genéticos</h1>
  </header>
);

export default GeneticPageHeader;
