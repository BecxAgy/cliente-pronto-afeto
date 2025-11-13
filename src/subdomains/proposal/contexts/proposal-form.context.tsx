'use client';

import { createFormContext } from '@/src/shared/modules/contexts/form.context';
import { ProposalFormSchemaProps } from '../schemas';

/**
 * Contexto específico para o formulário de propostas
 */
const { FormProvider, useFormContext } =
  createFormContext<ProposalFormSchemaProps>();

export {
  FormProvider as ProposalFormProvider,
  useFormContext as useProposalFormContext,
};
