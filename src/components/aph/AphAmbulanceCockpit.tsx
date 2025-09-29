import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AphAmbulance } from '@/modules/aph/types';
import { Gauge, Fuel, TimerReset, Activity, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface AphAmbulanceCockpitProps {
  ambulance: AphAmbulance | null;
}

const statusLabel: Record<AphAmbulance['status'], string> = {
  livre: 'Livre',
  deslocamento: 'Em deslocamento',
  em_atendimento: 'Em atendimento',
  indisponivel: 'Indisponível'
};

const AphAmbulanceCockpit: React.FC<AphAmbulanceCockpitProps> = ({ ambulance }) => {
  if (!ambulance) {
    return (
      <Card className="border-slate-800 bg-slate-900/70">
        <CardHeader>
          <CardTitle className="text-white">Cockpit da ambulância</CardTitle>
          <CardDescription className="text-slate-400">Selecione uma viatura no mapa para ver telemetria em tempo real.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const { telemetry } = ambulance;

  return (
    <Card className="border-slate-800 bg-slate-900/70">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-white">{ambulance.name}</CardTitle>
            <CardDescription className="text-slate-400">
              {ambulance.address}
              {ambulance.destination ? ` • Destino ${ambulance.destination}` : ''}
            </CardDescription>
          </div>
          <Badge className="bg-emerald-500/20 text-emerald-100 border border-emerald-500/40">
            {statusLabel[ambulance.status]}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-4">
          <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-4">
            <p className="text-xs uppercase tracking-wide text-slate-400">Velocidade</p>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-3xl font-semibold text-white">{telemetry.speed}</span>
              <span className="text-sm text-slate-400">km/h</span>
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
              <Gauge className="h-4 w-4" />
              <span>RPM {telemetry.rpm.toLocaleString()}</span>
            </div>
            <div className="mt-1 flex items-center gap-2 text-xs text-slate-400">
              <Fuel className="h-4 w-4" />
              <span>Combustível {telemetry.fuel}%</span>
            </div>
          </div>
          <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-4">
            <p className="text-xs uppercase tracking-wide text-slate-400">Temperatura motor</p>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-2xl font-semibold text-white">{telemetry.temperature}</span>
              <span className="text-sm text-slate-400">ºC</span>
            </div>
            <p className="mt-2 text-xs text-slate-400 flex items-center gap-2">
              <TimerReset className="h-4 w-4" />
              Odom. {telemetry.odometer.toLocaleString()} km
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Última manutenção há {(telemetry.odometer - telemetry.lastMaintenanceKm).toLocaleString()} km
            </p>
          </div>
        </div>
        <div className="space-y-4">
          <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-4">
            <p className="text-xs uppercase tracking-wide text-slate-400">Equipe</p>
            <ul className="mt-2 space-y-1 text-sm text-white/80">
              {telemetry.crew.map((member) => (
                <li key={member} className="flex items-center gap-2">
                  <User className="h-4 w-4 text-emerald-300" />
                  <span>{member}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-4">
            <p className="text-xs uppercase tracking-wide text-slate-400">Incidentes & riscos</p>
            <p className="mt-2 flex items-center gap-2 text-sm text-white/80">
              <Activity className="h-4 w-4 text-rose-300" />
              {telemetry.incidentCount} alertas nas últimas 24h
            </p>
            <p className="mt-1 text-xs text-slate-400">
              {ambulance.lastUpdate}
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-4">
          {ambulance.interiorImage && (
            <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-400 mb-3">Interior da Ambulância</p>
              <img 
                src={ambulance.interiorImage} 
                alt={`Interior da ${ambulance.name}`}
                className="w-full h-32 object-cover rounded-lg border border-slate-700"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          )}
          <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-4 text-sm text-slate-300">
            <p className="text-xs uppercase tracking-wide text-slate-400">Resumo operacional</p>
            <ul className="mt-2 space-y-1">
              <li>• Status atual: {statusLabel[ambulance.status]}</li>
              {ambulance.destination && <li>• Destino: {ambulance.destination} (ETA {ambulance.eta})</li>}
              <li>• Última atualização {ambulance.lastUpdate}</li>
            </ul>
          </div>
          <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs text-emerald-100">
            <p className="uppercase tracking-wide">Sugestão do Oráculo</p>
            <p className="mt-1 text-sm text-white/80">
              Monitorar velocidade média para manter SLA e evitar consumo alto. Reavaliar manutenção preventiva em 900 km.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AphAmbulanceCockpit;
