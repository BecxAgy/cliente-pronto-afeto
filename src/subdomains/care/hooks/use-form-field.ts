'use client';

import { createUseFormField } from '@/src/shared/modules/hooks/use-form-field';
import { useCareFormContext } from '../contexts/care-form.context';

/**
 * Hook específico para campos do formulário de cuidados
 */
export const useFormField = createUseFormField(useCareFormContext);
