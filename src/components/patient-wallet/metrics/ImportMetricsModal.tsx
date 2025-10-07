
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { SmartphoneNfc, Smartphone, Watch, Activity } from "lucide-react";

interface ImportMetricsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImport: (source: string, metrics: string[]) => void;
}

const ImportMetricsModal = ({ open, onOpenChange, onImport }: ImportMetricsModalProps) => {
  const [selectedSource, setSelectedSource] = useState<string>("appleHealth");
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);
  const [connecting, setConnecting] = useState<boolean>(false);
  const [connected, setConnected] = useState<boolean>(false);
  
  const metricsByPlatform = {
    appleHealth: [
      {id: "steps", name: "Passos"},
      {id: "heartRate", name: "Frequência Cardíaca"},
      {id: "bloodPressure", name: "Pressão Arterial"},
      {id: "weight", name: "Peso"},
      {id: "sleep", name: "Sono"},
      {id: "oxygenSaturation", name: "Saturação de Oxigênio"}
    ],
    googleFit: [
      {id: "steps", name: "Passos"},
      {id: "heartRate", name: "Frequência Cardíaca"},
      {id: "weight", name: "Peso"},
      {id: "distance", name: "Distância"},
      {id: "calories", name: "Calorias"},
      {id: "activeMinutes", name: "Minutos Ativos"}
    ],
    smartwatch: [
      {id: "heartRate", name: "Frequência Cardíaca"},
      {id: "steps", name: "Passos"},
      {id: "calories", name: "Calorias"},
      {id: "sleep", name: "Sono"},
      {id: "stress", name: "Nível de Estresse"}
    ],
    device: [
      {id: "bloodPressure", name: "Pressão Arterial"},
      {id: "glucose", name: "Glicemia"},
      {id: "weight", name: "Peso"},
      {id: "temperature", name: "Temperatura"},
      {id: "oxygenSaturation", name: "Saturação de Oxigênio"}
    ]
  };
  
  const handleConnect = () => {
    setConnecting(true);
    // Simulação de conexão
    setTimeout(() => {
      setConnecting(false);
      setConnected(true);
    }, 1500);
  };
  
  const handleToggleMetric = (metricId: string) => {
    setSelectedMetrics(prev => 
      prev.includes(metricId)
        ? prev.filter(id => id !== metricId)
        : [...prev, metricId]
    );
  };
  
  const handleImport = () => {
    onImport(selectedSource, selectedMetrics);
    onOpenChange(false);
    // Reset state
    setConnecting(false);
    setConnected(false);
    setSelectedMetrics([]);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Importar Métricas de Saúde</DialogTitle>
          <DialogDescription>
            Conecte-se com aplicativos ou dispositivos para importar dados de saúde automaticamente.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="appleHealth" onValueChange={value => {
          setSelectedSource(value);
          setConnected(false);
          setSelectedMetrics([]);
        }}>
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="appleHealth" className="flex flex-col items-center text-xs py-2">
              <Smartphone size={20} className="mb-1" />
              Apple Health
            </TabsTrigger>
            <TabsTrigger value="googleFit" className="flex flex-col items-center text-xs py-2">
              <Activity size={20} className="mb-1" />
              Google Fit
            </TabsTrigger>
            <TabsTrigger value="smartwatch" className="flex flex-col items-center text-xs py-2">
              <Watch size={20} className="mb-1" />
              Smartwatch
            </TabsTrigger>
            <TabsTrigger value="device" className="flex flex-col items-center text-xs py-2">
              <SmartphoneNfc size={20} className="mb-1" />
              Dispositivo
            </TabsTrigger>
          </TabsList>
          
          {Object.keys(metricsByPlatform).map((platform) => (
            <TabsContent key={platform} value={platform} className="border-none p-0">
              {!connected ? (
                <div className="text-center py-6">
                  <p className="mb-4 text-muted-foreground">
                    {platform === 'appleHealth' && 'Conecte-se ao Apple Health para importar seus dados de saúde.'}
                    {platform === 'googleFit' && 'Conecte-se ao Google Fit para importar seus dados de atividade física.'}
                    {platform === 'smartwatch' && 'Conecte-se ao seu smartwatch para importar métricas em tempo real.'}
                    {platform === 'device' && 'Conecte um dispositivo médico via Bluetooth para importar medições.'}
                  </p>
                  <Button 
                    onClick={handleConnect} 
                    disabled={connecting}
                    className="mx-auto"
                  >
                    {connecting ? "Conectando..." : "Conectar"}
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-md text-sm">
                    Conectado com sucesso! Selecione as métricas que deseja importar.
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Selecione as métricas</Label>
                    <div className="border rounded-md p-1">
                      {metricsByPlatform[platform as keyof typeof metricsByPlatform].map((metric) => (
                        <div key={metric.id} className="flex items-center space-x-2 p-2 hover:bg-muted rounded-sm">
                          <Checkbox 
                            id={`metric-${metric.id}`} 
                            checked={selectedMetrics.includes(metric.id)}
                            onCheckedChange={() => handleToggleMetric(metric.id)}
                          />
                          <Label htmlFor={`metric-${metric.id}`} className="cursor-pointer flex-grow">
                            {metric.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <Label>Período para importação</Label>
                    <div className="flex items-center gap-2 mt-1.5">
                      <Input
                        type="date"
                        className="flex-1"
                      />
                      <span>até</span>
                      <Input
                        type="date"
                        className="flex-1"
                        defaultValue={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button 
            onClick={handleImport} 
            disabled={!connected || selectedMetrics.length === 0}
          >
            Importar Dados
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImportMetricsModal;
