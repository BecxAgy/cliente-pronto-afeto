'use client';

import { type Path } from 'react-hook-form';
import { useProposalFormContext } from '../contexts/proposal-form.context';
import { type ProposalFormSchemaProps } from '../schemas';

export function useFormField(name: Path<ProposalFormSchemaProps>) {
  const { form } = useProposalFormContext();

  return {
    control: form.control,
    name,
    fieldState: form.getFieldState(name),
    formState: form.formState,
  };
}
