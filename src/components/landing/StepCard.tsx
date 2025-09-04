import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface StepCardProps {
  icon: LucideIcon;
  number: string;
  title: string;
  description: string;
  benefit: string;
  color: string;
  delay?: number;
}

const StepCard: React.FC<StepCardProps> = ({
  icon: Icon,
  number,
  title,
  description,
  benefit,
  color,
  delay = 0
}) => {
  return (
    <Card 
      className="glass-card hover:scale-105 transition-all duration-500 group relative overflow-hidden"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
      
      <CardContent className="p-8 relative z-10">
        {/* Number Badge */}
        <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
          {number}
        </div>

        {/* Icon */}
        <div className="mb-6">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Icon className="h-8 w-8 text-primary group-hover:text-white transition-colors duration-300" />
          </div>
        </div>

        {/* Content */}
        <h4 className="text-xl font-bold mb-3 group-hover:text-white transition-colors duration-300">
          {title}
        </h4>
        
        <p className="text-muted-foreground mb-4 group-hover:text-white/90 transition-colors duration-300">
          {description}
        </p>

        {/* Benefit Badge */}
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 border border-primary/20 group-hover:bg-white/20 group-hover:border-white/30 transition-all duration-300">
          <span className="text-sm font-medium text-primary group-hover:text-white">
            ✓ {benefit}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default StepCard;