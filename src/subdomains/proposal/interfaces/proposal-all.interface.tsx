import React from 'react';
import { getProposals } from '../actions';

import { MinimalProposal, Status } from '../types';
import Image from 'next/image';
import { ProposalCardComponent } from '../components/proposal-card-component';
import FilterHeaderComponent from '../components/filter-header.component';
import { ProposalPaginationComponent } from '../components/proposal-pagination.component';

interface ProposalAllInterfaceProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export const ProposalAllInterface = async ({
  searchParams,
}: ProposalAllInterfaceProps) => {
  // Extrair e validar parâmetros de busca
  const page = searchParams.page ? Number(searchParams.page) : 0;
  const limit = searchParams.limit ? Number(searchParams.limit) : 6;
  const search =
    typeof searchParams.search === 'string' ? searchParams.search : undefined;
  const status =
    typeof searchParams.status === 'string'
      ? (searchParams.status as Status)
      : undefined;
  const direction =
    searchParams.direction === 'asc' || searchParams.direction === 'desc'
      ? searchParams.direction
      : undefined;

  const proposals = await getProposals({
    page,
    limit,
    nomeCuidado: search,
    status,
    direction,
  });

  const hasProposals =
    proposals.data?.content && proposals.data.content.length > 0;

  return (
    <div className="p-6">
      <header>
        <h1 className="text-2xl font-semibold">Propostas</h1>
        <p className="text-accent">
          Aqui você pode visualizar todas as propostas disponíveis.
        </p>
      </header>
      <FilterHeaderComponent searchParams={searchParams} />

      {hasProposals ? (
        <>
          <div className="grid grid-cols-2 gap-4 mb-6">
            {proposals.data?.content.map((proposal: MinimalProposal) => (
              <ProposalCardComponent key={proposal.id} proposal={proposal} />
            ))}
          </div>

          <ProposalPaginationComponent
            currentPage={page}
            totalPages={proposals.data?.totalPages || 0}
            totalElements={proposals.data?.totalElements || 0}
            searchParams={searchParams}
          />
        </>
      ) : (
        <div className="text-center mt-10">
          <Image
            src="/images/fallback.png"
            alt="No Proposals"
            width={250}
            height={250}
            className="mx-auto mb-4"
          />
          <h2 className="text-xl font-semibold">Nenhuma proposta encontrada</h2>
          <p className="text-gray-600">
            No momento, não há propostas disponíveis.
          </p>
        </div>
      )}
    </div>
  );
};
