'use client';

import { useState, useCallback } from 'react';
import { getNearCaregiver } from '../actions';
import { Caregiver } from '@/src/shared/modules/types/caregiver.types';
import { LocationFormSchemaProps } from '../schemas';
import { CaregiverFilters } from '../types/filters.types';

export function useCaregiverSearch() {
  const [caregivers, setCaregivers] = useState<Caregiver[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchCaregivers = useCallback(
    async (
      address: LocationFormSchemaProps,
      patologias: number[],
      filters?: CaregiverFilters
    ) => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await getNearCaregiver(
          {
            cep: address.cep,
            estado: address.estado,
            cidade: address.cidade,
            bairro: address.bairro,
            complemento: address.complemento || '',
            numero: address.numero,
            rua: address.rua,
          },
          patologias,
          filters?.habilidadesSelecionadas,
          filters?.avaliacoes,
          filters?.name,
          filters?.expercience
        );

        if (result.error) {
          setError(result.message || 'Erro ao buscar cuidadores');
          setCaregivers([]);
        } else {
          setCaregivers(result.data || []);
        }
      } catch {
        setError('Erro inesperado ao buscar cuidadores');
        setCaregivers([]);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return {
    caregivers,
    isLoading,
    error,
    searchCaregivers,
  };
}
