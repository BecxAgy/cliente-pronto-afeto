import React from 'react';
import { ProposalAllInterface } from '../interfaces/proposal-all.interface';

export const ProposalAllContainer = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const params = await searchParams;
  return <ProposalAllInterface searchParams={params} />;
};
