
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface FrontendDetailsCardProps {
  description: string;
}

const FrontendDetailsCard = ({ description }: FrontendDetailsCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Arquitetura Frontend</CardTitle>
        <CardDescription>
          Visão geral da stack tecnológica e padrões utilizados no desenvolvimento do frontend.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="whitespace-pre-line">{description}</p>
      </CardContent>
    </Card>
  );
};

export default FrontendDetailsCard;
