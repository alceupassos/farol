
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface BackendDetailsCardProps {
  description: string;
}

const BackendDetailsCard = ({ description }: BackendDetailsCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Arquitetura Backend</CardTitle>
        <CardDescription>
          Descrição detalhada da infraestrutura e componentes do backend.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] w-full rounded-md border p-4">
          <pre className="text-sm whitespace-pre-wrap break-words">
            {description}
          </pre>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default BackendDetailsCard;
