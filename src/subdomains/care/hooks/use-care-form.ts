'use client';

import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { careSchema, type CareFormSchemaProps } from '../schemas';

interface UseCareFormOptions {
  defaultValues?: Partial<CareFormSchemaProps>;
}

/**
 * Hook para gerenciar o formulário de cuidados
 * Centraliza a lógica do react-hook-form
 */
export function useCareForm(options?: UseCareFormOptions) {
  const form = useForm<CareFormSchemaProps>({
    resolver: zodResolver(careSchema),
    defaultValues: options?.defaultValues || {
      nome: '',
      nomeApresentacao: '',
      cpf: '',
      peso: '',
      dataNascimento: new Date(),
    },
    mode: 'onChange',
  });

  return form;
}

export type UseCareFormReturn = UseFormReturn<CareFormSchemaProps>;
