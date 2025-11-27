'use client';

import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { ProposalFormSchemaProps } from '../schemas';
import { proposalFormSchema, ProposalFormTypeEnum } from '../schemas';
import { Client } from '../../client/types';

interface UseProposalFormOptions {
  client?: Client;
}

/**
 * Hook principal para gerenciar o formulário de proposta
 * Centraliza a lógica do react-hook-form
 */
export function useProposalForm(options?: UseProposalFormOptions) {
  const { client } = options || {};

  const form = useForm({
    resolver: zodResolver(proposalFormSchema),
    defaultValues: {
      formType: ProposalFormTypeEnum.Client,
      ...(client && {
        client: {
          nome: client.nome || '',
          nomeApresentacao: client.nomeApresentacao || '',
          nacionalidade: client.nacionalidade || '',
          estadoCivil: client.estadoCivil || '',
          cpf: client.cpf || '',
          rg: client.rg || '',
          telefone: client.telefone || '',
          endereco: {
            cep: client.endereco?.cep || '',
            estado: client.endereco?.estado || '',
            cidade: client.endereco?.cidade || '',
            bairro: client.endereco?.bairro || '',
            numero: client.endereco?.numero || '',
            complemento: client.endereco?.complemento || '',
            rua: client.endereco?.rua || '',
          },
        },
      }),
    },
    mode: 'onChange',
  });

  return form;
}

export type UseProposalFormReturn = UseFormReturn<ProposalFormSchemaProps>;
