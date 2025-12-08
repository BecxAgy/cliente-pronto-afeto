'use client';

import { UseFormReturn } from 'react-hook-form';
import { EditProposalSchema } from '../schemas';
import { useFormSubmission } from './use-form-submission';
import { useCallback } from 'react';
import { editProposta } from '../actions';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface UseProposalEditControllerOptions {
  form: UseFormReturn<EditProposalSchema>;
  proposalId: string;
  onSubmitSuccess?: (data: EditProposalSchema) => void;
  onSubmitError?: (error: Error) => void;
  onClose?: () => void;
}

/**
 * Hook controlador para orquestrar a lógica do formulário de edição
 * Gerencia a submissão e feedback ao usuário
 */
export function useProposalEditController({
  form,
  proposalId,
  onSubmitSuccess,
  onSubmitError,
  onClose,
}: UseProposalEditControllerOptions) {
  const { handleSubmit: rhfHandleSubmit } = form;
  const router = useRouter();

  // Submissão
  const submission = useFormSubmission();

  /**
   * Submete o formulário de edição
   */
  const handleFormSubmit = useCallback(
    async (data: EditProposalSchema) => {
      await submission.submitWithLoading(
        async () => {
          const response = await editProposta(data, proposalId);

          if (response?.error) {
            throw new Error(response.message || 'Erro ao editar proposta');
          }

          return data;
        },
        {
          onSuccess: result => {
            toast.success('Proposta editada com sucesso!');
            onSubmitSuccess?.(result);
            onClose?.();
            router.refresh();
          },
          onError: error => {
            toast.error(error.message || 'Erro ao editar proposta');
            onSubmitError?.(error);
          },
        }
      );
    },
    [submission, proposalId, onSubmitSuccess, onSubmitError, onClose, router]
  );

  /**
   * Handler para o onSubmit do form
   */
  const onSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      await rhfHandleSubmit(async data => {
        await handleFormSubmit(data);
      })(event);
    },
    [rhfHandleSubmit, handleFormSubmit]
  );

  /**
   * Obtém o label do botão de submit
   */
  const getSubmitButtonLabel = useCallback(() => {
    if (submission.isSubmitting) {
      return 'Salvando...';
    }

    return 'Salvar Alterações';
  }, [submission.isSubmitting]);

  return {
    // Estados
    isSubmitting: submission.isSubmitting,
    error: submission.error,
    success: submission.success,

    // Submissão
    onSubmit,
    getSubmitButtonLabel,

    // Utilitários
    clearError: submission.clearError,
    resetForm: () => {
      form.reset();
      submission.reset();
    },
  };
}
