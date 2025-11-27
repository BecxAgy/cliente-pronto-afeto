import { getUserSession } from '@/src/shared/modules/helpers/session.helper';
import { ProposalFormSchemaProps } from './schemas';

/**
 * Interface para dados de proposta de cliente existente
 */
export interface ExistingClientProposal {
  cliente: number;
  cuidado: number;
  localAtendimento: {
    cep: string;
    estado: string;
    cidade: string;
    bairro: string;
    numero: string;
    complemento: string;
    rua: string;
  };
  saude: {
    comentarios: string;
    patologias: number[];
    dispositivos?: number[];
  };
  plantao: {
    dataHoraInicioPlantao: Date;
    alimentacaoFornecida?: boolean;
    diasDaSemana: string[];
    turno: string[];
  };
  cuidadores: number[];
  renovarContrato: boolean;
  observacao?: string;
}

/**
 * Interface para dados de proposta de novo cliente
 */
export interface NewClientProposal {
  cliente: {
    nome: string;
    nomeApresentacao: string;
    nacionalidade: string;
    estadoCivil: string;
    cpf: string;
    rg: string;
    telefone: string;
    endereco: {
      cep: string;
      estado: string;
      cidade: string;
      bairro: string;
      numero: string;
      complemento: string;
      rua: string;
    };
    cuidado: {
      nome: string;
      nomeApresentacao: string;
      dataNascimento: Date;
      cpf: string;
      peso: number;
    };
  };
  localAtendimento: {
    cep: string;
    estado: string;
    cidade: string;
    bairro: string;
    numero: string;
    complemento: string;
    rua: string;
  };
  saude: {
    comentarios: string;
    patologias: number[];
    dispositivos?: number[];
  };
  plantao: {
    dataHoraInicioPlantao: Date;
    alimentacaoFornecida?: boolean;
    diasDaSemana: string[];
    turno: string[];
  };
  cuidador: number[];
  renovarContrato: boolean;
  observacao?: string;
  userId?: number;
}

/**
 * Extrai dados do formulário para cliente existente
 */
export function buildExistingClientProposal(
  formData: ProposalFormSchemaProps,
  clientId: number
): ExistingClientProposal {
  if (
    !formData.address ||
    !formData.health ||
    !formData.duty ||
    !formData.caregivers ||
    !formData.health.cuidado.id
  ) {
    throw new Error('Dados incompletos do formulário');
  }

  return {
    cliente: clientId,
    cuidado: formData.health.cuidado.id,
    localAtendimento: {
      cep: formData.address.cep,
      estado: formData.address.estado,
      cidade: formData.address.cidade,
      bairro: formData.address.bairro,
      numero: formData.address.numero,
      complemento: formData.address.complemento || '',
      rua: formData.address.rua,
    },
    saude: {
      comentarios: formData.health.comentarios,
      patologias: formData.health.patologias,
      dispositivos: formData.health.dispositivos,
    },
    plantao: {
      dataHoraInicioPlantao: formData.duty.dataHoraInicioPlantao,
      alimentacaoFornecida: formData.duty.alimentacaoFornecida ?? false,
      diasDaSemana: formData.duty.diasDaSemana,
      turno: formData.duty.turno,
    },
    cuidadores: formData.caregivers.caregivers,
    renovarContrato: false,
  };
}

/**
 * Extrai dados do formulário para novo cliente
 */
export async function buildNewClientProposal(
  formData: ProposalFormSchemaProps
): Promise<NewClientProposal> {
  if (
    !formData.client ||
    !formData.address ||
    !formData.health ||
    !formData.duty ||
    !formData.caregivers ||
    !formData.health.cuidado
  ) {
    throw new Error('Dados incompletos do formulário');
  }

  // Normaliza a data de nascimento
  const dataNascimento = formData.health.cuidado.dataNascimento
    ? new Date(formData.health.cuidado.dataNascimento)
    : new Date();
  const normalizedDate = new Date(dataNascimento.toISOString().split('T')[0]);
  const session = await getUserSession();

  return {
    cliente: {
      nome: formData.client.nome,
      nomeApresentacao: formData.client.nomeApresentacao || '',
      nacionalidade: formData.client.nacionalidade || '',
      estadoCivil: formData.client.estadoCivil,
      cpf: formData.client.cpf,
      rg: formData.client.rg,
      telefone: formData.client.telefone,
      endereco: {
        ...formData.client.endereco,
        complemento: formData.client.endereco.complemento || '',
      },
      cuidado: {
        nome: formData.health.cuidado.nome || '',
        nomeApresentacao: formData.health.cuidado.nomeApresentacao || '',
        dataNascimento: normalizedDate,
        cpf: formData.health.cuidado.cpf || '',
        peso: formData.health?.cuidado?.peso
          ? Number.parseFloat(formData.health.cuidado.peso.toString())
          : 0,
      },
    },
    localAtendimento: {
      cep: formData.address.cep,
      estado: formData.address.estado,
      cidade: formData.address.cidade,
      bairro: formData.address.bairro,
      numero: formData.address.numero,
      complemento: formData.address.complemento || '',
      rua: formData.address.rua,
    },
    saude: {
      comentarios: formData.health.comentarios,
      patologias: formData.health.patologias,
      dispositivos: formData.health.dispositivos,
    },
    plantao: {
      dataHoraInicioPlantao: formData.duty.dataHoraInicioPlantao,
      alimentacaoFornecida: formData.duty.alimentacaoFornecida ?? false,
      diasDaSemana: formData.duty.diasDaSemana,
      turno: formData.duty.turno,
    },
    cuidador: formData.caregivers.caregivers,
    renovarContrato: false,
    userId: Number(session.userId),
  };
}

export const convertStatusToPercent = (status: string): number => {
  switch (status) {
    case 'Negada':
      return 0;
    case 'Observacao':
      return 30;
    case 'Aprovada':
      return 90;
    case 'Assinada':
      return 100;
    default:
      return 0;
  }
};
