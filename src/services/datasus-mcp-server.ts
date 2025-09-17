// MCP Server para integração com DATASUS
// Simula conexão real com APIs do DATASUS

export interface DataSUSResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
}

export interface CNESEstabelecimento {
  cnes: string;
  nome: string;
  razaoSocial: string;
  cnpj: string;
  municipio: string;
  uf: string;
  tipoUnidade: string;
  naturezaJuridica: string;
  esferaAdministrativa: string;
  status: 'ATIVO' | 'INATIVO';
  leitos: {
    total: number;
    sus: number;
    naoSus: number;
    uti: number;
    utiNeonatal: number;
  };
}

export interface SIGTAPProcedimento {
  codigo: string;
  nome: string;
  complexidade: 'BAIXA' | 'MEDIA' | 'ALTA';
  valor: number;
  modalidade: 'AMBULATORIAL' | 'HOSPITALAR';
  grupo: string;
  subgrupo: string;
  forma: string;
}

export interface SIAProducao {
  competencia: string;
  estabelecimento: string;
  procedimento: string;
  quantidade: number;
  valorAprovado: number;
  valorApresentado: number;
  valorGlosa: number;
  complexidade: string;
}

export interface SIHInternacao {
  aih: string;
  estabelecimento: string;
  paciente: {
    idade: number;
    sexo: 'M' | 'F';
    municipio: string;
  };
  procedimentoPrincipal: string;
  diagnosticoPrincipal: string;
  dataInternacao: string;
  dataAlta?: string;
  diasPermanencia: number;
  valorTotal: number;
  tipoAlta: string;
}

export interface TISSGuia {
  numero: string;
  operadora: string;
  beneficiario: string;
  prestador: string;
  procedimentos: Array<{
    codigo: string;
    descricao: string;
    quantidade: number;
    valorUnitario: number;
    valorTotal: number;
  }>;
  status: 'AUTORIZADA' | 'NEGADA' | 'PENDENTE';
  dataAutorizacao?: string;
}

class DataSUSMCPServer {
  private baseUrl = 'https://apidadosabertos.saude.gov.br/cnes/';
  private sigtapUrl = 'https://apidadosabertos.saude.gov.br/sigtap/';
  
  // Simulação de dados reais do DATASUS
  private mockCNESData: CNESEstabelecimento[] = [
    {
      cnes: '2077469',
      nome: 'Santa Casa de Misericórdia',
      razaoSocial: 'Santa Casa de Misericórdia de São Paulo',
      cnpj: '60.742.616/0001-60',
      municipio: 'São Paulo',
      uf: 'SP',
      tipoUnidade: 'Hospital Geral',
      naturezaJuridica: 'Entidade Beneficente Sem Fins Lucrativos',
      esferaAdministrativa: 'Privada',
      status: 'ATIVO',
      leitos: {
        total: 850,
        sus: 680,
        naoSus: 170,
        uti: 120,
        utiNeonatal: 24
      }
    },
    {
      cnes: '2078015',
      nome: 'Hospital das Clínicas FMUSP',
      razaoSocial: 'Hospital das Clínicas da Faculdade de Medicina da USP',
      cnpj: '56.577.059/0006-06',
      municipio: 'São Paulo',
      uf: 'SP',
      tipoUnidade: 'Hospital de Ensino',
      naturezaJuridica: 'Administração Pública',
      esferaAdministrativa: 'Estadual',
      status: 'ATIVO',
      leitos: {
        total: 2200,
        sus: 1980,
        naoSus: 220,
        uti: 380,
        utiNeonatal: 45
      }
    }
  ];

  private mockSIGTAPData: SIGTAPProcedimento[] = [
    {
      codigo: '0301010029',
      nome: 'Consulta médica em atenção básica',
      complexidade: 'BAIXA',
      valor: 10.00,
      modalidade: 'AMBULATORIAL',
      grupo: 'Procedimentos clínicos',
      subgrupo: 'Consultas',
      forma: 'Ambulatorial'
    },
    {
      codigo: '0409060028',
      nome: 'Cirurgia de revascularização miocárdica',
      complexidade: 'ALTA',
      valor: 8500.00,
      modalidade: 'HOSPITALAR',
      grupo: 'Procedimentos cirúrgicos',
      subgrupo: 'Cirurgia cardiovascular',
      forma: 'Hospitalar'
    },
    {
      codigo: '0304010010',
      nome: 'Quimioterapia de tumores sólidos adulto',
      complexidade: 'ALTA',
      valor: 2800.00,
      modalidade: 'AMBULATORIAL',
      grupo: 'Procedimentos oncológicos',
      subgrupo: 'Quimioterapia',
      forma: 'APAC'
    }
  ];

  private mockSIAData: SIAProducao[] = [
    {
      competencia: '202401',
      estabelecimento: '2077469',
      procedimento: '0301010029',
      quantidade: 1847,
      valorAprovado: 18470.00,
      valorApresentado: 18470.00,
      valorGlosa: 0.00,
      complexidade: 'BAIXA'
    },
    {
      competencia: '202401',
      estabelecimento: '2077469',
      procedimento: '0304010010',
      quantidade: 156,
      valorAprovado: 436800.00,
      valorApresentado: 436800.00,
      valorGlosa: 0.00,
      complexidade: 'ALTA'
    }
  ];

