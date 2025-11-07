'use server';
import { insertUserToCookies } from './helpers';
import { loginSchema } from './schemas';
import { Login, State, Client } from './types';
import jwt from 'jsonwebtoken';

export async function fetchClient(
  userId: number,
  clientAccessToken?: string
): Promise<Client | null> {
  if (!clientAccessToken) return null;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}api/clientes/v1/cliente-user/${userId}`,
    {
      cache: 'no-cache',
      headers: {
        Authorization: `Bearer ${clientAccessToken}`,
      },
    }
  );
  if (res.ok) {
    const data = await res.json();

    return data;
  }

  return null;
}

export async function login(
  previousState: State<Login>,
  formData: FormData
): Promise<State<Login>> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const validatedFields = loginSchema.safeParse({
    email: email,
    password: password,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message:
        'Há campos a serem preenchidos corretamente. Erro ao criar documento',
      error: true,
    };
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}api/v1/auth/signin`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    return {
      errors: {},
      message: data.message.toString(),
      error: true,
    };
  }
  const decodedToken = jwt.decode(data.accessToken);
  const userId = (decodedToken as jwt.JwtPayload)?.user_id;

  const client = await fetchClient(userId, data.accessToken);

  await insertUserToCookies(data, client);

  return {
    errors: {},
    message: 'Login efetuado com sucesso',
    error: false,
  };
}

export async function loginWithGoogle(
  previousState: State<undefined>,
  formData: FormData
): Promise<State<undefined>> {
  const token = formData.get('token') as string;

  if (!token) {
    return {
      errors: undefined,
      message: 'Token não encontrado',
      error: true,
    };
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}api/v1/auth/validadte/${token}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    return {
      errors: undefined,
      message: data.message.toString(),
      error: true,
    };
  }

  const decodedToken = jwt.decode(data.accessToken);
  const userId = (decodedToken as jwt.JwtPayload)?.user_id;

  const client = await fetchClient(userId, data.accessToken);

  await insertUserToCookies(data, client);

  return {
    errors: undefined,
    message: 'Login efetuado com sucesso',
    error: false,
  };
}
