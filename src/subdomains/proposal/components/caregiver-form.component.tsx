'use client';

import React, { useEffect, useRef } from 'react';
import SearchInput from './search-input';
import CaregiverCard from './caregiver-card.component';
import { useCaregiverSearch } from '../hooks';
import { useProposalFormContext } from '../contexts/proposal-form.context';
import { Loader2 } from 'lucide-react';
import { CaregiverFilters } from '../types/filters.types';
import SelectableCaregiverCard from './selectable-caregiver-card.component';
import { useFormContext } from 'react-hook-form';

const CaregiverFormComponent = () => {
  const { caregivers, isLoading, error, searchCaregivers } =
    useCaregiverSearch();
  const { form } = useProposalFormContext();
  const hasSearchedRef = useRef(false);

  // Hook form para gerenciar seleção de cuidadores
  const { watch, setValue } = useFormContext();
  const selectedCaregivers = watch('caregivers.caregivers') || [];

  useEffect(() => {
    // Busca cuidadores automaticamente quando o componente monta
    if (hasSearchedRef.current) return;

    const formValues = form.getValues();
    const address = formValues.address;
    const patologias = formValues.health?.patologias;

    if (address && patologias && patologias.length > 0) {
      searchCaregivers(address, patologias);
      hasSearchedRef.current = true;
    }
  }, [form, searchCaregivers]);

  const handleSearch = (filters?: CaregiverFilters) => {
    const formValues = form.getValues();
    const address = formValues.address;
    const patologias = formValues.health?.patologias;

    if (address && patologias) {
      searchCaregivers(address, patologias, filters);
    }
  };

  const handleCaregiverSelect = (caregiverId: number) => {
    const currentSelected = selectedCaregivers || [];
    const isAlreadySelected = currentSelected.includes(caregiverId);

    const newSelected = isAlreadySelected
      ? currentSelected.filter((id: number) => id !== caregiverId)
      : [...currentSelected, caregiverId];

    setValue('caregivers.caregivers', newSelected, { shouldValidate: true });
  };

  return (
    <div className="space-y-8">
      <section className="space-y-1">
        <h2 className="text-2xl font-semibold">Selecione o Cuidador Ideal</h2>
        <p className="text-muted-foreground">
          Selecione o cuidador que melhor atende às suas necessidades para
          prosseguir com a proposta.
        </p>
      </section>

      <section className="space-y-4">
        <SearchInput onSearch={handleSearch} />
      </section>

      {isLoading && (
        <div className="text-center py-8">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
        </div>
      )}

      {error && (
        <div className="bg-destructive/10 text-destructive p-4 rounded-md border border-destructive/20">
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      <section className="space-y-4">
        {!isLoading && !error && caregivers.length === 0 && (
          <p className="text-muted-foreground text-center py-8">
            Nenhum cuidador encontrado para os critérios selecionados.
          </p>
        )}
        {!isLoading &&
          !error &&
          caregivers.map(caregiver => (
            <SelectableCaregiverCard
              key={caregiver.cuidadorId}
              caregiverId={caregiver.cuidadorId}
              isSelected={selectedCaregivers.includes(caregiver.cuidadorId)}
              onSelect={handleCaregiverSelect}
            >
              <CaregiverCard caregiver={caregiver} />
            </SelectableCaregiverCard>
          ))}
      </section>
    </div>
  );
};

export default CaregiverFormComponent;
