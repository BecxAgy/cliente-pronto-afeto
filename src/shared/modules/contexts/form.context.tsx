'use client';

import { createContext, useContext, useMemo, type ReactNode } from 'react';
import {
  type UseFormReturn,
  type FieldValues,
  FormProvider as RHFFormProvider,
} from 'react-hook-form';

interface FormContextValue<TFormData extends FieldValues> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<TFormData, any, TFormData>;
}

/**
 * Cria um contexto genérico de formulário
 * Pode ser usado em qualquer subdomínio com diferentes schemas
 */
export function createFormContext<TFormData extends FieldValues>() {
  const FormContext = createContext<FormContextValue<TFormData> | null>(null);

  interface FormProviderProps {
    readonly form: UseFormReturn<TFormData, any, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
    readonly children: ReactNode;
  }

  function FormProvider({ form, children }: FormProviderProps) {
    const value = useMemo(() => ({ form }), [form]);

    return (
      <RHFFormProvider {...form}>
        <FormContext.Provider value={value}>{children}</FormContext.Provider>
      </RHFFormProvider>
    );
  }

  function useFormContext() {
    const context = useContext(FormContext);

    if (!context) {
      throw new Error('useFormContext must be used within FormProvider');
    }

    return context;
  }

  return {
    FormProvider,
    useFormContext,
  };
}
