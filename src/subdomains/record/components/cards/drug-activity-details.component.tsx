import React from 'react';
import { DrugAdministrationActivity } from '../../types';
import { formatActivityTimestamp } from '../../helpers/activity-styles.helper';

interface DrugActivityDetailsProps {
  activity: DrugAdministrationActivity;
}

export const DrugActivityDetails = ({ activity }: DrugActivityDetailsProps) => {
  const { posologia, dataHora } = activity;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
    });
  };

  return (
    <div className="space-y-4">
      {/* Nome do medicamento */}
      <div>
        <p className="text-lg font-bold text-foreground">
          {posologia.nomeMedicamento}
        </p>
      </div>

      {/* Dosagem e Frequência - Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Dosagem
          </p>
          <p className="text-3xl font-bold text-foreground">
            {posologia.dosagem}
            <span className="text-base text-muted-foreground ml-1">
              {posologia.unidadeDosagem}
            </span>
          </p>
        </div>

        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Frequência
          </p>
          <p className="text-3xl font-bold text-foreground">
            {posologia.frequencia}
            <span className="text-base text-muted-foreground ml-1">x/dia</span>
          </p>
        </div>
      </div>

      {/* Período do tratamento */}
      <div className="px-4 py-3 rounded-xl bg-muted/50 border border-border">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-2">
          Período do Tratamento
        </p>
        <div className="flex items-center justify-between text-sm">
          <div>
            <span className="text-muted-foreground">Início: </span>
            <span className="font-semibold text-foreground">
              {formatDate(posologia.dataInicio)}
            </span>
          </div>
          <div className="flex-1 mx-3 border-t border-dashed border-border"></div>
          <div>
            <span className="text-muted-foreground">Fim: </span>
            <span className="font-semibold text-foreground">
              {formatDate(posologia.dataFim)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
