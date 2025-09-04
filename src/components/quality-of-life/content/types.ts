
import React from 'react';

export interface QoLSection {
  id: string;
  name: string;
  icon: React.ReactNode;
  tooltip: string;
}

export interface DomainDataItem { 
  name: string; 
  score: string; 
  objective: string; 
  trendIcon: React.ReactNode; 
  tooltip: string; 
}

export interface AdditionalAspectItem { 
  name: string; 
  score: string; 
  trend: 'up' | 'down' | 'stable'; 
  tooltip: string; 
}

export interface ObjectiveWearableItem { 
  name: string; 
  value: string; 
  graphType: string; 
  tooltip: string; 
}

export interface AIInsightItem { 
  title: string; 
  text: string; 
  icon: React.ReactNode; 
  tooltip: string; 
}

export type RenderDetailChartPlaceholderFn = (chartType?: "Line" | "Bar" | "Trend", height?: number) => JSX.Element;

export type RenderSmallTrendIconFn = (trend: 'up' | 'down' | 'stable') => React.ReactNode;
