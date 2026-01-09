import {
  Utensils,
  Footprints,
  Droplet,
  Activity,
  Heart,
  User,
  Moon,
  Droplets,
  Pill,
  type LucideIcon,
} from 'lucide-react';
import { ActivityEnum } from './types';

export interface ActivityStyle {
  icon: LucideIcon;
  label: string;
  bgClass: string;
  fgClass: string;
  accentClass: string;
  iconBgClass: string;
  iconFgClass: string;
}

/**
 * Mapeamento único de estilos, ícones e labels por tipo de atividade.
 * Single source of truth para garantir consistência visual no prontuário.
 */
export const ACTIVITY_STYLES: Record<ActivityEnum, ActivityStyle> = {
  [ActivityEnum.ALIMENTACAO]: {
    icon: Utensils,
    label: 'Alimentação',
    bgClass: 'bg-[var(--activity-alimentacao-bg)]',
    fgClass: 'text-[var(--activity-alimentacao-fg)]',
    accentClass: 'text-[var(--activity-alimentacao-accent)]',
    iconBgClass: 'bg-[var(--activity-alimentacao-bg)]',
    iconFgClass: 'text-[var(--activity-alimentacao-accent)]',
  },
  [ActivityEnum.MOBILIDADE]: {
    icon: Footprints,
    label: 'Mobilidade',
    bgClass: 'bg-[var(--activity-mobilidade-bg)]',
    fgClass: 'text-[var(--activity-mobilidade-fg)]',
    accentClass: 'text-[var(--activity-mobilidade-accent)]',
    iconBgClass: 'bg-[var(--activity-mobilidade-bg)]',
    iconFgClass: 'text-[var(--activity-mobilidade-accent)]',
  },
  [ActivityEnum.DEJECOES]: {
    icon: Droplet,
    label: 'Dejeções',
    bgClass: 'bg-[var(--activity-dejecoes-bg)]',
    fgClass: 'text-[var(--activity-dejecoes-fg)]',
    accentClass: 'text-[var(--activity-dejecoes-accent)]',
    iconBgClass: 'bg-[var(--activity-dejecoes-bg)]',
    iconFgClass: 'text-[var(--activity-dejecoes-accent)]',
  },
  [ActivityEnum.DIURESES]: {
    icon: Droplets,
    label: 'Diurese',
    bgClass: 'bg-[var(--activity-diureses-bg)]',
    fgClass: 'text-[var(--activity-diureses-fg)]',
    accentClass: 'text-[var(--activity-diureses-accent)]',
    iconBgClass: 'bg-[var(--activity-diureses-bg)]',
    iconFgClass: 'text-[var(--activity-diureses-accent)]',
  },
  [ActivityEnum.SINAIS_VITAIS]: {
    icon: Activity,
    label: 'Sinais Vitais',
    bgClass: 'bg-[var(--activity-sinais-vitais-bg)]',
    fgClass: 'text-[var(--activity-sinais-vitais-fg)]',
    accentClass: 'text-[var(--activity-sinais-vitais-accent)]',
    iconBgClass: 'bg-[var(--activity-sinais-vitais-bg)]',
    iconFgClass: 'text-[var(--activity-sinais-vitais-accent)]',
  },
  [ActivityEnum.ESTADO_GERAL]: {
    icon: User,
    label: 'Estado Geral',
    bgClass: 'bg-[var(--activity-estado-geral-bg)]',
    fgClass: 'text-[var(--activity-estado-geral-fg)]',
    accentClass: 'text-[var(--activity-estado-geral-accent)]',
    iconBgClass: 'bg-[var(--activity-estado-geral-bg)]',
    iconFgClass: 'text-[var(--activity-estado-geral-accent)]',
  },
  [ActivityEnum.SONO]: {
    icon: Moon,
    label: 'Sono',
    bgClass: 'bg-[var(--activity-sono-bg)]',
    fgClass: 'text-[var(--activity-sono-fg)]',
    accentClass: 'text-[var(--activity-sono-accent)]',
    iconBgClass: 'bg-[var(--activity-sono-bg)]',
    iconFgClass: 'text-[var(--activity-sono-accent)]',
  },
  [ActivityEnum.HIDRATACAO_PELE]: {
    icon: Heart,
    label: 'Hidratação da Pele',
    bgClass: 'bg-[var(--activity-hidratacao-bg)]',
    fgClass: 'text-[var(--activity-hidratacao-fg)]',
    accentClass: 'text-[var(--activity-hidratacao-accent)]',
    iconBgClass: 'bg-[var(--activity-hidratacao-bg)]',
    iconFgClass: 'text-[var(--activity-hidratacao-accent)]',
  },
  [ActivityEnum.MEDICAMENTOS]: {
    icon: Pill,
    label: 'Medicamentos',
    bgClass: 'bg-[var(--activity-medicamentos-bg)]',
    fgClass: 'text-[var(--activity-medicamentos-fg)]',
    accentClass: 'text-[var(--activity-medicamentos-accent)]',
    iconBgClass: 'bg-[var(--activity-medicamentos-bg)]',
    iconFgClass: 'text-[var(--activity-medicamentos-accent)]',
  },
};

/**
 * Status semânticos para chips e badges
 */
export type StatusVariant =
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'neutral';

export const STATUS_CLASSES: Record<StatusVariant, string> = {
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/10 text-warning',
  danger: 'bg-danger/10 text-danger',
  info: 'bg-info/10 text-info',
  neutral: 'bg-muted text-muted-foreground',
};
