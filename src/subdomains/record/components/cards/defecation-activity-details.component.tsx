import React from 'react';
import { DefecationActivity, DefecationTypeEnum } from '../../types';
import Image from 'next/image';
import {
  getDefecationStatusVariant,
  getStatusChipClasses,
  formatActivityTimestamp,
} from '../../helpers/activity-styles.helper';

export const DefecationActivityDetails = ({
  activity,
}: {
  activity: DefecationActivity;
}) => {
  const statusVariant = getDefecationStatusVariant(
    DefecationTypeEnum[activity.dejecoes]
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <p className="text-lg font-bold text-foreground mb-1">
            Registro de Defecação
          </p>
          <span className={getStatusChipClasses(statusVariant)}>
            <div className="w-1.5 h-1.5 rounded-full bg-current capitalize " />
            {DefecationTypeEnum[activity.dejecoes]}
          </span>
        </div>
      </div>
    </div>
  );
};
