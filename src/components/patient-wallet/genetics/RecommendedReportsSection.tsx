
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Report {
  id: string;
  title: string;
  icon: JSX.Element;
  content: string;
  graphs: string;
  explanations: string;
  sources?: string[];
}

interface RecommendedReportsSectionProps {
  reports: Report[];
}

const RecommendedReportsSection: React.FC<RecommendedReportsSectionProps> = ({ reports }) => (
  <section>
    <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Relatórios Genéticos Recomendados</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {reports.map((report) => (
        <Card key={report.id} className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              {report.icon}
              {report.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow space-y-3">
            <div>
              <h4 className="font-semibold text-sm text-gray-700 dark:text-gray-300">Conteúdo:</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">{report.content}</p>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-gray-700 dark:text-gray-300">Gráficos Sugeridos:</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">{report.graphs}</p>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-gray-700 dark:text-gray-300">Explicações:</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">{report.explanations}</p>
            </div>
            {report.sources && (
              <div className="text-xs text-gray-500 dark:text-gray-500 pt-2 border-t border-gray-200 dark:border-gray-700">
                Fontes: {report.sources.join(', ')}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  </section>
);

export default RecommendedReportsSection;
