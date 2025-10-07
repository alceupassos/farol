
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone } from 'lucide-react';

const EmergencyContacts = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Contatos de Emergência</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <ContactItem
          name="Ricardo Souza"
          relationship="Irmão"
          phone="(11) 98765-4321"
        />
        
        <ContactItem
          name="Márcia Oliveira"
          relationship="Mãe"
          phone="(11) 97654-3210"
        />
        
        <ContactItem
          name="Dr. Paulo Mendes"
          relationship="Médico"
          phone="(11) 3456-7890"
        />
        
        <Button variant="outline" size="sm" className="w-full">
          Gerenciar Contatos
        </Button>
      </CardContent>
    </Card>
  );
};

interface ContactItemProps {
  name: string;
  relationship: string;
  phone: string;
}

const ContactItem = ({ name, relationship, phone }: ContactItemProps) => {
  return (
    <div className="flex items-center justify-between p-2 border-b">
      <div className="flex items-center gap-3">
        <Phone className="h-4 w-4 text-primary" />
        <div>
          <div className="font-medium text-sm">{name}</div>
          <div className="text-xs text-muted-foreground">{relationship}</div>
        </div>
      </div>
      <div className="text-sm font-mono">{phone}</div>
    </div>
  );
};

export default EmergencyContacts;
