import { AphPagesConfig } from './types';

const slaSeries = [
  { window: '05:00', meta: 18, real: 17, fila: 3 },
  { window: '07:00', meta: 18, real: 19, fila: 6 },
  { window: '09:00', meta: 18, real: 16, fila: 2 },
  { window: '11:00', meta: 18, real: 17, fila: 3 },
  { window: '13:00', meta: 18, real: 20, fila: 5 },
  { window: '15:00', meta: 18, real: 18, fila: 4 },
  { window: '17:00', meta: 18, real: 19, fila: 7 },
  { window: '19:00', meta: 18, real: 17, fila: 3 },
  { window: '21:00', meta: 18, real: 16, fila: 2 },
  { window: '23:00', meta: 18, real: 17, fila: 4 }
];

const demandForecast = [
  { periodo: 'Seg', ocorrencias: 86, projecao: 92, clima: 2 },
  { periodo: 'Ter', ocorrencias: 90, projecao: 95, clima: 3 },
  { periodo: 'Qua', ocorrencias: 97, projecao: 101, clima: 4 },
  { periodo: 'Qui', ocorrencias: 94, projecao: 98, clima: 3 },
  { periodo: 'Sex', ocorrencias: 102, projecao: 108, clima: 5 },
  { periodo: 'Sáb', ocorrencias: 76, projecao: 80, clima: 1 },
  { periodo: 'Dom', ocorrencias: 69, projecao: 72, clima: 1 }
];

const glosaSeries = [
  { mes: 'Jan', conta: 1.7, recuperado: 0.9 },
  { mes: 'Fev', conta: 1.5, recuperado: 1.0 },
  { mes: 'Mar', conta: 1.3, recuperado: 0.8 },
  { mes: 'Abr', conta: 1.1, recuperado: 0.7 },
  { mes: 'Mai', conta: 1.0, recuperado: 0.8 },
  { mes: 'Jun', conta: 0.9, recuperado: 0.7 }
];

const frotaUtilizacao = [
  { turno: 'Manhã', uti: 86, usb: 74, suporte: 62 },
  { turno: 'Tarde', uti: 91, usb: 80, suporte: 67 },
  { turno: 'Noite', uti: 88, usb: 77, suporte: 63 }
];

const manuntencaoTrend = [
  { semana: 'S1', previstos: 12, executados: 10, falhas: 2 },
  { semana: 'S2', previstos: 15, executados: 14, falhas: 1 },
  { semana: 'S3', previstos: 13, executados: 12, falhas: 1 },
  { semana: 'S4', previstos: 16, executados: 16, falhas: 0 }
];

const qualidadeSeries = [
  { mes: 'Jan', portaAgulha: 61, portaBalao: 92, analgesia: 78 },
  { mes: 'Fev', portaAgulha: 59, portaBalao: 90, analgesia: 82 },
  { mes: 'Mar', portaAgulha: 57, portaBalao: 89, analgesia: 84 },
  { mes: 'Abr', portaAgulha: 55, portaBalao: 88, analgesia: 86 },
  { mes: 'Mai', portaAgulha: 54, portaBalao: 86, analgesia: 87 },
  { mes: 'Jun', portaAgulha: 53, portaBalao: 85, analgesia: 89 }
];

const contratosSaude = [
  { contrato: 'Samaritanos', nps: 76, sla: 93, margem: 19 },
  { contrato: 'VitaSaúde', nps: 82, sla: 95, margem: 21 },
  { contrato: 'Município SC', nps: 71, sla: 91, margem: 18 },
  { contrato: 'Seguro Vida+', nps: 79, sla: 94, margem: 23 }
];

const heatmapPeriods = ['Manhã', 'Tarde', 'Noite'];

