import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  AlertTriangle, 
  AlertCircle, 
  Zap, 
  Skull,
  Info,
  CheckCircle
} from 'lucide-react';

interface RiskLevel {
  level: string;
  color: string;
  icon: React.ReactNode;
  description: string;
  casesRange: string;
  actions: string[];
  examples: string[];
}

const riskLevels: RiskLevel[] = [
  {
    level: 'BAIXO',
    color: 'text-green-600 border-green-200 bg-green-50',
    icon: <CheckCircle className="h-5 w-5 text-green-600" />,
    description: 'Situação controlada com monitoramento de rotina',
    casesRange: '0-10 casos por 1.000 habitantes',
    actions: [
      'Vigilância epidemiológica de rotina',
      'Manutenção das medidas preventivas',
      'Campanhas educativas regulares'
    ],
    examples: [
      'Vila São Paulo: 5 casos (0.8/1000)',
      'Residencial Campos Elíseos: 7 casos (1.2/1000)'
    ]
  },
  {
    level: 'MODERADO',
    color: 'text-yellow-600 border-yellow-200 bg-yellow-50',
    icon: <Info className="h-5 w-5 text-yellow-600" />,
    description: 'Aumento discreto que requer atenção especial',
    casesRange: '11-30 casos por 1.000 habitantes',
    actions: [
      'Intensificação da vigilância',
      'Investigação epidemiológica',
      'Reforço das medidas preventivas'
    ],
    examples: [
      'Cidade Nova: 12 casos (0.9/1000)',
      'Parque Industrial: 22 casos (2.4/1000)'
    ]
  },
  {
    level: 'ALTO',
    color: 'text-orange-600 border-orange-200 bg-orange-50',
    icon: <AlertCircle className="h-5 w-5 text-orange-600" />,
    description: 'Situação preocupante que demanda intervenção',
    casesRange: '31-60 casos por 1.000 habitantes',
    actions: [
      'Busca ativa de casos',
      'Bloqueio epidemiológico',
      'Medidas de controle específicas',
      'Comunicação de risco à população'
    ],
    examples: [
      'Centro: 45 casos (5.3/1000)',
      'Bom Sucesso: 35 casos (4.9/1000)'
    ]
  },
  {
    level: 'CRÍTICO',
    color: 'text-red-600 border-red-200 bg-red-50',
    icon: <AlertTriangle className="h-5 w-5 text-red-600" />,
    description: 'Transmissão acelerada com risco de expansão',
    casesRange: '61-100 casos por 1.000 habitantes',
    actions: [
      'Sala de situação ativada',
      'Medidas emergenciais de controle',
      'Mobilização de recursos extras',
      'Coordenação com níveis superiores'
    ],
    examples: [
      'Jardim Regina: 78 casos (5.1/1000)',
      'Vila Operária: 82 casos (6.1/1000)'
    ]
  },
  {
    level: 'EMERGÊNCIA',
    color: 'text-purple-600 border-purple-200 bg-purple-50',
    icon: <Skull className="h-5 w-5 text-purple-600" />,
    description: 'Surto estabelecido - Máxima prioridade',
    casesRange: 'Mais de 100 casos por 1.000 habitantes',
    actions: [
      'Declaração de emergência em saúde pública',
      'Mobilização máxima de recursos',
      'Medidas excepcionais de controle',
      'Apoio estadual/federal',
      'Comunicação em massa'
    ],
    examples: [
      'Bosque da Princesa: 125 casos (12.8/1000)'
    ]
  }
];

export const RiskLevelIndicator: React.FC = () => {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Classificação de Risco
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {riskLevels.map((risk) => (
          <Alert key={risk.level} className={risk.color}>
            <div className="flex items-start gap-3">
              {risk.icon}
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm">{risk.level}</h4>
                  <Badge variant="outline" className={risk.color.replace('bg-', 'border-').replace('text-', 'text-')}>
                    {risk.casesRange}
                  </Badge>
                </div>
                
                <p className="text-xs leading-relaxed">
                  {risk.description}
                </p>
                
                <div className="space-y-2">
                  <div>
                    <h5 className="text-xs font-semibold mb-1">Ações Necessárias:</h5>
                    <ul className="text-xs space-y-1">
                      {risk.actions.map((action, index) => (
                        <li key={index} className="flex items-start gap-1">
                          <span className="text-muted-foreground">•</span>
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="text-xs font-semibold mb-1">Exemplos em Piracicaba:</h5>
                    <ul className="text-xs space-y-1">
                      {risk.examples.map((example, index) => (
                        <li key={index} className="flex items-start gap-1">
                          <span className="text-muted-foreground">→</span>
                          <span className="font-mono">{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Alert>
        ))}
        
        <div className="mt-4 p-3 bg-muted/50 rounded-lg">
          <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Sistema de Alerta Automático
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            O sistema monitora automaticamente os indicadores epidemiológicos e ativa alertas 
            quando os limites são ultrapassados. Notificações são enviadas via SMS, WhatsApp e 
            e-mail para os gestores responsáveis.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
