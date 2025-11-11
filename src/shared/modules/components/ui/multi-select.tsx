'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Check, X, Search } from 'lucide-react';
import { Badge } from './badge';
import { cn } from '../../lib/utils';

export interface MultiSelectOption {
  id: number;
  label: string;
}

interface MultiSelectProps {
  value: number[];
  onChange: (value: number[]) => void;
  options: MultiSelectOption[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function MultiSelect({
  value = [],
  onChange,
  options,
  placeholder = 'Selecione...',
  disabled = false,
  className,
}: Readonly<MultiSelectProps>) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fecha o dropdown quando clica fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchTerm('');
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Filtra opções baseado na busca
  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Obtém labels dos itens selecionados
  const selectedOptions = options.filter(option => value.includes(option.id));

  // Toggle de seleção
  const toggleSelection = useCallback(
    (optionId: number) => {
      const newValue = value.includes(optionId)
        ? value.filter(id => id !== optionId)
        : [...value, optionId];

      onChange(newValue);
    },
    [value, onChange]
  );

  // Remove item selecionado
  const removeItem = useCallback(
    (optionId: number, event: React.MouseEvent) => {
      event.stopPropagation();
      onChange(value.filter(id => id !== optionId));
    },
    [value, onChange]
  );

  return (
    <div ref={dropdownRef} className={cn('relative', className)}>
      {/* Input de busca */}
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        onClick={() => !disabled && setIsOpen(true)}
        onKeyDown={e => {
          if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            setIsOpen(true);
          }
        }}
        className={cn(
          'relative cursor-pointer',
          disabled && 'cursor-not-allowed opacity-50'
        )}
      >
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          disabled={disabled}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background',
            'pl-10 pr-3 py-2 text-sm ring-offset-background',
            'placeholder:text-muted-foreground',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-50'
          )}
        />
      </div>

      {/* Dropdown de opções */}
      {isOpen && (
        <div
          className={cn(
            'absolute z-50 w-full mt-2 max-h-60 overflow-y-auto overflow-x-hidden',
            'rounded-md border bg-popover text-popover-foreground shadow-md',
            'animate-in fade-in-0 zoom-in-95'
          )}
        >
          {filteredOptions.length === 0 ? (
            <div className="py-6 text-center text-sm text-muted-foreground">
              Nenhuma opção encontrada
            </div>
          ) : (
            filteredOptions.map(option => {
              const isSelected = value.includes(option.id);

              return (
                <button
                  type="button"
                  key={option.id}
                  onClick={() => toggleSelection(option.id)}
                  className={cn(
                    'w-full relative flex cursor-pointer select-none items-center',
                    'rounded-sm px-3 py-2 mx-2 my-1 text-sm outline-none',
                    'transition-colors hover:bg-primary/10 hover:text-muted-foreground',
                    'focus-visible:ring-2 focus-visible:ring-ring'
                  )}
                >
                  <span className="flex h-4 w-4 mr-3 items-center justify-center">
                    {isSelected && <Check className="h-4 w-4 text-primary" />}
                  </span>
                  <span className="flex-1 text-left">{option.label}</span>
                </button>
              );
            })
          )}
        </div>
      )}

      {/* Badges dos itens selecionados */}
      {selectedOptions.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {selectedOptions.map(option => (
            <Badge
              key={option.id}
              variant="outline"
              className="pl-3 pr-2 py-1 rounded-full"
            >
              <span className="text-xs">{option.label}</span>
              <button
                type="button"
                onClick={e => removeItem(option.id, e)}
                disabled={disabled}
                className={cn(
                  'ml-1.5 rounded-full outline-none focus:ring-2 focus:ring-ring',
                  'hover:bg-muted transition-colors',
                  disabled && 'cursor-not-allowed'
                )}
              >
                <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
