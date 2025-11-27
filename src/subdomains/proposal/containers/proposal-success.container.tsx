import React from 'react';
import ProposalSuccessInterface from '../interfaces/proposal-success.interface';

export const ProposalSuccessContainer = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const params = await searchParams;
  const clientId = params.clientId as string | undefined;

  return <ProposalSuccessInterface clientId={clientId} />;
};

export default ProposalSuccessContainer;
