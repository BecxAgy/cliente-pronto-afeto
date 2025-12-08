'use client';
import { Button } from '@/src/shared/modules/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/src/shared/modules/components/ui/sheet';
import { Edit2, Loader2 } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import {
  MultiSelectField,
  TextareaField,
  CheckboxField,
  DatePickerField,
} from './ui/edit-form-fields';
import {
  Dispositives,
  DispositivesDtoGet,
} from '@/src/shared/modules/types/dispositives.types';
import {
  Patology,
  PatologyDtoGet,
} from '@/src/shared/modules/types/patology.types';
import { MultiSelectOption } from '@/src/shared/modules/components/ui/multi-select';
import { Proposal } from '../types';
import { useProposalEditForm } from '../hooks/use-proposal-edit-form';
import { useProposalEditController } from '../hooks/use-proposal-edit-controller';
import { ProposalEditFormProvider } from '../contexts/proposal-edit-form.context';
import { getProposalById } from '../actions';
import { toast } from 'sonner';

export const ProposalEditFormSheet = ({
  patology,
  dispositives,
  proposalId,
}: {
  patology?: PatologyDtoGet;
  dispositives?: DispositivesDtoGet;
  proposalId: number;
}) => {
  const [open, setOpen] = useState(false);
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useProposalEditForm({ proposal: proposal || undefined });

  // Buscar proposta ao abrir o sheet
  useEffect(() => {
    if (!open) {
      // Resetar quando fechar
      setProposal(null);
      return;
    }

    if (proposal) return;

    const fetchProposal = async () => {
      try {
        const response = await getProposalById(proposalId.toString());

        if (response.error || !response.data) {
          toast.error('Erro ao carregar proposta');
        } else {
          setProposal(response.data as unknown as Proposal);
        }
      } catch {
        toast.error('Erro ao carregar proposta');
      } finally {
        setIsLoading(false);
      }
    };

    setIsLoading(true);
    fetchProposal();
  }, [open, proposal, proposalId]);

  // Atualizar o formulário quando os dados da proposta forem carregados
  useEffect(() => {
    if (proposal) {
      const patologiaIds =
        (proposal.saude?.patologias
          ?.map(p => {
            const found = patology?.content?.find(
              (pat: Patology) => pat.nome === p.nome
            );
            return found?.id;
          })
          .filter(id => id !== undefined) as number[]) || [];

      // Encontrar IDs dos dispositivos pelo nome (dados vêm sem ID)
      const dispositivoIds =
        (proposal.saude?.dispositivos
          ?.map(d => {
            const found = dispositives?.content?.find(
              (disp: Dispositives) => disp.nome === d.nome
            );
            return found?.id;
          })
          .filter(id => id !== undefined) as number[]) || [];

      // Converter data do array [ano, mês, dia, hora, minuto] para Date
      const dataPlantao = proposal.plantao?.dataHoraInicioPlantao
        ? new Date(
            proposal.plantao.dataHoraInicioPlantao[0],
            proposal.plantao.dataHoraInicioPlantao[1] - 1,
            proposal.plantao.dataHoraInicioPlantao[2],
            proposal.plantao.dataHoraInicioPlantao[3] || 0,
            proposal.plantao.dataHoraInicioPlantao[4] || 0
          )
        : new Date();

      const formValues = {
        renovarContratoAtuomaticamente:
          proposal.renovarContratoAtuomaticamente || false,
        health: {
          comentarios: proposal.saude?.comentarios || '',
          patologias: patologiaIds,
          dispositivos: dispositivoIds,
        },
        duty: {
          turno: proposal.plantao?.turno || [],
          diasDaSemana: proposal.plantao?.diasDaSemana || [],
          alimentacaoFornecida: proposal.plantao?.alimentacaoFornecida || false,
          dataHoraInicioPlantao: dataPlantao.toISOString(),
          observacoes: proposal.observacao || '',
        },
      };

      form.reset(formValues);
    }
  }, [proposal, form, patology, dispositives]);

  const controller = useProposalEditController({
    form,
    proposalId: proposalId.toString(),
    onClose: () => setOpen(false),
  });

  const patologyOptions = useMemo<MultiSelectOption[]>(() => {
    if (!patology?.content || !Array.isArray(patology.content)) return [];
    return patology.content.map((p: Patology) => ({
      id: p.id,
      label: p.nome,
    }));
  }, [patology]);

  const dispositiveOptions = useMemo<MultiSelectOption[]>(() => {
    if (!dispositives?.content || !Array.isArray(dispositives.content))
      return [];
    return dispositives.content.map((d: Dispositives) => ({
      id: d.id,
      label: d.nome,
    }));
  }, [dispositives]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="justify-start w-full">
          <Edit2 className="mr-2 h-4 w-4" /> Editar Proposta
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-full md:min-w-xl  overflow-y-auto"
      >
        <SheetHeader>
          <SheetTitle className="text-xl">Editar Proposta</SheetTitle>
          <SheetDescription>
            Faça as alterações necessárias na proposta.
          </SheetDescription>
        </SheetHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="animate-spin h-6 w-6 text-primary" />
          </div>
        ) : (
          <ProposalEditFormProvider form={form}>
            <form
              onSubmit={controller.onSubmit}
              className="space-y-6 mt-6 px-6"
            >
              {/* Informações do Plantão */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Informações do Plantão</h3>
                <div className="space-y-4">
                  <DatePickerField
                    name="duty.dataHoraInicioPlantao"
                    label="Data de Início do Plantão"
                    placeholder="Selecione a data de início"
                  />

                  <CheckboxField
                    name="duty.alimentacaoFornecida"
                    label="A alimentação do cuidador será fornecida?"
                  />
                </div>
              </div>

              {/* Informações de Saúde */}
              <div className="space-y-4">
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

              {/* Botões de ação */}
              <div className="flex gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                  disabled={controller.isSubmitting}
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={controller.isSubmitting}
                  className="flex-1"
                >
                  {controller.getSubmitButtonLabel()}
                </Button>
              </div>
            </form>
          </ProposalEditFormProvider>
        )}
      </SheetContent>
    </Sheet>
  );
};
