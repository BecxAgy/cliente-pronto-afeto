'use client';

import { createFormContext } from '@/src/shared/modules/contexts/form.context';
import { ProfileEditInputSchemaProps } from '../schemas';

const { FormProvider, useFormContext } =
  createFormContext<ProfileEditInputSchemaProps>();

export {
  FormProvider as ProfileFormProvider,
  useFormContext as useProfileFormContext,
};
