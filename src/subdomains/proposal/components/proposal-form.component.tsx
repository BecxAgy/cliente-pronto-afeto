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
import HealthFormComponent from './health-form.component';
import { DispositivesDtoGet } from '@/src/shared/modules/types/dispositives.types';
import { PatologyDtoGet } from '@/src/shared/modules/types/patology.types';
import AddressFormComponent from './address-form.component';
import DutyFormComponent from './duty-form.component';
import CaregiverFormComponent from './caregiver-form.component';
import { Client } from '../../client/types';
import { CareDTOGet } from '../../care/types';

interface ProposalFormComponentProps {
  readonly onSubmitSuccess?: (data: ProposalFormSchemaProps) => void;
  readonly onSubmitError?: (error: Error) => void;
  readonly patologies?: PatologyDtoGet;
  readonly dispositives?: DispositivesDtoGet;
  readonly client?: Client;
  readonly cares?: CareDTOGet;
}

function ProposalFormComponent({
  onSubmitSuccess,
  onSubmitError,
  patologies,
  dispositives,
  client,
  cares,
}: ProposalFormComponentProps) {
  const form = useProposalForm({ client });
  const hasExistingClient = !!client;

  const controller = useProposalFormController({
    form: form as unknown as UseProposalFormReturn,
    onSubmitSuccess,
    onSubmitError,
  });

  const {
    onSubmit,
    handlePreviousStep,
    isFirstStep,
    currentStep = ProposalFormTypeEnum.Caregivers,
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
        <Form {...form}>
          <form className="space-y-6" onSubmit={onSubmit}>
            {error && (
              <div className="bg-destructive/10 text-destructive p-4 rounded-md border border-destructive/20">
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}

            <section className="py-4">
              {currentStep === ProposalFormTypeEnum.Client && (
                <ClientFormStep hasExistingClient={hasExistingClient} />
              )}
              {currentStep === ProposalFormTypeEnum.Health && (
                <HealthFormComponent
                  patologies={patologies}
                  dispositives={dispositives}
                  cares={cares}
                  hasExistingClient={hasExistingClient}
                />
              )}
              {currentStep === ProposalFormTypeEnum.Address && (
                <AddressFormComponent />
              )}
              {currentStep === ProposalFormTypeEnum.Duty && (
                <DutyFormComponent />
              )}
              {currentStep === ProposalFormTypeEnum.Caregivers && (
                <CaregiverFormComponent />
              )}
            </section>

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
