'use client';

import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { ProposalFormSchemaProps } from '../schemas';
import { proposalFormSchema, ProposalFormTypeEnum } from '../schemas';

/**
 * Hook principal para gerenciar o formulário de proposta
 * Centraliza a lógica do react-hook-form
 */
export function useProposalForm() {
  const form = useForm({
    resolver: zodResolver(proposalFormSchema),
    defaultValues: {
      formType: ProposalFormTypeEnum.Client,
    },
    mode: 'onChange',
  });

  return form;
}

export type UseProposalFormReturn = UseFormReturn<ProposalFormSchemaProps>;
