
import { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Medication {
  id: string;
  name: string;
  dates: Date[];
  color: string;
}

const MedicationCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // Example medications data
  const medications: Medication[] = [
    { 
      id: "1", 
      name: "Losartana 50mg", 
      dates: [new Date(), new Date(Date.now() + 86400000), new Date(Date.now() + 86400000 * 2)],
      color: "bg-blue-500"
    },
    { 
      id: "2", 
      name: "Paracetamol 750mg", 
      dates: [new Date(), new Date(Date.now() + 86400000 * 3)],
      color: "bg-red-500"
    },
    { 
      id: "3", 
      name: "Vitamina D", 
      dates: [new Date(Date.now() + 86400000), new Date(Date.now() + 86400000 * 7)],
      color: "bg-yellow-500"
    },
  ];
  
  // Function to check if a date has medications
  const hasMedication = (date: Date) => {
    return medications.some(med => 
      med.dates.some(medDate => 
        medDate.getDate() === date.getDate() && 
        medDate.getMonth() === date.getMonth() && 
        medDate.getFullYear() === date.getFullYear()
      )
    );
  };
  
  // Function to render day content with medication indicators
  const renderDayContent = (date: Date) => {
    if (!hasMedication(date)) return null;
    
    return (
      <div className="flex flex-wrap gap-0.5 absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-0.5">
        {medications.filter(med => 
          med.dates.some(medDate => 
            medDate.getDate() === date.getDate() && 
            medDate.getMonth() === date.getMonth() && 
            medDate.getFullYear() === date.getFullYear()
          )
        ).map((med, idx) => (
          <div 
            key={idx} 
            className={`w-1.5 h-1.5 rounded-full ${med.color}`} 
            title={med.name}
          />
        ))}
      </div>
    );
  };
  
  // Get medications for selected date
  const selectedDateMedications = date ? medications.filter(med => 
    med.dates.some(medDate => 
      medDate.getDate() === date.getDate() && 
      medDate.getMonth() === date.getMonth() && 
      medDate.getFullYear() === date.getFullYear()
    )
  ) : [];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-4">
        <Card className="p-4">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            locale={ptBR}
            className="rounded-md border"
            components={{
              DayContent: ({ date }) => (
                <div className="relative w-full h-full">
                  <div>{date.getDate()}</div>
                  {renderDayContent(date)}
                </div>
              )
            }}
          />
        </Card>
        
        <Card className="p-4">
          <h3 className="font-medium mb-2">
            {date ? format(date, "d 'de' MMMM", {locale: ptBR}) : "Selecione uma data"}
          </h3>
          
          {selectedDateMedications.length > 0 ? (
            <div className="space-y-3">
              {selectedDateMedications.map((med) => (
                <div key={med.id} className="flex items-center p-2 rounded-md bg-muted">
                  <div className={`w-3 h-3 rounded-full ${med.color} mr-3`} />
                  <div className="flex-1">
                    <div className="font-medium text-sm">{med.name}</div>
                    <div className="text-xs text-muted-foreground">Horários programados</div>
                  </div>
                  <Badge variant="outline" className="ml-auto">
                    Ver detalhes
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">
              Nenhum medicamento programado para esta data.
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default MedicationCalendar;
