'use server';

import { getUserSession } from '@/src/shared/modules/helpers/session.helper';
import { RecordRequest } from './types';
import { transformFromApiFormat } from './helpers/record.helper';
import {
  evaluationSchema,
  EvaluationActionState,
  mapZodErrorsToFormErrors,
} from './schemas';
import { revalidatePath } from 'next/cache';

export async function getRecordByProposalId(
  request: RecordRequest,
  proposalId: string
) {
  //a data e hora deve estar presente
  if (!request.data_hora) {
    return {
      error: true,
      message: 'Data e hora são obrigatórias para buscar o prontuário.',
      data: null,
    };
  }

  try {
    const session = await getUserSession();

    if (!session?.accessToken) {
      return {
        error: true,
        message: 'Sessão não encontrada. Faça login novamente.',
        data: null,
      };
    }

    // Construir query parameters
    // API espera apenas data (YYYY-MM-DD), não timestamp completo
    const dataOnly = request.data_hora.split('T')[0];
    const params = new URLSearchParams({
      data_hora: dataOnly,
    });

    // Adicionar status se fornecido
    if (request.status !== undefined) {
      params.append('status', request.status.toString());
    }

    const url = `${process.env.NEXT_PUBLIC_API_URL}api/prontuarios/v1/${proposalId}/atividades-filtradas?${params.toString()}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      let errorMessage = `Erro ao buscar prontuário (${response.status})`;

      try {
        const errorData = await response.text();

        errorMessage += `: ${errorData || response.statusText}`;
      } catch {
        errorMessage += `: ${response.statusText}`;
      }

      return { error: true, message: errorMessage, data: null };
    }

    const data = await response.json();

    if (!data) {
      return {
        error: false,
        message: 'Nenhum registro encontrado',
        data: null,
      };
    }

    // Transformar resposta da API (strings) para enums internos (numbers)
    const transformedData = transformFromApiFormat(data);
    return transformedData;
  } catch (error) {
    console.error('💥 Erro ao buscar prontuário:', error);
    return {
      error: true,
      message: `Erro inesperado: ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
      data: null,
    };
  }
}

/**
 * Server Action para criar avaliação de atendimento
 *
 * @param prevState - Estado anterior da action
 * @param formData - Dados do formulário
 * @returns Estado atualizado com resultado da operação
 */
export async function createEvaluationAction(
  prevState: EvaluationActionState,
  formData: FormData
): Promise<EvaluationActionState> {
  try {
    const user = await getUserSession();
    // Extrair dados do FormData
    const rawData = {
      cuidador: Number(formData.get('cuidador')),
      cliente: user.client?.id,
      notaPontualidade: Number(formData.get('notaPontualidade')),
      notaComunicacao: Number(formData.get('notaComunicacao')),
      notaEmpatia: Number(formData.get('notaEmpatia')),
    };
    console.log('🚀 ~ createEvaluationAction ~ rawData:', rawData);

    // Validar com Zod
    const validationResult = evaluationSchema.safeParse(rawData);

    if (!validationResult.success) {
      return {
        status: 'error',
        fieldErrors: mapZodErrorsToFormErrors(validationResult.error),
        formError: 'Por favor, preencha todos os campos corretamente',
      };
    }

    const validatedData = validationResult.data;

    // Obter sessão do usuário
    const session = await getUserSession();

    if (!session?.accessToken) {
      return {
        status: 'error',
        formError: 'Sessão não encontrada. Faça login novamente.',
      };
    }

    // Preparar payload para API
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const payload = {
      cuidador: validatedData.cuidador,
      cliente: validatedData.cliente,
      notaPontualidade: validatedData.notaPontualidade,
      notaComunicacao: validatedData.notaComunicacao,
      notaEmpatia: validatedData.notaEmpatia,
      dataAvaliacao: today,
    };

    // Enviar para API
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}api/avaliacoes/v1`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      let errorMessage = 'Erro ao enviar avaliação';

      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch {
        errorMessage = response.statusText || errorMessage;
      }

      return {
        status: 'error',
        formError: errorMessage,
      };
    }

    // Revalidar cache da página
    revalidatePath('/proposal/[id]/record', 'page');

    return {
      status: 'success',
    };
  } catch (error) {
    console.error('💥 Erro ao criar avaliação:', error);

    return {
      status: 'error',
      formError:
        error instanceof Error
          ? error.message
          : 'Erro inesperado ao enviar avaliação',
    };
  }
}
