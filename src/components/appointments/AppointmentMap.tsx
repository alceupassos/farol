
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Navigation, Clock, Phone, Building } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Appointment {
  id: string;
  date: string;
  time: string;
  doctor: string;
  specialty: string;
  location: string;
}

interface AppointmentMapProps {
  appointments: Appointment[];
}

const AppointmentMap = ({ appointments }: AppointmentMapProps) => {
  // Group appointments by location
  const locations: Record<string, Appointment[]> = {};
  appointments.forEach(apt => {
    if (!locations[apt.location]) {
      locations[apt.location] = [];
    }
    locations[apt.location].push(apt);
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Meus Locais de Consulta</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-200 dark:bg-gray-800 rounded-lg h-[300px] flex items-center justify-center mb-4">
            <div className="text-center">
              <MapPin size={40} className="mx-auto mb-2 text-primary" />
              <p className="text-gray-500 dark:text-gray-400">Mapa interativo será exibido aqui</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Mostrando todos os locais de consulta
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(locations).map(([location, apts], index) => (
              <LocationCard 
                key={index} 
                location={location} 
                appointments={apts}
              />
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Informações de Transporte</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                <Navigation className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h4 className="font-medium">Opções de Transporte</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  Escolha o melhor meio de transporte para sua próxima consulta.
                </p>
                <div className="grid grid-cols-3 gap-2">
                  <Button variant="outline" size="sm" className="text-xs">Carro</Button>
                  <Button variant="outline" size="sm" className="text-xs">Transporte Público</Button>
                  <Button variant="outline" size="sm" className="text-xs">Táxi/Uber</Button>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h4 className="font-medium">Tempo Estimado</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Para sua próxima consulta em Clínica Saúde Total:
                </p>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <div className="text-center p-2 bg-gray-100 dark:bg-gray-800 rounded">
                    <p className="font-medium">25 min</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Carro</p>
                  </div>
                  <div className="text-center p-2 bg-gray-100 dark:bg-gray-800 rounded">
                    <p className="font-medium">45 min</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Ônibus</p>
                  </div>
                  <div className="text-center p-2 bg-gray-100 dark:bg-gray-800 rounded">
                    <p className="font-medium">30 min</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Táxi</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const LocationCard = ({ location, appointments }: { location: string, appointments: Appointment[] }) => {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium">{location}</h3>
        <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
          {appointments.length} consulta{appointments.length !== 1 ? 's' : ''}
        </Badge>
      </div>
      
      <div className="space-y-2 mb-3 text-sm">
        <div className="flex items-start">
          <MapPin size={16} className="mr-2 mt-0.5 text-gray-500 dark:text-gray-400" />
          <span className="text-gray-500 dark:text-gray-400">Rua Principal, 123, Pindamonhangaba</span>
        </div>
        <div className="flex items-start">
          <Phone size={16} className="mr-2 mt-0.5 text-gray-500 dark:text-gray-400" />
          <span className="text-gray-500 dark:text-gray-400">(12) 3456-7890</span>
        </div>
        <div className="flex items-start">
          <Building size={16} className="mr-2 mt-0.5 text-gray-500 dark:text-gray-400" />
          <span className="text-gray-500 dark:text-gray-400">Sala 302, 3º Andar</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        <Button variant="outline" size="sm">
          <Navigation size={14} className="mr-1" />
          Direções
        </Button>
        <Button variant="outline" size="sm">
          <Phone size={14} className="mr-1" />
          Ligar
        </Button>
      </div>
    </div>
  );
};

export default AppointmentMap;
