
import { CheckCircle, AlertTriangle } from 'lucide-react';

interface StatusIndicatorProps {
  status: string;
}

const StatusIndicator = ({ status }: StatusIndicatorProps) => {
  switch (status) {
    case 'normal':
      return (
        <div className="flex items-center gap-1 text-green-600">
          <CheckCircle className="h-4 w-4" />
          <span className="text-xs font-medium">Normal</span>
        </div>
      );
    case 'warning':
      return (
        <div className="flex items-center gap-1 text-amber-600">
          <AlertTriangle className="h-4 w-4" />
          <span className="text-xs font-medium">Alterado</span>
        </div>
      );
    case 'critical':
      return (
        <div className="flex items-center gap-1 text-red-600">
          <AlertTriangle className="h-4 w-4" />
          <span className="text-xs font-medium">Crítico</span>
        </div>
      );
    default:
      return null;
  }
};

export default StatusIndicator;
