'use client';

import { UseFormReturn } from 'react-hook-form';
import { ProposalFormSchemaProps } from '../schemas';
import { useFormSteps } from './use-form-steps';
import { useFormValidation } from './use-form-validation';
import { useFormSubmission } from './use-form-submission';
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { getUserSession } from '@/src/shared/modules/helpers/session.helper';
import {
  buildExistingClientProposal,
  buildNewClientProposal,
} from '../helpers';
import {
  createExistingClientProposal,
  createNewClientProposal,
} from '../actions';
import { toast } from 'sonner';
import { number } from 'zod';

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
  const router = useRouter();

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
  const handleNextStep = useCallback(async (): Promise<boolean> => {
    const isValid = await validation.validateCurrentStep();

    if (!isValid) {
      return false;
    }

    // Marca o passo atual como completo após validação bem-sucedida
    formSteps.markCurrentStepAsCompleted();

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

      // Remove a marcação de completo da etapa atual ao voltar
      // Isso permite que o usuário possa editar e re-validação
      formSteps.unmarkCurrentStepAsCompleted();

      formSteps.goToPreviousStep();
      console.log('⬅️ Voltou para etapa:', formSteps.currentStep);
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
          // Obter sessão do usuário
          const userSession = await getUserSession();
          const hasExistingClient = !!userSession.client;

          let response;

          if (hasExistingClient) {
            // Cliente existente - usa ID do cliente e cuidado
            // Por enquanto cuidadoId é 0, será implementado posteriormente

            const proposalData = buildExistingClientProposal(
              data,
              userSession.client!.id
            );
            response = await createExistingClientProposal(proposalData);
          } else {
            // Novo cliente - envia todos os dados
            const proposalData = await buildNewClientProposal(data);
            response = await createNewClientProposal(proposalData);
            console.log('🚀 ~ useProposalFormController ~ response:', response);
          }

          if (response.error) {
            throw new Error(response.message || 'Erro ao criar proposta');
          }

          return {
            ...data,
            clienteId: response,
          };
        },
        {
          onSuccess: result => {
            onSubmitSuccess?.(result);
            if (typeof result.clienteId === 'number')
              router.push(`/proposal/success?clientId=${result.clienteId}`);

            router.push('/proposal/success');
          },
          onError: error => {
            onSubmitError?.(error);
          },
        }
      );
    },
    [submission, onSubmitSuccess, onSubmitError, router]
  );

  /**
   * Handler combinado para o onSubmit do form
   * Decide se avança para próxima etapa ou submete o formulário
   */
  const onSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (formSteps.isLastStep) {
        // Na última etapa, usa o handleSubmit do react-hook-form
        await rhfHandleSubmit(async data => {
          await handleFormSubmit(data);
        })(event);
      } else {
        // Nas outras etapas, apenas avança se a validação passar
        const canAdvance = await handleNextStep();
        if (!canAdvance) {
          toast.info('Preencha os dados corretamente para continuar.');
          return;
        }
      }
    },
    [formSteps.isLastStep, rhfHandleSubmit, handleFormSubmit, handleNextStep]
  );

  /**
   * Obtém o label do botão baseado na etapa atual
   */
  const getSubmitButtonLabel = useCallback(() => {
    if (submission.isSubmitting) {
      return 'Processando...';
    }

    return formSteps.isLastStep ? 'Finalizar ' : 'Próximo';
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
    isStepCompleted: formSteps.isStepCompleted,
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
