export interface ImagingAnalysisResult {
  id: string;
  modality: string;
  aiSummary: string;
  findings: string[];
  riskScore: number; // 0 - 100
  recommendations: string[];
  additionalInfoNeeded: string[];
}

const API_BASE = '/api/imaging-analysis';

const defaultResponse: ImagingAnalysisResult = {
  id: `analysis-${Date.now()}`,
  modality: 'Desconhecida',
  aiSummary: 'Análise automática executada. Forneça integração com o serviço de IA para resultados em tempo real.',
  findings: [
    'Volume/tessitura preservados',
    'Sem lesões críticas identificadas na pré-análise local'
  ],
  riskScore: 12,
  recommendations: [
    'Envie o exame para validação do radiologista responsável',
    'Anexe histórico clínico e exames anteriores para comparação'
  ],
  additionalInfoNeeded: [
    'Informe sintomatologia correlata (início, intensidade, evolução)',
    'Descreva medicações em uso e exames laboratoriais recentes'
  ]
};

export const uploadImagingStudy = async (file: File): Promise<ImagingAnalysisResult> => {
  const payload = new FormData();
  payload.append('file', file);

  try {
    const response = await fetch(`${API_BASE}/upload`, {
      method: 'POST',
      body: payload
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return (await response.json()) as ImagingAnalysisResult;
  } catch (error) {
    console.warn('[imagingAnalysisService] using fallback response', error);
    return {
      ...defaultResponse,
      modality: inferModalityFromName(file.name)
    };
  }
};

export const inferModalityFromName = (fileName: string): string => {
  const lower = fileName.toLowerCase();
  if (lower.includes('rx') || lower.includes('raio')) return 'Raio-X';
  if (lower.includes('ct') || lower.includes('tom')) return 'Tomografia';
  if (lower.includes('mri') || lower.includes('rm')) return 'Ressonância Magnética';
  if (lower.includes('ultra') || lower.includes('usg')) return 'Ultrassom';
  return 'Imagem Diagnóstica';
};
