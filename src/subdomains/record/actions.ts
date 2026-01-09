import { getUserSession } from '@/src/shared/modules/helpers/session.helper';
import { RecordRequest } from './types';

export async function getRecordByProposalId(
  request: RecordRequest,
  proposalId: string
) {
  //a data e hora deve estar presente
  if (!request.data_hora) {
    return { error: true, message: 'Data e hora são obrigatórias', data: null };
  }

  const session = await getUserSession();

  // Construir query parameters
  const params = new URLSearchParams({
    data_hora: request.data_hora,
  });

  // Adicionar status se fornecido
  if (request.status) {
    params.append('status', request.status.toString());
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}api/prontuarios/v1/${proposalId}/atividades-filtradas?${params.toString()}`,
    {
      method: 'GET',
      next: { revalidate: 360 },
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    }
  );

  if (!response.ok) {
    return {
      error: true,
      message: `Erro ao buscar prontuário: ${response.statusText}`,
      data: null,
    };
  }

  const data = await response.json();

  if (!data) {
    return { error: false, message: 'Nenhum registro encontrado', data: null };
  }

  try {
    return data;
  } catch (error) {
    console.error('Erro ao fazer parse do JSON:', error, 'Resposta:', data);
    return {
      error: true,
      message: 'Erro ao processar resposta do servidor',
      data: null,
    };
  }
}
