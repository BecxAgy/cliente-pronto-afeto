'use client';

import { useState, useCallback } from 'react';
import { ProposalFormTypeEnum } from '../schemas';

/**
 * Define a ordem das etapas do formulário
 */
const FORM_STEPS = [
  ProposalFormTypeEnum.Client,
  ProposalFormTypeEnum.Health,
  ProposalFormTypeEnum.Address,
  ProposalFormTypeEnum.Duty,
  ProposalFormTypeEnum.Caregivers,
] as const;

type FormStep = (typeof FORM_STEPS)[number];

interface UseFormStepsOptions {
  initialStep?: FormStep;
  onStepChange?: (step: FormStep) => void;
}

/**
 * Hook para gerenciar a navegação entre as etapas do formulário
 * Responsável por controlar o estado atual e a navegação entre steps
 */
export function useFormSteps(options: UseFormStepsOptions = {}) {
  const { initialStep = ProposalFormTypeEnum.Client, onStepChange } = options;

  const [currentStep, setCurrentStep] = useState<FormStep>(initialStep);
  const [visitedSteps, setVisitedSteps] = useState<Set<FormStep>>(
    new Set([initialStep])
  );
  const [completedSteps, setCompletedSteps] = useState<Set<FormStep>>(
    new Set()
  );

  const currentStepIndex = FORM_STEPS.indexOf(currentStep);
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === FORM_STEPS.length - 1;

  /**
   * Avança para a próxima etapa
   */
  const goToNextStep = useCallback(() => {
    if (isLastStep) return;

    const nextStep = FORM_STEPS[currentStepIndex + 1];
    setCurrentStep(nextStep);
    setVisitedSteps(prev => new Set(prev).add(nextStep));
    onStepChange?.(nextStep);
  }, [currentStepIndex, isLastStep, onStepChange]);

  /**
   * Volta para a etapa anterior
   */
  const goToPreviousStep = useCallback(() => {
    if (isFirstStep) return;

    const previousStep = FORM_STEPS[currentStepIndex - 1];
    setCurrentStep(previousStep);
    onStepChange?.(previousStep);
  }, [currentStepIndex, isFirstStep, onStepChange]);

  /**
   * Navega para uma etapa específica
   */
  const goToStep = useCallback(
    (step: FormStep) => {
      if (!FORM_STEPS.includes(step)) return;

      setCurrentStep(step);
      setVisitedSteps(prev => new Set(prev).add(step));
      onStepChange?.(step);
    },
    [onStepChange]
  );

  /**
   * Reseta o formulário para a etapa inicial
   */
  const resetSteps = useCallback(() => {
    setCurrentStep(initialStep);
    setVisitedSteps(new Set([initialStep]));
    setCompletedSteps(new Set());
    onStepChange?.(initialStep);
  }, [initialStep, onStepChange]);

  /**
   * Marca a etapa atual como completa (validada)
   */
  const markCurrentStepAsCompleted = useCallback(() => {
    setCompletedSteps(prev => new Set(prev).add(currentStep));
  }, [currentStep]);

  /**
   * Desmarca a etapa atual como completa
   * Útil ao voltar uma etapa para permitir re-validação
   */
  const unmarkCurrentStepAsCompleted = useCallback(() => {
    setCompletedSteps(prev => {
      const newSet = new Set(prev);
      newSet.delete(currentStep);
      return newSet;
    });
  }, [currentStep]);

  /**
   * Verifica se uma etapa foi completada (validada)
   */
  const isStepCompleted = useCallback(
    (step: FormStep) => {
      return completedSteps.has(step);
    },
    [completedSteps]
  );

  /**
   * Verifica se uma etapa já foi visitada
   */
  const isStepVisited = useCallback(
    (step: FormStep) => {
      return visitedSteps.has(step);
    },
    [visitedSteps]
  );

  /**
   * Calcula o progresso do formulário (0-100)
   */
  const progress = Math.round(
    ((currentStepIndex + 1) / FORM_STEPS.length) * 100
  );

  return {
    // Estado atual
    currentStep,
    currentStepIndex,
    totalSteps: FORM_STEPS.length,
    progress,

    // Flags
    isFirstStep,
    isLastStep,

    // Navegação
    goToNextStep,
    goToPreviousStep,
    goToStep,
    resetSteps,

    // Utilitários
    isStepVisited,
    isStepCompleted,
    markCurrentStepAsCompleted,
    unmarkCurrentStepAsCompleted,
    steps: FORM_STEPS,
  };
}
