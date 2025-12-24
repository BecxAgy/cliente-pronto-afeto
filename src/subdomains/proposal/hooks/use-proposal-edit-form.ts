'use client';

import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { EditProposalSchemaInput } from '../schemas';
import { editProposalSchema } from '../schemas';
import { Proposal } from '../types';

interface UseProposalEditFormOptions {
  proposal?: Proposal;
}

/**
 * Hook para gerenciar o formulário de edição de proposta
 * Centraliza a lógica do react-hook-form
 */
export function useProposalEditForm({ proposal }: UseProposalEditFormOptions) {
  const form = useForm<EditProposalSchemaInput>({
    resolver: zodResolver(editProposalSchema),
    defaultValues: {
      renovarContratoAtuomaticamente: false,
      health: {
        comentarios: proposal?.saude?.comentarios || '',
        patologias: proposal?.saude?.patologias?.map(p => p.id) || [],
        dispositivos: proposal?.saude?.dispositivos?.map(d => d.id) || [],
      },
      duty: {
        turno: proposal?.plantao?.turno || [],
        diasDaSemana: proposal?.plantao?.diasDaSemana || [],
        alimentacaoFornecida: proposal?.plantao?.alimentacaoFornecida || false,
        dataHoraInicioPlantao: (proposal?.dataHoraInicioPlantao
          ? new Date(
              proposal.dataHoraInicioPlantao[0],
              proposal.dataHoraInicioPlantao[1] - 1,
              proposal.dataHoraInicioPlantao[2]
            )
          : new Date()).toISOString(),
        observacoes: proposal?.observacao || '',
      },
    },
    mode: 'onChange',
  });

  return form;
}

export type UseProposalEditFormReturn = UseFormReturn<EditProposalSchemaInput>;