const aphPagesConfig: AphPagesConfig = {
  dashboard: {
    key: 'dashboard',
    title: 'War Room Pré-Hospitalar',
    subtitle: 'Comando tático em tempo real com visão de frota, SLAs críticos e alertas preditivos.',
    heroTagline: 'Zero surpresa, 360° de controle da operação APH.',
    gradient: { from: 'from-rose-500/30', to: 'to-slate-900' },
    tags: ['Tempo real', 'Multi-base', 'MCP Servers'],
    metrics: [
      { id: 'sla-p90', title: 'SLA P90 Despacho→Chegada', value: '17m', variation: '-1.2m', trend: 'up', icon: 'activity', severity: 'grave', description: 'Meta 18m • últimas 2h' },
      { id: 'frota-disponivel', title: 'Frota Disponível', value: '91%', variation: '+1pp', trend: 'up', icon: 'ambulance', severity: 'estavel', description: '20 de 22 ambulâncias operacionais' },
      { id: 'alertas-criticos', title: 'Alertas Críticos Ativos', value: '7', variation: '-1', trend: 'down', icon: 'shield-alert', severity: 'grave', description: '3 SLA, 2 Frota, 1 LGPD, 1 Estoque' },
      { id: 'demanda-prevista', title: 'Demanda Prevista (próx. 3h)', value: '32 chamadas', variation: '+14%', trend: 'up', icon: 'map', severity: 'atencao', description: 'Pico zona Norte às 18h' }
    ],
    alerts: [
      {
        id: 'alert-sla-sao-jose',
        title: 'SLA São José em 88%',
        description: 'Últimas 12h ficaram abaixo da meta devido a trânsito na BR-101 e falta de reserva.',
        metric: 'Meta 92% • Real 88%',
        action: 'Realocar USB-03 e acionar plano de contingência 18h-23h.',
        severity: 'grave'
      },
      {
        id: 'alert-midazolam',
        title: 'Ruptura crítica de Midazolam',
        description: 'Cobertura média 18h (mínimo 36h). Estoque crítico em Florianópolis e Itajaí.',
        metric: 'Cobertura 18h',
        action: 'Redistribuir insumo + compra expressa com aprovação CFO.',
        severity: 'critico'
      },
      {
        id: 'alert-telemetria',
        title: 'Falhas telemetria 12% da frota',
        description: 'Modems 4G antigos provocando perda de sinal em rodovias; risco para manutenção preditiva.',
        metric: '12% sem heartbeat',
        action: 'Trocar modems UTI-04/05/09 e ativar cache offline.',
        severity: 'atencao'
      }
    ],
    map: {
      center: [-48.548, -27.594],
      zoom: 10,
      layers: [
        { id: 'heat-demand', type: 'heatmap', color: '#ef4444', description: 'Heatmap de demanda 24h (MCP Analytics)' },
        { id: 'geofence-floripa', type: 'geofence', color: '#22c55e', description: 'Perímetro contrato Florianópolis' },
        { id: 'event-jurerê', type: 'event', color: '#f59e0b', description: 'Cobertura evento Jurerê Music 20h' }
      ]
    },
    ambulances: [
      {
        id: 'ALFA-01',
        name: 'UTI Alfa 01',
        type: 'UTI',
        status: 'em_atendimento',
        coordinates: [-48.558, -27.595],
        address: 'Av. Beira-Mar Norte, Florianópolis',
        destination: 'Hospital Celso Ramos',
        eta: '05 min',
        lastUpdate: 'há 18s',
        telemetry: {
          speed: 54,
          rpm: 2900,
          fuel: 62,
          temperature: 94,
          odometer: 172480,
          lastMaintenanceKm: 171300,
          crew: ['Médico Rocha', 'Enfermeira Azevedo', 'Condutor Lopes'],
          incidentCount: 1
        }
      },
      {
        id: 'ALFA-02',
        name: 'UTI Alfa 02',
        type: 'UTI',
        status: 'deslocamento',
        coordinates: [-48.521, -27.622],
        address: 'SC-401, acesso JK, Florianópolis',
        destination: 'Hospital SOS Cárdio',
        eta: '09 min',
        lastUpdate: 'há 27s',
        telemetry: {
          speed: 72,
          rpm: 3250,
          fuel: 58,
          temperature: 91,
          odometer: 164930,
          lastMaintenanceKm: 164000,
          crew: ['Médico Antunes', 'Enfermeira Prado', 'Condutor Souza'],
          incidentCount: 0
        }
      },
      {
        id: 'ALFA-03',
        name: 'UTI Alfa 03',
        type: 'UTI',
        status: 'livre',
        coordinates: [-48.630, -27.608],
        address: 'Base São José - Bairro Campinas',
        lastUpdate: 'há 8s',
        telemetry: {
          speed: 0,
          rpm: 0,
          fuel: 83,
          temperature: 35,
          odometer: 149250,
          lastMaintenanceKm: 148100,
          crew: ['Médico Siqueira', 'Enfermeira Ramos'],
          incidentCount: 2
        }
      },
      {
        id: 'ALFA-04',
        name: 'UTI Alfa 04',
        type: 'UTI',
        status: 'indisponivel',
        coordinates: [-48.663, -27.640],
        address: 'Oficina credenciada, Palhoça',
        lastUpdate: 'há 2m',
        telemetry: {
          speed: 0,
          rpm: 0,
          fuel: 46,
          temperature: 28,
          odometer: 205880,
          lastMaintenanceKm: 205880,
          crew: [],
          incidentCount: 0
        }
      },
      {
        id: 'ALFA-05',
        name: 'UTI Alfa 05',
        type: 'UTI',
        status: 'deslocamento',
        coordinates: [-48.501, -27.571],
        address: 'BR-101 km 205 sentido Norte',
        destination: 'Hospital São Lucas',
        eta: '07 min',
        lastUpdate: 'há 25s',
        telemetry: {
          speed: 68,
          rpm: 3100,
          fuel: 54,
          temperature: 92,
          odometer: 186120,
          lastMaintenanceKm: 185200,
          crew: ['Médico Silva', 'Enfermeira Costa', 'Condutor Lima'],
          incidentCount: 0
        }
      },
      {
        id: 'ALFA-06',
        name: 'UTI Alfa 06',
        type: 'UTI',
        status: 'em_atendimento',
        coordinates: [-48.668, -26.909],
        address: 'Av. Sete de Setembro, Itajaí',
        destination: 'Hospital Marieta',
        eta: '04 min',
        lastUpdate: 'há 16s',
        telemetry: {
          speed: 38,
          rpm: 2500,
          fuel: 69,
          temperature: 89,
          odometer: 192740,
          lastMaintenanceKm: 191600,
          crew: ['Médico Becker', 'Enfermeira Neri', 'Condutor Cruz'],
          incidentCount: 1
        }
      },
      {
        id: 'ALFA-07',
        name: 'UTI Alfa 07',
        type: 'UTI',
        status: 'livre',
        coordinates: [-48.640, -26.995],
        address: 'Base Balneário Camboriú - Barra Sul',
        lastUpdate: 'há 11s',
        telemetry: {
          speed: 0,
          rpm: 0,
          fuel: 76,
          temperature: 33,
          odometer: 138520,
          lastMaintenanceKm: 137400,
          crew: ['Médico Torres', 'Enfermeira Meireles'],
          incidentCount: 0
        }
      },
      {
        id: 'ALFA-08',
        name: 'UTI Alfa 08',
        type: 'UTI',
        status: 'deslocamento',
        coordinates: [-48.850, -26.310],
        address: 'Rua XV de Novembro, Joinville',
        destination: 'Hospital Dona Helena',
        eta: '06 min',
        lastUpdate: 'há 33s',
        telemetry: {
          speed: 63,
          rpm: 3050,
          fuel: 47,
          temperature: 95,
          odometer: 210410,
          lastMaintenanceKm: 209200,
          crew: ['Médico Braga', 'Enfermeira Martins', 'Condutor Silva'],
          incidentCount: 2
        }
      },
      {
        id: 'ALFA-09',
        name: 'UTI Alfa 09',
        type: 'UTI',
        status: 'em_atendimento',
        coordinates: [-49.070, -26.922],
        address: 'R. Heinrich Hosang, Blumenau',
        destination: 'Hospital Santa Isabel',
        eta: '03 min',
        lastUpdate: 'há 19s',
        telemetry: {
          speed: 41,
          rpm: 2400,
          fuel: 59,
          temperature: 90,
          odometer: 167880,
          lastMaintenanceKm: 166500,
          crew: ['Médico Goulart', 'Enfermeira Fogaça', 'Condutor Dias'],
          incidentCount: 1
        }
      },
      {
        id: 'ALFA-10',
        name: 'UTI Alfa 10',
        type: 'UTI',
        status: 'deslocamento',
        coordinates: [-52.613, -27.104],
        address: 'Av. Getúlio Vargas, Chapecó',
        destination: 'Hospital Regional do Oeste',
        eta: '08 min',
        lastUpdate: 'há 22s',
        telemetry: {
          speed: 58,
          rpm: 2800,
          fuel: 44,
          temperature: 93,
          odometer: 189430,
          lastMaintenanceKm: 188100,
          crew: ['Médico Vieira', 'Enfermeira Luz', 'Condutor Basso'],
          incidentCount: 0
        }
      },
      {
        id: 'BRAVO-01',
        name: 'USB Bravo 01',
        type: 'USB',
        status: 'em_atendimento',
        coordinates: [-48.664, -27.648],
        address: 'Rua Pref. Reinoldo Alves, Palhoça',
        destination: 'UPA Bela Vista',
        eta: '04 min',
        lastUpdate: 'há 14s',
        telemetry: {
          speed: 36,
          rpm: 2100,
          fuel: 71,
          temperature: 87,
          odometer: 114580,
          lastMaintenanceKm: 113600,
          crew: ['Socorrista A. Souza', 'Condutor Mendes'],
          incidentCount: 1
        }
      },
      {
        id: 'BRAVO-02',
        name: 'USB Bravo 02',
        type: 'USB',
        status: 'livre',
        coordinates: [-48.658, -27.494],
        address: 'Base Biguaçu - bairro Universitário',
        lastUpdate: 'há 9s',
        telemetry: {
          speed: 0,
          rpm: 0,
          fuel: 88,
          temperature: 34,
          odometer: 106340,
          lastMaintenanceKm: 105100,
          crew: ['Socorrista Lima', 'Condutor Xavier'],
          incidentCount: 0
        }
      },
      {
        id: 'BRAVO-03',
        name: 'USB Bravo 03',
        type: 'USB',
        status: 'livre',
        coordinates: [-48.610, -27.586],
        address: 'Base São José',
        lastUpdate: 'há 12s',
        telemetry: {
          speed: 0,
          rpm: 0,
          fuel: 78,
          temperature: 36,
          odometer: 98560,
          lastMaintenanceKm: 97500,
          crew: ['Socorrista Alves', 'Condutora Maia'],
          incidentCount: 2
        }
      },
      {
        id: 'BRAVO-04',
        name: 'USB Bravo 04',
        type: 'USB',
        status: 'deslocamento',
        coordinates: [-48.601, -26.862],
        address: 'SC-412, Itapema',
        destination: 'Hospital Santo Antônio',
        eta: '11 min',
        lastUpdate: 'há 31s',
        telemetry: {
          speed: 64,
          rpm: 2950,
          fuel: 52,
          temperature: 90,
          odometer: 123210,
          lastMaintenanceKm: 122000,
          crew: ['Socorrista Freitas', 'Condutora Mota'],
          incidentCount: 0
        }
      },
      {
        id: 'BRAVO-05',
        name: 'USB Bravo 05',
        type: 'USB',
        status: 'em_atendimento',
        coordinates: [-48.671, -27.587],
        address: 'Rua Konder Reis, São José',
        destination: 'Hospital Regional',
        eta: '03 min',
        lastUpdate: 'há 20s',
        telemetry: {
          speed: 28,
          rpm: 1900,
          fuel: 63,
          temperature: 86,
          odometer: 134870,
          lastMaintenanceKm: 133900,
          crew: ['Socorrista Prado', 'Condutor Teixeira'],
          incidentCount: 1
        }
      },
      {
        id: 'BRAVO-06',
        name: 'USB Bravo 06',
        type: 'USB',
        status: 'deslocamento',
        coordinates: [-49.380, -28.675],
        address: 'Av. Centenário, Criciúma',
        destination: 'Hospital São José (Criciúma)',
        eta: '05 min',
        lastUpdate: 'há 17s',
        telemetry: {
          speed: 52,
          rpm: 2600,
          fuel: 55,
          temperature: 88,
          odometer: 118540,
          lastMaintenanceKm: 117400,
          crew: ['Socorrista Bianchini', 'Condutor Dal Bosco'],
          incidentCount: 0
        }
      },
      {
        id: 'BRAVO-07',
        name: 'USB Bravo 07',
        type: 'USB',
        status: 'livre',
        coordinates: [-50.323, -27.817],
        address: 'Base Lages',
        lastUpdate: 'há 6s',
        telemetry: {
          speed: 0,
          rpm: 0,
          fuel: 74,
          temperature: 31,
          odometer: 101230,
          lastMaintenanceKm: 100200,
          crew: ['Socorrista R. Lima', 'Condutor Bastos'],
          incidentCount: 0
        }
      },
      {
        id: 'BRAVO-08',
        name: 'USB Bravo 08',
        type: 'USB',
        status: 'em_atendimento',
        coordinates: [-49.066, -26.485],
        address: 'Jaraguá do Sul - Av. Marechal Deodoro',
        destination: 'Hospital São José Jaraguá',
        eta: '09 min',
        lastUpdate: 'há 24s',
        telemetry: {
          speed: 46,
          rpm: 2350,
          fuel: 61,
          temperature: 87,
          odometer: 128320,
          lastMaintenanceKm: 127100,
          crew: ['Socorrista Meurer', 'Condutor Fritsch'],
          incidentCount: 1
        }
      },
      {
        id: 'RESG-01',
        name: 'Resgate 01',
        type: 'Resgate',
        status: 'deslocamento',
        coordinates: [-48.421, -27.673],
        address: 'BR-282, Rancho Queimado',
        destination: 'Hospital Regional São José',
        eta: '18 min',
        lastUpdate: 'há 38s',
        telemetry: {
          speed: 71,
          rpm: 3150,
          fuel: 48,
          temperature: 93,
          odometer: 236540,
          lastMaintenanceKm: 235200,
          crew: ['Paramédico Couto', 'Condutor Rosa'],
          incidentCount: 0
        }
      },
      {
        id: 'RESG-02',
        name: 'Resgate 02',
        type: 'Resgate',
        status: 'em_atendimento',
        coordinates: [-48.665, -27.497],
        address: 'Evento IronMan • Balneário Camboriú',
        destination: 'Ponto de apoio evento',
        eta: '—',
        lastUpdate: 'há 5s',
        telemetry: {
          speed: 12,
          rpm: 1800,
          fuel: 42,
          temperature: 88,
          odometer: 214320,
          lastMaintenanceKm: 213000,
          crew: ['Paramédico Rocha', 'Condutor Vieira'],
          incidentCount: 1
        }
      },
      {
        id: 'RESG-03',
        name: 'Resgate 03',
        type: 'Resgate',
        status: 'livre',
        coordinates: [-48.915, -27.584],
        address: 'Base operativo - Gov. Celso Ramos',
        lastUpdate: 'há 15s',
        telemetry: {
          speed: 0,
          rpm: 0,
          fuel: 69,
          temperature: 32,
          odometer: 198770,
          lastMaintenanceKm: 197500,
          crew: ['Paramédico Tavares', 'Condutor Nicolau'],
          incidentCount: 0
        }
      },
      {
        id: 'RESG-04',
        name: 'Resgate 04',
        type: 'Resgate',
        status: 'indisponivel',
        coordinates: [-49.287, -25.999],
        address: 'Pátio de manutenção - Mafra',
        lastUpdate: 'há 3m',
        telemetry: {
          speed: 0,
          rpm: 0,
          fuel: 35,
          temperature: 27,
          odometer: 223115,
          lastMaintenanceKm: 223115,
          crew: [],
          incidentCount: 0
        }
      },
      {
        id: 'SUP-01',
        name: 'Suporte Logístico 01',
        type: 'Suporte',
        status: 'deslocamento',
        coordinates: [-51.148, -27.181],
        address: 'SC-135, Videira',
        destination: 'Base Chapecó',
        eta: '42 min',
        lastUpdate: 'há 1m',
        telemetry: {
          speed: 82,
          rpm: 2700,
          fuel: 57,
          temperature: 85,
          odometer: 142330,
          lastMaintenanceKm: 141200,
          crew: ['Logista Ferraz'],
          incidentCount: 0
        }
      },
      {
        id: 'SUP-02',
        name: 'Suporte Logístico 02',
        type: 'Suporte',
        status: 'livre',
        coordinates: [-47.791, -26.227],
        address: 'Base Itapoá',
        lastUpdate: 'há 40s',
        telemetry: {
          speed: 0,
          rpm: 0,
          fuel: 81,
          temperature: 30,
          odometer: 96540,
          lastMaintenanceKm: 95700,
          crew: ['Logista Campos'],
          incidentCount: 0
        }
      }
    ],
    cameraWall: [
      { id: 'cam-alfa01', title: 'UTI Alfa 01 • Interna', unit: 'ALFA-01', thumbnail: '/images/cameras/interior-ambulancia-1.jpg', status: 'ok', latency: '1.6s', updatedAt: 'há 18s', description: 'Paciente sedado, monitor multiparamétrico estável.' },
      { id: 'cam-alfa02', title: 'UTI Alfa 02 • Externa', unit: 'ALFA-02', thumbnail: '/images/cameras/interior-ambulancia-2.jpg', status: 'ok', latency: '2.0s', updatedAt: 'há 27s', description: 'Registro de trânsito denso na SC-401.' },
      { id: 'cam-alfa03', title: 'UTI Alfa 03 • Cabine', unit: 'ALFA-03', thumbnail: '/images/cameras/ambulatorio-1.jpg', status: 'ok', latency: '1.2s', updatedAt: 'há 8s', description: 'Equipe aguardando despacho na base.' },
      { id: 'cam-alfa04', title: 'UTI Alfa 04 • Oficina', unit: 'ALFA-04', thumbnail: '/images/cameras/ambulatorio-2.jpg', status: 'offline', latency: '—', updatedAt: 'há 2m', description: 'Viatura em manutenção preventiva.' },
      { id: 'cam-alfa05', title: 'UTI Alfa 05 • Interna', unit: 'ALFA-05', thumbnail: '/images/cameras/interior-ambulancia-1.jpg', status: 'ok', latency: '1.8s', updatedAt: 'há 25s', description: 'Paciente com ventilação controlada.' },
      { id: 'cam-alfa06', title: 'UTI Alfa 06 • Externa', unit: 'ALFA-06', thumbnail: '/images/cameras/interior-ambulancia-2.jpg', status: 'ok', latency: '2.2s', updatedAt: 'há 16s', description: 'Chegada a hospital em Itajaí.' },
      { id: 'cam-alfa07', title: 'UTI Alfa 07 • Base', unit: 'ALFA-07', thumbnail: '/images/cameras/ambulatorio-1.jpg', status: 'ok', latency: '1.4s', updatedAt: 'há 11s', description: 'Check-list concluído para plantão noturno.' },
      { id: 'cam-alfa08', title: 'UTI Alfa 08 • Rodovia', unit: 'ALFA-08', thumbnail: '/images/cameras/interior-ambulancia-2.jpg', status: 'alerta', latency: '3.1s', updatedAt: 'há 33s', description: 'Trecho com chuva e visibilidade reduzida.' },
      { id: 'cam-alfa09', title: 'UTI Alfa 09 • Interna', unit: 'ALFA-09', thumbnail: '/images/cameras/interior-ambulancia-1.jpg', status: 'ok', latency: '1.9s', updatedAt: 'há 19s', description: 'Equipe realizando analgesia e monitorização.' },
      { id: 'cam-alfa10', title: 'UTI Alfa 10 • Externa', unit: 'ALFA-10', thumbnail: '/images/cameras/ambulatorio-2.jpg', status: 'ok', latency: '2.6s', updatedAt: 'há 22s', description: 'Chegada ao Hospital Regional de Chapecó.' },
      { id: 'cam-bravo01', title: 'USB Bravo 01 • Interna', unit: 'BRAVO-01', thumbnail: '/images/cameras/interior-ambulancia-2.jpg', status: 'ok', latency: '1.7s', updatedAt: 'há 14s', description: 'Atendimento em curso em Palhoça.' },
      { id: 'cam-bravo02', title: 'USB Bravo 02 • Externa', unit: 'BRAVO-02', thumbnail: '/images/cameras/ambulatorio-1.jpg', status: 'ok', latency: '1.5s', updatedAt: 'há 9s', description: 'Base Biguaçu, equipe pronta.' },
      { id: 'cam-bravo03', title: 'USB Bravo 03 • Externa', unit: 'BRAVO-03', thumbnail: '/images/cameras/ambulatorio-2.jpg', status: 'ok', latency: '2.1s', updatedAt: 'há 12s', description: 'Viatura em standby na Base São José.' },
      { id: 'cam-bravo04', title: 'USB Bravo 04 • Rodovia', unit: 'BRAVO-04', thumbnail: '/images/cameras/interior-ambulancia-2.jpg', status: 'alerta', latency: '2.9s', updatedAt: 'há 31s', description: 'Trecho com obras em Itapema.' },
      { id: 'cam-bravo05', title: 'USB Bravo 05 • Interna', unit: 'BRAVO-05', thumbnail: '/images/cameras/interior-ambulancia-1.jpg', status: 'ok', latency: '1.8s', updatedAt: 'há 20s', description: 'Paciente sendo transportado ao Hospital Regional.' },
      { id: 'cam-bravo06', title: 'USB Bravo 06 • Externa', unit: 'BRAVO-06', thumbnail: '/images/cameras/ambulatorio-2.jpg', status: 'ok', latency: '2.0s', updatedAt: 'há 17s', description: 'Deslocamento em Criciúma, pista seca.' },
      { id: 'cam-bravo07', title: 'USB Bravo 07 • Base Lages', unit: 'BRAVO-07', thumbnail: '/images/cameras/ambulatorio-1.jpg', status: 'ok', latency: '1.3s', updatedAt: 'há 6s', description: 'Checagem de equipamentos concluída.' },
      { id: 'cam-bravo08', title: 'USB Bravo 08 • Interna', unit: 'BRAVO-08', thumbnail: '/images/cameras/interior-ambulancia-1.jpg', status: 'ok', latency: '1.9s', updatedAt: 'há 24s', description: 'Paciente consciente em Jaraguá do Sul.' },
      { id: 'cam-resg01', title: 'Resgate 01 • Rodovia', unit: 'RESG-01', thumbnail: '/images/cameras/interior-ambulancia-2.jpg', status: 'alerta', latency: '3.4s', updatedAt: 'há 38s', description: 'Atendimento em BR-282, chuva moderada.' },
      { id: 'cam-resg02', title: 'Resgate 02 • Interna', unit: 'RESG-02', thumbnail: '/images/cameras/interior-ambulancia-1.jpg', status: 'alerta', latency: '3.6s', updatedAt: 'há 10s', description: 'Movimentação intensa, alerta de frenagem brusca.' },
      { id: 'cam-resg03', title: 'Resgate 03 • Base', unit: 'RESG-03', thumbnail: '/images/cameras/ambulatorio-1.jpg', status: 'ok', latency: '1.5s', updatedAt: 'há 15s', description: 'Equipe de prontidão em Gov. Celso Ramos.' },
      { id: 'cam-resg04', title: 'Resgate 04 • Oficina', unit: 'RESG-04', thumbnail: '/images/cameras/ambulatorio-2.jpg', status: 'offline', latency: '—', updatedAt: 'há 3m', description: 'Câmera pause enquanto viatura em revisão.' },
      { id: 'cam-sup01', title: 'Suporte 01 • Logística', unit: 'SUP-01', thumbnail: '/images/cameras/ambulatorio-1.jpg', status: 'ok', latency: '2.4s', updatedAt: 'há 1m', description: 'Carga de reposição em transporte para Chapecó.' },
      { id: 'cam-sup02', title: 'Suporte 02 • Armazém', unit: 'SUP-02', thumbnail: '/images/cameras/ambulatorio-2.jpg', status: 'ok', latency: '2.2s', updatedAt: 'há 40s', description: 'Controle de estoque Itapoá com sensores MCP.' }
    ],
    insights: [
      { id: 'insight-1', title: 'Zona Norte com risco de fila', description: 'Projeção aponta saturação em 110% entre 18h e 21h — recomendar realocar 1 UTI e 1 USB.', severity: 'critico' },
      { id: 'insight-2', title: 'Queda de SLA motivada por trânsito', description: 'Integração Waze indica acidente na BR-101 impactando base Florianópolis.', severity: 'grave' },
      { id: 'insight-3', title: 'Equipe Alfa 03 disponível', description: 'Equipe com skill avançado livre há 45min — sugerir acionamento para ocorrências vermelhas.', severity: 'estavel' }
    ],
    charts: [
      {
        id: 'chart-sla',
        title: 'SLA por janela de 2h (Meta 18m)',
        subtitle: 'Comparativo real vs meta + fila média',
        type: 'composed',
        data: slaSeries,
        xKey: 'window',
        lines: [
          { dataKey: 'real', name: 'Realizado', color: '#ef4444', type: 'monotone', yAxisId: 'left' },
          { dataKey: 'meta', name: 'Meta', color: '#22c55e', type: 'monotone', yAxisId: 'left' }
        ],
        bars: [
          { dataKey: 'fila', name: 'Fila média', color: '#6366f1', yAxisId: 'right' }
        ],
        yAxisLeftLabel: 'Minutos',
        yAxisRightLabel: 'Chamados'
      },
      {
        id: 'chart-demand',
        title: 'Previsão de demanda 7 dias',
        subtitle: 'Integração MCP + clima + históricos',
        type: 'area',
        data: demandForecast,
        xKey: 'periodo',
        areas: [
          { dataKey: 'ocorrencias', name: 'Ocorrências', color: '#f97316', fillOpacity: 0.25 },
          { dataKey: 'projecao', name: 'Projeção IA', color: '#22c55e', fillOpacity: 0.2 }
        ]
      }
    ],
    heatmap: {
      title: 'Cobertura dinâmica por base',
      description: 'Índice de ocupação por base e período (verde = até 85%, vermelho = acima de 95%).',
      periods: heatmapPeriods,
      rows: [
        {
          label: 'Base Centro',
          cells: [
            { period: 'Manhã', value: 82, severity: 'estavel' },
            { period: 'Tarde', value: 91, severity: 'grave' },
            { period: 'Noite', value: 88, severity: 'grave' }
          ]
        },
        {
          label: 'Base Norte',
          cells: [
            { period: 'Manhã', value: 89, severity: 'grave' },
            { period: 'Tarde', value: 97, severity: 'critico' },
            { period: 'Noite', value: 93, severity: 'grave' }
          ]
        },
        {
          label: 'Base Sul',
          cells: [
            { period: 'Manhã', value: 76, severity: 'estavel' },
            { period: 'Tarde', value: 84, severity: 'estavel' },
            { period: 'Noite', value: 81, severity: 'atencao' }
          ]
        }
      ]
    },
    playbooks: [
      {
        id: 'pb-1',
        title: 'Rebalanceamento pico 18h',
        impact: '+7% SLA | -12% fila',
        actions: [
          'Transferir USB-07 para Base Norte 17h-22h',
          'Acionar microtreino despacho prioritário',
          'Avisar contratante sobre contingência pró-ativa'
        ],
        owner: 'COO',
        status: 'executando',
        severity: 'grave'
      },
      {
        id: 'pb-2',
        title: 'Operação chuva intensa',
        impact: '+5% SLA chuva | +3% segurança',
        actions: [
          'Ativar roteirização clima-aware',
          'Disponibilizar viatura reserva 4x4',
          'Ajustar tempos de limpeza pós atendimento'
        ],
        owner: 'Operações',
        status: 'planejado',
        severity: 'atencao'
      }
    ],
    notes: [
      'Dados provenientes de MCP Servers (telemetria, clima, GPS) com latência média 2.1s.',
      'Replay disponível por 72h para auditoria operacional e compliance.'
    ]
  },
  mapaAmbulancias: {
    key: 'mapaAmbulancias',
    title: 'Mapa GPS Ambulâncias',
    subtitle: 'Monitoramento em tempo real da frota com dados de atendimento e telemetria.',
    heroTagline: 'Visão completa da operação APH em tempo real',
    gradient: { from: 'from-red-500/30', to: 'to-slate-900' },
    tags: ['Tempo real', 'GPS', 'Telemetria', 'Atendimentos'],
    metrics: [
      { id: 'ambulancias-ativas', title: 'Ambulâncias Ativas', value: '18', variation: '+2', trend: 'up', icon: 'ambulance', severity: 'estavel', description: '18 de 22 ambulâncias em operação' },
      { id: 'atendimentos-curso', title: 'Atendimentos em Curso', value: '7', variation: '+3', trend: 'up', icon: 'activity', severity: 'atencao', description: '5 UTI, 2 USB em atendimento' },
      { id: 'tempo-resposta', title: 'Tempo Resposta Médio', value: '12m', variation: '-2m', trend: 'up', icon: 'clock', severity: 'estavel', description: 'Meta: 15min | Últimas 2h' },
      { id: 'cobertura-area', title: 'Cobertura da Área', value: '94%', variation: '+1%', trend: 'up', icon: 'map', severity: 'estavel', description: 'Grande Florianópolis' }
    ],
    map: {
      center: [-48.548, -27.595],
      zoom: 11,
      layers: [
        { id: 'ambulances', type: 'event', color: '#ef4444', description: 'Ambulâncias em tempo real' },
        { id: 'coverage', type: 'heatmap', color: '#3b82f6', description: 'Área de cobertura' },
        { id: 'hospitals', type: 'geofence', color: '#10b981', description: 'Hospitais de referência' }
      ]
    },
    ambulances: [
      {
        id: 'ALFA-01',
        name: 'UTI Alfa 01',
        type: 'UTI',
        status: 'em_atendimento',
        coordinates: [-48.558, -27.595],
        address: 'Av. Beira-Mar Norte, Florianópolis',
        destination: 'Hospital Celso Ramos',
        eta: '05 min',
        lastUpdate: 'há 18s',
        image: '/images/ambulances/ambulance-exterior-1.jpg',
        interiorImage: '/images/ambulances/ambulance-interior-1.jpg',
        telemetry: {
          speed: 54,
          rpm: 2900,
          fuel: 62,
          temperature: 94,
          odometer: 172480,
          lastMaintenanceKm: 171300,
          crew: ['Dr. Rocha', 'Enf. Azevedo', 'Cond. Lopes'],
          incidentCount: 1
        }
      },
      {
        id: 'ALFA-02',
        name: 'UTI Alfa 02',
        type: 'UTI',
        status: 'deslocamento',
        coordinates: [-48.521, -27.622],
        address: 'SC-401, acesso JK, Florianópolis',
        destination: 'Hospital SOS Cárdio',
        eta: '09 min',
        lastUpdate: 'há 27s',
        image: '/images/ambulances/ambulance-exterior-1.jpg',
        interiorImage: '/images/ambulances/ambulance-interior-2.jpg',
        telemetry: {
          speed: 72,
          rpm: 3250,
          fuel: 58,
          temperature: 91,
          odometer: 164930,
          lastMaintenanceKm: 164000,
          crew: ['Dr. Antunes', 'Enf. Prado', 'Cond. Souza'],
          incidentCount: 0
        }
      },
      {
        id: 'ALFA-03',
        name: 'UTI Alfa 03',
        type: 'UTI',
        status: 'livre',
        coordinates: [-48.630, -27.608],
        address: 'Base São José - Bairro Campinas',
        lastUpdate: 'há 8s',
        image: '/images/ambulances/ambulance-exterior-1.jpg',
        interiorImage: '/images/ambulances/ambulance-interior-3.jpg',
        telemetry: {
          speed: 0,
          rpm: 0,
          fuel: 83,
          temperature: 35,
          odometer: 149250,
          lastMaintenanceKm: 148100,
          crew: ['Dr. Siqueira', 'Enf. Ramos'],
          incidentCount: 2
        }
      },
      {
        id: 'BRAVO-01',
        name: 'USB Bravo 01',
        type: 'USB',
        status: 'deslocamento',
        coordinates: [-48.501, -27.571],
        address: 'BR-101 km 205 sentido Norte',
        destination: 'Hospital São Lucas',
        eta: '07 min',
        lastUpdate: 'há 25s',
        image: '/images/ambulances/ambulance-exterior-1.jpg',
        interiorImage: '/images/ambulances/ambulance-interior-4.jpg',
        telemetry: {
          speed: 68,
          rpm: 3100,
          fuel: 54,
          temperature: 92,
          odometer: 186120,
          lastMaintenanceKm: 185200,
          crew: ['Enf. Silva', 'Téc. Costa', 'Cond. Lima'],
          incidentCount: 0
        }
      },
      {
        id: 'CHARLIE-01',
        name: 'Resgate Charlie 01',
        type: 'Resgate',
        status: 'livre',
        coordinates: [-48.663, -27.640],
        address: 'Base Palhoça - Centro',
        lastUpdate: 'há 45s',
        image: '/images/ambulances/ambulance-exterior-1.jpg',
        interiorImage: '/images/ambulances/ambulance-interior-1.jpg',
        telemetry: {
          speed: 0,
          rpm: 0,
          fuel: 76,
          temperature: 32,
          odometer: 98450,
          lastMaintenanceKm: 97800,
          crew: ['Bombeiro Santos', 'Bombeiro Oliveira'],
          incidentCount: 1
        }
      },
      {
        id: 'DELTA-01',
        name: 'Suporte Delta 01',
        type: 'Suporte',
        status: 'em_atendimento',
        coordinates: [-48.485, -27.605],
        address: 'Rua das Palmeiras, 450 - Centro',
        destination: 'UPA Norte',
        eta: '03 min',
        lastUpdate: 'há 12s',
        image: '/images/ambulances/ambulance-exterior-1.jpg',
        interiorImage: '/images/ambulances/ambulance-interior-2.jpg',
        telemetry: {
          speed: 35,
          rpm: 2200,
          fuel: 68,
          temperature: 88,
          odometer: 125680,
          lastMaintenanceKm: 124900,
          crew: ['Téc. Ferreira', 'Cond. Almeida'],
          incidentCount: 0
        }
      }
    ],
    insights: [
      { id: 'insight-1', title: 'Concentração na Zona Norte', description: '4 ambulâncias ativas na região Norte devido a evento esportivo', severity: 'atencao' },
      { id: 'insight-2', title: 'Tempo de Resposta Otimizado', description: 'Redução de 15% no tempo médio nas últimas 4 horas', severity: 'estavel' },
      { id: 'insight-3', title: 'Manutenção Preventiva', description: 'ALFA-04 retornará ao serviço em 2 horas após revisão', severity: 'estavel' }
    ],
    notes: [
      'Clique em qualquer ambulância no mapa para ver detalhes completos do atendimento',
      'Dados atualizados automaticamente a cada 15 segundos via GPS/OBD',
      'Cores indicam status: Verde (livre), Amarelo (deslocamento), Vermelho (atendimento), Cinza (indisponível)'
    ]
  },
  insightsIa: {
    key: 'insightsIa',
    title: 'Insights de IA e Diagnóstico Assistido',
    subtitle: 'Causas raiz, previsões e recomendações automatizadas para gestão executiva.',
    gradient: { from: 'from-indigo-500/30', to: 'to-slate-900' },
    tags: ['Explainable AI', 'Forecasting', 'Storytelling'],
    metrics: [
      { id: 'kpi-impacto', title: 'Impacto IA (últimos 30 dias)', value: 'R$ 382 mil', variation: '+18%', trend: 'up', icon: 'brain', severity: 'estavel', description: 'Economia estimada (SLA + glosa + frota)' },
      { id: 'kpi-acuracia', title: 'Acurácia previsões SLA', value: '92%', variation: '+3pp', trend: 'up', icon: 'gauge', severity: 'estavel', description: 'MAPE 8% • modelo híbrido LSTM + Uplift' },
      { id: 'kpi-execucao', title: 'Playbooks executados', value: '37', variation: '+9', trend: 'up', icon: 'clipboard', severity: 'atencao', description: '72% automáticos, 28% com aprovação humana' },
      { id: 'kpi-satisfacao', title: 'Satisfação dos gestores', value: '4.8/5', variation: '+0.2', trend: 'up', icon: 'users', severity: 'estavel', description: 'Pesquisa interna mensal' }
    ],
    insights: [
      { id: 'ia-1', title: 'Glosas correlacionadas a campo clínico', description: 'Modelo identificou que 63% das glosas residuais possuem ausência de dor→analgesia. Sugere reforçar microtreino com equipe noturna.', severity: 'grave' },
      { id: 'ia-2', title: 'Pico de demanda previsto para sábado', description: 'Weather API + histórico projetam aumento de 14% em traumas leves devido a evento esportivo; recomenda ampliar cobertura Base Centro.', severity: 'atencao' },
      { id: 'ia-3', title: 'Custo/km otimizado pela IA', description: 'Rotas recalculadas reduziram 11% de combustível em 10 dias, mantendo SLA dentro da meta.', severity: 'estavel' }
    ],
    charts: [
      {
        id: 'chart-glosa-ai',
        title: 'Probabilidade de glosa por contrato',
        type: 'bar',
        data: [
          { contrato: 'Samaritanos', prob: 0.12 },
          { contrato: 'Vida Plena', prob: 0.08 },
          { contrato: 'Município SC', prob: 0.17 },
          { contrato: 'Atlas Saúde', prob: 0.05 }
        ],
        xKey: 'contrato',
        bars: [
          { dataKey: 'prob', name: 'Probabilidade', color: '#f97316' }
        ],
        unit: '%'
      },
      {
        id: 'chart-impacto',
        title: 'Impacto financeiro mensal das recomendações IA',
        type: 'area',
        data: [
          { mes: 'Jan', impacto: 210 },
          { mes: 'Fev', impacto: 260 },
          { mes: 'Mar', impacto: 310 },
          { mes: 'Abr', impacto: 340 },
          { mes: 'Mai', impacto: 360 },
          { mes: 'Jun', impacto: 382 }
        ],
        xKey: 'mes',
        areas: [
          { dataKey: 'impacto', name: 'Economia (mil R$)', color: '#22c55e', fillOpacity: 0.3 }
        ]
      }
    ],
    notes: [
      'Explicabilidade fornecida via SHAP e narrativas executivas.',
      'Modelos hospedados em MCP AI-Cluster com monitoramento de deriva.'
    ]
  },
  oraculo: {
    key: 'oraculo',
    title: 'Oráculo APH – Automação Prescritiva',
    subtitle: 'Playbooks executáveis que orquestram equipes, frota, faturamento e compliance.',
    gradient: { from: 'from-amber-500/30', to: 'to-slate-900' },
    tags: ['Resolver pra mim', 'Automação segura'],
    metrics: [
      { id: 'pb-ativos', title: 'Playbooks ativos', value: '12', variation: '+3', trend: 'up', icon: 'zap', severity: 'grave', description: '6 SLA, 3 Financeiro, 2 Frota, 1 LGPD' },
      { id: 'pb-execucao', title: 'Tempo médio de execução', value: '4m32s', variation: '-41s', trend: 'up', icon: 'target', severity: 'estavel', description: 'Da abertura à conclusão com comprovação' },
      { id: 'pb-ROI', title: 'ROI médio projetado', value: '312%', variation: '+38pp', trend: 'up', icon: 'dollar-sign', severity: 'estavel', description: 'Base IA + monitoramento real' }
    ],
    alerts: [
      {
        id: 'oraculo-prioridade',
        title: 'Fila de solicitações do Oráculo',
        description: '3 pedidos aguardando aprovação financeira (> R$ 50k).',
        metric: '3 planos aguardando CFO',
        action: 'Priorizar plano “SLA São José” e “Ruptura Midazolam”.',
        severity: 'grave'
      }
    ],
    playbooks: [
      {
        id: 'oraculo-1',
        title: 'SLA Zona Norte 18-22h',
        impact: '+9% SLA | -15% penalidades',
        actions: [
          'Realocar UTI Alfa 05 para Base Norte',
          'Enviar microtreino push sobre despacho protocolo trote',
          'Notificar contratante com storytelling automático'
        ],
        owner: 'COO',
        status: 'executando',
        severity: 'grave'
      },
      {
        id: 'oraculo-2',
        title: 'Pré-auditoria contrato VitaSaúde',
        impact: 'R$ 112 mil recuperados',
        actions: [
          'Bloquear contas com ausência de CID x procedimento',
          'Coletar evidências ECG e assinatura digital',
          'Gerar dossiê PDF e enviar via portal contratante'
        ],
        owner: 'Financeiro',
        status: 'concluido',
        severity: 'estavel'
      },
      {
        id: 'oraculo-3',
        title: 'Manutenção preditiva UTI-09',
        impact: 'Disponibilidade +4% | Risco falha -80%',
        actions: [
          'Abrir OS automática em oficina credenciada',
          'Reposicionar reserva USB-11 para cobertura',
          'Reagendar escala de equipe Alfa 02'
        ],
        owner: 'Frota',
        status: 'planejado',
        severity: 'atencao'
      }
    ],
    timeline: [
      { id: 'tl-1', timestamp: '09:15', label: 'Playbook SLA Zona Norte iniciado', detail: 'Oráculo disparou notificações e replanejou frota.', severity: 'grave' },
      { id: 'tl-2', timestamp: '09:17', label: 'Aprovação automática', detail: 'Critérios cumpridos, execução automática autorizada.', severity: 'estavel' },
      { id: 'tl-3', timestamp: '09:20', label: 'Reposicionamento concluído', detail: 'Ambulância Alfa 05 em nova base, ETA recalculada.', severity: 'estavel' }
    ],
    oraculoScenarios: [
      {
        id: 'scenario-sla-sao-jose',
        title: 'Por que o SLA de São José caiu ontem?',
        question: 'Explique os motivos do SLA em São José ter ficado em 88% e o que posso fazer agora.',
        diagnosis: 'Acidente na BR-101 + equipe Alfa 07 em manutenção geraram filas > 16 min entre 18h-22h.',
        impact: 'Risco de multa contratual de R$ 58 mil e reclamação do contratante municipal.',
        evidences: [
          'Mapa de calor mostra saturação 120% na zona Norte 18h-22h',
          'Telemetria indica USB-03 parada 32 minutos em trânsito',
          'Checklist revela ausência de viatura reserva em São José'
        ],
        risk: 'Perda de SLA por 3 noites consecutivas leva a auditoria contratual.',
        recommendations: [
          'Redistribuir UTI Alfa 05 para base São José às 17h temporariamente',
          'Ativar microtreino “Despacho congestionamento BR-101” para equipe de regulação',
          'Comunicar contratante sobre plano nas próximas 2h'
        ],
        plan: {
          objective: 'Restaurar SLA > 92% em 48h e reduzir risco de multa.',
          deliverables: [
            'Viatura reserva posicionada 17h-23h por 5 dias',
            'Checklist de prontidão atualizado com telemetria em tempo real',
            'Relatório executivo enviado ao contratante'
          ],
          responsible: 'COO + Supervisora de Regulação',
          deadline: '48 horas',
          successMetric: 'SLA P90 ≥ 92% nos próximos 3 turnos',
          residualRisk: 'Baixo — demanda atípica controlada com plano de contingência'
        },
        nextSteps: [
          'Aprovar realocação de frota e horas extras (CFO em 30 min).',
          'Notificar hospital parceiro para rota preferencial.',
          'Rever mapa de cobertura e atualizar geofences no Mapbox.'
        ],
        severity: 'grave'
      },
      {
        id: 'scenario-midazolam',
        title: 'Ruptura iminente de Midazolam',
        question: 'Estamos com estoque crítico de Midazolam nas UTIs móveis. O que fazer?',
        diagnosis: 'Consumo 25% acima do previsto em Florianópolis + atraso de fornecedor 48h.',
        impact: 'Risco de não atendimento a protocolos sedativos em 3 bases e glosa clínica.',
        evidences: [
          'Cobertura atual 18h (mínimo 36h)',
          '2 ocorrências sem registro de reposição pós atendimento',
          'Fornecedor principal informou atraso via API MCP Procurement'
        ],
        risk: 'Alta — suspensão de atendimento avançado e penalidade contratual.',
        recommendations: [
          'Realocar estoque de Chapecó e Joinville para Florianópolis e Itajaí',
          'Emitir pedido emergencial com fornecedor backup',
          'Auditar consumo e reforçar checklist de dispensação'
        ],
        plan: {
          objective: 'Restaurar cobertura ≥ 48h em todas as bases em 24h.',
          deliverables: [
            'Pedido emergencial aprovado e enviado',
            'Logística planejada via MCP em 6h',
            'Checklist digital atualizado com trava de dupla checagem'
          ],
          responsible: 'Farmácia + Logística',
          deadline: '24 horas',
          successMetric: 'Cobertura ≥ 48h e zero ruptura registrada',
          residualRisk: 'Moderado — dependência de transporte aéreo backup'
        },
        nextSteps: [
          'Aprovar orçamento extra (R$ 18 mil).',
          'Acionar frota reserva para transporte refrigerado.',
          'Agendar auditoria de consumo em 3 dias.'
        ],
        severity: 'critico'
      },
      {
        id: 'scenario-glosa-remocao',
        title: 'Glosas 15% em remoção eletiva',
        question: 'Como reduzir a glosa de remoção eletiva que atingiu 15% este mês?',
        diagnosis: 'Fichas com ausência de assinatura digital e evidência fotográfica insuficiente.',
        impact: 'Perda financeira mensal estimada em R$ 74 mil e risco de auditoria contratual.',
        evidences: [
          '18 contas com ausência de CID/procedimento coerente',
          '8 ocorrências sem foto de embarque',
          'Tempo porta-hospital não registrado em 12 casos'
        ],
        risk: 'Médio — repetição pode levar a retenção de pagamentos.',
        recommendations: [
          'Ativar bloqueio no app para contas sem anexos críticos',
          'Treinamento relâmpago 15 min com equipes eletivas',
          'Habilitar upload automático de fotos via MCP Media'
        ],
        plan: {
          objective: 'Reduzir glosa eletiva para < 5% em 30 dias.',
          deliverables: [
            'Workflow de pré-auditoria com checklist obrigatório',
            'Dossiê com evidências disponibilizado ao financeiro',
            'Dashboard de acompanhamento diário'
          ],
          responsible: 'Financeiro + Qualidade + TI',
          deadline: '30 dias',
          successMetric: 'Glosa ≤ 5% e recuperação R$ 74 mil',
          residualRisk: 'Baixo — depende de adesão das equipes ao novo fluxo'
        },
        nextSteps: [
          'Configurar bloqueio no app APH ainda hoje.',
          'Gerar lista das contas críticas e notificar faturamento.',
          'Agendar revisão com o contratante em 15 dias.'
        ],
        severity: 'atencao'
      }
    ],
    notes: [
      'Toda sequência registrada com trilha de auditoria imutável.',
      'Aprovações obrigatórias quando impacto financeiro > R$ 50 mil.'
    ]
  },
  catalogo: {
    key: 'catalogo',
    title: 'Catálogo Operacional & Escopo ANJOSDAVIDA',
    subtitle: 'Serviços contratados, SLAs e cobertura por cidade para planejamento de expansão.',
    gradient: { from: 'from-slate-500/25', to: 'to-slate-900' },
    tags: ['Portfólio', 'ESG', 'SLA'],
    metrics: [
      { id: 'cidades', title: 'Cidades atendidas', value: '10', variation: '+2 (2024)', trend: 'up', icon: 'map', severity: 'estavel' },
      { id: 'servicos', title: 'Serviços ativos', value: '10', variation: '+3', trend: 'up', icon: 'clipboard', severity: 'estavel' },
      { id: 'contratos-sla', title: 'Contratos com SLA ≥ 95%', value: '8/10', variation: '+1', trend: 'up', icon: 'check-circle', severity: 'atencao' }
    ],
    catalog: {
      sections: [
        {
          title: 'Portfólio de Serviços APH',
          description: 'Cada serviço possui tarifário, protocolos clínicos, KPIs e requisitos de equipe/equipamentos.',
          entries: [
            {
              name: 'APH Emergencial 24/7',
              description: 'Cobertura para chamadas 192/193 e privado com equipes ALS/BLS.',
              sla: 'SLA P90 12 min (urbano) • 18 min (rodovia)',
              kpis: ['Tempo chamada→despacho', 'Door-to-door', 'Eventos sentinela']
            },
            {
              name: 'UTI Móvel Adulto/Pediátrica/Neonatal',
              description: 'Transferências críticas com suporte médico especializado e telemedicina.',
              sla: 'Ativação ≤ 20 min',
              kpis: ['Checklist pré-embarque', 'Porta-agulha', 'Completude prontuário']
            },
            {
              name: 'Remoção Inter-Hospitalar',
              description: 'Eletivas e urgentes com integração hospitalar e evidências antifraude.',
              sla: 'Janela agendada ±15 min',
              kpis: ['Glosa evitável', 'NPS contratante', 'Assinatura digital']
            },
            {
              name: 'Atendimento Domiciliar',
              description: 'Home care curta complexidade com protocolos e estoque dedicado.',
              sla: 'Visita ≤ 2h após abertura',
              kpis: ['Aderência plano terapêutico', 'Ruptura insumos', 'Reinternação 72h']
            },
            {
              name: 'Cobertura de Eventos',
              description: 'Planejamento de risco, rotas e equipes on-site com integração ao War Room.',
              sla: 'Plano aprovado D-15',
              kpis: ['Incidentes atendidos no local', 'Tempo resposta', 'Satisfação organizador']
            },
            {
              name: 'Transporte Eletivo Programado',
              description: 'Hemodiálise, radioterapia e consultas com agendamento inteligente.',
              sla: 'Pontualidade ≥ 95%',
              kpis: ['No-show paciente', 'Tempo espera pós atendimento', 'Glosa eletiva']
            },
            {
              name: 'Resgate em Rodovias',
              description: 'Cobertura para concessionárias e PRF com integração meteorológica.',
              sla: 'Chegada ≤ 15 min',
              kpis: ['Tempo cena', 'Incidentes por tipo', 'Coordenação com órgãos']
            },
            {
              name: 'Resgate Aquático/Áreas de Risco',
              description: 'Operações em litoral e áreas remotas com equipes especializadas.',
              sla: 'Resposta ≤ 20 min',
              kpis: ['Equipamentos críticos disponíveis', 'Safety briefing', 'Incidentes']
            },
            {
              name: 'Telemedicina de Regulação',
              description: 'Suporte clínico síncrono e assíncrono para protocolo e checklist.',
              sla: 'Tempo triagem ≤ 4 min',
              kpis: ['Casos resolvidos sem deslocamento', 'Satisfação equipe campo', 'Redução de glosa clínica']
            },
            {
              name: 'Suporte Intermunicipal',
              description: 'Acordos de contingência e back-up entre municípios.',
              sla: 'Plano ativado ≤ 30 min',
              kpis: ['Tempo resposta backup', 'Custos repassados', 'Incidentes logísticos']
            }
          ]
        }
      ],
      cities: [
        {
          name: 'Florianópolis',
          population: '516k hab',
          demandProfile: 'Maior volume de ocorrências vermelhas, eventos e turismo.',
          contractedServices: ['APH 24/7', 'UTI Móvel', 'Eventos', 'Telemedicina'],
          slaFocus: 'SLA urbano 12 min, atendimento bilíngue verão.'
        },
        {
          name: 'São José',
          population: '250k hab',
          demandProfile: 'Corredor industrial + BR-101, alto trânsito.',
          contractedServices: ['APH 24/7', 'Remoção', 'Eventos'],
          slaFocus: 'Reforço pós 18h, integração rodovia.'
        },
        {
          name: 'Palhoça',
          population: '217k hab',
          demandProfile: 'Zonas rurais e ilhas; sazonalidade turismo.',
          contractedServices: ['APH 24/7', 'Resgate aquático'],
          slaFocus: 'Cobertura costeira e ilhas (geofencing Mapbox).'
        },
        {
          name: 'Balneário Camboriú',
          population: '149k hab',
          demandProfile: 'Eventos, turismo, picos noturnos.',
          contractedServices: ['Eventos', 'UTI móvel', 'Telemedicina'],
          slaFocus: 'Planos verão, integração com concessionárias.'
        },
        {
          name: 'Joinville',
          population: '607k hab',
          demandProfile: 'Maior volume eletivo e industrial.',
          contractedServices: ['Remoção', 'Transporte eletivo', 'Home care'],
          slaFocus: 'Pontualidade eletiva, glosa zero.'
        }
      ]
    },
    notes: [
      'Cidades adicionais podem ser configuradas via CMS, mantendo KPIs e SLAs parametrizados.',
      'Contrato mestre contém tarifários, regras de faturamento e indicadores críticos por serviço.'
    ]
  },
  despachoRegulacao: {
    key: 'despachoRegulacao',
    title: 'Despacho & Regulação Inteligente',
    subtitle: 'Algoritmos de roteirização, priorização e aderência a protocolos clínicos.',
    gradient: { from: 'from-blue-500/30', to: 'to-slate-900' },
    metrics: [
      { id: 'despacho-sla', title: 'Tempo médio chamada→despacho', value: '2m48s', variation: '-32s', trend: 'up', icon: 'target', severity: 'estavel' },
      { id: 'despacho-primeira', title: 'Acurácia 1ª alocação', value: '94%', variation: '+2pp', trend: 'up', icon: 'activity', severity: 'estavel' },
      { id: 'despacho-reabertura', title: 'Reatribuições por dia', value: '5', variation: '-3', trend: 'down', icon: 'clipboard', severity: 'estavel' }
    ],
    charts: [
      {
        id: 'chart-reatribuicoes',
        title: 'Motivos de reatribuição (últimos 14 dias)',
        type: 'bar',
        data: [
          { motivo: 'Trânsito', quantidade: 9 },
          { motivo: 'Hospital fechado', quantidade: 4 },
          { motivo: 'Falha veículo', quantidade: 3 },
          { motivo: 'Escala', quantidade: 2 }
        ],
        xKey: 'motivo',
        bars: [
          { dataKey: 'quantidade', name: 'Ocorrências', color: '#6366f1' }
        ]
      },
      {
        id: 'chart-dispatch',
        title: 'Distribuição de ocorrências por criticidade',
        type: 'area',
        data: [
          { hora: '00h', prioridadeA: 9, prioridadeB: 12, prioridadeC: 6 },
          { hora: '06h', prioridadeA: 18, prioridadeB: 24, prioridadeC: 11 },
          { hora: '12h', prioridadeA: 27, prioridadeB: 34, prioridadeC: 16 },
          { hora: '18h', prioridadeA: 35, prioridadeB: 38, prioridadeC: 21 },
          { hora: '24h', prioridadeA: 14, prioridadeB: 19, prioridadeC: 8 }
        ],
        xKey: 'hora',
        areas: [
          { dataKey: 'prioridadeA', name: 'Prioridade A', color: '#ef4444', fillOpacity: 0.25 },
          { dataKey: 'prioridadeB', name: 'Prioridade B', color: '#f97316', fillOpacity: 0.2 },
          { dataKey: 'prioridadeC', name: 'Prioridade C', color: '#22c55e', fillOpacity: 0.15 }
        ]
      }
    ],
    table: {
      title: 'Checklist de aderência a protocolo (últimas 10 ocorrências vermelhas)',
      headers: ['Ocorrência', 'Protocolo', 'Checklist', 'Hospital destino', 'Tempo cena'],
      rows: [
        ['#98231', 'AVC', '100%', 'Hospital São Lucas', '21m'],
        ['#98232', 'Trauma', '97%', 'Hospital Municipal', '18m'],
        ['#98233', 'IAM', '100%', 'Hospital Vida', '23m'],
        ['#98234', 'Politrauma', '95%', 'Hospital Norte', '25m'],
        ['#98235', 'AVC', '100%', 'Hospital São Lucas', '20m']
      ]
    },
    notes: [
      'Integração CAD ↔ MCP com latência média de 700ms.',
      'Checklist clínico impede fechamento sem campos críticos (assinatura digital, CID, analgesia).' 
    ]
  },
  heatmapCobertura: {
    key: 'heatmapCobertura',
    title: 'Heatmap & Cobertura Operacional',
    subtitle: 'Visualização geoespacial com telemetria, clima e incidentes críticos.',
    gradient: { from: 'from-teal-500/30', to: 'to-slate-900' },
    metrics: [
      { id: 'km-cobertura', title: 'Raio médio cobertura', value: '7.8 km', variation: '-0.4 km', trend: 'up', icon: 'map', severity: 'estavel' },
      { id: 'zonas-alerta', title: 'Zonas em alerta', value: '3', variation: '+1', trend: 'down', icon: 'shield-alert', severity: 'grave' },
      { id: 'ambulancias-mov', title: 'Ambulâncias em movimento', value: '14', variation: '+2', trend: 'up', icon: 'ambulance', severity: 'estavel' }
    ],
    heatmap: {
      title: 'Índice de ocupação por área operacional',
      periods: ['05-11h', '11-17h', '17-23h', '23-05h'],
      rows: [
        {
          label: 'Zona Centro',
          cells: [
            { period: '05-11h', value: 78, severity: 'estavel' },
            { period: '11-17h', value: 88, severity: 'grave' },
            { period: '17-23h', value: 95, severity: 'critico' },
            { period: '23-05h', value: 64, severity: 'estavel' }
          ]
        },
        {
          label: 'Zona Norte',
          cells: [
            { period: '05-11h', value: 84, severity: 'grave' },
            { period: '11-17h', value: 91, severity: 'grave' },
            { period: '17-23h', value: 98, severity: 'critico' },
            { period: '23-05h', value: 71, severity: 'atencao' }
          ]
        },
        {
          label: 'Zona Sul',
          cells: [
            { period: '05-11h', value: 69, severity: 'estavel' },
            { period: '11-17h', value: 77, severity: 'estavel' },
            { period: '17-23h', value: 82, severity: 'atencao' },
            { period: '23-05h', value: 58, severity: 'estavel' }
          ]
        }
      ]
    },
    insights: [
      { id: 'hm-1', title: 'Cobertura sugerida', description: 'Oráculo recomenda deslocar USB-03 para Zona Norte das 16h às 22h (+3% SLA).', severity: 'grave' },
      { id: 'hm-2', title: 'Integração vídeo', description: 'Câmeras internas disponíveis em 18 unidades; 4 streams com alerta de movimentação anômala.', severity: 'atencao' }
    ]
  },
  playbooksOperacionais: {
    key: 'playbooksOperacionais',
    title: 'Playbooks Operacionais',
    subtitle: 'Planos estruturados para incidentes recorrentes com métricas de eficácia.',
    gradient: { from: 'from-emerald-500/25', to: 'to-slate-900' },
    metrics: [
      { id: 'pb-sucesso', title: 'Taxa de sucesso', value: '91%', variation: '+4pp', trend: 'up', icon: 'check-circle', severity: 'estavel' },
      { id: 'pb-tempo', title: 'Tempo médio de conclusão', value: '5m12s', variation: '-38s', trend: 'up', icon: 'target', severity: 'estavel' },
      { id: 'pb-economia', title: 'Economia média por playbook', value: 'R$ 28 mil', variation: '+12%', trend: 'up', icon: 'dollar-sign', severity: 'estavel' }
    ],
    playbooks: [
      {
        id: 'pb-sla',
        title: 'SLA em risco por trânsito',
        impact: '+6% SLA • -9% multas',
        actions: ['Ativar rota alternativa MCP', 'Reforçar equipe motolância', 'Enviar push para contratante'],
        owner: 'Operações',
        status: 'concluido',
        severity: 'grave'
      },
      {
        id: 'pb-glosa',
        title: 'Glosa clínica iminente',
        impact: 'R$ 74k protegido',
        actions: ['Checklist automático', 'Solicitar assinatura digital', 'Reprocessar lote TUSS'],
        owner: 'Financeiro',
        status: 'executando',
        severity: 'atencao'
      },
      {
        id: 'pb-lgpd',
        title: 'Alerta LGPD exportação massiva',
        impact: 'Bloqueio preventivo | Incidente fechado em 7m',
        actions: ['Bloquear usuário', 'Abrir incidente DPO', 'Revisar perfis IAM'],
        owner: 'Segurança',
        status: 'concluido',
        severity: 'critico'
      }
    ],
    notes: ['Playbooks versionados, com owner, SLA interno e auditoria automatizada.']
  },
  frotaTelemetria: {
    key: 'frotaTelemetria',
    title: 'Frota & Telemetria',
    subtitle: 'Monitoramento de veículos, condução segura e indicadores de manutenção.',
    gradient: { from: 'from-cyan-500/30', to: 'to-slate-900' },
    metrics: [
      { id: 'utilizacao-frota', title: 'Utilização frota (produtiva)', value: '82%', variation: '+5pp', trend: 'up', icon: 'ambulance', severity: 'estavel' },
      { id: 'incidentes-direcao', title: 'Incidentes de direção/1.000 km', value: '3.1', variation: '-0.8', trend: 'up', icon: 'shield', severity: 'grave' },
      { id: 'consumo', title: 'Consumo médio combustível', value: '4,9 km/l', variation: '+0,4', trend: 'up', icon: 'gauge', severity: 'estavel' }
    ],
    charts: [
      {
        id: 'chart-frota',
        title: 'Utilização por tipo de viatura',
        type: 'bar',
        data: frotaUtilizacao,
        xKey: 'turno',
        bars: [
          { dataKey: 'uti', name: 'UTI', color: '#ef4444' },
          { dataKey: 'usb', name: 'USB', color: '#f59e0b' },
          { dataKey: 'suporte', name: 'Suporte', color: '#22c55e' }
        ]
      },
      {
        id: 'chart-telemetria',
        title: 'Alertas telemetria (últimos 7 dias)',
        type: 'line',
        data: [
          { dia: 'Seg', frenagem: 14, curva: 8, velocidade: 3 },
          { dia: 'Ter', frenagem: 11, curva: 7, velocidade: 2 },
          { dia: 'Qua', frenagem: 9, curva: 5, velocidade: 1 },
          { dia: 'Qui', frenagem: 12, curva: 6, velocidade: 3 },
          { dia: 'Sex', frenagem: 15, curva: 9, velocidade: 4 },
          { dia: 'Sáb', frenagem: 8, curva: 4, velocidade: 1 },
          { dia: 'Dom', frenagem: 6, curva: 3, velocidade: 0 }
        ],
        xKey: 'dia',
        lines: [
          { dataKey: 'frenagem', name: 'Frenagens bruscas', color: '#f97316' },
          { dataKey: 'curva', name: 'Curvas agressivas', color: '#3b82f6' },
          { dataKey: 'velocidade', name: 'Velocidade excedida', color: '#ef4444' }
        ]
      }
    ],
    notes: [
      'Sensores OBD-II → MCP Telemetry com latência 1.8s.',
      'Alertas acionam coaching individual e bloqueiam escala se reincidência.'
    ]
  },
  manutencaoPreditiva: {
    key: 'manutencaoPreditiva',
    title: 'Manutenção Preditiva',
    subtitle: 'Detecção antecipada de falhas e planejamento automático de ordens de serviço.',
    gradient: { from: 'from-lime-500/25', to: 'to-slate-900' },
    metrics: [
      { id: 'falha-prevista', title: 'Falhas previstas (7 dias)', value: '3', variation: '-2', trend: 'down', icon: 'refresh', severity: 'atencao' },
      { id: 'os-automatica', title: 'OS automáticas abertas', value: '9', variation: '+3', trend: 'up', icon: 'clipboard', severity: 'grave' },
      { id: 'disponibilidade', title: 'Disponibilidade frota', value: '98,4%', variation: '+0,5pp', trend: 'up', icon: 'ambulance', severity: 'estavel' }
    ],
    charts: [
      {
        id: 'chart-manutencao',
        title: 'Preventivas x corretivas por semana',
        type: 'composed',
        data: manuntencaoTrend,
        xKey: 'semana',
        bars: [
          { dataKey: 'previstos', name: 'Preventivas programadas', color: '#22c55e', yAxisId: 'left' },
          { dataKey: 'executados', name: 'Executadas', color: '#0ea5e9', yAxisId: 'left' }
        ],
        lines: [
          { dataKey: 'falhas', name: 'Falhas não planejadas', color: '#ef4444', yAxisId: 'right' }
        ],
        yAxisLeftLabel: 'Ordens de serviço',
        yAxisRightLabel: 'Falhas'
      }
    ],
    table: {
      title: 'Viaturas com alerta em aberto',
      headers: ['Viatura', 'Alerta', 'Prob. falha', 'Ação recomendada', 'Prazo' ],
      rows: [
        ['UTI-09', 'Temperatura motor', '78%', "Trocar bomba d'agua", '12h'],
        ['USB-12', 'Vibração eixo', '66%', 'Balanceamento + pneus', '24h'],
        ['UTI-04', 'Sensor ABS', '41%', 'Checagem cabos', '36h']
      ]
    }
  },
  monitoramentoCameras: {
    key: 'monitoramentoCameras',
    title: 'Monitoramento de Câmeras & Vídeo Inteligente',
    subtitle: 'Streams em tempo real das ambulâncias e bases, com analytics de segurança.',
    gradient: { from: 'from-purple-500/25', to: 'to-slate-900' },
    metrics: [
      { id: 'streams-ativos', title: 'Streams ativos', value: '18', variation: '+4', trend: 'up', icon: 'video', severity: 'estavel' },
      { id: 'eventos-video', title: 'Eventos críticos 24h', value: '5', variation: '-2', trend: 'down', icon: 'shield-alert', severity: 'grave' },
      { id: 'latencia-video', title: 'Latência média streaming', value: '1.9s', variation: '-0.3s', trend: 'up', icon: 'gauge', severity: 'estavel' }
    ],
    notes: [
      'Mosaic interativo com thumbnails 4K e replay instantâneo (últimos 30 minutos).',
      'Detecção automática: ausência de EPI, deslocamento sem cinto, movimentação anômala em base.'
    ]
  },
  clinicaQualidade: {
    key: 'clinicaQualidade',
    title: 'Clínica & Qualidade Assistencial',
    subtitle: 'Indicadores clínicos críticos, completude de prontuário e eventos adversos.',
    gradient: { from: 'from-rose-400/25', to: 'to-slate-900' },
    metrics: [
      { id: 'completude', title: 'Completude prontuário', value: '97%', variation: '+1pp', trend: 'up', icon: 'stethoscope', severity: 'estavel' },
      { id: 'eventos', title: 'Eventos adversos / 1000 atend.', value: '1.2', variation: '-0.3', trend: 'up', icon: 'shield', severity: 'estavel' },
      { id: 'recontact', title: 'Retorno <72h', value: '3,8%', variation: '-0,9pp', trend: 'up', icon: 'activity', severity: 'atencao' }
    ],
    charts: [
      {
        id: 'chart-qualidade',
        title: 'Tempos críticos clínicos',
        type: 'line',
        data: qualidadeSeries,
        xKey: 'mes',
        lines: [
          { dataKey: 'portaAgulha', name: 'Porta-agulha (min)', color: '#f97316' },
          { dataKey: 'portaBalao', name: 'Porta-balão (min)', color: '#3b82f6' },
          { dataKey: 'analgesia', name: 'Analgesia <30min (%)', color: '#22c55e' }
        ]
      }
    ],
    table: {
      title: 'Auditorias clínicas recentes',
      headers: ['Data', 'Equipe', 'Protocolo', 'Notas', 'Ações corretivas'],
      rows: [
        ['05/06', 'Alfa 02', 'Trauma', 'Checklist incompleto (02)', 'Microtreino finalizado'],
        ['07/06', 'Bravo 05', 'AVC', 'Tempo porta-agulha 58m', 'Reforço com hospital destino'],
        ['09/06', 'Alfa 03', 'IAM', 'Conforme', '---']
      ]
    }
  },
  protocolos: {
    key: 'protocolos',
    title: 'Protocolos e Auditoria Clínica',
    subtitle: 'Checklist inteligente com bloqueios e recomendações automáticas.',
    gradient: { from: 'from-sky-500/25', to: 'to-slate-900' },
    metrics: [
      { id: 'protocolos-ativos', title: 'Protocolos ativos', value: '26', variation: '+2', trend: 'up', icon: 'clipboard', severity: 'estavel' },
      { id: 'auditorias', title: 'Auditorias concluídas/mês', value: '54', variation: '+8', trend: 'up', icon: 'check-circle', severity: 'estavel' }
    ],
    notes: ['Checklists adaptáveis conforme criticidade e perfil do paciente.']
  },
  educacaoContinuada: {
    key: 'educacaoContinuada',
    title: 'Educação Continuada & Competências',
    subtitle: 'Microtreinos disparados pela IA e trilhas de capacitação.',
    gradient: { from: 'from-violet-500/25', to: 'to-slate-900' },
    metrics: [
      { id: 'microtreinos', title: 'Microtreinos 30 dias', value: '42', variation: '+11', trend: 'up', icon: 'graduation-cap', severity: 'estavel' },
      { id: 'aderencia', title: 'Aderência treinamentos', value: '94%', variation: '+5pp', trend: 'up', icon: 'check-circle', severity: 'estavel' }
    ],
    table: {
      title: 'Próximos treinamentos obrigatórios',
      headers: ['Tema', 'Data', 'Equipe alvo', 'Status'],
      rows: [
        ['Via aérea difícil', '14/06', 'UTI', 'Inscrições abertas'],
        ['LGPD em campo', '17/06', 'Todas', 'Conteúdo liberado'],
        ['Direção defensiva', '22/06', 'Motoristas', 'Confirmado']
      ]
    }
  },
  financeiro: {
    key: 'financeiro',
    title: 'Financeiro & Performance Econômica',
    subtitle: 'Visão de margem, receitas e aging de recebíveis por contrato.',
    gradient: { from: 'from-emerald-500/25', to: 'to-slate-900' },
    metrics: [
      { id: 'receita', title: 'Receita acumulada (30d)', value: 'R$ 5,82M', variation: '+6,1%', trend: 'up', icon: 'dollar-sign', severity: 'estavel' },
      { id: 'margem', title: 'Margem operacional', value: '19,8%', variation: '+1,4pp', trend: 'up', icon: 'bar-chart', severity: 'estavel' },
      { id: 'aging', title: 'Tempo médio de recebimento', value: '33 dias', variation: '-4 dias', trend: 'up', icon: 'clock', severity: 'estavel' }
    ],
    charts: [
      {
        id: 'chart-contratos',
        title: 'Margem por contrato',
        type: 'bar',
        data: contratosSaude,
        xKey: 'contrato',
        bars: [
          { dataKey: 'margem', name: 'Margem %', color: '#22c55e' }
        ]
      },
      {
        id: 'chart-glosas',
        title: 'Glosas x Recuperações',
        type: 'composed',
        data: glosaSeries,
        xKey: 'mes',
        bars: [
          { dataKey: 'conta', name: 'Valor glosado (R$ mi)', color: '#ef4444', yAxisId: 'left' }
        ],
        lines: [
          { dataKey: 'recuperado', name: 'Recuperado (R$ mi)', color: '#22c55e', yAxisId: 'right' }
        ],
        yAxisLeftLabel: 'Glosas',
        yAxisRightLabel: 'Recuperado'
      }
    ]
  },
  antiglosas: {
    key: 'antiglosas',
    title: 'Antiglosas & Contestação',
    subtitle: 'Motor de regras e IA garantindo evidências e fluxo de contestação.',
    gradient: { from: 'from-red-500/25', to: 'to-slate-900' },
    metrics: [
      { id: 'glosa-atual', title: 'Taxa de glosa atual', value: '2,1%', variation: '-0,6pp', trend: 'up', icon: 'shield', severity: 'estavel' },
      { id: 'recuperacao', title: 'Recuperação média', value: 'R$ 186 mil/mês', variation: '+14%', trend: 'up', icon: 'dollar-sign', severity: 'estavel' }
    ],
    insights: [
      { id: 'glosa-insight', title: 'Campos críticos', description: 'Ausência de assinatura digital responde por 38% das glosas residuais.', severity: 'grave' }
    ],
    notes: ['Pré-auditoria impede envio sem anexos obrigatórios e validações TUSS/CBHPM.']
  },
  preAuditoria: {
    key: 'preAuditoria',
    title: 'Pacotes de Evidências & Pré-Auditoria',
    subtitle: 'Checklist automático, geração de dossiês e envio ao portal contratante.',
    gradient: { from: 'from-slate-500/25', to: 'to-slate-900' },
    metrics: [
      { id: 'pacotes', title: 'Pacotes gerados (30d)', value: '312', variation: '+36', trend: 'up', icon: 'file-text', severity: 'estavel' },
      { id: 'tempo-geracao', title: 'Tempo médio geração', value: '1m42s', variation: '-18s', trend: 'up', icon: 'target', severity: 'estavel' }
    ],
    notes: ['PDF com assinatura digital, hash e QR code para validação pública.']
  },
  portalContratante: {
    key: 'portalContratante',
    title: 'Portal do Contratante',
    subtitle: 'Transparência total com indicadores, storytelling e download auditável.',
    gradient: { from: 'from-blue-400/25', to: 'to-slate-900' },
    metrics: [
      { id: 'acessos', title: 'Acessos contratantes (30d)', value: '142', variation: '+27%', trend: 'up', icon: 'users', severity: 'estavel' },
      { id: 'relatorios', title: 'Relatórios baixados', value: '89', variation: '+12%', trend: 'up', icon: 'file-text', severity: 'estavel' }
    ],
    notes: ['Relatórios com marca d’água, expiração e trilha de download.']
  },
  storytelling: {
    key: 'storytelling',
    title: 'Storytelling & NPS',
    subtitle: 'Narrativas de valor para renovação contratual e satisfação do cliente.',
    gradient: { from: 'from-pink-400/20', to: 'to-slate-900' },
    metrics: [
      { id: 'nps', title: 'NPS contratante', value: '78', variation: '+6 pts', trend: 'up', icon: 'newspaper', severity: 'estavel' },
      { id: 'casos', title: 'Casos emblemáticos documentados', value: '12', variation: '+4', trend: 'up', icon: 'clipboard', severity: 'estavel' }
    ]
  },
  relatorios: {
    key: 'relatorios',
    title: 'Relatórios Executivos',
    subtitle: 'Pacote mensal com storytelling, KPIs e ROI por contrato.',
    gradient: { from: 'from-indigo-400/20', to: 'to-slate-900' },
    metrics: [
      { id: 'relatorios-pontuais', title: 'Relatórios entregues no prazo', value: '100%', variation: '+2pp', trend: 'up', icon: 'bar-chart', severity: 'estavel' }
    ],
    notes: ['Geração automática com validação humana opcional antes do envio.']
  },
  governancaLgpd: {
    key: 'governancaLgpd',
    title: 'Governança & LGPD',
    subtitle: 'Controles de acesso, auditorias e mitigação de riscos regulatórios.',
    gradient: { from: 'from-gray-500/25', to: 'to-slate-900' },
    metrics: [
      { id: 'incidentes', title: 'Incidentes de segurança', value: '0', variation: '-1', trend: 'down', icon: 'shield-alert', severity: 'estavel' },
      { id: 'auditorias', title: 'Auditorias concluídas', value: '6', variation: '+2', trend: 'up', icon: 'scale', severity: 'estavel' }
    ],
    timeline: [
      { id: 'lgpd-1', timestamp: '08:30', label: 'Auditoria acesso concluída', detail: 'Nenhuma inconsistência encontrada.', severity: 'estavel' },
      { id: 'lgpd-2', timestamp: '09:10', label: 'Exportação massiva bloqueada', detail: 'Usuário sem permissão tentou exportar 5k registros.', severity: 'grave' }
    ]
  },
  integracoes: {
    key: 'integracoes',
    title: 'Integrações & MCP',
    subtitle: 'Catálogo de integrações com monitoramento de SLA e latência.',
    gradient: { from: 'from-green-400/20', to: 'to-slate-900' },
    metrics: [
      { id: 'integracoes-ativas', title: 'Integrações ativas', value: '24', variation: '+3', trend: 'up', icon: 'globe', severity: 'estavel' },
      { id: 'falhas', title: 'Falhas últimas 24h', value: '1', variation: '-2', trend: 'down', icon: 'shield', severity: 'estavel' }
    ],
    integrations: [
      { id: 'int-1', name: 'CAD Municipal', provider: 'Pref. Florianópolis', status: 'ativo', latency: '0.7s', lastSync: 'agora', notes: 'Webhooks + fallback polling' },
      { id: 'int-2', name: 'Hospitais (HL7)', provider: 'Rede Santa Catarina', status: 'instavel', latency: '1.9s', lastSync: 'há 12 min', notes: 'MCP em modo retry' },
      { id: 'int-3', name: 'Operadora Saúde Vida+', provider: 'Vida+', status: 'ativo', latency: '1.2s', lastSync: 'há 2 min' },
      { id: 'int-4', name: 'Telemetria OBD', provider: 'MCP Telematics', status: 'ativo', latency: '1.0s', lastSync: 'agora' }
    ]
  },
  compliance: {
    key: 'compliance',
    title: 'Compliance & Auditoria',
    subtitle: 'Planos de ação regulatórios, controles internos e evidências.',
    gradient: { from: 'from-yellow-400/20', to: 'to-slate-900' },
    metrics: [
      { id: 'planos', title: 'Planos de compliance ativos', value: '5', variation: '0', trend: 'neutral', icon: 'scale', severity: 'atencao' },
      { id: 'pendencias', title: 'Pendências regulatórias', value: '1', variation: '-2', trend: 'up', icon: 'shield', severity: 'estavel' }
    ],
    notes: ['Relatórios LGPD e ANS disponíveis em 2 cliques com evidências anexadas.']
  }
};

export default aphPagesConfig;
