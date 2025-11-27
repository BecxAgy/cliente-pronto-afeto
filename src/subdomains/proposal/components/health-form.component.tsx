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
import { useMemo, useState } from 'react';
import { User, Weight, Plus } from 'lucide-react';
import { type CareDTOGet, type Care } from '@/src/subdomains/care/types';
import { Button } from '@/src/shared/modules/components/ui/button';
import Link from 'next/link';
import { useProposalFormContext } from '../contexts/proposal-form.context';

interface HealthFormComponentProps {
  readonly patologies?: PatologyDtoGet;
  readonly dispositives?: DispositivesDtoGet;
  readonly cares?: CareDTOGet;
  readonly hasExistingClient?: boolean;
}

function HealthFormComponent({
  patologies,
  dispositives,
  cares,
  hasExistingClient = false,
}: HealthFormComponentProps) {
  const { form } = useProposalFormContext();
  const [selectedCareId, setSelectedCareId] = useState<number | null>(() => {
    // Inicializa com o ID do cuidado se já estiver preenchido no form
    const currentCare = form.getValues('health.cuidado');
    return currentCare?.id ?? null;
  });

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

  const handleSelectCare = (care: Care) => {
    // Se clicar no mesmo cuidado, desseleciona
    if (selectedCareId === care.id) {
      setSelectedCareId(null);
      // Limpa os dados do formulário
      form.setValue('health.cuidado', {
        nome: '',
        nomeApresentacao: '',
        cpf: '',
        peso: '',
        dataNascimento: new Date(),
      });
      return;
    }

    setSelectedCareId(care.id);
    // Preencher o cuidado selecionado
    form.setValue('health.cuidado', {
      id: care.id,
      nome: care.nome,
      nomeApresentacao: care.nomeApresentacao,
      cpf: care.cpf,
      peso: care.peso.toString(),
      dataNascimento: new Date(care.dataNascimento as unknown as string),
    });
  };

  const hasCares = cares?.content && cares.content.length > 0;

  return (
    <div className="space-y-8">
      <section className="space-y-1">
        <h2 className="text-2xl font-semibold">Saúde e Cuidado</h2>
        <p className="text-muted-foreground">
          {hasExistingClient
            ? 'Selecione um paciente cadastrado ou adicione um novo.'
            : 'Informe as condições de saúde e necessidades especiais do paciente.'}
        </p>
      </section>

      {/* Seleção de Cuidados Existentes - Apenas para clientes com conta */}
      {hasExistingClient ? (
        <section className="space-y-4">
          <h3 className="text-lg font-medium">Selecione um Paciente</h3>
          <div className="flex items-center gap-4 flex-wrap">
            {hasCares &&
              cares.content.map((care: Care) => (
                <button
                  key={care.id}
                  type="button"
                  onClick={() => handleSelectCare(care)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all hover:border-primary ${
                    selectedCareId === care.id
                      ? 'border-primary bg-primary/10'
                      : 'border-border'
                  }`}
                >
                  <div className="w-14 h-14 rounded-full bg-primary/40 flex items-center justify-center text-xl font-semibold">
                    {care.nomeApresentacao?.[0]?.toUpperCase() ||
                      care.nome[0]?.toUpperCase()}
                  </div>
                  <p className="text-sm font-medium">
                    {care.nomeApresentacao || care.nome}
                  </p>
                </button>
              ))}

            {/* Botão para adicionar novo cuidado */}
            <Button
              type="button"
              variant="outline"
              asChild
              className="flex flex-col items-center gap-2 h-auto p-4 rounded-lg border-2 border-dashed hover:border-primary hover:bg-primary/5"
            >
              <Link href="/care/add">
                <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center">
                  <Plus className="w-6 h-6" />
                </div>
                <p className="text-sm font-medium">Adicionar</p>
              </Link>
            </Button>
          </div>

          {/* Informações de Saúde - sempre visível */}
          <div className="space-y-4 mt-8">
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
          </div>
        </section>
      ) : (
        <>
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

          {/* Informações do Paciente - apenas para não-clientes */}
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
        </>
      )}
    </div>
  );
}

export default HealthFormComponent;
