// Tipos para Gestão Contratual OSS - BHCL

export interface OSSContract {
  id: string;
  numero: string;
  tipo: 'gestao' | 'convenio' | 'parceria';
  contratante: {
    id: string;
    nome: string;
    cnpj: string;
    tipo: 'prefeitura' | 'estado' | 'hospital';
  };
  objeto: string;
  valorTotal: number;
  valorMensal: number;
  dataInicio: Date;
  dataFim: Date;
  status: 'ativo' | 'suspenso' | 'encerrado' | 'em_renovacao';
  metas: ContractMeta[];
}

export interface ContractMeta {
  id: string;
  descricao: string;
  indicador: string;
  meta: number;
  unidade: string;
  periodicidade: 'mensal' | 'trimestral' | 'semestral' | 'anual';
  peso: number;
  realizado?: number;
  percentualAtingido?: number;
  status: 'atingida' | 'parcial' | 'nao_atingida';
}
