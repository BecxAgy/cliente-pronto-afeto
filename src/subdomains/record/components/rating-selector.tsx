'use client';

import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/src/shared/modules/lib/utils';

interface RatingSelectorProps {
  readonly value: number;
  readonly onChange: (value: number) => void;
  readonly disabled?: boolean;
  readonly error?: string;
  readonly name: string;
}

/**
 * Componente de seleção de nota com estrelas (1-5)
 *
 * Features:
 * - Interação via clique
 * - Hover preview
 * - Acessibilidade (teclado)
 * - Estados de erro
 */
export function RatingSelector({
  value,
  onChange,
  disabled = false,
  error,
  name,
}: RatingSelectorProps) {
  const [hoverValue, setHoverValue] = React.useState<number>(0);

  const displayValue = hoverValue || value;

  const handleKeyDown = (event: React.KeyboardEvent, rating: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onChange(rating);
    }
  };

  return (
    <div className="space-y-2">
      <div
        className="flex gap-1"
        role="radiogroup"
        aria-label={`Avaliação de ${name}`}
        aria-required="true"
        aria-invalid={!!error}
      >
        {[1, 2, 3, 4, 5].map(rating => {
          const isActive = rating <= displayValue;
          const isSelected = rating === value;

          return (
            <button
              key={rating}
              type="button"
              role="radio"
              aria-checked={isSelected}
              aria-label={`${rating} ${rating === 1 ? 'estrela' : 'estrelas'}`}
              disabled={disabled}
              onClick={() => onChange(rating)}
              onMouseEnter={() => setHoverValue(rating)}
              onMouseLeave={() => setHoverValue(0)}
              onKeyDown={e => handleKeyDown(e, rating)}
              className={cn(
                'transition-all duration-200 ease-out',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                'disabled:cursor-not-allowed disabled:opacity-50',
                'hover:scale-110 active:scale-95',
                error && 'focus-visible:ring-destructive'
              )}
            >
              <Star
                className={cn(
                  'w-10 h-10 transition-all duration-200',
                  isActive
                    ? 'fill-amber-400 text-amber-400'
                    : 'fill-transparent text-muted-foreground/40',
                  hoverValue >= rating && 'scale-110',
                  disabled && 'opacity-50'
                )}
                strokeWidth={2}
              />
            </button>
          );
        })}
      </div>

      {error && (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
