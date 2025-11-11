import { PatologyDtoGet } from '@/src/shared/modules/types/patology.types';
import { getToken } from '../services/token.service';

export async function getAllPatologies(): Promise<{
  error: boolean;
  data?: PatologyDtoGet;
  message?: string;
}> {
  const token = await getToken();

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}api/v1/patologias`,
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
    return { error: false, data: resData as PatologyDtoGet };
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : String(error) || 'Unknown error';
    return { error: true, message: `Failed to fetch patologias: ${message}` };
  }
}
