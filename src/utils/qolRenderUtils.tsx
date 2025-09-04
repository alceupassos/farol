
import React from 'react';
import { TrendingUp, TrendingDown, Minus, ArrowUp, ArrowDown, ArrowRight, Smile, Meh, Frown } from 'lucide-react';

export const renderTrendIcon = (trend: 'up' | 'down' | 'stable', size: number = 32): React.ReactNode => {
  if (trend === 'up') return <TrendingUp style={{height: size, width: size}} className="inline text-green-500 ml-2" />;
  if (trend === 'down') return <TrendingDown style={{height: size, width: size}} className="inline text-red-500 ml-2" />;
  return <Minus style={{height: size, width: size}} className="inline text-gray-500 ml-2" />;
};
  
export const renderSmallTrendIcon = (trend: 'up' | 'down' | 'stable'): React.ReactNode => {
  if (trend === 'up') return <ArrowUp size={16} className="inline text-green-500 ml-1" />;
  if (trend === 'down') return <ArrowDown size={16} className="inline text-red-500 ml-1" />;
  return <ArrowRight size={16} className="inline text-gray-500 ml-1" />;
};

export const renderMoodIcon = (mood: 'good' | 'neutral' | 'bad'): React.ReactNode => {
  if (mood === 'good') return <Smile className="h-8 w-8 text-green-500 mr-2" />;
  if (mood === 'neutral') return <Meh className="h-8 w-8 text-yellow-500 mr-2" />;
  return <Frown className="h-8 w-8 text-red-500 mr-2" />;
};

