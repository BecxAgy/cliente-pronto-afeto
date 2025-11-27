import { getToken } from '@/src/shared/modules/services/token.service';
import { Address, Caregiver } from '@/src/shared/modules/types/caregiver.types';
import { ExistingClientProposal, NewClientProposal } from './helpers';
import { getUserSession } from '@/src/shared/modules/helpers/session.helper';
import { State } from '@/src/shared/modules/types/state.types';
import { Associate, ProposalDTOGet, ProposalGetRequestParams } from './types';

export async function getNearCaregiver(
  localAtendimento: Address,
  patologias: number[],
  habilidadesSelecionadas?: number[],
  avaliacoes?: number,
  name?: string,
  expercience?: string
): Promise<{ error: boolean; data?: Caregiver[]; message?: string }> {
  const token = await getToken();

  const data: {
    cep: string;
    estado: string;
    cidade: string;
    bairro: string;
    complemento: string;
    numero: string;
    pontoReferencia?: string;
    patologiasProposta: number[];
    habilidadesCuidador?: number[];
    mediaAvaliacoes?: number;
    nomeCuidador?: string;
    tempoExperiencia?: number;
  } = {
    cep: localAtendimento.cep,
    estado: localAtendimento.estado,
    cidade: localAtendimento.cidade,
    bairro: localAtendimento.bairro,
    complemento: localAtendimento.complemento,
    numero: localAtendimento.numero,
    pontoReferencia: localAtendimento.pontoReferencia,
    patologiasProposta: patologias,
  };

  if (habilidadesSelecionadas) {
    data['habilidadesCuidador'] = habilidadesSelecionadas;
  }
  if (avaliacoes) {
    data['mediaAvaliacoes'] = avaliacoes;
  }
  if (name) {
    data['nomeCuidador'] = name;
  }
  if (expercience) {
    data['tempoExperiencia'] = Number(expercience);
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}api/cuidadores/v1/cuidadores_proximos`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );

    if (!res.ok) {
      const errorBody = await res.json();
      throw new Error(
        `HTTP error! status: ${res.status}, message: ${errorBody.message}`
      );
    }

    const resData = await res.json();

    return { error: false, data: resData as Caregiver[] };
  } catch (error) {
    console.error('Error fetching near caregivers:', error);
    return { error: true, message: 'Ocorreu um erro' };
  }
}

interface ProposalResponse {
  error: boolean;
  clienteId?: number;
  message?: string;
}

/**
 * Submete proposta para novo cliente (primeira proposta)
 */
export async function createNewClientProposal(
  data: NewClientProposal
): Promise<ProposalResponse> {
  console.log('🚀 ~ createNewClientProposal ~ data:', data);
  const token = await getToken();
  console.log('🚀 ~ createNewClientProposal ~ token:', token);

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}api/propostas/v1/criar_proposta`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.log('🚀 ~ createNewClientProposal ~ errorData:', errorData);
      return {
        error: true,
        message: errorData.message || 'Erro ao criar proposta',
      };
    }

    const responseData = await response.json();
    console.log('🚀 ~ createNewClientProposal ~ responseData:', responseData);
    return {
      error: false,
      clienteId: responseData.clienteId,
    };
  } catch (error) {
    console.error('Error creating new client proposal:', error);
    return {
      error: true,
      message: 'Erro ao processar requisição',
    };
  }
}

/**
 * Submete proposta para cliente existente
 */
export async function createExistingClientProposal(
  data: ExistingClientProposal
): Promise<ProposalResponse> {
  const token = await getToken();

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}api/propostas/v1`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return {
        error: true,
        message: errorData.message || 'Erro ao criar proposta',
      };
    }

    return {
      error: false,
      clienteId: data.cliente,
    };
  } catch (error) {
    console.error('Error creating existing client proposal:', error);
    return {
      error: true,
      message: 'Erro ao processar requisição',
    };
  }
}

export async function associateUserToClient(
  _prvState: State<Associate>,
  data: FormData
): Promise<State<Associate>> {
  const clientId = data.get('clientId') as string;
  console.log('🚀 ~ associateUserToClient ~ clientId:', clientId);
  const session = await getUserSession();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}api/v1/signup/add-cliente-to-user/${session.userId}/clientes/${clientId}`,
    {
      method: 'PATCH',
    }
  );

  if (res.ok) {
    return { errors: {}, message: null, error: false };
  } else {
    return {
      errors: {
        clientId: ['Erro ao associar usuário ao cliente'],
      },
      error: true,
      message: 'Ocorreu um erro',
    };
  }
}

export async function getProposals({
  page,
  limit,
  status,
  nomeCuidado,
  direction,
}: ProposalGetRequestParams): Promise<{
  error: boolean;
  data?: ProposalDTOGet;
  message?: string;
}> {
  const session = await getUserSession();

  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_URL}api/propostas/v1/propostas-clientes/${session.client?.id}`
  );
  const params = new URLSearchParams();

  if (page) params.append('page', page.toString());
  if (limit) params.append('limit', limit.toString());
  if (status) params.append('status', status);
  if (nomeCuidado) params.append('nomeCuidado', nomeCuidado);
  if (direction) params.append('direction', direction);

  url.search = params.toString();
  try {
    const res = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    if (!res.ok) {
      throw new Error('Erro ao buscar propostas');
    }

    const data = await res.json();
    return { error: false, data };
  } catch (error) {
    console.error('Error fetching proposals:', error);
    return { error: true, message: 'Ocorreu um erro' };
  }
}
