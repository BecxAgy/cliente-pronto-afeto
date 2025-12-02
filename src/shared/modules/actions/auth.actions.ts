'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const logout = async () => {
  const cookieStore = await cookies();

  cookieStore.delete('client_auth_token');
  cookieStore.delete('client_refresh_token');

  redirect('/auth/login');
};
