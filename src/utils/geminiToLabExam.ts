import { LabExam, LabExamGroup, LabExamParameter } from '@/components/labexams/types';

interface GeminiParameterAnalysis {
  name: string;
  value: string;
  unit: string;
  referenceRange: string;
  status: 'normal' | 'warning' | 'critical';
  explanation: string;
  function: string;
  lowRiskConsequences: string;
  highRiskConsequences: string;
  nutritionalRecommendations: string[];
  lifestyle: string[];
}

interface GeminiResponse {
  parameters: GeminiParameterAnalysis[];
  summary: string;
  overallRisk: 'low' | 'moderate' | 'high';
  recommendations: string[];
  correlations: Array<{
    parameters: string[];
    observation: string;
  }>;
}

export const convertGeminiToLabExam = (geminiData: GeminiResponse): LabExam => {
  // Group parameters by category (simplified logic)
  const groupedParameters: { [key: string]: LabExamParameter[] } = {};
  
  geminiData.parameters.forEach(param => {
    // Simple categorization based on parameter name
    let category = 'Análise Geral';
    
    if (param.name.toLowerCase().includes('hemoglobin') || 
        param.name.toLowerCase().includes('eritrócito') ||
        param.name.toLowerCase().includes('hematócrito')) {
      category = 'Hemograma - Eritrócitos';
    } else if (param.name.toLowerCase().includes('leucócito') ||
               param.name.toLowerCase().includes('neutrófi') ||
               param.name.toLowerCase().includes('linfócito')) {
      category = 'Hemograma - Leucócitos';
    } else if (param.name.toLowerCase().includes('plaqueta')) {
      category = 'Hemograma - Plaquetas';
    } else if (param.name.toLowerCase().includes('glicose') ||
               param.name.toLowerCase().includes('colesterol') ||
               param.name.toLowerCase().includes('triglicérides')) {
      category = 'Bioquímica';
    }

    if (!groupedParameters[category]) {
      groupedParameters[category] = [];
    }

    groupedParameters[category].push({
      name: param.name,
      value: param.value,
      unit: param.unit,
      referenceRange: param.referenceRange,
      status: param.status,
      description: param.explanation,
      trend: 'stable' // Default, could be enhanced with historical data
    });
  });

  // Convert grouped parameters to LabExamGroup array
  const groups: LabExamGroup[] = Object.entries(groupedParameters).map(([name, parameters]) => ({
    name,
    parameters
  }));

  // Determine overall status based on individual parameter statuses
  let overallStatus: 'normal' | 'warning' | 'critical' = 'normal';
  if (geminiData.parameters.some(p => p.status === 'critical')) {
    overallStatus = 'critical';
  } else if (geminiData.parameters.some(p => p.status === 'warning')) {
    overallStatus = 'warning';
  }

  return {
    id: `gemini-${Date.now()}`,
    name: 'Exame Processado por IA',
    date: new Date().toISOString().split('T')[0],
    category: 'Exame Geral',
    provider: 'Análise por IA (Google Gemini)',
    doctor: 'Dr. Sistema IA',
    status: overallStatus,
    summary: geminiData.summary,
    reportUrl: undefined,
    imageUrl: undefined,
    scanned: true,
    verified: false,
    groups
  };
};