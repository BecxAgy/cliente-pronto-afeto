import { Card, CardContent } from '@/src/shared/modules/components/ui/card';
import React from 'react';
import { Care } from '../types';
import {
  Calendar1,
  MoreHorizontal,
  Pencil,
  Trash2,
  User2,
  Weight,
} from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/src/shared/modules/components/ui/popover';
import { Button } from '@/src/shared/modules/components/ui/button';
import { parseBackendDate } from '@/src/shared/modules/helpers/date.helper';
import { formatDate } from 'date-fns';
import Link from 'next/link';
import DeleteCareButton from './delete-care-button.component';

export const CareCardComponent = ({ care }: { care: Care }) => {
  return (
    <Card className="relative">
      <CardContent>
        <p className="text-sm text-primary">{care.nomeApresentacao}</p>
        <h2 className="font-semibold text-lg">{care.nome}</h2>

        <div className="flex gap-3 mt-2 text-muted-foreground">
          <p className="flex justify-center items-center text-sm font-medium ">
            <User2 className="w-4 h-4 mt-0.5 mr-1 " />
            CPF
          </p>
          <p>{care.cpf}</p>
        </div>

        <div className="flex gap-3 mt-2 text-muted-foreground">
          <p className="flex justify-center items-center text-sm font-medium ">
            <Calendar1 className="w-4 h-4 mt-0.5 mr-1 " />
            Data de Nascimento
          </p>
          <p>
            {formatDate(parseBackendDate(care.dataNascimento), 'dd/MM/yyyy')}
          </p>
        </div>

        <div className="flex gap-3 mt-2 text-muted-foreground">
          <p className="flex justify-center items-center text-sm font-medium ">
            <Weight className="w-4 h-4 mt-0.5 mr-1 " />
            Peso
          </p>
          <p className="">{care.peso} Kg</p>
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className=" absolute top-4 right-6"
            >
              <MoreHorizontal />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end">
            <div>
              <Link href={`/care/edit/${care.id}`}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="justify-start w-full"
                >
                  <Pencil className="w-4 h-4 mr-2" />
                  Editar cuidado
                </Button>
              </Link>
              <DeleteCareButton careId={care.id} />
            </div>
          </PopoverContent>
        </Popover>
      </CardContent>
    </Card>
  );
};
