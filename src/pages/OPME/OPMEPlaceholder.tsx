/**
 * Página Placeholder para funcionalidades OPME em desenvolvimento
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Construction, CheckCircle2 } from 'lucide-react';

interface OPMEPlaceholderProps {
  title: string;
  description: string;
  features?: string[];
}

const OPMEPlaceholder = ({ title, description, features = [] }: OPMEPlaceholderProps) => {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>

      {/* Status */}
      <Card className="border-yellow-600">
        <CardHeader className="bg-yellow-50 dark:bg-yellow-950">
          <CardTitle className="flex items-center gap-2">
            <Construction className="h-5 w-5 text-yellow-600" />
            Funcionalidade em Desenvolvimento
          </CardTitle>
          <CardDescription>
            Esta página está sendo desenvolvida e estará disponível em breve
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Funcionalidades Planejadas:</h3>
              {features.length > 0 ? (
                <ul className="space-y-2">
                  {features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Funcionalidades específicas serão definidas em breve
                </p>
              )}
            </div>

            <div className="pt-4 border-t">
              <Badge className="bg-blue-600">Em Desenvolvimento</Badge>
              <p className="text-sm text-muted-foreground mt-2">
                Previsão de conclusão: Próximas semanas
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Informações Adicionais */}
      <Card>
        <CardHeader>
          <CardTitle>Sobre o Módulo OPME</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            O módulo de Gestão de OPME (Órteses, Próteses e Materiais Especiais) está sendo desenvolvido
            para atender às normas RN 259/2011, RN 424/2017, RN 465/2021 e RDC 751/2022, com foco em:
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Redução de glosas através de validações automáticas</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Compliance com padrão TISS e TUSS</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Integração com principais convênios</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Rastreabilidade UDI e registro Anvisa</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Monitoramento de SLA RN 259</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default OPMEPlaceholder;
