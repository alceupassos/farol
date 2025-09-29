import React, { useMemo, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import { AphPageConfig, AphSeverity } from '@/modules/aph/types';
import { getAphIcon } from './iconMap';
import AphRealtimeMap from './AphRealtimeMap';
import AphCameraWall from './AphCameraWall';
import AphAmbulanceCockpit from './AphAmbulanceCockpit';

const severityStyles: Record<AphSeverity, { badge: string; bg: string; text: string; border: string }> = {
  critico: {
    badge: 'Crítico',
    bg: 'bg-rose-600/20',
    text: 'text-rose-100',
    border: 'border-rose-500/40'
  },
  grave: {
    badge: 'Grave',
    bg: 'bg-amber-500/20',
    text: 'text-amber-100',
    border: 'border-amber-500/40'
  },
  atencao: {
    badge: 'Atenção',
    bg: 'bg-yellow-400/20',
    text: 'text-yellow-900',
    border: 'border-yellow-400/40'
  },
  estavel: {
    badge: 'Estável',
    bg: 'bg-emerald-500/20',
    text: 'text-emerald-100',
    border: 'border-emerald-400/40'
  }
};

interface AphPageRendererProps {
  config: AphPageConfig;
}

const AphPageRenderer: React.FC<AphPageRendererProps> = ({ config }) => {
  const [selectedAmbulanceId, setSelectedAmbulanceId] = useState<string | null>(null);
  const selectedAmbulance = useMemo(
    () => config.ambulances?.find((amb) => amb.id === selectedAmbulanceId) ?? null,
    [config.ambulances, selectedAmbulanceId]
  );

  return (
    <div className={`min-h-screen space-y-8 bg-slate-950 px-6 py-8 text-slate-100 ${config.gradient.from} ${config.gradient.to} bg-[length:400%_400%]` }>
      <header className="space-y-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl space-y-2">
            <h1 className="text-3xl font-bold text-white">{config.title}</h1>
            <p className="text-sm text-slate-300">{config.subtitle}</p>
            {config.heroTagline && (
              <p className="text-xs uppercase tracking-wider text-emerald-300">{config.heroTagline}</p>
            )}
          </div>
          {config.tags && config.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {config.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="border-emerald-400 text-emerald-200">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </header>

      {config.metrics.length > 0 && (
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {config.metrics.map((metric) => {
            const severity = severityStyles[metric.severity];
            const Icon = getAphIcon(metric.icon);
            return (
              <Card
                key={metric.id}
                className={`relative overflow-hidden border ${severity.border} bg-slate-950/80 backdrop-blur-md`}
              >
                <div className={`absolute inset-0 -z-10 bg-gradient-to-br ${severity.bg}`} />
                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
                  <div>
                    <CardTitle className={`text-sm font-medium ${severity.text}`}>{metric.title}</CardTitle>
                    {metric.description && (
                      <CardDescription className="text-xs text-white/70 max-w-[220px]">
                        {metric.description}
                      </CardDescription>
                    )}
                  </div>
                  <Badge className="bg-black/40 text-[10px] uppercase tracking-wide text-white">
                    {severity.badge}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-3xl font-semibold leading-tight ${severity.text}`}>{metric.value}</p>
                      <p className="text-xs text-white/80">{metric.variation}</p>
                    </div>
                    <div className="rounded-full bg-black/40 p-2 text-white/80">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </section>
      )}

      {config.alerts && config.alerts.length > 0 && (
        <section className="grid gap-4 md:grid-cols-3">
          {config.alerts.map((alert) => {
            const severity = severityStyles[alert.severity];
            return (
              <Card key={alert.id} className={`border ${severity.border} bg-slate-900/70`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className={`text-sm font-semibold ${severity.text}`}>{alert.title}</CardTitle>
                    <Badge className="bg-black/40 text-[10px] uppercase tracking-wide text-white">
                      {severity.badge}
                    </Badge>
                  </div>
                  {alert.metric && (
                    <CardDescription className="text-xs text-slate-300">{alert.metric}</CardDescription>
                  )}
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-white/80 leading-relaxed">{alert.description}</p>
                  {alert.action && (
                    <div className="rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-xs text-emerald-200">
                      {alert.action}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </section>
      )}

      {config.map && config.ambulances && (
        <section className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
            <AphRealtimeMap
              mapConfig={config.map}
              ambulances={config.ambulances}
              onSelect={(amb) => setSelectedAmbulanceId(amb?.id ?? null)}
            />
            <AphAmbulanceCockpit ambulance={selectedAmbulance ?? config.ambulances[0] ?? null} />
          </div>
          
          {/* Galeria de Ambulâncias */}
          <Card className="border-slate-800 bg-slate-900/70">
            <CardHeader>
              <CardTitle className="text-white">Galeria da Frota</CardTitle>
              <CardDescription className="text-slate-400">
                Imagens das ambulâncias em operação
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {config.ambulances
                  .filter(amb => amb.image || amb.interiorImage)
                  .map((ambulance) => (
                    <div key={ambulance.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold text-white">{ambulance.name}</h4>
                        <Badge className={`text-xs ${
                          ambulance.status === 'livre' ? 'bg-emerald-500/20 text-emerald-100 border-emerald-500/40' :
                          ambulance.status === 'deslocamento' ? 'bg-sky-500/20 text-sky-100 border-sky-500/40' :
                          ambulance.status === 'em_atendimento' ? 'bg-rose-500/20 text-rose-100 border-rose-500/40' :
                          'bg-slate-500/20 text-slate-100 border-slate-500/40'
                        }`}>
                          {ambulance.status.replace('_', ' ')}
                        </Badge>
                      </div>
                      {ambulance.interiorImage && (
                        <img 
                          src={ambulance.interiorImage} 
                          alt={`Interior da ${ambulance.name}`}
                          className="w-full h-24 object-cover rounded-lg border border-slate-700 cursor-pointer hover:border-slate-600 transition-colors"
                          onClick={() => setSelectedAmbulanceId(ambulance.id)}
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      )}
                      <p className="text-xs text-slate-400">{ambulance.address}</p>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      {config.cameraWall && config.cameraWall.length > 0 && (
        <AphCameraWall feeds={config.cameraWall} />
      )}

      {config.charts && config.charts.length > 0 && (
        <section className="grid gap-4 xl:grid-cols-2">
          {config.charts.map((chart) => (
            <Card key={chart.id} className="border-slate-800 bg-slate-900/70">
              <CardHeader>
                <CardTitle className="text-white">{chart.title}</CardTitle>
                {chart.subtitle && (
                  <CardDescription className="text-slate-400">{chart.subtitle}</CardDescription>
                )}
              </CardHeader>
              <CardContent className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  {chart.type === 'area' && (
                    <AreaChart data={chart.data}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                      <XAxis dataKey={chart.xKey} stroke="#64748b" />
                      <YAxis stroke="#64748b" />
                      <Tooltip />
                      <Legend />
                      {chart.areas?.map((area) => (
                        <Area
                          key={area.dataKey}
                          type={area.type ?? 'monotone'}
                          dataKey={area.dataKey}
                          name={area.name}
                          stroke={area.color}
                          fill={area.color}
                          fillOpacity={area.fillOpacity ?? 0.3}
                        />
                      ))}
                    </AreaChart>
                  )}
                  {chart.type === 'line' && (
                    <LineChart data={chart.data}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                      <XAxis dataKey={chart.xKey} stroke="#64748b" />
                      <YAxis stroke="#64748b" />
                      <Tooltip />
                      <Legend />
                      {chart.lines?.map((line) => (
                        <Line
                          key={line.dataKey}
                          type={line.type ?? 'monotone'}
                          dataKey={line.dataKey}
                          name={line.name}
                          stroke={line.color}
                          strokeWidth={2}
                          dot={false}
                        />
                      ))}
                    </LineChart>
                  )}
                  {chart.type === 'bar' && (
                    <BarChart data={chart.data}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                      <XAxis dataKey={chart.xKey} stroke="#64748b" />
                      <YAxis stroke="#64748b" />
                      <Tooltip />
                      <Legend />
                      {chart.bars?.map((bar) => (
                        <Bar
                          key={bar.dataKey}
                          dataKey={bar.dataKey}
                          name={bar.name}
                          fill={bar.color}
                          radius={bar.radius ?? [6, 6, 0, 0]}
                        />
                      ))}
                    </BarChart>
                  )}
                  {chart.type === 'composed' && (
                    <ComposedChart data={chart.data}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                      <XAxis dataKey={chart.xKey} stroke="#64748b" />
                      <YAxis yAxisId="left" stroke="#64748b" label={chart.yAxisLeftLabel ? { value: chart.yAxisLeftLabel, angle: -90, position: 'insideLeft', fill: '#cbd5f5', fontSize: 11 } : undefined} />
                      <YAxis yAxisId="right" orientation="right" stroke="#64748b" label={chart.yAxisRightLabel ? { value: chart.yAxisRightLabel, angle: 90, position: 'insideRight', fill: '#cbd5f5', fontSize: 11 } : undefined} />
                      <Tooltip />
                      <Legend />
                      {chart.bars?.map((bar) => (
                        <Bar
                          key={bar.dataKey}
                          yAxisId={bar.yAxisId ?? 'left'}
                          dataKey={bar.dataKey}
                          name={bar.name}
                          fill={bar.color}
                          radius={bar.radius ?? [6, 6, 0, 0]}
                        />
                      ))}
                      {chart.lines?.map((line) => (
                        <Line
                          key={line.dataKey}
                          yAxisId={line.yAxisId ?? 'right'}
                          type={line.type ?? 'monotone'}
                          dataKey={line.dataKey}
                          name={line.name}
                          stroke={line.color}
                          strokeWidth={2}
                          dot={false}
                        />
                      ))}
                    </ComposedChart>
                  )}
                </ResponsiveContainer>
              </CardContent>
            </Card>
          ))}
        </section>
      )}

      {config.heatmap && (
        <section>
          <Card className="border-slate-800 bg-slate-900/70">
            <CardHeader>
              <CardTitle className="text-white">{config.heatmap.title}</CardTitle>
              {config.heatmap.description && (
                <CardDescription className="text-slate-400">
                  {config.heatmap.description}
                </CardDescription>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              <div className={`grid gap-2 ${config.heatmap.periods.length > 4 ? 'grid-cols-[200px_repeat(4,minmax(0,1fr))]' : `grid-cols-[200px_repeat(${config.heatmap.periods.length},minmax(0,1fr))]`}`}>
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-300">Base / Período</div>
                {config.heatmap.periods.map((period) => (
                  <div key={period} className="text-center text-xs font-semibold uppercase tracking-wide text-slate-300">
                    {period}
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                {config.heatmap.rows.map((row) => (
                  <div key={row.label} className={`grid gap-2 ${config.heatmap.periods.length > 4 ? 'grid-cols-[200px_repeat(4,minmax(0,1fr))]' : `grid-cols-[200px_repeat(${config.heatmap.periods.length},minmax(0,1fr))]`}`}>
                    <div className="flex items-center text-sm font-medium text-white">{row.label}</div>
                    {config.heatmap.periods.map((period) => {
                      const cell = row.cells.find((item) => item.period === period);
                      if (!cell) {
                        return (
                          <div key={`${row.label}-${period}`} className="rounded-lg border border-slate-800/60 bg-slate-900/60 p-3 text-center text-xs text-slate-500">
                            —
                          </div>
                        );
                      }
                      const severity = severityStyles[cell.severity];
                      return (
                        <div
                          key={`${row.label}-${period}`}
                          className={`rounded-lg border p-3 text-center text-sm font-semibold ${severity.bg} ${severity.text} ${severity.border}`}
                        >
                          {cell.value}%
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      {config.insights && config.insights.length > 0 && (
        <section className="grid gap-4 md:grid-cols-2">
          {config.insights.map((insight) => {
            const severity = severityStyles[insight.severity];
            return (
              <Card key={insight.id} className={`border ${severity.border} bg-slate-900/70`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className={`text-sm font-semibold ${severity.text}`}>{insight.title}</CardTitle>
                    <Badge className="bg-black/40 text-[10px] uppercase tracking-wide text-white">
                      {severity.badge}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-white/80 leading-relaxed">{insight.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </section>
      )}

      {config.playbooks && config.playbooks.length > 0 && (
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {config.playbooks.map((playbook) => {
            const severity = severityStyles[playbook.severity];
            return (
              <Card key={playbook.id} className={`border ${severity.border} bg-slate-900/70`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className={`text-sm font-semibold ${severity.text}`}>{playbook.title}</CardTitle>
                    <Badge className="bg-black/40 text-[10px] uppercase tracking-wide text-white">
                      {severity.badge}
                    </Badge>
                  </div>
                  <CardDescription className="text-xs text-slate-400">Impacto: {playbook.impact}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <ul className="space-y-1 text-xs text-white/80">
                    {playbook.actions.map((action) => (
                      <li key={action} className="flex gap-2">
                        <span className="text-emerald-300">•</span>
                        <span>{action}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-[11px] uppercase tracking-wide text-slate-400">Owner: {playbook.owner} • Status: {playbook.status}</p>
                </CardContent>
              </Card>
            );
          })}
        </section>
      )}

      {config.catalog && (
        <section className="grid gap-4 lg:grid-cols-2">
          {config.catalog.sections.map((section) => (
            <Card key={section.title} className="border-slate-800 bg-slate-900/70">
              <CardHeader>
                <CardTitle className="text-white">{section.title}</CardTitle>
                {section.description && (
                  <CardDescription className="text-slate-400">{section.description}</CardDescription>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                {section.entries.map((entry) => (
                  <div key={entry.name} className="rounded-lg border border-slate-800/60 bg-slate-900/60 p-4 space-y-2">
                    <div className="flex items-start justify-between gap-4">
                      <p className="text-sm font-semibold text-white">{entry.name}</p>
                      <Badge variant="outline" className="border-emerald-400 text-emerald-200">
                        {entry.sla}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{entry.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {entry.kpis.map((kpi) => (
                        <Badge key={kpi} className="bg-slate-800/70 text-[11px] font-normal">
                          {kpi}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}

          <Card className="border-slate-800 bg-slate-900/70">
            <CardHeader>
              <CardTitle className="text-white">Cobertura por cidade</CardTitle>
              <CardDescription className="text-slate-400">
                Dados base para planejamento operacional e expansão contratual.
              </CardDescription>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="text-xs uppercase tracking-wide text-slate-400">
                  <tr className="border-b border-slate-800">
                    <th className="px-4 pb-2">Cidade</th>
                    <th className="px-4 pb-2">População</th>
                    <th className="px-4 pb-2">Perfil de demanda</th>
                    <th className="px-4 pb-2">Serviços contratados</th>
                    <th className="px-4 pb-2">Foco SLA</th>
                  </tr>
                </thead>
                <tbody>
                  {config.catalog.cities.map((city) => (
                    <tr key={city.name} className="border-b border-slate-800/60 align-top">
                      <td className="px-4 py-3 font-medium text-white/90">{city.name}</td>
                      <td className="px-4 py-3 text-slate-300">{city.population}</td>
                      <td className="px-4 py-3 text-slate-300">{city.demandProfile}</td>
                      <td className="px-4 py-3 text-slate-300">
                        <ul className="space-y-1 text-xs">
                          {city.contractedServices.map((service) => (
                            <li key={service}>• {service}</li>
                          ))}
                        </ul>
                      </td>
                      <td className="px-4 py-3 text-slate-300">{city.slaFocus}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </section>
      )}

      {config.oraculoScenarios && config.oraculoScenarios.length > 0 && (
        <section className="space-y-4">
          {config.oraculoScenarios.map((scenario) => {
            const severity = severityStyles[scenario.severity];
            return (
              <Card key={scenario.id} className={`border ${severity.border} bg-slate-900/70`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className={`text-base font-semibold ${severity.text}`}>{scenario.title}</CardTitle>
                    <Badge className="bg-black/40 text-[10px] uppercase tracking-wide text-white">
                      {severity.badge}
                    </Badge>
                  </div>
                  <CardDescription className="text-slate-400">{scenario.question}</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-3">
                    <div className="rounded-lg border border-slate-800/60 bg-slate-900/60 p-3">
                      <p className="text-xs uppercase tracking-wide text-slate-400">Diagnóstico</p>
                      <p className="text-sm text-white/80 leading-relaxed">{scenario.diagnosis}</p>
                    </div>
                    <div className="rounded-lg border border-slate-800/60 bg-slate-900/60 p-3">
                      <p className="text-xs uppercase tracking-wide text-slate-400">Impacto</p>
                      <p className="text-sm text-white/80 leading-relaxed">{scenario.impact}</p>
                    </div>
                    <div className="rounded-lg border border-slate-800/60 bg-slate-900/60 p-3">
                      <p className="text-xs uppercase tracking-wide text-slate-400">Risco</p>
                      <p className="text-sm text-white/80 leading-relaxed">{scenario.risk}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="rounded-lg border border-slate-800/60 bg-slate-900/60 p-3">
                      <p className="text-xs uppercase tracking-wide text-slate-400">Evidências</p>
                      <ul className="mt-2 space-y-1 text-sm text-white/80">
                        {scenario.evidences.map((evidence) => (
                          <li key={evidence} className="flex gap-2">
                            <span className="text-emerald-300">•</span>
                            <span>{evidence}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-lg border border-slate-800/60 bg-slate-900/60 p-3">
                      <p className="text-xs uppercase tracking-wide text-slate-400">Recomendações imediatas</p>
                      <ul className="mt-2 space-y-1 text-sm text-white/80">
                        {scenario.recommendations.map((rec) => (
                          <li key={rec} className="flex gap-2">
                            <span className="text-emerald-300">•</span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="space-y-3 md:col-span-2">
                    <div className="rounded-lg border border-slate-800/60 bg-slate-900/60 p-4">
                      <p className="text-xs uppercase tracking-wide text-slate-400">Plano de ação sugerido</p>
                      <div className="mt-2 grid gap-3 md:grid-cols-2">
                        <div className="space-y-2">
                          <p className="text-sm font-semibold text-white">Objetivo</p>
                          <p className="text-sm text-white/80">{scenario.plan.objective}</p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm font-semibold text-white">Responsáveis & Prazo</p>
                          <p className="text-sm text-white/80">{scenario.plan.responsible} • {scenario.plan.deadline}</p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm font-semibold text-white">Entregáveis</p>
                          <ul className="text-sm text-white/80 space-y-1">
                            {scenario.plan.deliverables.map((deliverable) => (
                              <li key={deliverable}>• {deliverable}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm font-semibold text-white">Sucesso & Risco residual</p>
                          <p className="text-sm text-white/80">KPI: {scenario.plan.successMetric}</p>
                          <p className="text-sm text-white/80">Risco: {scenario.plan.residualRisk}</p>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4">
                      <p className="text-xs uppercase tracking-wide text-emerald-200">Próximos passos automáticos</p>
                      <ul className="mt-2 space-y-1 text-sm text-emerald-100">
                        {scenario.nextSteps.map((step) => (
                          <li key={step}>• {step}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </section>
      )}

      {config.integrations && (
        <section>
          <Card className="border-slate-800 bg-slate-900/70">
            <CardHeader>
              <CardTitle className="text-white">Catálogo de integrações</CardTitle>
              <CardDescription className="text-slate-400">
                Monitoramento de SLA, latência e última sincronização.
              </CardDescription>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="text-xs uppercase tracking-wide text-slate-400">
                  <tr className="border-b border-slate-800">
                    <th className="px-4 pb-2">Integração</th>
                    <th className="px-4 pb-2">Fornecedor</th>
                    <th className="px-4 pb-2">Status</th>
                    <th className="px-4 pb-2">Latência</th>
                    <th className="px-4 pb-2">Último sync</th>
                    <th className="px-4 pb-2">Notas</th>
                  </tr>
                </thead>
                <tbody>
                  {config.integrations.map((integration) => (
                    <tr key={integration.id} className="border-b border-slate-800/60">
                      <td className="px-4 py-3 text-white/90">{integration.name}</td>
                      <td className="px-4 py-3 text-slate-300">{integration.provider}</td>
                      <td className="px-4 py-3">
                        <Badge
                          className={
                            integration.status === 'ativo'
                              ? 'bg-emerald-500/30 text-emerald-100'
                              : integration.status === 'instavel'
                                ? 'bg-amber-500/30 text-amber-100'
                                : 'bg-rose-500/30 text-rose-100'
                          }
                        >
                          {integration.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-slate-300">{integration.latency}</td>
                      <td className="px-4 py-3 text-slate-300">{integration.lastSync}</td>
                      <td className="px-4 py-3 text-slate-300">{integration.notes ?? '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </section>
      )}

      {config.table && (
        <section>
          <Card className="border-slate-800 bg-slate-900/70">
            <CardHeader>
              <CardTitle className="text-white">{config.table.title}</CardTitle>
              {config.table.description && (
                <CardDescription className="text-slate-400">{config.table.description}</CardDescription>
              )}
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="text-xs uppercase tracking-wide text-slate-400">
                  <tr className="border-b border-slate-800">
                    {config.table.headers.map((header) => (
                      <th key={header} className="px-4 pb-2">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {config.table.rows.map((row, idx) => (
                    <tr key={idx} className="border-b border-slate-800/60">
                      {row.map((cell, cellIdx) => (
                        <td key={`${idx}-${cellIdx}`} className="px-4 py-3 text-slate-200">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </section>
      )}

      {config.timeline && (
        <section>
          <Card className="border-slate-800 bg-slate-900/70">
            <CardHeader>
              <CardTitle className="text-white">Linha do tempo operacional</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {config.timeline.map((event) => {
                const severity = severityStyles[event.severity];
                return (
                  <div key={event.id} className={`rounded-lg border ${severity.border} bg-slate-900/60 p-4`}>
                    <div className="flex items-center justify-between">
                      <p className={`text-sm font-semibold ${severity.text}`}>{event.label}</p>
                      <span className="text-xs text-slate-400">{event.timestamp}</span>
                    </div>
                    <p className="mt-2 text-xs text-slate-200">{event.detail}</p>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </section>
      )}

      {config.notes && config.notes.length > 0 && (
        <section>
          <Card className="border-slate-800 bg-slate-900/70">
            <CardHeader>
              <CardTitle className="text-white">Observações</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-slate-300">
                {config.notes.map((note) => (
                  <li key={note} className="flex gap-2">
                    <span className="text-emerald-300">•</span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>
      )}
    </div>
  );
};

export default AphPageRenderer;
