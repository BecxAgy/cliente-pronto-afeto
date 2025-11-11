'use client';

import { useState, useCallback } from 'react';

/**
 * Hook para gerenciar o estado de submissão do formulário
 * Controla loading states, erros e sucesso
 */
export function useFormSubmission() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  /**
   * Executa uma função assíncrona com tratamento de loading e erros
   */
  const submitWithLoading = useCallback(
    async <T>(
      asyncFn: () => Promise<T>,
      options?: {
        onSuccess?: (data: T) => void;
        onError?: (error: Error) => void;
        onFinally?: () => void;
      }
    ): Promise<T | null> => {
      setIsSubmitting(true);
      setError(null);
      setSuccess(false);

      try {
        const result = await asyncFn();
        setSuccess(true);
        options?.onSuccess?.(result);
        return result;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Erro ao processar requisição';
        setError(errorMessage);
        options?.onError?.(
          err instanceof Error ? err : new Error(errorMessage)
        );
        return null;
      } finally {
        setIsSubmitting(false);
        options?.onFinally?.();
      }
    },
    []
  );

  /**
   * Limpa o estado de erro
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * Reseta todo o estado de submissão
   */
  const reset = useCallback(() => {
    setIsSubmitting(false);
    setError(null);
    setSuccess(false);
  }, []);

  return {
    isSubmitting,
    error,
    success,
    submitWithLoading,
    clearError,
    reset,
  };
}
