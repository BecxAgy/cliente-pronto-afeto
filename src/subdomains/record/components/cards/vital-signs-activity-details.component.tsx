import React from 'react';
import { VitalSignsActivity } from '../../types';
import { formatActivityTimestamp } from '../../helpers/activity-styles.helper';

const VitalSignsActivityDetails = ({
  activity,
}: {
  activity: VitalSignsActivity;
}) => {
  const {
    temperatura,
    frequenciaCardiaca,
    frequenciaRespiratoria,
    pressaoArterial,
  } = activity.sinalVital;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Temperatura
          </p>
          <p className="text-4xl font-bold text-foreground">
            {temperatura}
            <span className="text-xl text-muted-foreground">°C</span>
          </p>
        </div>

        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Freq. Cardíaca
          </p>
          <p className="text-4xl font-bold text-foreground">
            {frequenciaCardiaca}
            <span className="text-xl text-muted-foreground">bpm</span>
          </p>
        </div>

        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Freq. Respiratória
          </p>
          <p className="text-4xl font-bold text-foreground">
            {frequenciaRespiratoria}
            <span className="text-xl text-muted-foreground">rpm</span>
          </p>
        </div>

        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Pressão Arterial
          </p>
          <p className="text-4xl font-bold text-foreground">
            {pressaoArterial}
            <span className="text-xl text-muted-foreground">mmHg</span>
          </p>
        </div>
      </div>

      <div className="pt-2 border-t border-border/30">
        <p className="text-xs text-muted-foreground">
          Registrado às {formatActivityTimestamp(activity.dataHora)}
        </p>
      </div>
    </div>
  );
};

export default VitalSignsActivityDetails;
