'use server';
import { getToken } from '@/src/shared/modules/services/token.service';
import { Care, CareDTOGet, DeleteCare } from './types';
import { getUserSession } from '@/src/shared/modules/helpers/session.helper';
import { refresh, revalidateTag } from 'next/cache';
import { State } from '@/src/shared/modules/types/state.types';

export async function addCare(formData: Omit<Care, 'id'>, idCliente: number) {
  const token = await getToken();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}api/clientes/v1/adicionar_cuidado/${idCliente}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    }
  );

  if (!response.ok) {
    const resData = await response.json();
    return { error: true, message: resData.message };
  }

  return { error: false, message: 'Cuidado criada com sucesso!' };
}

export async function getCaresByClient(): Promise<{
  error: boolean;
  data?: CareDTOGet;
  message?: string;
}> {
  const session = await getUserSession();

  if (!session?.client)
    return { error: true, message: 'Cliente não encontrado' };

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}api/clientes/v1/get_all_cuidados/${session?.client.id}`,
      {
        cache: 'no-cache',
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
        next: { tags: ['cuidados'] },
      }
    );

    const resData = await response.json();

    if (!response.ok) {
      return { error: true, message: resData.message };
    }

    return { error: false, data: resData as CareDTOGet };
  } catch (error) {
    return { error: true, message: 'Erro ao buscar cuidados' };
  }
}

export async function getCareById(id: number): Promise<{
  error: boolean;
  data?: Care;
  message?: string;
}> {
  const session = await getUserSession();

  if (!session?.client)
    return { error: true, message: 'Cliente não encontrado' };

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}api/cuidados/v1/${id}`,
      {
        cache: 'no-cache',
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    );

    const resData = await response.json();

    if (!response.ok) {
      return { error: true, message: resData.message };
    }

    return { error: false, data: resData as Care };
  } catch (error) {
    console.error('Erro ao buscar cuidado:', error);
    return { error: true, message: 'Erro ao buscar cuidado' };
  }
}

export async function updateCare(id: number, formData: Omit<Care, 'id'>) {
  const token = await getToken();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}api/cuidados/v1/${id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    }
  );

  if (!response.ok) {
    const resData = await response.json();
    return { error: true, message: resData.message };
  }
  revalidateTag('cuidados', 'max');
  return { error: false, message: 'Cuidado atualizado com sucesso!' };
}

export async function deleteCare(
  previousState: State<DeleteCare>,
  formData: FormData
): Promise<State<DeleteCare>> {
  const careId = formData.get('careId');
  const token = await getToken();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}api/cuidados/v1/${careId}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const resData = await response.json();
    return {
      ...previousState,
      error: true,
      message: resData.message || 'Erro ao excluir cuidado.',
    };
  }

  refresh();
  return {
    ...previousState,
    error: false,
    message: 'Cuidado excluído com sucesso.',
  };
}
