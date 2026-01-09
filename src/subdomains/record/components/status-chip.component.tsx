import React from 'react';
import { cn } from '@/src/shared/modules/lib/utils';
import { StatusVariant, STATUS_CLASSES } from '../constants';

interface StatusChipProps {
  variant: StatusVariant;
  label: string;
  showDot?: boolean;
  className?: string;
}

/**
 * StatusChip - Componente reutilizável para status e categorias
 *
 * @example
 * ```tsx
 * <StatusChip variant="success" label="Normal" showDot />
 * <StatusChip variant="warning" label="Elevada" />
 * <StatusChip variant="danger" label="Crítico" showDot />
 * ```
 */
export const StatusChip = ({
  variant,
  label,
  showDot = true,
  className,
}: StatusChipProps) => {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1',
        'rounded-full text-xs font-semibold',
        'transition-colors duration-200',
        STATUS_CLASSES[variant],
        className
      )}
    >
      {showDot && (
        <div
          className="w-1.5 h-1.5 rounded-full bg-current"
          aria-hidden="true"
        />
      )}
      {label}
    </span>
  );
};
