import React from 'react';
import { RecordDetailsInterface } from '../interfaces/record-details.interface';
import { getProposalById } from '@/src/subdomains/proposal/actions';
import { notFound } from 'next/navigation';
import { getRecordByProposalId } from '../actions';

interface RecordDetailsContainerProps {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
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

  // Usa a data da URL ou hoje como fallback
  const selectedDate = date
    ? new Date(date).toISOString()
    : new Date().toISOString();
  const record = await getRecordByProposalId({ data_hora: selectedDate }, id);

  return (
    <RecordDetailsInterface
      proposal={proposal}
      record={record}
      selectedDate={selectedDate}
    />
  );
}
