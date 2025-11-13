'use server';
import { getToken } from '@/src/shared/modules/services/token.service';
import { Care } from './types';

export async function addCare(formData: Care, idCliente: number) {
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

  return { error: false, message: 'Proposta criada com sucesso!' };
}
