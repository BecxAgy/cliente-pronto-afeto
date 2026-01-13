import { z } from 'zod';

/**
 * Schema de validação para avaliação de atendimento
 *
 * Critérios avaliados:
 * - Pontualidade
 * - Comunicação
 * - Empatia
 *
 * Cada critério recebe uma nota de 1 a 5
 */
export const evaluationSchema = z.object({
  cuidador: z
    .number()
    .int('O id do cuidador deve ser um número inteiro')
    .positive('O id do cuidador é obrigatório'),

  cliente: z
    .number()
    .int('O id do cliente deve ser um número inteiro')
    .positive('O id do cliente é obrigatório'),

  notaPontualidade: z
    .number()
    .int('A nota deve ser um número inteiro')
    .min(1, 'A nota deve ser no mínimo 1')
    .max(5, 'A nota deve ser no máximo 5'),

  notaComunicacao: z
    .number()
    .int('A nota deve ser um número inteiro')
    .min(1, 'A nota deve ser no mínimo 1')
    .max(5, 'A nota deve ser no máximo 5'),

  notaEmpatia: z
    .number()
    .int('A nota deve ser um número inteiro')
    .min(1, 'A nota deve ser no mínimo 1')
    .max(5, 'A nota deve ser no máximo 5'),
});

export type EvaluationSchema = z.infer<typeof evaluationSchema>;

/**
 * Tipo do estado da action de avaliação
 */
export interface EvaluationActionState {
  status: 'idle' | 'loading' | 'success' | 'error';
  fieldErrors?: Partial<Record<keyof EvaluationSchema, string>>;
  formError?: string;
}

/**
 * Mapeamento de erros do Zod para o formato do formulário
 */
export function mapZodErrorsToFormErrors(
  errors: z.ZodError<EvaluationSchema>
): Partial<Record<keyof EvaluationSchema, string>> {
  const fieldErrors: Partial<Record<keyof EvaluationSchema, string>> = {};

  if (!errors?.issues || !Array.isArray(errors.issues)) {
    return fieldErrors;
  }

  errors.issues.forEach(issue => {
    const path = issue.path[0] as keyof EvaluationSchema;
    if (path && !fieldErrors[path]) {
      fieldErrors[path] = issue.message;
    }
  });

  return fieldErrors;
}
