'use client';

import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/src/shared/modules/components/ui/button';

interface EvaluationSuccessProps {
  readonly caregiverName: string;
  readonly onClose?: () => void;
}

/**
 * Tela de sucesso após envio da avaliação
 *
 * Exibe:
 * - Mensagem de agradecimento
 * - Ícone de confirmação
 * - Botão para voltar
 */
export function EvaluationSuccess({
  caregiverName,
  onClose,
}: EvaluationSuccessProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center space-y-6">
      <div className="animate-scale-in">
        <div className="relative">
          <div className="absolute inset-0 bg-success/20 rounded-full blur-2xl animate-pulse" />
          <CheckCircle2
            className="w-24 h-24 text-success relative"
            strokeWidth={2}
          />
        </div>
      </div>

      <div className="space-y-3 animate-fade-in-up animation-delay-100">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          Obrigado pelo seu feedback! ❤️
        </h1>

        <p className="text-base md:text-lg text-muted-foreground max-w-md mx-auto">
          Sua avaliação sobre o atendimento de{' '}
          <span className="font-semibold text-foreground">{caregiverName}</span>{' '}
          foi registrada com sucesso.
        </p>

        <p className="text-sm text-muted-foreground max-w-sm mx-auto">
          Sua opinião nos ajuda a garantir o melhor cuidado possível para você e
          sua família.
        </p>
      </div>

      {onClose && (
        <div className="animate-fade-in-up animation-delay-200 pt-4">
          <Button onClick={onClose} size="lg" className="min-w-[200px]">
            Voltar ao Prontuário
          </Button>
        </div>
      )}
    </div>
  );
}
