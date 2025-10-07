
export interface LabExamParameter {
  name: string;
  value: string | number;
  unit: string;
  referenceRange: string;
  status: 'normal' | 'warning' | 'critical' | 'NA';
  description?: string;
  trend?: 'up' | 'down' | 'stable';
}

export interface LabExamGroup {
  name: string;
  parameters: LabExamParameter[];
}

export interface LabExam {
  id: string;
  name: string;
  date: string;
  category: string;
  provider: string;
  doctor: string;
  status: 'normal' | 'warning' | 'critical';
  summary?: string; // Add summary as optional
  reportUrl?: string; // Add reportUrl as optional
  imageUrl?: string;
  scanned: boolean;
  verified: boolean;
  groups: LabExamGroup[];
}
