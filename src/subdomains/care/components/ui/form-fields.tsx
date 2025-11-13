'use client';

import { createFormFields } from '@/src/shared/modules/components/ui/generic-form-field.component';
import { useCareFormContext } from '../../contexts/care-form.context';

export const {
  TextField,
  TextareaField,
  SelectField,
  CheckboxField,
  MultiSelectField,
  DatePickerField,
  CustomField,
} = createFormFields(useCareFormContext);
