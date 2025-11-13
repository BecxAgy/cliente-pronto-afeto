'use server';

import { getUserSession } from '@/src/shared/modules/helpers/session.helper';

/**
 * Obtém o ID do cliente da sessão atual
 */
export async function getClientId(): Promise<number> {
  const session = await getUserSession();

  if (!session.client) {
    throw new Error(
      'Você precisar criar uma proposta antes de adicionar cuidados.'
    );
  }

  return session.client?.id;
}
