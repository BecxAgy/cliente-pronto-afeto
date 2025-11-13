'use client';

import { createFormFields } from '@/src/shared/modules/components/ui/generic-form-field.component';
import { useProposalFormContext } from '../../contexts/proposal-form.context';

export const {
  TextField,
  TextareaField,
  SelectField,
  CheckboxField,
  MultiSelectField,
  DatePickerField,
  CustomField,
} = createFormFields(useProposalFormContext);
