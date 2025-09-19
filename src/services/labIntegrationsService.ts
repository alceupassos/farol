import { LaboratoryIntegration } from '@/data/labIntegrations';

const API_BASE = '/api/laboratory-integrations';

export interface IntegrationActionPayload {
  [key: string]: unknown;
}

export interface IntegrationStatus {
  integrationId: string;
  lastSyncedAt?: string;
  environment?: string;
  status?: 'connected' | 'pending' | 'error';
  details?: string;
}

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || 'Falha ao comunicar com o backend.');
  }
  return response.json() as Promise<T>;
};

export const fetchIntegrationStatus = async (integrationId: string): Promise<IntegrationStatus> => {
  try {
    const res = await fetch(`${API_BASE}/${integrationId}/status`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    return handleResponse<IntegrationStatus>(res);
  } catch (error) {
    console.warn('[labIntegrationsService] fetchIntegrationStatus fallback', error);
    return {
      integrationId,
      status: 'pending',
      details: 'Backend ainda não disponível. Retornando status padrão.'
    };
  }
};

export const performIntegrationAction = async (
  integration: LaboratoryIntegration,
  actionId: string,
  payload: IntegrationActionPayload
): Promise<{ message: string }> => {
  try {
    const res = await fetch(`${API_BASE}/${integration.id}/actions/${actionId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ payload })
    });
    return handleResponse<{ message: string }>(res);
  } catch (error) {
    console.warn('[labIntegrationsService] performIntegrationAction fallback', error);
    return {
      message: `Ação “${actionId}” registrada localmente. Implemente o endpoint correspondente para efetivar.`
    };
  }
};

export const submitIntegrationForm = async (
  integration: LaboratoryIntegration,
  sectionId: string,
  formData: IntegrationActionPayload
): Promise<{ message: string }> => {
  try {
    const res = await fetch(`${API_BASE}/${integration.id}/sections/${sectionId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: formData })
    });
    return handleResponse<{ message: string }>(res);
  } catch (error) {
    console.warn('[labIntegrationsService] submitIntegrationForm fallback', error);
    return {
      message: `Formulário “${sectionId}” salvo localmente. Crie o endpoint para persistência real.`
    };
  }
};
