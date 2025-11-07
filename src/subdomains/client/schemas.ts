import { z } from 'zod';

export const loginSchema = z.object({
  email: z.email('Email inválido'),
  password: z.string().min(1, 'Senha é obrigatória'),
});

export const signupSchema = z
  .object({
    fullname: z
      .string()
      .min(1, { message: 'Nome completo é obrigatório' })
      .max(100, { message: 'Nome completo deve ter no máximo 100 caracteres' }),
    email: z.string().email({ message: 'Email inválido' }),
    password: z
      .string()
      .min(8, { message: 'Senha deve ter pelo menos 8 caracteres' })
      .max(20, { message: 'Senha deve ter no máximo 20 caracteres' })
      .refine(password => /[A-Z]/.test(password), {
        message: 'Senha deve incluir pelo menos uma letra maiúscula',
      })
      .refine(password => /[a-z]/.test(password), {
        message: 'Senha deve incluir pelo menos uma letra minúscula',
      })
      .refine(password => /[0-9]/.test(password), {
        message: 'Senha deve incluir pelo menos um número',
      })
      .refine(password => /[!@#$%^&*]/.test(password), {
        message:
          'Senha deve incluir pelo menos um caractere especial (!@#$%^&*)',
      }),
    confirmPassword: z
      .string()
      .min(1, { message: 'Confirmação de senha é obrigatória' }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });
