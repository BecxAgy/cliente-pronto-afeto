'use client';

import { useCallback } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { ProposalFormSchemaProps, ProposalFormTypeEnum } from '../schemas';

interface UseFormValidationOptions {
  form: UseFormReturn<ProposalFormSchemaProps>;
}

/**
 * Hook para validar cada etapa do formulário antes de avançar
 * Garante que os dados estejam corretos antes de permitir navegação
 */
export function useFormValidation({ form }: UseFormValidationOptions) {
  const { trigger, getValues } = form;

  /**
   * Valida a etapa de dados do cliente
   */
  const validateClientStep = useCallback(async (): Promise<boolean> => {
    const result = await trigger([
      'client.nome',
      'client.nomeApresentacao',
      'client.nacionalidade',
      'client.estadoCivil',
      'client.cpf',
      'client.rg',
      'client.telefone',
      'client.endereco',
    ]);

    return result;
  }, [trigger]);

  /**
   * Valida a etapa de saúde
   */
  const validateHealthStep = useCallback(async (): Promise<boolean> => {
    const result = await trigger([
      'health.comentarios',
      'health.patologias',
      'health.dispositivos',
      'health.cuidado',
    ]);

    return result;
  }, [trigger]);

  /**
   * Valida a etapa de endereço
   */
  const validateAddressStep = useCallback(async (): Promise<boolean> => {
    const result = await trigger([
      'address.cep',
      'address.estado',
      'address.cidade',
      'address.bairro',
      'address.numero',
      'address.complemento',
      'address.rua',
    ]);

    return result;
  }, [trigger]);

  /**
   * Valida a etapa de plantão
   */
  const validateDutyStep = useCallback(async (): Promise<boolean> => {
    const result = await trigger([
      'duty.dataHoraInicioPlantao',
      'duty.alimentacaoFornecida',
      'duty.diasDaSemana',
      'duty.turno',
    ]);

    return result;
  }, [trigger]);

  /**
   * Valida a etapa de cuidadores
   */
  const validateCaregiversStep = useCallback(async (): Promise<boolean> => {
    const result = await trigger(['caregivers.caregivers']);

    return result;
  }, [trigger]);

  /**
   * Valida a etapa atual baseada no formType
   */
  const validateCurrentStep = useCallback(async (): Promise<boolean> => {
    const formType = getValues('formType');

    switch (formType) {
      case ProposalFormTypeEnum.Client:
        return await validateClientStep();
      case ProposalFormTypeEnum.Health:
        return await validateHealthStep();
      case ProposalFormTypeEnum.Address:
        return await validateAddressStep();
      case ProposalFormTypeEnum.Duty:
        return await validateDutyStep();
      case ProposalFormTypeEnum.Caregivers:
        return await validateCaregiversStep();
      default:
        return false;
    }
  }, [
    getValues,
    validateClientStep,
    validateHealthStep,
    validateAddressStep,
    validateDutyStep,
    validateCaregiversStep,
  ]);

  return {
    validateClientStep,
    validateHealthStep,
    validateAddressStep,
    validateDutyStep,
    validateCaregiversStep,
    validateCurrentStep,
  };
}
