import {
  Activity,
  Ambulance,
  BarChart3,
  Brain,
  ClipboardList,
  DollarSign,
  FileText,
  Gauge,
  Globe,
  GraduationCap,
  Map,
  Newspaper,
  RefreshCw,
  Scale,
  Shield,
  ShieldAlert,
  Stethoscope,
  Target,
  Users,
  Video,
  Zap,
  CheckCircle,
  Clock
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { AphIconId } from '@/modules/aph/types';

export const aphIconMap: Record<AphIconId | 'clock', LucideIcon> = {
  activity: Activity,
  ambulance: Ambulance,
  'bar-chart': BarChart3,
  brain: Brain,
  clipboard: ClipboardList,
  'dollar-sign': DollarSign,
  'file-text': FileText,
  gauge: Gauge,
  globe: Globe,
  'graduation-cap': GraduationCap,
  map: Map,
  newspaper: Newspaper,
  refresh: RefreshCw,
  scale: Scale,
  shield: Shield,
  'shield-alert': ShieldAlert,
  stethoscope: Stethoscope,
  target: Target,
  users: Users,
  video: Video,
  zap: Zap,
  'check-circle': CheckCircle,
  clock: Clock
};

export const getAphIcon = (icon: AphIconId | 'clock'): LucideIcon => aphIconMap[icon] ?? Activity;
