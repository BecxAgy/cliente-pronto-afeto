'use server';

import jwt from 'jsonwebtoken';
import { Client } from './types';
import { UserSession } from '@/src/shared/modules/types/session.types';
import { TokenService } from '@/src/shared/modules/services/token.service';

export async function insertUserToCookies(
  session: UserSession,
  client: Client | null
): Promise<void> {
  TokenService.set(session.accessToken, session.expiresAt);
  TokenService.set(session.refreshToken, session.expiresAt);
  const decodedToken = jwt.decode(session.accessToken);

  const userCredentials = {
    userId: (decodedToken as jwt.JwtPayload)?.user_id,
    email: (decodedToken as jwt.JwtPayload)?.sub,
    client: client,
  };

  TokenService.set(JSON.stringify(userCredentials), session.expiresAt);
}
