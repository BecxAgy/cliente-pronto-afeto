import z from 'zod';

export const careSchema = z.object({
  id: z.number().optional(),
  nome: z
    .string({
      error: issue =>
        issue.input === undefined
          ? 'Nome é obrigatório'
          : 'Nome deve ser um texto',
    })
    .min(1, 'Nome é obrigatório')
    .max(50, 'Nome é muito longo'),
  nomeApresentacao: z
    .string({
      error: issue =>
        issue.input === undefined
          ? 'Nome de apresentação é obrigatório'
          : 'Nome de apresentação deve ser um texto',
    })
    .min(1, 'Nome de apresentação é obrigatório')
    .max(50, 'Nome de apresentação é muito longo'),
  cpf: z
    .string({
      error: issue =>
        issue.input === undefined
          ? 'CPF é obrigatório'
          : 'CPF deve ser um texto',
    })
    .min(1, 'CPF é obrigatório')
    .max(14, 'CPF é muito longo'),
  peso: z
    .string({
      error: issue =>
        issue.input === undefined
          ? 'Peso é obrigatório'
          : 'Peso deve ser um número',
    })
    .min(1, 'Peso deve ser maior que zero'),
  dataNascimento: z
    .date({
      error: issue =>
        issue.input === undefined
          ? 'Data de nascimento é obrigatória'
          : 'Data de nascimento deve ser uma data válida',
    })
    .min(1, 'Data de nascimento é obrigatória'),
});

export type CareFormSchemaProps = z.infer<typeof careSchema>;
