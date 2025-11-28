'use server';
import { getToken } from '@/src/shared/modules/services/token.service';
import { Address, Caregiver } from '@/src/shared/modules/types/caregiver.types';
import {
  dataURLtoBlob,
  ExistingClientProposal,
  NewClientProposal,
} from './helpers';
import { getUserSession } from '@/src/shared/modules/helpers/session.helper';
import { State } from '@/src/shared/modules/types/state.types';
import {
  Associate,
  ProposalDTOGet,
  ProposalGetRequestParams,
  CancelProposal,
  ProposalSign,
} from './types';
import { refresh } from 'next/cache';
import { signatureSchema } from './schemas';

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
      next: {
        tags: ['proposals'],
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

export async function cancelProposal(
  previousState: State<CancelProposal>,
  req: FormData
): Promise<State<CancelProposal>> {
  const token = await getToken();
  const proposalId = req.get('proposalId')?.toString();

  if (!proposalId) {
    return {
      errors: { proposalId: ['ID da proposta é obrigatório'] },
      error: true,
      message: 'ID da proposta é obrigatório',
    };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}api/propostas/v1/${proposalId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      return { errors: {}, error: true, message: 'Erro ao cancelar proposta' };
    }

    refresh();

    return {
      errors: {},
      error: false,
      message: 'Proposta cancelada com sucesso',
    };
  } catch (error) {
    console.error('Error cancelling proposal:', error);
    return { errors: {}, error: true, message: 'Erro ao cancelar proposta' };
  }
}

export async function sendSignature(
  previousState: State<ProposalSign>,
  formData: FormData
): Promise<State<ProposalSign>> {
  const user = await getUserSession();

  if (!user) throw new Error('Usuário não encontrado');
  const imageData = formData.get('image');

  if (!imageData || typeof imageData !== 'string') {
    return {
      errors: { image: ['Invalid image data'] },
      message:
        'Há campos a serem preenchidos corretamente. Erro ao criar documento',
      error: true,
    };
  }
  const image = dataURLtoBlob(imageData);

  const validatedFields = signatureSchema.safeParse({
    image: image,
  });

  if (!validatedFields.success) {
    const errors = validatedFields.error.flatten().fieldErrors;
    return {
      errors,
      message:
        'Há campos a serem preenchidos corretamente. Erro ao criar documento',
      error: true,
    };
  }
  const id = formData.get('id')?.toString();
  formData.delete('id');
  formData.delete('image');
  formData.append('image', image, 'assinatura.png');

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}api/contratos/v1/${id}/pdf-assinado`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
      body: formData,
    }
  );

  if (!response.ok) {
    const data = await response.json();
    return {
      errors: {},
      message: data.message.toString(),
      error: true,
    };
  }

  return {
    errors: {},
    message: 'Assinatura enviada com sucesso',
    error: false,
  };
}

export async function downloadContract(
  previousState: State<{ pdfBase64?: string }>,
  formData: FormData
): Promise<State<{ pdfBase64?: string }>> {
  const proposalId = formData.get('proposalId')?.toString();

  if (!proposalId) {
    return {
      errors: {},
      error: true,
      message: 'ID da proposta é obrigatório',
    };
  }

  const session = await getUserSession();

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}api/contratos/v1/${proposalId}/pdf`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return {
        errors: {},
        error: true,
        message: errorData.message || 'Erro ao baixar contrato',
      };
    }

    // Converte blob para buffer e depois para base64 no servidor
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = `data:application/pdf;base64,${buffer.toString('base64')}`;

    return {
      errors: {},
      error: false,
      message: 'Contrato baixado com sucesso',
      data: {
        pdfBase64: base64,
      },
    };
  } catch (error) {
    console.error('Error downloading contract:', error);
    return {
      errors: {},
      error: true,
      message: 'Erro ao processar download',
    };
  }
}
