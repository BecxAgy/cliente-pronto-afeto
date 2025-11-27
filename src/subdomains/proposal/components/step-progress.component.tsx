'use client';

import Image from 'next/image';
import { cn } from '@/src/shared/modules/lib/utils';
import { ProposalFormTypeEnum } from '../schemas';
import { User, Heart, MapPin, Calendar, Users, Check } from 'lucide-react';
import { Step, StepItemProps, StepProgressComponentProps } from '../types';

const STEPS: Step[] = [
  {
    id: ProposalFormTypeEnum.Client,
    title: 'Dados do Cliente',
    description: 'Informações pessoais',
    icon: User,
  },
  {
    id: ProposalFormTypeEnum.Health,
    title: 'Informações de Saúde',
    description: 'Condições e cuidados',
    icon: Heart,
  },
  {
    id: ProposalFormTypeEnum.Address,
    title: 'Endereço',
    description: 'Local de atendimento',
    icon: MapPin,
  },
  {
    id: ProposalFormTypeEnum.Duty,
    title: 'Plantão',
    description: 'Horários e turnos',
    icon: Calendar,
  },
  {
    id: ProposalFormTypeEnum.Caregivers,
    title: 'Cuidadores',
    description: 'Seleção de profissionais',
    icon: Users,
  },
];

function StepItem({
  step,
  completedSteps,
  currentStep,
  isLastStep,
  onStepClick,
}: StepItemProps) {
  const isCompleted = completedSteps?.has(step.id) ?? false;
  const isCurrent = step.id === currentStep;
  const Icon = step.icon;
  const isClickable = onStepClick && (isCompleted || isCurrent);

  const getCircleStyles = () => {
    if (isCompleted) return 'bg-success border-success text-success-foreground';
    if (isCurrent) return 'bg-info/10 border-info text-primary';
    return 'bg-background border-border text-muted-foreground';
  };

  const getTitleStyles = () => {
    if (isCurrent || isCompleted) return 'text-foreground';
    return 'text-muted-foreground';
  };

  const getDescriptionStyles = () => {
    if (isCurrent) return 'text-primary';
    if (isCompleted) return 'text-muted-foreground/80';
    return 'text-muted-foreground/60';
  };

  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div
          className={cn(
            'shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all border-2',
            getCircleStyles()
          )}
        >
          {isCompleted ? (
            <Check className="w-5 h-5" />
          ) : (
            <Icon className="w-5 h-5" />
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={() => isClickable && onStepClick?.(step.id)}
        disabled={!isClickable}
        className={cn(
          'flex-1 text-left py-1.5 px-3 rounded-2xl transition-all',
          'hover:bg-background/50 h-10 flex flex-col justify-center',

          isClickable && 'cursor-pointer',
          !isClickable && 'cursor-default'
        )}
      >
        <p
          className={cn(
            'text-sm font-medium transition-colors leading-tight',
            getTitleStyles()
          )}
        >
          {step.title}
        </p>
        <p
          className={cn(
            'text-xs transition-colors leading-tight',
            getDescriptionStyles()
          )}
        >
          {isCompleted ? 'Completo' : step.description}
        </p>
      </button>
    </div>
  );
}

function StepProgressComponent({
  currentStep,
  completedSteps,
  onStepClick,
}: StepProgressComponentProps) {
  const currentStepIndex = STEPS.findIndex(step => step.id === currentStep);
  const safeCompletedSteps = completedSteps ?? new Set<ProposalFormTypeEnum>();

  return (
    <div className="bg-background rounded-3xl py-2 px-8 space-y-8 sticky top-6">
      {/* Logo */}
      <div className="flex">
        <Image
          src="/images/logo.png"
          alt="Logo"
          width={120}
          height={120}
          className="object-contain"
        />
      </div>

      {/* Steps */}
      <div className="space-y-14">
        {STEPS.map((step, index) => (
          <StepItem
            key={step.id}
            step={step}
            completedSteps={safeCompletedSteps}
            currentStep={currentStep}
            isLastStep={index === STEPS.length - 1}
            onStepClick={onStepClick}
          />
        ))}
      </div>

      {/* Footer Info */}
      <div className="pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground text-center">
          Etapa {currentStepIndex + 1} de {STEPS.length}
        </p>
      </div>
    </div>
  );
}

export default StepProgressComponent;
