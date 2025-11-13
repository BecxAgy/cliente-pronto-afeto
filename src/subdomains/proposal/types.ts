import { ProposalFormTypeEnum } from './schemas';

export enum TurnoEnum {
  Diurno = 'diurno',
  Noturno = 'noturno',
}

export enum DiaDaSemanaEnum {
  Segunda = 'segunda',
  Terca = 'terca',
  Quarta = 'quarta',
  Quinta = 'quinta',
  Sexta = 'sexta',
  Sabado = 'sabado',
  Domingo = 'domingo',
}

export interface StepProgressComponentProps {
  readonly currentStep: ProposalFormTypeEnum;
  readonly completedSteps?: Set<ProposalFormTypeEnum>;
  readonly onStepClick?: (step: ProposalFormTypeEnum) => void;
}

export interface Step {
  id: ProposalFormTypeEnum;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface StepItemProps {
  readonly step: Step;
  readonly completedSteps: Set<ProposalFormTypeEnum>;
  readonly currentStep: ProposalFormTypeEnum;
  readonly isLastStep: boolean;
  readonly onStepClick?: (step: ProposalFormTypeEnum) => void;
}
