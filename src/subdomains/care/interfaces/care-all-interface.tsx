import React from 'react';
import { getCaresByClient } from '../actions';
import { CareCardComponent } from '../components/care-card.component';
import { Button } from '@/src/shared/modules/components/ui/button';
import Link from 'next/link';
import { PaginationComponent } from '@/src/shared/modules/components/ui/pagination.component';

export const CareAllInterface = async () => {
  const cares = await getCaresByClient();
  console.log('🚀 ~ CareAllInterface ~ cares:', cares);
  return (
    <div className="p-6">
      <header className="pb-6 flex justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Seus Cuidados</h2>
          <p className="text-muted-foreground">
            Aqui estão todos os cuidados associados ao seu perfil.
          </p>
        </div>
        <Link href="/care/add">
          <Button className="mt-4">Adicionar Cuidado</Button>
        </Link>
      </header>

      <section className="grid md:grid-cols-3 grid-cols-1 gap-4">
        {cares.data?.content.map(care => (
          <CareCardComponent key={care.id} care={care} />
        ))}
      </section>
    </div>
  );
};
