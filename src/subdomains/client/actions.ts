'use server';
import { State } from '@/src/shared/modules/types/state.types';
import { insertUserToCookies } from './helpers';
import { loginSchema, signupSchema } from './schemas';
import { Login, Client, SignUp } from './types';
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

export async function signUp(
  previousState: State<SignUp>,
  formData: FormData
): Promise<State<SignUp>> {
  const fullname = formData.get('fullname') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;

  const validatedFields = signupSchema.safeParse({
    fullname: fullname,
    email: email,
    password: password,
    confirmPassword: confirmPassword,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Há campos a serem preenchidos corretamente.',
      error: true,
    };
  }

  // Preparar dados para enviar à API
  const signupData = {
    email: validatedFields.data.email,
    userName: validatedFields.data.fullname,
    password: validatedFields.data.password,
    roles: ['ROLE_USER'],
  };

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}api/v1/signup`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData),
      }
    );

    if (!response.ok) {
      const data = await response.json();
      return {
        errors: {},
        message: data.message || 'Erro ao criar conta. Tente novamente.',
        error: true,
      };
    }

    return {
      errors: {},
      message: 'Conta criada com sucesso!',
      error: false,
    };
  } catch (error) {
    return {
      errors: {},
      message: 'Erro interno do servidor. Tente novamente mais tarde.',
      error: true,
    };
  }
}
