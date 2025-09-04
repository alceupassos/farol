
import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

// Sample data for detail charts (moved from QoLSectionContentRenderer)
const detailedLineData = Array.from({length: 30}, (_, i) => ({ name: `D-${29-i}`, value: Math.floor(Math.random() * 5) + 1}));
const detailedBarData = Array.from({length: 12}, (_, i) => ({ name: `M${i+1}`, value: Math.floor(Math.random() * 30) + 60 }));

export const renderDetailChartPlaceholder = (chartType: "Line" | "Bar" | "Trend" = "Line", height = 240): JSX.Element => {
  let data;
  let ChartComponent;
  switch(chartType) {
      case "Bar":
          data = detailedBarData;
          ChartComponent = (
              <BarChart data={data} margin={{ top: 20, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" fontSize={10} />
                  <YAxis fontSize={10} />
                  <RechartsTooltip />
                  <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
          );
          break;
      case "Trend": // Similar to AdditionalAspectCard's chart
           data = Array.from({ length: 6 }, (_, i) => ({ name: `M${i+1}`, score: Math.floor(Math.random() * 4) + 6 }));
           ChartComponent = (
              <BarChart data={data} margin={{ top: 20, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                  <XAxis dataKey="name" fontSize={10} />
                  <YAxis fontSize={10} domain={[0,10]}/>
                  <RechartsTooltip />
                  <Bar dataKey="score" fill="#82ca9d" barSize={20} />
              </BarChart>
           );
          break;
      case "Line":
      default:
          data = detailedLineData;
          ChartComponent = (
              <LineChart data={data} margin={{ top: 20, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" fontSize={10} />
                  <YAxis fontSize={10} />
                  <RechartsTooltip />
                  <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 6 }} dot={{r:2}} />
              </LineChart>
          );
          break;
  }
  return (
      <ResponsiveContainer width="100%" height={height}>
          {ChartComponent}
      </ResponsiveContainer>
  );
};
