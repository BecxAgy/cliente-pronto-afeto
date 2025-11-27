'use client';

import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/src/shared/modules/lib/utils';

interface SelectableCaregiverCardProps {
  readonly children: React.ReactNode;
  readonly caregiverId: number;
  readonly isSelected: boolean;
  readonly onSelect: (caregiverId: number) => void;
}

const SelectableCaregiverCard: React.FC<SelectableCaregiverCardProps> = ({
  children,
  caregiverId,
  isSelected,
  onSelect,
}) => {
  const handleClick = () => {
    onSelect(caregiverId);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        'relative w-full cursor-pointer transition-all duration-200 rounded-2xl text-left',
        'hover:ring-2 hover:ring-primary/50 ',
        isSelected && 'ring-2 ring-primary/50 '
      )}
      aria-pressed={isSelected}
      aria-label={`Selecionar cuidador ${caregiverId}`}
    >
      {/* Indicador de Seleção */}
      {isSelected && (
        <div className="absolute bottom-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
          <Check className="h-5 w-5" />
        </div>
      )}

      {/* Overlay de Hover */}
      <div
        className={cn(
          'absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-200',
          'bg-primary/5 opacity-0 hover:opacity-100',
          isSelected && 'opacity-100 bg-primary/10'
        )}
      />

      {/* Conteúdo do Card */}
      <div className="relative">{children}</div>
    </button>
  );
};

export default SelectableCaregiverCard;
