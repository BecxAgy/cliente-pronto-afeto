import React from 'react';
import { SleepActivity, SleepTypeEnum } from '../../types';
import {
  getSleepStatusVariant,
  getStatusChipClasses,
  formatActivityTimestamp,
} from '../../helpers/activity-styles.helper';

export const SleepActivityDetails = ({
  activity,
}: {
  activity: SleepActivity;
}) => {
  const tipoSonoLabel = SleepTypeEnum[activity.tipoSono];
  const statusVariant = getSleepStatusVariant(tipoSonoLabel);

  return (
    <div className="space-y-3">
      <div>
        <p className="text-lg font-bold text-foreground mb-2">
          Registro de Sono
        </p>
        <span className={getStatusChipClasses(statusVariant)}>
          <div className="w-1.5 h-1.5 rounded-full bg-current" />
          {tipoSonoLabel}
        </span>
      </div>

      <p className="text-xs text-muted-foreground">
        Avaliado às {formatActivityTimestamp(activity.dataHora)}
      </p>
    </div>
  );
};
