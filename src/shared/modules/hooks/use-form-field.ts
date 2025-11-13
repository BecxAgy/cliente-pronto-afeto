'use client';

import {
  type Path,
  type FieldValues,
  type UseFormReturn,
} from 'react-hook-form';

/**
 * Hook genérico para gerenciar um campo de formulário
 * Pode ser usado em qualquer formulário independente do schema
 */
export function createUseFormField<TFormData extends FieldValues>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useFormContext: () => { form: UseFormReturn<TFormData, any, TFormData> }
) {
  return function useFormField(name: Path<TFormData>) {
    const { form } = useFormContext();

    return {
      control: form.control,
      name,
      fieldState: form.getFieldState(name),
      formState: form.formState,
    };
  };
}
