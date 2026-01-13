import React from 'react';
import { MobilityActivity } from '../../types';
import {
  getMobilityStatusVariant,
  getStatusChipClasses,
  formatActivityTimestamp,
} from '../../helpers/activity-styles.helper';

export const MobilityActivityDetails = ({
  activity,
}: {
  activity: MobilityActivity;
}) => {
  const statusVariant = getMobilityStatusVariant(activity.tipoMobilidade);

  return (
    <div className="space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <p className="text-lg font-bold text-foreground mb-2">Mobilidade</p>
          <span className={getStatusChipClasses(statusVariant)}>
            <div className="w-1.5 h-1.5 rounded-full bg-current" />
            {activity.tipoMobilidade}
          </span>
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        O cuidador avaliou que a mobilidade do paciente está{' '}
        <span className="font-semibold text-foreground capitalize">
          {activity.tipoMobilidade.toLowerCase()}
        </span>
      </p>
    </div>
  );
};
