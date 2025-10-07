
import { FileText, Calendar, Pill, ShieldCheck, Clock, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Activity {
  id: string;
  type: 'record' | 'appointment' | 'medication' | 'access';
  title: string;
  description: string;
  timestamp: string;
  provider?: string;
  status?: 'completed' | 'upcoming' | 'active' | 'granted' | 'revoked';
}

interface RecentActivityProps {
  activities: Activity[];
  className?: string;
}

const RecentActivity = ({ activities, className }: RecentActivityProps) => {
  const getIcon = (type: Activity['type']) => {
    switch (type) {
      case 'record':
        return <FileText size={18} />;
      case 'appointment':
        return <Calendar size={18} />;
      case 'medication':
        return <Pill size={18} />;
      case 'access':
        return <ShieldCheck size={18} />;
      default:
        return <Clock size={18} />;
    }
  };
  
  const getIconColor = (type: Activity['type']) => {
    switch (type) {
      case 'record':
        return 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400';
      case 'appointment':
        return 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400';
      case 'medication':
        return 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400';
      case 'access':
        return 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400';
      default:
        return 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400';
    }
  };
  
  const getStatusColor = (status: Activity['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'upcoming':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'active':
        return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
      case 'granted':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'revoked':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  return (
    <div className={cn("glass-card rounded-xl p-5", className)}>
      <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
      
      <div className="space-y-4">
        {activities.map((activity) => (
          <div 
            key={activity.id}
            className="flex items-start p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg transition-colors"
          >
            <div className={cn("p-2 rounded-lg mr-4", getIconColor(activity.type))}>
              {getIcon(activity.type)}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-sm font-medium truncate">{activity.title}</h4>
                {activity.status && (
                  <span className={cn("text-xs px-2 py-0.5 rounded-full", getStatusColor(activity.status))}>
                    {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                  </span>
                )}
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-1">
                {activity.description}
              </p>
              
              <div className="flex items-center text-xs text-gray-500">
                <span>{activity.timestamp}</span>
                {activity.provider && (
                  <>
                    <span className="mx-1.5">•</span>
                    <span>{activity.provider}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {activities.length === 0 && (
        <div className="text-center py-6">
          <p className="text-gray-500">No recent activities</p>
        </div>
      )}
      
      <button className="w-full mt-4 text-sm text-primary font-medium hover:underline flex items-center justify-center">
        View All Activities
        <ArrowRight size={14} className="ml-1" />
      </button>
    </div>
  );
};

export default RecentActivity;
