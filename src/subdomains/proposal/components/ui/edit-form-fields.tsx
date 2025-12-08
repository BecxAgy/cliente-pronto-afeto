'use client';

import { createFormFields } from '@/src/shared/modules/components/ui/generic-form-field.component';
import { useProposalEditFormContext } from '../../contexts/proposal-edit-form.context';

export const {
  TextField,
  TextareaField,
  SelectField,
  CheckboxField,
  MultiSelectField,
  DatePickerField,
  CustomField,
} = createFormFields(useProposalEditFormContext);
