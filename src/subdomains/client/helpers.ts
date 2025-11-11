'use server';

import { Client } from './types';
import { UserSession } from '@/src/shared/modules/types/session.types';
import {
  setRefresh,
  setToken,
} from '@/src/shared/modules/services/token.service';

export async function insertUserToCookies(
  session: UserSession,
  client: Client | null
): Promise<void> {
  await setToken(session.accessToken, session.expiresAt);
  await setRefresh(session.refreshToken, session.expiresAt);
}
