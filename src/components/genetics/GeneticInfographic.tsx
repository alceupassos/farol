
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { 
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
  LabelList,
  Legend,
  Tooltip
} from 'recharts';
import { Dna } from 'lucide-react';

interface GeneticConceptData {
  name: string;
  value: number;
  info: string;
  color?: string;
}

interface GeneticInfographicProps {
  title: string;
  description: string;
  data: GeneticConceptData[];
  type: 'allele' | 'risk' | 'genotype';
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        <p className="font-semibold">{data.name}</p>
        <p className="text-sm mt-1">{data.info}</p>
      </div>
    );
  }
  return null;
};

const GeneticInfographic: React.FC<GeneticInfographicProps> = ({
  title,
  description,
  data,
  type
}) => {
  // Choose different visualizations based on the type
  const renderVisualization = () => {
    switch(type) {
      case 'allele':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              layout="vertical"
            >
              <XAxis type="number" domain={[0, 100]} />
              <YAxis dataKey="name" type="category" width={100} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="value" name="Frequência (%)">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color || `#${((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0')}`} />
                ))}
                <LabelList dataKey="value" position="right" formatter={(value: number) => `${value}%`} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        );
        
      case 'risk':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis dataKey="name" />
              <YAxis domain={[0, 'dataMax + 1']} label={{ value: 'Risco Relativo', angle: -90, position: 'insideLeft' }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="value" name="Risco Relativo">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color || (entry.value > 1 ? '#ff6b6b' : '#4ecdc4')} />
                ))}
                <LabelList dataKey="value" position="top" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        );
        
      case 'genotype':
        return (
          <div className="flex flex-col items-center justify-center space-y-6 py-4">
            <div className="flex justify-center items-center space-x-12">
              {data.map((item, index) => (
                <div 
                  key={index} 
                  className="flex flex-col items-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 shadow-sm"
                >
                  <Dna size={36} className={item.color || "text-purple-500"} />
                  <div className="mt-3 font-semibold">{item.name}</div>
                  <div className="mt-1 text-sm text-center">{item.info}</div>
                </div>
              ))}
            </div>
            <div className="text-center max-w-lg">
              <p className="text-sm">{description}</p>
            </div>
          </div>
        );
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <h3 className="font-semibold text-lg mb-4">{title}</h3>
        {renderVisualization()}
      </CardContent>
    </Card>
  );
};

export default GeneticInfographic;
