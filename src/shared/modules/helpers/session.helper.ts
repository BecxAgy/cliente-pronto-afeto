import jwt from 'jsonwebtoken';
import { UserSession } from '../types/session.types';
import { getToken } from '../services/token.service';
import { fetchClient } from '@/src/subdomains/client/actions';

export const getUserSession = async (): Promise<UserSession> => {
  const token = await getToken();

  if (!token) throw new Error('No token found');

  const decodedToken = jwt.decode(token);

  const client = await fetchClient(
    (decodedToken as jwt.JwtPayload)?.user_id,
    token
  );

  return {
    userId: (decodedToken as jwt.JwtPayload)?.user_id,
    email: (decodedToken as jwt.JwtPayload)?.sub as string,
    accessToken: token,
    refreshToken: token,
    expiresAt: (decodedToken as jwt.JwtPayload)?.exp as number,
    issuedAt: (decodedToken as jwt.JwtPayload)?.iat as number,
    client: client || undefined,
  };
};
