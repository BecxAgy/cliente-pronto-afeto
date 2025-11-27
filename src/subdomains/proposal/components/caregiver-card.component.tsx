import { Caregiver } from '@/src/shared/modules/types/caregiver.types';
import Image from 'next/image';

import React from 'react';

import { Badge } from '@/src/shared/modules/components/ui/badge';
import { Patology } from '@/src/shared/modules/types/patology.types';
import { Star } from 'lucide-react';
interface CaregiverCardProps {
  caregiver: Caregiver;
}

const CaregiverCard: React.FC<CaregiverCardProps> = ({ caregiver }) => {
  const [imageError, setImageError] = React.useState(false);
  return (
    <div
      key={caregiver.cuidadorId}
      className="text-start relative  w-full  shadow-sm   bg-accent-foreground p-6 rounded-2xl hover:bg-appointments  "
    >
      <div className="flex gap-4">
        {imageError ? (
          <div className="w-20 h-20 rounded-3xl bg-purple-primary"></div>
        ) : (
          <Image
            src={'/images/profile.png'}
            alt=""
            height={1000}
            width={1000}
            className="rounded-3xl h-fit w-20"
            onError={() => setImageError(true)}
          />
        )}

        <div className=" p-1  w-full">
          <div className="flex justify-between">
            <h4 className="text-sm font-semibold">{caregiver.nome}</h4>
            <div className="flex px-2 py-1 w-fit rounded-full items-center justify-center bg-secondary gap-2">
              <Star className=" text-primary text-sm" />{' '}
              <p className="my-auto text-sm ">
                {caregiver.mediaAvaliacao
                  ? caregiver?.mediaAvaliacao.toPrecision(2)
                  : 5}
              </p>
            </div>
          </div>
          <p className="font-bold text-lg">{caregiver.titulacao}</p>
          <span className="text-xs font-medium text-dark-600">
            {caregiver.endereco.bairro}, {caregiver.endereco.cidade}
          </span>
        </div>
      </div>
      <div className="flex gap-4 py-4 overflow-x-scroll remove-scrollbar">
        <Badge variant={'default'}>
          {caregiver.tempoExperiencia} Anos de Experiência
        </Badge>
        {caregiver.experiencias.map((exp: Patology, index: number) => (
          <Badge key={index} variant={'secondary'}>
            {exp.nome}
          </Badge>
        ))}
      </div>

      <div className="text-start px-1">
        <p className="text-sm text-dark-600">{caregiver.apresentacao}</p>
      </div>
    </div>
  );
};

export default CaregiverCard;
