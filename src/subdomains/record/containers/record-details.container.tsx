import React from 'react';
import { RecordDetailsInterface } from '../interfaces/record-details.interface';
import { getProposalById } from '@/src/subdomains/proposal/actions';
import { notFound, redirect } from 'next/navigation';
import { getRecordByProposalId } from '../actions';
import { parseBackendDate } from '@/src/shared/modules/helpers/date.helper';
import { RecordResponse } from '../types';

interface RecordDetailsContainerProps {
  readonly params: Promise<{
    id: string;
  }>;
  readonly searchParams: Promise<{
    date?: string;
  }>;
}

export default async function RecordDetailsContainer({
  params,
  searchParams,
}: RecordDetailsContainerProps) {
  const { id } = await params;
  const { date } = await searchParams;

  const { error, data: proposal } = await getProposalById(id);

  if (error || !proposal) {
    notFound();
  }

  // Se não houver data na URL, redireciona com a data de hoje
  if (!date) {
    const date = parseBackendDate(proposal.plantao.dataHoraInicioPlantao);
    const proposalDate = new Date(date).toISOString().split('T')[0];
    redirect(`/proposal/${id}/record?date=${proposalDate}`);
  }

  // Usa a data da URL
  const selectedDate = new Date(date).toISOString();
  const record = (await getRecordByProposalId(
    { data_hora: selectedDate },
    id
  )) as RecordResponse;

  return (
    <RecordDetailsInterface
      proposal={proposal}
      record={record}
      selectedDate={selectedDate}
      id={id}
    />
  );
}
