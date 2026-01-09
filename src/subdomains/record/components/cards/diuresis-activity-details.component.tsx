import React from 'react';
import { DiuresisActivity, DiuresisTypeEnum } from '../../types';
import { getStatusChipClasses } from '../../helpers/activity-styles.helper';
import Image from 'next/image';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const DiuresisActivityDetails = ({
  activity,
}: {
  activity: DiuresisActivity;
}) => {
  const getDiuresisConfig = () => {
    switch (activity.tipoDiurese) {
      case DiuresisTypeEnum.NORMAL:
        return {
          bars: 8,
          color: 'bg-success',
          variant: 'success' as const,
          label: 'Normal',
        };
      case DiuresisTypeEnum.REDUZIDA:
        return {
          bars: 4,
          color: 'bg-warning',
          variant: 'warning' as const,
          label: 'Reduzida',
        };
      case DiuresisTypeEnum.ELEVADA:
        return {
          bars: 12,
          color: 'bg-warning',
          variant: 'warning' as const,
          label: 'Elevada',
        };
      default:
        return {
          bars: 8,
          color: 'bg-success',
          variant: 'success' as const,
          label: 'Normal',
        };
    }
  };

  const config = getDiuresisConfig();
  const maxBars = 12;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <p className="text-lg font-bold text-foreground mb-1">
            Registro de diurese
          </p>
          <span className={getStatusChipClasses(config.variant)}>
            <div className="w-1.5 h-1.5 rounded-full bg-current" />
            {config.label}
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Volume
        </p>
        <div className="flex gap-1.5">
          {Array.from({ length: maxBars }).map((_, index) => (
            <div
              key={index}
              className={`h-8 w-2 rounded-full transition-colors ${
                index < config.bars ? config.color : 'bg-border'
              }`}
            />
          ))}
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        Registrado às{' '}
        {format(new Date(activity.dataHora), "HH'h' mm'min'", { locale: ptBR })}
      </p>
    </div>
  );
};
