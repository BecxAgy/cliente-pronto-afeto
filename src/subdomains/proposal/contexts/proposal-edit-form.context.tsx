'use client';

import { createFormContext } from '@/src/shared/modules/contexts/form.context';
import { EditProposalSchema } from '../schemas';

/**
 * Contexto específico para o formulário de edição de propostas
 */
const { FormProvider, useFormContext } =
  createFormContext<EditProposalSchema>();

export {
  FormProvider as ProposalEditFormProvider,
  useFormContext as useProposalEditFormContext,
};
