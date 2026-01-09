import React from 'react';
import {
  refeicaoImageMap,
  refeicaoLabelMap,
  tipoAlimentacaoLabelMap,
} from '../../helpers/record.helper';
import { FeedingActivity } from '../../types';
import Image from 'next/image';
import { Check, X } from 'lucide-react';
import {
  getStatusChipClasses,
  formatActivityTimestamp,
} from '../../helpers/activity-styles.helper';

export const FeedingActivityDetails = ({
  activity,
}: {
  activity: FeedingActivity;
}) => {
  const { refeicao, tipoAlimentacao, aceitou } = activity.estadoAlimentacao;

  const iconPath = refeicaoImageMap[refeicao];
  const refeicaoLabel = refeicaoLabelMap[refeicao];
  const tipoLabel = tipoAlimentacaoLabelMap[tipoAlimentacao];

  return (
    <div className="flex gap-4 items-start">
      <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-muted shrink-0">
        <Image
          src={iconPath}
          alt={refeicaoLabel}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex-1 space-y-2">
        <div>
          <p className="text-lg font-bold text-foreground">{refeicaoLabel}</p>
          <p className="text-sm text-muted-foreground">{tipoLabel}</p>
        </div>

        <span className={getStatusChipClasses(aceitou ? 'success' : 'danger')}>
          {aceitou ? (
            <>
              <Check className="w-3 h-3" />
              Aceitou
            </>
          ) : (
            <>
              <X className="w-3 h-3" />
              Não aceitou
            </>
          )}
        </span>

        <p className="text-xs text-muted-foreground">
          Registrado às {formatActivityTimestamp(activity.dataHora)}
        </p>
      </div>
    </div>
  );
};
