export interface AlertConfig {
  userRole: 'paciente' | 'medico' | 'gestor' | 'laboratorio';
  alertTypes: {
    epidemic: {
      enabled: boolean;
      thresholds: {
        low: string[];
        medium: string[];
        high: string[];
        critical: string[];
      };
    };
    medication: {
      enabled: boolean;
      reminderTimes: string[];
    };
    appointments: {
      enabled: boolean;
      reminderHours: number[];
    };
    system: {
      enabled: boolean;
      categories: string[];
    };
  };
}

export const defaultAlertConfigs: Record<string, AlertConfig> = {
  paciente: {
    userRole: 'paciente',
    alertTypes: {
      epidemic: {
        enabled: true,
        thresholds: {
          low: [],
          medium: ['MODERADO'],
          high: ['ALTO'],
          critical: ['CRÍTICO', 'EMERGÊNCIA']
        }
      },
      medication: {
        enabled: true,
        reminderTimes: ['08:00', '14:00', '20:00']
      },
      appointments: {
        enabled: true,
        reminderHours: [24, 2] // 24h antes e 2h antes
      },
      system: {
        enabled: true,
        categories: ['updates', 'security', 'maintenance']
      }
    }
  },
  
  medico: {
    userRole: 'medico',
    alertTypes: {
      epidemic: {
        enabled: true,
        thresholds: {
          low: [],
          medium: ['MODERADO'],
          high: ['ALTO'],
          critical: ['CRÍTICO', 'EMERGÊNCIA']
        }
      },
      medication: {
        enabled: false,
        reminderTimes: []
      },
      appointments: {
        enabled: true,
        reminderHours: [60, 15] // 1h antes e 15min antes
      },
      system: {
        enabled: true,
        categories: ['protocols', 'patients', 'epidemiology', 'updates']
      }
    }
  },
  
  gestor: {
    userRole: 'gestor',
    alertTypes: {
      epidemic: {
        enabled: true,
        thresholds: {
          low: [],
          medium: ['MODERADO'],
          high: ['ALTO'],
          critical: ['CRÍTICO', 'EMERGÊNCIA']
        }
      },
      medication: {
        enabled: false,
        reminderTimes: []
      },
      appointments: {
        enabled: true,
        reminderHours: [120, 30] // 2h antes e 30min antes
      },
      system: {
        enabled: true,
        categories: ['reports', 'budget', 'resources', 'emergency', 'updates']
      }
    }
  },
  laboratorio: {
    userRole: 'laboratorio',
    alertTypes: {
      epidemic: {
        enabled: true,
        thresholds: {
          low: [],
          medium: ['MODERADO'],
          high: ['ALTO'],
          critical: ['CRÍTICO', 'EMERGÊNCIA']
        }
      },
      medication: {
        enabled: false,
        reminderTimes: []
      },
      appointments: {
        enabled: true,
        reminderHours: [120, 60] // 2h antes e 1h antes de janelas críticas
      },
      system: {
        enabled: true,
        categories: ['compliance', 'integrations', 'sla', 'security']
      }
    }
  }
};

export const riskLevelRecommendations = {
  BAIXO: {
    paciente: ['Mantenha cuidados básicos de higiene', 'Continue atividades normais'],
    medico: ['Monitoramento de rotina', 'Protocolo padrão'],
    gestor: ['Vigilância epidemiológica padrão'],
    laboratorio: ['Monitoramento de estoque crítico', 'Sincronizar canais de publicação']
  },
  MODERADO: {
    paciente: ['Evite aglomerações desnecessárias', 'Reforce higiene das mãos', 'Use máscara em locais fechados'],
    medico: ['Atenção para sintomas respiratórios', 'Protocolo de triagem reforçado'],
    gestor: ['Monitoramento intensificado', 'Preparação de recursos'],
    laboratorio: ['Garantir cadeia de frio', 'Planejar contingência de rotas']
  },
  ALTO: {
    paciente: ['Evite aglomerações', 'Use máscara sempre', 'Busque atendimento ao primeiro sintoma'],
    medico: ['Protocolo de isolamento', 'Teste rápido para suspeitos', 'Notificação compulsória'],
    gestor: ['Mobilização de equipes', 'Campanha preventiva', 'Recursos adicionais'],
    laboratorio: ['Ativar runbook RNDS', 'Priorizar exames STAT', 'Comunicar parceiros hospitalares']
  },
  CRÍTICO: {
    paciente: ['Saia apenas se necessário', 'Máscara N95/PFF2', 'Isolamento ao menor sintoma'],
    medico: ['Protocolo de emergência', 'Testagem imediata', 'Isolamento rigoroso'],
    gestor: ['Estado de alerta', 'Equipes de emergência', 'Comunicação oficial'],
    laboratorio: ['Escalonar produção 24x7', 'Ativar duplicação de dados', 'Priorizar distribuição crítica']
  },
  EMERGÊNCIA: {
    paciente: ['Isolamento social máximo', 'EPIs de proteção', 'Atendimento médico imediato'],
    medico: ['Protocolo de surto', 'Barreira sanitária', 'Notificação urgente'],
    gestor: ['Estado de emergência', 'Lockdown localizado', 'Recursos emergenciais'],
    laboratorio: ['Desencadear DR', 'Ativar centros redundantes', 'Comunicar ANVISA / parceiros privados']
  }
};

export const alertPriorityMap = {
  BAIXO: 'low',
  MODERADO: 'medium',
  ALTO: 'high',
  CRÍTICO: 'critical',
  EMERGÊNCIA: 'critical'
} as const;
