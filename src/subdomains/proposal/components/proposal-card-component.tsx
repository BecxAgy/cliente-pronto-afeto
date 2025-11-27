import { Button } from '@/src/shared/modules/components/ui/button';
import { Card, CardContent } from '@/src/shared/modules/components/ui/card';
import { Badge, MoreHorizontal } from 'lucide-react';
import React from 'react';
import { MinimalProposal } from '../types';
import Image from 'next/image';
import { convertStatusToPercent } from '../helpers';
import { formatDate } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { parseBackendDate } from '@/src/shared/modules/helpers/date.helper';

export const ProposalCardComponent = ({
  proposal,
}: {
  proposal: MinimalProposal;
}) => {
  return (
    <Card
      key={proposal.id}
      className={`bg-primary/5 relative overflow-hidden border-0 py-4`}
    >
      <CardContent className="px-6">
        {/* Settings Icon */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-4 right-4 h-auto p-1"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>

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

        {/* Bottom Section */}
        <div className="flex items-center justify-between">
          {/* Team Avatars */}
          <div className="flex -space-x-2">
            {proposal.cuidadores.map((member, index) => (
              <div
                key={member.cuidadorId}
                className="h-12 w-12 overflow-hidden rounded-full border-2 border-white"
                style={{ zIndex: proposal.cuidadores.length - index }}
              >
                <Image
                  src={'/images/profile.png'}
                  alt={`Team member ${member.cuidadorId}`}
                  width={32}
                  height={32}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
