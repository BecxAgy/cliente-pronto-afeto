'use client';

import { UseFormReturn } from 'react-hook-form';
import { ProposalFormSchemaProps } from '../schemas';
import { useFormSteps } from './use-form-steps';
import { useFormValidation } from './use-form-validation';
import { useFormSubmission } from './use-form-submission';
import { useCallback } from 'react';

interface UseProposalFormControllerOptions {
  form: UseFormReturn<ProposalFormSchemaProps>;
  onSubmitSuccess?: (data: ProposalFormSchemaProps) => void;
  onSubmitError?: (error: Error) => void;
}

/**
 * Hook controlador principal que orquestra toda a lógica do formulário
 * Combina navegação, validação e submissão em uma única interface
 */
export function useProposalFormController({
  form,
  onSubmitSuccess,
  onSubmitError,
}: UseProposalFormControllerOptions) {
  const { setValue, handleSubmit: rhfHandleSubmit } = form;

  // Gerenciamento de etapas
  const formSteps = useFormSteps({
    onStepChange: step => {
      setValue('formType', step);
    },
  });

  // Validação
  const validation = useFormValidation({ form });

  // Submissão
  const submission = useFormSubmission();

  /**
   * Avança para a próxima etapa com validação
   */
  const handleNextStep = useCallback(async () => {
    const isValid = await validation.validateCurrentStep();

    if (!isValid) {
      return false;
    }

    if (formSteps.isLastStep) {
      // Se for a última etapa, submete o formulário
      return false; // O submit será tratado pelo onSubmit do form
    }

    formSteps.goToNextStep();
    return true;
  }, [validation, formSteps]);

  /**
   * Volta para a etapa anterior
   */
  const handlePreviousStep = useCallback(
    (event?: React.MouseEvent<HTMLButtonElement>) => {
      event?.preventDefault();
      formSteps.goToPreviousStep();
    },
    [formSteps]
  );

  /**
   * Submete o formulário final
   */
  const handleFormSubmit = useCallback(
    async (data: ProposalFormSchemaProps) => {
      await submission.submitWithLoading(
        async () => {
          // Aqui você implementará a lógica de submissão real
          // Por enquanto, retorna os dados
          return data;
        },
        {
          onSuccess: result => {
            onSubmitSuccess?.(result);
          },
          onError: error => {
            onSubmitError?.(error);
          },
        }
      );
    },
    [submission, onSubmitSuccess, onSubmitError]
  );

  /**
   * Handler combinado para o onSubmit do form
   * Decide se avança para próxima etapa ou submete o formulário
   */
  const onSubmit = rhfHandleSubmit(async data => {
    if (formSteps.isLastStep) {
      await handleFormSubmit(data);
    } else {
      await handleNextStep();
    }
  });

  /**
   * Obtém o label do botão baseado na etapa atual
   */
  const getSubmitButtonLabel = useCallback(() => {
    if (submission.isSubmitting) {
      return 'Processando...';
    }

    return formSteps.isLastStep ? 'Finalizar Proposta' : 'Próximo';
  }, [formSteps.isLastStep, submission.isSubmitting]);

  /**
   * Sincroniza o formType com a etapa atual
   */
  const syncFormType = useCallback(() => {
    setValue('formType', formSteps.currentStep);
  }, [formSteps.currentStep, setValue]);

  return {
    // Estados
    currentStep: formSteps.currentStep,
    currentStepIndex: formSteps.currentStepIndex,
    totalSteps: formSteps.totalSteps,
    progress: formSteps.progress,
    isFirstStep: formSteps.isFirstStep,
    isLastStep: formSteps.isLastStep,
    isSubmitting: submission.isSubmitting,
    error: submission.error,
    success: submission.success,

    // Navegação
    handleNextStep,
    handlePreviousStep,
    goToStep: formSteps.goToStep,

    // Submissão
    onSubmit,
    getSubmitButtonLabel,

    // Utilitários
    isStepVisited: formSteps.isStepVisited,
    validateCurrentStep: validation.validateCurrentStep,
    clearError: submission.clearError,
    resetForm: () => {
      form.reset();
      formSteps.resetSteps();
      submission.reset();
    },
    syncFormType,
  };
}
