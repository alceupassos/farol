import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, TrendingUp, Calendar, FileText } from 'lucide-react';
import HealthRiskScore from './HealthRiskScore';
import { calculateRiskScore, mockPatientData } from '@/utils/riskCalculator';

const PatientRiskList: React.FC = () => {
  const patients = [
    { id: 'joao-silva', name: 'João Silva', age: 58 },
    { id: 'maria-santos', name: 'Maria Santos', age: 45 },
    { id: 'ana-costa', name: 'Ana Costa', age: 72 }
  ];

  const patientRisks = patients.map(patient => ({
    ...patient,
    riskScore: calculateRiskScore(mockPatientData[patient.id])
  }));

  const sortedPatients = patientRisks.sort((a, b) => b.riskScore.total - a.riskScore.total);

  const getRiskPriority = (level: string): number => {
    switch (level) {
      case 'CRÍTICO': return 4;
      case 'ALTO': return 3;
      case 'MODERADO': return 2;
      case 'BAIXO': return 1;
      default: return 0;
    }
  };

  const getActionButton = (level: string, patientId: string) => {
    switch (level) {
      case 'CRÍTICO':
        return (
          <Button variant="destructive" size="sm">
            <AlertTriangle className="w-4 h-4 mr-1" />
            Ação Imediata
          </Button>
        );
      case 'ALTO':
        return (
          <Button variant="default" size="sm">
            <Calendar className="w-4 h-4 mr-1" />
            Agendar Consulta
          </Button>
        );
      case 'MODERADO':
        return (
          <Button variant="outline" size="sm">
            <TrendingUp className="w-4 h-4 mr-1" />
            Monitorar
          </Button>
        );
      default:
        return (
          <Button variant="ghost" size="sm">
            <FileText className="w-4 h-4 mr-1" />
            Rotina
          </Button>
        );
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Pacientes por Risco</span>
          <Badge variant="outline">
            {patientRisks.filter(p => ['ALTO', 'CRÍTICO'].includes(p.riskScore.level)).length} 
            {' '}prioridade alta
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {sortedPatients.map((patient) => (
            <div 
              key={patient.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <HealthRiskScore 
                  riskScore={patient.riskScore}
                  size="sm"
                  showDetails={false}
                />
                
                <div>
                  <h4 className="font-medium">{patient.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {patient.age} anos • Score: {patient.riskScore.total}
                  </p>
                  {patient.riskScore.criticalFactors.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {patient.riskScore.criticalFactors.slice(0, 2).map((factor, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {factor}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {getActionButton(patient.riskScore.level, patient.id)}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-muted/30 rounded-lg">
          <h4 className="font-medium mb-2">Resumo da Carteira</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-red-600">
                {patientRisks.filter(p => p.riskScore.level === 'CRÍTICO').length}
              </div>
              <div className="text-xs text-muted-foreground">Crítico</div>
            </div>
            <div>
              <div className="text-lg font-bold text-orange-600">
                {patientRisks.filter(p => p.riskScore.level === 'ALTO').length}
              </div>
              <div className="text-xs text-muted-foreground">Alto</div>
            </div>
            <div>
              <div className="text-lg font-bold text-yellow-600">
                {patientRisks.filter(p => p.riskScore.level === 'MODERADO').length}
              </div>
              <div className="text-xs text-muted-foreground">Moderado</div>
            </div>
            <div>
              <div className="text-lg font-bold text-green-600">
                {patientRisks.filter(p => p.riskScore.level === 'BAIXO').length}
              </div>
              <div className="text-xs text-muted-foreground">Baixo</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientRiskList;