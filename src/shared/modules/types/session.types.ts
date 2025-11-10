import { Client } from '@/src/subdomains/client/types';

declare interface Session {
  issuedAt: number;
  expiresAt: number;

  accessToken: string;
  refreshToken: string;
}

export interface UserSession extends Session {
  userId: number;
  email: string;
  client?: Client;
}
