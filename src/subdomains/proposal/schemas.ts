import z from 'zod';

export enum ProposalFormTypeEnum {
  Client = 'client',
  Health = 'health',
  Address = 'address',
  Duty = 'duty',
  Caregivers = 'caregivers',
}

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
        issue.input === undefined ? 'CPF é obrigatório' : 'CPF deve ser um texto',
    })
    .min(1, 'CPF é obrigatório')
    .max(14, 'CPF é muito longo'),
  peso: z.number().min(1, 'Peso deve ser maior que zero'),
  dataNascimento: z
    .date()
    .min(new Date('1900-01-01'), 'Data de nascimento inválida'),
});
export type CareFormSchemaProps = z.infer<typeof careSchema>;

export const healthSchema = z.object({
  comentarios: z
    .string({
      error: issue =>
        issue.input === undefined
          ? 'A observação é obrigatória'
          : 'A observação deve ser um texto',
    })
    .min(1, 'A observação é obrigatória')
    .max(250, 'A observação deve ter no máximo 250 caracteres'),
  patologias: z
    .array(z.number())
    .nonempty('Você deve selecionar pelo menos uma patologia'),
  dispositivos: z.array(z.number()).optional(),
  cuidado: careSchema,
});
export type HealthFormSchemaProps = z.infer<typeof healthSchema>;

export const locationFormSchema = z.object({
  cep: z
    .string({
      error: issue =>
        issue.input === undefined ? 'CEP é obrigatório' : 'CEP deve ser um texto',
    })
    .min(1, 'CEP é obrigatório')
    .max(10, 'CEP é inválido'),
  estado: z
    .string({
      error: issue =>
        issue.input === undefined
          ? 'Estado é obrigatório'
          : 'Estado deve ser um texto',
    })
    .min(1, 'Estado é obrigatório')
    .max(50, 'Estado é muito longo'),
  cidade: z
    .string({
      error: issue =>
        issue.input === undefined
          ? 'Cidade é obrigatória'
          : 'Cidade deve ser um texto',
    })
    .min(1, 'Cidade é obrigatória')
    .max(50, 'Cidade é muito longa'),
  bairro: z
    .string({
      error: issue =>
        issue.input === undefined
          ? 'Bairro é obrigatório'
          : 'Bairro deve ser um texto',
    })
    .min(1, 'Bairro é obrigatório')
    .max(50, 'Bairro é muito longo'),
  numero: z
    .string({
      error: issue =>
        issue.input === undefined
          ? 'Número é obrigatório'
          : 'Número deve ser um texto',
    })
    .min(0, 'Número é obrigatório')
    .max(50, 'Número é muito longo'),
  complemento: z
    .string({
      error: issue =>
        issue.input === undefined ? '' : 'Complemento deve ser um texto',
    })
    .max(50, 'Complemento é muito longo')
    .optional()
    .or(z.literal('')),
  rua: z
    .string({
      error: issue =>
        issue.input === undefined ? 'Rua é obrigatória' : 'Rua deve ser um texto',
    })
    .min(1, 'Rua é obrigatória')
    .max(50, 'Rua é muito longa'),
});
export type LocationFormSchemaProps = z.infer<typeof locationFormSchema>;

const clientFormSchema = z.object({
  nome: z
    .string({
      error: issue =>
        issue.input === undefined
          ? 'Nome é obrigatório'
          : 'Nome deve ser um texto',
    })
    .nonempty('Nome é obrigatório')
    .max(50, 'Nome muito longo'),
  nomeApresentacao: z
    .string({
      error: issue =>
        issue.input === undefined ? '' : 'Nome deve ser um texto',
    })
    .max(50, 'Nome muito longo')
    .or(z.literal('')),
  nacionalidade: z
    .string({
      error: issue =>
        issue.input === undefined ? '' : 'Nacionalidade deve ser um texto',
    })
    .max(50, 'Nacionalidade muito longa')
    .or(z.literal('')),
  estadoCivil: z
    .string({
      error: issue =>
        issue.input === undefined
          ? 'Estado civil é obrigatório'
          : 'Estado civil deve ser um texto',
    })
    .nonempty('Estado civil é obrigatório')
    .max(50, 'Estado civil muito longo'),
  cpf: z
    .string({
      error: issue =>
        issue.input === undefined ? 'CPF é obrigatório' : 'CPF deve ser um texto',
    })
    .nonempty('CPF é obrigatório')
    .max(14, 'CPF muito longo'),
  rg: z
    .string({
      error: issue =>
        issue.input === undefined ? 'RG é obrigatório' : 'RG deve ser um texto',
    })
    .nonempty('RG é obrigatório')
    .max(14, 'RG muito longo'),
  telefone: z
    .string({
      error: issue =>
        issue.input === undefined
          ? 'Telefone é obrigatório'
          : 'Telefone deve ser um texto',
    })
    .nonempty('Telefone é obrigatório')
    .max(20, 'Telefone muito longo'),
  endereco: locationFormSchema,
});

export const dutyFormSchema = z.object({
  dataHoraInicioPlantao: z
    .string({
      error: issue =>
        issue.input === undefined
          ? 'Data é obrigatória'
          : 'Data deve ser um texto',
    })
    .refine(
      value => {
        const date = new Date(value);
        return !Number.isNaN(date.getTime()) && date >= new Date('1900-01-01');
      },
      { message: 'Data inválida ou menor que 1900' }
    ),
  alimentacaoFornecida: z.boolean(),
  diasDaSemana: z
    .array(z.string(), {
      message: 'Selecione ao menos um dia da semana',
    })
    .min(1, 'Selecione ao menos um dia da semana'),
  turno: z
    .array(z.string(), { message: 'Selecione ao menos um turno' })
    .min(1, 'Selecione ao menos um turno'),
});
export type DutyFormSchemaProps = z.infer<typeof dutyFormSchema>;

export const caregiverSchema = z.object({
  caregivers: z
    .array(z.number())
    .nonempty('Você deve selecionar pelo menos uma cuidador'),
});
export type CaregiverFormSchemaProps = z.infer<typeof caregiverSchema>;

export const proposalFormSchema = z.discriminatedUnion('formType', [
  z.object({
    formType: z.literal(ProposalFormTypeEnum.Client),
    client: clientFormSchema,
  }),
  z.object({
    formType: z.literal(ProposalFormTypeEnum.Health),
    health: healthSchema,
  }),
  z.object({
    formType: z.literal(ProposalFormTypeEnum.Address),
    address: locationFormSchema,
  }),
  z.object({
    formType: z.literal(ProposalFormTypeEnum.Duty),
    duty: dutyFormSchema,
  }),

  z.object({
    formType: z.literal(ProposalFormTypeEnum.Caregivers),
    caregivers: caregiverSchema,
  }),
]);

export type ProposalFormSchemaProps = z.infer<typeof proposalFormSchema>;
