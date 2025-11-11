'use client';

import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { type UseFormReturn } from 'react-hook-form';
import { type ProposalFormSchemaProps } from '../schemas';

interface ProposalFormContextValue {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<ProposalFormSchemaProps, any, undefined>;
}

const ProposalFormContext = createContext<ProposalFormContextValue | null>(
  null
);

interface ProposalFormProviderProps {
  readonly form: UseFormReturn<ProposalFormSchemaProps, any, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  readonly children: ReactNode;
}

export function ProposalFormProvider({
  form,
  children,
}: ProposalFormProviderProps) {
  const value = useMemo(() => ({ form }), [form]);

  return (
    <ProposalFormContext.Provider value={value}>
      {children}
    </ProposalFormContext.Provider>
  );
}

export function useProposalFormContext() {
  const context = useContext(ProposalFormContext);

  if (!context) {
    throw new Error(
      'useProposalFormContext must be used within ProposalFormProvider'
    );
  }

  return context;
}
