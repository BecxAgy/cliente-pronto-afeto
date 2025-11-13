'use client';

import React from 'react';
import {
  CheckboxField,
  DatePickerField,
  CustomField,
} from '@/src/shared/modules/components/ui/form-field.component';
import { Checkbox } from '@/src/shared/modules/components/ui/checkbox';
import { DiaDaSemanaEnum, TurnoEnum } from '../types';

const DIAS_DA_SEMANA = [
  { value: DiaDaSemanaEnum.Segunda, label: 'Segunda-feira' },
  { value: DiaDaSemanaEnum.Terca, label: 'Terça-feira' },
  { value: DiaDaSemanaEnum.Quarta, label: 'Quarta-feira' },
  { value: DiaDaSemanaEnum.Quinta, label: 'Quinta-feira' },
  { value: DiaDaSemanaEnum.Sexta, label: 'Sexta-feira' },
  { value: DiaDaSemanaEnum.Sabado, label: 'Sábado' },
  { value: DiaDaSemanaEnum.Domingo, label: 'Domingo' },
];

const TURNOS = [
  { value: TurnoEnum.Diurno, label: 'Diurno' },
  { value: TurnoEnum.Noturno, label: 'Noturno' },
];

function DutyFormComponent() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="space-y-1">
        <h2 className="text-2xl font-semibold">Informações do Plantão</h2>
        <p className="text-muted-foreground">
          Defina os horários e turnos de atendimento.
        </p>
      </section>

      <section className="space-y-6">
        {/* Data e hora de início */}
        <DatePickerField
          name="duty.dataHoraInicioPlantao"
          label="Data e Hora de Início do Plantão"
          placeholder="Selecione a data de início"
        />

        {/* Dias da semana */}
        <CustomField
          name="duty.diasDaSemana"
          label="Dias da Semana"
          render={field => {
            const currentValue = (field.value as DiaDaSemanaEnum[]) ?? [];

            const handleCheckChange = (
              dia: DiaDaSemanaEnum,
              checked: boolean
            ) => {
              const newValue = checked
                ? [...currentValue, dia]
                : currentValue.filter(d => d !== dia);
              field.onChange(newValue);
            };

            return (
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {DIAS_DA_SEMANA.map(dia => (
                    <div key={dia.value} className="flex items-center gap-3">
                      <Checkbox
                        id={`dia-${dia.value}`}
                        checked={currentValue.includes(dia.value)}
                        onCheckedChange={checked =>
                          handleCheckChange(dia.value, checked as boolean)
                        }
                      />
                      <label
                        htmlFor={`dia-${dia.value}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {dia.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            );
          }}
        />

        {/* Turnos */}
        <CustomField
          name="duty.turno"
          label="Turno"
          render={field => {
            const currentValue = (field.value as TurnoEnum[]) ?? [];

            const handleCheckChange = (turno: TurnoEnum, checked: boolean) => {
              const newValue = checked
                ? [...currentValue, turno]
                : currentValue.filter(t => t !== turno);
              field.onChange(newValue);
            };

            return (
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {TURNOS.map(turno => (
                    <div key={turno.value} className="flex items-center gap-3">
                      <Checkbox
                        id={`turno-${turno.value}`}
                        checked={currentValue.includes(turno.value)}
                        onCheckedChange={checked =>
                          handleCheckChange(turno.value, checked as boolean)
                        }
                      />
                      <label
                        htmlFor={`turno-${turno.value}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {turno.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            );
          }}
        />

        {/* Alimentação fornecida */}
        <CheckboxField
          name="duty.alimentacaoFornecida"
          label="A alimentação do cuidador será fornecida pelo contratante?"
        />
      </section>
    </div>
  );
}

export default DutyFormComponent;
