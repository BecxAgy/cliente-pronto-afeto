'use client';

import React from 'react';
import { cn } from '@/src/shared/modules/lib/utils';
import {
  formatDayName,
  formatDayNumber,
  isSameDay,
} from '@/src/shared/modules/helpers/date.helper';
import { useDaySelector } from '../hooks/use-day-selector';

export const DaySelector = () => {
  const { selectedDay, displayedDays, handleDayClick, startDate, endDate } =
    useDaySelector();

  return (
    <div className="overflow-x-auto remove-scrollbar ">
      <div className="flex items-center bg-card gap-2 rounded-lg border border-border  px-3 py-2 md:px-6 min-w-full md:min-w-0">
        {displayedDays.map((day, index) => {
          const isSelected = isSameDay(day, selectedDay);
          const isToday = isSameDay(day, new Date());
          const isDisabled = day < startDate || day > endDate;

          return (
            <React.Fragment key={index}>
              <button
                onClick={() => !isDisabled && handleDayClick(day)}
                disabled={isDisabled}
                className={cn(
                  'flex flex-col items-center justify-center min-w-11 md:min-w-14 px-2 py-1.5 md:px-3 md:py-2 rounded-md transition-all duration-200',
                  'hover:bg-accent/5',
                  isSelected &&
                    'bg-gradient-to-br from-primary via-primary to-brand-blue-dark text-primary-foreground hover:opacity-90',
                  !isSelected && !isDisabled && 'text-foreground',
                  isDisabled && 'opacity-30 cursor-not-allowed'
                )}
                aria-label={`${formatDayName(day)} ${formatDayNumber(day)}`}
                aria-pressed={isSelected}
                aria-disabled={isDisabled}
              >
                <span
                  className={cn(
                    'text-xs font-medium uppercase mb-0.5 md:mb-1',
                    isSelected
                      ? 'text-primary-foreground'
                      : 'text-muted-foreground'
                  )}
                >
                  {formatDayName(day)}
                </span>
                <span
                  className={cn(
                    'text-base md:text-lg font-semibold',
                    isSelected && 'text-primary-foreground',
                    !isSelected && isToday && 'text-primary'
                  )}
                >
                  {formatDayNumber(day)}
                </span>
              </button>
              {index < displayedDays.length - 1 && (
                <div className="w-px h-8 md:h-10 bg-border/50 flex-shrink-0" />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
