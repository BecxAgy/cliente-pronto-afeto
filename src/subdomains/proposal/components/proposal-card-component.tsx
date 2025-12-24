import { Button } from '@/src/shared/modules/components/ui/button';
import { Card, CardContent } from '@/src/shared/modules/components/ui/card';
import { MoreHorizontal, Pencil } from 'lucide-react';

import { MinimalProposal } from '../types';
import Image from 'next/image';
import { convertStatusToPercent } from '../helpers';
import { formatDate } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { parseBackendDate } from '@/src/shared/modules/helpers/date.helper';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/src/shared/modules/components/ui/popover';
import CancelProposalButton from './cancel-proposal-button';
import Link from 'next/link';
import { ProposalEditFormSheet } from './proposal-edit-form';
import { PatologyDtoGet } from '@/src/shared/modules/types/patology.types';
import { DispositivesDtoGet } from '@/src/shared/modules/types/dispositives.types';
import { AvatarList } from '@/src/shared/modules/components/ui/avatar-list';

export const ProposalCardComponent = ({
  proposal,
  patology,
  dispositives,
}: {
  proposal: MinimalProposal;
  patology?: PatologyDtoGet;
  dispositives?: DispositivesDtoGet;
}) => {
  return (
    <Card className={`bg-primary/5 relative overflow-hidden border-0 py-4`}>
      <CardContent className="px-6">
        {proposal.statusProposta === 'Assinada' ? (
          <Link
            href={`/proposal/${proposal.id}/record`}
            className="text-sm absolute top-4 right-6 font-semibold hover:text-primary/70 hover:cursor-pointer text-primary z-10"
          >
            Ver Prontuário
          </Link>
        ) : (
          <Popover>
            <PopoverTrigger asChild>
              <div className="absolute top-4 right-4">
                <Button variant="ghost" size="sm" className=" h-auto p-1">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </PopoverTrigger>
            <PopoverContent align="end">
              {proposal.statusProposta === 'Observacao' && (
                <div className="">
                  <ProposalEditFormSheet
                    patology={patology}
                    dispositives={dispositives}
                    proposalId={proposal.id}
                  />

                  <CancelProposalButton proposalId={proposal.id} />
                </div>
              )}
              {proposal.statusProposta == 'Aprovada' && (
                <div className="">
                  <Link href={`/proposal/sign/${proposal.id}`}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="justify-start w-full"
                    >
                      <Pencil className="mr-2 h-4 w-4" /> Assinar Proposta
                    </Button>
                  </Link>
                </div>
              )}
            </PopoverContent>
          </Popover>
        )}
        {/* Date */}
        <div className="mb-4 text-sm opacity-90">
          {formatDate(
            parseBackendDate(proposal?.dataInicioPlantao),
            "dd 'de' MMMM',' yyyy",
            {
              locale: ptBR,
            }
          )}
        </div>

        {/* proposal Title */}
        <div className="mb-4">
          <p className="font-semibold mb-2 text-primary">#PROP{proposal.id}</p>
          <h3 className="mb-1 text-lg leading-tight font-semibold">
            Proposta de {proposal.nomeCuidado}
          </h3>
          <p className="text-sm opacity-90">
            Solicitado por {proposal.nomeCliente}
          </p>
        </div>

        {/* Progress Section */}
        <div className="mb-6">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm opacity-90">
              {proposal.statusProposta}
            </span>
            <span className="text-sm font-semibold">
              {convertStatusToPercent(proposal.statusProposta)}%
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-white/30">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{
                width: `${convertStatusToPercent(proposal.statusProposta)}%`,
              }}
            />
          </div>
        </div>

      <AvatarList avatars={proposal.cuidadores} />
      </CardContent>
    </Card>
  );
};
