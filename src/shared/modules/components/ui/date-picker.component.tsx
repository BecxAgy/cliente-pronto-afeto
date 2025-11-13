'use client';

import { useRef, useState } from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format, parse, isValid } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '../../lib/utils';
import { Input } from './input';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Calendar } from './calendar';

interface DatePickerProps {
  value?: Date;
  onChange: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function DatePicker({
  value,
  onChange,
  placeholder = 'Selecione uma data',
  disabled = false,
  className,
}: Readonly<DatePickerProps>) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Valor exibido: se estiver editando usa tempValue, senão usa value formatado
  const displayValue = (() => {
    if (isEditing) return tempValue;
    return value ? format(value, 'dd/MM/yyyy') : '';
  })();

  // Formata automaticamente enquanto digita
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replaceAll(/\D/g, ''); // Remove tudo que não é número

    // Limita a 8 dígitos (ddMMyyyy)
    const limited = input.slice(0, 8);

    // Formata com barras
    let formatted = '';
    if (limited.length >= 1) {
      formatted = limited.slice(0, 2);
      if (limited.length >= 3) {
        formatted += '/' + limited.slice(2, 4);
        if (limited.length >= 5) {
          formatted += '/' + limited.slice(4, 8);
        }
      }
    }

    setTempValue(formatted);

    // Tenta fazer parse quando tiver 10 caracteres (dd/MM/yyyy)
    if (formatted.length === 10) {
      const parsed = parse(formatted, 'dd/MM/yyyy', new Date());
      if (isValid(parsed)) {
        onChange(parsed);
      }
    } else if (formatted.length === 0) {
      onChange(undefined);
    }
  };

  const handleFocus = () => {
    setIsEditing(true);
    setTempValue(value ? format(value, 'dd/MM/yyyy') : '');
  };

  // Valida ao sair do campo
  const handleBlur = () => {
    if (tempValue.length === 10) {
      const parsed = parse(tempValue, 'dd/MM/yyyy', new Date());
      if (isValid(parsed)) {
        onChange(parsed);
      } else if (!value) {
        onChange(undefined);
      }
    } else if (tempValue.length > 0 && tempValue.length < 10 && !value) {
      onChange(undefined);
    }

    setIsEditing(false);
    setTempValue('');
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <div className="relative flex rounded-md border border-input bg-background">
        <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <Input
          ref={inputRef}
          type="text"
          value={displayValue}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          className={cn('border-0 pl-10 pr-3 focus-visible:ring-0', className)}
          maxLength={10}
        />
        <PopoverTrigger asChild>
          <button
            type="button"
            disabled={disabled}
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              'absolute right-0 top-0 h-full px-3 py-2',
              'hover:bg-accent hover:text-accent-foreground rounded-r-md',
              'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              disabled && 'cursor-not-allowed opacity-50'
            )}
          >
            <CalendarIcon className="h-4 w-4" />
          </button>
        </PopoverTrigger>
      </div>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          captionLayout="dropdown"
          selected={value}
          onSelect={(date: Date | undefined) => {
            onChange(date);
            setIsOpen(false);
          }}
          disabled={disabled}
          locale={ptBR}
        />
      </PopoverContent>
    </Popover>
  );
}

export default DatePicker;
