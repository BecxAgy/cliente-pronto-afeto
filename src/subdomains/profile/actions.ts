'use server';

import { ClientRequest, ClientResponse } from './types';
import { refresh } from 'next/cache';
import { getUserSession } from '@/src/shared/modules/helpers/session.helper';
import { Client } from '../client/types';

export async function getClientData(): Promise<ClientResponse> {
  const profile = await getUserSession();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}api/clientes/v1/${profile.client?.id}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${profile.accessToken}`,
        },
      }
    );

    if (!res.ok) throw new Error('Erro ao buscar dados');

    const data: Client = await res.json();
    return {
      ...data,
      email: profile.email,
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function updateProfile(
  data: Partial<ClientRequest> | Record<string, unknown>
) {
  const profile = await getUserSession();
  const token = profile.accessToken;
  const id = profile.client?.id;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}api/clientes/v1/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Erro ao atualizar cuidador:', errorData);
      return { error: true, message: 'Erro ao atualizar cuidador' };
    }

    refresh();

    return {
      errors: {},
      message: 'Seus dados foram atualizados com sucesso',
      error: false,
    };
  } catch {
    return { error: true, message: 'Falha na requisição' };
  }
}
