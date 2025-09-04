
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface SummaryCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  color?: string;
  change?: {
    value: string | number;
    isPositive: boolean;
  };
  link?: {
    url: string;
    text: string;
  };
  className?: string;
}

const SummaryCard = ({
  title,
  value,
  subtitle,
  icon,
  color = 'bg-medical',
  change,
  link,
  className
}: SummaryCardProps) => {
  return (
    <div className={cn("glass-card rounded-xl p-5", className)}>
      <div className="flex items-start justify-between mb-4">
        <div className={cn("p-2 rounded-lg", color)}>
          {icon}
        </div>
        
        {change && (
          <div className={cn(
            "flex items-center text-xs font-medium px-2 py-1 rounded-full",
            change.isPositive ? "text-green-400 bg-green-900/30" : "text-red-400 bg-red-900/30"
          )}>
            <span className="mr-1">{change.isPositive ? '+' : '-'}{change.value}</span>
            <span>
              {change.isPositive ? (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 4L12 8L11.3 8.7L8.5 5.9V12H7.5V5.9L4.7 8.7L4 8L8 4Z" fill="currentColor" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 12L4 8L4.7 7.3L7.5 10.1V4H8.5V10.1L11.3 7.3L12 8L8 12Z" fill="currentColor" />
                </svg>
              )}
            </span>
          </div>
        )}
      </div>
      
      <h3 className="text-lg font-medium text-gray-200">{title}</h3>
      
      <div className="mt-2">
        <div className="text-3xl font-semibold">{value}</div>
        {subtitle && <p className="text-sm text-gray-400 mt-1">{subtitle}</p>}
      </div>
      
      {link && (
        <Link 
          to={link.url} 
          className="mt-4 inline-flex items-center text-sm text-primary font-medium hover:underline"
        >
          {link.text}
          <ArrowRight size={14} className="ml-1" />
        </Link>
      )}
    </div>
  );
};

export default SummaryCard;
