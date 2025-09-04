
import { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Medication } from '@/components/profile/types';
import { Search, AlertTriangle, AlertCircle, Info } from 'lucide-react';
import AppButton from '@/components/ui/AppButton';

interface MedicationInteractionsProps {
  medications: Medication[];
}

interface Interaction {
  id: string;
  medicationA: string;
  medicationB: string;
  severity: 'Alta' | 'Média' | 'Baixa';
  description: string;
}

const MedicationInteractions = ({ medications }: MedicationInteractionsProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sample interaction data
  const interactions: Interaction[] = [
    {
      id: 'int1',
      medicationA: 'Lisinopril',
      medicationB: 'Metformina',
      severity: 'Baixa',
      description: 'Pode haver uma pequena redução no efeito hipoglicêmico. Monitorar níveis de açúcar no sangue.'
    },
    {
      id: 'int2',
      medicationA: 'Lisinopril',
      medicationB: 'Ibuprofeno',
      severity: 'Média',
      description: 'O uso conjunto pode reduzir o efeito anti-hipertensivo e aumentar o risco de dano renal. Considere alternativas.'
    },
    {
      id: 'int3',
      medicationA: 'Atorvastatina',
      medicationB: 'Metformina',
      severity: 'Baixa',
      description: 'Interação mínima, sem necessidade de ajuste de dose. Monitorar em caso de sintomas incomuns.'
    }
  ];

  const filteredInteractions = searchTerm
    ? interactions.filter(interaction => 
        interaction.medicationA.toLowerCase().includes(searchTerm.toLowerCase()) ||
        interaction.medicationB.toLowerCase().includes(searchTerm.toLowerCase()) ||
        interaction.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : interactions;

  const getSeverityIcon = (severity: 'Alta' | 'Média' | 'Baixa') => {
    switch(severity) {
      case 'Alta':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'Média':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'Baixa':
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const getSeverityClass = (severity: 'Alta' | 'Média' | 'Baixa') => {
    switch(severity) {
      case 'Alta':
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      case 'Média':
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case 'Baixa':
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
    }
  };

  return (
    <Card className="glass-card">
      <CardHeader className="pb-3">
        <div className="flex flex-wrap justify-between items-center gap-2">
          <CardTitle className="text-xl">Interações Medicamentosas</CardTitle>
          <AppButton 
            size="sm" 
            icon={<Search size={16} />} 
            iconPosition="left"
          >
            Verificar Novo Medicamento
          </AppButton>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <p className="text-sm text-muted-foreground mb-4">
            Visualize possíveis interações entre seus medicamentos atuais. Esta informação é apenas educativa e não substitui a orientação do seu médico.
          </p>
          
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar interações..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        {filteredInteractions.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Severidade</TableHead>
                <TableHead>Medicamentos</TableHead>
                <TableHead>Descrição</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInteractions.map((interaction) => (
                <TableRow key={interaction.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getSeverityIcon(interaction.severity)}
                      <span className={`px-2 py-1 rounded text-xs ${getSeverityClass(interaction.severity)}`}>
                        {interaction.severity}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    {interaction.medicationA} + {interaction.medicationB}
                  </TableCell>
                  <TableCell>{interaction.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">
              {searchTerm 
                ? 'Nenhuma interação encontrada para a sua busca.' 
                : 'Não foram detectadas interações entre seus medicamentos atuais.'}
            </p>
            <Button variant="outline">Verificar Novamente</Button>
          </div>
        )}
        
        <div className="mt-6 p-4 bg-primary/5 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <h4 className="text-sm font-medium mb-1">Lembre-se</h4>
              <p className="text-sm text-muted-foreground">
                Esta análise é baseada em informações gerais sobre medicamentos. Sempre consulte seu médico ou farmacêutico para uma avaliação personalizada de interações medicamentosas.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MedicationInteractions;