  private mockSIHData: SIHInternacao[] = [
    {
      aih: '3124567890123',
      estabelecimento: '2077469',
      paciente: {
        idade: 65,
        sexo: 'M',
        municipio: 'São Paulo'
      },
      procedimentoPrincipal: '0409060028',
      diagnosticoPrincipal: 'I25.0',
      dataInternacao: '2024-01-15',
      dataAlta: '2024-01-22',
      diasPermanencia: 7,
      valorTotal: 8500.00,
      tipoAlta: 'ALTA MELHORADA'
    }
  ];

  private mockTISSData: TISSGuia[] = [
    {
      numero: 'G202401001234',
      operadora: 'Bradesco Saúde',
      beneficiario: '123456789012345',
      prestador: '60.742.616/0001-60',
      procedimentos: [
        {
          codigo: '40101012',
          descricao: 'Consulta médica',
          quantidade: 1,
          valorUnitario: 150.00,
          valorTotal: 150.00
        }
      ],
      status: 'AUTORIZADA',
      dataAutorizacao: '2024-01-15'
    }
  ];

  // Métodos de consulta simulando APIs reais
  async consultarCNES(cnes?: string): Promise<DataSUSResponse<CNESEstabelecimento[]>> {
    await this.simulateDelay();
    
    const data = cnes 
      ? this.mockCNESData.filter(item => item.cnes === cnes)
      : this.mockCNESData;

    return {
      success: true,
      data,
      message: `${data.length} estabelecimento(s) encontrado(s)`,
      timestamp: new Date().toISOString()
    };
  }

  async consultarSIGTAP(codigo?: string): Promise<DataSUSResponse<SIGTAPProcedimento[]>> {
    await this.simulateDelay();
    
    const data = codigo 
      ? this.mockSIGTAPData.filter(item => item.codigo === codigo)
      : this.mockSIGTAPData;

    return {
      success: true,
      data,
      message: `${data.length} procedimento(s) encontrado(s)`,
      timestamp: new Date().toISOString()
    };
  }

  async consultarSIA(estabelecimento: string, competencia?: string): Promise<DataSUSResponse<SIAProducao[]>> {
    await this.simulateDelay();
    
    let data = this.mockSIAData.filter(item => item.estabelecimento === estabelecimento);
    
    if (competencia) {
      data = data.filter(item => item.competencia === competencia);
    }

    return {
      success: true,
      data,
      message: `${data.length} registro(s) de produção encontrado(s)`,
      timestamp: new Date().toISOString()
    };
  }

  async consultarSIH(estabelecimento: string, periodo?: string): Promise<DataSUSResponse<SIHInternacao[]>> {
    await this.simulateDelay();
    
    const data = this.mockSIHData.filter(item => item.estabelecimento === estabelecimento);

    return {
      success: true,
      data,
      message: `${data.length} internação(ões) encontrada(s)`,
      timestamp: new Date().toISOString()
    };
  }

  async consultarTISS(prestador: string): Promise<DataSUSResponse<TISSGuia[]>> {
    await this.simulateDelay();
    
    const data = this.mockTISSData.filter(item => item.prestador === prestador);

    return {
      success: true,
      data,
      message: `${data.length} guia(s) encontrada(s)`,
      timestamp: new Date().toISOString()
    };
  }

  // Métodos agregados para dashboard
  async getDashboardData(cnes: string) {
    const [cnesData, siaData, sihData, tissData] = await Promise.all([
      this.consultarCNES(cnes),
      this.consultarSIA(cnes, '202401'),
      this.consultarSIH(cnes),
      this.consultarTISS('60.742.616/0001-60')
    ]);

    return {
      estabelecimento: cnesData.data[0] || null,
      producaoAmb: siaData.data,
      internacoes: sihData.data,
      guiasTiss: tissData.data,
      kpis: this.calculateKPIs(siaData.data, sihData.data, tissData.data)
    };
  }

  private calculateKPIs(sia: SIAProducao[], sih: SIHInternacao[], tiss: TISSGuia[]) {
    const totalSIA = sia.reduce((sum, item) => sum + item.valorAprovado, 0);
    const totalSIH = sih.reduce((sum, item) => sum + item.valorTotal, 0);
    const totalTISS = tiss.reduce((sum, guia) => 
      sum + guia.procedimentos.reduce((subSum, proc) => subSum + proc.valorTotal, 0), 0
    );

    const mediaPermSIH = sih.length > 0 
      ? sih.reduce((sum, item) => sum + item.diasPermanencia, 0) / sih.length 
      : 0;

    return {
      faturamentoSUS: totalSIA + totalSIH,
      faturamentoTISS: totalTISS,
      faturamentoTotal: totalSIA + totalSIH + totalTISS,
      internacoes: sih.length,
      procedimentosAmb: sia.reduce((sum, item) => sum + item.quantidade, 0),
      mediaPermancencia: Math.round(mediaPermSIH * 10) / 10,
      taxaOcupacao: 87.3, // Simulado
      guiasAutorizadas: tiss.filter(g => g.status === 'AUTORIZADA').length
    };
  }

  private async simulateDelay() {
    // Simula latência de API real
    await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500));
  }
}

// Instância singleton
export const dataSUSService = new DataSUSMCPServer();

// Tipos para exportação
export type {
  CNESEstabelecimento,
  SIGTAPProcedimento,
  SIAProducao,
  SIHInternacao,
  TISSGuia
};
