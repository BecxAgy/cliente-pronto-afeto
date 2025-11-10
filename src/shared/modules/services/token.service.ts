import { cookies } from 'next/headers';

const AUTH_TOKEN_KEY = 'client_auth_token';

export class TokenService {
  static async get(): Promise<string | null> {
    const cookie = await cookies();
    return cookie.get(AUTH_TOKEN_KEY)?.value || null;
  }

  static async set(token: string, expire: number): Promise<void> {
    const cookie = await cookies();
    cookie.set(AUTH_TOKEN_KEY, token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
      expires: new Date(expire * 1000),
    });
  }

  static async remove(): Promise<void> {
    const cookie = await cookies();
    cookie.delete(AUTH_TOKEN_KEY);
  }
}
