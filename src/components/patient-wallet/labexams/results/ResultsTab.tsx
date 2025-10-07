
import { TrendingUp } from 'lucide-react';
import { LabExam, LabExamGroup } from '../types';
import StatusIndicator from './StatusIndicator';
import ReferenceIndicator from './ReferenceIndicator';
import ExamDocument from './ExamDocument';

interface ResultsTabProps {
  exam: LabExam;
}

const ResultsTab = ({ exam }: ResultsTabProps) => {
  return (
    <div className="space-y-6">
      <ExamDocument imageUrl={exam.imageUrl} />
      
      {exam.groups.map((group, index) => (
        <div key={index} className="space-y-3">
          <h3 className="text-lg font-medium">{group.name}</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b text-left text-muted-foreground text-sm">
                  <th className="py-2 px-3 font-medium">Parâmetro</th>
                  <th className="py-2 px-3 font-medium">Resultado</th>
                  <th className="py-2 px-3 font-medium">Referência</th>
                  <th className="py-2 px-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {group.parameters.map((parameter, paramIndex) => (
                  <tr key={paramIndex} className="border-b">
                    <td className="py-3 px-3 align-top">
                      <div className="font-medium">{parameter.name}</div>
                      {parameter.description && <div className="text-xs text-muted-foreground mt-1">{parameter.description}</div>}
                    </td>
                    <td className="py-3 px-3 align-top">
                      <div className="flex gap-1 items-center font-medium">
                        {parameter.value} {parameter.unit}
                        {parameter.trend && parameter.trend === 'up' && (
                          <TrendingUp className="h-3.5 w-3.5 text-red-500" />
                        )}
                        {parameter.trend && parameter.trend === 'down' && (
                          <TrendingUp className="h-3.5 w-3.5 text-blue-500 rotate-180" />
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-3 align-top text-muted-foreground">
                      {parameter.referenceRange}
                    </td>
                    <td className="py-3 px-3 align-top">
                      <StatusIndicator status={parameter.status} />
                      <ReferenceIndicator parameter={parameter} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResultsTab;
