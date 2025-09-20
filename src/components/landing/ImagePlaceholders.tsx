import React from 'react';
import { 
  Network, 
  Activity, 
  Brain, 
  BarChart3, 
  TrendingUp, 
  Database 
} from 'lucide-react';

interface PlaceholderImageProps {
  type: 'network' | 'laboratory' | 'radiology' | 'business' | 'revenue' | 'analytics';
  className?: string;
  alt: string;
}

const PlaceholderImage: React.FC<PlaceholderImageProps> = ({ type, className = '', alt }) => {
  const configs = {
    network: {
      icon: Network,
      gradient: 'from-emerald-500/40 via-slate-900/70 to-slate-950/90',
      iconColor: 'text-emerald-400'
    },
    laboratory: {
      icon: Activity,
      gradient: 'from-amber-600/80 via-slate-900/70 to-slate-950/80',
      iconColor: 'text-amber-400'
    },
    radiology: {
      icon: Brain,
      gradient: 'from-indigo-600/80 via-slate-900/70 to-slate-950/80',
      iconColor: 'text-indigo-400'
    },
    business: {
      icon: BarChart3,
      gradient: 'from-cyan-500/40 via-slate-900/70 to-slate-950/90',
      iconColor: 'text-cyan-400'
    },
    revenue: {
      icon: TrendingUp,
      gradient: 'from-emerald-600/80 via-slate-900/70 to-slate-950/80',
      iconColor: 'text-emerald-400'
    },
    analytics: {
      icon: Database,
      gradient: 'from-fuchsia-500/40 via-slate-900/70 to-slate-950/90',
      iconColor: 'text-fuchsia-400'
    }
  };

  const config = configs[type];
  const IconComponent = config.icon;

  return (
    <div 
      className={`relative flex items-center justify-center bg-gradient-to-br ${config.gradient} rounded-lg overflow-hidden ${className}`}
      role="img"
      aria-label={alt}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_1px,_transparent_1px)] bg-[length:20px_20px]" />
      </div>
      
      {/* Main icon */}
      <IconComponent className={`w-24 h-24 ${config.iconColor} drop-shadow-lg`} />
      
      {/* Decorative elements */}
      <div className="absolute top-4 right-4 w-2 h-2 bg-white/30 rounded-full animate-pulse" />
      <div className="absolute bottom-6 left-6 w-1 h-1 bg-white/40 rounded-full animate-pulse delay-300" />
      <div className="absolute top-1/3 left-1/4 w-1.5 h-1.5 bg-white/20 rounded-full animate-pulse delay-700" />
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
    </div>
  );
};

export default PlaceholderImage;
