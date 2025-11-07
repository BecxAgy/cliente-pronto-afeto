'use server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { Client } from './types';
import { UserSession } from '@/src/shared/modules/types/session.types';

export async function insertUserToCookies(
  session: UserSession,
  client: Client | null
): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.set('clientAccessToken', session.accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
    expires: new Date(session.expiresAt * 1000),
  });

  cookieStore.set('refreshToken', session.refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
    expires: new Date(session.expiresAt * 1000),
  });
  const decodedToken = jwt.decode(session.accessToken);

  const userCredentials = {
    userId: (decodedToken as jwt.JwtPayload)?.user_id,
    email: (decodedToken as jwt.JwtPayload)?.sub,
    roles: (decodedToken as jwt.JwtPayload)?.roles,
    isAuthenticated: true,
    issuedAt: session.issuedAt,
    expiresAt: session.expiresAt,
    client: client,
  };

  cookieStore.set(
    'clientUserCredentials',
    encodeURIComponent(JSON.stringify(userCredentials)),
    {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
      expires: new Date(session.expiresAt * 1000),
    }
  );
}
