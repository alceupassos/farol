
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { 
  ResponsiveContainer, 
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  ZAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ReferenceLine
} from 'recharts';

// Interface for the data points
interface ManhattanDataPoint {
  position: number;
  logp: number; // -log10(p-value)
  chromosome: number;
  gene?: string;
  disease?: string;
  size?: number;
  significant?: boolean;
}

interface ManhattanPlotProps {
  title: string;
  data: ManhattanDataPoint[];
  significanceThreshold?: number;
}

// Helper function for generating chromosome colors
const getChromosomeColor = (chromosome: number): string => {
  const colors = [
    '#4285F4', '#EA4335', '#FBBC05', '#34A853',
    '#FF6D01', '#46BDC6', '#7B0099', '#0066C6',
    '#D80000', '#8BC34A', '#9C27B0', '#3F51B5',
    '#00BCD4', '#4CAF50', '#FF9800', '#795548',
    '#607D8B', '#F44336', '#E91E63', '#9E9E9E',
    '#CDDC39', '#FFC107', '#03A9F4',
  ];
  return colors[chromosome % colors.length];
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        <p className="font-semibold">{data.gene || `Variante na posição ${data.position}`}</p>
        <p className="text-sm">Cromossomo: {data.chromosome}</p>
        <p className="text-sm">Posição: {data.position}</p>
        <p className="text-sm">-log10(p): {data.logp.toFixed(4)}</p>
        {data.disease && <p className="text-sm">Doença: {data.disease}</p>}
        {data.significant && <p className="text-sm font-semibold text-red-500">Significativo</p>}
      </div>
    );
  }
  return null;
};

const ManhattanPlot: React.FC<ManhattanPlotProps> = ({ 
  title, 
  data, 
  significanceThreshold = 7.3 // Default genome-wide significance threshold: -log10(5x10^-8)
}) => {
  // Group data by chromosome for coloring
  const groupedByChromosome = data.reduce((acc, point) => {
    if (!acc[point.chromosome]) {
      acc[point.chromosome] = [];
    }
    acc[point.chromosome].push(point);
    return acc;
  }, {} as Record<number, ManhattanDataPoint[]>);

  // Get chromosome numbers in ascending order
  const chromosomeNumbers = Object.keys(groupedByChromosome)
    .map(Number)
    .sort((a, b) => a - b);

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <h3 className="font-semibold text-lg mb-4">{title}</h3>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
              margin={{ top: 20, right: 20, bottom: 40, left: 40 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis 
                type="number"
                dataKey="position"
                name="Posição Genômica"
                domain={['dataMin - 1000000', 'dataMax + 1000000']}
                label={{ 
                  value: 'Posição no Cromossomo (Mb)', 
                  position: 'insideBottomRight', 
                  offset: -10,
                  fontSize: 12
                }}
                tickFormatter={(value) => `${(value / 1000000).toFixed(1)}`}
              />
              <YAxis
                type="number"
                dataKey="logp"
                name="-log10(p-valor)"
                domain={[0, 'dataMax + 1']}
                label={{ 
                  value: '-log10(p-valor)', 
                  angle: -90, 
                  position: 'insideLeft',
                  fontSize: 12
                }}
              />
              <ZAxis 
                type="number"
                dataKey="size"
                range={[20, 100]}
                domain={[0, 10]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                verticalAlign="top"
                payload={chromosomeNumbers.map(chr => ({
                  value: `Chr ${chr}`,
                  type: 'circle',
                  color: getChromosomeColor(chr),
                }))}
                wrapperStyle={{ paddingBottom: 10 }}
              />
              <ReferenceLine 
                y={significanceThreshold} 
                stroke="red" 
                strokeDasharray="3 3"
                label={{ 
                  value: `Limiar de significância (p=5x10^-8)`, 
                  position: 'right', 
                  fill: 'red',
                  fontSize: 11
                }}
              />
              {chromosomeNumbers.map(chr => (
                <Scatter
                  key={`chr-${chr}`}
                  name={`Cromossomo ${chr}`}
                  data={groupedByChromosome[chr]}
                  fill={getChromosomeColor(chr)}
                  shape="circle"
                  line={false}
                />
              ))}
            </ScatterChart>
          </ResponsiveContainer>
          <div className="text-xs text-muted-foreground text-center mt-2">
            * Gráfico Manhattan mostrando associações genéticas. Pontos acima da linha vermelha são estatisticamente significativos.
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ManhattanPlot;
