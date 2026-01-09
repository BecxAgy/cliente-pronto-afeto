import React from 'react';
import { HydrationSkinActivity } from '../../types';
import { formatActivityTimestamp } from '../../helpers/activity-styles.helper';

export const HydrationActivityDetails = ({
  activity,
}: {
  activity: HydrationSkinActivity;
}) => {
  // Valor de 1 a 10
  const percentage = (activity.hidratacaoPelo / 10) * 100;

  return (
    <div className="space-y-4">
      <div>
        <p className="text-lg font-bold text-foreground mb-3">
          Hidratação da Pele
        </p>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Nível</span>
            <span className="font-bold text-foreground">
              {activity.hidratacaoPelo}/10
            </span>
          </div>

          <div className="w-full h-3 bg-border rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        Avaliado às {formatActivityTimestamp(activity.dataHora)}
      </p>
    </div>
  );
};
