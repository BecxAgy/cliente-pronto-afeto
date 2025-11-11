'use client';

import { useMemo } from 'react';
import { Form } from '@/src/shared/modules/components/ui/form';
import { Button } from '@/src/shared/modules/components/ui/button';
import {
  useProposalForm,
  useProposalFormController,
  type UseProposalFormReturn,
} from '../hooks';
import { ProposalFormSchemaProps, ProposalFormTypeEnum } from '../schemas';
import StepProgressComponent from './step-progress.component';
import ClientFormStep from './client-form.component';
import { ProposalFormProvider } from '../contexts/proposal-form.context';

interface ProposalFormComponentProps {
  readonly onSubmitSuccess?: (data: ProposalFormSchemaProps) => void;
  readonly onSubmitError?: (error: Error) => void;
}

function ProposalFormComponent({
  onSubmitSuccess,
  onSubmitError,
}: ProposalFormComponentProps) {
  const form = useProposalForm();

  const controller = useProposalFormController({
    form: form as unknown as UseProposalFormReturn,
    onSubmitSuccess,
    onSubmitError,
  });

  const {
    onSubmit,
    handlePreviousStep,
    isFirstStep,
    currentStep,
    isSubmitting,
    error,
    getSubmitButtonLabel,
    isStepCompleted,
    goToStep,
  } = controller;

  const completedStepsSet = useMemo(() => {
    const allSteps = Object.values(ProposalFormTypeEnum);
    return new Set<ProposalFormTypeEnum>(
      allSteps.filter(step => isStepCompleted?.(step) ?? false)
    );
  }, [isStepCompleted]);

  return (
    <ProposalFormProvider form={form}>
      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">
        {/* Sidebar com progresso */}
        <aside className="hidden lg:block">
          {currentStep && (
            <StepProgressComponent
              currentStep={currentStep}
              completedSteps={completedStepsSet}
              onStepClick={goToStep}
            />
          )}
        </aside>

        {/* Formulário principal */}
        <Form {...form}>
          <form className="space-y-6" onSubmit={onSubmit}>
            {/* Mensagem de erro */}
            {error && (
              <div className="bg-destructive/10 text-destructive p-4 rounded-md border border-destructive/20">
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}

            {/* Conteúdo do formulário baseado na etapa atual */}
            <section className="py-4">
              {currentStep === ProposalFormTypeEnum.Client && (
                <ClientFormStep />
              )}
              {currentStep === ProposalFormTypeEnum.Health &&
                'Informe as condições de saúde e necessidades especiais'}
              {currentStep === ProposalFormTypeEnum.Address &&
                'Endereço onde o atendimento será realizado'}
              {currentStep === ProposalFormTypeEnum.Duty &&
                'Defina os horários e turnos de atendimento'}
              {currentStep === ProposalFormTypeEnum.Caregivers &&
                'Escolha os profissionais para o atendimento'}
            </section>

            {/* Botões de navegação */}
            <div className="flex justify-between gap-4">
              {!isFirstStep && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePreviousStep}
                  disabled={isSubmitting}
                  className="rounded-full px-8"
                >
                  Voltar
                </Button>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="ml-auto rounded-full px-8 bg-primary hover:bg-primary/90"
              >
                {getSubmitButtonLabel()}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </ProposalFormProvider>
  );
}

export default ProposalFormComponent;
