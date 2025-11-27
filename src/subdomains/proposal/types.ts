import { ProposalFormTypeEnum } from './schemas';

export enum TurnoEnum {
  Diurno = 'Diurno',
  Noturno = 'Noturno',
}

export enum DiaDaSemanaEnum {
  Segunda = 'SEGUNDA_FEIRA',
  Terca = 'TERCA_FEIRA',
  Quarta = 'QUARTA_FEIRA',
  Quinta = 'QUINTA_FEIRA',
  Sexta = 'SEXTA_FEIRA',
  Sabado = 'SABADO',
  Domingo = 'DOMINGO',
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

export type Status =
  | 'Negada'
  | 'Aprovada'
  | 'Observacao'
  | 'Em_Observacao'
  | 'Assinada';
