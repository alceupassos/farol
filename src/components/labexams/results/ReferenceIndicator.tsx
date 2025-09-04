
import { LabExamParameter } from '../types';

interface ReferenceIndicatorProps {
  parameter: LabExamParameter;
}

const ReferenceIndicator = ({ parameter }: ReferenceIndicatorProps) => {
  if (parameter.status === 'normal') return null;
  
  if (typeof parameter.value === 'number') {
    const valueNum = parameter.value;
    const range = parameter.referenceRange.split(' a ');
    
    if (range.length === 2) {
      const minValue = parseFloat(range[0]);
      const maxValue = parseFloat(range[1].split(' ')[0]);
      const totalRange = maxValue - minValue;
      
      // Calculate position on scale (0-100)
      let position = 50; // Default middle position
      
      if (valueNum < minValue) {
        position = Math.max(0, 50 - ((minValue - valueNum) / (totalRange / 2)) * 50);
      } else if (valueNum > maxValue) {
        position = Math.min(100, 50 + ((valueNum - maxValue) / (totalRange / 2)) * 50);
      } else {
        position = 50 + ((valueNum - minValue) / totalRange - 0.5) * 100;
      }
      
      return (
        <div className="w-full mt-1">
          <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div className="relative h-full w-full">
              <div className="absolute inset-y-0 left-0 bg-green-100 dark:bg-green-900/30 h-full" style={{ width: '33%' }}></div>
              <div className="absolute inset-y-0 left-[33%] bg-green-500 dark:bg-green-500 h-full" style={{ width: '34%' }}></div>
              <div className="absolute inset-y-0 left-[67%] bg-green-100 dark:bg-green-900/30 h-full" style={{ width: '33%' }}></div>
              <div 
                className={`absolute top-0 h-full w-1 ${parameter.status === 'critical' ? 'bg-red-500' : 'bg-amber-500'}`} 
                style={{ left: `${position}%` }}
              ></div>
            </div>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>Abaixo</span>
            <span>Normal</span>
            <span>Acima</span>
          </div>
        </div>
      );
    }
  }
  
  return null;
};

export default ReferenceIndicator;
