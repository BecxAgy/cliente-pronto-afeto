'use server';

import { getToken } from '../services/token.service';
import { DispositivesDtoGet } from '../types/dispositives.types';

export async function getAllDispositives(): Promise<{
  error: boolean;
  data?: DispositivesDtoGet;
  message?: string;
}> {
  const token = await getToken();
  console.log('🚀 ~ getAllPatologies ~ token:', token);

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}api/v1/dispositivos`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const resData = await response.json();
    return { error: false, data: resData as DispositivesDtoGet };
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : String(error) || 'Unknown error';
    return { error: true, message: `Failed to fetch patologias: ${message}` };
  }
}
