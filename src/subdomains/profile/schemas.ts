import { z } from 'zod';

// Schema para endereço
export const enderecoSchema = z.object({
  rua: z.string().min(1, 'Rua é obrigatória'),
  cidade: z.string().min(1, 'Cidade é obrigatória'),
  estado: z
    .string()
    .min(2, 'Estado é obrigatório')
    .max(2, 'Estado deve ter 2 caracteres'),
  cep: z.string().min(8, 'CEP deve ter 8 dígitos').max(9, 'CEP inválido'),
  bairro: z.string().min(1, 'Bairro é obrigatório'),
  complemento: z.string().optional(),
  numero: z.string().min(1, 'Número é obrigatório'),
});

// Schema para edição de perfil (apenas campos editáveis)
export const profileEditSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  nomeApresentacao: z.string().min(1, 'Nome de apresentação é obrigatório'),
  telefone: z
    .string()
    .min(10, 'Telefone deve ter no mínimo 10 dígitos')
    .max(15, 'Telefone deve ter no máximo 15 dígitos'),
  endereco: enderecoSchema,
  nacionalidade: z.string().min(1, 'Nacionalidade é obrigatória'),
  estadoCivil: z.string().min(1, 'Estado civil é obrigatório'),
});

// Schema de entrada (antes de transformações)
export const profileEditInputSchema = profileEditSchema;

export type ProfileEditInputSchemaProps = z.infer<
  typeof profileEditInputSchema
>;
export type ProfileEditSchemaProps = z.infer<typeof profileEditSchema>;
export type EnderecoSchemaProps = z.infer<typeof enderecoSchema>;
