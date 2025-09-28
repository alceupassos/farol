import React from 'react';
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
