import { Caregiver } from '@/src/shared/modules/types/caregiver.types';
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
  | 'Aprovada'
  | 'Observacao'
  | 'Negada'
  | 'Assinada'
  | 'Finalizada';

export interface Associate {
  clientId?: string;
}

export interface ProposalGetRequestParams {
  page?: number;
  limit?: number;
  nomeCuidado?: string;
  status?: Status;
  search?: string;
  direction?: 'asc' | 'desc';
}

export interface MinimalProposal {
  id: number;
  telefone: string;
  nomeCliente: string;
  nomeCuidado: string;

  dataInicioPlantao: number[] | string;
  clienteId: number;
  cuidadoId: number;
  statusProposta: Status;
  cuidadores: Caregiver[];
}

export interface ProposalDTOGet {
  content: MinimalProposal[];
  pageable: {
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };

    pageNumber: number;
    pageSize: number;
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalElements: number;
  totalPages: number;
}
