import {
  Activity,
  AlertTriangle,
  BarChart3,
  BedDouble,
  BrainCircuit,
  DollarSign,
  HeartPulse,
  Hospital,
  LineChart,
  PieChart,
  ShieldAlert,
  Stethoscope,
  Target,
  Timer,
  Users,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { IconKey } from '@/modules/oss/types/kpis';

export const metricsIconMap: Record<IconKey, LucideIcon> = {
  activity: Activity,
  'alert-triangle': AlertTriangle,
  'bar-chart': BarChart3,
  'bed-double': BedDouble,
  'brain-circuit': BrainCircuit,
  'dollar-sign': DollarSign,
  'heart-pulse': HeartPulse,
  hospital: Hospital,
  'line-chart': LineChart,
  'pie-chart': PieChart,
  'shield-alert': ShieldAlert,
  stethoscope: Stethoscope,
  target: Target,
  timer: Timer,
  users: Users,
};

export const getIconFromKey = (key: IconKey): LucideIcon => metricsIconMap[key] ?? Activity;
