'use client';

import { createFormContext } from '@/src/shared/modules/contexts/form.context';
import { CareFormSchemaProps } from '../schemas';

/**
 * Contexto específico para o formulário de cuidados
 */
const { FormProvider, useFormContext } =
  createFormContext<CareFormSchemaProps>();

export {
  FormProvider as CareFormProvider,
  useFormContext as useCareFormContext,
};
