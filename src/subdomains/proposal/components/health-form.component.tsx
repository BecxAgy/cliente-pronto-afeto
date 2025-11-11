'use client';

import {
  type Dispositives,
  type DispositivesDtoGet,
} from '@/src/shared/modules/types/dispositives.types';
import {
  type Patology,
  type PatologyDtoGet,
} from '@/src/shared/modules/types/patology.types';
import {
  TextareaField,
  MultiSelectField,
  TextField,
  DatePickerField,
} from '@/src/shared/modules/components/ui/form-field.component';
import { type MultiSelectOption } from '@/src/shared/modules/components/ui/multi-select';
import { useMemo } from 'react';
import { User, Weight } from 'lucide-react';

interface HealthFormComponentProps {
  readonly patologies?: PatologyDtoGet;
  readonly dispositives?: DispositivesDtoGet;
}

function HealthFormComponent({
  patologies,
  dispositives,
}: HealthFormComponentProps) {
  const patologyOptions = useMemo<MultiSelectOption[]>(() => {
    if (!patologies?.content || !Array.isArray(patologies.content)) return [];
    return patologies.content.map((p: Patology) => ({
      id: p.id,
      label: p.nome,
    }));
  }, [patologies]);

  const dispositiveOptions = useMemo<MultiSelectOption[]>(() => {
    if (!dispositives?.content || !Array.isArray(dispositives.content))
      return [];
    return dispositives.content.map((d: Dispositives) => ({
      id: d.id,
      label: d.nome,
    }));
  }, [dispositives]);

  return (
    <div className="space-y-8">
      <section className="space-y-1">
        <h2 className="text-2xl font-semibold">Saúde e Cuidado</h2>
        <p className="text-muted-foreground">
          Informe as condições de saúde e necessidades especiais do paciente.
        </p>
      </section>

      {/* Informações de Saúde */}
      <section className="space-y-4">
        <h3 className="text-lg font-medium">Informações de Saúde</h3>

        <TextareaField
          name="health.comentarios"
          label="Observações e Comentários"
          placeholder="Descreva informações relevantes sobre a saúde do paciente..."
          rows={5}
        />

        <MultiSelectField
          name="health.patologias"
          label="Patologias"
          placeholder="Buscar patologias..."
          options={patologyOptions}
        />

        <MultiSelectField
          name="health.dispositivos"
          label="Dispositivos Médicos (opcional)"
          placeholder="Buscar dispositivos..."
          options={dispositiveOptions}
        />
      </section>

      {/* Informações do Paciente */}
      <section className="space-y-4">
        <h3 className="text-lg font-medium">Dados do Paciente</h3>

        <TextField
          name="health.cuidado.nome"
          label="Nome Completo"
          placeholder="Nome do paciente"
          icon={User}
        />

        <TextField
          name="health.cuidado.nomeApresentacao"
          label="Como o paciente gostaria de ser chamado?"
          placeholder="Apelido ou nome de apresentação"
          icon={User}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextField
            name="health.cuidado.cpf"
            label="CPF"
            placeholder="000.000.000-00"
          />

          <TextField
            name="health.cuidado.peso"
            label="Peso (kg)"
            type="number"
            placeholder="70"
            icon={Weight}
          />
        </div>

        <DatePickerField
          name="health.cuidado.dataNascimento"
          label="Data de Nascimento"
          placeholder="Selecione a data de nascimento"
        />
      </section>
    </div>
  );
}

export default HealthFormComponent;
