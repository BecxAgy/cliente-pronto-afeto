'use client';

import React from 'react';
import { RatingSelector } from './rating-selector';

interface EvaluationCriterionProps {
  readonly title: string;
  readonly description: string;
  readonly value: number;
  readonly onChange: (value: number) => void;
  readonly error?: string;
  readonly disabled?: boolean;
  readonly name: string;
}

/**
 * Card de critério de avaliação
 *
 * Exibe um critério específico (ex: Pontualidade) com:
 * - Título claro
 * - Descrição contextual
 * - Seletor de nota (estrelas)
 */
export function EvaluationCriterion({
  title,
  description,
  value,
  onChange,
  error,
  disabled = false,
  name,
}: EvaluationCriterionProps) {
  return (
    <div className="space-y-4 p-6 rounded-xl bg-card border border-border">
      <div className="space-y-1.5">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      <RatingSelector
        value={value}
        onChange={onChange}
        disabled={disabled}
        error={error}
        name={name}
      />
    </div>
  );
}
