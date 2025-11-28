'use client';

import React, { useEffect, useState } from 'react';
import CareEditInterface from '../interfaces/care-edit.interface';
import { getCareById } from '../actions';
import { CareFormProvider } from '../contexts/care-form.context';
import { useCareForm } from '../hooks/use-care-form';
import { Care } from '../types';
import { useRouter } from 'next/navigation';
import { parseBackendDate } from '@/src/shared/modules/helpers/date.helper';

export const CareEditContainer = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const form = useCareForm();
  const [careData, setCareData] = useState<Care | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCare() {
      const result = await getCareById(Number(params.id));

      if (result.error || !result.data) {
        router.push('/care/all');
        return;
      }

      setCareData(result.data);

      // Preencher formulário com dados existentes
      form.reset({
        nome: result.data.nome,
        nomeApresentacao: result.data.nomeApresentacao,
        cpf: result.data.cpf,
        peso: result.data.peso.toString(),
        dataNascimento: parseBackendDate(result.data.dataNascimento),
      });

      setLoading(false);
    }

    loadCare();
  }, [params.id, form, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Carregando...</p>
      </div>
    );
  }

  if (!careData) {
    return null;
  }

  return (
    <CareFormProvider form={form}>
      <CareEditInterface careId={params.id} />
    </CareFormProvider>
  );
};
