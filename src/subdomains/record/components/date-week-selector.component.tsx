'use client';

import React from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { useDateSelector } from '../contexts/date-selector.context';
import { Button } from '@/src/shared/modules/components/ui/button';
import { formatDateRange } from '@/src/shared/modules/helpers/date.helper';

export const DateWeekSelector = () => {
  const {
    selectedWeekStart,
    setSelectedWeekStart,
    startDate,
    endDate,
    canNavigatePrevious,
    canNavigateNext,
  } = useDateSelector();

  // Calcula a última data visível da semana dentro do range
  const getVisibleEndDate = () => {
    const weekEnd = new Date(selectedWeekStart);
    weekEnd.setDate(selectedWeekStart.getDate() + 6);
    return weekEnd > endDate ? endDate : weekEnd;
  };

  const handlePreviousWeek = () => {
    if (!canNavigatePrevious) return;
    const newDate = new Date(selectedWeekStart);
    newDate.setDate(selectedWeekStart.getDate() - 7);
    setSelectedWeekStart(newDate);
  };

  const handleNextWeek = () => {
    if (!canNavigateNext) return;
    const newDate = new Date(selectedWeekStart);
    newDate.setDate(selectedWeekStart.getDate() + 7);
    setSelectedWeekStart(newDate);
  };

  const handleDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(e.target.value);
    if (
      !isNaN(selectedDate.getTime()) &&
      selectedDate >= startDate &&
      selectedDate <= endDate
    ) {
      setSelectedWeekStart(selectedDate);
    }
  };

  return (
    <div className="flex items-center gap-1 sm:gap-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={handlePreviousWeek}
        className="h-8 w-8 sm:h-9 sm:w-9 shrink-0"
        aria-label="Semana anterior"
        disabled={!canNavigatePrevious}
      >
        <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
      </Button>

      <div className="relative">
        <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-border bg-background hover:bg-accent/50 cursor-pointer transition-colors">
          <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground shrink-0" />
          <span className="text-xs sm:text-sm font-medium whitespace-nowrap">
            {formatDateRange(selectedWeekStart, getVisibleEndDate())}
          </span>
        </div>
        <input
          type="date"
          onChange={handleDateInputChange}
          className="absolute inset-0 opacity-0 cursor-pointer"
          aria-label="Selecionar semana"
        />
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={handleNextWeek}
        className="h-8 w-8 sm:h-9 sm:w-9 shrink-0"
        aria-label="Próxima semana"
        disabled={!canNavigateNext}
      >
        <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
      </Button>
    </div>
  );
};
