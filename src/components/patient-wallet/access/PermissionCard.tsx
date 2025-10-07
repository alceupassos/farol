
import { Clock, CheckCircle, XCircle, AlertCircle, User, Building, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import AppButton from '../ui/AppButton';

export interface Permission {
  id: string;
  name: string;
  type: 'individual' | 'organization';
  status: 'active' | 'expired' | 'pending' | 'revoked';
  granted: string;
  expires: string;
  dataAccess: string[];
  lastAccessed?: string;
}

interface PermissionCardProps {
  permission: Permission;
  onRevoke: (id: string) => void;
  onModify: (id: string) => void;
  className?: string;
}

const PermissionCard = ({ permission, onRevoke, onModify, className }: PermissionCardProps) => {
  const getStatusIcon = (status: Permission['status']) => {
    switch (status) {
      case 'active':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'expired':
        return <Clock size={16} className="text-gray-500" />;
      case 'pending':
        return <AlertCircle size={16} className="text-amber-500" />;
      case 'revoked':
        return <XCircle size={16} className="text-red-500" />;
    }
  };
  
  const getStatusColor = (status: Permission['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'expired':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';
      case 'pending':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
      case 'revoked':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
    }
  };

  return (
    <div className={cn("glass-card rounded-xl p-5", className)}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <div className={cn(
            "p-2 rounded-full mr-3",
            permission.type === 'individual' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' : 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400'
          )}>
            {permission.type === 'individual' ? <User size={18} /> : <Building size={18} />}
          </div>
          <div>
            <h3 className="text-base font-medium">{permission.name}</h3>
            <div className="text-xs text-gray-500 mt-0.5">
              {permission.type === 'individual' ? 'Individual' : 'Organization'}
            </div>
          </div>
        </div>
        
        <div className={cn("flex items-center text-xs font-medium px-2 py-1 rounded-full", getStatusColor(permission.status))}>
          {getStatusIcon(permission.status)}
          <span className="ml-1 capitalize">{permission.status}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <div className="text-xs text-gray-500 mb-1">Granted</div>
          <div className="text-sm">{permission.granted}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500 mb-1">Expires</div>
          <div className="text-sm">{permission.expires}</div>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="text-xs text-gray-500 mb-2">Data Access</div>
        <div className="flex flex-wrap gap-2">
          {permission.dataAccess.map((item, index) => (
            <span 
              key={index} 
              className="inline-flex text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
      
      {permission.lastAccessed && (
        <div className="text-xs text-gray-500 mb-4">
          Last accessed: {permission.lastAccessed}
        </div>
      )}
      
      <div className="flex items-center justify-between mt-2">
        <AppButton
          variant="outline"
          size="sm"
          className="text-red-600 border-red-200 hover:bg-red-50 dark:text-red-400 dark:border-red-900/30 dark:hover:bg-red-900/20"
          onClick={() => onRevoke(permission.id)}
          disabled={permission.status === 'revoked' || permission.status === 'expired'}
        >
          Revoke Access
        </AppButton>
        
        <button 
          className="text-sm text-primary flex items-center"
          onClick={() => onModify(permission.id)}
        >
          View Details
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default PermissionCard;
