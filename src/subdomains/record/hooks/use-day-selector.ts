import { useMemo } from 'react';
import { useDateSelector } from '../contexts/date-selector.context';
import { useScreenSize } from '@/src/shared/modules/hooks/use-mobile';
import { getWeeksToShow } from '../helpers/day-selector.helper';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export function useDaySelector() {
  const { selectedDay, setSelectedDay, getWeekDays, startDate, endDate } =
    useDateSelector();
  const screenSize = useScreenSize();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Determina quantas semanas mostrar baseado no tamanho da tela
  const weeksToShow = useMemo(() => getWeeksToShow(screenSize), [screenSize]);

  // Obtém os dias a serem exibidos
  const displayedDays = useMemo(
    () => getWeekDays(weeksToShow),
    [getWeekDays, weeksToShow]
  );

  // Handler para seleção de dia - atualiza URL para refetch server-side
  const handleDayClick = (day: Date) => {
    if (day < startDate || day > endDate) {
      return;
    }

    if (day.toDateString() === selectedDay.toDateString()) {
      return;
    }

    setSelectedDay(new Date(day));

    // Formata a data como YYYY-MM-DD
    const dateStr = day.toISOString().split('T')[0];

    // Cria novos searchParams
    const params = new URLSearchParams(searchParams.toString());
    params.set('date', dateStr);

    // Atualiza a URL - isso vai causar um refetch do Server Component
    router.push(`${pathname}?${params.toString()}`);
  };

  return {
    selectedDay,
    displayedDays,
    handleDayClick,
    weeksToShow,
    startDate,
    endDate,
  };
}
