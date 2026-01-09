import React from 'react';
import { GeneralStateActivity } from '../../types';
import { formatActivityTimestamp } from '../../helpers/activity-styles.helper';

export const GeneralActivityDetails = ({
  activity,
}: {
  activity: GeneralStateActivity;
}) => {
  return (
    <div className="space-y-3">
      <div>
        <p className="text-lg font-bold text-foreground mb-2">Estado Geral</p>
        <div className="px-4 py-3 rounded-xl bg-muted/50 border border-border">
          <p className="text-sm text-foreground leading-relaxed">
            {activity.estadoGeral.estado}
          </p>
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        Avaliado às {formatActivityTimestamp(activity.dataHora)}
      </p>
    </div>
  );
};
