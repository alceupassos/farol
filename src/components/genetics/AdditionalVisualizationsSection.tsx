
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface GroupedComponentItem {
  component: JSX.Element;
  explanation?: string;
}

interface Visualization {
  title: string;
  description: string;
  icon: JSX.Element;
  component?: JSX.Element;
  explanation?: string;
  groupedComponents?: GroupedComponentItem[]; // Renamed from components
  sources?: string[];
}

interface AdditionalVisualizationsSectionProps {
  visualizations: Visualization[];
}

const AdditionalVisualizationsSection: React.FC<AdditionalVisualizationsSectionProps> = ({ visualizations }) => (
  <section>
    <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Visualizações e Explicações Adicionais</h2>
    <div className="space-y-6">
      {visualizations.map((viz, index) => (
         <Card key={index}>
          <CardHeader>
            <CardTitle className="flex items-center text-md">
              {viz.icon}
              {viz.title}
            </CardTitle>
            <CardDescription>
              {viz.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {viz.component && (
              <>
                {viz.component}
                {viz.explanation && (
                  <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
                    <h4 className="font-semibold text-sm text-purple-600 dark:text-purple-400 mb-1">Entendendo o Gráfico:</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{viz.explanation}</p>
                  </div>
                )}
              </>
            )}
            {viz.groupedComponents && (
              <div className="space-y-8">
                {viz.groupedComponents.map((item, idx) => (
                  <div key={idx} className="mb-6">
                    {item.component}
                    {item.explanation && (
                       <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
                        <h4 className="font-semibold text-sm text-purple-600 dark:text-purple-400 mb-1">Entendendo o Gráfico:</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{item.explanation}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            {viz.sources && (
              <div className="text-xs text-gray-500 dark:text-gray-500 pt-2 mt-4 border-t border-gray-200 dark:border-gray-700">
                Fontes: {viz.sources.join(', ')}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  </section>
);

export default AdditionalVisualizationsSection;
