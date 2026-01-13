import { ActivityEnum } from '../types';
import {
  ACTIVITY_STYLES,
  StatusVariant,
  STATUS_CLASSES,
  type ActivityStyle,
} from '../constants';
import { cn } from '@/src/shared/modules/lib/utils';

/**
 * Obtém os estilos completos para um tipo de atividade
 * @param type - Tipo da atividade (ActivityEnum)
 * @returns Objeto com ícone, label e classes CSS
 */
export function getActivityStyles(type: ActivityEnum): ActivityStyle {
  return ACTIVITY_STYLES[type] ?? ACTIVITY_STYLES[ActivityEnum.ALIMENTACAO];
}

/**
 * Obtém apenas o ícone de uma atividade
 */
export function getActivityIcon(type: ActivityEnum) {
  return getActivityStyles(type).icon;
}

/**
 * Obtém apenas o label de uma atividade
 */
export function getActivityLabel(type: ActivityEnum) {
  return getActivityStyles(type).label;
}

/**
 * Gera classes CSS para o ícone circular da atividade
 */
export function getActivityIconClasses(type: ActivityEnum, className?: string) {
  const styles = getActivityStyles(type);
  return cn(
    'w-12 h-12 rounded-full flex items-center justify-center',
    'transition-all duration-200',
    styles.iconBgClass,
    styles.iconFgClass,
    className
  );
}

/**
 * Gera classes CSS para chips/badges de status
 */
export function getStatusChipClasses(
  variant: StatusVariant,
  className?: string
) {
  return cn(
    'inline-flex items-center gap-1.5 px-3 py-1',
    'rounded-full text-xs font-semibold',
    'transition-colors duration-200',
    STATUS_CLASSES[variant],
    className
  );
}

/**
 * Mapeia valores de enum de status para variantes visuais
 */
export function getSleepStatusVariant(tipo: string): StatusVariant {
  switch (tipo) {
    case 'BOM':
      return 'success';
    case 'INTERRUPTIVO':
      return 'warning';
    case 'RUIM':
      return 'danger';
    default:
      return 'neutral';
  }
}

export function getMobilityStatusVariant(tipo: string): StatusVariant {
  switch (tipo) {
    case 'AUTÔNOMO':
      return 'success';
    case 'RESTRITO':
      return 'warning';
    case 'IMÓVEL':
      return 'danger';
    default:
      return 'neutral';
  }
}

export function getDiuresisStatusVariant(tipo: string): StatusVariant {
  switch (tipo) {
    case 'NORMAL':
      return 'success';
    case 'ELEVADA':
    case 'REDUZIDA':
      return 'warning';
    default:
      return 'neutral';
  }
}

export function getDefecationStatusVariant(tipo: string): StatusVariant {
  switch (tipo) {
    case 'NORMAL':
      return 'success';
    case 'DIARRÉIA':
    case 'CONSTIPAÇÃO':
      return 'danger';
    default:
      return 'neutral';
  }
}

/**
 * Formata timestamp para exibição no card
 */
export function formatActivityTimestamp(dataHora: string): string {
  const date = new Date(dataHora);
  return date.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Formata data completa
 */
export function formatActivityDate(dataHora: string): string {
  const date = new Date(dataHora);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}
