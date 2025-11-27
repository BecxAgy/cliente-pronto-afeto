'use client';

import { Badge } from '@/src/shared/modules/components/ui/badge';
import { Button } from '@/src/shared/modules/components/ui/button';
import { Input } from '@/src/shared/modules/components/ui/input';
import { ListOrdered, Search, Plus, ArrowUpDown } from 'lucide-react';
import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Status } from '../types';

interface FilterHeaderComponentProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const FilterHeaderComponent = ({
  searchParams,
}: FilterHeaderComponentProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const currentSearch =
    typeof searchParams.search === 'string' ? searchParams.search : '';
  const currentStatus =
    typeof searchParams.status === 'string'
      ? (searchParams.status as Status)
      : undefined;
  const currentDirection =
    searchParams.direction === 'asc' || searchParams.direction === 'desc'
      ? searchParams.direction
      : 'desc';

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const search = formData.get('search') as string;

    const params = new URLSearchParams(searchParams as Record<string, string>);
    if (search) {
      params.set('search', search);
    } else {
      params.delete('search');
    }
    params.set('page', '0'); // Reset para primeira página ao buscar

    router.push(`${pathname}?${params.toString()}`);
  };

  const toggleDirection = () => {
    const params = new URLSearchParams(searchParams as Record<string, string>);
    params.set('direction', currentDirection === 'asc' ? 'desc' : 'asc');
    router.push(`${pathname}?${params.toString()}`);
  };

  const filterByStatus = (status: Status) => {
    const params = new URLSearchParams(searchParams as Record<string, string>);

    if (currentStatus === status) {
      params.delete('status');
    } else {
      params.set('status', status);
    }
    params.set('page', '0');

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="py-6">
      <div className="flex w-full gap-6 ">
        <form onSubmit={handleSearch} className="relative w-full">
          <Search className="absolute top-2.5 left-3 h-4 w-4 text-muted-foreground" />
          <Input
            name="search"
            defaultValue={currentSearch}
            placeholder="Buscar proposta..."
            className="max-w-3xl mb-4 pl-8"
          />
        </form>

        <Button asChild>
          <Link href="/proposal/request">
            <Plus className="w-4 h-4 " />
            Criar Proposta
          </Link>
        </Button>

        <Button variant={'outline'} onClick={toggleDirection}>
          <ArrowUpDown className="w-4 h-4 " />
          {currentDirection === 'asc' ? 'Mais antigos' : 'Mais recentes'}
        </Button>
      </div>

      <div className="flex gap-2 flex-wrap">
        <Badge
          variant={currentStatus === 'Aprovada' ? 'default' : 'secondary'}
          className="py-2 px-3 text-sm cursor-pointer hover:bg-success/40"
          onClick={() => filterByStatus('Aprovada')}
        >
          Aprovada
        </Badge>
        <Badge
          variant={currentStatus === 'Observacao' ? 'default' : 'secondary'}
          className="py-2 px-3 text-sm cursor-pointer hover:bg-primary/40"
          onClick={() => filterByStatus('Observacao')}
        >
          Observação
        </Badge>
        <Badge
          variant={currentStatus === 'Negada' ? 'default' : 'secondary'}
          className="py-2 px-3 text-sm cursor-pointer hover:bg-destructive/40"
          onClick={() => filterByStatus('Negada')}
        >
          Negada
        </Badge>
        <Badge
          variant={currentStatus === 'Assinada' ? 'default' : 'secondary'}
          className="py-2 px-3 text-sm cursor-pointer hover:bg-info/40"
          onClick={() => filterByStatus('Assinada')}
        >
          Assinada
        </Badge>
        <Badge
          variant={currentStatus === 'Finalizada' ? 'default' : 'secondary'}
          className="py-2 px-3 text-sm cursor-pointer hover:bg-success/60"
          onClick={() => filterByStatus('Finalizada')}
        >
          Finalizada
        </Badge>
      </div>
    </div>
  );
};

export default FilterHeaderComponent;
