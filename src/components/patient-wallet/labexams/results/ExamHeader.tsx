
import { Badge } from "@/components/ui/badge";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { Separator } from '@/components/ui/separator';
import { LabExam } from '../types';

interface ExamHeaderProps {
  exam: LabExam;
  abnormalCount: number;
}

const ExamHeader = ({ exam, abnormalCount }: ExamHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
      <div>
        <CardTitle>{exam.name}</CardTitle>
        <CardDescription className="flex flex-col sm:flex-row sm:items-center gap-2 mt-1">
          <span>Data: {exam.date}</span>
          <Separator className="hidden sm:block h-4 w-[1px]" orientation="vertical" />
          <span>Laboratório: {exam.provider}</span>
          {exam.doctor && (
            <>
              <Separator className="hidden sm:block h-4 w-[1px]" orientation="vertical" />
              <span>Médico: {exam.doctor}</span>
            </>
          )}
        </CardDescription>
      </div>
      
      <div>
        <Badge variant={exam.status === 'normal' ? 'outline' : 'secondary'} className={
          exam.status === 'normal' 
            ? 'bg-green-500/10 text-green-600 border-green-400/20' 
            : exam.status === 'warning'
              ? 'bg-amber-500/10 text-amber-600 border-amber-400/20'
              : 'bg-red-500/10 text-red-600 border-red-400/20'
        }>
          {abnormalCount > 0 
            ? `${abnormalCount} parâmetros alterados` 
            : 'Todos os parâmetros normais'}
        </Badge>
      </div>
    </div>
  );
};

export default ExamHeader;
