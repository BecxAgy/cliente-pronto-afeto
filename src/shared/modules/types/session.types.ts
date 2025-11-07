import { Client } from '@/src/subdomains/client/types';

declare interface Session {
  userName: string;
  isAuthenticated: boolean;
  issuedAt: number;
  expiresAt: number;
  accessToken: string;
  clientAccessToken: string;
  refreshToken: string;
}

export interface UserSession extends Session {
  userId: number;
  email: string;
  roles: string[];
  client?: Client;
}
