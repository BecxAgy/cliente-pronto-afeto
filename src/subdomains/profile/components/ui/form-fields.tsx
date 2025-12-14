'use client';

import { createFormFields } from '@/src/shared/modules/components/ui/generic-form-field.component';
import { useProfileFormContext } from '../../contexts/profile-form.context';

// Criando campos tipados para o formulário de profile
export const {
  TextField: ProfileTextField,
  TextareaField: ProfileTextareaField,
  SelectField: ProfileSelectField,
  CheckboxField: ProfileCheckboxField,
  MultiSelectField: ProfileMultiSelectField,
  DatePickerField: ProfileDatePickerField,
  CustomField: ProfileCustomField,
} = createFormFields(useProfileFormContext);
