'use server';
import { cookies } from 'next/headers';

const AUTH_TOKEN_KEY = 'client_auth_token';
const REFRESH_TOKEN_KEY = 'client_refresh_token';

export async function getToken(): Promise<string | null> {
  const cookie = await cookies();
  return cookie.get(AUTH_TOKEN_KEY)?.value || null;
}

export async function getRefresh(): Promise<string | null> {
  const cookie = await cookies();
  return cookie.get(REFRESH_TOKEN_KEY)?.value || null;
}

export async function setToken(token: string, expire: number): Promise<void> {
  const cookie = await cookies();
  cookie.set(AUTH_TOKEN_KEY, token, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
    expires: new Date(expire * 1000),
  });
}

export async function setRefresh(token: string, expire: number): Promise<void> {
  const cookie = await cookies();
  cookie.set(REFRESH_TOKEN_KEY, token, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
    expires: new Date(expire * 1000),
  });
}

export async function removeToken(): Promise<void> {
  const cookie = await cookies();
  cookie.delete(AUTH_TOKEN_KEY);
}

export async function removeAllTokens(): Promise<void> {
  const cookie = await cookies();
  cookie.delete(AUTH_TOKEN_KEY);
  cookie.delete(REFRESH_TOKEN_KEY);
}
