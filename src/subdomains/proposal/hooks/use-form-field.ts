'use client';

import { createUseFormField } from '@/src/shared/modules/hooks/use-form-field';
import { useProposalFormContext } from '../contexts/proposal-form.context';

/**
 * Hook específico para campos do formulário de propostas
 */
export const useFormField = createUseFormField(useProposalFormContext);
