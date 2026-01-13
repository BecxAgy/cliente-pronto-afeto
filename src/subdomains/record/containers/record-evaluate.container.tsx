import React from 'react';
import RecordEvaluateInterface from '../interfaces/record-evaluate.interfaces';
import { getProposalById } from '@/src/subdomains/proposal/actions';
import { notFound, redirect } from 'next/navigation';
import { daysUntilCanEvaluate } from '../helpers/evaluation.helper';

interface RecordEvaluateContainerProps {
  readonly params: Promise<{
    id: string;
  }>;
}

/**
 * Container Server Component para avaliação de atendimento
 *
 * Responsabilidades:
 * - Validar se o atendimento existe
 * - Verificar se passou o período mínimo (30 dias)
 * - Buscar dados necessários (cuidador, cliente)
 * - Passar contexto para o Client Component
 */
export default async function RecordEvaluateContainer({
  params,
}: RecordEvaluateContainerProps) {
  const { id } = await params;

  // Buscar proposta
  const { error, data: proposal } = await getProposalById(id);

  if (error || !proposal) {
    notFound();
  }

  // Verificar se passou o período mínimo de 30 dias
  const startDate = proposal.plantao.dataHoraInicioPlantao;

  // Temporariamente desabilitado - permitir avaliação a qualquer momento
  const canUserEvaluate = true;

  if (!canUserEvaluate) {
    const daysRemaining = daysUntilCanEvaluate(startDate);

    // Redireciona para o prontuário com mensagem informativa
    redirect(
      `/proposal/${id}/record?message=evaluation_not_ready&days=${daysRemaining}`
    );
  }

  // Verificar se há cuidadores disponíveis
  if (!proposal.cuidadores || proposal.cuidadores.length === 0) {
    redirect(`/proposal/${id}/record?message=no_caregivers`);
  }

  // Formatar data de início
  const formattedStartDate =
    typeof startDate === 'string'
      ? startDate
      : Array.isArray(startDate)
        ? new Date(startDate[0], startDate[1] - 1, startDate[2]).toISOString()
        : new Date().toISOString();

  return (
    <RecordEvaluateInterface
      clientId={proposal.cliente.id}
      caregivers={proposal.cuidadores}
      startDate={formattedStartDate}
    />
  );
}
