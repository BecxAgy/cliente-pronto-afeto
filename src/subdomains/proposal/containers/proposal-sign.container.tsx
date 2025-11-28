import React from 'react';
import { ProposalSignInterface } from '../interfaces/proposal-sign.interface';

export const ProposalSignContainer = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return <ProposalSignInterface proposalId={id} />;
};
