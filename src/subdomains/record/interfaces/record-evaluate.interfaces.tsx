'use client';

import { useActionState, useState } from 'react';
import { AlertCircle, UserCheck } from 'lucide-react';
import { createEvaluationAction } from '../actions';
import { EvaluationActionState } from '../schemas';
import { EvaluationCriterion } from '../components/evaluation-criterion';
import { EvaluationSuccess } from '../components/evaluation-success';
import { Button } from '@/src/shared/modules/components/ui/button';
import { formatCaregiverNameForEvaluation } from '../helpers/evaluation.helper';
import { Caregiver } from '@/src/shared/modules/types/caregiver.types';
import { cn } from '@/src/shared/modules/lib/utils';
import Image from 'next/image';
import { StarRating } from '../components/star-rating';

interface RecordEvaluateInterfaceProps {
  readonly clientId: number;
  readonly caregivers: Caregiver[];
  readonly startDate: string;
}

const initialState: EvaluationActionState = {
  status: 'idle',
};

/**
 * Interface de avaliação de atendimento
 *
 * Permite ao cliente avaliar o cuidador em 3 critérios:
 * - Pontualidade
 * - Comunicação
 * - Empatia
 *
 * Usa useActionState para controle de estado e envio via Server Action
 */
export default function RecordEvaluateInterface({
  clientId,
  caregivers,
}: RecordEvaluateInterfaceProps) {
  const [state, formAction, isPending] = useActionState(
    createEvaluationAction,
    initialState
  );

  const [selectedCaregiver, setSelectedCaregiver] = useState<Caregiver | null>(
    null
  );

  const [ratings, setRatings] = useState({
    notaPontualidade: 0,
    notaComunicacao: 0,
    notaEmpatia: 0,
  });

  const formattedName = selectedCaregiver
    ? formatCaregiverNameForEvaluation(selectedCaregiver.nome)
    : '';

  // Se sucesso, mostrar tela de agradecimento
  if (state.status === 'success') {
    return (
      <EvaluationSuccess
        caregiverName={formattedName}
        onClose={() => globalThis.history.back()}
      />
    );
  }

  const isFormValid =
    ratings.notaPontualidade > 0 &&
    ratings.notaComunicacao > 0 &&
    ratings.notaEmpatia > 0;

  // ETAPA 1: Seleção de Cuidador
  if (!selectedCaregiver) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="space-y-3 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-4 rounded-full bg-primary/10">
              <UserCheck className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Quem você gostaria de avaliar?
          </h1>
          <p className="text-base text-muted-foreground max-w-xl mx-auto">
            Selecione o cuidador que prestou atendimento nos últimos 30 dias
          </p>
        </div>

        {/* Lista de Cuidadores */}
        <div className="grid gap-4 md:grid-cols-2">
          {caregivers.map(caregiver => (
            <button
              key={caregiver.cuidadorId}
              type="button"
              onClick={() => setSelectedCaregiver(caregiver)}
              className={cn(
                'group relative overflow-hidden rounded-xl border-2 p-6',
                'transition-all duration-200 ease-out',
                'hover:border-primary hover:shadow-lg hover:scale-[1.02]',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                'bg-card border-border text-left'
              )}
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0">
                  <div className="overflow-hidden rounded-full border-2 border-white h-16 w-16">
                    <Image
                      src={caregiver.fotoUrl || '/images/profile.png'}
                      alt={caregiver.nome}
                      width={64}
                      height={64}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg text-foreground mb-1 truncate">
                    {caregiver.nome}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {caregiver.nomeApresentacao}
                  </p>
                  {caregiver.mediaAvaliacao > 0 && (
                    <StarRating rating={caregiver.mediaAvaliacao} size="sm" />
                  )}
                </div>
              </div>

              {/* Hover Indicator */}
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ETAPA 2: Avaliação do Cuidador Selecionado
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-4">
        {/* Botão para voltar */}
        <button
          type="button"
          onClick={() => setSelectedCaregiver(null)}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Trocar cuidador
        </button>

        {/* Cuidador Selecionado */}
        <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 border border-border">
          <div className="overflow-hidden rounded-full border-2 border-white h-12 w-12 shrink-0">
            <Image
              src={selectedCaregiver.fotoUrl || '/images/profile.png'}
              alt={selectedCaregiver.nome}
              width={48}
              height={48}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Avaliando</p>
            <p className="font-semibold text-foreground">{formattedName}</p>
          </div>
        </div>

        <div className="text-center space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Como foi a experiência?
          </h1>
          <p className="text-base text-muted-foreground max-w-xl mx-auto">
            Avalie o atendimento prestado nos últimos 30 dias
          </p>
        </div>
      </div>

      {/* Form */}
      <form action={formAction} className="space-y-6">
        {/* Hidden fields */}
        <input
          type="hidden"
          name="cuidador"
          value={selectedCaregiver.cuidadorId}
        />
        <input type="hidden" name="cliente" value={clientId} />
        <input
          type="hidden"
          name="notaPontualidade"
          value={ratings.notaPontualidade}
        />
        <input
          type="hidden"
          name="notaComunicacao"
          value={ratings.notaComunicacao}
        />
        <input type="hidden" name="notaEmpatia" value={ratings.notaEmpatia} />

        {/* Critérios de Avaliação */}
        <div className="space-y-4">
          <EvaluationCriterion
            title="Pontualidade"
            description="O cuidador chegou nos horários combinados?"
            value={ratings.notaPontualidade}
            onChange={value =>
              setRatings(prev => ({ ...prev, notaPontualidade: value }))
            }
            error={state.fieldErrors?.notaPontualidade}
            disabled={isPending}
            name="pontualidade"
          />

          <EvaluationCriterion
            title="Comunicação"
            description="A comunicação foi clara e atenciosa?"
            value={ratings.notaComunicacao}
            onChange={value =>
              setRatings(prev => ({ ...prev, notaComunicacao: value }))
            }
            error={state.fieldErrors?.notaComunicacao}
            disabled={isPending}
            name="comunicação"
          />

          <EvaluationCriterion
            title="Empatia"
            description="O cuidador demonstrou cuidado e compreensão?"
            value={ratings.notaEmpatia}
            onChange={value =>
              setRatings(prev => ({ ...prev, notaEmpatia: value }))
            }
            error={state.fieldErrors?.notaEmpatia}
            disabled={isPending}
            name="empatia"
          />
        </div>

        {/* Form Error */}
        {state.formError && (
          <div
            className="flex items-start gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/20"
            role="alert"
          >
            <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
            <p className="text-sm text-destructive">{state.formError}</p>
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={!isFormValid || isPending}
        >
          {isPending ? 'Enviando...' : 'Enviar Avaliação'}
        </Button>

        {!isFormValid && (
          <p className="text-xs text-center text-muted-foreground">
            Por favor, avalie todos os critérios antes de enviar
          </p>
        )}
      </form>
    </div>
  );
}
