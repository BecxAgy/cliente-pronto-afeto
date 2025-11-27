import { PatologyDtoGet } from '@/src/shared/modules/types/patology.types';

import { SkillDtoGet } from '@/src/shared/modules/types/patology.types';

export async function getAllPatologies(): Promise<{
  error: boolean;
  data?: PatologyDtoGet;
  message?: string;
}> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}api/v1/patologias`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
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

export async function getAllSkills(): Promise<{
  error: boolean;
  data?: SkillDtoGet;
  message?: string;
}> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}api/v1/patologias/habilidades`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const resData = await response.json();
    return { error: false, data: resData as SkillDtoGet };
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : String(error) || 'Unknown error';
    return { error: true, message: `Failed to fetch habilidades: ${message}` };
  }
}
