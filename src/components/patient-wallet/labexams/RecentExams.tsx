
import { CalendarDays, FileText, AlertTriangle, ChevronRight, CheckCircle } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LabExam } from './types';

interface RecentExamsProps {
  exams: LabExam[];
  onExamSelect: (exam: LabExam) => void;
}

const RecentExams = ({ exams, onExamSelect }: RecentExamsProps) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'normal':
        return (
          <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-400/20 flex gap-1 items-center">
            <CheckCircle className="h-3 w-3" /> Normal
          </Badge>
        );
      case 'warning':
        return (
          <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-400/20 flex gap-1 items-center">
            <AlertTriangle className="h-3 w-3" /> Atenção
          </Badge>
        );
      case 'critical':
        return (
          <Badge variant="outline" className="bg-red-500/10 text-red-600 border-red-400/20 flex gap-1 items-center">
            <AlertTriangle className="h-3 w-3" /> Crítico
          </Badge>
        );
      default:
        return <Badge variant="outline">Indefinido</Badge>;
    }
  };
  
  const getCategoryIcon = (category: string) => {
    const firstLetter = category.charAt(0).toUpperCase();
    return (
      <Avatar className="h-9 w-9 bg-primary/10 text-primary">
        <AvatarFallback>{firstLetter}</AvatarFallback>
      </Avatar>
    );
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Exame</TableHead>
            <TableHead className="hidden md:table-cell">Data</TableHead>
            <TableHead className="hidden lg:table-cell">Laboratório</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {exams.length > 0 ? (
            exams.map((exam) => (
              <TableRow key={exam.id} className="cursor-pointer hover:bg-muted/50" onClick={() => onExamSelect(exam)}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    {getCategoryIcon(exam.category)}
                    <div>
                      <div className="font-medium">{exam.name}</div>
                      <div className="text-sm text-muted-foreground md:hidden">{exam.date}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-muted-foreground" />
                    {exam.date}
                  </div>
                </TableCell>
                <TableCell className="hidden lg:table-cell">{exam.provider}</TableCell>
                <TableCell>{getStatusBadge(exam.status)}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={(e) => {
                    e.stopPropagation();
                    onExamSelect(exam);
                  }}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8">
                <div className="flex flex-col items-center">
                  <FileText className="h-10 w-10 text-muted-foreground mb-3" />
                  <p className="text-muted-foreground mb-2">Nenhum exame encontrado</p>
                  <Button variant="outline" className="mt-2">
                    Adicionar novo exame
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default RecentExams;
